## Context

See `proposal.md` for motivation and `specs/site-delivery/spec.md` for the production contract.

The repository already contains a verified static Astro site, production-aware `SITE_URL` and `BASE_PATH` handling, an audited `dist/` build, and `.github/workflows/deploy.yml` using GitHub's supported `configure-pages`, `upload-pages-artifact`, and `deploy-pages` actions. The workflow validates pull requests and only deploys a successful non-PR build on the repository's actual default branch. The current remote is the personal repository `lionme90/cspack862`, the only local branch is `init`, and the working tree contains the just-completed OpenSpec archive plus other uncommitted planning/verification changes. No public launch has been verified.

The launch crosses systems that cannot be represented entirely in Git: GitHub organization and repository settings, registrar ownership and billing, authoritative DNS, certificate issuance, leadership content/privacy approvals, and private account recovery records. DNS and certificate propagation are asynchronous and can take time, so the sequence must keep the current site URL available until the canonical domain is verified.

## Goals / Non-Goals

**Goals:**

- Move production control from an individual namespace to a durable Pack-controlled operating model.
- Publish the existing audited static artifact through GitHub Pages on a Pack-owned custom domain with valid HTTPS and predictable apex/`www` redirects.
- Make launch, rollback, renewal, and handover reproducible by a second authorized administrator.
- Separate public configuration and evidence from private credentials, consent records, billing details, and recovery material.

**Non-Goals:**

- Redesigning the site, introducing dynamic services, or changing the Markdown/content-collection model.
- Resolving leadership-owned facts or granting consent on leadership's behalf.
- Adding Amazon CloudFront, S3, Route 53, a web application firewall, or an AWS account to the baseline.
- Automating registrar purchase, account recovery, payment, or other actions that require an authorized human.
- Promising uninterrupted service or a formal SLA from free-tier hosting.

## Decisions

### 1. Use a GitHub Free organization with a public repository

Create a Pack-controlled organization with at least two individual adult owners, require 2FA, and use a role email address for administrative notifications. Each person uses their own account; administrators do not share a GitHub login or recovery codes. The website repository remains public because GitHub Pages is available for public repositories on GitHub Free for organizations.

Create `CubScoutPack862/cspack862` as a new public organization repository from the verified current source tree. Do not transfer `lionme90/cspack862`, add it as a deployment remote, or import any of its refs, tags, or commits. The legacy repository remains private and outside the deployment path. Rename the production branch to `main` before enabling its protection so the human-facing convention is clear; the existing workflow already discovers the repository's actual default branch.

Configure the production branch to require a pull request, one approval, conversation resolution, and the workflow's build/check result; block force pushes and deletion. Keep only the two owners as administrators initially and add contributors through a team with the lowest useful permission.

Alternatives considered:

- **Personal repository:** fewer setup steps, but it fails the continuity requirement and couples the site to one volunteer.
- **Private organization repository:** unnecessary for a website whose source and built output are intended to be public, and it can change the Pages plan requirements.

### 2. Deploy with the existing Pages custom workflow

In repository **Settings → Pages**, select **GitHub Actions** as the publishing source. Keep the existing build/deploy separation and scoped permissions: the build job has read-only repository access; only the deploy job receives `pages: write` and `id-token: write`; the `github-pages` environment reports the deployed URL. Do not store a GitHub token, domain credential, or AWS key in the repository because Pages uses GitHub's OIDC-supported deployment path.

Run the first deployment on the GitHub-provided URL before attaching the custom domain. Confirm that the Pages output has root-path behavior for the eventual custom domain and that the workflow's production build receives the origin and base path from `configure-pages`.

Alternatives considered:

- **Deploy from a checked-in branch such as `gh-pages`:** duplicates generated output in source control and bypasses the already verified custom workflow.
- **Third-party deploy action:** adds credentials and supply-chain surface without a current need.

### 3. Register and operate the domain independently of the website host

Leadership selects an available domain after checking spelling, renewal price, transfer policy, privacy service, and support. Register it in a Pack-controlled registrar account using a role email, two individual administrators where supported, MFA, auto-renew, a current Pack-controlled payment method, and a calendar reminder at least 60 and 30 days before expiry. Store the registrar, registrant, renewal date, recovery owner, and DNS provider in a private Pack credential inventory—not in Git.

Use the registrar's authoritative DNS or another deliberately selected managed DNS provider. There is no requirement for AWS Route 53. Keep DNS records minimal and avoid wildcard records. Before changing web traffic, verify the apex domain from the GitHub organization's **Settings → Pages** screen by publishing GitHub's generated `_github-pages-challenge-<organization>` TXT record; retain that record after verification.

