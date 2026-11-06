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

## GeoVerse v10 — Phase 3: Premium Cinematic Earth (2026-11-06)

The homepage was redesigned from a text/planet overlap to a responsive two-column cinematic 3D Earth experience that becomes a deliberate vertical editorial composition on phones. Headlines and calls to action sit above the interactive globe on small devices, with a separate three-stat progress bar below it. The title, subtitle, buttons and counters adapt completely to Arabic or English. Counts come from the actual in-app geographical collections (332+ places, 18 topics) and game modes (7), rather than stale hardcoded numbers.

**Visual design:** darker cinematic sky, softly glowing atmospheric backdrop, glass-like action surfaces, subtle orbital rings, emerald accent, restrained gold eyebrow and glow, consistent topic-card spacing. Existing category sidebar with all 18 sections remains unchanged. The mobile topbar now has one working sidebar menu button rather than two duplicated hamburger icons, with balanced logo and action buttons.

**3D Earth tuning:** the existing Globe.GL globe stays interactive rather than using a flat decorative image. Camera distance, atmosphere halo, moderate material gloss, country-boundary opacity and slower auto-rotation are refined. Atlas/continent/country outlines remain visible and geo-referenced; selected country polygons remain close to the actual sphere surface rather than floating above it. The adaptive DPR and hidden-tab animation pause from prior releases remain in force; reduced-motion users do not get automatic rotation. These are styling and quality refinements, not a new satellite/terrain tile service. The map is still sourced from bundled simplified GeoJSON and globe texture libraries from their established remote sources.

**QA:** Real Chromium browser rendering against a locally served v10 branch at 390px and 360px phone widths and 1440px desktop showed no horizontal overflow and no overlap between text and globe; tested both CTAs and the functioning single mobile menu, preserved country pages and neighboring links, 3D canvas initialization, Arabic/English switching, light theme, reduced motion and no JavaScript page errors in those tested flows. Physical iOS Safari visual QA remains desirable before considering the redesign completely validated.

**Next:** Further 3D detail refinement may include local offline-ready texture assets, sourced daytime/nighttime globe illumination, high-resolution elevation for selected mountains, country border geometry verification, a unified visual pass over the remaining atlas/learning/game screens, and improved educational imagery. Any added image/texture layers should respect mobile battery, bandwidth and performance.


## GeoVerse v11 — Approved cinematic design alignment

The user's mobile concept image is the approved visual reference for the GeoVerse UI. Phase 3.1 implements it as functional responsive code rather than a static image:

