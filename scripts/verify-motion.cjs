const { chromium } = require('C:/Users/Beleen Iriigoy/.gemini/config/skills/playwright-skill/node_modules/playwright');
const path = require('path');
const fs = require('fs');

const outDir = path.resolve('public/motion-proof');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

(async () => {
  const browser = await chromium.launch({ headless: true });
  
  // 1. Desktop Test (1440x900)
  const contextDesktop = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    hasTouch: false,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });
  const pageDesktop = await contextDesktop.newPage();
  
  console.log('Navigating to http://localhost:4173/ ...');
  await pageDesktop.goto('http://localhost:4173/', { waitUntil: 'networkidle' });

  // Wait for hero to render and demo to advance
  await pageDesktop.waitForTimeout(1500);
  await pageDesktop.screenshot({ path: path.join(outDir, 'hero-desktop-demo.png'), clip: { x: 0, y: 0, width: 1440, height: 800 } });
  console.log('Saved hero-desktop-demo.png');

  // Scroll to Portfolio section
  const portfolioEl = await pageDesktop.$('#ejemplos');
  if (portfolioEl) {
    await portfolioEl.scrollIntoViewIfNeeded();
    await pageDesktop.waitForTimeout(500);
    await pageDesktop.screenshot({ path: path.join(outDir, 'portfolio-desktop.png') });
    console.log('Saved portfolio-desktop.png');

    // Hover over first portfolio card to test page scroll
    const firstCard = await pageDesktop.$('.pc-portfolio-thumb-frame');
    if (firstCard) {
      await firstCard.hover();
      console.log('Hovering portfolio card for 2s...');
      await pageDesktop.waitForTimeout(2000);
      await pageDesktop.screenshot({ path: path.join(outDir, 'portfolio-desktop-hover.png') });
      console.log('Saved portfolio-desktop-hover.png');
    }
  }

  // Scroll to Pricing section
  const pricingEl = await pageDesktop.$('#precios');
  if (pricingEl) {
    await pricingEl.scrollIntoViewIfNeeded();
    await pageDesktop.waitForTimeout(600);
    await pageDesktop.screenshot({ path: path.join(outDir, 'pricing-completo-border.png') });
    console.log('Saved pricing-completo-border.png');
  }

  // 2. Mobile Test (390x844 - iPhone 12)
  const contextMobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true
  });
  const pageMobile = await contextMobile.newPage();
  await pageMobile.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
  await pageMobile.waitForTimeout(1000);
  await pageMobile.screenshot({ path: path.join(outDir, 'hero-mobile.png'), clip: { x: 0, y: 0, width: 390, height: 750 } });
  console.log('Saved hero-mobile.png');

  const mobilePortfolio = await pageMobile.$('#ejemplos');
  if (mobilePortfolio) {
    await mobilePortfolio.scrollIntoViewIfNeeded();
    await pageMobile.waitForTimeout(500);
    await pageMobile.screenshot({ path: path.join(outDir, 'portfolio-mobile.png') });
    console.log('Saved portfolio-mobile.png');
  }

  // 3. Prefers-Reduced-Motion Test
  const contextReduced = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce'
  });
  const pageReduced = await contextReduced.newPage();
  await pageReduced.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
  await pageReduced.waitForTimeout(800);
  await pageReduced.screenshot({ path: path.join(outDir, 'reduced-motion-desktop.png'), clip: { x: 0, y: 0, width: 1440, height: 800 } });
  console.log('Saved reduced-motion-desktop.png');

  await browser.close();
  console.log('All verification screenshots captured successfully!');
})();
