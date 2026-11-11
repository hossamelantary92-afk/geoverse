/* GeoVerse v17 — cinematic home games and progress. No fake values or inert buttons. */
(function(){
'use strict';
const previousHome=home;
const T=(a,b)=>state.lang==='ar'?a:b;
const recommendedGames=[
 ['capitals','العواصم','Capitals'],
 ['flags','تحدي الأعلام','Flag Challenge'],
 ['silhouette','خمن الدولة من شكلها','Country Silhouette'],
 ['mapfind','حدّد الدولة على الخريطة','Find on the Map'],
 ['locations','تحديد الموقع','Location Challenge'],
 ['landmarkphoto','تحدي المعالم بالصور','Landmark Photo Quiz'],
 ['definitions','اللغز الجغرافي','Geography Riddle'],
 ['mixed','تحدي متنوع','Mixed Challenge']
];
// Pick once per page load, not on every render. Avoid repeating the previous visit.
const featuredGame=(function(){
 let last='';
 try{last=localStorage.getItem('gv_last_featured_game')||'';}catch{}
 const choices=recommendedGames.filter(g=>g[0]!==last);
 const picked=choices[Math.floor(Math.random()*choices.length)]||recommendedGames[0];
 try{localStorage.setItem('gv_last_featured_game',picked[0]);}catch{}
 return picked;
})();

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
 const items=recommendedGames.slice(0,4).map(g=>({id:g[0],name:T(g[1],g[2])}));
 return '<div class="gv550-wonders-divider gv551-games-divider" aria-hidden="true"><span></span><i></i><span></span></div>'+
  '<section class="gv17-games" aria-labelledby="gv17GamesTitle">'+
  '<div class="gv17-heading"><div><h2 id="gv17GamesTitle">'+T('الألعاب و التحديات','Games & Challenges')+'</h2><p>'+T('اختبر معرفتك و اكتشف العالم بطريقة ممتعة','Test your knowledge and discover the world in a fun way.')+'</p></div><button type="button" class="gv17-text-action" data-page="play">'+T('جميع الألعاب','All games')+' '+icon('arrow',16)+'</button></div>'+
  '<div class="gv17-games-grid gv571-home-game-covers">'+items.map(g=>'<button type="button" class="gv17-game gv571-home-card" data-gv17-game="'+g.id+'" data-game="'+g.id+'" aria-label="'+g.name+'"><strong>'+g.name+'</strong></button>').join('')+'</div>'+
  '<div class="gv17-daily"><div class="gv17-daily-mark">'+icon('bolt',29)+'</div><div class="gv17-daily-copy"><span>'+T('تحدّي اليوم · اختيار GeoVerse','TODAY’S CHALLENGE · GEOVERSE PICK')+'</span><strong>'+T(featuredGame[1],featuredGame[2])+'</strong><small>'+T('GeoVerse اختار لك اللعبة دي عشوائيًا. جاهز للتحدي؟','GeoVerse picked this game for you at random. Ready to play?')+'</small></div><button type="button" data-gv17-game="'+featuredGame[0]+'">'+T('ابدأ اللعبة','Start game')+' '+icon('arrow',17)+'</button></div>'+
 '</section>';
}
function progress(){
 const n=numbers(),ids=['continents','countries','oceans','rivers'];
 return '<section class="gv17-progress" aria-labelledby="gv17ProgressTitle"><div class="gv17-heading"><div><h2 id="gv17ProgressTitle">'+T('أكمل رحلة الاستكشاف','Continue Exploring')+'</h2><p>'+T('كل مكان تتعلمه يقربك من اكتشاف كوكبنا بالكامل.','Every place you learn brings you closer to exploring the planet.')+'</p></div><button type="button" class="gv17-text-action" data-page="progress">'+T('كل تقدمي','My progress')+' '+icon('arrow',16)+'</button></div>'+
 '<div class="gv17-progress-grid"><div class="gv17-progress-main"><div class="gv17-ring" style="--gv17-progress:'+n.percentage+'%"><div><strong>'+n.percentage+'%</strong><small>'+T('مكتمل','Completed')+'</small></div></div><div class="gv17-progress-summary"><span>'+T('إنجازاتك حتى الآن','YOUR EXPLORATION')+'</span><strong class="gv49-progress-count" dir="ltr">'+n.seen+' <small>/ '+n.total+'</small></strong><p>'+T('مكانًا ومعلمًا تم تعلّمها','places & landmarks learned')+'</p><button type="button" data-page="learn">'+T('تابع التعلّم','Continue learning')+' '+icon('arrow',16)+'</button></div></div>'+
 '<div class="gv17-progress-categories">'+ids.map(id=>{const c=cats.find(x=>x.id===id),done=Math.max(0,(saved()[id]||0)),count=geo[id]?.length||0,pct=progressValue(id);return '<button type="button" class="gv17-progress-row" data-cat="'+id+'"><div class="gv17-progress-label"><strong>'+escapeHTML(label(c))+'</strong><span dir="ltr">'+done+' / '+count+'</span></div><div class="gv17-track"><i style="width:'+pct+'%"></i></div></button>'}).join('')+'</div></div></section>';
}
home=function(){
 let html=previousHome();
 // Remove the legacy emoji-game panel, duplicated facts and dated promotional
 // card; replace the entire tail with a coherent interactive game/progress layout.
 const start=html.indexOf('<div class="planet-facts">');
 if(start>=0)html=html.slice(0,start)+games()+'<div class="gv550-wonders-divider gv553-progress-divider" aria-hidden="true"><span></span><i></i><span></span></div>'+progress();
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
 if(!recommendedGames.some(g=>g[0]===id))return;
 event.preventDefault();
 selectedGameMode=id;
 quiz=createGame(id);
 state.quizIndex=0;state.quizScore=0;state.quizSelected=null;state.quizComplete=false;
 setPage('play',null,null,true);
});
window.GeoVerseHomeV17={games,progress,numbers};
})();