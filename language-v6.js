/* GeoVerse v6: unified Arabic and English geography quiz text. */
(function(){
'use strict';
let capitals={};
const previousGame=createGame;
const hasArabic=s=>/[\u0600-\u06ff]/.test(s||'')&&!/[A-Za-z]{3,}/.test(s||'');
createGame=function(mode){
 if(mode!=='capitals')return previousGame(mode);
 const records=window.GeoVerseV4?.store?.countries||[];
 const pool=records.filter(r=>r.code&&r.capital&&hasArabic(capitals[r.code])&&hasArabic(arName(r)));
 if(pool.length<4)return previousGame(mode);
 const mix=a=>a.slice().sort(()=>Math.random()-.5),questions=[];
 for(const target of mix(pool)){
  const choices=[target];
  for(const r of mix(pool.filter(x=>x.code!==target.code))){
   if(choices.every(x=>capitals[x.code]!==capitals[r.code]&&x.capital!==r.capital))choices.push(r);
   if(choices.length===4)break;
  }
  if(choices.length!==4)continue;
  const options=mix(choices);
  questions.push(['ما عاصمة '+arName(target)+'؟','What is the capital of '+target.name+'?',options.map(x=>capitals[x.code]),options.map(x=>x.capital),options.indexOf(target),'العاصمة: '+capitals[target.code],'Capital: '+target.capital]);
  if(questions.length===12)break;
 }
 return questions.length?questions:previousGame(mode);
};
function translateVisible(){
 if(state.lang!=='ar')return;
 const root=document.getElementById('main');if(!root)return;
 root.querySelectorAll('.gv-country-row[data-v4-country]').forEach(row=>{
  const el=row.querySelector('.gv-capital');if(el)el.textContent=capitals[row.dataset.v4Country]||'غير متوفر بالعربية';
 });
 if(state.page==='country-v4'){
  const record=window.GeoVerseV4?.store?.byCode?.get(state.v4Code);
  const boxes=root.querySelectorAll('.gv-profile-facts > div');
  if(record&&boxes.length>2){const el=boxes[0].querySelector('strong');if(el)el.textContent=capitals[record.code]||'غير متوفر بالعربية'}
 }
}
const oldRender=render;
render=function(){oldRender();translateVisible()};
fetch('./geo-localization.json').then(r=>r.json()).then(data=>{
 capitals=data.capitals||{};translateVisible();
 if(state.page==='play'&&selectedGameMode==='capitals'&&state.quizIndex===0&&state.quizSelected===null){quiz=createGame('capitals');render()}
}).catch(()=>{});
document.addEventListener('input',e=>{if(e.target.id==='gvCountrySearch')setTimeout(translateVisible,0)});
window.GeoVerseLocaleV6={translateVisible};
})();