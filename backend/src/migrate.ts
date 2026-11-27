import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { createDb } from './db.js';
import { loadConfig } from './config.js';
import type { Pool } from 'pg';

export async function migrate(pool: Pool) {
  const migrations = ['001_catalog', '002_accounts', '003_subscription_events'];
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('SELECT pg_advisory_xact_lock(19387421)');
    await client.query('CREATE TABLE IF NOT EXISTS curadet_migrations (id text PRIMARY KEY, checksum text NOT NULL, applied_at timestamptz NOT NULL DEFAULT now())');
    for (const id of migrations) {
    const sql = await readFile(resolve(process.cwd(), 'src/migrations', id + '.sql'), 'utf8');
    const checksum = createHash('sha256').update(sql).digest('hex');
    const existing = await client.query('SELECT checksum FROM curadet_migrations WHERE id=$1', [id]);
    if (existing.rowCount) {
      if (existing.rows[0].checksum !== checksum) throw new Error('Migration checksum mismatch');
    } else {
      await client.query(sql);
      await client.query('INSERT INTO curadet_migrations(id,checksum) VALUES ($1,$2)', [id, checksum]);
    }
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
