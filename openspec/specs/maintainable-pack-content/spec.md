# maintainable-pack-content Specification

## Purpose

Let non-technical Pack volunteers update routine site information safely through focused content files while build-time validation prevents malformed or unverified data from silently reaching the public site.

## Requirements

### Requirement: Content is separate from presentation
Routine page copy, events, and Pack facts SHALL be editable outside page templates, styles, and interactive components, with each major content area stored in a focused human-readable file.

#### Scenario: Parent updates page copy
- **WHEN** a contributor edits the Markdown content for one public section
- **THEN** the corresponding page reflects the change after a successful build without requiring edits to component markup or styles

#### Scenario: Parent adds an event
- **WHEN** a contributor adds a valid event content file
- **THEN** it appears in the appropriate chronological event views without editing a page template

### Requirement: Annual and operational facts have one source of truth
The current season, fees, due dates, registration links, financial-aid status, meeting schedules, calendar URLs, leaders, public contact settings, Pack email, payment details, Band invite, fundraiser information, volunteer openings, Scout Shop hours, and public site origin SHALL each be defined in one centralized configuration source.

#### Scenario: Treasurer updates annual dues
- **WHEN** the Pack dues amount is changed in the central configuration
- **THEN** every site view that displays Pack dues uses the updated value after the next build

#### Scenario: Meeting schedule remains unresolved
- **WHEN** no confirmed public schedule is configured
- **THEN** the site shows the documented confirmation state everywhere rather than falling back to one of the conflicting source schedules

### Requirement: Content schemas fail safely
Structured content and Pack configuration SHALL be validated during the build for required fields, data types, dates, URLs, allowed publication states, and meaningful error messages.

#### Scenario: Contributor enters malformed Pack data
- **WHEN** a required configuration value has the wrong type or an invalid URL or date format
- **THEN** the build stops and identifies the file and invalid field

#### Scenario: Optional unconfirmed value is blank
- **WHEN** an explicitly optional or unconfirmed configuration value is absent
- **THEN** the build succeeds and the relevant view uses its specified confirmation or unavailable state

### Requirement: Known content gaps remain explicit
The content model SHALL distinguish verified, tentative, confirmation-required, missing, private, member-only, and approved-for-publication values so the public presentation cannot silently transform an unresolved or restricted value into a public statement. Public brochure pages MUST omit private and member-only values instead of advertising them through public placeholders.

#### Scenario: Tentative event is rendered
- **WHEN** an event is marked tentative in content
- **THEN** the event view exposes that status in text and not by color alone

#### Scenario: Personal contact is private by default
- **WHEN** leader details exist but public visibility has not been explicitly approved
- **THEN** the public site omits the leader's name, email address, phone number, biography, and other personal details

#### Scenario: Member-only resource is unavailable publicly
- **WHEN** a Band, Scoutbook, Trail's End, camping, Pack-form, payment, fundraising campaign, donation, social-account, volunteer roster or vacancy, or other operational value is marked private or member-only
- **THEN** no value, inactive control, invitation to request the value, or confirmation placeholder is rendered on the public brochure

### Requirement: Media entries require provenance and accessible text
Every public local image SHALL have descriptive alternative text, intrinsic dimensions, source provenance, an explicit publication approval, and a classification identifying it as Pack branding, official rank insignia, or approved stock photography. Web delivery assets MAY be resized, compressed, and re-encoded from the approved high-resolution source while preserving visual fidelity and aspect ratio. Media without complete public approval MUST be excluded from the public build or replaced by the designated non-identifying placeholder.

#### Scenario: Approved stock photo is referenced
- **WHEN** a media entry is marked approved stock photography
- **THEN** the entry records its Scouting America Brand Assets provenance and approval, supplies useful alternative text and dimensions, and can be rendered without a Pack-specific caption

#### Scenario: Unapproved photo is referenced
- **WHEN** a media entry is unapproved or depicts Pack members or Pack families
- **THEN** the public build excludes the image and does not publish it through a gallery, page asset, metadata image, or downloadable file

### Requirement: Public repository content boundary
Internal working documents, private Pack documents, candidate contact data, and member-only files MUST NOT be present in the public repository's tracked tree or history and MUST NOT be copied into the generated site. The public repository SHALL be initialized independently from the verified current tree, without importing legacy repository refs or history. Public assets derived from a private staging area SHALL be limited to explicitly approved files and SHALL retain non-secret provenance and approval metadata.

#### Scenario: Public repository is reviewed
- **WHEN** maintainers prepare the repository for public visibility
- **THEN** the completed questionnaire, private New Family Orientation Guide, and other internal or member-only source files are absent from the tracked tree and public repository history; the repository has no imported legacy refs; and the files are ignored from future additions

#### Scenario: Production artifact is reviewed
- **WHEN** the static production artifact is built
- **THEN** it contains no completed questionnaire, private orientation guide, private contact value, member-only link, or unapproved media file

#### Scenario: Approved staged asset is published
- **WHEN** a maintainer selects a Pack logo, rank insignia, or stock photograph from private staging for public use
- **THEN** only a visually faithful web-optimized derivative of that approved asset is written to a public asset location and its publication metadata does not expose private approval records

### Requirement: Approved volunteer guidance uses verified public data
The public Join-page volunteer section SHALL derive its adult registration fee and external adult-application, safeguarding, California / GLAAC compliance, and My.Scouting links from centralized, build-validated Pack data. General participation copy and the active-role registration and LiveScan reimbursement policy SHALL be reviewed as approved public content; private volunteer operations remain omitted.

#### Scenario: Maintainer updates volunteer guidance
- **WHEN** a maintainer changes a fee or external volunteer resource used by the Join page
- **THEN** the build validates the centralized value and the rendered page uses the updated value without duplicating a URL or fee

### Requirement: Contributor workflow is documented
The repository SHALL document how a volunteer installs dependencies, runs a local preview, edits page and event content, updates annual configuration, adds approved media or documents, validates the build, and proposes changes for review.

#### Scenario: New volunteer follows the guide
- **WHEN** a contributor follows the documented local setup and edit workflow on a supported Node environment
- **THEN** they can preview a content change and run the same validation used for production without needing a database or CMS account
