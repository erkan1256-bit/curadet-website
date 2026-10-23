# CURADET Center — Private Runtime Deployment Checklist

## Already completed

- [x] Server-side IMAP connector prepared
- [x] Server-side SMTP sender prepared
- [x] API bearer-token protection prepared
- [x] Secret files excluded from Git
- [x] Automated tests added
- [x] GitHub Actions CI added
- [x] Production Dockerfile added
- [x] CI test suite passed
- [x] CI production container build passed

## Private runtime requirements

- [ ] Choose/provision a private server or container runtime
- [ ] Configure TLS/reverse proxy
- [ ] Generate a long random CURADET_CENTER_TOKEN on the server
- [ ] Enter INFO_EMAIL and INFO_PASSWORD directly on the server
- [ ] Enter SYNC_EMAIL and SYNC_PASSWORD directly on the server
- [ ] Enter RIGHTS_EMAIL and RIGHTS_PASSWORD directly on the server
- [ ] Never paste mailbox passwords, 2FA codes or recovery codes into chat, GitHub, frontend code or logs

## Real verification after credentials are entered

- [ ] Health endpoint returns OK
- [ ] info inbox can be listed
- [ ] sync inbox can be listed
- [ ] rights inbox can be listed
- [ ] One test message can be read per mailbox
- [ ] One controlled test email can be sent per mailbox
- [ ] Logs contain no credentials or message bodies by default
- [ ] UI reports connection failures honestly

Production merge is blocked until the real runtime verification above passes.
