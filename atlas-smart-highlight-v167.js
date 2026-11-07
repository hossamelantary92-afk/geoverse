/* GeoVerse v167 — reliable landmark auto-focus on the editorial 2D map.
   Observes the existing Smart Card to cover touch, keyboard and search selections.
   Does not change layer filtering, the globe, or quiz maps. */
(function(){
'use strict';
const watched=new WeakSet(),jobs=new WeakMap(),last=new WeakMap();
const ids=['worldMap','detailMap'];
const $=(root,selector)=>root?.querySelector(selector);
function stop(r){
 const job=jobs.get(r);
 if(job){cancelAnimationFrame(job.frame);jobs.delete(r)}
}
function frameFor(r,category,index){
 const place=geo?.[category]?.[index],project=r?.proj;
 if(!place||!project||!Number.isFinite(place[4])||!Number.isFinite(place[5]))return null;
 const p=project([place[5],place[4]]);
 if(!p||!Number.isFinite(p[0])||!Number.isFinite(p[1]))return null;
 // Natural Earth viewbox is 1000x520. Keep the selected point fully inside it.
 const w=390,h=203;
 return [Math.max(0,Math.min(1000-w,p[0]-w*.38)),Math.max(0,Math.min(520-h,p[1]-h*.48)),w,h];
}
function focus(r,category,index){
 if(!r||!ids.includes(r.id)||atlasRuntime!==r||!r.node?.isConnected)return false;
 index=Number(index);
 if(!Number.isInteger(index))return false;
 const target=frameFor(r,category,index);
 const svg=$(r.node,'.atlas-svg');
 if(!target||!svg)return false;
 const key=category+':'+index;
 const previous=last.get(r);
 // Opening the same card twice after panning should still refocus.
 if(previous?.key===key&&performance.now()-previous.time<250)return true;
 last.set(r,{key,time:performance.now()});
 stop(r);
 const start=r.view.slice(),begin=performance.now(),duration=600;
 const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
 const apply=(t)=>{
  if(!svg.isConnected||atlasRuntime!==r)return false;
  const eased=1-Math.pow(1-t,3);
  atlasView(start.map((value,i)=>value+(target[i]-value)*eased));
  return true;
 };
 if(reduced){apply(1);return true}
 const job={frame:0};jobs.set(r,job);
 function tick(now){
  if(jobs.get(r)!==job)return;
  if(!apply(Math.min(1,(now-begin)/duration))){stop(r);return}
  if(now-begin<duration)job.frame=requestAnimationFrame(tick);
  else jobs.delete(r);
 }
 job.frame=requestAnimationFrame(tick);
 return true;
}
function cardSelection(r){
 const card=$(r.node,'.gv140-country-card');
 if(!card||card.hidden||!card.classList.contains('gv154-smart-card'))return;
 const key=$(card,'[data-gv142-open]')?.getAttribute('data-gv142-open')||'';
 const pos=key.lastIndexOf(':');
 if(pos<=0)return;
 focus(r,key.slice(0,pos),key.slice(pos+1));
}
function attach(r){
 if(!r||!ids.includes(r.id)||watched.has(r)||!r.node?.isConnected)return;
 const card=$(r.node,'.gv140-country-card'),svg=$(r.node,'.atlas-svg');
 if(!card||!svg)return;
 watched.add(r);
 const observe=new MutationObserver(()=>{if(!r.node.isConnected){observe.disconnect();return}cardSelection(r)});
 observe.observe(card,{attributes:true,attributeFilter:['hidden','class'],childList:true});
 // Any intentional gesture has priority over an in-progress camera movement.
 svg.addEventListener('pointerdown',()=>stop(r),{passive:true});
 svg.addEventListener('wheel',()=>stop(r),{passive:true});
 r.node.addEventListener('click',e=>{
  if(e.target.closest?.('[data-map-zoom],[data-gv140-region],[data-gv153-close]'))stop(r);
 },true);
 cardSelection(r);
}
function scan(){
 const r=typeof atlasRuntime!=='undefined'?atlasRuntime:null;
 if(r&&ids.includes(r.id))attach(r);
}
const original=typeof atlasCreate==='function'?atlasCreate:null;
if(original)atlasCreate=function(){
 const result=original.apply(this,arguments);
 scan();
 return result;
};
const main=document.getElementById('main');
if(main)new MutationObserver(scan).observe(main,{childList:true});
window.GeoVerseFocusLandmark=function(r,category,index){
 attach(r);
 return focus(r,category,index);
};
scan();
})();
