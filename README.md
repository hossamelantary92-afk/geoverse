# GeoVerse v4 — Premium Cinematic Geography Atlas

## Implemented

- WebGL 3D Earth using Globe.gl on the homepage and on geographic profiles, with rotate, zoom, atmospheric glow and country polygons. 2D world map remains as a fallback.
- All 18 original topics retained; premium responsive RTL/LTR interface and custom SVG category icons.
- Countries & Capitals: 241 country and territory metadata records sourced from samayo/country-json, with ISO code, SVG flag, capital, continent and currency where available. Alphabetical country browser grouped by continent.
- Boundaries: local world.geojson has 180 geometries; 169 match country metadata. Missing independent geometries cannot be highlighted. Continental and transcontinental conventions are explicitly approximate.
- Country profiles and natural-feature pages: 3D location and sourced Wikipedia summaries and photos when a matching article exists; optional Wikimedia Commons photo gallery drawn only from the matching article.
- Selected thematic area highlights and river/mountain paths on globe are illustrative rather than authoritative survey geometry; remaining places use location markers.
- SVG flag questions and enlarged capitals question pool. Hidden SVG title/labels scrubbed for click-country quiz fairness.
- Browser local progress preserved; no account sync.

## Core files

- index.html, styles.css, app.js: original website and map/games.
- enhancements.css, enhancements.js: V4 3D globe and high-end encyclopedia layout.
- country-meta.json: country metadata from https://github.com/samayo/country-json.
- world.geojson: local political geometry from https://github.com/johan/world.geo.json.

## Operational notes

Globe.gl, D3, FlagCDN, Wikipedia and some imagery need network access. Some country metadata (capitals/currencies/geopolitical definitions) may be outdated; do not use as an authoritative government registry. Not all entries have verified photographs, and not all natural-feature overlays represent exact boundaries. 3D requires WebGL, with 2D as fallback.

Test with python3 -m http.server 8080 from the repository root. Code syntax and DOM smoke tests passed; production visual/browser tests remain recommended before certifying WebGL behavior on every device.

---

# GeoVerse 🌍 · v3 Cinematic Atlas

An Arabic-first, bilingual geography learning platform built as a responsive static website.

## Release highlights
- Cinematic three-column dashboard: expedition hero, photographic geography cards, explorer progress, daily challenges and featured destination.
- 18 geography sections with plain-language definitions and **229 curated examples** (countries, capitals, oceans, rivers, deserts, mountains, volcanoes and more).
- Themed learning journey with four stages and a progress tracker.
- Interactive **vector world atlas** with bundled local `world.geojson`, country outlines, click-to-highlight, pan, zoom, and thematic illustrations of selected rivers, oceans, forests, deserts and mountain ranges.
- 7 quiz modes: mixed geography, capitals, categories, concept definitions, identify a place by description, flags, and **click the country on the map**.
- Browser-local learning progress and quiz scores, English/Arabic toggle, responsive styling.

## Hosting
No build step. Deploy the repo root as a static site. Vercel detects the `vercel.json` configuration, and GitHub Pages can serve `index.html` directly.

