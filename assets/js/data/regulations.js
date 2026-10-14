/** Israel regulations with sources and a status per rule: ok = consistent, warn = conflicting, bad = unverified. */

export const SRC = {
  govService: { label: 'gov.il: UAV licence & registration (official)', url: 'https://www.gov.il/he/service/uav-license-registration', official: true },
  bhol2026: { label: 'BHOL news: July 2026 regulation amendment', url: 'https://www.bhol.co.il/news/1659230' },
  uavcoach: { label: 'UAV Coach: Drone laws in Israel', url: 'https://uavcoach.com/drone-laws-in-israel/' },
  droneLaws: { label: 'drone-laws.com: Israel 2026', url: 'https://drone-laws.com/drone-laws-in-israel/' },
  propelrc: { label: 'PropelRC: Israel drone laws 2026', url: 'https://www.propelrc.com/drone-laws-in-israel/' },
  tgspot: { label: 'TGspot (Hebrew): CAAI rules summary', url: 'https://www.tgspot.co.il/rules-and-regulations-for-drones-in-israel/' },
  icdMap: { label: 'ICD: No-fly zone map (Hebrew)', url: 'https://www.icd.org.il/noflyzones' },
  shibolet: { label: 'Shibolet law firm: new civilian drone regulations', url: 'https://www.shibolet.com/en/new-civilian-drone-regulations-israel-moves-one-step-closer-to-its-own-version-of-part-107/' },
  easaFpv: { label: 'EASA FAQ: FPV needs an observer (EU, for comparison)', url: 'https://www.easa.europa.eu/en/faq/140038' }
};

export const REGULATIONS_DATA = [
  {
    id: 'reg-registration',
    title: 'Registration above 250 g',
    status: 'ok',
    statusText: 'Consistent',
    body: 'Drones over 250 g and up to 25 kg must be registered with the Civil Aviation Authority (CAAI, רת"א), and the official gov.il service handles registration. With their recommended batteries <strong>both builds are above 250 g</strong>: about 630 g for the 5" and about 268 g for the cinewhoop. These are estimates, so weigh the real takeoff weight. A July 2026 amendment reportedly cut fees by 70%.',
    sources: [SRC.govService, SRC.bhol2026, SRC.uavcoach]
  },
  {
    id: 'reg-licence',
    title: 'Operator licence / knowledge test',
    status: 'warn',
    statusText: 'Conflicting',
    body: 'The official service issues a UAV pilot licence (under 25 kg) to applicants aged 16+ who are Israeli citizens or residents. The page describes commercial and general use. Secondary sources disagree on recreational (טיסן) flying: some say an online knowledge test from age 12, others say 16, and some say no recreational licence at all. <span class="data-needed">[DATA NEEDED: confirm recreational licence requirement on gov.il]</span>',
    sources: [SRC.govService, SRC.uavcoach, SRC.propelrc]
  },
  {
    id: 'reg-altitude',
    title: 'Maximum altitude: 50 m AGL',
    status: 'ok',
    statusText: 'Consistent',
    body: 'Recreational flights are limited to <strong>50 m above ground level</strong>. One Hebrew source says 50–100 m needs a licence. Set a 50 m altitude alarm in the OSD and keep GPS Rescue return altitude below 50 m (this guide uses 40–45 m).',
    sources: [SRC.uavcoach, SRC.droneLaws, SRC.tgspot]
  },
  {
    id: 'reg-fpv-spotter',
    title: 'FPV goggles need a spotter (16+)',
    status: 'bad',
    statusText: 'Unverified',
    body: 'Every source requires <strong>visual line of sight</strong>, which goggles prevent, so plan to fly FPV with an observer standing next to you. The specific Israeli rule ("spotter required for FPV, aged 16+") came from the original brief. It was <strong>not found in any source checked</strong>. The EU requires an observer for FPV and is linked for comparison. <span class="data-needed">[DATA NEEDED: confirm FPV observer rule and minimum age]</span>',
    sources: [SRC.govService, SRC.easaFpv]
  },
  {
    id: 'reg-night',
    title: 'No night flying (sunset to sunrise)',
    status: 'ok',
    statusText: 'Consistent',
    body: 'Secondary sources say recreational flights between sunset and sunrise are prohibited. The cinewhoop LEDs are for <strong>orientation and visibility at dusk before sunset</strong> and on overcast days, not for night flights. Check sunset time for your location before a golden-hour session.',
    sources: [SRC.uavcoach, SRC.droneLaws]
  },
  {
    id: 'reg-distances',
    title: 'Distance from people, homes & airports',
    status: 'ok',
    statusText: 'Consistent',
    body: 'Do not fly over residential neighbourhoods, public buildings or gatherings of people. Hebrew summaries give <strong>at least 250 m</strong> from those areas and <strong>2 km from airfields</strong>. Many areas are restricted no-fly zones, so check the map before every new spot.',
    sources: [SRC.tgspot, SRC.icdMap, SRC.uavcoach]
  },
  {
    id: 'reg-regime',
    title: 'Which regulations apply (drone vs. model aircraft)',
    status: 'warn',
    statusText: 'Conflicting',
    body: 'Israel has separate rules for small drones and for radio-controlled model aircraft (טיסנים). Older sources say recreational flying falls under the model-aircraft rules. The Knesset Economic Committee approved amendments to both in July 2026. Read the current text and do not rely on pre-2026 summaries. <span class="data-needed">[DATA NEEDED: link the 2026 regulation text once confirmed]</span>',
    sources: [SRC.bhol2026, SRC.shibolet, SRC.govService]
  },
  {
    id: 'reg-rf',
    title: 'Radio equipment (5.8 GHz video, 2.4 GHz control)',
    status: 'bad',
    statusText: 'Unverified',
    body: 'One secondary source says flying needs a Ministry of Communications frequency approval in addition to the CAAI rules. This was not confirmed elsewhere. Buying DJI gear from the official Israeli importer avoids import approval questions for the transmitters. <span class="data-needed">[DATA NEEDED: confirm MoC requirements for personal FPV transmitters]</span>',
    sources: [SRC.droneLaws]
  }
];
