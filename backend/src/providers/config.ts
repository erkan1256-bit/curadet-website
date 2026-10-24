export type ProviderConfig = {
  identity: 'unconfigured' | 'self-hosted' | 'external';
  payment: 'unconfigured' | 'iyzico' | 'paytr' | 'external';
  storage: 'unconfigured' | 's3-compatible';
  contracts: 'unconfigured' | 'external';
};

export function loadProviderConfig(env = process.env): ProviderConfig {
  const identity = (env.IDENTITY_PROVIDER ?? 'unconfigured') as ProviderConfig['identity'];
  const payment = (env.PAYMENT_PROVIDER ?? 'unconfigured') as ProviderConfig['payment'];
  const storage = (env.STORAGE_PROVIDER ?? 'unconfigured') as ProviderConfig['storage'];
  const contracts = (env.CONTRACT_PROVIDER ?? 'unconfigured') as ProviderConfig['contracts'];

  const allowed = {
    identity: ['unconfigured', 'self-hosted', 'external'],
    payment: ['unconfigured', 'iyzico', 'paytr', 'external'],
    storage: ['unconfigured', 's3-compatible'],
    contracts: ['unconfigured', 'external']
  } as const;

  if (!allowed.identity.includes(identity)) throw new Error('Invalid IDENTITY_PROVIDER');
  if (!allowed.payment.includes(payment)) throw new Error('Invalid PAYMENT_PROVIDER');
  if (!allowed.storage.includes(storage)) throw new Error('Invalid STORAGE_PROVIDER');
  if (!allowed.contracts.includes(contracts)) throw new Error('Invalid CONTRACT_PROVIDER');

  return { identity, payment, storage, contracts };
}

export function assertProductionProviders(config: ProviderConfig) {
  const missing = Object.entries(config).filter(([, value]) => value === 'unconfigured').map(([key]) => key);
  if (missing.length) throw new Error(`Production providers not configured: ${missing.join(', ')}`);
}
