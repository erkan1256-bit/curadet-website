import Fastify from 'fastify';
import { loadConfig } from './config.js';
import { createDb } from './db.js';
import { createCatalogReader, type CatalogReader } from './catalog.js';

import type { IdentityProvider, IdentitySession } from './providers/contracts.js';
import { createAccountStore } from './accounts.js';
import { identityFromEnv } from './providers/introspection.js';

type AccountStore = ReturnType<typeof createAccountStore>;
export type AuthServices = { identity: IdentityProvider; accounts: AccountStore };

export type ReadinessProbe = () => Promise<void>;

const serviceState = {
  platform: 'curadet-platform-backend',
  ai: {
    service: 'curadet-ai-orchestrator',
    state: 'BOOTSTRAP_READY',
    publicChatbot: false,
    modules: {
      musicBrain: 'ARCHITECTURE_READY',
      musicAnalyzer: 'ARCHITECTURE_READY',
      coverArtEngine: 'ARCHITECTURE_READY',
      rightsEngine: 'PLANNED',
      socialEngine: 'PLANNED'
    }
  }
} as const;

export function buildApp(checkDatabase?: ReadinessProbe, readCatalog?: CatalogReader, auth?: AuthServices) {
  const app = Fastify({ logger: true, trustProxy: true, bodyLimit: 1_048_576 });

  app.get('/health', async () => ({ ok: true, service: serviceState.platform }));
  app.get('/ready', async (_req, reply) => {
    if (!checkDatabase) return reply.code(503).send({ ready: false, database: 'NOT_CONFIGURED' });
    try {
      await checkDatabase();
      return reply.code(200).send({ ready: true, database: 'REACHABLE' });
    } catch {
      return reply.code(503).send({ ready: false, database: 'UNAVAILABLE' });
    }
  });

  app.get('/v1/catalog', {
    schema: { querystring: { type: 'object', additionalProperties: false, properties: {
      limit: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
      after: { type: 'string', maxLength: 256, default: '' }
    } } }
  }, async (request, reply) => {
    if (!readCatalog) return reply.code(503).send({ error: 'CATALOG_NOT_CONFIGURED' });
    const { limit = 20, after = '' } = request.query as { limit?: number; after?: string };
    try {
      const rows = await readCatalog(limit + 1, after);
      const items = rows.slice(0, limit);
      return { items, nextCursor: rows.length > limit ? items.at(-1)?.id ?? null : null };
    } catch {
      return reply.code(503).send({ error: 'CATALOG_UNAVAILABLE' });
    }
  });

  app.get('/v1/status', async () => ({
    ok: true,
    platform: serviceState.platform,
    ai: serviceState.ai,
    truth: 'Status reports implemented/verified repository capability only; it does not claim an external model or production deployment is connected.'
  }));

  app.get('/v1/ai/health', async () => ({
    ok: true,
    ...serviceState.ai
  }));

  app.post('/v1/ai/tasks', async (request, reply) => {
    const body = request.body as Record<string, unknown> | null;
    if (!body || typeof body !== 'object') {
      return reply.code(400).send({ error: 'INVALID_TASK', message: 'A JSON task object is required.' });
    }

    return reply.code(202).send({
      accepted: true,
      state: 'QUEUED_FOR_ORCHESTRATION',
      task: body,
      execution: 'NOT_CONNECTED',
      message: 'CURADET AI task contract is active; model/worker execution must be connected before tasks can execute.'
    });
  });

  async function authenticate(header: string | undefined): Promise<IdentitySession | null> {
    if (!auth || !header || !/^Bearer [^\s]+$/i.test(header)) return null;
    const session = await auth.identity.verifyBearerToken(header.slice(7));
    if (!session || !await auth.accounts.enabled(session.userId)) return null;
    return session;
  }

  app.get('/v1/me', async (request, reply) => {
    reply.header('Cache-Control', 'no-store');
    if (!auth) return reply.code(501).send({ error: 'AUTH_BACKEND_NOT_CONNECTED' });
    try {
      const session = await authenticate(request.headers.authorization);
      if (!session) return reply.code(401).send({ error: 'UNAUTHORIZED' });
      return { userId: session.userId, assurance: session.assurance };
    } catch {
      return reply.code(503).send({ error: 'AUTH_UNAVAILABLE' });
    }
  });

  app.get<{ Params: { id: string } }>('/v1/catalog/:id/access', async (request, reply) => {
    reply.header('Cache-Control', 'no-store');
    if (!auth) return reply.code(501).send({ error: 'AUTH_BACKEND_NOT_CONNECTED' });
    try {
      const session = await authenticate(request.headers.authorization);
      if (!session) return reply.code(401).send({ error: 'UNAUTHORIZED' });
      const allowed = await auth.accounts.canListen(session.userId, request.params.id);
      if (!allowed) return reply.code(403).send({ error: 'ACCESS_DENIED' });
      return { allowed: true };
    } catch {
      return reply.code(503).send({ error: 'ACCESS_UNAVAILABLE' });
    }
  });

  app.get('/v1/vault/assets/:assetId/download', async (_req, reply) => reply.code(501).send({
    error: 'SIGNED_DOWNLOAD_NOT_CONNECTED',
    message: 'Private signed-download storage is not connected yet.'
  }));

  return app;
}

const isMain = process.argv[1] && import.meta.url.endsWith(process.argv[1].replaceAll('\\', '/'));
if (isMain) {
  const config = loadConfig();
  const db = config.databaseUrl ? createDb(config.databaseUrl) : undefined;
  const identity = identityFromEnv();
  const app = buildApp(db ? async () => { await db.query('SELECT id FROM public_catalog LIMIT 1'); } : undefined, db ? createCatalogReader(db) : undefined, db && identity ? { identity, accounts: createAccountStore(db) } : undefined);
  if (db) {
    db.on('error', () => app.log.error('Idle database connection failed'));
    app.addHook('onClose', async () => { await db.end(); });
  }
  await app.listen({ host: config.host, port: config.port });
}
