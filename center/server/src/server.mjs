import express from 'express';
import crypto from 'node:crypto';
import { listInbox, readMessage, sendMail } from './spacemail.mjs';
import { validAccount, normalizeLimit, normalizeUid, validSendPayload } from './validation.mjs';

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '256kb' }));

const PORT = Number(process.env.PORT || 8787);
const HOST = process.env.BIND_HOST || '127.0.0.1';
const TOKEN = process.env.CURADET_CENTER_TOKEN;
if (!TOKEN) throw new Error('CURADET_CENTER_TOKEN is required');

const WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS || 60000);
const MAX_REQUESTS = Number(process.env.RATE_LIMIT_MAX || 120);
const buckets = new Map();

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

function rateLimit(req, res, next) {
  const now = Date.now();
  const key = req.ip || 'unknown';
  const current = buckets.get(key);
  if (!current || now - current.startedAt >= WINDOW_MS) {
    buckets.set(key, { startedAt: now, count: 1 });
    return next();
  }
  current.count += 1;
  if (current.count > MAX_REQUESTS) {
    const retryAfter = Math.max(1, Math.ceil((WINDOW_MS - (now - current.startedAt)) / 1000));
    res.set('Retry-After', String(retryAfter));
    return res.status(429).json({ error: 'rate_limited' });
  }
  next();
}

app.use((_req, res, next) => {
  res.set('Cache-Control', 'no-store');
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('X-Frame-Options', 'DENY');
  res.set('Referrer-Policy', 'no-referrer');
  next();
});

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'curadet-center-mail-bridge' });
});

app.get('/ready', (_req, res) => {
  const required = ['INFO_EMAIL', 'INFO_PASSWORD', 'SYNC_EMAIL', 'SYNC_PASSWORD', 'RIGHTS_EMAIL', 'RIGHTS_PASSWORD'];
  const missing = required.filter(name => !process.env[name]);
  if (missing.length) return res.status(503).json({ ok: false, error: 'missing_runtime_configuration' });
  res.json({ ok: true, service: 'curadet-center-mail-bridge' });
});

app.use('/api', rateLimit, requireAuth);

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
    const limit = normalizeLimit(req.query.limit);
    res.json(await listInbox(req.params.account, limit));
  } catch (error) {
    console.error('Inbox error:', error.message);
    res.status(502).json({ error: 'mail_provider_error' });
  }
});

app.get('/api/:account/message/:uid', async (req, res) => {
  if (!validAccount(req.params.account)) return res.status(404).json({ error: 'unknown_mailbox' });
  const uid = normalizeUid(req.params.uid);
  if (!uid) return res.status(400).json({ error: 'invalid_uid' });
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
  if (!validSendPayload(req.body)) return res.status(400).json({ error: 'missing_fields' });
  const { to, subject, text, html } = req.body;
  try {
    const result = await sendMail(req.params.account, { to: to.trim(), subject: subject.trim(), text, html });
    res.status(202).json(result);
  } catch (error) {
    console.error('Send error:', error.message);
    res.status(502).json({ error: 'mail_provider_error' });
  }
});

app.listen(PORT, HOST, () => {
  console.log(`CURADET Center mail bridge listening on ${HOST}:${PORT}`);
});
