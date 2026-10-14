/** Parts explorer: drone/category filters and card rendering. */

import { PARTS_DATA } from '../data/parts.js';
import { escapeHtml } from '../utils/dom.js';

export const explorerState = {
  drone: 'all',
  category: 'all',
  query: '',
  sort: 'default'
};

const SORTERS = {
  'price-asc': (a, b) => a.priceUsd - b.priceUsd,
  'price-desc': (a, b) => b.priceUsd - a.priceUsd,
  'weight-asc': (a, b) => a.weightGrams - b.weightGrams
};

function matchesQuery(part, query) {
  if (!query) return true;
  const hay = [part.name, part.subtitle, part.whyChosen, part.alternatives, part.gotchas, part.category].join(' ').toLowerCase();
  return query.toLowerCase().split(/\s+/).filter(Boolean).every((t) => hay.includes(t));
}

export function getLinkIcon(type) {
  switch (type) {
    case 'buy': return '🛒';
    case 'search': return '🔎';
    case 'specs': return '📘';
    case 'guide': return '🛠️';
    default: return '↗';
  }
}

export function setExplorerFilter(key, value) {
  explorerState[key] = value;
  document.querySelectorAll('[data-filter-drone]').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-filter-drone') === explorerState.drone);
    btn.setAttribute('aria-pressed', String(btn.getAttribute('data-filter-drone') === explorerState.drone));
  });
  document.querySelectorAll('[data-filter-cat]').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-filter-cat') === explorerState.category);
    btn.setAttribute('aria-pressed', String(btn.getAttribute('data-filter-cat') === explorerState.category));
  });
  renderPartsExplorer();
}

export function renderPartsExplorer() {
  const container = document.getElementById('partsGridContainer');
  const countLabel = document.getElementById('explorerCountLabel');
  if (!container) return;

  const filtered = PARTS_DATA.filter((item) => {
    const matchDrone = explorerState.drone === 'all' || item.drone === explorerState.drone;
    const matchCat = explorerState.category === 'all' || item.category === explorerState.category;
    return matchDrone && matchCat && matchesQuery(item, explorerState.query);
  });
  if (SORTERS[explorerState.sort]) filtered.sort(SORTERS[explorerState.sort]);

  if (countLabel) {
    countLabel.textContent = `Showing ${filtered.length} of ${PARTS_DATA.length} verified component groups`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="stage-placeholder" style="grid-column: 1 / -1;">
        No parts match${explorerState.query ? ` "${escapeHtml(explorerState.query)}"` : ''} with these filters. Clear the search or pick "All Categories" / "All Fleet &amp; Gear".
      </div>
    `;
    return;
  }

  const droneBadgeMap = {
    '5inch': { label: '5" 6S FREESTYLE', cls: 'badge-cyan' },
    'cinewhoop': { label: '3" 4S CINEWHOOP', cls: 'badge-amber' },
    'shared': { label: 'SHARED ECOSYSTEM', cls: 'badge-emerald' },
    'tools': { label: 'WORKBENCH & TOOLS', cls: 'badge-cyan' }
  };

  container.innerHTML = filtered.map((part) => {
    const badgeInfo = droneBadgeMap[part.drone] || { label: part.drone.toUpperCase(), cls: 'badge-cyan' };
    const linksHtml = part.links.map((lnk) => `
      <a href="${lnk.url}" target="_blank" rel="noopener noreferrer" class="ext-link-pill type-${lnk.type}" aria-label="${escapeHtml(lnk.label)} (opens in new tab)">
        <span aria-hidden="true">${getLinkIcon(lnk.type)}</span>
        <span>${lnk.label}</span>
      </a>
    `).join('');

    return `
      <article class="hud-card part-card" id="part-${part.id}">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; margin-bottom:0.55rem;">
            <span class="badge ${badgeInfo.cls}">${badgeInfo.label}</span>
            <span class="mono" style="font-size:0.7rem; color:var(--text-muted);">CAT // ${part.category.toUpperCase()}</span>
          </div>

          <div class="part-header">
            <div>
              <h3 class="part-title">${part.name}</h3>
              <div class="part-subtitle">${part.subtitle}</div>
            </div>
            <div class="part-price-box">
              <div class="part-price">~$${part.priceUsd.toFixed(2)}</div>
              <div class="part-weight">Est. ~${part.weightGrams} g</div>
            </div>
          </div>

          <div class="part-body" style="margin-top:0.85rem;">
            <p><strong>Why Chosen:</strong> ${part.whyChosen}</p>
            <div class="part-callout alt">
              <strong>🔄 Verified Alternatives:</strong> ${part.alternatives}
            </div>
            <div class="part-callout gotcha">
              <strong>⚠️ Builder Gotchas:</strong> ${part.gotchas}
            </div>
          </div>
        </div>

        <div class="part-links-wrap">
          <div class="part-links-row">
            ${linksHtml}
          </div>
          <div class="part-verified-meta">
            <span>Source: ${part.verifiedSource}</span>
            <span>Checked: ${part.verifiedDate}</span>
            ${/estimate/i.test(part.verifiedSource) ? '<span class="data-needed" title="Price is a bundle or search estimate, not a single verified listing">[DATA NEEDED: price is an estimate]</span>' : ''}
          </div>
        </div>
      </article>
    `;
  }).join('');
}

export function updateFilterCounts() {
  document.querySelectorAll('[data-filter-drone]').forEach((btn) => {
    const key = btn.getAttribute('data-filter-drone');
    const n = key === 'all' ? PARTS_DATA.length : PARTS_DATA.filter((p) => p.drone === key).length;
    btn.textContent = btn.textContent.replace(/\s*\(\d+\)\s*$/, '') + ` (${n})`;
    btn.setAttribute('aria-pressed', String(btn.classList.contains('active')));
  });
  document.querySelectorAll('[data-filter-cat]').forEach((btn) => {
    const key = btn.getAttribute('data-filter-cat');
    if (key !== 'all' && !PARTS_DATA.some((p) => p.category === key)) btn.hidden = true;
    btn.setAttribute('aria-pressed', String(btn.classList.contains('active')));
  });
}

export function initPartsExplorer() {
  updateFilterCounts();
  const search = document.getElementById('explorerSearch');
  const sort = document.getElementById('explorerSort');
  let debounce = null;
  if (search) {
    search.addEventListener('input', () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => { explorerState.query = search.value.trim(); renderPartsExplorer(); }, 120);
    });
  }
  if (sort) sort.addEventListener('change', () => { explorerState.sort = sort.value; renderPartsExplorer(); });
  // "Explore 5\" / 3\" parts" links on the fleet cards
  document.querySelectorAll('[data-explore-drone]').forEach((link) => {
    link.addEventListener('click', () => {
      setExplorerFilter('category', 'all');
      setExplorerFilter('drone', link.getAttribute('data-explore-drone'));
    });
  });
  document.querySelectorAll('[data-filter-drone]').forEach((btn) => {
    btn.addEventListener('click', () => {
      setExplorerFilter('drone', btn.getAttribute('data-filter-drone'));
    });
  });

  document.querySelectorAll('[data-filter-cat]').forEach((btn) => {
    btn.addEventListener('click', () => {
      setExplorerFilter('category', btn.getAttribute('data-filter-cat'));
    });
  });

  renderPartsExplorer();
}
