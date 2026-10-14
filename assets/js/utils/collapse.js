/**
 * Responsive disclosure for cards: <details data-collapse-key="…"> is open on desktop and
 * collapsed on phones (unless data-mobile-open="true"). A user's own toggle is remembered per key
 * for the session, so re-rendered cards (checklists) keep the state the user chose.
 */

const DESKTOP = window.matchMedia('(min-width: 900px)');
const userState = new Map();

export const isDesktop = () => DESKTOP.matches;

/** For JS templates: returns ' open' or ''. */
export function openAttr(key, mobileDefault = false) {
  const open = userState.has(key) ? userState.get(key) : (DESKTOP.matches || mobileDefault);
  return open ? ' open' : '';
}

function applyDefaults() {
  document.querySelectorAll('details[data-collapse-key]').forEach((d) => {
    d.open = DESKTOP.matches || d.dataset.mobileOpen === 'true';
  });
}

/** Open a target and every collapsed card around it (used by search and deep links). */
export function revealTarget(el) {
  for (let d = el.closest('details'); d; d = d.parentElement && d.parentElement.closest('details')) {
    d.open = true;
    if (d.dataset.collapseKey) userState.set(d.dataset.collapseKey, true);
  }
}

export function initCollapsibles() {
  // Capture phase: runs before the native toggle, so !open is the state the user is asking for.
  document.addEventListener('click', (e) => {
    const summary = e.target.closest('details[data-collapse-key] > summary');
    if (summary) userState.set(summary.parentElement.dataset.collapseKey, !summary.parentElement.open);
  }, true);
  DESKTOP.addEventListener('change', () => {
    userState.clear();
    applyDefaults();
  });
  applyDefaults();
  if (location.hash) {
    const target = document.getElementById(location.hash.slice(1));
    if (target) revealTarget(target);
  }
}
