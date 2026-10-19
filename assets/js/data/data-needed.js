/** Hand-maintained open items; more are derived automatically from the data. */

export const STATIC_DATA_NEEDED = [
  { where: 'Betaflight', text: 'osd_canvas_width / osd_canvas_height are not in the Betaflight 2025.12 CLI reference. If the CLI rejects them on 2025.12 or 2026.6, skip them: the "OSD for DJI" preset with Set HDOSD is the documented route.', href: '#sw-5' },
  { where: 'Betaflight', text: 'Prop direction for the Cinelog30 V3: confirm GEPRC\'s factory setting (props in or props out) in your diff all backup before changing the motor direction.', href: '#software-bf' },
  { where: 'Flight Lab', text: 'Battery weights, dry weights and average-current profiles are typical values. Replace them with your scale readings and the OSD mAh-used ÷ flight time from your first packs (assets/js/data/flight-lab.js).', href: '#lab' },
  { where: 'Links', text: 'Link check on 19 Oct 2026: every link loads except GetFPV, T-Hobby and Drone-FPV-Racer, which block automated checkers. Click those once before you rely on them.', href: '#parts' },
  { where: 'Rules', text: 'Israeli drone rules (registration weight, altitude limit, licence) could not be confirmed from an official CAAI source. Check the CAAI before the maiden.', href: '#preflight' }
];
