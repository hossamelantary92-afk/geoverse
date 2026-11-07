/* GeoVerse visual alignment v11: interactive layout, no decorative mockup data */
(function(){
'use strict';
const oldHome=home,oldRender=render;
const t=(a,b)=>state.lang==='ar'?a:b;
const ico={
home:'<path d="m3 10 9-7 9 7v11h-6v-7H9v7H3z"/>',
explore:'<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3zM9 3v15M15 6v15"/>',
all:'<path d="M5 3h14v18H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8 8h8M8 12h8"/>',
play:'<path d="M7 8h10a5 5 0 0 1 5 4l1 6a3 3 0 0 1-5 3l-3-3H9l-3 3a3 3 0 0 1-5-3l1-6a5 5 0 0 1 5-4zM7 12v5M4.5 14.5h5M16 12h.01M19 15h.01"/>',
progress:'<circle cx="12" cy="7" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',
mountains:'<path d="m2 21 7-13 4 6 3-9 6 16H2z"/>',
waves:'<path d="M2 7c3-3 5 3 8 0s5 3 8 0 3-1 4 0M2 12c3-3 5 3 8 0s5 3 8 0 3-1 4 0"/>',
rivers:'<path d="M5 2c9 3 8 7 3 9s-6 6 2 11M15 2c9 3 8 7 3 9s-6 6 2 11"/>',
forests:'<path d="m6 3 5 9H1L6 3zm0 9v9M18 2l5 11H13L18 2zm0 11v8"/>',
deserts:'<path d="M2 18c4-9 9-9 13 0 2-4 4-4 7 0M2 21h20"/>',
volcanoes:'<path d="m3 21 6-11 3 4 3-5 6 12zM10 7l2-4 2 4"/>'
};
const icon=(id,n=21)=>'<svg viewBox="0 0 24 24" width="'+n+'" height="'+n+'" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(ico[id]||ico.explore)+'</svg>';
function hero(){
 const count=Object.values(geo).reduce((sum,items)=>sum+items.length,0);
 const stats=[['explore','250',t('دولة وإقليم','Countries & territories')],['all',cats.length,t('قسمًا رئيسيًا','Topics')],['play',gameModes.length,t('ألعاب تفاعلية','Game modes')],['mountains',count+'+',t('مكان ومعلم','Places & landmarks')]];
 return '<section class="gv11-hero" aria-labelledby="gv11Title">'+
 '<div class="gv11-stars" aria-hidden="true"></div>'+
 '<div class="gv11-copy"><span class="gv11-eyebrow">✧ GEOVERSE <i></i></span><h1 id="gv11Title">'+t('العالم بين <em>إيديك</em>','The World in <em>Your Hands</em>')+'</h1>'+
 '<p>'+t('اكتشف جمال عالمنا وطبيعته، من أعماق المحيطات إلى قمم الجبال، في تجربة تفاعلية غنية وممتعة.','Explore the beauty of our planet, from oceans to mountains, through immersive geography.')+'</p>'+
 '<div class="gv11-actions"><button type="button" class="gv11-gold" data-page="learn">'+icon('explore',18)+t('ابدأ الرحلة','Start learning')+'</button><button type="button" class="gv11-outline" data-page="explore">'+icon('explore',18)+t('استكشف الخريطة','Explore the map')+'</button></div></div>'+
 '<div class="gv11-planet"><div class="gv11-earth-glow"></div><div class="gv11-orbit"></div><div id="gvHomeGlobe" class="gv-home-globe gv10-globe gv11-globe" role="group" aria-label="'+t('كرة أرضية تفاعلية ثلاثية الأبعاد','Interactive 3D Earth')+'"></div></div>'+
 '<div class="gv11-horizon" aria-hidden="true"><div class="gv11-cloud"></div><svg viewBox="0 0 1000 140" preserveAspectRatio="none"><path d="m0 140 75-45 62 17 90-72 85 93 110-96 80 90 100-87 105 100 83-62 100 48 110-66v80Z" fill="#07334e"/><path d="m207 65 20-25 25 30-23-9-10 11zm198-6 17-22 22 33-22-11-10 9z" fill="#a5cee0" opacity=".55"/></svg></div>'+
 '<div class="gv11-stats">'+stats.map(v=>'<div class="gv11-stat">'+icon(v[0],24)+'<strong>'+v[1]+'</strong><span>'+v[2]+'</span></div>').join('')+'</div></section>';
}
const featured=['countries','tourism','mountains','oceans','rivers','deserts'];
const featuredPhotos={
 countries:'photo-1519501025264-65ba15a82390', // sunlit city skyline
 tourism:'photo-1533105079780-92b9be482077',  // warm architectural heritage
 mountains:'photo-1464822759023-fed622ff2c3b', // snow-capped alpine mountains
 oceans:'photo-1518837695005-2083093ee35b',   // deep-blue ocean
 rivers:'photo-1591081658714-f576fb7ea3ed',   // aerial winding river through green forest
 deserts:'photo-1509316785289-025f5b846b35'   // warm golden dunes
};
const motifs={oceans:'waves',rivers:'rivers',volcanoes:'volcanoes',forests:'forests',mountains:'mountains',deserts:'deserts'};
function categories(){
 return '<section class="gv11-categories"><div class="gv11-section-title"><h2>'+t('استكشف الأقسام','Explore categories')+'</h2><button type="button" data-page="all">'+t('عرض الكل','View all')+' ↗</button></div><div class="gv11-grid">'+featured.map(id=>{
 const c=cats.find(x=>x.id===id);return '<button type="button" data-cat="'+id+'" class="gv11-card gv11-'+id+'"><img loading="lazy" src="'+im(featuredPhotos[id]||c.img,900)+'" alt="'+escapeHTML(label(c))+'"><span class="gv11-card-gradient"></span><span class="gv11-card-icon">'+icon(motifs[id],24)+'</span><strong>'+escapeHTML(label(c))+'</strong><small>'+geo[id].length+' '+t('معلمًا','places')+'</small><span class="gv11-card-chevron">‹</span></button>';
 }).join('')+'</div></section>'+
 '<section class="gv11-feature"><img loading="lazy" src="https://commons.wikimedia.org/wiki/Special:FilePath/The_Treasury%2C_Petra.jpg?width=1200" alt="'+t('الخزنة في مدينة البتراء بالأردن','The Treasury at Petra, Jordan')+'"><div class="gv11-feature-gradient"></div><div class="gv11-feature-copy"><span>'+t('من عجائب العالم','GEOGRAPHY SPOTLIGHT')+'</span><h2>'+t('البتراء — المدينة الوردية','Petra — The Rose City')+'</h2><p>'+t('مدينة أثرية في جنوب الأردن، منحوتة في الصخور الوردية.','An ancient Jordanian city carved into rose-colored sandstone.')+'</p></div><a href="https://whc.unesco.org/en/list/326" target="_blank" rel="noopener noreferrer" class="gv11-feature-go" aria-label="'+t('اقرأ عن البتراء في اليونسكو','Learn about Petra at UNESCO')+'">↗</a></section>';
}
home=function(){
 let html=oldHome(),s=html.indexOf('<section class="gv10-hero"'),e=html.indexOf('</section>',s);
 if(s>=0&&e>s)html=html.slice(0,s)+hero()+html.slice(e+10);
 s=html.indexOf('<div class="home-section-head">');e=html.indexOf('<div class="planet-facts">',s);
 if(s>=0&&e>s)html=html.slice(0,s)+categories()+html.slice(e);
 return html;
};
function nav(){
 let n=document.getElementById('gv11Nav');if(!n){n=document.createElement('nav');n.id='gv11Nav';n.className='gv11-bottom-nav';n.setAttribute('aria-label','Main navigation');document.body.appendChild(n)}
 const links=[['home','الرئيسية','Home'],['explore','الخريطة','Map'],['all','الموسوعة','Encyclopedia'],['play','الألعاب','Games'],['progress','تقدمي','Progress']];
 const active=['category','detail','country-v4','countries-v4','learn'].includes(state.page)?'all':state.page;
 n.innerHTML=links.map(([id,ar,en])=>'<button type="button" data-page="'+id+'" class="'+(id===active?'active':'')+'" '+(id===active?'aria-current="page"':'')+'>'+icon(id)+'<span>'+t(ar,en)+'</span></button>').join('');
}
render=function(){oldRender();nav();document.body.classList.toggle('gv11-home',state.page==='home')};
window.GeoVerseVisualV11={hero,categories,nav};
})();