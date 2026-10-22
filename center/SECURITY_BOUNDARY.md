# CURADET Center Security Boundary

CURADET Center mail access is private infrastructure, not a public website feature.

## Public side

The public GitHub Pages site may display only public contact addresses and non-sensitive status labels. It must never contain mailbox passwords, API bearer tokens, TOTP secrets, backup codes, raw mail content, IMAP credentials, or SMTP credentials.

## Private side

The mail bridge must run in a private server runtime with HTTPS and authenticated CURADET Center access. Secrets are supplied only through private environment variables or a secret manager.

## Mandatory production controls

- HTTPS only
- authenticated session before mail API access
- CSRF protection for state-changing actions
- rate limiting
- audit logging without message bodies or credentials
- secret rotation procedure
- least-privilege server access
- backups encrypted at rest
- no client-side mailbox password storage

Until those controls and real-runtime tests are complete, the integration remains a prototype and must not be merged as a live mailbox feature.
