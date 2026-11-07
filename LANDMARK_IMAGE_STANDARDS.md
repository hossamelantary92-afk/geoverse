# GeoVerse — Landmark Image Editorial Standard

Updated: 2026-11-08. Applies to **every tourist attraction and other named geographic landmark** in the website's homepage, topic cards, country cards, and detail views.

## Purpose
Images are educational visual identifiers. A visitor should recognize the actual named place, including unfamiliar monuments, from its **most recognizable feature** immediately. An attractive but generic image is not acceptable.

## Mandatory selection checklist
1. **Correct identity:** verify the exact landmark, not merely the city or country, and use its most iconic defining view. Use accurate names/captions and source references.
2. **Subject unobstructed:** reject a picture dominated by tourists, faces, selfie subjects, crowds, signs, vehicles, or unrelated foreground distractions. Prefer empty architectural/exterior views with the recognizable structure in focus. Incidental tiny background visitors are a last resort, not the subject.
3. **Complete landmark:** preserve the defining silhouette, towers, facade, statues or other signature detail without accidental cropping on phone or desktop. For monument cards use `object-fit: contain`; adapt frame aspect ratio before clipping content.
4. **Fidelity:** prefer verified real photographs for educational content. AI-generated or stylized reconstructions must be **clearly labeled as illustrations** and never silently passed off as documentary photographs.
5. **Image-specific approval:** manually inspect every candidate; a matching Wikipedia article image is a starting point, not visual proof that the picture is iconic, people-free, complete or suitable.
6. **Reliability:** prefer stable local files or explicitly verified Commons image files with a correct direct URL; retain license, author, and source link. Never use an unrelated fallback image just to fill a blank.
7. **Consistency:** a chosen landmark photograph should appear consistently across its card and detailed page, subject to fitting/resolution. Country covers may use a recognizable landmark from that country.
8. **QA before release:** test that each selected source loads, displays without cropping and retains readable text/labels at mobile and desktop widths. Avoid claiming a production image is live until the site has been checked.

## Known current status
- GeoVerse currently has 48 tourist attractions in 12 countries. Only eight have a specific curated-file override in `tourism-premium-photos-v182.js`; the others use Wikipedia/Wikimedia thumbnail lookup. **The entire 48-image catalogue has not yet had a manual iconic-view/photo-composition audit.**
- Karnak's previous override showed a visitor and was replaced in v184 with a photographed view of the Great Hypostyle Hall columns, sourced from Wikimedia Commons, with attribution.
- The image-fetch fallback preserves earlier content where a requested file cannot load. A placeholder is preferable to a mismatched or misleading substitute.

## Reviewer record format (for future additions)
`landmark index | bilingual name | iconic feature | exact source file URL | author/license | manually checked people-free | full-frame/mobile checked | desktop checked`.

This policy is editorial guidance and should be implemented incrementally as specific sources are checked. Do not assert that all images meet it merely because the document exists.
