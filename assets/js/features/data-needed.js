/** Builds the [DATA NEEDED] list from static items, regulations and estimated prices. */

import { STATIC_DATA_NEEDED } from '../data/data-needed.js';
import { PARTS_DATA } from '../data/parts.js';
import { REGULATIONS_DATA } from '../data/regulations.js';
import { escapeHtml } from '../utils/dom.js';

export function renderDataNeeded() {
  const list = document.getElementById('dataNeededList');
  if (!list) return;
  const items = STATIC_DATA_NEEDED.slice();
  REGULATIONS_DATA.filter((r) => r.status !== 'ok').forEach((r) => {
    items.push({ where: 'Israel rules', text: `${r.title}: ${r.status === 'warn' ? 'sources conflict' : 'not found in any source checked'}. Confirm on the official gov.il page.`, href: `#${r.id}` });
  });
  PARTS_DATA.filter((p) => /estimate/i.test(p.verifiedSource)).forEach((p) => {
    items.push({ where: 'Parts', text: `${p.name}: price is a bundle/search estimate (${p.verifiedSource}). Price the actual items you pick.`, href: `#part-${p.id}` });
  });
  document.dispatchEvent(new CustomEvent('dataneeded:change', { detail: { count: items.length } }));
  list.innerHTML = items.map((it) => `<li><span class="data-needed">[DATA NEEDED]</span> <strong>${escapeHtml(it.where)}:</strong> ${escapeHtml(it.text)} <a href="${it.href}">Go ↗</a></li>`).join('');
}
