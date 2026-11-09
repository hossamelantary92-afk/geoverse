/* GeoVerse v351 — contextual smart-back navigation.
 * Tracks actual screen transitions, including country-to-landmark links.
 * Does not change browser URL, filtering, quiz state, or other navigation tabs. */
(function(){
'use strict';
if(typeof state==='undefined'||typeof render!=='function'||typeof setPage!=='function')return;
const maxDepth=35;
const stack=[];
let suppress=false;
let clickOrigin=null;
let previous=null;
const pagePositions=new Map();
let scrollEpoch=0;
let restoreOverride=null;
function pageKey(v){
 if(!v)return '';
 if(v.page==='country-v4')return 'country:'+String(v.code||'');
 if(v.page==='countries-v4')return 'countries:'+String(v.continent||'all');
 if(v.page==='category')return 'category:'+String(v.category||'')+(v.category==='tourism'?':'+String(v.tourism||''):'');
 if(v.page==='detail')return 'detail:'+String(v.category||'')+':'+String(v.item??'');
 return String(v.page||'');
}
function remember(v){if(v&&validPages.has(v.page))pagePositions.set(pageKey(v),Math.max(0,Math.round(v.scroll||0)));}
function scrollToY(y){window.scrollTo(0,Math.max(0,Math.round(y||0)));}
function restorePosition(y){
 const token=++scrollEpoch;
 scrollToY(y);
 requestAnimationFrame(()=>requestAnimationFrame(()=>{
  if(token!==scrollEpoch)return;
  scrollToY(y);
  if(previous&&same(previous,snapshot())){previous.scroll=Math.max(0,Math.round(window.scrollY||0));remember(previous);}
 }));
}
let countryReferral=null;
const validPages=new Set(['home','all','category','detail','country-v4','countries-v4','explore','learn','play','progress']);
function snapshot(){
 const cat=typeof state.category==='string'?state.category:null;
 const item=Number.isInteger(state.item)?state.item:null;
 return {
  page:state.page,category:cat,item,
  code:typeof state.v4Code==='string'?state.v4Code:null,
  continent:state.v4Continent||'all',
  tourism:window.GeoVerseTourismCountryNavigation?.getSelected?.()||'',
  scroll:Math.max(0,Math.round(window.scrollY||0))
 };
}
function same(a,b){
 return !!a&&!!b&&a.page===b.page&&a.category===b.category&&a.item===b.item&&
  (a.page!=='country-v4'||a.code===b.code)&&
  (a.page!=='countries-v4'||a.continent===b.continent);
}
previous=snapshot();
window.addEventListener('scroll',()=>{
 if(!suppress&&previous&&same(previous,snapshot())){
  previous.scroll=Math.max(0,Math.round(window.scrollY||0));
  remember(previous);
 }
},{passive:true});
function decorateDetailBack(){
 if(state.page!=='detail')return;
 const original=document.querySelector('#main button.back');
 if(!original)return;
 const cat=state.category;
 const c=cats.find(entry=>entry.id===cat);
 const bar=document.createElement('div');
 bar.className='gv-landmark-back-row';
 bar.setAttribute('role','group');
 bar.setAttribute('aria-label',state.lang==='ar'?'التنقل داخل المعلم':'Landmark navigation');
 original.before(bar);
 bar.appendChild(original);
 original.type='button';
 original.classList.add('gv-landmark-back-button');
 original.textContent=state.lang==='ar'?'→ عودة':'← Back';
 const categoryButton=document.createElement('button');
 categoryButton.type='button';
 categoryButton.className='gv-smart-category-link';
 categoryButton.dataset.gvOpenCategory=cat;
 categoryButton.textContent=state.lang==='ar'?'عرض قسم '+(c?.ar||'المعلم'):'View '+(c?.en||'topic');
 bar.appendChild(categoryButton);
}
const originalRender=render;
render=function(){
 const next=snapshot();
 const changed=!!previous&&!same(previous,next);
 if(changed){
  const origin=clickOrigin&&same(clickOrigin,previous)?clickOrigin:previous;
  remember(origin);
  if(!suppress&&validPages.has(previous.page)){
   if(next.page==='detail'){
    countryReferral=origin.page==='country-v4'&&origin.code?{...origin}:null;
   }
   if(!same(stack[stack.length-1],origin)){
    stack.push({...origin});
    if(stack.length>maxDepth)stack.shift();
   }
  }
  // Each distinct screen has its own scroll position; new screens start at top.
  scrollToY(0);
 }
 const result=originalRender.apply(this,arguments);
 decorateDetailBack();
 previous=snapshot();
 if(changed){
  const targetY=restoreOverride===null?(pagePositions.get(pageKey(next))??0):restoreOverride;
  restoreOverride=null;
  restorePosition(targetY);
 }else if(previous){
  previous.scroll=Math.max(0,Math.round(window.scrollY||0));
 }
 clickOrigin=null;
 return result;
};
function fallback(){
 if(state.page==='detail')return {page:'category',category:state.category,item:null,scroll:0};
 if(state.page==='country-v4')return {page:'countries-v4',category:'countries',item:null,scroll:0,continent:'all'};
 if(state.page==='category'||state.page==='countries-v4')return {page:'all',category:null,item:null,scroll:0};
 return {page:'home',category:null,item:null,scroll:0};
}
function goBackTo(target){
 if(!target||target.page===state.page&&same(target,snapshot()))return;
 suppress=true;
 restoreOverride=Math.max(0,target.scroll??pagePositions.get(pageKey(target))??0);
 try{
  if(target.page==='countries-v4'&&target.continent)state.v4Continent=target.continent;
  if(target.page==='category'&&target.category==='tourism')window.GeoVerseTourismCountryNavigation?.setSelected?.(target.tourism||'');
  setPage(target.page,target.page==='country-v4'?target.code:target.category,target.item);
  previous=snapshot();
 }finally{suppress=false;clickOrigin=null;restoreOverride=null;}
}
function smartBack(){
 const target=stack.length?stack.pop():fallback();
 goBackTo(target);
}
function returnToCountry(){
 if(!countryReferral)return smartBack();
 const target={...countryReferral};
 while(stack.length&&!same(stack[stack.length-1],target))stack.pop();
 if(stack.length&&same(stack[stack.length-1],target))stack.pop();
 countryReferral=null;
 goBackTo(target);
}
document.addEventListener('click',event=>{
 const countryButton=event.target.closest?.('[data-gv-return-country]');
 if(countryButton&&state.page==='detail'){
  event.preventDefault();
  event.stopImmediatePropagation();
  returnToCountry();
  return;
 }
 const categoryButton=event.target.closest?.('[data-gv-open-category]');
 if(categoryButton&&state.page==='detail'){
  event.preventDefault();
  event.stopImmediatePropagation();
  clickOrigin=snapshot();
  setPage('category',categoryButton.dataset.gvOpenCategory);
  return;
 }
 const button=event.target.closest?.('button.back');
 if(button&&validPages.has(state.page)){
  event.preventDefault();
  event.stopImmediatePropagation();
  smartBack();
  return;
 }
 if(event.target.closest?.('[data-page],[data-cat],[data-item],[data-v4-country],[data-atlas-open],[data-gv17-game],.gv-knowledge-link')){
  clickOrigin=snapshot();
 }
},true);
window.GeoVerseSmartBack={back:smartBack,returnCountry:returnToCountry,depth:()=>stack.length};
})();