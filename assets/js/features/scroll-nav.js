/** Active-chapter nav tracking, scroll reveal and back-to-top. */

export function initScrollAndNav() {
  const sections = document.querySelectorAll('section.chapter-section');
  const navPills = document.querySelectorAll('.nav-pill[data-section]');
  const revealEls = document.querySelectorAll('.reveal');
  const backToTopBtn = document.getElementById('backToTopBtn');

  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navPills.forEach((pill) => {
            const isActive = pill.getAttribute('data-section') === id;
            pill.classList.toggle('active', isActive);
            if (isActive) {
              pill.setAttribute('aria-current', 'location');
              document.dispatchEvent(new CustomEvent('chapter:change', {
                detail: { id, num: pill.querySelector('.toc-num')?.textContent || '', label: pill.querySelector('.toc-num + span')?.textContent || '' }
              }));
            } else {
              pill.removeAttribute('aria-current');
            }
          });
        }
      });
    }, { rootMargin: '-25% 0px -65% 0px', threshold: 0 });

    sections.forEach((sec) => navObserver.observe(sec));

    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  // Reading progress bar along the bottom edge of the sticky header (rAF-throttled).
  const progress = document.getElementById('readProgress');
  let ticking = false;
  const onScroll = () => {
    ticking = false;
    if (backToTopBtn) backToTopBtn.classList.toggle('show', window.scrollY > 480);
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    }
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  }, { passive: true });
  onScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
