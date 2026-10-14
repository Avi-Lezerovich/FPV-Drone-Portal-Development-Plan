/** Small, accessible toast notifications (one polite live region, auto-dismiss). */

let region = null;
let hideTimer = null;

function ensureRegion() {
  if (region) return region;
  region = document.createElement('div');
  region.className = 'toast';
  region.setAttribute('role', 'status');
  region.setAttribute('aria-live', 'polite');
  document.body.appendChild(region);
  return region;
}

export function showToast(message, tone = 'ok') {
  const el = ensureRegion();
  el.textContent = message;
  el.dataset.tone = tone;
  el.classList.add('show');
  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => el.classList.remove('show'), 2400);
}
