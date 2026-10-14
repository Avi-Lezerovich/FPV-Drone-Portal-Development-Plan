/** LED_STRIP wiring-order simulator and CLI generator. */

import { LED_PRESETS } from '../data/led-presets.js';
import { copyTextSafe } from '../utils/clipboard.js';

export function renderLedSimulator(presetKey = 'dusk') {
  const preset = LED_PRESETS[presetKey] || LED_PRESETS.dusk;
  const leftGrid = document.getElementById('ledGridLeftDuct');
  const rightGrid = document.getElementById('ledGridRightDuct');
  const descEl = document.getElementById('ledPresetDescText');
  const cliPre = document.getElementById('ledCliCodeBlock');

  if (leftGrid) {
    leftGrid.innerHTML = Array.from({ length: 10 }, (_, idx) => `
      <div class="led-node" style="background:${preset.leftHex}; color:#090D16;" title="Wiring Order #${idx} (Left Duct)">
        #${idx}
      </div>
    `).join('');
  }

  if (rightGrid) {
    rightGrid.innerHTML = Array.from({ length: 10 }, (_, idx) => {
      const num = idx + 10;
      return `
        <div class="led-node" style="background:${preset.rightHex}; color:#090D16;" title="Wiring Order #${num} (Right Duct)">
          #${num}
        </div>
      `;
    }).join('');
  }

  if (descEl) descEl.textContent = preset.desc;
  if (cliPre) cliPre.textContent = preset.cli;
}

export function initLedSimulator() {
  const presetBtns = document.querySelectorAll('[data-led-preset]');
  const copyBtn = document.getElementById('copyLedCliBtn');
  const cliPre = document.getElementById('ledCliCodeBlock');

  presetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-led-preset');
      presetBtns.forEach((b) => b.classList.toggle('active', b === btn));
      renderLedSimulator(key);
    });
  });

  if (copyBtn && cliPre) {
    copyBtn.addEventListener('click', () => {
      copyTextSafe(cliPre.textContent.trim(), copyBtn, '✓ LED CLI Copied!');
    });
  }

  renderLedSimulator('dusk');
}
