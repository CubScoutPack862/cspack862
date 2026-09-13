## Why

The Pack 862 site is implemented and locally verified, and the Pack now has the public `CubScoutPack862/cspack862` repository plus the Cloudflare-registered `cspack862.org` domain. The remaining launch work must establish a safe production path and an independently publishable staging environment without allowing staging deployments to replace the public site.

## What Changes

- Finish securing the existing Pack-controlled GitHub Free organization and public `CubScoutPack862/cspack862` repository with at least two owners, least-privilege contributor access, protected changes, and documented recovery ownership.
- Initialize `git@github.com:CubScoutPack862/cspack862.git` from a verified current source tree that excludes restricted documents and private candidate values; do not import legacy Git history or refs; then enable the existing GitHub Actions workflow as the production GitHub Pages source.
- Use a two-branch source workflow: feature changes enter protected `develop`, approved releases merge from `develop` to protected `main`, and urgent production fixes are merged back into `develop` after release.
- Publish `main` automatically to the production Pages site at `https://www.cspack862.org`, with `https://cspack862.org` redirecting to the canonical `www` hostname after GitHub verification, Cloudflare DNS configuration, and certificate issuance.
- Create a separate public `CubScoutPack862/cspack862-staging` Pages repository because GitHub supports only one Pages site per repository. A manually triggered staging workflow will build the source repository's `develop` branch for `/cspack862-staging/` and publish it to `https://cubscoutpack862.github.io/cspack862-staging/` only when review is needed.
- Allow an administrator to unpublish the staging Pages site after review without deleting the staging repository, then re-enable Pages and manually publish the current `develop` revision when staging is needed again.
- Define launch gates for content/privacy approval, production build validation, DNS and redirect checks, rollback, monitoring, domain renewal, and maintainer handover.
- Use GitHub Pages directly as the production host and CDN. Do not put Amazon CloudFront in front of GitHub Pages for the baseline launch; it adds a second CDN, AWS billing and certificate management, cache invalidation, and another operational account without a current requirement. If CloudFront-only capabilities are later required, evaluate an AWS-native origin such as private S3 as a separate architecture change rather than layering it onto Pages.
- Preserve the established Astro + Markdown + GitHub Actions + GitHub Pages architecture; this change completes its external production setup rather than replacing it.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `site-delivery`: Extend delivery requirements from deployment-ready output to separate production and on-demand staging Pages sites with protected promotion, a verified custom production domain, HTTPS, governance, launch validation, rollback, and operational continuity.

## Impact

- **Repositories:** A newly initialized production source repository at `CubScoutPack862/cspack862`, a new generated staging Pages repository, local remotes, repository visibility, Pages settings, Actions permissions, `main`/`develop` branch rules, and workflow configuration. Legacy repository history is not transferred.
- **External systems:** The existing GitHub organization and Cloudflare registrar/DNS account, GitHub domain verification and Pages certificate issuance, and lightweight availability/renewal monitoring.
- **Project files:** The production deployment workflow, a manual staging deployment workflow, branch documentation, and the launch runbook will change; no application backend, database, or runtime service is introduced.
- **Operations and cost:** Both Pages repositories remain public and free-tier compatible, and domain registration remains the recurring cost. Staging is publicly accessible while published and must contain no secrets or unapproved material. AWS/CloudFront cost and operational ownership remain excluded.
- **Security and privacy:** Organization recovery, least privilege, domain-takeover prevention, secret-free static deployment, child-photo consent, public contact approval, and review of the orientation PDF become mandatory launch controls.
