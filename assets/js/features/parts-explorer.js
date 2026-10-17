/** Parts explorer: drone/category filters and card rendering. */

import { PART_ART, PART_ART_BY_CATEGORY } from '../data/part-art.js';
import { PARTS_DATA } from '../data/parts.js';
import { openAttr, setAllOpen } from '../utils/collapse.js';
import { budgetState } from './budget.js';
import { escapeHtml } from '../utils/dom.js';

export const explorerState = {
  drone: 'all',
  category: 'all',
  query: '',
  sort: 'default',
  expanded: false // "Expand all": also applies to cards a later filter brings into view
};

const SORTERS = {
  'price-asc': (a, b) => a.priceUsd - b.priceUsd,
  'price-desc': (a, b) => b.priceUsd - a.priceUsd,
  'weight-asc': (a, b) => a.weightGrams - b.weightGrams
};

function matchesQuery(part, query) {
  if (!query) return true;
  const hay = [part.name, part.gotchas, part.category].join(' ').toLowerCase();
  return query.toLowerCase().split(/\s+/).filter(Boolean).every((t) => hay.includes(t));
}

/** A photo when the part has one (parts.js `image`), otherwise its line drawing. Decorative: the name sits next to it. */
function partPicture(part) {
  if (part.image) return `<img src="${escapeHtml(part.image)}" alt="" loading="lazy" decoding="async" />`;
  const art = PART_ART[part.id] || PART_ART_BY_CATEGORY[part.category];
  return art ? `<svg class="part-art" viewBox="0 0 120 120" aria-hidden="true" focusable="false">${art}</svg>` : '';
}

const LINK_GROUPS = [
  { label: 'Buy', types: ['buy'] },
  { label: 'Search stores', types: ['search'] },
  { label: 'Reference', types: ['specs', 'guide'] }
];

/** The card's one primary action: the first product page, or the first store search when there is none. */
function primaryLink(part) {
  return part.links.find((l) => l.type === 'buy') || part.links.find((l) => l.type === 'search');
}

/** "Buy: Pyrodrone ($82.99)" → "Pyrodrone ($82.99)"; short = also drop the bracketed note, for the button. */
function storeName(label, short) {
  const name = label.replace(/^[^:]{2,20}:\s*/, '');
  return short ? name.replace(/\s*\(.*\)\s*$/, '') : name;
}

function budgetTag(id) {
  const inBudget = budgetState.enabled[id] !== false;
  return `<span class="part-budget${inBudget ? ' in' : ''}" data-part-budget="${id}">${inBudget ? 'In budget' : 'Not in budget'}</span>`;
}

const CATEGORY_LABELS = {
  frame: 'Frame', motors: 'Motors', stack: 'FC & ESC', vtx: 'Video', 'radio-rx': 'Radio & receiver',
  'gps-safety': 'GPS, LEDs & safety', 'props-batts': 'Props & batteries', 'goggles-charge': 'Goggles & charging', 'bench-tools': 'Tools'
};

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
    countLabel.textContent = `Showing ${filtered.length} of ${PARTS_DATA.length} parts`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="stage-placeholder">
        No parts match${explorerState.query ? ` "${escapeHtml(explorerState.query)}"` : ''} with these filters. Clear the search or set Build and Category to "All".
      </div>
    `;
    return;
  }

  const droneBadgeMap = {
    '5inch': { label: '5″ freestyle', cls: 'badge-cyan' },
    'cinewhoop': { label: '3″ cinewhoop', cls: 'badge-amber' },
    'shared': { label: 'Shared gear', cls: 'badge' },
    'tools': { label: 'Tools', cls: 'badge' }
  };

  container.innerHTML = filtered.map((part) => {
    const badgeInfo = droneBadgeMap[part.drone] || { label: part.drone, cls: 'badge' };
    const cta = primaryLink(part);
    const groupsHtml = LINK_GROUPS.map((group) => {
      const links = part.links.filter((l) => group.types.includes(l.type));
      if (!links.length) return '';
      return `
        <div class="link-group">
          <span class="link-group-label">${group.label}</span>
          <div class="part-links-row">
            ${links.map((lnk) => `<a href="${lnk.url}" target="_blank" rel="noopener noreferrer" class="ext-link-pill type-${lnk.type}" aria-label="${escapeHtml(lnk.label)} (opens in new tab)"><span>${escapeHtml(storeName(lnk.label, false))}</span></a>`).join('')}
          </div>
        </div>`;
    }).join('');
    const key = `part-${part.id}`;

    return `
      <article class="part-card" id="${key}">
        <div class="part-main">
          <div class="part-thumb${part.image ? ' is-photo' : ''}">${partPicture(part)}</div>
          <div class="part-info">
            <div class="part-tags">
              <span class="badge ${badgeInfo.cls}">${badgeInfo.label}</span>
              <span class="part-cat">${CATEGORY_LABELS[part.category] || part.category}</span>
              ${budgetTag(part.id)}
            </div>
            <h3 class="part-title">${part.name}</h3>
          </div>
          <div class="part-buy">
            <div class="part-price-box">
              <div class="part-price"><span class="part-price-est">est.</span>$${part.priceUsd.toFixed(2)}</div>
              <div class="part-weight">≈ ${part.weightGrams} g</div>
            </div>
            ${cta ? `<a class="btn btn-primary part-cta${cta.type === 'buy' ? '' : ' is-search'}" href="${cta.url}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(cta.label)} (opens in new tab)">${cta.type === 'buy' ? 'Buy at' : 'Find at'} ${escapeHtml(storeName(cta.label, true))} <span aria-hidden="true">↗</span></a>` : ''}
          </div>
        </div>

        <details class="part-more" data-collapse-key="${key}" data-desktop-open="false"${openAttr(key, explorerState.expanded, explorerState.expanded)}>
          <summary class="part-more-summary">
            <span class="part-more-warn" aria-hidden="true">!</span>
            <span>Watch out</span>
            <span class="part-more-sep" aria-hidden="true">·</span>
            <span class="part-more-links">all ${part.links.length} links</span>
          </summary>
          <div class="part-more-body">
            <div class="part-callout gotcha">
              <strong>Watch out</strong> ${part.gotchas}
            </div>
            <div class="part-link-groups">
              ${groupsHtml}
              <div class="part-verified-meta">
                <span>Source: ${part.verifiedSource} · checked ${part.verifiedDate}</span>
                ${/estimate/i.test(part.verifiedSource) ? '<span class="data-needed" title="Price is a bundle or search estimate, not a single verified listing">[DATA NEEDED] price is an estimate</span>' : ''}
              </div>
            </div>
          </div>
        </details>
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
  const expandBtn = document.getElementById('partsExpandAllBtn');
  if (expandBtn) {
    expandBtn.addEventListener('click', () => {
      const open = !explorerState.expanded;
      explorerState.expanded = open;
      setAllOpen('#partsGridContainer .part-more', open);
      expandBtn.setAttribute('aria-pressed', String(open));
      expandBtn.textContent = open ? 'Collapse all' : 'Expand all';
    });
  }
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

  // Keep the "In budget" tags in step with the Budget chapter's ticks.
  document.addEventListener('budget:change', () => {
    document.querySelectorAll('[data-part-budget]').forEach((tag) => {
      tag.outerHTML = budgetTag(tag.dataset.partBudget);
    });
  });

  renderPartsExplorer();
}
