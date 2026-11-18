export const MAILBOX_IDS = Object.freeze(['info', 'sync', 'rights']);

export function validAccount(value) {
  return MAILBOX_IDS.includes(value);
}

export function normalizeLimit(value, fallback = 25, max = 100) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(Math.max(Math.trunc(parsed), 1), max);
}

export function normalizeUid(value) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

export function validSendPayload(payload) {
  if (!payload || typeof payload !== 'object') return false;
  const { to, subject, text, html } = payload;
  if (typeof to !== 'string' || !to.trim()) return false;
  if (typeof subject !== 'string' || !subject.trim()) return false;
  const hasText = typeof text === 'string' && text.trim().length > 0;
  const hasHtml = typeof html === 'string' && html.trim().length > 0;
  return hasText || hasHtml;
}
