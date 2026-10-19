# Return to Air: FPV Build & Flight Guide

An interactive static site that walks a returning FPV pilot in Israel through building and flying two quads:

- **5" 6S freestyle**: GEPRC Vapor-X5, T-Hobby Velox F7 SE + V70A, DJI O4 Air Unit Pro, ELRS, M10 GPS
- **3" 4S cinewhoop**: GEPRC Cinelog30 V3 O4 Pro with WS2812B dusk LEDs

Features: a dimensioned top-view drawing of the 5″ build with a live progress strip, Flight Lab (weight vs 250 g + flight-time estimator, interactive motor-order / prop-direction visualiser, LiPo/LiHV charging helper with Betaflight CLI), parts explorer with a picture of each part, search, sorting and buy/search/spec/guide links, budget calculator (USD/ILS, Israeli import-VAT model), wiring schematics + UART map, build and pre-flight checklists (saved in the browser), Betaflight / ELRS / O4 Pro setup with copyable CLI, LED_STRIP generator, troubleshooting FAQ, store comparison and counterfeit checks, glossary, shopping-list export (plain text + WhatsApp), global search (`/` or `Ctrl+K`), and a live list of open `[DATA NEEDED]` items.

There is no framework, bundler or runtime dependency. It is plain HTML, CSS and native ES modules.

## Design

The guide works like an app, not one long page: a home screen, then one chapter on screen at a time.

- **Structure:** a home screen plus 10 chapters in five stages (Plan, Build, Set up, Fly, Reference). The URL hash picks the chapter (`#parts`), and any id inside a chapter works as a deep link (`#troubleshooting`, `#sw-3`): that chapter opens and scrolls to it. Every chapter is still in `index.html`, so without JavaScript, and in print, the guide reads top to bottom. Routing lives in `assets/js/features/router.js`.
- **Home:** what the guide is, a "Continue at …" button back to the last chapter you read, the key specs, a "Next on the bench" card that links straight to the next unticked build or pre-flight task, a progress dashboard, and a card per stage listing its chapters with live budget and checklist progress.
- **Chapters:** each opens with a numbered plate and its stage, and ends with previous/next links. On phones and tablets, tabs above the plate switch between the chapters of the same stage.
- **Colour:** warm paper neutrals and one signal-orange accent, used for the thing to act on (primary button, current chapter, selected filter). Green, yellow and rose are used only for status (ok, warning, problem). Every text colour pairing meets WCAG AA.
- **Type:** Bricolage Grotesque for headings, Geist for reading at 16–18 px, Geist Mono only for values, pins and code.
- **Surfaces:** cards with hairline borders and soft, low elevation that lifts on hover. Filters, tags, stage tabs and link chips are pill-shaped; tab bars are segmented controls.
- **Wiring:** each build gets numbered connection cards in soldering order, one per part, listing every wire pad to pad with its colour, solder joints and data direction, plus what to remove and the Betaflight port setting. Data lives in `assets/js/data/wiring.js`. The full schematic and the UART map sit in folds below.
- **Orientation:** on desktop a sidebar lists every chapter by stage with live budget, checklist progress and open items. The top bar has search (`/` or `Ctrl+K`) and the theme switch.
- **Dark panels:** terminal, schematics and OSD stay dark in both themes.
- **Labels:** no emoji, all-caps or `//` labels, in sentence case.
- **Inline styles:** none in the markup except table column widths and wire-colour swatches.
- **Themes:** light and dark are both designed; the page follows the OS until you pick one.

### On phones

The phone layout is designed separately, not just squeezed down.

- **Navigation:** a bottom tab bar with Home and the five stages. A stage tab returns to the chapter you last had open in that stage; tabs at the top of the chapter switch between its chapters. The top bar names the chapter you are in. Each chapter ends with a link to the next.
- **Long content is folded on every screen:** Betaflight and ELRS steps are an accordion with "Expand all"; only the build phase you are on starts open; troubleshooting answers, the budget line items, the store comparison, counterfeit checks, the shopping-list preview and open items each sit behind one tappable row; the glossary shows 12 terms (8 on phones) until "Show all". A card you open stays open while you tick boxes.
- **Parts:** each part is a catalog row on desktop and a stacked card on phones: picture, name, build and category tags, an "In budget" tag that follows the Budget ticks, estimated price and weight, and one primary **Buy at …** button (or **Find at …** when there is only a store search). The "Watch out" row opens the gotcha and every link, grouped into Buy, Search stores and Reference. "Expand all" opens every row.
- **Long reference blocks:** the line items, UART map, store comparison, counterfeit tips and open items fold up behind a single tappable row.
- **Tables:** they turn into labelled cards, so nothing needs sideways scrolling. The wiring schematics are the one exception, so on phones they sit folded under the connection cards.
- **Touch:** tap targets are at least 44 px, and form fields use 16 px text so iOS doesn't zoom when you tap into one.
- **Result:** on an iPhone 13 the home screen is about 3,000 px and the longest chapter (Parts) about 5,400 px. The guide used to be a single 22,500 px page (64,000 px before the first phone layout). Phone tests in `tests/smoke.test.mjs` check every screen's height, the tab bar and sideways overflow.

## Project structure

```
index.html                  Page markup (chapters, static content)
assets/
  css/                      Six stylesheets, loaded in cascade order
    tokens.css              Colours (light + dark), elevation, type scale, radii; legacy aliases for JS templates
    base.css                Reset, typography, utilities, motion, toast, back-to-top
    layout.css              App shell: top bar, desktop sidebar, phone tab bar, stage tabs, chapter plates, pager, footer
    components.css          Cards, tags, buttons, inputs, notes, tables, terminal panels, accordion, search
    home.css                Home screen: intro, dimensioned top-view drawing, specs, progress dashboard, stage cards
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
      wiring.js             Wire-by-wire connections per build (connection cards)
      part-art.js           Line drawing of each part for the part cards
    features/               One module per interactive feature
      parts-explorer.js  budget.js  shopping-list.js  build-timeline.js
      preflight-faq.js  led-strip.js  cli-copy.js  wiring.js
      stores.js  glossary.js  data-needed.js  search.js
      flight-lab.js         Weight vs 250 g, flight time, motor/prop visualiser, battery helper
      next-step.js          Home card naming the next unticked checklist task
      router.js             One chapter on screen at a time, picked by the URL hash; deep links into chapters
      mission-status.js     Home progress strip (listens to budget/progress/data-needed events)
      chapter-chrome.js     Stage eyebrows and tabs, previous/next links, live progress, tab bar state, "Continue at …"
      theme.js  scroll-nav.js (reading progress, back-to-top)
    utils/                  storage.js (localStorage + memory fallback), dom.js, clipboard.js, toast.js,
                            collapse.js (cards open on desktop, collapsed on phones)
scripts/
  serve.mjs                 Zero-dependency dev server
  check-syntax.mjs          Parses every module and verifies every import/export
tests/
  smoke.test.mjs            Playwright end-to-end tests (node:test runner)
.github/workflows/pages.yml CI on every push/PR; deploys to GitHub Pages from main
```

Features communicate through imports, plus four DOM events so that no module needs to know who is listening:
`budget:change` (totals), `progress:change` (build / pre-flight checklists), `dataneeded:change` (open-item count)
and `chapter:change` (the router opened a chapter).
The shopping list, the home progress strip, the chapter nav, the tab bar and the "Continue at …" link subscribe to them.

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
