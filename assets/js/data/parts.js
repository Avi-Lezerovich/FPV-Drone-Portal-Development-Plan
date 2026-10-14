/** PARTS_DATA: every part, its price/weight estimate, links and gotchas. Add or edit entries here. */

export const PARTS_DATA = [
  {
    id: '5in-frame-vapor-x5',
    drone: '5inch',
    category: 'frame',
    name: 'GEPRC Vapor-X5 5" O4 Pro Frame Kit',
    subtitle: '230mm Wheelbase // CNC Aluminum O4 Pro Camera Cage (19/20mm)',
    priceUsd: 82.99,
    weightGrams: 206,
    whyChosen: 'Purpose-built for the DJI O4 Air Unit Pro with silicone-damped CNC aluminum side plates that eliminate high-frequency jello before RockSteady or Gyroflow even touches the footage. Wide 5mm arms and clean 30.5x30.5mm center stack clearance.',
    alternatives: 'TBS Source One V5 5" (~$29.99, ~124g) — legendary budget open-source frame, but requires printing custom TPU adapters to fit the 20mm O4 Pro camera module and dual-antenna tail mount.',
    gotchas: 'Ensure you order the "O4 Pro" version of the Vapor-X5 (not the older O3 version), as the O4 Pro camera housing is 25.55×20×23.3mm. Use medium blue Loctite (242/243) on metal-to-metal arm bolts only—never on polycarbonate or TPU.',
    verifiedSource: 'Pyrodrone & GEPRC Official Store',
    verifiedDate: 'Oct 2026',
    links: [
      { label: 'Buy: GEPRC Official', url: 'https://geprc.com/product/pre-order-geprc-vapor-x5-hd-o4-pro-fpv-drone/', type: 'buy' },
      { label: 'Buy: Pyrodrone ($82.99)', url: 'https://pyrodrone.com/products/geprc-vapor-x5-5-o4-pro-fpv-drone-frame-kit', type: 'buy' },
      { label: 'Search: GetFPV', url: 'https://www.getfpv.com/catalogsearch/result/?q=GEPRC+Vapor+X5+O4+Pro', type: 'search' },
      { label: 'Search: RDQ', url: 'https://www.racedayquads.com/pages/rapid-search-results?q=GEPRC+Vapor+X5', type: 'search' },
      { label: 'Search: AliExpress', url: 'https://www.aliexpress.com/w/wholesale-GEPRC-Vapor-X5-O4-Pro-Frame.html', type: 'search' },
      { label: 'Specs: GEPRC Vapor Series', url: 'https://geprc.com/product/pre-order-geprc-vapor-x5-hd-o4-pro-fpv-drone/', type: 'specs' }
    ]
  },
  {
    id: '5in-motors-wasp-major',
    drone: '5inch',
    category: 'motors',
    name: 'RCinPower Wasp Major 22.6-6.5 1860KV (Set of 4)',
    subtitle: '6S Brushless Motors // 22.6mm Stator // 7075-T6 Bell & Japanese ISC Bearings',
    priceUsd: 107.96,
    weightGrams: 122,
    whyChosen: 'Widely regarded as one of the smoothest, most durable 5" 6S motors made. The wider 22.6×6.5mm stator delivers linear low-end torque for carrying the O4 Pro and 6S LiPo with authoritative prop recovery and minimal propwash.',
    alternatives: '1) iFlight XING2 2207 1855KV (~$87.96/set of 4, 31.6g each) — unibell durability, easy to source globally. 2) T-Motor Velox V2/V3 2207 1950KV (~$67.96/set of 4, 34.5g each) — awesome value mid-tier 6S motor.',
    gotchas: 'Mounting pattern is 16×16mm M3. Always verify motor screw length through the 5mm carbon arms before tightening so screws do not touch the copper stator windings (perform a continuity test between screw heads and motor phase pads!).',
    verifiedSource: 'GetFPV, HobbyRC UK & Drone-FPV-Racer (30.5g/motor)',
    verifiedDate: 'Oct 2026',
    links: [
      { label: 'Buy: GetFPV', url: 'https://www.getfpv.com/rcinpower-wasp-major-22-6-6-5-1860kv-2020kv-2420kv-motor.html', type: 'buy' },
      { label: 'Buy: HobbyRC UK', url: 'https://www.hobbyrc.co.uk/rcinpower-wasp-major-226-65-1860kv-motor', type: 'buy' },
      { label: 'Buy: Drone-FPV-Racer EU', url: 'https://www.drone-fpv-racer.com/en/rcinpower-wasp-major-226-66-1860kv-6332.html', type: 'buy' },
      { label: 'Search: Pyrodrone', url: 'https://pyrodrone.com/search?q=RCinPower+Wasp+Major+1860KV', type: 'search' },
      { label: 'Search: AliExpress', url: 'https://www.aliexpress.com/w/wholesale-RCinPower-Wasp-Major-1860KV.html', type: 'search' },
      { label: 'Guide: Oscar Liang Motor Guide', url: 'https://oscarliang.com/quadcopter-motor-propeller/', type: 'guide' }
    ]
  },
  {
    id: '5in-stack-velox-f7-v70a',
    drone: '5inch',
    category: 'stack',
    name: 'T-Hobby (T-Motor) Velox F7 SE + V70A SE 6-8S 4-in-1 Stack',
    subtitle: '30.5×30.5mm // STM32F722 MCU // ICM-42688-P Gyro // 70A Continuous ESC',
    priceUsd: 85.90,
    weightGrams: 21,
    whyChosen: 'Massive 70A (6-8S) current headroom shrugs off turtle-mode spikes and full-throttle 6S punches. Features a dedicated plug-and-play DJI HD JST-SH socket, 16MB Blackbox flash, and clean 5V/9V BEC rails.',
    alternatives: '1) RushFPV Rush Blade F722 + 60A 30×30 Stack (~$109.99) — rugged aluminum-shielded ESC. 2) SpeedyBee F405 V4 BLS 60A 30×30 Stack (~$69.99) — budget friendly with onboard Bluetooth configuration.',
    gotchas: 'Counterfeit stacks exist on unverified marketplace listings: buy from T-Hobby official or established FPV retailers. When plugging in the DJI O4 Pro 6-pin harness, REMOVE the yellow SBUS/DJI-RX pin from the connector if your ELRS receiver is wired to UART2!',
    verifiedSource: 'T-Hobby Official Store ($85.90, 12.3g FC + 8g ESC)',
    verifiedDate: 'Oct 2026',
    links: [
      { label: 'Buy: T-Hobby Official ($85.90)', url: 'https://www.t-hobby.com/products/4-in1-fpv-stack-v70a-f7-se-8', type: 'buy' },
      { label: 'Buy: AliExpress Listing', url: 'https://www.aliexpress.com/item/1005009766074033.html', type: 'buy' },
      { label: 'Search: GetFPV', url: 'https://www.getfpv.com/catalogsearch/result/?q=Velox+F7+SE+stack', type: 'search' },
      { label: 'Search: Pyrodrone', url: 'https://pyrodrone.com/search?q=Velox+F7+stack', type: 'search' },
      { label: 'Specs: T-Hobby V70A & F7 SE', url: 'https://www.t-hobby.com/products/4-in1-fpv-stack-v70a-f7-se-8', type: 'specs' },
      { label: 'Guide: Oscar Liang FC Guide', url: 'https://oscarliang.com/flight-controller/', type: 'guide' }
    ]
  },
  {
    id: '5in-vtx-dji-o4-pro',
    drone: '5inch',
    category: 'vtx',
    name: 'DJI O4 Air Unit Pro (Dual-Antenna Flagship Module)',
    subtitle: '1/1.3" CMOS // 4K/120fps Onboard + 1080p/100fps 15ms Live View // 7.4V–26.4V Input',
    priceUsd: 249.00,
    weightGrams: 36,
    whyChosen: 'Eliminates the need for an external GoPro on your 5" freestyle rig. The 1/1.3-inch sensor records 10-bit D-Log M at 4K/120fps onto microSD (plus 4GB internal storage), while giving 15ms minimum latency to DJI Goggles 3.',
    alternatives: 'Standard DJI O4 Air Unit (Lite/Single-Antenna, ~$119–$139, 8.2g) — far lighter, but lacks the 1/1.3" sensor, microSD slot, and 6S direct VBAT input capability of the Pro.',
    gotchas: 'CRITICAL VOLTAGE RULE: Input rating is 7.4V–26.4V (2S–6S). NEVER wire the O4 Pro power lead to a 5V pad—it will brown out under high-power transmission! Power it via the FC 9V/10V BEC plug or VBAT. Also use a small dab of E6000/B7000 if not using the metal U.FL retainer bracket.',
    verifiedSource: 'GetFPV ($289 US) / Axisflying & iFlight EU ($249 MSRP, 32g + 2×2.1g ant)',
    verifiedDate: 'Oct 2026',
    links: [
      { label: 'Buy: GetFPV', url: 'https://www.getfpv.com/dji-o4-air-unit-pro.html', type: 'buy' },
      { label: 'Buy: Axisflying ($249)', url: 'https://www.axisflying.com/products/dji-o4-air-unit-pro', type: 'buy' },
      { label: 'Buy: iFlight Europe', url: 'https://iflighteurope.com/products/dji-o4-air-unit-pro', type: 'buy' },
      { label: 'Search: DJI Israel (Benda)', url: 'https://www.dji-store.co.il/?s=O4+Air+Unit+Pro', type: 'search' },
      { label: 'Search: RDQ', url: 'https://www.racedayquads.com/pages/rapid-search-results?q=DJI+O4+Air+Unit+Pro', type: 'search' },
      { label: 'Specs: GetFPV O4 Pro Sheet', url: 'https://www.getfpv.com/dji-o4-air-unit-pro.html', type: 'specs' }
    ]
  },
  {
    id: '5in-rx-radiomaster-rp3',
    drone: '5inch',
    category: 'radio-rx',
    name: 'RadioMaster RP3 V2 ExpressLRS 2.4GHz Diversity Receiver',
    subtitle: 'ESP8285 + SX1281 // True Antenna Diversity + Skyworks LNA/PA // 100mW Telemetry',
    priceUsd: 22.49,
    weightGrams: 5,
    whyChosen: 'Dual 65mm T-antennas with hardware diversity switching provide rock-solid 2.4GHz link reliability around carbon fiber arms and concrete obstacles, pairing seamlessly with the RadioMaster TX15 Max / Boxer ELRS.',
    alternatives: '1) RadioMaster RP2 V2 (~$18.99, 2.2g) — onboard ceramic tower antenna (zero wires to chop in props, slightly less range than dual T-antennas). 2) HappyModel EP1 Dual / EP2 (~$14.99–$19.99).',
    gotchas: 'Wire RX pad on receiver to TX pad on FC, and TX pad on receiver to RX pad on FC (5V and GND to 5V/GND). Keep the two T-antennas mounted at a 90-degree angle to each other (e.g., one horizontal under front arm, one vertical on rear standoff) away from prop tips.',
    verifiedSource: 'Rotor Riot ($24.99) & AMain Hobbies ($22.49, 4.6g w/ antennas)',
    verifiedDate: 'Oct 2026',
    links: [
      { label: 'Buy: Rotor Riot ($24.99)', url: 'https://rotorriot.com/products/rp3-2-4ghz-diversity-receiver-for-elrs-protocol', type: 'buy' },
      { label: 'Buy: AMain Hobbies ($22.49)', url: 'https://www.amainhobbies.com/radiomaster-rp3-v2-expresslrs-elrs-2.4ghz-receiver-rm-hp0157.rx-rp3-v2/p1587085', type: 'buy' },
      { label: 'Buy: RadioMaster RP3-H', url: 'https://radiomasterrc.com/products/rp3-h-expresslrs-2-4ghz-nano-receiver', type: 'buy' },
      { label: 'Search: GetFPV', url: 'https://www.getfpv.com/catalogsearch/result/?q=RadioMaster+RP3+ELRS', type: 'search' },
      { label: 'Search: AliExpress', url: 'https://www.aliexpress.com/w/wholesale-RadioMaster-RP3-V2-ELRS.html', type: 'search' },
      { label: 'Guide: Oscar Liang ELRS Setup', url: 'https://oscarliang.com/setup-expresslrs-2-4ghz/', type: 'guide' }
    ]
  },
  {
    id: '5in-gps-m10',
    drone: '5inch',
    category: 'gps-safety',
    name: 'Holybro Micro M10 GPS w/ Compass (or Matek M10Q-5883)',
    subtitle: '10th-Gen u-blox M10 Concurrent 4-GNSS (GPS/Galileo/GLONASS/BeiDou) + Compass',
    priceUsd: 27.99,
    weightGrams: 14,
    whyChosen: 'Locks 15+ satellites in seconds using the u-blox M10 engine. Essential for configuring Betaflight 4.5+ GPS Rescue (Return-to-Home failsafe) and OSD home-direction arrow + groundspeed telemetry.',
    alternatives: 'Matek Systems M10Q-5883 ($51.99, 8g, 20×20mm) — ultra-compact premium SAM-M10Q patch with QMC5883L magnetometer.',
    gotchas: 'DJI O4 Air Unit Pro high-frequency RF noise can interfere with GPS lock if mounted too close. Route GPS wires away from the O4 coaxial cable, wrap the GPS wire harness in copper shielding tape if needed, and power the GPS from a 4.5V (USB-powered) pad so you can acquire a 3D satellite lock BEFORE plugging in your LiPo!',
    verifiedSource: 'Holybro Official ($27.99, 14g) & Pyrodrone Matek M10Q-5883 ($51.99, 8g)',
    verifiedDate: 'Oct 2026',
    links: [
      { label: 'Buy: Holybro Official ($27.99)', url: 'https://holybro.com/products/micro-m10-gps', type: 'buy' },
      { label: 'Buy: GetFPV (Holybro M10)', url: 'https://www.getfpv.com/holybro-micro-m10-gps-module-w-o-case.html', type: 'buy' },
      { label: 'Buy: Pyrodrone (Matek M10Q)', url: 'https://pyrodrone.com/products/matek-m10q-5883-gps-module-gps-compass', type: 'buy' },
      { label: 'Search: AliExpress', url: 'https://www.aliexpress.com/w/wholesale-Matek-M10Q-5883-GPS.html', type: 'search' },
      { label: 'Guide: Oscar Liang GPS Rescue', url: 'https://oscarliang.com/setup-gps-rescue-mode-betaflight/', type: 'guide' }
    ]
  },
  {
    id: '5in-buzzer-cap',
    drone: '5inch',
    category: 'gps-safety',
    name: 'VIFLY Finder 2 Self-Powered Buzzer + 35V 1000µF Low-ESR Cap',
    subtitle: '105dB Battery-Backed Lost Model Alarm + Panasonic FM 35V 1000µF Capacitor',
    priceUsd: 16.99,
    weightGrams: 8,
    whyChosen: 'If a hard crash ejects your 6S LiPo in tall brush, a standard piezo buzzer goes silent. The VIFLY Finder 2 has its own internal LiPo and LED beacon that screams at 105dB for hours. The 35V Low-ESR cap absorbs 6S back-EMF voltage spikes to protect the FC and O4 Pro.',
    alternatives: 'VIFLY Finder Mini (~$12.99, 2.7g) — smaller footprint if TPU tail space is tight next to the GPS and dual O4 Pro antennas.',
    gotchas: 'On 6S (25.2V fully charged), a 25V capacitor is dangerous and can vent—ALWAYS use a 35V or 50V Low-ESR capacitor (Panasonic FM/FR or Rubycon ZLH) with short, heat-shrunk legs soldered directly to the ESC battery pads.',
    verifiedSource: 'Manufacturer Spec & Retailer Search (Est. $13.99 Finder 2 + $3.00 Cap)',
    verifiedDate: 'Oct 2026',
    links: [
      { label: 'Search: GetFPV (VIFLY Finder 2)', url: 'https://www.getfpv.com/catalogsearch/result/?q=VIFLY+Finder+2', type: 'search' },
      { label: 'Search: Pyrodrone (VIFLY Finder 2)', url: 'https://pyrodrone.com/search?q=VIFLY+Finder+2', type: 'search' },
      { label: 'Search: RDQ (35V 1000uF Cap)', url: 'https://www.racedayquads.com/pages/rapid-search-results?q=35V+1000uF+Capacitor', type: 'search' },
      { label: 'Search: AliExpress', url: 'https://www.aliexpress.com/w/wholesale-VIFLY-Finder-2.html', type: 'search' },
      { label: 'Guide: Oscar Liang LiPo Capacitors', url: 'https://oscarliang.com/capacitors-mini-quad/', type: 'guide' }
    ]
  },
  {
    id: '5in-props-batts-spares',
    drone: '5inch',
    category: 'props-batts',
    name: 'HQProp 5x4.3x3 V2S Props + 6S 1200mAh XT60 LiPos (3x) + Spares',
    subtitle: '4 Sets HQ 5x4.3x3 V2S + 3× 6S 1100–1300mAh 120C XT60 + Kevlar Straps + Spare O4 Pro Antennas',
    priceUsd: 145.00,
    weightGrams: 215,
    whyChosen: 'HQProp 5x4.3x3 V2S polycarbonate blades match 1860KV 6S motors with silky mid-throttle resolution and strong grip. Paired with 3× 6S 1100–1300mAh XT60 packs (Tattu R-Line V5 / CNHL Black), Kevlar metal-buckle straps, sticky Ummagrip battery pad, and a pair of spare DJI O4 Pro U.FL antennas.',
    alternatives: 'Gemfan 5136 (stock Vapor-X5 prop) or Gemfan Vannystyle 5136 for ultra-smooth cinematic lines; Dogcom Ucell or GNB 6S 1100–1300mAh packs.',
    gotchas: 'International air shipping of 6S LiPo batteries to Israel is heavily restricted or slow (sea freight via AliExpress). Buying 6S XT60 packs locally in Israel or via specialized battery shipping channels saves weeks of customs headaches. Weight shown (~215g) represents 1× 6S 1200mAh pack + 4 props + strap on the quad.',
    verifiedSource: 'Retailer Bundle Estimate (3× ~$38 LiPos + $14 Props + $17 Straps/O4 Ants)',
    verifiedDate: 'Oct 2026',
    links: [
      { label: 'Search: GetFPV (HQProp 5x4.3x3 V2S)', url: 'https://www.getfpv.com/catalogsearch/result/?q=HQProp+5x4.3x3+V2S', type: 'search' },
      { label: 'Search: Pyrodrone (6S 1200mAh XT60)', url: 'https://pyrodrone.com/search?q=6S+1200mAh+XT60', type: 'search' },
      { label: 'Search: GetFPV (O4 Pro Antenna)', url: 'https://www.getfpv.com/catalogsearch/result/?q=DJI+O4+Air+Unit+Pro+Antenna', type: 'search' },
      { label: 'Search: AliExpress (CNHL/GNB 6S)', url: 'https://www.aliexpress.com/w/wholesale-6S-1200mAh-Lipo-XT60.html', type: 'search' },
      { label: 'Guide: Oscar Liang LiPo Guide', url: 'https://oscarliang.com/lipo-battery-guide/', type: 'guide' }
    ]
  },
  {
    id: '3in-cinelog30-v3-o4-pro',
    drone: 'cinewhoop',
    category: 'frame',
    name: 'GEPRC Cinelog30 V3 O4 Pro 3" Cinewhoop (ELRS 2.4G BNF or No-VTX Kit)',
    subtitle: '128mm Wheelbase // TAKER F722 45A 32-Bit AIO // SPEEDX2 1404 3850KV // O4 Air Unit Pro',
    priceUsd: 434.99,
    weightGrams: 187,
    whyChosen: 'Factory-engineered around the DJI O4 Air Unit Pro with an underslung damped gimbal cage, aluminum-reinforced front bumper, and a custom PDB with dedicated LED BEC, buzzer, and anti-spark circuitry. Delivers up to 8:10 slow cruise flight time indoors or outdoors.',
    alternatives: 'Buy the GEPRC Cinelog30 V3 "WTFPV / No-VTX" version ($169.99–$204.99 on GEPRC Official) and install a locally purchased DJI O4 Air Unit Pro from Benda Israel ($249 MSRP) to simplify Israeli customs clearance.',
    gotchas: '250g SCALE REALITY: While the dry weight is 187g ±2g, strapping on a 4S 660–720mAh LiHV battery (~75g) + LED strips (~6g) brings total takeoff weight to ~268g—above the 250g CAAI registration threshold!',
    verifiedSource: 'GEPRC Official ($434.99 ELRS BNF / $169.99–$204.99 No-VTX) & Rotorama EU (187g)',
    verifiedDate: 'Oct 2026',
    links: [
      { label: 'Buy: GEPRC Official ($434.99 BNF)', url: 'https://geprc.com/product/geprc-cinelog30-v3-o4-pro-quadcopter/', type: 'buy' },
      { label: 'Buy: GEPRC No-VTX / Series ($169.99+)', url: 'https://geprc.com/product-category/drones/cinelog30-v3-series/', type: 'buy' },
      { label: 'Buy: Rotorama EU (ELRS 2.4G)', url: 'https://www.rotorama.com/product/geprc-cinelog30-v3-o4-elrs2-4g', type: 'buy' },
      { label: 'Search: GetFPV', url: 'https://www.getfpv.com/catalogsearch/result/?q=GEPRC+Cinelog30+V3+O4+Pro', type: 'search' },
      { label: 'Search: Pyrodrone', url: 'https://pyrodrone.com/search?q=GEPRC+Cinelog30+V3', type: 'search' },
      { label: 'Search: AliExpress', url: 'https://www.aliexpress.com/w/wholesale-GEPRC-Cinelog30-V3-O4-Pro.html', type: 'search' }
    ]
  },
  {
    id: '3in-leds-ws2812b-30awg',
    drone: 'cinewhoop',
    category: 'gps-safety',
    name: 'WS2812B 5V Addressable LED Strips (16–24 LEDs) + 30AWG Silicone Wire',
    subtitle: '5V Narrow 4mm/5mm RGB COB/SMD Strip // 3-Pin (5V, GND, DIN) // Betaflight LED_STRIP Ready',
    priceUsd: 16.99,
    weightGrams: 6,
    whyChosen: 'Turns the translucent Cinelog30 V3 prop guard ducts into a high-visibility dusk beacon. Using programmable WS2812B 5V LEDs wired to the TAKER F722 AIO LED pad lets you display arming status, battery voltage warnings, and orientation colors via Betaflight Wiring Order Mode.',
    alternatives: 'Flywoo / SpeedyBee 5V Addressable COB LED Strips or Matek WS2812B Slim LED boards if you prefer rigid rear-facing tail bars instead of full duct wrapping.',
    gotchas: 'ONLY use 5V addressable WS2812B strips (never 12V/4S analog strips) when wiring to the FC 5V & LED pads. Keep total count to 16–24 LEDs so current stays safely within the onboard 5V BEC limit (~0.6A–0.9A at medium brightness).',
    verifiedSource: 'Retailer Search Estimate ($9.99 LED Strip + $7.00 30AWG Silicone Wire Box)',
    verifiedDate: 'Oct 2026',
    links: [
      { label: 'Search: GetFPV (WS2812B 5V LED)', url: 'https://www.getfpv.com/catalogsearch/result/?q=WS2812B+5V+LED+strip', type: 'search' },
      { label: 'Search: Pyrodrone (COB FPV LED)', url: 'https://pyrodrone.com/search?q=5V+LED+strip+WS2812', type: 'search' },
      { label: 'Search: RDQ (30AWG Silicone Wire)', url: 'https://www.racedayquads.com/pages/rapid-search-results?q=30AWG+silicone+wire', type: 'search' },
      { label: 'Search: AliExpress (WS2812B 4mm 5V)', url: 'https://www.aliexpress.com/w/wholesale-WS2812B-5V-4mm-narrow-LED-strip.html', type: 'search' },
      { label: 'Guide: Betaflight LED Strip Docs', url: 'https://betaflight.com/docs/wiki/guides/current/LED-Strip-Quick-Guide', type: 'guide' }
    ]
  },
  {
    id: '3in-props-batts-nd',
    drone: 'cinewhoop',
    category: 'props-batts',
    name: '4S LiHV 660–720mAh XT30 Packs (4x) + HQProp DT76mm×3 V2 + O4 Pro ND Filters',
    subtitle: '4× GEPRC/GNB 4S LiHV 720mAh 100C XT30 + 4 Sets HQ DT76mmx3 V2 + O4 Pro ND8/16/32/64 Set',
    priceUsd: 112.00,
    weightGrams: 77,
    whyChosen: 'High-voltage 4S LiHV (4.35V/cell) 660–720mAh packs maximize energy density for 7–8 minute flights. HQProp DT76mm×3 V2 tri-blades are matched to the Cinelog30 V3 ducts, and snap-on ND filters lock the O4 Pro shutter at 1/120s (for 60fps) in bright Mediterranean sun.',
    alternatives: 'Tattu 4S 650mAh 75C XT30 standard LiPo (slightly shorter flight time) or Freewell DJI O4 Air Unit Pro ND/PL 4-pack.',
    gotchas: 'Charge LiHV packs to 4.35V/cell ONLY by selecting the "LiHV" chemistry setting on your smart charger (never charge standard 4.20V LiPos on LiHV mode!). Remove the ND filter before flying at dusk so the O4 Pro sensor gathers maximum light. Weight shown (~77g) is for 1× battery + ND filter.',
    verifiedSource: 'GEPRC Official ($18.99/batt, $11.99–$49.99 O4 Pro ND Set, HQ DT76mmx3 V2)',
    verifiedDate: 'Oct 2026',
    links: [
      { label: 'Buy: GEPRC Official (Cinelog30 V3 Accs)', url: 'https://geprc.com/product/geprc-cinelog30-v3-o4-pro-quadcopter/', type: 'buy' },
      { label: 'Search: GetFPV (HQProp DT76mmx3 V2)', url: 'https://www.getfpv.com/catalogsearch/result/?q=HQProp+DT76mm', type: 'search' },
      { label: 'Search: Pyrodrone (O4 Pro ND Filter)', url: 'https://pyrodrone.com/search?q=DJI+O4+Pro+ND+Filter', type: 'search' },
      { label: 'Search: AliExpress (GNB 4S 720mAh LiHV)', url: 'https://www.aliexpress.com/w/wholesale-GNB-4S-720mAh-LiHV-XT30.html', type: 'search' },
      { label: 'Guide: Oscar Liang ND Filter Guide', url: 'https://oscarliang.com/nd-filter-fpv/', type: 'guide' }
    ]
  },
  {
    id: 'shared-dji-goggles-3',
    drone: 'shared',
    category: 'goggles-charge',
    name: 'DJI Goggles 3 (Flagship O4 HD Digital FPV Headset)',
    subtitle: 'Dual 1080p 100Hz Micro-OLED // 15ms Min Latency w/ O4 Pro // 60Mbps // Built-in 3000mAh Headband Battery',
    priceUsd: 499.00,
    weightGrams: 470,
    whyChosen: 'Unlocks the full O4 Air Unit Pro transmission pipeline: 1080p/100fps live feed, 60Mbps max bitrate, Race Mode (down to 15ms latency), adjustable diopters (-6.0D to +2.0D), forehead relief pad, and Real View PiP cameras so you can check your surroundings without lifting the goggles.',
    alternatives: 'DJI Goggles N3 (~$229) — budget single-screen box-style O4 goggles, or DJI Goggles 2 / Integra (older O3 generation, requires firmware update for O4 compatibility and lacks O4 Race Mode).',
    gotchas: 'Buying locally from DJI Israel (Benda Magnetic) provides official Israeli warranty and avoids Ministry of Communications (MoC) 5.8GHz personal-import permit delays at customs. Never expose the inner Micro-OLED diopter lenses to direct sunlight—it will burn the panel in seconds!',
    verifiedSource: 'Oscar Liang Review & Axisflying ($499.00 MSRP, 470g w/ integrated battery)',
    verifiedDate: 'Oct 2026',
    links: [
      { label: 'Buy: Axisflying ($499.00)', url: 'https://www.axisflying.com/products/dji-goggles-3', type: 'buy' },
      { label: 'Search: DJI Israel / Benda', url: 'https://www.dji-store.co.il/?s=Goggles+3', type: 'search' },
      { label: 'Search: GetFPV', url: 'https://www.getfpv.com/catalogsearch/result/?q=DJI+Goggles+3', type: 'search' },
      { label: 'Search: Pyrodrone', url: 'https://pyrodrone.com/search?q=DJI+Goggles+3', type: 'search' },
      { label: 'Specs & Review: Oscar Liang Goggles 3', url: 'https://oscarliang.com/dji-goggles-3/', type: 'specs' }
    ]
  },
  {
    id: 'shared-radiomaster-tx15-max',
    drone: 'shared',
    category: 'radio-rx',
    name: 'RadioMaster TX15 Max ELRS M2 Radio + 2× 18650 Cells + Strap & Protector',
    subtitle: 'STM32 H7 // 3.5" IPS Color Touchscreen // AG02 CNC Hall Gimbals // Built-in 1W Dual-Band ELRS',
    priceUsd: 238.99,
    weightGrams: 767,
    whyChosen: 'The modern evolution of the Boxer form factor: adds a 3.5" 600-nit IPS color touchscreen running EdgeTX 3.0+, ultra-smooth AG02 CNC aluminum Hall gimbals with RGB rings, built-in gyro, 4GB internal flash, and an internal 1000mW cooling-fanned ExpressLRS module.',
    alternatives: '1) RadioMaster TX15 Standard Edition ($153.99, 605g dry, V5.0 Hall gimbals). 2) RadioMaster Boxer ELRS M2 / Boxer Crush (~$139.99–$189.99) — monochrome screen classic.',
    gotchas: 'Ships WITHOUT batteries: add 2× unprotected button-top/flat-top 18650 3200mAh cells (~$19.99) or a 2S 6200mAh LiPo pack, plus a 3D/CNC gimbal protector and neck strap (~$20). Never power on the radio without the foldable antenna securely attached. Price ($238.99) and weight (767g) include the $199 TX15 Max + 2× 18650 cells + neck strap.',
    verifiedSource: 'RadioMaster Official ($199 TX15 Max / $153.99 TX15 Std) & Oscar Liang Review (672g dry)',
    verifiedDate: 'Oct 2026',
    links: [
      { label: 'Buy: RadioMaster Official (TX15 MAX $199)', url: 'https://radiomasterrc.com/products/tx15-max-radio-controller-elrs-m2', type: 'buy' },
      { label: 'Buy: RadioMaster Official (TX15 Std $153.99)', url: 'https://radiomasterrc.com/products/tx15-radio-controller-elrs-m2', type: 'buy' },
      { label: 'Search: GetFPV (TX15 / Boxer ELRS)', url: 'https://www.getfpv.com/catalogsearch/result/?q=RadioMaster+TX15+ELRS', type: 'search' },
      { label: 'Search: RDQ (RadioMaster 18650)', url: 'https://www.racedayquads.com/pages/rapid-search-results?q=RadioMaster+18650', type: 'search' },
      { label: 'Specs & Review: Oscar Liang TX15 Max', url: 'https://oscarliang.com/radiomaster-tx15-max/', type: 'specs' }
    ]
  },
  {
    id: 'shared-charging-station',
    drone: 'shared',
    category: 'goggles-charge',
    name: 'HOTA D6 Pro Dual AC/DC Smart Charger + Fused XT60/XT30 Board + LiPo Bag + Checker',
    subtitle: 'Dual-Channel 200W AC / 650W DC (LiPo & LiHV) + Fused Parallel Board + Fireproof Bag + Cell Checker',
    priceUsd: 167.96,
    weightGrams: 1150,
    whyChosen: 'Supports both 6S XT60 LiPos (4.20V/cell) for the 5" quad and 4S XT30 LiHV packs (4.35V/cell) for the Cinelog30 V3 directly from an Israeli 230V AC wall outlet (with standard C13/EU cord) or field DC supply. Includes a self-resetting fused XT60/XT30 parallel board, fireproof LiPo safe bag, and pocket voltage checker.',
    alternatives: 'ToolkitRC M6D + ADP200 Power Supply (~$95 total) or SkyRC B6 Neo / Q200 Neo.',
    gotchas: 'PARALLEL CHARGING RULE: Only parallel-charge batteries of the exact same cell count (e.g., all 6S or all 4S) and only when every pack is within 0.1V per cell of the others—verify with your voltage checker BEFORE plugging into the fused board!',
    verifiedSource: 'Oscar Liang Charger Guide & Retailer Search (~$116 Charger + $25 Board + $17 Bag + $10 Checker)',
    verifiedDate: 'Oct 2026',
    links: [
      { label: 'Search: GetFPV (HOTA D6 Pro)', url: 'https://www.getfpv.com/catalogsearch/result/?q=HOTA+D6+Pro', type: 'search' },
      { label: 'Search: Pyrodrone (XT30 XT60 Parallel Board)', url: 'https://pyrodrone.com/search?q=parallel+charging+board+XT60+XT30', type: 'search' },
      { label: 'Search: RDQ (Fireproof LiPo Bag)', url: 'https://www.racedayquads.com/pages/rapid-search-results?q=fireproof+lipo+bag', type: 'search' },
      { label: 'Search: AliExpress (HOTA D6 Pro EU Plug)', url: 'https://www.aliexpress.com/w/wholesale-HOTA-D6-Pro-charger.html', type: 'search' },
      { label: 'Guide: Oscar Liang LiPo Charger Guide', url: 'https://oscarliang.com/choose-lipo-battery-charger-power-supply/', type: 'guide' }
    ]
  },
  {
    id: 'tools-soldering-diagnostics',
    drone: 'tools',
    category: 'bench-tools',
    name: 'Soldering & Electrical Safety Kit (Pinecil V2 / Aixun T3A + 63/37 Solder + Smoke Stopper + DMM)',
    subtitle: 'Official Pine64 Pinecil V2 (88W USB-C PD) + 63/37 Leaded Solder & Flux + VIFLY ShortSaver V2 + Multimeter',
    priceUsd: 98.99,
    weightGrams: 520,
    whyChosen: 'Soldering 6S XT60 pigtails and 70A ESC pads demands rapid thermal recovery. The RISC-V Pinecil V2 ($25.99 from Pine64 + 65W/100W USB-C PD brick + chisel tip) heats in 6 seconds. Paired with eutectic 63/37 rosin-core leaded solder, syringe no-clean flux, a digital multimeter for continuity checks, and a VIFLY ShortSaver V2 electronic fuse.',
    alternatives: 'Aixun T3A JBC-T245 200W Bench Station (~$125) or Sugon T26D JBC-T210 Precision Station (~$165) if you want a dedicated heavy desktop station on your workbench.',
    gotchas: 'COUNTERFEIT WARNING: Fake Pinecils flood Amazon/AliExpress. Buy the Pinecil V2 directly from the official Pine64 Store (authentic V2 has a GREEN silicone grip sleeve and Bouffalo BL706 chip with authenticity checker in IronOS). Never power a newly soldered drone without a VIFLY ShortSaver V2 inline!',
    verifiedSource: 'PINE64 Official Store ($25.99 Pinecil V2) &PINE64 Wiki + Retailer Tool Bundle (~$73 Accs)',
    verifiedDate: 'Oct 2026',
    links: [
      { label: 'Buy: PINE64 Official (Pinecil V2 $25.99)', url: 'https://pine64.com/product/pinecil-smart-mini-portable-soldering-iron/', type: 'buy' },
      { label: 'Specs: PINE64 Authenticity & Power Wiki', url: 'https://pine64.org/documentation/Pinecil/_full/', type: 'specs' },
      { label: 'Search: GetFPV (VIFLY ShortSaver V2)', url: 'https://www.getfpv.com/catalogsearch/result/?q=VIFLY+ShortSaver+V2', type: 'search' },
      { label: 'Search: Pyrodrone (63/37 Solder & Flux)', url: 'https://pyrodrone.com/search?q=63%2F37+solder+flux', type: 'search' },
      { label: 'Search: AliExpress (Aixun T3A / Sugon T26D)', url: 'https://www.aliexpress.com/w/wholesale-Aixun-T3A-Sugon-T26D.html', type: 'search' },
      { label: 'Guide: Oscar Liang FPV Soldering Tutorial', url: 'https://oscarliang.com/soldering-guide/', type: 'guide' }
    ]
  },
  {
    id: 'tools-hardware-drivers-consumables',
    drone: 'tools',
    category: 'bench-tools',
    name: 'FPV Driver Set, Blue Loctite 243, M2/M3 Hardware Box, USB-C OTG & Heat Shrink',
    subtitle: '1.5/2.0/2.5mm Hex + 5.5/8.0mm Nut Drivers + Loctite 243 + M2/M3 Assortment + Data USB-C + Zip Ties',
    priceUsd: 54.00,
    weightGrams: 480,
    whyChosen: 'Cheap L-keys strip M2/M3 button-head screws on the first crash repair. Precision machined HSS 1.5mm, 2.0mm, and 2.5mm hex drivers plus an 8mm prop nut driver make bench and field work effortless. Rounded out with medium-strength Blue Loctite 243, spare M2/M3 screws & standoffs, a high-speed data USB-C cable + OTG adapter (for SpeedyBee/Betaflight), heat shrink assortment, and nylon zip ties.',
    alternatives: 'MIP Thorp Hex Driver Set (gold-standard US tool steel, ~$45 for 3 drivers) or Ethix / iFlight FPV Field Tool Kit (~$39.99).',
    gotchas: 'LOCTITE PLASTIC DANGER: Never allow liquid Blue Loctite (242/243) to touch polycarbonate props, DJI camera housings, or acrylic canopies—anaerobic threadlocker chemically crazes and shatters polycarbonate within hours! Only use on metal-to-metal motor and frame screws.',
    verifiedSource: 'Oscar Liang Tool Guide & Retailer Hardware Kit Estimate ($54.00 total)',
    verifiedDate: 'Oct 2026',
    links: [
      { label: 'Search: GetFPV (Hex Driver Tool Kit)', url: 'https://www.getfpv.com/catalogsearch/result/?q=FPV+Hex+Driver+Kit', type: 'search' },
      { label: 'Search: Pyrodrone (M2 M3 Screw Assortment)', url: 'https://pyrodrone.com/search?q=M2+M3+screw+kit', type: 'search' },
      { label: 'Search: RDQ (Blue Loctite & Heat Shrink)', url: 'https://www.racedayquads.com/pages/rapid-search-results?q=Loctite+242', type: 'search' },
      { label: 'Search: AliExpress (RJX Hex Drivers)', url: 'https://www.aliexpress.com/w/wholesale-RJX-hex-driver-set-1.5-2.0-2.5.html', type: 'search' },
      { label: 'Guide: Oscar Liang FPV Tools List', url: 'https://oscarliang.com/fpv-tools/', type: 'guide' }
    ]
  }
];
