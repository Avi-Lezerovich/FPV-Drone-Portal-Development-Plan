/** Where-to-buy comparison and counterfeit-spotting tips. */

export const STORES_DATA = [
  {
    name: 'DJI Israel (official importer, Benda), djistore.benda.co.il',
    url: 'https://www.djistore.benda.co.il/',
    bestFor: 'Goggles 3, O4 Air Unit Pro',
    pros: 'Local Israeli warranty and service. VAT already paid, no customs wait. Easy returns.',
    cons: 'Highest price: O4 Air Unit Pro ₪1,349 and Goggles 3 ₪2,499 (Oct 2026), well above an import plus VAT. Small FPV range: no frames, motors or stacks.',
    warranty: 'Official Israeli DJI warranty (check terms at purchase).',
    shipping: 'Local delivery or pickup. No import step.'
  },
  {
    name: 'GetFPV (USA)',
    url: 'https://www.getfpv.com/',
    bestFor: 'Motors, stacks, receivers, tools',
    pros: 'Huge stock, accurate specs, reliable genuine products.',
    cons: 'US shipping costs. Cannot air-ship LiPos to Israel.',
    warranty: 'Store DOA/returns policy plus manufacturer warranty, usually handled via return shipping.',
    shipping: 'Courier is fast but expensive. Parcels above the exemption threshold pay 18% VAT, and courier handling fees may apply.'
  },
  {
    name: 'RaceDayQuads (USA)',
    url: 'https://www.racedayquads.com/',
    bestFor: 'Frames, motors, props, hardware',
    pros: 'Strong FPV range, good bundles, US stock.',
    cons: 'Same international shipping and LiPo limits as other US shops.',
    warranty: 'Store policy plus manufacturer warranty.',
    shipping: 'International courier. Combine orders to reduce shipping, but the combined parcel may cross the VAT threshold.'
  },
  {
    name: 'Pyrodrone (USA)',
    url: 'https://pyrodrone.com/',
    bestFor: 'GEPRC frames, Matek GPS, accessories',
    pros: 'Competitive prices, stocks many GEPRC and Matek parts.',
    cons: 'International shipping options vary by item.',
    warranty: 'Store policy plus manufacturer warranty.',
    shipping: 'Check international options at checkout. LiPos usually cannot ship by air.'
  },
  {
    name: 'Manufacturer stores (GEPRC, RadioMaster, T-Hobby, Holybro, PINE64)',
    url: 'https://geprc.com/',
    bestFor: 'BNF Cinelog30 V3, TX15, Velox stack, Pinecil V2',
    pros: 'Genuine product guaranteed, newest versions first, direct support.',
    cons: 'Some ship from China (slower). Pre-orders are common.',
    warranty: 'Direct manufacturer warranty, often requiring a video of the fault.',
    shipping: 'Usually express from China or HK. Expect VAT above the threshold.'
  },
  {
    name: 'AliExpress (official brand stores only)',
    url: 'https://www.aliexpress.com/',
    bestFor: 'Props, wire, LED strips, heat shrink, consumables',
    pros: 'Cheapest prices, Israeli-friendly shipping, small orders often under the VAT threshold.',
    cons: 'Counterfeits and old revisions are common. Buy from official brand stores only. Slow.',
    warranty: 'Buyer protection and disputes only. Manufacturer warranty depends on the seller.',
    shipping: 'AliExpress shipping to Israel is usually cheapest. Batteries go by special or sea routes and are slow.'
  },
  {
    name: 'European shops (Rotorama, Drone-FPV-Racer, HobbyRC UK)',
    url: 'https://www.rotorama.com/',
    bestFor: 'Motors, Cinelog30 V3, spares when US stock is out',
    pros: 'Good stock, fast EU logistics, EU consumer protection.',
    cons: 'Prices shown with EU VAT. Check whether export removes it.',
    warranty: 'EU store policy plus manufacturer warranty.',
    shipping: 'Courier to Israel. Israeli VAT still applies above the threshold.'
  },
  {
    name: 'Amazon (US / DE)',
    url: 'https://www.amazon.com/',
    bestFor: '18650 cells (where allowed), multimeter, tools, storage',
    pros: 'Easy returns, sometimes free shipping to Israel over a minimum spend.',
    cons: 'Fake Pinecils, solder and batteries are common from third-party sellers.',
    warranty: 'Amazon return window plus manufacturer warranty.',
    shipping: 'Amazon Global. Import charges may be collected at checkout. Many battery items cannot ship to Israel.'
  }
];

export const COUNTERFEIT_TIPS = [
  { title: 'Buy flight electronics from known channels', text: 'FCs, ESCs, receivers and the O4 Pro should come from the manufacturer, an authorised FPV retailer or the brand\'s official AliExpress store. Third-party listings are where clones live.' },
  { title: 'If it is far below market price, it is wrong', text: 'An O4 Air Unit Pro or Goggles 3 30–40% under everyone else is usually grey, refurbished or fake. Compare with at least two big FPV shops.' },
  { title: 'Check revision and version names', text: 'Old revisions (V1 stacks, O3-era frames, RP3 V1) are sold as current. Match the exact name: "Vapor-X5 O4 Pro", "RP3 V2", "Velox F7 SE".' },
  { title: 'Pinecil: official PINE64 store only', text: 'Fake Pinecils flood marketplaces. Buy from the PINE64 store and check the device in IronOS after delivery.' },
  { title: 'LiPos: weigh and check internal resistance', text: 'Under-weight packs with suspiciously high C ratings are a red flag. Weigh new packs and compare per-cell IR on your charger. Retire packs that puff.' },
  { title: 'Solder: genuine 63/37 melts at 183 °C', text: 'Cheap "63/37" that stays pasty or needs 400 °C+ is mislabelled. Buy from an electronics distributor or a trusted brand.' },
  { title: 'DJI: activate and check serials', text: 'Activate the O4 Pro and Goggles 3 in DJI Assistant 2 right away. Activation problems or mismatched serials on the box mean return it.' },
  { title: 'Photograph everything on arrival', text: 'Unboxing photos and video make AliExpress disputes and warranty claims much easier, especially for DOA motors and ESCs.' }
];
