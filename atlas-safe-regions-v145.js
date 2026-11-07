/* GeoVerse v145 — source-level safe natural regions.
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
  // Show an actual ocean label on the water rather than using a huge
  // approximate filled shape that can cover unrelated continents.
  if(category==='oceans'&&!pin.querySelector('.gv145-label')){
   const label=document.createElementNS('http://www.w3.org/2000/svg','text');
   label.setAttribute('class','gv145-label');
   label.setAttribute('text-anchor','middle');
   label.setAttribute('x','0');
   label.setAttribute('y','-17');
   label.setAttribute('pointer-events','none');
   label.textContent=language(v[0],v[1]);
   pin.appendChild(label);
  }
 });
 const foot=node.querySelector('.gv140-foot-hint');
 if(foot&&regions.has(layer)){
  foot.textContent=language('المعالم محددة بعلامات موضعية تقريبية · اضغط على العلامة للتفاصيل',
  'Landmarks shown as indicative location markers · Tap for details');
 }
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
 if(!r||r.id==='gameMap'||!isRegion(layer))
  return drawOriginal.apply(this,arguments);
 const context=this,args=arguments;
 const result=preventProblematicShapes(layer,()=>drawOriginal.apply(context,args));
 // Last-resort DOM safeguard, including against other late decorators.
 const shapes=r.node?.querySelector('.atlas-selected');
 if(shapes){
  shapes.querySelectorAll('.atlas-feature,.gv142-feature-hit').forEach(el=>el.remove());
 }
 styleMarkers(r,layer);
 return result;
};
})();