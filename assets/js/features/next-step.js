/**
 * Home screen "next step": once you have started a checklist, a card names the next unticked task
 * (build first, then pre-flight) and links straight to it. Driven by `progress:change`.
 */

import { BUILD_PHASES_DATA } from '../data/build-phases.js';
import { PREFLIGHT_CARDS_DATA } from '../data/preflight.js';
import { buildChecklistState } from './build-timeline.js';
import { preflightState } from './preflight-faq.js';

const $ = (id) => document.getElementById(id);

/** First unticked task in a list of groups, with where it sits. */
function firstOpen(groups, state) {
  let done = 0;
  let total = 0;
  let next = null;
  groups.forEach((group) => group.tasks.forEach((task) => {
    total++;
    if (state[task.id]) done++;
    else if (!next) next = { task, group };
  }));
  return { next, done, total };
}

function update() {
  const card = $('nextStep');
  if (!card) return;
  const build = firstOpen(BUILD_PHASES_DATA, buildChecklistState);
  const fly = firstOpen(PREFLIGHT_CARDS_DATA, preflightState);

  // Before any tick, the Start / Continue buttons above are the next step.
  if (build.done === 0 && fly.done === 0) {
    card.hidden = true;
    return;
  }
  let label;
  let title;
  let meta;
  let href;
  if (build.next) {
    label = 'Next on the bench';
    title = build.next.task.title;
    meta = `${build.next.group.number} · ${build.done} of ${build.total} build tasks done`;
    href = `#task-${build.next.task.id}`;
  } else if (fly.next) {
    label = 'Build done. Next pre-flight check';
    title = fly.next.task.title;
    meta = `${fly.next.group.badge} · ${fly.done} of ${fly.total} checks done`;
    href = `#task-${fly.next.task.id}`;
  } else {
    label = 'Every check is ticked';
    title = 'Ready for the maiden. Fly with a spotter.';
    meta = `${build.total} build tasks and ${fly.total} pre-flight checks done`;
    href = '#preflight';
  }
  $('nextStepLabel').textContent = label;
  $('nextStepTitle').textContent = title;
  $('nextStepMeta').textContent = meta;
  card.href = href;
  card.classList.toggle('is-done', !build.next && !fly.next);
  card.hidden = false;
}

/** Must run before the checklists render (they announce their first progress while rendering). */
export function initNextStep() {
  if (!$('nextStep')) return;
  document.addEventListener('progress:change', update);
}
