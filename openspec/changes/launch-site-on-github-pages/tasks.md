## 1. Confirm Launch Ownership and Inputs

- [ ] 1.1 Name the primary GitHub/website administrator, secondary administrator, leadership launch approver, domain billing owner, and monitoring recipients in a private Pack launch worksheet; verify every production-critical role has a named primary and backup adult.
- [ ] 1.2 Confirm `CubScoutPack862/cspack862` as the public repository and `main` as the production branch; verify the organization and repository are Pack-controlled and not controlled solely by one volunteer.
- [ ] 1.3 Shortlist available domain names and compare spelling, normal renewal price, transfer policy, WHOIS privacy, MFA/recovery support, and DNS service; verify leadership records the chosen domain, registrar/DNS provider, canonical apex-or-`www` preference, and payment owner before purchase.
- [ ] 1.4 Record the baseline architecture decision as GitHub Pages plus standard DNS, without CloudFront, Route 53, or an enabled Cloudflare proxy; verify any request for an additional CDN is deferred to a separate approved architecture change with a concrete requirement.
- [ ] 1.5 Select private systems for credential/recovery inventory and approval evidence; verify no password, recovery code, billing credential, private consent record, or registrar secret will be stored in this public repository.

## 2. Prepare the Repository for Public Ownership

- [ ] 2.1 Review `git status`, the `init` branch, the OpenSpec archive changes, verification edits, and the personal `lionme90/cspack862` remote; reconcile the intended source without discarding user work and verify the resulting diff contains only reviewed website and planning files.
- [ ] 2.2 Use the privacy inventory from `publish-approved-brochure-content` to verify the current source tree excludes restricted document paths and private candidate values. Initialize the public repository from that verified tree without adding a legacy remote, ref, tag, or commit; verify a fresh clone contains only the new public history.
- [ ] 2.3 Resolve the launch-critical items through the private completed questionnaire and `publish-approved-brochure-content`, including schedules, contacts, fees, registration details, calendar destinations, leader visibility, approved stock media, and withholding the orientation PDF; verify unresolved items are withheld rather than guessed.
- [ ] 2.4 Run `npm ci`, `npm run check`, `npm run build`, and `npm run verify:modes` from a saved worktree; verify every command passes, the temporary verification fixture is restored, and the final `dist/` is a root-path static build.
- [ ] 2.5 Add or update a public launch/runbook document covering the production repository and branch, Pages workflow, custom-domain setting, DNS record purpose, HTTPS checks, rollback, monitoring, renewal, and private inventory boundary; verify a second maintainer can follow it without receiving secrets from Git.
- [ ] 2.6 Commit the intended launch-ready source and planning artifacts with no secrets; verify `git status --short` is clean and record the initial public-repository commit SHA that will be pushed.

## 3. Establish the Pack GitHub Organization and Repository

- [ ] 3.1 Create the Pack-controlled GitHub Free organization with a Pack role email and invite the two named administrators as individual owners; verify both owners accept, can access organization settings independently, and have working 2FA and separate recovery methods.
- [ ] 3.2 Require organization 2FA and review third-party application access; verify all members remain active after enforcement and no unneeded OAuth app or GitHub App has organization access.
- [ ] 3.3 Create `CubScoutPack862/cspack862` as a public organization repository and push only the verified current source as its initial history. Verify no legacy remote refs, tags, or commits are present; confirm workflow files, repository visibility, and clone access from the organization URL.
- [ ] 3.4 Rename the production branch to `main`, set it as the repository default, and update the local `origin`; verify `git remote -v`, the GitHub default-branch setting, and a fresh clone all reference the organization repository and `main`.
- [ ] 3.5 Create a contributor team with the lowest useful permission and keep administrative access limited to the two owners; verify an ordinary contributor can propose a branch/pull request but cannot change Pages, organization, or repository security settings.
- [ ] 3.6 Enable GitHub Actions using the repository workflow and review the default workflow permissions; verify no repository secret or personal access token is required and only the deploy job in `.github/workflows/deploy.yml` has `pages: write` and `id-token: write`.

## 4. Prove GitHub Pages Before Connecting DNS

- [ ] 4.1 Set repository **Settings → Pages → Source** to **GitHub Actions**; verify the Pages settings show the custom workflow source and the `github-pages` environment exists after the first deployment attempt.
- [ ] 4.2 Trigger `.github/workflows/deploy.yml` on `main` and correct only launch-specific configuration defects; verify install, check, local build, project-path build, production build, artifact upload, and deploy jobs all succeed.
- [ ] 4.3 Open the GitHub-provided Pages URL in a logged-out browser and smoke-test Home, Join, Calendar, Resources, Contact, assets, and a nonexistent route; verify there are no broken subpath links, failed local resources, or browser console errors.
- [ ] 4.4 Record the successful workflow run URL, deployed commit SHA, generated Pages URL, and completion time in the launch record; verify another owner can locate the same deployment from repository Actions and Environments.
- [ ] 4.5 Configure `main` protection using the real check names from the successful workflow: require a pull request, one approval, conversation resolution, and required validation checks, and block force pushes/deletion; verify a non-owner cannot push directly or merge a failing pull request.

## 5. Register, Verify, and Connect the Domain

