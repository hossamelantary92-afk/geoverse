/* GeoVerse v234 — Imagine a planet visit + your planetary age.
 * Scientific reference: NASA Planetary Fact Sheet and NASA Science Planets.
 * A "planetary age" counts orbits; human biological ageing is unchanged.
 */
(function(){
'use strict';
const solar=window.GeoVerseSolarSystemV232,atlas=window.GeoVerseAstronomyV231;
if(!solar||!atlas||typeof categoryPage!=='function'||typeof detail!=='function')return;
const stories=[{"id":"mercury","ar":"عطارد","en":"Mercury","sceneAr":"هتشوف أرضًا صخرية مليئة بالحفر، وسماء سوداء تقريبًا حتى في النهار؛ لأنه لا يملك غلافًا جويًا حقيقيًا.","sceneEn":"You would see a crater-covered rocky landscape and an almost black sky even in daylight, because it has virtually no atmosphere.","standAr":"له سطح صلب، لكن لا يمكن الوقوف عليه دون حماية فضائية كاملة بسبب الفراغ والفروق الحرارية الشديدة.","standEn":"It has solid ground, but you cannot stand there unprotected because of the near vacuum and extreme temperatures.","wowAr":"الشمس هتبدو أكبر مما تراها من الأرض، والنهار الواحد طويل جدًا.","wowEn":"The Sun would appear larger than from Earth, and a single solar day would be extremely long.","typeAr":"سطح صخري","typeEn":"Rocky surface"},{"id":"venus","ar":"الزهرة","en":"Venus","sceneAr":"تخيل عالمًا تغطيه سحب كثيفة، وضوءًا خافتًا يصل إلى السطح وسط جو شديد السخونة والضغط.","sceneEn":"Imagine a world hidden beneath thick clouds, with dim sunlight reaching an intensely hot, high-pressure surface.","standAr":"سطحه صخري، لكن الحرارة والضغط هناك كفيلان بإتلاف معظم المعدات بسرعة؛ الوقوف عليه دون حماية غير ممكن.","standEn":"It has solid ground, but extreme heat and pressure destroy most equipment quickly; standing there unprotected is impossible.","wowAr":"رغم إنه أبعد عن الشمس من عطارد، الزهرة أكثر منه سخونة بسبب غلافه الجوي.","wowEn":"Even though Venus is farther from the Sun than Mercury, its atmosphere makes it hotter.","typeAr":"سطح صخري","typeEn":"Rocky surface"},{"id":"earth","ar":"الأرض","en":"Earth","sceneAr":"هتشوف محيطات زرقاء وقارات وغيومًا بيضاء، وكل ده وسط غلاف جوي بيسمح لينا بالتنفس.","sceneEn":"You would see blue oceans, continents and white clouds within an atmosphere that lets us breathe.","standAr":"هي المكان الوحيد اللي نعرف بشكل مؤكد إن الإنسان يقدر يعيش فيه طبيعيًا.","standEn":"It is the only world known for certain to support humans naturally.","wowAr":"الفرق بين الصيف والشتاء سببه ميل الأرض، مش مجرد قربها أو بعدها عن الشمس.","wowEn":"Seasons come from Earth's tilt, not simply its distance from the Sun.","typeAr":"سطح صخري","typeEn":"Rocky surface"},{"id":"mars","ar":"المريخ","en":"Mars","sceneAr":"تخيل صحراء حمراء واسعة، وجبالًا هائلة وسماءً تميل للون الوردي وقت الغروب أحيانًا.","sceneEn":"Imagine vast red deserts, giant mountains and a sky that can take unusual colors at sunset.","standAr":"له سطح صلب، لكن الهواء رقيق جدًا وغير صالح للتنفس، والجو بارد؛ هتحتاج بدلة مضغوطة ومصدر أكسجين.","standEn":"It has solid ground, but air is thin and unbreathable and the planet is cold; you would need a pressurized suit and oxygen.","wowAr":"اليوم على المريخ قريب من يوم الأرض: نحو 24 ساعة و39 دقيقة.","wowEn":"A Martian day is close to an Earth day: about 24 hours and 39 minutes.","typeAr":"سطح صخري","typeEn":"Rocky surface"},{"id":"jupiter","ar":"المشتري","en":"Jupiter","sceneAr":"هتشوف أحزمة هائلة من السحب وعواصف ضخمة، أشهرها البقعة الحمراء العظيمة.","sceneEn":"You would see enormous cloud bands and gigantic storms, including the Great Red Spot.","standAr":"المشتري عملاق غازي، مفيش له سطح صلب تمشي عليه؛ وكل ما تنزل للداخل الضغط والحرارة بيزيدوا بشدة.","standEn":"Jupiter is a gas giant with no solid surface to walk on; pressure and temperature rise dramatically deeper inside.","wowAr":"أقمار المشتري من أكثر الأماكن المثيرة للبحث العلمي، خصوصًا أوروبا.","wowEn":"Jupiter's moons are fascinating places for research, especially Europa.","typeAr":"بلا سطح صلب","typeEn":"No solid surface"},{"id":"saturn","ar":"زحل","en":"Saturn","sceneAr":"تخيل رؤية حلقات ضخمة من قطع الجليد والصخور تمتد حول كوكب ذهبي محاط بالغيوم.","sceneEn":"Imagine vast rings of icy and rocky pieces surrounding a golden, cloudy planet.","standAr":"زحل عملاق غازي؛ الحلقات مش أرض تمشي عليها، والكوكب نفسه مفيش له سطح صلب.","standEn":"Saturn is a gas giant; its rings are not ground to walk on, and the planet has no solid surface.","wowAr":"تيتان وإنسيلادوس من أقمار زحل التي يدرسها العلماء باهتمام كبير.","wowEn":"Titan and Enceladus are among Saturn's most scientifically interesting moons.","typeAr":"بلا سطح صلب","typeEn":"No solid surface"},{"id":"uranus","ar":"أورانوس","en":"Uranus","sceneAr":"هتشوف كوكبًا أزرق مخضرًا باردًا جدًا، وغيومًا في عالم تدور فيه الفصول بطريقة غير مألوفة.","sceneEn":"You would see a very cold blue-green world with clouds and unusually long seasons.","standAr":"أورانوس عملاق جليدي، لكنه مش كرة جليد صلبة تقدر تقف عليها؛ مفيش سطح صلب واضح ومتاح للوقوف.","standEn":"Uranus is an ice giant, not a solid ice ball you can stand on; there is no accessible solid surface.","wowAr":"ميله الشديد بيخلي بعض مناطقه تواجه فترات طويلة من الضوء أو الظلام.","wowEn":"Its extreme tilt gives some regions long periods of sunlight or darkness.","typeAr":"بلا سطح صلب","typeEn":"No solid surface"},{"id":"neptune","ar":"نبتون","en":"Neptune","sceneAr":"تخيل عالمًا أزرق بعيدًا جدًا عن الشمس، مضطرب السحب ورياحه من أقوى الرياح المعروفة في المجموعة الشمسية.","sceneEn":"Imagine a distant blue world with turbulent clouds and some of the fastest winds known in the Solar System.","standAr":"نبتون عملاق جليدي مفيش له سطح صلب نقدر نقف عليه، وكمان شديد البرودة وعواصفه عنيفة.","standEn":"Neptune is an ice giant with no solid surface to stand on; it is also extremely cold and stormy.","wowAr":"السنة على نبتون أطول من متوسط عمر الإنسان بكثير: حوالي 165 سنة أرضية.","wowEn":"A year on Neptune is far longer than a typical human lifetime: roughly 165 Earth years.","typeAr":"بلا سطح صلب","typeEn":"No solid surface"}];
const byId=Object.fromEntries(stories.map(p=>[p.id,p]));
const periods=Object.fromEntries(solar.planets.map(p=>[p.id,p.year]));
const t=(ar,en)=>state.lang==='ar'?ar:en;
const esc=x=>String(x??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
let chosen=solar.getSelection()||'earth',earthAge=25;
function ageOn(id){
 const year=periods[id];
 return year>0?earthAge*365.25/year:0;
}
function fmt(value){return new Intl.NumberFormat(state.lang==='ar'?'ar-EG':'en-US',{maximumFractionDigits:1,minimumFractionDigits:0}).format(value)}
function cards(){
 return stories.map(p=>'<button type="button" data-gv234-planet="'+p.id+'" class="gv234-planet-tab '+(chosen===p.id?'selected':'')+'" aria-pressed="'+(chosen===p.id)+'">'+t(p.ar,p.en)+'</button>').join('');
}
function account(){
 const p=byId[chosen]||byId.earth;const age=ageOn(p.id);
 return '<div class="gv234-content"><article class="gv234-visit"><div class="gv234-overline">'+t('رحلة تخيلية','IMAGINARY EXPEDITION')+'</div><h3>'+t('لو زرت ','If you visited ')+t(p.ar,p.en)+'...</h3>'+
 '<p class="gv234-lead">'+esc(t(p.sceneAr,p.sceneEn))+'</p>'+
 '<div class="gv234-stand"><span>'+t('هل يمكنك الوقوف هناك؟','Could you stand there?')+'</span><strong>'+t(p.typeAr,p.typeEn)+'</strong><p>'+esc(t(p.standAr,p.standEn))+'</p></div>'+
 '<div class="gv234-fun"><span aria-hidden="true">✦</span><p>'+esc(t(p.wowAr,p.wowEn))+'</p></div></article>'+
 '<article class="gv234-age"><div class="gv234-overline">'+t('حاسبة العمر الفلكي','PLANETARY AGE CALCULATOR')+'</div><h3>'+t('كم سنة عمرك هناك؟','How old would you be there?')+'</h3>'+
 '<label for="gv234-age-input">'+t('عمرك على الأرض بالسنوات','Your age in Earth years')+'</label>'+
 '<div class="gv234-age-control"><input id="gv234-age-input" type="number" inputmode="decimal" min="0" max="120" step="1" value="'+earthAge+'" aria-describedby="gv234-age-note"/><input aria-label="'+t('اختيار العمر','Choose age')+'" id="gv234-age-range" type="range" min="0" max="120" step="1" value="'+earthAge+'"/></div>'+
 '<div class="gv234-result"><small>'+t('عدد السنوات التي مرّت على ','Number of years on ')+t(p.ar,p.en)+'</small><strong id="gv234-age-result">'+fmt(age)+'</strong><span>'+t('سنة كوكبية','planetary years')+'</span></div>'+
 '<p class="gv234-formula">'+t('لأن سنة ','Because a year on ')+t(p.ar,p.en)+t(' تستغرق ',' takes ')+fmt(periods[p.id]/365.25)+' '+t('سنة أرضية تقريبًا.','Earth years approximately.')+'</p>'+
 '<p class="gv234-note" id="gv234-age-note">'+t('دي طريقة مختلفة لعدّ السنين، مش معناها إن جسمك بيكبر أسرع أو أبطأ. العمر البيولوجي لا يتغيّر بسبب اسم الكوكب.','This counts years differently. It does not mean your body ages faster or slower; biological ageing is unchanged.')+'</p></article></div>';
}
function widget(context){
 if(context==='detail'){
  const e=atlas.entries[Number(state.item)];
  if(!e||!byId[e.id])return '';
  chosen=e.id;
 }
 return '<section class="gv234-root" data-gv234-context="'+context+'" aria-labelledby="gv234-title"><div class="gv234-heading"><div><span class="gv231-eyebrow">SPACE EXPERIENCE</span><h2 id="gv234-title">'+t('تخيل رحلتك بين الكواكب','Imagine a Journey Among Planets')+'</h2><p>'+t('اختار كوكبًا، تخيّل شكله وظروفه، واكتشف معنى اختلاف طول السنة من كوكب للتاني.','Pick a planet, imagine its environment, and explore how the length of a year changes from world to world.')+'</p></div></div>'+
 (context==='category'?'<div class="gv234-planet-tabs" role="group" aria-label="'+t('اختيار الكوكب','Select a planet')+'">'+cards()+'</div>':'')+
 account()+'<p class="gv234-disclaimer">'+t('التجربة تعليمية وتخيلية. الوقوف على الكواكب الأخرى غير آمن دون تقنيات متقدمة، وبعض الكواكب ليس لها سطح صلب أصلًا.','An educational imaginary experience. Visiting other planets is unsafe without advanced technology, and some planets have no solid surface at all.')+'</p></section>';
}
function syncControls(){
 const root=document.querySelector('.gv234-root');if(!root)return;
 const number=root.querySelector('#gv234-age-input'),range=root.querySelector('#gv234-age-range');
 const result=root.querySelector('#gv234-age-result');
 if(number)number.value=earthAge;if(range)range.value=earthAge;
 if(result)result.textContent=fmt(ageOn(chosen));
}
function updatePanel(){
 const root=document.querySelector('.gv234-root');if(!root)return;
 const content=root.querySelector('.gv234-content');
 if(content){const tmp=document.createElement('div');tmp.innerHTML=account();content.replaceWith(tmp.firstElementChild);}
 root.querySelectorAll('[data-gv234-planet]').forEach(btn=>{
  const selected=btn.dataset.gv234Planet===chosen;
  btn.classList.toggle('selected',selected);
  btn.setAttribute('aria-pressed',String(selected));
 });
}
/* The astronomy hub now owns the standalone experience page. */
function mount(){return false;}
document.addEventListener('click',event=>{
 const tab=event.target.closest('[data-gv234-planet]');
 if(!tab)return;
 event.preventDefault();event.stopPropagation();
 if(!byId[tab.dataset.gv234Planet])return;
 chosen=tab.dataset.gv234Planet;
 updatePanel();
},true);
document.addEventListener('input',event=>{
 const target=event.target;if(target.id!=='gv234-age-input'&&target.id!=='gv234-age-range')return;
 const value=Number(target.value);
 if(!Number.isFinite(value))return;
 earthAge=Math.min(120,Math.max(0,value));
 syncControls();
},true);
window.GeoVersePlanetExperienceV234={stories,calculateAge:(planet,age)=>Number(age)*365.25/periods[planet],mount,widget};
})();