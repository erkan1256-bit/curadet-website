import test from 'node:test';
import assert from 'node:assert/strict';
import { validAccount, normalizeLimit, normalizeUid, validSendPayload } from '../src/validation.mjs';

test('validAccount only accepts CURADET mailbox ids', () => {
  assert.equal(validAccount('info'), true);
  assert.equal(validAccount('sync'), true);
  assert.equal(validAccount('rights'), true);
  assert.equal(validAccount('admin'), false);
  assert.equal(validAccount(''), false);
});

test('normalizeLimit clamps and falls back safely', () => {
  assert.equal(normalizeLimit(undefined), 25);
  assert.equal(normalizeLimit('abc'), 25);
  assert.equal(normalizeLimit(0), 1);
  assert.equal(normalizeLimit(-10), 1);
  assert.equal(normalizeLimit(12.9), 12);
  assert.equal(normalizeLimit(500), 100);
});

test('normalizeUid only accepts positive integers', () => {
  assert.equal(normalizeUid('12'), 12);
  assert.equal(normalizeUid(1), 1);
  assert.equal(normalizeUid(0), null);
  assert.equal(normalizeUid(-1), null);
  assert.equal(normalizeUid('1.5'), null);
  assert.equal(normalizeUid('abc'), null);
});

test('validSendPayload requires recipient, subject and body', () => {
  assert.equal(validSendPayload({ to: 'a@example.com', subject: 'Hi', text: 'Hello' }), true);
  assert.equal(validSendPayload({ to: 'a@example.com', subject: 'Hi', html: '<p>Hello</p>' }), true);
  assert.equal(validSendPayload({ to: '', subject: 'Hi', text: 'Hello' }), false);
  assert.equal(validSendPayload({ to: 'a@example.com', subject: '', text: 'Hello' }), false);
  assert.equal(validSendPayload({ to: 'a@example.com', subject: 'Hi', text: '   ' }), false);
  assert.equal(validSendPayload(null), false);
});
