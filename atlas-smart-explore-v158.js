/* GeoVerse v158 — Search on Map + Explore by Continent.
 * Only #worldMap. No changes to globe, games, or atlas touch handlers.
 */
(function(){
'use strict';
const groups=[
 {id:'africa',ar:'أفريقيا',en:'Africa'},
 {id:'asia',ar:'آسيا',en:'Asia'},
 {id:'europe',ar:'أوروبا',en:'Europe'},
 {id:'north',ar:'أمريكا الشمالية',en:'North America'},
 {id:'south',ar:'أمريكا الجنوبية',en:'South America'},
 {id:'oceania',ar:'أوقيانوسيا',en:'Oceania'},
 {id:'antarctica',ar:'القارة القطبية الجنوبية',en:'Antarctica'}
];
const excluded=new Set(['continents']);
const label=(ar,en)=>document.documentElement.lang==='en'?en:ar;
const esc=s=>String(s??'').replace(/[&<>"']/g,k=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[k]));
const normalize=s=>String(s||'').normalize('NFKD').toLowerCase().replace(/[\u064b-\u065f\u0670]/g,'').replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي').replace(/[^a-z0-9\u0621-\u064a]+/g,' ').trim();
let current=null;
function continent(lat,lon){
 if(lat<=-60)return 'antarctica';
 if(lon>=110&&lon<=180&&lat<0)return 'oceania';
 if(lon>=-180&&lon<-30){
  if(lat>10)return 'north';
  return 'south';
 }
 if(lon>=-25&&lon<55&&lat>=35){
  if(lon>=35&&lat>=40)return 'asia';
  return 'europe';
 }
 if(lon>=-20&&lon<55&&lat>-38)return 'africa';
 if(lon>=25&&lon<=180)return 'asia';
 if(lon>=-30&&lon<60&&lat<-38)return 'antarctica';
 return 'oceania';
}
function regionOf(item){return continent(item.lat,item.lon)}
function catalogue(r){
 const results=[],all=typeof geo!=='undefined'?geo:{};
 for(const [category,items] of Object.entries(all)){
  if(excluded.has(category)||!Array.isArray(items))continue;
  items.forEach((entry,index)=>{
   if(!Array.isArray(entry)||entry.length<6||!Number.isFinite(entry[4])||!Number.isFinite(entry[5]))return;
   results.push({id:category+':'+index,category,index,ar:String(entry[0]),en:String(entry[1]),
    lat:entry[4],lon:entry[5],source:'place'});
  });
 }
 // Add all GeoJSON countries, beyond the short curated sample.
 // The feature set arrives asynchronously; this list is rebuilt on demand.
 if(r?.features?.length){
  r.features.forEach((feature,index)=>{
   const n=feature?.properties?.name;
   if(!n)return;
   const centre=window.d3?.geoCentroid?.(feature);
   if(!centre?.every(Number.isFinite))return;
   const known=results.find(item=>item.category==='countries'&&normalize(item.en)===normalize(n));
   let ar=known?.ar||'';
   if(!ar){
    const alpha2=feature.properties?.ISO_A2||feature.properties?.iso_a2||feature.properties?.cca2;
    if(alpha2&&alpha2!=='-99')try{ar=new Intl.DisplayNames(['ar'],{type:'region'}).of(alpha2)||''}catch(e){}
   }
   results.push({id:'feature:'+index,category:'countries',index,ar:ar||n,en:n,
    lat:centre[1],lon:centre[0],source:'feature'});
  });
 }
 return results;
}
function categoryName(category){
 const c=typeof cats!=='undefined'?cats.find(x=>x.id===category):null;
 return c?label(c.ar,c.en):label('الدول','Countries');
}
function focusTo(r,item){
 if(!r||!r.node?.isConnected)return;
 const p=r.proj?.([item.lon,item.lat]);
 if(!p?.every(Number.isFinite))return;
 const span=item.category==='countries'?145:125;
 const w=Math.max(90,span*2),h=w*.52;
 const goal=[Math.max(0,Math.min(1000-w,p[0]-w/2)),Math.max(0,Math.min(520-h,p[1]-h/2)),w,h];
 const start=r.view.slice(),startTime=performance.now();
 const svg=r.node.querySelector('.atlas-svg');
 const reduced=matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
 function draw(t){
  if(!svg?.isConnected||atlasRuntime!==r)return;
  const ease=1-Math.pow(1-t,3);
  atlasView(start.map((value,i)=>value+(goal[i]-value)*ease));
  if(t<1)requestAnimationFrame(()=>draw(Math.min(1,(performance.now()-startTime)/430)));
 }
 if(reduced)atlasView(goal);else requestAnimationFrame(()=>draw(0));
}
function navigate(r,item){
 if(!r?.node?.isConnected||typeof atlasDraw!=='function')return;
 const nextLayer=item.category==='countries'?'countries':item.category;
 if(typeof activeLayer!=='undefined')activeLayer=nextLayer;
 const button=document.querySelector('#mapToolbar [data-layer="'+nextLayer+'"]');
 document.querySelectorAll('#mapToolbar [data-layer]').forEach(el=>el.classList.toggle('active',el===button));
 atlasDraw(nextLayer);
 focusTo(r,item);
 const mark=()=> {
  if(!r.node.isConnected||atlasRuntime!==r)return;
  if(item.source==='feature'){
   const country=r.node.querySelector('.atlas-country[data-map-country="'+item.index+'"]');
   country?.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window}));
  }else{
   let pin=r.node.querySelector('.atlas-pin[data-map-pin="'+item.category+':'+item.index+'"]');
   if(pin)pin.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window}));
   else if(item.category==='countries'){
    const featureIndex=r.features?.findIndex(f=>window.d3?.geoContains?.(f,[item.lon,item.lat]))??-1;
    r.node.querySelector('.atlas-country[data-map-country="'+featureIndex+'"]')?.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window}));
   }
  }
 };
 requestAnimationFrame(()=>requestAnimationFrame(mark));
 // Smoothly bring the atlas into view without jumping within the map itself.
 r.node.scrollIntoView({behavior:'smooth',block:'nearest'});
}
function renderResults(r,items,kind){
 const root=r.node.parentNode.querySelector('.gv158-explorer'),target=root?.querySelector('.gv158-results');
 if(!target)return;
 const limit=kind==='search'?12:50;
 const count=items.length;
 target.innerHTML=items.slice(0,limit).map(item=>'<button type="button" class="gv158-result" data-gv158-item="'+esc(item.id)+'">'+
  '<span class="gv158-result-title">'+esc(label(item.ar,item.en))+'</span><span class="gv158-result-tag">'+esc(categoryName(item.category))+'</span></button>').join('')||
  '<div class="gv158-no-results">'+label('لا توجد أماكن مطابقة في البيانات الحالية','No matching places in the current atlas data')+'</div>';
 const summary=root.querySelector('.gv158-count');
 if(summary)summary.textContent=count?label('النتائج: '+count,'Results: '+count):'';
 root.__gv158Results=new Map(items.map(x=>[x.id,x]));
}
function setup(r){
 if(!r||r.id!=='worldMap'||!r.node?.isConnected)return;
 const host=r.node.parentNode;
 if(!host||host.querySelector('.gv158-explorer'))return;
 const panel=document.createElement('section');
 panel.className='gv158-explorer';
 panel.setAttribute('aria-label',label('البحث والاستكشاف على الخريطة','Map search and continent explorer'));
 panel.innerHTML='<div class="gv158-heading"><strong>'+label('استكشف على الخريطة','Explore on the map')+'</strong><span>'+label('ابحث عن دولة أو معلم ثم انتقل لموقعه','Find a country or landmark and jump to its location')+'</span></div>'+
  '<div class="gv158-search-line"><input class="gv158-query" type="search" autocomplete="off" spellcheck="false" placeholder="'+label('ابحث عن دولة أو جبل أو نهر…','Search countries, mountains, rivers…')+'" aria-label="'+label('بحث في الخريطة','Search the map')+'"/>'+
  '<button type="button" class="gv158-search-clear" aria-label="'+label('مسح البحث','Clear search')+'">×</button></div>'+
  '<div class="gv158-continent-label">'+label('استكشف حسب القارة','Explore by continent')+'</div>'+
  '<div class="gv158-continents" role="group">'+
  groups.map(g=>'<button type="button" data-gv158-continent="'+g.id+'">'+label(g.ar,g.en)+'</button>').join('')+'</div>'+
  '<div class="gv158-filterbar"><select class="gv158-kind" aria-label="'+label('نوع المعالم','Type of places')+'"><option value="all">'+label('كل الأماكن','All places')+'</option><option value="countries">'+label('الدول','Countries')+'</option><option value="landmarks">'+label('المعالم','Landmarks')+'</option></select>'+
  '<span class="gv158-count"></span><button type="button" class="gv158-collapse" aria-expanded="false">'+label('عرض النتائج','Show results')+'</button></div>'+
  '<div class="gv158-results" hidden></div>';
 host.insertBefore(panel,r.node);
 const query=panel.querySelector('.gv158-query'),list=panel.querySelector('.gv158-results');
 let region=null;
 const collapse=panel.querySelector('.gv158-collapse');
 const kind=panel.querySelector('.gv158-kind');
 let timer=0;
 function calculate(){
  const text=normalize(query.value);
  const records=catalogue(r);
  const unique=new Set();
  let out=records.filter(item=>{
   if(region&&regionOf(item)!==region)return false;
   if(kind.value==='countries'&&item.category!=='countries')return false;
   if(kind.value==='landmarks'&&item.category==='countries')return false;
   if(text&&!normalize(item.ar+' '+item.en).includes(text))return false;
   const key=item.category==='countries'?normalize(item.en):item.id;
   if(unique.has(key))return false;
   unique.add(key);return true;
  });
  out.sort((a,b)=>label(a.ar,a.en).localeCompare(label(b.ar,b.en),document.documentElement.lang==='en'?'en':'ar'));
  renderResults(r,out,text?'search':'continent');
 }
 function reveal(){
  list.hidden=false;collapse.setAttribute('aria-expanded','true');
  collapse.textContent=label('إخفاء النتائج','Hide results');
 }
 function hide(){
  list.hidden=true;collapse.setAttribute('aria-expanded','false');
  collapse.textContent=label('عرض النتائج','Show results');
 }
 query.addEventListener('input',()=>{
  clearTimeout(timer);timer=setTimeout(()=>{
   if(query.value.trim()){region=null;panel.querySelectorAll('[data-gv158-continent]').forEach(el=>el.classList.remove('selected'));reveal();calculate()}
   else if(region)calculate();
   else hide();
  },100);
 });
 panel.querySelector('.gv158-search-clear').addEventListener('click',()=>{
  query.value='';query.focus();if(!region)hide();else calculate();
 });
 kind.addEventListener('change',()=>{if(region||query.value.trim()){reveal();calculate()}});
 panel.querySelector('.gv158-continents').addEventListener('click',event=>{
  const btn=event.target.closest('[data-gv158-continent]');
  if(!btn)return;
  const newRegion=btn.dataset.gv158Continent;
  region=region===newRegion?null:newRegion;
  panel.querySelectorAll('[data-gv158-continent]').forEach(x=>x.classList.toggle('selected',x.dataset.gv158Continent===region));
  query.value='';
  if(!region){hide();return}
  reveal();calculate();
  const mapBtn=r.node.querySelector('[data-gv140-region="'+region+'"]');
  if(mapBtn)mapBtn.click();
 });
 collapse.addEventListener('click',()=>{if(list.hidden){reveal();calculate()}else hide()});
 list.addEventListener('click',event=>{
  const btn=event.target.closest('[data-gv158-item]');
  if(!btn)return;
  const item=panel.__gv158Results?.get(btn.dataset.gv158Item);
  if(item){navigate(r,item);hide()}
 });
 // Async GeoJSON loading: results refresh once the country layer arrives.
 const land=r.node.querySelector('.atlas-land');
 if(land){
  const observer=new MutationObserver(()=>{if(!r.node.isConnected){observer.disconnect();return}if(!list.hidden)calculate()});
  observer.observe(land,{childList:true});
 }
}
const orig=typeof atlasCreate==='function'?atlasCreate:null;
if(!orig)return;
atlasCreate=function(){
 const result=orig.apply(this,arguments);
 const r=typeof atlasRuntime!=='undefined'?atlasRuntime:null;
 if(r?.id==='worldMap')setup(r);
 return result;
};
})();