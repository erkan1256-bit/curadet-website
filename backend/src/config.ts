export type AppConfig = {
  host: string;
  port: number;
  databaseUrl: string;
  appOrigin: string;
  environment: 'development' | 'test' | 'production';
};

export function loadConfig(env = process.env): AppConfig {
  const environment = (env.NODE_ENV ?? 'development') as AppConfig['environment'];
  const databaseUrl = env.DATABASE_URL ?? '';
  const appOrigin = env.APP_ORIGIN ?? 'https://curadet.com';
  const port = Number(env.PORT ?? 8080);
  const host = env.HOST ?? '0.0.0.0';
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid PORT');
  if (environment === 'production' && !databaseUrl) throw new Error('DATABASE_URL is required in production');
  return { host, port, databaseUrl, appOrigin, environment };
}
