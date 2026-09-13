## 1. Confirm Launch Ownership and Inputs

- [x] 1.1 Name the primary GitHub/website administrator, secondary administrator, leadership launch approver, domain billing owner, and monitoring recipients in a private Pack launch worksheet; verify every production-critical role has a named primary and backup adult.
- [x] 1.2 Confirm `CubScoutPack862/cspack862` as the public repository and `main` as the production branch; verify the organization and repository are Pack-controlled and not controlled solely by one volunteer.
- [x] 1.3 Shortlist available domain names and compare spelling, normal renewal price, transfer policy, WHOIS privacy, MFA/recovery support, and DNS service; verify leadership records the chosen domain, registrar/DNS provider, canonical apex-or-`www` preference, and payment owner before purchase.
- [x] 1.4 Record the baseline architecture decision as GitHub Pages plus standard DNS, without CloudFront, Route 53, or an enabled Cloudflare proxy; verify any request for an additional CDN is deferred to a separate approved architecture change with a concrete requirement.
- [x] 1.5 Select private systems for credential/recovery inventory and approval evidence; verify no password, recovery code, billing credential, private consent record, or registrar secret will be stored in this public repository.

## 2. Prepare the Repository for Public Ownership

- [x] 2.1 Review `git status`, the `init` branch, the OpenSpec archive changes, verification edits, and the personal `lionme90/cspack862` remote; reconcile the intended source without discarding user work and verify the resulting diff contains only reviewed website and planning files.
- [x] 2.2 Use the privacy inventory from `publish-approved-brochure-content` to verify the current source tree excludes restricted document paths and private candidate values. Initialize the public repository from that verified tree without adding a legacy remote, ref, tag, or commit; verify a fresh clone contains only the new public history.
- [x] 2.3 Resolve the launch-critical items through the private completed questionnaire and `publish-approved-brochure-content`, including schedules, contacts, fees, registration details, calendar destinations, leader visibility, approved stock media, and withholding the orientation PDF; verify unresolved items are withheld rather than guessed.
- [ ] 2.4 Run `npm ci`, `npm run check`, `npm run build`, and `npm run verify:modes` from a saved worktree; verify every command passes, the temporary verification fixture is restored, and the final `dist/` is a root-path static build.
- [x] 2.5 Add or update a public maintainer runbook with step-by-step GitHub navigation for owners, `develop`/`main` protection, staging repository creation, Pages source selection, manual staging dispatch, production deployment, and rollback. Add the post-staging Cloudflare DNS-only, domain verification, HTTPS, monitoring, and renewal procedure without credentials, generated verification values, or private records; verify a second maintainer can follow it without receiving secrets from Git.
- [ ] 2.6 Commit the intended launch-ready source and planning artifacts with no secrets; verify `git status --short` is clean and record the initial public-repository commit SHA that will be pushed.

## 3. Prepare Agent-Delivered Workflow Source and Maintainer Documentation

- [x] 3.1 Prepare the production GitHub Actions workflow source so pull requests and pushes validate, and only successful non-pull-request builds of protected `main` deploy to the production Pages environment; verify no secret or personal token is required and only the deploy job has `pages: write` and `id-token: write`.
- [x] 3.2 Prepare a separate manually triggered staging workflow source that checks out `CubScoutPack862/cspack862` at `develop`, validates and builds with the staging Pages origin and `/cspack862-staging/` base path, and deploys only to the staging Pages environment; verify it cannot deploy production.
- [x] 3.3 Add the maintainer guide described in task 2.5 and verify it clearly distinguishes repository source changes made by the agent from every GitHub and Cloudflare account action performed by a Pack maintainer.

## 4. Maintainer-Operated GitHub Setup (Not Agent-Executed)

