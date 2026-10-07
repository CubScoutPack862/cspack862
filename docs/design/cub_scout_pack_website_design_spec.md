# Cub Scout Pack Website — Design & Implementation Specification

> **Pack 862 implementation policy (September 2026):** This installation is a cautious public brochure, not a general member site. Its public route allowlist is Home, About, Calendar, Join, Activities, Resources, and Contact. Only the Committee Chair and Cubmaster email addresses may be published. Use only the approved Pack logo, six rank insignia, and four selected stock photographs from Scouting America Brand Assets; do not publish Pack/member photos, phone numbers, biographies, member resources, the completed questionnaire, or the New Family Orientation PDF. This policy supersedes generic options in the design brief below.

> **Purpose:** This document is an implementation-ready design brief for an AI coding agent building a simple website for a local Cub Scout Pack. The site should feel recognizably connected to **Cub Scouts / Scouting America** without being a pixel-for-pixel copy of ScoutingAmerica.org.
>
> **Primary reference:** https://www.scouting.org/programs/cub-scouts/
>
> **Important terminology:** A local Cub Scout unit is normally called a **Pack**, not a Troop. Use `Pack [NUMBER]` throughout the site unless the unit has an official name that says otherwise.

---

## 1. Agent Mission

Build a small, fast, family-friendly, mobile-first website for a local Cub Scout Pack.

The website should:

- Visually belong to the Cub Scouting family.
- Use **Scouting Blue**, **Cub Scouting Gold**, white, and neutral gray/tan backgrounds.
- Use bold, friendly, outdoors-oriented photography.
- Use large, obvious calls to action.
- Feel trustworthy and organized for parents.
- Feel energetic and fun for children.
- Be easy for Pack volunteers to maintain.
- Work well as a static site hosted on GitHub Pages, Cloudflare Pages, Netlify, or similar hosting.
- Be accessible, responsive, and fast.

Do **not** recreate the Scouting America website exactly. Use its brand language and visual principles while creating a distinct local Pack site.

---

## 2. Brand and Trademark Guardrails

Scouting America publishes official brand assets and guidelines for units. Use the official Brand Center for logos, photography, and current brand rules whenever possible.

### Do

- Use official Scouting/Cub Scout logos only from an authorized Scouting America source or Brand Center.
- Keep official logos unmodified.
- Preserve trademark symbols when included in the official asset.
- Use the approved Cub Scout palette.
- Link to `https://www.scouting.org/` somewhere in the footer.
- Use local Pack identity prominently, e.g. `Cub Scout Pack 123`.
- Add descriptive `alt` text for images.

### Do not

- Trace or redraw a Cub Scout logo.
- Change logo colors.
- Stretch, skew, rotate, bevel, outline, glow, or add a drop shadow to an official mark.
- Extract images from the public Scouting website and reuse them unless the image is explicitly licensed/authorized for unit use.
- Copy ScoutingAmerica.org page layouts pixel-for-pixel.
- Copy long passages of Scouting America website text.

### Recommended footer disclaimer

Use wording similar to this, adapting it to your council's current guidance:

> Cub Scout Pack [NUMBER] is a local unit participating in the Scouting America program. Scouting America, Cub Scouts, associated marks, and program logos are trademarks of Scouting America and are used according to applicable brand guidelines.

This document is design guidance, not legal advice. If the Pack is chartered/registered, confirm current logo and trademark usage in the Scouting America Brand Center before launch.

### 2.1 Brand Assets

Official Scouting America and Cub Scouts brand assets must be treated separately from the website's own design system and content. The coding agent may use approved brand assets, but it must **not recreate, trace, approximate, or generate official Scouting marks**.

#### Source of truth

Obtain current official assets and usage guidance from Scouting America's official marketing / Brand Center resources:

- Scouting America marketing resources:  
  https://www.scouting.org/programs/scouts-bsa/resources/recruitment-marketing/scouts-bsa-marketing-tools/
- Scouting America home / brand references:  
  https://www.scouting.org/

The Pack maintainer should download approved files manually from an authorized Scouting America source. Do not scrape logos, illustrations, photographs, or other assets from the public Scouting website.

#### Assets the Pack may need

Download only the assets actually needed for the site. Typical examples are:

- Official **Cub Scouts** program logo.
- Official **Scouting America** logo or mark, if required in the footer or acknowledgments.
- Council logo, if the local council permits its use.
- Pack-specific logo, if Pack 862 has one.
- Official rank or program graphics used on informational pages.
- Approved Scouting stock photography when local Pack photography is unavailable.

Prefer vector files such as SVG or EPS for logos when an approved web-compatible version is provided. Use optimized WebP, AVIF, JPEG, or PNG for photography as appropriate.

#### Recommended repository structure

For an Astro site, keep official brand assets separate from local Pack photography and other site artwork:

```text
public/
└── assets/
    ├── brand/
    │   ├── scouting/
    │   │   ├── cub-scouts-logo.svg
    │   │   ├── scouting-america-logo.svg
    │   │   └── README.md
    │   ├── council/
    │   │   └── council-logo.svg
    │   └── pack/
    │       └── pack-862-logo.svg
    └── images/
        ├── pack/
        │   ├── hero.webp
        │   ├── camping.webp
        │   └── service-project.webp
        └── approved-scouting/
            └── fallback-activity.webp
```

`public/assets/brand/scouting/README.md` should record where each official asset came from and, when known, the download date or applicable usage guidance. Example:

```md
# Scouting Brand Assets

These files are official Scouting America / Cub Scouts brand assets.
Do not modify or redraw them.

Sources:
- cub-scouts-logo.svg — downloaded from the official Scouting America Brand Center
- scouting-america-logo.svg — downloaded from the official Scouting America Brand Center

Before replacing or adding an asset, verify current usage guidance from Scouting America.
```

#### Agent rules for official assets

The coding agent must follow these rules:

