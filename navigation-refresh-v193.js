/* GeoVerse v193 — remember the current screen across browser refresh.
 * Save only navigation (not quiz state, map objects, user data or timers).
 * Works on GitHub Pages without server routing; does not modify URL.
 */
(function(){
'use strict';
const key='gv_navigation_v193';
const pages=new Set(['home','all','category','detail','explore','learn','play','progress','country-v4','countries-v4']);
const validCat=id=>typeof id==='string'&&Array.isArray(cats)&&cats.some(c=>c.id===id);
const validItem=(cat,i)=>Number.isInteger(i)&&i>=0&&i<(geo[cat]?.length||0);
const validCode=code=>typeof code==='string'&&/^[A-Z]{2}$/.test(code);
function store(){
 try{
  if(!pages.has(state.page))return;
  const navigation={
   page:state.page,
   category:validCat(state.category)?state.category:null,
   item:validItem(state.category,state.item)?state.item:null,
   countryCode:validCode(state.v4Code)?state.v4Code:null,
   tourismCountry:window.GeoVerseTourismCountryNavigation?.getSelected?.()||''
  };
  sessionStorage.setItem(key,JSON.stringify(navigation));
 }catch(e){/* Browsing remains usable when storage is blocked */ }
}
function restore(){
 let saved;
 try{saved=JSON.parse(sessionStorage.getItem(key)||'null')}catch(e){return false}
 if(!saved||!pages.has(saved.page)||saved.page==='home')return false;
 if(saved.page==='detail'&&(!validCat(saved.category)||!validItem(saved.category,saved.item)))return false;
 if(saved.page==='category'&&!validCat(saved.category))return false;
 if((saved.page==='country-v4'||saved.page==='countries-v4')&&!validCode(saved.countryCode))return false;
 state.page=saved.page;
 state.category=saved.page==='detail'||saved.page==='category'?saved.category:null;
 state.item=saved.page==='detail'?saved.item:null;
 state.filter='';
 if(saved.page==='country-v4'||saved.page==='countries-v4'){
  state.v4Code=saved.countryCode;
  state.category='countries';
 }
 if(state.page==='category'&&state.category==='tourism'){
  window.GeoVerseTourismCountryNavigation?.setSelected?.(saved.tourismCountry||'');
 }
 // Restore the public country page without trying to rebuild unpersisted quiz/game state.
 if(state.page==='play')gameStarted=false;
 render();
 return true;
}
const priorRender=render;
render=function(){
 const result=priorRender.apply(this,arguments);
 store();
 return result;
};
// Run once after every extension has defined its render/setPage handlers.
restore();
// Ensure navigation can still be recorded when the last page was the homepage.
if(!sessionStorage.getItem(key))store();
window.GeoVerseNavigationV193={save:store};
})();
