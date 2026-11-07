/* GeoVerse v164 — enrich existing landmark Smart Cards with the site's verified photo manifest
   and editorial facts. Never changes globe, quiz, navigation, or existing card controls. */
(function(){
'use strict';
const maps=['worldMap','detailMap'];
let photos={},stories={};
const escapeHTML=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const lang=(ar,en)=>document.documentElement.lang==='en'?en:ar;
function usablePhoto(src){
 if(typeof src!=='string'||!/^https:\/\/(?:upload|thumb)\.wikimedia\.org\//i.test(src))return false;
 let name;try{name=decodeURIComponent(src.split('?')[0]).split('/').pop().replace(/^\d+px-/,'')}catch(e){return false}
 return !/(\.svg(?:\.png)?$|(?:^|[_ -])(?:map|locator|orthographic|projection|diagram|schematic|globe)(?:[_ .-]|$)|cia[_ -]?wfb|location[_ -]|_in_its_region)/i.test(name);
}
function enrich(card){
 if(!card.isConnected||card.hidden||!card.classList.contains('gv154-smart-card'))return;
 const btn=card.querySelector('[data-gv142-open]');
 if(!btn)return;
 const key=btn.dataset.gv142Open;
 if(card.dataset.gv164Key===key)return;
 const pos=key.lastIndexOf(':'),category=key.slice(0,pos),index=Number(key.slice(pos+1));
 if(pos<0||!Number.isInteger(index)||!Array.isArray(geo?.[category]?.[index]))return;
 const place=geo[category][index];
 card.dataset.gv164Key=key;
 card.classList.add('gv164-enhanced');
 const heading=card.querySelector('.gv140-card-title'),description=card.querySelector('.gv142-landmark-description');
 if(!heading)return;
 const photo=photos[key],story=stories[place[1]];
 const photoUrl=Array.isArray(photo)&&usablePhoto(photo[0])?photo[0]:null;
 const factData=story&&document.documentElement.lang!=='en'&&Array.isArray(story.factsAr)?story.factsAr.filter(f=>Array.isArray(f)&&f.length>=2&&f[0]&&f[1]).slice(0,2):[];
 // Short, editorial detail takes precedence over an invented fact or approximation.
 const teaser=document.createElement('div');teaser.className='gv164-body';
 if(photoUrl){
  const visual=document.createElement('div');visual.className='gv164-visual';
  const img=document.createElement('img');img.loading='lazy';img.decoding='async';img.referrerPolicy='no-referrer';
  img.alt=lang('صورة: ','Photo: ')+lang(place[0],place[1]);
  img.addEventListener('error',()=>{visual.remove();teaser.classList.remove('gv164-has-image')},{once:true});
  visual.appendChild(img);teaser.appendChild(visual);teaser.classList.add('gv164-has-image');img.src=photoUrl;
 }
 const copy=document.createElement('div');copy.className='gv164-copy';
 if(description)copy.appendChild(description);
 if(factData.length){
  const facts=document.createElement('dl');facts.className='gv164-facts';
  for(const pair of factData){
   const item=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');
   dt.textContent=pair[0];dd.textContent=pair[1];item.append(dt,dd);facts.appendChild(item);
  }
  copy.appendChild(facts);
 }
 teaser.appendChild(copy);
 heading.insertAdjacentElement('afterend',teaser);
}
function mount(map){
 const card=map.querySelector('.gv140-country-card');
 if(!card||card.dataset.gv164Listening)return;
 card.dataset.gv164Listening='1';
 const obs=new MutationObserver(()=>{if(!card.isConnected){obs.disconnect();return}enrich(card)});
 obs.observe(card,{childList:true,attributes:true,attributeFilter:['class','hidden'],subtree:false});
 enrich(card);
}
function scan(){for(const id of maps){const map=document.getElementById(id);if(map)mount(map)}}
const prior=typeof atlasCreate==='function'?atlasCreate:null;
if(prior)atlasCreate=function(){const result=prior.apply(this,arguments);scan();return result};
const main=document.getElementById('main');
if(main)new MutationObserver(scan).observe(main,{childList:true});
scan();
Promise.allSettled([
 fetch('./photo-manifest-v13.json?v=gv164-card-images').then(r=>{if(!r.ok)throw Error('photos');return r.json()}),
 fetch('./geo-stories.json?v=gv164-card-facts').then(r=>{if(!r.ok)throw Error('stories');return r.json()})
]).then(results=>{
 if(results[0].status==='fulfilled')photos=results[0].value.photos||{};
 if(results[1].status==='fulfilled')stories=results[1].value.stories||{};
 for(const id of maps){
  const card=document.getElementById(id)?.querySelector('.gv140-country-card');
  if(card){delete card.dataset.gv164Key;const existing=card.querySelector('.gv164-body');if(existing){const desc=existing.querySelector('.gv142-landmark-description');if(desc)existing.insertAdjacentElement('beforebegin',desc);existing.remove()}enrich(card)}
 }
});
})();
