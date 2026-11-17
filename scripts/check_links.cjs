const fs = require('fs');
const path = require('path');

let missingCount = 0;

function checkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (f !== 'node_modules' && f !== '.git' && f !== 'dist' && f !== 'dist-ssr') checkDir(full);
    } else if (full.endsWith('.jsx') || full.endsWith('.html') || full.endsWith('.js')) {
      const content = fs.readFileSync(full, 'utf-8');
      const matches = content.match(/<a\b[^>]*>/gi) || [];
      for (const m of matches) {
        if (/target\s*=\s*["']_blank["']/i.test(m)) {
          if (!m.includes('rel=') || !m.includes('noopener') || !m.includes('noreferrer')) {
            console.log('Missing rel in', full, ':', m);
            missingCount++;
          }
        }
      }
    }
  }
}

checkDir('src');
checkDir('public');
if (fs.existsSync('index.html')) {
  const content = fs.readFileSync('index.html', 'utf-8');
  const matches = content.match(/<a\b[^>]*>/gi) || [];
  for (const m of matches) {
    if (/target\s*=\s*["']_blank["']/i.test(m)) {
      if (!m.includes('rel=') || !m.includes('noopener') || !m.includes('noreferrer')) {
        console.log('Missing rel in index.html:', m);
        missingCount++;
      }
    }
  }
}

console.log(`Scan finished. Missing count: ${missingCount}`);

