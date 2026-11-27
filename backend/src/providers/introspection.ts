import type { IdentityProvider, IdentitySession } from './contracts.js';

export interface IntrospectionConfig {
  endpoint: string;
  clientId: string;
  clientSecret: string;
  issuer: string;
  audience: string;
}

export function createIntrospectionProvider(config: IntrospectionConfig, request: typeof fetch = fetch): IdentityProvider {
  const endpoint = new URL(config.endpoint);
  if (endpoint.protocol !== 'https:' || endpoint.username || endpoint.password || endpoint.hash)
    throw new Error('Identity introspection requires a trusted HTTPS endpoint');
  if (!config.clientId || !config.clientSecret || !config.issuer || !config.audience)
    throw new Error('Incomplete identity configuration');
  const basic = Buffer.from(encodeURIComponent(config.clientId) + ':' + encodeURIComponent(config.clientSecret)).toString('base64');
  return {
    async verifyBearerToken(token): Promise<IdentitySession | null> {
      if (!token || token.length > 8192 || /\s/.test(token)) return null;
      const response = await request(endpoint, {
        method: 'POST', redirect: 'error', signal: AbortSignal.timeout(5000),
        headers: { authorization: 'Basic ' + basic, 'content-type': 'application/x-www-form-urlencoded', accept: 'application/json' },
        body: new URLSearchParams({ token, token_type_hint: 'access_token' })
      });
      if (!response.ok) throw new Error('Identity provider unavailable');
      const data = await response.json() as Record<string, unknown>;
      const now = Math.floor(Date.now()/1000);
      if (data.active !== true || data.iss !== config.issuer ||
          !(data.aud === config.audience || (Array.isArray(data.aud) && data.aud.includes(config.audience))) ||
          typeof data.sub !== 'string' || !data.sub || data.sub.length > 256 ||
          typeof data.exp !== 'number' || !Number.isFinite(data.exp) || data.exp <= now ||
          (data.nbf !== undefined && (typeof data.nbf !== 'number' || !Number.isFinite(data.nbf) || data.nbf > now))) return null;
      return { userId: data.sub, assurance: 'basic' };
    }
  };
}

export function identityFromEnv(env = process.env): IdentityProvider | undefined {
  const values = [env.IDENTITY_INTROSPECTION_URL, env.IDENTITY_CLIENT_ID, env.IDENTITY_CLIENT_SECRET, env.IDENTITY_ISSUER, env.IDENTITY_AUDIENCE];
  if (!values.some(Boolean)) return undefined;
  if (!values.every(Boolean)) throw new Error('Incomplete identity introspection configuration');
  return createIntrospectionProvider({ endpoint: values[0]!, clientId: values[1]!, clientSecret: values[2]!, issuer: values[3]!, audience: values[4]! });
}
