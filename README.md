# Return to Air: FPV Build & Flight Guide

An interactive static site that walks a returning FPV pilot in Israel through building and flying two quads:

- **5" 6S freestyle**: GEPRC Vapor-X5, T-Hobby Velox F7 SE + V70A, DJI O4 Air Unit Pro, ELRS, M10 GPS
- **3" 4S cinewhoop**: GEPRC Cinelog30 V3 O4 Pro with WS2812B dusk LEDs

Features: parts explorer with buy/search/spec/guide links, budget calculator (USD/ILS, Israeli import-VAT model), wiring schematics + UART map, build and pre-flight checklists (saved in the browser), Betaflight / ELRS / O4 Pro setup with copyable CLI, LED_STRIP generator, troubleshooting FAQ, Israel regulations with a source per rule, store comparison, glossary, shopping-list export (plain text + WhatsApp), global search (`/` or `Ctrl+K`), and a live list of open `[DATA NEEDED]` items.

There is no framework, bundler or runtime dependency. It is plain HTML, CSS and native ES modules.

## Project structure

```
index.html                  Page markup (chapters, static content)
assets/
  css/                      One stylesheet per area, loaded in cascade order
    tokens.css              Colours, fonts, radii (dark default + light theme)
    base.css  layout.css    Reset, typography, header/nav, cards, badges
    hero.css  parts.css  budget.css  wiring.css  build.css
    software.css  preflight.css  search.css  reference.css
    utilities.css           Reveal animation, a11y helpers, responsive fixes
  js/
    main.js                 Entry point: initialises each feature (isolated try/catch)
    config.js               LAST_VERIFIED date
    data/                   Content only, no DOM code
      parts.js              PARTS_DATA: parts, prices, weights, links, gotchas
      budget-options.js     Alternatives offered in the budget dropdowns
      build-phases.js  preflight.js  faq.js  led-presets.js
      regulations.js  stores.js  glossary.js  data-needed.js
    features/               One module per interactive feature
      parts-explorer.js  budget.js  shopping-list.js  build-timeline.js
      preflight-faq.js  led-strip.js  cli-copy.js  wiring.js
      regulations.js  glossary.js  data-needed.js  search.js
      theme.js  scroll-nav.js
    utils/                  storage.js (localStorage + memory fallback), dom.js, clipboard.js
scripts/
  serve.mjs                 Zero-dependency dev server
  check-syntax.mjs          Parses every module and verifies every import/export
tests/
  smoke.test.mjs            Playwright end-to-end tests (node:test runner)
.github/workflows/pages.yml CI on every push/PR; deploys to GitHub Pages from main
```

Features communicate through imports. The one exception is the budget, which announces changes with a `budget:change` DOM event so the shopping list can update without a circular import.

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
