# GeoVerse — Scientific Audit, Batch 1 (2026-11-11)

Status: INITIAL DATA TRIAGE ONLY. This is not certification that any country article, claim, image, or external reference has passed independent scientific review.

## Baseline read from main
- `country-meta.json`: 256 rows; 254 distinct `code` values when null is counted as one value. Scotland and Wales have null `code`; do not deduplicate those records merely because both codes are null. Country/territory/constituent-nation/historical records must not be labeled as 256 sovereign states.
- `country-facts.json`: 250 records keyed by code; 215 have population reference year 2025, while 35 have no reference year. Five of those have null population: TF, SJ, AQ, SH, UM.
- `country-phase2-editorial-batch9.json` expressly marks independent review of sensitive claims, dated statistics, and live iPhone Safari as pending.
- The 245 bilingual six-section articles reported by the editorial batch is a different metric from the raw metadata record count.

## Priority editorial findings
1. **Population**: never imply an undated snapshot is a current population. Display year and source where verifiable; otherwise show 'year not confirmed' or omit the number until sourced. The World Bank indicator is SP.POP.TOTL; validate territory coverage individually.
2. **Capitals**: preserve multi-seat/qualified descriptions and confirm them from official sources. Examples already captured in metadata: Bolivia (Sucre / La Paz), South Africa (Pretoria / Cape Town / Bloemfontein), Palestine (East Jerusalem claimed / Ramallah administrative). Treat political claims neutrally and cite source context.
3. **Code/classification**: null code for Scotland and Wales is a data-model case, not an accidental duplicate. Kosovo XK is a user-facing coding convention and not an ISO 3166-1 officially assigned alpha-2 code; document the distinction when reviewed.
4. **Missing capitals**: 15 records have blank `capital` (AQ, BV, IO, TF, HM, HK, MO, NR, AN, GS, SJ, TK, UM, EH, BQ). This is a review queue, not proof that all 15 need a populated capital. Some areas have no conventional capital, some have administrative seats, and legacy/historical codes need special handling.
5. **Territorial status and borders**: use UN Statistics Division M49 for statistical geography while making clear that its classifications do not determine sovereignty or legal status. Do not silently replace contested borders.
6. **Images**: not checked in this batch. Next pass must trace each displayed image URL to its actual subject, resolution, attribution/license and permitted reuse, plus check consistency of card/hero and fallback.
7. **Sources**: source URLs currently in project documentation are an intended verification queue, not evidence every statement in each article is independently sourced.

## Authoritative verification starting points
- UN Statistics Division M49: https://unstats.un.org/unsd/methodology/m49/
- World Bank population indicator: https://data.worldbank.org/indicator/SP.POP.TOTL
- UNESCO World Heritage List: https://whc.unesco.org/en/list/
- Natural Earth base cartography: https://www.naturalearthdata.com/

## Next scientific batch
- Independently examine the country narrative and metadata for Egypt, Saudi Arabia, France, Japan, Brazil, with claim-level URL, verification date and disposition.
- Then review politically sensitive or unusual entries and the 35 undated population entries.
- Create an image evidence table before any replacement; preserve the present Premium UI, globe, maps, flags, games and navigation.
- Do not mark mobile visual QA as passed without testing a real iPhone Safari session.

No production JS/CSS, maps, flags or images changed in this audit.
