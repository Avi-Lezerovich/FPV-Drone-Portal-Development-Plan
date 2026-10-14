/** Small DOM helpers shared by features. */

/* Re-render a container without losing keyboard focus on the control the user just used. */
export function withFocusRestored(container, attrs, renderFn) {
  const active = document.activeElement;
  let restore = null;
  if (container && active && container.contains(active)) {
    const attr = attrs.find((a) => active.hasAttribute(a));
    if (attr) restore = `[${attr}="${active.getAttribute(attr)}"]`;
  }
  renderFn();
  if (restore && container) {
    const el = container.querySelector(restore);
    if (el) el.focus({ preventScroll: true });
  }
}

export function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
