import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function prerender() {
  const templatePath = path.resolve(rootDir, 'dist/index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('Error: dist/index.html does not exist. Run "vite build" first.');
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, 'utf-8');
  
  // Resolve path to built SSR bundle
  const ssrBundlePath = path.resolve(rootDir, 'dist-ssr/entry-server.js');
  if (!fs.existsSync(ssrBundlePath)) {
    console.error('Error: dist-ssr/entry-server.js does not exist.');
    process.exit(1);
  }

  const { render } = await import(pathToFileURL(ssrBundlePath).href);

  const routes = [
    { url: '/', file: 'dist/index.html' },
    { url: '/desarrollo-a-medida', file: 'dist/desarrollo-a-medida/index.html' },
    { url: '/simulador', file: 'dist/simulador/index.html' },
    { url: '/ejemplos/parrilla', file: 'dist/ejemplos/parrilla/index.html' },
    { url: '/ejemplos/barberia', file: 'dist/ejemplos/barberia/index.html' },
    { url: '/ejemplos/taller', file: 'dist/ejemplos/taller/index.html' },
    { url: '/ejemplos/dental', file: 'dist/ejemplos/dental/index.html' },
    { url: '/404', file: 'dist/404.html' }
  ];

  console.log(`Prerendering ${routes.length} routes...`);

  for (const { url, file } of routes) {
    try {
      const { html, meta } = render(url);

      let pageHtml = template.replace('<div id="root"></div>', `<div id="root">${html}</div>`);

      if (meta.title) {
        pageHtml = pageHtml.replace(/<title>[\s\S]*?<\/title>/, `<title>${meta.title}</title>`);
      }
      if (meta.description) {
        pageHtml = pageHtml.replace(/<meta name="description" content="[\s\S]*?" \/>/, `<meta name="description" content="${meta.description}" />`);
      }
      if (meta.canonical) {
        pageHtml = pageHtml.replace(/<link rel="canonical" href="[\s\S]*?" \/>/, `<link rel="canonical" href="${meta.canonical}" />`);
        pageHtml = pageHtml.replace(/<meta property="og:url" content="[\s\S]*?" \/>/, `<meta property="og:url" content="${meta.canonical}" />`);
        pageHtml = pageHtml.replace(/<meta name="twitter:url" content="[\s\S]*?" \/>/, `<meta name="twitter:url" content="${meta.canonical}" />`);
      }
      if (meta.title) {
        pageHtml = pageHtml.replace(/<meta property="og:title" content="[\s\S]*?" \/>/, `<meta property="og:title" content="${meta.title}" />`);
        pageHtml = pageHtml.replace(/<meta name="twitter:title" content="[\s\S]*?" \/>/, `<meta name="twitter:title" content="${meta.title}" />`);
      }
      if (meta.description) {
        pageHtml = pageHtml.replace(/<meta property="og:description" content="[\s\S]*?" \/>/, `<meta property="og:description" content="${meta.description}" />`);
        pageHtml = pageHtml.replace(/<meta name="twitter:description" content="[\s\S]*?" \/>/, `<meta name="twitter:description" content="${meta.description}" />`);
      }
      if (meta.ogImage) {
        pageHtml = pageHtml.replace(/<meta property="og:image" content="[\s\S]*?" \/>/, `<meta property="og:image" content="${meta.ogImage}" />`);
        pageHtml = pageHtml.replace(/<meta property="og:image:secure_url" content="[\s\S]*?" \/>/, `<meta property="og:image:secure_url" content="${meta.ogImage}" />`);
        const mimeType = meta.ogImage.endsWith('.jpg') || meta.ogImage.endsWith('.jpeg') ? 'image/jpeg' : 'image/png';
        pageHtml = pageHtml.replace(/<meta property="og:image:type" content="[\s\S]*?" \/>/, `<meta property="og:image:type" content="${mimeType}" />`);
        pageHtml = pageHtml.replace(/<meta name="twitter:image" content="[\s\S]*?" \/>/, `<meta name="twitter:image" content="${meta.ogImage}" />`);
      }

      const outFilePath = path.resolve(rootDir, file);
      const outDir = path.dirname(outFilePath);
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
      }

      fs.writeFileSync(outFilePath, pageHtml, 'utf-8');
      console.log(`  ✓ Prerendered ${url} -> ${file} (${(pageHtml.length / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`  ✗ Error prerendering ${url}:`, err);
    }
  }

  // Clean up dist-ssr
  const distSsrDir = path.resolve(rootDir, 'dist-ssr');
  if (fs.existsSync(distSsrDir)) {
    fs.rmSync(distSsrDir, { recursive: true, force: true });
  }

  console.log('Prerendering completed successfully!');
}

prerender();

