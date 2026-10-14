# Return to Air: FPV Build & Flight Guide

A single-file interactive site (`index.html`) that walks a returning FPV pilot in Israel through building and flying two quads:

- **5" 6S freestyle**: GEPRC Vapor-X5, Velox F7 SE + V70A, DJI O4 Air Unit Pro, ELRS, M10 GPS
- **3" 4S cinewhoop**: GEPRC Cinelog30 V3 O4 Pro with WS2812B dusk LEDs

Chapters: fleet overview, parts explorer (filters + buy/search/spec/guide links), budget calculator (USD/ILS, editable rate, Israeli VAT model), wiring diagrams + UART map, build checklists, Betaflight / ELRS / O4 Pro setup, LED_STRIP generator, pre-flight checklist + troubleshooting FAQ, Israel regulations with sources, store comparison, glossary, shopping-list export (plain text + WhatsApp), global search (`/` or `Ctrl+K`), and a live list of open `[DATA NEEDED]` items.

There is no build step and no dependencies. The only external request is Google Fonts, with system-font fallbacks. Checklist, budget and theme state is saved in `localStorage`, with an in-memory fallback.

## Deploy on GitHub Pages

**Option A: GitHub Actions (included)**
1. Merge this branch into `main`.
2. In the repo, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab). The site goes live at `https://<user>.github.io/<repo>/`.

**Option B: Deploy from branch**
1. **Settings → Pages → Source: Deploy from a branch**, branch `main`, folder `/ (root)`.
2. Save. `index.html` is served as is. The `.nojekyll` file stops Jekyll from processing it.

## Run locally

Open `index.html` in a browser. To test clipboard copy (which needs a secure context), serve it instead:

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```

## Editing content

All data lives in clearly marked JS blocks inside `index.html`:

| Block | What it holds |
| --- | --- |
| `PARTS_DATA` | Parts, prices, weights, links, gotchas |
| `BUDGET_ALT_OPTIONS` | Alternatives offered in the budget dropdowns |
| `BUILD_PHASES_DATA`, `PREFLIGHT_CARDS_DATA`, `FAQ_DATA` | Checklists and troubleshooting |
| `REGULATIONS_DATA`, `STORES_DATA`, `COUNTERFEIT_TIPS` | Chapter 10 |
| `GLOSSARY_DATA`, `STATIC_DATA_NEEDED` | Chapter 11 and the open-items list |
| `LAST_VERIFIED` | Date shown in the footer and on the regulations chapter |

## Accuracy

Prices and weights are estimates. Israeli regulations and the import-VAT threshold changed several times in 2025–2026. The page shows conflicting sources side by side and marks unconfirmed facts as `[DATA NEEDED]`. Check the official sources before you buy or fly.
