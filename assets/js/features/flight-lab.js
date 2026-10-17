/** Flight Lab: weight vs 250 g + flight-time estimator, motor/prop direction visualiser, battery & charging helper. */

import {
  CELL_VOLTAGES, CRITICAL_CELL_V, FLIGHT_TIME_SPREAD, LAB_BUILDS, LAND_CELL_V,
  MOTOR_LAYOUT, REGISTRATION_THRESHOLD_G, USABLE_CAPACITY
} from '../data/flight-lab.js';
import { copyTextSafe } from '../utils/clipboard.js';
import { SAFE_STORAGE } from '../utils/storage.js';

const STORE_KEY = 'rta_lab_v1';
const state = Object.assign({ tab: 'weight', build: '5inch', battery: null, style: null, extras: null, propDir: 'out', motor: 'M1' }, SAFE_STORAGE.get(STORE_KEY, {}));
const save = () => SAFE_STORAGE.set(STORE_KEY, state);
const $ = (id) => document.getElementById(id);
const fmt = (n, d = 1) => n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });

/* ---------- Tabs (WAI-ARIA tabs with arrow keys) ---------- */
function selectTab(key, focus = false) {
  document.querySelectorAll('[data-lab-tab]').forEach((btn) => {
    const on = btn.dataset.labTab === key;
    btn.classList.toggle('active', on);
    btn.setAttribute('aria-selected', String(on));
    btn.tabIndex = on ? 0 : -1;
    if (on && focus) btn.focus();
    const pane = $(btn.getAttribute('aria-controls'));
    if (pane) {
      pane.hidden = !on;
      pane.classList.toggle('active', on);
    }
  });
  state.tab = key;
  save();
}

function initTabs() {
  const tabs = Array.from(document.querySelectorAll('[data-lab-tab]'));
  tabs.forEach((btn, i) => {
    btn.addEventListener('click', () => selectTab(btn.dataset.labTab));
    btn.addEventListener('keydown', (e) => {
      const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (!step) return;
      e.preventDefault();
      selectTab(tabs[(i + step + tabs.length) % tabs.length].dataset.labTab, true);
    });
  });
  selectTab(state.tab);
}

/* ---------- Tool 1: weight & flight time ---------- */
function fillSelect(select, options, selected) {
  select.innerHTML = options.map((o) => `<option value="${o.id}" ${o.id === selected ? 'selected' : ''}>${o.label}</option>`).join('');
}

function syncWeightControls() {
  const build = LAB_BUILDS[state.build];
  if (!build.batteries.some((b) => b.id === state.battery)) state.battery = build.defaults.battery;
  if (!build.styles.some((s) => s.id === state.style)) state.style = build.defaults.style;
  if (state.extras == null) state.extras = build.defaults.extras;
  document.querySelectorAll('input[name="labBuild"]').forEach((r) => { r.checked = r.value === state.build; });
  fillSelect($('labBattery'), build.batteries, state.battery);
  fillSelect($('labStyle'), build.styles.map((s) => ({ id: s.id, label: `${s.label} (~${s.amps} A)` })), state.style);
  $('labExtras').value = state.extras;
}

function renderWeight() {
  const build = LAB_BUILDS[state.build];
  const batt = build.batteries.find((b) => b.id === state.battery);
  const style = build.styles.find((s) => s.id === state.style);
  const extras = Number(state.extras) || 0;
  const auw = build.dryGrams + batt.grams + extras;
  const over = auw > REGISTRATION_THRESHOLD_G;

  $('labExtrasOut').textContent = `${extras} g`;
  $('labAuw').textContent = Math.round(auw);
  const pct = Math.min(100, (auw / build.scaleMaxGrams) * 100);
  const markPct = (REGISTRATION_THRESHOLD_G / build.scaleMaxGrams) * 100;
  $('labGaugeFill').style.width = `${pct}%`;
  $('labGaugeFill').classList.toggle('over', over);
  $('labGaugeMark').style.left = `${markPct}%`;
  $('labGaugeLabel').setAttribute('aria-label', `Estimated takeoff weight ${Math.round(auw)} grams on a scale to ${build.scaleMaxGrams} grams. The 250 gram registration line is marked.`);
  $('labRegBadge').innerHTML = over
    ? `<span class="badge badge-amber">${Math.round(auw - REGISTRATION_THRESHOLD_G)} g over 250 g</span> Weigh it with the battery to confirm.`
    : `<span class="badge badge-emerald">${Math.round(REGISTRATION_THRESHOLD_G - auw)} g under 250 g</span> Confirm on a real scale, because a few grams matter here.`;

  const chem = CELL_VOLTAGES[build.chemistry];
  const minutes = ((batt.mAh / 1000) * USABLE_CAPACITY / style.amps) * 60;
  const lo = minutes * (1 - FLIGHT_TIME_SPREAD);
  const hi = minutes * (1 + FLIGHT_TIME_SPREAD);
  $('labTime').textContent = `${fmt(lo)}–${fmt(hi)} min`;
  $('labAmps').textContent = `~${style.amps} A`;
  $('labWh').textContent = `${fmt(build.cells * chem.nominal * batt.mAh / 1000)} Wh`;
  $('labBattShare').textContent = `${Math.round((batt.grams / auw) * 100)}% of AUW`;
}

