/* GeoVerse v156 — card layout consistency even if an older country renderer runs.
 * Only enhanced editorial 2D atlas cards; preserves globe, pinch and games.
 */
(function(){
 'use strict';
 const ids=['worldMap','detailMap'];
 const observers=new WeakMap();
 const language=(ar,en)=>document.documentElement.lang==='en'?en:ar;
 let queued=false;
 function normalize(map){
  if(!map?.classList?.contains('gv140-map'))return;
  const card=map.querySelector('.gv140-country-card');
  if(!card||card.hidden)return;
  const landmark=!!card.querySelector('[data-gv142-open]');
  if(landmark){
   card.classList.remove('gv155-country-card','gv156-country');
   card.classList.add('gv156-landmark');
   return;
  }
  const isCountry=!!card.querySelector('.gv140-map-clear')||!!card.querySelector('.gv140-card-overline');
  if(!isCountry)return;
  card.classList.remove('gv153-card-open','gv142-landmark-card','gv154-smart-card','gv156-landmark');
  card.classList.add('gv155-country-card','gv156-country');
  card.setAttribute('dir',document.documentElement.lang==='en'?'ltr':'rtl');
  if(card.querySelector('[data-gv155-close],[data-gv156-close]'))return;
  let row=card.querySelector('.gv155-card-heading');
  if(!row){
   row=document.createElement('div');
   row.className='gv155-card-heading';
   const overline=card.querySelector('.gv140-card-overline');
   if(overline)row.appendChild(overline);
   card.prepend(row);
  }
  const close=document.createElement('button');
  close.type='button';
  close.className='gv155-close gv156-close';
  close.dataset.gv156Close='1';
  close.setAttribute('aria-label',language('إغلاق بطاقة الدولة','Close country details'));
  close.textContent='×';
  row.appendChild(close);
 }
 function mount(map){
  if(!map||observers.has(map))return;
  const observer=new MutationObserver(()=>{
   if(!map.isConnected){observer.disconnect();return}
   const card=map.querySelector('.gv140-country-card');
   if(card&&!card.hidden)normalize(map);
  });
  observer.observe(map,{childList:true,subtree:true});
  observers.set(map,observer);
  normalize(map);
 }
 function check(){
  ids.forEach(id=>mount(document.getElementById(id)));
 }
 const previous=typeof atlasCreate==='function'?atlasCreate:null;
 if(previous){
  atlasCreate=function(){
   const result=previous.apply(this,arguments);
   check();
   return result;
  };
 }
 document.addEventListener('click',event=>{
  const close=event.target.closest?.('[data-gv155-close],[data-gv156-close]');
  if(!close)return;
  const map=close.closest?.('#worldMap,#detailMap');
  if(!map)return;
  event.preventDefault();
  event.stopImmediatePropagation();
  const card=map.querySelector('.gv140-country-card');
  if(card)card.hidden=true;
  map.querySelectorAll('.atlas-country').forEach(el=>el.classList.remove('gv140-active','highlight'));
 },true);
 document.addEventListener('DOMContentLoaded',check,{once:true});
 check();
})();