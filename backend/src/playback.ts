import type { Pool } from 'pg';
import type { PrivateStorageProvider } from './providers/contracts.js';

export type PlaybackResolver = (userId: string, catalogId: string) => Promise<{url:string;expiresAt:string} | null>;

export function createPlaybackResolver(pool: Pool, storage: PrivateStorageProvider): PlaybackResolver {
  return async (userId, catalogId) => {
    const result = await pool.query(
      `SELECT c.recording_id,l.object_key FROM public_catalog c
       JOIN listening_assets l ON l.recording_id=c.recording_id AND l.enabled
       JOIN recordings rec ON rec.id=c.recording_id
       JOIN accounts a ON a.id=$1 AND a.enabled
       WHERE c.id=$2 AND l.object_key LIKE 'listening/%'
       AND l.object_key IS DISTINCT FROM rec.master_asset_id
       AND EXISTS (SELECT 1 FROM entitlement_grants g
         WHERE g.user_id=a.id AND g.scope='listen'
         AND (g.resource_id IS NULL OR g.resource_id=c.id)
         AND g.revoked_at IS NULL AND (g.valid_until IS NULL OR g.valid_until>now())
         AND (g.authority='owner_grant' OR (g.authority='subscription' AND EXISTS (
           SELECT 1 FROM subscriptions s WHERE s.id=g.authority_id AND s.user_id=a.id
           AND s.state='active' AND s.valid_until>now()
         ))) )`, [userId,catalogId]);
    const asset=result.rows[0];
    if (!asset) return null;
    const signed=await storage.createSignedDownload({assetId:asset.recording_id,userId,objectKey:asset.object_key,ttlSeconds:60});
    const url=new URL(signed.url);
    const expiry=Date.parse(signed.expiresAt), now=Date.now();
    if(url.protocol!=='https:'||url.username||url.password||!Number.isFinite(expiry)||expiry<=now||expiry>now+65_000)
      throw new Error('Invalid playback grant');
    return signed;
  };
}
