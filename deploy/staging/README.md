# CURADET integrated staging candidate
Run from a clean checkout. Prepare public files using scripts/package_self_hosted.py in a new outside directory and copy only its public directory into deploy/staging/public. Never mount the repository as the web root.
Set DB_PASSWORD to a strong URL-safe random secret via environment or an ignored local .env. Configure approved identity introspection and media signer services separately. Do not commit credentials.
Run docker compose -f deploy/staging/compose.yml up --build. The service listens on loopback only (8088). Check /health, /ready, /v1/catalog and the music page. Database migration runs before API. This is not a production deployment. No payment provider, DNS, identity login UX or private master delivery is configured by this package.
