# CURADET Security & Privacy Standard

## Purpose
Protect customer identity, unreleased music, voice files, briefs, contracts, payments, licenses and private delivery assets while preserving a white-label customer experience.

## Core Rules
1. No secrets, private audio, customer briefs, contracts, invoices or credentials in public Git repositories.
2. Passwords are never stored directly; use a modern password hashing function or delegated identity provider. Prefer passkeys/2FA for high-value accounts.
3. Sessions use secure, HttpOnly, SameSite cookies or equivalent hardened token handling. Do not store long-lived bearer tokens in localStorage.
4. Payment card data stays with a PCI-capable payment provider; CURADET stores provider references and verified payment state, not raw card details.
5. Payment webhooks require signature verification, replay protection and idempotency.
6. Private Vault assets use encrypted private object storage and short-lived signed URLs. No permanent public WAV/stem URLs.
7. Final download requires an ACTIVE entitlement tied to the authenticated customer, order and license.
8. Sensitive downloads may require step-up authentication for Silent Client/high-value projects.
9. Every final asset is SHA-256 hashed and versioned; every delivery is audit logged.
10. Customer purchase source is not embedded as an audible watermark or mandatory public metadata field.
11. Private briefs, customer voice files and unreleased material are excluded from training/reuse unless the customer gives explicit, scoped consent.
12. Production staff access follows least privilege. Silent Client projects use restricted role groups and code names.
13. Logs must not contain passwords, raw payment data, private audio URLs, full contract bodies or unnecessary personal data.
14. Backups are encrypted and periodically restore-tested.
15. Account recovery, email changes and payout/billing changes require strong verification and notification.

## Privacy Boundaries
Public: marketing pages, public catalog metadata and public previews intentionally released by CURADET.
Private: user profile, purchase history, contracts, private projects, invoices, entitlement history and vault listing.
Highly Restricted: unreleased masters/stems, voice references, identity-sensitive Silent Client data, contract signatures and exclusive-lock fingerprints.

## Exclusive Protection
When an exclusive work is finalized, its protected fingerprint reference and similarity threshold are registered. Future CURADET productions are checked before final approval. A collision above policy threshold enters human/rights review; it is not automatically delivered to another customer.

## Incident Rules
- Freeze affected entitlement/download paths when compromise is suspected.
- Preserve tamper-evident audit evidence.
- Rotate affected credentials/tokens.
- Notify authorized internal owner and impacted customers where required.
- Document cause, scope, remediation and prevention.

## Release Gate
Real authentication/payment/private delivery is not production-ready until:
- authentication and authorization tests pass,
- payment webhook replay/idempotency tests pass,
- entitlement bypass tests fail closed,
- signed URLs expire correctly,
- cross-account access is denied,
- backup restore is tested,
- audit trail reconstructs order → contract → payment → license → delivery,
- legal/privacy text is reviewed for the launch jurisdictions.
