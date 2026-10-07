## Context

See `proposal.md` for motivation and the capability specs for observable behavior. The repository is currently greenfield: it contains the Pack 862 architecture, visual design specification, extracted website copy, the tentative 2026-2027 calendar, a content-gaps register, and the source orientation PDF, but no application scaffold or assets.

The governing constraints are intentionally conservative. The output must be a static Astro site with Markdown-centered maintenance, no database or server, and a GitHub Pages-ready build. The source material contains unresolved meeting times, two candidate shared email spellings, no Google Calendar URL, no approved activity photos or official logo, and several missing resource links. Those gaps must remain visible configuration states rather than being silently resolved in templates.

## Goals / Non-Goals

**Goals:**

- Establish a small Astro and TypeScript architecture that runs locally and emits a static site.
- Turn the existing design tokens and content into a polished, mobile-first experience whose component and content boundaries are easy to understand.
- Make routine annual changes happen in Markdown or one typed Pack configuration file.
- Make missing, tentative, private, and confirmation-required data safe by construction.
- Keep the homepage visually energetic and ready for approved activity photography without misrepresenting placeholder imagery.
- Make the full site usable with semantic HTML before optional JavaScript enhancements execute.

**Non-Goals:**

- Selecting, licensing, generating, or approving youth photography or official Scouting marks.
- Resolving the Pack's conflicting schedules, contact spelling, or publication-consent decisions.
- Building a CMS, database, authentication system, analytics service, payment flow, donation flow, or server-side contact form.
- Scraping or copying Scouting America content or images.
- Configuring the Pack's live domain, DNS, GitHub organization settings, branch protection, or Google Calendar account.

## Decisions

### 1. Use Astro static output with TypeScript and npm

The site will use Astro's static output, TypeScript checking, and a committed npm lockfile. Astro matches the repository's architecture decision, gives page-level HTML by default, supports reusable components and Markdown content, and ships little client JavaScript unless explicitly requested. `npm run dev`, `npm run build`, `npm run preview`, and `npm run check` will form the supported local workflow.

Alternatives considered:

- Plain HTML/CSS/JavaScript would minimize dependencies but duplicate shared navigation, metadata, event rendering, and resource presentation across ten experiences.
- A React single-page application would add hydration, routing, and maintenance cost without solving a requirement that static HTML cannot meet.
- Eleventy is viable, but Astro is already the explicit architecture recommendation and offers a stronger typed-content path for this greenfield build.

The implementation will select a current compatible Astro release at apply time rather than embedding a stale version in this planning artifact.

### 2. Separate editable content, structured data, presentation, and public files

The target shape is:

```text
content/
  pages/                 # Markdown copy by major site area
  events/                # one Markdown file per event
  media/                 # approved/placeholder media metadata
src/
  components/            # reusable Astro UI
  layouts/               # document shell and metadata
  pages/                 # route composition only
  data/pack.ts            # centralized season and operational facts
  content.config.ts       # collection loaders and schemas
  styles/global.css       # tokens, base rules, utilities, components
public/
  documents/             # orientation guide and later Pack-approved files
  images/                 # only approved local assets and neutral placeholders
```

Astro's content loader will read the top-level `content/` directory so parent contributors can work where `docs/architecture.md` directs them. Route files will compose reusable components and content; they will not carry large blocks of Pack prose or duplicate annual facts.

Alternatives considered:

- Putting all copy directly in `.astro` pages is simpler initially but defeats the documented maintenance model.
- One large Markdown file mirrors the extracted source but makes focused review and per-page editing harder.
- A remote headless CMS adds credentials, availability, and transfer risk not justified by the current requirements.

### 3. Model operational facts with explicit publication states

`src/data/pack.ts` will expose validated typed records for identity, season, location, shared contacts, leaders, schedules, fees, registration, financial assistance, calendar integration, fundraising, volunteering, Scout Shop, and production origin. Values whose status matters will use a small discriminated shape such as:

```ts
type PublicationState = "verified" | "tentative" | "confirm" | "missing" | "private";

type ManagedValue<T> = {
  status: PublicationState;
  value?: T;
  publicNote?: string;
};
```

Rendering helpers will accept these records and choose among verified output, tentative labels, confirmation callouts, unavailable states, or omission. Leader contact visibility will be opt-in; the shared Pack channel will be the default. Paired values such as Google Calendar embed/direct URLs will be checked together. The config will contain one authoritative value for each annual fact so fees and dates cannot drift between pages.

Alternatives considered:

- Empty strings are ambiguous and make it easy to render broken links.
- Scattered `TODO` prose in templates is visible to developers but cannot enforce consistent public behavior.
- Environment variables are appropriate for deployment origin/base values, but most Pack facts belong in reviewable version-controlled content.

