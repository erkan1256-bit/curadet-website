import Fastify from 'fastify';
import { loadConfig } from './config.js';

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

export function buildApp() {
  const app = Fastify({ logger: true, trustProxy: true, bodyLimit: 1_048_576 });

  app.get('/health', async () => ({ ok: true, service: serviceState.platform }));
  app.get('/ready', async (_req, reply) => reply.code(200).send({ ready: true }));

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

  app.get('/v1/me', async (_req, reply) => reply.code(501).send({
    error: 'AUTH_BACKEND_NOT_CONNECTED',
    message: 'Secure identity provider is not connected yet.'
  }));

  app.get('/v1/vault/assets/:assetId/download', async (_req, reply) => reply.code(501).send({
    error: 'SIGNED_DOWNLOAD_NOT_CONNECTED',
    message: 'Private signed-download storage is not connected yet.'
  }));

  return app;
}

const isMain = process.argv[1] && import.meta.url.endsWith(process.argv[1].replaceAll('\\', '/'));
if (isMain) {
  const config = loadConfig();
  const app = buildApp();
  await app.listen({ host: config.host, port: config.port });
}
