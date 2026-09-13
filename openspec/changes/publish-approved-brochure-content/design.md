## Context

See `proposal.md` for motivation. The Astro site already separates page/event/media content from components, validates a centralized `pack` object, and builds statically for GitHub Pages. Most unresolved content is currently represented by confirmation placeholders, text-only branding, placeholder media, and public pages derived from the New Family Orientation Guide.

The completed questionnaire is the decision source for this change, but it is itself private. Approved brand and stock-image source files are staged locally under `media/`; the orientation guide is also staged there. Some copies of private or now-withheld documents were previously tracked under `docs/` or `public/`; the public repository will therefore be initialized from the verified current tree rather than importing this repository's history.

The separate `launch-site-on-github-pages` change governs production hosting. It will create `git@github.com:CubScoutPack862/cspack862.git` from the verified current tree without transferring legacy refs or history.

## Goals / Non-Goals

**Goals:**

- Make public output follow an explicit brochure allowlist instead of surfacing every known value or unresolved placeholder.
- Keep routine approved facts and visibility states centralized and build-validated.
- Publish the exact approved branding, rank imagery, stock-photo selections, contacts, schedules, fees, and public resources.
- Make restricted information absent from routes, generated files, tracked files, and the independently initialized public repository history.
- Produce a static build suitable for staging and a later Pack-controlled review and publication-approval change.

**Non-Goals:**

- Add a backend, submitted contact form, authentication, member portal, CMS, analytics, or public Google Calendar.
- Publish Pack/family photographs, social accounts, den contacts or schedules, payment details, member-system links, Pack-specific forms, or private operational guidance.
- Confirm missing event times and locations or change the supplied tentative event dates.
- Redesign or redact the orientation guide for later public release.

## Decisions

### 1. Treat the generated site as an explicit public allowlist

Structured facts keep a publication state, extended where necessary to distinguish `member-only` from `private`. Render helpers expose verified public values and clearly labeled tentative values; they return no public value or invitation for restricted records. Missing public integrations may retain a neutral unavailable state only when the page remains useful without them, such as the planned Google Calendar.

This is safer than converting every unanswered questionnaire field into public “coming soon” text. It also preserves the existing central data model instead of scattering privacy checks through Markdown.

### 2. Keep the brochure's focused public route set

The public page collection will contain Home, About, Calendar, Join, Activities, Resources, and Contact. The current Fundraising, Volunteer, and Photos entries and their navigation links will be removed because leadership classified their substantive content as private or declined Pack-photo publication. The Join page may include the approved registered-volunteer pathway: general examples of family participation, links to the official adult application and required training/compliance resources, and the annual adult registration fee and active-role reimbursement policy. It must not list volunteer vacancies, rosters, private coordination details, donation routes, payment instructions, or campaign details.

Deleting the corresponding content entries naturally removes the statically generated routes. Requests for former routes use the existing branded 404 behavior. This avoids maintaining public shells whose only purpose is to advertise withheld information.

### 3. Use email links for contact, with two approved contacts

The shared public action is a `mailto:` link to Committee Chair Karen Garcia at `cubscoutpack862@gmail.com`; Cubmaster Michael Huffman is also listed with `activitiescubscoutpack862@gmail.com`. The contact page and relevant calls to action state that Pack leaders usually reply within one week. No form fields, client-side submission code, form provider, phone number, biography, or other leader entry is introduced.

This keeps contact functional on GitHub Pages and avoids sending visitor data to an unapproved processor.

### 4. Publish approved meeting details without private access links

The central Pack data will store:

- Faith United Methodist Church as charter organization and primary meeting location.
- `2115 W 182nd Street, Torrance, CA 90504` with an HTTPS Google Maps directions/search link.
- “Enter through the main entrance.”
- “Pack meetings are held two or three times per month on Fridays from 7:00 to 8:30 PM.”
- “The Parent Committee virtually meets on the first Wednesday of each month at 7:00 PM.”
- “Den schedules are available after registration.”

No virtual-meeting URL, den schedule, or Band invitation is stored in rendered page content.

### 5. Publish only the Pack logo, rank insignia, and selected stock imagery

Approved high-resolution source files are transformed from local staging into web-safe public paths. Resizing, compression, and format conversion are allowed to meet layout and performance needs, while aspect ratio, color, composition, and recognizable logo/rank artwork remain visually faithful. The asset plan is:

| Use | Staged source | Public role |
| --- | --- | --- |
| Pack identity and favicon | `media/brand/assets/pack-862-logo.jpg` | Responsive header, homepage, and footer image plus a small favicon derivative |
| Den cards | Lion, Tiger, Wolf, Bear, Webelos, and Arrow of Light insignia files in `media/brand/assets/` | One visually faithful optimized rank image per grade/den |
| Homepage hero | `flags_7593_Wolf_148_RP_017-photo-CSBC-1.JPG` | General Cub Scouting activity image |
| Celebration/together feature | `193A8987-photo-CSBC.jpg` | General Cub Scouting activity image |
| Outdoors feature | `kayaking_AR1A0802-photo-CSBC.JPG` | General Cub Scouting activity image |
| Derby feature | `derby_250723 Camp Capitol Hill-3072-PWD-photo-CSBC.JPG` | General Cub Scouting activity image |

