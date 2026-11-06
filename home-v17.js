/* GeoVerse v17 — cinematic home games and progress. No fake values or inert buttons. */
(function(){
'use strict';
const previousHome=home;
const T=(a,b)=>state.lang==='ar'?a:b;
const I={
 compass:'<circle cx="12" cy="12" r="9"/><path d="m15.9 8.1-2.6 5.2-5.2 2.6 2.6-5.2 5.2-2.6z"/>',
 globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-5 6-5 12 0 18 5-6 5-12 0-18"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
 crown:'<path d="M4 21h16M6 18h12M5 9l7-5 7 5M7 18v-8m5 8v-8m5 8v-8M4 10h16"/>',
 map:'<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="2.5"/>',
 trophy:'<path d="M7 3h10v7a5 5 0 0 1-10 0V3zm0 2H4v3a4 4 0 0 0 4 4m9-7h3v3a4 4 0 0 1-4 4M12 15v5m-4 1h8"/>',
 layers:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
 bolt:'<path d="m13 2-9 12h7l-1 8 10-13h-7z"/>',
 arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',
 book:'<path d="M4 3h15v18H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 15a2 2 0 0 1 2-2h13M8 7h7m-7 4h7"/>'
};
const icon=(name,size=24)=>'<svg viewBox="0 0 24 24" width="'+size+'" height="'+size+'" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(I[name]||I.compass)+'</svg>';
function numbers(){
 const p=saved();const ids=Object.keys(p).filter(k=>/^[a-z]+_\d+$/.test(k)&&p[k]);
 const total=Object.values(geo).reduce((n,v)=>n+(Array.isArray(v)?v.length:0),0);
 const valid=ids.filter(k=>{const [c,i]=k.split('_');return Array.isArray(geo[c])&&Number(i)>=0&&Number(i)<geo[c].length});
 return {seen:valid.length,total,percentage:total?Math.min(100,Math.round(valid.length/total*100)):0};
}
function games(){
 const items=[
  {id:'capitals',icon:'crown',color:'gold',photo:'photo-1519501025264-65ba15a82390',level:T('العواصم','CAPITALS'),name:T('تحدي العواصم','Capital challenge'),desc:T('هل تعرف عواصم دول العالم؟','Can you name the world capitals?')},
  {id:'mapfind',icon:'map',color:'cyan',photo:'photo-1526778548025-fa2f459cd5c1',level:T('المواقع','LOCATION'),name:T('تحديد المواقع','Locate the country'),desc:T('اعثر على الدولة على الخريطة.','Find the country on the map.')},
  {id:'classify',icon:'layers',color:'violet',photo:'photo-1464822759023-fed622ff2c3b',level:T('الطبيعة','NATURE'),name:T('تصنيف الأماكن','Classify places'),desc:T('ميّز بين الجبال والأنهار وغيرها.','Identify mountains, rivers and more.')},
  {id:'mixed',icon:'globe',color:'green',photo:'photo-1518837695005-2083093ee35b',level:T('اختبار متنوع','MIXED QUIZ'),name:T('التحدي المتنوع','Mixed geography quiz'),desc:T('مجموعة متنوعة من أسئلة الجغرافيا.','A mix of geography questions.')}
 ];
 return '<section class="gv17-games" aria-labelledby="gv17GamesTitle">'+
  '<div class="gv17-heading"><div><span class="gv17-overline">'+T('اختبر معرفتك','PUT YOUR KNOWLEDGE TO THE TEST')+'</span><h2 id="gv17GamesTitle">'+T('الألعاب والتحديات','Games & Challenges')+'</h2><p>'+T('اختبر نفسك في ألعاب جغرافية تفاعلية، واكتشف العالم بطريقة ممتعة.','Play interactive geography challenges and discover how much you know.')+'</p></div><button type="button" class="gv17-text-action" data-page="play">'+T('جميع الألعاب','All games')+' '+icon('arrow',16)+'</button></div>'+
  '<div class="gv17-games-grid">'+items.map((g,i)=>'<button type="button" class="gv17-game gv17-game-'+g.color+'" data-gv17-game="'+g.id+'">'+
   '<img class="gv20-game-photo" loading="lazy" decoding="async" src="'+im(g.photo,700)+'" alt="" aria-hidden="true"><span class="gv20-game-shade" aria-hidden="true"></span><span class="gv20-game-head"><span class="gv17-game-num">0'+(i+1)+'</span><span class="gv17-game-icon">'+icon(g.icon,30)+'</span></span><span class="gv20-game-kicker">'+g.level+'</span>'+
   '<strong>'+g.name+'</strong><small>'+g.desc+'</small><span class="gv17-game-launch">'+T('العب الآن','Play now')+' '+icon('arrow',16)+'</span></button>').join('')+'</div>'+
  '<div class="gv17-daily"><div class="gv17-daily-mark">'+icon('bolt',29)+'</div><div class="gv17-daily-copy"><span>'+T('تحدّي اليوم','TODAY’S CHALLENGE')+'</span><strong>'+T('جاهز لجولة جغرافية؟','Ready for a geography round?')+'</strong><small>'+T('ابدأ جولة جديدة من أسئلة التحدي المتنوع.','Start a fresh round of mixed geography questions.')+'</small></div><button data-gv17-game="mixed">'+T('ابدأ التحدي','Start challenge')+' '+icon('arrow',17)+'</button></div>'+
 '</section>';
}
function progress(){
 const n=numbers(),ids=['continents','countries','oceans','rivers'];
 return '<section class="gv17-progress" aria-labelledby="gv17ProgressTitle"><div class="gv17-heading"><div><span class="gv17-overline">'+T('خطوة بخطوة','YOUR LEARNING JOURNEY')+'</span><h2 id="gv17ProgressTitle">'+T('أكمل رحلة الاستكشاف','Continue Exploring')+'</h2><p>'+T('كل مكان تتعلمه يقربك من اكتشاف كوكبنا بالكامل.','Every place you learn brings you closer to exploring the planet.')+'</p></div><button type="button" class="gv17-text-action" data-page="progress">'+T('كل تقدمي','My progress')+' '+icon('arrow',16)+'</button></div>'+
 '<div class="gv17-progress-grid"><div class="gv17-progress-main"><div class="gv17-ring" style="--gv17-progress:'+n.percentage+'%"><div><strong>'+n.percentage+'%</strong><small>'+T('مكتمل','Completed')+'</small></div></div><div class="gv17-progress-summary"><span>'+T('إنجازاتك حتى الآن','YOUR EXPLORATION')+'</span><strong>'+n.seen+' <small>/ '+n.total+'</small></strong><p>'+T('مكانًا ومعلمًا تم تعلّمها','places & landmarks learned')+'</p><button type="button" data-page="learn">'+T('تابع التعلّم','Continue learning')+' '+icon('arrow',16)+'</button></div></div>'+
 '<div class="gv17-progress-categories">'+ids.map(id=>{const c=cats.find(x=>x.id===id),done=Math.max(0,(saved()[id]||0)),count=geo[id]?.length||0,pct=progressValue(id);return '<button type="button" class="gv17-progress-row" data-cat="'+id+'"><div class="gv17-progress-label"><strong>'+escapeHTML(label(c))+'</strong><span>'+done+' / '+count+'</span></div><div class="gv17-track"><i style="width:'+pct+'%"></i></div></button>'}).join('')+'</div></div></section>';
}
home=function(){
 let html=previousHome();
 // Remove the legacy emoji-game panel, duplicated facts and dated promotional
 // card; replace the entire tail with a coherent interactive game/progress layout.
 const start=html.indexOf('<div class="planet-facts">');
 if(start>=0)html=html.slice(0,start)+games()+progress();
 // Photo-led homepage only. The 18 original subject icons remain in the sidebar.
 html=html.replace(/<span class="gv11-card-icon">[\s\S]*?<\/span>/g,'');
 html=html.replace(/<span class="gv11-card-chevron">[\s\S]*?<\/span>/g,'');
 return html;
};
// These are real game links, not navigation labels with no effect.
document.addEventListener('click',event=>{
 const el=event.target?.closest?.('[data-gv17-game]');
 if(!el)return;
 const id=el.dataset.gv17Game;
 if(!['capitals','mapfind','classify','mixed'].includes(id))return;
 event.preventDefault();
 selectedGameMode=id;
 quiz=createGame(id);
 state.quizIndex=0;state.quizScore=0;state.quizSelected=null;state.quizComplete=false;
 setPage('play');
});
window.GeoVerseHomeV17={games,progress,numbers};
})();