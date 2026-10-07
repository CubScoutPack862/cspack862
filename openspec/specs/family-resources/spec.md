# family-resources Specification

## Purpose

Consolidate the forms, onboarding guidance, safety information, uniform help, FAQs, and participation resources families need so common questions can be answered from one organized destination.

## Requirements

### Requirement: Comprehensive resource hub
The Resources page SHALL act as a public brochure hub for verified joining, season fees, financial assistance, uniforms, Scout Shop information, public safety guidance, official safeguarding and medical-form resources, and frequently asked questions. It MUST NOT publish or solicit member-only communication links, Pack-specific forms, camping files, payment instructions, fundraising campaign details, donation routes, volunteer vacancies or rosters, or the private New Family Orientation Guide.

#### Scenario: New family opens Resources
- **WHEN** a visitor opens the Resources page
- **THEN** they can scan approved public sections and reach youth registration, financial assistance, official uniform guidance, official safeguarding and medical-form information, Scout Shop details, and the Pack contact path

#### Scenario: Resource is not available
- **WHEN** a Pack resource is classified private, member-only, missing, or not approved for public use
- **THEN** the page omits the resource and does not display its value, a dead link, or a prompt to request the private value

#### Scenario: Visitor looks for the orientation guide
- **WHEN** a visitor reviews public downloads or requests the former guide URL
- **THEN** the private guide is not offered as a download and its former public file is absent from the site artifact

### Requirement: Safe and descriptive resource links
External and downloadable links SHALL use descriptive names, visibly identify external destinations or document formats where useful, and avoid collecting sensitive youth information.

#### Scenario: Visitor opens a downloadable form
- **WHEN** a visitor activates a document link
- **THEN** the link identifies the document purpose and file type and points to the verified Pack-provided or authoritative source

#### Scenario: Visitor needs help with a form
- **WHEN** a visitor cannot find or use a required resource
- **THEN** the page provides the shared Pack email as the assistance path without requesting unnecessary child details

### Requirement: New-family onboarding checklist
The site SHALL present only publicly approved onboarding steps suitable for prospective families, including youth registration, season fees, available financial assistance, general uniform preparation, official safeguarding and medical-form guidance, the approved shared-email route for submitting safeguarding certificates, and the public Pack contact route. It MUST NOT present member-only app invitations, Pack-specific forms, payment instructions, or private documents as public onboarding steps.

#### Scenario: Family reviews onboarding
- **WHEN** a visitor opens public joining or resource guidance
- **THEN** the visitor can understand who may join, how to register, the approved 2026-2027 fees and due date, where to review financial assistance, uniforms, safeguarding, and medical-form information, where to email a safeguarding certificate, and how to contact the Pack

#### Scenario: Registered family needs internal onboarding
- **WHEN** the public brochure refers to details supplied after registration
- **THEN** it does not disclose or enumerate private systems, invitation links, files, or payment channels

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

### Requirement: Registered-volunteer guidance is available from Join
The public Join experience SHALL provide a narrowly scoped registered-volunteer section covering general participation, the official adult application, safeguarding, California / GLAAC compliance, My.Scouting position-specific training, adult leader uniform direction, the annual adult registration fee, and the active-role registration and LiveScan reimbursement policy. It MUST NOT offer a dedicated Volunteer page or disclose roles, vacancies, rosters, private coordination, donation routes, payment instructions, or fundraising campaign details.

#### Scenario: Parent considers becoming a registered volunteer
- **WHEN** a prospective family reviews the Join page
- **THEN** it can follow the official adult application and training links and understand the public fee and reimbursement policy without needing a private Pack document

#### Scenario: Volunteer operational information is unavailable publicly
- **WHEN** a visitor seeks a current role, assignment, fundraising campaign, or internal coordination detail
- **THEN** the public brochure omits it rather than displaying a placeholder or a prompt for a private link
