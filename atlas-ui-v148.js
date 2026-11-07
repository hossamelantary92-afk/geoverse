/* GeoVerse v148 — accessible HTML ocean names, aligned with moving map.
   Uses a fresh overlay independent of the old SVG text renderer. */
(function(){
'use strict';
const mapIds=['worldMap','detailMap'];
const oldOceanLayer='.gv147-ocean-labels';
const isArabic=()=>document.documentElement.lang!=='en';
function dismissOld(stage){
 stage.querySelectorAll(oldOceanLayer).forEach(node=>node.remove());
 stage.querySelectorAll('.atlas-svg .gv145-label,.atlas-svg text.gv145-label').forEach(node=>node.remove());
}
function drawLabels(map){
 if(!map?.isConnected)return;
 const stage=map.querySelector('.atlas-stage'),svg=map.querySelector('.atlas-svg');
 if(!stage||!svg)return;
 dismissOld(stage);
 const onOceans=typeof activeLayer==='string'&&activeLayer==='oceans';
 let overlay=stage.querySelector('.gv148-ocean-overlay');
 if(!onOceans){
  overlay?.remove();
  return;
 }
 if(!overlay){
  overlay=document.createElement('div');
  overlay.className='gv148-ocean-overlay';
  overlay.setAttribute('aria-hidden','true');
  stage.appendChild(overlay);
 }
 const oceanData=typeof geo!=='undefined'&&Array.isArray(geo.oceans)?geo.oceans:[];
 const currentLang=isArabic()?'ar':'en';
 if(overlay.dataset.lang!==currentLang||overlay.children.length!==oceanData.length){
  overlay.replaceChildren();
  overlay.dataset.lang=currentLang;
  oceanData.forEach((o,i)=>{
   const label=document.createElement('div');
   label.className='gv148-ocean-label';
   label.dataset.ocean=String(i);
   label.setAttribute('lang',currentLang);
   label.setAttribute('dir',currentLang==='ar'?'rtl':'ltr');
   // Explicit, unmodified Arabic strings, never SVG text glyph positions.
   label.textContent=currentLang==='ar'?String(o[0]):String(o[1]);
   overlay.appendChild(label);
  });
 }
 const rect=stage.getBoundingClientRect();
 overlay.querySelectorAll('.gv148-ocean-label').forEach(label=>{
  const marker=svg.querySelector('.atlas-pin[data-map-pin="oceans:'+label.dataset.ocean+'"]');
  const matrix=marker?.getScreenCTM?.();
  if(!matrix){label.hidden=true;return}
  try{
   const center=svg.createSVGPoint();
   center.x=0;center.y=0;
   const p=center.matrixTransform(matrix);
   const x=p.x-rect.left,y=p.y-rect.top;
   if(!Number.isFinite(x)||!Number.isFinite(y)||x<12||x>rect.width-12||y<20||y>rect.height-18){
    label.hidden=true;return;
   }
   label.hidden=false;
   label.style.left=x.toFixed(2)+'px';
   label.style.top=(y-17).toFixed(2)+'px';
  }catch(e){label.hidden=true}
 });
}
function attach(map){
 if(map.dataset.gv148Mounted==='yes')return;
 const stage=map.querySelector('.atlas-stage');
 const svg=map.querySelector('.atlas-svg');
 if(!stage||!svg)return;
 map.dataset.gv148Mounted='yes';
 let pending=0;
 const schedule=()=>{
  if(pending)return;
  pending=requestAnimationFrame(()=>{
   pending=0;
   if(!map.isConnected){observer.disconnect();size?.disconnect();return}
   drawLabels(map);
  });
 };
 const observer=new MutationObserver(schedule);
 observer.observe(svg,{attributes:true,attributeFilter:['viewBox']});
 const pins=svg.querySelector('.atlas-pins');
 if(pins)observer.observe(pins,{childList:true});
 const size=typeof ResizeObserver==='function'?new ResizeObserver(schedule):null;
 size?.observe(stage);
 map.__gv148Sync=schedule;
 schedule();
}
function syncMaps(){
 for(const id of mapIds){
  const map=document.getElementById(id);
  if(!map)continue;
  attach(map);
  map.__gv148Sync?.();
 }
}
const oldDraw=typeof atlasDraw==='function'?atlasDraw:null;
if(oldDraw){
 atlasDraw=function(){
  const result=oldDraw.apply(this,arguments);
  syncMaps();
  return result;
 };
}
const oldCreate=typeof atlasCreate==='function'?atlasCreate:null;
if(oldCreate){
 atlasCreate=function(){
  const result=oldCreate.apply(this,arguments);
  syncMaps();
  return result;
 };
}
document.addEventListener('click',event=>{
 if(event.target.closest?.('[data-layer]'))requestAnimationFrame(syncMaps);
},true);
document.addEventListener('DOMContentLoaded',syncMaps);
syncMaps();
})();