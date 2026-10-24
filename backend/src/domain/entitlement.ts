export type EntitlementState = 'pending' | 'active' | 'revoked' | 'expired';

export type Entitlement = {
  state: EntitlementState;
  licenseActive: boolean;
  paymentSettled: boolean;
  expiresAt?: Date;
};

export function canDownloadFinalAsset(e: Entitlement, now = new Date()): boolean {
  if (e.state !== 'active') return false;
  if (!e.licenseActive || !e.paymentSettled) return false;
  if (e.expiresAt && e.expiresAt <= now) return false;
  return true;
}
