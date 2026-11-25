/**
 * Build a side-by-side dev copy of the extension.
 *
 *   npm run dev      # writes ./dev/
 *
 * The published extension and an unpacked folder get different extension IDs,
 * so Chrome treats them as two unrelated extensions: both can be installed at
 * once, and they do not share storage. What they would share is a name, an
 * icon and a keyboard shortcut, which makes it impossible to tell which one
 * you just triggered. This copy renames itself, draws the mark's drawer in Ash
 * instead of Stray, and takes Alt+Shift+D so the published build keeps
 * Alt+Shift+I. Recolouring the drawer breaks the brand rules on purpose: it
 * marks a build that must never be mistaken for the real one.
 *
 * Nothing here touches the shipped manifest or the committed icons, so a dev
 * value can never leak into a store release. ./dev/ is gitignored; load it
 * with chrome://extensions -> Load unpacked.
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(HERE, '..');
const OUT = path.join(ROOT, 'dev');

const STRAY = '#FF5436';
const DEV = '#A3A39C'; // Ash: the same mark, with its one colour taken away

fs.rmSync(OUT, { recursive: true, force: true });
fs.cpSync(path.join(ROOT, 'src'), path.join(OUT, 'src'), { recursive: true });

// ---- manifest ------------------------------------------------------------
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'manifest.json'), 'utf8'));
manifest.name = 'Offpx (Dev)';
manifest.description = `LOCAL DEV BUILD. ${manifest.description}`;
manifest.action.default_title = 'Offpx (Dev): inspect this page (Alt+Shift+D)';
manifest.commands._execute_action.suggested_key = { default: 'Alt+Shift+D', mac: 'Alt+Shift+D' };
manifest.commands._execute_action.description = 'Toggle Offpx (Dev) inspect mode';
fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2));

// ---- icons ---------------------------------------------------------------
// The toolbar sizes come from the brand kit's hand-fitted 16/20/24 drawings;
// the larger ones from the mark itself. Every one is redrawn with the drawer
// in Ash.
const recolour = (svg) => svg.replaceAll(STRAY, DEV);
const sources = {
  16: 'offpx-icon-16.svg',
  20: 'offpx-icon-20.svg',
  24: 'offpx-icon-24.svg',
  32: 'offpx-mark.svg',
  48: 'offpx-mark.svg',
  128: 'offpx-mark.svg',
};

const browser = await chromium.launch({ headless: true, channel: 'chromium' });
for (const [size, file] of Object.entries(sources)) {
  const svg = recolour(fs.readFileSync(path.join(ROOT, 'docs/brand', file), 'utf8'));
  // The store icon draws the mark at 96px inside its 128px tile.
  const art = Number(size) === 128 ? 96 : Number(size);
  const page = await browser.newPage({
    viewport: { width: Number(size), height: Number(size) },
    deviceScaleFactor: 1,
  });
  await page.setContent(
    `<style>html,body{margin:0;padding:0;background:transparent;display:grid;place-items:center;` +
      `width:${size}px;height:${size}px}svg{display:block;width:${art}px;height:${art}px}</style>${svg}`
  );
  await page.screenshot({
    path: path.join(OUT, `src/icons/icon-${size}.png`),
    omitBackground: true,
  });
  await page.close();
}
await browser.close();

console.log(`dev/  ->  "${manifest.name}", Ash drawer, Alt+Shift+D`);
console.log('Load it once via chrome://extensions -> Load unpacked -> select dev/');
console.log('After that, re-run this and hit Reload on the card to pick up changes.');
