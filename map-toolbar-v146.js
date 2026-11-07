/* GeoVerse v146 — grouped, logical Explorer map taxonomy.
 * Presentation only: preserves exact data-layer/data-map-boundaries events.
 */
(function(){
 'use strict';
 if(typeof explore!=='function')return;
 const previous=explore;
 const groupDefs=[
  {id:'world',ar:'العالم',en:'World',items:['countries','continents']},
  {id:'water',ar:'المسطحات والمجاري المائية',en:'Water & waterways',items:['oceans','seas','rivers','lakes','waterfalls','straits','islands','gulfs']},
  {id:'land',ar:'التضاريس والطبيعة',en:'Land & nature',items:['mountains','deserts','forests','volcanoes','glaciers','valleys','grasslands']},
  {id:'climate',ar:'المناخ والأقاليم',en:'Climate & regions',items:['climate']}
 ];
 const t=(ar,en)=>document.documentElement.lang==='en'?en:ar;
 function organize(markup){
  const doc=new DOMParser().parseFromString(markup,'text/html');
  const old=doc.getElementById('mapToolbar');
  if(!old)return markup;
  const buttons=new Map();
  old.querySelectorAll('button[data-layer]').forEach(btn=>buttons.set(btn.dataset.layer,btn));
  const toggle=old.querySelector('button[data-map-boundaries]');
  const toolbar=doc.createElement('div');
  toolbar.className='map-toolbar gv146-toolbar';
  toolbar.id='mapToolbar';
  toolbar.setAttribute('aria-label',t('تصنيفات الخريطة التفاعلية','Interactive map categories'));
  for(const group of groupDefs){
   const section=doc.createElement('section');
   section.className='gv146-group gv146-'+group.id;
   const heading=doc.createElement('h2');
   heading.className='gv146-group-title';
   heading.textContent=t(group.ar,group.en);
   section.appendChild(heading);
   const grid=doc.createElement('div');
   grid.className='gv146-group-grid';
   grid.setAttribute('role','group');
   grid.setAttribute('aria-label',heading.textContent);
   for(const id of group.items){
    const button=buttons.get(id);
    if(!button)continue;
    grid.appendChild(button);
   }
   section.appendChild(grid);
   toolbar.appendChild(section);
  }
  const tools=doc.createElement('div');
  tools.className='gv146-actions';
  const text=doc.createElement('span');
  text.className='gv146-actions-label';
  text.textContent=t('خيارات العرض','خيارات العرض / View options');
  tools.appendChild(text);
  const controls=doc.createElement('div');
  controls.className='gv146-actions-buttons';
  if(buttons.has('all'))controls.appendChild(buttons.get('all'));
  if(toggle)controls.appendChild(toggle);
  tools.appendChild(controls);
  toolbar.appendChild(tools);
  old.replaceWith(toolbar);
  return doc.body.innerHTML;
 }
 explore=function(){return organize(previous.apply(this,arguments))};
})();