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
  const row=catalog()[Number.isInteger(state.item)?state.item:Number(idFromNode)],header=main.querySelector('.gv196-detail > .gv196-hero');
  if(row&&header){
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
 const target=slot.classList.contains('gv170-tourism-photo')?slot:slot;
 if(target.querySelector('img.gv511-img'))return;
 const img=document.createElement('img');
 img.className='gv511-img';img.alt='';
 img.loading='lazy';img.decoding='async';
 img.addEventListener('load',()=>{
  if(!slot.isConnected)return;
  slot.dataset.gv511Loaded=src;
  slot.classList.add('gv511-loaded');
  if(slot.classList.contains('gv511-thumb'))slot.closest('.gv197-minimal-card')?.classList.add('gv511-has-photo');
 },{once:true});
 img.addEventListener('error',()=>{img.remove();slot.dataset.gv511Failed='1'}, {once:true});
 target.appendChild(img);img.src=src;
}
function commit(index,src){
 cache.set(index,src||null);
 for(const [slot,refIndex] of pending.entries()){
  if(refIndex===index){pending.delete(slot);if(src)paint(slot,index,src)}
 }
}
function fetchBatch(items){
 const titles=[...new Set(items.map(x=>x.title))];
 if(!titles.length)return;
 const params=new URLSearchParams({action:'query',format:'json',formatversion:'2',prop:'pageimages',piprop:'thumbnail',pithumbsize:'1280',redirects:'1',origin:'*',titles:titles.join('|')});
 fetch('https://en.wikipedia.org/w/api.php?'+params.toString(),{mode:'cors'})
 .then(r=>{if(!r.ok)throw Error('Wikimedia request '+r.status);return r.json()})
 .then(payload=>{
  const q=payload.query||{};
  const redirects=new Map([...(q.normalized||[]),...(q.redirects||[])].map(x=>[normalize(x.from),normalize(x.to)]));
  const pages=new Map((q.pages||[]).filter(x=>x.title).map(x=>[normalize(x.title),x]));
  for(const {index,title} of items){
   let key=normalize(title);
   for(let j=0;j<5&&redirects.has(key);j++)key=redirects.get(key);
   const page=pages.get(key);
   const url=page?.thumbnail?.source;
   commit(index,page&&!page.missing&&eligible(url)?url:null);
  }
 }).catch(()=>{for(const {index} of items)commit(index,null)});
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
 if(!observer){view(index,slot);return}
 observer.observe(root);
 photoIds.set(root,{index,slot});
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
