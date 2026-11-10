/* GeoVerse Phase 5: country-local landmark map pilot. Independent of the world atlas. */
(function(){
'use strict';
const sites={
 EG:[['أهرامات الجيزة','Pyramids of Giza','الجيزة','Giza',29.9792,31.1342],['أبو الهول','Great Sphinx','الجيزة','Giza',29.9753,31.1376],['معبد الكرنك','Karnak Temple','الأقصر','Luxor',25.7188,32.6573],['أبو سمبل','Abu Simbel','أسوان','Aswan',22.336,31.6258],['معبد الأقصر','Luxor Temple','الأقصر','Luxor',25.6995,32.6391],['وادي الملوك','Valley of the Kings','الأقصر','Luxor',25.7402,32.6014],['معبد فيلة','Philae Temple','أسوان','Aswan',24.0257,32.8847],['مكتبة الإسكندرية','Bibliotheca Alexandrina','الإسكندرية','Alexandria',31.2089,29.9092],['قلعة قايتباي','Citadel of Qaitbay','الإسكندرية','Alexandria',31.2138,29.8856],['قلعة صلاح الدين','Cairo Citadel','القاهرة','Cairo',30.0299,31.2613],['محمية رأس محمد','Ras Mohammed National Park','جنوب سيناء','South Sinai',27.732,34.246],['جبل موسى','Mount Sinai','جنوب سيناء','South Sinai',28.539,33.975]],
 FR:[['برج إيفل','Eiffel Tower','باريس','Paris',48.8584,2.2945],['متحف اللوفر','Louvre Museum','باريس','Paris',48.8606,2.3376],['قصر فرساي','Palace of Versailles','فرساي','Versailles',48.8049,2.1204],['مون سان ميشيل','Mont-Saint-Michel','نورماندي','Normandy',48.6361,-1.5115]],
 IT:[['الكولوسيوم','Colosseum','روما','Rome',41.8902,12.4922],['برج بيزا','Leaning Tower of Pisa','بيزا','Pisa',43.723,10.3966],['نافورة تريفي','Trevi Fountain','روما','Rome',41.9009,12.4833],['كاتدرائية ميلانو','Milan Cathedral','ميلانو','Milan',45.4642,9.1919]],
 SA:[['المسجد الحرام','Masjid al-Haram','مكة المكرمة','Mecca',21.4225,39.8262],['المسجد النبوي','Prophet’s Mosque','المدينة المنورة','Medina',24.4672,39.6112],['الحِجر','Hegra','العلا','AlUla',26.7917,37.952],['حي الطريف','At-Turaif District','الدرعية','Diriyah',24.7349,46.5728]]
};
const ar=()=>typeof state!=='undefined'&&state.lang==='ar';
const label=(a,b)=>ar()?a:b;
function mount(){
 if(typeof state==='undefined'||state.page!=='country-v4')return;
 const code=String(state.v4Code||'').toUpperCase(),places=sites[code];
 const globe=document.getElementById('gvDetailGlobe');
 if(!globe||!places||globe.parentElement?.querySelector('.gv450-landmark-panel'))return;
 const feature=window.GeoVerseV4?.store?.featLookup?.get(code);
 if(!feature||!window.d3?.geoMercator||!window.d3?.geoPath)return;
 const panel=document.createElement('section');panel.className='gv450-landmark-panel';
 const title=document.createElement('h3');title.textContent=label('استكشف معالم الدولة','Explore country landmarks');
 const desc=document.createElement('p');desc.textContent=label('اضغط على نقطة لعرض اسم المعلم ومدينته. الخريطة مستقلة عن أطلس العالم.','Tap a marker to see the landmark and its city.');
 const map=document.createElement('div');map.className='gv450-map';
 const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 480 340');svg.setAttribute('role','group');svg.setAttribute('aria-label',label('خريطة معالم الدولة','Country landmarks map'));
 const projection=d3.geoMercator().fitExtent([[34,30],[446,310]],feature);
 const path=d3.geoPath(projection);
 const outline=document.createElementNS(svg.namespaceURI,'path');outline.setAttribute('d',path(feature)||'');outline.setAttribute('class','gv450-outline');svg.appendChild(outline);
 if(code==='EG'){
  // Terrain-inspired cartography, clipped to the real country outline.
  // Nile and delta are geographically projected rather than drawn as decoration.
  const ns=svg.namespaceURI,defs=document.createElementNS(ns,'defs');
  const clip=document.createElementNS(ns,'clipPath');clip.setAttribute('id','gv472-egypt-clip');
  const clipOutline=document.createElementNS(ns,'path');clipOutline.setAttribute('d',path(feature)||'');
  clip.appendChild(clipOutline);defs.appendChild(clip);
  const land=document.createElementNS(ns,'linearGradient');land.setAttribute('id','gv472-land');
  land.setAttribute('x1','0');land.setAttribute('y1','0');land.setAttribute('x2','1');land.setAttribute('y2','1');
  [['0%','#806849'],['43%','#b08a55'],['100%','#715e49']].forEach(([offset,color])=>{
   const stop=document.createElementNS(ns,'stop');stop.setAttribute('offset',offset);stop.setAttribute('stop-color',color);land.appendChild(stop);
  });defs.appendChild(land);
  svg.insertBefore(defs,outline);
  outline.setAttribute('fill','url(#gv472-land)');outline.classList.add('gv472-terrain');
  const terrain=document.createElementNS(ns,'g');terrain.setAttribute('clip-path','url(#gv472-egypt-clip)');
  const coordsToPath=(points)=>points.map((p,i)=>{const xy=projection(p);return(i?'L':'M')+xy[0].toFixed(1)+' '+xy[1].toFixed(1)}).join(' ');
  // Approximate geographic Nile course from Aswan to the Mediterranean.
  const nile=[[32.88,24.09],[32.75,25.3],[32.64,25.7],[32.52,26.2],[31.79,26.57],[31.52,27.2],[31.25,28.1],[31.27,29.0],[31.25,30.05]];
  const waterways=[nile,[[31.25,30.05],[31.0,30.5],[31.1,31.0],[31.4,31.45]],[[31.25,30.05],[31.6,30.6],[31.8,31.2],[31.85,31.52]]];
  waterways.forEach((points,i)=>{const line=document.createElementNS(ns,'path');line.setAttribute('d',coordsToPath(points));line.setAttribute('class',i?'gv472-delta':'gv472-nile');terrain.appendChild(line)});
  // Geographic shaded relief from Esri map tiles (not synthetic contours).
  // Tile positions use the same Web Mercator projection as the country outline.
  const relief=document.createElementNS(ns,'g');
  relief.setAttribute('clip-path','url(#gv472-egypt-clip)');
  relief.setAttribute('class','gv475-real-relief');
  const tileZoom=6,tileCount=2**tileZoom;
  const tileX=lon=>(lon+180)/360*tileCount;
  const tileY=lat=>(1-Math.log(Math.tan(lat*Math.PI/180)+1/Math.cos(lat*Math.PI/180))/Math.PI)/2*tileCount;
  const tileLon=x=>x/tileCount*360-180;
  const tileLat=y=>Math.atan(Math.sinh(Math.PI*(1-2*y/tileCount)))*180/Math.PI;
  const minX=Math.floor(tileX(24)),maxX=Math.floor(tileX(37));
  const minY=Math.floor(tileY(32)),maxY=Math.floor(tileY(21));
  for(let x=minX;x<=maxX;x++)for(let y=minY;y<=maxY;y++){
   const tl=projection([tileLon(x),tileLat(y)]);
   const br=projection([tileLon(x+1),tileLat(y+1)]);
   if(!tl||!br)continue;
   const image=document.createElementNS(ns,'image');
   image.setAttribute('x',tl[0]);image.setAttribute('y',tl[1]);
   image.setAttribute('width',br[0]-tl[0]+.2);image.setAttribute('height',br[1]-tl[1]+.2);
   image.setAttribute('preserveAspectRatio','none');
   image.setAttribute('href','https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/'+tileZoom+'/'+y+'/'+x);
   image.setAttribute('class','gv475-tile');
   relief.appendChild(image);
  }
  svg.insertBefore(relief,outline.nextSibling);
  // Overlay geographic rivers and the country border above relief imagery.
  svg.insertBefore(terrain,relief.nextSibling);
  const border=document.createElementNS(ns,'path');
  border.setAttribute('d',path(feature)||'');
  border.setAttribute('class','gv475-border');
  svg.insertBefore(border,terrain.nextSibling);

 }
 const details=document.createElement('div');details.className='gv450-details';details.setAttribute('aria-live','polite');
 const buttons=[];let selectedIndex=0;let list;const view={x:0,y:0,w:480,h:340};
 const controls=document.createElement('div');controls.className='gv450-controls';
 const zoomIn=document.createElement('button'),zoomOut=document.createElement('button'),reset=document.createElement('button');
 zoomIn.textContent='+';zoomOut.textContent='−';reset.textContent=label('عرض الكل','Reset');
 controls.append(zoomIn,zoomOut,reset);
 const applyView=()=>svg.setAttribute('viewBox',[view.x,view.y,view.w,view.h].join(' '));
 function zoom(factor){const nw=Math.max(75,Math.min(480,view.w*factor)),nh=nw*340/480;view.x=Math.max(0,Math.min(480-nw,view.x+(view.w-nw)/2));view.y=Math.max(0,Math.min(340-nh,view.y+(view.h-nh)/2));view.w=nw;view.h=nh;applyView()}
 if(code==='EG'){
  const activePointers=new Map();let lastPan=null,lastDistance=null;
  svg.style.touchAction='none';
  svg.addEventListener('pointerdown',e=>{if(e.target.classList.contains('gv450-hit'))return;activePointers.set(e.pointerId,[e.clientX,e.clientY]);try{svg.setPointerCapture(e.pointerId)}catch(_){}});
  svg.addEventListener('pointermove',e=>{
   if(!activePointers.has(e.pointerId))return;
   const prev=activePointers.get(e.pointerId);activePointers.set(e.pointerId,[e.clientX,e.clientY]);
   const points=[...activePointers.values()];
   if(points.length===1){
    const box=svg.getBoundingClientRect();
    if(box.width&&box.height){
     view.x=Math.max(0,Math.min(480-view.w,view.x-(e.clientX-prev[0])*view.w/box.width));
     view.y=Math.max(0,Math.min(340-view.h,view.y-(e.clientY-prev[1])*view.h/box.height));applyView();
    }
   }else if(points.length===2){
    const distance=Math.hypot(points[0][0]-points[1][0],points[0][1]-points[1][1]);
    if(lastDistance&&distance>0)zoom(lastDistance/distance);
    lastDistance=distance;
   }
  });
  const end=e=>{activePointers.delete(e.pointerId);lastDistance=null};
  svg.addEventListener('pointerup',end);svg.addEventListener('pointercancel',end);
 }
 zoomIn.addEventListener('click',()=>zoom(.7));zoomOut.addEventListener('click',()=>zoom(1.4));reset.addEventListener('click',()=>{Object.assign(view,{x:0,y:0,w:480,h:340});applyView()});
 function select(i){
  selectedIndex=i;buttons.forEach((b,j)=>b.classList.toggle('gv450-active',i===j));
  list?.querySelectorAll('button').forEach((b,j)=>b.classList.toggle('gv450-current',i===j));
  const p=places[i];details.replaceChildren();
  const strong=document.createElement('strong');strong.textContent=label(p[0],p[1]);
  const small=document.createElement('span');small.textContent=label(p[2],p[3]);
  details.append(strong,small);
  const index=(typeof geo!=='undefined'&&Array.isArray(geo.tourism))?geo.tourism.findIndex(row=>row[0]===p[0]||row[1]===p[1]):-1;
  if(index>=0){const open=document.createElement('button');open.className='gv450-open';open.textContent=label('فتح تفاصيل المزار','Open landmark details');open.addEventListener('click',()=>{if(typeof setPage==='function')setPage('detail','tourism',index)});details.appendChild(open)}
 }
 places.forEach((p,i)=>{
  const point=projection([p[5],p[4]]);if(!point||!point.every(Number.isFinite))return;
  const circle=document.createElementNS(svg.namespaceURI,'circle');
  circle.setAttribute('cx',point[0]);circle.setAttribute('cy',point[1]);circle.setAttribute('r','5.5');circle.setAttribute('class','gv450-dot');
  svg.appendChild(circle);
  const hit=document.createElementNS(svg.namespaceURI,'circle');
  hit.setAttribute('cx',point[0]);hit.setAttribute('cy',point[1]);hit.setAttribute('r','15');
  hit.setAttribute('class','gv450-hit');hit.setAttribute('role','button');hit.setAttribute('tabindex','0');
  hit.setAttribute('aria-label',label(p[0],p[1]));
  hit.addEventListener('click',()=>select(i));
  hit.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select(i)}});
  svg.appendChild(hit);buttons.push(hit);
 });
 map.append(svg,controls);
 if(code==='EG'){
  const credit=document.createElement('span');credit.className='gv475-credit';
  credit.textContent='Relief: Esri, USGS, NOAA';
  map.appendChild(credit);
 }
 list=document.createElement('div');list.className='gv450-list';
 list.setAttribute('aria-label',label('اختيار معلم','Choose landmark'));
 places.forEach((p,i)=>{
  const button=document.createElement('button');
  button.type='button';button.textContent=label(p[0],p[1]);
  button.addEventListener('click',()=>select(i));
  list.appendChild(button);
 });
 const expand=document.createElement('button');expand.type='button';expand.className='gv450-expand';
 let expanded=false;
 function updateList(){list.classList.toggle('gv450-expanded',expanded);expand.textContent=expanded?label('عرض أقل','Show less'):label('عرض كل المعالم ('+places.length+')','Show all landmarks ('+places.length+')');expand.setAttribute('aria-expanded',String(expanded))}
 expand.addEventListener('click',()=>{expanded=!expanded;updateList()});updateList();
 panel.append(title,desc,map,details,list,expand);
 globe.parentElement.appendChild(panel);select(0);
 if(code==='EG'){
  const host=globe.closest('.gv-story-card')||globe.parentElement;
  host.classList.add('gv470-egypt');
  const heading=host.querySelector('h2'),intro=host.querySelector('p');
  if(heading)heading.textContent=label('استكشف مصر','Explore Egypt');
  if(intro)intro.textContent=label('اختر طريقة الاستكشاف','Choose an exploration view');
  list.remove();expand.remove();title.remove();desc.remove();
  details.classList.add('gv470-detail');
  const tabs=document.createElement('div');tabs.className='gv470-tabs';
  const globeTab=document.createElement('button'),mapTab=document.createElement('button');
  globeTab.type=mapTab.type='button';
  globeTab.textContent=label('الكرة الأرضية 3D','3D Globe');
  mapTab.textContent=label('خريطة المعالم','Landmarks map');
  tabs.append(globeTab,mapTab);globe.before(tabs);
  // Keep both map views in the same grid cell. Visibility changes do not
  // collapse layout height, preventing iOS Safari scroll jumps.
  const stage=document.createElement('div');stage.className='gv471-stage';
  globe.before(stage);stage.append(globe,panel);
  function showMap(enabled){
   globe.style.display='';
   panel.style.display='';
   globe.classList.toggle('gv471-inactive',enabled);
   panel.classList.toggle('gv471-inactive',!enabled);
   globe.setAttribute('aria-hidden',String(enabled));
   panel.setAttribute('aria-hidden',String(!enabled));
   globe.style.pointerEvents=enabled?'none':'';
   panel.style.pointerEvents=enabled?'':'none';
   globeTab.classList.toggle('gv470-on',!enabled);
   mapTab.classList.toggle('gv470-on',enabled);
   globeTab.setAttribute('aria-pressed',String(!enabled));
   mapTab.setAttribute('aria-pressed',String(enabled));
  }
  globeTab.addEventListener('click',()=>showMap(false));
  mapTab.addEventListener('click',()=>showMap(true));
  showMap(false); // 3D globe is the default view; landmarks remain one tap away.
  // The original country attractions section is unchanged.
  buttons.forEach(hit=>{
   hit.addEventListener('click',()=>details.classList.add('gv470-open'));
   hit.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')details.classList.add('gv470-open')});
  });
 }

}
const style=document.createElement('style');
style.textContent='.gv450-landmark-panel{margin-top:16px;padding:14px;border:1px solid rgba(113,229,213,.3);border-radius:17px;background:linear-gradient(150deg,rgba(8,48,67,.96),rgba(7,32,52,.95));color:#eafffb}.gv450-landmark-panel h3{font-size:17px;margin:0 0 5px}.gv450-landmark-panel p{font-size:12px;opacity:.8;margin:0 0 10px}.gv450-map{border-radius:12px;overflow:hidden;background:radial-gradient(circle at 45% 45%,#174b63,#08273b)}.gv450-map svg{display:block;width:100%;max-height:270px}.gv450-outline{fill:#145c68;stroke:#75dfce;stroke-width:1.5;vector-effect:non-scaling-stroke}.gv450-dot{fill:#ffda61;stroke:#fff4bd;stroke-width:1.5;pointer-events:none}.gv450-hit{fill:transparent;cursor:pointer;outline:none}.gv450-hit:focus-visible{stroke:#fff;stroke-width:2}.gv450-hit.gv450-active{stroke:#ffda61;stroke-width:2}.gv450-details{display:flex;flex-direction:column;gap:3px;padding:12px 4px 2px}.gv450-details strong{font-size:15px}.gv450-details span{font-size:12px;opacity:.78}';
style.textContent+=' .gv450-landmark-panel{border-color:rgba(113,229,213,.5);box-shadow:0 18px 45px #0005,inset 0 1px #ffffff12;background:linear-gradient(145deg,#103c50,#071c31)}.gv450-map{position:relative;background:radial-gradient(ellipse at 40% 30%,#21586b,#0a263b 70%);border:1px solid #4b98a055}.gv450-outline{fill:#1c6b70;stroke:#96f0dd;stroke-width:1.8;filter:drop-shadow(0 3px 7px #0008)}.gv450-dot{fill:#f7c85d;filter:drop-shadow(0 0 3px #f7c85d)}.gv450-controls{position:absolute;bottom:10px;left:10px;display:flex;gap:6px}.gv450-controls button,.gv450-open,.gv450-list button{background:#154c60;border:1px solid #75d7cc77;color:#eafffb;border-radius:10px;padding:7px 10px;font:700 12px Cairo,system-ui;cursor:pointer}.gv450-list{display:flex;gap:7px;overflow-x:auto;padding:12px 0 2px;scrollbar-width:thin}.gv450-list button{white-space:nowrap;flex-shrink:0}.gv450-open{margin-top:9px;background:#1b706f}.gv450-details{min-height:75px}.gv450-hit.gv450-active{fill:#ffd75b33;stroke:#ffe5a3;stroke-width:2.5}';style.textContent+=' .gv450-list button.gv450-current{background:#1b777a;border-color:#f7d76b;color:#fff}.gv450-controls{z-index:2;direction:ltr}.gv450-controls button{min-width:34px;min-height:34px}.gv450-map{isolation:isolate}';style.textContent+=' .gv450-landmark-panel{box-sizing:border-box;width:100%;max-width:100%;min-width:0;overflow:hidden}.gv450-map,.gv450-details,.gv450-list{box-sizing:border-box;width:100%;max-width:100%;min-width:0}.gv450-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;overflow:visible;max-height:none;padding:10px 0 0}.gv450-list button{display:none;min-width:0;max-width:100%;white-space:normal;overflow-wrap:anywhere;text-align:center;line-height:1.5;min-height:45px}.gv450-list button:nth-child(-n+4),.gv450-list.gv450-expanded button{display:block}.gv450-expand{display:block;width:100%;margin-top:9px;padding:9px;border:1px solid #69d8cb66;border-radius:11px;background:#123e54;color:#a4f6e9;font:700 12px Cairo,system-ui;cursor:pointer}.gv450-landmark-panel .gv450-map svg{max-width:100%;height:auto}@media(min-width:700px){.gv450-list{grid-template-columns:repeat(3,minmax(0,1fr))}.gv450-list button:nth-child(-n+6){display:block}}';style.textContent+=' .gv470-egypt{min-width:0;max-width:100%;overflow:hidden}.gv470-egypt .gv470-tabs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:12px 0}.gv470-tabs button{min-width:0;border:1px solid #66c9c4;border-radius:12px;padding:12px 6px;background:#103a50;color:#d8f5f2;font:700 13px Cairo,system-ui;cursor:pointer}.gv470-tabs button.gv470-on{background:#4cd8cb;color:#082c37}.gv470-egypt .gv450-landmark-panel{margin:0;padding:0;border:0;background:transparent;box-shadow:none}.gv470-egypt .gv470-detail{display:none}.gv470-egypt .gv470-detail.gv470-open{display:flex}.gv470-egypt .gv450-map{max-width:100%}.gv470-egypt .gv450-controls{direction:ltr}';style.textContent+=' .gv470-egypt .gv471-stage{display:grid;grid-template-columns:minmax(0,1fr);align-items:start;min-width:0;width:100%;overflow:hidden;overflow-anchor:none}.gv470-egypt .gv471-stage>.gv-globe-detail,.gv470-egypt .gv471-stage>.gv450-landmark-panel{grid-area:1/1;min-width:0;width:100%;box-sizing:border-box}.gv470-egypt .gv471-stage>.gv471-inactive{visibility:hidden;pointer-events:none!important}.gv470-egypt .gv471-stage>.gv-globe-detail{min-height:310px}.gv470-egypt .gv471-stage>.gv450-landmark-panel{min-height:310px}';style.textContent+=' .gv470-egypt .gv475-real-relief{opacity:.9}.gv470-egypt .gv475-tile{pointer-events:none}.gv470-egypt .gv472-nile{stroke:#43d7e5;stroke-width:2.7}.gv470-egypt .gv472-delta{stroke:#5de1e6}.gv470-egypt .gv450-map{background:radial-gradient(ellipse at 52% 48%,#205568 0%,#0b2d44 70%,#061c30 100%)}.gv470-egypt .gv472-terrain{fill:url(#gv472-land);stroke:#b9f4dd;stroke-width:1.7;filter:drop-shadow(0 4px 8px #0008)}.gv472-relief{fill:none;stroke:#f1d9a2;stroke-opacity:.11;stroke-width:5}.gv472-nile{fill:none;stroke:#63e1e8;stroke-width:3;stroke-linecap:round;filter:drop-shadow(0 0 4px #65eaf0)}.gv472-delta{fill:none;stroke:#8be6e8;stroke-width:1.8;stroke-linecap:round}.gv470-egypt .gv450-dot{fill:#ffd76e;stroke:#fff5c5;stroke-width:2;filter:drop-shadow(0 0 5px #f2b94d)}';style.textContent+=' .gv470-egypt .gv471-stage{height:clamp(300px,85vw,460px);max-height:460px;position:relative;align-items:stretch;overflow:hidden;border:1px solid #3f839377;border-radius:18px;background:radial-gradient(circle at 50% 42%,#143b52,#061c31)}.gv470-egypt .gv471-stage>.gv-globe-detail,.gv470-egypt .gv471-stage>.gv450-landmark-panel{height:100%;min-height:0!important;max-height:100%;overflow:hidden;align-self:stretch}.gv470-egypt .gv471-stage>.gv-globe-detail{display:flex;align-items:center;justify-content:center}.gv470-egypt .gv471-stage>.gv-globe-detail canvas{max-width:100%!important;max-height:100%!important;object-fit:contain}.gv470-egypt .gv471-stage .gv450-map{height:100%;display:flex;align-items:center;justify-content:center;border:0;background:transparent}.gv470-egypt .gv471-stage .gv450-map svg{width:100%;height:100%;max-height:100%;object-fit:contain}.gv470-egypt .gv471-stage .gv450-controls{bottom:12px;left:12px}.gv470-egypt .gv471-stage .gv470-detail{position:absolute;z-index:3;bottom:10px;right:10px;left:10px;width:auto;max-width:calc(100% - 20px);border:1px solid #63cfc088;border-radius:12px;padding:10px 12px;background:#092b40ee;box-shadow:0 6px 18px #0008}.gv470-egypt .gv471-stage .gv470-detail.gv470-open{display:flex}.gv470-egypt .gv471-stage .gv450-landmark-panel{position:relative}.gv470-egypt .gv471-stage>.gv471-inactive{visibility:hidden!important;pointer-events:none!important}';style.textContent+=' .gv470-egypt .gv471-stage>.gv-globe-detail{border:0!important;outline:0!important;box-shadow:none!important;border-radius:0!important;background:transparent!important;margin:0!important;padding:0!important;overflow:hidden!important}.gv470-egypt .gv471-stage>.gv-globe-detail>div{border:0!important;outline:0!important;box-shadow:none!important;border-radius:0!important;background:transparent!important;max-width:100%!important;max-height:100%!important}.gv470-egypt .gv471-stage>.gv-globe-detail canvas{border:0!important;outline:0!important;box-shadow:none!important;border-radius:0!important}.gv470-egypt .gv471-stage .gv450-controls{z-index:5}.gv470-egypt .gv471-stage .gv470-detail.gv470-open{bottom:58px;left:auto;right:10px;max-width:calc(100% - 20px);min-width:min(200px,65%);padding:9px 12px;box-sizing:border-box}.gv470-egypt .gv471-stage .gv470-detail .gv450-open{max-width:100%}';style.textContent+=' .gv470-egypt .gv475-credit{position:absolute;right:9px;bottom:8px;font:9px system-ui,sans-serif;color:#d8e7e9;background:#062234c9;border-radius:5px;padding:2px 5px;pointer-events:none}.gv470-egypt .gv450-map{position:relative}';style.textContent+=' .gv470-egypt .gv475-border{fill:none;stroke:#aaf1db;stroke-width:1.8;pointer-events:none;filter:drop-shadow(0 0 2px #56d5c0)}';document.head.appendChild(style);
const observer=new MutationObserver(()=>mount());
observer.observe(document.getElementById('main')||document.body,{childList:true,subtree:true});
mount();
})();