1. **Never generate an official logo with AI.**
2. **Never redraw an official logo in CSS or SVG.**
3. **Never recolor an official mark unless the official asset set explicitly provides that color variant.**
4. **Never crop, stretch, skew, rotate, outline, shadow, or otherwise decorate an official mark.**
5. Preserve the logo's original aspect ratio and required clear space.
6. Use the exact approved asset file supplied by the Pack maintainer.
7. If an expected official asset is missing, render a neutral text placeholder such as `Cub Scout Pack 862` and add a TODO. Do not invent a replacement logo.
8. Do not hotlink official image files from `scouting.org`; store approved copies in the repository so the Pack site has predictable builds and no runtime dependency on the national site.
9. Do not use official rank insignia or other protected graphics merely as decoration. Use them only where relevant and authorized.
10. Keep local Pack photos and Pack-created artwork clearly separated from official Scouting brand files.

#### Example Astro usage

```astro
---
const logoSrc = "/assets/brand/scouting/cub-scouts-logo.svg";
---

<a class="site-brand" href="/" aria-label="Cub Scout Pack 862 home">
  <img
    src={logoSrc}
    alt="Cub Scouts"
    class="site-brand__program-logo"
    width="180"
    height="80"
  />
  <span class="site-brand__pack-name">Pack 862</span>
</a>
```

Do not encode the logo as a hand-written SVG component. Reference the approved asset file directly.

#### Local Pack photography

For the main website experience, prefer authentic Pack 862 photos over generic stock photography. Good subjects include:

- Camping and hiking.
- Pinewood Derby.
- Pack meetings and ceremonies.
- Service projects.
- Crafts and STEM activities.
- Outdoor games and family activities.

Before publishing youth photos, follow current Pack, council, and Scouting America privacy/media requirements. Never expose a child's private contact information, home address, school schedule, or other unnecessary personal information.

#### Brand assets vs. design system

Keep this distinction explicit:

```text
Official Scouting assets
    ↓
Logos / marks / approved graphics / approved photography

Pack website design system
    ↓
Colors / typography / spacing / buttons / cards / navigation / layouts

Pack content
    ↓
Markdown / events / leaders / FAQs / photos / contact information
```

The **official asset files** come from Scouting America or another authorized source. The **website components and CSS** are created locally according to this specification. The site should feel consistent with Cub Scouting without copying Scouting America's production HTML, CSS, JavaScript, or page layouts.

#### Missing-asset behavior

The initial site must still build successfully when official assets have not yet been supplied.

Use this rule:

```text
IF approved asset exists:
    use it exactly as provided
ELSE:
    use a text-only Pack identity
    add TODO requesting the approved asset
    continue building the site
```

Example fallback:

```html
<a class="site-brand" href="/">
  <span class="site-brand__fallback">Cub Scout Pack 862</span>
</a>
```

This prevents the coding agent from blocking implementation or inventing unofficial brand artwork.

---

## 3. Official Visual Direction to Follow

The official Cub Scouting guidance emphasizes:

- **Scouting Blue** as the dominant brand color.
- **Cub Scouting Gold** as the accent color.
- Plenty of **white space**.
- **Scouting Red** used sparingly.
- Clear grids and orderly layouts.
- Strong photography showing Scouts actively doing things.
- Clear, descriptive action buttons.

The current Scouting America Cub Scouts page also uses a content pattern that is useful for the local Pack site:

1. Strong program/hero introduction.
2. Prominent join/find call to action.
3. Introductory “Welcome” content.
4. Cards that explain program areas.
5. Parent resources.
6. Leader resources.
7. Frequently asked questions.
8. Final “Be a Scout” call to action.

The local Pack site should simplify this pattern rather than reproduce the national site.

---

# 4. Design Tokens

## 4.1 Core Color Palette

Use the following as the base palette.

| Token | Hex | Usage |
|---|---:|---|
| Scouting Blue | `#003F87` | Primary brand color, navigation, primary buttons, headings |
| Cub Scouting Gold | `#FDC116` | Accent, highlights, secondary buttons, dividers |
| Scouting Dark Blue | `#003366` | Dark sections, footer, hover states |
| Scouting Light Blue | `#9AB3D5` | Light accents, borders, background panels |
| Scouting Red | `#CE1126` | Very limited accent only |
| Scouting Light Tan | `#E9E9E4` | Soft neutral section background |
| Scouting Warm Gray | `#858787` | Secondary text |
| Scouting Dark Gray | `#232528` | Primary body text |
| White | `#FFFFFF` | Main background and reversed text |

### Color usage proportions

Use approximately:

- 55–65% white / very light neutral.
- 20–30% Scouting Blue / Dark Blue.
- 8–12% Cub Scouting Gold.
- Less than 3% Scouting Red.

### Accessibility rules

- White text on `#003F87`: encouraged.
- White text on `#003366`: encouraged.
- **Do not use white text on Cub Scouting Gold**; use Scouting Dark Blue or Dark Gray instead.
- Use red sparingly and never as the only way to convey error/status.
- Maintain WCAG AA color contrast for normal text.

---

## 4.2 CSS Color Variables

```css
:root {
  --scout-blue: #003f87;
  --scout-blue-dark: #003366;
  --scout-blue-light: #9ab3d5;
  --cub-gold: #fdc116;
  --scout-red: #ce1126;

  --scout-tan-light: #e9e9e4;
  --scout-gray: #858787;
  --scout-gray-dark: #232528;
  --white: #ffffff;

  --surface: #ffffff;
  --surface-alt: #f7f7f4;
  --text: #232528;
  --text-muted: #626566;
  --border: #d7d9da;

  --focus-ring: #fdc116;
}
```

---

# 5. Typography

The Scouting digital style guidance has historically recommended a combination of **Roboto Slab** and **Roboto Condensed** as web-friendly typography. This combination creates a sturdy, outdoorsy, editorial Scouting feel while remaining easy to obtain.

## Recommended font roles

### Primary display / major headings

- `Roboto Slab`
- Fallback: `Trebuchet MS`, Georgia, serif

### Navigation / labels / compact headings

- `Roboto Condensed`
- Fallback: Arial, sans-serif

### Body copy

For simplicity, use `Roboto Condensed` or a normal system sans-serif. For a friendlier reading experience, regular `Roboto` is also acceptable if the coding agent wants a less condensed paragraph font.

### Google Fonts option

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link
  href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;500;600;700&family=Roboto+Slab:wght@500;600;700&display=swap"
  rel="stylesheet"
