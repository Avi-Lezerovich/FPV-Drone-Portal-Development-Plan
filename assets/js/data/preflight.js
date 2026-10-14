/** Pre-flight checklist cards. */

export const PREFLIGHT_CARDS_DATA = [
  {
    id: 'pf-bench-failsafe',
    badge: 'STAGE 01 // PROPS OFF',
    badgeClass: 'badge-danger',
    title: '1. Bench & Radio Failsafe Test',
    tasks: [
      {
        id: 'pf-1',
        title: 'Props Off + Smoke Stopper Continuity Pass',
        detail: 'Verify all propellers are removed and VIFLY ShortSaver V2 shows solid green on initial 6S / 4S pack plug-in.'
      },
      {
        id: 'pf-2',
        title: 'Live Radio Power-Off Failsafe Test',
        detail: 'With props OFF, arm the quad at idle spin, then hold the power button on your TX15 Max / Boxer to shut off the radio: confirm motors disarm within 1.5s and OSD flashes FAILSAFE.'
      },
      {
        id: 'pf-3',
        title: 'Check Betaflight Arming Disable Flags',
        detail: 'In Betaflight Setup tab, verify the only active flag when connected via USB is CLI / MSP—zero RX_FAILSAFE, ACC_CAL, or DSHOT_TELEM errors.'
      },
      {
        id: 'pf-4',
        title: 'Format U3/V30 microSD Card in Goggles 3 & O4 Pro',
        detail: 'Format both microSD cards inside the DJI Goggles 3 menu and verify Canvas Mode is set to HD (53×20).'
      }
    ]
  },
  {
    id: 'pf-maiden-hover',
    badge: 'STAGE 02 // LINE OF SIGHT',
    badgeClass: 'badge-amber',
    title: '2. Maiden Hover & 30s Thermal Check',
    tasks: [
      {
        id: 'pf-5',
        title: 'Verify "Props Out" Blade Orientation & Locknuts',
        detail: 'Confirm leading (high) edges of front props sweep OUTWARD away from the O4 Pro lens and M5 nyloc nuts / M2 T-mount screws are snug.'
      },
      {
        id: 'pf-6',
        title: 'Spotter Briefed & Clear Takeoff Area',
        detail: 'Brief your visual observer (stands next to you, watches the quad, calls hazards), check wind direction, and make sure no uninvolved people are in or near the flight area. See Chapter 10 for the spotter and distance rules.'
      },
      {
        id: 'pf-7',
        title: 'Line-of-Sight Pop-Up & 30-Second Hover Test',
        detail: 'Arm in Acro (or Angle), hover 1.5m off the ground for 30 seconds listening for oscillations, then disarm and touch all 4 motor bells—they must be cool or barely warm.'
      },
      {
        id: 'pf-8',
        title: 'Goggles Down: Check Cell Voltage Sag & ELRS LQ',
        detail: 'Put on DJI Goggles 3, perform a gentle punch-out under the 50m ceiling, and verify LQ stays at 100% and battery sag recovers cleanly.'
      }
    ]
  },
  {
    id: 'pf-gps-rescue',
    badge: 'STAGE 03 // 5" GPS RESCUE',
    badgeClass: 'badge-cyan',
    title: '3. Live GPS Rescue Field Test',
    tasks: [
      {
        id: 'pf-9',
        title: 'Acquire 12+ M10 Satellites Before Arming',
        detail: 'Wait until the OSD satellite counter reads ≥12 sats and the Home Point lock icon stops blinking before flipping the Arm switch.'
      },
      {
        id: 'pf-10',
        title: 'Verify OSD Home Arrow & Distance at 100m Out',
        detail: 'Fly 80–120m away in a straight line and confirm the OSD Home Arrow points directly back toward your standing position.'
      },
      {
        id: 'pf-11',
        title: 'Engage GPS Rescue Mode Switch on AUX2',
        detail: 'At >100m distance and ~25m altitude, flip AUX2 to GPS Rescue: confirm the quad pitches level, turns nose-home, and climbs/cruises back at your set 40–45m rescue ceiling.'
      },
      {
        id: 'pf-12',
        title: 'Reclaim Manual Acro Control Before Landing',
        detail: 'Once the quad approaches within 20m, flip AUX2 back to Acro mode, wiggle sticks to resume manual flight, and land normally.'
      }
    ]
  }
];
