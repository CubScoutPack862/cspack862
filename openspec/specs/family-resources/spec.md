# family-resources Specification

## Purpose

Consolidate the forms, onboarding guidance, safety information, uniform help, FAQs, and participation resources families need so common questions can be answered from one organized destination.

## Requirements

### Requirement: Comprehensive resource hub
The Resources page SHALL group verified resources into clear sections for getting started, registration and financial assistance, health and medical forms, uniforms, safety and adult requirements, communication tools, downloadable Pack documents, volunteering, and frequently asked questions.

#### Scenario: New family opens Resources
- **WHEN** a parent or guardian visits the Resources page
- **THEN** they can scan category headings and reach the youth application, financial assistance, medical form, youth-protection training, California compliance, official uniform guide, and new-family orientation guide

#### Scenario: Resource is not available
- **WHEN** a requested Pack resource such as the Band invite, Scoutbook instructions, or camping packing list has not been supplied
- **THEN** the page presents a concise labeled placeholder or omits the inactive control and provides the shared Pack contact path instead of fabricating a link

### Requirement: Safe and descriptive resource links
External and downloadable links SHALL use descriptive names, visibly identify external destinations or document formats where useful, and avoid collecting sensitive youth information.

#### Scenario: Visitor opens a downloadable form
- **WHEN** a visitor activates a document link
- **THEN** the link identifies the document purpose and file type and points to the verified Pack-provided or authoritative source

#### Scenario: Visitor needs help with a form
- **WHEN** a visitor cannot find or use a required resource
- **THEN** the page provides the shared Pack email as the assistance path without requesting unnecessary child details

### Requirement: New-family onboarding checklist
The site SHALL present the source-supported onboarding steps in a clear sequence and distinguish annual, one-time, optional, and currently unconfirmed actions.

#### Scenario: Family reviews onboarding
- **WHEN** a newly registered family opens the onboarding section
- **THEN** the steps for registration, annual safeguarding training, Trail's End, medical records, uniforms, handbook, Band, and parent meetings are shown with unavailable links flagged for confirmation

### Requirement: Uniform guidance avoids unsupported claims
Uniform content SHALL reflect the rank-specific source guidance, link to the official Cub Scout uniform resource, label year-sensitive Scout Shop information for confirmation, and MUST NOT apply Tiger-specific neckerchief or slide details to other ranks.

#### Scenario: Parent compares rank uniforms
- **WHEN** a parent reads the uniform section
- **THEN** Lion, blue-uniform ranks, and Arrow of Light guidance are separated and ambiguous details are not generalized

### Requirement: Safety information is prominent and readable
The Resources experience SHALL surface the documented Safe Sanctuary, adult-presence, sibling-supervision, restroom, LiveScan, and Buddy System expectations in plain parent-friendly language.

#### Scenario: Parent looks for event supervision rules
- **WHEN** a parent opens the safety section
- **THEN** the applicable supervision and buddy expectations are visible without requiring a document download

### Requirement: Helpful FAQ coverage
The site SHALL answer verified common questions about who can join, grades and dens, costs, uniforms, parent participation, activities, joining, meetings, and resources while labeling schedule conflicts and season-specific fees.

#### Scenario: Parent reviews cost information
- **WHEN** a parent expands the cost FAQ
- **THEN** the 2026-2027 national or council fee, Pack dues, possible additional costs, and year-specific status are stated without implying permanence

#### Scenario: Keyboard user operates FAQs
- **WHEN** a keyboard user navigates the FAQ controls
- **THEN** each question can be focused, expanded, and collapsed without a pointer device

### Requirement: Volunteer and fundraising information remains factual
The Volunteer and Fundraising experiences SHALL explain verified participation expectations, registration and training requirements, reimbursements, dues, popcorn fundraising, and direct-donation treatment, while withholding unsupported openings, goals, schedules, sponsorship packages, or donation links.

#### Scenario: No current volunteer openings are configured
- **WHEN** the Volunteer page has no approved vacancy data
- **THEN** it invites families to contact the Pack about helping without listing invented roles

#### Scenario: No public donation route is configured
- **WHEN** the Fundraising page has no approved public donation URL
- **THEN** it explains the verified fundraising model and directs questions to the shared Pack contact without presenting a payment button

