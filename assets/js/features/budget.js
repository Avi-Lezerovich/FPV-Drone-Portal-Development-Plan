/** Budget calculator: totals per drone, USD/ILS, import VAT model, persistence. */

import { BUDGET_ALT_OPTIONS } from '../data/budget-options.js';
import { PARTS_DATA } from '../data/parts.js';
import { withFocusRestored } from '../utils/dom.js';
import { SAFE_STORAGE } from '../utils/storage.js';

export const DEFAULT_BUDGET_STATE = () => {
  const enabledMap = {};
  const selectedAltMap = {};
  PARTS_DATA.forEach((p) => {
    enabledMap[p.id] = true;
    selectedAltMap[p.id] = 'primary';
  });
  return {
    usdIlsRate: 3.75,
    vatRatePct: 18,
    vatMode: 'threshold',
    vatThresholdUsd: 130,
    enabled: enabledMap,
    altChoice: selectedAltMap
  };
};

// Merge saved state over defaults so parts added later (and new fields) get sane values.
export function loadBudgetState() {
  const defaults = DEFAULT_BUDGET_STATE();
  const saved = SAFE_STORAGE.get('rta_budget_v1', null);
  if (!saved || typeof saved !== 'object') return defaults;
  const merged = Object.assign({}, defaults, saved);
  merged.enabled = Object.assign({}, defaults.enabled, saved.enabled || {});
  merged.altChoice = Object.assign({}, defaults.altChoice, saved.altChoice || {});
  if (merged.vatMode === 'smart75') {
    merged.vatMode = 'threshold';
    merged.vatThresholdUsd = 75;
  }
  if (!['threshold', 'all', 'none'].includes(merged.vatMode)) merged.vatMode = 'threshold';
  if (!(Number(merged.vatThresholdUsd) >= 0)) merged.vatThresholdUsd = defaults.vatThresholdUsd;
  return merged;
}

export let budgetState = loadBudgetState();

export const counterNumericCache = {};

