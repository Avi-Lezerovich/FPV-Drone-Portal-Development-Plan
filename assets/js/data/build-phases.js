/** Build timeline phases and their checklist tasks. */

export const BUILD_PHASES_DATA = [
  {
    id: 'phase-1-frame',
    number: 'PHASE 01',
    title: 'Carbon Prep, Dry-Fit & Mechanical Assembly (5" Vapor-X5)',
    badge: '5" FREESTYLE // ~45 MIN',
    badgeClass: 'badge-cyan',
    tasks: [
      {
        id: 'p1-t1',
        title: 'Chamfer & Rinse Carbon Fiber Edges',
        detail: 'Lightly sand sharp arm and side-plate edges under running water (never breathe dry carbon dust) so sharp carbon cannot slice battery straps or 30AWG silicone insulation.'
      },
      {
        id: 'p1-t2',
        title: 'Assemble Vapor-X5 5mm Arms & Center Plates with Blue Loctite 243',
        detail: 'Apply a tiny drop of medium Blue Loctite 243 to metal-to-metal M3 frame bolts only. Keep Loctite completely away from polycarbonate props, camera cages, or TPU mounts!'
      },
      {
        id: 'p1-t3',
        title: 'Mount 4× RCinPower Wasp Major 1860KV Motors & Check Screw Clearance',
        detail: 'Thread M3 motor screws through the 5mm arms and visually inspect that the screw tips DO NOT touch the copper stator windings inside the motor base.'
      },
      {
        id: 'p1-t4',
        title: 'Install Silicone Stack Gummies on M3 Standoffs',
        detail: 'Seat the T-Hobby V70A 4-in-1 ESC on the bottom M3 stack screws with the XT60 pads facing the rear tail (or side per your pigtail routing), ensuring zero carbon contact underneath.'
      }
    ]
  },
  {
    id: 'phase-2-solder',
    number: 'PHASE 02',
    title: 'Powertrain Soldering: XT60, 35V Capacitor & Motor Phases',
    badge: '5" FREESTYLE // ~75 MIN',
    badgeClass: 'badge-amber',
    tasks: [
      {
        id: 'p2-t1',
        title: 'Set Iron (Pinecil V2 / Aixun T3A) to 380°C–410°C & Pre-Tin ESC Pads',
        detail: 'Use a wide chisel tip, syringe flux, and 63/37 leaded rosin-core solder. Tin all 12 motor pads and the large BAT+ / BAT- pads until they form shiny, rounded domes.'
      },
      {
        id: 'p2-t2',
        title: 'Solder 12AWG XT60 Pigtail & Panasonic 35V 1000µF Low-ESR Capacitor',
        detail: 'CRITICAL POLARITY CHECK: Solder Red wire + Capacitor Positive (+) to ESC BAT+, and Black wire + Capacitor Negative (- stripe) to ESC BAT-. Insulate exposed capacitor legs with heat shrink!'
      },
      {
        id: 'p2-t3',
        title: 'Route & Solder 12× Motor Wires to V70A ESC Pads',
        detail: 'Route the 3 wires from each Wasp Major motor neatly along the carbon arm, trim with 2–3mm slack for vibration relief, pre-tin ends, and solder to the 3 pads per corner (rotation direction is set later in Betaflight).'
      },
      {
        id: 'p2-t4',
        title: 'Inspect for Solder Bridges & Clean Flux Residue with 99% IPA',
        detail: 'Brush away sticky flux with isopropyl alcohol and a toothbrush. Verify zero stray solder balls landed between the MOSFETs or FC ribbon connector pins.'
      }
    ]
  },
  {
    id: 'phase-3-peripherals',
    number: 'PHASE 03',
    title: 'Flight Controller Stack, ELRS RP3, M10 GPS & VIFLY Buzzer',
    badge: '5" FREESTYLE // ~60 MIN',
    badgeClass: 'badge-cyan',
    tasks: [
      {
        id: 'p3-t1',
        title: 'Mount Velox F7 SE FC (Arrow Forward) & Connect 8-Pin ESC Ribbon',
        detail: 'Verify the physical orientation arrow on the Velox F7 SE points straight toward the nose. Click the 8-pin JST-SH ribbon cable securely between ESC and FC.'
      },
      {
        id: 'p3-t2',
        title: 'Solder RadioMaster RP3 V2 ELRS Receiver to UART2 (TX↔RX Crossed)',
        detail: 'Solder RP3 5V→FC 5V, GND→GND, RP3 TX→FC RX2, and RP3 RX→FC TX2. Mount the dual T-antennas at 90° to each other (one horizontal under front arm, one vertical on rear).'
      },
      {
        id: 'p3-t3',
        title: 'Solder Holybro / Matek M10 GPS + Compass to UART3 & I2C Pads',
        detail: 'Wire GPS 5V→FC 4V5 (so GPS powers up from USB on the bench!), GND→GND, GPS TX→FC RX3, GPS RX→FC TX3, and Compass SDA→SDA / SCL→SCL (straight through).'
      },
      {
        id: 'p3-t4',
        title: 'Solder VIFLY Finder 2 Self-Powered Buzzer (5V, GND, BZ-)',
        detail: 'Connect Finder 2 Red→FC 5V, Black→FC GND, and Yellow→FC BZ-. Secure the buzzer in the rear TPU mount where you can reach its physical disarm button.'
      }
    ]
  },
  {
    id: 'phase-4-o4-leds',
    number: 'PHASE 04',
    title: 'DJI O4 Air Unit Pro Installation & Cinelog30 V3 Dusk LED Mod',
    badge: 'BOTH DRONES // ~60 MIN',
    badgeClass: 'badge-emerald',
    tasks: [
      {
        id: 'p4-t1',
        title: 'Remove the Yellow DJI SBUS Wire from the 6-Pin VTX Harness',
        detail: 'Because both drones use ExpressLRS on UART2, gently lift the plastic locking tab on the 6-pin DJI JST-SH plug with an X-Acto tip and pull out the Yellow SBUS/HDL wire so it cannot conflict with UART2.'
      },
      {
        id: 'p4-t2',
        title: 'Mount DJI O4 Air Unit Pro, Soft-Mount Camera & Lock Dual U.FL Antennas',
        detail: 'Plug the 6-pin harness into the FC HD socket (9V/VBAT power—NEVER 5V!). Seat the 20mm O4 Pro camera in the silicone-damped CNC cage so it does not touch hard carbon, and lock the dual U.FL antennas.'
      },
      {
        id: 'p4-t3',
        title: 'Cinelog30 V3 Mod: Cut & Tin 5V WS2812B Addressable LED Strips (16–24 LEDs)',
        detail: 'Cut two matching segments (e.g., 8–12 LEDs per side) along the copper cut-lines. Pre-tin the 5V, GND, and DIN/DOUT pads and solder flexible 30AWG silicone wire.'
      },
      {
        id: 'p4-t4',
        title: 'Cinelog30 V3 Mod: Solder 30AWG Leads to TAKER F722 AIO (5V, GND, LED)',
        detail: 'Verify the printed arrow on Strip #1 points AWAY from the solder joint (DIN→DOUT). Solder 5V, GND, and LED data pad on the AIO, then daisy-chain Strip #1 DOUT to Strip #2 DIN.'
      }
    ]
  },
  {
    id: 'phase-5-bench-safety',
    number: 'PHASE 05',
    title: 'Multimeter Continuity, VIFLY ShortSaver V2 & Mechanical Lockup',
    badge: 'CRITICAL SAFETY // ~25 MIN',
    badgeClass: 'badge-danger',
    tasks: [
      {
        id: 'p5-t1',
        title: 'PROPS OFF: Multimeter Continuity & Resistance Check on XT60 / XT30',
        detail: 'Remove all propellers! Set your multimeter to continuity/resistance mode across the main battery plug: verify there is NO dead short (a brief beep for 0.5s as the 1000µF capacitor charges is normal, then resistance must climb to kilo-ohms).'
      },
      {
        id: 'p5-t2',
        title: 'Check Continuity Between Motor Screw Heads & Carbon / Phase Pads',
        detail: 'Touch one multimeter probe to each motor mounting screw head and the other probe to the 3 motor solder pads on the ESC. Zero continuity confirms no screw is shorting a stator winding.'
      },
      {
        id: 'p5-t3',
        title: 'First Power-Up with VIFLY ShortSaver V2 Electronic Smoke Stopper Inline',
        detail: 'Set the VIFLY ShortSaver V2 to 1A threshold, plug it between your 6S/4S battery and the quad, and switch it on. Confirm solid green LED, normal 3+2 startup chimes, and O4 Pro status LED without tripping.'
      },
      {
        id: 'p5-t4',
        title: 'Secure Top Plate, Sticky Battery Pad, Kevlar Straps & Weigh on Digital Scale',
        detail: 'Mount the top plate, ensure the battery strap cannot pinch flight controller ribbons, and weigh both completed quads WITH flight batteries on a digital scale (confirming both are >250g for CAAI registration).'
      }
    ]
  }
];
