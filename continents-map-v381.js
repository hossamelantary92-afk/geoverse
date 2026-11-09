/* GeoVerse C2 — Dedicated accessible interactive continent map.
 * Reads the project's existing world.geojson and country-meta.json. No map game or global atlas changes.
 */
(function(){
'use strict';
const continents=['Asia','Africa','Europe','North America','South America','Oceania','Antarctica'];
const namesAr=['آسيا','أفريقيا','أوروبا','أمريكا الشمالية','أمريكا الجنوبية','أوقيانوسيا','أنتاركتيكا'];
const focus={
 Asia:{lon:87,lat:34,scale:215},
 Africa:{lon:20,lat:2,scale:255},
 Europe:{lon:17,lat:53,scale:410},
 'North America':{lon:-104,lat:43,scale:235},
 'South America':{lon:-62,lat:-19,scale:265},
 Oceania:{lon:156,lat:-20,scale:235},
 Antarctica:{lon:0,lat:-90,scale:170}
};
const aliases={'unitedstatesofamerica':'United States','unitedrepublicoftanzania':'Tanzania','democraticrepublicofthecongo':'The Democratic Republic of Congo','republicofthecongo':'Congo','ivorycoast':'Ivory Coast','czechia':'Czech Republic','swaziland':'Swaziland','macedonia':'North Macedonia','easttimor':'Timor-Leste','russianfederation':'Russia','turkiye':'Turkey'};
const norm=x=>String(x||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z]/g,'');
const lang=(ar,en)=>state.lang==='ar'?ar:en;
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let loading=null;
let seq=0;
function loadData(){
 if(!loading)loading=Promise.all([
  fetch('./world.geojson?v=gv119-bermuda-ring-fixed').then(r=>{if(!r.ok)throw Error('geojson');return r.json()}),
  fetch('./country-meta.json').then(r=>{if(!r.ok)throw Error('metadata');return r.json()})
 ]).catch(e=>{loading=null;throw e});
 return loading;
}
function panel(idx){
 const active=continents[idx]||'Asia';
 return '<section class="gv-c2-shell" id="gvContinentMapPanel" aria-label="'+esc(lang('خريطة قارات العالم التفاعلية','Interactive continent atlas'))+'">'+
 '<header class="gv-c2-heading"><div><span class="eyebrow">GEOVERSE · CONTINENT MAP</span><h2>'+lang('استكشف حدود القارة ودولها','Explore continent borders and countries')+'</h2><p>'+lang('اضغط على أي دولة مضيئة لفتح ملفها الموسوعي. اختر قارة أخرى للتنقل.','Tap any highlighted country to open its encyclopedia. Choose another continent to explore.')+'</p></div><span class="gv-c2-badge">2D ATLAS</span></header>'+
 '<div class="gv-c2-tabs" role="group" aria-label="'+lang('اختيار القارة','Choose a continent')+'">'+continents.map((name,i)=>'<button type="button" class="gv-c2-tab'+(active===name?' active':'')+'" data-gv-c2-continent="'+i+'" aria-pressed="'+(active===name)+'">'+esc(lang(namesAr[i],name))+'</button>').join('')+'</div>'+
 '<div class="gv-c2-map-wrap"><div class="gv-c2-map-stage" id="gvContinentMapStage" role="group" aria-label="'+lang('خريطة حدود الدول','Country boundaries map')+'"><div class="gv-c2-loading">'+lang('جاري تجهيز الخريطة…','Preparing map…')+'</div></div>'+
 '<div class="gv-c2-controls"><button type="button" data-gv-c2-zoom="in" aria-label="'+lang('تكبير','Zoom in')+'">+</button><button type="button" data-gv-c2-zoom="out" aria-label="'+lang('تصغير','Zoom out')+'">−</button><button type="button" data-gv-c2-zoom="reset" aria-label="'+lang('إعادة ضبط العرض','Reset map view')+'">⌖</button></div></div>'+
 '<div class="gv-c2-bottom"><span class="gv-c2-key"><i aria-hidden="true"></i>'+lang('الدول التابعة للقارة','Countries in selected continent')+'</span><span class="gv-c2-count" id="gvContinentMapCount" role="status"></span></div>'+
 '<div class="gv-c2-info" id="gvContinentMapInfo" role="status">'+lang('استخدم الخريطة لاختيار دولة أو استعرض بطاقات الدول بالأسفل.','Select a country on the map or use the country cards below.')+'</div>'+
 '<p class="gv-c2-note">'+lang('الحدود المعروضة تعليمية وتقريبية، ولا تعبّر عن مواقف سياسية بشأن المناطق المتنازع عليها. الجزر الصغيرة قد لا تظهر بهذا المقياس.','Boundaries are simplified for educational use and imply no political position on disputed territories. Small islands may not be visible at this scale.')+'</p></section>';
}
function countryLabel(record,feature){
 if(state.lang==='en')return record?.name||feature.properties.name;
 if(record?.code){
  try{const text=new Intl.DisplayNames(['ar'],{type:'region'}).of(record.code);if(text&&/[\u0600-\u06FF]/.test(text))return text}catch(e){}
 }
 return feature.properties.gvArabic||record?.name||feature.properties.name;
}
function mount(){
 if(state.page!=='detail'||state.category!=='continents')return;
 const index=Number(state.item),key=continents[index];if(!key)return;
 const root=document.getElementById('main');if(!root)return;
 const reference=root.querySelector('.gv-continent-intro')||root.querySelector('#detailMap');
 if(!reference||root.querySelector('#gvContinentMapPanel'))return;
 reference.insertAdjacentHTML('afterend',panel(index));
 const stage=root.querySelector('#gvContinentMapStage');
 const count=root.querySelector('#gvContinentMapCount');
 const info=root.querySelector('#gvContinentMapInfo');
 const ticket=++seq;
 loadData().then(([world,meta])=>{
  if(ticket!==seq||!stage.isConnected||state.page!=='detail'||state.category!=='continents'||Number(state.item)!==index)return;
  if(!window.d3?.geoPath||!window.d3.geoMercator){stage.textContent=lang('تعذّر تشغيل مكتبة الخرائط.','Map library unavailable.');return;}
  const byName=new Map(meta.countries.filter(r=>r.code&&r.name).map(r=>[norm(r.name),r]));
  function lookup(name){return byName.get(norm(name))||byName.get(norm(aliases[norm(name)]))}
  const selected=meta.countries.filter(r=>r.code&&r.continent===key);
  count.textContent=selected.length+' '+lang('دولة وإقليم في السجل','countries and territories in the catalogue');
  const config=focus[key],projection=key==='Antarctica'
   ? d3.geoAzimuthalEqualArea().rotate([0,90]).scale(config.scale).translate([500,260])
   : d3.geoMercator().rotate([-config.lon,0]).center([0,config.lat]).scale(config.scale).translate([500,260]);
  projection.clipExtent([[0,0],[1000,520]]);
  const path=d3.geoPath(projection);
  const geo=world.features||[];
  const rows=geo.map((feature,i)=>{
   const rec=lookup(feature.properties?.name);
   const belongs=key==='Antarctica'&&feature.properties?.name==='Antarctica'||!!(rec&&(rec.continent===key||key==='Asia'&&['Russia','Turkey'].includes(rec.name)));
   return {feature,rec,belongs,i};
  });
  stage.innerHTML='<svg class="gv-c2-svg" viewBox="0 0 1000 520" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+esc(lang('خريطة تفاعلية لقارة ','Interactive map of ')+lang(namesAr[index],key))+'">'+
   '<rect width="1000" height="520" fill="#092b42"/><g class="gv-c2-graticule"><path d="'+path(d3.geoGraticule10())+'"/></g>'+
   '<g class="gv-c2-countries">'+rows.map(row=>{
    const p=path(row.feature);if(!p)return '';
    const title=countryLabel(row.rec,row.feature);
    const code=row.rec?.code||'';
    const valid=row.belongs&&!!code;
    return '<path class="gv-c2-country'+(row.belongs?' selected':'')+(valid?' clickable':'')+'" d="'+p+'"'+
      (valid?' tabindex="0" role="button" data-gv-c2-country="'+esc(code)+'" aria-label="'+esc(lang('افتح ملف ','Open profile: ')+title)+'"':' aria-hidden="true"')+'>'+
      (valid?'<title>'+esc(title)+'</title>':'')+'</path>';
   }).join('')+'</g></svg>';
  const svg=stage.querySelector('svg');
  let view=[0,0,1000,520];
  function update(){svg.setAttribute('viewBox',view.join(' '))}
  function zoom(kind){
   if(kind==='reset'){view=[0,0,1000,520];update();return}
   const factor=kind==='in'?.72:1.38;
   const width=Math.max(160,Math.min(1000,view[2]*factor)),height=Math.max(84,Math.min(520,view[3]*factor));
   view=[Math.max(0,Math.min(1000-width,view[0]+(view[2]-width)/2)),Math.max(0,Math.min(520-height,view[1]+(view[3]-height)/2)),width,height];update();
  }
  let drag=null,wasDrag=false;
  svg.addEventListener('pointerdown',e=>{
    if(e.target.closest('[data-gv-c2-country]'))return;
    drag={x:e.clientX,y:e.clientY,v:view.slice(),id:e.pointerId};wasDrag=false;
    try{svg.setPointerCapture(e.pointerId)}catch(err){}
  });
  svg.addEventListener('pointermove',e=>{
   if(!drag||e.pointerId!==drag.id)return;
   const dx=e.clientX-drag.x,dy=e.clientY-drag.y;
   if(Math.abs(dx)+Math.abs(dy)>6)wasDrag=true;
   const rect=svg.getBoundingClientRect();
   if(!rect.width||!rect.height)return;
   const w=drag.v[2],h=drag.v[3];
   view=[Math.max(0,Math.min(1000-w,drag.v[0]-dx*w/rect.width)),Math.max(0,Math.min(520-h,drag.v[1]-dy*h/rect.height)),w,h];update();
  });
  svg.addEventListener('pointerup',()=>drag=null);
  svg.addEventListener('pointercancel',()=>drag=null);
  svg.addEventListener('wheel',e=>{e.preventDefault();zoom(e.deltaY<0?'in':'out')},{passive:false});
  stage.addEventListener('click',e=>{
    const p=e.target.closest('[data-gv-c2-country]');if(!p||wasDrag)return;
    const code=p.dataset.gvC2Country;
    if(!meta.countries.some(x=>x.code===code))return;
    setPage('country-v4',code);
  });
  stage.addEventListener('keydown',e=>{
   if(e.key!=='Enter'&&e.key!==' ')return;
   const p=e.target.closest('[data-gv-c2-country]');if(!p)return;
   e.preventDefault();p.dispatchEvent(new MouseEvent('click',{bubbles:true}));
  });
  root.querySelectorAll('[data-gv-c2-zoom]').forEach(el=>el.addEventListener('click',()=>zoom(el.dataset.gvC2Zoom)));
 }).catch(()=>{
  if(stage.isConnected&&ticket===seq)stage.textContent=lang('تعذّر تحميل خريطة القارة. جرّب إعادة فتح القسم.','Could not load continent map. Reopen the section to retry.');
 });
}
document.addEventListener('click',e=>{
 const tab=e.target.closest('[data-gv-c2-continent]');
 if(!tab)return;
 e.preventDefault();e.stopImmediatePropagation();
 const n=Number(tab.dataset.gvC2Continent);
 if(n!==Number(state.item)&&n>=0&&n<continents.length){seq++;setPage('detail','continents',n)}
},true);
const css=`
.gv-c2-shell{margin:20px 0 24px;padding:clamp(16px,2.6vw,24px);border:1px solid rgba(112,220,223,.31);border-radius:22px;background:linear-gradient(145deg,#0b3449,#061f34);box-shadow:0 12px 32px #0003;color:#ebffff}
.gv-c2-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:15px}
.gv-c2-heading h2{margin:6px 0;color:#f4ffff;font-size:clamp(19px,3vw,25px)}
.gv-c2-heading p{margin:0;color:#b9d9e0;line-height:1.85;font-size:13px}
.gv-c2-badge{border:1px solid #78bdbb85;color:#d9d2a0;border-radius:10px;padding:7px 10px;font-weight:800;font-size:11px;white-space:nowrap}
.gv-c2-tabs{display:flex;overflow-x:auto;gap:7px;padding:18px 0 12px;scrollbar-width:thin;scroll-snap-type:x proximity}
.gv-c2-tab{background:#12394e;color:#d1e9ee;border:1px solid #ffffff25;border-radius:12px;padding:10px 13px;font-weight:750;white-space:nowrap;cursor:pointer;scroll-snap-align:start}
.gv-c2-tab.active{background:#45cfc5;color:#052c3d;border-color:#6bf2e3}
.gv-c2-map-wrap{position:relative;overflow:hidden;border-radius:16px;border:1px solid rgba(126,210,223,.3);background:#092b42}
.gv-c2-map-stage{height:clamp(260px,43vw,475px);min-width:0;position:relative;display:flex;align-items:stretch;justify-content:center;touch-action:none}
.gv-c2-loading{margin:auto;color:#b6d7e2}
.gv-c2-svg{display:block;width:100%;height:100%;touch-action:none}
.gv-c2-graticule path{fill:none;stroke:#b5d5de20;stroke-width:.7}
.gv-c2-country{fill:#31566b;stroke:#7fb1bd8a;stroke-width:.72;vector-effect:non-scaling-stroke}
.gv-c2-country.selected{fill:#4bcac1;stroke:#e2ffef;stroke-width:1.05}
.gv-c2-country.clickable{cursor:pointer;transition:fill .18s ease}
.gv-c2-country.clickable:hover,.gv-c2-country.clickable:focus,.gv-c2-country.chosen{fill:#edc674;stroke:#fff5d6;stroke-width:2.3;outline:none}
.gv-c2-controls{position:absolute;right:10px;bottom:10px;display:flex;gap:6px;z-index:2}
.gv-c2-controls button{border:1px solid #b0d7da66;border-radius:10px;background:#07283eea;color:white;font-size:20px;min-width:37px;min-height:37px;cursor:pointer}
.gv-c2-bottom{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;margin:13px 0 10px;font-size:12px;color:#c5dce2}
.gv-c2-key{display:flex;align-items:center;gap:8px}.gv-c2-key i{width:11px;height:11px;border-radius:4px;background:#4bcac1}
.gv-c2-info{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:42px;color:#dfedee;font-size:13px}
.gv-c2-info button{border:0;border-radius:10px;padding:10px 14px;background:#edc674;color:#092e3d;font-weight:800;cursor:pointer}
.gv-c2-note{margin:13px 0 0;color:#a4c3cb;font-size:11px;line-height:1.75}
body.light .gv-c2-shell{background:linear-gradient(135deg,#e8f6f7,#fcfefe);border-color:#b9d8da;color:#143e4d}
body.light .gv-c2-heading h2{color:#143e4d}
body.light .gv-c2-heading p,body.light .gv-c2-note,body.light .gv-c2-bottom{color:#375d68}
body.light .gv-c2-info{color:#143e4d}
@media(max-width:650px){.gv-c2-shell{padding:12px;border-radius:18px}.gv-c2-heading{flex-direction:column;gap:6px}.gv-c2-tabs{padding:12px 0}.gv-c2-tab{font-size:12px}.gv-c2-map-stage{height:300px}.gv-c2-info{align-items:stretch;flex-direction:column}.gv-c2-info button{width:100%}}
`;
if(!document.getElementById('gv-c2-style')){const style=document.createElement('style');style.id='gv-c2-style';style.textContent=css;document.head.appendChild(style)}
const beforeRender=render;
render=function(){beforeRender();mount()};
})();
