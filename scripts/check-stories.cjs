// Opens every story in the built Storybook, fails if a story is empty or shows an error,
// and runs the axe accessibility checker on each one.
// Usage: npm run build-storybook && npm run check:stories
const { chromium } = require('playwright');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const dir = path.resolve(__dirname, '../storybook-static');
const axeSource = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.svg': 'image/svg+xml' };
const server = http.createServer((req, res) => {
  const file = path.join(dir, decodeURIComponent(req.url.split('?')[0]).replace(/\/$/, '/index.html'));
  fs.readFile(file, (err, data) => { if (err) { res.writeHead(404); return res.end(); } res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' }); res.end(data); });
});

server.listen(6008, async () => {
  const entries = JSON.parse(fs.readFileSync(path.join(dir, 'index.json'))).entries;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let problems = 0, count = 0;
  for (const [id, e] of Object.entries(entries)) {
    if (e.type !== 'story') continue;
    count++;
    await page.goto(`http://localhost:6008/iframe.html?id=${id}&viewMode=story`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);
    const broken = await page.evaluate(() => {
      if (document.body.classList.contains('sb-show-errordisplay')) return 'shows an error: ' + document.querySelector('.sb-errordisplay').innerText.slice(0, 120);
      const root = document.querySelector('#storybook-root');
      return root && (root.innerText.trim() || root.querySelector('svg,button,[role]')) ? '' : 'renders nothing';
    });
    if (broken) { problems++; console.log(`✕ ${id}: ${broken}`); continue; }
    await page.addScriptTag({ content: axeSource });
    const violations = await page.evaluate(async () => (await window.axe.run(document, { rules: { region: { enabled: false }, 'landmark-one-main': { enabled: false }, 'page-has-heading-one': { enabled: false } } })).violations.map((v) => v.id));
    if (violations.length) { problems++; console.log(`✕ ${id}: ${violations.join(', ')}`); }
  }
  console.log(`${count} stories checked, ${problems} with problems`);
  await browser.close(); server.close();
  process.exit(problems ? 1 : 0);
});