>
```

### CSS typography tokens

```css
:root {
  --font-display: "Roboto Slab", "Trebuchet MS", Georgia, serif;
  --font-sans: "Roboto Condensed", Arial, sans-serif;

  --text-xs: 0.8125rem;
  --text-sm: 0.9375rem;
  --text-base: 1.0625rem;
  --text-lg: 1.25rem;
  --text-xl: 1.5rem;
  --text-2xl: clamp(1.75rem, 4vw, 2.5rem);
  --text-3xl: clamp(2.25rem, 6vw, 4.5rem);
}

body {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: 1.6;
  color: var(--text);
}

h1,
h2,
h3 {
  font-family: var(--font-display);
  color: var(--scout-blue-dark);
  line-height: 1.12;
}

h1 {
  font-size: var(--text-3xl);
  font-weight: 700;
}

h2 {
  font-size: var(--text-2xl);
  font-weight: 700;
}

h3 {
  font-size: var(--text-xl);
  font-weight: 700;
}
```

---

# 6. Layout System

## Principles

- Use a consistent grid across all pages.
- Use generous white space.
- Keep content width comfortable for reading.
- Avoid overly decorative UI.
- Use photography and color blocks to create energy instead of excessive effects.

## Container

```css
.container {
  width: min(100% - 2rem, 72rem);
  margin-inline: auto;
}
```

## Spacing scale

```css
:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.5rem;
  --space-6: 2rem;
  --space-7: 3rem;
  --space-8: 4rem;
  --space-9: 6rem;
}
```

## Section spacing

```css
.section {
  padding-block: clamp(3rem, 7vw, 6rem);
}

.section--compact {
  padding-block: clamp(2rem, 5vw, 4rem);
}
```

---

# 7. Recommended Information Architecture

For a simple local Pack website, use **5–6 main navigation items maximum**.

Recommended navigation:

1. **Home**
2. **About Our Pack**
3. **Calendar**
4. **Join**
5. **Resources**
6. **Contact**

Optional if needed:

- Photos
- Dens
- Leaders
- FAQ

Avoid a giant corporate-style navigation menu. Parents should be able to answer these questions in seconds:

- Who are you?
- Where and when do you meet?
- What ages/grades can join?
- What does it cost?
- What activities do you do?
- How do I join?
- Who do I contact?

---

# 8. Header and Navigation

## Desktop

- White header.
- Pack logo/identity on the left.
- Navigation links in Scouting Dark Blue.
- High-priority **Join Pack [NUMBER]** button on the right.
- Optional narrow blue utility bar above the main nav for council or Scouting America links.

## Mobile

- Logo / Pack name on left.
- Hamburger menu on right.
- Join CTA should remain easy to find inside the menu or directly in the header.

## Suggested markup

```html
<header class="site-header">
  <div class="utility-bar">
    <div class="container utility-bar__inner">
      <span>Cub Scout Pack 123 · Torrance, California</span>
      <a href="https://www.scouting.org/">Scouting America</a>
    </div>
  </div>

  <div class="container site-header__inner">
    <a class="brand" href="/" aria-label="Cub Scout Pack 123 home">
      <img src="/assets/pack-logo.svg" alt="Cub Scout Pack 123">
    </a>

    <button class="menu-toggle" aria-expanded="false" aria-controls="primary-nav">
      <span class="sr-only">Open menu</span>
      ☰
    </button>

    <nav id="primary-nav" class="primary-nav" aria-label="Primary navigation">
      <a href="/about/">About</a>
      <a href="/calendar/">Calendar</a>
      <a href="/resources/">Resources</a>
      <a href="/contact/">Contact</a>
      <a class="button button--primary button--small" href="/join/">Join Our Pack</a>
    </nav>
  </div>
</header>
```

## Suggested header styling

```css
.utility-bar {
  background: var(--scout-blue-dark);
  color: var(--white);
  font-size: var(--text-sm);
}

.utility-bar__inner {
  min-height: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.utility-bar a {
  color: var(--white);
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.97);
  border-bottom: 1px solid var(--border);
}

.site-header__inner {
  min-height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.brand img {
  display: block;
  width: auto;
  height: 3.25rem;
}

.primary-nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.primary-nav > a:not(.button) {
  color: var(--scout-blue-dark);
  font-weight: 700;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.primary-nav > a:not(.button):hover {
  color: var(--scout-blue);
  text-decoration: underline;
  text-decoration-color: var(--cub-gold);
  text-decoration-thickness: 0.2rem;
  text-underline-offset: 0.35rem;
}
```

---

# 9. Hero Section

The home page should immediately communicate:

- Pack identity.
- Local area.
- Grades/ages.
- The fun/adventure benefit.
- A clear join CTA.

## Recommended hero copy pattern

**Eyebrow:** `CUB SCOUT PACK 123 · TORRANCE, CA`

**Headline:** `Adventure Starts Here.`

**Supporting text:** `A welcoming Cub Scout Pack for boys and girls in grades K–5. Make friends, learn new skills, serve the community, and explore the outdoors together.`

**Primary CTA:** `Join Pack 123`

**Secondary CTA:** `See Upcoming Events`

Do not copy the national Cub Scout page wording exactly; write local content.

## Hero structure

Use a large activity photo showing Scouts actively participating in an outdoor or hands-on activity.

Recommended desktop composition:

- Left 45–50%: blue text panel.
- Right 50–55%: image.
- Thin gold accent line or diagonal edge between them.

Recommended mobile composition:

- Image on top.
- Text block below.
- Full-width CTA buttons.

## Hero CSS example

```css
.hero {
  background: var(--scout-blue);
  color: var(--white);
  overflow: hidden;
}

.hero__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
  min-height: 36rem;
}

.hero__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(3rem, 7vw, 6rem);
}

