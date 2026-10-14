/** Wiring chapter: accessible tab switcher between the two schematics. */

export function initWiringTabs() {
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