The standalone Cub Scouts program-logo files remain unpublished. Unused staged photos, including the questionnaire's proposed gallery images, remain unpublished because there will be no public Pack gallery. Optimized derivatives use appropriate web formats and dimensions for their display roles, without upscaling or visual redesign. Each published image receives dimensions, neutral descriptive alternative text, Brand Assets provenance, and an approval classification. Provenance remains in maintained metadata; the public layout does not repeat a provenance disclaimer beneath every image and never identifies stock subjects as Pack 862 members.

### 6. Replace guide-derived operational content with approved brochure content

The public resource and join pages retain the verified youth registration link, season fees (`$170` National/Council plus `$175` Pack dues, due January 31, 2027), council financial assistance, official uniform guidance, confirmed Scout Shop hours, official safeguarding and medical-form links, and the approved shared email for safeguarding certificates.

They remove the orientation-guide download and references that imply it remains the public authority. They also omit Band, Scoutbook, Trail's End, Pack-specific forms, camping files, payment method/address, donation routes, social-account content, and private fundraising or volunteer operations. The Join page retains the approved registered-volunteer pathway: general ways to help with Pack activities and events, the official adult application, annual safeguarding training, California / GLAAC compliance, My.Scouting position-specific training, the adult leader uniform direction, the annual adult registration fee, and the active-role registration and LiveScan reimbursement policy. This is not a public Volunteer destination or a solicitation of specific openings; public copy can say that additional details are provided after registration without naming or soliciting restricted systems.

### 7. Keep the dated season plan tentative

The existing event entries and dates remain. Their page-level introduction will cite the current leadership plan rather than the private orientation guide. Every event remains visibly tentative, missing times or locations stay absent or “to be confirmed,” and Blue and Gold continues to show an unconfirmed location. The Calendar page retains a neutral notice that a public Google Calendar is planned but not ready.

### 8. Separate local staging from public assets and initialize a clean public repository

The `media/` staging directory and completed questionnaire remain local-only through repository ignore rules. Only the selected approved images are copied into the public asset tree. The private orientation guide and questionnaire are absent from the build and are covered by artifact-audit checks.

Because an orientation guide and related source documents were previously tracked, the public deployment MUST NOT transfer, push, or otherwise import this repository's Git history. Instead, the launch change initializes `git@github.com:CubScoutPack862/cspack862.git` from a verified current tree containing only approved public source. The legacy repository and its refs remain outside the public deployment. A source-tree/privacy scan before initialization and a fresh clone/build of the new repository verify the boundary; no history rewrite is required.

## Risks / Trade-offs

- **[Legacy history is accidentally imported into the public repository]** → Initialize the new repository only from the verified current tree, add no legacy remote or refs, and confirm a fresh clone contains only the new public history.
- **[A restricted fact survives in prose rather than structured data]** → Search the complete source tree, route inventory, public assets, and generated HTML for known private paths and values before initializing the public repository.
- **[Stock imagery is mistaken for Pack photography]** → Use neutral activity copy, record provenance, remove the Pack-photo gallery, and never caption subjects as Pack 862 members.
- **[JPG Pack logo is less flexible than SVG/transparent PNG]** → Derive responsive web-sized and favicon variants from the approved source without recoloring, distortion, or redrawing, and defer artwork replacement until leadership approves a better source.
- **[A `mailto:` link depends on the visitor's email client]** → Display the email address as selectable text as well as a link; do not add an unapproved third-party form processor.
- **[Public operating facts become stale]** → Keep season and publication states centralized, display the applicable season, and route corrections through Pack site administration.
- **[Tentative dates may still be read as commitments]** → Label the calendar and each event as tentative in text and preserve “to be confirmed” for missing details.

## Migration Plan

1. Reconcile this change with `launch-site-on-github-pages`, making a clean initialization of `git@github.com:CubScoutPack862/cspack862.git` from the verified current tree a precondition of public deployment.
2. Inventory the current source tree, define forbidden private paths/content, and prepare ignore and audit rules.
3. Derive only approved, visually faithful web-optimized assets into public web paths and add their metadata before removing placeholder usage.
4. Update centralized Pack facts and visibility states, then revise the seven retained pages, global navigation, contact surfaces, and resource rendering.
5. Remove withheld page entries and downloads; preserve the tentative event entries while revising their public source wording.
6. Run content validation, production builds for supported base paths, asset/link checks, and explicit whole-site absence scans for private or unapproved material.
7. Initialize and verify the new public repository from the approved current tree, validate from a fresh clone, and continue through the launch change only after the content and privacy gates pass.
8. Defer rendered-site review, requested-revision handling, and final publication approval to a separate change after staging.

Rollback before publication is a normal source revert. The legacy repository remains a non-public recovery source and MUST NOT be imported into the public remote.
