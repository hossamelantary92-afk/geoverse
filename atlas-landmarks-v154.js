/* GeoVerse v154 — premium geographic markers and compact smart cards with landmark-first hit testing.
 * Explorer/editorial atlas only. Keeps v136 globe, map quiz and v141 pinch intact.
 */
(function(){
'use strict';
const ids=new Set(['worldMap','detailMap']);
const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const tr=(ar,en)=>document.documentElement.lang==='en'?en:ar;
const activeMaps=new WeakSet();
const ns='http://www.w3.org/2000/svg';
function getPlace(category,index){
 const i=Number(index);
 return Number.isInteger(i)&&i>=0&&Array.isArray(geo?.[category]?.[i])
  ?{category,index:i,place:geo[category][i]}:null;
}
const themes={
 continents:{color:'#7edfea',symbol:'◎'},seas:{color:'#68cce8',symbol:'≈'},
 rivers:{color:'#60d7ee',symbol:'≈'},lakes:{color:'#68cde9',symbol:'◉'},
 waterfalls:{color:'#67ddec',symbol:'↓'},straits:{color:'#6ce9e0',symbol:'↔'},
 mountains:{color:'#e9d0a2',symbol:'△'},volcanoes:{color:'#f4a37b',symbol:'▲'},
 deserts:{color:'#e9cc88',symbol:'◇'},forests:{color:'#70dda4',symbol:'♠'},
 islands:{color:'#a0ddec',symbol:'◌'},oceans:{color:'#65eadc',symbol:'◉'},
 countries:{color:'#66dccb',symbol:'◎'}
};
function iconFor(category){return themes[category]?.symbol||'◆'}
function hideCountry(r){
 r.node.querySelectorAll('.atlas-country').forEach(el=>el.classList.remove('highlight','gv140-active'));
 r.node.querySelector('.atlas-popup')?.classList.add('hidden');
}
function closeLandmark(r){
 const card=r?.node?.querySelector('.gv140-country-card');
 if(card){card.hidden=true;card.classList.remove('gv153-card-open','gv142-landmark-card','gv154-smart-card')}
 if(r?.node)delete r.node.dataset.gv154Selected;
 r?.node?.querySelectorAll('.gv142-current,.gv153-selected').forEach(el=>el.classList.remove('gv142-current','gv153-selected'));
}
function chooseLandmark(r,category,index,source){
 if(category==='oceans'&&activeLayer==='oceans')return; // v152 owns ocean dot bubbles.
 const item=getPlace(category,index);
 if(!item||!r.node.isConnected||atlasRuntime!==r)return;
 const {place}=item,card=r.node.querySelector('.gv140-country-card');
 if(!card)return;
 const localized=tr(place[0],place[1]);
 const description=tr(place[2],place[3]);
 const type=typeof cats!=='undefined'?cats.find(t=>t.id===category):null;
 const categoryName=type?tr(type.ar,type.en):tr('معلم جغرافي','Geographic landmark');
 hideCountry(r);
 closeLandmark(r);
 if(source)source.classList.add('gv142-current','gv153-selected');
 // Avoid overflowing the visible map with the full article summary.
 const short=description.length>145?description.slice(0,142).trimEnd()+'…':description;
 card.classList.add('gv142-landmark-card','gv153-card-open','gv154-smart-card');
 r.node.dataset.gv154Selected='landmark';
 card.setAttribute('dir',document.documentElement.lang==='en'?'ltr':'rtl');
 card.innerHTML='<div class="gv153-card-heading"><span class="gv153-card-type">'+
   '<span class="gv153-type-symbol" aria-hidden="true">'+esc(iconFor(category))+'</span>'+esc(categoryName)+
   '</span><button type="button" class="gv153-card-close" data-gv153-close aria-label="'+tr('إغلاق','Close')+'">×</button></div>'+
   '<div class="gv140-card-title">'+esc(localized)+'</div>'+
   (short?'<p class="gv142-landmark-description">'+esc(short)+'</p>':'')+
   '<button type="button" class="gv142-view-detail" data-gv142-open="'+esc(category)+':'+index+'">'+
   tr('عرض التفاصيل','View details')+' <span aria-hidden="true">←</span></button>';
 card.hidden=false;
}
function interactiveOutlines(r){
 const group=r.node.querySelector('.atlas-selected');
 if(!group)return;
 group.querySelectorAll('.gv142-feature-hit').forEach(node=>node.remove());
 if(activeLayer==='countries'||activeLayer==='all')return;
 const layer=activeLayer;
 const items=(geo[layer]||[]).map((place,i)=>({place,i})).filter(({place})=>
  !r.center||(Math.abs(place[4]-r.center[0])<.0001&&Math.abs(place[5]-r.center[1])<.0001));
 const mapped=items.filter(({place})=>typeof isLayerShape==='function'&&isLayerShape(layer,place));
 const shapes=[...group.querySelectorAll('.atlas-feature')];
 shapes.forEach((path,index)=>{
  const item=mapped[index];if(!item)return;
  // Approximate forest/desert/ocean polygons can have reversed spherical
  // winding and project the *complement* of the intended area. Never attach
  // a country-blocking fill hit region to these shapes; their named pins
  // remain available for precise selection instead.
  if(path.classList.contains('atlas-area'))return;
  const hit=document.createElementNS(ns,'path');
  hit.setAttribute('d',path.getAttribute('d')||'');
  hit.setAttribute('class','gv142-feature-hit');
  hit.setAttribute('data-gv142-landmark',layer+':'+item.i);
  hit.setAttribute('role','button');
  hit.setAttribute('tabindex','0');
  hit.setAttribute('aria-label',tr(item.place[0],item.place[1]));
  hit.setAttribute('fill',path.classList.contains('atlas-area')?'rgba(255,255,255,.001)':'none');
  hit.setAttribute('stroke','rgba(255,255,255,.001)');
  hit.setAttribute('stroke-width',path.classList.contains('atlas-area')?'2':'16');
  hit.setAttribute('pointer-events',path.classList.contains('atlas-area')?'fill':'stroke');
  const title=document.createElementNS(ns,'title');
  title.textContent=tr(item.place[0],item.place[1]);
  hit.append(title);
  group.appendChild(hit);
 });
}
function tagPins(r){
 const group=r.node.querySelector('.atlas-pins');
 if(!group)return;
 group.querySelectorAll('.atlas-pin[data-map-pin]').forEach(pin=>{
  const raw=pin.dataset.mapPin||'',sep=raw.lastIndexOf(':');
  if(sep<0)return;
  const category=raw.slice(0,sep),index=Number(raw.slice(sep+1));
  if(!getPlace(category,index))return;
  pin.classList.add('gv142-landmark-pin','gv153-marker','gv154-marker','gv153-'+category);
  pin.style.setProperty('--gv153-accent',themes[category]?.color||'#69e5d8');
  pin.setAttribute('aria-label',tr(geo[category][index][0],geo[category][index][1]));
  let hit=pin.querySelector('.gv142-hit-circle');
  if(!hit){
   hit=document.createElementNS(ns,'circle');
   hit.setAttribute('class','gv142-hit-circle');
   pin.insertBefore(hit,pin.firstChild);
  }
  hit.setAttribute('r','16');
  hit.setAttribute('fill','transparent');
  hit.setAttribute('pointer-events','all');
  if(!pin.querySelector('.gv153-marker-symbol')){
   const icon=document.createElementNS(ns,'text');
   icon.setAttribute('class','gv153-marker-symbol');
   icon.setAttribute('x','0');
   icon.setAttribute('y','-12');
   icon.setAttribute('text-anchor','middle');
   icon.setAttribute('aria-hidden','true');
   icon.setAttribute('pointer-events','none');
   icon.textContent=iconFor(category);
   pin.appendChild(icon);
  }
  pin.querySelector('.atlas-pin-halo')?.setAttribute('r','8.5');
  pin.querySelector('.atlas-pin-dot')?.setAttribute('r','3.5');
 });
}
function refresh(r){
 if(!r||!ids.has(r.id)||!r.node?.isConnected)return;
 const layer=String(activeLayer||'');
 if(r.node.dataset.gv144Layer!==layer)closeLandmark(r);
 r.node.dataset.gv144Layer=layer;
 tagPins(r);
 interactiveOutlines(r);
 const hint=r.node.querySelector('.gv140-foot-hint');
 if(hint)hint.textContent=tr('اضغط على المعلم أو الدولة لمعرفة تفاصيلها · اسحب للتنقل · قرّب بإصبعين',
 'Tap a landmark or country for details · Drag to pan · Pinch to zoom');
}
function attach(r){
 if(!r||!ids.has(r.id)||!r.node?.isConnected||activeMaps.has(r))return;
 const svg=r.node.querySelector('.atlas-svg');
 const stage=r.node.querySelector('.atlas-stage');
 if(!svg||!stage)return;
 activeMaps.add(r);
 // The base atlas document click handler selects countries when a feature
 // sits above one. Intercept only landmark targets; leave countries intact.
 // Run during capture, before v141's country handler queues a selection.
 // Mobile Safari may retarget a touch click to the SVG after pointer capture,
 // so resolve the nearest landmark from the actual tap coordinates too.
 function svgCoords(event){
  if(!Number.isFinite(event.clientX)||!Number.isFinite(event.clientY))return null;
  try{
   const point=svg.createSVGPoint();
   point.x=event.clientX;point.y=event.clientY;
   const matrix=svg.getScreenCTM();
   if(matrix)return point.matrixTransform(matrix.inverse());
  }catch(e){}
  const rect=svg.getBoundingClientRect(),view=r.view;
  if(!rect.width||!rect.height)return null;
  return {x:view[0]+(event.clientX-rect.left)/rect.width*view[2],
          y:view[1]+(event.clientY-rect.top)/rect.height*view[3]};
 }
 function pickLandmark(event){
  const direct=event.target.closest?.('[data-map-pin],[data-gv142-landmark]');
  if(direct){
   const raw=direct.dataset.mapPin||direct.dataset.gv142Landmark;
   const idx=raw?.lastIndexOf(':')??-1;
   if(idx>0&&getPlace(raw.slice(0,idx),Number(raw.slice(idx+1))))
    return {category:raw.slice(0,idx),index:Number(raw.slice(idx+1)),source:direct};
  }
  const point=svgCoords(event);if(!point)return null;
  const bounds=svg.getBoundingClientRect();
  const threshold=22*Math.max(r.view[2]/Math.max(bounds.width,1),r.view[3]/Math.max(bounds.height,1));
  let best=null,bestDistance=threshold;
  // Pins take precedence because the dot is the most intentional target.
  for(const pin of r.node.querySelectorAll('.atlas-pin[data-map-pin]')){
   const raw=pin.dataset.mapPin||'',sep=raw.lastIndexOf(':');
   if(sep<0)continue;
   const category=raw.slice(0,sep),index=Number(raw.slice(sep+1));
   if(!getPlace(category,index))continue;
   const place=geo[category][index],xy=r.proj([place[5],place[4]]);
   if(!xy)continue;
   const d=Math.hypot(xy[0]-point.x,xy[1]-point.y);
   if(d<bestDistance){best={category,index,source:pin};bestDistance=d}
  }
  if(best)return best;
  // Wide on-screen hit testing for river and mountain lines, even when the
  // country SVG path was the browser's click target.
  for(const hit of r.node.querySelectorAll('.gv142-feature-hit')){
   const raw=hit.dataset.gv142Landmark||'',sep=raw.lastIndexOf(':');
   if(sep<0)continue;
   const category=raw.slice(0,sep),index=Number(raw.slice(sep+1));
   if(!getPlace(category,index))continue;
   let length;try{length=hit.getTotalLength()}catch(e){continue}
   if(!Number.isFinite(length)||length<=0)continue;
   const steps=Math.min(420,Math.max(24,Math.ceil(length/Math.max(2,threshold*.45))));
   for(let i=0;i<=steps;i++){
    const xy=hit.getPointAtLength(length*i/steps);
    const d=Math.hypot(xy.x-point.x,xy.y-point.y);
    if(d<bestDistance){bestDistance=d;best={category,index,source:hit}}
   }
  }
  return best;
 }
 svg.addEventListener('click',event=>{
  const selected=pickLandmark(event);
  if(!selected){
   // A country tap must revert to the normal full country-card layout.
   const card=r.node.querySelector('.gv140-country-card');
   card?.classList.remove('gv153-card-open','gv142-landmark-card','gv154-smart-card');
   delete r.node.dataset.gv154Selected;
   return;
  }
  event.preventDefault();
  event.stopImmediatePropagation();
  chooseLandmark(r,selected.category,selected.index,selected.source);
 },true);
 svg.addEventListener('keydown',event=>{
  if(event.key!=='Enter'&&event.key!==' ')return;
  const target=event.target.closest?.('[data-map-pin],[data-gv142-landmark]');
  if(!target)return;
  const raw=target.dataset.mapPin||target.dataset.gv142Landmark;
  const divider=raw?.lastIndexOf(':')??-1;
  if(divider<=0)return;
  event.preventDefault();event.stopImmediatePropagation();
  chooseLandmark(r,raw.slice(0,divider),Number(raw.slice(divider+1)),target);
 });
 stage.addEventListener('click',event=>{
  if(!event.target.closest?.('[data-gv153-close]'))return;
  event.preventDefault();event.stopImmediatePropagation();
  closeLandmark(r);
 },true);
 stage.addEventListener('keydown',event=>{
  if(event.key==='Escape')closeLandmark(r);
 });
 stage.addEventListener('click',event=>{
  const btn=event.target.closest?.('[data-gv142-open]');
  if(!btn)return;
  const val=btn.dataset.gv142Open||'',divider=val.lastIndexOf(':');
  if(divider<=0)return;
  const category=val.slice(0,divider),index=Number(val.slice(divider+1));
  if(!getPlace(category,index))return;
  event.preventDefault();
  event.stopImmediatePropagation();
  setPage('detail',category,index);
 });
 // A pending async GeoJSON fetch can update the country layer later,
 // but does not need reattaching event listeners.
}
const previousDraw=typeof atlasDraw==='function'?atlasDraw:null;
const previousCreate=typeof atlasCreate==='function'?atlasCreate:null;
if(!previousDraw||!previousCreate)return;
atlasDraw=function(layer,center){
 const result=previousDraw.apply(this,arguments);
 const r=atlasRuntime;
 if(r?.node?.classList.contains('gv140-map')&&ids.has(r.id)){
  attach(r);
  refresh(r);
 }
 return result;
};
atlasCreate=function(id,...args){
 const result=previousCreate.call(this,id,...args);
 const r=atlasRuntime;
 if(ids.has(id)&&r?.id===id){
  attach(r);
  refresh(r);
 }
 return result;
};
})();