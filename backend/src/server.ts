import Fastify from 'fastify';
import { loadConfig } from './config.js';

export function buildApp() {
  const app = Fastify({ logger: true, trustProxy: true, bodyLimit: 1_048_576 });

  app.get('/health', async () => ({ ok: true, service: 'curadet-platform-backend' }));
  app.get('/ready', async (_req, reply) => reply.code(200).send({ ready: true }));

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
