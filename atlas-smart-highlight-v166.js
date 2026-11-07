/* GeoVerse v166 — smooth landmark focus for the editorial 2D atlas.
   Uses existing projection and atlasView; excludes globe and games. */
(function(){
'use strict';
const animation=new WeakMap();
const installed=new WeakSet();
function cancel(r){
 const task=animation.get(r);
 if(task){cancelAnimationFrame(task.id);animation.delete(r)}
}
function bind(r){
 if(!r||!['worldMap','detailMap'].includes(r.id)||installed.has(r))return;
 const svg=r.node?.querySelector('.atlas-svg');
 if(!svg)return;
 installed.add(r);
 // A user gesture takes precedence over a scripted camera transition.
 svg.addEventListener('pointerdown',()=>cancel(r),{passive:true});
 svg.addEventListener('wheel',()=>cancel(r),{passive:true});
 r.node.addEventListener('click',e=>{
  if(e.target.closest('[data-map-zoom],[data-gv140-region],[data-gv153-close],[data-gv142-open]'))cancel(r);
 },true);
}
function focus(r,category,index,source){
 if(!r||!['worldMap','detailMap'].includes(r.id)||!r.node?.isConnected||atlasRuntime!==r)return;
 const item=geo?.[category]?.[Number(index)];
 if(!Array.isArray(item)||!Number.isFinite(item[4])||!Number.isFinite(item[5]))return;
 const pos=r.proj?.([item[5],item[4]]);
 if(!pos||!pos.every(Number.isFinite))return;
 const svg=r.node.querySelector('.atlas-svg');
 if(!svg)return;
 bind(r);
 cancel(r);
 const width=425,height=221;
 // Place the landmark a little left of center so the right-hand card masks less of it.
 const x=Math.max(0,Math.min(1000-width,pos[0]-width*.34));
 const y=Math.max(0,Math.min(520-height,pos[1]-height*.48));
 const target=[x,y,width,height],start=r.view.slice();
 const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
 const duration=560,started=performance.now();
 if(reduced){atlasView(target);return}
 function frame(now){
  if(!svg.isConnected||atlasRuntime!==r){cancel(r);return}
  const t=Math.min(1,(now-started)/duration);
  const eased=1-Math.pow(1-t,3);
  atlasView(start.map((n,i)=>n+(target[i]-n)*eased));
  if(t<1){const task=animation.get(r);if(task)task.id=requestAnimationFrame(frame)}
  else animation.delete(r);
 }
 animation.set(r,{id:requestAnimationFrame(frame)});
}
window.GeoVerseFocusLandmark=focus;
})();
