## Why

Pack 862 now has leadership-reviewed answers and approved visual assets for replacing much of the website's provisional content. The site must operate as a public brochure, so every published detail needs to be intentionally public while member-only information, private documents, and internal working material stay out of both the deployment and the public repository.

## What Changes

- Present the existing site as a public recruiting brochure with general Pack information, joining guidance (including the approved registered-volunteer pathway), tentative events, and a direct email-based contact path.
- Use the approved `pack-862-logo.jpg` in the header, footer, homepage, and favicon. Do not display a standalone official Cub Scouts program logo.
- Add visually faithful web-optimized derivatives of the supplied official Lion, Tiger, Wolf, Bear, Webelos, and Arrow of Light rank insignia to the den cards; resizing, compression, and format conversion are permitted without recoloring, distortion, or redesign.
- Replace generic media placeholders with approved stock photography sourced from the Scouting America Brand Assets library. Do not publish Pack, family, or youth photographs, and do not imply that stock-photo subjects are Pack 862 members.
- Publish only the approved leader directory entries: Cubmaster Michael Huffman at `activitiescubscoutpack862@gmail.com` and Committee Chair Karen Garcia at `cubscoutpack862@gmail.com`. Publish no leader phone numbers, biographies, den leaders, or other roster information.
- Make the Committee Chair reachable through email links rather than a submitted web form, and state that Pack leaders usually respond within one week.
- Publish Faith United Methodist Church as Pack 862's charter organization and primary meeting location, link the address to Google Maps, provide the main-entrance instruction, and publish the approved Pack and Parent Committee schedules.
- Keep den meeting schedules private and tell visitors that den schedules are available after registration.
- Retain the current 2026–2027 event dates as a clearly tentative plan, with unavailable times and locations omitted or labeled for confirmation. Do not invent a Google Calendar link.
- Publish the approved season fees and due date plus verified public joining, financial-assistance, uniform, Scout Shop, official-resource, and registered-volunteer information. The Join page may describe general family participation, link to the official adult application and required training/compliance resources, and publish the annual adult registration fee and active-role reimbursement policy.
- Remove dedicated public Fundraising and Volunteer destinations and all private operational details, including volunteer rosters or vacancies, payment instructions, donation routes, Band, Scoutbook, Trail's End, camping documents, Pack forms, social accounts, and fundraising campaign details or inactive placeholders.
- Remove the Pack-photo gallery/future-photo solicitation and the public New Family Orientation Guide download.
- **BREAKING**: Exclude the private orientation guide, completed questionnaire, and other internal source material from both the production artifact and the public Git repository. Initialize the public repository from the verified current tree and do not import the legacy repository's Git history.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `public-pack-site`: Define the approved public-brochure scope, Pack-specific visual identity, stock-only media policy, public leader contacts, meeting details, and privacy boundaries.
- `maintainable-pack-content`: Make public visibility explicit for contacts, resources, media, and source documents so unavailable or private data is omitted rather than exposed as a placeholder.
- `family-resources`: Limit the public resource experience to approved brochure information, including the Join-page registered-volunteer pathway, while removing member-only operations, private Pack documents, and unapproved fundraising or volunteer details.

## Impact

- Affects centralized Pack data, page and event Markdown, header/footer/navigation, contact and rank components, media rendering, metadata/favicon, validation, whole-site absence checks, and contributor/release documentation.
- Derives web-sized assets only from explicitly approved Pack branding, rank insignia, and selected stock photos in the private staging area, retaining visual fidelity, provenance, and approval metadata.
- Removes or revises public routes and links that currently expose unapproved operational content or reference the private orientation guide.
- Requires coordination with the active `launch-site-on-github-pages` change so `git@github.com:CubScoutPack862/cspack862.git` is initialized from the verified current tree without importing legacy Git refs or history.
- Adds no backend, form processor, authentication, database, analytics, or new third-party runtime dependency; contact remains a static `mailto:` experience compatible with GitHub Pages.
