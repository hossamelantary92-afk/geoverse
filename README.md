# GeoVerse 🌍

An Arabic-first, responsive geography learning web app with an interactive OpenStreetMap, 18 geography categories, bilingual curated geography cards, quizzes, search, a learning path and browser-local progress.

## Quick start

Open `index.html` in a browser, or serve the folder with `python3 -m http.server 8080` and open `http://localhost:8080`.

## Deploy to Vercel

Create a GitHub repository, upload `index.html`, `styles.css`, `app.js`, and `vercel.json` in the root, import it in Vercel, choose **Other** framework (no build command) and deploy. Or drag the project folder into a static hosting service.

## Data and dependencies

- Map library: Leaflet 1.9.4 via CDN.
- Base tiles: OpenStreetMap, subject to its tile usage policy and attribution. The app requires internet to display tiles and map functionality.
- Geography data: a hand-curated **sample**, not exhaustive or guaranteed as a definitive source for statistical rankings.
- Images: Unsplash URLs; online access required. Check image license and production usage for your deployment.
- Fonts: Google Fonts, online access required.
- Progress is stored in `localStorage` per browser/device; no sign-in, cloud sync or analytics tracking.

## Next phases

- Source-verifiable global dataset, data quality checks and detailed country borders.
- Cloud account and sync (Firebase Auth + Firestore).
- Thematic GeoJSON layers for rivers, mountains, deserts and country polygons.
- More quiz modes, adaptive spaced repetition, accessibility improvements and offline PWA.

## Security

No secrets or keys are necessary in the current version. Don't add private API keys to front-end source files.
