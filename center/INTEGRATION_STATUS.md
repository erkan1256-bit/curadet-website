# CURADET Center — Integration Status

## Status
READY FOR PRIVATE RUNTIME DEPLOYMENT / REAL CREDENTIAL VERIFICATION

## Verified
- Spacemail integration architecture is IMAP/SMTP based.
- Three mailbox mappings exist: info, sync, rights.
- Inbox listing, message reading and SMTP send modules are implemented.
- API is protected with bearer-token authentication.
- Input validation is covered by automated tests.
- Real `.env`, credentials and logs are excluded by repository rules/tests.
- Runtime security headers and in-memory API rate limiting are enabled.
- `/health` liveness endpoint exists.
- `/ready` verifies required runtime configuration is present without exposing secret values.
- Docker image builds successfully in GitHub Actions.
- Container binds correctly for Docker runtime while Compose publishes only to host loopback by default.
- Real container smoke test passes for `/health`, `/ready`, unauthorized `401`, and authorized `200` API access.
- Provider-neutral `docker-compose.yml` is available.

## Not yet verified
- Real IMAP authentication against info@curadet.com.
- Real IMAP authentication against sync@curadet.com.
- Real IMAP authentication against rights@curadet.com.
- CURADET Center reading real inbox data through the bridge.
- Real message body retrieval through the bridge.
- Real SMTP sending through the bridge.
- Production TLS/reverse proxy and final private runtime deployment.

## Owner boundary
A recurring-cost/private runtime must be selected and approved before deployment. Real mailbox passwords and CURADET_CENTER_TOKEN must be entered directly into that runtime's secret manager by the owner and must never be pasted into chat, GitHub, frontend source, or application logs.
