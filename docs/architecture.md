# Pack 862 Website Architecture

> **Current publication policy (September 2026):** Pack 862 operates this site as a public brochure. The public route allowlist is Home, About, Calendar, Join, Activities, Resources, and Contact. Only the Committee Chair and Cubmaster email addresses are public. Pack/member photos, phone numbers, biographies, operational resources, the completed questionnaire, and the New Family Orientation PDF are excluded. Public imagery is limited to the approved Pack logo, six rank insignia, and four selected Scouting America stock photographs. This policy supersedes broader examples elsewhere in this architectural background.

## 1. Overview

The Pack 862 website will be a simple, static website designed to be:

- Easy to maintain
- Inexpensive to host
- Friendly for non-technical parent contributors
- Safe to review before publishing
- Easy to transfer to future Pack volunteers
- Independent of any backend server or database

The recommended stack is:

- **Astro** — static site framework
- **Markdown** — primary content format
- **GitHub** — source control and collaboration
- **GitHub Actions** — automatic build and deployment
- **GitHub Pages** — website hosting
- **Custom domain** — Pack-owned domain pointed to GitHub Pages

The general principle is:

> Keep website design and code separate from Pack content.

Technical contributors maintain Astro components, layouts, and styles.

Parents primarily maintain Markdown files containing text, events, and Pack information.

---

## 2. High-Level Architecture

```text
                  Pack 862 Website

                 ┌────────────────┐
                 │     Astro      │
                 │ presentation   │
                 └───────┬────────┘
                         │
            ┌────────────┴────────────┐
            │                         │
      Markdown content          Images / files
            │                         │
            └────────────┬────────────┘
                         │
                       GitHub
                         │
                  Pull Request Review
                         │
                    Merge to main
                         │
                  GitHub Actions
                         │
                    Astro Build
                         │
                   GitHub Pages
                         │
                    Custom Domain
```

No database, backend API, application server, or traditional CMS is required.

---

## 3. Repository Structure

Recommended repository layout:

```text
pack862-website/
├── content/
│   ├── home.md
│   ├── about.md
│   ├── join.md
│   ├── activities.md
│   ├── fundraising.md
│   ├── volunteer.md
│   ├── resources.md
│   ├── contact.md
│   │
│   ├── events/
│   │   ├── 2026-09-11-pack-meeting.md
│   │   ├── 2026-09-25-pack-meeting.md
│   │   └── 2027-01-16-pinewood-derby.md
│   │
│   └── leaders/
│       ├── cubmaster.md
│       └── committee-chair.md
│
├── src/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   └── styles/
│
├── public/
│   ├── photos/
│   ├── forms/
│   └── documents/
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── astro.config.mjs
├── package.json
└── README.md
```

---

## 4. Separation of Responsibilities

### Technical contributors

Technical contributors should primarily work in:

```text
src/
astro.config.mjs
package.json
.github/workflows/
```

They maintain:

- Astro layouts
- Reusable components
- Styling
- Navigation
- Responsive behavior
- Build configuration
- Deployment
- Content schemas

### Parent contributors

Non-technical parent contributors should primarily work in:

```text
content/
```

They can update:

- Pack information
- Join instructions
- Meeting information
- Upcoming activities
- Fundraising information
- Volunteer needs
- Parent resources
- Leadership information
- Calendar events

They should normally not need to edit Astro, HTML, CSS, or JavaScript.

---

## 5. Website Content Structure

The website should contain these main sections:

```text
Home
About Pack 862
Join Our Pack
Calendar
Activities & Adventures
Parent Resources
Fundraising / Support the Pack
Volunteer
Photos
Contact Us
```

Each major section should have its own Markdown file instead of storing the entire website in one large document.

Example:

```text
content/
├── home.md
├── about.md
├── join.md
├── activities.md
├── fundraising.md
├── volunteer.md
├── resources.md
└── contact.md
```

This makes individual sections easier to edit and review.

---

## 6. Markdown Page Example

