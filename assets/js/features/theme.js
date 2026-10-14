/** Light/dark theme toggle (initial theme is applied inline in <head> to avoid a flash). */

import { SAFE_STORAGE } from '../utils/storage.js';

export function initThemeController() {
  const htmlEl = document.documentElement;
  const toggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const themeLabel = document.getElementById('themeLabel');

  const savedTheme = htmlEl.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  htmlEl.setAttribute('data-theme', savedTheme);

  function updateThemeUI(theme) {
    if (!themeIcon || !themeLabel) return;
    if (toggleBtn) toggleBtn.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    if (theme === 'light') {
      themeIcon.textContent = '☾';
      themeLabel.textContent = 'DARK';
    } else {
      themeIcon.textContent = '☀';
      themeLabel.textContent = 'LIGHT';
    }
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
