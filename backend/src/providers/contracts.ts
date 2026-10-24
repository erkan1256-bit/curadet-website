export type Money = { amountMinor: number; currency: 'TRY' | 'USD' | 'EUR' | 'GBP' };

export type IdentitySession = {
  userId: string;
  email?: string;
  assurance: 'basic' | 'mfa' | 'high';
};

export interface IdentityProvider {
  verifyBearerToken(token: string): Promise<IdentitySession | null>;
}

export type CheckoutRequest = {
  orderId: string;
  userId: string;
  amount: Money;
  successUrl: string;
  cancelUrl: string;
};

export type CheckoutSession = {
  provider: string;
  externalId: string;
  redirectUrl?: string;
  embeddedToken?: string;
};

export type PaymentEvent = {
  provider: string;
  externalPaymentId: string;
  orderId: string;
  status: 'paid' | 'failed' | 'refunded' | 'cancelled';
  rawEventId: string;
};

export interface PaymentProvider {
  createCheckout(input: CheckoutRequest): Promise<CheckoutSession>;
  verifyWebhook(payload: Buffer, headers: Record<string, string | string[] | undefined>): Promise<PaymentEvent>;
}

export type SignedDownloadRequest = {
  assetId: string;
  userId: string;
  objectKey: string;
  ttlSeconds: number;
};

export interface PrivateStorageProvider {
  createSignedDownload(input: SignedDownloadRequest): Promise<{ url: string; expiresAt: string }>;
}

export type ContractEnvelope = {
  contractId: string;
  userId: string;
  orderId: string;
  documentHash: string;
};

export interface ContractProvider {
  createSignatureRequest(input: ContractEnvelope): Promise<{ externalId: string; signingUrl?: string }>;
  getStatus(externalId: string): Promise<'pending' | 'signed' | 'rejected' | 'expired'>;
}

export interface AuditSink {
  write(event: {
    actorUserId?: string;
    action: string;
    resourceType: string;
    resourceId: string;
    occurredAt: string;
    metadata?: Record<string, unknown>;
  }): Promise<void>;
}