## Data and map notes
- Political country boundaries are loaded from the bundled public-domain Natural Earth-style dataset `world.geojson` (source: [johan/world.geo.json](https://github.com/johan/world.geo.json)), maintained as a separate local file. The atlas displays 180 features; it is not an official border authority and some disputed borders depend on dataset conventions.
- Some river centerlines, desert/forest/ocean extents, and mountain routes are **illustrative approximations**, not survey-grade or official boundaries. They are visually distinguishable from country boundaries; not all topics yet have polygons or lines.
- D3 geographical projection and D3 Array are loaded via CDN for map rendering; the geometries themselves are local. An internet connection is still needed for the D3 library, Google Fonts, and remote category photographs.
- The 229 geography examples are a **curated educational selection**, not a full set of the world's countries or landmarks. Some newer entries have introductory descriptions rather than verified detailed measurements.
- Images are retrieved from Unsplash image URLs. Review image rights and suitability before commercial distribution.
- Browser storage is per-device; there is no user account or Firebase sync in this release.

## Local test
Serve the folder with `python3 -m http.server 8080` and open `http://localhost:8080`. Opening as `file://` may block local GeoJSON loading.

## Recommended future upgrades
- Detailed data source citation for every statistic and destination.
- Verified GeoJSON layers for the Nile, Amazon, forests, deserts, oceans and major watersheds.
- More country profiles, capitals, flags, and country-level maps.
- Offline caching of map libraries, image optimization, keyboard accessibility, localization audit, and optional cloud sync.


## GeoVerse v4 Premium Cinematic Atlas

**Status:** v4 enhancement layer over v3. The original 18 topic categories, bilingual learning, progress, and quiz modes remain in place.

### Experience
- New real-time 3D Earth explorer using Globe.GL (WebGL/Three.js), with interactive drag/zoom, atmospheric halo, satellite-like Blue Marble surface, and camera focus on selected places.
- 3D views in the hero, Atlas Explore, selected continent detail, geographic landmark detail, and country profiles. 2D atlas remains available as a fallback and complement.
- Premium dark atlas visual layer and unified SVG icons for navigation, topic categories, and geography cards.
- 241 selectable country/territory metadata entries from a 251-row source (entries without region or ISO code are excluded), grouped by continent; original educational dataset still supplements profiles. Real ISO-linked SVG flags use FlagCDN, rather than emoji flags.
- Continent selection in 3D highlights groupings of countries in the current polygon dataset, with full-world dimming. Several transcontinental cases (e.g., Turkey, Russia) have approximate whole-country highlights and are *not an exact continental fault line*; overlays and contested borders require a more detailed spatial dataset.
- Rich landmark pages contain geolocation, original short descriptions, optional exact-title Wikipedia article excerpt and photo with a source link. Topic cards attempt to retrieve exact-match Wikimedia thumbnails and leave a clear icon placeholder if unavailable rather than showing a misleading picture of another place.
- Additional real-flag and capitals quiz questions generated from the full catalogue. Interactive map guessing suppresses native country titles, hover popups and labels until a response.

### Source notes and known limits
- Country metadata: [samayo/country-json](https://github.com/samayo/country-json), which is not an official or reliably current source of political, population or capital details. Specific special-capital, country naming, and border disputes need source-by-source review before educational publication.
- Country geometry: [johan/world.geo.json](https://github.com/johan/world.geo.json), a simplified global dataset with 180 features; not all dependent territories are represented with separate polygons.
- Globe textures: publicly served example images from Three-Globe. 3D renderer: Globe.GL (MIT).
- SVG flags: [FlagCDN](https://flagcdn.com), based on country ISO codes. Photos/articles are loaded from Wikipedia/Wikimedia only when title matching succeeds. Media requires an active internet connection; Wikimedia image licensing and author attribution should be checked per item.
- Some descriptions for geographic landmarks remain introductory; additional detailed bilingual content is a future expansion and is not claimed as completed. For natural features like rivers, deserts and oceans, where verified polygon/line geometry isn't available, the 3D globe shows a representative point. The existing 2D illustrative overlays explicitly remain approximate.
- Geographical category membership is conventional for some transcontinental countries and territories; the default country list includes some territories alongside sovereign states. Region counts should not be presented as UN-member counts.
- Not yet verified through a real interactive browser screenshot on iPhone/desktop; JS syntax and simulated navigation/globe/quiz tests were conducted before merge. QA should include WebGL resource availability, focus accessibility, Wikimedia image loading, and country quiz tooltips on hover.


## GeoVerse v5 — Quality + Arabic Encyclopedia Starter

- **Plain Arabic by default:** the Arabic interface now prefers the corresponding Arabic Wikipedia article instead of presenting raw English-language extracts. When an Arabic article is unavailable, an original Arabic introductory summary is shown instead. The English interface remains unchanged.
- **37 curated bilingual geography field notes:** geo-stories.json supplies accessible Arabic explanations for selected deserts, oceans, seas, rivers, falls, forests, mountains, lakes, islands, volcanoes, waterways, and climate types. These are educational introductions, not exhaustive biographies. Other entries still use existing Arabic introductions.
- **Map quiz fair play:** SVG country shapes in the map-based answer game are generated without country-name native title tooltips or answer-leaking aria labels before selection. Ordinary exploration labels are retained. Accessibility alternatives for nonvisual map play remain a future requirement.
- **Globe performance:** cap WebGL renderer pixel ratio (especially on phones) and pause animation while the browser tab is hidden, where the Globe.GL API supports it.
- **Visual enhancement:** premium responsive field-note cards with simple localized text and facts.
- **QA:** JavaScript syntax, mocked DOM page navigation, Arabic field-note rendering, country/continent pages, and flag quiz smoke checks passed. A full real-browser screenshot/visual QA, measured mobile FPS, and review of every Arabic detail remain outstanding.

### Future content work
1. Expand clear bilingual summaries and verified images and data sources to every landmark.
2. Audit the 241 usable country and territory entries against authoritative, current references.
3. Increase sourced geographic geometry quality while avoiding claims of exact boundaries for illustrative natural features.


## GeoVerse v7 — Geographic Map Challenge Rebuild

This release replaces **only the Find on Map quiz** with a separate, touch-first 2D map. All 18 geography topic sections, the 3D Earth, existing learning and locally saved progress remain unchanged.

- **Continent-first quiz:** each question starts with the relevant continent in view rather than a too-small global map. The seven region controls include World, Asia, Africa, Europe, North America, South America and Oceania (the country challenge pool currently includes no Antarctica targets).
- **Interaction:** drag from land or ocean, two-pointer pinch to zoom, wheel zoom, zoom +/- and reset-to-region controls. Short, stationary taps select countries; dragging never submits answers.
- **Quiz feedback:** before answering, country names are hidden from visual hover, SVG title elements, and DOM map labels. After choosing, the selected wrong country and correct country receive different highlights, and the correct country's genuine SVG flag appears with simple bilingual feedback.
- **No regression:** questions, scoring, next-question transitions and stored best results continue to use the existing quiz state machine. The new challenge intentionally avoids reusing the old atlas element, eliminating event-capture conflicts with the general 2D atlas.
- **Educational library:** `geo-stories.json` grows from 37 to **65** curated bilingual, short, plain-Arabic educational entries. All added keys were checked against existing geography place IDs.

### Validation (Nov 6, 2026)

Real browser smoke tests were run against a local static server using an iPhone-sized viewport and **Chromium and WebKit** headless engines. They covered country-tap answer selection, feedback, next question, region switching, manual zoom, two-finger zoom, drag without submitting answers, page console/runtime errors, correct/missing shape coverage, country name hiding and no mobile horizontal scrolling. All listed checks passed in those environments.

**Caveats:** these are browser-engine simulations, not tests on the user's physical iPhone. Narrow borders and countries may still require zooming; WebGL satellite textures and Wikimedia images remain subject to external network resources. Country shapes come from an educational simplified GeoJSON dataset, not official political-border adjudication. The 65 short articles are introductory learning content rather than an exhaustively sourced encyclopedia.



## GeoVerse v9 — Phase 2: Encyclopedia & Editorial Cleanup (Nov 6, 2026)

**Country profiles.** Country pages are rebuilt around the actual national flag, bilingual names, six quick-fact cards (capital, land area in km², population with reference year, official languages, continent, currency), one interactive 3D globe, a short geographic overview, and clickable land-neighbor flags. The compact "Sources and data notes" disclosure at the bottom preserves traceable provenance without visually overpowering the lesson.

**Sourced facts and dates.** The locally bundled \`country-facts.json\` covers 250 country/territory codes from a compressed version of a [REST Countries v3.1 snapshot mirror](https://github.com/mariuspatru/restcountries/blob/main/all-countries-v3.1.json). It includes area, ISO3 land-border codes, ISO language codes and ISO currency codes. For 215 matched country records, population values were replaced with the most recent non-null result for 2023–2025 from the [World Bank's SP.POP.TOTL series](https://data.worldbank.org/indicator/SP.POP.TOTL), and each display card shows the observation year. The remaining countries and territories retain explicitly **undated snapshot estimates**. These estimates are not asserted to be 2026 live population, and the official country/territory list is not a definitive geopolitical classification. Population and borders require periodic maintenance.

**Translation.** Arabic and English names for official languages and currency codes use JavaScript Intl.DisplayNames when available; a small curated fallback mapping is retained. Capital names prefer the existing Arabic localization file. Arabic content does not silently revert to English when a value is unavailable.

**Maps and editorial hierarchy.** Each country, continent and natural feature detail now displays **one prominent 3D globe**, not an additional 2D detail map. The general 2D atlas and 2D country-location game remain separate and unaffected. Country selection's polygon altitude is reduced to anchor its translucent highlight visually to the globe surface rather than floating noticeably above it. Natural features with no verified polygon/line geometry still show approximate representative locations. Natural-feature pages emphasize the matched article image, a concise curated educational summary, the 3D map, and optionally expandable longer reference text. Duplicated educational introductions, repeated geographic maps, irrelevant secondary photo gallery items, and visible third-party encyclopedia-brand headings are removed. The original source links remain accessible and image attribution is retained with a minimal “Image source” label.

**Validation.** Tested against the repo using mobile Chromium iPhone-size emulation. Arabic Iceland: capital Reykjavík, area 103,000 km², 2025 World Bank population 392,404, Icelandic, Icelandic króna, no recorded land neighbors, one globe, no horizontal scroll. Arabic Egypt: 2025 World Bank population 118,365,995, four neighboring country flag cards and working neighbor navigation. English Iceland correctly uses English labels and currency. Mediterranean Sea and continent detail each showed one globe and no duplicate 2D map; the 2D location quiz still loaded 180 country paths. No page JavaScript errors in these flows. As always, real physical iPhone/desktop visual QA is recommended; tests do not certify any official population projection or boundary dispute.
