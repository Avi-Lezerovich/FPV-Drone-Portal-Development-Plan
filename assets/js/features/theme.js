/** Light/dark theme toggle (initial theme is applied inline in <head> to avoid a flash). */

import { SAFE_STORAGE } from '../utils/storage.js';

export function initThemeController() {
  const htmlEl = document.documentElement;
  const toggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const themeLabel = document.getElementById('themeLabel');

  const savedTheme = htmlEl.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  htmlEl.setAttribute('data-theme', savedTheme);

  const ICONS = {
    // Shown icon = the theme you switch TO.
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>'
  };

  function updateThemeUI(theme) {
    if (!themeIcon || !themeLabel) return;
    const target = theme === 'light' ? 'dark' : 'light';
    themeIcon.innerHTML = target === 'dark' ? ICONS.moon : ICONS.sun;
    themeLabel.textContent = `Switch to ${target} theme`;
    if (toggleBtn) toggleBtn.setAttribute('aria-label', `Switch to ${target} theme`);
  }

  updateThemeUI(savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = htmlEl.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      htmlEl.setAttribute('data-theme', next);
      SAFE_STORAGE.set('rta_theme', next);
      updateThemeUI(next);
    });
  }
}
