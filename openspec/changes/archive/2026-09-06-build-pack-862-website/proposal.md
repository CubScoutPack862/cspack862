## Why

Pack 862 has architecture, design, and content guidance but no website implementation, leaving prospective families without a fast, trustworthy way to discover the Pack, see activities and upcoming events, find parent resources, or join. A mobile-first static site will turn those approved materials into a locally runnable, volunteer-maintainable recruiting and information hub while keeping unresolved or privacy-sensitive details out of the public experience.

## What Changes

- Create an Astro-based static website for Cub Scout Pack 862 with Home, About, Calendar, Join, Activities, Resources, Fundraising, Volunteer, Photos, and Contact experiences organized into a concise primary navigation.
- Build a distinctive Cub Scouts-inspired visual system from the documented Scouting Blue and Cub Gold palette, sturdy typography, generous spacing, large touch targets, and reusable accessible components.
- Make approved activity photography the primary storytelling device while providing polished, clearly non-factual placeholders until Pack-approved youth photos and authorized brand assets are supplied.
- Put Pack identity, grades served, meeting location, upcoming activities, and repeated Join Pack 862 calls to action at high-visibility points throughout the site.
- Add a homepage events preview, a full tentative 2026-2027 event listing backed by structured content, and a configurable Google Calendar embed that can update without code changes once the Pack supplies its calendar URL.
- Consolidate registration, health and medical forms, safeguarding information, uniform guidance, onboarding steps, financial assistance, downloads, and FAQs into a comprehensive, easy-to-scan resources page.
- Keep annually changing facts and Pack content separate from presentation code through Astro content collections, Markdown, and centralized typed configuration with build-time validation.
- Provide local development and production build commands plus GitHub Pages deployment configuration and contributor documentation.
- Preserve all documented content gaps and conflicts: do not invent meeting schedules, calendar URLs, photos, contact details, fundraising facts, volunteer openings, or other unconfirmed information, and default public contact information to the shared Pack channel.

## Capabilities

### New Capabilities

- `public-pack-site`: Responsive, accessible public pages, navigation, Pack branding, activity-led storytelling, Pack facts, contact information, and prominent join paths.
- `event-calendar`: Structured Pack events, homepage previews, a full calendar experience, tentative-event messaging, and a configurable live Google Calendar integration.
- `family-resources`: A comprehensive, organized resource and FAQ experience covering registration, forms, onboarding, uniforms, safety, volunteering, fundraising, and downloadable documents.
- `maintainable-pack-content`: Markdown content collections and centralized season/config data that volunteers can safely update with validation and without editing presentation components.
- `site-delivery`: Reliable local development, static production builds, performance-oriented output, contributor guidance, and automated GitHub Pages deployment readiness.

### Modified Capabilities

None. This repository has no existing OpenSpec capability specifications or website implementation.

## Impact

- Adds the initial Astro project, reusable layouts/components, route pages, global styling, minimal navigation behavior, content collections, events, Pack data, public assets, and documentation.
- Adds Node/Astro dependencies, package scripts, static build configuration, and a GitHub Actions workflow suitable for GitHub Pages.
- Uses the existing files under `docs/` as source material; they remain the governing architecture, visual, content, and unresolved-data references.
- Introduces no database, backend API, authentication, traditional CMS, or server-side contact form. External registration, assistance, training, and resource links remain outbound links.
- Launch readiness will still depend on Pack leadership confirming conflicting schedules and email usage and supplying a Google Calendar URL, approved photos, and any authorized official brand assets.