- [ ] 4.1 Have the Pack maintainers create or confirm the Pack-controlled GitHub Free organization with a Pack role email and two individual owners; verify both owners accept, can access organization settings independently, and have working 2FA and separate recovery methods.
- [ ] 4.2 Have the Pack maintainers require organization 2FA and review third-party application access; verify all members remain active after enforcement and no unneeded OAuth app or GitHub App has organization access.
- [ ] 4.3 Have a Pack maintainer create or confirm `CubScoutPack862/cspack862` as a public organization repository and push only the verified current source as its initial history. Verify no legacy remote refs, tags, or commits are present; confirm workflow files, repository visibility, and clone access from the organization URL.
- [ ] 4.4 Have a Pack maintainer set `main` as the repository default and update the local `origin`; verify `git remote -v`, the GitHub default-branch setting, and a fresh clone all reference the organization repository and `main`.
- [ ] 4.5 Have a Pack maintainer create a contributor team with the lowest useful permission and keep administrative access limited to the two owners; verify an ordinary contributor can propose a branch/pull request but cannot change Pages, organization, or repository security settings.
- [ ] 4.6 Have a Pack maintainer enable GitHub Actions using the prepared repository workflow and review the default workflow permissions; verify no repository secret or personal access token is required and only the deploy job in `.github/workflows/deploy.yml` has `pages: write` and `id-token: write`.

## 5. Maintainer Proves Staging and GitHub Pages Before Connecting Cloudflare (Not Agent-Executed)

- [ ] 5.1 Have a Pack maintainer create `CubScoutPack862/cspack862-staging`, add the prepared staging workflow, select **Settings → Pages → Source → GitHub Actions**, and manually dispatch `develop`; verify the staging environment exists and deployment does not affect production.
- [ ] 5.2 Open `https://cubscoutpack862.github.io/cspack862-staging/` in a logged-out browser and smoke-test Home, Join, Calendar, Resources, Contact, assets, and a nonexistent route; verify there are no broken staging-subpath links, failed local resources, or browser console errors.
- [ ] 5.3 Obtain leadership approval of the staging URL and record the staging workflow URL, deployed `develop` SHA, generated Pages URL, and completion time in the private launch record. Do not begin Cloudflare, custom-domain, or production Pages configuration until this approval exists.
- [ ] 5.4 Have a Pack maintainer set the production repository **Settings → Pages → Source** to **GitHub Actions**; verify the Pages settings show the custom workflow source and the `github-pages` environment exists after the first deployment attempt.
- [ ] 5.5 Have a Pack maintainer trigger `.github/workflows/deploy.yml` on `main`; verify install, check, local build, project-path build, production build, artifact upload, and deploy jobs all succeed.
- [ ] 5.6 Open the GitHub-provided production Pages URL in a logged-out browser, smoke-test the critical routes and a nonexistent route, record the workflow URL, deployed commit SHA, generated Pages URL, and completion time, then configure `main` protection using the real check names; verify a non-owner cannot push directly or merge a failing pull request.

## 6. Maintainer Registers, Verifies, and Connects the Domain After Staging Approval (Not Agent-Executed)

- [ ] 6.1 After task 5.3, have a Pack maintainer purchase or confirm the approved domain in the Pack-controlled Cloudflare/registrar account with the role email, MFA, current Pack payment method, privacy service where supported, and auto-renew; verify the private inventory captures the receipt, registrant, expiry/renewal date, recovery owner, and support route.
- [ ] 6.2 Have the secondary administrator obtain independent Cloudflare/registrar recovery capability and create 60/30-day renewal reminders; verify both administrators receive a test notification without sharing one login.
- [ ] 6.3 Have a Pack maintainer inventory and export the domain's initial DNS zone before editing it; preserve unrelated records and identify conflicting apex, `www`, forwarding, parking, or wildcard records for removal.
- [ ] 6.4 In GitHub organization **Settings → Pages**, have a Pack maintainer add the apex domain and publish the exact generated `_github-pages-challenge-<organization>` TXT record in Cloudflare; verify GitHub marks the domain verified and retain the TXT record.
- [ ] 6.5 Have a Pack maintainer add `www.cspack862.org` as the production Pages custom domain before repointing public web DNS; verify it matches the approved canonical choice.
- [ ] 6.6 Copy current GitHub guidance during execution, then have a Pack maintainer configure the apex records and `www` CNAME in Cloudflare as **DNS-only**, preserve unrelated records, and verify no CNAME includes a repository path.
- [ ] 6.7 Have a Pack maintainer independently verify the TXT, apex `A`/`AAAA`, and `www` `CNAME` answers after propagation.
- [ ] 6.8 Have a Pack maintainer wait for GitHub certificate issuance and enable **Enforce HTTPS**; verify a private browser session trusts the certificate and receives no mixed-content warning.
- [ ] 6.9 Have a Pack maintainer request a deep path through apex and `www` over HTTP and HTTPS; verify every variant preserves the path and finishes at `https://www.cspack862.org` without a loop or project-subpath residue.

