/* GeoVerse v110 — difficulty settings, wider atlas challenge and rotating question pools. */
(function(){
'use strict';
const bank=window.GeoVerseQuestionPools;if(!bank)return;
const stored=()=>{try{return localStorage.getItem('gv_game_difficulty')||'medium'}catch{return 'medium'}};
let difficulty=['easy','medium','hard'].includes(stored())?stored():'medium';
const labels={easy:['سهل','Easy'],medium:['متوسط','Medium'],hard:['صعب','Hard']};
const shuffle=bank.randomize;
const seenByMode={};
function selectPool(mode,pool,max=12){
 const identity=q=>mode==='flags'?q[7]:q[1];
 const unique=[...new Map(pool.filter(q=>q&&q[0]&&q[1]).map(q=>[identity(q),q])).values()];
 if(!unique.length)return [];
 const key=mode+'-'+difficulty;
 let used=seenByMode[key]||new Set();
 let fresh=shuffle(unique.filter(x=>!used.has(identity(x))));
 if(fresh.length<Math.min(max,unique.length)){used=new Set();fresh=shuffle(unique);}
 const chosen=fresh.slice(0,Math.min(max,fresh.length));
 chosen.forEach(q=>used.add(identity(q)));seenByMode[key]=used;
 return chosen;
}
const split=(items)=>{const n=items.length;return difficulty==='easy'?items.slice(0,Math.max(12,Math.ceil(n*.4))):difficulty==='hard'?items.slice(Math.floor(n*.55)):items.slice(Math.floor(n*.2),Math.ceil(n*.85))};
const mapCountries=(()=>{
 const names=new Set(['Egypt','Saudi Arabia','France','Japan','Brazil','Canada','Australia','Spain','India','China','Argentina','Germany','Italy','United Kingdom','Morocco','Algeria','Tunisia','Jordan','Iraq','Lebanon','United Arab Emirates','Kuwait','Qatar','Oman','Yemen','Sudan','Ethiopia','Kenya','Nigeria','Ghana','Senegal','Greece','Portugal','Netherlands','Belgium','Switzerland','Austria','Sweden','Norway','Denmark','Finland','Poland','Hungary','Romania','Ukraine','Russia','Mexico','Cuba','Colombia','Peru','Chile','Uruguay','Paraguay','Venezuela','Ecuador','Bolivia','New Zealand','Indonesia','Malaysia','Thailand','Vietnam','Philippines','South Korea','Pakistan','Bangladesh','Nepal','Mongolia','Iceland','Ireland','Tanzania','Czechia','United States']);
 return bank.capitals.filter(c=>names.has(c[1])).map(c=>[c[0],c[1]==='Türkiye'?'Turkey':c[1],c[1]]);
})();
const previousCreate=createGame;
createGame=function(mode){
 if(mode==='mapfind'){
  const choices=split(mapCountries);
  return selectPool(mode,choices.map(c=>['اضغط على '+c[0]+' على الخريطة','Find '+c[1]+' on the map',[],[],0,'الموقع الصحيح هو '+c[0]+'.','The correct country is '+c[1]+'.',c[2]]),12);
 }
 if(mode==='flags'){
  const list=split(bank.capitals);
  return selectPool(mode,list.map(bank.makeFlag));
 }
 if(mode==='capitals'){
  const list=split(bank.capitals);
  return selectPool(mode,list.map(bank.makeCapital));
 }
 if(mode==='classify'){
  const pool=bank.makeClassify();
  // Everyday places first, more specialized categories in difficult rounds.
  const groups={easy:['oceans','seas','rivers','mountains','lakes','deserts','islands'],medium:['waterfalls','forests','volcanoes','straits','gulfs','valleys'],hard:['glaciers','grasslands','straits','gulfs','volcanoes','valleys']};
  const allowed=groups[difficulty];
  const filtered=pool.filter(q=>allowed.some(k=>{const t=cats.find(c=>c.id===k);return t&&(q[5].includes(t.ar)||q[6].includes(t.en))}));
  return selectPool(mode,filtered.length>=12?filtered:pool);
 }
 if(mode==='definitions'){
  // Concept definitions plus exact geography identifications provide a much wider practice bank.
  const basics=bank.makeDefinitions();
  const featureQuestions=bank.makeLocations().map(q=>['أي معلم جغرافي يطابق هذا التعريف: '+q[0].replace(/^أي معلم يرتبط بهذا الوصف:\s*/,''),'Which geographical feature fits: '+q[1].replace(/^Which place matches this description:\s*/,''),q[2],q[3],q[4],q[5],q[6]]);
  const pool=difficulty==='easy'?basics.concat(featureQuestions.slice(0,45)):difficulty==='medium'?basics.concat(featureQuestions):featureQuestions.concat(basics);
  return selectPool(mode,pool);
 }
 if(mode==='locations'){
  const pool=bank.makeLocations();
  return selectPool(mode,split(pool).length>=12?split(pool):pool);
 }
 if(mode==='mixed'){
  const pool=[...bank.facts.map(bank.makeFact),...bank.capitals.map(bank.makeCapital),...bank.makeClassify(),...bank.makeDefinitions(),...bank.makeLocations()];
  return selectPool(mode,split(pool).length>=12?split(pool):pool);
 }
 return previousCreate(mode);
};
const oldPlay=play;
play=function(){
 const control='<div class="gv110-level" role="group" aria-label="'+(state.lang==='ar'?'مستوى صعوبة الألعاب':'Game difficulty')+'"><span class="gv110-level-label">'+(state.lang==='ar'?'مستوى التحدي':'Challenge level')+'</span><div class="gv110-level-buttons">'+Object.entries(labels).map(([id,v])=>'<button type="button" data-gv110-level="'+id+'" class="'+(id===difficulty?'selected':'')+'" aria-pressed="'+(id===difficulty?'true':'false')+'">'+(state.lang==='ar'?v[0]:v[1])+'</button>').join('')+'</div></div>';
 return control+oldPlay();
};
document.addEventListener('click',function(ev){
 const b=ev.target.closest?.('[data-gv110-level]');
 if(!b)return;
 ev.preventDefault();ev.stopImmediatePropagation();
 const next=b.dataset.gv110Level;if(!labels[next])return;
 difficulty=next;try{localStorage.setItem('gv_game_difficulty',next)}catch{}
 if(gameStarted){quiz=createGame(selectedGameMode);state.quizIndex=0;state.quizScore=0;state.quizSelected=null;state.quizComplete=false;}
 render();
},true);
window.GeoVerseGameV110={getDifficulty:()=>difficulty,stats:{mapCountries:mapCountries.length,capitals:bank.capitals.length,geographyFacts:bank.facts.length}};
})();