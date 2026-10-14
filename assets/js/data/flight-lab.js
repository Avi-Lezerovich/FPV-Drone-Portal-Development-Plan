/**
 * Flight Lab inputs. Every number here is a typical estimate, not a measurement:
 * weigh your own quad and packs, and read real current draw from the OSD (mAh used / flight time).
 */

// Fraction of rated capacity you plan to use (landing around 3.5 V/cell resting keeps packs healthy).
export const USABLE_CAPACITY = 0.8;
// Shown as a ± band around the flight-time estimate.
export const FLIGHT_TIME_SPREAD = 0.15;
// The CAAI registration threshold, applied to real takeoff weight.
export const REGISTRATION_THRESHOLD_G = 250;

export const LAB_BUILDS = {
  '5inch': {
    label: '5" 6S Freestyle',
    dryGrams: 425, // frame + stack + O4 Pro + GPS + RX + buzzer + props, no battery
    scaleMaxGrams: 800,
    cells: 6,
    chemistry: 'lipo',
    batteries: [
      { id: '6s1100', label: '6S 1100 mAh LiPo', mAh: 1100, grams: 180 },
      { id: '6s1200', label: '6S 1200 mAh LiPo', mAh: 1200, grams: 195 },
      { id: '6s1300', label: '6S 1300 mAh LiPo', mAh: 1300, grams: 215 }
    ],
    styles: [
      { id: 'cruise', label: 'Cruising / smooth lines', amps: 8 },
      { id: 'freestyle', label: 'Freestyle', amps: 13 },
      { id: 'aggressive', label: 'Aggressive / bando punches', amps: 20 }
    ],
    defaults: { battery: '6s1200', style: 'freestyle', extras: 10 }
  },
  cinewhoop: {
    label: '3" 4S Cinewhoop',
    dryGrams: 193, // Cinelog30 V3 O4 Pro (~187 g) + LED strips (~6 g)
    scaleMaxGrams: 400,
    cells: 4,
    chemistry: 'lihv',
    batteries: [
      { id: '4s660', label: '4S 660 mAh LiHV', mAh: 660, grams: 72 },
      { id: '4s720', label: '4S 720 mAh LiHV', mAh: 720, grams: 78 }
    ],
    styles: [
      { id: 'cruise', label: 'Slow cruise / walk-throughs', amps: 4.5 },
      { id: 'cine', label: 'Cinematic', amps: 5.5 },
      { id: 'punchy', label: 'Punchy / windy outdoors', amps: 8 }
    ],
    defaults: { battery: '4s720', style: 'cine', extras: 3 }
  }
};

// Betaflight QuadX motor layout. Directions are for the default "props in" setup;
// "props out" (Motor direction is reversed = ON) flips every motor.
export const MOTOR_LAYOUT = [
  { id: 'M4', position: 'Front left', x: 70, y: 70, propsIn: 'CW' },
  { id: 'M2', position: 'Front right', x: 230, y: 70, propsIn: 'CCW' },
  { id: 'M3', position: 'Rear left', x: 70, y: 230, propsIn: 'CCW' },
  { id: 'M1', position: 'Rear right', x: 230, y: 230, propsIn: 'CW' }
];

export const CELL_VOLTAGES = {
  lipo: { label: 'LiPo', full: 4.2, storage: 3.85, nominal: 3.7 },
  lihv: { label: 'LiHV', full: 4.35, storage: 3.85, nominal: 3.8 }
};
// Same land / warning thresholds for both chemistries (resting voltage).
export const LAND_CELL_V = 3.5;
export const CRITICAL_CELL_V = 3.3;