## 7. Enforce the Public-Launch Approval Gate

- [ ] 7.1 Obtain explicit leadership decisions for public contacts, leader identity, social links, schedule, fees, payment/assistance details, enrollment wording, calendar/registration destinations, and current season facts; verify each item has an approver, date, outcome, and non-sensitive reference in the private launch record.
- [ ] 7.2 Verify every activity image is derived from an approved Scouting America Brand Assets stock source and that Pack/family/youth photographs and incomplete media metadata are absent from the production artifact and public repository history.
- [ ] 7.3 Review every downloadable document for current facts and public contact/privacy impact; verify the private orientation guide, all links to it, and every unapproved file are absent from `dist/`, the tracked tree, and the independently initialized public repository history before launch.
- [ ] 7.4 Build with the production origin and `/` base path, then inspect generated HTML, assets, metadata, and documents for private values, stale hostnames, unapproved media, mixed-content URLs, and project-path remnants; verify `npm run check` and `npm run build` pass on the exact approved revision.
- [ ] 7.5 Have the named leadership approver review the canonical staging/production URL and sign the launch gate; verify the private record states either `approved to announce` or the specific blocking items, with no ambiguous partial approval.

## 8. Validate and Announce Production

- [ ] 8.1 Verify the final GitHub Actions run is green and its deployment points to the approved commit SHA; confirm the previous successful deployment remains available until the new deployment finishes.
- [ ] 8.2 From outside an authenticated GitHub session, verify the canonical domain, apex/`www` redirect, certificate, Home, About, Join, Activities, Calendar, Resources, Contact, approved static assets, absence of the private PDF, canonical/Open Graph metadata, and designed 404 behavior.
- [ ] 8.3 Repeat the critical-page review on a narrow mobile viewport and by keyboard, and inspect the browser console/network panel; verify navigation, focus, responsive layout, JavaScript-disabled core content, resources, and HTTPS requests remain usable and error-free.
- [ ] 8.4 Open a controlled pull request containing a deliberately invalid content fixture, without merging it; verify required validation fails, merge is blocked, and the canonical production deployment/commit does not change, then close the test pull request.
- [ ] 8.5 Record DNS answers, redirect results, certificate status, workflow URL, deployed SHA, smoke-test outcome, approver, and launch time in the private launch record; verify both administrators can retrieve the evidence.
- [ ] 8.6 Announce only the canonical HTTPS URL after task 7.5 is approved and all production checks pass; verify public communications do not direct families to the personal repository URL or temporary GitHub Pages URL.

## 9. Monitoring, Recovery, and Handover

- [ ] 9.1 Configure an external HTTPS availability check for the canonical home page with alerts to both administrators; verify a test alert is received and the monitor does not collect private visitor data.
- [ ] 9.2 Confirm registrar auto-renew, payment expiry, domain expiry, DNS provider, and 60/30-day reminders in the private inventory; verify the secondary administrator can locate and explain the renewal procedure.
- [ ] 9.3 Perform a tabletop rollback drill using the recorded known-good commit and DNS export; verify both administrators can explain how to revert through a reviewed pull request, observe Pages redeployment, and restore known-good DNS without deleting the repository or domain verification.
- [ ] 9.4 Perform a second-administrator handover drill covering a fresh clone, local validation, a content pull request, Actions/Pages status, DNS inspection, monitoring, and private recovery inventory; verify the secondary administrator completes the walkthrough without the primary administrator's credentials.
- [ ] 9.5 Schedule a quarterly and leadership-transition review of owners, contributors, 2FA/recovery, registrar/DNS access, domain renewal, certificate/redirect behavior, latest deployment, dependency health, content freshness, youth media consent, and downloadable documents; verify the recurring review has an owner and next date.
- [ ] 9.6 Complete a final audit against every scenario in `specs/site-delivery/spec.md`; verify each requirement has linked launch evidence and leave this change unarchived until all implementation tasks are complete.
