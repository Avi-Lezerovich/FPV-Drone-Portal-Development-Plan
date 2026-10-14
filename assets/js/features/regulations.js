/** Chapter 10 rendering: rule cards, store table, counterfeit tips. */

import { REGULATIONS_DATA } from '../data/regulations.js';
import { COUNTERFEIT_TIPS, STORES_DATA } from '../data/stores.js';

export function renderRegulationsChapter() {
  const regGrid = document.getElementById('regGridContainer');
  if (regGrid) {
    regGrid.innerHTML = REGULATIONS_DATA.map((r) => `
      <article class="hud-card reg-card" id="${r.id}">
        <div style="display:flex; justify-content:space-between; gap:0.5rem; align-items:center;">
          <span class="reg-status ${r.status}">● ${r.statusText}</span>
          <span aria-hidden="true" style="font-size:1.2rem;">${r.icon}</span>
        </div>
        <h3 class="part-title" style="font-size:1.05rem;">${r.title}</h3>
        <p>${r.body}</p>
        <div class="reg-sources">
          ${r.sources.map((src) => `<a href="${src.url}" target="_blank" rel="noopener noreferrer" class="ext-link-pill ${src.official ? 'type-buy' : 'type-specs'}"><span aria-hidden="true">${src.official ? '🏛️' : '📘'}</span><span>${src.label}</span></a>`).join('')}
        </div>
      </article>
    `).join('');
  }

  const storeBody = document.getElementById('storeTableBody');
  if (storeBody) {
    storeBody.innerHTML = STORES_DATA.map((st) => `
      <tr>
        <td><strong>${st.name}</strong><br /><a href="${st.url}" target="_blank" rel="noopener noreferrer" class="mono" style="font-size:0.72rem;">Visit ↗</a></td>
        <td>${st.bestFor}</td>
        <td>${st.pros}</td>
        <td>${st.cons}</td>
        <td>${st.warranty}</td>
        <td>${st.shipping}</td>
      </tr>
    `).join('');
  }

  const tips = document.getElementById('counterfeitTipsContainer');
  if (tips) {
    tips.innerHTML = COUNTERFEIT_TIPS.map((t) => `<div class="tip-item"><strong>${t.title}.</strong> ${t.text}</div>`).join('');
  }
}
