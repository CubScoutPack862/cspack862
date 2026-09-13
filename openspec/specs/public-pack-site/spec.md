# public-pack-site Specification

## Purpose

Provide families with a welcoming, trustworthy, activity-led public experience that explains Pack 862 quickly and makes joining or contacting the Pack easy on any device.

## Requirements

### Requirement: Complete public information architecture
The site SHALL provide a public brochure experience for Home, About Our Pack, Calendar, Join, Activities & Adventures, Parent Resources, and Contact, with no required destination more than one navigation interaction away from a primary or secondary navigation surface. It MUST NOT publish dedicated Photos, Fundraising, or Volunteer destinations while those subjects contain only private, member-only, or unapproved information.

#### Scenario: Family explores the site
- **WHEN** a visitor opens any public page
- **THEN** the visitor can reach Home, About, Calendar, Join, Activities, Resources, and Contact through visible header, page, or footer navigation

#### Scenario: Visitor requests withheld content
- **WHEN** a visitor requests a removed Photos, Fundraising, or Volunteer route
- **THEN** the site does not expose the former page content and provides a branded route back to public brochure information

#### Scenario: Visitor lands on an unknown route
- **WHEN** a visitor requests a route that does not exist
- **THEN** the site presents a branded not-found experience with paths back to Home and Join

### Requirement: Activity-led recruiting homepage
The homepage SHALL place Pack activities and the experience of Scouting at the center of the design while immediately identifying Pack 862, Torrance, grades K-5, and the family-focused nature of the program. Activity visuals SHALL use only the approved Scouting America Brand Assets stock photographs and MUST NOT state or imply that depicted people are Pack 862 members.

#### Scenario: Prospective family opens the homepage
- **WHEN** the homepage loads
- **THEN** the first viewport presents the Pack 862 logo, a concise value proposition, an approved activity-focused stock visual, a Join Pack 862 action, and an upcoming-events action

#### Scenario: Approved Pack photos are unavailable
- **WHEN** no approved stock image is configured for a visual slot
- **THEN** the site renders a polished non-identifying placeholder without fabricating Pack-specific people, names, dates, or captions

### Requirement: Essential Pack facts are easy to find
The site SHALL make verified grades served, Pack identity, meeting location, Pack schedule, Parent Committee schedule, and approved public contacts available within one interaction from the homepage. The public contact experience SHALL use email links and SHALL state that Pack leaders usually respond within one week. Any value that is private, missing, or still disputed MUST be omitted or identified as unavailable rather than presented as fact.

#### Scenario: Parent looks for meeting information
- **WHEN** a parent views the homepage or follows its meeting-information link
- **THEN** the site identifies Faith United Methodist Church as the charter organization and primary meeting location, shows 2115 W 182nd Street in Torrance, links the address to Google Maps, gives the main-entrance instruction, and states that Pack meetings occur two or three Fridays per month from 7:00 to 8:30 PM

#### Scenario: Parent looks for committee meeting information
- **WHEN** a parent views public meeting details
- **THEN** the site states that the Parent Committee virtually meets on the first Wednesday of each month at 7:00 PM without publishing a private meeting link

#### Scenario: Visitor seeks contact details
- **WHEN** a visitor opens the Contact page or a global contact surface
- **THEN** the site offers email links for Committee Chair Karen Garcia at `cubscoutpack862@gmail.com` and Cubmaster Michael Huffman at `activitiescubscoutpack862@gmail.com`, publishes no leader phone numbers or biographies, and does not present a server-submitted contact form

### Requirement: Join actions are persistent and direct
The site SHALL expose descriptive Join Pack 862 actions in the global header, homepage hero, relevant informational pages, and final calls to action, all leading to a join experience with the verified youth-registration link and an alternative contact path.

#### Scenario: Visitor selects any join call to action
- **WHEN** a visitor activates a Join Pack 862 action
- **THEN** the visitor reaches the Join page or the verified Scouting America youth-registration destination without encountering a dead end

#### Scenario: Visitor is not ready to register
- **WHEN** a visitor opens the Join page but wants to ask a question first
- **THEN** the page offers a direct path to the shared Pack contact channel

### Requirement: Join page offers an approved registered-volunteer pathway
The Join page SHALL explain that families may participate as registered volunteers, identify general Pack and event support as examples, and provide the official adult application, safeguarding, California / GLAAC compliance, and My.Scouting training links. It SHALL publish the applicable adult registration fee and active-role registration and LiveScan reimbursement policy. It MUST NOT create a dedicated Volunteer destination or publish volunteer vacancies, rosters, private coordination details, payment instructions, donation routes, or fundraising campaign details.

