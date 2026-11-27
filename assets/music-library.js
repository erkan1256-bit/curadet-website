(()=>{
  'use strict';
  const input=document.getElementById('music-search'), status=document.getElementById('music-status'), list=document.getElementById('music-results'), more=document.getElementById('music-more');
  if(!input||!status||!list||!more)return;
  const audio=document.getElementById('music-player'), playerStatus=document.getElementById('player-status'), next=document.getElementById('music-next');
  let queue=[], generation=0;
  // A trusted account integration supplies a short-lived token in memory only.
  async function play(item){
    const turn=++generation;
    if(!audio||!playerStatus)return;
    audio.pause();audio.removeAttribute('src');audio.load();
    try{
      const token=await window.curadetAccount?.getAccessToken?.();
      if(turn!==generation)return;
      if(!token){playerStatus.textContent='Dinlemek için güvenli hesabınızla giriş yapın.';return;}
      const response=await fetch('/v1/catalog/'+encodeURIComponent(item.id)+'/playback',{method:'POST',headers:{authorization:'Bearer '+token},cache:'no-store',signal:AbortSignal.timeout(10000)});
      if(!response.ok)throw Error('playback denied');
      const grant=await response.json(), url=new URL(grant.url);
      if(url.protocol!=='https:'||url.username||url.password||Date.parse(grant.expiresAt)<=Date.now())throw Error('invalid grant');
      if(turn!==generation)return;
      audio.src=url.href;playerStatus.textContent=item.work_title;
      await audio.play();
      if(turn===generation)fetch('/v1/library/history/'+encodeURIComponent(item.id),{method:'POST',headers:{authorization:'Bearer '+token}}).catch(()=>{});
    }catch{if(turn===generation)playerStatus.textContent='Oynatma başlatılamadı. Hesap ve bağlantınızı kontrol edin.';}
  }
  function advance(){const item=queue.shift();if(item)play(item);}
  audio?.addEventListener('ended',advance);next?.addEventListener('click',advance);
  let cursor=null, items=[], busy=false, failed=false;
  const fold=value=>String(value??'').toLocaleLowerCase('tr').normalize('NFD').replace(/\p{M}/gu,'').replace(/ı/g,'i');
  function render(){
    const term=fold(input.value.trim());
    const filtered=items.filter(item=>fold(item.work_title+' '+item.release_title).includes(term));
    list.replaceChildren();
    for(const item of filtered){
      const li=document.createElement('li'), title=document.createElement('strong'), detail=document.createElement('p');
      title.textContent=item.work_title;detail.textContent=item.release_title;
      const button=document.createElement('button');button.type='button';button.textContent='Dinle';
      button.addEventListener('click',()=>{queue=filtered.slice(filtered.indexOf(item)+1);play(item);});
      li.append(title,detail,button);list.append(li);
    }
    status.textContent=failed?'Katalog bağlantısı kurulamadı.':busy?'Katalog yükleniyor.':filtered.length?filtered.length+' eser gösteriliyor.':term?'Yüklenen eserlerde sonuç yok.':'Henüz yayımlanmış eser yok.';
    more.hidden=!cursor&&!failed;more.disabled=busy;more.textContent=failed?'Tekrar dene':'Daha fazla eser';
  }
  async function load(){
    if(busy)return;busy=true;failed=false;render();
    try{
      const url=new URL('/v1/catalog',location.origin);url.searchParams.set('limit','50');if(cursor)url.searchParams.set('after',cursor);
      const response=await fetch(url,{headers:{accept:'application/json'},signal:AbortSignal.timeout(10000)});
      if(!response.ok)throw Error('catalog unavailable');
      const data=await response.json();
      if(!Array.isArray(data.items)||!(data.nextCursor===null||typeof data.nextCursor==='string'))throw Error('invalid catalog');
      for(const item of data.items)if(item&&typeof item.id==='string'&&typeof item.work_title==='string'&&typeof item.release_title==='string'&&!items.some(x=>x.id===item.id))items.push(item);
      cursor=data.nextCursor;
    }catch{failed=true;}finally{busy=false;render();}
  }
  input.addEventListener('input',render);more.addEventListener('click',load);load();
})();
