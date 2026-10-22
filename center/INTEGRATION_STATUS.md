# CURADET Center — Mail Integration Status

## Verified externally

- Spacemail supports IMAP and SMTP.
- IMAP host: `mail.spacemail.com`, port `993`, SSL/TLS.
- SMTP host: `mail.spacemail.com`, port `465`, SSL/TLS.
- SMTP port `587` with STARTTLS is also supported by Spacemail.

## Implemented in this branch

- Secure server-side account mapping for `info`, `sync`, and `rights`.
- IMAP inbox listing.
- IMAP message reading.
- SMTP message sending.
- Authenticated API endpoints.
- Environment-only secret handling.
- Public frontend kept separate from mailbox credentials.

## Not yet validated in real runtime

- Login to the three real Spacemail mailboxes through the bridge.
- Live inbox synchronization through CURADET Center.
- Live sending through the bridge.
- Production authentication/session layer.
- Private hosting/reverse proxy.

No item above should be reported as live until real-runtime validation succeeds.
