/** Troubleshooting FAQ entries (answers may contain trusted inline HTML). */

export const FAQ_DATA = [
  {
    id: 'faq-no-osd',
    tag: 'OSD · UART1',
    tagCls: 'badge-cyan',
    question: '1. Why do I see clear video in DJI Goggles 3, but zero Betaflight OSD elements?',
    answer: 'Three settings must align for DJI O4 Pro MSP DisplayPort OSD: <strong>(1) Betaflight Ports Tab:</strong> On the UART wired to the O4 Pro (UART1), enable BOTH <code>Configuration/MSP</code> AND set Peripherals to <code>VTX (MSP + Displayport)</code>, then Save & Reboot. <strong>(2) Physical Wiring:</strong> Verify White (O4 RX) goes to FC TX1 and Gray (O4 TX) goes to FC RX1. <strong>(3) Goggles 3 Menu:</strong> Go to <em>Settings → Display → Canvas Mode</em> and switch it from Normal to <strong>HD</strong> so the outer edges of the 53×20 Betaflight OSD grid aren\'t cropped off-screen.',
    guideUrl: 'https://oscarliang.com/dji-o4-air-unit-pro-setup/',
    guideLabel: 'Oscar Liang O4 Pro OSD Fix'
  },
  {
    id: 'faq-flips-takeoff',
    tag: 'Motors',
    tagCls: 'badge-danger',
    question: '2. Why does the quad violently flip over ("Tasmanian Devil") the instant I raise the throttle?',
    answer: 'An instant flip on takeoff is ALWAYS one of four mechanical/software mismatches: <strong>(1) Props Installed Wrong:</strong> Both drones run <em>Props Out</em>—verify front-left and rear-right spin CCW, and front-right and rear-left spin CW, with the raised leading edge facing the direction of spin. <strong>(2) "Motor direction is reversed" Toggle:</strong> In Betaflight Motors tab, the <em>Motor direction is reversed</em> toggle MUST match how your motors actually spin. <strong>(3) Motor Remapping (M1–M4):</strong> Spin each motor individually in the Motors tab (props off!) to confirm Motor 1=Rear Right, 2=Front Right, 3=Rear Left, 4=Front Left. <strong>(4) FC Board Alignment:</strong> Tip the quad forward/left/right on the bench and confirm the 3D model in Betaflight Setup moves identically.',
    guideUrl: 'https://oscarliang.com/quadcopter-flips-takeoff/',
    guideLabel: 'Guide: Quad Flips on Takeoff'
  },
  {
    id: 'faq-elrs-no-bars',
    tag: 'ELRS · UART2',
    tagCls: 'badge-emerald',
    question: '3. My ELRS receiver LED is solid (bound), so why don\'t stick bars move in Betaflight Receiver tab?',
    answer: 'First, check the <strong>#1 DJI + ELRS builder trap</strong>: Did you remove the <strong>Yellow (DJI SBUS) wire</strong> from the 6-pin DJI O4 harness? On almost all F7 flight controllers, that pin is internally routed to <code>RX2</code>—if left plugged in, the O4 Air Unit hijacks UART2 and blocks your ELRS receiver! Second, verify <code>TX → RX2</code> and <code>RX → TX2</code> are crossed over correctly, <code>Serial Rx</code> is enabled on UART2, Receiver protocol is set to <code>CRSF</code>, and <strong>Model Match</strong> in the ExpressLRS Lua script is set to <code>Off</code>.',
    guideUrl: 'https://oscarliang.com/setup-expresslrs-2-4ghz/',
    guideLabel: 'Oscar Liang ELRS Troubleshooting'
  },
  {
    id: 'faq-no-video-o4',
    tag: 'O4 Pro · power',
    tagCls: 'badge-danger',
    question: '4. DJI O4 Air Unit Pro shows a black screen, won\'t power on, or reboots on throttle punches?',
    answer: 'Check your voltage rail immediately: the DJI O4 Air Unit Pro requires <strong>7.4V to 26.4V (2S–6S)</strong>. If you accidentally wired it to a <code>5V</code> pad, it will fail to boot or brown out the moment RF output ramps up on arming—always use the dedicated <strong>9V/10V BEC</strong> or <strong>VBAT</strong>. If you have OSD telemetry on screen but a black camera background, unplug and firmly reseat the coaxial MIPI camera cable at both ends. Finally, ensure both the O4 Pro and Goggles 3 are activated and updated to matching firmware via <em>DJI Assistant 2 (Consumer Drones Series)</em>.',
    guideUrl: 'https://oscarliang.com/dji-o4-air-unit-pro-setup/',
    guideLabel: 'O4 Pro Power & Firmware Guide'
  },
  {
    id: 'faq-gps-lock',
    tag: 'GPS',
    tagCls: 'badge-amber',
    question: '5. Why won\'t my M10 GPS lock satellites (or loses satellites as soon as the O4 Pro powers up)?',
    answer: 'High-bitrate digital VTXs emit broadband harmonic noise that can swamp the 1.575GHz GPS L1 band if wires run side-by-side. <strong>Fixes:</strong> (1) Twist the 4/6 GPS wires and wrap them in conductive copper shielding tape grounded to an FC <code>GND</code> pad. (2) Keep the M10 ceramic patch antenna mounted in the rear TPU tail angled clear of the dual O4 Pro antennas. (3) Wire the GPS power lead to a <code>4V5</code> pad on your FC so you can power the FC via a small USB-C power bank for 60 seconds before flight—once the M10 has a warm 3D lock, plugging in your 6S LiPo won\'t drop the satellites.',
    guideUrl: 'https://oscarliang.com/setup-gps-rescue-mode-betaflight/',
    guideLabel: 'GPS Noise Shielding & Rescue Guide'
  },
  {
    id: 'faq-motor-twitch',
    tag: 'ESC · DShot',
    tagCls: 'badge-cyan',
    question: '6. One motor stutters/twitches on arming or shows >0% errors in Bi-Directional DShot?',
    answer: 'A stuttering brushless motor is usually missing one of its 3 phase connections or suffering a stator short: <strong>(1) Inspect Motor Screws:</strong> Loosen the 4 M3 mounting screws on that arm by 1 turn—if a screw tip touches the copper stator windings inside the motor bell, it will short the phase through the conductive carbon frame! <strong>(2) Reflow ESC Pads:</strong> Re-tin the 3 motor phase pads on the ESC with fresh flux. <strong>(3) DShot Rate:</strong> If running a 4kHz PID loop on F722, switch from <code>DSHOT600</code> to <code>DSHOT300</code> for rock-solid 0.00% telemetry error rate.',
    guideUrl: 'https://oscarliang.com/rpm-filter/',
    guideLabel: 'Bi-Directional DShot Diagnostics'
  },
  {
    id: 'faq-o4-overheat',
    tag: 'Heat · SD card',
    tagCls: 'badge-amber',
    question: '7. DJI O4 Pro displays an Overheating Warning on the bench or stops recording 4K/120fps mid-flight?',
    answer: 'The O4 Air Unit Pro packs a 1/1.3" 4K/120fps encoder and high-output RF amplifier that rely on prop wash airflow for cooling. <strong>On the Bench:</strong> Always enable <em>Auto Low-Power Mode</em> in DJI Goggles 3 and point a small desk fan at the drone whenever plugged in for more than 60 seconds. <strong>Stopped Recording Mid-Flight:</strong> This happens when the microSD card cannot sustain the 130Mbps write speed—only use UHS-I <strong>U3 / V30 / A2</strong> rated cards (such as SanDisk Extreme Pro or Samsung PRO Plus) formatted directly inside the goggles.',
    guideUrl: 'https://oscarliang.com/sd-cards-fpv/',
    guideLabel: 'Recommended V30 microSD Cards'
  }
];
