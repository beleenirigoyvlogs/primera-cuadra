const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('C:/Users/Beleen Iriigoy/.gemini/config/skills/playwright-skill/node_modules/playwright');

// Simple static file server for dist/
function startServer(port = 4173) {
  const distDir = path.join(__dirname, '..', 'dist');
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.webp': 'image/webp',
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
  const server = await startServer(4173);
  console.log('Static server started at http://localhost:4173');

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  const viewports = [360, 375, 390, 414, 768, 1280, 1440];
  const overflowResults = {};

  for (const w of viewports) {
    await page.setViewportSize({ width: w, height: 800 });
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });

    // Evaluate all elements whose bounding client rect right exceeds viewport width by > 1px
    const overflows = await page.evaluate((width) => {
      const elements = Array.from(document.querySelectorAll('*'));
      const culprits = [];
      for (const el of elements) {
        // Skip hidden elements
        if (el.offsetParent === null && el.offsetWidth === 0 && el.offsetHeight === 0) continue;
        const rect = el.getBoundingClientRect();
        // Check if visible and exceeding width
        if (rect.right > width + 1.5 && rect.width > 0 && rect.height > 0) {
          const style = window.getComputedStyle(el);
          if (style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0') {
            culprits.push({
              tag: el.tagName.toLowerCase(),
              className: (el.className || '').toString().slice(0, 50),
              id: el.id || '',
              text: (el.innerText || '').slice(0, 30).trim(),
              right: Math.round(rect.right),
              width: Math.round(rect.width)
            });
          }
        }
      }
      return culprits.slice(0, 10);
    }, w);

    overflowResults[w] = overflows;
  }

  // Section screenshots at 375px
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const screenshotDir = path.join(__dirname, '..', 'public', 'test-screenshots');
  if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

  const sections = [
    { selector: '.hero-urban-section', name: '01_hero_375px.png' },
    { selector: '.technical-proof-strip', name: '02_performance_badge_375px.png' },
    { selector: '#situaciones', name: '03_situaciones_375px.png' },
    { selector: '#como-funciona', name: '04_pasos_375px.png' },
    { selector: '#disenos-ejemplo', name: '05_ejemplos_375px.png' },
    { selector: '#primeros-clientes', name: '06_primeros_clientes_375px.png' },
    { selector: '#precios', name: '07_precios_375px.png' },
    { selector: '#caso-the-point', name: '08_thepoint_375px.png' },
    { selector: '#quien-esta-detras', name: '09_quien_esta_detras_375px.png' },
    { selector: '#preguntas', name: '10_faq_375px.png' },
    { selector: '#contacto', name: '11_contacto_375px.png' }
  ];

  for (const s of sections) {
    try {
      const el = await page.$(s.selector);
      if (el) {
        await el.screenshot({ path: path.join(screenshotDir, s.name) });
        console.log(`Saved screenshot: ${s.name}`);
      } else {
        console.log(`Selector not found for screenshot: ${s.selector}`);
      }
    } catch (e) {
      console.log(`Error capturing ${s.name}: ${e.message}`);
    }
  }

  // Check typography in 375px: check all font sizes and font families
  const typographyReport = await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll('body *'));
    const fontSizes = new Set();
    const fontFamilies = new Set();
    const sub12px = [];

    for (const el of all) {
      if (!el.innerText || !el.innerText.trim()) continue;
      const style = window.getComputedStyle(el);
      const fsVal = parseFloat(style.fontSize);
      fontSizes.add(Math.round(fsVal * 10) / 10);
      fontFamilies.add(style.fontFamily.split(',')[0].replace(/['"]/g, '').trim());
      if (fsVal < 11.5 && style.display !== 'none') {
        sub12px.push({
          tag: el.tagName,
          class: el.className,
          text: el.innerText.slice(0, 25),
          size: style.fontSize
        });
      }
    }

    return {
      sizes: Array.from(fontSizes).sort((a,b) => a - b),
      families: Array.from(fontFamilies),
      sub12Count: sub12px.length,
      sub12Examples: sub12px.slice(0, 5)
    };
  });

  // Check performance badge text
  const perfBadgeText = await page.evaluate(() => {
    const badge = document.querySelector('.technical-proof-strip');
    return badge ? badge.innerText : null;
  });

  console.log('\n=== TEST AUDIT RESULTS ===');
  console.log('Console Errors:', consoleErrors.length ? consoleErrors : 'None (0)');
  console.log('\nOverflow Audit (Bounding Box Right > Viewport Width):');
  for (const [w, culprits] of Object.entries(overflowResults)) {
    console.log(`Viewport ${w}px: ${culprits.length === 0 ? 'CLEAN (0 overflows)' : JSON.stringify(culprits)}`);
  }
  console.log('\nTypography Audit:');
  console.log('Font Families:', typographyReport.families);
  console.log('Distinct Font Sizes (px):', typographyReport.sizes);
  console.log('Sub-12px elements count:', typographyReport.sub12Count);
  if (typographyReport.sub12Count > 0) {
    console.log('Sub-12px examples:', typographyReport.sub12Examples);
  }
  console.log('\nPerformance Proof Badge Text:', perfBadgeText);

  await browser.close();
  server.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
