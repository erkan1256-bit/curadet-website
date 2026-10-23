# CURADET Center — Mail Integration Status

## Completed in prototype branch

- CURADET Center communication UI prototype
- Server-side Spacemail IMAP connector
- Server-side Spacemail SMTP sender
- Mailbox mapping:
  - info@curadet.com → 00 — CURADET MERKEZ
  - sync@curadet.com → 05 — Sync & B2B
  - rights@curadet.com → 04 — Haklar & Dağıtım
- Authenticated private API surface
- Input validation for mailbox id, inbox limit, message UID and send payload
- Secret boundary: real credentials excluded from Git repository
- Automated unit tests
- Secret-handling safety tests
- Dependency/module smoke tests
- GitHub Actions CI
- Production Docker image definition

## Verified

- Local validation/security tests: 7/7 passed
- GitHub Actions dependency installation: passed
- GitHub Actions test suite: passed
- Spacemail connector module load: passed
- Production Docker container build: passed

## Not yet verified in real runtime

- Login to the three real Spacemail mailboxes through the connector
- Reading a real inbox through CURADET Center
- Reading a real message through CURADET Center
- Sending a real message through CURADET Center SMTP bridge
- Private server deployment and TLS/reverse-proxy configuration

## Required owner-side action before live verification

A private runtime must exist and the three mailbox credentials plus a generated CURADET_CENTER_TOKEN must be entered there securely. Credentials must never be sent through chat or committed to GitHub.

Status: READY FOR PRIVATE RUNTIME DEPLOYMENT / REAL CREDENTIAL VERIFICATION.
