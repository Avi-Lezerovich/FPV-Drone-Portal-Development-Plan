/** Shopping-list export (plain text + WhatsApp), driven by budget selections. */

import { LAST_VERIFIED } from '../config.js';
import { PARTS_DATA } from '../data/parts.js';
import { budgetState, getResolvedPartSpec } from './budget.js';
import { copyTextSafe } from '../utils/clipboard.js';

export function buildShoppingListLines() {
  const rate = Math.max(1, Number(budgetState.usdIlsRate) || 3.75);
  const groups = [
    { key: '5inch', title: '5" 6S Freestyle' },
    { key: 'cinewhoop', title: '3" 4S Cinewhoop' },
    { key: 'shared', title: 'Shared gear (goggles, radio, charging)' },
    { key: 'tools', title: 'Workbench & tools' }
  ];
  let totalUsd = 0;
  const out = groups.map((g) => {
    const items = PARTS_DATA.filter((p) => p.drone === g.key && budgetState.enabled[p.id] !== false).map((p) => {
      const spec = getResolvedPartSpec(p);
      totalUsd += spec.priceUsd;
      const opt = spec.options ? spec.options.find((o) => o.key === spec.chosenKey) : null;
      const name = opt ? opt.label.replace(/^(Primary|Alt):\s*/, '').replace(/\s*\(~?\$[\d.,]+[^)]*\)\s*$/, '') : p.name;
      const link = (p.links.find((l) => l.type === 'buy') || p.links.find((l) => l.type === 'search') || {}).url || '';
      return { name, usd: spec.priceUsd, ils: Math.round(spec.priceUsd * rate), link };
    });
    return { title: g.title, items };
  }).filter((g) => g.items.length);
  return { groups: out, totalUsd, totalIls: Math.round(totalUsd * rate), rate };
}

export function renderShoppingList() {
  const plainPre = document.getElementById('plainListPre');
  const waPre = document.getElementById('waListPre');
  if (!plainPre || !waPre) return;
  const data = buildShoppingListLines();
  const money = (n) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const footer = `Rate used: 1 USD = ${data.rate} ILS. Prices are estimates before shipping/VAT. Checked ${LAST_VERIFIED}.`;

  const plain = ['RETURN TO AIR - FPV SHOPPING LIST', ''];
  data.groups.forEach((g) => {
    plain.push(`== ${g.title} ==`);
    g.items.forEach((it) => {
      plain.push(`[ ] ${it.name} - ~$${money(it.usd)} / ~ILS ${it.ils.toLocaleString('en-US')}`);
      if (it.link) plain.push(`    ${it.link}`);
    });
    plain.push('');
  });
  plain.push(`TOTAL: ~$${money(data.totalUsd)} / ~ILS ${data.totalIls.toLocaleString('en-US')}`, footer);

  const wa = ['*🛸 RETURN TO AIR - FPV SHOPPING LIST*', ''];
  data.groups.forEach((g) => {
    wa.push(`*${g.title}*`);
    g.items.forEach((it) => wa.push(`• ${it.name} - _~$${money(it.usd)} / ~₪${it.ils.toLocaleString('en-US')}_`));
    wa.push('');
  });
  wa.push(`*TOTAL: ~$${money(data.totalUsd)} / ~₪${data.totalIls.toLocaleString('en-US')}*`, `_${footer}_`);

  plainPre.textContent = data.groups.length ? plain.join('\n') : 'Nothing selected. Tick parts in the Budget chapter.';
  waPre.textContent = data.groups.length ? wa.join('\n') : 'Nothing selected. Tick parts in the Budget chapter.';
}

export function initShoppingExport() {
  const plainBtn = document.getElementById('copyPlainListBtn');
  const waBtn = document.getElementById('copyWaListBtn');
  if (plainBtn) plainBtn.addEventListener('click', () => copyTextSafe(document.getElementById('plainListPre').textContent, plainBtn, '✓ Copied!'));
  if (waBtn) waBtn.addEventListener('click', () => copyTextSafe(document.getElementById('waListPre').textContent, waBtn, '✓ Copied!'));
  document.addEventListener('budget:change', renderShoppingList);
  renderShoppingList();
}
