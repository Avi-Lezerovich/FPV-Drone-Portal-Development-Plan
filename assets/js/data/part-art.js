/**
 * Line drawings of each part, in the same blueprint style as the hero drawing (120 × 120 viewBox).
 * Colours come from CSS classes so they follow the theme: no class = ink outline,
 * f = surface fill, a = accent outline, af = accent fill, w = warning outline, wf = warning fill.
 * Keyed by part id; PART_ART_BY_CATEGORY covers parts added later without their own drawing.
 * A part with an `image` field in parts.js shows that photo instead.
 */

const PROP3 = (cx, cy, r) => {
  const blade = (deg) => `<path class="f" transform="rotate(${deg} ${cx} ${cy})" d="M${cx} ${cy} C${cx - r * 0.28} ${cy - r * 0.35} ${cx - r * 0.22} ${cy - r * 0.9} ${cx} ${cy - r} C${cx + r * 0.24} ${cy - r * 0.86} ${cx + r * 0.2} ${cy - r * 0.35} ${cx} ${cy}Z" />`;
  return `${blade(0)}${blade(120)}${blade(240)}<circle class="af" cx="${cx}" cy="${cy}" r="${r * 0.16}" />`;
};

const FRAME_5IN = `
  <path d="M26 26L94 94M94 26L26 94" stroke-width="11" />
  <path d="M26 26L94 94M94 26L26 94" class="cut" stroke-width="6" />
  <rect class="f" x="44" y="36" width="32" height="48" rx="5" />
  <rect class="af" x="50" y="28" width="20" height="13" rx="3" />
  ${[[24, 24], [96, 24], [24, 96], [96, 96]].map(([x, y]) => `<circle class="f" cx="${x}" cy="${y}" r="11" /><circle class="a" cx="${x}" cy="${y}" r="3" />`).join('')}
  <path class="a" d="M52 50h16M52 58h16M52 66h16" />`;

const WHOOP = `
  ${[[33, 33], [87, 33], [33, 87], [87, 87]].map(([x, y]) => `<circle class="f" cx="${x}" cy="${y}" r="23" /><circle cx="${x}" cy="${y}" r="18" stroke-dasharray="3 3" /><path d="M${x} ${y - 15}V${y + 15}M${x - 13} ${y + 7.5}L${x + 13} ${y - 7.5}" stroke-width="2.5" /><circle class="af" cx="${x}" cy="${y}" r="4" />`).join('')}
  <rect class="f" x="45" y="38" width="30" height="44" rx="6" />
  <rect class="af" x="50" y="30" width="20" height="14" rx="3" />
  <circle class="a" cx="60" cy="37" r="3.5" />`;

const MOTORS = `
  <path d="M60 14V30" stroke-width="3" />
  <rect class="af" x="54" y="22" width="12" height="9" rx="2" />
  <rect class="f" x="28" y="32" width="64" height="44" rx="8" />
  <path d="M40 40V68M50 40V68M60 40V68M70 40V68M80 40V68" class="a" />
  <rect class="f" x="34" y="76" width="52" height="10" rx="2" />
  <path class="w" d="M48 86V104M60 86V106M72 86V104" stroke-width="2.5" />
  <text class="t" x="96" y="108" text-anchor="end">×4</text>`;

