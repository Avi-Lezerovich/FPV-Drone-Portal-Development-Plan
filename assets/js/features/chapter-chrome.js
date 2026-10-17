/**
 * Chapter chrome derived from the nav, so the chapter list in index.html stays the single source:
 * a stage eyebrow on every chapter plate, previous/next links at the end of each chapter,
 * live progress next to chapters in the nav, and a "continue where you left off" link in the hero.
 */

import { SAFE_STORAGE } from '../utils/storage.js';

const LAST_CHAPTER_KEY = 'rta_last_chapter';

function pagerLink(pill, dir) {
  if (!pill) return '';
  const num = pill.querySelector('.toc-num').textContent;
  const label = pill.querySelector('.toc-num + span').textContent;
  return `
    <a class="pager-link ${dir}" href="#${pill.dataset.section}">
      <span class="pager-dir">${dir === 'next' ? 'Next →' : '← Previous'}</span>
      <span class="pager-title"><span class="toc-num">${num}</span>${label}</span>
    </a>`;
}

function setMeta(key, text, tone = '') {
  const el = document.querySelector(`[data-toc-meta="${key}"]`);
  if (!el) return;
  el.textContent = text;
  el.classList.toggle('done', tone === 'done');
}

function initResume(pills) {
  const link = document.getElementById('resumeLink');
  const saved = SAFE_STORAGE.get(LAST_CHAPTER_KEY, null);
  const pill = pills.find((p) => p.dataset.section === saved);
  if (link && pill && saved !== 'hero' && !location.hash) {
    link.href = `#${saved}`;
    document.getElementById('resumeLabel').textContent = `${pill.querySelector('.toc-num').textContent} ${pill.querySelector('.toc-num + span').textContent}`;
    link.hidden = false;
  }
  // The overview is where everyone lands, so it never overwrites the place to resume from.
  document.addEventListener('chapter:change', ({ detail }) => {
    if (detail.id !== 'hero') SAFE_STORAGE.set(LAST_CHAPTER_KEY, detail.id);
  });
}

/** Must run before the features that emit progress, budget and data-needed events. */
export function initChapterChrome() {
  const pills = [...document.querySelectorAll('#chapterNav .nav-pill[data-section]')];

  pills.forEach((pill, i) => {
    const section = document.getElementById(pill.dataset.section);
    const header = section?.querySelector('.section-header');
    if (!header) return;
    const stage = pill.closest('.toc-group')?.dataset.stage;
    if (stage) {
      const eyebrow = document.createElement('p');
      eyebrow.className = 'section-eyebrow';
      eyebrow.textContent = `${stage} · Chapter ${pill.querySelector('.toc-num').textContent}`;
      header.querySelector('.section-title').before(eyebrow);
    }
    const pager = document.createElement('nav');
    pager.className = 'chapter-pager';
    pager.setAttribute('aria-label', 'Chapters');
    // The last chapter loops back to the overview, where the progress dashboard is.
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
}
