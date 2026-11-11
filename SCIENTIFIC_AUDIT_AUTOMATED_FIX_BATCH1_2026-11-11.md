# GeoVerse Automated Scientific Audit — Implementation Batch 1
Date: 2026-11-11
Status: **production text correction committed; not a complete scientific certification**

## Applied code corrections
- `encyclopedia-v9.js`: undated population entries now explicitly show bilingual note "سنة البيانات السكانية غير موثقة / Population reference year unverified" instead of the ambiguous "عدد تقريبي / Approximate figure".
- If the population value itself is unavailable, note now says "لا تتوفر بيانات سكانية / Population data unavailable".
- All dated populations preserve their existing World Bank observation-year label; numeric values are untouched.
- `index.html`: script URL cache key changed from `gv371-science-fr-scope` to `gv372-audit-pop-year`.
- No change to layout/CSS, image URLs, map, flags, globe, quizzes, or data arrays.

## Structural post-write checks
- GitHub re-fetch confirms the new bilingual strings and current HTML script version.
- All 25 article codes in the audit queue have numeric populations and lack `py` in `country-facts.json`: AI, GF, RE, BV, CX, CC, HM, GS, FK, PM, CK, NU, NF, PN, IO, GP, VA, MQ, YT, MS, TK, WF, EH, GG, JE.
- Underlying year and values remain UNVERIFIED; the qualifier does not replace scientific source verification.

## Codes/territorial status: review, do not auto-migrate
- `TP`: historical East Timor ISO-alpha2, modern Timor-Leste `TL`; the UN Statistics Division includes the historical/current distinction. Do not rewrite the historical article or break quiz identifiers.
- `AN`: former Netherlands Antilles, dissolved 2010-10-10; successor entities do not have identical geography. Do not map to a single successor code.
- `UK`: display convention differs from ISO alpha2 `GB`; check usage and aliases before any rewrite.
- Source: https://unstats.un.org/unsd/methodology/m49/

## Open
- 213 article records lack a direct `source` field; bulk URL-filling without claim-level verification is prohibited.
- Complete claim-level scientific checks, country-specific image source/author/license checks, and real iPhone Safari QA.
- GitHub write success does not prove the GitHub Pages site has published or passed rendering tests.

## Validation checklist before a wider release
- Confirm the new note appears on an undated case (e.g., Anguilla) in both Arabic and English.
- Check 2025 label still appears on Egypt/Saudi Arabia/France/Japan/Brazil.
- Verify iPhone globe interaction, maps, flags, quizzes and country return navigation.
