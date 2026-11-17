const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('C:/Users/Beleen Iriigoy/.gemini/config/skills/playwright-skill/node_modules/playwright');

function startServer(port = 4174) {
  const distDir = path.join(__dirname, '..', 'dist');
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.webp': 'image/webp',
    '.avif': 'image/avif',
    '.svg': 'image/svg+xml',
    '.woff2': 'font/woff2',
    '.woff': 'font/woff',
    '.ttf': 'font/ttf',
    '.webmanifest': 'application/manifest+json'
  };

  const server = http.createServer((req, res) => {
    let reqPath = decodeURI(req.url.split('?')[0]);
    if (reqPath.endsWith('/')) reqPath += 'index.html';
    let filePath = path.join(distDir, reqPath);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    if (!fs.existsSync(filePath)) {
      filePath = path.join(distDir, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    try {
      const data = fs.readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    } catch (e) {
      res.writeHead(404);
      res.end('Not found');
    }
  });

  return new Promise((resolve) => {
    server.listen(port, () => resolve(server));
  });
}

async function run() {
  const server = await startServer(4174);
  console.log('Server running at http://localhost:4174');

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const screenshotDir = path.join(__dirname, '..', 'public', 'test-screenshots');
  if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

  // 1. Desktop 1440px
  console.log('Testing 1440px desktop...');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:4174/#caso-the-point', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Scroll to #caso-the-point
  const caseSection = await page.$('#caso-the-point');
  if (caseSection) {
    await caseSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
  }

  // Screenshot viewer in 1440px
  const viewerBox1440 = await page.$('.case-showcase-box');
  if (viewerBox1440) {
    await viewerBox1440.screenshot({ path: path.join(screenshotDir, 'thepoint_viewer_1440px.png') });
    console.log('Saved: thepoint_viewer_1440px.png');
  }

  // Click on the desktop window to open lightbox
  console.log('Clicking window to test lightbox...');
  const windowCanvas = await page.$('.thepoint-window-viewport');
  if (windowCanvas) {
    await windowCanvas.click();
    await page.waitForTimeout(500);

    // Capture lightbox open
    await page.screenshot({ path: path.join(screenshotDir, 'thepoint_lightbox_1440px.png') });
    console.log('Saved: thepoint_lightbox_1440px.png');

    // Test Zoom toggle
    const zoomBtn = await page.$('.btn-lightbox-action');
    if (zoomBtn) {
      await zoomBtn.click();
      await page.waitForTimeout(300);
      console.log('Zoom toggle tested.');
    }

    // Close lightbox
    const closeBtn = await page.$('.btn-lightbox-close');
    if (closeBtn) {
      await closeBtn.click();
      await page.waitForTimeout(300);
      console.log('Lightbox closed.');
    }
  }

  // 2. Mobile 375px
  console.log('Testing 375px mobile...');
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('http://localhost:4174/#caso-the-point', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const caseSectionMobile = await page.$('#caso-the-point');
  if (caseSectionMobile) {
    await caseSectionMobile.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
  }

  const viewerBox375 = await page.$('.case-showcase-box');
  if (viewerBox375) {
    await viewerBox375.screenshot({ path: path.join(screenshotDir, 'thepoint_viewer_375px.png') });
    console.log('Saved: thepoint_viewer_375px.png');
  }

  // Check if WhatsApp bubble is hidden or unobscuring
  const waBubbleVisible = await page.evaluate(() => {
    const bubble = document.querySelector('.whatsapp-floating-tooltip');
    if (!bubble) return false;
    const style = window.getComputedStyle(bubble);
    return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
  });
  console.log('WhatsApp tooltip visible over The Point:', waBubbleVisible ? 'YES (Obstructing)' : 'NO (Unobscured/Clean)');

  await browser.close();
  server.close();
  console.log('Done!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

