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
