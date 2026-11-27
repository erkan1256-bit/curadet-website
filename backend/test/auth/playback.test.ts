import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildApp } from '../../src/server.js';

test('playback requires authentication and resource entitlement', async () => {
  let calls=0;
  const app=buildApp(undefined,undefined,{
    identity:{async verifyBearerToken(token){return token==='valid'?{userId:'user-a',assurance:'basic'}:null;}},
    accounts:{async enabled(){return true;},async canListen(user,id){return user==='user-a'&&id==='allowed';}}
  },async()=>{calls++;return {url:'https://media.example/listening/test',expiresAt:new Date(Date.now()+60000).toISOString()};});
  try {
    const request=(id:string,token?:string)=>app.inject({method:'POST',url:'/v1/catalog/'+id+'/playback',headers:token?{authorization:'Bearer '+token}:{}});
    assert.equal((await request('allowed')).statusCode,401);
    assert.equal((await request('blocked','valid')).statusCode,403);
    assert.equal(calls,0);
    const response=await request('allowed','valid');
    assert.equal(response.statusCode,200);
    assert.equal(response.headers['cache-control'],'no-store');
    assert.equal(calls,1);
  } finally {await app.close();}
});