.hero__eyebrow {
  margin: 0 0 1rem;
  font-weight: 800;
  color: var(--cub-gold);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.hero h1 {
  color: var(--white);
  margin: 0;
  max-width: 12ch;
}

.hero__lede {
  max-width: 36rem;
  margin: 1.5rem 0 0;
  font-size: clamp(1.1rem, 2vw, 1.35rem);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
}

.hero__media {
  min-height: 24rem;
  background: var(--scout-blue-dark);
}

.hero__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 800px) {
  .hero__grid {
    grid-template-columns: 1fr;
  }

  .hero__media {
    order: -1;
    min-height: 18rem;
  }
}
```

---

# 10. Buttons

Buttons should be bold, obvious, and use clear action language.

Avoid generic labels like `Submit` if a more descriptive action is available.

Examples:

- Join Our Pack
- View Calendar
- Contact a Leader
- Register for Campout
- Download Parent Guide

## Button styles

### Primary button

- Scouting Blue background.
- White text.
- Rounded, but not cartoonishly pill-shaped.
- Medium/heavy weight.

### Gold button

- Cub Gold background.
- Scouting Dark Blue text.
- Use for a special/high-energy CTA.

### Outline button

- Transparent/white background.
- Blue border.
- Blue text.

## CSS

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 3rem;
  padding: 0.75rem 1.35rem;
  border: 2px solid transparent;
  border-radius: 0.5rem;
  font-family: var(--font-sans);
  font-weight: 800;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition: transform 140ms ease, background-color 140ms ease, border-color 140ms ease;
}

.button:hover {
  transform: translateY(-1px);
}

.button:focus-visible {
  outline: 3px solid var(--focus-ring);
  outline-offset: 3px;
}

.button--primary {
  background: var(--scout-blue);
  color: var(--white);
}

.button--primary:hover {
  background: var(--scout-blue-dark);
}

.button--gold {
  background: var(--cub-gold);
  color: var(--scout-blue-dark);
}

.button--gold:hover {
  filter: brightness(0.96);
}

.button--outline {
  background: transparent;
  color: var(--scout-blue);
  border-color: var(--scout-blue);
}

.button--outline:hover {
  background: var(--scout-blue);
  color: var(--white);
}

.button--small {
  min-height: 2.5rem;
  padding: 0.625rem 1rem;
  font-size: var(--text-sm);
}
```

---

# 11. Home Page Sections

Recommended order:

1. Header / navigation
2. Hero
3. Quick info strip
4. Welcome / About the Pack
5. What We Do cards
6. Upcoming events
7. Cub Scout grade/rank overview
8. Parent / new family section
9. Join CTA
10. FAQ
11. Contact + footer

---

# 12. Quick Info Strip

Immediately below the hero, provide answers parents look for first.

Suggested 3–4 items:

- **Grades:** K–5
- **Meetings:** e.g. 2nd & 4th Tuesdays
- **Location:** e.g. Torrance, CA
- **Family Program:** Parent participation encouraged

```html
<section class="quick-facts" aria-label="Pack quick facts">
  <div class="container quick-facts__grid">
    <div><strong>Grades</strong><span>K–5</span></div>
    <div><strong>Meetings</strong><span>2nd & 4th Tuesdays</span></div>
    <div><strong>Location</strong><span>Torrance, CA</span></div>
    <div><strong>Program</strong><span>Family-focused</span></div>
  </div>
</section>
```

```css
.quick-facts {
  background: var(--cub-gold);
  color: var(--scout-blue-dark);
}

.quick-facts__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.quick-facts__grid > div {
  padding: 1.25rem;
  text-align: center;
  border-right: 1px solid rgba(0, 51, 102, 0.2);
}

.quick-facts strong,
.quick-facts span {
  display: block;
}

.quick-facts strong {
  font-family: var(--font-display);
  font-size: 1.05rem;
}

@media (max-width: 720px) {
  .quick-facts__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

---

# 13. “What We Do” Cards

Use 3 or 4 cards showing the core experience.

Recommended categories:

- Outdoor Adventure
- Skills & Projects
- Community Service
- Family & Friends

Each card should have:

- One photo or simple icon.
- Short title.
- 1–2 sentence description.
- Optional text link.

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
}

.card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 0.35rem 1.5rem rgba(35, 37, 40, 0.07);
}

.card__media {
  aspect-ratio: 16 / 10;
  overflow: hidden;
}

.card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card__body {
  padding: 1.5rem;
}

.card__body h3 {
  margin-top: 0;
}

.card__link {
  color: var(--scout-blue);
  font-weight: 800;
}

@media (max-width: 800px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}
```

---

# 14. Upcoming Events Component

Events are one of the most useful things a local Pack website can provide.

Each event card should show:

- Date.
- Event title.
- Short location.
- Optional registration/status.
- Link to details.

```html
<article class="event-card">
  <div class="event-card__date" aria-label="October 12">
    <span class="event-card__month">OCT</span>
    <span class="event-card__day">12</span>
  </div>
  <div class="event-card__content">
    <h3>Family Campout</h3>
    <p>Saturday–Sunday · Local campground</p>
    <a href="/events/family-campout/">Event details →</a>
  </div>
</article>
```

```css
.event-card {
  display: grid;
  grid-template-columns: 5rem 1fr;
  gap: 1.25rem;
  align-items: center;
  padding: 1.25rem;
  border: 1px solid var(--border);
  border-left: 0.35rem solid var(--scout-blue);
  background: var(--white);
}

.event-card__date {
  text-align: center;
  color: var(--scout-blue-dark);
}

.event-card__month,
.event-card__day {
  display: block;
  line-height: 1;
}

.event-card__month {
  font-weight: 800;
  letter-spacing: 0.08em;
}

.event-card__day {
  font-family: var(--font-display);
  font-size: 2.25rem;
  font-weight: 700;
  margin-top: 0.25rem;
}

.event-card__content h3 {
  margin: 0;
}
```

If the site uses Google Calendar or another calendar provider, keep the website event list as a small curated preview and link to the full calendar.

---

# 15. Dens / Grade Levels

Cub Scouts is grade-specific. A simple local overview can make the program understandable to new parents.

Suggested grid:

- Lion — Kindergarten
- Tiger — 1st Grade
- Wolf — 2nd Grade
- Bear — 3rd Grade
- Webelos — 4th Grade
- Arrow of Light — 5th Grade

Do not invent or redraw rank insignia. If using official rank graphics, obtain the files from an authorized Scouting America source.

A text-only version is perfectly acceptable and safer for a very simple site.

