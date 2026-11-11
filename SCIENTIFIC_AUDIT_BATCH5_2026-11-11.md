# GeoVerse — Scientific Audit Batch 5 (2026-11-11)
Status: Source-code photo-pipeline audit + selected primary-source heritage spot checks. **Not** a visual inspection of all displayed images, nor a Safari verification.

## Findings from repository main
1. `photo-manifest-v13.json` version 18 contains **176 category photo entries** across 17 categories: continents 7, oceans 5, deserts 12, waterfalls 8, forests 10, mountains 12, lakes 11, volcanoes 9, straits 9, gulfs 8, glaciers 7, valleys 8, grasslands 8, islands 12, climate 7, seas 17, rivers 26. It has **no `countries:...` keys**. Do NOT claim it represents the five countries' photo audit.
2. `encyclopedia-v9.js` country renderer uses flagcdn flags and interactive 3D geography, rather than a fixed photo inventory for each country.
3. `enhancements.js` provides a fallback mechanism for category images through MediaWiki `pageimages` using resolved titles. Returned article thumbnails are not automatically proof of image-subject correctness, attribution, or reuse compliance.
4. `tourism-premium-photos-v182.js` queries Wikimedia Commons `imageinfo` with `iiprop=url`. This is NOT equivalent to collecting `extmetadata` for author/licensing; a separate provenance step is required.
5. `country-landmarks-v450.js` currently defines country-local map entries for Egypt, France, Italy, Saudi Arabia. Japan and Brazil do not have country-local landmark entries in this particular module. This does not establish that they lack landmarks in other sections.
6. The repo's `LANDMARK_IMAGE_STANDARDS.md` already requires exact landmark identity, authorship/license, photo-card/hero consistency, and mobile checks. Avoid creating redundant competing standards.

## Primary-source heritage spot checks
| Country | Verified site or statement | Primary reference | Result |
|---|---|---|---|
| Egypt | Memphis and its Necropolis including the Pyramid Fields from Giza to Dahshur (1979 inscription) | https://whc.unesco.org/en/list/86/ ; Egyptian Ministry of Tourism and Antiquities https://egymonuments.gov.eg/world-heritage/memphis-and-its-necropolis/ | Reference supports heritage claim; no photo verified |
| Saudi Arabia | Al-Ahsa Oasis (2018), evolving cultural landscape with canals, springs, gardens, settlements | https://whc.unesco.org/en/list/1563/ | Reference supports heritage claim; no photo verified |
| France | Mont-Saint-Michel and its Bay, World Heritage cultural property | https://whc.unesco.org/en/list/80/ | Reference for further manual check; no photo verified |
| Japan | Fujisan, sacred place and source of artistic inspiration | https://whc.unesco.org/en/list/1418/ | Reference for further manual check; no photo verified |
| Brazil | Iguaçu National Park (Brazil) | https://whc.unesco.org/en/list/355/ | Reference for further manual check; no photo verified |

## Rights/licensing decision
Per Wikimedia Commons guidance https://commons.wikimedia.org/wiki/Commons:Reusing_content_outside_Wikimedia and Creative Commons https://creativecommons.org/reusing-cc-licensed-content/ , inspect each specific Commons file page: exact title, source, author, license, relevant attribution and adaptation requirements. A Wikimedia URL alone is insufficient; `pageimages` and `imageinfo(url)` cannot certify the license. Never automatically mark images as licensed.

## Next authorized implementation
- Inventory exact country-specific/landmark image file URLs that actually render for EG, SA, FR, JP, BR, across `enhancements.js`, `tourism-premium-photos-v182.js`, and other loaded modules.
- For each image, add a record with code, landmark name, image filename/url, file-page URL, author, license, allowed-use result, visual identity, thumbnail/hero consistency, mobile behavior. Mark unknown fields explicitly.
- Fix only confirmed incorrect identity/failed photo links; avoid new assets without verifying copyright and correct subject.
- Run real-device Safari QA before declaring pass.

## Production safety
No JS, CSS, map, globe, flag, images, or game changes in this batch. Only this audit record added.