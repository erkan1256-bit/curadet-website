# CURADET Center — Private Runtime Deployment Checklist

## Already completed

- [x] Server-side IMAP connector prepared
- [x] Server-side SMTP sender prepared
- [x] API bearer-token protection prepared
- [x] Secret files excluded from Git
- [x] Automated tests added
- [x] GitHub Actions CI added
- [x] Production Dockerfile added
- [x] Provider-neutral Docker Compose added
- [x] Runtime security headers added
- [x] API rate limiting added
- [x] `/health` endpoint added
- [x] `/ready` endpoint added
- [x] CI test suite passed
- [x] CI production container build passed
- [x] Real container runtime smoke test passed
- [x] Unauthorized API request returns 401
- [x] Authorized API request returns 200

## Owner approval required

- [ ] Choose/approve a recurring-cost private server or container runtime
- [ ] Create/sign in to provider account if required
- [ ] Configure TLS/reverse proxy or provider-managed HTTPS
- [ ] Generate a long random CURADET_CENTER_TOKEN inside the selected runtime
- [ ] Enter INFO_EMAIL and INFO_PASSWORD directly into runtime secrets
- [ ] Enter SYNC_EMAIL and SYNC_PASSWORD directly into runtime secrets
- [ ] Enter RIGHTS_EMAIL and RIGHTS_PASSWORD directly into runtime secrets
- [ ] Never paste mailbox passwords, 2FA codes or recovery codes into chat, GitHub, frontend code or logs

## Real verification after credentials are entered

- [ ] Real info IMAP login succeeds
- [ ] Real sync IMAP login succeeds
- [ ] Real rights IMAP login succeeds
- [ ] info inbox can be listed through CURADET Center
- [ ] sync inbox can be listed through CURADET Center
- [ ] rights inbox can be listed through CURADET Center
- [ ] One test message can be read per mailbox
- [ ] One controlled test email can be sent per mailbox
- [ ] Logs contain no credentials or message bodies by default
- [ ] UI reports connection failures honestly

Production merge is blocked until the real runtime verification above passes.
