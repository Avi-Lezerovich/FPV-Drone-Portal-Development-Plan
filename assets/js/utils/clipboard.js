/** Clipboard copy with a legacy fallback and button feedback. */

export function copyTextSafe(text, buttonEl, successLabel = '✓ Copied!') {
  const originalLabel = buttonEl ? (buttonEl.dataset.label || (buttonEl.dataset.label = buttonEl.textContent)) : '';
  const restore = () => {
    if (buttonEl) {
      setTimeout(() => { buttonEl.textContent = originalLabel; }, 2000);
    }
  };

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      if (buttonEl) buttonEl.textContent = successLabel;
      restore();
    }).catch(() => legacyCopy());
    return;
  }
  legacyCopy();

  function legacyCopy() {
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    if (buttonEl) buttonEl.textContent = successLabel;
    restore();
  } catch (err) {
    if (buttonEl) buttonEl.textContent = 'Select & Ctrl+C';
    restore();
  }
  }
}
