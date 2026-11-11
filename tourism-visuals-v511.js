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
/* gv542 — Fifteen user-approved Egypt tourism photographs (verified Commons files).
   Exact title matching prevents unrelated automated Commons search substitutions.
   Same URL in both photo placements; detailed attributions linked on landmark pages. */
const egyptApprovedPhotos=new Map([
 [
  "Giza_pyramid_complex",
  "Pyramids from Giza.jpg",
  "Simon Matzinger",
  "CC BY 4.0"
 ],
 [
  "Great_Sphinx_of_Giza",
  "The Great Sphinx of Giza with the Great Pyramid in the background.jpg",
  "Slyronit",
  "CC BY-SA 4.0"
 ],
 [
  "Karnak",
  "The Great Hypostyle Hall - Karnak Temple.jpg",
  "Yassmin Anwar",
  "CC BY-SA 4.0"
 ],
 [
  "Abu_Simbel",
  "ABU SIMBEL.jpg",
  "Gatoclavo",
  "CC BY-SA 3.0"
 ],
 [
  "Cairo_Citadel",
  "Mosque of Muhammad Ali (1).jpg",
  "Mohamed abdelzaher",
  "CC BY-SA 4.0"
 ],
 [
  "Khan_el-Khalili",
  "Khan el-Khalili.jpg",
  "A maraqa",
  "CC BY-SA 4.0"
 ],
 [
  "Citadel_of_Qaitbay",
  "The Citadel of Qaitbay From the sea.jpg",
  "Amel Esmail",
  "CC BY-SA 4.0"
 ],
 [
  "Valley_of_the_Kings",
  "Valley of the Kings panorama.jpg",
  "Nikola Smolenski",
  "CC BY-SA 3.0 RS"
 ],
 [
  "Egyptian_Museum",
  "Facade of the Egyptian Museum, Tahrir Square, Cairo, Egypt1.jpg",
  "Diego Delso",
  "CC BY-SA 3.0"
 ],
 [
  "Al-Azhar_Mosque",
  "Architectural views and courtyard details of the Al-Azhar Mosque in Cairo from 2026 09.jpg",
  "CumaliOnal",
  "CC BY-SA 4.0"
 ],
 [
  "Hanging_Church",
  "The entrance to the Hanging Church and the Dome of the Church of Mary Girgis.JPG",
  "Ahmed Younis Sif Saad",
  "CC BY-SA 4.0"
 ],
 [
  "Luxor_Temple",
  "Luxor temple at night.jpg",
  "Sherif217",
  "CC BY-SA 4.0"
 ],
 [
  "Philae_temple_complex",
  "The Philae temple.jpg",
  "Mohamed abdelzaher",
  "CC BY-SA 4.0"
 ],
 [
  "Wadi_El_Rayan",
  "Wadi El-Rayan Waterfalls.jpg",
  "Mahmoud Esmat",
  "CC BY-SA 4.0"
 ],
 [
  "Saint_Catherine's_Monastery",
  "St Catherines From Sinai.JPG",
  "Mark A. Wilson",
  "Public domain"
 ]
].map(([wiki,file,author,license])=>[
 wiki,{file,author,license,
  page:'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(file.replace(/ /g,'_')),
  image:'https://commons.wikimedia.org/wiki/Special:FilePath/'+encodeURIComponent(file.replace(/ /g,'_'))+'?width=1600'
 }
]));
const egyptFailedPhotos=new Set();
function approvedPhoto(index){
 const item=catalog()[index];
 return item?.code==='EG'?egyptApprovedPhotos.get(item.wiki):null;
}
function photoCredit(slot,index,src){
 if(!slot.classList.contains('gv511-detail-photo'))return;
 slot.querySelector('.gv542-photo-credit')?.remove();
 const photo=approvedPhoto(index);
 if(!photo||!src.includes('/Special:FilePath/'))return;
 slot.removeAttribute('aria-hidden');
 const a=document.createElement('a');
 a.className='gv542-photo-credit';a.href=photo.page;
 a.target='_blank';a.rel='noopener noreferrer';
 a.textContent='© '+photo.author+' · '+photo.license;
 a.title='Wikimedia Commons · '+photo.license;
 a.style.cssText='position:absolute;bottom:10px;left:10px;z-index:5;max-width:calc(100% - 24px);padding:5px 9px;border-radius:9px;background:rgba(5,30,43,.78);color:#d9fff8;font:600 10px/1.5 Cairo,system-ui,sans-serif;text-decoration:none;box-shadow:0 2px 12px rgba(0,0,0,.19);direction:ltr;text-align:left;white-space:normal';
 slot.appendChild(a);
}

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
  photoCredit(slot,index,src);
  if(slot.classList.contains('gv511-thumb'))slot.closest('.gv197-minimal-card')?.classList.add('gv511-has-photo');
 };
 img.onerror=()=>{
  delete slot.dataset.gv511Loading;
  slot.dataset.gv511Failed='1';
  const p=approvedPhoto(index);
  if(p&&src===p.image&&!egyptFailedPhotos.has(index)){
   egyptFailedPhotos.add(index);
   cache.delete(index);
   loaded.delete(index);
   document.querySelectorAll('[data-gv511-photo="'+index+'"]').forEach(target=>{
    if(target.classList.contains('gv511-photo'))pending.set(target,index);
   });
   request(index);
  }
 };
 img.src=src;
}

function commit(index,src){
 cache.set(index,src||null);
 for(const [slot,refIndex] of pending.entries()){
  if(refIndex===index){pending.delete(slot);if(src)paint(slot,index,src)}
 }
}
// Two independent Wikimedia read paths. Exact article title only; no search
// that can silently replace a landmark with a different place.
const probe=window.GeoVerseTourismPhotoDiagnostics={version:'gv516',requests:0,loaded:0,failed:0,lastError:'',methods:{api:0,rest:0}};
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
 const params=new URLSearchParams({action:'query',format:'json',formatversion:'2',prop:'pageimages',piprop:'thumbnail',pithumbsize:'1000',redirects:'1',origin:'*',titles:items.map(x=>x.title).join('|')});
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
 const selected=approvedPhoto(index);
 if(selected&&!egyptFailedPhotos.has(index)){
  paint(slot,index,selected.image);
  return;
 }
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
