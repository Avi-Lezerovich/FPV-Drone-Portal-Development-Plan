/** Hero HUD: a small simulated OSD (timer, altitude, voltage sag). Stays static with reduced motion or when off-screen. */

export function initHeroHud() {
  const timer = document.getElementById('hudTimer');
  const alt = document.getElementById('hudAlt');
  const volt = document.getElementById('hudVolt');
  if (!timer || !alt || !volt) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    timer.textContent = '01:24';
    alt.textContent = 'ALT 32m';
    return;
  }

  let seconds = 0;
  let visible = true;
  const tick = () => {
    if (!visible || document.hidden) return;
    seconds = (seconds + 1) % 300; // loop every 5 minutes, like a pack
    const t = seconds;
    timer.textContent = `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;
    const altitude = Math.round(28 + 16 * Math.sin(t / 7) + 4 * Math.sin(t / 2.3)); // stays under the 50 m ceiling
    alt.textContent = `ALT ${altitude}m`;
    const cell = 4.15 - (t / 300) * 0.6 - (Math.sin(t / 2.3) > 0.6 ? 0.18 : 0); // sag on "punches"
    volt.textContent = `${(cell * 6).toFixed(1)}V`;
  };
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(timer.closest('svg'));
  }
  setInterval(tick, 1000);
}
