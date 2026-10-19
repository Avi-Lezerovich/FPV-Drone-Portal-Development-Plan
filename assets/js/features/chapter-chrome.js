/**
 * Chapter chrome derived from the nav, so the chapter list in index.html stays the single source:
 * a stage eyebrow and stage tabs (the other chapters in the same stage) on every chapter plate,
 * previous/next links at the end of each chapter, live progress next to chapters wherever they are listed,
 * the bottom tab bar's current stage, the top bar's chapter name, and the home screen's "Continue at …" link.
 */

import { SAFE_STORAGE } from '../utils/storage.js';

const LAST_CHAPTER_KEY = 'rta_last_chapter';

const numOf = (pill) => pill.querySelector('.toc-num').textContent.trim();
const labelOf = (pill) => pill.querySelector('.toc-num + span').textContent;

function pagerLink(pill, dir) {
  if (!pill) return '';
  const num = numOf(pill);
  return `
    <a class="pager-link ${dir}" href="#${pill.dataset.section}">
      <span class="pager-dir">${dir === 'next' ? 'Next' : 'Previous'}</span>
      <span class="pager-title">${num ? `<span class="toc-num">${num}</span>` : ''}${labelOf(pill)}</span>
      <span class="pager-arrow" aria-hidden="true">${dir === 'next' ? '→' : '←'}</span>
    </a>`;
}

/** Progress shows next to a chapter in the sidebar and on the home stage cards. */
function setMeta(key, text, tone = '') {
  document.querySelectorAll(`[data-toc-meta="${key}"]`).forEach((el) => {
    el.textContent = text;
    el.classList.toggle('done', tone === 'done');
  });
}

function stageTabs(groupPills, currentId) {
  if (groupPills.length < 2) return null;
  const nav = document.createElement('nav');
  nav.className = 'stage-tabs';
  nav.setAttribute('aria-label', 'Chapters in this stage');
  nav.innerHTML = groupPills.map((p) => {
    const on = p.dataset.section === currentId;
    return `<a href="#${p.dataset.section}" class="stage-tab${on ? ' active' : ''}"${on ? ' aria-current="page"' : ''}><span class="toc-num">${numOf(p)}</span>${labelOf(p)}</a>`;
  }).join('');
  return nav;
}

function initResume(pills) {
  const link = document.getElementById('resumeLink');
  const start = document.getElementById('startLink');
  const saved = SAFE_STORAGE.get(LAST_CHAPTER_KEY, null);
  const pill = pills.find((p) => p.dataset.section === saved);
  if (link && pill && saved !== 'hero') {
    link.href = `#${saved}`;
    document.getElementById('resumeLabel').textContent = `${numOf(pill)} ${labelOf(pill)}`;
    link.hidden = false;
    start?.classList.remove('btn-primary'); // one primary action on the home screen
  }
  // Home is where everyone lands, so it never overwrites the place to resume from.
  document.addEventListener('chapter:change', ({ detail }) => {
    if (detail.id !== 'hero') SAFE_STORAGE.set(LAST_CHAPTER_KEY, detail.id);
  });
}

/** Bottom tab bar: marks the current stage and sends each stage tab back to the chapter you last had open there. */
function initTabbar() {
  const tabs = [...document.querySelectorAll('#tabbar .tab')];
  const topbarChapter = document.getElementById('topbarChapter');
  document.addEventListener('chapter:change', ({ detail }) => {
    tabs.forEach((tab) => {
      const on = tab.dataset.stage === detail.stage;
      tab.classList.toggle('active', on);
      if (on) {
        tab.setAttribute('aria-current', 'page');
        if (detail.stage !== 'Home') tab.setAttribute('href', `#${detail.id}`);
      } else {
        tab.removeAttribute('aria-current');
      }
    });
    if (topbarChapter) topbarChapter.textContent = detail.id === 'hero' ? '' : `${detail.num} ${detail.label}`;
  });
}

/** Must run before the features that emit progress, budget and data-needed events. */
export function initChapterChrome() {
  const pills = [...document.querySelectorAll('#chapterNav .nav-pill[data-section]')];

  pills.forEach((pill, i) => {
    const section = document.getElementById(pill.dataset.section);
    const header = section?.querySelector('.section-header');
    if (!header) return;
    const group = pill.closest('.toc-group');
    const stage = group?.dataset.stage;
    if (stage) {
      const eyebrow = document.createElement('p');
      eyebrow.className = 'section-eyebrow';
      eyebrow.textContent = `${stage} · Chapter ${numOf(pill)}`;
      header.querySelector('.section-title').before(eyebrow);
      const tabs = stageTabs([...group.querySelectorAll('.nav-pill[data-section]')], pill.dataset.section);
      if (tabs) header.before(tabs);
    }
    const pager = document.createElement('nav');
    pager.className = 'chapter-pager';
    pager.setAttribute('aria-label', 'Chapters');
    // The last chapter loops back to home, where the progress dashboard is.
    pager.innerHTML = pagerLink(pills[i - 1], 'prev') + pagerLink(pills[i + 1] || pills[0], 'next');
    section.append(pager);
  });

  document.addEventListener('progress:change', ({ detail }) => {
    const pct = detail.total ? Math.round((detail.done / detail.total) * 100) : 0;
    setMeta(detail.key, pct === 100 ? 'Done' : `${pct}%`, pct === 100 ? 'done' : '');
  });
  document.addEventListener('budget:change', ({ detail }) => {
    if (detail) setMeta('budget', `$${(detail.grandUsd / 1000).toFixed(1)}k`);
  });
  document.addEventListener('dataneeded:change', ({ detail }) => setMeta('open', `${detail.count} open`));

  initResume(pills);
  initTabbar();
}
