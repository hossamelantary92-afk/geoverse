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
 if(!suppress&&previous&&same(previous,snapshot()))previous.scroll=Math.max(0,Math.round(window.scrollY||0));
},{passive:true});
function decorateDetailBack(){
 if(state.page!=='detail')return;
 const original=document.querySelector('#main button.back');
 if(!original)return;
 if(countryReferral&&countryReferral.code){
  const button=document.createElement('button');
  button.type='button';
  button.className='gv-smart-country-back';
  button.dataset.gvReturnCountry=countryReferral.code;
  button.textContent=state.lang==='ar'?'→ العودة إلى الدولة السابقة':'← Back to previous country';
  original.before(button);
  const cat=state.category;
  const c=cats.find(entry=>entry.id===cat);
  original.className='gv-smart-category-link';
  original.removeAttribute('data-cat');
  original.dataset.gvOpenCategory=cat;
  original.textContent=state.lang==='ar'?'عرض قسم '+(c?.ar||'المعلم'):'View '+(c?.en||'topic')+' category';
 }else{
  original.textContent=state.lang==='ar'?'→ العودة للصفحة السابقة':'← Back to previous page';
 }
}
const originalRender=render;
render=function(){
 const next=snapshot();
 if(!suppress&&previous&&!same(previous,next)&&validPages.has(previous.page)){
  const origin=clickOrigin&&same(clickOrigin,previous)?clickOrigin:previous;
  if(next.page==='detail'){
   countryReferral=origin.page==='country-v4'&&origin.code?{...origin}:null;
  }
  if(!same(stack[stack.length-1],origin)){
   stack.push({...origin});
   if(stack.length>maxDepth)stack.shift();
  }
 }
 const result=originalRender.apply(this,arguments);
 decorateDetailBack();
 previous=snapshot();
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
 try{
  if(target.page==='countries-v4'&&target.continent)state.v4Continent=target.continent;
  if(target.page==='category'&&target.category==='tourism')window.GeoVerseTourismCountryNavigation?.setSelected?.(target.tourism||'');
  setPage(target.page,target.page==='country-v4'?target.code:target.category,target.item);
  previous=snapshot();
 }finally{suppress=false;clickOrigin=null;}
 const y=Math.max(0,target.scroll||0);
 requestAnimationFrame(()=>requestAnimationFrame(()=>{
  window.scrollTo({top:y,left:0,behavior:'instant'});
  if(previous&&same(previous,snapshot()))previous.scroll=y;
 }));
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