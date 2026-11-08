/* GeoVerse v235 — independent astronomy experiences. */
(function(){
'use strict';
const astronomy=window.GeoVerseAstronomyV231;
const solar=window.GeoVerseSolarSystemV232;
const planet=window.GeoVersePlanetExperienceV234;
if(!astronomy||!solar?.model||!planet?.widget||typeof categoryPage!=='function')return;
const T=(ar,en)=>state.lang==='ar'?ar:en;
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const views=new Set(['solar','journey']);
let current='overview';
function back(){
 return '<button class="gv235-back" type="button" data-gv235-view="overview"><span aria-hidden="true">→</span>'+T('الرجوع إلى الجغرافيا الفلكية','Back to Astronomical Geography')+'</button>';
}
function featureCards(){
 return '<section class="gv235-feature-hub"><div class="gv235-head"><div><h2>'+T('تجارب فلكية تفاعلية','Interactive Space Experiences')+'</h2></div></div><div class="gv235-features">'+
 '<button type="button" class="gv235-feature gv235-feature-solar" data-gv235-view="solar"><span class="gv235-picture" aria-hidden="true"></span><span class="gv235-shade"></span><span class="gv235-content"><strong>'+T('جولة في المجموعة الشمسية','Explore the Solar System')+'</strong><span>'+T('شاهد مدارات الكواكب، واكتشف أحجامها والمسافات بينها بطريقة سهلة.','Explore the orbits and compare the sizes and distances of the planets.')+'</span><span class="gv235-launch">'+T('ابدأ الجولة','Start exploring')+' <b aria-hidden="true">↗</b></span></span></button>'+
 '<button type="button" class="gv235-feature gv235-feature-journey" data-gv235-view="journey"><span class="gv235-picture" aria-hidden="true"></span><span class="gv235-shade"></span><span class="gv235-content"><strong>'+T('تخيّل رحلتك بين الكواكب','Imagine a Journey Among Planets')+'</strong><span>'+T('اعرف شكل الحياة على كل كوكب، واحسب عمرك بالسنوات الكوكبية.','Imagine each planet and discover your age in planetary years.')+'</span><span class="gv235-launch">'+T('ابدأ الرحلة','Start the journey')+' <b aria-hidden="true">↗</b></span></span></button></div></section>';
}
function experience(view){
 const isSolar=view==='solar';
 const inner=isSolar?solar.model():planet.widget('category');
 const title=isSolar?T('جولة في المجموعة الشمسية','Explore the Solar System'):T('تخيّل رحلتك بين الكواكب','Imagine a Journey Among Planets');
 return '<div class="gv231-wrap gv235-experience-page" data-gv235-page="'+view+'">'+back()+'<div class="gv235-context"><h1>'+escape(title)+'</h1></div>'+inner+
 '<div class="gv235-foot"><button type="button" data-gv235-view="overview">'+T('العودة لكل موضوعات الجغرافيا الفلكية','Return to all astronomy topics')+' →</button></div></div>';
}
const previousCategory=categoryPage;
categoryPage=function(){
 const original=previousCategory.apply(this,arguments);
 if(state.category!=='astronomy')return original;
 return views.has(current)?experience(current):original.replace('<div class="gv231-section-title">',featureCards()+'<div class="gv231-section-title">');
};
function open(view){
 if(view!=='overview'&&!views.has(view))return;
 current=view;
 setPage('category','astronomy');
}
document.addEventListener('click',e=>{
 const trigger=e.target.closest('[data-gv235-view]');
 if(trigger){e.preventDefault();e.stopImmediatePropagation();open(trigger.dataset.gv235View);return}
 const entry=e.target.closest('[data-cat="astronomy"]');
 if(entry)current='overview';
},true);
window.GeoVerseAstronomyExperiencesV235={open,getView:()=>current};
if(state.page==='category'&&state.category==='astronomy')render();
})();