# Return to Air: FPV Build & Flight Guide

An interactive static site that walks a returning FPV pilot in Israel through building and flying two quads:

- **5" 6S freestyle**: GEPRC Vapor-X5, T-Hobby Velox F7 SE + V70A, DJI O4 Air Unit Pro, ELRS, M10 GPS
- **3" 4S cinewhoop**: GEPRC Cinelog30 V3 O4 Pro with WS2812B dusk LEDs

Features: a dimensioned top-view drawing of the 5″ build with a live progress strip, Flight Lab (weight vs 250 g + flight-time estimator, interactive motor-order / prop-direction visualiser, LiPo/LiHV charging helper with Betaflight CLI), parts explorer with a picture of each part, search, sorting and buy/search/spec/guide links, budget calculator (USD/ILS, Israeli import-VAT model), wiring schematics + UART map, build and pre-flight checklists (saved in the browser), Betaflight / ELRS / O4 Pro setup with copyable CLI, LED_STRIP generator, troubleshooting FAQ, store comparison and counterfeit checks, glossary, shopping-list export (plain text + WhatsApp), global search (`/` or `Ctrl+K`), and a live list of open `[DATA NEEDED]` items.

There is no framework, bundler or runtime dependency. It is plain HTML, CSS and native ES modules.

## Design

The look is a technical manual, not a gaming HUD:

- **Colour:** cool graphite neutrals and one blueprint-blue accent, used for the active thing (current chapter, selected filter, primary action). Green, amber and red are used only for status (ok, warning, problem).
- **Type:** Archivo (semi-condensed) for headings, IBM Plex Sans for reading at 16–18 px, IBM Plex Mono only for values, pins and code.
- **Surfaces:** cards with hairline borders and soft, low elevation that lifts on hover. Filters, tags and link chips are pill-shaped; tab bars are segmented controls.
- **Structure:** the 11 chapters are grouped into four stages (Plan, Build, Set up, Fly) plus Reference. Each chapter opens with a numbered plate and its stage, and ends with previous/next links.
- **Orientation:** the overview has a progress dashboard, a four-stage roadmap and a "Continue at …" link back to the last chapter you read. The sidebar shows live budget, checklist progress and open items next to their chapters.
- **Dark panels:** terminal, schematics and OSD stay dark in both themes.
- **Labels:** no emoji, all-caps or `//` labels, in sentence case.
- **Inline styles:** none in the markup except table column widths and wire-colour swatches.
- **Themes:** light and dark are both designed; the page follows the OS until you pick one.

### On phones

The phone layout is designed separately, not just squeezed down.

- **Navigation:** the top bar shows the chapter you are in. Tap it to open all 11 chapters, grouped by stage, as a bottom sheet. Each chapter ends with a link to the next.
- **Long content is folded on every screen:** Betaflight and ELRS steps are an accordion with "Expand all"; only the build phase you are on starts open; troubleshooting answers, the budget line items, the store comparison, counterfeit checks, the shopping-list preview and open items each sit behind one tappable row; the glossary shows 12 terms (8 on phones) until "Show all". A card you open stays open while you tick boxes.
- **Parts:** each part is a catalog row on desktop and a stacked card on phones: picture, name, build and category tags, an "In budget" tag that follows the Budget ticks, estimated price and weight, and one primary **Buy at …** button (or **Find at …** when there is only a store search). The "Watch out" row opens the gotcha and every link, grouped into Buy, Search stores and Reference. "Expand all" opens every row.
- **Long reference blocks:** the line items, UART map, store comparison, counterfeit tips and open items fold up behind a single tappable row.
- **Tables:** they turn into labelled cards, so nothing needs sideways scrolling. The schematics are the one exception and say so.
- **Touch:** tap targets are at least 44 px, and form fields use 16 px text so iOS doesn't zoom when you tap into one.
- **Result:** the page is about 22,500 px tall on an iPhone 13 (about 17,000 px on a 1440 px desktop). Before the phone layout it was about 64,000 px. Three phone tests in `tests/smoke.test.mjs` check this.

## Project structure

