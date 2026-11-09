/* GeoVerse C4 — Discover five highlights in each continent.
 * Curated bilingual descriptions, direct connections to EXISTING GeoVerse educational profiles.
 * No new remote photo dependencies; icons are sourced from the installed GeoVerse SVG set.
 * Names are resolved against current geo[category] so content expansions do not break navigation.
 */
(function(){
'use strict';
const highlights={"Asia":[["mountains","Mount Everest","أعلى قمة فوق مستوى سطح البحر، في سلسلة الهيمالايا.","Earth’s highest summit above sea level, in the Himalayas."],["rivers","Yangtze","أطول أنهار آسيا، وشريان رئيسي للحياة والنقل في الصين.","Asia’s longest river and a major lifeline in China."],["deserts","Gobi","صحراء واسعة باردة نسبيًا تمتد عبر منغوليا وشمال الصين.","Vast, often cold desert spanning Mongolia and northern China."],["lakes","Lake Baikal","بحيرة سيبيرية عميقة تحتفظ بكمية هائلة من المياه العذبة.","Deep Siberian lake holding a vast reserve of fresh water."],["volcanoes","Mount Fuji","بركان طبقي شهير يميز المشهد الطبيعي في اليابان.","Iconic Japanese stratovolcano and landscape landmark."]],"Africa":[["deserts","Sahara","أكبر صحراء حارة في العالم، تمتد عبر شمال أفريقيا.","The world’s largest hot desert across North Africa."],["rivers","Nile","نهر تاريخي يربط قلب أفريقيا بشمالها والبحر المتوسط.","Historic river connecting northeastern Africa to the Mediterranean."],["waterfalls","Victoria Falls","شلالات هائلة على نهر الزامبيزي بين زامبيا وزيمبابوي.","Massive falls on the Zambezi between Zambia and Zimbabwe."],["forests","Congo Rainforest","واحدة من أكبر مناطق الغابات المطيرة وأكثرها تنوعًا حيويًا.","One of the planet’s largest and most biodiverse rainforests."],["mountains","Atlas Mountains","سلسلة جبلية كبيرة تمتد عبر بلدان المغرب العربي.","Major mountain system across northwestern Africa."]],"Europe":[["mountains","Alps","سلسلة أوروبية كبرى تضم وديانًا ومرتفعات جليدية.","Major European mountain range with glacial valleys and high peaks."],["rivers","Danube","نهر أوروبي يمر أو يلامس عددًا كبيرًا من دول القارة.","Major river crossing or bordering numerous European countries."],["forests","Black Forest","منطقة غابات كثيفة ومناظر جبلية في جنوب غرب ألمانيا.","Forested uplands in southwestern Germany."],["glaciers","Aletsch Glacier","أكبر نهر جليدي في جبال الألب من حيث المساحة.","Largest glacier in the Alps by area."],["islands","Iceland","جزيرة شمال أطلسية ذات طبيعة بركانية وجليدية فريدة.","North Atlantic island shaped by volcanoes and glaciers."]],"North America":[["valleys","Grand Canyon","أخدود هائل حفره نهر كولورادو عبر طبقات الصخور.","Immense canyon carved through rock by the Colorado River."],["rivers","Mississippi River","من أهم شبكات الأنهار التي تربط وسط الولايات المتحدة.","A major river system draining the central United States."],["waterfalls","Niagara Falls","شلالات شهيرة على الحدود بين الولايات المتحدة وكندا.","Famous waterfalls along the US–Canada border."],["lakes","Lake Superior","أكبر البحيرات العظمى مساحةً، بين الولايات المتحدة وكندا.","Largest Great Lake by surface area, shared by the US and Canada."],["volcanoes","Yellowstone Caldera","نظام بركاني حراري أرضي بارز في شمال غرب الولايات المتحدة.","Major volcanic and geothermal system in the northwestern United States."]],"South America":[["forests","Amazon Rainforest","أكبر نطاق متصل من الغابات الاستوائية المطيرة في العالم.","World’s largest continuous tropical rainforest region."],["mountains","Andes","أطول سلسلة جبلية قارية تمتد بمحاذاة غرب أمريكا الجنوبية.","Longest continental mountain chain, along western South America."],["waterfalls","Iguazú Falls","مجموعة شلالات مبهرة على حدود الأرجنتين والبرازيل.","Spectacular waterfall system on the Argentina–Brazil border."],["deserts","Atacama","من أكثر صحاري العالم جفافًا، على ساحل تشيلي الشمالي.","Among the world’s driest deserts, in northern Chile."],["islands","Galápagos Islands","أرخبيل إكوادوري مهم لفهم التطور والتنوع الحيوي.","Ecuadorian archipelago known for evolution and unique wildlife."]],"Oceania":[["forests","Daintree Rainforest","غابة مطيرة استوائية قديمة في ولاية كوينزلاند الأسترالية.","Ancient tropical rainforest in Queensland, Australia."],["islands","New Guinea","جزيرة كبرى تتميز بتنوع ثقافي وبيئي وجبال شاهقة.","Large island with extraordinary cultural and ecological diversity."],["seas","Coral Sea","بحر استوائي تقع فيه أجزاء واسعة من الحاجز المرجاني العظيم.","Tropical sea containing much of the Great Barrier Reef."],["rivers","Murray River","أحد أهم الأنهار الأسترالية للزراعة والأنظمة البيئية.","One of Australia’s major rivers for farming and ecosystems."],["volcanoes","Kīlauea","بركان نشط في هاواي، ضمن المنطقة الجغرافية للمحيط الهادئ.","Active Hawaiian volcano in the wider Pacific island region."]],"Antarctica":[["deserts","Antarctic Desert","صحراء قطبية شديدة البرودة والجفاف رغم الغطاء الجليدي.","Cold, extremely dry polar desert despite extensive ice cover."],["glaciers","Antarctica","القارة الجليدية التي تضم غالبية جليد الأرض القاري.","Ice-covered continent holding most of Earth’s land ice."],["oceans","Southern Ocean","المحيط الذي يحيط بأنتاركتيكا ويربط محيطات العالم.","Ocean encircling Antarctica and connecting global waters."],["seas","Weddell Sea","بحر قطبي معروف بالجليد البحري والبحث العلمي.","Polar sea noted for sea ice and scientific research."],["climate","Polar Climate","مناخ يتميز ببرودة شديدة وشح الهطول لفترات طويلة.","Climate marked by intense cold and generally low precipitation."]]};
const continentKeys=['Asia','Africa','Europe','North America','South America','Oceania','Antarctica'];
const arNames=['آسيا','أفريقيا','أوروبا','أمريكا الشمالية','أمريكا الجنوبية','أوقيانوسيا','أنتاركتيكا'];
const categories={mountains:['الجبال','Mountains'],rivers:['الأنهار','Rivers'],deserts:['الصحاري','Deserts'],lakes:['البحيرات','Lakes'],volcanoes:['البراكين','Volcanoes'],waterfalls:['الشلالات','Waterfalls'],forests:['الغابات','Forests'],glaciers:['الأنهار الجليدية','Glaciers'],islands:['الجزر','Islands'],valleys:['الأودية','Valleys'],seas:['البحار','Seas'],oceans:['المحيطات','Oceans'],climate:['المناخ','Climate']};
const lang=(ar,en)=>state.lang==='ar'?ar:en;
const escape=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function icon(k){try{return window.GeoVerseV4?.svgIcon?.(k,24)||''}catch{return ''}}
function findItem(category,en){
 const arr=geo[category]||[];
 const index=arr.findIndex(v=>v[1]===en);
 return index<0?null:{index,item:arr[index]};
}
function makeCard(entry){
 const [category,en,descriptionAr,descriptionEn]=entry;
 const resolved=findItem(category,en);
 if(!resolved)return '';
 const c=categories[category]||['معلم جغرافي','Geographic feature'],item=resolved.item;
 return '<button type="button" class="gv-c4-card" data-gv-c4-open="'+escape(category)+':'+resolved.index+'" aria-label="'+escape(lang('استكشف ','Explore ')+lang(item[0],item[1]))+'">'+
 '<div class="gv-c4-card-head"><span class="gv-c4-icon" aria-hidden="true">'+icon(category)+'</span><span class="gv-c4-kind">'+escape(lang(c[0],c[1]))+'</span><span class="gv-c4-arrow" aria-hidden="true">↗</span></div>'+
 '<h3>'+escape(lang(item[0],item[1]))+'</h3><p>'+escape(lang(descriptionAr,descriptionEn))+'</p>'+
 '<span class="gv-c4-action">'+lang('استكشف المعلم','Explore feature')+' <span aria-hidden="true">←</span></span></button>';
}
function sectionFor(key,compact){
 const rows=highlights[key]||[];
 const cards=rows.map(makeCard).filter(Boolean);
 if(!cards.length)return '';
 return '<section class="gv-c4-shell" id="gvContinentHighlights" aria-label="'+escape(lang('أبرز المعالم الجغرافية','Geographic highlights'))+'">'+
 '<header class="gv-c4-header"><div><span class="eyebrow">GEOVERSE · NATURAL HIGHLIGHTS</span><h2>'+lang('أبرز المعالم الجغرافية','Geographic highlights')+'</h2><p>'+lang('خمسة معالم طبيعية مختارة من ','Five selected natural features from ')+escape(lang(arNames[continentKeys.indexOf(key)],key))+lang('، وكل بطاقة توصلك إلى الملف الكامل داخل الأطلس.','. Each card opens its full existing atlas profile.')+'</p></div><span class="gv-c4-counter">'+cards.length+' / 5</span></header>'+
 '<div class="gv-c4-grid">'+cards.join('')+'</div>'+
 '<p class="gv-c4-note">'+lang('هذه أمثلة مختارة للمعالم الجغرافية وليست قائمة شاملة لكل معالم القارة.','These are selected examples, not an exhaustive list of the continent’s geographic features.')+'</p></section>';
}
function mount(){
 if(state.page!=='detail'||state.category!=='continents')return;
 const root=document.getElementById('main');if(!root||root.querySelector('#gvContinentHighlights'))return;
 const key=geo.continents?.[state.item]?.[1];
 if(!highlights[key])return;
 const anchor=root.querySelector('#gvContinentCompare')||root.querySelector('#gvContinentMapPanel')||root.querySelector('.gv-continent-guide');
 if(!anchor)return;
 anchor.insertAdjacentHTML('afterend',sectionFor(key));
}
document.addEventListener('click',e=>{
 const element=e.target.closest('[data-gv-c4-open]');if(!element)return;
 const raw=element.dataset.gvC4Open||'',sep=raw.lastIndexOf(':');
 if(sep<0)return;const key=raw.slice(0,sep),index=Number(raw.slice(sep+1));
 if(!(key in categories)||!Number.isInteger(index)||index<0||!geo[key]?.[index])return;
 e.preventDefault();e.stopImmediatePropagation();
 setPage('detail',key,index);
},true);
const css=`
.gv-c4-shell{border-radius:22px;border:1px solid rgba(117,213,208,.3);background:linear-gradient(145deg,#092b40,#061d33);padding:clamp(16px,2.7vw,26px);margin:22px 0;color:#e8f8f9;box-shadow:0 14px 34px #0003}
.gv-c4-header{display:flex;justify-content:space-between;align-items:start;gap:16px}
.gv-c4-header h2{color:#f5ffff;font-size:clamp(20px,3vw,26px);margin:8px 0 7px}
.gv-c4-header p{max-width:650px;margin:0;font-size:13px;line-height:1.85;color:#b9d5de}
.gv-c4-counter{flex-shrink:0;border:1px solid #92d1d342;color:#efd29c;border-radius:10px;padding:8px 11px;font-size:12px;font-weight:800}
.gv-c4-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px;margin-top:19px}
.gv-c4-card{display:flex;flex-direction:column;align-items:stretch;text-align:start;min-width:0;min-height:175px;border:1px solid #9bd9d32d;border-radius:17px;background:linear-gradient(135deg,#19475a,#0e354b);padding:16px;cursor:pointer;color:#ecfcfa;transition:transform .18s,border-color .18s,background .18s}
.gv-c4-card:hover,.gv-c4-card:focus-visible{transform:translateY(-2px);border-color:#7fe4d7;background:#195365;outline:none}
.gv-c4-card-head{display:flex;align-items:center;gap:8px;margin-bottom:13px}
.gv-c4-icon{width:39px;height:39px;border-radius:12px;background:#4cbcb72a;color:#75e6d7;display:grid;place-items:center;flex-shrink:0}
.gv-c4-kind{font-size:11px;color:#bcd6db;font-weight:700}
.gv-c4-arrow{margin-inline-start:auto;color:#e8c989;font-size:18px}
.gv-c4-card h3{font-size:17px;color:#f7ffff;margin:0 0 8px;line-height:1.4}
.gv-c4-card p{font-size:12px;line-height:1.9;color:#c5dbe0;margin:0 0 15px;flex:1}
.gv-c4-action{color:#82e9d9;font-size:12px;font-weight:800}
.gv-c4-note{color:#accbd3;font-size:11px;margin:17px 0 0;line-height:1.8}
body.light .gv-c4-shell{background:linear-gradient(135deg,#eef9f9,#fff);color:#123746;border-color:#bcd9d9}
body.light .gv-c4-header h2,body.light .gv-c4-card h3{color:#153d4a}
body.light .gv-c4-header p,body.light .gv-c4-note{color:#466975}
body.light .gv-c4-card{background:linear-gradient(135deg,#fff,#e9f4f5);color:#173d4a;border-color:#c9dfe0}
body.light .gv-c4-card p,body.light .gv-c4-kind{color:#436472}
body.light .gv-c4-action{color:#16796f}
@media(min-width:1000px){.gv-c4-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
@media(max-width:680px){.gv-c4-shell{padding:13px}.gv-c4-grid{grid-template-columns:1fr;gap:9px}.gv-c4-card{min-height:0;padding:13px}.gv-c4-header{gap:9px}.gv-c4-counter{font-size:11px;padding:7px}.gv-c4-card p{margin-bottom:9px}}
`;
if(!document.getElementById('gv-c4-style')){const node=document.createElement('style');node.id='gv-c4-style';node.textContent=css;document.head.appendChild(node)}
const previous=render;render=function(){previous();mount()};
})();