Example content file:

```md
---
title: Pack Meetings
---

# Pack Meetings

Pack 862 normally meets on the second and fourth Friday
of each month at 7:00 PM.

## September

Our September Pack Meeting will be held on September 11.
```

The Astro website should render this content using a common layout.

Parents should not need to modify page templates.

---

## 7. Events and Calendar

Calendar events should be stored as individual Markdown files.

Example:

```text
content/events/
├── 2026-09-11-pack-meeting.md
├── 2026-09-25-pack-meeting.md
├── 2026-10-23-halloween-event.md
├── 2027-01-16-pinewood-derby.md
└── 2027-03-05-campout.md
```

Example event file:

```md
---
title: Pinewood Derby
date: 2027-01-16
time: "9:00 AM"
location: Faith United Methodist Church
category: pack-event
---

Join Pack 862 for our annual Pinewood Derby.

More information will be shared with families before the event.
```

Astro should automatically read the event collection and generate the calendar/event list.

---

## 8. Astro Content Collections

Use Astro Content Collections for structured content.

This allows the project to validate Markdown metadata.

Example event schema fields:

```text
title       required
date        required
time        optional
location    optional
category    required
description optional
```

Benefits:

- Prevents malformed content
- Provides predictable data to the templates
- Helps catch errors during build
- Gives type-safe access to content in Astro

For example, a malformed date should cause a build error instead of silently creating broken content.

---

## 9. Contribution Workflow

The Git repository should act as the lightweight content management system.

Recommended workflow:

```text
Parent edits Markdown
        ↓
GitHub creates branch / proposed change
        ↓
Pull Request
        ↓
Site owner reviews changes
        ↓
Merge to main
        ↓
GitHub Action starts
        ↓
Astro builds static site
        ↓
GitHub Pages deploys site
```

Parents should generally not push directly to `main`.

---

## 10. Simple Instructions for Parent Contributors

A future contributor guide can tell parents to:

1. Open the GitHub repository.
2. Open the `content` folder.
3. Select the page they want to update.
4. Click **Edit**.
5. Change the Markdown text.
6. Choose **Propose changes**.
7. Submit the Pull Request.
8. Wait for the site owner to review and merge it.

Once merged, deployment happens automatically.

---

## 11. GitHub Actions Deployment

Deployment should be automatic.

On each merge to `main`:

```text
GitHub Actions
    ↓
Install dependencies
    ↓
Run Astro build
    ↓
Validate content
    ↓
Generate static HTML/CSS/JS
    ↓
Publish artifact
    ↓
Deploy to GitHub Pages
```

No manual regeneration should normally be required.

---

## 12. GitHub Pages

GitHub Pages will host the generated static website.

Benefits:

- Very low maintenance
- No server management
- Good fit for Astro static builds
- HTTPS support
- Custom domain support
- Deployment directly from GitHub

The generated site should contain only static assets:

```text
HTML
CSS
JavaScript
Images
Documents
```

---

## 13. Custom Domain

The Pack should use a custom domain rather than relying only on the GitHub Pages URL.

Example:

```text
pack862.org
```

The domain should be owned and controlled by the Pack organization, not by an individual volunteer if possible.

The DNS configuration should point the domain to GitHub Pages.

---

## 14. GitHub Ownership

The project should ideally live in a Pack-owned GitHub organization instead of a personal GitHub account.

Recommended structure:

```text
github.com/pack862/
    pack862-website
```

Recommended governance:

- At least two GitHub organization administrators
- Main branch protected
- Pull Requests required
- Automatic deployment only from `main`
- Domain credentials documented
- Repository ownership transferable to future leaders

The website should not become dependent on one parent.

---

## 15. Photos

Photos should initially be handled more carefully than text content.

Recommended structure:

```text
public/photos/
├── 2026/
│   ├── pinewood-derby/
│   ├── campout/
│   └── service-project/
└── 2027/
```

Example Markdown reference:

