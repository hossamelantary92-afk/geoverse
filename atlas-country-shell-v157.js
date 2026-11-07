/* GeoVerse v157 — self-contained country card repair and protected atlas viewport.
 * Editorial atlas only: preserve 3D globe, quizzes, pinch gesture code and ocean dots.
 */
(function(){
'use strict';
const ids=['worldMap','detailMap'];
const watches=new WeakMap();
const localized=(ar,en)=>document.documentElement.lang==='en'?en:ar;
function repair(map){
 if(!map?.isConnected||!map.classList.contains('gv140-map'))return;
 const stage=map.querySelector('.atlas-stage'),svg=stage?.querySelector('.atlas-svg');
 if(!stage||!svg)return;
 const bar=stage.querySelector('.gv140-topbar'),chips=stage.querySelector('.gv140-region-strip');
 const rect=stage.getBoundingClientRect();
 const bottomOf=node=>node?.getBoundingClientRect()?.bottom||rect.top;
 const reservedTop=Math.max(120,Math.ceil(Math.max(bottomOf(bar),bottomOf(chips))-rect.top+18));
 stage.style.setProperty('--gv157-map-top',reservedTop+'px');
 const card=stage.querySelector('.gv140-country-card');
 if(!card||card.hidden)return;
 if(card.querySelector('[data-gv142-open]'))return;
 const isCountry=!!card.querySelector('.gv140-map-clear')||!!card.querySelector('.gv140-card-overline');
 if(!isCountry)return;
 card.classList.add('gv157-country-card');
 card.classList.remove('gv153-card-open','gv142-landmark-card','gv154-smart-card');
 card.setAttribute('dir',document.documentElement.lang==='en'?'ltr':'rtl');
 if(card.querySelector('[data-gv155-close],[data-gv156-close],[data-gv157-close]'))return;
 let header=card.querySelector('.gv155-card-heading,.gv157-country-header');
 if(!header){
  header=document.createElement('div');
  header.className='gv155-card-heading gv157-country-header';
  const subtitle=card.querySelector('.gv140-card-overline');
  if(subtitle)header.appendChild(subtitle);
  card.prepend(header);
 }
 const close=document.createElement('button');
 close.type='button';
 close.className='gv155-close gv157-close';
 close.dataset.gv157Close='1';
 close.textContent='×';
 close.setAttribute('aria-label',localized('إغلاق تفاصيل الدولة','Close country details'));
 header.appendChild(close);
}
function attach(map){
 if(!map?.isConnected||watches.has(map))return;
 let scheduled=0;
 const schedule=()=>{
  if(scheduled)return;
  scheduled=requestAnimationFrame(()=>{scheduled=0;repair(map)});
 };
 const observer=new MutationObserver(mutations=>{
  if(!map.isConnected){observer.disconnect();resize?.disconnect();return}
  // Ignore changes outside the card and relevant atlas shell.
  if(mutations.some(m=>m.type==='childList'||(m.type==='attributes'&&m.attributeName==='hidden')))schedule();
 });
 observer.observe(map,{subtree:true,childList:true,attributes:true,attributeFilter:['hidden']});
 const resize=typeof ResizeObserver==='function'?new ResizeObserver(schedule):null;
 if(map.querySelector('.atlas-stage'))resize?.observe(map.querySelector('.atlas-stage'));
 watches.set(map,{observer,resize,schedule});
 schedule();
}
function scan(){ids.forEach(id=>attach(document.getElementById(id)))}
const previous=typeof atlasCreate==='function'?atlasCreate:null;
if(previous){
 atlasCreate=function(){
  const value=previous.apply(this,arguments);
  scan();
  return value;
 };
}
document.addEventListener('click',event=>{
 const button=event.target.closest?.('[data-gv157-close]');
 if(!button)return;
 const map=button.closest?.('#worldMap,#detailMap');
 if(!map)return;
 event.preventDefault();event.stopImmediatePropagation();
 const card=map.querySelector('.gv140-country-card');
 if(card)card.hidden=true;
 map.querySelectorAll('.atlas-country').forEach(el=>el.classList.remove('gv140-active','highlight'));
},true);
document.addEventListener('DOMContentLoaded',scan,{once:true});
scan();
})();