## 1. Project Foundation

- [x] 1.1 Scaffold the Astro static TypeScript project, package scripts, supported runtime metadata, `tsconfig`, ignore rules, and lockfile; verify `npm install` completes and the expected project files are present.
- [x] 1.2 Configure environment-aware site and base paths for local root hosting, GitHub Pages project paths, and future custom-domain hosting; verify production builds succeed once with the default base and once with a non-root test base.
- [x] 1.3 Add the local font assets or font packages for the limited Roboto Slab and Roboto Condensed weights used by the design, with system fallbacks; verify a production build contains no runtime Google Fonts request.

## 2. Content and Pack Data

- [x] 2.1 Implement the centralized typed Pack configuration and publication-state model for identity, season, contacts, schedules, fees, links, calendar, leaders, fundraising, volunteering, Scout Shop, and origin; verify invalid managed values fail type/schema checks and unresolved values remain `confirm`, `missing`, or `private`.
- [x] 2.2 Configure page, event, and media content collections with required-field, date, URL, status, alternative-text, and approval validation; verify a deliberately invalid fixture or schema-level test fails with an actionable field error before removing the fixture.
- [x] 2.3 Split the verified extracted copy into focused Markdown content for Home, About, Join, Activities, Resources, Fundraising, Volunteer, Photos, and Contact; verify every required content entry loads during `npm run check` and no `MISSING` or `CONFIRM` fact has been invented.
- [x] 2.4 Create individual Markdown entries for every event in the tentative 2026-2027 calendar, preserving known dates, ranges, times, locations, den notes, and tentative/TBD states; verify a generated event inventory matches every source-calendar row exactly once.
- [x] 2.5 Define honest placeholder media entries and the planned gallery/album structure without youth identities or simulated official marks; verify the public media query excludes any entry not explicitly approved.
- [x] 2.6 Copy the source new-family orientation guide to a stable public document path while retaining the original under `docs/`; verify the built document URL resolves and the source and public copies have matching hashes.

## 3. Shared Experience and Visual System

- [x] 3.1 Implement global design tokens, mobile-first layout primitives, typography, focus states, 44-pixel controls, reduced-motion handling, and the documented blue/gold visual proportions; verify key CSS tokens match the design spec and a 320-pixel viewport has no global horizontal overflow.
- [x] 3.2 Implement shared URL/base-path, publication-status, email, event-sorting, upcoming-event, and single/multi-day date-formatting helpers; verify focused tests or build assertions cover root/subpath URLs, unresolved values, event order, date ranges, and the no-future-events state.
- [x] 3.3 Build `BaseLayout` with skip link, unique page metadata, conditional canonical/social URLs, header/footer landmarks, Scouting America link, affiliation disclaimer, and shared Pack contact; verify each generated page has one title, description, `h1`, and no fabricated canonical URL in local mode.
- [x] 3.4 Build the desktop/mobile header with concise primary navigation, text-based Pack 862 identity, persistent Join action, announced expanded state, Escape/close behavior, and keyboard-safe focus; verify navigation remains usable by keyboard and core links remain available when optional JavaScript is disabled.
- [x] 3.5 Build reusable hero, button, quick-fact, activity, event, calendar, rank, status-callout, resource, FAQ, join-CTA, and media-placeholder components; verify representative component instances use semantic elements, descriptive labels, and no unapproved image or unsupported fact.

## 4. Public Pages

- [x] 4.1 Build the activity-led homepage with first-viewport identity/join/events actions, quick facts, welcome content, activity storytelling, upcoming events, ranks, new-family resources, FAQ, and final join CTA; verify the next two to four future events are chronological and all required homepage sections appear in the generated HTML.
- [x] 4.2 Build About, Join, Activities & Adventures, and Photos pages from the approved content, including Pack history, grade/rank details, costs, registration paths, traditions, and approved-media guidance; verify each page has a working join/contact path and all missing imagery or details use explicit non-factual states.
- [x] 4.3 Build the Calendar page with the complete structured event list, tentative-plan messaging, responsive live Google Calendar embed when both URLs are configured, direct fallback link, and useful unconfigured state; verify both configured and unconfigured build cases render the specified behavior.
- [x] 4.4 Build the comprehensive Resources page with an in-page contents list, onboarding, registration, financial assistance, medical forms, uniforms, safety, communication, downloads, and keyboard-native FAQs; verify every verified source link/document is reachable and missing Band, Scoutbook, and packing-list resources never render fabricated links.
- [x] 4.5 Build Fundraising, Volunteer, Contact, and branded 404 pages with verified facts, shared-contact defaults, privacy-safe leader visibility, secondary navigation, and join paths; verify no personal phone number, unsupported opening, fundraiser goal, sponsorship, donation action, social link, or server-backed contact form appears by default.

## 5. Delivery and Maintainer Guidance

- [x] 5.1 Add a GitHub Actions workflow that installs from the lockfile, runs checks and builds on pull requests, and deploys the static artifact through GitHub Pages only from the default branch; verify the workflow syntax and permissions match the official Pages action flow and no repository/domain name is guessed.
- [x] 5.2 Write the root maintainer guide covering prerequisites, install/dev/build/preview commands, content and event edits, annual config rollover, approved media/documents, Google Calendar setup, base-path/custom-domain configuration, pull-request review, privacy checks, deployment, rollback, and Pack-controlled ownership; verify a new contributor can identify every editable source and launch-blocking confirmation from the guide.

## 6. Integrated Verification and Local Handoff

- [x] 6.1 Run `npm run check` and the default and non-root-base production builds, fix all errors, and verify generated routes, documents, internal links, event content, metadata modes, and static-only output satisfy the five capability specs.
- [x] 6.2 Serve the production site locally and inspect Home, Calendar, Join, Resources, Contact, and mobile navigation at approximately 320, 768, and 1280 CSS pixels; verify no horizontal scrolling, broken assets, unreadable states, focus loss, or touch-target failures and record the working local URL.
- [x] 6.3 Perform the final design/content audit against `docs/design/cub_scout_pack_website_design_spec.md` and `docs/content/PACK862_CONTENT_GAPS_AND_CONFIRMATIONS.md`, optionally capture a Lighthouse performance result where available, and verify every remaining pre-launch question is documented rather than silently resolved.
