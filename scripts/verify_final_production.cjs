const path = require('path');
const http = require('http');
const fs = require('fs');

const playwrightPath = 'C:\\Users\\Beleen Iriigoy\\.gemini\\config\\skills\\playwright-skill\\node_modules\\playwright';
const { chromium } = require(playwrightPath);

function serveStatic(distDir, port = 4173) {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.json': 'application/json',
    '.woff2': 'font/woff2',
    '.ico': 'image/x-icon'
  };

  const server = http.createServer((req, res) => {
    let reqPath = decodeURI(req.url.split('?')[0]);
    if (reqPath.endsWith('/')) reqPath += 'index.html';
    let filePath = path.join(distDir, reqPath);

    if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
      filePath += '.html';
    } else if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    if (!fs.existsSync(filePath)) {
      filePath = path.join(distDir, '404.html');
      res.statusCode = 404;
    } else {
      res.statusCode = 200;
    }

    const ext = path.extname(filePath);
    res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
    fs.createReadStream(filePath).pipe(res);
  });

  return new Promise((resolve) => {
    server.listen(port, () => resolve(server));
  });
}

async function run() {
  const distDir = path.resolve(__dirname, '../dist');
  const server = await serveStatic(distDir, 4173);
  console.log('Serving dist on http://localhost:4173');

  const browser = await chromium.launch({ headless: true });
  const viewports = [360, 375, 390, 414, 768, 1440];

  const results = {
    overflows: [],
    consoleErrors: [],
    logoMeasurements: [],
    sectionPaddings: {},
    contrastChecks: []
  };

  const outputDir = 'C:\\Users\\Beleen Iriigoy\\.gemini\\antigravity\\brain\\5552ac68-66f2-4ba1-a43b-c72bbb73232b\\final-proof';
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  for (const width of viewports) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      deviceScaleFactor: 2
    });
    const page = await context.newPage();

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        results.consoleErrors.push({ width, text: msg.text() });
      }
    });

    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });

    // Check overflow
    const overflowCheck = await page.evaluate((w) => {
      const docW = document.documentElement.clientWidth;
      const scrollW = document.documentElement.scrollWidth;
      let worstRight = docW;
      let worstEl = null;

      document.querySelectorAll('*').forEach((el) => {
        // Exclude SVG internals
        if (el.tagName.toLowerCase() === 'circle' || el.tagName.toLowerCase() === 'path' || el.tagName.toLowerCase() === 'defs' || el.tagName.toLowerCase() === 'pattern' || el.tagName.toLowerCase() === 'line') return;
        const rect = el.getBoundingClientRect();
        if (rect.right > worstRight + 0.5) {
          worstRight = rect.right;
          worstEl = (el.tagName + (el.className ? '.' + el.className : '') + (el.id ? '#' + el.id : '')).slice(0, 80);
        }
      });

      return {
        clientWidth: docW,
        scrollWidth: scrollW,
        hasOverflow: scrollW > docW,
        diff: scrollW - docW,
        worstRight,
        worstEl
      };
    }, width);

    console.log(`Viewport ${width}px overflow:`, overflowCheck.hasOverflow ? `FAIL (${overflowCheck.diff}px by ${overflowCheck.worstEl})` : 'PASS (0px overflow)');
    if (overflowCheck.hasOverflow) {
      results.overflows.push({ width, ...overflowCheck });
    }

    // Measure brand logo
    const logoMetrics = await page.evaluate(() => {
      const logoSvg = document.querySelector('header .pc-brand-logo');
      if (!logoSvg) return null;
      const rect = logoSvg.getBoundingClientRect();
      return { height: rect.height, width: rect.width };
    });
    results.logoMeasurements.push({ width, ...logoMetrics });

    // Measure paddings on 1440 and 375
    if (width === 1440 || width === 375) {
      const paddings = await page.evaluate(() => {
        const getPadding = (sel) => {
          const el = document.querySelector(sel);
          if (!el) return null;
          const cs = window.getComputedStyle(el);
          return { top: cs.paddingTop, bottom: cs.paddingBottom, height: el.getBoundingClientRect().height };
        };
        return {
          staggeredStrip: getPadding('ol[aria-label="Puntos clave del servicio"]') || getPadding('section:has(ol) ol'),
          guaranteesBanner: getPadding('section[aria-label="Garantías de servicio"] > div'),
          services: getPadding('#servicios > div'),
          portfolio: getPadding('#ejemplos > div'),
          steps: getPadding('#pasos > div'),
          thepoint: getPadding('#caso > div'),
          pricing: getPadding('#precios > div'),
          about: getPadding('#sobre-mi > div')
        };
      });
      results.sectionPaddings[width] = paddings;

      // Capture screenshots
      await page.screenshot({ path: path.join(outputDir, `final_home_${width}px_light.png`), fullPage: false });

      // Dark mode toggle via DOM
      await page.evaluate(() => {
        document.documentElement.classList.toggle('dark');
        window.dispatchEvent(new CustomEvent('theme-change'));
      });
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(outputDir, `final_home_${width}px_dark.png`), fullPage: false });
    }

    await context.close();
  }

  await browser.close();
  server.close();

  console.log('\n--- FINAL VERIFICATION RESULTS ---');
  console.log('Total Overflows:', results.overflows.length);
  console.log('Console Errors:', results.consoleErrors.length);
  console.log('Logo Measurements:');
  results.logoMeasurements.forEach(m => console.log(`  ${m.width}px viewport -> Logo height: ${m.height}px, width: ${m.width}px`));
  console.log('Section Paddings at 1440px:', JSON.stringify(results.sectionPaddings[1440], null, 2));
  console.log('Section Paddings at 375px:', JSON.stringify(results.sectionPaddings[375], null, 2));
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

