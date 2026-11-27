import type { Pool } from 'pg';

export function createAccountStore(pool: Pool) {
  return {
    async enabled(userId: string): Promise<boolean> {
      const result = await pool.query('SELECT id FROM accounts WHERE id=$1 AND enabled', [userId]);
      return result.rowCount === 1;
    },
    async canListen(userId: string, resourceId: string): Promise<boolean> {
      const result = await pool.query(
        `SELECT 1 FROM entitlement_grants g JOIN accounts a ON a.id=g.user_id
        JOIN public_catalog c ON c.id=$2
        WHERE a.enabled AND g.user_id=$1 AND g.scope='listen'
        AND (g.resource_id IS NULL OR g.resource_id=c.id)
        AND g.revoked_at IS NULL AND (g.valid_until IS NULL OR g.valid_until>now())
        AND (g.authority='owner_grant' OR (g.authority='subscription' AND EXISTS (
          SELECT 1 FROM subscriptions s WHERE s.id=g.authority_id AND s.user_id=g.user_id
          AND s.state='active' AND s.valid_until>now()
        ))) LIMIT 1`, [userId, resourceId]);
      return result.rowCount === 1;
    }
  };
}
