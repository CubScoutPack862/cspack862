# Maintainer's guide

This guide is for software engineers and site administrators. It covers the codebase, local development, deployment, and integrations. For routine information updates, use the [content editor's guide](../content-editors/content-editors.md).

## Run locally

Use Node.js **22.12 or newer** (CI currently uses Node 24) and npm 9.6.5 or newer.

```sh
npm ci
npm run dev
```

Open the local URL printed by Astro, normally `http://127.0.0.1:4321`. Content changes appear while the development server runs. Before sending a change for review, validate the application and make a production preview:

```sh
npm run check
npm run build
npm run preview
```

`check` runs Astro and TypeScript diagnostics, content validation, and the existing focused behavior tests. `build` validates content, writes the static site to `dist/`, and audits the complete generated website for the brochure route allowlist, exact public-contact allowlist, private data, withheld documents, prohibited routes, and the approved public-image inventory. `preview` serves that built output; run `build` again after a change.

On a restricted development machine, set `ASTRO_TELEMETRY_DISABLED=1` to avoid Astro creating telemetry configuration in the user profile. In PowerShell:

```powershell
$env:ASTRO_TELEMETRY_DISABLED='1'
```

The project keeps npm's cache in `.cache/npm`.

## Codebase and styles

The site is a static Astro application. There is no database, account system, or backend. Markdown files hold page and event copy; `src/data/pack.ts` contains Pack-wide operational facts that are validated through `src/lib/schemas.ts`.

| Concern | Source |
| --- | --- |
| Content pages | `content/pages/*.md` |
| Event records | `content/events/*.md` |
| Media metadata and approvals | `content/media/*.md` |
| Pack-wide facts, links, contacts, calendar | `src/data/pack.ts` |
| Components | `src/components/` |
| Page layouts | `src/layouts/` |
| Site-wide styles | `src/styles/` |
| Public images | `public/images/` |

Page frontmatter requires `title`, `description`, `eyebrow`, `heading`, and `intro`. The layout supplies the one page-level heading, so Markdown content must begin its sections with `##`, not `#`. The Resources page builds its in-page contents navigation from those headings.

Annual facts in Markdown use substitutions instead of duplicate prose: `{{season}}`, `{{youthFee}}`, `{{packDues}}`, `{{totalFee}}`, `{{duesDate}}`, `{{location}}`, `{{address}}`, `{{packSchedule}}`, `{{committeeSchedule}}`, and `{{denSchedule}}`. Central external links use syntax such as `[Youth registration (external)](pack:youth)` and must have a matching key in `pack.links`. Internal links start with `/`, for example `[Calendar](/calendar/)`; the Markdown processor adds the configured base path.

Treat `src/data/pack.ts` as the source of truth for Pack-wide values. Its status model is enforced at build time: `verified` needs a value; `tentative`, `confirm`, and `missing` need an appropriate public note; and `private` and `member-only` values are omitted. Contact details are independently opt-in and private by default. The only approved public contacts are the Committee Chair and Cubmaster email addresses. Never add phone numbers, biographies, private family or medical information, or member-system details to the public repository.

## Events and content validation

Each event is one Markdown file in `content/events/`. Dates must be quoted ISO strings, and every event requires a title, start date, allowed category, `tentative` boolean, and summary. The allowed categories are `pack-meeting`, `camping`, `celebration`, `service`, `fundraising`, `derby`, and `outdoor-activity`. An end date cannot precede the start date. Omit unknown times and locations rather than supplying a fallback.

Events are sorted automatically. The home page selects the next three based on build time in `America/Los_Angeles`, including a current multi-day event. The full calendar keeps maintained past and future events.

`npm run verify:modes` tests subpath and custom-origin builds plus a temporary configured-calendar fixture. Run it only with saved changes to `src/data/pack.ts` and no simultaneous edits, because it restores the actual configuration and root build when done.

## Google Calendar integration

Once leadership approves a public Google Calendar, set `pack.calendar` in `src/data/pack.ts` to the approved URL pair:

```ts
calendar: {
  status: 'verified',
  value: {
    embedUrl: 'THE_APPROVED_HTTPS_GOOGLE_CALENDAR_EMBED_URL',
    directUrl: 'THE_APPROVED_HTTPS_GOOGLE_CALENDAR_DIRECT_URL',
  },
},
```

Both URLs must use `calendar.google.com/calendar/`; the embed URL must have the `/calendar/embed` path. Copy both URLs from the approved calendar instead of guessing a calendar ID. The site displays a labelled, lazy-loaded iframe and a direct link. Updates inside the Google Calendar need no site rebuild. The event Markdown calendar remains separately curated; until the URL pair is approved, no external calendar loads.

## Media and documents

The public site uses the approved Pack 862 logo, six approved rank insignia, and four selected stock photographs from the Scouting America Brand Assets library. It does not publish Pack-member, family, or event photos, and it does not publish a standalone Cub Scouts program logo. High-definition approved originals may be resized, compressed, or re-encoded into visually faithful web derivatives in `public/images/`; keep source originals in the ignored `media/` staging directory.

Every public stock image has an approved `content/media/` entry with `kind: stock-photo`, `status: approved`, `src`, neutral descriptive `alt`, intrinsic dimensions, factual context, provenance, and an approval reference. Do not identify stock subjects as Pack 862 members. The schema rejects incomplete approvals, and the production audit rejects any image outside the exact approved inventory.

The completed questionnaire, New Family Orientation PDF, private review notes, and future member-only documents must stay outside the public build and public Git history. Do not place them under `public/` or link to them from public content. Keep any sensitive staging material in ignored local paths or a Pack-controlled private system.

## GitHub Pages and custom domains

The repository does not infer the GitHub owner, repository slug, or production domain. Without configuration, local builds omit canonical and social-sharing URL tags. `SITE_URL` accepts an HTTP(S) origin with no path, query, or fragment. `BASE_PATH` accepts `/` or a path such as `/repository/`.

For a local subpath verification in PowerShell:

```powershell
$env:BASE_PATH='/path-check/'
$env:SITE_URL='https://example.invalid'
npm run build
Remove-Item Env:BASE_PATH,Env:SITE_URL
npm run build
```

In GitHub, set **Settings → Pages → Source → GitHub Actions**. The included workflow checks every push and pull request. Only a successful non-pull-request build from the repository's actual default branch uploads and deploys to Pages. The `configure-pages` job reads the real origin and base path, so project Pages and a configured custom domain share the same source; only the deployment job receives `pages: write` and `id-token: write` permissions.

Set up a custom domain in the Pack repository's Pages settings, then follow GitHub's current DNS and HTTPS instructions using Pack-controlled credentials. Never create a CNAME based on a guessed domain. Keep the repository and domain under Pack control with at least two administrators, and record recovery and renewal responsibilities privately.

Useful references: [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) and [Astro content collections](https://docs.astro.build/en/guides/content-collections/).
