/* GeoVerse v137 — stable slow-transition loader, without touching the 3D globe engine. */
(function(){
'use strict';
const overlay=document.getElementById('gv137-loader');
if(!overlay)return;
let sequence=0,showTimer=0,hideTimer=0,active=false;
const delay=380;
const reduceMotion=window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches||false;
const isGlobeReady=()=>{
 const node=document.getElementById('gvExploreGlobe');
 if(!node)return true;
 return node.classList.contains('gv-3d-loaded')||
  !!node.querySelector('.gv132-fallback-map,.gv132-globe-error,.gv-globe-fallback');
};
function show(){
 if(!active)return;
 const theme=document.documentElement.dataset.gvInitialTheme;
 overlay.dataset.theme=theme==='light'?'light':'dark';
 overlay.classList.add('gv137-visible');
 overlay.setAttribute('aria-hidden','false');
 overlay.setAttribute('aria-busy','true');
}
function hide(){
 active=false;
 clearTimeout(showTimer);clearTimeout(hideTimer);
 overlay.classList.remove('gv137-visible');
 overlay.setAttribute('aria-hidden','true');
 overlay.setAttribute('aria-busy','false');
}
function finish(token){
 if(token!==sequence)return;
 requestAnimationFrame(()=>requestAnimationFrame(()=>{
  if(token!==sequence)return;
  const start=performance.now();
  const wait=()=>{
   if(token!==sequence)return;
   if(isGlobeReady()||performance.now()-start>2400){hide();return}
   hideTimer=setTimeout(wait,80);
  };
  wait();
 }));
}
function begin(){
 const token=++sequence;
 active=true;
 clearTimeout(showTimer);clearTimeout(hideTimer);
 overlay.classList.remove('gv137-visible');
 overlay.setAttribute('aria-hidden','true');
 overlay.setAttribute('aria-busy','false');
 showTimer=setTimeout(()=>{if(token===sequence)show()},delay);
 return token;
}
// Complete first visit only after the app has actually rendered its first screen.
const ready=()=>{
 const main=document.getElementById('main');
 if(!main||!main.children.length){setTimeout(ready,35);return}
 window.__gv137BootReady=true;
 const startupToken=sequence;
 finish(startupToken);
};
active=true;
sequence=1;
clearTimeout(window.__gv137StartupTimer);
showTimer=setTimeout(show,420);
ready();
// Only page-navigation actions are wrapped; no rerender, HTML swap or fullscreen fade.
// Navigation that completes quickly never displays the loader.
if(typeof setPage==='function'){
 const originalSetPage=setPage;
 setPage=function(...args){
  const token=begin();
  try{return originalSetPage.apply(this,args)}
  finally{finish(token)}
 };
}
// Navigating via history and theme toggles is intentionally untouched.
window.GeoVerseLoadingV137={showForSlowTransition:begin,finish,hide,reduceMotion};
})();