```
index.html                  Page markup (chapters, static content)
assets/
  css/                      Six stylesheets, loaded in cascade order
    tokens.css              Colours (light + dark), elevation, type scale, radii; legacy aliases for JS templates
    base.css                Reset, typography, utilities, motion, toast, back-to-top
    layout.css              Top bar, contents rail (sticky sidebar / mobile strip), chapter headers, footer
    components.css          Cards, tags, buttons, inputs, notes, tables, terminal panels, accordion, search
    hero.css                Opening section, dimensioned top-view drawing, progress dashboard, stage roadmap
    chapters.css            Per-chapter layouts (fleet, parts, budget, Flight Lab, wiring, build, software, pre-flight, reference)
  js/
    main.js                 Entry point: initialises each feature (isolated try/catch)
    config.js               LAST_VERIFIED date
    data/                   Content only, no DOM code
      parts.js              PARTS_DATA: parts, prices, weights, links, gotchas
      budget-options.js     Alternatives offered in the budget dropdowns
      build-phases.js  preflight.js  faq.js  led-presets.js
      stores.js  glossary.js  data-needed.js
      flight-lab.js         Dry/battery weights, current profiles, motor layout, cell voltages
      part-art.js           Line drawing of each part for the part cards
    features/               One module per interactive feature
      parts-explorer.js  budget.js  shopping-list.js  build-timeline.js
      preflight-faq.js  led-strip.js  cli-copy.js  wiring.js
      stores.js  glossary.js  data-needed.js  search.js
      flight-lab.js         Weight vs 250 g, flight time, motor/prop visualiser, battery helper
      mission-status.js     Hero progress strip (listens to budget/progress/data-needed events)
      chapter-chrome.js     Stage eyebrows, previous/next links, live nav progress, "Continue at …" link
      toc-sheet.js          Phone chapter switcher (bottom sheet)
      theme.js  scroll-nav.js
    utils/                  storage.js (localStorage + memory fallback), dom.js, clipboard.js, toast.js,
                            collapse.js (cards open on desktop, collapsed on phones)
scripts/
  serve.mjs                 Zero-dependency dev server
  check-syntax.mjs          Parses every module and verifies every import/export
tests/
  smoke.test.mjs            Playwright end-to-end tests (node:test runner)
.github/workflows/pages.yml CI on every push/PR; deploys to GitHub Pages from main
```

Features communicate through imports, plus three DOM events so that no module needs to know who is listening:
`budget:change` (totals), `progress:change` (build / pre-flight checklists) and `dataneeded:change` (open-item count).
The shopping list, the hero mission strip and the chapter nav subscribe to them.

## Develop

ES modules do not load from `file://`, so run the local server:

```sh
npm install          # dev dependency only: Playwright for tests
npm start            # http://localhost:8000
```

Before pushing:

```sh
npm run check                          # syntax + import/export check (no browser)
npx playwright install chromium        # first time only
npm test                               # end-to-end smoke tests
```

## Deploy to GitHub Pages

1. In the repo, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
2. Merge into `main`. The workflow runs the checks and tests, then publishes `index.html` + `assets/` to `https://<user>.github.io/<repo>/`.

Pushes to other branches and pull requests run the tests only.

## Editing content

Most changes only touch `assets/js/data/`:

- **Add a part:** append an object to `PARTS_DATA` (`drone`: `5inch | cinewhoop | shared | tools`). Optionally add dropdown alternatives in `budget-options.js` under the same `id`. Filter counts, budget rows, the shopping list and search pick it up automatically.
- **Part pictures:** each part card shows a line drawing from `part-art.js` (by part `id`, falling back to its category). To use a real photo instead, put the file in `assets/img/parts/` and add `image: 'assets/img/parts/<id>.jpg'` to the part in `parts.js`. Use photos you have the right to publish, such as your own.
- **Mark something unverified:** a part whose `verifiedSource` contains "estimate" appears in the `[DATA NEEDED]` list. Other items go in `data-needed.js`.
- **Update the verification date:** `assets/js/config.js`.

## Accuracy

Prices and weights are estimates. The Israeli import-VAT threshold changed several times in 2025–2026. The site shows conflicting sources side by side and marks unconfirmed facts as `[DATA NEEDED]`. Check official sources before you buy or fly.
