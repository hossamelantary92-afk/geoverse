/* GeoVerse v5: Arabic display labels for capital cities and common currencies.
 * Runs after enhancements.js, leaving the atlas and data source untouched. */
(function(){
 'use strict';
 const caps=new Map(),currencies=new Map();
 const root=document.getElementById('main');
 function stateNow(){return typeof state==='undefined'?null:state}
 function applyArabicNames(){
  const current=stateNow();if(!current||current.lang!=='ar'||!root)return;
  root.querySelectorAll('.gv-country-row[data-v4-country]').forEach(row=>{
   const name=caps.get(row.dataset.v4Country);
   const label=row.querySelector('.gv-capital');if(name&&label)label.textContent=name;
  });
  if(current.page==='country-v4'){
   const entry=window.GeoVerseV4?.store?.byCode?.get(current.v4Code);
   const details=root.querySelectorAll('.gv-profile-facts > div');
   if(entry&&details?.length>=3){
    const capitalNode=details[0].querySelector('strong');
    const currencyNode=details[2].querySelector('strong');
    if(capitalNode&&caps.has(entry.code))capitalNode.textContent=caps.get(entry.code);
    if(currencyNode&&currencies.has(entry.currency))currencyNode.textContent=currencies.get(entry.currency);
   }
  }
 }
 let updatePending=false;
 function queue(){
  if(updatePending)return;
  updatePending=true;
  setTimeout(()=>{updatePending=false;applyArabicNames()},0);
 }
 if(root&&window.MutationObserver){
  const observer=new MutationObserver(changes=>{
   if(changes.some(change=>change.target===root))queue();
  });
  observer.observe(root,{childList:true});
 }
 document.addEventListener('input',e=>{if(e.target?.id==='gvCountrySearch')setTimeout(applyArabicNames,40)});
 fetch('./geo-localization.json?v=gv489-special-capitals').then(r=>r.ok?r.json():null).then(info=>{
  Object.entries(info?.capitals||{}).forEach(([key,value])=>caps.set(key,value));
  Object.entries(info?.currencies||{}).forEach(([key,value])=>currencies.set(key,value));
  window.GeoVerseCapitalNames=Object.fromEntries(caps);
  applyArabicNames();
  // Refresh an existing directory search after the asynchronous Arabic dictionary arrives.
  const current=stateNow();
  if(current?.page==='countries-v4'&&typeof render==='function'){
   const active=document.activeElement;
   const query=document.getElementById('gvCountrySearch');
   const caret=query&&active===query?query.selectionStart:null;
   render();
   if(caret!==null){
    const replacement=document.getElementById('gvCountrySearch');
    replacement?.focus({preventScroll:true});
    try{replacement?.setSelectionRange(caret,caret)}catch(e){}
   }
  }
 }).catch(()=>{});
 setTimeout(applyArabicNames,80);
})();