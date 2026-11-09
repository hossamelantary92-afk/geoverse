/* GeoVerse v415 (based on v155) — refined country cards and preserved map gestures.
   Scoped to the Explorer atlas and editorial detail maps. NEVER touches quiz maps or 3D globe. */
(function(){
'use strict';
const ids=new Set(['worldMap','detailMap']);
const regions=[
 {id:'world',ar:'العالم',en:'World',lng:0,lat:8,zoom:1},
 {id:'africa',ar:'أفريقيا',en:'Africa',lng:19,lat:2,zoom:2.25},
 {id:'asia',ar:'آسيا',en:'Asia',lng:91,lat:36,zoom:1.75},
 {id:'europe',ar:'أوروبا',en:'Europe',lng:16,lat:52,zoom:3.25},
 {id:'north',ar:'أمريكا الشمالية',en:'North America',lng:-102,lat:45,zoom:2},
 {id:'south',ar:'أمريكا الجنوبية',en:'South America',lng:-64,lat:-18,zoom:2.1},
 {id:'oceania',ar:'أوقيانوسيا',en:'Oceania',lng:139,lat:-19,zoom:2.3}
];
const language=(ar,en)=>document.documentElement.lang==='en'?en:ar;
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const animations=new WeakMap();
function transitionTo(r,desired,duration=480){
 const svg=r?.node?.querySelector('.atlas-svg');
 if(!r||!svg||!svg.isConnected)return;
 const previous=animations.get(svg);
 if(previous)cancelAnimationFrame(previous);
 const initial=r.view.slice();
 const final=desired.slice();
 const started=performance.now();
 const reduce=window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
 const render=t=>{
  const ease=1-Math.pow(1-t,3);
  const values=initial.map((value,i)=>value+(final[i]-value)*ease);
  atlasView(values);
 };
 if(reduce){render(1);return}
 function tick(now){
  if(!svg.isConnected||atlasRuntime!==r)return;
  const t=Math.min(1,(now-started)/duration);
  render(t);
  if(t<1)animations.set(svg,requestAnimationFrame(tick));
  else animations.delete(svg);
 }
 animations.set(svg,requestAnimationFrame(tick));
}
function windowFor(r,lng,lat,zoom){
 if(zoom<=1)return [0,0,1000,520];
 const p=r.proj([lng,lat]);
 if(!p||!Number.isFinite(p[0])||!Number.isFinite(p[1]))return [0,0,1000,520];
 const w=1000/zoom,h=520/zoom;
 return [Math.min(1000-w,Math.max(0,p[0]-w/2)),Math.min(520-h,Math.max(0,p[1]-h/2)),w,h];
}
function countryRecord(feature){
 const store=window.GeoVerseV4?.store;
 const name=feature?.properties?.name||'';
 if(!store?.ready)return null;
 const normalized=s=>String(s||'').toLowerCase().replace(/[^a-z\u00c0-\u024f\u0600-\u06ff]/g,'');
 return store.countries.find(x=>normalized(x.name)===normalized(name))
  ||store.byName?.get?.(normalized(name))||null;
}
function nameFor(feature){
 const record=countryRecord(feature);
 const fallback=feature?.properties?.name||'';
 if(document.documentElement.lang==='en')return record?.name||fallback;
 const translated=feature?.properties?.gvArabic;
 if(translated&&/[\u0600-\u06ff]/.test(translated))return translated;
 if(record?.code){
  try{
   const arabic=new Intl.DisplayNames(['ar'],{type:'region'}).of(record.code);
   if(arabic&&/[\u0600-\u06ff]/.test(arabic))return arabic;
  }catch(e){}
 }
 // Existing educational data also has Arabic country labels.
 const legacy=typeof geo!=='undefined'?geo.countries?.find(x=>x[1]===fallback):null;
 return legacy?.[0]||record?.nameAr||record?.ar||record?.name||fallback;
}
function focusCountry(r,feature){
 if(!feature||!r?.path)return;
 let b;try{b=r.path.bounds(feature)}catch(e){return}
 const width=b[1][0]-b[0][0],height=b[1][1]-b[0][1];
 if(!(width>0&&height>0&&Number.isFinite(width)&&Number.isFinite(height)))return;
 // Preserve both aspect ratio and context around even very small nations.
 const scale=Math.min(6,Math.max(1.35,Math.min(1000/(width*3.05),520/(height*3.05))));
 const w=1000/scale,h=520/scale,centerX=(b[0][0]+b[1][0])/2,centerY=(b[0][1]+b[1][1])/2;
 transitionTo(r,[Math.max(0,Math.min(1000-w,centerX-w/2)),Math.max(0,Math.min(520-h,centerY-h/2)),w,h],510);
}
function showCountry(r,index,element){
 const feature=r.features?.[index];if(!feature)return;
 const record=countryRecord(feature),name=nameFor(feature);
 const card=r.node.querySelector('.gv140-country-card');
 if(!card)return;
 const capital=record?.capital?language('العاصمة: ','Capital: ')+record.capital:'';
 const continent=record?.continent||'';
 card.classList.remove('gv153-card-open','gv142-landmark-card','gv154-smart-card');
 card.classList.add('gv155-country-card');
 card.setAttribute('dir',document.documentElement.lang==='en'?'ltr':'rtl');
 card.innerHTML='<div class="gv417-card-grip" role="button" aria-label="'+language('اسحب لتحريك بطاقة الدولة','Drag to move country card')+'">⠿ '+language('اسحب الكارت','Drag card')+'</div><div class="gv155-card-heading"><span class="gv140-card-overline">'+language('الدولة المحددة','SELECTED COUNTRY')+'</span>'+
  '<button type="button" class="gv155-close" data-gv155-close aria-label="'+language('إغلاق بطاقة الدولة','Close country card')+'">×</button></div>'+
  '<div class="gv140-card-title">'+escape(name)+'</div>'+
  (capital?'<div class="gv140-card-meta">'+escape(capital)+'</div>':'')+
  (continent?'<div class="gv140-card-continent">'+escape(continent)+'</div>':'')+
  '';
 card.hidden=false;
 card.style.removeProperty('left');card.style.removeProperty('top');
 r.node.querySelectorAll('.atlas-country').forEach(n=>n.classList.toggle('gv140-active',n===element));
 r.node.querySelector('.atlas-popup')?.classList.add('hidden');
 focusCountry(r,feature);
}
function decorate(r){
 if(!r||!ids.has(r.id)||!r.node?.isConnected||r.node.dataset.gv140Ready)return;
 const stage=r.node.querySelector('.atlas-stage'),svg=stage?.querySelector('.atlas-svg');
 if(!stage||!svg)return;
 r.node.dataset.gv140Ready='1';
 r.node.classList.add('gv140-map');
 const bar=document.createElement('div');bar.className='gv140-topbar';
 bar.innerHTML='<div class="gv140-map-brand"><span class="gv140-brand-orbit" aria-hidden="true">◎</span><div><strong>GeoVerse Atlas</strong><small>'+language('استكشف العالم بالتفصيل','Explore the world in detail')+'</small></div></div><span class="gv140-map-live"><span></span>'+language('خريطة تفاعلية','INTERACTIVE MAP')+'</span>';
 stage.appendChild(bar);
 const chips=document.createElement('div');chips.className='gv140-region-strip';chips.setAttribute('role','group');chips.setAttribute('aria-label',language('اختيار المنطقة','Choose region'));
 chips.innerHTML=regions.map((v,i)=>'<button type="button" class="gv140-region'+(i===0?' gv140-current':'')+'" data-gv140-region="'+v.id+'" aria-pressed="'+(i===0?'true':'false')+'">'+escape(language(v.ar,v.en))+'</button>').join('');
 stage.appendChild(chips);
 const card=document.createElement('aside');card.className='gv140-country-card';card.hidden=true;card.setAttribute('aria-live','polite');stage.appendChild(card);
 // Dedicated drag grip; document-level listeners keep touch movement reliable on iOS Safari.
 const grip=document.createElement('div');
 grip.className='gv417-card-grip';
 grip.setAttribute('role','button');
 grip.setAttribute('aria-label',language('اسحب لتحريك بطاقة الدولة','Drag to move country card'));
 grip.textContent=language('⠿ اسحب الكارت','⠿ Drag card');
 // The grip is recreated by showCountry when card content changes.
 let drag=null;
 card.addEventListener('pointerdown',e=>{
  if(!e.target.closest('.gv417-card-grip'))return;
  if(card.hidden||e.pointerType==='mouse'&&e.button!==0)return;
  const box=card.getBoundingClientRect(),bounds=stage.getBoundingClientRect();
  drag={id:e.pointerId,x:e.clientX,y:e.clientY,left:box.left-bounds.left,top:box.top-bounds.top};
  e.preventDefault();e.stopPropagation();
  try{card.setPointerCapture(e.pointerId)}catch(_){}
 });
 const moveCard=e=>{
  if(!drag||e.pointerId!==drag.id)return;
  const maxX=Math.max(4,stage.clientWidth-card.offsetWidth-4);
  const maxY=Math.max(4,stage.clientHeight-card.offsetHeight-4);
  const left=Math.max(4,Math.min(maxX,drag.left+e.clientX-drag.x));
  const top=Math.max(4,Math.min(maxY,drag.top+e.clientY-drag.y));
  for(const [key,val] of Object.entries({left:left+'px',top:top+'px',right:'auto',bottom:'auto'}))
   card.style.setProperty(key,val,'important');
  e.preventDefault();e.stopPropagation();
 };
 card.addEventListener('pointermove',moveCard);
 card.addEventListener('pointerup',e=>{if(drag?.id===e.pointerId)drag=null});
 card.addEventListener('pointercancel',e=>{if(drag?.id===e.pointerId)drag=null});
 const foot=document.createElement('div');foot.className='gv140-foot-hint';foot.textContent=language('المس دولة لاستكشافها  ·  اسحب للتنقل  ·  قرّب بإصبعين','Tap a country  ·  Drag to pan  ·  Pinch to zoom');stage.appendChild(foot);
 stage.querySelector('.atlas-tools')?.setAttribute('aria-label',language('أدوات تكبير الخريطة','Map zoom controls'));
 const selectionHandler=e=>{
  const el=e.target.closest?.('[data-map-country]');
  if(!el||!svg.contains(el))return;
  const index=Number(el.getAttribute('data-map-country'));
  if(Number.isInteger(index)){
   // Existing document click handler still owns selection semantics.
   setTimeout(()=>{if(atlasRuntime===r&&r.node.isConnected)showCountry(r,index,el)},0);
  }
 };
 // Track every pointer ourselves: the legacy atlas only handles one
 // finger and can capture the wrong pointer on ocean, breaking pinch on iOS.
 const pointers=new Map();
 let snapshot=null,suppressClickUntil=0;
 const coordinate=event=>({x:event.clientX,y:event.clientY});
 const midpoint=(a,b)=>({x:(a.x+b.x)/2,y:(a.y+b.y)/2});
 const measure=(a,b)=>Math.max(12,Math.hypot(a.x-b.x,a.y-b.y));
 const resetGesture=()=>{
  const values=[...pointers.values()];
  if(!values.length){snapshot=null;return}
  snapshot={view:r.view.slice(),a:values[0],b:values[1]||null,
    mid:values.length>1?midpoint(values[0],values[1]):values[0],
    distance:values.length>1?measure(values[0],values[1]):1,
    moved:false};
 };
 const viewFromGesture=()=>{
  if(!snapshot||!pointers.size)return;
  const rect=svg.getBoundingClientRect();
  if(rect.width<=0||rect.height<=0)return;
  const v=snapshot.view;
  const values=[...pointers.values()];
  if(values.length>=2&&snapshot.b){
   const center=midpoint(values[0],values[1]);
   const distance=measure(values[0],values[1]);
   // Scale around the original two-finger midpoint, even while both
   // fingers move across the screen. Keep zoom bounds proportional.
   const ratio=Math.min(12,Math.max(.16,snapshot.distance/distance));
   const width=Math.min(1000,Math.max(75,v[2]*ratio));
   const height=Math.min(520,Math.max(39,v[3]*ratio));
   const originX=v[0]+(snapshot.mid.x-rect.left)/rect.width*v[2];
   const originY=v[1]+(snapshot.mid.y-rect.top)/rect.height*v[3];
   atlasView([originX-(center.x-rect.left)/rect.width*width,
              originY-(center.y-rect.top)/rect.height*height,width,height]);
   snapshot.moved=true;
  }else if(values.length===1){
   const dx=values[0].x-snapshot.a.x,dy=values[0].y-snapshot.a.y;
   if(!snapshot.moved&&Math.hypot(dx,dy)<5)return;
   snapshot.moved=true;
   atlasView([v[0]-dx*v[2]/rect.width,
              v[1]-dy*v[3]/rect.height,v[2],v[3]]);
  }
  if(snapshot.moved)suppressClickUntil=performance.now()+550;
 };
 svg.addEventListener('pointerdown',event=>{
  if(event.pointerType==='mouse'&&event.button!==0)return;
  // Mouse behaves as before; touch and pen are exclusively handled here
  // so native single-pointer map drag cannot interfere with pinch.
  if(event.pointerType==='mouse')return;
  pointers.set(event.pointerId,coordinate(event));
  resetGesture();
  if(pointers.size>1)suppressClickUntil=performance.now()+550;
  try{svg.setPointerCapture(event.pointerId)}catch(e){}
  event.stopImmediatePropagation();
 },true);
 svg.addEventListener('pointermove',event=>{
  if(!pointers.has(event.pointerId))return;
  pointers.set(event.pointerId,coordinate(event));
  viewFromGesture();
  if(event.cancelable)event.preventDefault();
  event.stopImmediatePropagation();
 },true);
 const finishGesture=event=>{
  if(!pointers.has(event.pointerId))return;
  if(snapshot?.moved||pointers.size>1)suppressClickUntil=performance.now()+550;
  pointers.delete(event.pointerId);
  resetGesture();
  event.stopImmediatePropagation();
 };
 svg.addEventListener('pointerup',finishGesture,true);
 svg.addEventListener('pointercancel',finishGesture,true);
 svg.addEventListener('lostpointercapture',event=>{
  if(pointers.delete(event.pointerId))resetGesture();
 },true);
 svg.addEventListener('click',event=>{
  if(performance.now()>=suppressClickUntil)return;
  event.preventDefault();
  event.stopImmediatePropagation();
 },true);
 svg.addEventListener('click',selectionHandler);
 // A tap outside the selected-country card dismisses it immediately.
 // The same tap is still free to select a different country.
 document.addEventListener('pointerdown',event=>{
  if(!r.node.isConnected||atlasRuntime!==r||card.hidden)return;
  if(card.contains(event.target))return;
  card.hidden=true;
  // Keep the selected country highlighted when the card is dismissed.
 },true);
 svg.addEventListener('keydown',e=>{
  if(e.key!=='Enter'&&e.key!==' ')return;
  const el=e.target.closest?.('[data-map-country]');
  if(!el)return;
  e.preventDefault();
  showCountry(r,Number(el.getAttribute('data-map-country')),el);
 });
 stage.addEventListener('click',e=>{
  if(!e.target.closest?.('[data-gv155-close]'))return;
  e.preventDefault();
  e.stopImmediatePropagation();
  card.hidden=true;
  // Closing the card does not clear the geographic selection.
 },true);
 stage.addEventListener('click',e=>{
  const region=e.target.closest?.('[data-gv140-region]');
  if(region){
   const target=regions.find(x=>x.id===region.dataset.gv140Region);if(!target)return;
   chips.querySelectorAll('button').forEach(btn=>{const selected=btn===region;btn.classList.toggle('gv140-current',selected);btn.setAttribute('aria-pressed',String(selected))});
   card.hidden=true;r.node.querySelectorAll('.atlas-country').forEach(n=>n.classList.remove('gv140-active'));
   transitionTo(r,windowFor(r,target.lng,target.lat,target.zoom));
  }
  if(e.target.closest?.('.gv140-map-clear')){
   card.hidden=true;r.node.querySelectorAll('.atlas-country').forEach(n=>n.classList.remove('gv140-active'));
   const world=chips.querySelector('[data-gv140-region="world"]');world?.click();
  }
 });
 // Prevent broken map overlays if the original map is asynchronously regenerated.
 const land=stage.querySelector('.atlas-land');
 if(land){
  const observer=new MutationObserver(()=>{
   if(!r.node.isConnected||atlasRuntime!==r){observer.disconnect();return}
   r.node.classList.toggle('gv140-data-ready',!!land.querySelector('path'));
  });
  observer.observe(land,{childList:true});
  r.node.classList.toggle('gv140-data-ready',!!land.querySelector('path'));
 }
}
const original=typeof atlasCreate==='function'?atlasCreate:null;
if(!original)return;
atlasCreate=function(id,...args){
 const value=original.call(this,id,...args);
 if(ids.has(id)){
  const r=atlasRuntime;
  if(r?.id===id)decorate(r);
 }
 return value;
};
})();