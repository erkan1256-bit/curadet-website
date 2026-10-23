# CURADET Center — Runtime Decision Record

## Current requirement
The mail bridge must support outbound IMAP over TLS (993) and outbound SMTP over TLS (465 or 587), keep mailbox credentials outside GitHub/frontend, and expose only the CURADET Center API through a protected HTTPS endpoint.

## Verified provider constraints (23 Oct 2026)
- Render Free web services are not suitable for the full bridge because free instances cannot send outbound traffic on SMTP ports 25, 465 or 587.
- Fly.io is technically suitable for a small containerized service but is metered/paid; current public pricing lists a shared-cpu-1x 256 MB machine at approximately $2.19/month before any additional applicable resource/network charges.
- Railway can run the container but ongoing Hobby use is paid; current public support information identifies Hobby at $5/month with included usage credit.

## Decision
Do not deploy to a provider until owner approval is given for any recurring cost/account commitment.

Until then, keep the implementation provider-neutral. The repository contains:
- Dockerfile
- docker-compose.yml
- health/readiness endpoints
- bearer-token API protection
- rate limiting and security headers
- CI build and runtime smoke tests

## Production boundary
Real mailbox passwords, recovery codes, 2FA secrets and CURADET_CENTER_TOKEN must never be committed to GitHub, placed in frontend code, pasted into chat, or written to application logs. They must be entered directly into the selected private runtime's secret/environment manager by the owner.
