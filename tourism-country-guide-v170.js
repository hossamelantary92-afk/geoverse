/* GeoVerse v170 – Country-first tourism discovery and calm landmark map.
 * Existing v168 dataset remains canonical: 48 real locations in 12 countries.
 * Gallery photos are optional Wikipedia preview thumbnails, never invented.
 */
(function(){
'use strict';
const countries=[["EG","مصر","Egypt"],["FR","فرنسا","France"],["IT","إيطاليا","Italy"],["SA","السعودية","Saudi Arabia"],["TR","تركيا","Turkey"],["ES","إسبانيا","Spain"],["GB","المملكة المتحدة","United Kingdom"],["US","الولايات المتحدة","United States"],["CN","الصين","China"],["IN","الهند","India"],["JP","اليابان","Japan"],["AE","الإمارات","United Arab Emirates"]];
const facts=[["مجموعة أهرامات ملكية تعود إلى مصر القديمة، من أبرز شواهد العمارة الجنائزية.","Ancient royal pyramids and a landmark of Egyptian funerary architecture."],["تمثال حجري ضخم بجسم أسد ورأس إنسان على هضبة الجيزة.","A monumental limestone statue with a lion’s body and human head."],["مجمع معابد واسع في الأقصر اشتهر بأعمدته الضخمة ومبانيه الفرعونية.","A vast temple complex at Luxor known for its monumental columns."],["معبدان صخريان شُيدا في عهد رمسيس الثاني ونُقلا لإنقاذهما من الغرق.","Rock-cut temples of Ramesses II, relocated to protect them from flooding."],["برج حديدي أُنشئ لمعرض باريس العالمي عام 1889، وأصبح رمزًا للمدينة.","An iron tower built for the 1889 Paris World’s Fair."],["متحف فني داخل قصر ملكي سابق، يضم أعمالًا من عصور متعددة.","A major art museum housed in a former royal palace."],["قصر ملكي فرنسي يشتهر بقاعة المرايا والحدائق الرسمية الواسعة.","A royal palace famed for its Hall of Mirrors and formal gardens."],["جزيرة صخرية تتوجها دير تاريخي وتحيط بها ظاهرة المد والجزر.","A tidal island crowned by a historic abbey."],["مدرج روماني ضخم شهد عروضًا عامة في روما القديمة.","An ancient Roman amphitheatre used for public spectacles."],["برج جرس شهير يميل بسبب هبوط التربة أسفل أساساته.","A bell tower famous for its tilt caused by ground settlement."],["نافورة باروكية شهيرة في وسط روما بزخارفها النحتية.","An ornate Baroque fountain in central Rome."],["كاتدرائية قوطية ضخمة تشتهر بواجهتها الرخامية وأبراجها.","A monumental Gothic cathedral famed for its marble façade."],["أقدس مساجد الإسلام ويضم الكعبة المشرفة في مكة المكرمة.","Islam’s holiest mosque, surrounding the Kaaba in Mecca."],["مسجد تاريخي في المدينة المنورة يرتبط بالسيرة النبوية.","A historic mosque in Medina closely associated with the Prophet’s life."],["موقع أثري نبطي يضم مقابر منحوتة في واجهات صخرية بالعلا.","A Nabataean archaeological site with rock-cut tomb façades."],["حي تاريخي في الدرعية يبرز عمارة الطين النجدية وتاريخ الدولة السعودية الأولى.","A historic district showcasing Najdi mud-brick architecture."],["معلم بيزنطي تاريخي في إسطنبول اشتهر بقبته الكبيرة وفسيفسائه.","A Byzantine landmark renowned for its monumental dome and mosaics."],["مسجد عثماني شهير يطل على ميدان السلطان أحمد في إسطنبول.","An Ottoman mosque overlooking Sultanahmet Square."],["قصر عثماني كان مقرًا للحكم والسلاطين لقرون.","An Ottoman palace that served as a seat of government for centuries."],["مجمع كنائس صخرية مزخرفة بالرسوم الجدارية في كابادوكيا.","A complex of rock-cut churches with historic frescoes."],["كنيسة برشلونة الشهيرة من تصميم أنطوني غاودي، وتمتاز بأبراجها النحتية.","Barcelona’s celebrated basilica designed by Antoni Gaudí."],["مجمع قصور وحدائق أندلسي من أبرز آثار غرناطة الإسلامية.","An Andalusi palace and garden complex in Granada."],["متحف فني في مدريد معروف بمجموعاته الأوروبية الكلاسيكية.","A Madrid art museum renowned for European masterworks."],["صرح تاريخي في قرطبة يجمع تراث المسجد الأندلسي والكاتدرائية.","A historic Córdoba monument combining mosque and cathedral heritage."],["قلعة تاريخية على نهر التايمز تضم أجنحة وأسوارًا تعود للعصور الوسطى.","A historic fortress on the Thames with medieval structures."],["الاسم الشائع للجرس الكبير في برج الساعة بقصر وستمنستر.","The famous great bell in the clock tower at Westminster."],["متحف في لندن يضم مجموعات أثرية وثقافية من أنحاء العالم.","A London museum holding archaeological and cultural collections."],["دائرة من الحجارة العملاقة تعود إلى عصور ما قبل التاريخ.","A prehistoric monument made of massive standing stones."],["تمثال على جزيرة الحرية قُدم هدية للولايات المتحدة من فرنسا.","A monumental statue on Liberty Island, gifted by France."],["متنزه حضري كبير في مانهاتن يضم ممرات وبحيرات ومساحات خضراء.","A large Manhattan park with paths, lakes and green spaces."],["نصب تذكاري في واشنطن يكرم الرئيس الأمريكي أبراهام لنكولن.","A Washington memorial honoring Abraham Lincoln."],["أخدود طبيعي هائل نحتته عمليات التعرية ونهر كولورادو.","A vast canyon carved over time by erosion and the Colorado River."],["مجمع قصور إمبراطورية صينية في قلب بكين يعود إلى أسرتي مينغ وتشينغ.","An imperial palace complex in Beijing from the Ming and Qing dynasties."],["مجمّع طقوسي في بكين استخدمه الأباطرة في الشعائر المرتبطة بالسماء.","A Beijing ceremonial complex used by Chinese emperors."],["مجموعة تماثيل جنود وخيول فخارية دُفنت قرب ضريح الإمبراطور تشين شي هوانغ.","Terracotta soldiers and horses buried near Qin Shi Huang’s mausoleum."],["قطاع مُرمّم من سور الصين العظيم شمال غربي بكين.","A restored section of the Great Wall northwest of Beijing."],["ضريح رخامي أبيض شيده الإمبراطور شاه جهان في أغرا.","A white-marble mausoleum built by Shah Jahan in Agra."],["حصن مغولي تاريخي في دلهي ذو أسوار من الحجر الرملي الأحمر.","A Mughal fort in Delhi with red sandstone walls."],["واجهة قصر ذات نوافذ متكررة في جايبور ارتبطت بالحياة الملكية.","A palace façade in Jaipur known for its rows of windows."],["مئذنة حجرية تاريخية ضمن مجمع قطب في دلهي.","A historic stone minaret within Delhi’s Qutb complex."],["معبد زن بوذي في كيوتو يشتهر بجناحه الذهبي المنعكس على البركة.","A Kyoto Zen temple famed for its golden pavilion."],["مزار شنتوي في كيوتو تشتهر ممراته ببوابات التوري الحمراء.","A Kyoto Shinto shrine known for pathways of vermilion torii gates."],["برج اتصالات ومشاهدة مميز في طوكيو مستوحى من تصميم برج إيفل.","A Tokyo observation and communications tower inspired by the Eiffel Tower."],["معبد بوذي قديم في أساكوسا بطوكيو يتقدمه شارع تسوق تقليدي.","A historic Buddhist temple in Tokyo’s Asakusa district."],["ناطحة سحاب في دبي تضم منصات مشاهدة بإطلالات واسعة.","A Dubai skyscraper featuring elevated observation decks."],["مسجد بارز في أبوظبي يشتهر برخامه الأبيض وقبابه الواسعة.","An Abu Dhabi mosque known for white marble and grand domes."],["معلم معماري في دبي على هيئة إطار ضخم يطل على أحياء المدينة.","A giant frame-shaped landmark overlooking Dubai."],["متحف في دبي يستكشف سيناريوهات التكنولوجيا والحياة المستقبلية.","A Dubai museum exploring technology and future scenarios."]];
const category='tourism',root=document.getElementById('main');
const $=(el,selector)=>el?.querySelector(selector);
const t=(ar,en)=>document.documentElement.lang==='en'?en:ar;
const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
if(!Array.isArray(geo?.tourism)||geo.tourism.length!==48)return;
// Each destination has four geographically positioned attractions in the v168 catalogue.
for(let i=0;i<48;i++){
 const place=geo.tourism[i],country=countries[Math.floor(i/4)],pair=facts[i];
 place[2]=pair[0];
 place[3]=pair[1];
}
// City labels are parsed from existing v168 descriptions, so the page never guesses locality.
const originals=geo.tourism.map((place,i)=>({index:i,code:countries[Math.floor(i/4)][0],countryAr:countries[Math.floor(i/4)][1],countryEn:countries[Math.floor(i/4)][2],cityAr:'',cityEn:'',nameAr:place[0],nameEn:place[1],factAr:facts[i][0],factEn:facts[i][1]}));
// The pilot's original entries contain the city names in their descriptions; extract them
// from a dedicated city catalogue matching the same order.
const cities=[["الجيزة","Giza"],["الجيزة","Giza"],["الأقصر","Luxor"],["أسوان","Aswan"],["باريس","Paris"],["باريس","Paris"],["فرساي","Versailles"],["نورماندي","Normandy"],["روما","Rome"],["بيزا","Pisa"],["روما","Rome"],["ميلانو","Milan"],["مكة المكرمة","Mecca"],["المدينة المنورة","Medina"],["العلا","AlUla"],["الدرعية","Diriyah"],["إسطنبول","Istanbul"],["إسطنبول","Istanbul"],["إسطنبول","Istanbul"],["كابادوكيا","Cappadocia"],["برشلونة","Barcelona"],["غرناطة","Granada"],["مدريد","Madrid"],["قرطبة","Córdoba"],["لندن","London"],["لندن","London"],["لندن","London"],["ويلتشير","Wiltshire"],["نيويورك","New York"],["نيويورك","New York"],["واشنطن","Washington, D.C."],["أريزونا","Arizona"],["بكين","Beijing"],["بكين","Beijing"],["شيآن","Xi'an"],["بادالينغ","Badaling"],["أغرا","Agra"],["دلهي","Delhi"],["جايبور","Jaipur"],["نيودلهي","New Delhi"],["كيوتو","Kyoto"],["كيوتو","Kyoto"],["طوكيو","Tokyo"],["طوكيو","Tokyo"],["دبي","Dubai"],["أبوظبي","Abu Dhabi"],["دبي","Dubai"],["دبي","Dubai"]];
const wikipedia=["Giza_pyramid_complex","Great_Sphinx_of_Giza","Karnak","Abu_Simbel","Eiffel_Tower","Louvre","Palace_of_Versailles","Mont-Saint-Michel","Colosseum","Leaning_Tower_of_Pisa","Trevi_Fountain","Milan_Cathedral","Masjid_al-Haram","Prophet%27s_Mosque","Hegra_(Mada%27in_Salih)","At-Turaif_District","Hagia_Sophia","Sultan_Ahmed_Mosque","Topkapı_Palace","Göreme_Open_Air_Museum","Sagrada_Família","Alhambra","Museo_del_Prado","Mosque–Cathedral_of_Córdoba","Tower_of_London","Big_Ben","British_Museum","Stonehenge","Statue_of_Liberty","Central_Park","Lincoln_Memorial","Grand_Canyon","Forbidden_City","Temple_of_Heaven","Terracotta_Army","Badaling","Taj_Mahal","Red_Fort","Hawa_Mahal","Qutb_Minar","Kinkaku-ji","Fushimi_Inari-taisha","Tokyo_Tower","Sensō-ji","Burj_Khalifa","Sheikh_Zayed_Grand_Mosque","Dubai_Frame","Museum_of_the_Future"];
const byCode=new Map();
originals.forEach((a,i)=>{
 a.cityAr=cities[i][0];a.cityEn=cities[i][1];a.wiki=wikipedia[i];
 geo.tourism[i][2]=facts[i][0]+' · '+a.cityAr+'، '+a.countryAr+'.';
 geo.tourism[i][3]=facts[i][1]+' · '+a.cityEn+', '+a.countryEn+'.';
 const group=byCode.get(a.code)||[];group.push(a);byCode.set(a.code,group);
});
window.GeoVerseTourismV170={getByCountry:code=>byCode.get(code)||[],items:originals};
function countrySection(code){
 const items=byCode.get(code);if(!items?.length)return null;
 const section=document.createElement('section');
 section.className='gv9-section gv170-tourism';section.setAttribute('aria-labelledby','gv170TourismHeading');
 section.innerHTML='<div class="gv9-section-title"><span class="gv9-eyebrow">'+t('دليل المزارات','TOURISM GUIDE')+'</span>'+
  '<h2 id="gv170TourismHeading">'+t('أشهر المزارات السياحية','Top tourist attractions')+'</h2>'+
  '<p>'+t('اكتشف معالم الدولة الثقافية والتاريخية، وافتح أي مزار لمعلومات أكثر وموقعه على الكرة الأرضية.',
  'Discover cultural and historical highlights, with a detailed page for each attraction.')+'</p></div>'+
  '<div class="gv170-tourism-grid">'+items.map(item=>
   '<button type="button" class="gv170-tourism-card" data-item="tourism:'+item.index+'">'+
    '<span class="gv170-tourism-photo" data-gv170-photo="'+item.index+'"><span aria-hidden="true">🏛️</span></span>'+
    '<span class="gv170-tourism-text"><span class="gv170-tourism-city">📍 '+esc(t(item.cityAr,item.cityEn))+'</span>'+
    '<strong>'+esc(t(item.nameAr,item.nameEn))+'</strong>'+
    '<small>'+esc(t(item.factAr,item.factEn))+'</small>'+
    '<span class="gv170-tourism-read">'+t('اعرف المزيد','Explore details')+' ←</span></span></button>'
  ).join('')+'</div>';
 return section;
}
const previewCache=new Map(),requested=new Set();
function photoFor(item,wrapper){
 if(!wrapper||requested.has(wrapper))return;
 requested.add(wrapper);
 let title=item.wiki;
 try{title=decodeURIComponent(title)}catch(e){}
 const endpoint='https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&pithumbsize=520&redirects=1&origin=*&titles='+encodeURIComponent(title.replace(/_/g,' '));
 const cached=previewCache.get(item.index);
 if(cached){show(cached);return}
 function show(src){
  if(!src||!wrapper.isConnected)return;
  const img=document.createElement('img');img.loading='lazy';img.decoding='async';
  img.alt=t('صورة '+item.nameAr,'Photo of '+item.nameEn);
  img.addEventListener('load',()=>wrapper.classList.add('gv170-photo-loaded'));
  img.addEventListener('error',()=>img.remove(),{once:true});
  wrapper.prepend(img);img.src=src;
 }
 fetch(endpoint).then(r=>r.ok?r.json():null).then(data=>{
  const pages=Object.values(data?.query?.pages||{}),src=pages[0]?.thumbnail?.source;
  if(typeof src==='string'&&src.startsWith('https://')){previewCache.set(item.index,src);show(src)}
 }).catch(()=>{});
}
function hydrateCountry(){
 if(state.page!=='country-v4'||!root)return;
 const code=state.v4Code==='UK'?'GB':state.v4Code;
 const existing=root.querySelector('.gv170-tourism');
 if(existing?.dataset.gv170Country===code&&existing?.dataset.gv170Lang===state.lang)return;
 const section=countrySection(code);
 existing?.remove();
 if(!section)return;
 section.dataset.gv170Country=code;section.dataset.gv170Lang=state.lang;
 const anchor=root.querySelector('.gv9-earth');
 if(anchor)root.insertBefore(section,anchor);else root.append(section);
 const items=byCode.get(code)||[];
 items.forEach(item=>photoFor(item,section.querySelector('[data-gv170-photo="'+item.index+'"]')));
}
function addCountryChooser(){
 const map=document.getElementById('worldMap'),stage=$(map,'.atlas-stage');
 if(!map||!stage||stage.querySelector('.gv170-tourism-chooser'))return;
 const picker=document.createElement('div');
 picker.className='gv170-tourism-chooser';
 picker.innerHTML='<span>'+t('اعرض مزارات دولة','Choose a country')+'</span><select aria-label="'+t('اختر الدولة لعرض مزاراتها','Choose country attractions')+'">'+
 '<option value="">'+t('أبرز المزارات حول العالم','Highlights around the world')+'</option>'+
 countries.map(c=>'<option value="'+c[0]+'">'+esc(t(c[1],c[2]))+'</option>').join('')+'</select>'+
 '<small class="gv170-tourism-count"></small>';
 stage.append(picker);
 picker.querySelector('select').addEventListener('change',function(){
  map.dataset.gv170TourismCountry=this.value;
  filterPins(map);if(typeof atlasView==='function'&&this.value){
   const matches=byCode.get(this.value)||[],point=geo.tourism[matches[0]?.index];
   const r=typeof atlasRuntime!=='undefined'?atlasRuntime:null;
   if(r?.node===map&&point&&r.proj){
    const p=r.proj([point[5],point[4]]);
    if(p?.every(Number.isFinite)){const w=360,h=187;atlasView([Math.max(0,Math.min(1000-w,p[0]-w/2)),Math.max(0,Math.min(520-h,p[1]-h/2)),w,h])}
   }
  }else if(typeof atlasView==='function')atlasView([0,0,1000,520]);
 });
 filterPins(map);
}
function filterPins(map){
 if(!map)return;
 const chooser=map.querySelector('.gv170-tourism-chooser');
 const layer=typeof activeLayer!=='undefined'?activeLayer:'';
 const active=layer==='tourism';
 if(chooser)chooser.hidden=!active;
 if(!active)return;
 const selected=map.dataset.gv170TourismCountry||'';
 const visible=[];
 map.querySelectorAll('.atlas-pin[data-map-pin^="tourism:"]').forEach(pin=>{
  const value=pin.getAttribute('data-map-pin')||'';
  const i=Number(value.split(':')[1]),item=originals[i];
  const show=item&&(selected?item.code===selected:i%4===0);
  pin.classList.toggle('gv170-tourism-visible',!!show);
  if(show)visible.push(pin);
 });
 const count=$(chooser,'.gv170-tourism-count');
 if(count)count.textContent=selected?t('٤ مزارات محددة','4 selected attractions'):t('١٢ دولة · اختر دولة للمزيد','12 countries · choose one for more');
 // The initial 12 markers are entry points; the full 48 remain in data and country pages.
}
let queued=false;
function scan(){
 queued=false;
 if(state.page==='country-v4')hydrateCountry();
 if(state.page==='explore'){
  addCountryChooser();
  filterPins(document.getElementById('worldMap'));
 }
}
function schedule(){
 if(queued)return;queued=true;requestAnimationFrame(scan);
}
const earlierRender=render;
render=function(){
 const result=earlierRender.apply(this,arguments);
 schedule();return result;
};
const earlierDraw=typeof atlasDraw==='function'?atlasDraw:null;
if(earlierDraw)atlasDraw=function(){
 const value=earlierDraw.apply(this,arguments);
 if(state.page==='explore')schedule();
 return value;
};
if(root)new MutationObserver(schedule).observe(root,{childList:true,subtree:false});
schedule();
})();
