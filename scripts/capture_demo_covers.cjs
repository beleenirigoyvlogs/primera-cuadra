const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('C:/Users/Beleen Iriigoy/.gemini/config/skills/playwright-skill/node_modules/playwright');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const port = 4173;

// Simple static server for dist
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
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
  console.log(`Preview server listening on port ${port}`);

  const demos = ['parrilla', 'barberia', 'taller', 'dental'];
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });

  for (const d of demos) {
    const url = `http://localhost:${port}/ejemplos/${d}`;
    console.log(`Navigating to ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const outDir = path.resolve(rootDir, `public/demos/${d}`);
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }
    const outPath = path.join(outDir, 'cover.webp');
    // Take screenshot starting right below the top sticky banner (y: 44)
    await page.screenshot({
      path: outPath,
      type: 'webp',
      quality: 90,
      clip: { x: 0, y: 44, width: 1200, height: 900 }
    });
    console.log(`Captured cover for ${d} -> ${outPath}`);
  }

  await browser.close();
  server.close(() => {
    console.log('Done capturing demo covers!');
    process.exit(0);
  });
});
