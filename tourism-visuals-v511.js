/* GeoVerse tourism visuals v511.
 * Real Wikimedia page images are queried by the EXACT encyclopedia article
 * attached to each existing attraction. Never substitutes an unrelated photo.
 * Cards and detail reuse the same cached thumbnail URL; lazy loading on mobile.
 * No changes to tourism IDs, navigation, globe, progress or editorial text.
 */
(function(){
'use strict';
const catalog=()=>window.GeoVerseTourismV170?.items||[];
const cache=new Map(), pending=new Map(), watchers=new WeakSet();
const titleFor=item=>{
 if(!item?.wiki)return '';
 try{return decodeURIComponent(item.wiki).replace(/_/g,' ')}catch(_){return item.wiki.replace(/_/g,' ')}
};
const normalize=s=>String(s||'').replace(/_/g,' ').normalize('NFC').trim().toLowerCase();
const eligible=url=>typeof url==='string'&&/^https:\/\/(?:upload|thumb)\.wikimedia\.org\//i.test(url);
const loaded=new Set();
let batch=[],batchTimer=null,observer=null,queued=false;
const photoIds=new WeakMap();
function makeSlot(index,large){
 const slot=document.createElement('span');
 slot.className=large?'gv511-photo gv511-detail-photo':'gv511-photo gv511-thumb';
 slot.dataset.gv511Photo=String(index);
 slot.setAttribute('aria-hidden','true');
 return slot;
}
function photoTargets(){
 if(typeof state==='undefined')return [];
 const main=document.getElementById('main');if(!main)return [];
 const result=[];
 if(main.querySelector('.gv196-country-landmarks')){
  main.querySelectorAll('.gv197-minimal-card[data-item^="tourism:"]').forEach(card=>{
   const m=/^tourism:(\d+)$/.exec(card.dataset.item||'');if(!m)return;
   const index=Number(m[1]);if(!catalog()[index])return;
   let slot=card.querySelector('.gv511-thumb');
   if(!slot){slot=makeSlot(index,false);card.insertBefore(slot,card.firstChild)}
   result.push({index,slot,root:card});
  });
 }
 if(main.querySelector('.gv196-detail')){
  const detailNode=main.querySelector('.gv196-detail');
  const idFromNode=detailNode?.querySelector('[data-item^="tourism:"]')?.dataset.item?.split(':')[1];
  const itemIndex=Number(state.item);
  const row=catalog()[Number.isInteger(itemIndex)&&itemIndex>=0?itemIndex:Number(idFromNode)],header=main.querySelector('.gv196-detail > .gv196-hero');
  if(row&&header){
   // Geo Signature: a consistent CSS-only geographic motif, no external flag requests.
   header.classList.remove('gv525-country-flag');
   header.style.removeProperty('--gv-country-flag');
   header.classList.add('gv531-geo-signature');
   let slot=main.querySelector('.gv196-detail > .gv511-detail-photo');
   if(slot&&Number(slot.dataset.gv511Photo)!==row.index){slot.remove();slot=null}
   if(!slot){slot=makeSlot(row.index,true);header.insertAdjacentElement('afterend',slot)}
   result.push({index:row.index,slot,root:header});
  }
 }
 if(main.querySelector('.gv170-tourism-photo[data-gv170-photo]')){
  main.querySelectorAll('.gv170-tourism-photo[data-gv170-photo]').forEach(slot=>{
   const index=Number(slot.dataset.gv170Photo);
   if(catalog()[index])result.push({index,slot,root:slot});
  });
 }
 return result;
}
function paint(slot,index,src){
 if(!src||!slot.isConnected||slot.dataset.gv511Loaded===src)return;
 // Load off-DOM first: the visual slot is intentionally display:none until
 // ready. A lazy image inside a display:none element may never be requested.
 if(slot.dataset.gv511Loading===src)return;
 slot.dataset.gv511Loading=src;
 const img=new Image();
 img.className='gv511-img';img.alt='';img.decoding='async';
 img.onload=()=>{
  if(!slot.isConnected)return;
  delete slot.dataset.gv511Loading;
  if(slot.dataset.gv511Loaded===src)return;
  slot.querySelector('img.gv511-img')?.remove();
  slot.appendChild(img);
  if(slot.classList.contains('gv511-detail-photo')&&img.naturalWidth&&img.naturalHeight){
   slot.style.setProperty('--gv511-photo-ratio',String(img.naturalWidth/img.naturalHeight));
  }
  // Subtle backdrop uses the very same verified image, never a different photo.
  slot.style.setProperty('--gv511-backdrop','url('+JSON.stringify(src)+')');
  slot.dataset.gv511Loaded=src;
  slot.classList.add('gv511-loaded');
  if(slot.classList.contains('gv511-thumb'))slot.closest('.gv197-minimal-card')?.classList.add('gv511-has-photo');
 };
 img.onerror=()=>{
  delete slot.dataset.gv511Loading;
  slot.dataset.gv511Failed='1';
 };
 img.src=src;
}

/* gv540 — Optional Commons photo upgrade.
 * Only consider Wikimedia-hosted real photographs whose Commons filename
 * strongly matches the exact landmark article. Never use a generic place
 * search or a result with weak identity. Fall back to article thumbnail.
 * Filename filtering reduces (but cannot guarantee absence of) people. */
const curating=new Set(), curated=new Set();
const curationQueue=[];
let curationActive=0;
const badPhotoTerms=/\b(selfie|portrait|tourist|tourists|crowd|people|person|woman|man|group|visitors|painting|drawing|illustration|diagram|map|model|replica|poster|logo|flag|icon|screenshot|festival|ceremony|wedding|protest)\b/i;
const goodPhotoTerms=/\b(panorama|panoramic|overview|exterior|facade|landscape|wide|aerial|sunset|sunrise|dusk|night|architecture|temple|palace|mosque|pyramid|monument)\b/i;
function matchTerms(text){
 return normalize(text).replace(/^(?:file:)/,'').replace(/\.(?:jpg|jpeg|png|webp)$/i,'')
  .replace(/[^a-z0-9 ]/gi,' ').split(/\s+/)
  .filter(w=>w.length>2&&!/^(the|and|for|with|from|old|new|photo|image|view|near|site|city|main|building)$/.test(w))
  .map(w=>w.replace(/(?:ies)$/,'y').replace(/s$/,''));
}
function rankCommonsImage(page,item){
 const info=page.imageinfo?.[0],title=page.title||'';
 if(!info||!eligible(info.thumburl)||!/^image\/(?:jpeg|png|webp)$/i.test(info.mime||'')||badPhotoTerms.test(title))return null;
 if((info.width||0)<1400||(info.height||0)<700)return null;
 const words=matchTerms(title),terms=matchTerms(titleFor(item));
 if(!terms.length)return null;
 const hits=terms.filter(t=>words.some(w=>w===t||w.startsWith(t)&&t.length>4||t.startsWith(w)&&w.length>5)).length;
 const coverage=hits/terms.length;
 // Require at least two distinctive tokens unless the article is one name.
 if(hits<Math.min(2,terms.length)||coverage<.55)return null;
 const ratio=(info.width||1)/(info.height||1);
 if(ratio<1.05||ratio>3.2)return null;
 const score=hits*4+coverage*5+Math.min(ratio,2.5)+
  (goodPhotoTerms.test(title)?2:0)+(info.width>=2500?2:0);
 return {url:info.thumburl,score};
}
function refinePhoto(index){
 if(curated.has(index)||curating.has(index))return;
 const item=catalog()[index],title=titleFor(item);
 if(!item||!title)return;
 curated.add(index);
 curationQueue.push({index,title});
 pumpCuration();
}
function pumpCuration(){
 while(curationActive<2&&curationQueue.length){
  const {index,title}=curationQueue.shift();
  const item=catalog()[index];if(!item)continue;
  curating.add(index);curationActive++;
  const params=new URLSearchParams({
   action:'query',format:'json',formatversion:'2',generator:'search',
   gsrnamespace:'6',gsrlimit:'15',gsrsearch:title,
   prop:'imageinfo',iiprop:'url|size|mime',iiurlwidth:'1600',origin:'*'
  });
  fetch('https://commons.wikimedia.org/w/api.php?'+params.toString(),{mode:'cors',credentials:'omit'})
   .then(r=>{if(!r.ok)throw Error('Commons '+r.status);return r.json()})
   .then(data=>{
    const candidates=(data.query?.pages||[]).map(p=>rankCommonsImage(p,item)).filter(Boolean).sort((a,b)=>b.score-a.score);
    const chosen=candidates[0];
    if(!chosen||chosen.score<13||cache.get(index)===chosen.url)return;
    // No output changes until the candidate has loaded successfully.
    const test=new Image();
    test.onload=()=>{
     cache.set(index,chosen.url);
     document.querySelectorAll('[data-gv511-photo="'+index+'"]').forEach(slot=>{
      if(slot.classList.contains('gv511-photo'))paint(slot,index,chosen.url);
     });
     probe.methods.commons=(probe.methods.commons||0)+1;
    };
    test.src=chosen.url;
   })
   .catch(e=>{probe.lastCurationError=String(e)})
   .finally(()=>{curating.delete(index);curationActive--;pumpCuration()});
 }
}

function commit(index,src){
 cache.set(index,src||null);
 if(src)refinePhoto(index);
 for(const [slot,refIndex] of pending.entries()){
  if(refIndex===index){pending.delete(slot);if(src)paint(slot,index,src)}
 }
}
// Two independent Wikimedia read paths. Exact article title only; no search
// that can silently replace a landmark with a different place.
const probe=window.GeoVerseTourismPhotoDiagnostics={version:'gv516',requests:0,loaded:0,failed:0,lastError:'',methods:{api:0,rest:0,commons:0}};
function originalTitle(item){return titleFor(item)}
function restPhoto(title){
 const url='https://en.wikipedia.org/api/rest_v1/page/summary/'+encodeURIComponent(title.replace(/ /g,'_'));
 return fetch(url,{mode:'cors',credentials:'omit'}).then(r=>{
  if(!r.ok)throw Error('REST HTTP '+r.status);
  return r.json();
 }).then(data=>{
  const src=data?.thumbnail?.source||data?.originalimage?.source;
  if(!eligible(src)||data?.type==='disambiguation')throw Error('REST no valid photo');
  probe.methods.rest++;return src;
 });
}
function actionPhotos(items){
 const params=new URLSearchParams({action:'query',format:'json',formatversion:'2',prop:'pageimages',piprop:'thumbnail',pithumbsize:'1600',redirects:'1',origin:'*',titles:items.map(x=>x.title).join('|')});
 return fetch('https://en.wikipedia.org/w/api.php?'+params.toString(),{mode:'cors',credentials:'omit'})
 .then(r=>{if(!r.ok)throw Error('Action HTTP '+r.status);return r.json()})
 .then(payload=>{
  if(payload?.error)throw Error('MediaWiki '+(payload.error.code||'error'));
  const q=payload.query||{};
  const redirects=new Map([...(q.normalized||[]),...(q.redirects||[])].map(x=>[normalize(x.from),normalize(x.to)]));
  const pages=new Map((q.pages||[]).filter(x=>x.title).map(x=>[normalize(x.title),x]));
  return items.map(({index,title})=>{
   let key=normalize(title);
   for(let j=0;j<5&&redirects.has(key);j++)key=redirects.get(key);
   const page=pages.get(key);
   const url=page?.thumbnail?.source;
   if(eligible(url)&&!page?.missing){probe.methods.api++;return {index,src:url,title}}
   return {index,src:null,title};
  });
 });
}
function fetchBatch(items){
 probe.requests+=items.length;
 actionPhotos(items).then(results=>{
  for(const {index,src,title} of results){
   if(src){commit(index,src);probe.loaded++}
   else restPhoto(title).then(u=>{commit(index,u);probe.loaded++})
    .catch(e=>{probe.failed++;probe.lastError=String(e);commit(index,null)});
  }
 }).catch(error=>{
  probe.lastError=String(error);
  for(const {index,title} of items){
   restPhoto(title).then(u=>{commit(index,u);probe.loaded++})
    .catch(e=>{probe.failed++;probe.lastError=String(e);commit(index,null)});
  }
 });
}

function flush(){
 batchTimer=null;if(!batch.length)return;
 const items=batch;batch=[];
 for(let i=0;i<items.length;i+=12)fetchBatch(items.slice(i,i+12));
}
function request(index){
 if(loaded.has(index))return;
 const item=catalog()[index],title=titleFor(item);
 if(!title){commit(index,null);return}
 loaded.add(index);batch.push({index,title});
 if(!batchTimer)batchTimer=setTimeout(flush,70);
}
function view(index,slot){
 if(!slot?.isConnected||!catalog()[index])return;
 if(cache.has(index)){const src=cache.get(index);if(src)paint(slot,index,src);return}
 pending.set(slot,index);request(index);
}
function watch(index,slot,root){
 if(watchers.has(slot))return;
 watchers.add(slot);
 // A country contains only 15 cards: request immediately instead of waiting for
 // an IntersectionObserver to fire inside a nested, independently scrolling pane.
 // Keep the existing batching/cache and off-DOM image preload safeguards.
 if(slot.classList.contains('gv511-thumb')||slot.classList.contains('gv511-detail-photo')){
  view(index,slot);return;
 }
 if(!observer){view(index,slot);return}
 photoIds.set(root,{index,slot});
 observer.observe(root);
}
function scan(){
 queued=false;
 for(const x of photoTargets())watch(x.index,x.slot,x.root);
}
function schedule(){
 if(queued)return;queued=true;requestAnimationFrame(scan);
}
if('IntersectionObserver' in window){
 observer=new IntersectionObserver(entries=>{
  for(const entry of entries){
   if(!entry.isIntersecting)continue;
   const job=photoIds.get(entry.target);
   observer.unobserve(entry.target);
   if(job)view(job.index,job.slot);
  }
 },{rootMargin:'250px 0px'});
}
const previousRender=typeof render==='function'?render:null;
if(previousRender)render=function(){
 const result=previousRender.apply(this,arguments);
 schedule();return result;
};
const main=document.getElementById('main');
if(main)new MutationObserver(schedule).observe(main,{childList:true,subtree:true});
schedule();
})();
