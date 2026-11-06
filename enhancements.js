/* GeoVerse V4: premium 3D explorer and structured encyclopedia.
   No secrets or private APIs. Atlas and countries metadata live in this repository. */
(function(){
'use strict';
const G=window;
const continentKeys=['Asia','Africa','Europe','North America','South America','Oceania','Antarctica'];
const continentAr={'Asia':'آسيا','Africa':'أفريقيا','Europe':'أوروبا','North America':'أمريكا الشمالية','South America':'أمريكا الجنوبية','Oceania':'أوقيانوسيا','Antarctica':'أنتاركتيكا'};
const continentEyes=['⭑','⭑','⭑','⭑','⭑','⭑','⭑'];
const iconPaths={
countries:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m3 9 18 0M8 4v16M15 4v16"/>',
continents:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-6 6-6 12 0 18 6-6 6-12 0-18"/>',
oceans:'<path d="M2 8c3-3 5-3 8 0s5 3 8 0 4-3 4-3M2 14c3-3 5-3 8 0s5 3 8 0 4-3 4-3M2 20c3-3 5-3 8 0s5 3 8 0 4-3 4-3"/>',
seas:'<path d="M3 19c3-2 5-2 8 0s6 2 10 0M12 3v11M5 14h14l-3 4H8zM12 3 6 12h6"/>',
deserts:'<circle cx="18" cy="5" r="2.2"/><path d="M2 19c5-8 9-8 14 0M10 19c4-5 7-5 12 0M2 22h20"/>',
rivers:'<path d="M4 2c16 4-11 13 12 20M15 3l3 4-4 3M4 16l-2 3 5 2"/>',
waterfalls:'<path d="M3 4h18M6 7v9M12 7v12M18 7v9M5 19c3-3 5-3 8 0s5 3 8 0"/>',
forests:'<path d="m8 3-5 9h3l-4 6h12l-4-6h3L8 3ZM8 18v4M17 7l-4 7h8zM17 14v8"/>',
mountains:'<path d="m2 21 8-16 4 7 3-4 5 13H2Z"/><path d="m7 12 3-3 3 5"/>',
lakes:'<path d="M2 18c4-3 6-3 10 0s6 3 10 0M2 12c4-3 6-3 10 0s6 3 10 0M12 3v5"/>',
islands:'<path d="M2 18c4-3 6-3 10 0s6 3 10 0M12 14V5M12 6c-4-3-7-2-9 2M12 6c4-4 7-3 9 1M12 6c-2 0-4 3-4 6"/>',
volcanoes:'<path d="M2 21 8 9l3 3 3-3 8 12H2ZM9 3l2 3m3-4-1 4"/>',
straits:'<path d="M3 2v8c4 2 6 5 6 12M21 2v8c-4 2-6 5-6 12M12 8v8m-3-3 3 3 3-3"/>',
gulfs:'<path d="M3 3v7c0 9 5 11 9 11s9-2 9-11V3M3 11c3 0 5 1 9 4 4-3 6-4 9-4"/>',
glaciers:'<path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19M9 5l3 3 3-3M9 19l3-3 3 3"/>',
valleys:'<path d="m2 4 6 14 4-8 4 8 6-14M3 21h18"/>',
climate:'<circle cx="8" cy="8" r="4"/><path d="M8 1v2M2 8H1m4-5-2-2M15 16c0-2 2-4 4-4 3 0 5 2 5 5m-17 1c-1-3 1-5 4-5 3 0 5 2 5 5"/>',
grasslands:'<path d="M12 22V5M12 13c-5 0-8-4-8-8 5 0 8 3 8 8ZM12 17c6 0 9-4 9-9-6 0-9 4-9 9ZM3 22h18"/>'
};
function svgIcon(name,size=21){return '<svg class="gv-icon" aria-hidden="true" width="'+size+'" height="'+size+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">'+(iconPaths[name]||iconPaths.continents)+'</svg>'}
cats.forEach(c=>{c.emoji=svgIcon(c.id)});
gameModes.forEach(g=>{let id=['mixed','capitals','classify','definitions','locations','flags','mapfind'].indexOf(g[0]);g[1]=svgIcon(['continents','countries','islands','climate','mountains','countries','continents'][id]||'continents',24)});
const flag=(code,alt)=>code&&/^[A-Z]{2}$/.test(code)?'<img class="gv-flag" loading="lazy" src="https://flagcdn.com/'+code.toLowerCase()+'.svg" alt="'+escapeHTML(alt||'Flag')+'" onerror="this.style.display=\'none\'">':svgIcon('countries');
const allGeo=geo.countries.slice();
const store={ready:false,countries:[],byName:new Map(),byCode:new Map(),countryFeatures:[],featLookup:new Map(),continentGeo:new Map(),status:'loading'};
function norm(v){return String(v||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z]/g,'')}
const alias={'unitedstatesofamerica':'United States','unitedrepublicoftanzania':'Tanzania','democraticrepublicofthecongo':'The Democratic Republic of Congo','republicofthecongo':'Congo','ivorycoast':'Ivory Coast','russia':'Russia','turkey':'Turkey','czechrepublic':'Czech Republic','northkorea':'North Korea','southkorea':'South Korea','westernsahara':'Western Sahara','swaziland':'Swaziland','macedonia':'Macedonia','kosovo':'Kosovo','frenchsouthernandantarcticlands':'French Southern and Antarctic Lands'};
const twoRegion=new Set(['Russia','Turkey','Kazakhstan','Georgia','Azerbaijan']);
const centerOverrides={'Egypt':[26.8,30.8],'Russia':[60,90],'Turkey':[39,35],'United States':[39,-98],'Antarctica':[-78,0]};
function regionFor(name){if(name==='Antarctica')return 'Antarctica';return store.byName.get(norm(name))?.continent||null}
function recordFor(name){return store.byName.get(norm(name))||store.byName.get(norm(alias[norm(name)]))||null}
function arName(r){if(!r)return '';try{return new Intl.DisplayNames(['ar'],{type:'region'}).of(r.code)||r.name}catch{return r.name}}
function resolvedContinent(name){const r=recordFor(name);return r?.continent||((name==='Antarctica')?'Antarctica':null)}
async function loadCatalogue(){
 try{
 const [meta,shape]=await Promise.all([fetch('./country-meta.json').then(x=>x.json()),fetch('./world.geojson').then(x=>x.json())]);
 store.countries=meta.countries.filter(x=>x.code&&x.continent);for(const r of store.countries){store.byCode.set(r.code,r);store.byName.set(norm(r.name),r)}
 store.byName.set(norm('United States of America'),recordFor('United States'));
 store.byName.set(norm('United Republic of Tanzania'),recordFor('Tanzania'));
 store.byName.set(norm('Democratic Republic of the Congo'),recordFor('The Democratic Republic of Congo'));
 store.byName.set(norm('Republic of the Congo'),recordFor('Congo'));
 for(const f of shape.features){const name=f.properties.name;const r=recordFor(name);if(r){f.properties.gvCode=r.code;f.properties.gvContinent=r.continent;f.properties.gvArabic=arName(r);store.featLookup.set(r.code,f)}else if(name==='Antarctica'){f.properties.gvContinent='Antarctica'}if(name==='Russia'||name==='Turkey'){f.properties.gvContinent='Europe';f.properties.gvTranscontinental=true}store.countryFeatures.push(f)}
 for(const c of continentKeys){store.continentGeo.set(c,store.countryFeatures.filter(f=>f.properties.gvContinent===c||(c==='Asia'&&['Russia','Turkey'].includes(f.properties.name))))}
 store.status='ready';store.ready=true;
 // Preserve existing studied indexes. Newly appended entries only augment the original list.
 const existing=new Set(geo.countries.map(x=>norm(x[1])));
 for(const r of store.countries){if(existing.has(norm(r.name)))continue;existing.add(norm(r.name));const f=store.featLookup.get(r.code);const p=f&&window.d3?d3.geoCentroid(f):null;if(!p)continue;const capital=r.capital?('العاصمة: '+r.capital+' · '):'';geo.countries.push([arName(r),r.name,capital+'تقع في '+(continentAr[r.continent]||r.continent)+'.','Capital: '+(r.capital||'—')+' · '+r.continent+'.',p[1],p[0]])}
 if(state.page==='countries-v4'||state.page==='country-v4'||state.page==='category'||state.page==='detail'||state.page==='explore'||state.page==='home')render();
 }catch(e){store.status='error';console.warn('GeoVerse catalogue data could not load',e)}
}
G.GeoVerseV4={store,continentKeys,svgIcon,flag};
const oldHome=home,oldRender=render,oldDetail=detail,oldItemCards=itemCards,oldDraw=atlasDraw,oldPlay=play,oldAtlasCreate=atlasCreate;
function spotlightBackdrop(){return '<div class="gv-hero-grain"></div><div class="gv-hero-light"></div><div id="gvHomeGlobe" class="gv-home-globe" aria-label="'+lang('كرة أرضية ثلاثية الأبعاد قابلة للدوران','Interactive 3D Earth globe')+'"></div>'}
home=function(){
 let h=oldHome();
 h=h.replaceAll('🌊',svgIcon('oceans')).replaceAll('🏔️',svgIcon('mountains')).replaceAll('🌍',svgIcon('continents')).replaceAll('🏆',svgIcon('countries')).replaceAll('🎮',svgIcon('continents')).replaceAll('🎓',svgIcon('countries'));

 h=h.replace('<section class="hero hero-v3"><div class="hero-stars"></div>', '<section class="hero hero-v3 gv-hero-v4">'+spotlightBackdrop()+'<div class="hero-stars"></div>');
 h=h.replace('GEOVERSE · EXPLORE BEYOND BORDERS','GEOVERSE &nbsp; / &nbsp; EXPLORE BEYOND BORDERS');
 h=h.replace(lang('استكشف <span class="accent">كوكبنا</span>','Explore <span class="accent">Our Planet</span>'),lang('العالم بين <span class="accent">إيديك</span>','The World in <span class="accent">Your Hands</span>'));
 h=h.replace('</section><div class="home-section-head">','<div class="gv-hero-index">01 / 07 &nbsp; • &nbsp; '+lang('رحلتك تبدأ هنا','THE JOURNEY BEGINS')+'</div></section><div class="home-section-head">');
 return h;
};
function getCountryName(r){return state.lang==='ar'?arName(r):r.name}
function countryCards(list){return list.map(r=>'<button class="gv-country-row" data-v4-country="'+escapeHTML(r.code)+'"><span class="gv-country-flag">'+flag(r.code,'Flag of '+r.name)+'</span><span class="gv-country-name"><b>'+escapeHTML(getCountryName(r))+'</b><small>'+escapeHTML(r.name)+'</small></span><span class="gv-capital">'+escapeHTML(r.capital||'—')+'</span><span class="gv-country-chevron">↗</span></button>').join('')}
function countriesPage(){
 const c=state.v4Continent||'Asia';
 const options=['all',...continentKeys];
 const countries=store.countries.filter(r=>c==='all'||r.continent===c||c==='Asia'&&twoRegion.has(r.name)).sort((a,b)=>(state.v4Sort==='en'?a.name.localeCompare(b.name):getCountryName(a).localeCompare(getCountryName(b),state.lang==='ar'?'ar':'en')));
 const filtered=countries.filter(x=>(getCountryName(x)+' '+x.name+' '+x.capital).toLowerCase().includes((state.v4Search||'').trim().toLowerCase()));
 return '<div class="gv-page-heading"><span class="eyebrow">THE WORLD / COUNTRY INDEX</span><h1>'+lang('دول العالم وعواصمها','Countries & Capitals')+'</h1><p>'+lang('استكشف الدول حسب القارات، مع أعلام SVG وملفات معرفية وخرائط تفاعلية.','Explore by continent, with real SVG flags, profiles and maps.')+'</p></div><div class="gv-country-controls"><div class="gv-tabs">'+options.map(x=>'<button class="'+(x===c?'active':'')+'" data-v4-continent="'+x+'">'+(x==='all'?lang('كل العالم','All world'):lang(continentAr[x],x))+'</button>').join('')+'</div><div class="gv-country-toolbar"><input id="gvCountrySearch" type="search" placeholder="'+lang('ابحث عن دولة أو عاصمة...','Search a country or capital...')+'" value="'+escapeHTML(state.v4Search||'')+'"><button data-v4-sort="'+(state.v4Sort==='en'?'ar':'en')+'">'+lang('ترتيب أبجدي','Alphabetical')+' ⇅</button></div></div><div class="gv-result-head"><strong>'+filtered.length+' '+lang('دولة وإقليم','countries & territories')+'</strong><span>'+lang('اضغط لاستكشاف العلم والتفاصيل والحدود','Select to view real flags, geography & borders')+'</span></div><div class="gv-country-grid" id="gvCountryGrid">'+countryCards(filtered)+'</div><p class="gv-data-source">'+lang('الأرقام تشمل دولًا وأقاليم وفق مصدر البيانات، وبعض الحالات العابرة للقارات تظهر في أكثر من تبويب.','Entries include countries and territories; transcontinental cases may appear in more than one tab.')+' <a href="https://github.com/samayo/country-json" target="_blank" rel="noopener noreferrer">Data source</a></p>';
}
function capitalAr(r){const v=allGeo.find(x=>norm(x[1])===norm(r.name));const m=(v?.[2]||'').match(/العاصمة(?: الإدارية)?:\s*([^·،]+)/);return m?m[1].trim():r.capital||'—'}
function countryPage(){
 const r=store.byCode.get(state.v4Code);if(!r)return '<div class="notice">'+lang('بيانات الدولة غير متاحة','Country information unavailable')+'</div>';
 const f=store.featLookup.get(r.code),cent=f&&window.d3?d3.geoCentroid(f):null;
 const c=state.lang==='ar'?(continentAr[r.continent]||r.continent):r.continent;
 return '<button class="back" data-page="countries-v4">→ '+lang('العودة للدول','Back to countries')+'</button><div class="gv-country-profile"><span class="eyebrow">WORLD ATLAS / COUNTRY PROFILE</span><div class="gv-profile-head"><div class="gv-profile-flag">'+flag(r.code,r.name+' flag')+'</div><div><h1>'+escapeHTML(getCountryName(r))+'</h1><p>'+escapeHTML(r.name)+' · '+escapeHTML(c)+'</p></div></div><div class="gv-profile-facts"><div><small>'+lang('العاصمة','Capital')+'</small><strong>'+escapeHTML(state.lang==='ar'?capitalAr(r):r.capital||'—')+'</strong></div><div><small>'+lang('القارة','Continent')+'</small><strong>'+escapeHTML(c)+'</strong></div><div><small>'+lang('العملة','Currency')+'</small><strong>'+escapeHTML(r.currency||'—')+'</strong></div><div><small>ISO</small><strong>'+escapeHTML(r.code)+'</strong></div></div></div><div class="gv-story-layout"><section><div class="gv-story-card"><span class="eyebrow">EXPLORE FROM SPACE</span><h2>'+lang('موقع الدولة على الكرة الأرضية','Explore this country in 3D')+'</h2><p>'+lang('تظهر حدود الدولة بلون مميز. يمكنك تدوير الكرة والتكبير والتصغير.','Country borders are highlighted. Drag, rotate and zoom around the planet.')+'</p><div class="gv-globe-detail" id="gvDetailGlobe"></div><div class="gv-map-attribution">'+lang('حدود توضيحية وفق مجموعة بيانات العالم، وليست مرجعًا رسميًا للنزاعات الحدودية.','Country boundaries are dataset approximations, not official dispute adjudications.')+'</div></div><div class="gv-story-card" id="gvWikiArticle"><h2>'+lang('معلومات جغرافية','Geographic Profile')+'</h2><p>'+lang('جاري استدعاء مصادر معلومات وصور هذا المكان...','Loading place facts and photographs...')+'</p></div></section><aside><div class="gv-story-card"><h3>'+lang('دول مرتبطة','Explore Nearby')+'</h3><p>'+lang('اختار قارة الدولة لتشاهد الدول المرتبطة بها.','Browse other countries in the same continent.')+'</p><button class="secondary" data-v4-continent="'+r.continent+'">'+lang('استكشف','Explore')+' '+escapeHTML(c)+'</button></div><div class="gv-story-card"><h3>'+lang('مصادر المعلومات','Sources')+'</h3><a href="https://github.com/samayo/country-json" target="_blank" rel="noopener noreferrer">Country metadata</a><a href="https://github.com/johan/world.geo.json" target="_blank" rel="noopener noreferrer">Geographic geometry</a><p class="gv-muted">'+lang('بيانات العواصم والعملة قد تحتاج تحديثًا؛ لا تعتمد عليها كمصدر رسمي وحيد.','Capitals and currencies may require updating; do not treat the dataset as official.')+'</p></div></aside></div>';
}
function extendedArticle(v){
 return '<div class="gv-article-photobar"><div class="gv-article-photo" id="gvArticlePhoto"><span class="gv-photo-loading">'+lang('جاري تحميل صورة حقيقية للمعلم','Loading a location photo')+'</span></div></div><div class="gv-photo-gallery" id="gvPhotoGallery"></div><section class="gv-article-body"><div class="eyebrow">'+lang('الدليل الجغرافي','THE FIELD GUIDE')+'</div><h2>'+lang('اكتشف المكان','Discover the Place')+'</h2><p>'+escapeHTML(lang(v[2],v[3]))+'</p>'+storyPanel(storyFor(v))+'<div id="gvWikiArticle" class="gv-wiki-summary"><p>'+lang('جاري تحميل تفاصيل إضافية من مصادر موسوعية...','Loading additional reference details...')+'</p></div><div class="gv-travel-facts"><span>'+svgIcon('continents')+'</span><div><b>'+lang('أين يقع؟','Where is it?')+'</b><small>'+v[4].toFixed(2)+'° / '+v[5].toFixed(2)+'°</small></div><span>'+svgIcon('countries')+'</span><div><b>'+lang('التصنيف','Classification')+'</b><small>'+escapeHTML(label(cats.find(c=>c.id===state.category)))+'</small></div></div><div class="gv-source-note">'+lang('الصور والمعلومات الموسوعية تظهر فقط عند مطابقة صفحة المصدر لاسم المعلم؛ قد لا تتوفر صورة لكل مكان.','Photos and article summaries appear when a named source article can be matched; some places have no suitable verified photo.')+'</div></section>';
}
detail=function(){const base=oldDetail();if(state.category==='continents'){const v=geo.continents[state.item],key=v[1];const countryList=store.countries.filter(r=>r.continent===key||key==='Asia'&&twoRegion.has(r.name));return base.replace('</div><div class="detail-card">','</div><div class="gv-continent-intro"><h2>'+lang('حدود القارة ودولها','Continent Boundaries & Countries')+'</h2><p>'+lang('الدول التابعة للقارة ستظهر بلون مضيء على الكرة ثلاثية الأبعاد.','The continent countries will glow together on the 3D Earth.')+'</p><div class="gv-continent-3d" id="gvContinentGlobe"></div><div class="gv-boundary-key">'+lang('حدود القارات تصنيف جغرافي تقريبي، وليست حدودًا سياسية رسمية.','Continental divisions are geographic conventions, not political borders.')+'</div></div><div class="detail-card">')+'<div class="gv-story-card"><h2>'+lang('دول القارة','Countries in this continent')+'</h2><div class="gv-country-grid">'+countryCards(countryList)+'</div></div>'}
 const v=geo[state.category][state.item];return base+'<section class="gv-feature-article">'+extendedArticle(v)+'</section><section class="gv-story-card gv-feature-globe"><span class="eyebrow">3D WORLD ATLAS</span><h2>'+lang('شاهد المعلم على الكرة الأرضية','Explore this place in 3D')+'</h2><div class="gv-globe-detail" id="gvDetailGlobe"></div><p class="gv-map-attribution">'+lang('قد يكون الموضع نقطة تمثيلية عندما لا تتوفر حدود جغرافية موثقة لهذا المعلم.','A representative location point is shown where documented geographic extents are unavailable.')+'</p></section>';
};

itemCards=function(items){
 if(state.category==='countries')return oldItemCards(items);
 const q=(state.filter||'').trim().toLowerCase();
 const list=items.map((v,i)=>({v,i})).filter(x=>!q||(x.v[0]+' '+x.v[1]).toLowerCase().includes(q));
 return list.length?list.map(({v,i})=>'<button class="gv-place-card" data-item="'+state.category+':'+i+'"><span class="gv-place-media" data-photo-index="'+i+'">'+svgIcon(state.category,34)+'<small>'+lang('صورة المعلم','Place photograph')+'</small></span><span class="gv-place-copy"><strong>'+escapeHTML(lang(v[0],v[1]))+'</strong><small>'+escapeHTML(lang(v[2],v[3]))+'</small><span class="gv-place-explore">'+lang('اكتشف الموقع والتفاصيل','Discover location & facts')+' ↗</span></span></button>').join(''):'<div class="empty">'+lang('لا توجد نتائج','No results')+'</div>';
};
let cardPhotoSequence=0;
async function loadCardsMedia(){
 if(state.page!=='category'||state.category==='countries')return;
 const current=++cardPhotoSequence;
 const group=state.category, items=geo[group]||[];
 const targets=items.map((v,i)=>({i,title:wikiTitle(v)})).filter(x=>!!x.title).slice(0,180);
 const chunks=[];for(let i=0;i<targets.length;i+=30)chunks.push(targets.slice(i,i+30));
 for(const chunk of chunks){
  try{
   const params=new URLSearchParams({action:'query',prop:'pageimages',piprop:'thumbnail',pithumbsize:'640',redirects:'1',titles:chunk.map(x=>x.title).join('|'),format:'json',origin:'*'});
   const res=await fetch('https://en.wikipedia.org/w/api.php?'+params);if(!res.ok)continue;
   const data=await res.json();if(current!==cardPhotoSequence||state.category!==group||state.page!=='category')return;
   const pages=Object.values(data.query?.pages||{});
   // Wikipedia often normalizes and redirects precise article titles (e.g. Nile River -> Nile).
   // Resolve only the API's own explicit title-redirect chain, never a fuzzy search.
   const redirects=new Map();
   for(const r of [...(data.query?.normalized||[]),...(data.query?.redirects||[])])redirects.set(norm(r.from),r.to);
   const byTitle=new Map(pages.map(p=>[norm(p.title),p]));
   for(const row of chunk){
    let name=row.title;
    for(let hop=0;hop<5;hop++){const dest=redirects.get(norm(name));if(!dest||norm(dest)===norm(name))break;name=dest}
    const matching=byTitle.get(norm(name));if(!matching?.thumbnail?.source)continue;
    const image=matching.thumbnail.source;
    if(!/^https:\/\/(?:upload|thumb)\.wikimedia\.org\//.test(image))continue;
    // Reject SVG maps, diagrams, icons and artwork that could be mistaken for a real place photograph.
    if(/\.(?:svg)(?:\?|$)/i.test(image)||/(?:map[_-]|locator|blank[_-]map|flag[_-]|coat[_-]of[_-]arms|logo[_-]|diagram|schematic|emblem)/i.test(decodeURIComponent(image)))continue;
    const box=document.querySelector('[data-photo-index="'+row.i+'"]');if(!box)continue;
    const placeName=lang(items[row.i][0],items[row.i][1]);
    if(window.GeoVersePlacesV13?.mount)window.GeoVersePlacesV13.mount(box,image,placeName,matching.fullurl);
    else box.innerHTML='<img loading="lazy" src="'+escapeHTML(image)+'" alt="'+escapeHTML(placeName)+'">';
   }
  }catch(e){/* Keep attractive vector placeholder when source is unavailable */ }
 }
}

categoryPage=(function(old){return function(){if(state.category==='countries'){return countriesPage()}return old()}})(categoryPage);
const originalSetPage=setPage;
G.gvCountryOpen=function(code){state.page='country-v4';state.v4Code=code;state.category='countries';state.item=null;render();window.scrollTo(0,0)};
const oldPlayDisplay=play;
const oldMode=null;
play=function(){
 let h=oldPlayDisplay().replaceAll('class="quiz-card"','class="quiz-card gv-quiz-premium"');
 if(selectedGameMode==='flags'&&!state.quizComplete){const question=quiz[state.quizIndex];if(question?.[7])h=h.replace('<h2 class="quiz-question">','<div class="gv-flag-challenge">'+flag(question[7],lang('علم دولة مطلوب التعرف عليها','Country flag to identify'))+'</div><h2 class="quiz-question">');}
 return h;
};
render=function(){
 oldRender();
 if(state.page==='countries-v4')main.innerHTML=countriesPage();
 if(state.page==='country-v4')main.innerHTML=countryPage();
 if(state.page==='explore')main.innerHTML='<section class="gv-story-card gv-explore-3d"><span class="eyebrow">WORLD EXPLORER / INTERACTIVE 3D EARTH</span><h2>'+lang('دور الكرة الأرضية واستكشف العالم','Rotate Earth & Explore the World')+'</h2><p>'+lang('حرّك الكرة بإصبعك أو الماوس، واضغط على الدول لمعرفة علمها وعاصمتها.','Drag the globe and select a country to explore its flag and capital.')+'</p><div class="gv-globe-detail gv-explore-globe" id="gvExploreGlobe"></div></section>'+main.innerHTML;
 // When countries category chosen via original nav, show the new encyclopedia.
 if(state.page==='category'&&state.category==='countries')main.innerHTML=countriesPage();
 document.body.classList.toggle('gv-game-mode',state.page==='play'&&selectedGameMode==='mapfind');
 const insightNode=document.getElementById('insights');
 if(insightNode)insightNode.innerHTML=insightNode.innerHTML.replaceAll('🧭',svgIcon('continents',28)).replaceAll('🏆',svgIcon('countries',25)).replaceAll('🌍',svgIcon('continents',25));
 const navNames={home:'continents',explore:'countries',learn:'oceans',play:'mountains',progress:'grasslands'};
 document.querySelectorAll('.topnav button[data-page]').forEach(b=>{
  const iconName=navNames[b.dataset.page];
  if(!iconName)return;
  const label=b.querySelector('span');
  if(label){b.innerHTML=svgIcon(iconName,17)+' '+label.outerHTML;}
 });
 const icons={'🌍':'continents','🗺️':'continents','🏆':'countries','🎮':'mountains','🎓':'countries','📍':'countries','📚':'continents','🌊':'oceans','🏔️':'mountains','🏜️':'deserts','🌳':'forests','🌋':'volcanoes','💦':'waterfalls','🧭':'continents','🌿':'forests','⭐':'countries','✦':'continents'};
 if(state.page!=='play'||selectedGameMode!=='flags'){
  let html=main.innerHTML;
  for(const [em,ic] of Object.entries(icons))html=html.replaceAll(em,svgIcon(ic,19));
  if(html!==main.innerHTML)main.innerHTML=html;
 }
 scheduleEnhancements();
 if(state.page==='category'&&state.category!=='countries')setTimeout(loadCardsMedia,80);
};
const oldSetPage=setPage;
setPage=function(page,cat=null,item=null){
 if(globeInstance){try{globeInstance.pauseAnimation?.();globeInstance._destructor?.()}catch(e){}globeInstance=null;globeNode=null;}
 if(page==='country-v4'){state.v4Code=cat;state.page='country-v4';state.category='countries';state.item=null;render();window.scrollTo(0,0);return}
 if(page==='countries-v4'){state.page='countries-v4';state.category='countries';state.item=null;render();window.scrollTo(0,0);return}
 oldSetPage(page,cat,item);
};
function wikiTitle(v){return String(v[1]||'').replace(/^Mount /,'Mount ').trim()}

const gvStories=new Map();
async function loadCuratedStories(){
 try{
  const r=await fetch('./geo-stories.json');
  if(!r.ok)throw Error('No curriculum file');
  const j=await r.json();
  for(const [name,entry] of Object.entries(j.stories||{}))gvStories.set(norm(name),entry);
  if(state.page==='detail'&&state.category!=='continents')render();
 }catch(e){console.warn('Curated lessons unavailable',e)}
}
function storyFor(v){return gvStories.get(norm(v?.[1]))||null}
function storyPanel(story){
 if(!story)return '';
 const body=state.lang==='ar'?story.ar:story.en;
 const facts=state.lang==='ar'?(story.factsAr||[]):[];
 return '<section class="gv-curated-story"><span class="eyebrow">GEOVERSE · FIELD NOTES</span><h3>'+lang('معلومات سهلة ومفيدة','Easy geography facts')+'</h3><p>'+escapeHTML(body||'')+'</p>'+(facts.length?'<div class="gv-curated-facts">'+facts.map(([k,v])=>'<div><small>'+escapeHTML(k)+'</small><strong>'+escapeHTML(v)+'</strong></div>').join('')+'</div>':'')+'</section>';
}
function cleanArabicSummary(s){
 const clean=String(s||'').replace(/\[[0-9،,\s]+\]/g,'').replace(/\s+/g,' ').trim();
 return (clean.match(/[^.!؟\n]+[.!؟]?/g)||[clean]).slice(0,6).join(' ').trim().slice(0,1350);
}
function fallbackArabic(v){
 if(state.page==='country-v4'){
  const r=store.byCode.get(state.v4Code);
  if(r)return 'تقع '+arName(r)+' في '+(continentAr[r.continent]||r.continent)+'. عاصمتها '+capitalAr(r)+'. تستطيع استكشاف حدودها وموقعها على الكرة الأرضية.';
 }
 return storyFor(v)?.ar||v?.[2]||'';
}

let wikiSequence=0;
async function loadWiki(){
 const current=++wikiSequence;
 if(!['detail','country-v4'].includes(state.page)||state.category==='continents')return;
 const v=state.page==='country-v4'?[null,store.byCode.get(state.v4Code)?.name]:geo[state.category]?.[state.item];
 if(!v?.[1])return;
 const title=wikiTitle(v),target=document.getElementById('gvWikiArticle'),photo=document.getElementById('gvArticlePhoto');
 if(!target)return;
 try{
 // Query an exact page title first. Never insert a result from a loosely related search.
 const params=new URLSearchParams({action:'query',prop:'extracts|pageimages|info|langlinks',lllang:'ar',llprop:'url',inprop:'url',exintro:'1',explaintext:'1',piprop:'thumbnail',pithumbsize:'1200',redirects:'1',titles:title,format:'json',origin:'*'});
 const res=await fetch('https://en.wikipedia.org/w/api.php?'+params);
 if(!res.ok)throw Error('Wikimedia HTTP '+res.status);
 const json=await res.json();if(current!==wikiSequence)return;
 const page=Object.values(json.query?.pages||{})[0];
 if(!page||page.missing!==undefined)throw Error('No exact article');
 let summary=(page.extract||'').trim().slice(0,1800);
 let sourceUrl=page.fullurl||'https://en.wikipedia.org/wiki/'+encodeURIComponent(title);
 let arabicArticle=false;
 if(state.lang==='ar'){
  // Prefer a real Arabic article. English article prose must never appear in Arabic mode.
  summary='';
  const link=(page.langlinks||[]).find(x=>x.lang==='ar');
  if(link?.['*']){
   try{
    const q=new URLSearchParams({action:'query',prop:'extracts|info',inprop:'url',exintro:'1',explaintext:'1',redirects:'1',titles:link['*'],format:'json',origin:'*'});
    const response=await fetch('https://ar.wikipedia.org/w/api.php?'+q);
    if(response.ok){
     const result=await response.json();
     if(current!==wikiSequence)return;
     const article=Object.values(result.query?.pages||{})[0];
     if(article&&article.missing===undefined&&article.extract){
      summary=cleanArabicSummary(article.extract);
      sourceUrl=article.fullurl||link.url||sourceUrl;
      arabicArticle=true;
     }
    }
   }catch(e){console.debug('No Arabic encyclopedia entry',e)}
  }
  if(!summary)summary=fallbackArabic(v);
 }
 // Only use a photograph attached to the exact named article.
 if(photo&&page.thumbnail?.source){photo.innerHTML='<img alt="'+escapeHTML(title)+'" loading="lazy" src="'+escapeHTML(page.thumbnail.source)+'"><div class="gv-image-credit"><a href="'+escapeHTML(page.fullurl||'https://en.wikipedia.org/wiki/'+encodeURIComponent(title))+'" target="_blank" rel="noopener noreferrer">'+lang('مصدر الصورة','Image source')+'</a></div>'}
 
 // Additional photographs must be sourced from images embedded in the matched article.
 if(photo){
  const galleryNode=document.getElementById('gvPhotoGallery');
  if(galleryNode)try{
   const gp=new URLSearchParams({action:'query',generator:'images',gimlimit:'30',prop:'imageinfo',iiprop:'url|mime',iiurlwidth:'760',titles:page.title||title,format:'json',origin:'*'});
   const gr=await fetch('https://en.wikipedia.org/w/api.php?'+gp);
   const gj=await gr.json();if(current!==wikiSequence)return;
   const imgs=Object.values(gj.query?.pages||{}).filter(x=>x.imageinfo?.[0]?.mime==='image/jpeg').filter(x=>!/(map|flag|logo|diagram|chart|coat.of.arms|locator|seal|icon)/i.test(x.title)).slice(0,3);
   galleryNode.innerHTML=imgs.map(x=>{const info=x.imageinfo[0];return '<a href="'+escapeHTML(info.descriptionurl||'https://commons.wikimedia.org/')+'" target="_blank" rel="noopener noreferrer"><img loading="lazy" src="'+escapeHTML(info.thumburl||info.url)+'" alt="'+escapeHTML(x.title.replace(/^File:/,''))+'"><span class="gv-image-badge">Wikimedia Commons ↗</span></a>'}).join('');
  }catch(e){console.debug('No extra encyclopedia photos',e)}
 }
 
const url=sourceUrl;
 if(state.page==='country-v4'){
  target.innerHTML='<span class="eyebrow">'+(arabicArticle?lang('معلومات إضافية','More information'):'GEOVERSE / COUNTRY PROFILE')+'</span><h2>'+lang('الموقع والجغرافيا','Geography & Context')+'</h2>'+(page.thumbnail?.source?'<img class="gv-country-wiki-photo" src="'+escapeHTML(page.thumbnail.source)+'" alt="'+escapeHTML(title)+'" loading="lazy">':'')+'<p>'+escapeHTML(summary||lang('راجع الصفحة الموسوعية للمزيد من المعلومات.','See the article for more context.'))+'</p><a href="'+escapeHTML(url)+'" target="_blank" rel="noopener noreferrer">'+lang('اقرأ المصدر الأصلي','Read source article')+' ↗</a>';
 }else{target.innerHTML='<div class="gv-source-heading">'+lang('معلومات إضافية بلغة سهلة','Additional Encyclopedia Context')+'</div><p>'+escapeHTML(summary||lang('لا توجد نبذة إضافية متاحة.','No additional summary available.'))+'</p><a href="'+escapeHTML(url)+'" target="_blank" rel="noopener noreferrer">'+lang('اقرأ المزيد','Read more')+' ↗</a>'}
 }catch(e){if(current!==wikiSequence)return;target.innerHTML='<p class="gv-muted">'+lang('لا تتوفر حاليًا صورة أو مقالة مطابقة موثقة لهذا المعلم. يمكنك مواصلة استكشاف الإحداثيات والخريطة.','No matching article or photograph is currently available for this exact place. Explore its mapped location instead.')+'</p>'}
}
let globeInstance=null,globeNode=null,globeTimer=0;
const earthTexture='https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg';
const earthBump='https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png';
function isGlobeAvailable(){return !!G.Globe}
function continentZoom(key){return ({Asia:{lat:38,lng:91,altitude:1.72},Africa:{lat:3,lng:20,altitude:1.7},Europe:{lat:50,lng:15,altitude:1.65},'North America':{lat:41,lng:-104,altitude:1.74},'South America':{lat:-18,lng:-63,altitude:1.72},Oceania:{lat:-23,lng:133,altitude:1.8},Antarctica:{lat:-79,lng:30,altitude:2.1}})[key]||{lat:16,lng:22,altitude:2.3}}
function initGlobe(){
 const node=document.getElementById(state.page==='home'?'gvHomeGlobe':state.page==='explore'?'gvExploreGlobe':state.page==='detail'&&state.category==='continents'?'gvContinentGlobe':'gvDetailGlobe');
 if(!node||node===globeNode)return;
 globeNode=node;globeInstance=null;
 if(!isGlobeAvailable()){node.innerHTML='<div class="gv-globe-fallback"><span>'+lang('الكرة ثلاثية الأبعاد غير متاحة حاليًا؛ الخريطة الثنائية الأبعاد ما زالت تعمل.','3D view unavailable; use the 2D atlas.')+'</span></div>';return}
 const isHero=state.page==='home',isCont=state.page==='detail'&&state.category==='continents',isCountry=state.page==='country-v4';
 let target={lat:20,lng:15,altitude:2.12};let selectedFeature=null,selectedContinent=null;
 if(isCont){const v=geo.continents[state.item];selectedContinent=v?.[1];target=continentZoom(selectedContinent)}
 else if(isCountry){const r=store.byCode.get(state.v4Code);selectedFeature=store.featLookup.get(r?.code);const p=selectedFeature&&window.d3?d3.geoCentroid(selectedFeature):[0,0];target={lat:p[1],lng:p[0],altitude:1.8}}
 else if(state.page==='detail'){const v=geo[state.category]?.[state.item];if(v)target={lat:v[4],lng:v[5],altitude:1.7}}
 try{
 const w=node.clientWidth||550,h=node.clientHeight||400;
 const g=new G.Globe(node,{animateIn:false}).width(w).height(h).globeImageUrl(earthTexture).bumpImageUrl(earthBump).backgroundColor('rgba(0,0,0,0)').showAtmosphere(true).atmosphereColor('#73cffa').atmosphereAltitude(.19);
 if(typeof g.globeMaterial==='function'){try{const m=g.globeMaterial();if(m){m.shininess=8;m.specular?.set?.('#253b52');m.needsUpdate=true}}catch(e){console.debug('Globe material tuning skipped',e)}}
 
 let featureOverlay=null, featureLine=null;
 if(!isHero&&!isCountry&&!isCont&&state.category!=='countries'){
  const v=geo[state.category]?.[state.item];
  const coords=v&&typeof isLayerShape==='function'?isLayerShape(state.category,v):null;
  if(coords&&Array.isArray(coords)&&coords.length){
   const multi=Array.isArray(coords[0][0]);
   if(state.category==='rivers'||state.category==='mountains')featureLine={points:coords.map(([lng,lat])=>({lng,lat}))};
   else if(multi)featureOverlay={type:'Feature',properties:{gvOverlay:true,name:lang(v[0],v[1])},geometry:{type:'MultiPolygon',coordinates:coords.map(p=>[p])}};
   else if(coords.length>=4)featureOverlay={type:'Feature',properties:{gvOverlay:true,name:lang(v[0],v[1])},geometry:{type:'Polygon',coordinates:[coords]}};
  }
 }
 const countryShapes=store.countryFeatures.filter(f=>f.properties.name!=='Antarctica'||isCont);
 if(countryShapes.length){
  g.polygonsData(featureOverlay?[...countryShapes,featureOverlay]:countryShapes).polygonAltitude(f=>f.properties.gvOverlay?.064:(isCountry&&f===selectedFeature)?0.006:(isCont&&f.properties.gvContinent===selectedContinent||isCont&&selectedContinent==='Asia'&&['Russia','Turkey'].includes(f.properties.name))?.005:.0015).polygonCapColor(f=>{
   if(f.properties.gvOverlay)return 'rgba(240,183,67,.47)';
   if(isCountry)return f===selectedFeature?'rgba(39,221,193,0.50)':'rgba(11,59,82,0.045)';
   if(isCont)return f.properties.gvContinent===selectedContinent||selectedContinent==='Asia'&&['Russia','Turkey'].includes(f.properties.name)?'rgba(19,221,217,0.48)':'rgba(3,30,50,0.13)';
   return isHero?'rgba(9,57,77,0.018)':'rgba(17,115,145,0.09)'
  }).polygonSideColor(()=>'rgba(17,224,219,.1)').polygonStrokeColor(f=>f.properties.gvOverlay?'#ffdd8f':(isCountry&&f===selectedFeature)||(isCont&&f.properties.gvContinent===selectedContinent)?'#ffe1a0':(isHero?'rgba(171,228,243,0.12)':'rgba(157,224,239,0.24)')).polygonLabel(f=>f.properties.gvOverlay?'<div class="gv-globe-label">'+escapeHTML(f.properties.name)+' · '+lang('نطاق تقريبي','approximate area')+'</div>':state.page==='play'?'':'<div class="gv-globe-label">'+escapeHTML(f.properties.gvArabic&&state.lang==='ar'?f.properties.gvArabic:f.properties.name)+'</div>').onPolygonClick(f=>{if(f.properties.gvOverlay)return;const r=recordFor(f.properties.name);if(r&&state.page!=='play')setPage('country-v4',r.code)});
 }
 if(featureLine){g.pathsData([featureLine]).pathPoints('points').pathPointLat('lat').pathPointLng('lng').pathColor(()=>'#ffe3a5').pathStroke(.9).pathAltitude(.07)}
 if(!isHero&&!isCountry&&!isCont&&state.category!=='countries'){const v=geo[state.category]?.[state.item];if(v){g.pointsData([{lat:v[4],lng:v[5],name:lang(v[0],v[1])}]).pointLat('lat').pointLng('lng').pointAltitude(.06).pointRadius(.65).pointColor(()=>'#f3ca7d').pointLabel(d=>escapeHTML(d.name));}}
 g.pointOfView(target,isHero?0:1200);
 const ctrl=g.controls();ctrl.autoRotate=isHero&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches;ctrl.autoRotateSpeed=.16;ctrl.enableDamping=true;ctrl.enablePan=false;ctrl.dampingFactor=.08;ctrl.minDistance=160;ctrl.maxDistance=700;
 try{
  // Cap device pixel ratio to preserve GPU memory on high-density iPhones.
  const renderer=g.renderer?.();
  renderer?.setPixelRatio?.(Math.min(window.devicePixelRatio||1,window.innerWidth<750?1.35:1.75));
 }catch(e){console.debug('Adaptive resolution unavailable',e)}
 globeInstance=g;node.classList.add('gv-3d-loaded');
 G.addEventListener('resize',()=>{if(globeNode===node&&node.isConnected)g.width(node.clientWidth||w).height(node.clientHeight||h)},{once:true});
 }catch(err){console.warn('Globe WebGL init unavailable:',err);node.innerHTML='<div class="gv-globe-fallback">'+lang('تعذر تشغيل العرض ثلاثي الأبعاد على هذا الجهاز. استخدم الخريطة الثنائية الأبعاد.','3D rendering unavailable on this device. Use the 2D map.')+'</div>'}
}
function scheduleEnhancements(){
 clearTimeout(globeTimer);globeNode=null;
 globeTimer=setTimeout(()=>{if(['home','detail','country-v4','explore'].includes(state.page)){initGlobe();if(state.page!=='home')loadWiki()}},40);
}
function continentKeyForItem(){return state.category==='continents'?geo.continents[state.item]?.[1]:null}
function paintContinent2D(layer,center){
 const r=atlasRuntime;if(!r||!r.node?.isConnected)return;
 if(r.id==='gameMap'){
  // Remove ALL visual hover hints from the game; no native title or cursor text.
  r.node.querySelectorAll('.atlas-country').forEach(el=>{el.removeAttribute('aria-label');el.removeAttribute('title');el.querySelectorAll('title').forEach(t=>t.remove())});
  r.node.querySelectorAll('.atlas-pin').forEach(el=>el.remove());
  r.node.querySelectorAll('.atlas-popup').forEach(el=>el.classList.add('hidden'));
  return;
 }
 const key=continentKeyForItem();if(!key||!store.ready)return;
 const svg=r.node.querySelector('svg');if(!svg||!r.features.length)return;
 const matches=r.features.filter(f=>f.properties.gvContinent===key||(key==='Asia'&&['Russia','Turkey'].includes(f.properties.name)));
 r.node.querySelectorAll('.atlas-country').forEach((el,i)=>{el.classList.toggle('gv-continent-selected',matches.includes(r.features[i]));el.classList.toggle('gv-continent-dim',!matches.includes(r.features[i]))});
 r.node.querySelector('.atlas-pins').innerHTML='';
 const combined={type:'FeatureCollection',features:matches};
 const bounds=window.d3?d3.geoPath(r.proj).bounds(combined):null;
 if(bounds){const x=bounds[0][0],y=bounds[0][1],w=bounds[1][0]-x,h=bounds[1][1]-y;atlasView([Math.max(0,x-40),Math.max(0,y-40),Math.min(1000,w+80),Math.min(520,h+80)])}
}
atlasDraw=function(layer,center){oldDraw(layer,center);paintContinent2D(layer,center)};
const oldAtlasCreation=atlasCreate;
atlasCreate=function(id,center){oldAtlasCreation(id,center)};
document.addEventListener('click',e=>{
 // Map-game events: prevent hidden browser title popovers, but preserve click evaluation.
 const country=e.target.closest?.('[data-map-country]');
 if(country&&state.page==='play'&&selectedGameMode==='mapfind'){country.removeAttribute('aria-label');country.querySelectorAll('title').forEach(t=>t.remove())}
 const countryOpen=e.target.closest?.('[data-v4-country]');if(countryOpen){e.preventDefault();e.stopImmediatePropagation();setPage('country-v4',countryOpen.dataset.v4Country);return}
 const region=e.target.closest?.('[data-v4-continent]');if(region){e.preventDefault();e.stopImmediatePropagation();state.v4Continent=region.dataset.v4Continent;state.v4Search='';setPage('countries-v4');return}
 const sorting=e.target.closest?.('[data-v4-sort]');if(sorting){e.preventDefault();e.stopImmediatePropagation();state.v4Sort=sorting.dataset.v4Sort;render();return}
},true);
document.addEventListener('input',e=>{if(e.target.id==='categoryFilter')setTimeout(loadCardsMedia,130);if(e.target.id==='gvCountrySearch'){state.v4Search=e.target.value;const c=state.v4Continent||'Asia';const filtered=store.countries.filter(r=>(c==='all'||r.continent===c||c==='Asia'&&twoRegion.has(r.name))&&(getCountryName(r)+' '+r.name+' '+r.capital).toLowerCase().includes(state.v4Search.toLowerCase()));const grid=document.getElementById('gvCountryGrid');if(grid)grid.innerHTML=countryCards(filtered)}});
document.addEventListener('mouseover',e=>{if(state.page==='play'&&selectedGameMode==='mapfind'){const p=e.target.closest?.('[data-map-country]');if(p){p.removeAttribute('aria-label');p.querySelectorAll('title').forEach(t=>t.remove())}}},true);
document.addEventListener('focusin',e=>{if(state.page==='play'&&selectedGameMode==='mapfind'){const p=e.target.closest?.('[data-map-country]');if(p){p.removeAttribute('aria-label');p.querySelectorAll('title').forEach(t=>t.remove())}}},true);
const originalCreate=createGame;
createGame=function(mode){
 if(store.ready&&(mode==='flags'||mode==='capitals')){
  const shuffled=a=>a.slice().sort(()=>Math.random()-.5);
  const accepted=store.countries.filter(r=>r.code&&r.name&&r.capital&&store.featLookup.has(r.code));
  const targets=shuffled(accepted).slice(0,12);
  return targets.map(r=>{
   const choices=shuffled([r,...shuffled(accepted.filter(o=>o.code!==r.code)).slice(0,3)]);
   return mode==='flags'?
   [lang('ما اسم الدولة صاحبة العلم؟','Which country has this flag?'),'Which country has this flag?',choices.map(x=>arName(x)),choices.map(x=>x.name),choices.indexOf(r),'هذا علم '+arName(r),'This is the flag of '+r.name,r.code]:
   ['ما عاصمة '+arName(r)+'؟','What is the capital of '+r.name+'?',choices.map(x=>capitalAr(x)),choices.map(x=>x.capital),choices.indexOf(r),'العاصمة: '+capitalAr(r),'Capital: '+r.capital];
  });
 }
 const q=originalCreate(mode);if(mode==='mapfind'&&store.ready)return q.filter(x=>store.countries.some(r=>norm(r.name)===norm(x[7])));return q;
};
document.addEventListener('visibilitychange',()=>{
 if(document.hidden)globeInstance?.pauseAnimation?.();
 else if(globeInstance?.resumeAnimation)globeInstance.resumeAnimation();
});
loadCatalogue();
loadCuratedStories();
render();
})();