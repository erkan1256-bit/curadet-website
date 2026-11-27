import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createDb } from '../../src/db.js';
import { migrate } from '../../src/migrate.js';
import { applyVerifiedSubscriptionEvent } from '../../src/subscriptions.js';

test('subscription events are atomic, idempotent and reject stale ordering', {skip: !process.env.CURADET_TEST_DATABASE_URL}, async () => {
  const pool = createDb(process.env.CURADET_TEST_DATABASE_URL!);
  try {
    await migrate(pool);
    await pool.query("INSERT INTO accounts(id) VALUES ('lifecycle-user')");
    await pool.query("INSERT INTO subscriptions(id,user_id,plan_id,provider_ref) VALUES ('lifecycle-sub','lifecycle-user','premium','sandbox:ref')");
    const event = {provider:'sandbox',providerRef:'ref',eventId:'payment-1',sequence:1,state:'active' as const,validUntil:new Date(Date.now()+3600000)};
    assert.deepEqual(await applyVerifiedSubscriptionEvent(pool,event),{applied:true});
    assert.deepEqual(await applyVerifiedSubscriptionEvent(pool,event),{applied:false});
    assert.equal((await pool.query("SELECT id FROM entitlement_grants WHERE authority_id='lifecycle-sub' AND revoked_at IS NULL")).rowCount,1);
    assert.deepEqual(await applyVerifiedSubscriptionEvent(pool,{...event,eventId:'cancel-3',sequence:3,state:'cancelled',validUntil:null}),{applied:true});
    assert.deepEqual(await applyVerifiedSubscriptionEvent(pool,{...event,eventId:'late-2',sequence:2}),{applied:false});
    assert.equal((await pool.query("SELECT id FROM entitlement_grants WHERE authority_id='lifecycle-sub' AND revoked_at IS NULL")).rowCount,0);
    assert.equal((await pool.query("SELECT state FROM subscriptions WHERE id='lifecycle-sub'")).rows[0]?.state,'cancelled');
  } finally { await pool.end(); }
});
