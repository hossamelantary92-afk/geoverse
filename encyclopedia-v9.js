/* GeoVerse v9: sourced country encyclopedia, one primary map per place. */
(function(){
'use strict';
const G=window;
const countryInfo={facts:null,locales:null,ready:false};
const lang=(ar,en)=>state.lang==='ar'?ar:en;
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const meta=()=>G.GeoVerseV4?.store;
const arRegion={Africa:'أفريقيا',Asia:'آسيا',Europe:'أوروبا','North America':'أمريكا الشمالية','South America':'أمريكا الجنوبية',Oceania:'أوقيانوسيا',Antarctica:'أنتاركتيكا'};
const languageAr={'Icelandic':'الآيسلندية','English':'الإنجليزية','Arabic':'العربية','French':'الفرنسية','German':'الألمانية','Spanish':'الإسبانية','Portuguese':'البرتغالية','Italian':'الإيطالية','Russian':'الروسية','Chinese':'الصينية','Mandarin':'الماندرينية','Hindi':'الهندية','Bengali':'البنغالية','Urdu':'الأردية','Turkish':'التركية','Persian':'الفارسية','Japanese':'اليابانية','Korean':'الكورية','Dutch':'الهولندية','Swedish':'السويدية','Norwegian':'النرويجية','Danish':'الدنماركية','Finnish':'الفنلندية','Greek':'اليونانية','Hebrew':'العبرية','Polish':'البولندية','Romanian':'الرومانية','Czech':'التشيكية','Slovak':'السلوفاكية','Hungarian':'المجرية','Ukrainian':'الأوكرانية','Indonesian':'الإندونيسية','Malay':'الملايوية','Vietnamese':'الفيتنامية','Thai':'التايلاندية','Swahili':'السواحيلية','Amharic':'الأمهرية','Afrikaans':'الأفريقانية','Tamil':'التاميلية','Telugu':'التيلوغوية','Punjabi':'البنجابية','Gujarati':'الغوجاراتية','Nepali':'النيبالية','Filipino':'الفلبينية','Tagalog':'التاغالوغية','Albanian':'الألبانية','Serbian':'الصربية','Croatian':'الكرواتية','Bosnian':'البوسنية','Bulgarian':'البلغارية','Georgian':'الجورجية','Armenian':'الأرمنية','Azerbaijani':'الأذرية','Kazakh':'الكازاخية','Uzbek':'الأوزبكية','Mongolian':'المنغولية','Pashto':'البشتوية','Dari':'الدارية','Somali':'الصومالية','Hausa':'الهوسا','Yoruba':'اليوروبا','Igbo':'الإيغبو','Zulu':'الزولو','Xhosa':'الخوسا','Catalan':'الكتالونية','Basque':'الباسكية','Irish':'الأيرلندية','Welsh':'الويلزية','Scottish Gaelic':'الغيلية الاسكتلندية','Lithuanian':'الليتوانية','Latvian':'اللاتفية','Estonian':'الإستونية','Maltese':'المالطية','Slovenian':'السلوفينية','Macedonian':'المقدونية','Belarusian':'البيلاروسية','Burmese':'البورمية','Khmer':'الخميرية','Lao':'اللاوية','Sinhala':'السنهالية','Dzongkha':'الدزونخية','Fijian':'الفيجية','Samoan':'الساموية','Tongan':'التونغية'};
const number=x=>new Intl.NumberFormat(state.lang==='ar'?'ar-EG':'en-US',{maximumFractionDigits:0}).format(x);
function nativeName(code){
 if(!code)return lang('دولة غير محددة','Unknown country');
 if(state.lang==='en')return meta()?.byCode?.get(code)?.name||countryInfo.facts?.[code]?.n||code;
 try{return new Intl.DisplayNames(['ar'],{type:'region'}).of(code)||code}catch(e){return code}
}
const cca3=()=>{
 const m=new Map();
 for(const [code,info] of Object.entries(countryInfo.facts||{}))if(info.c3)m.set(info.c3,code);
 return m;
};
function capital(r){
 const ar=countryInfo.locales?.capitals?.[r.code];
 if(state.lang==='ar')return ar||lang('غير محددة بالعربية','Not localized');
 return r.capital||'—';
}
function money(r){
 const code=countryInfo.facts?.[r.code]?.cc;
 if(code&&/^[A-Z]{3}$/.test(code)){
  try{return new Intl.DisplayNames([state.lang==='ar'?'ar':'en'],{type:'currency'}).of(code)}catch(e){}
 }
 const raw=r.currency||'';
 if(state.lang==='en')return raw||'—';
 return countryInfo.locales?.currencies?.[raw]||lang('غير متاحة بالعربية','Not available in Arabic');
}
function officialLanguages(info){
 if(!info?.l?.length&&!info?.lc?.length)return lang('غير متاحة','Not listed');
 const codes=info?.lc||[],fallback=info?.l||[];
 const values=Array.from({length:Math.min(5,Math.max(codes.length,fallback.length))},(_,i)=>{
  if(codes[i]){
   try{const v=new Intl.DisplayNames([state.lang==='ar'?'ar':'en'],{type:'language'}).of(codes[i]);if(v&&v!==codes[i])return v}catch(e){}
  }
  return state.lang==='ar'?languageAr[fallback[i]]||null:fallback[i];
 }).filter(Boolean);
 if(!values.length)return lang('لا تتوفر ترجمة عربية معتمدة','Not available');
 return values.join(lang('، ', ', '))+(Math.max(codes.length,fallback.length)>5?lang(' وغيرها',' and others'):'');
}
function tile(icon,label,value,detail=''){
 return '<div class="gv9-stat"><span class="gv9-stat-icon">'+icon+'</span><div class="gv9-stat-content"><span class="gv9-stat-label">'+label+'</span><strong>'+value+'</strong>'+(detail?'<small>'+detail+'</small>':'')+'</div></div>';
}
const icon=name=>{const icons={area:'scan',population:'users',capital:'landmark',language:'languages',money:'wallet',region:'globe-2',time:'clock',land:'map-pin'};const paths={area:'<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 4v16M4 8h16"/>',population:'<circle cx="9" cy="8" r="3"/><path d="M3 20v-2c0-3 3-5 6-5s6 2 6 5v2M17 5a3 3 0 0 1 0 6M18 14c2 1 3 3 3 5"/>',capital:'<path d="M3 10 12 3l9 7M5 11h14M7 12v8m5-8v8m5-8v8M4 21h16"/>',language:'<path d="M4 5h12M10 3v2m-3 4 5 6m2-7c-2 5-5 9-9 11M14 16l4-10 4 10m-6-3h4"/>',money:'<rect x="2" y="6" width="20" height="14" rx="3"/><path d="M2 10h20m-5 5h2"/>',region:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-6 6-6 12 0 18 6-6 6-12 0-18"/>',time:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',land:'<path d="M12 22s8-7 8-13a8 8 0 0 0-16 0c0 6 8 13 8 13Z"/><circle cx="12" cy="9" r="2"/>'};return '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+paths[name]+'</svg>'};
function neighbors(info,code){
 const cross=cca3(),list=(info?.b||[]).map(c=>cross.get(c)).filter(c=>c&&c!==code);
 if(!list.length)return '<div class="gv9-neighbors-empty">'+lang('لا توجد حدود برية مسجلة في مجموعة البيانات المرجعية.','No land borders recorded in this source.')+'</div>';
 return '<div class="gv9-neighbors">'+[...new Set(list)].map(c=>'<button type="button" class="gv9-neighbor" data-v4-country="'+esc(c)+'"><img alt="" loading="lazy" src="https://flagcdn.com/'+c.toLowerCase()+'.svg"><span>'+esc(nativeName(c))+'</span><span aria-hidden="true">↗</span></button>').join('')+'</div>';
}
function coreCountryArticle(){
 const code=state.v4Code,r=meta()?.byCode?.get(code);if(!r)return '<div class="notice">'+lang('تعذر العثور على الدولة','Country not available')+'</div>';
 const info=countryInfo.facts?.[code]||null,c=state.lang==='ar'?(arRegion[r.continent]||r.continent):r.continent;
 const pop=info&&Number.isFinite(info.p)?number(info.p):lang('غير متاح','Unavailable');
 const area=info&&Number.isFinite(info.a)?number(info.a)+' '+lang('كم²','km²'):lang('غير متاح','Unavailable');
 const populationNote=info?.py?lang('بيانات البنك الدولي · '+info.py,'World Bank · '+info.py):lang('تقدير مرجعي · سنة التقدير غير محددة','Dataset estimate · reference year unspecified');
 const areaNote=lang('المساحة وفق المصدر المرجعي','Area according to the referenced dataset');
 const title=esc(nativeName(code)),eng=esc(r.name);
 const subtitle=esc(c);
 return '<button class="back gv9-back" data-page="countries-v4">← '+lang('العودة إلى الدول','Back to countries')+'</button>'+
 '<header class="gv9-hero"><div class="gv9-hero-title"><span class="gv9-eyebrow">'+lang('الموسوعة الجغرافية · الدول','COUNTRY ENCYCLOPEDIA')+'</span><h1>'+title+'</h1><p>'+subtitle+'</p></div><div class="gv9-flag"><img alt="'+lang('علم ','Flag of ')+title+'" src="https://flagcdn.com/'+code.toLowerCase()+'.svg"></div></header>'+
 '<section class="gv9-section"><div class="gv9-section-title"><span class="gv9-eyebrow">'+lang('نظرة سريعة','AT A GLANCE')+'</span><h2>'+lang('أهم المعلومات','Key facts')+'</h2></div><div class="gv9-stats">'+
 tile(icon('capital'),lang('العاصمة','Capital'),esc(capital(r)))+
 tile(icon('area'),lang('المساحة','Area'),area,areaNote)+
 tile(icon('population'),lang('عدد السكان','Population'),pop,populationNote)+
 tile(icon('language'),lang('اللغات الرسمية','Official languages'),esc(officialLanguages(info)))+
 tile(icon('region'),lang('القارة','Continent'),esc(c))+
 tile(icon('money'),lang('العملة','Currency'),esc(money(r)))+
 '</div></section>'+
 '<section class="gv9-section gv9-earth"><div class="gv9-section-title"><span class="gv9-eyebrow">'+lang('استكشف الأرض','EXPLORE EARTH')+'</span><h2>'+lang('شاهد موقع الدولة على الكرة الأرضية','Explore the country in 3D')+'</h2><p>'+lang('تظهر حدود الدولة من داخل طبقة الخريطة. حرّك الكرة للتجول، أو قرّب لرؤية موقعها.','Country geometry is highlighted directly on the globe. Drag to explore or zoom closer.')+'</p></div><div class="gv-globe-detail gv9-primary-globe" id="gvDetailGlobe" role="group" aria-label="'+lang('كرة أرضية تفاعلية لموقع الدولة','Interactive 3D country globe')+'"></div><p class="gv9-geo-footnote">'+lang('الحدود مستمدة من خريطة تعليمية مبسطة؛ ليست مرجعًا للفصل في النزاعات الحدودية.','Boundaries follow simplified educational geometry, not an official border adjudication.')+'</p></section>'+
 '<section class="gv9-section"><div class="gv9-section-title"><span class="gv9-eyebrow">'+lang('الجغرافيا والموقع','GEOGRAPHY & LOCATION')+'</span><h2>'+lang('عن هذه الدولة','About this country')+'</h2></div><p class="gv9-summary">'+lang('تقع '+title+' في '+esc(c)+'. عاصمتها '+esc(capital(r))+'. يمكنك التعرف على موقعها الجغرافي وحدودها والدول المجاورة من الخريطة والمعلومات الموجودة في هذه الصفحة.',title+' is located in '+esc(c)+'. Its capital is '+esc(capital(r))+'. Explore its geographic position, bordering countries, and main facts using this profile.')+'</p><div class="gv9-extra-facts">'+tile(icon('land'),lang('رمز الدولة','Country code'),esc(code))+'</div></section>'+
 '<section class="gv9-section"><div class="gv9-section-title"><span class="gv9-eyebrow">'+lang('الدول القريبة','NEIGHBORING COUNTRIES')+'</span><h2>'+lang('الدول ذات الحدود البرية المشتركة','Land neighbors')+'</h2><p>'+lang('اضغط على أي علم لفتح صفحة الدولة.','Select a neighboring country to open its profile.')+'</p></div>'+neighbors(info,code)+'</section>'+
 '<section class="gv9-sources"><details><summary>'+lang('المصادر وملاحظات البيانات','Sources and data notes')+'</summary><div><p>'+lang('أرقام السكان مأخوذة من أحدث سنة متاحة لدى البنك الدولي عندما تتوفر، وتُذكر السنة أسفل كل رقم. وقد تُعرض تقديرات مرجعية أقدم لبعض الأقاليم عندما لا تتوفر بيانات مؤرخة. وتختلف بعض الحدود والتصنيفات السياسية بحسب المصدر.','Population figures use the most recent available World Bank observation with its year when matched. Some territories retain older undated snapshot estimates. Border conventions may vary by source.')+'</p><a target="_blank" rel="noopener noreferrer" href="https://data.worldbank.org/indicator/SP.POP.TOTL">'+lang('السكان حسب السنة: البنك الدولي','Dated population: World Bank')+'</a><a target="_blank" rel="noopener noreferrer" href="https://github.com/mariuspatru/restcountries/blob/main/all-countries-v3.1.json">'+lang('بيانات السكان والمساحة والجيران واللغات','Population, area, borders and languages data')+'</a><a target="_blank" rel="noopener noreferrer" href="https://github.com/johan/world.geo.json">'+lang('بيانات الحدود الجغرافية','Geographic boundaries data')+'</a></div></details></section>';
}
function cleanLandmark(){
 const root=document.getElementById('main');if(!root)return;
 // Retain 3D globe as the sole map in the landmark page.
 root.querySelector('#detailMap')?.remove();
 root.querySelector('.gv-inline-map-title')?.remove();
 const card=root.querySelector('.detail-card');if(card){
  card.classList.add('gv9-learned-card');
  card.querySelector('h2')?.remove();
  card.querySelector('p')?.remove();
  card.querySelector('.detail-meta')?.remove();
  const btn=card.querySelector('#showMapPoint');if(btn){btn.textContent=lang('شاهد على الكرة الأرضية','Explore on 3D globe');btn.addEventListener('click',()=>root.querySelector('#gvDetailGlobe')?.scrollIntoView({behavior:'smooth',block:'center'}))}
 }
 // Avoid repetitive summaries: retain the curated field guide and one secondary reference section.
 root.querySelector('.gv-source-note')?.remove();
 root.querySelector('#gvPhotoGallery')?.remove(); // Do not mix unrelated article images into a place gallery.
 root.querySelectorAll('.gv-article-body>.eyebrow').forEach(n=>n.textContent=lang('ملف جغرافي','GEOGRAPHY PROFILE'));
 const intro=root.querySelector('.gv-article-body>p');
 if(intro&&root.querySelector('.gv-curated-story'))intro.remove();
 const story=root.querySelector('.gv-curated-story .eyebrow');if(story)story.textContent='';
 const heading=root.querySelector('.gv-curated-story h3');if(heading)heading.textContent=lang('لمحة جغرافية','Geographic overview');
 const title=root.querySelector('.gv-article-body>h2');if(title)title.textContent=lang('تعرف على المكان','About this place');
 const marker=root.querySelector('.gv-feature-globe .eyebrow');if(marker)marker.textContent='';
 root.querySelector('.gv-photo-gallery')?.remove();
 const wiki=root.querySelector('#gvWikiArticle');
 if(wiki){
  wiki.classList.add('gv9-secondary-source');
  if(!wiki.closest('.gv9-more')){
   const details=document.createElement('details'),summary=document.createElement('summary');
   details.className='gv9-more';
   summary.textContent=lang('معلومات إضافية','Additional information');
   wiki.before(details);
   details.appendChild(summary);details.appendChild(wiki);
  }
 }
}

/* Content lives beside the final country renderer to avoid cross-script order issues. */
const gvAtlasContent={"EG":{"title":["مصر: بين النيل والصحراء","Egypt: Nile and desert"],"sections":[["نظرة عامة","Overview","تمتد مصر بين شمال شرق أفريقيا وشبه جزيرة سيناء الآسيوية. القاهرة عاصمتها، ويصل البحر المتوسط شمالها بالبحر الأحمر شرقًا.","Egypt spans northeastern Africa and the Asian Sinai Peninsula. Cairo is its capital; the Mediterranean lies to the north and the Red Sea to the east."],["الجغرافيا","Geography","يتركز العمران حول وادي النيل والدلتا، بينما تشغل الصحاري الغربية والشرقية وسيناء معظم اليابسة. تتنوع البيئات بين السواحل والواحات والجبال.","The Nile Valley and Delta concentrate settlements while the Western Desert, Eastern Desert and Sinai cover most of the land; coasts, oases and mountains add variety."],["السكان والثقافة","People & Culture","العربية اللغة الرسمية، وتحمل مدن القاهرة والإسكندرية والأقصر وأسوان طبقات ثقافية وتاريخية متباينة. لا تعرض أرقام السكان دون سنة ومصدر.","Arabic is the official language. Cairo, Alexandria, Luxor and Aswan reflect different cultural and historical landscapes; population figures require a dated source."],["الاقتصاد","Economy","تشمل الأنشطة الاقتصادية الخدمات والتصنيع والزراعة والسياحة والنقل المرتبط بقناة السويس. الإحصاءات المالية تحتاج إلى سنة مرجعية موثقة.","The economy includes services, manufacturing, agriculture, tourism and Suez Canal-related transport. Economic statistics require a clearly dated reference."],["الطبيعة والمعالم","Nature & Landmarks","تشمل المعالم الجغرافية نهر النيل والصحراء الكبرى وجبال جنوب سيناء وسواحل البحر الأحمر، بجانب مواقع أثرية مثل أهرامات الجيزة.","Geographic highlights include the Nile, Sahara, South Sinai mountains and the Red Sea coast, alongside heritage sites such as the Giza pyramids."],["هل تعلم؟","Did You Know?","تتفرع مياه النيل شمال القاهرة لتشكّل دلتا خصبة على البحر المتوسط؛ كما تُعد سيناء الجسر البري بين أفريقيا وآسيا.","North of Cairo, the Nile branches into a fertile Mediterranean delta; Sinai forms a land bridge between Africa and Asia."]],"source":"https://sis.gov.eg/en/egypt/basic-information/"},"SA":{"title":["السعودية: تنوع الجزيرة العربية","Saudi Arabia: landscapes of Arabia"],"sections":[["نظرة عامة","Overview","تقع السعودية في شبه الجزيرة العربية، وعاصمتها الرياض. تطل غربًا على البحر الأحمر وشرقًا على الخليج العربي، وتضم بيئات شاسعة ومتباينة.","Saudi Arabia occupies much of the Arabian Peninsula, with Riyadh as its capital and coastlines along the Red Sea and Arabian Gulf."],["الجغرافيا","Geography","تضم هضبة نجد وجبال السروات وسهل تهامة والصحاري الرملية مثل النفود والدهناء والربع الخالي. تختلف التضاريس بين المرتفعات والواحات والكثبان.","Its landscapes include the Najd Plateau, Sarawat mountains, Tihamah coastal plain and the Nafud, Dahna and Rub' al Khali deserts."],["السكان والثقافة","People & Culture","العربية اللغة الرسمية، وتتميز مناطق المملكة بتقاليد عمرانية وثقافية متنوعة، من الحجاز إلى نجد والمنطقة الشرقية والجنوب.","Arabic is the official language. The Hijaz, Najd, Eastern Province and southern regions display diverse cultural and architectural traditions."],["الاقتصاد","Economy","يؤدي النفط والغاز دورًا محوريًا، إلى جانب التجارة والصناعة والخدمات والسياحة. تحتاج المؤشرات الاقتصادية الحديثة إلى سنة ومصدر قبل عرضها.","Oil and gas remain major activities alongside trade, industry, services and tourism. Current economic indicators must show source and observation year."],["الطبيعة والمعالم","Nature & Landmarks","من أبرز المواقع الربع الخالي وجبال عسير وسواحل البحر الأحمر وجزر فرسان وواحات الأحساء، مع تنوع ملحوظ في الطبيعة والمناخ.","Highlights include the Empty Quarter, Asir highlands, Red Sea coast, Farasan Islands and Al-Ahsa oases, spanning multiple climates and habitats."],["هل تعلم؟","Did You Know?","الربع الخالي بحر رمال واسع يمتد خارج حدود السعودية إلى أجزاء من دول مجاورة؛ وليس كل سطح المملكة مغطى بالرمال.","Rub' al Khali is a vast sand sea extending beyond Saudi Arabia into neighboring countries; the kingdom is not uniformly sandy."]],"source":"https://saudiarabia.un.org/en/download/66635/125657"},"FR":{"title":["فرنسا: بين الأطلسي والألب","France: Atlantic to Alps"],"sections":[["نظرة عامة","Overview","فرنسا دولة أوروبية عاصمتها باريس، وتضم أراضي وأقاليم ما وراء البحار أيضًا. يجمع موقعها بين واجهات بحرية وجبلية متنوعة.","France is a European country with Paris as its capital and overseas regions and territories. Its geography includes diverse maritime and mountain landscapes."],["الجغرافيا","Geography","تحد البر الفرنسي جبال البرانس جنوبًا وتظهر جبال الألب شرقًا، مع أحواض أنهار مثل السين واللوار والرون، وسواحل على الأطلسي والمتوسط.","Metropolitan France includes the Pyrenees to the south, Alps to the east, river basins such as the Seine, Loire and Rhône, and Atlantic and Mediterranean coasts."],["السكان والثقافة","People & Culture","الفرنسية اللغة الرسمية، وتختلف التقاليد والأطعمة والعمارة بين باريس وبريتاني وبروفانس والألزاس والمناطق الأخرى.","French is the official language, with regional distinctions in traditions, food and architecture from Brittany and Provence to Alsace."],["الاقتصاد","Economy","تتنوع الأنشطة بين الصناعة والزراعة والخدمات والسياحة، وتشمل إنتاج الغذاء والطاقة والنقل. لا نثبت مؤشرات الناتج دون سنة مرجعية.","Industry, farming, services and tourism all play roles, including food production, energy and transport; GDP values need dated references."],["الطبيعة والمعالم","Nature & Landmarks","من أبرز المشاهد جبال الألب والبرانس ونهر اللوار وسواحل نورماندي والريفيرا، إلى جانب المواقع الثقافية مثل برج إيفل.","Notable landscapes include the Alps, Pyrenees, Loire River, Normandy coast and Riviera, together with cultural landmarks such as the Eiffel Tower."],["هل تعلم؟","Did You Know?","عند مقارنة مساحة فرنسا أو سكانها يجب التوضيح هل المقصود فرنسا الأوروبية فقط أم الجمهورية مع مناطق ما وراء البحار.","French geographic statistics can differ depending on whether they include only metropolitan France or also overseas territories."]],"source":"https://commission.europa.eu/system/files/2023-11/styleguide_english_dgt_country_compendium_en.pdf"},"JP":{"title":["اليابان: أرخبيل الجبال والبراكين","Japan: islands and volcanoes"],"sections":[["نظرة عامة","Overview","اليابان دولة جزرية بشرق آسيا وعاصمتها طوكيو. تتكون من آلاف الجزر، وأكبرها هونشو وهوكايدو وكيوشو وشيكوكو.","Japan is an East Asian island country with Tokyo as its capital. It comprises thousands of islands; Honshu, Hokkaido, Kyushu and Shikoku are the four largest."],["الجغرافيا","Geography","تشغل الجبال والغابات جزءًا كبيرًا من اليابسة، وتقع البلاد ضمن نطاق نشط زلزاليًا وبركانيًا. يختلف المناخ من الشمال البارد إلى الجنوب شبه المداري.","Mountains and forests occupy much of the land; Japan is tectonically active, with climates ranging from colder northern areas to subtropical southern islands."],["السكان والثقافة","People & Culture","اليابانية اللغة الرئيسية، وتتنوع الهوية الإقليمية بين المدن الكبرى والجزر والأقاليم المحلية، مع تقاليد معمارية وفنية مميزة.","Japanese is the main language. Urban centers, islands and regions preserve distinctive artistic and architectural traditions."],["الاقتصاد","Economy","يعتمد الاقتصاد على التصنيع والتكنولوجيا والتجارة والخدمات، مع دور للنقل البحري في ربط الأرخبيل بالأسواق. الأرقام الحديثة تتطلب توثيقًا.","Manufacturing, technology, trade and services are important, and maritime transport connects the archipelago to global markets; statistics need dated sourcing."],["الطبيعة والمعالم","Nature & Landmarks","يشتهر جبل فوجي، وتوجد غابات وينابيع حارة وسواحل وجزر متعددة. يضفي النشاط البركاني والزلازل طابعًا خاصًا على جغرافيا البلاد.","Mount Fuji, forests, hot springs, coastal landscapes and islands characterize Japan; earthquakes and volcanoes shape its physical geography."],["هل تعلم؟","Did You Know?","يتسبب الامتداد الكبير من الشمال إلى الجنوب في اختلاف كبير بين مناخ هوكايدو وأوكيناوا خلال الموسم نفسه.","Japan's north-to-south span produces striking seasonal contrasts between Hokkaido and Okinawa."]],"source":"https://www.japan-guide.com/list/e1000.html"},"BR":{"title":["البرازيل: الأمازون والسواحل","Brazil: Amazon and Atlantic"],"sections":[["نظرة عامة","Overview","البرازيل أكبر دول أمريكا الجنوبية مساحةً، وعاصمتها برازيليا. تمتد على ساحل واسع للمحيط الأطلسي وتضم أقاليم طبيعية متعددة.","Brazil is South America's largest country by area, with Brasília as its capital, an extensive Atlantic coast and varied natural regions."],["الجغرافيا","Geography","تضم حوض الأمازون وغاباته المطيرة والمرتفعات البرازيلية والأراضي الرطبة في بانتانال، وتختلف المناظر بين الأراضي المنخفضة والهضاب.","Its physical regions include the Amazon basin and rainforest, Brazilian Highlands and Pantanal wetlands, with lowlands and plateaus."],["السكان والثقافة","People & Culture","البرتغالية اللغة الرسمية، وتمتزج الملامح الثقافية من مناطق الأمازون إلى ريو دي جانيرو وساو باولو وشمال شرق البلاد.","Portuguese is the official language; cultural landscapes vary across the Amazon, Rio de Janeiro, São Paulo and the northeast."],["الاقتصاد","Economy","تضم الأنشطة الزراعة والصناعة والتعدين والخدمات، مع صادرات متعددة. يجب تحديث أرقام الإنتاج والناتج وفق مصدر وسنة.","Agriculture, industry, mining and services are major activities. Production and GDP figures must be tied to dated datasets."],["الطبيعة والمعالم","Nature & Landmarks","من أبرز المعالم نهر الأمازون وغاباته وشلالات إيغواسو وبانتانال والسواحل الأطلسية، وهي بيئات ذات تنوع حيوي كبير.","Highlights include the Amazon River and rainforest, Iguaçu Falls, Pantanal wetlands and Atlantic coast, rich in biodiversity."],["هل تعلم؟","Did You Know?","تجاور البرازيل معظم دول أمريكا الجنوبية، ولا تشترك بحدود برية مع تشيلي أو الإكوادور.","Brazil shares land borders with most South American countries, but not Chile or Ecuador."]],"source":"https://infcis.iaea.org/udepo/Resources/Countries/Brazil.pdf"}};
/* Comprehensive Atlas K1.1 — integrate the pilot into the final active
   country renderer, which replaces the earlier enhancements.js markup. */
function countryArticle(){
 const base=coreCountryArticle();
 const pilot=gvAtlasContent[state.v4Code];
 if(!pilot)return base;
 const ar=state.lang==='ar';
 const choose=pair=>esc(pair[ar?0:1]);
 const sections=pilot.sections.map((part,i)=>
  '<details class="gv-comprehensive-section" '+(i===0?'open':'')+'>'+
  '<summary><span class="gv-comprehensive-num">'+String(i+1).padStart(2,'0')+'</span><strong>'+choose(part)+'</strong><span class="gv-comprehensive-arrow" aria-hidden="true">⌄</span></summary>'+
  '<p>'+esc(part[ar?2:3])+'</p></details>'
 ).join('');
 const panel='<section class="gv9-section gv-story-card gv-comprehensive" aria-labelledby="gvComprehensiveHeading">'+
  '<span class="eyebrow">COMPREHENSIVE ATLAS · PILOT</span>'+
  '<h2 id="gvComprehensiveHeading">'+choose(pilot.title)+'</h2>'+
  '<p class="gv-comprehensive-lead">'+lang('استكشف المعلومات الموسوعية من خلال الأقسام التالية.','Explore this country through six structured sections.')+'</p>'+
  sections+
  '<div class="gv-comprehensive-source"><strong>'+lang('مصدر إضافي','Additional source')+'</strong>'+
  '<a href="'+esc(pilot.source)+'" target="_blank" rel="noopener noreferrer">'+lang('الاطلاع على المصدر','View source')+' ↗</a>'+
  '<small>'+lang('محتوى تجريبي قيد التحقق التحريري. الإحصاءات المتغيرة تُذكر منفصلة مع مصدرها وسنتها.','Pilot educational content pending editorial review. Dynamic statistics are separately sourced and dated.')+'</small></div></section>';
 const marker='<section class="gv9-section gv9-earth">';
 return base.includes(marker)?base.replace(marker,panel+marker):base+panel;
}
const prevRender=render;
render=function(){
 prevRender();
 if(state.page==='country-v4'){
  const root=document.getElementById('main');if(root)root.innerHTML=countryArticle();
 }else if(state.page==='detail')cleanLandmark();
};
document.addEventListener('click',e=>{
 const btn=e.target.closest?.('.gv9-neighbor[data-v4-country]');
 if(btn){e.preventDefault();e.stopImmediatePropagation();setPage('country-v4',btn.dataset.v4Country)}
},true);
async function load(){
 try{
  const [facts,locales]=await Promise.all([fetch('./country-facts.json').then(r=>{if(!r.ok)throw Error('facts unavailable');return r.json()}),fetch('./geo-localization.json').then(r=>r.json())]);
  countryInfo.facts=facts.byCode;countryInfo.locales=locales;countryInfo.ready=true;
  if(state.page==='country-v4')render();
 }catch(err){console.warn('Some encyclopedia facts unavailable',err);countryInfo.ready=false}
}
load();
G.GeoVersePhase2={countryInfo,countryArticle,cleanLandmark};
})();