/** Filterable glossary. The unfiltered list starts short (one screenful), with a "Show all" button. */

import { GLOSSARY_DATA } from '../data/glossary.js';
import { isDesktop } from '../utils/collapse.js';
import { escapeHtml } from '../utils/dom.js';

const PREVIEW = { phone: 8, desktop: 12 };
let showAll = false;

export function renderGlossary(filter = '') {
  const grid = document.getElementById('glossaryGrid');
  const countEl = document.getElementById('glossaryCount');
  const moreBtn = document.getElementById('glossaryMoreBtn');
  if (!grid) return;
  const q = filter.trim().toLowerCase();
  const items = GLOSSARY_DATA.filter((g) => !q || g.term.toLowerCase().includes(q) || g.def.toLowerCase().includes(q));
  const preview = isDesktop() ? PREVIEW.desktop : PREVIEW.phone;
  const truncate = !q && !showAll && items.length > preview;
  const shown = truncate ? items.slice(0, preview) : items;
  grid.innerHTML = shown.length
    ? shown.map((g) => `<div class="glossary-term" id="gloss-${g.term.toLowerCase().replace(/[^a-z0-9]+/g, '-')}"><dt>${escapeHtml(g.term)}</dt><dd>${escapeHtml(g.def)}</dd></div>`).join('')
    : '<div class="stage-placeholder" style="grid-column:1/-1">No matching terms.</div>';
  if (countEl) countEl.textContent = `${items.length} of ${GLOSSARY_DATA.length} terms`;
  if (moreBtn) {
    moreBtn.hidden = !truncate;
    moreBtn.textContent = `Show all ${items.length} terms`;
  }
}

export function initGlossary() {
  const input = document.getElementById('glossaryFilterInput');
  const grid = document.getElementById('glossaryGrid');
  if (input) input.addEventListener('input', () => renderGlossary(input.value));
  if (grid && !document.getElementById('glossaryMoreBtn')) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'glossaryMoreBtn';
    btn.className = 'btn glossary-more';
    btn.addEventListener('click', () => { showAll = true; renderGlossary(input ? input.value : ''); });
    grid.after(btn);
  }
  renderGlossary('');
}