```css
.rank-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.rank-card {
  border-top: 0.35rem solid var(--cub-gold);
  background: var(--surface-alt);
  padding: 1.25rem;
}

.rank-card strong {
  display: block;
  font-family: var(--font-display);
  color: var(--scout-blue-dark);
  font-size: 1.25rem;
}

@media (max-width: 720px) {
  .rank-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .rank-grid {
    grid-template-columns: 1fr;
  }
}
```

---

# 16. Join CTA Section

This should be one of the strongest visual sections on the site.

Recommended content:

**Headline:** `Ready for Your Next Adventure?`

**Text:** `Come visit a Pack meeting, meet our families, and see whether Cub Scouts is a good fit for your child.`

Buttons:

- `Visit a Meeting`
- `Contact a Pack Leader`

Visual treatment:

- Scouting Blue background.
- White heading/body.
- Gold primary CTA.
- Optional background photo with a dark blue overlay.

```css
.join-cta {
  background: var(--scout-blue-dark);
  color: var(--white);
  text-align: center;
}

.join-cta h2 {
  color: var(--white);
}

.join-cta__inner {
  max-width: 48rem;
  margin-inline: auto;
}
```

---

# 17. FAQ Design

Recommended questions:

- What grades can join Cub Scouts?
- Can girls join our Pack?
- When and where do you meet?
- How much does it cost?
- Do parents attend meetings?
- Does my child need a uniform immediately?
- What kind of activities do you do?
- How do we join?

Use native HTML `<details>` elements when possible. They are accessible, simple, and require little JavaScript.

```html
<div class="faq-list">
  <details>
    <summary>When and where does the Pack meet?</summary>
    <p>Pack 123 meets ...</p>
  </details>

  <details>
    <summary>How do we join?</summary>
    <p>Start by contacting ...</p>
  </details>
</div>
```

```css
.faq-list {
  display: grid;
  gap: 0.75rem;
}

.faq-list details {
  border: 1px solid var(--border);
  background: var(--white);
  padding: 1rem 1.25rem;
  border-radius: 0.5rem;
}

.faq-list summary {
  cursor: pointer;
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--scout-blue-dark);
}

.faq-list details[open] {
  border-color: var(--scout-blue-light);
}
```

---

# 18. Footer

The footer should be useful, not decorative.

Include:

- Pack name and number.
- City/community.
- Contact email.
- Link to Scouting America.
- Link to local council if appropriate.
- Privacy note if collecting form data.
- Copyright notice.
- Optional trademark/affiliation note.

Use dark blue as the main footer background. A small amount of Scouting Red may be used here if desired, but gold is usually enough.

```css
.site-footer {
  background: var(--scout-blue-dark);
  color: rgba(255, 255, 255, 0.92);
  padding-block: 3rem 2rem;
}

.site-footer a {
  color: var(--white);
}

.site-footer__grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 2rem;
}

.site-footer__legal {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.18);
  font-size: var(--text-sm);
}

@media (max-width: 720px) {
  .site-footer__grid {
    grid-template-columns: 1fr;
  }
}
```

---

# 19. Photography Direction

Photography should carry much of the site's emotional impact.

Prefer real Pack photos showing:

- Camping.
- Hiking.
- Pinewood Derby.
- Community service.
- STEM/building projects.
- Ceremonies.
- Families participating together.

Photo selection rules:

- Prefer action over posed group photos.
- Show a variety of activities.
- Avoid overly busy backgrounds behind text.
- Crop confidently.
- Keep people natural and candid.
- Use landscape images for hero/card use.
- Use modern image formats such as WebP or AVIF when possible.

### Youth privacy

Before publishing photos of youth, follow the Pack's and Scouting America's current media/privacy requirements and obtain any required parental/guardian permissions. Do not publish children's private contact information.

---

# 20. Icons

Use icons only when they improve comprehension.

Good examples:

- Calendar.
- Map pin.
- Backpack/outdoors.
- Email.
- Download.
- External link.

Prefer a consistent icon library such as Lucide if the site uses a framework.

Do not use copied Scout insignia as generic UI icons.

---

# 21. Responsive Behavior

Target these breakpoints as a practical starting point:

```css
/* Mobile-first base */

@media (min-width: 640px) {
  /* small tablet */
}

@media (min-width: 800px) {
  /* tablet / compact desktop */
}

@media (min-width: 1024px) {
  /* desktop */
}

@media (min-width: 1280px) {
  /* large desktop */
}
```

Mobile requirements:

- No horizontal scrolling.
- Navigation collapses cleanly.
- Buttons have at least a 44×44 px touch target.
- Body text stays at least ~16 px.
- Cards become one column.
- Hero copy remains readable without text over a complicated image.
- Event details remain easy to scan.

---

# 22. Accessibility Requirements

The agent must implement:

- Semantic HTML.
- One `<h1>` per page.
- Logical heading hierarchy.
- Keyboard-accessible menus and controls.
- Visible focus states.
- Descriptive links (avoid several links called only “Learn More” when context is unclear).
- Descriptive image alt text.
- Empty alt text (`alt=""`) for decorative images.
- Form labels outside/above inputs.
- Error text in addition to error color.
- Reduced motion support.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

# 23. Forms

Forms should be simple and clearly labeled.

Recommended contact form fields:

- Parent/Guardian name
- Email
- Child grade (optional)
- Message

Avoid collecting unnecessary personal information about children.

```css
.form-field {
  display: grid;
  gap: 0.4rem;
}

.form-field label {
  color: var(--scout-gray-dark);
  font-weight: 700;
}

.form-field input,
.form-field select,
.form-field textarea {
  width: 100%;
  min-height: 3rem;
  border: 1px solid #b7b9ba;
  border-radius: 0.35rem;
  background: #fafaf8;
  padding: 0.75rem 0.9rem;
  color: var(--text);
  font: inherit;
}

.form-field textarea {
  min-height: 9rem;
  resize: vertical;
}

.form-field input:focus,
.form-field select:focus,
.form-field textarea:focus {
  outline: 3px solid var(--cub-gold);
  outline-offset: 2px;
  border-color: var(--scout-blue);
}
```

---

# 24. Content Voice

Tone should be:

- Friendly.
- Positive.
- Family-oriented.
- Active.
- Local.
- Clear.
- Not overly corporate.

Prefer:

