/**
 * Wire-by-wire connections for each build, in the order you solder them.
 * Same facts as the schematics and the UART map in index.html; keep them in step.
 * signal colours the wire by what it carries at the FC end:
 *   power (9 V / VBAT / 5 V), gnd, tx (FC TX or SDA), rx (FC RX or SCL), sig (LED, buzzer, SBUS), bus (ribbon).
 * dir: 'to-fc' = signal flows from the part into the FC pad, 'from-fc' = out of the FC pad, '' = power/ground.
 */

export const WIRE_SIGNALS = [
  { id: 'power', label: '9 V / VBAT / 5 V' },
  { id: 'gnd', label: 'GND' },
  { id: 'tx', label: 'FC TX / SDA' },
  { id: 'rx', label: 'FC RX / SCL' },
  { id: 'sig', label: 'LED / buzzer / SBUS' }
];

export const WIRING_DATA = {
  '5inch': [
    {
      part: '6S XT60 lead + 35 V 1000 µF cap',
      to: 'V70A ESC battery pads',
      power: { text: '22.2–25.2 V', tone: 'danger' },
      wires: [
        { from: 'BAT+ (red)', to: 'ESC +', signal: 'power', dir: '' },
        { from: 'BAT− (black)', to: 'ESC −', signal: 'gnd', dir: '' }
      ],
      note: 'Solder the capacitor across the same pads, stripe (−) to ground.'
    },
    {
      part: 'V70A 4-in-1 ESC',
      to: 'FC 8-pin ESC port',
      power: { text: 'Ribbon', tone: 'cyan' },
      wires: [
        { from: '8-pin ribbon', to: 'ESC port', signal: 'bus', dir: '' }
      ],
      note: 'Carries VBAT, GND, current, telemetry (UART4 RX) and M1–M4. Check motor screw length against the windings.'
    },
    {
      part: 'DJI O4 Air Unit Pro',
      to: '6-pin HD port · UART1',
      power: { text: '9 V BEC', tone: 'danger' },
      wires: [
        { from: '9V (red)', to: '9V BEC', signal: 'power', dir: '' },
        { from: 'GND (black)', to: 'GND', signal: 'gnd', dir: '' },
        { from: 'RX (white)', to: 'TX1', signal: 'tx', dir: 'from-fc' },
        { from: 'TX (grey)', to: 'RX1', signal: 'rx', dir: 'to-fc' }
      ],
      remove: 'Yellow SBUS wire: pull it from the plug when flying ELRS.',
      betaflight: 'UART1: MSP on, Peripherals: VTX (MSP + DisplayPort)'
    },
    {
      part: 'RadioMaster RP3 V2 ELRS',
      to: 'UART2 pads',
      power: { text: '5 V', tone: 'emerald' },
      wires: [
        { from: '5V', to: '5V', signal: 'power', dir: '' },
        { from: 'GND', to: 'GND', signal: 'gnd', dir: '' },
        { from: 'TX', to: 'RX2', signal: 'rx', dir: 'to-fc' },
        { from: 'RX', to: 'TX2', signal: 'tx', dir: 'from-fc' }
      ],
      betaflight: 'UART2: Serial Rx on, provider CRSF'
    },
    {
      part: 'M10 GPS + compass',
      to: 'UART3 + I2C pads',
      power: { text: '4V5 / 5 V', tone: 'amber' },
      wires: [
        { from: '5V', to: '4V5 / 5V', signal: 'power', dir: '' },
        { from: 'GND', to: 'GND', signal: 'gnd', dir: '' },
        { from: 'TX', to: 'RX3', signal: 'rx', dir: 'to-fc' },
        { from: 'RX', to: 'TX3', signal: 'tx', dir: 'from-fc' },
        { from: 'SDA', to: 'SDA', signal: 'tx', dir: '' },
        { from: 'SCL', to: 'SCL', signal: 'rx', dir: '' }
      ],
      note: 'SDA and SCL go straight across, not crossed like TX and RX.',
      betaflight: 'UART3: Sensor input GPS, 115200, UBLOX'
    },
    {
      part: 'VIFLY Finder 2 buzzer',
      to: 'FC buzzer pads',
      power: { text: '5 V', tone: 'emerald' },
      wires: [
        { from: '5V (red)', to: '5V', signal: 'power', dir: '' },
        { from: 'GND (black)', to: 'GND', signal: 'gnd', dir: '' },
        { from: 'BZ− (yellow)', to: 'BZ−', signal: 'sig', dir: 'from-fc' }
      ]
    }
  ],
  cinewhoop: [
    {
      part: '4S XT30 lead + 25 V 470 µF cap',
      to: 'TAKER F722 AIO battery pads',
      power: { text: '14.8–17.4 V', tone: 'danger' },
      wires: [
        { from: 'BAT+ (red)', to: 'AIO +', signal: 'power', dir: '' },
        { from: 'BAT− (black)', to: 'AIO −', signal: 'gnd', dir: '' }
      ],
      note: 'Pre-soldered on the BNF. Add the cap if you build from the kit.'
    },
    {
      part: 'ELRS 2.4 GHz receiver',
      to: 'UART2 pads',
      power: { text: '5 V', tone: 'emerald' },
      wires: [
        { from: '5V', to: '4V5 / 5V', signal: 'power', dir: '' },
        { from: 'GND', to: 'GND', signal: 'gnd', dir: '' },
        { from: 'TX', to: 'RX2', signal: 'rx', dir: 'to-fc' },
        { from: 'RX', to: 'TX2', signal: 'tx', dir: 'from-fc' }
      ],
      note: 'Pre-wired on the BNF.',
      betaflight: 'UART2: Serial Rx on, provider CRSF'
    },
    {
      part: 'DJI O4 Air Unit Pro',
      to: 'DJI JST port · UART1',
      power: { text: '9 V / VBAT', tone: 'danger' },
      wires: [
        { from: '9V (red)', to: '9V / VBAT', signal: 'power', dir: '' },
        { from: 'GND (black)', to: 'GND', signal: 'gnd', dir: '' },
        { from: 'RX (white)', to: 'TX1', signal: 'tx', dir: 'from-fc' },
        { from: 'TX (grey)', to: 'RX1', signal: 'rx', dir: 'to-fc' }
      ],
      remove: 'SBUS (pin 6): leave unconnected on the PNP kit.',
      betaflight: 'UART1: MSP on, Peripherals: VTX (MSP + DisplayPort)'
    },
    {
      part: 'WS2812B LED strips (20 LEDs)',
      to: 'AIO LED pads',
      power: { text: '5 V BEC', tone: 'emerald' },
      wires: [
        { from: '5V (red, 30 AWG)', to: '5V', signal: 'power', dir: '' },
        { from: 'GND (black, 30 AWG)', to: 'GND', signal: 'gnd', dir: '' },
        { from: 'DIN (yellow, 30 AWG)', to: 'LED', signal: 'sig', dir: 'from-fc' },
        { from: 'Left DOUT', to: 'Right DIN', signal: 'sig', dir: 'from-fc', chain: true }
      ],
      note: 'Follow the printed arrow: DIN at the FC end. LEDs 0–9 on the left duct, 10–19 on the right.',
      betaflight: 'Configuration: LED_STRIP on'
    }
  ]
};
