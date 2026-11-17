const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('C:/Users/Beleen Iriigoy/.gemini/config/skills/playwright-skill/node_modules/playwright');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const port = 4173;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.json': 'application/json'
};

const server = http.createServer((req, res) => {
  let cleanUrl = req.url.split('?')[0].split('#')[0];
  let filePath = path.join(distDir, cleanUrl);
  
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  } else if (!fs.existsSync(filePath)) {
    if (fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    } else {
      filePath = path.join(distDir, 'index.html');
    }
  }

  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Error loading ' + req.url);
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(port, async () => {
  console.log(`Verification preview server on port ${port}`);

  const browser = await chromium.launch();
  const viewports = [360, 375, 390, 414, 768, 1280, 1440];
  const outDir = path.resolve(rootDir, 'public/test-screenshots/v3');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  let allPassed = true;

  for (const theme of ['light', 'dark']) {
    console.log(`\n================ Testing Theme: ${theme.toUpperCase()} ================`);
    for (const width of viewports) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      
      // Navigate to homepage
      await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' });

      // Apply theme
      if (theme === 'dark') {
        await page.evaluate(() => {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        });
      } else {
        await page.evaluate(() => {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        });
      }
      
      // Allow entrance keyframes to complete
      await page.waitForTimeout(1200);

      // Measure overflows
      const overflows = await page.evaluate((vpWidth) => {
        const badElements = [];
        const all = document.querySelectorAll('*');
        for (const el of all) {
          if (['SCRIPT', 'STYLE', 'HEAD', 'META', 'LINK', 'DEFS', 'PATH', 'RECT', 'svg', 'circle', 'line', 'pattern'].includes(el.tagName.toLowerCase())) continue;
          const rect = el.getBoundingClientRect();
          if (rect.right > vpWidth + 1.5 && rect.width > 0 && rect.height > 0) {
            badElements.push({
              tag: el.tagName,
              className: el.className ? String(el.className).slice(0, 50) : '',
              id: el.id || '',
              text: el.innerText ? el.innerText.slice(0, 30) : '',
              right: Math.round(rect.right),
              vpWidth
            });
          }
        }
        return badElements;
      }, width);

      if (overflows.length > 0) {
        console.error(`  ✗ [${theme}] Width ${width}px has ${overflows.length} overflowing elements:`);
        overflows.slice(0, 5).forEach((o) => {
          console.error(`    - <${o.tag} id="${o.id}" class="${o.className}"> right=${o.right}px > ${o.vpWidth}px | text: "${o.text}"`);
        });
        allPassed = false;
      } else {
        console.log(`  ✓ [${theme}] Width ${width}px: 0 overflows!`);
      }

      // Capture fullpage screenshots for 1440px and 375px
      if (width === 1440 || width === 375) {
        const shotPath = path.join(outDir, `home_${width}px_${theme}.png`);
        await page.screenshot({ path: shotPath, fullPage: true });
        console.log(`    Saved full screenshot -> ${shotPath}`);
      }

      await page.close();
    }
  }

  // Also test Local Landing Pages
  console.log(`\n================ Testing Local Landing Pages ================`);
  const localRoutes = ['/diseno-web-tigre', '/diseno-web-zona-norte', '/diseno-web-caba'];
  for (const r of localRoutes) {
    const page = await browser.newPage({ viewport: { width: 375, height: 900 } });
    await page.goto(`http://localhost:${port}${r}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1200);
    const overflows = await page.evaluate(() => {
      let count = 0;
      document.querySelectorAll('*').forEach((el) => {
        if (['SCRIPT', 'STYLE', 'HEAD', 'META', 'LINK', 'DEFS', 'PATH', 'RECT', 'svg', 'circle', 'line', 'pattern'].includes(el.tagName.toLowerCase())) return;
        const rect = el.getBoundingClientRect();
        if (rect.right > 376.5 && rect.width > 0 && rect.height > 0) count++;
      });
      return count;
    });
    if (overflows === 0) {
      console.log(`  ✓ Route ${r} on 375px: 0 overflows!`);
    } else {
      console.error(`  ✗ Route ${r} on 375px: ${overflows} overflows!`);
      allPassed = false;
    }
    await page.close();
  }

  await browser.close();
  server.close(() => {
    console.log(`\n================ Summary ================`);
    console.log(`Test suite complete! All passed: ${allPassed}`);
    process.exit(allPassed ? 0 : 1);
  });
});
