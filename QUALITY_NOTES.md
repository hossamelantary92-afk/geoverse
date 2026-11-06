# GeoVerse v5 — Quality and Arabic Learning Upgrade

This update strengthens **Phase 1: Quality & Visual Excellence** and begins **Phase 2: Geographic Encyclopedia Expansion** while preserving the 18 existing topic sections and browser-local progress.

## Added
- `quality.js`: adaptive WebGL pixel ratio capped for phones/desktop; pauses 3D animation when hidden or outside the viewport, observes globe size changes, and cleans up listeners when a globe is destroyed.
- `quality.css`: restrained premium reading panels and responsive factual cards, with legible Arabic typography and reduced-motion compliance.
- `geo-stories.json`: **37 carefully authored introductory geography profiles in plain Arabic and English**. Each includes accessible context; many include Arabic quick-fact cards.
- `geo-localization.json`: Arabic display names for **199 country/territory capital codes** and 19 common currency names. These are learning labels, not canonical state/capital records; complicated arrangements require manual verification.
- Wikipedia language linking: GeoVerse uses an English title only to resolve the matching **Arabic Wikipedia** article, then loads the Arabic extract in Arabic mode. If no matching Arabic article is available, the authored Arabic field guide and short Arabic fallback remain visible. **English Wikipedia prose is hidden in Arabic mode**.
- Existing exact-article Wikimedia location images, sidebar, 2D geographic atlas, 3D country explorer, flag-capital quizzes and progress are retained.

## Geographic and accuracy notes
- The 37 short profiles are explanatory introductions, not comprehensive monographs or exhaustive official source reviews. Use the linked reference articles to validate detailed metrics and geopolitical conventions.
- Arabic Wikipedia writing is shortened and presented after the original simple-Arabic field guide; source article text itself is not machine translated or guaranteed to be simplified.
- Existing country metadata originates from a community country JSON dataset and may include outdated, disputed, or special capital arrangements. Do not present it as an official country registry. Flag and country geometry coverage also remain partial for territories.
- Images require Wikimedia access, and 3D assets require Globe.GL/Three-Globe CDN access. No photos are silently invented when a source match is absent.
- The "quality" performance improvements are designed for mobiles but do not guarantee a specific frame rate. A real iPhone and desktop browser pass remains necessary after release.

## Validation
- Static JavaScript parsing passed for `app.js`, `quality.js` and `enhancements.js`.
- Simulated navigation checks passed for the 3D hero, continents, country index, and landmark details; 12 flag and 12 capital questions were generated.
- Mocked 3D Globe runtime and Arabic Wikipedia language-link extraction passed.
- Vercel build/deployment status must be checked separately. A READY build does **not** certify browser rendering or photo availability.

## Next
1. Real browser QA with screenshots and keyboard/touch checks, especially Arabic/English toggle and Wikipedia article fallback.
2. Broaden sourced landmark geometry and photo galleries.
3. Add more curated detailed factual profiles and a maintained reference database.
4. Continue visual polish from the original approved GeoVerse cinematic mockup.
