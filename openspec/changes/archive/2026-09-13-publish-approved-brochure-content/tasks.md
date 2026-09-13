## 1. Establish the public-content boundary

- [x] 1.1 Inventory the current tree for the completed questionnaire, orientation-guide copies, candidate contact data, former `docs/content` source files, and other internal/member-only material; record the exact paths and confirm the inventory finds every known private source before initializing the public repository.
- [x] 1.2 Reconcile the active `launch-site-on-github-pages` change so `git@github.com:CubScoutPack862/cspack862.git` is initialized from the verified current tree without importing legacy refs or history; run strict OpenSpec validation for both changes.
- [x] 1.3 Add repository ignore rules for the local `media/` staging area and completed questionnaire, remove private/current-tree document references, and verify `git status --ignored` classifies the local sources as ignored rather than publishable.
- [x] 1.4 Define the forbidden paths, filenames, former route names, private/member-only URLs, and disallowed contact values for a whole-site absence review; verify the list covers every item identified by the privacy inventory.

## 2. Publish the approved visual identity

- [x] 2.1 Derive appropriately sized, compressed, and web-formatted assets only from `pack-862-logo.jpg`, the six approved high-resolution rank-insignia files, and the four approved stock photographs named in the design; verify visual fidelity and aspect ratio and confirm the public inventory contains no standalone Cub Scouts program logo, unused staged photo, TIF, or private document.
- [x] 2.2 Record intrinsic dimensions, neutral alternative text, Scouting America Brand Assets provenance, and public approval classifications for every published image; run content validation and verify an approved entry missing any required metadata fails.
- [x] 2.3 Replace the text-only global identity with responsive Pack 862 logo derivatives in the header, footer, and homepage, and configure a small derivative as the favicon; verify rendered HTML references Pack-logo-derived assets in all four locations and no standalone program logo.
- [x] 2.4 Add visually faithful optimized Lion, Tiger, Wolf, Bear, Webelos, and Arrow of Light insignia to the six den cards; verify each rank/grade/den mapping and confirm no card renders a den leader, email, phone number, or schedule.
- [x] 2.5 Configure the questionnaire-approved hero, celebration, outdoor, and derby stock images in place of their placeholders; verify each rendered image has dimensions, appropriate loading behavior, neutral alt text, and no caption claiming that its subjects belong to Pack 862.
- [x] 2.6 Preserve the Scouting America affiliation/trademark disclaimer in the footer and verify it remains readable with the Pack logo at phone and desktop widths.

## 3. Apply approved Pack facts and contact policy

- [x] 3.1 Extend structured publication states to distinguish public, tentative, member-only, private, and missing values, and update public render helpers so private/member-only data yields no value or solicitation; verify content validation accepts approved public data and rejects invalid states.
- [x] 3.2 Replace the shared contact placeholder with Committee Chair Karen Garcia and `cubscoutpack862@gmail.com`, publish Cubmaster Michael Huffman with `activitiescubscoutpack862@gmail.com`, keep every phone/biography/other leader field private, and verify generated output contains exactly those two leader names and email addresses.
- [x] 3.3 Implement visible and selectable `mailto:` contact links with wording that Pack leaders usually respond within one week; verify no HTML form, submission script, form endpoint, or third-party processor is emitted.
- [x] 3.4 Publish Faith United Methodist Church as charter organization and primary meeting location, the approved street address, main-entrance instruction, and an HTTPS Google Maps address link; verify the rendered link encodes the correct address.
- [x] 3.5 Publish “Pack meetings are held two or three times per month on Fridays from 7:00 to 8:30 PM,” “The Parent Committee virtually meets on the first Wednesday of each month at 7:00 PM,” and “Den schedules are available after registration”; verify no Zoom URL, den schedule, or Band invitation appears in generated files.
- [x] 3.6 Publish the approved shared inbox as the safeguarding-certificate destination while retaining warnings not to submit youth health information through the public site; verify the certificate instruction uses only `cubscoutpack862@gmail.com`.

## 4. Refocus pages as a public brochure

- [x] 4.1 Limit the page collection and global navigation to Home, About, Calendar, Join, Activities, Resources, and Contact, removing the Photos, Fundraising, and Volunteer entries and links; verify the retained routes build and each removed route resolves through the branded not-found experience.
- [x] 4.2 Revise Home, About, Activities, and Contact copy to use the approved Pack identity, charter relationship, contacts, meeting facts, stock imagery, and public-brochure framing; verify no copy cites the private orientation guide or implies stock subjects are Pack members.
- [x] 4.3 Revise Join and Resources to publish the 2026–2027 youth fee of `$170`, Pack dues of `$175` due January 31, 2027, youth registration, council financial assistance, official uniform guidance, confirmed Scout Shop hours, safeguarding, official medical-form information, public email contact, and the approved Join-page registered-volunteer guidance; verify each amount, date, and approved external link has one centralized source.
- [x] 4.4 Remove public payment instructions, Band, Scoutbook, Trail's End, Pack-specific forms, camping files, donations, social accounts, fundraising campaign details, volunteer vacancies or rosters, and related “ask for this private link” placeholders. Retain only the approved Join-page general volunteer guidance, adult-fee/reimbursement policy, and official application/training links; scan source and generated HTML to verify no other restricted detail remains.
- [x] 4.5 Remove the Downloads/orientation-guide link and its public file, update any guide-derived attribution to approved leadership wording, and verify the former PDF path and filename are absent from the production artifact.
- [x] 4.6 Keep all supplied 2026–2027 event dates and their tentative status, preserve missing times/locations and the Blue and Gold location confirmation state, and describe the plan as leadership's current tentative calendar; verify content validation succeeds and no invented Google Calendar URL is emitted.

## 5. Verify privacy and quality

- [x] 5.1 Validate absence across the complete generated website: no route outside the brochure allowlist, no leader contact outside the approved two-contact allowlist, no phone or biography, no private/member-only resource, no unapproved or non-stock activity media, no standalone Cub Scouts program logo, and no private PDF or questionnaire content; record zero findings without adding a broad regression-test suite.
- [x] 5.2 Run type/content validation and production builds for both root and GitHub Pages project-base configurations; verify internal routes, Google Maps, `mailto:`, images, favicon, and approved external resources resolve correctly in both outputs.
- [x] 5.3 Inspect generated HTML and the complete static artifact for questionnaire content, orientation-guide content, youth or candidate contact data, member-only references, former withheld routes, standalone program logos, and unapproved media; verify the privacy audit reports no findings.
- [x] 5.4 Review all retained pages at 320-pixel phone and desktop widths with keyboard navigation, visible focus, meaningful alt text, contrast, image sizing, and reduced-motion checks; record and resolve every accessibility or visual defect.
