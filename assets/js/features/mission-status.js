/** Hero mission strip: live budget, build %, pre-flight % and open-item count, driven by DOM events from other features. */

const CIRCUMFERENCE = 2 * Math.PI * 15.5;
const $ = (id) => document.getElementById(id);

function setRing(id, pct) {
  const ring = $(id);
  if (!ring) return;
  ring.style.strokeDasharray = `${CIRCUMFERENCE}`;
  ring.style.strokeDashoffset = `${CIRCUMFERENCE * (1 - pct / 100)}`;
}

function onProgress({ detail }) {
  const pct = detail.total ? Math.round((detail.done / detail.total) * 100) : 0;
  if (detail.key === 'build') {
    $('missionBuild').textContent = `${pct}%`;
    $('missionBuildSub').textContent = `${detail.done} of ${detail.total} bench tasks`;
    setRing('missionBuildRing', pct);
  } else if (detail.key === 'preflight') {
    $('missionFly').textContent = `${pct}%`;
    $('missionFlySub').textContent = `${detail.done} of ${detail.total} pre-flight checks`;
    setRing('missionFlyRing', pct);
  }
}

function onBudget({ detail }) {
  if (!detail) return;
  $('missionBudget').textContent = `$${Math.round(detail.grandUsd).toLocaleString('en-US')}`;
  $('missionBudgetSub').textContent = `≈ ₪${detail.grandIls.toLocaleString('en-US')} · ${detail.activeCount} items, incl. est. VAT`;
}

/** Must run before the features that emit these events. */
export function initMissionStatus() {
  if (!$('missionBudget')) return;
  setRing('missionBuildRing', 0);
  setRing('missionFlyRing', 0);
  document.addEventListener('progress:change', onProgress);
  document.addEventListener('budget:change', onBudget);
  document.addEventListener('dataneeded:change', ({ detail }) => { $('missionOpen').textContent = String(detail.count); });
}
