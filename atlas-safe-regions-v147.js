/* GeoVerse v147 — correctly shaped RTL ocean labels and safe natural regions.
 * The approximate outline data remains available to educational articles, but
 * we do not project forest, desert, or ocean polygons on the interactive atlas.
 * Quiz maps and the 3D globe are deliberately untouched.
 */
(function(){
'use strict';
const regions=new Set(['forests','deserts','oceans']);
if(typeof atlasDraw!=='function'||typeof isLayerShape!=='function')return;
const drawOriginal=atlasDraw;
const shapeOriginal=isLayerShape;
const isRegion=(layer)=>regions.has(layer);
const language=(ar,en)=>document.documentElement.lang==='en'?en:ar;
function styleMarkers(r,layer){
 const node=r?.node;if(!node?.isConnected)return;
 node.dataset.gv145Layer=layer;
 const pins=node.querySelectorAll('.atlas-pins > .atlas-pin[data-map-pin]');
 pins.forEach(pin=>{
  const raw=pin.dataset.mapPin||'';
  const at=raw.lastIndexOf(':');
  const category=at<0?'':raw.slice(0,at),index=at<0?-1:Number(raw.slice(at+1));
  if(!regions.has(category)||!Number.isInteger(index)||!geo?.[category]?.[index])return;
  pin.classList.add('gv145-point','gv145-'+category);
  const v=geo[category][index];
  // Old inline SVG text reverses Arabic glyph order in mobile Safari.
  // The labels are now rendered as normal HTML on a separate overlay.
  pin.querySelectorAll('.gv145-label').forEach(label=>label.remove());
 });
 const foot=node.querySelector('.gv140-foot-hint');
 if(foot&&regions.has(layer)){
  foot.textContent=language('المعالم محددة بعلامات موضعية تقريبية · اضغط على العلامة للتفاصيل',
  'Landmarks shown as indicative location markers · Tap for details');
 }
}
function removeOceanLabels(r){
 const stage=r?.node?.querySelector('.atlas-stage');
 if(!stage)return;
 const layer=stage.querySelector('.gv147-ocean-labels');
 if(layer)layer.replaceChildren();
}
function syncOceanLabels(r){
 const stage=r?.node?.querySelector('.atlas-stage');
 const svg=stage?.querySelector('.atlas-svg');
 const layer=stage?.querySelector('.gv147-ocean-labels');
 if(!stage||!svg||!layer||!stage.isConnected||atlasRuntime!==r)return;
 // Get screen positions from the SVG matrix. This follows pinch zoom,
 // dragging, continent jumps and viewport resizing without rotating text.
 const rect=stage.getBoundingClientRect();
 for(const el of layer.querySelectorAll('[data-gv147-ocean]')){
  const pin=r.node.querySelector('.atlas-pin[data-map-pin="oceans:'+el.dataset.gv147Ocean+'"]');
  if(!pin){el.hidden=true;continue}
  const matrix=pin.getScreenCTM?.();
  if(!matrix){el.hidden=true;continue}
  const point=svg.createSVGPoint();
  point.x=0;point.y=0;
  const center=point.matrixTransform(matrix);
  const x=center.x-rect.left,y=center.y-rect.top;
  // Hide a label as its anchor moves off the map's visible edges.
  const inside=x>=25&&x<=rect.width-25&&y>=24&&y<=rect.height-24;
  el.hidden=!inside;
  if(inside){
   el.style.left=x.toFixed(1)+'px';
   el.style.top=(y-12).toFixed(1)+'px';
  }
 }
}
function oceanLabels(r){
 const stage=r?.node?.querySelector('.atlas-stage');
 if(!stage||!stage.isConnected)return;
 let overlay=stage.querySelector('.gv147-ocean-labels');
 if(!overlay){
  overlay=document.createElement('div');
  overlay.className='gv147-ocean-labels';
  overlay.setAttribute('aria-hidden','true');
  stage.appendChild(overlay);
 }
 overlay.replaceChildren();
 (geo.oceans||[]).forEach((entry,i)=>{
  const pin=r.node.querySelector('.atlas-pin[data-map-pin="oceans:'+i+'"]');
  if(!pin)return;
  const tag=document.createElement('span');
  tag.className='gv147-ocean-name';
  tag.dataset.gv147Ocean=String(i);
  tag.lang=document.documentElement.lang==='en'?'en':'ar';
  tag.dir=document.documentElement.lang==='en'?'ltr':'rtl';
  tag.textContent=language(entry[0],entry[1]);
  overlay.appendChild(tag);
 });
 if(!stage.__gv147LabelWatch){
  stage.__gv147LabelWatch=true;
  const svg=stage.querySelector('.atlas-svg');
  let frame=0;
  const schedule=()=>{
   if(frame)return;
   frame=requestAnimationFrame(()=>{
    frame=0;
    if(!stage.isConnected){
     watcher.disconnect();
     resize?.disconnect();
     return;
    }
    syncOceanLabels(r);
   });
  };
  const watcher=new MutationObserver(schedule);
  if(svg)watcher.observe(svg,{attributes:true,attributeFilter:['viewBox']});
  const resize=typeof ResizeObserver==='function'?new ResizeObserver(schedule):null;
  resize?.observe(stage);
  stage.__gv147UpdateLabels=schedule;
 }
 stage.__gv147UpdateLabels?.();
}
function preventProblematicShapes(layer,callback){
 const old=isLayerShape;
 try{
  isLayerShape=function(type,place){
   // This guard lives only for the synchronous drawing operation,
   // so detail pages and 3D globe shape geometry remain intact.
   if(isRegion(layer)&&type===layer)return null;
   return shapeOriginal(type,place);
  };
  return callback();
 }finally{isLayerShape=old}
}
atlasDraw=function(layer,center){
 const r=atlasRuntime;
 if(!r||r.id==='gameMap')return drawOriginal.apply(this,arguments);
 if(!isRegion(layer)){
  removeOceanLabels(r);
  return drawOriginal.apply(this,arguments);
 }
 const context=this,args=arguments;
 const result=preventProblematicShapes(layer,()=>drawOriginal.apply(context,args));
 // Last-resort DOM safeguard, including against other late decorators.
 const shapes=r.node?.querySelector('.atlas-selected');
 if(shapes){
  shapes.querySelectorAll('.atlas-feature,.gv142-feature-hit').forEach(el=>el.remove());
 }
 styleMarkers(r,layer);
 if(layer==='oceans')oceanLabels(r);
 else removeOceanLabels(r);
 return result;
};
})();