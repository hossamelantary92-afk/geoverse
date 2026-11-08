/* GeoVerse v232: accessible, simple-language interactive solar system. */
(function(){
'use strict';
if(!window.GeoVerseAstronomyV231 || typeof categoryPage!=='function')return;
const astro=window.GeoVerseAstronomyV231;
const simplified=[["sun","الشمس كرة هائلة من الغاز الساخن. هي مصدر الضوء والدفء على الأرض، وجاذبيتها تُبقي الكواكب في مداراتها.","The Sun is a huge ball of hot gas. It gives Earth light and warmth, and its gravity keeps the planets in orbit.","لو اختفت الشمس فلن يصلنا ضوؤها بعد نحو 8 دقائق.","If the Sun vanished, we would stop seeing its light about eight minutes later."],["mercury","عطارد أقرب كوكب للشمس وأصغر الكواكب. سطحه مليء بالحفر ويصبح شديد الحرارة نهارًا وشديد البرودة ليلًا.","Mercury is the nearest planet to the Sun and the smallest. Its cratered surface is very hot by day and cold by night.","سنة عطارد قصيرة جدًا: 88 يومًا أرضيًا.","A year on Mercury lasts only 88 Earth days."],["venus","الزهرة يقارب الأرض في الحجم، لكنه أسخن كوكب بسبب الغلاف الجوي السميك الذي يحبس الحرارة.","Venus is close to Earth in size, but its thick atmosphere traps heat, making it the hottest planet.","الزهرة أسخن من عطارد رغم أنه أبعد عن الشمس.","Venus is hotter than Mercury even though it is farther from the Sun."],["earth","الأرض بيتنا في الفضاء. فيها ماء سائل وهواء مناسب للحياة. دورانها يصنع الليل والنهار، وميلها يساعد على حدوث الفصول.","Earth is our home in space, with liquid water and air that supports life. Its rotation brings day and night, and its tilt brings seasons.","نعيش على الكوكب الوحيد الذي نعرف يقينًا أن عليه حياة.","Earth is the only world known with certainty to host life."],["moon","القمر يدور حول الأرض. شكله يبدو متغيرًا في السماء لأننا نرى جزءًا مختلفًا من نصفه المضاء بالشمس كل ليلة.","The Moon goes around Earth. Its shape seems to change because we see different portions of its sunlit half.","القمر لا يضيء من نفسه؛ بل يعكس ضوء الشمس.","The Moon does not make its own light; it reflects sunlight."],["mars","المريخ عالم صحراوي بارد، ولونه أحمر بسبب الحديد في تربته. نبحث فيه عن آثار مياه قديمة واحتمال ظروف مناسبة للحياة سابقًا.","Mars is a cold desert world, red because of iron in its soil. Scientists study signs of ancient water and possible past habitable conditions.","يوم المريخ أطول من يوم الأرض بنحو 39 دقيقة.","A day on Mars is about 39 minutes longer than on Earth."],["jupiter","المشتري أضخم الكواكب. هو كرة غازات عملاقة تغطيها سحب وعواصف، ومنها بقعة حمراء كبيرة جدًا.","Jupiter is the biggest planet. It is a giant ball of gas with cloudy bands and huge storms, including the Great Red Spot.","يمكن أن تتسع مساحة داخل حجم المشتري لأكثر من ألف كرة بحجم الأرض.","More than a thousand Earth-sized spheres could fit within Jupiter's volume."],["saturn","زحل مشهور بحلقاته الجميلة. الحلقات ليست قطعة واحدة؛ بل أعداد هائلة من قطع الجليد والصخور تدور حوله.","Saturn is famous for its beautiful rings. They are not solid; they are countless bits of ice and rock orbiting the planet.","حلقات زحل واسعة جدًا لكنها رقيقة نسبيًا.","Saturn's rings are extremely wide yet relatively thin."],["uranus","أورانوس كوكب بارد أزرق مخضر. يدور مائلًا بشدة، كأنه يتدحرج حول الشمس على جانبه.","Uranus is a cold blue-green planet. It is tilted so much that it almost rolls around the Sun on its side.","بسبب ميله الكبير تستمر فصوله سنوات طويلة.","Its unusual tilt creates seasons that last many years."],["neptune","نبتون أبعد الكواكب الثمانية عن الشمس. عالم أزرق شديد البرودة، وفي غلافه الجوي رياح قوية للغاية.","Neptune is the farthest of the eight planets. It is a very cold blue world with incredibly fast winds.","تستغرق سنة نبتون نحو 165 سنة أرضية.","One Neptune year lasts about 165 Earth years."],["dwarf","بلوتو عالم صغير جليدي وراء نبتون. يُسمى كوكبًا قزمًا لأنه لا يستوفي كل شروط تصنيف الكواكب الثمانية.","Pluto is a small icy world beyond Neptune. It is a dwarf planet because it does not meet all the rules used for the eight planets.","بلوتو لم يختفِ؛ الذي تغيّر هو تصنيفه العلمي.","Pluto did not disappear; its scientific category changed."],["seasons","تحدث الفصول لأن الأرض مائلة أثناء دورانها حول الشمس. حين تصِل أشعة الشمس بصورة أكثر مباشرة إلى نصف كرة يكون فيه صيف غالبًا.","Seasons happen because Earth is tilted as it goes around the Sun. A hemisphere receiving more direct sunlight generally has summer.","الصيف والشتاء ليسا بسبب اقتراب الأرض من الشمس وابتعادها.","Summer and winter are not caused by Earth moving nearer to or farther from the Sun."],["eclipses","الكسوف يعني أن القمر يحجب الشمس عن جزء من الأرض. والخسوف يعني أن الأرض تحجب ضوء الشمس عن القمر بظلها.","A solar eclipse is when the Moon hides the Sun from part of Earth. A lunar eclipse is when Earth casts its shadow on the Moon.","لا يحدث الكسوف أو الخسوف كل شهر لأن مدار القمر مائل قليلًا.","Eclipses do not happen every month because the Moon's orbit is tilted."],["galaxy","مجموعتنا الشمسية جزء صغير من مجرة اسمها درب التبانة. تخيل مدينة ضخمة من مليارات النجوم، والشمس واحدة منها.","Our Solar System is a tiny part of the Milky Way. Imagine a huge city of billions of stars, and our Sun is just one.","السنة الضوئية ليست مدة زمنية؛ إنها مسافة يقطعها الضوء خلال سنة.","A light-year is not a time duration; it is the distance light travels in one year."]];
const byId=Object.fromEntries(simplified.map(v=>[v[0],v]));
astro.entries.forEach(e=>{const v=byId[e.id];if(v){e.descAr=v[1];e.descEn=v[2];e.plainAr=v[3];e.plainEn=v[4];}});
const planets=[
 {id:'mercury',ar:'عطارد',en:'Mercury',au:.387,radius:.383,year:88,hex:'#b7aca6',tone:'gray',noteAr:'صغير وقريب من الشمس',noteEn:'Small and close to the Sun'},
 {id:'venus',ar:'الزهرة',en:'Venus',au:.723,radius:.949,year:225,hex:'#dfb56e',tone:'gold',noteAr:'أكثر الكواكب سخونة',noteEn:'The hottest planet'},
 {id:'earth',ar:'الأرض',en:'Earth',au:1,radius:1,year:365.25,hex:'#378de3',tone:'blue',noteAr:'كوكبنا وموطن الحياة',noteEn:'Our home world'},
 {id:'mars',ar:'المريخ',en:'Mars',au:1.524,radius:.532,year:687,hex:'#ce7257',tone:'red',noteAr:'الكوكب الأحمر',noteEn:'The Red Planet'},
 {id:'jupiter',ar:'المشتري',en:'Jupiter',au:5.203,radius:11.21,year:4333,hex:'#d7b08c',tone:'striped',noteAr:'أكبر كوكب في النظام',noteEn:'The largest planet'},
 {id:'saturn',ar:'زحل',en:'Saturn',au:9.58,radius:9.45,year:10759,hex:'#d5c28c',tone:'ringed',noteAr:'صاحب الحلقات الشهيرة',noteEn:'Famous for its rings'},
 {id:'uranus',ar:'أورانوس',en:'Uranus',au:19.2,radius:4.01,year:30687,hex:'#89d6dd',tone:'cyan',noteAr:'يدور مائلًا على جانبه',noteEn:'Tilted almost sideways'},
 {id:'neptune',ar:'نبتون',en:'Neptune',au:30.1,radius:3.88,year:60190,hex:'#4263dc',tone:'deepblue',noteAr:'أبعد الكواكب الثمانية',noteEn:'Farthest of the eight'}
];
const T=(a,b)=>state.lang==='ar'?a:b;
const tr=(s)=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let active='earth',mode='orbit',paused=false;
function formatOrbit(year){
 return year<1000?Math.round(year)+' '+T('يومًا أرضيًا','Earth days'):
 (year/365.25).toFixed(1)+' '+T('سنة أرضية','Earth years');
}
function activePane(){
 const p=planets.find(p=>p.id===active)||planets[2];
 const counterpart=astro.entries.find(e=>e.id===p.id);
 return '<div class="gv232-selected"><span class="gv232-selected-kicker">'+T('الكوكب المختار','SELECTED PLANET')+'</span><h3>'+T(p.ar,p.en)+'</h3><p>'+tr(T(counterpart?.descAr||p.noteAr,counterpart?.descEn||p.noteEn))+'</p>'+
 '<div class="gv232-selected-facts"><div><small>'+T('البعد عن الشمس','Distance from Sun')+'</small><strong>'+p.au+' AU</strong></div><div><small>'+T('الحجم مقارنة بالأرض','Radius vs Earth')+'</small><strong>'+p.radius+'×</strong></div><div><small>'+T('طول السنة','Length of year')+'</small><strong>'+formatOrbit(p.year)+'</strong></div></div>'+
 '<button class="gv232-explore" type="button" data-astro-open="'+astro.entries.findIndex(e=>e.id===p.id)+'">'+T('اعرف أكثر عن ','Learn more about ')+T(p.ar,p.en)+' ←</button></div>';
}
function stage(){
 const w=planets.map((p,i)=>{
   const scale=26+i*20, size=Math.max(8,Math.min(32,10+Math.sqrt(p.radius)*6));
   return '<div class="gv232-orbit-ring" style="--r:'+scale+'px"></div>'+
   '<button class="gv232-world '+p.tone+(active===p.id?' selected':'')+'" data-astro-planet="'+p.id+'" aria-label="'+T(p.ar,p.en)+'" aria-pressed="'+(active===p.id)+'" style="--r:'+scale+'px;--size:'+size+'px;--delay:'+(i*-.38)+'s;--speed:'+(18+i*8)+'s;--planet:'+p.hex+'"><span class="gv232-orbit-carrier"><i class="gv232-world-disc"></i></span></button>';
 }).join('');
 return '<div class="gv232-stage '+(paused?'gv232-paused':'')+'"><div class="gv232-stars"></div><div class="gv232-sun" aria-label="'+T('الشمس','Sun')+'"></div>'+w+'</div>';
}
function comparison(){
 const max=mode==='size'?11.21:30.1;
 return '<div class="gv232-bars">'+planets.map(p=>{
  const v=mode==='size'?p.radius:p.au,percent=Math.max(2,v/max*100);
  return '<button class="gv232-bar-row'+(active===p.id?' selected':'')+'" data-astro-planet="'+p.id+'"><span class="gv232-bar-label">'+T(p.ar,p.en)+'</span><span class="gv232-bar-track"><i style="width:'+percent+'%;background:'+p.hex+'"></i></span><b>'+v+(mode==='size'?'×':' AU')+'</b></button>';
 }).join('')+'</div>';
}
function model(){
 return '<section class="gv232-shell" aria-labelledby="gv232-title"><header class="gv232-heading"><div><span class="gv231-eyebrow">INTERACTIVE SOLAR SYSTEM</span><h2 id="gv232-title">'+T('جولة في المجموعة الشمسية','Explore the Solar System')+'</h2><p>'+T('اضغط على أي كوكب لتعرف حكايته ببساطة، أو قارن أحجام الكواكب وبعدها عن الشمس.','Choose any planet to learn its story in simple words, or compare the planets by size and distance.')+'</p></div></header>'+
 '<div class="gv232-tabs" role="group" aria-label="'+T('طريقة العرض','View mode')+'"><button data-astro-mode="orbit" class="'+(mode==='orbit'?'active':'')+'">'+T('المدارات','Orbits')+'</button><button data-astro-mode="size" class="'+(mode==='size'?'active':'')+'">'+T('الأحجام','Sizes')+'</button><button data-astro-mode="distance" class="'+(mode==='distance'?'active':'')+'">'+T('المسافات','Distances')+'</button></div>'+
 '<div class="gv232-layout"><div class="gv232-canvas"><div class="gv232-scene">'+(mode==='orbit'?stage():comparison())+'</div><div class="gv232-controls"><span>'+ (mode==='orbit'?T('رسم للتوضيح؛ ليس بمقياس حقيقي','Illustration, not to scale'):mode==='size'?T('نصف القطر مقارنة بالأرض = 1','Planetary radius compared with Earth = 1'):T('متوسط البعد عن الشمس بوحدة AU','Average distance from the Sun in AU'))+'</span>'+(mode==='orbit'?'<button type="button" data-astro-pause="1">'+(paused?T('تشغيل الحركة','Resume motion'):T('إيقاف الحركة','Pause motion'))+'</button>':'')+'</div></div><div class="gv232-info" aria-live="polite">'+activePane()+'</div></div>'+
 '<p class="gv232-legend">'+T('AU تعني وحدة فلكية: المسافة المتوسطة بين الأرض والشمس، أي نحو 150 مليون كيلومتر. في عرض المدارات ليست الأحجام والمسافات والسرعات حقيقية، والدوائر للتوضيح فقط.','AU means astronomical unit: the average Earth–Sun distance, about 150 million kilometers. Orbit view does not show true sizes, spacing or speeds.')+'</p></section>';
}
function renderWidget(){
 const node=document.querySelector('.gv232-shell');if(!node)return;
 const next=model();const tmp=document.createElement('div');tmp.innerHTML=next;
 node.replaceWith(tmp.firstElementChild);
}
/* Standalone solar experience is now rendered by the astronomy hub router. */
function ensureSolarSystem(){return false;}
const previousDetail=detail;
detail=function(){
 const html=previousDetail.apply(this,arguments);
 if(state.category!=='astronomy')return html;
 const e=astro.entries[Number(state.item)];if(!e)return html;
 const plain='<div class="gv232-simplified"><strong>'+T('ببساطة','In simple words')+'</strong><p>'+tr(T(e.plainAr||'',e.plainEn||''))+'</p></div>';
 return html.replace('<div class="gv231-period">',plain+'<div class="gv231-period">');
};
document.addEventListener('click',e=>{
 const p=e.target.closest('[data-astro-planet]');
 if(p){e.preventDefault();e.stopImmediatePropagation();active=p.dataset.astroPlanet;renderWidget();return}
 const m=e.target.closest('[data-astro-mode]');
 if(m){e.preventDefault();e.stopImmediatePropagation();mode=m.dataset.astroMode;renderWidget();return}
 const pause=e.target.closest('[data-astro-pause]');
 if(pause){e.preventDefault();e.stopImmediatePropagation();paused=!paused;renderWidget();}
},true);
window.GeoVerseSolarSystemV232={planets,getSelection:()=>active,model,ensure:ensureSolarSystem};
/* Initial render may have happened before this extension loaded, including a restored category. */

})();