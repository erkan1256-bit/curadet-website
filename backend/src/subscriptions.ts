import type { Pool } from 'pg';
import { randomUUID } from 'node:crypto';

export type VerifiedSubscriptionEvent = {
  provider: string;
  eventId: string;
  providerRef: string;
  sequence: number;
  state: 'active' | 'past_due' | 'cancelled' | 'expired';
  validUntil: Date | null;
};

// Internal service only. Call exclusively after provider signature, payment,
// subscription reference and event ordering have been independently verified.
export async function applyVerifiedSubscriptionEvent(pool: Pool, event: VerifiedSubscriptionEvent) {
  if (!event.provider || !event.eventId || !event.providerRef ||
      !Number.isSafeInteger(event.sequence) || event.sequence < 1 ||
      !['active','past_due','cancelled','expired'].includes(event.state) ||
      (event.validUntil !== null && !Number.isFinite(event.validUntil.getTime())) ||
      (event.state === 'active' && (!event.validUntil || event.validUntil.getTime() <= Date.now())))
    throw new Error('Invalid subscription event');
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await client.query('SELECT id,user_id,event_sequence FROM subscriptions WHERE provider_ref=$1 FOR UPDATE', [event.provider + ':' + event.providerRef]);
    const sub = result.rows[0];
    if (!sub) throw new Error('Unknown subscription');
    const inserted = await client.query(
      'INSERT INTO subscription_events(provider,event_id,subscription_id,sequence,state,valid_until) VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT DO NOTHING RETURNING event_id',
      [event.provider,event.eventId,sub.id,event.sequence,event.state,event.validUntil]);
    let applied = false;
    if (inserted.rowCount === 1 && BigInt(event.sequence) > BigInt(sub.event_sequence)) {
      await client.query('UPDATE subscriptions SET state=$1,valid_until=$2,event_sequence=$3 WHERE id=$4',
        [event.state,event.validUntil,event.sequence,sub.id]);
      await client.query("UPDATE entitlement_grants SET revoked_at=now() WHERE authority='subscription' AND authority_id=$1 AND user_id=$2 AND revoked_at IS NULL", [sub.id,sub.user_id]);
      if (event.state === 'active') {
        await client.query("INSERT INTO entitlement_grants(id,user_id,scope,authority,authority_id,valid_until) VALUES ($1,$2,'listen','subscription',$3,$4)",
          [randomUUID(),sub.user_id,sub.id,event.validUntil]);
      }
      await client.query('UPDATE subscription_events SET applied=true WHERE provider=$1 AND event_id=$2', [event.provider,event.eventId]);
      applied = true;
    }
    await client.query('COMMIT');
    return { applied };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally { client.release(); }
}
