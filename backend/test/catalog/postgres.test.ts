import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createDb } from '../../src/db.js';
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
  try {
    const result = await reopened.query("SELECT work_title FROM public_catalog WHERE id='test-entry'");
    assert.equal(result.rows[0]?.work_title, 'Test work');
    await reopened.query("UPDATE recordings SET rights_state='blocked' WHERE id='test-recording'");
    assert.equal((await reopened.query("SELECT * FROM public_catalog WHERE id='test-entry'")).rowCount, 0);
  } finally { await reopened.end(); }
});
