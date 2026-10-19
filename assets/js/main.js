/**
 * Entry point. Modules are deferred, so the DOM is ready when this runs.
 * Each feature initialises independently: one failing feature does not break the rest of the page.
 */

import { LAST_VERIFIED } from './config.js';
import { initCollapsibles } from './utils/collapse.js';
import { initBudgetCalculator } from './features/budget.js';
import { initBuildChecklists } from './features/build-timeline.js';
import { initChapterChrome } from './features/chapter-chrome.js';
import { initCliCopy } from './features/cli-copy.js';
import { renderDataNeeded } from './features/data-needed.js';
import { initFlightLab } from './features/flight-lab.js';
import { initGlossary } from './features/glossary.js';
import { initLedSimulator } from './features/led-strip.js';
import { initMissionStatus } from './features/mission-status.js';
import { initPartsExplorer } from './features/parts-explorer.js';
import { initPreflightAndFaq } from './features/preflight-faq.js';
import { initRouter } from './features/router.js';
import { initScrollAndNav } from './features/scroll-nav.js';
import { initGlobalSearch } from './features/search.js';
import { initShoppingExport } from './features/shopping-list.js';
import { renderStores } from './features/stores.js';
import { initThemeController } from './features/theme.js';
import { initWiringTabs } from './features/wiring.js';

function stampLastVerified() {
  document.querySelectorAll('.js-checked-date').forEach((el) => { el.textContent = LAST_VERIFIED; });
}

const FEATURES = [
  initThemeController,
  initCollapsibles, // before renders: sets static cards open on desktop, closed on phones
  initMissionStatus, // first: listens for events the other features emit while rendering
  initChapterChrome, // also listens for those events; adds eyebrows, stage tabs and pagers
  initPartsExplorer,
  initShoppingExport, // before the budget so it hears the first budget:change
  initBudgetCalculator,
  initFlightLab,
  initWiringTabs,
  initBuildChecklists,
  initCliCopy,
  initLedSimulator,
  initPreflightAndFaq,
  renderStores,
  initGlossary,
  renderDataNeeded,
  initGlobalSearch,
  stampLastVerified,
  initScrollAndNav,
  initRouter // last: opens the chapter in the URL once everything is rendered
];

for (const init of FEATURES) {
  try {
    init();
  } catch (err) {
    console.error(`[init] ${init.name} failed:`, err);
  }
}