function initWeightTool() {
  syncWeightControls();
  document.querySelectorAll('input[name="labBuild"]').forEach((r) => r.addEventListener('change', () => {
    state.build = r.value;
    state.battery = null;
    state.style = null;
    state.extras = null;
    syncWeightControls();
    renderWeight();
    save();
  }));
  $('labBattery').addEventListener('change', (e) => { state.battery = e.target.value; renderWeight(); save(); });
  $('labStyle').addEventListener('change', (e) => { state.style = e.target.value; renderWeight(); save(); });
  $('labExtras').addEventListener('input', (e) => { state.extras = Number(e.target.value); renderWeight(); save(); });
  renderWeight();
}

/* ---------- Tool 2: motor order & prop direction ---------- */
const spinOf = (motor) => (state.propDir === 'in' ? motor.propsIn : (motor.propsIn === 'CW' ? 'CCW' : 'CW'));

function arrowPath(x, y, dir) {
  // 270° arc around the motor with an arrowhead showing the spin direction (viewed from above).
  const r = 44;
  return dir === 'CW'
    ? `M${x} ${y - r} A${r} ${r} 0 1 1 ${x - r} ${y}`
    : `M${x} ${y - r} A${r} ${r} 0 1 0 ${x + r} ${y}`;
}

function renderMotors() {
  const g = $('motorNodes');
  g.innerHTML = MOTOR_LAYOUT.map((m) => {
    const dir = spinOf(m);
    const selected = m.id === state.motor;
    const end = dir === 'CW' ? [m.x - 44, m.y] : [m.x + 44, m.y];
    // Both arcs end moving upward (CW ends on the left, CCW on the right), so the head points up.
    const head = `M${end[0] - 6} ${end[1] + 8} L${end[0]} ${end[1]} L${end[0] + 6} ${end[1] + 8}`;
    return `
      <g class="motor-node ${selected ? 'selected' : ''}" data-motor="${m.id}" role="button" tabindex="0"
         aria-pressed="${selected}" aria-label="${m.id}, ${m.position}, spins ${dir === 'CW' ? 'clockwise' : 'counter-clockwise'}">
        <circle class="motor-disc" cx="${m.x}" cy="${m.y}" r="38" />
        <g class="prop ${dir === 'CW' ? 'cw' : 'ccw'}">
          <circle cx="${m.x}" cy="${m.y}" r="34" class="prop-bounds" />
          <path d="M${m.x} ${m.y} l0 -34 M${m.x} ${m.y} l29.4 17 M${m.x} ${m.y} l-29.4 17" />
        </g>
        <path class="spin-arrow ${dir.toLowerCase()}" d="${arrowPath(m.x, m.y, dir)}" />
        <path class="spin-arrow ${dir.toLowerCase()}" d="${head}" />
        <circle class="motor-bell" cx="${m.x}" cy="${m.y}" r="13" />
        <text x="${m.x}" y="${m.y + 4}" text-anchor="middle" class="motor-label">${m.id}</text>
      </g>`;
  }).join('');

  const sel = MOTOR_LAYOUT.find((m) => m.id === state.motor) || MOTOR_LAYOUT[3];
  const selDir = spinOf(sel);
  $('motorTitle').textContent = `${sel.id} · ${sel.position}`;
  $('motorDetail').innerHTML = `Spins <strong>${selDir === 'CW' ? 'clockwise (CW)' : 'counter-clockwise (CCW)'}</strong> seen from above. Fit a <strong>${selDir} prop</strong> (on HQProp, CW props usually carry an "R" mark). The leading edge, the thicker and higher edge of the blade, faces the direction of rotation.`;
  $('motorTableBody').innerHTML = [...MOTOR_LAYOUT].sort((a, b) => a.id.localeCompare(b.id)).map((m) => `
    <tr class="${m.id === state.motor ? 'is-selected' : ''}"><td><strong>${m.id}</strong></td><td>${m.position}</td><td>${spinOf(m)}</td><td>${spinOf(m)}${spinOf(m) === 'CW' ? ' (R)' : ''}</td></tr>`).join('');
  $('motorBfHint').textContent = [
    `Motor direction is reversed: ${state.propDir === 'out' ? 'ON  (props out)' : 'OFF (props in)'}`,
    '',
    'PROPS OFF, battery through a smoke stopper. Then:',
    '1. Motors tab → enable test mode.',
    '2. Spin M1..M4 one at a time and confirm the position matches.',
    '3. Wrong direction? Use the Motor Direction wizard',
    '   (DShot command, no resoldering needed).'
  ].join('\n');
}

function initMotorTool() {
  document.querySelectorAll('input[name="propDir"]').forEach((r) => {
    r.checked = r.value === state.propDir;
    r.addEventListener('change', () => { state.propDir = r.value; renderMotors(); save(); });
  });
  const g = $('motorNodes');
  const pick = (node) => {
    if (!node) return;
    state.motor = node.dataset.motor;
    save();
    renderMotors();
    g.querySelector(`[data-motor="${state.motor}"]`)?.focus();
  };
  g.addEventListener('click', (e) => pick(e.target.closest('[data-motor]')));
  g.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      pick(e.target.closest('[data-motor]'));
    }
  });
  renderMotors();
}

