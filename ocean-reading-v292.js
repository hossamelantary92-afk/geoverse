/* GeoVerse v292: dedicated ocean detail reading layout. All other sections untouched. */
(function(){
'use strict';
const oceanDetails=detail, previousRender=render;
const regions={
'Pacific Ocean':{ar:'بين آسيا وأستراليا والأمريكتين، على جانبي خط التاريخ الدولي.',en:'Between Asia, Australia and the Americas, across the date line.',points:[[0,160],[0,-150]]},
'Atlantic Ocean':{ar:'بين الأمريكتين غربًا وأوروبا وأفريقيا شرقًا.',en:'Between the Americas and Europe and Africa.',points:[[1,-34]]},
'Indian Ocean':{ar:'جنوب آسيا، بين أفريقيا وأستراليا.',en:'South of Asia, between Africa and Australia.',points:[[-19,77]]},
'Southern Ocean':{ar:'يطوّق القارة القطبية الجنوبية ويصل المحيطات الكبرى ببعضها.',en:'Encircles Antarctica and links the great oceans.',points:[[-57,15],[-57,160],[-57,-110]]},
'Arctic Ocean':{ar:'حول القطب الشمالي، بين شمال أمريكا وأوروبا وآسيا.',en:'Around the North Pole, between northern America, Europe and Asia.',points:[[82,0]]}
};
let stories={},photos={},land=null,loadStarted=false;
const ar=(a,b)=>state.lang==='ar'?a:b;
const escape=x=>escapeHTML(String(x??''));
const stop=x=>String(x||'').trim().replace(/\s+/g,' ');
function intro(text){
 const s=stop(text);
 const first=s.match(/^(.+?[.!؟])(?:\s|$)/);
 return first?first[1]:s.slice(0,165);
}
const current=()=>state.page==='detail'&&state.category==='oceans';
function article(){
 const row=geo.oceans?.[state.item];
 if(!row)return oceanDetails();
 const idx=Number(state.item),name=ar(row[0],row[1]),story=stories[row[1]],summary=ar(story?.ar||row[2],story?.en||row[3]);
 const highlights=(state.lang==='ar'&&story?.factsAr?.length?story.factsAr:[]);
 const done=!!saved()['oceans_'+idx];
 const next=(idx+1)%geo.oceans.length,prev=(idx+geo.oceans.length-1)%geo.oceans.length;
 const info=regions[row[1]];
 const details=highlights.slice(0,2).map(pair=>'<div class="gv292-fact"><span>'+escape(pair[0])+'</span><strong>'+escape(pair[1])+'</strong></div>').join('');
 const sourceTitle=ar('مصادر ومعلومات إضافية','Sources and further reading');
 return '<article class="gv292-ocean">'+
 '<button type="button" class="back gv292-back" data-cat="oceans">'+ar('← العودة إلى المحيطات','← Back to oceans')+'</button>'+
 '<header class="gv292-hero">'+
 '<div class="gv292-cover" id="gv292Cover" role="img" aria-label="'+escape(ar('صورة: ','Photograph: ')+name)+'"><div class="gv292-cover-empty">🌊</div></div>'+
 '<div class="gv292-hero-copy"><span class="gv292-kicker">'+ar('المحيطات • دليل جغرافي','OCEANS • FIELD GUIDE')+'</span><h1>'+escape(name)+'</h1>'+
 '<p>'+escape(ar(row[2],row[3]))+'</p>'+
 '<button id="toggleSeen" class="gv292-learned '+(done?'is-learned':'')+'" aria-pressed="'+done+'">'+(done?ar('✓ تم التعلّم','✓ Learned'):ar('✓ تحديد كمعلومة تعلمتها','✓ Mark as learned'))+'</button></div></header>'+
 '<section class="gv292-panel gv292-summary"><div class="gv292-label">'+ar('اكتشف المحيط','DISCOVER THE OCEAN')+'</div><h2>'+ar('تعرف على المحيط','About the ocean')+'</h2>'+
 '<p class="gv292-lead" id="gv292Intro">'+escape(intro(summary))+'</p><div class="gv292-facts" id="gv292Facts">'+details+'</div></section>'+
 '<section class="gv292-panel gv292-details"><div class="gv292-label">'+ar('تعمّق في المعرفة','EXPLORE MORE')+'</div><h2>'+ar('معلومات إضافية','Further information')+'</h2>'+
 '<details id="gv292Long"><summary>'+ar('اقرأ التفاصيل العلمية والجغرافية','Read the full geography guide')+' <span aria-hidden="true">⌄</span></summary><p id="gv292Full">'+escape(summary)+'</p></details></section>'+
 '<section class="gv292-panel gv292-location"><div class="gv292-label">'+ar('الموقع الجغرافي','GEOGRAPHIC LOCATION')+'</div><h2>'+ar('أين يقع المحيط؟','Where is this ocean?')+'</h2>'+
 '<p>'+escape(ar(info.ar,info.en))+'</p>'+
 '<div id="gv292WorldMap" class="gv292-world-map" role="img" aria-label="'+escape(ar('خريطة العالم مع مؤشر لموقع '+name,'World map indicating '+name))+'"><span>'+ar('جاري تجهيز الخريطة…','Preparing map…')+'</span></div>'+
 '<div class="gv292-map-footer"><small>'+ar('المؤشرات لتوضيح الموقع، وليست حدود المحيط أو مقياسًا لمساحته.','Markers show approximate location, not ocean boundaries or area.')+'</small>'+
 '<button type="button" data-page="explore">'+ar('استكشف الكرة الأرضية ↗','Explore the globe ↗')+'</button></div></section>'+
 '<details class="gv292-sources"><summary>'+sourceTitle+'</summary><div id="gvWikiArticle" class="gv-wiki-summary"><p>'+ar('جارٍ تحميل المصادر…','Loading sources…')+'</p></div></details>'+
 '<footer class="gv292-footer"><span>'+ar('واصل الاستكشاف','KEEP EXPLORING')+'</span><div class="gv292-nav">'+
 '<button type="button" data-item="oceans:'+prev+'"><small>'+ar('السابق','Previous')+'</small><strong>'+escape(ar(geo.oceans[prev][0],geo.oceans[prev][1]))+'</strong></button>'+
 '<button type="button" data-item="oceans:'+next+'"><small>'+ar('التالي','Next')+'</small><strong>'+escape(ar(geo.oceans[next][0],geo.oceans[next][1]))+'</strong></button></div></footer>'+
 '</article>';
}
detail=function(){return current()?article():oceanDetails()};
function hydrate(){
 if(!current())return;
 const row=geo.oceans?.[state.item];
 if(!row)return;
 const story=stories[row[1]];
 if(story){
 const description=ar(story.ar,story.en);
 const lead=document.getElementById('gv292Intro');
 if(lead)lead.textContent=intro(description);
 const full=document.getElementById('gv292Full');if(full)full.textContent=description;
 const facts=document.getElementById('gv292Facts');
 if(facts&&state.lang==='ar')facts.innerHTML=(story.factsAr||[]).slice(0,2).map(pair=>'<div class="gv292-fact"><span>'+escape(pair[0])+'</span><strong>'+escape(pair[1])+'</strong></div>').join('');
 }
 const slot=document.getElementById('gv292Cover'),entry=photos['oceans:'+state.item];
 if(slot&&entry&&!slot.querySelector('img')&&typeof entry[0]==='string'&&/^https:\/\/(?:upload|thumb)\.wikimedia\.org\//.test(entry[0])){
 const im=document.createElement('img');im.alt=ar('صورة من المحيط: ','Ocean photograph: ')+ar(row[0],row[1]);im.decoding='async';im.addEventListener('load',()=>slot.classList.add('gv292-has-cover'));
 im.addEventListener('error',()=>im.remove());slot.appendChild(im);im.src=entry[0];
 }
 const node=document.getElementById('gv292WorldMap');
 if(node)buildMap(node,row[1]);
}
function buildMap(node,key){
 if(!node||!node.isConnected)return;
 if(!land||!window.d3||!d3.geoNaturalEarth1){node.innerHTML='<p class="gv292-map-unavailable">'+ar('تعذر تحميل الخريطة؛ يمكنك فتح الكرة الأرضية التفاعلية.','Map not available; explore the interactive globe instead.')+'</p>';return}
 try{
 const width=1000,height=510,proj=d3.geoNaturalEarth1().fitExtent([[20,20],[width-20,height-20]],land);
 const path=d3.geoPath(proj),features=land.features||[];
 const landShapes=features.map(f=>'<path d="'+path(f)+'"/>').join('');
 const points=regions[key].points.map(([lat,lng])=>{const p=proj([lng,lat]);return p?'<circle class="gv292-ocean-halo" cx="'+p[0]+'" cy="'+p[1]+'" r="25"/><circle class="gv292-ocean-dot" cx="'+p[0]+'" cy="'+p[1]+'" r="8"/>':''}).join('');
 node.innerHTML='<svg viewBox="0 0 '+width+' '+height+'" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid meet"><defs><radialGradient id="gv292Sea"><stop stop-color="#166f8e"/><stop offset="1" stop-color="#082e51"/></radialGradient></defs><rect width="'+width+'" height="'+height+'" rx="17" fill="url(#gv292Sea)"/><g class="gv292-grid">'+[-60,-30,0,30,60].map(lat=>{const pp=d3.geoPath(proj)({type:'LineString',coordinates:Array.from({length:181},(_,i)=>[-180+i*2,lat])});return '<path d="'+pp+'"/>'}).join('')+'</g><g class="gv292-land">'+landShapes+'</g><g>'+points+'</g></svg>';
 }catch(e){node.innerHTML='<p class="gv292-map-unavailable">'+ar('الخريطة غير متاحة حاليًا.','Map currently unavailable.')+'</p>'}
}
function load(){
 if(loadStarted)return;loadStarted=true;
 Promise.allSettled([
 fetch('./geo-stories.json?v=gv290-major-rivers').then(r=>r.ok?r.json():Promise.reject()),
 fetch('./photo-manifest-v13.json?v=gv291-major-river-photos').then(r=>r.ok?r.json():Promise.reject()),
 fetch('./world.geojson?v=gv292-ocean-map').then(r=>r.ok?r.json():Promise.reject())
 ]).then(([a,b,c])=>{
 if(a.status==='fulfilled')stories=a.value.stories||{};
 if(b.status==='fulfilled')photos=b.value.photos||{};
 if(c.status==='fulfilled')land=c.value;
 hydrate();
 });
}
render=function(){previousRender();if(current()){load();hydrate()}};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',load,{once:true});else load();
window.GeoVerseOceansV292={hydrate};
})();