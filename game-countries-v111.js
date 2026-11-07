/* GeoVerse v111 — enrich capital and flag modes using the site's country catalogue. */
(function(){
'use strict';
const bank=window.GeoVerseQuestionPools;if(!bank||!Array.isArray(bank.capitals))return;
const known=new Set(bank.capitals.map(x=>x[4].toLowerCase()));
const skip=new Set(['AQ','BV','HM','UM','TF','GS','EH']);
const valid=r=>r&&/^[A-Z]{2}$/.test(r.code||'')&&r.capital&&typeof r.capital==='string'&&!/[();]| and |\//i.test(r.capital)&&!skip.has(r.code)&&r.name&&!/legacy duplicate|historical alias/i.test(r.name);
const convert=r=>{
 let ar=r.name;try{ar=new Intl.DisplayNames(['ar'],{type:'region'}).of(r.code)||r.name}catch{}
 // Keep the precise Latin spelling for capitals without an approved Arabic transliteration.
 return [ar,r.name,r.capital,r.capital,r.code.toLowerCase()];
};
fetch('./country-meta.json?v=gv111-game-catalogue').then(r=>{if(!r.ok)throw Error('Country catalogue unavailable');return r.json()}).then(data=>{
 let added=0;
 for(const r of data.countries||[]){
  if(!valid(r)||known.has(r.code.toLowerCase()))continue;
  bank.capitals.push(convert(r));known.add(r.code.toLowerCase());added++;
 }
 window.GeoVerseGameCountryStats={total:bank.capitals.length,added,source:'country-meta.json'};
 if(window.GeoVerseGameV110?.stats)window.GeoVerseGameV110.stats.capitals=bank.capitals.length;
}).catch(e=>{console.warn('Extended game countries unavailable; existing quiz pool remains active.',e.message)});
})();