const STACK = `
  <rect x="30" y="30" width="70" height="70" rx="6" stroke-dasharray="3 3" />
  <rect class="f" x="20" y="20" width="70" height="70" rx="6" />
  ${[[29, 29], [81, 29], [29, 81], [81, 81]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" />`).join('')}
  <rect class="af" x="43" y="43" width="24" height="24" rx="2" />
  <path class="a" d="M47 39v4M55 39v4M63 39v4M47 67v4M55 67v4M63 67v4M39 47h4M39 55h4M39 63h4M67 47h4M67 55h4M67 63h4" />
  <rect class="wf" x="40" y="20" width="30" height="7" rx="1" />`;

const AIR_UNIT = `
  <rect class="f" x="14" y="22" width="34" height="30" rx="5" />
  <circle class="f" cx="31" cy="37" r="11" />
  <circle class="af" cx="31" cy="37" r="5" />
  <path class="a" d="M48 37C60 37 56 64 66 64" stroke-width="3" />
  <rect class="f" x="54" y="58" width="44" height="34" rx="6" />
  <path d="M62 68h28M62 75h28M62 82h28" />
  <path d="M98 64C108 58 104 42 112 34M98 86C108 92 104 104 114 108" />
  <circle class="af" cx="112" cy="34" r="3.5" /><circle class="af" cx="114" cy="108" r="3.5" />`;

const RECEIVER = `
  <path d="M52 44C42 34 34 30 22 20M68 44C78 34 86 30 98 20" />
  <path d="M22 20L12 10M98 20L108 10" class="a" stroke-width="5" />
  <rect class="f" x="44" y="40" width="32" height="40" rx="4" />
  <rect class="af" x="50" y="48" width="20" height="14" rx="2" />
  <circle class="w" cx="60" cy="70" r="3" />
  <path class="w" d="M50 80v22M57 80v24M64 80v24M71 80v22" stroke-width="2.5" />`;

const GPS = `
  <rect class="f" x="24" y="18" width="72" height="72" rx="12" />
  <rect class="af" x="38" y="32" width="44" height="44" rx="4" />
  <circle class="f" cx="60" cy="54" r="7" />
  <path class="a" d="M60 47v-7M60 61v7" />
  <path class="w" d="M48 90v18M56 90v20M64 90v20M72 90v18" stroke-width="2.5" />`;

const BUZZER = `
  <rect class="f" x="16" y="46" width="44" height="40" rx="6" />
  <circle class="af" cx="38" cy="66" r="9" />
  <path class="a" d="M24 38C30 30 46 30 52 38M18 30C28 18 48 18 58 30" />
  <rect class="f" x="74" y="24" width="26" height="56" rx="6" />
  <rect class="wf" x="74" y="34" width="26" height="8" />
  <path d="M82 80v24M92 80v18" stroke-width="2.5" />
  <text class="t" x="87" y="62" text-anchor="middle">35V</text>`;

const LED_STRIP = `
  <path d="M8 50C30 40 30 86 60 76S92 44 112 58" stroke-width="18" />
  <path d="M8 50C30 40 30 86 60 76S92 44 112 58" class="cut" stroke-width="13" />
  ${[[18, 50], [34, 62], [48, 74], [62, 76], [78, 66], [94, 54], [108, 56]].map(([x, y], i) => `<rect class="${i % 2 ? 'wf' : 'af'}" x="${x - 4}" y="${y - 4}" width="8" height="8" rx="2" />`).join('')}
  <path class="w" d="M10 92h20M10 98h20M10 104h20" />
  <path class="a" d="M70 100h28M90 94l8 6-8 6" />`;

const PROPS_BATT_5 = `
  ${PROP3(40, 34, 26)}
  <rect class="f" x="56" y="56" width="52" height="34" rx="5" />
  <rect class="af" x="64" y="64" width="20" height="18" rx="2" />
  <path d="M90 64h10M90 72h10M90 80h10" />
  <path class="w" d="M56 74C40 74 34 86 26 92" stroke-width="3" />
  <rect class="wf" x="12" y="88" width="18" height="14" rx="3" />`;

const PROPS_BATT_3 = `
  <circle class="f" cx="32" cy="32" r="20" />
  <circle cx="32" cy="32" r="14" stroke-dasharray="3 3" />
  ${PROP3(32, 32, 13)}
  <rect class="f" x="16" y="62" width="50" height="30" rx="5" />
  <path class="a" d="M26 70h22M26 78h22M26 86h14" />
  <circle class="f" cx="90" cy="70" r="20" />
  <circle class="af" cx="90" cy="70" r="13" />
  <path class="a" d="M82 62l16 16" />
  <text class="t" x="90" y="104" text-anchor="middle">ND</text>`;

const GOGGLES = `
  <path d="M12 60H4M108 60h8" stroke-width="5" />
  <path class="f" d="M12 44C12 36 18 32 26 32H94C102 32 108 36 108 44V74C108 82 102 88 94 88H74C68 88 66 78 60 78S52 88 46 88H26C18 88 12 82 12 74Z" />
  <circle class="af" cx="38" cy="60" r="13" />
  <circle class="af" cx="82" cy="60" r="13" />
  <path class="a" d="M50 40h20" />`;

const RADIO = `
  <path d="M94 34V10" stroke-width="3" /><circle class="af" cx="94" cy="9" r="3" />
  <path d="M30 34v-8M40 34v-6M80 34v-6" stroke-width="3" />
  <rect class="f" x="14" y="34" width="92" height="64" rx="18" />
  <rect class="af" x="48" y="42" width="24" height="14" rx="2" />
  <circle class="f" cx="38" cy="74" r="12" /><circle class="a" cx="38" cy="74" r="3" />
  <circle class="f" cx="82" cy="74" r="12" /><circle class="a" cx="82" cy="74" r="3" />`;

const CHARGER = `
  <rect class="f" x="12" y="30" width="58" height="56" rx="6" />
  <rect class="af" x="20" y="38" width="42" height="18" rx="2" />
  <circle cx="26" cy="72" r="5" /><circle cx="41" cy="72" r="5" /><circle cx="56" cy="72" r="5" />
  <path class="w" d="M70 58C80 58 78 76 86 76" stroke-width="3" />
  <rect class="f" x="86" y="44" width="24" height="60" rx="4" />
  ${[54, 66, 78, 90].map((y) => `<rect class="wf" x="92" y="${y}" width="12" height="7" rx="1.5" />`).join('')}`;

const SOLDERING = `
  <g transform="rotate(-40 56 60)">
    <rect class="f" x="18" y="52" width="46" height="16" rx="8" />
    <path class="a" d="M28 56v8M36 56v8M44 56v8" />
    <rect class="f" x="64" y="55" width="16" height="10" rx="2" />
    <path d="M80 60H104" stroke-width="3" />
    <path class="w" d="M104 60l6 0" stroke-width="3" />
  </g>
  <circle class="f" cx="88" cy="88" r="16" />
  <circle class="af" cx="88" cy="88" r="6" />
  <path class="w" d="M72 88C60 88 58 100 48 104" stroke-width="2" />`;

const DRIVERS = `
  ${[24, 48, 72].map((x, i) => `<rect class="${i === 1 ? 'af' : 'f'}" x="${x - 8}" y="14" width="16" height="34" rx="6" /><path d="M${x} 48V${96 - i * 6}" stroke-width="3" /><path class="a" d="M${x - 3} ${96 - i * 6}h6" stroke-width="3" />`).join('')}
  <path class="f" d="M98 70l9 5v10l-9 5-9-5V75Z" />
  <circle class="a" cx="98" cy="80" r="3.5" />
  <path class="w" d="M92 102h12" stroke-width="5" />`;

export const PART_ART = {
  '5in-frame-vapor-x5': FRAME_5IN,
  '5in-motors-wasp-major': MOTORS,
  '5in-stack-velox-f7-v70a': STACK,
  '5in-vtx-dji-o4-pro': AIR_UNIT,
  '5in-rx-radiomaster-rp3': RECEIVER,
  '5in-gps-m10': GPS,
  '5in-buzzer-cap': BUZZER,
  '5in-props-batts-spares': PROPS_BATT_5,
  '3in-cinelog30-v3-o4-pro': WHOOP,
  '3in-leds-ws2812b-30awg': LED_STRIP,
  '3in-props-batts-nd': PROPS_BATT_3,
  'shared-dji-goggles-3': GOGGLES,
  'shared-radiomaster-tx15-max': RADIO,
  'shared-charging-station': CHARGER,
  'tools-soldering-diagnostics': SOLDERING,
  'tools-hardware-drivers-consumables': DRIVERS
};

export const PART_ART_BY_CATEGORY = {
  frame: FRAME_5IN,
  motors: MOTORS,
  stack: STACK,
  vtx: AIR_UNIT,
  'radio-rx': RECEIVER,
  'gps-safety': GPS,
  'props-batts': PROPS_BATT_5,
  'goggles-charge': GOGGLES,
  'bench-tools': DRIVERS
};
