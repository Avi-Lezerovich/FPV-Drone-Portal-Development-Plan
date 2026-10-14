# Return to Air: FPV Build & Flight Guide

An interactive static site that walks a returning FPV pilot in Israel through building and flying two quads:

- **5" 6S freestyle**: GEPRC Vapor-X5, T-Hobby Velox F7 SE + V70A, DJI O4 Air Unit Pro, ELRS, M10 GPS
- **3" 4S cinewhoop**: GEPRC Cinelog30 V3 O4 Pro with WS2812B dusk LEDs

Features: a dimensioned top-view drawing of the 5″ build with a live progress strip, Flight Lab (weight vs 250 g + flight-time estimator, interactive motor-order / prop-direction visualiser, LiPo/LiHV charging helper with Betaflight CLI), parts explorer with search and sorting with buy/search/spec/guide links, budget calculator (USD/ILS, Israeli import-VAT model), wiring schematics + UART map, build and pre-flight checklists (saved in the browser), Betaflight / ELRS / O4 Pro setup with copyable CLI, LED_STRIP generator, troubleshooting FAQ, Israel regulations with a source per rule, store comparison, glossary, shopping-list export (plain text + WhatsApp), global search (`/` or `Ctrl+K`), and a live list of open `[DATA NEEDED]` items.

There is no framework, bundler or runtime dependency. It is plain HTML, CSS and native ES modules.

## Design

The look is a technical manual, not a gaming HUD:

- **Colour:** cool graphite neutrals and one blueprint-blue accent. Green, amber and red are used only for status (ok, warning, problem).
- **Type:** Archivo (semi-condensed) for headings, IBM Plex Sans for reading, IBM Plex Mono only for values, pins and code.
- **Surfaces:** flat cards with hairline borders, no glow or glass.
- **Dark panels:** terminal, schematics and OSD stay dark in both themes.
- **Labels:** no emoji, all-caps or `//` labels, in sentence case.
- **Inline styles:** none in the markup except table column widths and wire-colour swatches.
- **Themes:** light and dark are both designed; the page follows the OS until you pick one.

### On phones

The phone layout is designed separately, not just squeezed down.

- **Navigation:** the top bar shows the chapter you are in. Tap it to open all 12 chapters as a bottom sheet.
- **Cards:** parts, setup steps, build phases, pre-flight cards and rules open as summaries (name, price, status). Tap one to expand it. On desktop they start open, and a card you open stays open while you tick boxes.
- **Long reference blocks:** the line items, UART map, store comparison, counterfeit tips and open items fold up behind a single tappable row.
- **Tables:** they turn into labelled cards, so nothing needs sideways scrolling. The schematics are the one exception and say so.
- **Touch:** tap targets are at least 44 px, and form fields use 16 px text so iOS doesn't zoom when you tap into one.
- **Result:** the page is about 24,000 px tall on an iPhone 13. Before this layout it was about 64,000 px. Three phone tests in `tests/smoke.test.mjs` check this.

## Project structure

```
index.html                  Page markup (chapters, static content)
assets/
  css/                      Six stylesheets, loaded in cascade order
    tokens.css              Colours (light + dark), type scale, radii; legacy aliases for JS templates
    base.css                Reset, typography, utilities, motion, toast, back-to-top
    layout.css              Top bar, contents rail (sticky sidebar / mobile strip), chapter headers, footer
    components.css          Cards, tags, buttons, inputs, notes, tables, terminal panels, accordion, search
    hero.css                Opening section, dimensioned top-view drawing, progress strip
    chapters.css            Per-chapter layouts (fleet, parts, budget, Flight Lab, wiring, build, software, pre-flight, reference)
  js/
    main.js                 Entry point: initialises each feature (isolated try/catch)
    config.js               LAST_VERIFIED date
    data/                   Content only, no DOM code
      parts.js              PARTS_DATA: parts, prices, weights, links, gotchas
      budget-options.js     Alternatives offered in the budget dropdowns
      build-phases.js  preflight.js  faq.js  led-presets.js
      regulations.js  stores.js  glossary.js  data-needed.js
      flight-lab.js         Dry/battery weights, current profiles, motor layout, cell voltages
    features/               One module per interactive feature
      parts-explorer.js  budget.js  shopping-list.js  build-timeline.js
      preflight-faq.js  led-strip.js  cli-copy.js  wiring.js
      regulations.js  glossary.js  data-needed.js  search.js
      flight-lab.js         Weight vs 250 g, flight time, motor/prop visualiser, battery helper
      mission-status.js     Hero progress strip (listens to budget/progress/data-needed events)
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
The shopping list and the hero mission strip subscribe to them.

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
- **Mark something unverified:** a part whose `verifiedSource` contains "estimate", or a regulation with `status: 'warn' | 'bad'`, appears in the `[DATA NEEDED]` list. Other items go in `data-needed.js`.
- **Update the verification date:** `assets/js/config.js`.

## Accuracy

Prices and weights are estimates. Israeli regulations and the import-VAT threshold changed several times in 2025–2026. The site shows conflicting sources side by side and marks unconfirmed facts as `[DATA NEEDED]`. Check official sources before you buy or fly.
