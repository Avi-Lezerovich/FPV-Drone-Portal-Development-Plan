// End-to-end smoke test: loads the site in Chromium and exercises every interactive feature.
// Run with `npm test` (needs the Playwright Chromium browser: `npx playwright install chromium`).
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { chromium, devices } from 'playwright';
import { startServer } from '../scripts/serve.mjs';

let server;
let browser;
let baseUrl;

const CHAPTERS = ['fleet', 'parts', 'budget', 'lab', 'wiring', 'build', 'software-bf', 'software-eco', 'preflight', 'shopping-list'];

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
  await page.waitForSelector('.part-card', { state: 'attached' });
  return { page, errors };
}

/** Open a chapter the way a link does (one chapter is on screen at a time). */
async function show(page, id) {
  await page.evaluate((h) => { location.hash = h; }, id);
  await page.waitForSelector(`#${id}.is-current`);
}

test('renders every chapter without script errors', async () => {
  const { page, errors } = await openPage();
  assert.ok(await page.locator('.part-card').count() >= 16, 'parts explorer cards');
  assert.ok(await page.locator('#bomTableBody tr').count() >= 16, 'budget rows');
  assert.equal(await page.locator('.phase-card').count(), 5, 'build phases');
  assert.ok(await page.locator('.faq-item').count() >= 7, 'faq items');
  assert.ok(await page.locator('#storeTableBody tr').count() >= 8, 'store table');
  assert.equal(await page.locator('#israel').count(), 0, 'Israel rules chapter removed');
  assert.equal(await page.locator('.glossary-term').count(), 12, 'glossary starts with one screenful');
  await show(page, 'shopping-list');
  await page.click('#glossaryMoreBtn');
  assert.ok(await page.locator('.glossary-term').count() >= 30, 'glossary terms');
  assert.ok(await page.locator('#dataNeededList li').count() > 0, 'data-needed list');
  assert.match(await page.textContent('#scoreGrandUsd'), /^\$[\d,]+\.\d\d$/);
  assert.deepEqual(errors, []);
  await page.close();
});

test('one chapter is on screen at a time, picked by the URL', async () => {
  const { page } = await openPage();
  const visible = () => page.$$eval('main > section.chapter-section', (s) => s.filter((x) => x.offsetParent !== null).map((x) => x.id));
  assert.deepEqual(await visible(), ['hero'], 'home on a fresh visit');
  await page.click('#chapterNav .nav-pill[data-section="parts"]');
  await page.waitForSelector('#parts.is-current');
  assert.deepEqual(await visible(), ['parts']);
  assert.equal(await page.getAttribute('#chapterNav .nav-pill[aria-current]', 'data-section'), 'parts');
  assert.equal(await page.evaluate(() => window.scrollY), 0, 'a new chapter opens at its top');
  assert.match(await page.title(), /^Parts — Return to Air/);
  // A link to something inside another chapter opens that chapter and scrolls to it.
  await page.evaluate(() => { location.hash = 'troubleshooting'; });
  await page.waitForSelector('#preflight.is-current');
  assert.ok(await page.evaluate(() => Math.abs(document.getElementById('troubleshooting').getBoundingClientRect().top) < 200), 'scrolled to the target');
  // Next/previous links at the end of a chapter.
  await page.click('#preflight .chapter-pager .pager-link.next');
  await page.waitForSelector('#shopping-list.is-current');
  await page.goBack();
  await page.waitForSelector('#preflight.is-current');
  await page.close();
});

test('a deep link opens its chapter on first load', async () => {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  await page.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.abort());
  await page.goto(`${baseUrl}#sw-3`);
  await page.waitForSelector('#software-bf.is-current');
  assert.equal(await page.locator('#sw-3').evaluate((d) => d.open), true, 'the linked step is opened');
  await page.close();
});

test('explorer filters by drone', async () => {
  const { page } = await openPage();
  await show(page, 'parts');
  await page.click('[data-filter-drone="cinewhoop"]');
  const badges = await page.locator('.part-card .badge').first().textContent();
  assert.match(badges, /cinewhoop/i);
  await page.close();
});

