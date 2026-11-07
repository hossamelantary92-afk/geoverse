/* GeoVerse v152 — guaranteed synchronized dual Pacific name bubbles on both edges.
 * Two visible Pacific Ocean dots share exactly the same atlas item.
 * Strictly scoped to editorial 2D maps; no quiz or 3D globe changes.
 */
(function(){
'use strict';
const validIds=new Set(['worldMap','detailMap']);
const ns='http://www.w3.org/2000/svg';
const mounted=new WeakSet();
const activeSelections=new WeakMap();
const lang=(ar,en)=>document.documentElement.lang==='en'?en:ar;
const active=()=>typeof activeLayer!=='undefined'&&activeLayer==='oceans';
function getRuntime(){
 const r=typeof atlasRuntime!=='undefined'?atlasRuntime:null;
 return r&&validIds.has(r.id)&&r.node?.isConnected?r:null;
}
function closeBubble(r){
 const node=r?.node;if(!node)return;
 node.querySelectorAll('.gv150-ocean-bubble').forEach(bubble=>bubble.remove());
 node.querySelectorAll('.gv150-ocean-active').forEach(el=>el.classList.remove('gv150-ocean-active'));
 activeSelections.delete(r);
}
function clean(r){
 if(!r?.node)return;
 r.node.querySelectorAll('.gv147-ocean-labels,.gv148-ocean-overlay,.gv145-label').forEach(el=>el.remove());
}
function decorate(r){
 if(!r?.node?.isConnected)return;
 clean(r);
 const group=r.node.querySelector('.atlas-pins');
 if(!group)return;
 if(!active()){
  group.querySelectorAll('.gv150-pacific-east').forEach(el=>el.remove());
  closeBubble(r);
  return;
 }
 for(const marker of group.querySelectorAll('.atlas-pin[data-map-pin^="oceans:"]')){
  marker.classList.add('gv150-ocean-pin');
  marker.querySelectorAll('title,.gv145-label').forEach(el=>el.remove());
  const i=Number(marker.dataset.mapPin?.split(':')[1]);
  const place=typeof geo!=='undefined'?geo.oceans?.[i]:null;
  if(!place)continue;
  marker.setAttribute('aria-label',lang(place[0],place[1]));
  marker.setAttribute('role','button');
  marker.setAttribute('tabindex','0');
  if(marker.querySelector('.gv142-hit-circle')){
   marker.querySelector('.gv142-hit-circle').setAttribute('r','16');
  }
 }
 // A flat world map cuts the Pacific at +/-180°. Two symbols point to
 // the same oceans:0 record, not two different geographic entities.
 if(r.id==='worldMap'&&!group.querySelector('.gv150-pacific-east')){
  const xy=r.proj?.([150,0]);
  const record=typeof geo!=='undefined'?geo.oceans?.[0]:null;
  if(xy&&xy.every(Number.isFinite)&&record){
   const p=document.createElementNS(ns,'g');
   p.setAttribute('class','atlas-pin gv150-ocean-pin gv150-pacific-east');
   p.setAttribute('transform','translate('+xy[0].toFixed(2)+' '+xy[1].toFixed(2)+')');
   p.dataset.mapPin='oceans:0';
   p.setAttribute('role','button');
   p.setAttribute('tabindex','0');
   p.setAttribute('aria-label',lang(record[0],record[1]));
   const ring=document.createElementNS(ns,'circle');
   ring.setAttribute('r','15');
   ring.setAttribute('class','gv150-dot-touch');
   const halo=document.createElementNS(ns,'circle');
   halo.setAttribute('r','8');
   halo.setAttribute('class','atlas-pin-halo');
   const dot=document.createElementNS(ns,'circle');
   dot.setAttribute('r','3.8');
   dot.setAttribute('class','atlas-pin-dot');
   p.append(ring,halo,dot);
   group.appendChild(p);
  }
 }
 const selected=activeSelections.get(r);
 if(selected!==undefined){
  group.querySelectorAll('.atlas-pin[data-map-pin="oceans:'+selected+'"]').forEach(el=>el.classList.add('gv150-ocean-active'));
 }
}
function popupPosition(r,marker,popup){
 const stage=r.node.querySelector('.atlas-stage'),svg=r.node.querySelector('svg');
 if(!stage||!svg||!popup||!marker?.isConnected)return;
 const rect=stage.getBoundingClientRect(),matrix=marker.getScreenCTM?.();
 if(!matrix||!rect.width)return;
 try{
  const origin=svg.createSVGPoint();
  origin.x=0;origin.y=0;
  const loc=origin.matrixTransform(matrix);
  const x=loc.x-rect.left,y=loc.y-rect.top;
  const half=Math.min(110,Math.max(62,(popup.offsetWidth||140)/2+8));
  popup.style.left=Math.max(half,Math.min(rect.width-half,x)).toFixed(1)+'px';
  popup.style.top=Math.max(150,Math.min(rect.height-115,y-19)).toFixed(1)+'px';
 }catch(e){}
}
function popupFallbackPosition(r,popup){
 // Use known Atlantic-cut Pacific coordinates if an SVG marker is not yet
 // present at the moment of a tap. Never silently drop the second label.
 const svg=r.node.querySelector('.atlas-svg'),stage=r.node.querySelector('.atlas-stage');
 if(!svg||!stage||!popup)return;
 const west=popup.dataset.anchor!=='east';
 const point=r.proj?.([west?-150:150,0]);
 if(!point)return;
 const ctm=svg.getScreenCTM?.();
 const rect=stage.getBoundingClientRect();
 if(!ctm||!rect.width)return;
 const v=svg.viewBox.baseVal;
 // viewBox-adjusted SVG screen coordinates (same basis as the markers).
 const origin=svg.createSVGPoint();
 origin.x=point[0];origin.y=point[1];
 const screen=origin.matrixTransform(ctm);
 const half=Math.max(62,Math.min(112,(popup.offsetWidth||130)/2+8));
 popup.style.left=Math.max(half,Math.min(rect.width-half,screen.x-rect.left)).toFixed(1)+'px';
 popup.style.top=Math.max(150,Math.min(rect.height-115,screen.y-rect.top-19)).toFixed(1)+'px';
}
function bubbleFor(r,marker,index,entry,side){
 const stage=r.node.querySelector('.atlas-stage');
 if(!stage)return null;
 const bubble=document.createElement('div');
 bubble.className='gv150-ocean-bubble';
 bubble.setAttribute('role','status');
 bubble.setAttribute('aria-live','polite');
 bubble.dataset.ocean=String(index);
 bubble.dataset.anchor=side||(marker?.classList.contains('gv150-pacific-east')?'east':'original');
 bubble.lang=document.documentElement.lang==='en'?'en':'ar';
 bubble.dir=document.documentElement.lang==='en'?'ltr':'rtl';
 bubble.textContent=lang(entry[0],entry[1]);
 stage.appendChild(bubble);
 if(marker)popupPosition(r,marker,bubble);
 else popupFallbackPosition(r,bubble);
 return bubble;
}
function select(r,index,marker){
 const entry=typeof geo!=='undefined'?geo.oceans?.[index]:null;
 const stage=r.node.querySelector('.atlas-stage');
 if(!entry||!stage)return;
 const previous=activeSelections.get(r);
 const prior=stage.querySelector('.gv150-ocean-bubble');
 // Clicking an already selected ocean closes all of its labels together.
 if(previous===index&&prior){closeBubble(r);return}
 closeBubble(r);
 r.node.querySelector('.gv140-country-card')?.setAttribute('hidden','');
 r.node.querySelector('.atlas-popup')?.classList.add('hidden');
 r.node.querySelectorAll('.atlas-country').forEach(el=>el.classList.remove('gv140-active','highlight'));
 activeSelections.set(r,index);
 const markers=[...r.node.querySelectorAll('.atlas-pin[data-map-pin="oceans:'+index+'"]')];
 markers.forEach(el=>el.classList.add('gv150-ocean-active'));
 if(index===0&&r.id==='worldMap'){
  // Always show both labels even if one marker is initialized later.
  const west=markers.find(el=>!el.classList.contains('gv150-pacific-east'));
  const east=markers.find(el=>el.classList.contains('gv150-pacific-east'));
  bubbleFor(r,west||null,index,entry,'original');
  bubbleFor(r,east||null,index,entry,'east');
 }else{
  bubbleFor(r,marker||markers[0],index,entry);
 }
}
function oceanTarget(event,r){
 const pin=event.target?.closest?.('.atlas-pin[data-map-pin^="oceans:"]');
 if(!pin||!r.node.contains(pin))return null;
 const index=Number(pin.dataset.mapPin.split(':')[1]);
 return Number.isInteger(index)&&geo.oceans?.[index]?{pin,index}:null;
}
function attach(r){
 if(!r||mounted.has(r))return;
 const stage=r.node.querySelector('.atlas-stage'),svg=r.node.querySelector('.atlas-svg');
 if(!stage||!svg)return;
 mounted.add(r);
 // Stage capture runs before older country/landmark handlers bound to SVG.
 stage.addEventListener('click',event=>{
  if(!active())return;
  const target=oceanTarget(event,r);
  if(!target)return;
  event.preventDefault();event.stopImmediatePropagation();
  select(r,target.index,target.pin);
 },true);
 stage.addEventListener('keydown',event=>{
  if(!active()||(event.key!=='Enter'&&event.key!==' '))return;
  const target=oceanTarget(event,r);
  if(!target)return;
  event.preventDefault();event.stopImmediatePropagation();
  select(r,target.index,target.pin);
 },true);
 document.addEventListener('pointerdown',event=>{
  if(!r.node.isConnected||!active()||activeSelections.get(r)===undefined)return;
  if(event.target.closest?.('.gv150-ocean-bubble'))return;
  const target=event.target.closest?.('.atlas-pin[data-map-pin^="oceans:"]');
  if(target&&r.node.contains(target))return; // marker click owns toggle
  closeBubble(r);
 },true);
 let frame=0;
 const update=()=>{
  if(frame)return;
  frame=requestAnimationFrame(()=>{
   frame=0;
   if(!r.node.isConnected){watch.disconnect();resize?.disconnect();return}
   if(!active()){closeBubble(r);return}
   const index=activeSelections.get(r);
   if(index===undefined)return;
   for(const label of stage.querySelectorAll('.gv150-ocean-bubble')){
    const east=label.dataset.anchor==='east';
    const marker=r.node.querySelector('.atlas-pin[data-map-pin="oceans:'+index+'"]'+(east?'.gv150-pacific-east':':not(.gv150-pacific-east)'));
    if(marker)popupPosition(r,marker,label);
    else popupFallbackPosition(r,label);
   }
  });
 };
 const watch=new MutationObserver(update);
 watch.observe(svg,{attributes:true,attributeFilter:['viewBox']});
 const resize=typeof ResizeObserver==='function'?new ResizeObserver(update):null;
 resize?.observe(stage);
}
const prevDraw=typeof atlasDraw==='function'?atlasDraw:null;
if(prevDraw){
 atlasDraw=function(){
  const result=prevDraw.apply(this,arguments);
  const r=getRuntime();
  if(r){attach(r);decorate(r)}
  return result;
 };
}
const prevCreate=typeof atlasCreate==='function'?atlasCreate:null;
if(prevCreate){
 atlasCreate=function(){
  const result=prevCreate.apply(this,arguments);
  const r=getRuntime();
  if(r){attach(r);decorate(r)}
  return result;
 };
}
})();