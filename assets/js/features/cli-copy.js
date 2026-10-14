/** Copy button for the Betaflight CLI snippet. */

import { copyTextSafe } from '../utils/clipboard.js';

export function initCliCopy() {
  const copyBtn = document.getElementById('copyBfCliBtn');
  const codeBlock = document.getElementById('bfCliCodeBlock');
  if (copyBtn && codeBlock) {
    copyBtn.addEventListener('click', () => {
      copyTextSafe(codeBlock.textContent.trim(), copyBtn, '✓ CLI Copied!');
    });
  }
}