```md
![Pack 862 Pinewood Derby](/photos/2026/pinewood-derby/race.jpg)
```

Recommended initial policy:

- Parent contributors may edit text freely through Pull Requests.
- Photo uploads should initially be handled or approved by technical/site administrators.
- Every photo change should be reviewed before publishing.

Because the website involves children, photo publication should be a deliberate and reviewed action.

---

## 16. Documents and Forms

Static downloadable resources should be stored in:

```text
public/documents/
public/forms/
```

Examples:

```text
public/forms/medical-form.pdf
public/documents/camping-packing-list.pdf
public/documents/uniform-guide.pdf
```

Markdown pages can link directly to these files.

---

## 17. Future CMS Option

The initial system should use GitHub as the content-management workflow.

If GitHub becomes too complicated for non-technical parents later, a lightweight Git-based CMS can be added without changing the architecture.

The CMS would provide forms like:

```text
Edit Event

Title
[ Pinewood Derby                  ]

Date
[ January 16, 2027                ]

Description
[ Our annual Pack 862...          ]

              [ Publish ]
```

The CMS would still update the same Markdown files in Git.

Therefore Markdown remains the source of truth.

---

## 18. Technology Decisions

### Astro

Use Astro for:

- Static site generation
- Page layouts
- Reusable components
- Content collections
- Navigation
- Event rendering
- Photo galleries
- Responsive layout

### Markdown

Use Markdown for:

- Main website content
- Event descriptions
- Pack information
- Leadership information
- Parent resources
- Volunteer information

### GitHub

Use GitHub for:

- Version control
- Collaboration
- Change history
- Pull Request review
- Repository ownership

### GitHub Actions

Use GitHub Actions for:

- Content validation
- Astro build
- Automated deployment

### GitHub Pages

Use GitHub Pages for:

- Hosting
- HTTPS
- Custom domain support

---

## 19. Technologies to Avoid Initially

Do not add these unless a clear future requirement appears:

- Database
- Backend server
- WordPress
- Traditional CMS
- React SPA
- Authentication system
- Custom API
- Server-side sessions
- Docker/Kubernetes infrastructure

They add unnecessary operational complexity for a Pack website.

---

## 20. Design Principle

The website should follow this rule:

> Content should be easy to change without touching website implementation code.

A parent editing the calendar should not need to understand Astro.

A developer changing the homepage design should not need to rewrite Pack content.

---

## 21. Recommended Initial Implementation

### Phase 1

Create:

```text
Astro project
GitHub repository
GitHub Pages deployment
Custom domain
Base Scouts-inspired design
```

### Phase 2

Create content collections:

```text
pages
events
leaders
```

### Phase 3

Import the Pack 862 content already extracted from the orientation guide into the new Markdown structure.

### Phase 4

Add:

- Event calendar
- Resource links
- Join page
- Contact page
- Initial photo gallery

### Phase 5

Document the parent contribution workflow.

---

## 22. Target Maintenance Model

The long-term goal should be:

```text
80-90% of routine updates
        ↓
Markdown-only changes

Occasional design or feature changes
        ↓
Astro code changes
```

Typical parent updates:

- Change event date
- Add a new activity
- Update dues
- Update leader contact
- Add fundraiser information
- Add parent resource
- Remove old information

Typical technical updates:

- Change design
- Add a new component
- Change site navigation
- Add a new feature
- Update Astro dependencies

---

## 23. Final Architecture Decision

Use:

**Astro + Markdown + GitHub + GitHub Actions + GitHub Pages + a Pack-owned custom domain.**

The Git repository acts as the initial lightweight CMS.

The website should remain fully static and simple to operate.

The content structure should be intentionally accessible to non-technical contributors, while GitHub Pull Requests provide review and change history.

This architecture provides:

- Simple maintenance
- Very low hosting complexity
- Automatic deployment
- Version history
- Easy rollback
- Parent collaboration
- Long-term transferability
- Minimal vendor and infrastructure overhead
