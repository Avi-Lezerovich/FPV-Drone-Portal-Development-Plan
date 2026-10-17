/** Wiring chapter: per-build connection cards, the wire-colour legend, and the tab switcher between builds. */

import { WIRE_SIGNALS, WIRING_DATA } from '../data/wiring.js';
import { escapeHtml } from '../utils/dom.js';

const DIR_TEXT = { 'to-fc': 'signal into the FC', 'from-fc': 'signal out of the FC' };

function wireRow(w) {
  return `
    <li class="wire-row wire-${w.signal}${w.dir ? ` dir-${w.dir}` : ''}${w.chain ? ' is-chain' : ''}">
      <span class="wire-from">${escapeHtml(w.from)}</span>
      <span class="wire-line" aria-hidden="true"><i></i></span>
      <span class="wire-to">${escapeHtml(w.to)}</span>
      ${w.dir ? `<span class="sr-only">, ${DIR_TEXT[w.dir]}</span>` : ''}
    </li>`;
}

function wireCard(c, i) {
  return `
    <li class="wire-card">
      <header class="wire-head">
        <span class="wire-step" aria-hidden="true">${i + 1}</span>
        <div class="wire-title">
          <h3 class="wire-part">${escapeHtml(c.part)}</h3>
          <p class="wire-dest">to ${escapeHtml(c.to)}</p>
        </div>
        <span class="badge badge-${c.power.tone}">${escapeHtml(c.power.text)}</span>
      </header>
      <div class="wire-cols" aria-hidden="true"><span>Part</span><span>FC</span></div>
      <ul class="wire-list">${c.wires.map(wireRow).join('')}</ul>
      ${c.remove ? `<p class="wire-remove"><span aria-hidden="true">✕</span> ${escapeHtml(c.remove)}</p>` : ''}
      ${c.note ? `<p class="wire-note">${escapeHtml(c.note)}</p>` : ''}
      ${c.betaflight ? `<p class="wire-bf"><span>Betaflight</span> ${escapeHtml(c.betaflight)}</p>` : ''}
    </li>`;
}

function renderWiring() {
  document.querySelectorAll('[data-wiring-build]').forEach((list) => {
    list.innerHTML = (WIRING_DATA[list.dataset.wiringBuild] || []).map(wireCard).join('');
  });
  const legend = document.getElementById('wireLegend');
  if (legend) legend.innerHTML = WIRE_SIGNALS.map((sig) => `<li class="wire-${sig.id}"><span class="wire-swatch" aria-hidden="true"></span>${sig.label}</li>`).join('');
}

export function initWiringTabs() {
  renderWiring();
  const tabBtns = document.querySelectorAll('[data-wiring-tab]');
  const pane5in = document.getElementById('wiring-pane-5inch');
  const paneCine = document.getElementById('wiring-pane-cinewhoop');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-wiring-tab');
      tabBtns.forEach((b) => {
        const isMatch = b.getAttribute('data-wiring-tab') === target;
        b.classList.toggle('active', isMatch);
        b.setAttribute('aria-selected', isMatch ? 'true' : 'false');
        b.setAttribute('tabindex', isMatch ? '0' : '-1');
      });
      if (pane5in && paneCine) {
        pane5in.classList.toggle('active', target === '5inch');
        paneCine.classList.toggle('active', target === 'cinewhoop');
      }
    });
    btn.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const list = Array.from(tabBtns);
      const next = list[(list.indexOf(btn) + (e.key === 'ArrowRight' ? 1 : -1) + list.length) % list.length];
      next.focus();
      next.click();
      e.preventDefault();
    });
  });
}
