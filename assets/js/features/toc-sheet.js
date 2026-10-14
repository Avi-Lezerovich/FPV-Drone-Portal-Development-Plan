/**
 * Phones and tablets: the chapter list lives in a bottom sheet opened from the top bar,
 * which shows the chapter you are reading. On desktop the same <nav> is a sticky sidebar.
 */

const DESKTOP = window.matchMedia('(min-width: 1100px)');

export function initTocSheet() {
  const toggle = document.getElementById('tocToggle');
  const nav = document.getElementById('chapterNav');
  const backdrop = document.getElementById('tocBackdrop');
  const closeBtn = document.getElementById('tocClose');
  if (!toggle || !nav) return;

  const isOpen = () => nav.classList.contains('open');
  const setOpen = (open, { focus = true } = {}) => {
    if (DESKTOP.matches) open = false;
    nav.classList.toggle('open', open);
    document.body.classList.toggle('sheet-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    if (backdrop) backdrop.hidden = !open;
    if (open) {
      nav.setAttribute('role', 'dialog');
      nav.setAttribute('aria-modal', 'true');
      (nav.querySelector('.nav-pill.active') || nav.querySelector('.nav-pill'))?.focus({ preventScroll: true });
    } else {
      nav.removeAttribute('role');
      nav.removeAttribute('aria-modal');
      if (focus) toggle.focus({ preventScroll: true });
    }
  };

  toggle.addEventListener('click', () => setOpen(!isOpen()));
  closeBtn?.addEventListener('click', () => setOpen(false));
  backdrop?.addEventListener('click', () => setOpen(false));
  nav.addEventListener('click', (e) => { if (e.target.closest('.nav-pill') && isOpen()) setOpen(false, { focus: false }); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && isOpen()) setOpen(false); });
  DESKTOP.addEventListener('change', () => { if (isOpen()) setOpen(false, { focus: false }); });

  document.addEventListener('chapter:change', ({ detail }) => {
    document.getElementById('tocToggleNum').textContent = detail.num;
    document.getElementById('tocToggleLabel').textContent = detail.label;
  });
}
