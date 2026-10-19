/**
 * One chapter on screen at a time. The URL hash picks it: a chapter id (#parts), or any id inside a
 * chapter (#troubleshooting, #sw-3), which opens that chapter and scrolls to the target.
 * Every chapter stays in the HTML, so the page still reads top to bottom without JavaScript and in print.
 * Announces the change as `chapter:change` ({ id, num, label, stage }) for the nav, tab bar and resume link.
 */

import { revealTarget } from '../utils/collapse.js';

const HOME = 'hero';
let current = null;

const sections = () => [...document.querySelectorAll('main > section.chapter-section')];
const pillFor = (id) => document.querySelector(`#chapterNav .nav-pill[data-section="${id}"]`);

function describe(id) {
  const pill = pillFor(id);
  return {
    id,
    num: pill?.querySelector('.toc-num')?.textContent.trim() || '',
    label: pill?.querySelector('.toc-num + span')?.textContent || '',
    stage: pill?.closest('.toc-group')?.dataset.stage || 'Home'
  };
}

/** The chapter a hash points at, and the element inside it to scroll to (null = top of the chapter). */
function resolve(hash) {
  const id = decodeURIComponent((hash || '').replace(/^#/, ''));
  const el = id ? document.getElementById(id) : null;
  if (!el) return { chapter: HOME, target: null };
  const section = el.closest('main > section.chapter-section');
  // Ids outside the chapters (the skip link's #main-content, the footer) keep the chapter you are on.
  if (!section) return { chapter: current || HOME, target: el };
  return { chapter: section.id, target: el === section ? null : el };
}

/** Show a chapter. Returns true when it was not already on screen. */
export function showChapter(id) {
  if (id === current) return false;
  const all = sections();
  if (!all.some((s) => s.id === id)) id = HOME;
  all.forEach((s) => s.classList.toggle('is-current', s.id === id));
  current = id;
  document.documentElement.dataset.chapter = id; // lets CSS adapt the top bar and footer to home vs a chapter

  document.querySelectorAll('#chapterNav .nav-pill[data-section]').forEach((pill) => {
    const on = pill.dataset.section === id;
    pill.classList.toggle('active', on);
    if (on) pill.setAttribute('aria-current', 'page'); else pill.removeAttribute('aria-current');
  });

  const detail = describe(id);
  document.title = id === HOME ? 'Return to Air — FPV Build & Flight Guide' : `${detail.label} — Return to Air`;
  document.dispatchEvent(new CustomEvent('chapter:change', { detail }));
  return true;
}

/** Open the chapter that holds an element (used by search). Returns true when that switched chapters. */
export function showChapterFor(el) {
  const section = el?.closest('main > section.chapter-section');
  return section ? showChapter(section.id) : false;
}

const instant = () => (window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'instant');

function go({ fromHashChange = false } = {}) {
  const { chapter, target } = resolve(location.hash);
  const changed = showChapter(chapter);
  if (target) {
    revealTarget(target);
    requestAnimationFrame(() => target.scrollIntoView({ block: 'start', behavior: changed ? instant() : 'smooth' }));
  } else if (changed || !fromHashChange) {
    window.scrollTo({ top: 0, behavior: instant() });
  }
  if (changed && fromHashChange) {
    // Move keyboard and screen-reader focus to the new chapter's heading.
    const heading = document.querySelector(`#${CSS.escape(chapter)} h1, #${CSS.escape(chapter)} h2`);
    if (heading && !target) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }
  }
}

export function initRouter() {
  document.documentElement.classList.add('routed');
  window.addEventListener('hashchange', () => go({ fromHashChange: true }));
  // A link to the chapter you are already on takes you back to its top.
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
    if (a.getAttribute('href') === location.hash || (a.getAttribute('href') === `#${HOME}` && !location.hash)) {
      e.preventDefault();
      go();
    }
  });
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  go();
}
