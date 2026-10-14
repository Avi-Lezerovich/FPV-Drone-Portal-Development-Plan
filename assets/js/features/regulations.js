/** Israel chapter rendering: rule cards, store table, counterfeit tips. */

import { openAttr } from '../utils/collapse.js';
import { REGULATIONS_DATA } from '../data/regulations.js';
import { COUNTERFEIT_TIPS, STORES_DATA } from '../data/stores.js';

export function renderRegulationsChapter() {
  const regGrid = document.getElementById('regGridContainer');
  if (regGrid) {
    regGrid.innerHTML = REGULATIONS_DATA.map((r) => `
      <details class="hud-card reg-card" id="${r.id}" data-collapse-key="${r.id}"${openAttr(r.id)}>
        <summary class="card-summary">
          <span class="reg-status ${r.status}">${r.statusText}</span>
          <h3 class="part-title">${r.title}</h3>
        </summary>
        <div class="card-body">
        <p>${r.body}</p>
        <div class="reg-sources">
          ${r.sources.map((src) => `<a href="${src.url}" target="_blank" rel="noopener noreferrer" class="ext-link-pill ${src.official ? 'type-buy' : 'type-specs'}"><span class="link-kind">${src.official ? 'Official' : 'Source'}</span><span>${src.label.replace(/^gov\.il: /, '')}</span></a>`).join('')}
        </div>
        </div>
      </details>
    `).join('');
  }

  const storeBody = document.getElementById('storeTableBody');
  if (storeBody) {
    storeBody.innerHTML = STORES_DATA.map((st) => `
      <tr>
        <td data-label="Store"><strong>${st.name}</strong> <a href="${st.url}" target="_blank" rel="noopener noreferrer">Visit ↗</a></td>
        <td data-label="Best for">${st.bestFor}</td>
        <td data-label="Pros">${st.pros}</td>
        <td data-label="Cons">${st.cons}</td>
        <td data-label="Warranty">${st.warranty}</td>
        <td data-label="Shipping &amp; customs">${st.shipping}</td>
      </tr>
    `).join('');
  }

  const tips = document.getElementById('counterfeitTipsContainer');
  if (tips) {
    tips.innerHTML = COUNTERFEIT_TIPS.map((t) => `<div class="tip-item"><strong>${t.title}.</strong> ${t.text}</div>`).join('');
  }
}
