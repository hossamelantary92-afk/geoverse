# GeoVerse Automated Scientific Audit — Baseline 2026-11-11

## Scope and results
Read current `main` versions of `encyclopedia-v9.js` (`gvAtlasContent`), `country-facts.json` and `country-meta.json`. This is **static structural triage**, NOT independent verification of all geographic or historical claims, NOT a visual photo or iPhone QA.

| Check | Result |
|---|---:|
| Bilingual atlas articles, distinct record keys | 245 |
| Articles with exactly 6 main sections | 245 |
| Missing Arabic/English main section prose | 0 |
| Articles with direct article `source` URL | 32 |
| Articles missing `source` URL | 213 |
| Articles without matching record in `country-facts.json` | 3 |
| Articles with stored population but no `py` reference year | 25 |
| Total raw metadata rows | 256 |
| Metadata rows whose `code` is absent among 245 article keys | 11 |
| Raw metadata rows with no populated capital | 15 |

## Priority queues

**High priority — provenance gap (213 articles):** Source link missing from the article record. Do not infer the article is wrong; determine claim-level official sources, not a generic link added for cosmetic completeness. Examples: DZ, TN, LY, SD, ET, KE, NG, GH, AE, QA, OM, JO, GR, NO, NZ.

**High priority — undated population (25 matched articles):** AI, GF, RE, BV, CX, CC, HM, GS, FK, PM, CK, NU, NF, PN, IO, GP, VA, MQ, YT, MS, TK, WF, EH, GG, JE. These have a stored population value but no observation year. Re-check actual official period or avoid implying current population.

**High priority — legacy or mismatched codes (3):** UK, TP, AN are present as atlas article keys without matching population/geography facts records. Do not silently map UK to GB, TP to TL or AN to a successor territory without reviewing intended presentation, historical meaning, aliases and quiz behavior.

**Classification review (11 metadata rows without an identically keyed atlas article):** England (null), Scotland (null), Wales (null), AX, BL, BQ, CW, MF, SX, TW, XK. Some are territories, constituent countries or special entities. The absence of a matching article is not proof of a bug nor a directive to add a page.

**Capital field review:** 15 of the 256 raw metadata entries lack a populated capital. Some are legitimate absence / administrative-seat cases; avoid manufacturing a capital.

## Editorial status rubric
- **Structure complete:** six sections and both languages exist.
- **Source incomplete:** article lacks a direct source URL.
- **Fact verification pending:** a cited source exists, but claim-by-claim comparison has not happened.
- **Verified:** only after dated independent claim-level confirmation, with geopolitical qualification where needed.
- **Photo license checked:** only after image-file-level author/license/identity checks.
Never collapse these into one misleading '100% completed' indicator.

## Delivery plan
1. Batch repair of provenance metadata (starting with 213 missing links), with links only for source-verified claims.
2. Audit 25 undated population entries and 3 code mismatches; avoid corrupting historical and dependent territories.
3. Claim-level history/geography review prioritized by sensitivity and change frequency.
4. Inventory and inspect actual displayed photos, licences, subjects, crop and card/hero parity; photo manifest alone is not sufficient.
5. Merge safe content-only changes with tests for 3D globe, maps, flags, games and iPhone Safari. No layout changes by audit without approval.

Sources: https://unstats.un.org/unsd/methodology/m49/ ; https://data.worldbank.org/indicator/SP.POP.TOTL ; https://whc.unesco.org/en/list/ ; https://commons.wikimedia.org/wiki/Commons:Reusing_content_outside_Wikimedia

**No live website code or UI modified by this baseline audit.**
