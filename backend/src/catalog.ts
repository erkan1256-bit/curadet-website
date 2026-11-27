import type { Pool } from 'pg';

export interface PublicCatalogItem {
  id: string;
  release_id: string;
  recording_id: string;
  work_title: string;
  release_title: string;
  language: string | null;
}
export type CatalogReader = (limit: number, after: string) => Promise<PublicCatalogItem[]>;

export function createCatalogReader(pool: Pool): CatalogReader {
  return async (limit, after) => {
    const result = await pool.query<PublicCatalogItem>(
      'SELECT id, release_id, recording_id, work_title, release_title, language FROM public_catalog WHERE id > $1 ORDER BY id LIMIT $2',
      [after, limit]
    );
    return result.rows;
  };
}
