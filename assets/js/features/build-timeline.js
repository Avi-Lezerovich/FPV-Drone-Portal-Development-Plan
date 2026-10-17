/** Build timeline: persistent checklists and progress bars. */

import { BUILD_PHASES_DATA } from '../data/build-phases.js';
import { openAttr } from '../utils/collapse.js';
import { withFocusRestored } from '../utils/dom.js';
import { SAFE_STORAGE } from '../utils/storage.js';

export let buildChecklistState = SAFE_STORAGE.get('rta_build_checks_v1', {});

export function renderBuildTimeline() {
  const container = document.getElementById('buildTimelineContainer');
  const countEl = document.getElementById('buildMasterCount');
  const barFill = document.getElementById('buildMasterBarFill');
  const barWrap = document.getElementById('buildMasterBarWrap');
  if (!container) return;

  let totalTasks = 0;
  let completedTasks = 0;

  BUILD_PHASES_DATA.forEach((phase) => {
    phase.tasks.forEach((t) => {
      totalTasks++;
      if (buildChecklistState[t.id]) completedTasks++;
    });
  });

  const pct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  document.dispatchEvent(new CustomEvent('progress:change', { detail: { key: 'build', done: completedTasks, total: totalTasks } }));
  if (countEl) {
    countEl.textContent = `${completedTasks} of ${totalTasks} tasks done · ${pct}%`;
  }
  if (barFill) {
    barFill.style.width = `${pct}%`;
  }
  if (barWrap) {
    barWrap.setAttribute('aria-valuenow', String(pct));
  }

  // Only the first unfinished phase starts open, so the page opens on the work that is next.
  const firstOpen = BUILD_PHASES_DATA.find((p) => p.tasks.some((t) => !buildChecklistState[t.id]));
  container.innerHTML = BUILD_PHASES_DATA.map((phase) => {
    const phaseTotal = phase.tasks.length;
    const phaseDone = phase.tasks.filter((t) => Boolean(buildChecklistState[t.id])).length;
    const phasePct = Math.round((phaseDone / phaseTotal) * 100);
    const isPhaseComplete = phaseDone === phaseTotal;

    const tasksHtml = phase.tasks.map((task) => {
      const isDone = Boolean(buildChecklistState[task.id]);
      return `
        <li class="phase-task-item ${isDone ? 'done' : ''}">
          <label class="phase-task-label">
            <input type="checkbox" class="bom-checkbox" data-build-check="${task.id}" ${isDone ? 'checked' : ''} />
            <span>
              <strong class="task-title-text">${task.title}</strong>
              <span class="task-detail-text">${task.detail}</span>
            </span>
          </label>
        </li>
      `;
    }).join('');

    return `
      <details class="phase-card ${isPhaseComplete ? 'completed' : ''}" data-collapse-key="${phase.id}"${openAttr(phase.id, phase === firstOpen, phase === firstOpen)}>
        <summary class="card-summary">
        <div class="phase-header">
          <div>
            <div>
              <span class="badge ${phase.badgeClass}">${phase.number}</span>
              <span>${phase.badge}</span>
            </div>
            <h3 class="part-title">${phase.title}</h3>
          </div>
          <div>
            ${phaseDone} of ${phaseTotal}
          </div>
        </div>

        <div class="progress-bar-track">
          <div class="progress-bar-fill" style="width:${phasePct}%;"></div>
        </div>
        </summary>

        <ul class="phase-task-list">
          ${tasksHtml}
        </ul>
      </details>
    `;
  }).join('');

}

export function initBuildChecklists() {
  const checkAllBtn = document.getElementById('buildCheckAllBtn');
  const resetBtn = document.getElementById('buildResetBtn');
  const container = document.getElementById('buildTimelineContainer');

  if (container) {
    container.addEventListener('change', (e) => {
      const taskId = e.target.getAttribute('data-build-check');
      if (!taskId) return;
      buildChecklistState[taskId] = e.target.checked;
      SAFE_STORAGE.set('rta_build_checks_v1', buildChecklistState);
      withFocusRestored(container, ['data-build-check'], renderBuildTimeline);
    });
  }

  if (checkAllBtn) {
    checkAllBtn.addEventListener('click', () => {
      BUILD_PHASES_DATA.forEach((p) => p.tasks.forEach((t) => { buildChecklistState[t.id] = true; }));
      SAFE_STORAGE.set('rta_build_checks_v1', buildChecklistState);
      renderBuildTimeline();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      buildChecklistState = {};
      SAFE_STORAGE.set('rta_build_checks_v1', buildChecklistState);
      renderBuildTimeline();
    });
  }

  renderBuildTimeline();
}
