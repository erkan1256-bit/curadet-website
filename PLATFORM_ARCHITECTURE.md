# CURADET Platform Architecture

## Product Definition
CURADET.com is the primary commercial and operational platform of CURADET, not merely a corporate website. Social channels drive discovery and traffic; CURADET.com owns the customer relationship, music discovery, private creation, licensing, contracting, payment, secure delivery and post-sale lifecycle.

## Core Product Flow
Discovery → Account → Music World → Catalog / Private Brief → Rights Check → Contract → Payment → Exclusive Lock (if applicable) → Private Vault → WAV / Stems Delivery → License Record → Support / Revisions → Repeat Purchase.

## Product Surfaces
- Public corporate site
- Music Pınarı catalog
- Smart music search and filtering
- Customer account and Music World
- Private Vault
- Private brief / custom work requests
- Licensing selector
- Checkout and payment status
- Contract center
- Orders, invoices and delivery history
- Exclusive-lock registry
- Support and revision history
- B2B / Silent Client workspace

## Unit Ownership
- 00 Merkez: platform governance, priorities, final operating rules.
- 01 Global Music Watch: external market, technology, regulation and competitor signals.
- 02 Pazarlama & Sosyal: acquisition, brand, campaign and social traffic.
- 03 Müzik Üretim: production and final music quality.
- 03A Deney Atölyesi: experiments and production R&D, never directly trusted as final production without QC.
- 04 Haklar & Dağıtım: rights, contracts, provenance, licensing, exclusivity, metadata, distribution rules.
- 05 Sync & B2B: enterprise, sync, large brands, Silent Client and negotiated licenses.
- 06 Teknoloji: identity, API, payments, storage, security, delivery, observability and platform reliability.

## Non-Negotiable Product Guarantees
1. No final download without a valid entitlement.
2. No active entitlement without successful payment or an approved zero-cost/enterprise contract.
3. Exclusive works are removed from normal resale and entered into the protected-work registry.
4. CURADET must not intentionally regenerate, license or sell the same or confusingly similar protected musical identity to another customer.
5. Customer identity, briefs, unreleased music, voice files and purchase source remain confidential except where disclosure is required by law or explicitly authorized.
6. Publicly delivered audio must not be forced to contain a visible or audible CURADET purchase marker.
7. Every final delivered artifact is versioned, hashed and bound to its entitlement/license record.
8. Sensitive files are never stored in a public web repository.

## Architecture Layers
### 1. Experience Layer
Responsive web/PWA, accessibility, catalog player, smart search, Music World dashboard, private project rooms, contract and checkout interfaces.

### 2. Identity & Access
Email/passkey/2FA capable identity, session management, RBAC/ABAC, Silent Client restricted access, device/session history and recovery flows.

### 3. Commerce
Products, prices, taxes, invoices, payment intents, refunds, order state, enterprise billing and idempotent payment webhooks.

### 4. Rights & Contracts
License templates, signed contract versions, scope, territory, duration, media, exclusivity, ownership split, provenance and legal-audit history.

### 5. Music Asset Platform
Masters, stems, instrumental, alternate mixes, previews, fingerprints, hashes, metadata and delivery packages.

### 6. Exclusive Lock
Protected musical-identity fingerprint, similarity checks on new productions, collision review queue and non-resale enforcement.

### 7. Private Vault
Encrypted object storage, signed expiring download links, per-file access policy, download audit, optional re-authentication before sensitive downloads.

### 8. Production Workflow
Brief → production → QC → rights clearance → customer preview → revision → approval → final master → delivery.

### 9. Observability & Security
Audit logs, security alerts, rate limits, fraud signals, backup/restore verification, deployment health, privacy-event logging and incident response.

## State Machines
### Order
DRAFT → AWAITING_CONTRACT → AWAITING_PAYMENT → PAID → IN_PRODUCTION / READY → DELIVERED → COMPLETED
Exceptional: CANCELLED, REFUNDED, DISPUTED.

### License
DRAFT → APPROVED → ACTIVE → EXPIRED / TERMINATED / SUPERSEDED.

### Private Project
BRIEFED → ACCEPTED → PRODUCTION → PREVIEW → REVISION → APPROVED → LOCKED → DELIVERED.

### Exclusive Work
PENDING → VERIFIED → PROTECTED → RETIRED only by authorized rights process.

## Deployment Direction
The existing GitHub Pages site remains the public presentation layer during transition. Authentication, payments, contracts, private media and entitlement checks must move to a secure server-side application/API before real customer data or payments are accepted.

## Definition of Done
The commercial platform is not complete until a real test customer can securely: create an account, sign in, select/request music, accept the correct contract, pay in a sandbox/approved production flow, receive the correct entitlement, download an authorized WAV through a private expiring link, see the license in Music World, and have the complete chain verifiable in audit logs.