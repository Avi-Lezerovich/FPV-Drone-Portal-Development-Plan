/** Pre-flight checklist and the collapsible troubleshooting FAQ. */

import { FAQ_DATA } from '../data/faq.js';
import { PREFLIGHT_CARDS_DATA } from '../data/preflight.js';
import { withFocusRestored } from '../utils/dom.js';
import { SAFE_STORAGE } from '../utils/storage.js';

export let preflightState = SAFE_STORAGE.get('rta_preflight_checks_v1', {});

export function renderPreflightSection() {
  const container = document.getElementById('preflightCardsContainer');
  const countEl = document.getElementById('preflightMasterCount');
  const barFill = document.getElementById('preflightBarFill');
  const barWrap = document.getElementById('preflightBarWrap');
  if (!container) return;

  let total = 0;
  let done = 0;
  PREFLIGHT_CARDS_DATA.forEach((card) => {
    card.tasks.forEach((t) => {
      total++;
      if (preflightState[t.id]) done++;
    });
  });

  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  document.dispatchEvent(new CustomEvent('progress:change', { detail: { key: 'preflight', done, total } }));
  if (countEl) countEl.textContent = `${done} of ${total} checks done · ${pct}%`;
  if (barFill) barFill.style.width = `${pct}%`;
  if (barWrap) barWrap.setAttribute('aria-valuenow', String(pct));

  container.innerHTML = PREFLIGHT_CARDS_DATA.map((card) => {
    const cardDone = card.tasks.filter((t) => Boolean(preflightState[t.id])).length;
    const itemsHtml = card.tasks.map((t) => {
      const isChecked = Boolean(preflightState[t.id]);
      return `
        <li class="phase-task-item ${isChecked ? 'done' : ''}">
          <label class="phase-task-label">
            <input type="checkbox" class="bom-checkbox" data-pf-check="${t.id}" ${isChecked ? 'checked' : ''} />
            <span>
              <strong class="task-title-text">${t.title}</strong>
              <span class="task-detail-text">${t.detail}</span>
            </span>
          </label>
        </li>
      `;
    }).join('');

    return `
      <article class="preflight-card">
        <div>
          <div class="row-between">
            <span class="badge ${card.badgeClass}">${card.badge}</span>
            <span class="mono">${cardDone}/${card.tasks.length}</span>
          </div>
          <h3 class="part-title">${card.title}</h3>
          <ul class="phase-task-list">
            ${itemsHtml}
          </ul>
        </div>
      </article>
    `;
  }).join('');

}

export function initPreflightAndFaq() {
  const checkAllBtn = document.getElementById('preflightCheckAllBtn');
  const resetBtn = document.getElementById('preflightResetBtn');
  const faqContainer = document.getElementById('faqAccordionContainer');
  const expandAllBtn = document.getElementById('faqExpandAllBtn');
  const collapseAllBtn = document.getElementById('faqCollapseAllBtn');
  const pfContainer = document.getElementById('preflightCardsContainer');

  if (pfContainer) {
    pfContainer.addEventListener('change', (e) => {
      const id = e.target.getAttribute('data-pf-check');
      if (!id) return;
      preflightState[id] = e.target.checked;
      SAFE_STORAGE.set('rta_preflight_checks_v1', preflightState);
      withFocusRestored(pfContainer, ['data-pf-check'], renderPreflightSection);
    });
  }

  if (checkAllBtn) {
    checkAllBtn.addEventListener('click', () => {
      PREFLIGHT_CARDS_DATA.forEach((c) => c.tasks.forEach((t) => { preflightState[t.id] = true; }));
      SAFE_STORAGE.set('rta_preflight_checks_v1', preflightState);
      renderPreflightSection();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      preflightState = {};
      SAFE_STORAGE.set('rta_preflight_checks_v1', preflightState);
      renderPreflightSection();
    });
  }

  if (faqContainer) {
    faqContainer.innerHTML = FAQ_DATA.map((item, idx) => {
      const isOpen = idx === 0;
      return `
        <div class="faq-item ${isOpen ? 'open' : ''}" data-faq-item="${item.id}" id="${item.id}">
          <button type="button" class="faq-trigger" id="${item.id}-btn" aria-expanded="${isOpen ? 'true' : 'false'}" aria-controls="${item.id}-body">
            <span>
              <span class="badge ${item.tagCls}">${item.tag}</span>
              <span>${item.question}</span>
            </span>
            <span class="faq-chevron" aria-hidden="true">▼</span>
          </button>
          <div class="faq-body" id="${item.id}-body" role="region" aria-labelledby="${item.id}-btn">
            <p>${item.answer}</p>
            <div class="faq-ref">
              <a href="${item.guideUrl}" target="_blank" rel="noopener noreferrer" class="ext-link-pill type-guide">
                <span class="link-kind">Guide</span><span>${item.guideLabel}</span>
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');

    faqContainer.querySelectorAll('.faq-trigger').forEach((btn) => {
      btn.addEventListener('click', () => {
        const parent = btn.closest('.faq-item');
        const nowOpen = !parent.classList.contains('open');
        parent.classList.toggle('open', nowOpen);
        btn.setAttribute('aria-expanded', nowOpen ? 'true' : 'false');
      });
    });
  }

  if (expandAllBtn && faqContainer) {
    expandAllBtn.addEventListener('click', () => {
      faqContainer.querySelectorAll('.faq-item').forEach((el) => {
        el.classList.add('open');
        const btn = el.querySelector('.faq-trigger');
        if (btn) btn.setAttribute('aria-expanded', 'true');
      });
    });
  }

  if (collapseAllBtn && faqContainer) {
    collapseAllBtn.addEventListener('click', () => {
      faqContainer.querySelectorAll('.faq-item').forEach((el) => {
        el.classList.remove('open');
        const btn = el.querySelector('.faq-trigger');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  renderPreflightSection();
}
