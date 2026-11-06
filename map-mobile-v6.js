/* GeoVerse v6 — mobile map input: pan anywhere, pinch zoom, click to answer only after stationary tap. */
(function(){
 'use strict';
 const bound=new WeakSet();
 let ignoreClickUntil=0;
 let lastDraggedMap=null;
 function bindGameMap(){
  const svg=document.querySelector('#gameMap .atlas-svg');
  if(!svg||bound.has(svg))return;
  bound.add(svg);
  svg.classList.add('gv-map-touch-ready');
  const points=new Map();
  let startView=null,gestureStart=null,dragged=false;
  const fromSvg=e=>{const rect=svg.getBoundingClientRect();return {x:e.clientX,y:e.clientY,kx:(rect.width||1),ky:(rect.height||1)}};
  function toView(next){if(typeof atlasView==='function')atlasView(next)}
  function snapshot(){const r=typeof atlasRuntime==='undefined'?null:atlasRuntime;return r?.view?.slice()||[0,0,1000,520]}
  function midpoint(p,q){return {x:(p.x+q.x)/2,y:(p.y+q.y)/2}}
  function distance(p,q){return Math.hypot(p.x-q.x,p.y-q.y)}
  function resetGesture(){startView=snapshot();const a=[...points.values()];gestureStart=a.length>1?{two:true,center:midpoint(a[0],a[1]),gap:Math.max(4,distance(a[0],a[1])),view:startView}:a.length?{two:false,x:a[0].x,y:a[0].y,view:startView}:null}
  svg.addEventListener('pointerdown',e=>{
   if(e.pointerType==='mouse'&&e.button!==0)return;
   const p=fromSvg(e);
   points.set(e.pointerId,{x:p.x,y:p.y,startX:p.x,startY:p.y});
   if(points.size===1)dragged=false;
   resetGesture();
   e.stopImmediatePropagation(); // prevent legacy ocean-only handler taking over
  },true);
  svg.addEventListener('pointermove',e=>{
   const p=points.get(e.pointerId);if(!p)return;
   const pos=fromSvg(e);p.x=pos.x;p.y=pos.y;
   const v=gestureStart;if(!v)return;
   const rect=svg.getBoundingClientRect(),kx=v.view[2]/Math.max(1,rect.width),ky=v.view[3]/Math.max(1,rect.height);
   if(points.size>=2){
    const two=[...points.values()];
    if(!v.two){resetGesture();return}
    const gap=Math.max(4,distance(two[0],two[1]));
    const ratio=Math.max(.25,Math.min(4,v.gap/gap));
    const w=v.view[2]*ratio,h=v.view[3]*ratio;
    const center=midpoint(two[0],two[1]);
    const anchorX=(v.center.x-rect.left)/Math.max(1,rect.width),anchorY=(v.center.y-rect.top)/Math.max(1,rect.height);
    toView([v.view[0]+v.view[2]*anchorX-w*anchorX-(center.x-v.center.x)*kx,
            v.view[1]+v.view[3]*anchorY-h*anchorY-(center.y-v.center.y)*ky,w,h]);
    dragged=true;
   }else if(!v.two){
    const dx=p.x-v.x,dy=p.y-v.y;
    if(Math.hypot(p.x-p.startX,p.y-p.startY)>7)dragged=true;
    if(dragged){
     if(!svg.hasPointerCapture?.(e.pointerId))try{svg.setPointerCapture(e.pointerId)}catch(e){}
     toView([v.view[0]-dx*kx,v.view[1]-dy*ky,v.view[2],v.view[3]]);
    }
   }
   e.stopImmediatePropagation();
  },true);
  const finish=e=>{
   if(!points.has(e.pointerId))return;
   points.delete(e.pointerId);
   if(dragged){ignoreClickUntil=Date.now()+420;lastDraggedMap=svg}
   if(points.size)resetGesture();else gestureStart=null;
   e.stopImmediatePropagation();
  };
  svg.addEventListener('pointerup',finish,true);
  svg.addEventListener('pointercancel',finish,true);
  svg.addEventListener('lostpointercapture',e=>{if(points.has(e.pointerId))finish(e)},true);
  svg.addEventListener('wheel',e=>{
   if(typeof atlasZoom==='function')atlasZoom(e.deltaY<0?'in':'out');
   e.preventDefault();e.stopImmediatePropagation();
  },{capture:true,passive:false});
 }
 const oldAtlas=atlasCreate;
 atlasCreate=function(id,center){
  const result=oldAtlas(id,center);
  if(id==='gameMap')bindGameMap();
  return result;
 };
 // A drag must never accidentally count as a wrong answer.
 document.addEventListener('click',e=>{
  if(Date.now()<ignoreClickUntil&&lastDraggedMap?.contains(e.target)){
   e.preventDefault();e.stopImmediatePropagation();
  }
 },true);
 document.addEventListener('keydown',e=>{
  if(typeof state==='undefined'||state.page!=='play'||typeof selectedGameMode==='undefined'||selectedGameMode!=='mapfind')return;
  if(!document.getElementById('gameMap')?.contains(document.activeElement))return;
  if(e.key==='+'||e.key==='='){atlasZoom('in');e.preventDefault()}
  if(e.key==='-'){atlasZoom('out');e.preventDefault()}
  if(e.key==='0'){atlasZoom('reset');e.preventDefault()}
 },true);
 window.GeoVerseMapV6={bindGameMap};
})();