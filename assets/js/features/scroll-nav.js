/** Reading progress through the open chapter, back-to-top, and pausing the home drawing off screen. */

export function initScrollAndNav() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  const progress = document.getElementById('readProgress');

  let ticking = false;
  const onScroll = () => {
    ticking = false;
    if (backToTopBtn) backToTopBtn.classList.toggle('show', window.scrollY > 640);
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    }
  };
  const requestUpdate = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  };
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });
  document.addEventListener('chapter:change', requestUpdate);
  onScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // The spinning props in the home drawing only animate while the drawing is on screen.
  const blueprint = document.querySelector('.home .blueprint');
  if (blueprint && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      blueprint.classList.toggle('is-paused', !entry.isIntersecting);
    }).observe(blueprint);
  }
}
