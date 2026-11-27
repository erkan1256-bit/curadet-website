import type { PrivateStorageProvider } from './contracts.js';
export function storageFromEnv(env=process.env): PrivateStorageProvider | undefined {
  const endpoint=env.MEDIA_SIGNER_URL, secret=env.MEDIA_SIGNER_TOKEN;
  if (!endpoint&&!secret) return undefined;
  if (!endpoint||!secret) throw new Error('Incomplete media signer configuration');
  const url=new URL(endpoint);
  if(url.protocol!=='https:'||url.username||url.password||url.hash) throw new Error('Invalid media signer endpoint');
  return {async createSignedDownload(input) {
    if(!input.objectKey.startsWith('listening/')||input.ttlSeconds>60) throw new Error('Invalid listening asset');
    const response=await fetch(url,{method:'POST',redirect:'error',signal:AbortSignal.timeout(5000),headers:{authorization:'Bearer '+secret,'content-type':'application/json'},body:JSON.stringify(input)});
    if(!response.ok) throw new Error('Media signer unavailable');
    const value=await response.json() as Record<string,unknown>;
    if(typeof value.url!=='string'||typeof value.expiresAt!=='string') throw new Error('Invalid media response');
    return {url:value.url,expiresAt:value.expiresAt};
  }};
}
