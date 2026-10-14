/** Filterable glossary. */

import { GLOSSARY_DATA } from '../data/glossary.js';
import { escapeHtml } from '../utils/dom.js';

export function renderGlossary(filter = '') {
  const grid = document.getElementById('glossaryGrid');
  const countEl = document.getElementById('glossaryCount');
  if (!grid) return;
  const q = filter.trim().toLowerCase();
  const items = GLOSSARY_DATA.filter((g) => !q || g.term.toLowerCase().includes(q) || g.def.toLowerCase().includes(q));
  grid.innerHTML = items.length
    ? items.map((g) => `<div class="glossary-term" id="gloss-${g.term.toLowerCase().replace(/[^a-z0-9]+/g, '-')}"><dt>${escapeHtml(g.term)}</dt><dd>${escapeHtml(g.def)}</dd></div>`).join('')
    : '<div class="stage-placeholder" style="grid-column:1/-1;">No matching terms.</div>';
  if (countEl) countEl.textContent = `${items.length} of ${GLOSSARY_DATA.length} terms`;
}

export function initGlossary() {
  const input = document.getElementById('glossaryFilterInput');
  if (input) input.addEventListener('input', () => renderGlossary(input.value));
  renderGlossary('');
}