- Home hero with the **existing interactive Globe.GL Earth**, refined dark sky, atmospheric glow, noninteractive cloud haze, mountain horizon, a clear Arabic/English editorial title and two genuine navigation actions.
- A translucent four-part stats ribbon: 250 country/territory reference records, 18 actual geography categories, the actual quiz mode count, and a calculated number of named places. Numbers are displayed as labels from existing sources, not a claim of 250 sovereign countries.
- Six image-driven category cards for oceans, rivers, volcanoes, forests, mountains and deserts, using already configured authentic category photo assets and linking to the existing category pages. The full 18-topic sidebar and All Topics page remain available.
- Featured image of Petra/Al Khazneh in Jordan, courtesy of [Rhys Davenport / Wikimedia Commons (CC BY 2.0)](https://commons.wikimedia.org/wiki/File:The_Treasury,_Petra.jpg), linked to the [UNESCO Petra World Heritage profile](https://whc.unesco.org/en/list/326), not to an unrelated internal topic.
- A real five-item, mobile-only bottom navigation (Home, Map, Encyclopedia, Games, Progress), synchronizing active state with existing routes and opening real pages. “Progress” intentionally replaces the mockup's “Account” because the site does not yet have a user-account product.
- One sidebar menu trigger on mobile, without duplicate hamburger icons; consistent header spacing and persistent navigation across learning/quiz/country pages.
- Desktop uses a two-column cinematic globe/text hero; mobile uses compact layered composition, real 3D Earth and photo grid.

**Browser QA:** Playwright/Chromium verified loaded Earth canvas, all six photographs, four stats, five real bottom-nav actions, sidebar opening, category navigation, mobile overflow and page errors at 390px and 360px, and desktop 1440px. All passed in simulated browser test. This does not replace hands-on iPhone Safari testing. WebGL, external photos and textures need network access. The visual mockup is design inspiration, not an exact pixel-perfect raster source.

**Next:** (1) get main production release live when Vercel permits new deployment, (2) extend the visual identity to topic/encyclopedia/game screens and fully optimize iOS physical-device touch behavior, (3) improve cinematic globe with richer licensed cloud/terrain assets, mindful of battery/connection constraints, (4) enrich geographic media and verify geospatial/educational sourcing.


## GeoVerse v12 — Phase 3.2: All 18 geography topics as premium photo cards (Nov 6, 2026)

**Scope.** In response to the user's confirmation that all 18 categories should receive the same premium cinematic style as the six home cards, this release replaces the "All Topics" page with a full 18-card, photo-first visual geography directory. The homepage deliberately continues to show just six flagship categories. The existing 18-category sidebar, natural-feature pages, encyclopedia data, quizzes, and progress store remain in place.

**Visual design and interaction.** Cards have a unique thematic SVG icon (no decorative emoji), real photograph, legible dark overlay, real place count, keyboard-accessible native button and responsive grid (2 columns on phones, 3 on desktop). Every card links to the existing category. A genuine working Arabic/English category search filters the 18 cards without modifying state or navigation. Side-menu icons and category-detail headings use the same editorial icon system. Photo selections for islands, volcanoes, glaciers, lakes, climate and valleys were refreshed; valley card/header features a properly attributed [real Grand Canyon photograph from Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Colorful_Grand_Canyon_(Unsplash).jpg). Other category photos load from established Unsplash IDs. The images illustrate the category, not necessarily a specific location listed inside it. Image credit is retained.

**QA.** Chromium mobile browser simulations at 390px and 360px and desktop at 1440px verified all **18/18 cards and images load**, original sidebar renders 18 SVG icons, Arabic and English search each returns the expected one-card match, each selected card navigates correctly (tested Islands), relevant category headings carry SVG icons, the homepage still has its six flagship cards, 5-tab mobile navigation and functioning 3D Earth canvas, and no horizontal viewport overflow or page JavaScript errors in tested flows. External images require network access; real physical iPhone Safari testing is still encouraged.

**Next improvements.** Extend the approved photo-card design to individual geographic place listings (with carefully matched image + source per place), enrich the number of verified educational entries, optimize mobile image loading/quality and provide explicit source/credit detail, then continue the unified premium redesign across quiz and progress pages. As of the preceding Phase 3 release, Vercel production was blocked by a daily deployment quota; verify deployment separately before announcing it as live.


## GeoVerse Phase 3.4 + iPhone Visual Polish — Combined Release Candidate (2026-11-06)

This is the single consolidated branch `geoverse-v16-consolidated-mobile-details` prepared **without a Vercel deployment**. It combines:
- **Mobile globe and hero reflow** from PR #16: the functioning Globe.GL Earth stays centered in a full-width, dedicated area, with balanced headline, calls-to-action, subtle clouds/mountain backdrop, and stats underneath. The desktop layout and actual map interaction remain intact.
- **Photo-category decluttering** from PR #16: the 18 photographic section cards retain their own accurate SVG icons but icons are visual-only and smaller, redundant arrow-badge overlays are removed, and the entire card remains a working click target.
- **Place-page cleanup (Phase 3.4)** from PR #15: one source-linked hero image or honest fallback, concise bilingual article, curated geography facts where available, a small existing learned-state control, one interactive 3D globe, collapsed source references, and next-place navigation. Removes redundant coordinate/classification cards and repetitive summaries; reduces repetition on country and continent pages.

**Verification:** source-based JS syntax checks for the combined modules and structural CSS brace checks passed. The `index.html` stylesheet and module order is correct; original bottom-navigation, 133-photo manifest and 65 curated stories remain. This is **not** a full browser/physical-iPhone visual verification; the combined branch has not been deployed to GitHub Pages or Vercel.

**Release hold:** Per explicit user request, do not merge into `main` or attempt Vercel deployment on Nov 6. Tomorrow, after checking the quota and preferably a real mobile screenshot, publish **one** merged and tested release. Existing PR #15 and #16 remain unmerged; use the consolidated release PR rather than double-merging the individual branches.


## GeoVerse Homepage Phase 3.5 — Cinematic hero, photo-only categories, premium games and progress (2026-11-06)

Addressed user's three iPhone screenshots: the Earth hero was left-heavy with empty right space, home category pictures looked good but the extra icons visually cluttered them, and the games/challenges/learning-progress cards felt sparse compared to the rest of the cinematic interface.

- Mobile hero uses a deliberate three-row CSS grid: centered copy + actual CTA buttons, a dedicated large fully centered **interactive Globe.GL Earth**, and the four existing metrics directly underneath. It keeps subtle star/cloud/mountain backdrops and existing desktop composition. This fixes the inherited left-aligned fixed-inset problem rather than hiding the empty region with decorative artwork.
- Homepage's six real-photo category cards show only their photo, title and genuine feature count. All cards remain fully clickable and the existing unique SVG topic icons remain in the side menu / visual atlas (18 sections).
- Four designed functional game cards — Capitals, Find on Map, Classification and Mixed — now link directly to their existing `createGame` game-mode routes, resetting quiz state appropriately. A **Today's Challenge** strip launches a new mixed quiz from the existing question generator; it is a thematic shortcut, **not** a once-per-day stored challenge with rewards.
- Home learning progress shows genuine overall marked-learned counts, a derived circle %, and four per-category progress meters that navigate to the actual topic. No invented user progress data or account is claimed.
- Removed legacy redundant planet fact tiles, elementary emoji mini-game squares and duplicate generic promotional block under the home categories. Preserved real Petra feature, the complete knowledge directory, 3D exploration, games, and the five-item mobile bottom navigation.

**QA:** JavaScript syntax, HTML/stylesheet integration, responsive CSS structure passed. An isolated JavaScript runtime harness confirmed four game cards, one daily shortcut, actual `data-gv17-game` click starting the correct quiz, dynamic progress, photo-only home category cards, bilingual output and omission of old panels. **No physical iPhone/browser screenshot test yet**, so visual review on the GitHub Pages URL is still required after it updates.

**Publishing preference:** User previously prohibited manual Vercel deployments on November 6; release intended for GitHub Pages, **no manual Vercel deployment requested**. GitHub Pages should be validated after merge and may reflect changes with a cache delay.


## GeoVerse v18 — Overlay Earth hero, photo-only atlas, professional game glyphs (2026-11-06)

User reviewed real iPhone screenshots of the successful GitHub Pages v17 release. The globe is now better centered but user asked whether it can become a **cinematic image behind the hero text**, rather than a separate row. User explicitly asked that **all 18 All Topics photo cards** drop their floating emojis/SVG icons and keep them only in the sidebar. Game-mode icons also needed a more unified visual system; the user likes the current premium game cards.

**Implemented:**
- `visual-v18.css`: mobile-only scene places the original interactive WebGL globe behind the center-aligned heading, subtitle and CTA buttons, with a readable dark gradient overlay for contrast. The globe occupies a broad centered stage behind the copy; lower exposed portion stays touch-interactive. Statistics remain visually above the bottom edge. No static Earth screenshot replaces the real 3D globe. Desktop layout remains as before.
- `topics-v12.js`: removes icon and chevron overlay markup **from every 18 photo topic cards**, while retaining category photos, counts, actual navigation and all original 18 distinct SVG sidebar icons and featured category/landmark data.
- `home-v17.js`: replaces former generic crown, map, layered items and globe glyphs with coherent outline icons for landmarks, location pins, classification and exploration across the four playable home game cards.
- `icons-v18.js`: supplies seven consistent, non-emoji SVG glyphs in the existing game-mode selector UI after rendering; real game logic/buttons are unchanged.
- `index.html`: loads CSS after the previous responsive layers and the game icon module after the existing game UI.
- Added contrast safeguards, pointer-event handling, accessible click targets and reduced visual clutter.

**QA:** All modified JavaScript passes syntax tests; CSS braces are balanced. Verified correct loading order, icon-free full topic cards, preserved sidebar SVG icons, all seven game icons, centered absolute mobile 3D stage and touch-enabled exposed globe. Physical iPhone Safari visual inspection still required. All modifications are additive or targeted; no new geography data or storage changes.

**Release:** User requested GitHub Pages rather than manual Vercel work. Do not manually call Vercel. Once merged into main, verify the GitHub Pages Actions run matches the merge SHA and succeeds. The repository's separate external hosting integrations may react to main commits independently.


## GeoVerse v19 — iPhone stale-assets fix and reliable globe-over-text layout (2026-11-06)

**Issue confirmed by the user's actual 7:08–7:09 PM Riyadh iPhone screenshots:** The screenshot still showed unique category-icon badges over the 18 photographic All Topics cards, despite v18 source code in GitHub main containing **no icon/card-arrow markup at all**. GitHub Pages Actions had successfully deployed exact v18 main SHA `14f1930`. Therefore a stale HTML/JavaScript/CSS asset cache in the mobile browser is the strongest supported diagnosis, though the exact mobile cache layer is not directly inspectable.

**Implemented:**
- In `index.html`, append a unique `?v=gv19-6b4f9` query to **all 30 local CSS and JS requests**, not only to the site URL. This makes a fresh retrieval by iPhone Safari/in-app browser significantly more reliable and prevents the old `topics-v12.js` from reintroducing photo-card icons. The new stylesheet `visual-v19.css` is also explicitly versioned. Inserted `<meta name="geoverse-release"...>` and a small `v19` footer label for on-screen version verification.
- `visual-v19.css`: robust final mobile layout under all prior CSS media queries, with a centrally positioned interactive Globe.GL canvas **behind** a legible heading, descriptive text and CTA buttons. The globe is placed at 78px from the top of the compact 550–650px hero with a subtle dark gradient; stats sit in an anchored strip at the bottom. The exposed globe remains pointer-interactive. Redundant class/arrow badges are also hidden in CSS as a safety net, even if stale topic markup is encountered.
- `topics-v12.js` already contains the correct icon-free All Topics cards from v18, sidebar SVG icons preserved; `icons-v18.js` is already correct for seven quiz-mode symbols and will now be loaded from a new versioned URL.

**Validation:** latest branch CSS braces balanced; all 31 local CSS/JS references are versioned, the v19 layer loads last, JS syntax validated for topics and game icons, photo cards are icon-free in source, globe is still interactive. Full physical iPhone browser visual QA and exact live page-cache header analysis are not yet possible; opening the newly versioned GitHub Pages URL and looking for `v19` in the footer is the user-side verification.

**Publish:** update GitHub Pages through normal GitHub main merge; verify Actions build and deployment exact SHA. No manual Vercel calls. Site URL after publication https://hossamelantary92-afk.github.io/geoverse/?release=gv19-6b4f9 .