### 4. Use the apex domain as canonical and `www` as its alias

The default canonical hostname is the short apex form, such as `example.org`; `www.example.org` exists as the alternate. If leadership prefers `www`, the same design works with the direction reversed, but that choice must be made before the repository custom-domain setting is saved.

Sequence the connection as follows:

1. Verify the apex domain at the organization level with GitHub's generated TXT value and retain it.
2. Add the chosen canonical hostname to the repository's Pages settings before pointing public DNS at Pages.
3. At the authoritative DNS provider, point the apex to the current GitHub Pages apex records (GitHub currently documents four IPv4 `A` targets; optional IPv6 `AAAA` targets may also be used). Copy the current values from GitHub's documentation during execution rather than treating this plan as a permanent IP registry.
4. Point `www` with a `CNAME` directly to `<organization>.github.io`, without a repository path.
5. Remove conflicting apex, `www`, forwarding, parking, and wildcard records. Keep unrelated mail records intact.
6. Wait for GitHub to recognize the DNS and issue the certificate, then enable **Enforce HTTPS**.

GitHub Pages performs the apex/`www` redirect when both are correctly configured and one is selected as the custom domain. The static build uses `/` as its production base path and the canonical HTTPS origin for canonical/social metadata.

### 5. Do not put CloudFront in front of GitHub Pages

GitHub Pages already supplies managed static delivery and TLS for this use case. Adding CloudFront would introduce an AWS account, a CloudFront distribution, an ACM certificate in the required region, alternate-domain configuration, DNS aliasing, origin-host/header behavior, caching and invalidation rules, error-response behavior, log/privacy decisions, billing alerts, and a second incident surface. It also complicates GitHub's custom-domain verification and generated-origin behavior.

CloudFront becomes a separate architecture proposal only if the Pack later needs a capability Pages cannot provide, such as AWS-native access controls, edge functions, specialized cache policies, a web application firewall, or consolidation with other AWS-hosted properties. In that case, prefer an AWS-native static origin (normally a private S3 bucket with origin access control) instead of treating GitHub Pages as the long-term CloudFront origin.

The user's reference to “CloudFront” may also have meant “Cloudflare.” Cloudflare Registrar/DNS can be evaluated as a registrar/DNS provider, but its reverse-proxy mode is not required. If Cloudflare DNS is selected, begin with GitHub-facing records set to DNS-only until Pages domain and certificate setup is complete; adding proxy behavior would be a deliberate follow-up.

### 6. Make privacy/content approval a hard launch gate

The private completed questionnaire, the `publish-approved-brochure-content` change, and the public launch checklist govern content decisions. Before public announcement, leadership must specifically approve or withhold:

- the exact public domain and Pack identity;
- public contact addresses, leader names, phone numbers, and social links;
- season dates, fees, payment/assistance details, meeting details, registration routes, and calendar destinations;
- every public image and its approved Brand Assets provenance; Pack/family/youth photographs remain withheld;
- downloadable documents, with the private orientation guide withheld from the tree, new public-repository history, and build.

Approval evidence records the item, decision, approver, and date in a Pack-controlled private location. The public repository may record that an item is approved and a non-sensitive reference identifier, but not private consent evidence or credentials.

### 7. Verify production from the public edge and document recovery

After DNS and HTTPS settle, verify from outside an authenticated GitHub session:

- the GitHub Actions deployment is green and points to the expected revision;
- apex and `www` both resolve and one redirects to the canonical HTTPS origin;
- the certificate covers the host and is trusted;
- Home, About, Join, Activities, Calendar, Resources, Contact, and approved static assets load without a project subpath, while the private PDF is absent;
- canonical/Open Graph URLs use the production hostname;
- a nonexistent path returns the designed 404 experience;
- no unresolved private values or unapproved images are present;
- the site passes a mobile/keyboard smoke test and has no browser console or mixed-content errors.

Use a lightweight external HTTPS monitor for the canonical home page and, if available without adding sensitive data, the deployment status. Send alerts to at least two administrators and alert on domain/registrar renewal separately. Quarterly, confirm administrator access, recovery contacts, DNS ownership, certificate health, and the most recent successful deployment.

Recovery is source-first: revert the faulty commit through a reviewed pull request (or revert the merge commit), let the same Pages workflow deploy it, and verify the canonical domain. DNS rollback is reserved for DNS/provider incidents and uses the previously recorded known-good DNS values. Do not delete the old repository, Pages setting, or DNS records until the new path is verified.