#### Scenario: Prospective adult volunteer opens Join
- **WHEN** a parent or guardian reads the Join page's volunteer guidance
- **THEN** they can understand the general ways families help, reach the official application and required training resources, and see the current adult registration fee and reimbursement policy

#### Scenario: Visitor seeks a specific volunteer role
- **WHEN** a visitor looks for a current opening or operational assignment
- **THEN** the site does not expose a roster, vacancy, private schedule, or other member-only coordination detail

### Requirement: Cub Scouts-inspired visual identity
The public interface SHALL use Scouting Blue `#003F87` as its primary color, Cub Scouting Gold `#FDC116` as an accent with dark text, generous white or light-neutral space, sturdy readable typography, clear grids, and minimal Scouting Red.

#### Scenario: Visual design is reviewed
- **WHEN** representative pages are inspected at phone and desktop widths
- **THEN** they present a consistent blue-and-gold Pack identity without appearing to be a pixel-for-pixel copy of ScoutingAmerica.org

### Requirement: Brand, youth privacy, and factual guardrails
The site MUST use visually faithful web derivatives of the approved Pack 862 logo in the header, footer, homepage, and favicon; MUST NOT display a standalone official Cub Scouts program logo; and SHALL use only visually faithful web derivatives of the supplied official rank insignia for Lion, Tiger, Wolf, Bear, Webelos, and Arrow of Light den cards. Resizing, compression, and format conversion SHALL preserve aspect ratio and recognizable artwork without recoloring, distortion, or redesign. The site SHALL link to Scouting America and display the Pack affiliation and trademark disclaimer. It MUST NOT publish youth personal information, Pack/family photographs, or missing or conflicting source material as confirmed fact.

#### Scenario: Pack identity is rendered
- **WHEN** a visitor views the homepage, header, footer, or browser icon
- **THEN** the approved Pack 862 logo is used and no standalone official Cub Scouts program logo is displayed

#### Scenario: No authorized logo asset is supplied
- **WHEN** the approved Pack 862 logo file is missing from the public asset set
- **THEN** release validation fails and the site does not substitute, trace, redraw, or imitate a standalone official program mark

#### Scenario: Visitor reviews grade-based dens
- **WHEN** the den or rank cards are rendered
- **THEN** each card shows its supplied official rank insignia, den number, rank, and grade without a den leader name, contact detail, or public den schedule

#### Scenario: Visitor seeks a den schedule
- **WHEN** a visitor reads the public den information
- **THEN** the site states that den schedules are available after registration and does not disclose the schedule or Band invitation

#### Scenario: Media is published
- **WHEN** an activity image appears on the public site
- **THEN** it is an approved stock photograph from the Scouting America Brand Assets library with descriptive alternative text, provenance, and wording that does not identify the subjects as Pack 862 members

#### Scenario: Youth photography is added
- **WHEN** a maintainer references a photograph depicting Pack youth or families
- **THEN** the public build excludes the photograph because this brochure permits stock photography only

### Requirement: Mobile and accessible interaction
The site SHALL remain usable without horizontal scrolling from 320-pixel phone widths through desktop, use touch targets at least 44 by 44 CSS pixels, maintain readable body text, and provide semantic structure, one primary heading per page, keyboard-operable navigation and controls, visible focus, WCAG AA contrast, descriptive alternatives, and reduced-motion behavior.

#### Scenario: Keyboard user opens mobile navigation
- **WHEN** a keyboard user focuses and activates the collapsed menu control
- **THEN** the menu state is announced, navigation items become operable in a logical order, Escape closes the menu, and focus remains predictable

#### Scenario: JavaScript is unavailable
- **WHEN** optional client-side JavaScript does not execute
- **THEN** core page content, join links, resources, and contact information remain accessible

#### Scenario: Visitor requests reduced motion
- **WHEN** the operating system indicates a reduced-motion preference
- **THEN** nonessential animation and smooth scrolling are suppressed

### Requirement: Page metadata and local clarity
Every public page SHALL have a unique title, a useful description, a logical heading hierarchy, and local Pack 862 and Torrance context where relevant; canonical and social-sharing URLs SHALL only be emitted when a public site origin is configured.

#### Scenario: Site origin is not yet configured
- **WHEN** the site is run locally without a production domain
- **THEN** pages retain useful titles and descriptions without emitting a fabricated canonical URL
