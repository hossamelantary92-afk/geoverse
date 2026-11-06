/* GeoVerse Phase 3.2 — Complete 18-category visual atlas.
 * All links, names and counts come from the existing geography data.
 * Photo replacements are specific photographic subjects, not generated illustrations.
 */
(function(){
'use strict';
const previousRender=render;
const I={
 countries:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-5 5-5 13 0 18 5-5 5-13 0-18"/>',
 continents:'<path d="M2 6 9 3l6 3 7-3v15l-7 3-6-3-7 3zM9 3v15m6-12v15"/>',
 oceans:'<path d="M2 8c3-3 5 3 8 0s5 3 8 0 3-1 4 0M2 14c3-3 5 3 8 0s5 3 8 0 3-1 4 0"/>',
 seas:'<path d="m12 3 6 12H6L12 3zm0 0v16M4 19c5 2 11 2 16 0"/>',
 deserts:'<path d="M2 19c3-7 7-9 11-3 3-3 6-3 9 3M2 22h20M18 3v7m-4-4h8"/>',
 rivers:'<path d="M5 2c10 4 10 8 2 11s-7 6 3 9M16 2c7 4 7 8 1 11s-5 6 4 9"/>',
 waterfalls:'<path d="M3 4h18v6H3zM7 10v10m5-10v11m5-11v10M4 22h16"/>',
 forests:'<path d="m7 2 5 9H2l5-9zm0 9v10M17 3l5 11H12l5-11zm0 11v7"/>',
 mountains:'<path d="m2 21 7-13 4 7 3-10 6 16zM6 14l3-6 3 7M14 12l2-7 3 9"/>',
 lakes:'<path d="M3 15c4-3 6 3 10 0s6 3 8 0M3 20c4-3 6 3 10 0s6 3 8 0M5 10l5-7 5 7"/>',
 islands:'<path d="M2 20h20M6 16c3-5 7-5 10 0M11 15V5m0 2c-2-3-5-3-7-2m7 2c3-3 6-3 8-2m-8 2c-2-1-4 1-5 4"/>',
 volcanoes:'<path d="m2 21 7-12 3 5 3-4 7 11H2zM10 7 12 2l2 5M6 4l1 2m10-3-1 3"/>',
 straits:'<path d="M3 3c5 3 5 6 0 9s-5 6 0 9M21 3c-5 3-5 6 0 9s5 6 0 9M8 12h8m-3-3 3 3-3 3"/>',
 gulfs:'<path d="M2 4h20v16H2zM3 12c5-8 7 8 12 0s5 1 7 2M8 20c-2-3-2-5 2-6"/>',
 glaciers:'<path d="m2 19 6-11 5 4 3-8 6 15zM8 8l3 6 2-2M3 22h18M6 5l2-3"/>',
 valleys:'<path d="m2 4 7 16 3-7 3 7 7-16M2 4h6m8 0h6M9 20l3-7 3 7"/>',
 climate:'<circle cx="9" cy="9" r="4"/><path d="M9 1v3M9 14v3M1 9h3m10 0h3M3 3l2 2m8 8 2 2M15 16a4 4 0 0 1 4-4 4 4 0 0 1 1 8H9"/>',
 grasslands:'<path d="M4 22V9m0 3L1 9m3 7 4-5M12 22V4m0 8 5-5m-5 9-5-5M20 22V9m0 5 3-4m-3 6-4-4"/>'
};
const PHOTO={
 islands:'photo-1612866506179-25d8ca1d1519',volcanoes:'photo-1663877254454-5e669a7b27e6',glaciers:'photo-1741388336551-753dc0ead7c6',
 lakes:'photo-1501785888041-af3ef285b470',
 valleys:'https://commons.wikimedia.org/wiki/Special:FilePath/Colorful_Grand_Canyon_(Unsplash).jpg?width=840',
 climate:'photo-1534088568595-a066f410bcda'
};
const THEMES={countries:'aqua',continents:'aqua',oceans:'blue',seas:'blue',deserts:'gold',rivers:'blue',waterfalls:'blue',forests:'green',mountains:'aqua',lakes:'blue',islands:'aqua',volcanoes:'gold',straits:'blue',gulfs:'blue',glaciers:'aqua',valleys:'gold',climate:'aqua',grasslands:'green'};
const icon=id=>'<svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(I[id]||I.continents)+'</svg>';
const tx=(ar,en)=>state.lang==='ar'?ar:en;
const labelFor=c=>state.lang==='ar'?c.ar:c.en;
function urlFor(c,size){
 // Actual source photography from Unsplash. No photo duplicates for different topic cards.
 const u=PHOTO[c.id]||c.img;return u.startsWith('https://')?u:im(u,size||840);
}
function topicCard(c){
 const name=labelFor(c),n=geo[c.id]?.length||0,theme=THEMES[c.id]||'aqua';
 return '<button type="button" class="gv12-card gv12-'+theme+'" data-cat="'+c.id+'" aria-label="'+escapeHTML(name)+'">'+
  '<img class="gv12-image" loading="lazy" decoding="async" src="'+urlFor(c,840)+'" alt="'+escapeHTML(tx('صورة فوتوغرافية: '+name,'Real photograph: '+name))+'">'+
  '<span class="gv12-card-bg" aria-hidden="true"></span><span class="gv12-card-mark" aria-hidden="true">'+icon(c.id)+'</span>'+
  '<span class="gv12-card-copy"><strong>'+escapeHTML(name)+'</strong><small>'+n+' '+tx('موقعًا ومعلمًا','places & landmarks')+'</small></span>'+
  '<span class="gv12-card-link" aria-hidden="true">↗</span></button>';
}
allCategories=function(){
 return '<section class="gv12-directory" aria-labelledby="gv12Heading">'+
  '<header class="gv12-head"><div class="gv12-headline"><span class="gv12-overline">'+tx('أطلسك المصوّر','THE VISUAL ATLAS')+'</span><h1 id="gv12Heading">'+tx('استكشف <em>كل الأقسام</em>','Explore <em>Every Topic</em>')+'</h1><p>'+tx('رحلة مصوّرة عبر الدول والقارات والطبيعة، بأقسام واضحة وصور فوتوغرافية حقيقية.','A photographic journey through countries, continents and the natural world.')+'</p></div>'+
  '<div class="gv12-head-count"><strong>'+cats.length+'</strong><span>'+tx('قسمًا جغرافيًا','Geography topics')+'</span></div></header>'+
  '<div class="gv12-directory-tools"><label for="gv12Search">'+tx('ابحث عن قسم','Find a category')+'</label><input type="search" id="gv12Search" autocomplete="off" placeholder="'+tx('اكتب اسم القسم...','Search categories...')+'" aria-controls="gv12Cards"><span class="gv12-count-note" id="gv12VisibleCount">'+cats.length+' / '+cats.length+'</span></div>'+
  '<div class="gv12-grid" id="gv12Cards">'+cats.map(topicCard).join('')+'</div>'+
  '<div id="gv12Empty" class="gv12-empty" hidden>'+tx('لا توجد أقسام مطابقة للبحث.','No matching categories.')+'</div>'+
  '<p class="gv12-directory-footnote">'+tx('الصور تعبر عن طبيعة كل قسم، وليست بالضرورة صورة لمعلم محدد داخله.','Photographs illustrate each topic and do not always depict a particular listed location.')+' <a href="https://commons.wikimedia.org/wiki/File:Colorful_Grand_Canyon_(Unsplash).jpg" target="_blank" rel="noopener noreferrer">'+tx('مصدر صورة الأخاديد','Canyon photo credit')+'</a></p>'+
  '</section>';
};
// Refresh all 18 existing topic-image references so topic banners share the same photography.
cats.forEach(c=>{if(PHOTO[c.id]&&!PHOTO[c.id].startsWith('https://'))c.img=PHOTO[c.id]});
categoryButtons=function(limit){
 return cats.slice(0,limit||cats.length).map(c=>topicCard(c)).join('');
};
renderMenu=function(){
 const menu=document.getElementById('categoryMenu');if(!menu)return;
 menu.innerHTML=cats.map(c=>'<button type="button" class="side-item '+(state.category===c.id?'current':'')+'" data-cat="'+c.id+'">'+
  '<span class="gv12-side-icon">'+icon(c.id)+'</span><span>'+escapeHTML(labelFor(c))+'</span><span class="side-arrow" aria-hidden="true">‹</span></button>').join('');
};
// Remove large emoji from category headings while retaining all the original lesson content.
const previousCategoryPage=categoryPage;
categoryPage=function(){
 const c=cats.find(x=>x.id===state.category);const html=previousCategoryPage();
 if(!c)return html;
 let cleaned=html.replace('<h1>'+c.emoji+' '+escapeHTML(labelFor(c))+'</h1>','<h1><span class="gv12-banner-icon">'+icon(c.id)+'</span>'+escapeHTML(labelFor(c))+'</h1>');
 if(c.id==='valleys')cleaned=cleaned.replace(im(c.img,1400),PHOTO.valleys);
 return cleaned;
};
document.addEventListener('input',event=>{
 if(event.target?.id!=='gv12Search')return;
 const search=event.target.value.trim().toLocaleLowerCase();
 let count=0;
 document.querySelectorAll('#gv12Cards .gv12-card').forEach(card=>{
  const c=cats.find(x=>x.id===card.dataset.cat);
  const words=(c.ar+' '+c.en+' '+c.descAr+' '+c.descEn).toLocaleLowerCase();
  const show=!search||words.includes(search);
  card.hidden=!show;if(show)count++;
 });
 const n=document.getElementById('gv12VisibleCount'),empty=document.getElementById('gv12Empty');
 if(n)n.textContent=count+' / '+cats.length;
 if(empty)empty.hidden=count!==0;
});
window.GeoVerseTopicsV12={topicCard,allCategories:()=>allCategories(),getPhotos:()=>PHOTO,iconFor:id=>icon(id)};
})();