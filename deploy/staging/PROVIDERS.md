# CURADET integrated provider candidate

The optional compose.providers.yml adds persistent Keycloak and S3-compatible MinIO services to the same staging stack. These are loopback-only development services, NOT production configuration. Do not expose Keycloak start-dev or the storage console publicly.

Set KC_ADMIN_USER, KC_ADMIN_PASSWORD, KC_PUBLIC_URL, S3_ADMIN_USER and S3_ADMIN_PASSWORD via a local secret environment (never commit them). Use the base compose.yml together with compose.providers.yml. Create a dedicated realm, confidential introspection client and API audience; provision matching account subject IDs in PostgreSQL. The existing API requires HTTPS introspection with issuer/audience/expiry validation. A trusted TLS endpoint and browser authorization-code/PKCE integration remain necessary.

Create a private listening-only bucket and least-privilege service credentials. Never put masters in the listening bucket. The API currently expects an HTTPS media signing gateway (MEDIA_SIGNER_URL and MEDIA_SIGNER_TOKEN); direct S3 signing and actual audio ingestion are not yet connected.

Payment remains disabled until the owner selects an approved merchant provider and its sandbox credentials are configured. Do not activate subscriptions based on browser redirects; only authenticated, reconciled provider events can call the internal subscription service.

Acceptance: real login and logout, disabled-account denial, entitled audio playback and range requests, revoked entitlement denial, provider sandbox payment/replay/refund tests, fresh installation from the archive. None is implied by merely starting the provider containers.
