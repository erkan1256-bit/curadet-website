import test from 'node:test';
import assert from 'node:assert/strict';

test('Spacemail connector module loads with safe dummy configuration', async () => {
  process.env.INFO_EMAIL = 'info@curadet.com';
  process.env.INFO_PASSWORD = 'test-only-not-a-real-password';
  process.env.SYNC_EMAIL = 'sync@curadet.com';
  process.env.SYNC_PASSWORD = 'test-only-not-a-real-password';
  process.env.RIGHTS_EMAIL = 'rights@curadet.com';
  process.env.RIGHTS_PASSWORD = 'test-only-not-a-real-password';

  const connector = await import('../src/spacemail.mjs');
  assert.equal(typeof connector.listInbox, 'function');
  assert.equal(typeof connector.readMessage, 'function');
  assert.equal(typeof connector.sendMail, 'function');
});

test('mail configuration defaults to secure Spacemail endpoints', async () => {
  const { mailConfig } = await import('../src/accounts.mjs');
  assert.equal(mailConfig.imap.host, 'mail.spacemail.com');
  assert.equal(mailConfig.imap.port, 993);
  assert.equal(mailConfig.imap.secure, true);
  assert.equal(mailConfig.smtp.host, 'mail.spacemail.com');
  assert.equal(mailConfig.smtp.port, 465);
  assert.equal(mailConfig.smtp.secure, true);
});
