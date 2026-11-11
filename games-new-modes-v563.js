/* GeoVerse v563 — silhouette and verified landmark-photo challenges. */
(function(){
'use strict';
const previousCreate=createGame,previousPlay=play;
gameModes.push(['silhouette','🗺️','خمن الدولة من شكلها','Country Silhouette']);
gameModes.push(['landmarkphoto','🏛️','تحدي المعالم بالصور','Landmark Photo Quiz']);
gameModePhotos.silhouette='photo-1526778548025-fa2f459cd5c1';
gameModePhotos.landmarkphoto='photo-1487958449943-2429e8be8625';
const shuffle=a=>a.slice().sort(()=>Math.random()-.5);
const pendingRound=()=>[['بيانات اللعبة قيد التحميل','Game data is loading',['انتظر','Please wait','جاري التحميل','Loading'],['Please wait','Loading','Preparing','Retry'],0,'اختر بدء اللعبة بعد اكتمال تحميل البيانات.','Start after the game data is ready.','PENDING','']];
const countryInfo=()=>window.GeoVerseGameCountryStats;
let shapes=[],landmarks=[],loading=true;
const codeIndex=new Map();
const namesAR=code=>{try{return new Intl.DisplayNames(['ar'],{type:'region'}).of(code)}catch{return code}};
function geoSvg(feature){
 try{
  const projection=d3.geoMercator().fitExtent([[15,15],[305,185]],feature);
  const shape=d3.geoPath(projection)(feature);
  if(!shape||shape.length<20)return '';
  return '<svg viewBox="0 0 320 200" role="img" aria-label="Country outline" xmlns="http://www.w3.org/2000/svg"><path d="'+shape.replace(/"/g,'')+'" fill="#6ce8d9" stroke="#b8fff0" stroke-width="1.5" fill-rule="evenodd"/></svg>';
 }catch{return ''}
}
function prepareShapes(features,records){
 const lookup=new Map(records.map(c=>[String(c.name).toLowerCase(),c]));
 const aliases={'United States of America':'United States','Czech Republic':'Czechia','United Republic of Tanzania':'Tanzania','Democratic Republic of the Congo':'DR Congo'};
 const seen=new Set(),available=[];
 for(const feature of features){
  const name=aliases[feature.properties?.name]||feature.properties?.name;
  const country=lookup.get(String(name||'').toLowerCase());
  if(!country||!country.code||seen.has(country.code))continue;
  const svg=geoSvg(feature);if(!svg)continue;
  seen.add(country.code);available.push({code:country.code,ar:namesAR(country.code),en:country.name,continent:country.continent,svg});
 }
 shapes=available;
}
async function preparePhotos(){
 const items=(window.GeoVerseTourismV170?.items||[]).filter(x=>x.wiki&&x.nameEn&&x.code);
 if(!items.length)return;
 const raw=items.map(x=>({code:x.code,ar:x.nameAr,en:x.nameEn,article:decodeURIComponent(x.wiki).replace(/_/g,' ')}));
 const entries=[];
 for(let start=0;start<raw.length;start+=12){
  try{
   const slice=raw.slice(start,start+12),params=new URLSearchParams({action:'query',format:'json',formatversion:'2',prop:'pageimages',piprop:'thumbnail',pithumbsize:'900',redirects:'1',origin:'*',titles:slice.map(x=>x.article).join('|')});
   const res=await fetch('https://en.wikipedia.org/w/api.php?'+params.toString(),{mode:'cors'});
   if(!res.ok)continue;
   const data=await res.json(),normalized=s=>s.replace(/_/g,' ').trim().toLowerCase();
   const redirects=new Map([...(data.query?.normalized||[]),...(data.query?.redirects||[])].map(x=>[normalized(x.from),normalized(x.to)]));
   const pages=new Map((data.query?.pages||[]).map(x=>[normalized(x.title||''),x]));
   for(const item of slice){
    let key=normalized(item.article);for(let k=0;k<5&&redirects.has(key);k++)key=redirects.get(key);
    const page=pages.get(key),src=page?.thumbnail?.source;
    if(!page?.missing&&typeof src==='string'&&/^https:\/\/(?:upload|thumb)\.wikimedia\.org\//i.test(src))entries.push({...item,src});
   }
  }catch{}
 }
 landmarks=entries;
}
async function load(){
 try{
  const [world,meta]=await Promise.all([fetch('./world.geojson').then(r=>r.ok?r.json():Promise.reject()),fetch('./country-meta.json').then(r=>r.ok?r.json():Promise.reject())]);
  prepareShapes(world.features||[],meta.countries||[]);
 }catch{}
 try{await preparePhotos()}catch{}
 loading=false;
 if(typeof render==='function'&&state.page==='play'&&!gameStarted)render();
}
load();
function makeChoices(answers,target){
 const picked=shuffle(answers.filter(x=>x.code!==target.code)).slice(0,3);
 if(picked.length<3)return null;
 return shuffle([target,...picked]);
}
function makeShapes(){
 return shuffle(shapes).map(c=>{
  const similar=shapes.filter(x=>x.continent===c.continent);
  const options=makeChoices(similar.length>=4?similar:shapes,c);if(!options)return null;
  return ['أي دولة يمثلها هذا الشكل؟','Which country matches this outline?',options.map(o=>o.ar),options.map(o=>o.en),options.findIndex(o=>o.code===c.code),'الدولة الصحيحة هي '+c.ar+'.','The correct country is '+c.en+'.',c.code,c.svg];
 }).filter(Boolean);
}
function makePhotos(){
 return shuffle(landmarks).map(c=>{
  const options=makeChoices(landmarks,c);if(!options)return null;
  return ['ما اسم المعلم الظاهر في الصورة؟','Which landmark appears in this photo?',options.map(x=>x.ar),options.map(x=>x.en),options.findIndex(x=>x.en===c.en),'المعلم الصحيح: '+c.ar+'.','Correct landmark: '+c.en+'.',c.code,c.src];
 }).filter(Boolean);
}
createGame=function(mode){
 if(mode==='silhouette')return shapes.length?shuffle(makeShapes()).slice(0,12):pendingRound();
 if(mode==='landmarkphoto')return landmarks.length?shuffle(makePhotos()).slice(0,12):pendingRound();
 return previousCreate(mode);
};
play=function(){
 let html=previousPlay();
 if(!gameStarted||state.quizComplete||!['silhouette','landmarkphoto'].includes(selectedGameMode))return html;
 const q=quiz?.[state.quizIndex],src=q?.[8];
 if(!src)return html;
 const media=selectedGameMode==='silhouette'?
  '<div class="gv563-quiz-image gv563-shape" aria-label="'+lang('شكل الدولة','Country outline')+'">'+src+'</div>':
  '<div class="gv563-quiz-image gv563-photo"><img src="'+escapeHTML(src)+'" alt="'+lang('صورة المعلم','Landmark photo')+'" loading="eager" referrerpolicy="no-referrer" decoding="async"></div>';
 const question=/<h2 class="quiz-question">[\s\S]*?<\/h2>/;
 return html.replace(question,m=>media+m);
};
window.GeoVerseGameAdditionsV563={status:()=>({silhouettes:shapes.length,landmarks:landmarks.length,ready:!loading})};
})();
