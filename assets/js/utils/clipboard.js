/** Clipboard copy with a legacy fallback, button feedback and a toast. */

import { showToast } from './toast.js';

function legacyCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  const ok = document.execCommand('copy');
  document.body.removeChild(ta);
  return ok;
}

export async function copyTextSafe(text, buttonEl, successLabel = '✓ Copied!') {
  const originalLabel = buttonEl ? (buttonEl.dataset.label || (buttonEl.dataset.label = buttonEl.textContent)) : '';
  let ok = false;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      ok = true;
    } else {
      ok = legacyCopy(text);
    }
  } catch {
    try { ok = legacyCopy(text); } catch { ok = false; }
  }

  if (buttonEl) {
    buttonEl.textContent = ok ? successLabel : 'Select & Ctrl+C';
    setTimeout(() => { buttonEl.textContent = originalLabel; }, 2000);
  }
  showToast(ok ? 'Copied to clipboard' : 'Copy blocked by the browser. Select the text and press Ctrl+C.', ok ? 'ok' : 'warn');
  return ok;
}