export function animateCounter(elId, targetValue, prefix = '$', decimals = 2) {
  const el = document.getElementById(elId);
  if (!el) return;
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const startValue = typeof counterNumericCache[elId] === 'number' ? counterNumericCache[elId] : targetValue;
  counterNumericCache[elId] = targetValue;

  if (prefersReduced || Math.abs(targetValue - startValue) < 0.05) {
    el.textContent = `${prefix}${targetValue.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
    return;
  }

  const duration = 320;
  const startTime = performance.now();

  function tick(now) {
    const elapsed = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - elapsed, 3);
    const current = startValue + (targetValue - startValue) * eased;
    el.textContent = `${prefix}${current.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
    if (elapsed < 1) {
      requestAnimationFrame(tick);
    }
  }
  requestAnimationFrame(tick);
}

export function getResolvedPartSpec(part) {
  const options = BUDGET_ALT_OPTIONS[part.id];
  const chosenKey = (budgetState.altChoice && budgetState.altChoice[part.id]) || 'primary';
  if (options) {
    const match = options.find((o) => o.key === chosenKey) || options[0];
    return {
      priceUsd: match.priceUsd,
      weightGrams: match.weightGrams,
      isAlt: match.key !== 'primary',
      taxFreeLocal: Boolean(match.taxFreeLocal),
      chosenKey: match.key,
      options
    };
  }
  return {
    priceUsd: part.priceUsd,
    weightGrams: part.weightGrams,
    isAlt: false,
    taxFreeLocal: false,
    chosenKey: 'primary',
    options: null
  };
}

export function computeItemVatUsd(priceUsd, taxFreeLocal) {
  if (taxFreeLocal || budgetState.vatMode === 'none') return 0;
  const rate = Math.max(0, Number(budgetState.vatRatePct) || 0) / 100;
  if (budgetState.vatMode === 'threshold' && priceUsd <= (Number(budgetState.vatThresholdUsd) || 0)) {
    return 0;
  }
  return priceUsd * rate;
}

export function renderBudgetCalculator() {
  const tbody = document.getElementById('bomTableBody');
  if (!tbody) return;

  const rate = Math.max(1, Number(budgetState.usdIlsRate) || 3.75);
  let sum5inUsd = 0;
  let sum3inUsd = 0;
  let sumSharedUsd = 0;
  let totalVatUsd = 0;
  let weight5inGrams = 0;
  let weight3inGrams = 0;
  let activeCount = 0;

  const sysLabels = {
    '5inch': { text: '5" Freestyle', cls: 'badge-cyan' },
    'cinewhoop': { text: '3" Cinewhoop', cls: 'badge-amber' },
    'shared': { text: 'Shared Gear', cls: 'badge-emerald' },
    'tools': { text: 'Workbench', cls: 'badge-cyan' }
  };

  tbody.innerHTML = PARTS_DATA.map((part) => {
    const isEnabled = budgetState.enabled[part.id] !== false;
    const spec = getResolvedPartSpec(part);
    const itemVat = isEnabled ? computeItemVatUsd(spec.priceUsd, spec.taxFreeLocal) : 0;

    if (isEnabled) {
      activeCount++;
      totalVatUsd += itemVat;
      if (part.drone === '5inch') {
        sum5inUsd += spec.priceUsd;
        weight5inGrams += spec.weightGrams;
      } else if (part.drone === 'cinewhoop') {
        sum3inUsd += spec.priceUsd;
        weight3inGrams += spec.weightGrams;
      } else {
        sumSharedUsd += spec.priceUsd;
      }
    }

    const badge = sysLabels[part.drone] || { text: part.drone, cls: 'badge-cyan' };
    const ilsPrice = Math.round(spec.priceUsd * rate);
    const vatTag = itemVat > 0
      ? `<span style="color:var(--accent-amber);">+$${itemVat.toFixed(2)} VAT</span>`
      : `<span style="color:var(--accent-emerald);">${spec.taxFreeLocal ? 'Local, VAT incl.' : (budgetState.vatMode === 'none' ? 'No VAT modelled' : `0% VAT (&le;$${Number(budgetState.vatThresholdUsd) || 0})`)}</span>`;

    const selectHtml = spec.options
      ? `<select class="bom-select ${spec.isAlt ? 'is-alt' : ''}" data-bom-alt="${part.id}" aria-label="Select specification for ${part.name}">
          ${spec.options.map((opt) => `<option value="${opt.key}" ${opt.key === spec.chosenKey ? 'selected' : ''}>${opt.label}</option>`).join('')}
        </select>`
      : `<span class="mono" style="font-size:0.74rem; color:var(--text-muted);">Standard Verified Spec</span>`;

    return `
      <tr class="bom-row ${isEnabled ? '' : 'excluded'}">
        <td>
          <label class="bom-check-label">
            <input type="checkbox" class="bom-checkbox" data-bom-check="${part.id}" ${isEnabled ? 'checked' : ''} />
            <div>
              <div style="font-weight:600; font-size:0.88rem; color:var(--text-primary);">${part.name}</div>
              <div class="mono" style="font-size:0.7rem; color:var(--text-muted);">${part.subtitle}</div>
            </div>
          </label>
        </td>
        <td><span class="badge ${badge.cls}">${badge.text}</span></td>
        <td>${selectHtml}</td>
        <td class="mono" style="font-size:0.78rem; color:var(--text-secondary);">~${spec.weightGrams} g</td>
        <td style="text-align:right;">
          <div class="mono" style="font-weight:700; font-size:0.9rem; color:var(--text-primary);">$${spec.priceUsd.toFixed(2)}</div>
          <div class="mono" style="font-size:0.74rem; color:var(--accent-primary);">₪${ilsPrice.toLocaleString('en-US')}</div>
          <div class="mono" style="font-size:0.66rem;">${vatTag}</div>
        </td>
      </tr>
    `;
  }).join('');

  const grandTotalUsd = sum5inUsd + sum3inUsd + sumSharedUsd + totalVatUsd;

  animateCounter('score5inUsd', sum5inUsd, '$', 2);
  animateCounter('score5inIls', Math.round(sum5inUsd * rate), '₪', 0);
  animateCounter('score3inUsd', sum3inUsd, '$', 2);
  animateCounter('score3inIls', Math.round(sum3inUsd * rate), '₪', 0);
  animateCounter('scoreSharedUsd', sumSharedUsd, '$', 2);
  animateCounter('scoreSharedIls', Math.round(sumSharedUsd * rate), '₪', 0);
  animateCounter('scoreGrandUsd', grandTotalUsd, '$', 2);
  animateCounter('scoreGrandIls', Math.round(grandTotalUsd * rate), '₪', 0);

  const w5El = document.getElementById('score5inWeight');
  if (w5El) {
    w5El.textContent = `Est. AUW: ~${weight5inGrams} g (${weight5inGrams > 250 ? '>250g CAAI Reg' : 'Sub-250g'})`;
  }
  const w3El = document.getElementById('score3inWeight');
  if (w3El) {
    w3El.textContent = `Est. AUW: ~${weight3inGrams} g (${weight3inGrams > 250 ? '>250g CAAI Reg' : 'Sub-250g'})`;
  }
  const vatEl = document.getElementById('scoreVatBreakdown');
  if (vatEl) {
    vatEl.textContent = `Est. Import VAT: $${totalVatUsd.toFixed(2)} (₪${Math.round(totalVatUsd * rate).toLocaleString('en-US')})`;
  }
  const countEl = document.getElementById('scoreActiveCount');
  if (countEl) {
    countEl.textContent = `${activeCount} of ${PARTS_DATA.length} component groups active`;
  }

  document.dispatchEvent(new CustomEvent('budget:change', {
    detail: { grandUsd: grandTotalUsd, grandIls: Math.round(grandTotalUsd * rate), activeCount, weight5inGrams, weight3inGrams }
  }));
}

export function saveAndRefreshBudget() {
  SAFE_STORAGE.set('rta_budget_v1', budgetState);
  const statusEl = document.getElementById('budgetSavedStatus');
  if (statusEl) {
    statusEl.textContent = '✓ Saved to local state';
  }
  withFocusRestored(document.getElementById('bomTableBody'), ['data-bom-check', 'data-bom-alt'], renderBudgetCalculator);
}

export function initBudgetCalculator() {
  const tbody = document.getElementById('bomTableBody');
  const thresholdInput = document.getElementById('ilVatThresholdInput');
  if (tbody) {
    tbody.addEventListener('change', (e) => {
      const t = e.target;
      if (t.hasAttribute('data-bom-check')) {
        budgetState.enabled[t.getAttribute('data-bom-check')] = t.checked;
        saveAndRefreshBudget();
      } else if (t.hasAttribute('data-bom-alt')) {
        budgetState.altChoice[t.getAttribute('data-bom-alt')] = t.value;
        saveAndRefreshBudget();
      }
    });
  }
  if (thresholdInput) {
    thresholdInput.value = budgetState.vatThresholdUsd;
    thresholdInput.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      if (!isNaN(val) && val >= 0) {
        budgetState.vatThresholdUsd = val;
        saveAndRefreshBudget();
      }
    });
  }
  const rateInput = document.getElementById('usdIlsRateInput');
  const vatInput = document.getElementById('ilVatRateInput');
  const vatModeSelect = document.getElementById('ilVatModeSelect');
  const resetBtn = document.getElementById('budgetResetBtn');

  if (rateInput) {
    rateInput.value = budgetState.usdIlsRate;
    rateInput.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      if (!isNaN(val) && val >= 1) {
        budgetState.usdIlsRate = val;
        saveAndRefreshBudget();
      }
    });
  }

  if (vatInput) {
    vatInput.value = budgetState.vatRatePct;
    vatInput.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      if (!isNaN(val) && val >= 0) {
        budgetState.vatRatePct = val;
        saveAndRefreshBudget();
      }
    });
  }

  if (vatModeSelect) {
    vatModeSelect.value = budgetState.vatMode || 'threshold';
    vatModeSelect.addEventListener('change', (e) => {
      budgetState.vatMode = e.target.value;
      saveAndRefreshBudget();
    });
  }

  document.querySelectorAll('[data-budget-preset]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const preset = btn.getAttribute('data-budget-preset');
      PARTS_DATA.forEach((p) => {
        if (preset === 'all-primary') {
          budgetState.enabled[p.id] = true;
          budgetState.altChoice[p.id] = 'primary';
        } else if (preset === 'all-value') {
          budgetState.enabled[p.id] = true;
          const opts = BUDGET_ALT_OPTIONS[p.id];
          if (opts && opts.length > 1) {
            const cheapest = opts.reduce((min, o) => (o.priceUsd < min.priceUsd ? o : min), opts[0]);
            budgetState.altChoice[p.id] = cheapest.key;
          }
        } else if (preset === '5inch-only') {
          budgetState.enabled[p.id] = p.drone !== 'cinewhoop';
        } else if (preset === 'cinewhoop-only') {
          budgetState.enabled[p.id] = p.drone !== '5inch';
        } else if (preset === 'drones-only') {
          budgetState.enabled[p.id] = p.drone === '5inch' || p.drone === 'cinewhoop';
        }
      });
      saveAndRefreshBudget();
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      budgetState = DEFAULT_BUDGET_STATE();
      if (rateInput) rateInput.value = budgetState.usdIlsRate;
      if (vatInput) vatInput.value = budgetState.vatRatePct;
      if (vatModeSelect) vatModeSelect.value = budgetState.vatMode;
      if (thresholdInput) thresholdInput.value = budgetState.vatThresholdUsd;
      saveAndRefreshBudget();
    });
  }

  renderBudgetCalculator();
}
