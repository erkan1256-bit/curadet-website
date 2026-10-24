import { Pool } from 'pg';

export function createDb(databaseUrl: string) {
  return new Pool({
    connectionString: databaseUrl || undefined,
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
    ssl: databaseUrl.includes('sslmode=require') ? { rejectUnauthorized: true } : undefined
  });
}
