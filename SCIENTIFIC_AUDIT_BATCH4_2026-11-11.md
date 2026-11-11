# GeoVerse — Scientific Audit Batch 4 (2026-11-11)

## Production correction applied
- `encyclopedia-v9.js`: France (`FR`) area card now uses a bilingual qualification. Arabic: "مساحة فرنسا الأوروبية تقريبًا؛ لا تشمل أقاليم ما وراء البحار"; English: "Approximate metropolitan France area; overseas territories excluded."
- `index.html`: refreshed only the `encyclopedia-v9.js` script query to `gv371-science-fr-scope` to reduce stale-cache risk.
- Rationale: the baseline `country-facts.json` area=551695 km² for France denotes approximately the European mainland, while its World Bank 2025 population=68720337 has a different spatial scope. Do not calculate/interpret population density from incompatible spatial scopes.
- Primary statistical context: INSEE France entière / France métropolitaine comparative table (published 2026-08-27): https://www.insee.fr/fr/statistiques/1405599?geo=FE-1+METRO-1 ; INSEE metropolitan population reference: https://www.insee.fr/en/statistiques/serie/000067670.
- Source code post-write fetched and checked: bilingual FR-only label exists and the HTML points at the updated asset query.

## Additional primary reference
- Geospatial Information Authority of Japan counted 14,125 islands under defined criteria using Jan 2022 digital mapping; announced Feb 28 2023. https://web1.gsi.go.jp/kihonjohochousa/pressrelease20230228.html. Existing published pilot says "thousands", which is appropriately qualified. No numeric island count introduced into the UI.

## Image pipeline triage
- The main `encyclopedia-v9.js` renderer embeds flags from flagcdn and country-related interactive geography; it does not itself contain a country-photo attribution ledger. Other country photo handling can occur in separate scripts and source services.
- No remote photo asset was individually fetched, visually matched to its country, or licensed in this batch. Real iPhone Safari rendering has NOT been observed. Do not label image audit complete.
- Next: inventory exact displayed country image URLs across loaders and service calls, verify destination/credit/license/resolution, then inspect on iPhone Safari without swapping artwork blindly.

## Limitations
- This batch completed ONE confirmed production correction and cache-bust. It did not certify the historical paragraphs or all five pilot narratives.
- GitHub file write verified. A browser-visible GitHub Pages update cannot be claimed without a successful deployed-page check.
- Keep premium UI and all 3D/2D maps, flags, games, and navigation unchanged.
