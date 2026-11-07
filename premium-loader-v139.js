/* GeoVerse v139 stable first visible splash duration. */
/* GeoVerse v138 — first-paint splash with stable, delayed transition loader.
 * Intentionally does not modify the known-good enhancements-v136.js 3D engine.
 */
(function(){
'use strict';
const overlay=document.getElementById('gv137-loader');
if(!overlay)return;
let serial=0,showTimer=0,checkTimer=0;
let bootFinished=false;
const bootRuntimeStart=performance.now();
let firstPaintAt=0;
const visibleMinimum=850;
const reduceMotion=window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches||false;
const afterPaint=fn=>requestAnimationFrame(()=>requestAnimationFrame(fn));
const globeSettled=()=>{
 const node=document.getElementById('gvExploreGlobe');
 if(!node)return true;
 return node.classList.contains('gv-3d-loaded')||
  !!node.querySelector('.gv132-fallback-map,.gv132-globe-error,.gv-globe-fallback');
};
function clearPending(){
 clearTimeout(showTimer);clearTimeout(checkTimer);
}
function conceal(){
 clearPending();
 overlay.classList.remove('gv137-visible');
 overlay.setAttribute('aria-hidden','true');
 overlay.setAttribute('aria-busy','false');
}
function reveal(){
 overlay.dataset.theme=document.documentElement.dataset.gvInitialTheme==='light'?'light':'dark';
 overlay.classList.add('gv137-visible');
 overlay.setAttribute('aria-hidden','false');
 overlay.setAttribute('aria-busy','true');
}
function completeBoot(){
 if(bootFinished)return;
 bootFinished=true;
 window.__gv137BootReady=true;
 clearTimeout(window.__gv138BootFailsafe);
 // Reveal the fully rendered page underneath the still-opaque logo splash.
 document.documentElement.classList.add('gv138-boot-complete');
 afterPaint(conceal);
}
function bootCheck(){
 if(bootFinished)return;
 const main=document.getElementById('main');
 if(!main||!main.children.length){checkTimer=setTimeout(bootCheck,40);return}
 afterPaint(()=>{
  if(bootFinished)return;
  // Crucial: minimum display time is measured AFTER the browser gets a
  // chance to paint, not from the early head-script timestamp. Blocking CSS
  // and JS may have already consumed seconds before this callback executes.
  if(!firstPaintAt)firstPaintAt=performance.now();
  const visibleFor=performance.now()-firstPaintAt;
  const elapsed=performance.now()-bootRuntimeStart;
  const minimum=reduceMotion?450:visibleMinimum;
  const globeWait=globeSettled()||elapsed>=2300;
  const fontsReady=!document.fonts||document.fonts.status==='loaded'||elapsed>=1700;
  if(visibleFor<minimum||!globeWait||!fontsReady){
   checkTimer=setTimeout(bootCheck,Math.max(40,Math.min(115,minimum-visibleFor)));
   return;
  }
  completeBoot();
 });
}
reveal();
bootCheck();
function finishTransition(token){
 if(token!==serial)return;
 afterPaint(()=>{
  if(token!==serial)return;
  const started=performance.now();
  const wait=()=>{
   if(token!==serial)return;
   const ready=globeSettled()||performance.now()-started>1900;
   if(ready)conceal();
   else checkTimer=setTimeout(wait,85);
  };
  wait();
 });
}
if(typeof setPage==='function'){
 const previous=setPage;
 setPage=function(...args){
  if(!bootFinished)return previous.apply(this,args);
  const token=++serial;
  clearPending();
  showTimer=setTimeout(()=>{if(serial===token)reveal()},260);
  try{return previous.apply(this,args)}
  finally{finishTransition(token)}
 };
}
window.GeoVerseLoadingV138={finishBoot:completeBoot,hide:conceal};
})();