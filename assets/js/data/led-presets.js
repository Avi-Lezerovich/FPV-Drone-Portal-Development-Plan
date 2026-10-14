/** Betaflight LED_STRIP presets for the cinewhoop (palette: 2=red 3=orange 6=green 8=cyan 10=blue). */

export const LED_PRESETS = {
  dusk: {
    desc: 'Profile: Left Duct Cyan (#00F0FF) + Right Duct Amber (#F59E0B) for instant dusk roll/yaw orientation + Battery Warning overlay.',
    leftHex: '#00F0FF',
    rightHex: '#F59E0B',
    cli: `# Cinelog30 V3 Dusk Horizon (20x WS2812B: 0-9 Cyan [8] Left, 10-19 Orange [3] Right + Warnings)
# Betaflight colour palette: 2=red 3=orange 6=green 8=cyan 10=blue
feature LED_STRIP
led 0 2,2::CW:8
led 1 2,3::CW:8
led 2 2,4::CW:8
led 3 2,5::CW:8
led 4 2,6::CW:8
led 5 2,7::CW:8
led 6 2,8::CW:8
led 7 2,9::CW:8
led 8 2,10::CW:8
led 9 2,11::CW:8
led 10 12,2::CW:3
led 11 12,3::CW:3
led 12 12,4::CW:3
led 13 12,5::CW:3
led 14 12,6::CW:3
led 15 12,7::CW:3
led 16 12,8::CW:3
led 17 12,9::CW:3
led 18 12,10::CW:3
led 19 12,11::CW:3
save`
  },
  tactical: {
    desc: 'Profile: Aviation Navigation Port/Starboard — Left Duct Red (#EF4444) + Right Duct Emerald (#10B981) with Turn Indicator & Battery Warning.',
    leftHex: '#EF4444',
    rightHex: '#10B981',
    cli: `# Cinelog30 V3 Aviation Nav (0-9 Red Port, 10-19 Green Starboard + Batt Warning)
feature LED_STRIP
led 0 2,2:W:CIW:2
led 1 2,3:W:CIW:2
led 2 2,4:W:CW:2
led 3 2,5:W:CW:2
led 4 2,6:W:CW:2
led 5 2,7:W:CW:2
led 6 2,8:W:CW:2
led 7 2,9:W:CW:2
led 8 2,10:W:CIW:2
led 9 2,11:W:CIW:2
led 10 12,2:E:CIW:6
led 11 12,3:E:CIW:6
led 12 12,4:E:CW:6
led 13 12,5:E:CW:6
led 14 12,6:E:CW:6
led 15 12,7:E:CW:6
led 16 12,8:E:CW:6
led 17 12,9:E:CW:6
led 18 12,10:E:CIW:6
led 19 12,11:E:CIW:6
save`
  },
  armwarn: {
    desc: 'Profile: Dynamic Arm State (Blue Disarmed / Green Armed) across both ducts with Larson Scanner effect and Battery Critical Strobe.',
    leftHex: '#10B981',
    rightHex: '#38BDF8',
    cli: `# Cinelog30 V3 Arm-State + Larson Scanner + Battery Warning (LEDs 0-19)
feature LED_STRIP
led 0 2,2::AWO:0
led 1 2,3::AWO:0
led 2 2,4::AWO:0
led 3 2,5::AWO:0
led 4 2,6::AWO:0
led 5 2,7::AWO:0
led 6 2,8::AWO:0
led 7 2,9::AWO:0
led 8 2,10::AWO:0
led 9 2,11::AWO:0
led 10 12,2::AWO:0
led 11 12,3::AWO:0
led 12 12,4::AWO:0
led 13 12,5::AWO:0
led 14 12,6::AWO:0
led 15 12,7::AWO:0
led 16 12,8::AWO:0
led 17 12,9::AWO:0
led 18 12,10::AWO:0
led 19 12,11::AWO:0
save`
  }
};
