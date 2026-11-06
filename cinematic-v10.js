/* GeoVerse Phase 3: cinematic landing without altering navigation or learning state.
 * Uses the existing single Globe.GL instance and existing 18 topic categories. */
(function(){
 'use strict';
 const previousHome=home;
 const icon=(name,size=20)=>typeof svgIcon==='function'?svgIcon(name,size):'';
 const t=(ar,en)=>state.lang==='ar'?ar:en;
 const allCount=()=>Object.values(geo).reduce((sum,list)=>sum+(Array.isArray(list)?list.length:0),0);
 function premiumHero(){
  const items=[
   {value:allCount()+'+',ar:'موقع ومعلم',en:'Places & landmarks'},
   {value:cats.length,ar:'قسمًا للاستكشاف',en:'Explore topics'},
   {value:gameModes.length,ar:'أنماط لعب',en:'Game modes'}
  ];
  return '<section class="gv10-hero" aria-labelledby="gv10HeroTitle">'+
   '<div class="gv10-nebula" aria-hidden="true"></div><div class="gv10-starfield" aria-hidden="true"></div>'+
   '<div class="gv10-inner">'+
    '<div class="gv10-copy">'+
     '<div class="gv10-eyebrow"><span class="gv10-eyebrow-diamond">✧</span><span>'+t('بوابتك لاكتشاف العالم','YOUR GATEWAY TO EARTH')+'</span></div>'+
     '<h1 id="gv10HeroTitle">'+t('العالم بين <em>إيديك</em>','The World at <em>Your Fingertips</em>')+'</h1>'+
     '<p class="gv10-lead">'+t('اكتشف القارات والدول وأعماق المحيطات عبر كرة أرضية حقيقية ثلاثية الأبعاد، وموسوعة عربية سهلة، وتحديات ممتعة.','Travel through continents, countries and oceans on a realistic interactive 3D Earth, with clear guides and captivating challenges.')+'</p>'+
     '<div class="gv10-actions">'+
      '<button class="gv10-primary" data-page="explore">'+icon('continents',18)+'<span>'+t('استكشف الكرة الأرضية','Explore 3D Earth')+'</span><span class="gv10-arrow" aria-hidden="true">↗</span></button>'+
      '<button class="gv10-secondary" data-page="learn">'+icon('countries',18)+'<span>'+t('ابدأ رحلة التعلم','Start learning')+'</span></button>'+
     '</div>'+
    '</div>'+
    '<div class="gv10-visual">'+
      '<div class="gv10-orbit gv10-orbit-one" aria-hidden="true"></div><div class="gv10-orbit gv10-orbit-two" aria-hidden="true"></div>'+
      '<div class="gv10-glow" aria-hidden="true"></div>'+
      '<div id="gvHomeGlobe" class="gv-home-globe gv10-globe" role="group" aria-label="'+t('كرة أرضية تفاعلية ثلاثية الأبعاد. اسحب للتدوير واستخدم الإيماءات للتكبير.','Interactive 3D Earth. Drag to rotate and use gestures to zoom.')+'"></div>'+
      '<div class="gv10-globe-caption"><span class="gv10-live-dot"></span><span>'+t('كرة أرضية تفاعلية','LIVE 3D EARTH')+'</span></div>'+
    '</div>'+
   '</div>'+
   '<div class="gv10-bottomline"><div class="gv10-numbers">'+items.map((item,i)=>'<div class="gv10-number"><strong>'+item.value+'</strong><span>'+t(item.ar,item.en)+'</span></div>').join('')+'</div>'+
   '<span class="gv10-scroll-note">'+icon('continents',14)+t('اسحب الكرة لتكتشف العالم','Drag Earth to explore')+'</span></div>'+
  '</section>';
 }
 home=function(){
  const html=previousHome();
  const start=html.indexOf('<section class="hero hero-v3 gv-hero-v4">');
  if(start<0)return html;
  const end=html.indexOf('</section>',start);
  if(end<0)return html;
  return html.slice(0,start)+premiumHero()+html.slice(end+'</section>'.length);
 };
 // Keep page composition fluid when in-app navigation returns home.
 const priorRender=render;
 render=function(){
  priorRender();
  document.body.classList.toggle('gv10-at-home',state.page==='home');
 };
 window.GeoVerseCinematic={premiumHero};
})();