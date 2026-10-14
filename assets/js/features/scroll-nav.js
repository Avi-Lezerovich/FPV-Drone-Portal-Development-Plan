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
              const nav = pill.parentElement;
              if (nav && nav.scrollWidth > nav.clientWidth) {
                nav.scrollTo({ left: pill.offsetLeft - nav.clientWidth / 2 + pill.offsetWidth / 2, behavior: 'auto' });
              }
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

  window.addEventListener('scroll', () => {
    if (backToTopBtn) {
      backToTopBtn.classList.toggle('show', window.scrollY > 480);
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