test('budget toggle updates totals, shopping list and keeps focus', async () => {
  const { page } = await openPage();
  await show(page, 'budget');
  const before = await page.textContent('#scoreGrandUsd');
  const listBefore = await page.textContent('#plainListPre');
  await page.click('[data-collapse-key="fold-bom"] > summary');
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
  await show(page, 'build');
  await page.locator('[data-build-check]').first().check();
  assert.match(await page.textContent('#buildMasterCount'), /^1 of 20/);
  await page.reload();
  await page.waitForSelector('#build.is-current .phase-card');
  assert.match(await page.textContent('#buildMasterCount'), /^1 of 20/);
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
  assert.equal(await page.locator('main > section.is-current').count(), 1);
  assert.notEqual(await page.getAttribute('main > section.is-current', 'id'), 'hero', 'the result\'s chapter is open');
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

test('no horizontal scroll on a phone-sized screen, in any chapter', async () => {
  const { page } = await openPage({ width: 360, height: 780 });
  for (const id of ['hero', ...CHAPTERS]) {
    if (id !== 'hero') await show(page, id);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    assert.ok(overflow <= 0, `#${id} overflows by ${overflow}px`);
  }
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
  await show(page, 'build');
  await page.locator('[data-build-check]').first().check();
  assert.equal(await page.textContent('#missionBuild'), '5%');
  assert.notEqual(await page.textContent('#missionBudget'), '$0');
  assert.ok(Number(await page.textContent('#missionOpen')) > 0);
  await page.close();
});

test('flight lab: weight, motor direction and battery tools respond to input', async () => {
  const { page } = await openPage();
  await show(page, 'lab');
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
  await show(page, 'parts');
  const all = await page.locator('.part-card').count();
  await page.fill('#explorerSearch', 'gps');
  await page.waitForTimeout(250);
  const some = await page.locator('.part-card').count();
  assert.ok(some > 0 && some < all, `${some} of ${all}`);
  await page.close();
});

test('chapters get a stage label, stage tabs and previous/next links; progress shows in the nav and on home', async () => {
  const { page } = await openPage();
  assert.equal(await page.locator('.section-eyebrow').count(), 10, 'every chapter after home');
  assert.equal(await page.textContent('#parts .section-eyebrow'), 'Plan · Chapter 02');
  assert.equal(await page.textContent('#parts .section-num'), '02', 'the number tile matches the nav');
  assert.deepEqual(await page.$$eval('#parts .stage-tab', (a) => a.map((x) => x.getAttribute('href'))), ['#fleet', '#parts', '#budget']);
  assert.equal(await page.locator('#preflight .stage-tabs').count(), 0, 'no tabs in a one-chapter stage');
  assert.equal(await page.locator('#parts .chapter-pager .pager-link.next').getAttribute('href'), '#budget');
  assert.equal(await page.locator('#fleet .chapter-pager .pager-link.prev').getAttribute('href'), '#hero');
  assert.equal(await page.locator('#shopping-list .chapter-pager .pager-link.next').getAttribute('href'), '#hero');
  for (const text of await page.$$eval('[data-toc-meta="budget"]', (els) => els.map((e) => e.textContent))) {
    assert.match(text, /^\$\d+\.\dk$/, 'sidebar and home card both show the budget');
  }
  await show(page, 'build');
  await page.locator('[data-build-check]').first().check();
  assert.deepEqual(await page.$$eval('[data-toc-meta="build"]', (els) => els.map((e) => e.textContent)), ['5%', '5%']);
  await page.close();
});

test('parts start as compact summaries and "Expand all" opens them, including after filtering', async () => {
  const { page } = await openPage();
  await show(page, 'parts');
  assert.equal(await page.locator('.part-more[open]').count(), 0, 'collapsed on desktop too');
  await page.click('#partsExpandAllBtn');
  assert.equal(await page.locator('.part-more:not([open])').count(), 0);
  await page.click('[data-filter-drone="cinewhoop"]');
  assert.equal(await page.locator('.part-more:not([open])').count(), 0, 'cards brought in by a filter stay expanded');
  await page.click('#partsExpandAllBtn');
  assert.equal(await page.locator('.part-more[open]').count(), 0);
  await page.close();
});

test('every part card shows a picture and a store button; budget ticks show on the card', async () => {
  const { page } = await openPage();
  const cards = await page.locator('.part-card').count();
  assert.equal(await page.locator('.part-card .part-thumb :is(svg.part-art, img)').count(), cards);
  assert.equal(await page.locator('.part-card .part-cta[target="_blank"]').count(), cards, 'one primary store link per card');
  assert.match(await page.textContent('#part-5in-frame-vapor-x5 .part-cta'), /^Buy at GEPRC Official/);
  assert.match(await page.textContent('#part-5in-buzzer-cap .part-cta'), /^Find at /, 'falls back to a store search');
  assert.equal(await page.textContent('[data-part-budget="5in-frame-vapor-x5"]'), 'In budget');
  await show(page, 'budget');
  await page.click('[data-collapse-key="fold-bom"] > summary');
  await page.locator('[data-bom-check="5in-frame-vapor-x5"]').uncheck();
  assert.equal(await page.textContent('[data-part-budget="5in-frame-vapor-x5"]'), 'Not in budget');
  await page.close();
});

test('opening a part from global search expands its details', async () => {
  const { page } = await openPage();
  await page.keyboard.press('/');
  await page.fill('#globalSearchInput', 'Vapor-X5 Frame Kit');
  await page.keyboard.press('Enter');
  await page.waitForSelector('#parts.is-current');
  assert.equal(await page.locator('#part-5in-frame-vapor-x5 .part-more').evaluate((d) => d.open), true);
  await page.close();
});

test('setup steps start collapsed and "Expand all" opens one chapter\'s steps', async () => {
  const { page } = await openPage();
  assert.equal(await page.locator('.bf-step-card[open]').count(), 0);
  await show(page, 'software-bf');
  await page.click('[data-expand-all="#software-bf .bf-step-card"]');
  assert.equal(await page.locator('#software-bf .bf-step-card:not([open])').count(), 0);
  assert.equal(await page.locator('#software-eco .bf-step-card[open]').count(), 0, 'the other chapter is untouched');
  await page.close();
});

test('shopping list copy buttons sit outside the collapsed preview', async () => {
  const { page } = await openPage();
  await show(page, 'shopping-list');
  assert.equal(await page.isVisible('#copyPlainListBtn'), true);
  assert.equal(await page.isVisible('#plainListPre'), false, 'preview starts collapsed');
  assert.match(await page.textContent('#plainListPre'), /FPV shopping list/);
  await page.close();
});

test('wiring shows a connection card per part for the selected build', async () => {
  const { page } = await openPage();
  await show(page, 'wiring');
  assert.equal(await page.locator('#wireLegend li').count(), 5);
  assert.equal(await page.locator('#wiring-pane-5inch .wire-card').count(), 6);
  const o4 = page.locator('#wiring-pane-5inch .wire-card', { hasText: 'DJI O4 Air Unit Pro' });
  assert.match(await o4.locator('.wire-row.wire-power .wire-to').textContent(), /9V BEC/);
  assert.equal(await o4.locator('.wire-remove').count(), 1, 'SBUS removal is called out');
  assert.equal(await page.isVisible('#wiring-pane-cinewhoop .wire-card'), false);
  await page.click('#wiring-tab-cinewhoop');
  assert.equal(await page.locator('#wiring-pane-cinewhoop .wire-card:visible').count(), 4);
  await page.close();
});

test('home offers to continue at the last chapter read', async () => {
  const { page } = await openPage();
  assert.equal(await page.isVisible('#resumeLink'), false, 'nothing to resume on a first visit');
  await show(page, 'build');
  await page.goto(baseUrl);
  await page.waitForSelector('#hero.is-current');
  assert.equal(await page.isVisible('#resumeLink'), true);
  assert.equal(await page.getAttribute('#resumeLink', 'href'), '#build');
  assert.equal(await page.textContent('#resumeLabel'), '06 Build');
  assert.equal(await page.locator('.hero-actions .btn-primary:visible').count(), 1, 'one primary action');
  await page.close();
});

async function openPhone() {
  const ctx = await browser.newContext({ ...devices['iPhone 13'], reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.abort());
  await page.goto(baseUrl);
  await page.waitForSelector('.part-card', { state: 'attached' });
  return { page, ctx };
}

test('phone: every screen stays short, cards collapse and open on tap', async () => {
  const { page, ctx } = await openPhone();
  const heights = {};
  for (const id of ['hero', ...CHAPTERS]) {
    if (id !== 'hero') await show(page, id);
    heights[id] = await page.evaluate(() => document.documentElement.scrollHeight);
  }
  // The guide used to be one 22,500 px page on a phone; now the longest screen is one chapter.
  assert.ok(heights.hero < 4000, `home is ${heights.hero}px tall`);
  for (const [id, h] of Object.entries(heights)) assert.ok(h < 7000, `#${id} is ${h}px tall on a phone`);
  await show(page, 'parts');
  const first = page.locator('.part-card .part-more').first();
  assert.equal(await first.evaluate((d) => d.open), false, 'part details start collapsed on phones');
  await first.locator('summary').tap();
  assert.equal(await first.evaluate((d) => d.open), true);
  await ctx.close();
});

test('phone: the tab bar switches stages and stage tabs switch chapters', async () => {
  const { page, ctx } = await openPhone();
  assert.equal(await page.isVisible('#tabbar'), true);
  assert.equal(await page.isVisible('#chapterNav'), false, 'the sidebar is desktop-only');
  assert.equal(await page.getAttribute('#tabbar .tab[aria-current]', 'data-stage'), 'Home');
  await page.tap('#tabbar .tab[data-stage="Build"]');
  await page.waitForSelector('#lab.is-current');
  assert.equal(await page.getAttribute('#tabbar .tab[aria-current]', 'data-stage'), 'Build');
  assert.equal(await page.textContent('#topbarChapter'), '04 Flight Lab');
  await page.tap('#lab .stage-tab[href="#wiring"]');
  await page.waitForSelector('#wiring.is-current');
  // The stage tab remembers where you were in that stage.
  await page.tap('#tabbar .tab[data-stage="Home"]');
  await page.waitForSelector('#hero.is-current');
  await page.tap('#tabbar .tab[data-stage="Build"]');
  await page.waitForSelector('#wiring.is-current');
  // Nothing is hidden behind the fixed tab bar at the end of a chapter.
  const covered = await page.evaluate(() => {
    window.scrollTo(0, document.documentElement.scrollHeight);
    const pager = document.querySelector('#wiring .chapter-pager').getBoundingClientRect();
    return pager.bottom > document.getElementById('tabbar').getBoundingClientRect().top;
  });
  assert.equal(covered, false, 'the pager clears the tab bar');
  await ctx.close();
});

test('phone: tables stack instead of scrolling sideways', async () => {
  const { page, ctx } = await openPhone();
  await page.evaluate(() => document.querySelectorAll('details.section-fold').forEach((d) => { d.open = true; }));
  for (const id of CHAPTERS) {
    await show(page, id);
    const wide = await page.$$eval(`#${id} :is(.bom-table, .uart-table, .data-table.stack-table)`, (tables) =>
      tables.filter((t) => t.scrollWidth > t.parentElement.clientWidth + 1).map((t) => t.className));
    assert.deepEqual(wide, [], `#${id}`);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    assert.ok(overflow <= 0, `#${id} overflows by ${overflow}px`);
  }
  await ctx.close();
});
