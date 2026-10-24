import test from 'node:test';
import assert from 'node:assert/strict';
import { buildApp } from '../src/server.js';
import { canDownloadFinalAsset } from '../src/domain/entitlement.js';
import { evaluateExclusiveSimilarity } from '../src/domain/exclusive.js';

test('health endpoint responds', async () => {
  const app = buildApp();
  const res = await app.inject({ method: 'GET', url: '/health' });
  assert.equal(res.statusCode, 200);
  assert.equal(res.json().ok, true);
  await app.close();
});

test('final download requires active settled licensed entitlement', () => {
  assert.equal(canDownloadFinalAsset({ state: 'active', licenseActive: true, paymentSettled: true }), true);
  assert.equal(canDownloadFinalAsset({ state: 'active', licenseActive: true, paymentSettled: false }), false);
});

test('exclusive threshold blocks protected similarity', () => {
  assert.equal(evaluateExclusiveSimilarity(0.91, 0.9).blocked, true);
  assert.equal(evaluateExclusiveSimilarity(0.72, 0.9).blocked, false);
});
