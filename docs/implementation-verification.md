# Publish approved brochure content — verification

Verified September 6, 2026 against `openspec/changes/publish-approved-brochure-content/`. This record covers the local implementation and pre-publication preview. Nothing was deployed, no repository history was rewritten, and Karen Garcia's final rendered-site approval remains pending.

## Local preview

Production preview: **http://127.0.0.1:4321/**. Start it with `npm run preview -- --port 4321` after `npm run build` if the local preview process has stopped.

## Completed checks

- `npm run check` completed with zero errors, warnings, or hints. Pack configuration and 30 Markdown entries validated; the six pre-existing focused tests passed. No broad regression-test suite was added.
- Root and `/cspack862/` GitHub Pages project-base production builds completed successfully. The final `dist/` was restored to a root-path build.
- The production audit found exactly eight HTML routes: Home, About, Calendar, Join, Activities, Resources, Contact, and the branded 404. It checked 231 internal route/asset references and reported no route outside the brochure allowlist.
- The same whole-site audit enforced exactly the approved Committee Chair and Cubmaster email contacts, prohibited telephone links and forms, and found no private/member-only value, candidate payment contact, questionnaire/orientation-guide reference, former withheld route, standalone Cub Scouts program logo, unapproved image, source file, or PDF.
- The public image artifact contains exactly 11 derivatives: one Pack logo, six rank insignia, and four selected Scouting America stock photographs. No TIF, unused staged photograph, public `brand/` source library, or private document is present.
- The Pack logo is referenced in the header, homepage, footer, and favicon. Mobile inspection found and corrected a distorted hero-logo layout; its final rendered aspect ratio matches the 128×101 source. Follow-up browser review also removed the hero photograph's forced 16:10 crop so the portrait source now fills the hero at its natural aspect ratio.
- The six den cards render the approved Lion—Kindergarten—Den 6, Tiger—1st grade—Den 5, Wolf—2nd grade—Den 4, Bear—3rd grade—Den 3, Webelos—4th grade—Den 2, and Arrow of Light—5th grade—Den 1 mappings without leader contacts or schedules.
- Stock images retain neutral alternative text and maintained Brand Assets provenance. The public layout does not repeat a provenance disclaimer below each image and does not identify depicted people as Pack 862 members.
- All 19 supplied 2026–2027 events remain tentative. Unknown event times/locations remain unfilled, Blue and Gold has no invented location, and no Google Calendar is embedded.
- Browser inspection covered all seven brochure pages at 320-pixel phone and 1280-pixel desktop viewports. Every page had one main heading, no horizontal overflow, no missing image alternative attributes, no failed loaded image, and no form. The mobile menu opened accessibly and closed with Escape; the skip link and focus ring were visible. Reduced-motion CSS disables smooth scrolling and shortens animation/transition duration.
- The youth registration destination opened in My Scouting; the medical-form short link resolved to Scouting America's `680-001_AB.pdf`; the safeguarding link redirected to Scouting America's current Safeguarding Youth page; and the address query opened Google Maps. The council financial-assistance, official uniform, and Scouting America pages were also reachable during verification.

## Local privacy controls

- `media/`, the completed questionnaire, the orientation-guide source, and former `docs/content/` source material are covered by repository ignore rules.
- The exact restricted-path and history inventory is recorded in `docs/publication-privacy-inventory.md`.
- Current-tree public copies of the orientation PDF and old broad brand/photo library are removed. Those paths still exist in earlier Git commits, so deletion from the working tree alone is not sufficient for a future public repository.

## Remaining publication gates

1. Karen Garcia reviews the rendered site using `docs/publication-review-checklist.md`; every section receives an explicit approval or requested revision.
2. Requested revisions are completed and the validation, build, responsive, and privacy checks are rerun.
3. Final publication approval is stored in a Pack-controlled private location, not committed to this repository.
4. After approval, create a verified private backup and sanitize all branches/tags using the exact restricted path list. Verify the forbidden paths and known private strings are unrecoverable from the publication clone.
5. Coordinate fresh clones or explicit maintainer resets, then run the locked build workflow from a fresh sanitized clone before the repository becomes public.

Do not publish the current Git history before these gates are complete.
