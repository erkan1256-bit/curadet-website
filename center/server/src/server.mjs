import express from 'express';
import crypto from 'node:crypto';
import { listInbox, readMessage, sendMail } from './spacemail.mjs';

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '256kb' }));

const PORT = Number(process.env.PORT || 8787);
const TOKEN = process.env.CURADET_CENTER_TOKEN;
if (!TOKEN) throw new Error('CURADET_CENTER_TOKEN is required');

function timingSafeEqualText(a, b) {
  const aa = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  if (aa.length !== bb.length) return false;
  return crypto.timingSafeEqual(aa, bb);
}

function requireAuth(req, res, next) {
  const header = req.get('authorization') || '';
  const supplied = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!supplied || !timingSafeEqualText(supplied, TOKEN)) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  next();
}

function validAccount(value) {
  return ['info', 'sync', 'rights'].includes(value);
}

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'curadet-center-mail-bridge' });
});

app.use('/api', requireAuth);

app.get('/api/mailboxes', (_req, res) => {
  res.json([
    { id: 'info', address: 'info@curadet.com', unit: '00 — CURADET MERKEZ' },
    { id: 'sync', address: 'sync@curadet.com', unit: '05 — Sync & B2B' },
    { id: 'rights', address: 'rights@curadet.com', unit: '04 — Haklar & Dağıtım' }
  ]);
});

app.get('/api/:account/inbox', async (req, res) => {
  if (!validAccount(req.params.account)) return res.status(404).json({ error: 'unknown_mailbox' });
  try {
    const limit = Math.min(Math.max(Number(req.query.limit || 25), 1), 100);
    res.json(await listInbox(req.params.account, limit));
  } catch (error) {
    console.error('Inbox error:', error.message);
    res.status(502).json({ error: 'mail_provider_error' });
  }
});

app.get('/api/:account/message/:uid', async (req, res) => {
  if (!validAccount(req.params.account)) return res.status(404).json({ error: 'unknown_mailbox' });
  const uid = Number(req.params.uid);
  if (!Number.isInteger(uid) || uid < 1) return res.status(400).json({ error: 'invalid_uid' });
  try {
    const message = await readMessage(req.params.account, uid);
    if (!message) return res.status(404).json({ error: 'message_not_found' });
    res.json(message);
  } catch (error) {
    console.error('Read error:', error.message);
    res.status(502).json({ error: 'mail_provider_error' });
  }
});

app.post('/api/:account/send', async (req, res) => {
  if (!validAccount(req.params.account)) return res.status(404).json({ error: 'unknown_mailbox' });
  const { to, subject, text, html } = req.body || {};
  if (!to || !subject || (!text && !html)) return res.status(400).json({ error: 'missing_fields' });
  try {
    const result = await sendMail(req.params.account, { to, subject, text, html });
    res.status(202).json(result);
  } catch (error) {
    console.error('Send error:', error.message);
    res.status(502).json({ error: 'mail_provider_error' });
  }
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`CURADET Center mail bridge listening on 127.0.0.1:${PORT}`);
});
