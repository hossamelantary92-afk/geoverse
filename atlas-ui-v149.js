/* GeoVerse v149 — accessible HTML ocean names, aligned with moving map.
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
 const mapRect=svg.getBoundingClientRect();
 const small=rect.width<620;
 const reserveTop=small?Math.min(164,rect.height*.39):130;
 const reserveBottom=small?104:92;
 const occupied=[];
 // Sort smaller and mid-latitude oceans first, so labels positioned close
 // to continental shelves stay clear of other ocean labels.
 const labels=[...overlay.querySelectorAll('.gv148-ocean-label')];
 const ordered=labels.sort((a,b)=>Number(a.dataset.ocean)-Number(b.dataset.ocean));
 for(const label of ordered){
  const marker=svg.querySelector('.atlas-pin[data-map-pin="oceans:'+label.dataset.ocean+'"]');
  const matrix=marker?.getScreenCTM?.();
  if(!matrix){label.hidden=true;continue}
  try{
   const p=svg.createSVGPoint();p.x=0;p.y=0;
   const point=p.matrixTransform(matrix);
   const rawX=point.x-rect.left,rawY=point.y-rect.top;
   if(!Number.isFinite(rawX)||!Number.isFinite(rawY)||
      rawX < 4||rawX>rect.width-4||
      rawY < reserveTop-25||rawY>rect.height-reserveBottom+15){
    label.hidden=true;continue;
   }
   // Do not let the country/continent switcher or the left/right edges
   // cover the text. Clamp the label to the usable cartographic viewport.
   const width=Math.min(label.offsetWidth||110,small?126:180);
   const height=label.offsetHeight||30;
   const half=width/2+10;
   const x=Math.max(half,Math.min(rect.width-half,rawX));
   const y=Math.max(reserveTop+height+5,
                    Math.min(rect.height-reserveBottom,rawY-10));
   const rectLabel={l:x-width/2-6,r:x+width/2+6,t:y-height-6,b:y+6};
   const clash=occupied.some(item=>!(rectLabel.r<item.l||rectLabel.l>item.r||rectLabel.b<item.t||rectLabel.t>item.b));
   const excessiveShift=Math.abs(y-rawY)>Math.max(75,rect.height*.16);
   // Extremely northern labels are intentionally omitted at world scale:
   // the point is directly beneath the continent navigation tabs.
   if(clash||excessiveShift){label.hidden=true;continue}
   label.hidden=false;
   label.style.left=x.toFixed(1)+'px';
   label.style.top=y.toFixed(1)+'px';
   occupied.push(rectLabel);
  }catch(e){label.hidden=true}
 }
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