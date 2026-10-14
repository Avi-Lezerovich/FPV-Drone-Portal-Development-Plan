// End-to-end smoke test: loads the site in Chromium and exercises every interactive feature.
// Run with `npm test` (needs the Playwright Chromium browser: `npx playwright install chromium`).
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { startServer } from '../scripts/serve.mjs';

let server;
let browser;
let baseUrl;

before(async () => {
  server = await startServer(0);
  baseUrl = `http://localhost:${server.address().port}/`;
  browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
});

after(async () => {
  await browser?.close();
  server?.close();
});

async function openPage(viewport = { width: 1366, height: 900 }) {
  const page = await browser.newPage({ viewport, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
  await page.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.abort()); // keep tests offline
  await page.goto(baseUrl);
  await page.waitForSelector('.part-card');
  return { page, errors };
}

test('renders every chapter without script errors', async () => {
  const { page, errors } = await openPage();
  assert.ok(await page.locator('.part-card').count() >= 16, 'parts explorer cards');
  assert.ok(await page.locator('#bomTableBody tr').count() >= 16, 'budget rows');
  assert.equal(await page.locator('.phase-card').count(), 5, 'build phases');
  assert.ok(await page.locator('.faq-item').count() >= 7, 'faq items');
  assert.ok(await page.locator('.reg-card').count() >= 8, 'regulation cards');
  assert.ok(await page.locator('.glossary-term').count() >= 30, 'glossary terms');
  assert.ok(await page.locator('#dataNeededList li').count() > 0, 'data-needed list');
  assert.match(await page.textContent('#scoreGrandUsd'), /^\$[\d,]+\.\d\d$/);
  assert.deepEqual(errors, []);
  await page.close();
});

test('explorer filters by drone', async () => {
  const { page } = await openPage();
  await page.click('[data-filter-drone="cinewhoop"]');
  const badges = await page.locator('.part-card .badge').first().textContent();
  assert.match(badges, /CINEWHOOP/);
  await page.close();
});

test('budget toggle updates totals, shopping list and keeps focus', async () => {
  const { page } = await openPage();
  const before = await page.textContent('#scoreGrandUsd');
  const listBefore = await page.textContent('#plainListPre');
  const box = page.locator('[data-bom-check]').first();
  await box.focus();
  await page.keyboard.press('Space');
  await page.waitForTimeout(500);
  assert.notEqual(await page.textContent('#scoreGrandUsd'), before);
  assert.notEqual(await page.textContent('#plainListPre'), listBefore);
  assert.equal(await page.evaluate(() => document.activeElement.getAttribute('data-bom-check')), await box.getAttribute('data-bom-check'));
  await page.close();
});

test('checklist progress persists across reloads', async () => {
  const { page } = await openPage();
  await page.locator('[data-build-check]').first().check();
  assert.match(await page.textContent('#buildMasterCount'), /^1 \//);
  await page.reload();
  await page.waitForSelector('.phase-card');
  assert.match(await page.textContent('#buildMasterCount'), /^1 \//);
  await page.close();
});

test('global search opens with "/" and navigates to a result', async () => {
  const { page } = await openPage();
  await page.keyboard.press('/');
  await page.fill('#globalSearchInput', 'sbus');
  assert.ok(await page.locator('#globalSearchResults a').count() > 0);
  await page.keyboard.press('Enter');
  assert.equal(await page.evaluate(() => document.getElementById('searchDialog').open), false);
  assert.notEqual(await page.evaluate(() => location.hash), '');
  await page.close();
});

test('theme toggle switches and persists', async () => {
  const { page } = await openPage();
  const start = await page.getAttribute('html', 'data-theme');
  await page.click('#themeToggleBtn');
  const next = await page.getAttribute('html', 'data-theme');
  assert.notEqual(next, start);
  await page.reload();
  assert.equal(await page.getAttribute('html', 'data-theme'), next);
  await page.close();
});

test('no horizontal scroll on a phone-sized screen', async () => {
  const { page } = await openPage({ width: 360, height: 780 });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  assert.ok(overflow <= 0, `page overflows by ${overflow}px`);
  await page.close();
});

test('every external link opens safely in a new tab', async () => {
  const { page } = await openPage();
  const unsafe = await page.$$eval('a[href^="http"]', (links) => links
    .filter((a) => a.target !== '_blank' || !/noopener/.test(a.rel) || !/noreferrer/.test(a.rel))
    .map((a) => a.href));
  assert.deepEqual(unsafe, []);
  await page.close();
});

test('mission strip reflects checklist progress', async () => {
  const { page } = await openPage();
  await page.locator('[data-build-check]').first().check();
  assert.equal(await page.textContent('#missionBuild'), '5%');
  assert.notEqual(await page.textContent('#missionBudget'), '$0');
  assert.ok(Number(await page.textContent('#missionOpen')) > 0);
  await page.close();
});

test('flight lab: weight, motor direction and battery tools respond to input', async () => {
  const { page } = await openPage();
  const auw5 = Number(await page.textContent('#labAuw'));
  await page.check('input[name="labBuild"][value="cinewhoop"]', { force: true });
  const auw3 = Number(await page.textContent('#labAuw'));
  assert.ok(auw3 < auw5 && auw3 > 200, `cinewhoop AUW ${auw3} vs 5" ${auw5}`);
  assert.match(await page.textContent('#labTime'), /\d+\.\d–\d+\.\d min/);

  await page.click('#lab-tab-motors');
  await page.click('[data-motor="M1"]');
  const outDir = await page.locator('#motorTableBody tr').first().locator('td').nth(2).textContent();
  await page.check('input[name="propDir"][value="in"]', { force: true });
  const inDir = await page.locator('#motorTableBody tr').first().locator('td').nth(2).textContent();
  assert.equal(inDir, 'CW', 'Betaflight default: M1 (rear right) spins CW with props in');
  assert.equal(outDir, 'CCW');

  await page.click('#lab-tab-battery');
  await page.click('[data-batt-preset="4,720,lihv"]');
  assert.equal(await page.textContent('#battFull'), '17.40 V');
  assert.match(await page.textContent('#battCli'), /vbat_max_cell_voltage = 440/);
  await page.close();
});

test('parts explorer text search narrows results', async () => {
  const { page } = await openPage();
  const all = await page.locator('.part-card').count();
  await page.fill('#explorerSearch', 'gps');
  await page.waitForTimeout(250);
  const some = await page.locator('.part-card').count();
  assert.ok(some > 0 && some < all, `${some} of ${all}`);
  await page.close();
});
