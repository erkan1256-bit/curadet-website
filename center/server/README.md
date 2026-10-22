# CURADET Center Mail Bridge

Status: implemented connector scaffold; not deployed; no mailbox secrets are stored in GitHub.

## Verified provider settings

Spacemail supports IMAP/SMTP access. The bridge uses:
- IMAP: `mail.spacemail.com:993` with SSL/TLS
- SMTP: `mail.spacemail.com:465` with SSL/TLS

The three CURADET mailboxes are mapped as:
- `info` → `info@curadet.com` → 00 — CURADET MERKEZ
- `sync` → `sync@curadet.com` → 05 — Sync & B2B
- `rights` → `rights@curadet.com` → 04 — Haklar & Dağıtım

## Security rules

- Never commit `.env`, mailbox passwords, TOTP seeds, backup codes, or session tokens.
- The bridge binds to `127.0.0.1` by default.
- API routes require a bearer token supplied from server-side secret storage.
- Production deployment must sit behind authenticated CURADET Center access and HTTPS.
- The public `curadet.com` GitHub Pages site must never expose this API directly.

## Local/server setup

1. Copy `.env.example` to `.env` on the private server only.
2. Fill the three mailbox passwords locally.
3. Create a long random `CURADET_CENTER_TOKEN`.
4. Run `npm install` and `npm start`.
5. Place a private authenticated reverse proxy in front of the service before exposing any route beyond localhost.

## API

- `GET /health`
- `GET /api/mailboxes`
- `GET /api/:account/inbox?limit=25`
- `GET /api/:account/message/:uid`
- `POST /api/:account/send`

`account` is one of `info`, `sync`, `rights`.

## Validation level

Code is implemented but has not yet been connected to the real mailbox credentials or deployed to a private runtime. Therefore live IMAP/SMTP integration is **not yet validated**.
