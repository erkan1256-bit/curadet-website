# CURADET Platform Architecture

## Status
CORE / ACTIVE BUILD BASELINE

## Product Definition
CURADET.com is the primary commercial, production, publishing and listening platform of CURADET, not merely a corporate website.

CURADET has two connected production sources:
1. CURADET Originals / CURADET-owned or controlled productions.
2. Music produced or co-produced by CURADET for outside artists, performers, writers, composers, producers, brands, institutions, film/TV, advertising, games, events and other projects.

CURADET is not a blind third-party catalog aggregator. External work enters production/catalog only through explicit rights, contract, contribution, provenance, metadata and publication authority gates.

## North-Star Value Chain
NEED / IDEA → BRIEF → CURADET PRODUCTION or CO-PRODUCTION → MUSIC ANALYSIS → HUMAN QC → MASTER → RIGHTS / CONTRACT / CONTRIBUTIONS / PROVENANCE → METADATA → CATALOG DECISION → CURADET PUBLICATION → LISTENING / SUBSCRIPTION / LICENSING → REVENUE / PERFORMANCE → LEARNING → NEW PRODUCTION.

## Bottom-Up Build Order
The platform is built from infrastructure to user-facing experience. Upper layers must not pretend lower layers exist.

### L0 — Truth, Governance & Audit
- Single Source of Truth and versioned architecture.
- Immutable identifiers for users, works, recordings, releases, contracts, entitlements, orders and projects.
- Audit events for material state changes.
- Environment separation: local/dev/staging/production.
- Secrets never stored in the public repository.

### L1 — Data & Domain Core
Canonical entities:
- User / Account / Role
- Creator / Artist / Client / Organization
- Work (composition/lyrics)
- Recording / Master / Alternate / Stem
- Release / Album / Collection / Playlist
- CatalogEntry / Müzik Pınarı
- ProductionProject / Brief / Revision
- Contribution / Split / Provenance
- RightsClaim / License / Territory / Media / Duration / Exclusivity
- SubscriptionPlan / Subscription / Entitlement
- Product / Price / Order / Payment / Refund / Invoice
- PlaybackEvent / Favorite / LibraryItem / Queue / History
- VisualDNA / MusicDNA / AnalysisResult

Every media/catalog record must carry source class: `curadet_original`, `client_original`, `co_production`, or rights-verified `licensed_or_external` if later approved.

### L2 — Identity, Security & Privacy
- Secure account creation/sign-in.
- Email/passkey/2FA capable architecture.
- Session/device management and recovery.
- RBAC/ABAC for Owner, staff, creators/clients, subscribers and B2B roles.
- Rate limiting, abuse/fraud controls, audit logs.
- Private customer briefs, unreleased audio and identity data never exposed through public storage.

### L3 — Rights, Contracts & Provenance
No publication, delivery or monetization without verified authority.
- Ownership and contribution splits.
- AI/human contribution/provenance records.
- Contract versions and acceptance/signature evidence.
- License scope: media, territory, duration, exclusivity, usage and restrictions.
- Rights state machine and conflict/hold state.
- Exclusive-lock registry and similarity/collision review for protected identities.

### L4 — Music Asset & Storage Layer
- Original source, master, preview, instrumental, stems and alternates separated.
- Content hash/version for final artifacts.
- Private object storage for protected assets.
- Signed expiring delivery links.
- Public streaming derivative separated from downloadable master.
- Backup/restore verification.

### L5 — Production Engine
Brief → Accepted → Production → Analyzer → Human QC → Preview → Revision → Approval → Master → Rights/Metadata Gate → Catalog/Delivery.

Supports CURADET Originals and external client/co-production workflows without mixing ownership assumptions.

### L6 — Catalog & Publishing Core
Müzik Pınarı is the single canonical catalog source.
- Works, recordings, releases, albums and collections.
- Publication state and availability windows.
- Search/discovery metadata.
- Credits, lyrics where authorized, artwork/Visual DNA.
- Rights-aware visibility and regional/entitlement rules.
- No parallel music catalog.

### L7 — Playback Platform
- Persistent player independent from navigation routes.
- Play/pause, seek, previous/next, volume, queue.
- Now Playing and album/work context.
- Playback authorization/entitlement checks where required.
- Favorites, library and listening history.
- Playback events designed for privacy-aware analytics.
- Web/PWA first; architecture must allow later native apps.

### L8 — Subscription & Commerce
Subscription is part of the listening product, not only a payment page.
- Plans/prices remain configurable; no unverified fixed price in core.
- Subscription lifecycle: trial if approved, active, grace/past-due, cancelled, expired.
- Entitlements separated from payment provider implementation.
- Payment intents/webhooks must be idempotent.
- Orders, invoices, refunds and enterprise billing.
- Payment provider remains replaceable until separately verified and selected.

