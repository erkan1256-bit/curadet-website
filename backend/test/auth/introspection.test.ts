import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createIntrospectionProvider } from '../../src/providers/introspection.js';

test('introspection validates active, issuer, audience and expiry', async () => {
  const valid = { active: true, iss: 'https://identity.example', aud: 'curadet', sub: 'user-a', exp: Math.floor(Date.now()/1000)+120 };
  let claims: Record<string, unknown> = valid;
  const mock: typeof fetch = async (_input, init) => {
    assert.equal(init?.method, 'POST');
    assert.equal(init?.redirect, 'error');
    return new Response(JSON.stringify(claims), {status:200});
  };
  const provider = createIntrospectionProvider({endpoint:'https://identity.example/introspect',clientId:'test',clientSecret:'test',issuer:valid.iss,audience:valid.aud}, mock);
  assert.deepEqual(await provider.verifyBearerToken('token'), {userId:'user-a',assurance:'basic'});
  for (const patch of [{active:false},{aud:'other'},{iss:'other'},{exp:0},{sub:''},{nbf:valid.exp}]) {
    claims = {...valid,...patch};
    assert.equal(await provider.verifyBearerToken('token'),null);
  }
  assert.equal(await provider.verifyBearerToken('invalid token'),null);
});
