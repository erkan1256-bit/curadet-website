import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { createDb } from './db.js';
import { loadConfig } from './config.js';
import type { Pool } from 'pg';

export async function migrate(pool: Pool) {
  const sql = await readFile(new URL('../../src/migrations/001_catalog.sql', import.meta.url), 'utf8');
  const checksum = createHash('sha256').update(sql).digest('hex');
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('SELECT pg_advisory_xact_lock(19387421)');
    await client.query('CREATE TABLE IF NOT EXISTS curadet_migrations (id text PRIMARY KEY, checksum text NOT NULL, applied_at timestamptz NOT NULL DEFAULT now())');
    const existing = await client.query('SELECT checksum FROM curadet_migrations WHERE id=$1', ['001_catalog']);
    if (existing.rowCount) {
      if (existing.rows[0].checksum !== checksum) throw new Error('Migration checksum mismatch');
    } else {
      await client.query(sql);
      await client.query('INSERT INTO curadet_migrations(id,checksum) VALUES ($1,$2)', ['001_catalog', checksum]);
    }
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally { client.release(); }
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replaceAll('\\', '/'))) {
  const config = loadConfig();
  if (!config.databaseUrl) throw new Error('DATABASE_URL required');
  const pool = createDb(config.databaseUrl);
  try { await migrate(pool); } finally { await pool.end(); }
}