## Risks / Trade-offs

- **[Free-tier feature or policy changes]** → Keep the deployment portable as static `dist/` output, document current settings, and reassess hosting if GitHub's terms change.
- **[Domain takeover during configuration or later repository removal]** → Verify the domain at organization level first, retain the TXT record, avoid wildcard DNS, and remove stale DNS before disabling Pages.
- **[DNS or certificate propagation delays]** → Use a moderate TTL before cutover, allow up to the provider-documented propagation window, verify each record independently, and announce only after HTTPS is enforced.
- **[Single-person lockout]** → Maintain two owners for GitHub and each production-critical external account, individual MFA, separate recovery paths, and a private ownership inventory.
- **[Public repository leaks private data]** → Require review and automated validation, keep secrets/consent records outside Git, verify the current source tree, and initialize the public repository without legacy refs or history.
- **[Unredacted PDF or youth media creates a privacy incident]** → Treat both as explicit launch gates and withhold them when approval is absent.
- **[Branch protection blocks the first setup change]** → Establish the default branch and a known-green workflow first, then enable required status checks using their actual GitHub names.
- **[Existing dirty local state diverges from the remote]** → Reconcile and review every local change before repository transfer or initial production push; do not discard the existing archive or verification edits.
- **[Registrar/DNS provider choice adds lock-in]** → Keep standard DNS records, record transfer/auth-code ownership privately, and select on renewal/support/security rather than an introductory price alone.

## Migration Plan

### Phase 0: Resolve human-owned inputs

1. Name the primary and secondary administrators and leadership launch approver.
2. Approve the organization slug, public repository name, production branch (`main`), domain, canonical hostname, registrar/DNS provider, payment owner, alert destination, and private credential-inventory location.
3. Complete the content/privacy decisions in the existing gap register; choose withhold-by-default for anything unresolved.

### Phase 1: Establish Pack-controlled source

1. Review and reconcile the current dirty working tree, verify restricted paths and values are absent, and prepare the approved current source tree for an independent public-repository initialization.
2. Create and secure the GitHub Free organization, invite the second owner, require 2FA, and create contributor teams.
3. Create and push `CubScoutPack862/cspack862` from the verified current source as a new history; never import legacy refs, tags, or commits.
4. Rename/set `main` as default, verify the remote, enable Actions, and configure branch protection after the real check names exist.

### Phase 2: Prove Pages before DNS

1. Select GitHub Actions as the Pages source.
2. Run the existing workflow on the production branch and fix only launch-specific configuration defects.
3. Smoke-test the GitHub-provided Pages URL and record the known-good revision.

### Phase 3: Acquire and connect the domain

1. Register the approved domain with Pack-controlled billing, MFA, recovery, auto-renew, and private inventory records.
2. Verify the domain at organization level with the generated GitHub TXT record.
3. Save the canonical hostname in the repository Pages settings, then configure apex and `www` DNS records from GitHub's current instructions.
4. Wait for DNS and certificate issuance, enable HTTPS, and confirm the redirect/canonical behavior.

### Phase 4: Launch and operate

1. Run the full public-edge, privacy, content, mobile, and workflow launch checklist.
2. Obtain the named leadership go-live approval and announce only the canonical HTTPS URL.
3. Enable availability and renewal alerts, store the launch record privately, and perform a second-administrator handover drill.
4. Review access, renewal, DNS, deployment, content freshness, and privacy at least quarterly and at every leadership transition.

### Rollback

If application content or layout is defective, revert the responsible source change through the protected-branch workflow and redeploy. If only the custom domain is defective, keep the GitHub-provided Pages URL available while correcting DNS; restore recorded known-good records when necessary. Do not move traffic to a new CDN, delete the repository, or remove domain verification as an emergency shortcut.

## Open Questions

These inputs are intentionally deferred to the named human owners because their exact values do not change the architecture or task ordering:

- Final GitHub organization slug and repository name.
- Final available domain and whether leadership prefers apex or `www` as canonical (apex is the default recommendation).
- Registrar and authoritative DNS provider.
- Names of the two administrators, leadership approver, billing owner, and monitoring recipients.
- Private systems used for account-recovery inventory and approval evidence.

## Authoritative References

- [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Managing a custom domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Verifying a custom domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
- [Managing protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches)
- [Keeping a GitHub organization secure](https://docs.github.com/en/organizations/keeping-your-organization-secure)
- [Amazon CloudFront origin settings](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistValuesOrigin.html)
