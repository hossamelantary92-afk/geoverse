/* GeoVerse Phase 2 — interactive cartographic atlas v140.
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
 if(!record)return feature?.properties?.name||'';
 const isArabic=document.documentElement.lang!=='en';
 if(isArabic){
  if(typeof arName==='function')try{return arName(record)}catch(e){}
  return record.nameAr||record.ar||record.name;
 }
 return record.name;
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
 card.innerHTML='<div class="gv140-card-overline">'+language('الدولة المحددة','SELECTED COUNTRY')+'</div><div class="gv140-card-title">'+escape(name)+'</div>'+
  (capital?'<div class="gv140-card-meta">'+escape(capital)+'</div>':'')+
  (continent?'<div class="gv140-card-continent">'+escape(continent)+'</div>':'')+
  '<button type="button" class="gv140-map-clear">'+language('عودة للعالم','Back to world')+'</button>';
 card.hidden=false;
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
 // On mobile, allow a drag starting on country polygons (the original
 // atlas only panned if the user first touched empty ocean).
 let gesture=null,ignoreClickUntil=0;
 svg.addEventListener('pointerdown',event=>{
  if(event.button!==0&&!['touch','pen'].includes(event.pointerType))return;
  if(!event.target.closest?.('[data-map-country]'))return;
  gesture={id:event.pointerId,x:event.clientX,y:event.clientY,view:r.view.slice(),moved:false};
 },true);
 svg.addEventListener('pointermove',event=>{
  if(!gesture||gesture.id!==event.pointerId)return;
  const dx=event.clientX-gesture.x,dy=event.clientY-gesture.y;
  if(!gesture.moved&&Math.hypot(dx,dy)<7)return;
  gesture.moved=true;
  const rect=svg.getBoundingClientRect();
  if(!(rect.width>0&&rect.height>0))return;
  atlasView([gesture.view[0]-dx*gesture.view[2]/rect.width,gesture.view[1]-dy*gesture.view[3]/rect.height,gesture.view[2],gesture.view[3]]);
  event.stopImmediatePropagation();
 },true);
 const finishGesture=event=>{
  if(!gesture||event.pointerId!==gesture.id)return;
  if(gesture.moved)ignoreClickUntil=performance.now()+420;
  gesture=null;
 };
 svg.addEventListener('pointerup',finishGesture,true);
 svg.addEventListener('pointercancel',finishGesture,true);
 svg.addEventListener('click',event=>{
  if(performance.now()>=ignoreClickUntil)return;
  event.preventDefault();
  event.stopImmediatePropagation();
 },true);
 svg.addEventListener('click',selectionHandler);
 svg.addEventListener('keydown',e=>{
  if(e.key!=='Enter'&&e.key!==' ')return;
  const el=e.target.closest?.('[data-map-country]');
  if(!el)return;
  e.preventDefault();
  showCountry(r,Number(el.getAttribute('data-map-country')),el);
 });
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