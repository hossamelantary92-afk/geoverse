/* GeoVerse 136: uniquely versioned boot to avoid stale cached enhancements.js. */
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
const flag=(code,alt)=>code&&/^[A-Z]{2}$/.test(code)?'<img class="gv-flag" loading="lazy" src="https://flagcdn.com/'+(code==='UK'?'gb':code.toLowerCase())+'.svg" alt="'+escapeHTML(alt||'Flag')+'" onerror="this.style.display=\'none\'">':svgIcon('countries');
const allGeo=geo.countries.slice();
const store={ready:false,countries:[],byName:new Map(),byCode:new Map(),countryFeatures:[],featLookup:new Map(),continentGeo:new Map(),status:'loading'};
function norm(v){return String(v||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z]/g,'')}
const alias={'unitedstatesofamerica':'United States','unitedrepublicoftanzania':'Tanzania','democraticrepublicofthecongo':'The Democratic Republic of Congo','republicofthecongo':'Congo','ivorycoast':'Ivory Coast','russia':'Russia','turkey':'Turkey','czechrepublic':'Czech Republic','northkorea':'North Korea','southkorea':'South Korea','westernsahara':'Western Sahara','swaziland':'Swaziland','macedonia':'Macedonia','kosovo':'Kosovo','frenchsouthernandantarcticlands':'French Southern and Antarctic Lands'};
const twoRegion=new Set(['Russia','Turkey','Kazakhstan','Georgia','Azerbaijan']);
const centerOverrides={'Egypt':[26.8,30.8],'Russia':[60,90],'Turkey':[39,35],'United States':[39,-98],'Antarctica':[-78,0]};
function regionFor(name){if(name==='Antarctica')return 'Antarctica';return store.byName.get(norm(name))?.continent||null}
function recordFor(name){return store.byName.get(norm(name))||store.byName.get(norm(alias[norm(name)]))||null}
const globeArabicNameOverrides={
 'French Southern and Antarctic Lands':'الأقاليم الجنوبية الفرنسية',
 'The Bahamas':'جزر البهاما',
 'Northern Cyprus':'شمال قبرص',
 'Kosovo':'كوسوفو',
 'Macedonia':'مقدونيا الشمالية',
 'Somaliland':'صوماليلاند',
 'Republic of Serbia':'صربيا',
 'Swaziland':'إسواتيني',
 'East Timor':'تيمور الشرقية',
 'Turkey':'تركيا',
 'Taiwan':'تايوان',
 'West Bank':'الضفة الغربية',
 'Antarctica':'القارة القطبية الجنوبية'
};
function arName(r){
 if(!r)return '';
 try{
  const result=new Intl.DisplayNames(['ar'],{type:'region'}).of(r.code);
  return result&&/[\u0600-\u06FF]/.test(result)?result:(globeArabicNameOverrides[r.name]||r.name);
 }catch{return globeArabicNameOverrides[r.name]||r.name}
}
function globeCountryName(feature){
 const name=feature?.properties?.name||'';
 if(state.lang!=='ar')return name;
 const translated=feature?.properties?.gvArabic;
 if(translated&&/[\u0600-\u06FF]/.test(translated))return translated;
 const special=globeArabicNameOverrides[name];
 if(special)return special;
 const r=recordFor(name);
 if(r)return arName(r);
 return name;
}
function resolvedContinent(name){const r=recordFor(name);return r?.continent||((name==='Antarctica')?'Antarctica':null)}
async function loadCatalogue(){
 try{
 const [meta,shape]=await Promise.all([fetch('./country-meta.json').then(x=>x.json()),fetch('./world.geojson?v=gv119-bermuda-ring-fixed',{cache:'no-cache'}).then(x=>x.json())]);
 store.countries=meta.countries.filter(x=>x.code&&x.continent);for(const r of store.countries){store.byCode.set(r.code,r);store.byName.set(norm(r.name),r)}
 store.byName.set(norm('United States of America'),recordFor('United States'));
 store.byName.set(norm('United Republic of Tanzania'),recordFor('Tanzania'));
 store.byName.set(norm('Democratic Republic of the Congo'),recordFor('The Democratic Republic of Congo'));
 store.byName.set(norm('Republic of the Congo'),recordFor('Congo'));
 // Defensive winding normalization: a reversed Bermuda outline paints the
 // complement of the island on a sphere and hijacks clicks anywhere on Earth.
 // Also protects users with an older cached GeoJSON response.
 for(const feature of shape.features||[]){
  if(feature.properties?.name!=='Bermuda'||feature.geometry?.type!=='Polygon')continue;
  const ring=feature.geometry.coordinates?.[0];
  if(!Array.isArray(ring)||ring.length<4)continue;
  let winding=0;
  for(let i=0;i<ring.length-1;i++){
   const a=ring[i],b=ring[i+1];
   winding+=a[0]*b[1]-b[0]*a[1];
  }
  if(winding>0)feature.geometry.coordinates[0]=ring.slice().reverse();
 }
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
// The existing bilingual capital dictionary is loaded by capital-localization.js.
// Avoid maintaining a second copy of capital names in the country directory.
function directoryCapitalAr(r){
 const localized=window.GeoVerseCapitalNames?.[r.code];
 if(localized)return localized;
 const v=allGeo.find(x=>norm(x[1])===norm(r.name));
 const m=(v?.[2]||'').match(/العاصمة(?: الإدارية)?:\\s*([^·،]+)/);
 return m?m[1].trim():r.capital||'—';
}
function countrySearchKey(value){
 return String(value||'').normalize('NFKD').toLowerCase()
 .replace(/[\\u064b-\\u065f\\u0670\\u0640]/g,'')
 .replace(/[أإآ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه')
 .replace(/[\\u0300-\\u036f]/g,'')
 .replace(/[^\\p{L}\\p{N}]+/gu,' ').trim();
}
const countrySearchAliases={
 'EG':['مصر','القاهرة','egypt','cairo'],
 'SA':['السعودية','المملكة العربية السعودية','الرياض','ksa','saudi arabia','riyadh'],
 'US':['امريكا','الولايات المتحدة','واشنطن','usa','united states','washington dc'],
 'GB':['بريطانيا','المملكة المتحدة','لندن','uk','britain','united kingdom','london'],
 'AE':['الامارات','الإمارات العربية المتحدة','أبو ظبي','ابوظبي','uae','abu dhabi'],
 'TR':['تركيا','أنقرة','turkiye','turkey','ankara'],
 'CZ':['التشيك','براغ','czechia','czech republic','prague'],
 'KR':['كوريا الجنوبية','سيول','south korea','seoul'],
 'KP':['كوريا الشمالية','بيونغ يانغ','north korea','pyongyang'],
 'CI':['ساحل العاج','كوت ديفوار','abidjan','yamoussoukro'],
 'MM':['ميانمار','بورما','naypyidaw','rangoon'],
 'NL':['هولندا','امستردام','أمستردام','the netherlands','amsterdam','the hague'],
 'ZA':['جنوب افريقيا','بريتوريا','كيب تاون','بلومفونتين','south africa','pretoria','cape town','bloemfontein'],
 'BO':['بوليفيا','سوكري','لاباز','bolivia','sucre','la paz']
};
function countrySearchTerms(r){
 return countrySearchKey([
 arName(r),r.name, r.capital||'',directoryCapitalAr(r),
 ...(countrySearchAliases[r.code]||[])
 ].join(' '));
}
function countryMatchesQuery(r,query){
 const words=countrySearchKey(query).split(' ').filter(Boolean);
 if(!words.length)return true;
 const haystack=countrySearchTerms(r);
 return words.every(word=>haystack.includes(word));
}
function sortedCountryRows(continent,query){
 return store.countries.filter(r=>(continent==='all'||r.continent===continent||continent==='Asia'&&twoRegion.has(r.name))&&countryMatchesQuery(r,query))
 .sort((a,b)=>(state.lang==='ar'?getCountryName(a).localeCompare(getCountryName(b),'ar'):a.name.localeCompare(b.name,'en')));
}
function countryCards(list){return list.map(r=>'<button type="button" class="gv-country-row" data-v4-country="'+escapeHTML(r.code)+'" aria-label="'+escapeHTML(getCountryName(r)+'، '+(state.lang==='ar'?directoryCapitalAr(r):r.capital||'—'))+'"><span class="gv-country-flag">'+flag(r.code,'Flag of '+r.name)+'</span><span class="gv-country-name"><b>'+escapeHTML(getCountryName(r))+'</b><small>'+escapeHTML(r.name)+'</small></span><span class="gv-capital">'+escapeHTML(state.lang==='ar'?directoryCapitalAr(r):r.capital||'—')+'</span><span class="gv-country-chevron" aria-hidden="true">↗</span></button>').join('')}
function countriesPage(){
 const c=state.v4Continent||'all';
 const options=['all',...continentKeys];
 const filtered=sortedCountryRows(c,state.v4Search||'');
 return '<header class="gv-page-heading gv-country-index-hero"><span class="eyebrow">THE WORLD / COUNTRY INDEX</span><h1>'+lang('دول العالم وعواصمها','Countries & Capitals')+'</h1><p>'+lang('استكشف الدول حسب القارات، مع أعلام SVG وملفات معرفية وخرائط تفاعلية.','Explore by continent, with real SVG flags, profiles and maps.')+'</p></header><div class="gv-country-controls"><div class="gv-tabs">'+options.map(x=>'<button class="'+(x===c?'active':'')+'" data-v4-continent="'+x+'">'+(x==='all'?lang('كل العالم','All world'):lang(continentAr[x],x))+'</button>').join('')+'</div><div class="gv-country-toolbar"><input id="gvCountrySearch" type="search" placeholder="'+lang('ابحث عن دولة أو عاصمة...','Search a country or capital...')+'" value="'+escapeHTML(state.v4Search||'')+'"></div></div><div class="gv-result-head"><strong>'+filtered.length+' '+lang('دولة وإقليم','countries & territories')+'</strong><span>'+lang('اضغط لاستكشاف التفاصيل والحدود','Select to view real flags, geography & borders')+'</span></div><div class="gv-country-grid" id="gvCountryGrid">'+countryCards(filtered)+'</div>';
}
function capitalAr(r){const v=allGeo.find(x=>norm(x[1])===norm(r.name));const m=(v?.[2]||'').match(/العاصمة(?: الإدارية)?:\s*([^·،]+)/);return m?m[1].trim():r.capital||'—'}
function countryPage(){
 const r=store.byCode.get(state.v4Code);if(!r)return '<div class="notice">'+lang('بيانات الدولة غير متاحة','Country information unavailable')+'</div>';
 const f=store.featLookup.get(r.code),cent=f&&window.d3?d3.geoCentroid(f):null;
 const c=state.lang==='ar'?(continentAr[r.continent]||r.continent):r.continent;
 return '<button class="back" data-page="countries-v4">→ '+lang('العودة للدول','Back to countries')+'</button><div class="gv-country-profile"><span class="eyebrow">WORLD ATLAS / COUNTRY PROFILE</span><div class="gv-profile-head"><div class="gv-profile-flag">'+flag(r.code,r.name+' flag')+'</div><div><h1>'+escapeHTML(getCountryName(r))+'</h1><p>'+escapeHTML(r.name)+' · '+escapeHTML(c)+'</p></div></div><div class="gv-profile-facts"><div><small>'+lang('العاصمة','Capital')+'</small><strong>'+escapeHTML(state.lang==='ar'?capitalAr(r):r.capital||'—')+'</strong></div><div><small>'+lang('القارة','Continent')+'</small><strong>'+escapeHTML(c)+'</strong></div><div><small>'+lang('العملة','Currency')+'</small><strong>'+escapeHTML(r.currency||'—')+'</strong></div><div><small>ISO</small><strong>'+escapeHTML(r.code)+'</strong></div></div></div><div class="gv-story-layout"><section><div class="gv-story-card"><span class="eyebrow">EXPLORE FROM SPACE</span><h2>'+lang('موقع الدولة على الكرة الأرضية','Explore this country in 3D')+'</h2><p>'+lang('تظهر حدود الدولة بلون مميز. يمكنك تدوير الكرة والتكبير والتصغير.','Country borders are highlighted. Drag, rotate and zoom around the planet.')+'</p><div class="gv-globe-detail" id="gvDetailGlobe"></div></div><div class="gv-story-card" id="gvWikiArticle"><h2>'+lang('معلومات جغرافية','Geographic Profile')+'</h2><p>'+lang('جاري استدعاء مصادر معلومات وصور هذا المكان...','Loading place facts and photographs...')+'</p></div></section><aside><div class="gv-story-card"><h3>'+lang('دول مرتبطة','Explore Nearby')+'</h3><p>'+lang('اختار قارة الدولة لتشاهد الدول المرتبطة بها.','Browse other countries in the same continent.')+'</p><button class="secondary" data-v4-continent="'+r.continent+'">'+lang('استكشف','Explore')+' '+escapeHTML(c)+'</button></div></aside></div>';
}
function extendedArticle(v){
 return '<div class="gv-article-photobar"><div class="gv-article-photo" id="gvArticlePhoto"><span class="gv-photo-loading">'+lang('جاري تحميل صورة حقيقية للمعلم','Loading a location photo')+'</span></div></div><div class="gv-photo-gallery" id="gvPhotoGallery"></div><section class="gv-article-body"><div class="eyebrow">'+lang('الدليل الجغرافي','THE FIELD GUIDE')+'</div><h2>'+lang('اكتشف المكان','Discover the Place')+'</h2><p>'+escapeHTML(lang(v[2],v[3]))+'</p>'+storyPanel(storyFor(v))+'<div id="gvWikiArticle" class="gv-wiki-summary"><p>'+lang('جاري تحميل تفاصيل إضافية من مصادر موسوعية...','Loading additional reference details...')+'</p></div><div class="gv-travel-facts"><span>'+svgIcon('continents')+'</span><div><b>'+lang('أين يقع؟','Where is it?')+'</b><small>'+v[4].toFixed(2)+'° / '+v[5].toFixed(2)+'°</small></div><span>'+svgIcon('countries')+'</span><div><b>'+lang('التصنيف','Classification')+'</b><small>'+escapeHTML(label(cats.find(c=>c.id===state.category)))+'</small></div></div></section>';
}
detail=function(){const base=oldDetail();if(state.category==='continents'){const v=geo.continents[state.item],key=v[1];const countryList=store.countries.filter(r=>r.continent===key||key==='Asia'&&twoRegion.has(r.name));return base.replace('</div><div class="detail-card">','</div><div class="gv-continent-intro"><h2>'+lang('حدود القارة ودولها','Continent Boundaries & Countries')+'</h2><p>'+lang('الدول التابعة للقارة ستظهر بلون مضيء على الكرة ثلاثية الأبعاد.','The continent countries will glow together on the 3D Earth.')+'</p><div class="gv-continent-3d" id="gvContinentGlobe"></div></div><div class="detail-card">')+'<div class="gv-story-card"><h2>'+lang('دول القارة','Countries in this continent')+'</h2><div class="gv-country-grid">'+countryCards(countryList)+'</div></div>'}
 const v=geo[state.category][state.item];return base+'<section class="gv-feature-article">'+extendedArticle(v)+'</section><section class="gv-story-card gv-feature-globe"><span class="eyebrow">3D WORLD ATLAS</span><h2>'+lang('شاهد المعلم على الكرة الأرضية','Explore this place in 3D')+'</h2><div class="gv-globe-detail" id="gvDetailGlobe"></div></section>';
};

itemCards=function(items){
 if(state.category==='countries')return oldItemCards(items);
 const q=(state.filter||'').trim().toLowerCase();
 const list=items.map((v,i)=>({v,i})).filter(x=>!q||(x.v[0]+' '+x.v[1]).toLowerCase().includes(q));
 return list.length?list.map(({v,i})=>'<button class="gv-place-card" data-item="'+state.category+':'+i+'"><span class="gv-place-media" data-photo-index="'+i+'">'+svgIcon(state.category,34)+'<small>'+lang('صورة المعلم','Place photograph')+'</small></span><span class="gv-place-copy"><strong>'+escapeHTML(lang(v[0],v[1]))+'</strong><small>'+escapeHTML(lang(v[2],v[3]))+'</small><span class="gv-place-explore">'+lang('اكتشف الموقع والتفاصيل','Discover location & facts')+' ↗</span></span></button>').join(''):'<div class="empty">'+lang('لا توجد نتائج','No results')+'</div>';
};
let cardPhotoSequence=0;
async function loadCardsMedia(){
 if(state.page!=='category'||state.category==='countries'||state.category==='tourism')return;
 const current=++cardPhotoSequence;
 const group=state.category, items=geo[group]||[];
 // The local, verified 133-photo index resolves first; only missing subjects query Wikipedia.
 if(window.GeoVersePlacesV13?.ready)await window.GeoVersePlacesV13.ready;
 if(current!==cardPhotoSequence||state.page!=='category'||state.category!==group)return;
 const targets=items.map((v,i)=>({i,title:group==='tourism'?(window.GeoVerseTourismV170?.items?.[i]?.wiki||wikiTitle(v)):wikiTitle(v)})).filter(x=>!!x.title&&!window.GeoVersePlacesV13?.has?.(group,x.i)).slice(0,180);
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
    if(/\.(?:svg)(?:\?|$)/i.test(image)||/(?:map[_-]|locator|orthographic|projection|globe|blank[_-]map|flag[_-]|coat[_-]of[_-]arms|logo[_-]|diagram|schematic|emblem)/i.test(decodeURIComponent(image)))continue;
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
 // Release the previous WebGL context before replacing its canvas.
 // Data refreshes can rerender the same page several times on mobile Safari.
 disposeGlobe();
 oldRender();
 if(state.page==='countries-v4')main.innerHTML=countriesPage();
 if(state.page==='country-v4')main.innerHTML=countryPage();
 if(state.page==='explore')main.innerHTML='<section class="gv-story-card gv-explore-3d"><span class="eyebrow">WORLD EXPLORER / INTERACTIVE 3D EARTH</span><h2>'+lang('دور الكرة الأرضية واستكشف العالم','Rotate Earth & Explore the World')+'</h2><p>'+lang('حرّك الكرة بإصبعك أو الماوس واضغط داخل حدود الدولة لإظهار اسمها دون مغادرة الخريطة.','Drag the globe and tap within a country to show its name without leaving the map.')+'</p><div class="gv-globe-detail gv-explore-globe" id="gvExploreGlobe"></div></section>'+main.innerHTML;
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
setPage=function(page,cat=null,item=null,startGame=false){
 disposeGlobe();
 if(page==='country-v4'){if(window.scrollY>0)window.scrollTo(0,0);state.v4Code=cat;state.page='country-v4';state.category='countries';state.item=null;render();return}
 if(page==='category'&&cat==='countries'){state.v4Continent='all';state.v4Search='';}
 if(page==='countries-v4'){if(window.scrollY>0)window.scrollTo(0,0);state.page='countries-v4';state.category='countries';state.item=null;render();return}
 oldSetPage(page,cat,item,startGame);
};
function wikiTitle(v){return String(v[1]||'').replace(/^Mount /,'Mount ').trim()}

const gvStories=new Map();
async function loadCuratedStories(){
 try{
  const r=await fetch('./geo-stories.json?v=gv296-ocean-audit');
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
 // Tourist attractions now have one curated educational overview; the automatic encyclopedia extract duplicated it.
 if(!['detail','country-v4'].includes(state.page)||state.category==='continents'||(state.page==='detail'&&state.category==='tourism'))return;
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
 if(photo&&page.thumbnail?.source&&/^https:\/\/(?:upload|thumb)\.wikimedia\.org\//.test(page.thumbnail.source)&&!/(?:\.svg(?:\?|$)|map[_-]|locator|flag[_-]|coat[_-]of[_-]arms|diagram|schematic|emblem|logo[_-])/i.test(decodeURIComponent(page.thumbnail.source))){photo.innerHTML='<img alt="'+escapeHTML(title)+'" loading="lazy" src="'+escapeHTML(page.thumbnail.source)+'">'}
 
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
const globeInitAttempts=new WeakMap();
let globeResizeObserver=null;
let globeLoadPromise=null;
function disposeGlobe(){
 clearTimeout(globeTimer);
 globeTimer=0;
 if(globeResizeObserver){try{globeResizeObserver.disconnect()}catch(e){}globeResizeObserver=null}
 const old=globeInstance;
 globeInstance=null;globeNode=null;
 if(!old)return;
 try{old.pauseAnimation?.()}catch(e){}
 try{old._destructor?.()}catch(e){}
 try{
  const renderer=old.renderer?.();
  if(renderer){
   renderer.dispose?.();
   renderer.forceContextLoss?.();
  }
 }catch(e){}
}
function requestGlobeLibrary(){
 if(isGlobeAvailable())return Promise.resolve(true);
 if(globeLoadPromise)return globeLoadPromise;
 globeLoadPromise=new Promise(resolve=>{
  const script=document.createElement('script');
  script.src='https://unpkg.com/globe.gl@2.46.2/dist/globe.gl.min.js';
  script.async=true;
  script.onload=()=>resolve(isGlobeAvailable());
  script.onerror=()=>resolve(false);
  document.head.appendChild(script);
 });
 return globeLoadPromise;
}
function globeInteractiveFallback(node){
 if(!node||!node.isConnected)return;
 const features=(store.countryFeatures||[]).filter(f=>f?.geometry&&f.properties?.name!=='Antarctica');
 if(!window.d3?.geoPath||!features.length){
  node.innerHTML='<div class="gv132-globe-error">'+lang('تعذر تحميل الخريطة حاليًا.','The map is temporarily unavailable.')+' <button type="button" class="gv132-retry">'+lang('إعادة المحاولة','Try again')+'</button></div>';
  node.querySelector('.gv132-retry')?.addEventListener('click',()=>{globeInitAttempts.delete(node);globeNode=null;initGlobe()});
  return;
 }
 try{
  const width=940,height=565;
  const projection=d3.geoNaturalEarth1().fitExtent([[18,18],[width-18,height-18]],{type:'FeatureCollection',features});
  const path=d3.geoPath(projection);
  node.innerHTML='<div class="gv132-fallback-map"><div class="gv132-fallback-label" role="status" aria-live="polite"></div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+width+' '+height+'" role="group" aria-label="'+lang('خريطة العالم التفاعلية','Interactive world map')+'"></svg><div class="gv132-fallback-controls"><button type="button" data-action="zoom-in" aria-label="'+lang('تكبير','Zoom in')+'">+</button><button type="button" data-action="zoom-out" aria-label="'+lang('تصغير','Zoom out')+'">−</button><button type="button" data-action="reset" aria-label="'+lang('الخريطة كاملة','Reset map')+'">⌖</button><button type="button" data-action="retry">'+lang('الكرة ثلاثية الأبعاد','Try 3D again')+'</button></div></div>';
  const svg=node.querySelector('svg'),label=node.querySelector('.gv132-fallback-label');
  const NS='http://www.w3.org/2000/svg';
  for(const f of features){
   const shape=document.createElementNS(NS,'path');
   shape.setAttribute('d',path(f)||'');
   shape.setAttribute('class','gv132-map-country');
   shape.setAttribute('tabindex','0');
   shape.setAttribute('role','button');
   const choose=()=>{
    svg.querySelector('.gv132-selected')?.classList.remove('gv132-selected');
    shape.classList.add('gv132-selected');
    label.textContent=globeCountryName(f);
    label.classList.add('gv132-visible');
    const bounds=path.bounds(f),bw=bounds[1][0]-bounds[0][0],bh=bounds[1][1]-bounds[0][1];
    if(bw>0&&bh>0&&Number.isFinite(bw)&&Number.isFinite(bh)){
     const span=Math.max(bw/0.57,bh/0.63,65);
     svg.setAttribute('viewBox',[(bounds[0][0]+bounds[1][0])/2-span*width/height/2,(bounds[0][1]+bounds[1][1])/2-span/2,span*width/height,span].join(' '));
    }
   };
   shape.addEventListener('click',choose);
   shape.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();choose()}});
   svg.appendChild(shape);
  }
  let box=[0,0,width,height];
  node.querySelector('.gv132-fallback-controls')?.addEventListener('click',event=>{
   const action=event.target?.closest('button')?.dataset.action;
   if(action==='retry'){globeInitAttempts.delete(node);globeNode=null;node.innerHTML='';initGlobe();return}
   if(!action)return;
   if(action==='reset'){box=[0,0,width,height];svg.setAttribute('viewBox',box.join(' '));return}
   box=svg.getAttribute('viewBox').split(/[ ,]+/).map(Number);
   const factor=action==='zoom-in'?.75:1.35,cx=box[0]+box[2]/2,cy=box[1]+box[3]/2;
   box=[cx-box[2]*factor/2,cy-box[3]*factor/2,box[2]*factor,box[3]*factor];
   svg.setAttribute('viewBox',box.join(' '));
  });
 }catch(err){console.warn('2D globe fallback unavailable',err);node.innerHTML='<div class="gv132-globe-error">'+lang('تعذر عرض الخريطة. أعد تحميل الصفحة.','Unable to display map. Reload the page.')+'</div>'}
}
const earthTexture='https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg';
const earthBump='https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png';
function isGlobeAvailable(){return !!G.Globe}
function continentZoom(key){return ({Asia:{lat:38,lng:91,altitude:1.72},Africa:{lat:3,lng:20,altitude:1.7},Europe:{lat:50,lng:15,altitude:1.65},'North America':{lat:41,lng:-104,altitude:1.74},'South America':{lat:-18,lng:-63,altitude:1.72},Oceania:{lat:-23,lng:133,altitude:1.8},Antarctica:{lat:-79,lng:30,altitude:2.1}})[key]||{lat:16,lng:22,altitude:2.3}}
function initGlobe(){
 const node=document.getElementById(state.page==='home'?'gvHomeGlobe':state.page==='explore'?'gvExploreGlobe':state.page==='detail'&&state.category==='continents'?'gvContinentGlobe':'gvDetailGlobe');
 if(!node||node===globeNode)return;
 globeNode=node;globeInstance=null;
 if(!isGlobeAvailable()){
  requestGlobeLibrary().then(ok=>{
   if(!node.isConnected||document.getElementById(node.id)!==node)return;
   if(ok){globeNode=null;initGlobe()}else{globeInteractiveFallback(node);globeNode=node}
  });
  return;
 }
 const isHero=state.page==='home',isCont=state.page==='detail'&&state.category==='continents',isCountry=state.page==='country-v4';
 let target={lat:20,lng:15,altitude:1.96};let selectedFeature=null,selectedContinent=null,selectedExploreFeature=null;
 const isExplorer=state.page==='explore';let exploreNameLabel=null;
 const reducedMotion=window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches||false;
 if(isCont){const v=geo.continents[state.item];selectedContinent=v?.[1];target=continentZoom(selectedContinent)}
 else if(isCountry){const r=store.byCode.get(state.v4Code);selectedFeature=store.featLookup.get(r?.code);const p=selectedFeature&&window.d3?d3.geoCentroid(selectedFeature):[0,0];target={lat:p[1],lng:p[0],altitude:1.8}}
 else if(state.page==='detail'){const v=geo[state.category]?.[state.item];if(v)target={lat:v[4],lng:v[5],altitude:state.category==='tourism'?2.35:1.7}}
 if(isExplorer)target={lat:21,lng:15,altitude:1.28};
 try{
 const w=node.clientWidth||550,h=node.clientHeight||400;
 // Preserve the proven Globe.gl initialization sequence.
 const g=new G.Globe(node,{animateIn:false}).width(w).height(h).globeImageUrl(earthTexture).backgroundColor('rgba(0,0,0,0)').showAtmosphere(true).atmosphereColor('#73cffa').atmosphereAltitude(.19);
 globeInstance=g;
 // On iPhone omit the bump texture to reduce GPU pressure.
 if(!/iPhone|iPad|iPod/i.test(navigator.userAgent||''))g.bumpImageUrl(earthBump);
 if(typeof g.globeMaterial==='function'){try{const m=g.globeMaterial();if(m){m.shininess=isHero?13:8;m.specular?.set?.(isHero?'#436b80':'#253b52');m.needsUpdate=true}}catch(e){console.debug('Globe material tuning skipped',e)}}
 
 let featureOverlay=null, featureLine=null;
 if(!isHero&&!isCountry&&!isCont&&state.category!=='countries'){
  const v=geo[state.category]?.[state.item];
  const coords=v&&typeof isLayerShape==='function'?isLayerShape(state.category,v):null;
  if(coords&&Array.isArray(coords)&&coords.length){
   const multi=Array.isArray(coords[0][0]);
   if(state.category==='rivers'){
    // River line geometries vary in quality; use one restrained location pin instead.
   }else if(state.category==='mountains')featureLine={points:coords.map(([lng,lat])=>({lng,lat}))};
   else if(multi)featureOverlay={type:'Feature',properties:{gvOverlay:true,name:lang(v[0],v[1])},geometry:{type:'MultiPolygon',coordinates:coords.map(p=>[p])}};
   else if(coords.length>=4)featureOverlay={type:'Feature',properties:{gvOverlay:true,name:lang(v[0],v[1])},geometry:{type:'Polygon',coordinates:[coords]}};
  }
 }
 // Render the selected country's actual outer and inner borders as crisp thin lines.
// Keeping fill close to the surface prevents an elevated cap hiding neighbouring land.
 const countryOutlinePaths=feature=>{
  if(!feature?.geometry)return [];
  const geometry=feature.geometry;
  const polygons=geometry.type==='Polygon'?[geometry.coordinates]:geometry.type==='MultiPolygon'?geometry.coordinates:[];
  return polygons.flatMap(poly=>poly.map(ring=>({
   points:ring.filter(p=>Array.isArray(p)&&Number.isFinite(p[0])&&Number.isFinite(p[1])).map(([lng,lat])=>({lng,lat}))
  }))).filter(path=>path.points.length>=3);
 };
 const countryShapes=store.countryFeatures.filter(f=>f.properties.name!=='Antarctica'||isCont);
 if(countryShapes.length){
  g.polygonsData(featureOverlay?[...countryShapes,featureOverlay]:countryShapes).polygonAltitude(f=>f.properties.gvOverlay?.064:(isCountry&&f===selectedFeature)?0.006:(isExplorer&&f===selectedExploreFeature)?0.0045:(isCont&&f.properties.gvContinent===selectedContinent||isCont&&selectedContinent==='Asia'&&['Russia','Turkey'].includes(f.properties.name))?.005:.0015).polygonCapColor(f=>{
   if(f.properties.gvOverlay)return 'rgba(240,183,67,.47)';
   if(isCountry)return f===selectedFeature?'rgba(39,221,193,0.50)':'rgba(11,59,82,0.045)';
   if(isExplorer)return f===selectedExploreFeature?'rgba(27,232,210,0.49)':'rgba(6,51,76,0.035)';
   if(isCont)return f.properties.gvContinent===selectedContinent||selectedContinent==='Asia'&&['Russia','Turkey'].includes(f.properties.name)?'rgba(19,221,217,0.48)':'rgba(3,30,50,0.13)';
   return isHero?'rgba(9,57,77,0.018)':'rgba(17,115,145,0.09)'
  }).polygonSideColor(()=>'rgba(17,224,219,.1)').polygonStrokeColor(f=>f.properties.gvOverlay?'#ffdd8f':(isCountry&&f===selectedFeature)||(isExplorer&&f===selectedExploreFeature)||(isCont&&f.properties.gvContinent===selectedContinent)?'#ffe1a0':(isHero?'rgba(171,228,243,0.12)':'rgba(157,224,239,0.24)')).polygonLabel(f=>isExplorer?'':f.properties.gvOverlay?'<div class="gv-globe-label">'+escapeHTML(f.properties.name)+' · '+lang('نطاق تقريبي','approximate area')+'</div>':state.page==='play'?'':'<div class="gv-globe-label">'+escapeHTML(globeCountryName(f))+'</div>').onPolygonClick(f=>{
    if(f.properties.gvOverlay)return;
    if(isExplorer){
     selectedExploreFeature=f;
     if(exploreNameLabel){
      const value=exploreNameLabel.querySelector('.gv117-name');
      if(value)value.textContent=globeCountryName(f);
      exploreNameLabel.classList.remove('gv117-visible');
      void exploreNameLabel.offsetWidth;
      exploreNameLabel.classList.add('gv117-visible');
     }
     g.polygonAltitude(v=>v===selectedExploreFeature?.0045:.0015);
     g.polygonCapColor(v=>v===selectedExploreFeature?'rgba(27,232,210,0.49)':'rgba(6,51,76,0.035)');
     g.polygonStrokeColor(v=>v===selectedExploreFeature?'#9afff0':'rgba(186,226,241,0.32)');
     // Country outline is rendered by polygonStrokeColor; avoid optional paths API.
     if(window.d3?.geoCentroid){
      try{
       const center=d3.geoCentroid(f);
       if(Number.isFinite(center[0])&&Number.isFinite(center[1])){
        // Preserve context around large nations; zoom deeper for smaller ones.
        const area=typeof d3.geoArea==='function'?d3.geoArea(f):0;
        const altitude=area>.45?1.22:area>.09?1.05:area>.018?.83:area>.002?.62:.43;
        g.pointOfView({lat:center[1],lng:center[0],altitude},reducedMotion?0:950);
       }
      }catch(e){console.debug('Country camera focus unavailable',e)}
     }
     return;
    }
    const r=recordFor(f.properties.name);
    if(r&&state.page!=='play')setPage('country-v4',r.code);
   });
 }

 if(featureLine&&typeof g.pathsData==='function'&&typeof g.pathPoints==='function'&&typeof g.pathPointLat==='function'&&typeof g.pathPointLng==='function'){
  g.pathPoints('points').pathPointLat('lat').pathPointLng('lng');
  if(typeof g.pathPointAlt==='function')g.pathPointAlt(.065);
  if(typeof g.pathColor==='function')g.pathColor(()=>'#ffe3a5');
  if(typeof g.pathStroke==='function')g.pathStroke(.35);
  g.pathsData([featureLine]);
 }
 if(!isHero&&!isCountry&&!isCont&&state.category!=='countries'){
  const v=geo[state.category]?.[state.item];
  if(v){
   const isTouristPoint=state.page==='detail'&&state.category==='tourism';
   const pin={lat:v[4],lng:v[5],name:lang(v[0],v[1])};
   let focusedPin=null;
   g.pointsData([pin]).pointLat('lat').pointLng('lng')
    .pointAltitude(d=>state.category==='rivers'?.035:(d===focusedPin?.11:.065))
    .pointRadius(d=>state.category==='rivers'?.54:(d===focusedPin?1.15:.72))
    .pointColor(d=>state.category==='rivers'?'#69ffdf':(d===focusedPin?'#67ffde':'#ffd67b'))
    .pointLabel(d=>escapeHTML(d.name));
   // A small luminous pulse anchored to the selected river's location.
   // Ring radii are degrees on the globe surface, not viewport pixels.
   if(state.page==='detail'&&state.category==='rivers'&&
      typeof g.ringsData==='function'&&typeof g.ringLat==='function'&&
      typeof g.ringLng==='function'&&typeof g.ringColor==='function'){
    g.ringLat('lat').ringLng('lng')
     .ringColor(()=>t=>'rgba(67,255,218,'+(0.68*(1-t)).toFixed(3)+')')
     .ringMaxRadius(reducedMotion?1.05:1.65)
     .ringPropagationSpeed(reducedMotion?0:0.9)
     .ringRepeatPeriod(reducedMotion?0:1800)
     .ringsData([pin]);
    if(typeof g.ringAltitude==='function')g.ringAltitude(.012);
    if(typeof g.ringResolution==='function')g.ringResolution(48);
   }
   if(isTouristPoint&&typeof g.onPointClick==='function'){
    g.onPointClick(d=>{
     if(state.page!=='detail'||state.category!=='tourism'||!node.isConnected)return;
     focusedPin=d;
     g.pointAltitude(x=>x===focusedPin?.11:.065)
      .pointRadius(x=>x===focusedPin?1.15:.72)
      .pointColor(x=>x===focusedPin?'#67ffde':'#ffd67b');
     // Animated camera focus at the exact landmark, not at the country centroid.
     g.pointOfView({lat:d.lat,lng:d.lng,altitude:.69},reducedMotion?0:1050);
     let label=node.querySelector('.gv203-pin-label');
     if(!label){label=document.createElement('div');label.className='gv203-pin-label';label.setAttribute('role','status');node.appendChild(label)}
     label.textContent=d.name;
     node.classList.add('gv203-point-focused');
    });
    if(typeof g.onPointHover==='function'){
     g.onPointHover(d=>{const canvas=node.querySelector('canvas');if(canvas)canvas.style.cursor=d?'pointer':'grab'});
    }
   }
  }
 }
 g.pointOfView(target,isHero?0:1200);
 const ctrl=g.controls();
 ctrl.autoRotate=isHero&&!reducedMotion;
 ctrl.autoRotateSpeed=.16;
 ctrl.enableDamping=true;
 ctrl.dampingFactor=isExplorer?.085:(isHero?.08:.13);
 ctrl.enablePan=false;
 ctrl.rotateSpeed=isExplorer?.43:(isHero?.65:.55);
 ctrl.zoomSpeed=isExplorer?.62:(isHero?.85:.55);
 ctrl.enableZoom=true;
 ctrl.zoomToCursor=false;
 ctrl.minDistance=isExplorer?124:(isCountry?185:160);
 ctrl.maxDistance=isExplorer?550:(isCountry?540:700);
 // On touch screens keep drag/pinch inside the globe rather than scrolling the page.
 if(!isHero&&node){node.style.touchAction='none';const canvas=node.querySelector('canvas');if(canvas)canvas.style.touchAction='none'}
 // Don't mix two-finger orbit rotation with pinch zoom on mobile.
 if(ctrl.touches&&typeof THREE!=='undefined'&&THREE.TOUCH){ctrl.touches.ONE=THREE.TOUCH.ROTATE;ctrl.touches.TWO=THREE.TOUCH.DOLLY}
 try{
  // Cap device pixel ratio to preserve GPU memory on high-density iPhones.
  const renderer=g.renderer?.();
  renderer?.setPixelRatio?.(Math.min(window.devicePixelRatio||1,window.innerWidth<750?1.35:1.75));
 }catch(e){console.debug('Adaptive resolution unavailable',e)}
 globeInstance=g;node.classList.add('gv-3d-loaded');
 if(isExplorer){
  node.classList.add('gv117-explorer');
  exploreNameLabel=document.createElement('div');
  exploreNameLabel.className='gv117-country-label';
  exploreNameLabel.setAttribute('role','status');
  exploreNameLabel.setAttribute('aria-live','polite');
  exploreNameLabel.innerHTML='<span class="gv117-marker" aria-hidden="true"></span><span class="gv117-name"></span>';
  node.appendChild(exploreNameLabel);
 }
 // Follow the actual globe container size on mobile rotation or browser chrome changes.
 const syncGlobeSize=()=>{
  if(globeNode!==node||!node.isConnected)return false;
  const width=Math.round(node.clientWidth||w),height=Math.round(node.clientHeight||h);
  if(width>0&&height>0&&
     (Math.round(g.width())!==width||Math.round(g.height())!==height))
   g.width(width).height(height);
  return true;
 };
 if(typeof ResizeObserver==='function'){
  const observer=new ResizeObserver(()=>{if(!syncGlobeSize())observer.disconnect()});
  observer.observe(node);
 }else G.addEventListener('resize',syncGlobeSize,{passive:true});
 }catch(err){
  const reason=String(err?.message||err||'unknown').slice(0,220);
  console.warn('GeoVerse 3D globe failed:',err);
  disposeGlobe();
  globeInteractiveFallback(node);
  globeNode=node;
  const card=node.querySelector('.gv132-fallback-map')||node.querySelector('.gv132-globe-error');
  if(card){
   const details=document.createElement('details');
   details.className='gv134-diagnostic';
   const summary=document.createElement('summary');
   summary.textContent=lang('تفاصيل المشكلة','Troubleshooting details');
   const line=document.createElement('code');
   line.textContent=reason;
   details.append(summary,line);
   card.appendChild(details);
  }
 }
}
function scheduleEnhancements(){
 clearTimeout(globeTimer);
 // Leave a currently working globe untouched if its DOM node was preserved.
 if(globeInstance&&globeNode?.isConnected)return;
 globeNode=null;
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
document.addEventListener('input',e=>{if(e.target.id==='categoryFilter')setTimeout(loadCardsMedia,130);if(e.target.id==='gvCountrySearch'){state.v4Search=e.target.value;const c=state.v4Continent||'all';const filtered=sortedCountryRows(c,state.v4Search);const grid=document.getElementById('gvCountryGrid');if(grid)grid.innerHTML=countryCards(filtered);const summary=document.querySelector('#main .gv-result-head strong');if(summary)summary.textContent=filtered.length+' '+lang('دولة وإقليم','countries & territories')}});
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

/* Comprehensive Atlas pilot — sourced, bilingual editorial panels for five countries.
   Static narrative facts only; dynamic statistics intentionally omitted until dated. */
const gvAtlasPilot={"EG":{"title":["مصر: بين النيل والصحراء","Egypt: Nile and desert"],"sections":[["نظرة عامة","Overview","تمتد مصر بين شمال شرق أفريقيا وشبه جزيرة سيناء الآسيوية. القاهرة عاصمتها، ويصل البحر المتوسط شمالها بالبحر الأحمر شرقًا.","Egypt spans northeastern Africa and the Asian Sinai Peninsula. Cairo is its capital; the Mediterranean lies to the north and the Red Sea to the east."],["الجغرافيا","Geography","يتركز العمران حول وادي النيل والدلتا، بينما تشغل الصحاري الغربية والشرقية وسيناء معظم اليابسة. تتنوع البيئات بين السواحل والواحات والجبال.","The Nile Valley and Delta concentrate settlements while the Western Desert, Eastern Desert and Sinai cover most of the land; coasts, oases and mountains add variety."],["السكان والثقافة","People & Culture","العربية اللغة الرسمية، وتحمل مدن القاهرة والإسكندرية والأقصر وأسوان طبقات ثقافية وتاريخية متباينة. لا تعرض أرقام السكان دون سنة ومصدر.","Arabic is the official language. Cairo, Alexandria, Luxor and Aswan reflect different cultural and historical landscapes; population figures require a dated source."],["الاقتصاد","Economy","تشمل الأنشطة الاقتصادية الخدمات والتصنيع والزراعة والسياحة والنقل المرتبط بقناة السويس. الإحصاءات المالية تحتاج إلى سنة مرجعية موثقة.","The economy includes services, manufacturing, agriculture, tourism and Suez Canal-related transport. Economic statistics require a clearly dated reference."],["الطبيعة والمعالم","Nature & Landmarks","تشمل المعالم الجغرافية نهر النيل والصحراء الكبرى وجبال جنوب سيناء وسواحل البحر الأحمر، بجانب مواقع أثرية مثل أهرامات الجيزة.","Geographic highlights include the Nile, Sahara, South Sinai mountains and the Red Sea coast, alongside heritage sites such as the Giza pyramids."],["هل تعلم؟","Did You Know?","تتفرع مياه النيل شمال القاهرة لتشكّل دلتا خصبة على البحر المتوسط؛ كما تُعد سيناء الجسر البري بين أفريقيا وآسيا.","North of Cairo, the Nile branches into a fertile Mediterranean delta; Sinai forms a land bridge between Africa and Asia."]],"source":"https://sis.gov.eg/en/egypt/basic-information/"},"SA":{"title":["السعودية: تنوع الجزيرة العربية","Saudi Arabia: landscapes of Arabia"],"sections":[["نظرة عامة","Overview","تقع السعودية في شبه الجزيرة العربية، وعاصمتها الرياض. تطل غربًا على البحر الأحمر وشرقًا على الخليج العربي، وتضم بيئات شاسعة ومتباينة.","Saudi Arabia occupies much of the Arabian Peninsula, with Riyadh as its capital and coastlines along the Red Sea and Arabian Gulf."],["الجغرافيا","Geography","تضم هضبة نجد وجبال السروات وسهل تهامة والصحاري الرملية مثل النفود والدهناء والربع الخالي. تختلف التضاريس بين المرتفعات والواحات والكثبان.","Its landscapes include the Najd Plateau, Sarawat mountains, Tihamah coastal plain and the Nafud, Dahna and Rub' al Khali deserts."],["السكان والثقافة","People & Culture","العربية اللغة الرسمية، وتتميز مناطق المملكة بتقاليد عمرانية وثقافية متنوعة، من الحجاز إلى نجد والمنطقة الشرقية والجنوب.","Arabic is the official language. The Hijaz, Najd, Eastern Province and southern regions display diverse cultural and architectural traditions."],["الاقتصاد","Economy","يؤدي النفط والغاز دورًا محوريًا، إلى جانب التجارة والصناعة والخدمات والسياحة. تحتاج المؤشرات الاقتصادية الحديثة إلى سنة ومصدر قبل عرضها.","Oil and gas remain major activities alongside trade, industry, services and tourism. Current economic indicators must show source and observation year."],["الطبيعة والمعالم","Nature & Landmarks","من أبرز المواقع الربع الخالي وجبال عسير وسواحل البحر الأحمر وجزر فرسان وواحات الأحساء، مع تنوع ملحوظ في الطبيعة والمناخ.","Highlights include the Empty Quarter, Asir highlands, Red Sea coast, Farasan Islands and Al-Ahsa oases, spanning multiple climates and habitats."],["هل تعلم؟","Did You Know?","الربع الخالي بحر رمال واسع يمتد خارج حدود السعودية إلى أجزاء من دول مجاورة؛ وليس كل سطح المملكة مغطى بالرمال.","Rub' al Khali is a vast sand sea extending beyond Saudi Arabia into neighboring countries; the kingdom is not uniformly sandy."]],"source":"https://saudiarabia.un.org/en/download/66635/125657"},"FR":{"title":["فرنسا: بين الأطلسي والألب","France: Atlantic to Alps"],"sections":[["نظرة عامة","Overview","فرنسا دولة أوروبية عاصمتها باريس، وتضم أراضي وأقاليم ما وراء البحار أيضًا. يجمع موقعها بين واجهات بحرية وجبلية متنوعة.","France is a European country with Paris as its capital and overseas regions and territories. Its geography includes diverse maritime and mountain landscapes."],["الجغرافيا","Geography","تحد البر الفرنسي جبال البرانس جنوبًا وتظهر جبال الألب شرقًا، مع أحواض أنهار مثل السين واللوار والرون، وسواحل على الأطلسي والمتوسط.","Metropolitan France includes the Pyrenees to the south, Alps to the east, river basins such as the Seine, Loire and Rhône, and Atlantic and Mediterranean coasts."],["السكان والثقافة","People & Culture","الفرنسية اللغة الرسمية، وتختلف التقاليد والأطعمة والعمارة بين باريس وبريتاني وبروفانس والألزاس والمناطق الأخرى.","French is the official language, with regional distinctions in traditions, food and architecture from Brittany and Provence to Alsace."],["الاقتصاد","Economy","تتنوع الأنشطة بين الصناعة والزراعة والخدمات والسياحة، وتشمل إنتاج الغذاء والطاقة والنقل. لا نثبت مؤشرات الناتج دون سنة مرجعية.","Industry, farming, services and tourism all play roles, including food production, energy and transport; GDP values need dated references."],["الطبيعة والمعالم","Nature & Landmarks","من أبرز المشاهد جبال الألب والبرانس ونهر اللوار وسواحل نورماندي والريفيرا، إلى جانب المواقع الثقافية مثل برج إيفل.","Notable landscapes include the Alps, Pyrenees, Loire River, Normandy coast and Riviera, together with cultural landmarks such as the Eiffel Tower."],["هل تعلم؟","Did You Know?","عند مقارنة مساحة فرنسا أو سكانها يجب التوضيح هل المقصود فرنسا الأوروبية فقط أم الجمهورية مع مناطق ما وراء البحار.","French geographic statistics can differ depending on whether they include only metropolitan France or also overseas territories."]],"source":"https://commission.europa.eu/system/files/2023-11/styleguide_english_dgt_country_compendium_en.pdf"},"JP":{"title":["اليابان: أرخبيل الجبال والبراكين","Japan: islands and volcanoes"],"sections":[["نظرة عامة","Overview","اليابان دولة جزرية بشرق آسيا وعاصمتها طوكيو. تتكون من آلاف الجزر، وأكبرها هونشو وهوكايدو وكيوشو وشيكوكو.","Japan is an East Asian island country with Tokyo as its capital. It comprises thousands of islands; Honshu, Hokkaido, Kyushu and Shikoku are the four largest."],["الجغرافيا","Geography","تشغل الجبال والغابات جزءًا كبيرًا من اليابسة، وتقع البلاد ضمن نطاق نشط زلزاليًا وبركانيًا. يختلف المناخ من الشمال البارد إلى الجنوب شبه المداري.","Mountains and forests occupy much of the land; Japan is tectonically active, with climates ranging from colder northern areas to subtropical southern islands."],["السكان والثقافة","People & Culture","اليابانية اللغة الرئيسية، وتتنوع الهوية الإقليمية بين المدن الكبرى والجزر والأقاليم المحلية، مع تقاليد معمارية وفنية مميزة.","Japanese is the main language. Urban centers, islands and regions preserve distinctive artistic and architectural traditions."],["الاقتصاد","Economy","يعتمد الاقتصاد على التصنيع والتكنولوجيا والتجارة والخدمات، مع دور للنقل البحري في ربط الأرخبيل بالأسواق. الأرقام الحديثة تتطلب توثيقًا.","Manufacturing, technology, trade and services are important, and maritime transport connects the archipelago to global markets; statistics need dated sourcing."],["الطبيعة والمعالم","Nature & Landmarks","يشتهر جبل فوجي، وتوجد غابات وينابيع حارة وسواحل وجزر متعددة. يضفي النشاط البركاني والزلازل طابعًا خاصًا على جغرافيا البلاد.","Mount Fuji, forests, hot springs, coastal landscapes and islands characterize Japan; earthquakes and volcanoes shape its physical geography."],["هل تعلم؟","Did You Know?","يتسبب الامتداد الكبير من الشمال إلى الجنوب في اختلاف كبير بين مناخ هوكايدو وأوكيناوا خلال الموسم نفسه.","Japan's north-to-south span produces striking seasonal contrasts between Hokkaido and Okinawa."]],"source":"https://www.japan-guide.com/list/e1000.html"},"BR":{"title":["البرازيل: الأمازون والسواحل","Brazil: Amazon and Atlantic"],"sections":[["نظرة عامة","Overview","البرازيل أكبر دول أمريكا الجنوبية مساحةً، وعاصمتها برازيليا. تمتد على ساحل واسع للمحيط الأطلسي وتضم أقاليم طبيعية متعددة.","Brazil is South America's largest country by area, with Brasília as its capital, an extensive Atlantic coast and varied natural regions."],["الجغرافيا","Geography","تضم حوض الأمازون وغاباته المطيرة والمرتفعات البرازيلية والأراضي الرطبة في بانتانال، وتختلف المناظر بين الأراضي المنخفضة والهضاب.","Its physical regions include the Amazon basin and rainforest, Brazilian Highlands and Pantanal wetlands, with lowlands and plateaus."],["السكان والثقافة","People & Culture","البرتغالية اللغة الرسمية، وتمتزج الملامح الثقافية من مناطق الأمازون إلى ريو دي جانيرو وساو باولو وشمال شرق البلاد.","Portuguese is the official language; cultural landscapes vary across the Amazon, Rio de Janeiro, São Paulo and the northeast."],["الاقتصاد","Economy","تضم الأنشطة الزراعة والصناعة والتعدين والخدمات، مع صادرات متعددة. يجب تحديث أرقام الإنتاج والناتج وفق مصدر وسنة.","Agriculture, industry, mining and services are major activities. Production and GDP figures must be tied to dated datasets."],["الطبيعة والمعالم","Nature & Landmarks","من أبرز المعالم نهر الأمازون وغاباته وشلالات إيغواسو وبانتانال والسواحل الأطلسية، وهي بيئات ذات تنوع حيوي كبير.","Highlights include the Amazon River and rainforest, Iguaçu Falls, Pantanal wetlands and Atlantic coast, rich in biodiversity."],["هل تعلم؟","Did You Know?","تجاور البرازيل معظم دول أمريكا الجنوبية، ولا تشترك بحدود برية مع تشيلي أو الإكوادور.","Brazil shares land borders with most South American countries, but not Chile or Ecuador."]],"source":"https://infcis.iaea.org/udepo/Resources/Countries/Brazil.pdf"}};
G.GeoVerseAtlasPilot=gvAtlasPilot;
const gvBaseCountryPage=countryPage;
countryPage=function(){
 const base=gvBaseCountryPage();
 const record=gvAtlasPilot[state.v4Code];
 if(!record)return base;
 const ar=state.lang==='ar',t=arr=>escapeHTML(arr[ar?0:1]);
 const sections=record.sections.map((s,i)=>'<details class="gv-comprehensive-section" '+(i===0?'open':'')+'><summary><span class="gv-comprehensive-num">'+String(i+1).padStart(2,'0')+'</span><strong>'+t(s)+'</strong><span class="gv-comprehensive-arrow" aria-hidden="true">⌄</span></summary><p>'+escapeHTML(s[ar?2:3])+'</p></details>').join('');
 const panel='<section class="gv-story-card gv-comprehensive" aria-labelledby="gvComprehensiveHeading"><h2 id="gvComprehensiveHeading">'+t(record.title)+'</h2>'+sections+'<div class="gv-comprehensive-source"><strong>'+lang('المصدر الجغرافي','Geographic source')+'</strong><a href="'+record.source+'" target="_blank" rel="noopener noreferrer">'+lang('اقرأ المصدر الأصلي','Read source')+' ↗</a><small>'+lang('مراجعة تحريرية: نوفمبر 2026. لا تُعرض أرقام متغيرة دون سنة بيانات موثقة.','Editorial review: November 2026. Dynamic statistics need an observation year.')+'</small></div></section>';
 const marker='<div class="gv-story-card" id="gvWikiArticle">';
 return base.includes(marker)?base.replace(marker,panel+marker):base;
};

})();