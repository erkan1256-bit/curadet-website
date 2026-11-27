import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildApp } from '../src/server.js';

test('readiness fails closed without a database probe', async () => {
  const app = buildApp();
  try {
    assert.equal((await app.inject('/health')).statusCode, 200);
    const result = await app.inject('/ready');
    assert.equal(result.statusCode, 503);
    assert.deepEqual(result.json(), { ready: false, database: 'NOT_CONFIGURED' });
  } finally { await app.close(); }
});

test('readiness reflects database availability and recovers', async () => {
  let available = false;
  const app = buildApp(async () => {
    if (!available) throw new Error('private connection detail');
  });
  try {
    const failed = await app.inject('/ready');
    assert.equal(failed.statusCode, 503);
    assert.deepEqual(failed.json(), { ready: false, database: 'UNAVAILABLE' });
    available = true;
    const passed = await app.inject('/ready');
    assert.equal(passed.statusCode, 200);
    assert.deepEqual(passed.json(), { ready: true, database: 'REACHABLE' });
  } finally { await app.close(); }
});
