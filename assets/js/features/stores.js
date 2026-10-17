/** Buying help in the Parts chapter: store comparison table and counterfeit checks. */

import { COUNTERFEIT_TIPS, STORES_DATA } from '../data/stores.js';

export function renderStores() {
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
