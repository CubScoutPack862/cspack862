## ADDED Requirements

### Requirement: Pack-controlled production ownership
The production repository, Pages configuration, domain registration, authoritative DNS, and account-recovery information SHALL be controlled on behalf of Pack 862, and each production-critical account SHALL have at least two currently authorized adult administrators.

#### Scenario: A volunteer becomes unavailable
- **WHEN** one repository, registrar, or DNS administrator can no longer serve the Pack
- **THEN** another authorized administrator can access, recover, renew, and operate the production service without using the former volunteer's personal credentials

#### Scenario: A contributor updates public content
- **WHEN** a contributor proposes a website change
- **THEN** the change is reviewed and validated before it can alter the designated production branch

### Requirement: Stable public Pages service
The approved production revision SHALL be published from the Pack-controlled public repository to GitHub Pages, and a failed validation or deployment SHALL NOT replace the last successfully deployed site.

#### Scenario: Production revision passes validation
- **WHEN** an approved change reaches the designated production branch and its required checks pass
- **THEN** the generated static artifact becomes available through the configured GitHub Pages service

#### Scenario: Production revision fails validation
- **WHEN** a proposed production revision fails content validation, tests, or the static build
- **THEN** deployment is blocked and the previously successful public version remains available

### Requirement: Isolated maintainer-operated staging
The source repository SHALL provide a manually triggered GitHub Actions workflow that builds the Pack-controlled `develop` branch and deploys it only to the separate `CubScoutPack862/cspack862-staging` GitHub Pages site. The project SHALL document how a Pack maintainer creates, enables, publishes, reviews, and unpublishes that staging site; the implementation agent SHALL NOT perform those GitHub account actions.

#### Scenario: Maintainer requests review of develop
- **WHEN** an authorized maintainer manually dispatches the staging workflow after configuring the staging repository
- **THEN** the current `develop` revision is validated and, if successful, becomes available only at the staging Pages URL under `/cspack862-staging/`

#### Scenario: Staging review is incomplete
- **WHEN** the staging workflow, review, or launch approval has not completed
- **THEN** no Cloudflare DNS change, custom-domain configuration, or production launch is performed

### Requirement: Verified custom domain and HTTPS
The public site SHALL use one Pack-owned canonical hostname, SHALL be served over valid HTTPS, SHALL redirect the corresponding apex or `www` alias to the canonical hostname, and SHALL prevent an unverified party from claiming the Pack's configured Pages domain.

#### Scenario: Visitor opens the canonical address
- **WHEN** a visitor opens the canonical hostname over HTTPS
- **THEN** the browser receives the Pack 862 site with a valid certificate and generated canonical URLs use that hostname

#### Scenario: Visitor opens the alternate hostname
- **WHEN** a visitor opens the configured apex or `www` alias
- **THEN** the request redirects to the canonical HTTPS hostname without losing the requested site path

#### Scenario: Domain ownership is configured
- **WHEN** administrators connect the Pack domain to GitHub Pages
- **THEN** the domain is verified for the Pack-controlled GitHub organization before DNS is considered launch-ready

#### Scenario: Maintainer configures DNS after staging approval
- **WHEN** the documented staging review is approved
- **THEN** a Pack maintainer follows the guide to verify the domain in GitHub and configure Cloudflare GitHub Pages records in DNS-only mode before enabling HTTPS

### Requirement: Public-launch approval gate
The site SHALL NOT be declared publicly launched until Pack leadership approves the production domain, public contact details, youth media, downloadable documents, calendar destinations, and all season-specific facts identified by the project's launch-confirmation register.

#### Scenario: A required approval is unresolved
- **WHEN** any launch-critical privacy, content, ownership, or domain decision remains unresolved
- **THEN** the public launch is held or the affected material is withheld from the production artifact

#### Scenario: Leadership authorizes launch
- **WHEN** every mandatory launch item has an accountable approver and recorded outcome
- **THEN** administrators may direct public audiences to the canonical production domain

### Requirement: Production verification and recovery
Maintainers SHALL have a documented, repeatable process to verify DNS, HTTPS, redirects, critical routes, deployment status, domain renewal, and public availability, and SHALL be able to restore a known-good site revision through the reviewed repository workflow.

#### Scenario: Launch verification runs
- **WHEN** the custom domain and Pages deployment are enabled or materially changed
- **THEN** maintainers verify DNS records, certificate validity, canonical redirects, critical pages and assets, a missing-page response, and the successful production workflow before announcing completion

#### Scenario: A defective revision reaches production
- **WHEN** maintainers identify a production regression
- **THEN** they can revert the source revision through review and redeploy the last known-good static artifact without a database or server migration

#### Scenario: Domain renewal approaches
- **WHEN** the registrar renewal or payment method requires attention
- **THEN** at least two authorized administrators receive sufficient notice to preserve the public domain without interruption

## MODIFIED Requirements

### Requirement: Delivery documentation and ownership
The project SHALL document the supported runtime, local commands, build output, deployment flow, content review expectations, branch-based contribution model, production repository and branch, isolated staging workflow, maintainer-operated GitHub configuration, Cloudflare DNS-only configuration after staging approval, custom-domain configuration, DNS record purpose, launch verification, rollback process, monitoring and renewal responsibilities, and the Pack-controlled ownership and recovery model without storing account passwords, recovery codes, private consent records, or billing secrets in the public repository.

#### Scenario: Site ownership transfers to another volunteer
- **WHEN** a new technical maintainer reads the repository documentation and the Pack's private credential inventory
- **THEN** they can identify how to run, validate, deploy, verify, roll back, and configure the site; who owns each external account; when the domain renews; and which credentials or external values must remain Pack-controlled and private

#### Scenario: Public repository is inspected
- **WHEN** a visitor reads the repository and its history
- **THEN** no registrar password, DNS-provider secret, GitHub recovery code, billing credential, private consent record, or other production secret is disclosed
