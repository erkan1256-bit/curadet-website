import { ImapFlow } from 'imapflow';
import nodemailer from 'nodemailer';
import { simpleParser } from 'mailparser';
import { accounts, mailConfig } from './accounts.mjs';

function getAccount(key) {
  const account = accounts[key];
  if (!account) throw new Error('Unknown mailbox');
  return account;
}

function createImapClient(account) {
  return new ImapFlow({
    host: mailConfig.imap.host,
    port: mailConfig.imap.port,
    secure: mailConfig.imap.secure,
    auth: { user: account.address, pass: account.password },
    logger: false
  });
}

export async function listInbox(accountKey, limit = 25) {
  const account = getAccount(accountKey);
  const client = createImapClient(account);
  await client.connect();
  try {
    const lock = await client.getMailboxLock('INBOX');
    try {
      const total = client.mailbox.exists || 0;
      if (!total) return [];
      const start = Math.max(1, total - Math.max(1, Math.min(limit, 100)) + 1);
      const messages = [];
      for await (const msg of client.fetch(`${start}:*`, { envelope: true, flags: true, uid: true, internalDate: true })) {
        messages.push({
          uid: msg.uid,
          subject: msg.envelope?.subject || '(Konu yok)',
          from: msg.envelope?.from?.map(v => ({ name: v.name || '', address: v.address || '' })) || [],
          to: msg.envelope?.to?.map(v => ({ name: v.name || '', address: v.address || '' })) || [],
          date: msg.internalDate || msg.envelope?.date || null,
          seen: msg.flags?.has('\\Seen') || false,
          mailbox: account.address,
          unit: account.unit
        });
      }
      return messages.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    } finally {
      lock.release();
    }
  } finally {
    await client.logout().catch(() => {});
  }
}

export async function readMessage(accountKey, uid) {
  const account = getAccount(accountKey);
  const client = createImapClient(account);
  await client.connect();
  try {
    const lock = await client.getMailboxLock('INBOX');
    try {
      const msg = await client.fetchOne(uid, { source: true, envelope: true, uid: true }, { uid: true });
      if (!msg?.source) return null;
      const parsed = await simpleParser(msg.source);
      return {
        uid: msg.uid,
        subject: parsed.subject || '(Konu yok)',
        from: parsed.from?.text || '',
        to: parsed.to?.text || '',
        date: parsed.date || null,
        text: parsed.text || '',
        html: parsed.html || null,
        attachments: (parsed.attachments || []).map(a => ({ filename: a.filename || 'attachment', contentType: a.contentType, size: a.size }))
      };
    } finally {
      lock.release();
    }
  } finally {
    await client.logout().catch(() => {});
  }
}

export async function sendMail(accountKey, { to, subject, text, html }) {
  const account = getAccount(accountKey);
  const transporter = nodemailer.createTransport({
    host: mailConfig.smtp.host,
    port: mailConfig.smtp.port,
    secure: mailConfig.smtp.secure,
    auth: { user: account.address, pass: account.password }
  });
  const info = await transporter.sendMail({
    from: account.address,
    to,
    subject,
    text: text || undefined,
    html: html || undefined
  });
  return { messageId: info.messageId, accepted: info.accepted, rejected: info.rejected };
}
