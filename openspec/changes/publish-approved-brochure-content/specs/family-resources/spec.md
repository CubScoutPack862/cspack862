## MODIFIED Requirements

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

### Requirement: New-family onboarding checklist
The site SHALL present only publicly approved onboarding steps suitable for prospective families, including youth registration, season fees, available financial assistance, general uniform preparation, official safeguarding and medical-form guidance, the approved shared-email route for submitting safeguarding certificates, and the public Pack contact route. It MUST NOT present member-only app invitations, Pack-specific forms, payment instructions, or private documents as public onboarding steps.

#### Scenario: Family reviews onboarding
- **WHEN** a visitor opens public joining or resource guidance
- **THEN** the visitor can understand who may join, how to register, the approved 2026-2027 fees and due date, where to review financial assistance, uniforms, safeguarding, and medical-form information, where to email a safeguarding certificate, and how to contact the Pack

#### Scenario: Registered family needs internal onboarding
- **WHEN** the public brochure refers to details supplied after registration
- **THEN** it does not disclose or enumerate private systems, invitation links, files, or payment channels

## ADDED Requirements

### Requirement: Registered-volunteer guidance is available from Join
The public Join experience SHALL provide a narrowly scoped registered-volunteer section covering general participation, the official adult application, safeguarding, California / GLAAC compliance, My.Scouting position-specific training, adult leader uniform direction, the annual adult registration fee, and the active-role registration and LiveScan reimbursement policy. It MUST NOT offer a dedicated Volunteer page or disclose roles, vacancies, rosters, private coordination, donation routes, payment instructions, or fundraising campaign details.

#### Scenario: Parent considers becoming a registered volunteer
- **WHEN** a prospective family reviews the Join page
- **THEN** it can follow the official adult application and training links and understand the public fee and reimbursement policy without needing a private Pack document

#### Scenario: Volunteer operational information is unavailable publicly
- **WHEN** a visitor seeks a current role, assignment, fundraising campaign, or internal coordination detail
- **THEN** the public brochure omits it rather than displaying a placeholder or a prompt for a private link
