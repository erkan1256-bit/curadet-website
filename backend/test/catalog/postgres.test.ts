import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createDb } from '../../src/db.js';
import { buildApp } from '../../src/server.js';
import { createCatalogReader } from '../../src/catalog.js';
import { createAccountStore } from '../../src/accounts.js';
import { migrate } from '../../src/migrate.js';

test('PostgreSQL migrations, persistence across pools and publication gate', { skip: !process.env.CURADET_TEST_DATABASE_URL }, async () => {
  const url = process.env.CURADET_TEST_DATABASE_URL!;
  const db = createDb(url);
  try {
    await migrate(db);
    await migrate(db);
    await db.query("INSERT INTO works(id,title) VALUES ('test-work','Test work')");
    await db.query("INSERT INTO recordings(id,work_id,source_class) VALUES ('test-recording','test-work','curadet_original')");
    await db.query("INSERT INTO releases(id,title,publication_state) VALUES ('test-release','Test release','published')");
    await db.query("INSERT INTO release_recordings VALUES ('test-release','test-recording')");
    await db.query("INSERT INTO catalog_entries(id,release_id,recording_id,visible) VALUES ('test-entry','test-release','test-recording',true)");
    assert.equal((await db.query("SELECT * FROM public_catalog WHERE id='test-entry'")).rowCount, 0);
    await db.query("UPDATE recordings SET rights_state='cleared',provenance_state='verified' WHERE id='test-recording'");
  } finally { await db.end(); }
  const reopened = createDb(url);
  const app = buildApp(async () => { await reopened.query('SELECT 1'); }, createCatalogReader(reopened));
  try {
    const response = await app.inject('/v1/catalog?limit=1&after=test-');
    assert.equal(response.statusCode, 200);
    assert.equal(response.json().items[0]?.work_title, 'Test work');
    assert.equal(response.json().nextCursor, null);
    assert.equal((await app.inject('/v1/catalog?limit=0')).statusCode, 400);
    const result = await reopened.query("SELECT work_title FROM public_catalog WHERE id='test-entry'");
    assert.equal(result.rows[0]?.work_title, 'Test work');
    const accounts = createAccountStore(reopened);
    await reopened.query("INSERT INTO accounts(id) VALUES ('test-user'),('other-user')");
    await reopened.query("INSERT INTO subscriptions(id,user_id,plan_id,state,valid_until) VALUES ('test-sub','test-user','premium','active',now()+interval '1 hour')");
    await reopened.query("INSERT INTO entitlement_grants(id,user_id,scope,authority,authority_id) VALUES ('test-grant','test-user','listen','subscription','test-sub')");
    assert.equal(await accounts.canListen('test-user','test-entry'),true);
    assert.equal(await accounts.canListen('other-user','test-entry'),false);
    await reopened.query("UPDATE subscriptions SET state='cancelled' WHERE id='test-sub'");
    assert.equal(await accounts.canListen('test-user','test-entry'),false);
    await reopened.query("UPDATE subscriptions SET state='active' WHERE id='test-sub'");
    await reopened.query("UPDATE accounts SET enabled=false WHERE id='test-user'");
    assert.equal(await accounts.canListen('test-user','test-entry'),false);
    await reopened.query("UPDATE recordings SET rights_state='blocked' WHERE id='test-recording'");
    assert.equal((await reopened.query("SELECT * FROM public_catalog WHERE id='test-entry'")).rowCount, 0);
    assert.equal((await app.inject('/v1/catalog?after=test-')).json().items.some((item: {id:string}) => item.id === 'test-entry'), false);
  } finally { await app.close(); await reopened.end(); }
});