### 4. Keep the primary navigation concise while exposing the full site

The desktop and mobile primary navigation will contain Home, About, Calendar, Join, Resources, and Contact. Activities, Fundraising, Volunteer, and Photos will be linked from relevant homepage sections, page-level navigation, and the footer. This follows the six-item ceiling in the design specification while keeping all requested destinations one interaction away from a persistent surface.

The header will use a text-based `Pack 862` identity until an authorized mark is supplied. On small screens, a semantic menu control with minimal progressive enhancement will manage expanded state, Escape behavior, focus, and closing after navigation. The underlying links and page content remain server-rendered.

Alternatives considered:

- Ten top-level links would satisfy direct visibility but create a cramped, hard-to-scan mobile and desktop header.
- A multi-level mega menu is disproportionate for this amount of content.

### 5. Compose pages from a small reusable component system

The shared shell will be `BaseLayout`, `Header`, and `Footer`. Content composition will use focused pieces such as `Hero`, `SectionHeading`, `ButtonLink`, `QuickFacts`, `ActivityCard`, `EventCard`, `EventList`, `CalendarEmbed`, `RankGrid`, `StatusCallout`, `ResourceGroup`, `FAQList`, `JoinCTA`, and `MediaPlaceholder`.

Components will accept display data and status, not import page-specific copy opportunistically. This makes route behavior predictable and keeps accessibility semantics in one place. Repeated calls to join will use a consistent high-emphasis component while link labels can remain context-specific.

Alternatives considered:

- A generic all-purpose card component reduces file count but tends to accumulate conditionals and inconsistent semantics.
- Page-specific markup everywhere is quick to start but makes accessibility and responsive fixes repetitive.

### 6. Translate the design specification into local, resilient visual tokens

`global.css` will implement the documented palette, type scale, spacing, width, focus, breakpoint, and reduced-motion tokens. Scouting Blue is the foundation, Cub Gold is an accent with dark text, red remains rare, and layouts use generous white or light-tan space. Roboto Slab and Roboto Condensed will be self-hosted through build dependencies or local licensed font files so local previews and production pages do not depend on Google Fonts availability or third-party font requests; robust system fallbacks remain declared.

The responsive strategy is mobile-first at 320 pixels, then the documented 640, 800, 1024, and 1280 pixel checkpoints. Content grids collapse to one column, header interactions retain 44-pixel targets, and hero text never overlays a busy image. Each page receives one `h1`, meaningful landmarks, visible focus, and logical content order.

Alternatives considered:

- Loading Google Fonts at runtime is easy but adds a third-party dependency and weakens offline local fidelity.
- A utility CSS framework would speed some layout work but add vocabulary and build weight to a small design system already specified in plain CSS.

### 7. Use honest, replaceable visual placeholders until photography is approved

The initial hero and activity cards will reserve strong image-shaped regions using neutral outdoor-inspired graphic treatments and explicit copy such as "Pack-approved activity photo coming soon." Placeholder metadata will have a `placeholder` state and will never claim to show Pack 862 Scouts. The Photos page will explain the approval requirement and expose the planned album structure without invented albums or captions.

When approved images arrive, a maintainer adds optimized WebP/AVIF files, dimensions, alt text, event context, and approval status to the media content. Components then render the photo without layout changes. Official logos or rank graphics are never synthesized; absence falls back to text and typographic rank cards.

Alternatives considered:

- Remote stock photography would improve immediate visual richness but could be mistaken for Pack members and introduces licensing and provenance questions.
- Scraped Scouting America imagery is explicitly prohibited.

### 8. Combine curated event content with an optional live calendar iframe

Individual event Markdown entries will carry ISO start/end dates, optional known time/location, category, summary, and `tentative` state. A shared date helper will sort events chronologically, format single-day and multi-day dates, select the next two to four future events at build time, and show a graceful no-upcoming-events state.

The Calendar page will always render the complete structured event list. If both approved Google Calendar URLs are configured, it will also render a titled, lazy-loaded, responsive iframe and a direct fallback link. The iframe is the mechanism that receives Google Calendar changes without a site rebuild. Without configuration, the reserved live-calendar area shows a setup status and the curated list remains fully useful.

Alternatives considered:

- Google Calendar alone updates live but is harder to scan on phones, weaker for search, and empty until the missing URL is supplied.
- Copying events only into page markup prevents safe yearly maintenance.
- Calling the Google Calendar API would require credentials or a runtime integration inconsistent with static hosting.

### 9. Treat Resources as an information hub, not a file dump

The Resources page will use a table of contents followed by semantic `ResourceGroup` sections for onboarding, forms, financial assistance, uniforms, safety, communication, downloads, and FAQs. Links will state their purpose and external/file behavior. The orientation PDF will be copied to a stable public document path during implementation so it can be downloaded from the built site.

