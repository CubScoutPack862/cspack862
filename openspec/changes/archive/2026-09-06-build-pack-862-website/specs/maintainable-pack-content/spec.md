## Purpose

Let non-technical Pack volunteers update routine site information safely through focused content files while build-time validation prevents malformed or unverified data from silently reaching the public site.

## ADDED Requirements

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
The content model SHALL distinguish verified, tentative, confirmation-required, missing, and private values so the public presentation cannot silently transform an unresolved value into a confirmed statement.

#### Scenario: Tentative event is rendered
- **WHEN** an event is marked tentative in content
- **THEN** the event view exposes that status in text and not by color alone

#### Scenario: Personal contact is private by default
- **WHEN** leader details exist but public visibility has not been explicitly enabled
- **THEN** the public site omits personal phone numbers and uses the shared Pack channel

### Requirement: Media entries require provenance and accessible text
Local gallery and activity images SHALL require descriptive alternative text, an approval or placeholder status, and sufficient context to avoid fabricated captions or youth identities.

#### Scenario: Unapproved photo is referenced
- **WHEN** a media entry is not marked as approved for public use
- **THEN** the public build excludes the image and uses the designated placeholder presentation

### Requirement: Contributor workflow is documented
The repository SHALL document how a volunteer installs dependencies, runs a local preview, edits page and event content, updates annual configuration, adds approved media or documents, validates the build, and proposes changes for review.

#### Scenario: New volunteer follows the guide
- **WHEN** a contributor follows the documented local setup and edit workflow on a supported Node environment
- **THEN** they can preview a content change and run the same validation used for production without needing a database or CMS account

