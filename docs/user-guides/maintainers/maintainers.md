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

Annual facts in Markdown use substitutions instead of duplicate prose: `{{season}}`, `{{youthFee}}`, `{{packDues}}`, `{{totalFee}}`, `{{duesDate}}`, `{{location}}`, `{{address}}`, `{{packSchedule}}`, `{{committeeSchedule}}`. Central external links use syntax such as `[Youth registration (external)](pack:youth)` and must have a matching key in `pack.links`. Internal links start with `/`, for example `[Calendar](/calendar/)`; the Markdown processor adds the configured base path.

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

## GitHub Pages launch runbook

The repository does not infer the GitHub owner, repository slug, or production domain. Without configuration, local builds omit canonical and social-sharing URL tags. `SITE_URL` accepts an HTTP(S) origin with no path, query, or fragment. `BASE_PATH` accepts `/` or a path such as `/repository/`.

For a local subpath verification in PowerShell:

```powershell
$env:BASE_PATH='/path-check/'
$env:SITE_URL='https://example.invalid'
npm run build
Remove-Item Env:BASE_PATH,Env:SITE_URL
npm run build
```

Only Pack-appointed maintainers perform the GitHub and Cloudflare steps below. Keep passwords, MFA recovery codes, generated GitHub domain-verification values, Cloudflare exports, billing details, and approval records in the Pack's private inventory—never in this repository or an issue.

### 1. Prepare and protect the source repository

1. In `CubScoutPack862/cspack862`, confirm that two adult Pack owners have independent GitHub accounts, 2FA, and recovery paths. Use a Pack role email for administrative notifications.
2. Create `develop` from the current approved `main`. Contributors open pull requests into `develop`; approved releases merge from `develop` into `main`. An urgent `main` fix must be merged back into `develop` afterward.
3. In **Settings → Branches**, protect both branches: require pull requests, one approval, resolved conversations, and the real validation checks from a successful Actions run. Block force pushes and deletion. Give contributors the least permission that permits pull requests; do not grant Pages or organization administration.
4. Push only the reviewed, sanitized source. Before the first public push, run `npm ci`, `npm run check`, `npm run build`, and `npm run verify:modes`. Do not import the legacy personal repository history, tags, or refs.

The production workflow in [`.github/workflows/deploy.yml`](../../../.github/workflows/deploy.yml) validates pushes and pull requests, but deploys only a successful `main` build. It uses GitHub Pages OIDC, so no personal access token, Pages secret, or Cloudflare credential belongs in GitHub Actions.

### 2. Create and review staging before production or Cloudflare

Staging is a separate public repository so it cannot replace the production Pages site.

1. In the `CubScoutPack862` organization, create a public repository named `cspack862-staging`. Do not add Pack-private files, a custom domain, or production secrets.
2. Add [the supplied staging workflow](cspack862-staging-deploy.yml) to the new repository as `.github/workflows/deploy-staging.yml`, commit it, and push it. The workflow checks out only the public `CubScoutPack862/cspack862` `develop` branch, has no push trigger, and can deploy only the staging repository's Pages environment.
3. In the staging repository, open **Settings → Pages**, select **GitHub Actions** as the source, then open **Actions → Validate and publish Pack staging site → Run workflow**. Record the run URL, `develop` commit SHA, generated Pages URL, and completion time in the private launch record.
4. Review `https://cubscoutpack862.github.io/cspack862-staging/` in a logged-out browser. Test the key pages, a nonexistent route, links/assets, keyboard navigation, narrow viewport, and browser console. Obtain leadership approval before continuing.
5. To take staging down after review, use the staging repository's **Settings → Pages** unpublish control. Keep the repository. When another review is needed, reselect **GitHub Actions** if necessary and run the workflow manually again.

Do not configure Cloudflare, a custom domain, or production Pages until the staging review and its private approval record are complete.

### 3. Enable and verify production Pages

1. In `CubScoutPack862/cspack862`, open **Settings → Pages** and select **GitHub Actions** as the publishing source.
2. Merge the approved release to `main`, or use **Actions → Validate and publish Pack website → Run workflow** while `main` is selected. Confirm the workflow's build and deploy jobs succeed and that the `github-pages` environment links to the generated URL.
3. In a logged-out browser, smoke-test the GitHub-provided production URL before connecting the custom domain. Confirm root-path links, approved assets, canonical metadata, and the designed 404 page work.
4. Record the successful workflow URL, deployed `main` SHA, generated URL, and time in the private launch record. Use the observed workflow check names when finalizing branch protection.

### 4. Connect Cloudflare only after staging approval

Perform these actions in a Pack-controlled Cloudflare account with two authorized maintainers and DNS records backed up privately.

1. Confirm the registrar, renewal date, billing owner, recovery owner, auto-renew, and 60/30-day reminders in the private inventory. Preserve unrelated mail and ownership DNS records.
2. In GitHub organization **Settings → Pages**, add `cspack862.org` and copy the generated `_github-pages-challenge-...` TXT record into Cloudflare. Wait for GitHub to mark the domain verified; retain the TXT record.
3. In the production repository **Settings → Pages**, set `www.cspack862.org` as the custom domain before changing web DNS.
4. Copy the current GitHub Pages apex `A`/optional `AAAA` targets from GitHub's official documentation during this change. In Cloudflare, add only those apex records and a `www` CNAME to `cubscoutpack862.github.io` (never a repository path). Set all GitHub Pages records to **DNS only**, not proxied.
5. Remove only conflicting apex, `www`, forwarding, parking, or wildcard web records. Preserve unrelated records. Verify the TXT, apex, and `www` answers independently after propagation.
6. After GitHub issues the certificate, enable **Enforce HTTPS**. Test an identical deep path through HTTP/HTTPS and both hostnames; every request must end at `https://www.cspack862.org` with its path intact and no loop.

### 5. Rollback, monitoring, and handover

For a site regression, revert the responsible commit through a reviewed pull request to `main`; the same production workflow restores the last known-good source. For a DNS incident, keep the GitHub-provided URL available and restore the privately recorded known-good DNS values. Do not delete the repository, staging repository, Pages setting, or organization-level domain verification as a shortcut.

Configure an external HTTPS check for `https://www.cspack862.org` that alerts both maintainers without collecting visitor data. At least quarterly—and at leadership transitions—review owners, recovery access, Cloudflare/registrar access, renewal, certificate/redirect behavior, the latest deployment, public content, and youth-media/document approvals.

Useful references: [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [GitHub custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), and [Astro content collections](https://docs.astro.build/en/guides/content-collections/).
