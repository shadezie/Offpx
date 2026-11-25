/**
 * Turn raw screenshots into Chrome Web Store assets.
 *
 *   npm run store-images
 *
 * Drop any PNGs into docs/raw/. Each one comes out of docs/store/ at exactly
 * 1280x800, scaled to fit and centred on a brand ground, because the store
 * rejects anything that is not exactly 1280x800 or 640x400 and a retina
 * screenshot from a Mac is neither.
 *
 * Also renders the 440x280 small promo tile and the 1400x560 marquee from the
 * brand kit's lockup.
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const RAW = path.join(ROOT, 'docs', 'raw');
const OUT = path.join(ROOT, 'docs', 'store');

const SHOT = { width: 1280, height: 800 };
const TILE = { width: 440, height: 280 };
const MARQUEE = { width: 1400, height: 560 };
const CARBON = '#171717';

fs.mkdirSync(RAW, { recursive: true });
fs.mkdirSync(OUT, { recursive: true });

const dataUri = (file) =>
  `data:image/png;base64,${fs.readFileSync(file).toString('base64')}`;

const browser = await chromium.launch({ headless: true, channel: 'chromium' });

// ---- screenshots ---------------------------------------------------------
const raws = fs.readdirSync(RAW).filter((f) => /\.(png|jpe?g)$/i.test(f)).sort();

if (!raws.length) {
  console.log(`No images in docs/raw/. Put screenshots there and run this again.`);
} else {
  for (const file of raws) {
    const page = await browser.newPage({ viewport: SHOT, deviceScaleFactor: 1 });
    await page.setContent(`<style>
      html,body{margin:0;height:100%}
      body{display:flex;align-items:center;justify-content:center;background:${CARBON}}
      img{max-width:100%;max-height:100%;display:block;
          box-shadow:0 24px 60px rgba(0,0,0,.45);border-radius:6px}
    </style><img src="${dataUri(path.join(RAW, file))}">`);
    await page.waitForTimeout(120);
    const name = `${path.parse(file).name}-1280x800.png`;
    await page.screenshot({ path: path.join(OUT, name) });
    await page.close();
    console.log(`docs/store/${name}`);
  }
}

// ---- promo tiles -----------------------------------------------------------
// Both follow the brand guidelines: Carbon ground, the reversed lockup taken
// from the brand kit file rather than retyped, the tagline in Geist 500, and
// one Stray element per surface, which is the drawer.
const lockup = fs.readFileSync(path.join(ROOT, 'docs/brand/offpx-lockup-reversed.svg'), 'utf8');
const geist = (file) =>
  `data:font/woff2;base64,${fs.readFileSync(path.join(ROOT, 'src/fonts', file)).toString('base64')}`;
const fontFaces =
  `@font-face{font-family:G;src:url("${geist('geist-400.woff2')}") format('woff2');font-weight:400}` +
  `@font-face{font-family:G;src:url("${geist('geist-500.woff2')}") format('woff2');font-weight:500}`;

async function tile(viewport, file, logoHeight, headline, sub) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  await page.setContent(`<style>${fontFaces}
    html,body{margin:0;height:100%}
    body{background:#171717;color:#F5F4F0;font-family:G,system-ui,sans-serif;display:flex;flex-direction:column;
      justify-content:space-between;padding:${Math.round(viewport.height * 0.14)}px ${Math.round(viewport.width * 0.07)}px;box-sizing:border-box}
    svg{height:${logoHeight}px;width:auto;display:block;align-self:flex-start}
    h1{margin:0;font-weight:500;font-size:${Math.round(logoHeight * 0.9)}px;line-height:1.05;letter-spacing:-0.035em}
    p{margin:${Math.round(logoHeight * 0.3)}px 0 0;font:400 ${Math.round(logoHeight * 0.36)}px/1.4 G,system-ui,sans-serif;color:#A3A39C}
  </style>${lockup}<div><h1>${headline}</h1><p>${sub}</p></div>`);
  await page.waitForTimeout(250);
  await page.screenshot({ path: path.join(OUT, file) });
  await page.close();
  console.log(`docs/store/${file}`);
}

await tile(TILE, 'promo-440x280.png', 40, 'Every pixel matters.', 'Design QA for the live web');
await tile(MARQUEE, 'marquee-1400x560.png', 88, 'Every pixel matters.', 'Catch the pixel that&#8217;s off, before your users do');

await browser.close();
