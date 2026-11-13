/* GeoVerse v168 – tourist attractions pilot: 12 countries, 48 curated places.
   Existing geographic layers, map quiz and 3D globe remain unchanged. */
(function(){
'use strict';
const attractions=[{"countryAr":"مصر","countryEn":"Egypt","cityAr":"الجيزة","cityEn":"Giza","ar":"أهرامات الجيزة","en":"Pyramids of Giza","lat":29.9792,"lon":31.1342,"wiki":"Giza_pyramid_complex"},{"countryAr":"مصر","countryEn":"Egypt","cityAr":"الجيزة","cityEn":"Giza","ar":"أبو الهول","en":"Great Sphinx of Giza","lat":29.9753,"lon":31.1376,"wiki":"Great_Sphinx_of_Giza"},{"countryAr":"مصر","countryEn":"Egypt","cityAr":"الأقصر","cityEn":"Luxor","ar":"معبد الكرنك","en":"Karnak Temple","lat":25.7188,"lon":32.6573,"wiki":"Karnak"},{"countryAr":"مصر","countryEn":"Egypt","cityAr":"أسوان","cityEn":"Aswan","ar":"معبد أبو سمبل","en":"Abu Simbel Temples","lat":22.336,"lon":31.6258,"wiki":"Abu_Simbel"},{"countryAr":"فرنسا","countryEn":"France","cityAr":"باريس","cityEn":"Paris","ar":"برج إيفل","en":"Eiffel Tower","lat":48.8584,"lon":2.2945,"wiki":"Eiffel_Tower"},{"countryAr":"فرنسا","countryEn":"France","cityAr":"باريس","cityEn":"Paris","ar":"متحف اللوفر","en":"Louvre Museum","lat":48.8606,"lon":2.3376,"wiki":"Louvre"},{"countryAr":"فرنسا","countryEn":"France","cityAr":"فرساي","cityEn":"Versailles","ar":"قصر فرساي","en":"Palace of Versailles","lat":48.8049,"lon":2.1204,"wiki":"Palace_of_Versailles"},{"countryAr":"فرنسا","countryEn":"France","cityAr":"نورماندي","cityEn":"Normandy","ar":"مون سان ميشيل","en":"Mont-Saint-Michel","lat":48.6361,"lon":-1.5115,"wiki":"Mont-Saint-Michel"},{"countryAr":"إيطاليا","countryEn":"Italy","cityAr":"روما","cityEn":"Rome","ar":"الكولوسيوم","en":"Colosseum","lat":41.8902,"lon":12.4922,"wiki":"Colosseum"},{"countryAr":"إيطاليا","countryEn":"Italy","cityAr":"بيزا","cityEn":"Pisa","ar":"برج بيزا المائل","en":"Leaning Tower of Pisa","lat":43.723,"lon":10.3966,"wiki":"Leaning_Tower_of_Pisa"},{"countryAr":"إيطاليا","countryEn":"Italy","cityAr":"روما","cityEn":"Rome","ar":"نافورة تريفي","en":"Trevi Fountain","lat":41.9009,"lon":12.4833,"wiki":"Trevi_Fountain"},{"countryAr":"إيطاليا","countryEn":"Italy","cityAr":"ميلانو","cityEn":"Milan","ar":"كاتدرائية ميلانو","en":"Milan Cathedral","lat":45.4642,"lon":9.1919,"wiki":"Milan_Cathedral"},{"countryAr":"السعودية","countryEn":"Saudi Arabia","cityAr":"مكة المكرمة","cityEn":"Mecca","ar":"المسجد الحرام","en":"Masjid al-Haram","lat":21.4225,"lon":39.8262,"wiki":"Masjid_al-Haram"},{"countryAr":"السعودية","countryEn":"Saudi Arabia","cityAr":"المدينة المنورة","cityEn":"Medina","ar":"المسجد النبوي","en":"Prophet's Mosque","lat":24.4672,"lon":39.6112,"wiki":"Prophet%27s_Mosque"},{"countryAr":"السعودية","countryEn":"Saudi Arabia","cityAr":"العلا","cityEn":"AlUla","ar":"الحِجر","en":"Hegra","lat":26.7917,"lon":37.952,"wiki":"Hegra_(Mada%27in_Salih)"},{"countryAr":"السعودية","countryEn":"Saudi Arabia","cityAr":"الدرعية","cityEn":"Diriyah","ar":"حي الطريف التاريخي","en":"At-Turaif District","lat":24.7349,"lon":46.5728,"wiki":"At-Turaif_District"},{"countryAr":"تركيا","countryEn":"Turkey","cityAr":"إسطنبول","cityEn":"Istanbul","ar":"آيا صوفيا","en":"Hagia Sophia","lat":41.0086,"lon":28.9802,"wiki":"Hagia_Sophia"},{"countryAr":"تركيا","countryEn":"Turkey","cityAr":"إسطنبول","cityEn":"Istanbul","ar":"المسجد الأزرق","en":"Blue Mosque","lat":41.0054,"lon":28.9768,"wiki":"Sultan_Ahmed_Mosque"},{"countryAr":"تركيا","countryEn":"Turkey","cityAr":"إسطنبول","cityEn":"Istanbul","ar":"قصر توبكابي","en":"Topkapi Palace","lat":41.0115,"lon":28.9833,"wiki":"Topkapı_Palace"},{"countryAr":"تركيا","countryEn":"Turkey","cityAr":"كابادوكيا","cityEn":"Cappadocia","ar":"متحف غوريم المفتوح","en":"Göreme Open Air Museum","lat":38.6402,"lon":34.8456,"wiki":"Göreme_Open_Air_Museum"},{"countryAr":"إسبانيا","countryEn":"Spain","cityAr":"برشلونة","cityEn":"Barcelona","ar":"ساغرادا فاميليا","en":"Sagrada Família","lat":41.4036,"lon":2.1744,"wiki":"Sagrada_Família"},{"countryAr":"إسبانيا","countryEn":"Spain","cityAr":"غرناطة","cityEn":"Granada","ar":"قصر الحمراء","en":"Alhambra","lat":37.1761,"lon":-3.5881,"wiki":"Alhambra"},{"countryAr":"إسبانيا","countryEn":"Spain","cityAr":"مدريد","cityEn":"Madrid","ar":"متحف برادو","en":"Prado Museum","lat":40.4138,"lon":-3.6921,"wiki":"Museo_del_Prado"},{"countryAr":"إسبانيا","countryEn":"Spain","cityAr":"قرطبة","cityEn":"Córdoba","ar":"مسجد قرطبة الكبير","en":"Mosque–Cathedral of Córdoba","lat":37.8789,"lon":-4.7794,"wiki":"Mosque–Cathedral_of_Córdoba"},{"countryAr":"المملكة المتحدة","countryEn":"United Kingdom","cityAr":"لندن","cityEn":"London","ar":"برج لندن","en":"Tower of London","lat":51.5081,"lon":-0.0759,"wiki":"Tower_of_London"},{"countryAr":"المملكة المتحدة","countryEn":"United Kingdom","cityAr":"لندن","cityEn":"London","ar":"ساعة بيغ بن","en":"Big Ben","lat":51.5007,"lon":-0.1246,"wiki":"Big_Ben"},{"countryAr":"المملكة المتحدة","countryEn":"United Kingdom","cityAr":"لندن","cityEn":"London","ar":"المتحف البريطاني","en":"British Museum","lat":51.5194,"lon":-0.1269,"wiki":"British_Museum"},{"countryAr":"المملكة المتحدة","countryEn":"United Kingdom","cityAr":"ويلتشير","cityEn":"Wiltshire","ar":"ستونهنج","en":"Stonehenge","lat":51.1789,"lon":-1.8262,"wiki":"Stonehenge"},{"countryAr":"الولايات المتحدة","countryEn":"United States","cityAr":"نيويورك","cityEn":"New York","ar":"تمثال الحرية","en":"Statue of Liberty","lat":40.6892,"lon":-74.0445,"wiki":"Statue_of_Liberty"},{"countryAr":"الولايات المتحدة","countryEn":"United States","cityAr":"نيويورك","cityEn":"New York","ar":"سنترال بارك","en":"Central Park","lat":40.7829,"lon":-73.9654,"wiki":"Central_Park"},{"countryAr":"الولايات المتحدة","countryEn":"United States","cityAr":"واشنطن","cityEn":"Washington, D.C.","ar":"نصب لنكولن التذكاري","en":"Lincoln Memorial","lat":38.8893,"lon":-77.0502,"wiki":"Lincoln_Memorial"},{"countryAr":"الولايات المتحدة","countryEn":"United States","cityAr":"أريزونا","cityEn":"Arizona","ar":"غراند كانيون","en":"Grand Canyon","lat":36.1069,"lon":-112.1129,"wiki":"Grand_Canyon"},{"countryAr":"الصين","countryEn":"China","cityAr":"بكين","cityEn":"Beijing","ar":"المدينة المحرمة","en":"Forbidden City","lat":39.9163,"lon":116.3972,"wiki":"Forbidden_City"},{"countryAr":"الصين","countryEn":"China","cityAr":"بكين","cityEn":"Beijing","ar":"معبد السماء","en":"Temple of Heaven","lat":39.8822,"lon":116.4066,"wiki":"Temple_of_Heaven"},{"countryAr":"الصين","countryEn":"China","cityAr":"شيآن","cityEn":"Xi'an","ar":"جيش التيراكوتا","en":"Terracotta Army","lat":34.3853,"lon":109.2785,"wiki":"Terracotta_Army"},{"countryAr":"الصين","countryEn":"China","cityAr":"بادالينغ","cityEn":"Badaling","ar":"سور الصين العظيم في بادالينغ","en":"Great Wall at Badaling","lat":40.3596,"lon":116.02,"wiki":"Badaling"},{"countryAr":"الهند","countryEn":"India","cityAr":"أغرا","cityEn":"Agra","ar":"تاج محل","en":"Taj Mahal","lat":27.1751,"lon":78.0421,"wiki":"Taj_Mahal"},{"countryAr":"الهند","countryEn":"India","cityAr":"دلهي","cityEn":"Delhi","ar":"القلعة الحمراء","en":"Red Fort","lat":28.6562,"lon":77.241,"wiki":"Red_Fort"},{"countryAr":"الهند","countryEn":"India","cityAr":"جايبور","cityEn":"Jaipur","ar":"قصر الرياح","en":"Hawa Mahal","lat":26.9239,"lon":75.8267,"wiki":"Hawa_Mahal"},{"countryAr":"الهند","countryEn":"India","cityAr":"نيودلهي","cityEn":"New Delhi","ar":"قطب منار","en":"Qutb Minar","lat":28.5244,"lon":77.1855,"wiki":"Qutb_Minar"},{"countryAr":"اليابان","countryEn":"Japan","cityAr":"كيوتو","cityEn":"Kyoto","ar":"معبد كينكاكو جي","en":"Kinkaku-ji","lat":35.0394,"lon":135.7292,"wiki":"Kinkaku-ji"},{"countryAr":"اليابان","countryEn":"Japan","cityAr":"كيوتو","cityEn":"Kyoto","ar":"فوشيمي إيناري","en":"Fushimi Inari Shrine","lat":34.9671,"lon":135.7727,"wiki":"Fushimi_Inari-taisha"},{"countryAr":"اليابان","countryEn":"Japan","cityAr":"طوكيو","cityEn":"Tokyo","ar":"برج طوكيو","en":"Tokyo Tower","lat":35.6586,"lon":139.7454,"wiki":"Tokyo_Tower"},{"countryAr":"اليابان","countryEn":"Japan","cityAr":"طوكيو","cityEn":"Tokyo","ar":"معبد سينسوجي","en":"Sensō-ji","lat":35.7148,"lon":139.7967,"wiki":"Sensō-ji"},{"countryAr":"الإمارات","countryEn":"United Arab Emirates","cityAr":"دبي","cityEn":"Dubai","ar":"برج خليفة","en":"Burj Khalifa","lat":25.192,"lon":55.2815,"wiki":"Burj_Khalifa"},{"countryAr":"الإمارات","countryEn":"United Arab Emirates","cityAr":"أبوظبي","cityEn":"Abu Dhabi","ar":"جامع الشيخ زايد الكبير","en":"Sheikh Zayed Grand Mosque","lat":24.4128,"lon":54.4749,"wiki":"Sheikh_Zayed_Grand_Mosque"},{"countryAr":"الإمارات","countryEn":"United Arab Emirates","cityAr":"دبي","cityEn":"Dubai","ar":"برواز دبي","en":"Dubai Frame","lat":25.2355,"lon":55.3001,"wiki":"Dubai_Frame"},{"countryAr":"الإمارات","countryEn":"United Arab Emirates","cityAr":"دبي","cityEn":"Dubai","ar":"متحف المستقبل","en":"Museum of the Future","lat":25.2194,"lon":55.2819,"wiki":"Museum_of_the_Future"},{"countryAr":"تايلاند","countryEn":"Thailand","cityAr":"بانكوك","cityEn":"Bangkok","ar":"القصر الكبير","en":"Grand Palace","lat":13.75,"lon":100.4913,"wiki":"Grand_Palace"},{"countryAr":"تايلاند","countryEn":"Thailand","cityAr":"بانكوك","cityEn":"Bangkok","ar":"معبد وات آرون","en":"Wat Arun","lat":13.7437,"lon":100.4889,"wiki":"Wat_Arun"},{"countryAr":"تايلاند","countryEn":"Thailand","cityAr":"بانكوك","cityEn":"Bangkok","ar":"معبد بوذا المتكئ (وات فو)","en":"Wat Pho","lat":13.7465,"lon":100.493,"wiki":"Wat_Pho"},{"countryAr":"تايلاند","countryEn":"Thailand","cityAr":"أيوثايا","cityEn":"Ayutthaya","ar":"متنزه أيوثايا التاريخي","en":"Ayutthaya Historical Park","lat":14.3568,"lon":100.5684,"wiki":"Ayutthaya_Historical_Park"},{"countryAr":"إندونيسيا","countryEn":"Indonesia","cityAr":"ماجيلانغ","cityEn":"Magelang","ar":"معبد بوروبودور","en":"Borobudur","lat":-7.6079,"lon":110.2038,"wiki":"Borobudur"},{"countryAr":"إندونيسيا","countryEn":"Indonesia","cityAr":"برامبانان","cityEn":"Prambanan","ar":"مجمع معابد برامبانان","en":"Prambanan","lat":-7.752,"lon":110.4914,"wiki":"Prambanan"},{"countryAr":"إندونيسيا","countryEn":"Indonesia","cityAr":"بالي","cityEn":"Bali","ar":"معبد تاناه لوت","en":"Tanah Lot","lat":-8.6212,"lon":115.0868,"wiki":"Tanah_Lot"},{"countryAr":"إندونيسيا","countryEn":"Indonesia","cityAr":"جاكرتا","cityEn":"Jakarta","ar":"النصب الوطني (موناس)","en":"National Monument (Monas)","lat":-6.1754,"lon":106.8272,"wiki":"National_Monument_(Indonesia)"},{"countryAr":"كوريا الجنوبية","countryEn":"South Korea","cityAr":"سيول","cityEn":"Seoul","ar":"قصر غيونغبوكغونغ","en":"Gyeongbokgung Palace","lat":37.5796,"lon":126.977,"wiki":"Gyeongbokgung"},{"countryAr":"كوريا الجنوبية","countryEn":"South Korea","cityAr":"سيول","cityEn":"Seoul","ar":"قرية بوكتشون هانوك","en":"Bukchon Hanok Village","lat":37.5827,"lon":126.9835,"wiki":"Bukchon_Hanok_Village"},{"countryAr":"كوريا الجنوبية","countryEn":"South Korea","cityAr":"سيول","cityEn":"Seoul","ar":"برج إن سيول","en":"N Seoul Tower","lat":37.5512,"lon":126.9882,"wiki":"N_Seoul_Tower"},{"countryAr":"كوريا الجنوبية","countryEn":"South Korea","cityAr":"غيونغجو","cityEn":"Gyeongju","ar":"معبد بولغوكسا","en":"Bulguksa Temple","lat":35.79,"lon":129.3321,"wiki":"Bulguksa"},{"countryAr":"فيتنام","countryEn":"Vietnam","cityAr":"هانوي","cityEn":"Hanoi","ar":"معبد الأدب","en":"Temple of Literature","lat":21.0281,"lon":105.8356,"wiki":"Temple_of_Literature,_Hanoi"},{"countryAr":"فيتنام","countryEn":"Vietnam","cityAr":"هوي آن","cityEn":"Hội An","ar":"مدينة هوي آن القديمة","en":"Hội An Ancient Town","lat":15.8801,"lon":108.338,"wiki":"Hội_An"},{"countryAr":"فيتنام","countryEn":"Vietnam","cityAr":"كوانغ نينه","cityEn":"Quảng Ninh","ar":"خليج ها لونغ","en":"Hạ Long Bay","lat":20.9101,"lon":107.1839,"wiki":"Hạ_Long_Bay"},{"countryAr":"فيتنام","countryEn":"Vietnam","cityAr":"هيو","cityEn":"Huế","ar":"المدينة الإمبراطورية في هيو","en":"Imperial City of Huế","lat":16.4698,"lon":107.5779,"wiki":"Imperial_City_of_Huế"}
];
const category='tourism';
const t=(ar,en)=>document.documentElement.lang==='en'?en:ar;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const categoryDef={id:category,ar:'المزارات السياحية',en:'Tourist Attractions',emoji:'🏛️',img:'photo-1735446918160-af0b896b7a89',descAr:'من أهرامات الجيزة إلى جبل فوجي، اكتشف قصص معالم شكّلها الإنسان والطبيعة.',descEn:'From the Pyramids of Giza to Mount Fuji, explore the stories behind landmarks shaped by people and nature.'};
if(typeof cats==='undefined'||typeof geo==='undefined'||typeof explore!=='function')return;
if(!cats.some(c=>c.id===category))cats.push(categoryDef);
if(typeof topicDefinitions!=='undefined')topicDefinitions.tourism=[
 'المزارات السياحية مواقع تاريخية وثقافية ومعمارية وطبيعية يقصدها الزوار للتعرف على حضارات العالم وتراثه. من أشهر أمثلتها الأهرامات وأبو الهول.',
 'Tourist attractions are historic, cultural, architectural, and natural places visited to explore the world’s heritage, including the Pyramids and the Sphinx.'
];
geo[category]=attractions.map(a=>[a.ar,a.en,
 '📍 '+a.cityAr+'، '+a.countryAr+' · مزار سياحي بارز. استكشف موقعه وتعرّف على تاريخه عبر المصدر المرجعي.',
 '📍 '+a.cityEn+', '+a.countryEn+' · A notable attraction. Explore its location and historical background using the reference link.',
 a.lat,a.lon]);
const prevExplore=explore;
explore=function(){
 const doc=new DOMParser().parseFromString(prevExplore.apply(this,arguments),'text/html');
 const toolbar=doc.getElementById('mapToolbar');
 if(toolbar&&!toolbar.querySelector('[data-layer="tourism"]')){
  const section=doc.createElement('section');section.className='gv146-group gv146-culture';
  const heading=doc.createElement('h2');heading.className='gv146-group-title';
  heading.textContent=t('المعالم السياحية والثقافية','Tourism & culture');
  section.appendChild(heading);
  const grid=doc.createElement('div');grid.className='gv146-group-grid';
  const button=doc.createElement('button');button.type='button';button.dataset.layer='tourism';
  button.textContent=t('🏛️ المزارات السياحية','🏛️ Tourist attractions');grid.appendChild(button);
  section.appendChild(grid);
  const tools=toolbar.querySelector('.gv146-actions');toolbar.insertBefore(section,tools||null);
 }
 return doc.body.innerHTML;
};
const prevDetail=detail;
detail=function(){
 const html=prevDetail.apply(this,arguments);
 if(state.category!==category||!attractions[state.item])return html;
 const a=attractions[state.item];
 const doc=new DOMParser().parseFromString(html,'text/html');
 const page=doc.querySelector('.gv14-detail');
 if(page){
  const info=doc.createElement('section');info.className='gv168-location';
  info.innerHTML='<strong>📍 '+esc(t(a.cityAr+', '+a.countryAr,a.cityEn+', '+a.countryEn))+'</strong>'+
    '<a href="https://en.wikipedia.org/wiki/'+encodeURI(a.wiki)+'" target="_blank" rel="noopener noreferrer">'+t('المصدر والمزيد من المعلومات ↗','Reference and more information ↗')+'</a>';
  const overview=page.querySelector('.gv14-overview');
  page.insertBefore(info,overview||page.firstChild);
 }
 return doc.body.innerHTML;
};
function attachPhoto(){
 // v192: all tourism detail photography comes from GeoVerseTourismPhotoCatalog.
 // The old Wikipedia summary thumbnail could revive an outdated image.
 if(state.category===category)return;
 if(state.page!=='detail'||state.category!==category)return;
 const a=attractions[state.item],box=document.getElementById('gvArticlePhoto');
 if(!a||!box||box.dataset.gv168Photo)return;
 box.dataset.gv168Photo='1';
 // Wikipedia preview is optional, never show a substituted or unverified image.
 fetch('https://en.wikipedia.org/api/rest_v1/page/summary/'+encodeURIComponent(decodeURIComponent(a.wiki)),{headers:{Accept:'application/json'}})
 .then(r=>{if(!r.ok)throw Error('preview unavailable');return r.json()})
 .then(data=>{
  if(!box.isConnected||!data.thumbnail?.source)return;
  const img=document.createElement('img');img.loading='lazy';img.decoding='async';
  img.alt=t('صورة: ','Photo: ')+t(a.ar,a.en);
  img.addEventListener('load',()=>box.classList.add('gv14-has-photo'));
  img.addEventListener('error',()=>img.remove());box.prepend(img);img.src=data.thumbnail.source;
 })
 .catch(()=>{});
}
const prevRender=render;
render=function(){
 const result=prevRender.apply(this,arguments);
 attachPhoto();
 return result;
};
// The page is already mounted by the core app before extension scripts load.
if(document.getElementById('main'))render();
})();