/* ---------- Tool 3: battery & charging ---------- */
const battState = Object.assign({ chem: 'lipo', cells: 6, mAh: 1200, packs: 1, rate: 1 }, SAFE_STORAGE.get('rta_lab_batt_v1', {}));

function renderBattery() {
  const chem = CELL_VOLTAGES[battState.chem];
  const { cells, mAh, packs, rate } = battState;
  const amps = (mAh / 1000) * rate * packs;
  const fullV = chem.full * cells;
  const watts = amps * fullV;

  $('battPacksOut').textContent = String(packs);
  $('battRateOut').textContent = `${fmt(rate)}C`;
  $('battFull').textContent = `${fmt(fullV, 2)} V`;
  $('battStorage').textContent = `${fmt(chem.storage * cells, 2)} V`;
  $('battLand').textContent = `${fmt(LAND_CELL_V * cells, 1)} V`;
  $('battAmps').textContent = `${fmt(amps)} A`;
  $('battWatts').textContent = `~${Math.ceil(watts)} W`;
  $('battWh').textContent = `${fmt(cells * chem.nominal * mAh / 1000 * packs)} Wh`;

  const warnings = [];
  if (packs > 1) warnings.push(['warn', `Parallel charging: same cell count only, every pack within 0.1 V/cell of the others before connecting, fused board only. The charger sees one ${packs * mAh} mAh pack.`]);
  if (rate > 1) warnings.push(['warn', `${fmt(rate)}C is above the 1C default. Check that the pack's label allows it, and never fast-charge a puffed or warm pack.`]);
  if (watts > 200) warnings.push(['bad', `~${Math.ceil(watts)} W per channel. Many chargers limit AC-mode output (e.g. 100–200 W). Check your charger's spec or charge fewer packs at once.`]);
  if (battState.chem === 'lihv') warnings.push(['info', 'Select the LiHV mode on the charger. Charging a normal LiPo to 4.35 V/cell is a fire risk.']);
  warnings.push(['info', `Store at ${fmt(chem.storage * cells, 2)} V if you will not fly within ~2 days. Charge and store in a LiPo bag, never unattended.`]);
  $('battWarnings').innerHTML = warnings.map(([tone, text]) => `<p class="batt-warn ${tone}">${text}</p>`).join('');

  $('battCli').textContent = [
    `# ${cells}S ${chem.label}: OSD/beeper alarms (units: 0.01 V per cell)`,
    `set vbat_warning_cell_voltage = ${Math.round(LAND_CELL_V * 100)}`,
    `set vbat_min_cell_voltage = ${Math.round(CRITICAL_CELL_V * 100)}`,
    ...(battState.chem === 'lihv'
      ? ['# If a fully charged LiHV pack is read as the wrong cell count,', '# raise the detection limit (default 430):', 'set vbat_max_cell_voltage = 440']
      : []),
    'save'
  ].join('\n');
  SAFE_STORAGE.set('rta_lab_batt_v1', battState);
}

function syncBatteryControls() {
  document.querySelectorAll('input[name="battChem"]').forEach((r) => { r.checked = r.value === battState.chem; });
  $('battCells').value = String(battState.cells);
  $('battMah').value = battState.mAh;
  $('battPacks').value = battState.packs;
  $('battRate').value = battState.rate;
}

function initBatteryTool() {
  syncBatteryControls();
  document.querySelectorAll('input[name="battChem"]').forEach((r) => r.addEventListener('change', () => { battState.chem = r.value; renderBattery(); }));
  $('battCells').addEventListener('change', (e) => { battState.cells = Number(e.target.value); renderBattery(); });
  $('battMah').addEventListener('input', (e) => {
    const v = Number(e.target.value);
    if (v >= 100 && v <= 10000) { battState.mAh = v; renderBattery(); }
  });
  $('battPacks').addEventListener('input', (e) => { battState.packs = Number(e.target.value); renderBattery(); });
  $('battRate').addEventListener('input', (e) => { battState.rate = Number(e.target.value); renderBattery(); });
  document.querySelectorAll('[data-batt-preset]').forEach((btn) => btn.addEventListener('click', () => {
    const [cells, mAh, chem] = btn.dataset.battPreset.split(',');
    Object.assign(battState, { cells: Number(cells), mAh: Number(mAh), chem });
    syncBatteryControls();
    renderBattery();
  }));
  $('copyBattCliBtn').addEventListener('click', (e) => copyTextSafe($('battCli').textContent, e.currentTarget, '✓ Copied'));
  renderBattery();
}

export function initFlightLab() {
  if (!$('lab')) return;
  document.querySelectorAll('#lab form').forEach((f) => f.addEventListener('submit', (e) => e.preventDefault()));
  initTabs();
  initWeightTool();
  initMotorTool();
  initBatteryTool();
}