Missing Band, Scoutbook, packing-list, and Pack-form destinations will use a shared `StatusCallout` and contact path, not disabled-looking links. Volunteer and Fundraising retain dedicated pages for storytelling and recruitment, with concise cross-links from Resources. Contact will use mail links and published Pack information only; no inert form or implied server submission will be built.

Alternatives considered:

- A contact form with no backend would be deceptive, while adding a form service would introduce privacy and operational choices not yet approved.
- A single undifferentiated link list is technically complete but fails the goal of reducing parent questions.

### 10. Configure paths and deployment without coupling local use to hosting

`astro.config.mjs` will use static output and read explicit build-time site/base configuration with safe local defaults. All internal links and public assets will pass through a small base-path helper or Astro-supported path handling so the same source works at `/`, at a GitHub Pages repository subpath, and later on a custom domain.

The GitHub Actions workflow will install from the lockfile, run type/content checks, build, upload the generated directory, and deploy only from the default branch while validating pull requests without deployment. The README will distinguish local-only use, GitHub project Pages, and custom-domain configuration. No domain or repository name will be invented.

Alternatives considered:

- Hard-coding `/` is convenient locally but commonly breaks project-site assets on GitHub Pages.
- Hard-coding a guessed repository name or custom domain would turn a documented unknown into faulty production metadata.

### 11. Verify behavior at build time and visually at representative widths

The implementation verification loop will run TypeScript/Astro checks and a production build, then inspect the local site at approximately 320, 768, and 1280 CSS pixels. Verification covers routes, responsive overflow, navigation keyboard behavior, focus, heading order, event ordering/status, external/download links, missing-data states, canonical suppression in local mode, and production preview assets.

Where tooling is available, a Lighthouse run will be used as supporting evidence for the 90+ performance target, but correctness will not be declared solely from a score. The repository will avoid a large end-to-end test dependency unless implementation reveals behavior that cannot be verified proportionally with build checks and focused browser inspection.

## Risks / Trade-offs

- [The lack of approved Pack photos weakens the "show, don't tell" recruiting impact] → Build prominent dimensionally stable visual slots, label placeholders honestly, and document a one-file-plus-metadata replacement workflow.
- [Unconfirmed schedules or shared email could mislead families] → Centralize them with explicit `confirm` states and never choose between conflicting sources during implementation.
- [The dated 2026-2027 calendar and fees will become stale] → Display the season and tentative/year-specific labels, keep the values centralized, and document the annual rollover checklist.
- [A Google Calendar iframe can have awkward mobile UI and third-party privacy behavior] → Pair it with the native event list and direct link, constrain it responsively, lazy-load it, and render nothing external until leadership supplies an approved URL.
- [External application, training, and form links can change] → Keep them centralized where practical, use descriptive labels, and include periodic link review in contributor guidance.
- [GitHub Pages project paths differ from local and custom-domain paths] → Validate both base-path modes during build configuration and document the required environment values.
- [Public leader details and youth media create privacy exposure] → Default leader personal contacts to private, use the shared Pack channel, require an explicit approved state for youth photos, and collect no child information.
- [Self-hosted fonts add package and asset weight] → Limit families/weights to what the design uses, subset if practical, and retain system fallbacks.

## Migration Plan

1. Scaffold the static Astro project, scripts, checks, content loaders, base-path configuration, and global tokens in the existing repository.
2. Create centralized Pack configuration with all unresolved values represented by their documented states.
3. Split the extracted source copy and calendar into page/event content files; copy the orientation PDF to a public download path without altering the source document in `docs/`.
4. Implement the shared layout, navigation, components, placeholders, and requested pages, then connect event and resource rendering.
5. Add GitHub Pages validation/deployment configuration and contributor/annual-maintenance documentation.
6. Install locked dependencies, run checks and production build, serve the result locally, and inspect representative mobile and desktop widths before considering implementation complete.
7. Before public launch, leadership supplies and reviews the open configuration values and approved media. A failed launch can be rolled back by reverting the static source commit or redeploying the previous GitHub Pages artifact; there is no database migration or destructive data step.

## Open Questions

- Which of the two documented Pack/Den schedules is current, and what is the confirmed committee meeting time and format?
- Which shared Pack email spelling is authoritative, and may either leader's personal phone or email be public?
- What are the approved Google Calendar embed and direct URLs?
- Which Pack-approved youth photos and authorized official logo assets may be published?
- What GitHub repository name, production domain, and custom-domain timing should deployment use?
- What are the Band invite, Scoutbook instructions, packing list, social accounts, current volunteer openings, fundraiser details, and any approved public donation route?
