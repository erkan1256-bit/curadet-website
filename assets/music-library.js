(()=>{
  'use strict';
  const input=document.getElementById('music-search'), status=document.getElementById('music-status'), list=document.getElementById('music-results'), more=document.getElementById('music-more');
  if(!input||!status||!list||!more)return;
  let cursor=null, items=[], busy=false, failed=false;
  const fold=value=>String(value??'').toLocaleLowerCase('tr').normalize('NFD').replace(/\p{M}/gu,'').replace(/ı/g,'i');
  function render(){
    const term=fold(input.value.trim());
    const filtered=items.filter(item=>fold(item.work_title+' '+item.release_title).includes(term));
    list.replaceChildren();
    for(const item of filtered){
      const li=document.createElement('li'), title=document.createElement('strong'), detail=document.createElement('p');
      title.textContent=item.work_title;detail.textContent=item.release_title;
      li.append(title,detail);list.append(li);
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