### L9 — Licensing / Sync / B2B
- Rights-eligible tracks expose a natural License/Sync path without disrupting listening.
- Brief-based custom production.
- Film/TV, advertising, trailer, game, brand, event and enterprise workflows.
- B2C subscription and B2B licensing share verified rights/metadata sources but remain distinct user journeys.

### L10 — Intelligence & Learning
- Music Analyzer feeds QC and discovery, not noisy technical UI.
- Music Brain supports production decisions.
- Music/Emotion/Color/Visual/Motion DNA supports artwork and living interface.
- Performance, listening, subscription and licensing outcomes feed controlled learning.
- AI does not bypass human/rights/security gates.

### L11 — Public Experience
CURADET PUBLIC = living music platform, not slogan-heavy landing page.
Primary surfaces:
- Discover / Home
- Search
- Müzik Pınarı / Library
- New Releases
- Collections
- Genres / Emotions / Worlds
- Albums / Works / Projects
- Now Playing / Queue
- Favorites / History
- Account / Subscription
- License / Sync
- Production request / project entry

Music appears before corporate explanation. Large decorative slogans and manifesto copy do not dominate the platform UI.

### L12 — Private Control Center
Secure operational face for CURADET:
- production pipeline
- Analyzer/QC
- masters/assets
- rights/contracts/provenance/metadata
- catalog/publication
- subscriptions/entitlements/commerce
- B2B/licensing
- Visual DNA/social publishing
- analytics/learning
- system health/security/audit

The Control Center is an interface to the core, not the core itself.

## Core State Machines
### Production Project
BRIEFED → ACCEPTED → PRODUCTION → ANALYSIS_QC → PREVIEW → REVISION → APPROVED → MASTERED → RIGHTS_METADATA_GATE → CATALOG_OR_DELIVERY.

### Catalog Publication
DRAFT → QC_PASSED → RIGHTS_CLEARED → METADATA_READY → SCHEDULED → PUBLISHED → PAUSED/WITHDRAWN.

### Subscription
PENDING → ACTIVE → GRACE/PAST_DUE → CANCELLED/EXPIRED; restoration only through verified entitlement rules.

### Order
DRAFT → AWAITING_CONTRACT → AWAITING_PAYMENT → PAID → IN_PRODUCTION/READY → DELIVERED → COMPLETED; exceptional CANCELLED/REFUNDED/DISPUTED.

### License
DRAFT → REVIEW → APPROVED → ACTIVE → EXPIRED/TERMINATED/SUPERSEDED.

### Exclusive Work
PENDING → VERIFIED → PROTECTED → RETIRED only through authorized rights process.

## Non-Negotiable Guarantees
1. No final protected download without valid entitlement/license.
2. No paid entitlement without verified payment or approved zero-cost/enterprise authority.
3. No publication without rights/provenance/metadata gate.
4. CURADET production does not automatically mean CURADET owns all rights; ownership/splits are explicit per project.
5. Exclusive protected works are removed from conflicting resale/use paths.
6. Sensitive files and secrets never live in the public repository.
7. Final artifacts are versioned/hashed and bound to their project/release/license records.
8. Rejected experiments are not silently promoted to catalog/master/core truth.
9. Public and private/admin security boundaries remain separate.
10. No layer may claim completion without passing its own tests and lower-layer dependencies.

## Deployment Direction
The existing GitHub Pages surface remains transitional public presentation only. Authentication, subscriptions/payments, contracts, private media, entitlements, protected streaming/delivery and operational data require a secure server-side application/API and private storage before real customer or payment data is accepted.

Local/notebook infrastructure remains the preferred CURADET control/core direction; cloud services may be replaceable support layers for public access, scale, delivery, backup and payment integrations.

## Build Gates
Each layer passes: source verification → implementation → unit/integration tests → security/privacy checks → auditability → rollback/recovery where applicable → recorded version/commit.

NO PASS → NO UPPER-LAYER CLAIM.

## Definition of Done
CURADET platform is not complete until real end-to-end test users can securely:
1. create/sign into an account;
2. discover and continuously play authorized CURADET catalog music;
3. subscribe through a verified sandbox/production payment flow and receive correct entitlements;
4. favorite/save/history/queue music under their account;
5. request a new CURADET production or co-production;
6. move an approved project through brief, production, QC, rights, metadata and delivery/publication;
7. license an eligible work through the correct B2B flow;
8. receive protected files only through authorized expiring delivery;
9. see the correct records in their account/project area;
10. allow CURADET operators to verify the complete chain in Control Center audit logs.

## Active Continuation Point
Build begins at L0/L1: verify existing backend/data structures against this domain model, preserve working code, remove only proven conflicts, then implement missing canonical entities and tests before moving upward.