> Join us for camping, service projects, Pinewood Derby, outdoor adventures, and hands-on activities throughout the year.

Avoid:

> Our unit facilitates the delivery of developmental programming through a structured advancement methodology.

Use direct, parent-friendly language.

---

# 25. Suggested Home Page Wireframe

```text
┌───────────────────────────────────────────────────────────┐
│ Utility bar: Pack location               Scouting America │
├───────────────────────────────────────────────────────────┤
│ Pack Logo  About  Calendar  Resources  Contact   [JOIN]   │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  HERO COPY                       LARGE ACTION PHOTO        │
│  Cub Scout Pack 123                                      │
│  Adventure Starts Here.                                  │
│  [Join Our Pack] [View Calendar]                          │
│                                                           │
├───────────────────────────────────────────────────────────┤
│  Grades K–5 | Meetings | Location | Family Program        │ GOLD
├───────────────────────────────────────────────────────────┤
│                                                           │
│  Welcome to Pack 123                                      │
│  Short local description + photo                          │
│                                                           │
├───────────────────────────────────────────────────────────┤
│  What We Do                                               │
│  [Outdoors] [Projects] [Service]                          │
├───────────────────────────────────────────────────────────┤
│  Upcoming Events                          [Full Calendar]  │
│  Event 1                                                  │
│  Event 2                                                  │
│  Event 3                                                  │
├───────────────────────────────────────────────────────────┤
│  Cub Scout Dens                                           │
│  Lion | Tiger | Wolf | Bear | Webelos | Arrow of Light   │
├───────────────────────────────────────────────────────────┤
│  New to Cub Scouts?                                       │
│  Parent information + what to expect                      │
│  [New Family Guide]                                       │
├───────────────────────────────────────────────────────────┤
│  READY FOR YOUR NEXT ADVENTURE?                           │ BLUE
│  [Visit a Meeting] [Contact a Leader]                     │
├───────────────────────────────────────────────────────────┤
│  FAQ                                                      │
├───────────────────────────────────────────────────────────┤
│  Footer: Pack / Contact / Council / Scouting America      │ DARK BLUE
└───────────────────────────────────────────────────────────┘
```

---

# 26. Starter Global CSS

The following can be used as a starting `styles.css` file.

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  color-scheme: light;
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--surface);
  color: var(--text);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: 1.6;
  text-rendering: optimizeLegibility;
}

img,
picture,
svg {
  display: block;
  max-width: 100%;
}

a {
  color: var(--scout-blue);
  text-underline-offset: 0.18em;
}

a:hover {
  color: var(--scout-blue-dark);
}

button,
input,
select,
textarea {
  font: inherit;
}

h1,
h2,
h3,
h4,
p {
  margin-top: 0;
}

h1,
h2,
h3 {
  font-family: var(--font-display);
}

h1,
h2 {
  text-wrap: balance;
}