- [ ] 5.1 Purchase the approved domain in the Pack-controlled registrar account with the role email, MFA, current Pack payment method, privacy service where supported, and auto-renew; verify the receipt, registrant, expiry/renewal date, recovery owner, and support route are captured in the private inventory.
- [ ] 5.2 Give the secondary administrator independent registrar/DNS recovery capability where the provider supports it and create renewal reminders at least 60 and 30 days before expiry; verify both administrators receive a test notification without sharing one login.
- [ ] 5.3 Inventory and export the domain's initial DNS zone before editing it; verify unrelated mail and ownership records are identified for preservation and conflicting apex, `www`, forwarding, parking, or wildcard records are marked for removal.
- [ ] 5.4 In the GitHub organization's **Settings → Pages**, add the apex domain and publish the exact generated `_github-pages-challenge-<organization>` TXT record; verify GitHub marks the domain verified and leave the TXT record in authoritative DNS.
- [ ] 5.5 Add the approved canonical hostname to the repository's Pages settings before repointing public web DNS; verify GitHub displays that hostname for the Pages site and the canonical choice matches the private launch worksheet.
- [ ] 5.6 Copy the current apex `A` targets, optional `AAAA` targets, and subdomain guidance from GitHub's official custom-domain documentation; configure the apex records and a `www` `CNAME` pointing directly to `<organization>.github.io`, preserve unrelated records, and verify no CNAME includes the repository path.
- [ ] 5.7 Use `Resolve-DnsName` or equivalent independent DNS checks for the verification TXT, apex `A`/`AAAA`, and `www` `CNAME`; verify authoritative and public resolvers return only the intended current records after propagation.
- [ ] 5.8 Wait for GitHub to issue the custom-domain certificate and enable **Enforce HTTPS**; verify a new private browser session trusts the certificate for the canonical hostname and receives no mixed-content warning.
- [ ] 5.9 Request the same deep path through both apex and `www` over HTTP and HTTPS; verify all variants preserve the path and finish on the single approved canonical HTTPS hostname without a loop or project-subpath residue.

## 6. Enforce the Public-Launch Approval Gate

- [ ] 6.1 Obtain explicit leadership decisions for public contacts, leader identity, social links, schedule, fees, payment/assistance details, enrollment wording, calendar/registration destinations, and current season facts; verify each item has an approver, date, outcome, and non-sensitive reference in the private launch record.
- [ ] 6.2 Verify every activity image is derived from an approved Scouting America Brand Assets stock source and that Pack/family/youth photographs and incomplete media metadata are absent from the production artifact and public repository history.
- [ ] 6.3 Review every downloadable document for current facts and public contact/privacy impact; verify the private orientation guide, all links to it, and every unapproved file are absent from `dist/`, the tracked tree, and the independently initialized public repository history before launch.
- [ ] 6.4 Build with the production origin and `/` base path, then inspect generated HTML, assets, metadata, and documents for private values, stale hostnames, unapproved media, mixed-content URLs, and project-path remnants; verify `npm run check` and `npm run build` pass on the exact approved revision.
- [ ] 6.5 Have the named leadership approver review the canonical staging/production URL and sign the launch gate; verify the private record states either `approved to announce` or the specific blocking items, with no ambiguous partial approval.

## 7. Validate and Announce Production

- [ ] 7.1 Verify the final GitHub Actions run is green and its deployment points to the approved commit SHA; confirm the previous successful deployment remains available until the new deployment finishes.
- [ ] 7.2 From outside an authenticated GitHub session, verify the canonical domain, apex/`www` redirect, certificate, Home, About, Join, Activities, Calendar, Resources, Contact, approved static assets, absence of the private PDF, canonical/Open Graph metadata, and designed 404 behavior.
- [ ] 7.3 Repeat the critical-page review on a narrow mobile viewport and by keyboard, and inspect the browser console/network panel; verify navigation, focus, responsive layout, JavaScript-disabled core content, resources, and HTTPS requests remain usable and error-free.
- [ ] 7.4 Open a controlled pull request containing a deliberately invalid content fixture, without merging it; verify required validation fails, merge is blocked, and the canonical production deployment/commit does not change, then close the test pull request.
- [ ] 7.5 Record DNS answers, redirect results, certificate status, workflow URL, deployed SHA, smoke-test outcome, approver, and launch time in the private launch record; verify both administrators can retrieve the evidence.
- [ ] 7.6 Announce only the canonical HTTPS URL after task 6.5 is approved and all production checks pass; verify public communications do not direct families to the personal repository URL or temporary GitHub Pages URL.

## 8. Monitoring, Recovery, and Handover

- [ ] 8.1 Configure an external HTTPS availability check for the canonical home page with alerts to both administrators; verify a test alert is received and the monitor does not collect private visitor data.
- [ ] 8.2 Confirm registrar auto-renew, payment expiry, domain expiry, DNS provider, and 60/30-day reminders in the private inventory; verify the secondary administrator can locate and explain the renewal procedure.
- [ ] 8.3 Perform a tabletop rollback drill using the recorded known-good commit and DNS export; verify both administrators can explain how to revert through a reviewed pull request, observe Pages redeployment, and restore known-good DNS without deleting the repository or domain verification.
- [ ] 8.4 Perform a second-administrator handover drill covering a fresh clone, local validation, a content pull request, Actions/Pages status, DNS inspection, monitoring, and private recovery inventory; verify the secondary administrator completes the walkthrough without the primary administrator's credentials.
- [ ] 8.5 Schedule a quarterly and leadership-transition review of owners, contributors, 2FA/recovery, registrar/DNS access, domain renewal, certificate/redirect behavior, latest deployment, dependency health, content freshness, youth media consent, and downloadable documents; verify the recurring review has an owner and next date.
- [ ] 8.6 Complete a final audit against every scenario in `specs/site-delivery/spec.md`; verify each requirement has linked launch evidence and leave this change unarchived until all implementation tasks are complete.
