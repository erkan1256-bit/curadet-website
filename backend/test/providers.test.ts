import test from 'node:test';
import assert from 'node:assert/strict';
import { assertProductionProviders, loadProviderConfig } from '../src/providers/config.js';

test('provider config defaults to unconfigured', () => {
  const config = loadProviderConfig({});
  assert.equal(config.identity, 'unconfigured');
  assert.equal(config.payment, 'unconfigured');
  assert.equal(config.storage, 'unconfigured');
  assert.equal(config.contracts, 'unconfigured');
});

test('production gate rejects missing providers', () => {
  assert.throws(() => assertProductionProviders(loadProviderConfig({})), /not configured/);
});

test('production gate accepts fully configured provider set', () => {
  const config = loadProviderConfig({
    IDENTITY_PROVIDER: 'self-hosted',
    PAYMENT_PROVIDER: 'iyzico',
    STORAGE_PROVIDER: 's3-compatible',
    CONTRACT_PROVIDER: 'external'
  });
  assert.doesNotThrow(() => assertProductionProviders(config));
});
