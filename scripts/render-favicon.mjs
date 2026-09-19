import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pngToIco from 'png-to-ico';
import fs from 'node:fs/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const svgPath = path.join(__dirname, '..', 'public', 'favicon.svg');
const publicDir = path.join(__dirname, '..', 'public');

const browser = await chromium.launch();
const page = await browser.newPage();

const svgMarkup = await fs.readFile(svgPath, 'utf8');

async function renderPng(size, outFile) {
  await page.setViewportSize({ width: size, height: size });
  const html = `<!doctype html><html><head><style>
    html,body{margin:0;padding:0;width:${size}px;height:${size}px;}
    svg{display:block;width:${size}px;height:${size}px;}
  </style></head><body>${svgMarkup}</body></html>`;
  await page.setContent(html);
  await page.screenshot({ path: path.join(publicDir, outFile) });
}

await renderPng(256, 'favicon-256.png');
await renderPng(180, 'apple-touch-icon.png');
await renderPng(32, 'favicon-32.png');
await renderPng(16, 'favicon-16.png');

await browser.close();

const icoBuffer = await pngToIco([
  path.join(publicDir, 'favicon-16.png'),
  path.join(publicDir, 'favicon-32.png'),
  path.join(publicDir, 'favicon-256.png'),
]);
await fs.writeFile(path.join(publicDir, 'favicon.ico'), icoBuffer);

// Clean up intermediate PNGs we don't need to ship, keep apple-touch-icon.png
await fs.unlink(path.join(publicDir, 'favicon-256.png'));
await fs.unlink(path.join(publicDir, 'favicon-32.png'));
await fs.unlink(path.join(publicDir, 'favicon-16.png'));

console.log('Wrote favicon.ico and apple-touch-icon.png');
