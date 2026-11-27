import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildApp } from '../../src/server.js';

test('account routes reject missing identity, disabled account and unauthorized resource', async () => {
  let enabled = false;
  const app = buildApp(undefined, undefined, {
    identity: { async verifyBearerToken(token) {
      return token === 'test-token' ? { userId: 'user-a', assurance: 'basic' } : null;
    } },
    accounts: {
      async enabled() { return enabled; },
      async canListen(userId, resourceId) { return userId === 'user-a' && resourceId === 'allowed'; }
    }
  });
  const headers = { authorization: 'Bearer test-token' };
  try {
    assert.equal((await app.inject('/v1/me')).statusCode, 401);
    assert.equal((await app.inject({url:'/v1/me', headers})).statusCode, 401);
    enabled = true;
    assert.equal((await app.inject({url:'/v1/me', headers})).statusCode, 200);
    assert.equal((await app.inject({url:'/v1/catalog/denied/access', headers})).statusCode, 403);
    assert.equal((await app.inject({url:'/v1/catalog/allowed/access', headers})).statusCode, 200);
  } finally { await app.close(); }
});
