# GeoVerse Scientific Audit — Batch 2: Five Pilot Countries
Review date: 2026-11-11
Status: PARTIAL CLAIM-LEVEL EXTERNAL VERIFICATION; not full article certification. Audited live `main` source data in `encyclopedia-v9.js`, `country-meta.json`, and `country-facts.json`. This change is documentation only; no production app, photos, flags, maps, or gameplay changed.

## Five-country audit matrix
| Country | Verified subject and evidence | Status | Next action |
|---|---|---|---|
| EG Egypt | Official Egypt SIS descriptions of Sinai, Western/Eastern Deserts, and Nile Valley/Delta support narrative in geography and overview. https://sis.gov.eg/ar/مصر/معلومات-أساسية/ and https://cabinet.gov.eg/StaticContent/BasicInformation | Geography overview checked; article not fully certified | Validate all 24 nested claims, historical material, exact image provenance. |
| SA Saudi Arabia | Saudi Ministry of Foreign Affairs supports Tihamah, Sarawat, Najd, deserts and both coasts. https://www.mofa.gov.sa/ar/ksa/Pages/default.aspx | Geography overview checked; article not fully certified | Review regional climate and landmark claims individually. |
| FR France | INSEE explicitly distinguishes metropolitan France from France including overseas departments. https://www.insee.fr/en/outil-interactif/5543645/europe/20_DEM/21_POP/21J_FigureE3 and https://www.insee.fr/en/statistiques/serie/000067670 | ACTION REQUIRED: denominator/scope ambiguity | The file has area=551695 km2, population=68720337 tagged World Bank 2025. Add area scope and population scope, and verify each against corresponding primary source before claiming these describe identical geography. Preserve 2025 observation vs 2026 INSEE reference differences. |
| JP Japan | Japanese Ministry of Land, Infrastructure, Transport and Tourism names the four main islands and confirms mountainous/volcanic geography. https://www.mlit.go.jp/river/basic_info/english/land.html | Geography overview checked; article not fully certified | Historic island counts vary by methodology: do not add any unqualified numeric 'number of islands'. |
| BR Brazil | Brazil's IBGE lists the six biomes Amazonia, Mata Atlantica, Cerrado, Caatinga, Pampa, and Pantanal, supporting narrative diversity. https://educa.ibge.gov.br/jovens/conheca-o-brasil/territorio/18307-biomas-brasileiros.html | Nature/geography overview checked; article not fully certified | Validate all nested hydrological and specific heritage claims individually. |

## Population values in repository (not independently checked as individual WDI API observations)
| Code | Population recorded | Year tag | Source label |
|---|---:|---|---|
| EG | 118365995 | 2025 | World Bank SP.POP.TOTL |
| SA | 36973555 | 2025 | World Bank SP.POP.TOTL |
| FR | 68720337 | 2025 | World Bank SP.POP.TOTL |
| JP | 123366734 | 2025 | World Bank SP.POP.TOTL |
| BR | 212812405 | 2025 | World Bank SP.POP.TOTL |

Population indicator metadata: https://databank.worldbank.org/metadataglossary/world-development-indicators/series/SP.POP.TOTL — de facto midyear resident estimate, not necessarily national census count. API values and coverage should be independently retrieved by code and year before marking numerical claims verified.

## Review method and next batch
- Work through each of the six narrative sections AND nested paragraphs for each country; current checks establish selected overview/geography claims only.
- Record each claim, its exact wording, citation URL, checked date, disposition (verified / qualified / needs evidence / incorrect), and Arabic-English consistency.
- Audit country-specific area/population scopes for overseas territories and other multi-part states, not just the five pilots.
- Image visual match, availability, resolution, license, attribution, and card/hero consistency: NOT TESTED. Do not imply otherwise.
- Source list in narrative is not claim-level citation coverage. Preserve the premium presentation and maintain references in data/backend rather than cluttering UI.
- Real-device Safari and visual regressions: NOT TESTED.

No changes to any live content or UI in this batch.