/** Active-chapter nav tracking, scroll reveal and back-to-top. */

export function initScrollAndNav() {
  const sections = document.querySelectorAll('section.chapter-section');
  const navPills = document.querySelectorAll('.nav-pill[data-section]');
  const revealEls = document.querySelectorAll('.reveal');
  const backToTopBtn = document.getElementById('backToTopBtn');

  // The current chapter is the last one whose top has passed 30% of the viewport.
  // Computed from positions on every scroll, so it is right in both directions and after jumps
  // (an "entered the band" observer goes stale when two chapters share the band).
  let currentId = null;
  const setCurrent = (id) => {
    if (id === currentId) return;
    currentId = id;
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
  };
  const updateCurrent = () => {
    const line = window.innerHeight * 0.3;
    let id = sections[0]?.id ?? null;
    for (const sec of sections) {
      if (sec.getBoundingClientRect().top > line) break;
      id = sec.id;
    }
    setCurrent(id);
  };

  if ('IntersectionObserver' in window) {
    // Reveal as soon as a chapter's top edge is on screen: chapters are up to 5000 px tall on phones,
    // so a ratio threshold would leave a blank screen while scrolling into one.
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0 });

    revealEls.forEach((el) => revealObserver.observe(el));

    // The spinning props in the opening drawing only animate while the drawing is on screen.
    const blueprint = document.querySelector('.hero .blueprint');
    if (blueprint) {
      new IntersectionObserver(([entry]) => {
        blueprint.classList.toggle('is-paused', !entry.isIntersecting);
      }).observe(blueprint);
    }
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  // Current chapter, back-to-top and the reading progress bar along the header (rAF-throttled).
  const progress = document.getElementById('readProgress');
  let ticking = false;
  const onScroll = () => {
    ticking = false;
    updateCurrent();
    if (backToTopBtn) backToTopBtn.classList.toggle('show', window.scrollY > 480);
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
  onScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
