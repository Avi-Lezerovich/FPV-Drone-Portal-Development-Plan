/** Builds the [DATA NEEDED] list from static items and estimated prices. */

import { STATIC_DATA_NEEDED } from '../data/data-needed.js';
import { PARTS_DATA } from '../data/parts.js';
import { escapeHtml } from '../utils/dom.js';

export function renderDataNeeded() {
  const list = document.getElementById('dataNeededList');
  if (!list) return;
  const items = STATIC_DATA_NEEDED.slice();
  PARTS_DATA.filter((p) => /estimate/i.test(p.verifiedSource)).forEach((p) => {
    items.push({ where: 'Parts', text: `${p.name}: price is a bundle/search estimate (${p.verifiedSource}). Price the actual items you pick.`, href: `#part-${p.id}` });
  });
  document.dispatchEvent(new CustomEvent('dataneeded:change', { detail: { count: items.length } }));
  const countEl = document.getElementById('openItemsCount');
  if (countEl) countEl.textContent = String(items.length);
  list.innerHTML = items.map((it) => `<li><span class="data-needed">[DATA NEEDED]</span> <strong>${escapeHtml(it.where)}:</strong> ${escapeHtml(it.text)} <a href="${it.href}">Go ↗</a></li>`).join('');
}
