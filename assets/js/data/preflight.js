/** Pre-flight checklist cards. */

export const PREFLIGHT_CARDS_DATA = [
  {
    id: 'pf-bench-failsafe',
    badge: 'Bench · props off',
    badgeClass: 'badge-danger',
    title: '1. Bench & radio failsafe test',
    tasks: [
      {
        id: 'pf-1',
        title: 'Props off + smoke stopper continuity pass',
        detail: 'Verify all propellers are removed and VIFLY ShortSaver V2 shows solid green on initial 6S / 4S pack plug-in.'
      },
      {
        id: 'pf-2',
        title: 'Live radio power-off failsafe test',
        detail: 'With props OFF, arm the quad at idle spin, then hold the power button on your TX15 Max / Boxer to shut off the radio: confirm motors disarm within 1.5s and OSD flashes FAILSAFE.'
      },
      {
        id: 'pf-3',
        title: 'Check Betaflight arming disable flags',
        detail: 'In Betaflight Setup tab, verify the only active flag when connected via USB is CLI / MSP—zero RX_FAILSAFE, ACC_CAL, or DSHOT_TELEM errors.'
      },
      {
        id: 'pf-4',
        title: 'Format the U3/V30 microSD card in Goggles 3 & O4 Pro',
        detail: 'Format both microSD cards inside the DJI Goggles 3 menu and verify Canvas Mode is set to HD (53×20).'
      }
    ]
  },
  {
    id: 'pf-maiden-hover',
    badge: 'Line of sight',
    badgeClass: 'badge-amber',
    title: '2. Maiden hover & 30 s thermal check',
    tasks: [
      {
        id: 'pf-5',
        title: 'Verify props-out blade orientation & locknuts',
        detail: 'Confirm leading (high) edges of front props sweep OUTWARD away from the O4 Pro lens and M5 nyloc nuts / M2 T-mount screws are snug.'
      },
      {
        id: 'pf-6',
        title: 'Spotter briefed & takeoff area clear',
        detail: 'Brief your visual observer (stands next to you, watches the quad, calls hazards), check wind direction, and make sure no uninvolved people are in or near the flight area.'
      },
      {
        id: 'pf-7',
        title: 'Line-of-sight pop-up & 30-second hover test',
        detail: 'Arm in Acro (or Angle), hover 1.5m off the ground for 30 seconds listening for oscillations, then disarm and touch all 4 motor bells—they must be cool or barely warm.'
      },
      {
        id: 'pf-8',
        title: 'Goggles down: check cell voltage sag & ELRS LQ',
        detail: 'Put on DJI Goggles 3, perform a gentle punch-out under the 50m ceiling, and verify LQ stays at 100% and battery sag recovers cleanly.'
      }
    ]
  },
  {
    id: 'pf-gps-rescue',
    badge: '5″ only',
    badgeClass: 'badge-cyan',
    title: '3. Live GPS Rescue field test',
    tasks: [
      {
        id: 'pf-9',
        title: 'Acquire 12+ M10 satellites before arming',
        detail: 'Wait until the OSD satellite counter reads ≥12 sats and the Home Point lock icon stops blinking before flipping the Arm switch.'
      },
      {
        id: 'pf-10',
        title: 'Verify the OSD home arrow & distance at 100 m out',
        detail: 'Fly 80–120m away in a straight line and confirm the OSD Home Arrow points directly back toward your standing position.'
      },
      {
        id: 'pf-11',
        title: 'Engage the GPS Rescue mode switch on AUX2',
        detail: 'At >100m distance and ~25m altitude, flip AUX2 to GPS Rescue: confirm the quad pitches level, turns nose-home, and climbs/cruises back at your set 40–45m rescue ceiling.'
      },
      {
        id: 'pf-12',
        title: 'Take back manual Acro control before landing',
        detail: 'Once the quad approaches within 20m, flip AUX2 back to Acro mode, wiggle sticks to resume manual flight, and land normally.'
      }
    ]
  }
];