p {
  max-width: 70ch;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.container {
  width: min(100% - 2rem, 72rem);
  margin-inline: auto;
}

.section {
  padding-block: clamp(3rem, 7vw, 6rem);
}

.section--alt {
  background: var(--surface-alt);
}

.section-heading {
  max-width: 46rem;
  margin-bottom: 2rem;
}

.eyebrow {
  margin-bottom: 0.75rem;
  color: var(--scout-blue);
  font-size: var(--text-sm);
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.gold-rule {
  width: 4rem;
  height: 0.35rem;
  margin: 1rem 0 1.5rem;
  border: 0;
  background: var(--cub-gold);
}

:focus-visible {
  outline: 3px solid var(--focus-ring);
  outline-offset: 3px;
}
```

---

# 27. Complete Example Home Page Skeleton

This is intentionally content-light. Replace placeholders with real Pack information and authorized local images.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Cub Scout Pack 123 in Torrance, California. Family-friendly Scouting for grades K–5.">
  <title>Cub Scout Pack 123 | Torrance, CA</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;500;600;700&family=Roboto+Slab:wght@500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <header class="site-header">
    <div class="utility-bar">
      <div class="container utility-bar__inner">
        <span>Cub Scout Pack 123 · Torrance, CA</span>
        <a href="https://www.scouting.org/">Scouting America</a>
      </div>
    </div>

    <div class="container site-header__inner">
      <a class="brand" href="/" aria-label="Cub Scout Pack 123 home">
        <img src="/assets/pack-logo.svg" alt="Cub Scout Pack 123">
      </a>

      <button class="menu-toggle" aria-expanded="false" aria-controls="primary-nav">
        <span class="sr-only">Open menu</span>
        ☰
      </button>

      <nav id="primary-nav" class="primary-nav" aria-label="Primary navigation">
        <a href="/about/">About</a>
        <a href="/calendar/">Calendar</a>
        <a href="/resources/">Resources</a>
        <a href="/contact/">Contact</a>
        <a class="button button--primary button--small" href="/join/">Join Our Pack</a>
      </nav>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="hero__grid">
        <div class="hero__content">
          <p class="hero__eyebrow">Cub Scout Pack 123 · Torrance, CA</p>
          <h1>Adventure Starts Here.</h1>
          <p class="hero__lede">
            A welcoming Cub Scout Pack for boys and girls in grades K–5.
            Make friends, learn new skills, help the community, and explore the outdoors together.
          </p>
          <div class="hero__actions">
            <a class="button button--gold" href="/join/">Join Pack 123</a>
            <a class="button button--outline" href="/calendar/">See Upcoming Events</a>
          </div>
        </div>

        <div class="hero__media">
          <img src="/assets/hero-pack-activity.webp" alt="Cub Scouts participating in an outdoor Pack activity">
        </div>
      </div>
    </section>

    <section class="quick-facts" aria-label="Pack quick facts">
      <div class="container quick-facts__grid">
        <div><strong>Grades</strong><span>K–5</span></div>
        <div><strong>Meetings</strong><span>2nd & 4th Tuesdays</span></div>
        <div><strong>Location</strong><span>Torrance, CA</span></div>
        <div><strong>Program</strong><span>Family-focused</span></div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">Welcome</p>
          <h2>Welcome to Pack 123</h2>
          <hr class="gold-rule">
          <p>
            Add a short paragraph here describing the Pack, chartered organization,
            neighborhoods served, meeting cadence, and what makes the Pack special.
          </p>
        </div>
      </div>
    </section>

    <section class="section section--alt">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">Explore</p>
          <h2>What We Do</h2>
          <hr class="gold-rule">
        </div>

        <div class="card-grid">
          <article class="card">
            <div class="card__media">
              <img src="/assets/outdoors.webp" alt="Cub Scouts hiking outdoors">
            </div>
            <div class="card__body">
              <h3>Outdoor Adventure</h3>
              <p>Campouts, hikes, nature activities, and family adventures.</p>
            </div>
          </article>

          <article class="card">
            <div class="card__media">
              <img src="/assets/projects.webp" alt="Cub Scouts working on a hands-on project">
            </div>
            <div class="card__body">
              <h3>Skills & Projects</h3>
              <p>Build, create, experiment, and learn practical skills together.</p>
            </div>
          </article>

          <article class="card">
            <div class="card__media">
              <img src="/assets/service.webp" alt="Cub Scouts participating in community service">
            </div>
            <div class="card__body">
              <h3>Community Service</h3>
              <p>Help neighbors and build a habit of service and responsibility.</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">Calendar</p>
          <h2>Upcoming Events</h2>
          <hr class="gold-rule">
        </div>

        <!-- Render 2–4 upcoming event cards here -->

        <p><a class="button button--outline" href="/calendar/">View Full Calendar</a></p>
      </div>
    </section>

    <section class="section section--alt">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">Grades K–5</p>
          <h2>Cub Scout Dens</h2>
          <hr class="gold-rule">
        </div>

        <div class="rank-grid">
          <div class="rank-card"><strong>Lion</strong><span>Kindergarten</span></div>
          <div class="rank-card"><strong>Tiger</strong><span>1st Grade</span></div>
          <div class="rank-card"><strong>Wolf</strong><span>2nd Grade</span></div>
          <div class="rank-card"><strong>Bear</strong><span>3rd Grade</span></div>
          <div class="rank-card"><strong>Webelos</strong><span>4th Grade</span></div>
          <div class="rank-card"><strong>Arrow of Light</strong><span>5th Grade</span></div>
        </div>
      </div>
    </section>

    <section class="section join-cta">
      <div class="container join-cta__inner">
        <p class="hero__eyebrow">Join the Adventure</p>
        <h2>Ready for Your Next Adventure?</h2>
        <p>Visit a meeting, meet our families, and see what Cub Scouting is like.</p>
        <div class="hero__actions" style="justify-content:center">
          <a class="button button--gold" href="/join/">Visit a Meeting</a>
          <a class="button button--outline" href="/contact/">Contact a Leader</a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">New Families</p>
          <h2>Frequently Asked Questions</h2>
          <hr class="gold-rule">
        </div>

        <div class="faq-list">
          <details>
            <summary>When and where does the Pack meet?</summary>
            <p>Add your current meeting information here.</p>
          </details>
          <details>
            <summary>How much does it cost?</summary>
            <p>Add current Pack, council, and national fee information here.</p>
          </details>
          <details>
            <summary>How do we join?</summary>
            <p>Add your local joining process and contact information here.</p>
          </details>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container">
      <div class="site-footer__grid">
        <div>
          <h2>Cub Scout Pack 123</h2>
          <p>Torrance, California</p>
          <p><a href="mailto:pack123@example.org">pack123@example.org</a></p>
        </div>

        <div>
          <strong>Pack</strong>
          <p><a href="/about/">About</a></p>
          <p><a href="/calendar/">Calendar</a></p>
          <p><a href="/join/">Join</a></p>
        </div>

        <div>
          <strong>Scouting</strong>
          <p><a href="https://www.scouting.org/">Scouting America</a></p>
          <p><a href="#">Local Council</a></p>
        </div>
      </div>

      <div class="site-footer__legal">
        <p>© <span id="year"></span> Cub Scout Pack 123.</p>
        <p>
          Scouting America, Cub Scouts, associated marks, and program logos are trademarks
          of Scouting America and are used according to applicable brand guidelines.
        </p>
      </div>
    </div>
  </footer>

  <script>
    document.getElementById('year').textContent = new Date().getFullYear();
  </script>
</body>
</html>
```

---

# 28. Mobile Navigation Behavior

Keep JavaScript minimal.

```js
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('primary-nav--open', !open);
  });
}
```

```css
.menu-toggle {
  display: none;
  border: 0;
  background: transparent;
  color: var(--scout-blue-dark);
  font-size: 1.75rem;
}

@media (max-width: 800px) {
  .menu-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
  }

  .primary-nav {
    position: absolute;
    inset: 100% 0 auto;
    display: none;
    padding: 1rem;
    background: var(--white);
    border-bottom: 1px solid var(--border);
    box-shadow: 0 1rem 2rem rgba(35, 37, 40, 0.08);
  }

  .primary-nav--open {
    display: grid;
    gap: 0.5rem;
  }

  .primary-nav > a {
    padding: 0.75rem 1rem;
  }
}
```

---

# 29. Site Technology Recommendation

For a very simple Pack website, prefer the smallest implementation that meets the need.

## Good options

### Option A — Plain HTML/CSS/JavaScript

Best when:

- Only a few pages.
- Volunteers need easy maintenance.
- Hosted on GitHub Pages.
- No server-side features required.

### Option B — Astro

Best when:

- You want reusable components.
- Content is mostly static.
- You want Markdown-based pages/events.
- You want excellent performance.

### Option C — Eleventy (11ty)

Best when:

- You want a traditional static site generator.
- Content editing in Markdown is important.

Avoid a large application framework unless there is a real requirement for it.

---

# 30. Suggested Project Structure

```text
/
├── index.html
├── about/
│   └── index.html
├── calendar/
│   └── index.html
├── join/
│   └── index.html
├── resources/
│   └── index.html
├── contact/
│   └── index.html
├── assets/
│   ├── pack-logo.svg
│   ├── hero-pack-activity.webp
│   ├── outdoors.webp
│   ├── projects.webp
│   └── service.webp
├── styles.css
├── script.js
├── robots.txt
└── sitemap.xml
```

If using Astro:

```text
src/
├── components/
│   ├── Header.astro
│   ├── Hero.astro
│   ├── Button.astro
│   ├── Card.astro
│   ├── EventCard.astro
│   ├── FAQ.astro
│   └── Footer.astro
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro
│   ├── about.astro
│   ├── calendar.astro
│   ├── join.astro
│   ├── resources.astro
│   └── contact.astro
└── styles/
    └── global.css
```

---

# 31. SEO / Metadata

Every page should have:

- Unique `<title>`.
- Meta description.
- Open Graph title/description/image.
- Canonical URL when domain is known.
- Human-readable heading structure.

Example:

```html
<title>Cub Scout Pack 123 | Torrance, California</title>
<meta
  name="description"
  content="Cub Scout Pack 123 serves families in Torrance, California. Learn about meetings, activities, upcoming events, and how to join."
>
```

For local search, naturally mention:

- Pack number.
- City.
- Nearby neighborhoods/schools if appropriate.
- Local council.

Do not keyword-stuff.

---

# 32. Performance Requirements

Target:

- Lighthouse Performance 90+.
- Accessible without JavaScript except for optional navigation enhancements.
- Hero image optimized to roughly 200–400 KB when practical.
- Lazy-load images below the fold.
- Width/height attributes on images to prevent layout shift.
- Avoid autoplaying video.
- Avoid large UI libraries.

Example:

```html
<img
  src="/assets/campout.webp"
  alt="Cub Scouts setting up tents at a Pack campout"
  width="1200"
  height="800"
  loading="lazy"
  decoding="async"
>
```

---

# 33. Pack-Specific Content Checklist

Before launch, replace all placeholders with verified information:

- [ ] Pack number
- [ ] City / community
- [ ] Chartered organization, if published
- [ ] Local council
- [ ] Meeting location
- [ ] Meeting frequency
- [ ] Meeting time
- [ ] Grades served
- [ ] Membership/joining contact
- [ ] Pack email
- [ ] Current fee information
- [ ] Uniform guidance
- [ ] Calendar link
- [ ] Registration/BeAScout link if used
- [ ] Parent guide/resources
- [ ] Leader names only if leaders agree to publication
- [ ] Youth photo permissions
- [ ] Official/authorized logos
- [ ] Privacy policy if collecting user information

---

# 34. Acceptance Criteria for the Coding Agent

The implementation is complete only when all of the following are true:

### Brand

- [ ] Primary UI color is Scouting Blue `#003F87`.
- [ ] Cub Gold `#FDC116` is used as an accent.
- [ ] Scouting Red is minimal.
- [ ] White space is generous.
- [ ] Official marks are not modified.

### UX

- [ ] Join CTA is visible without hunting.
- [ ] Parents can find meeting time/location within one interaction.
- [ ] Calendar/events are easy to scan.
- [ ] Contact information is visible in the footer.
- [ ] Mobile navigation works with keyboard and touch.

### Accessibility

- [ ] Semantic headings are correct.
- [ ] Focus states are visible.
- [ ] Images have appropriate alt text.
- [ ] Color contrast meets WCAG AA.
- [ ] Form controls have visible labels.

### Performance

- [ ] Images are compressed.
- [ ] No unnecessary JavaScript framework is included.
- [ ] Layout works from ~320 px phone width through desktop.
- [ ] No horizontal scroll.

### Content

- [ ] Site uses **Pack** terminology for the local Cub Scout unit.
- [ ] Local information is verified.
- [ ] National website copy has not been pasted wholesale.
- [ ] Youth personal information is not published.

---

# 35. Copy-Paste Prompt for a Coding Agent

Use the following prompt together with this Markdown document:

```text
You are building a small public website for a local Cub Scout Pack.

Treat the attached “Cub Scout Pack Website — Design & Implementation Specification” as the source of truth for visual design and UX.

Goals:
1. Build a clean, responsive, mobile-first static site.
2. Make it visually related to Cub Scouts / Scouting America through the approved blue/gold palette, typography, generous whitespace, bold photography, and clear calls to action.
3. Do not make a pixel-for-pixel clone of scouting.org.
4. Do not invent or redraw official logos or rank insignia. Reference only supplied/authorized asset files.
5. Use semantic HTML and WCAG AA accessibility practices.
6. Keep JavaScript minimal.
7. Optimize images and performance.
8. Keep the content easy for Pack volunteers to maintain.

Required pages:
- Home
- About Our Pack
- Calendar
- Join
- Resources
- Contact

Required home-page components:
- Header/nav
- Hero
- Quick facts
- About/welcome section
- “What We Do” cards
- Upcoming events
- Dens/grade overview
- Join CTA
- FAQ
- Footer

Use the CSS design tokens and component patterns in the specification. Where content is unknown, add a clearly labeled TODO rather than inventing a fact.

Before finishing, run through the acceptance checklist in the specification and fix any failures.
```

---

# 36. Sources / Reference Material

The design recommendations above were derived from these public Scouting America resources:

1. **Cub Scouts program page**  
   https://www.scouting.org/programs/cub-scouts/

2. **Scouting America / BSA style guide (2022)** — includes digital typography guidance and the Cub Scouting color palette.  
   https://www.scouting.org/wp-content/uploads/2022/04/Style-Guide_BSA.pdf

3. **Scouting America website terms** — includes intellectual-property and trademark/look-and-feel language.  
   https://www.scouting.org/legal/terms-and-conditions/

4. **Scouting America marketing resources / Brand Center references**  
   https://www.scouting.org/programs/scouts-bsa/resources/recruitment-marketing/scouts-bsa-marketing-tools/

Use the **current** Scouting America Brand Center as the final authority for official logos, imagery, trademarks, and any brand rule that may have changed since the older style-guide publication.

---

# 37. Final Design Summary

The site should feel like this:

> **Scouting Blue foundation + Cub Gold energy + white space + bold family/adventure photography + sturdy typography + simple cards + obvious join actions.**

It should **not** feel like:

- A corporate intranet.
- A cartoon children’s website.
- A direct clone of ScoutingAmerica.org.
- A generic Bootstrap template with Scout colors pasted on top.

The ideal result is a simple, trustworthy local Pack website that a parent can understand in under 30 seconds and that visually belongs in the Cub Scouting ecosystem.
