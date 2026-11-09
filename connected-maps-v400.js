/* GeoVerse Connected Maps v400 — bridges the world atlas and continent atlas.
 * Keeps the quiz map and 3D globe independent. Uses existing country metadata and navigation.
 */
(function(){
'use strict';
const lang=(ar,en)=>document.documentElement.lang==='en'?en:ar;
const norm=value=>String(value||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9\u0600-\u06ff]/g,'');
const store=()=>window.GeoVerseV4?.store;
function recordForFeature(feature){
 const s=store(),name=norm(feature?.properties?.name);
 if(!s?.countries||!name)return null;
 return s.countries.find(row=>norm(row.name)===name)||s.byName?.get?.(name)||null;
}
function addWorldProfileAction(){
 const r=typeof atlasRuntime!=='undefined'?atlasRuntime:null;
 if(!r||r.id!=='worldMap'||!r.node?.isConnected)return;
 const card=r.node.querySelector('.gv140-country-card');
 if(!card||card.hidden||card.querySelector('[data-gv400-open-profile]'))return;
 const selected=r.node.querySelector('.atlas-country.gv140-active');
 const feature=selected&&r.features?.[Number(selected.dataset.mapCountry)];
 const record=recordForFeature(feature);
 if(!record?.code)return;
 const button=document.createElement('button');
 button.type='button';button.className='gv400-map-link';button.dataset.gv400OpenProfile=record.code;
 button.textContent=lang('فتح ملف الدولة الكامل','Open full country profile');
 card.appendChild(button);
}
function addContinentAtlasAction(){
 document.querySelectorAll('.gv-c2-premium-card').forEach(card=>{
  if(card.querySelector('[data-gv400-world-atlas]'))return;
  const open=card.querySelector('[data-gv-c2-open]');
  const code=open?.dataset.gvC2Open;
  if(!code)return;
  const button=document.createElement('button');
  button.type='button';button.className='gv400-map-link gv400-continent-link';
  button.dataset.gv400WorldAtlas=code;
  button.textContent=lang('عرض الموقع على أطلس العالم','View on world atlas');
  open.insertAdjacentElement('afterend',button);
 });
}
function focusWorldCountry(code){
 const started=performance.now();
 function attempt(){
  if(state.page!=='explore')return;
  const r=typeof atlasRuntime!=='undefined'?atlasRuntime:null;
  if(r?.id==='worldMap'&&r.features?.length){
   const meta=store()?.countries?.find(row=>String(row.code).toUpperCase()===String(code).toUpperCase());
   const target=norm(meta?.name);
   const index=r.features.findIndex(feature=>norm(feature.properties?.name)===target);
   const path=index>=0?r.node.querySelector('.atlas-country[data-map-country="'+index+'"]'):null;
   if(path){path.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window}));r.node.scrollIntoView({behavior:'smooth',block:'center'});return}
  }
  if(performance.now()-started<6500)requestAnimationFrame(attempt);
 }
 requestAnimationFrame(attempt);
}
document.addEventListener('click',event=>{
 const profile=event.target.closest('[data-gv400-open-profile]');
 if(profile){
  event.preventDefault();event.stopImmediatePropagation();
  const code=profile.dataset.gv400OpenProfile;
  if(code&&typeof setPage==='function')setPage('country-v4',code);
  return;
 }
 const world=event.target.closest('[data-gv400-world-atlas]');
 if(world){
  event.preventDefault();event.stopImmediatePropagation();
  const code=world.dataset.gv400WorldAtlas;
  if(code&&typeof setPage==='function'){setPage('explore');focusWorldCountry(code)}
 }
},true);
const observer=new MutationObserver(()=>{
 addWorldProfileAction();
 addContinentAtlasAction();
});
observer.observe(document.getElementById('main')||document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});
addWorldProfileAction();addContinentAtlasAction();
const style=document.createElement('style');
style.textContent=`
.gv400-map-link{display:flex;align-items:center;justify-content:center;width:100%;min-height:42px;margin-top:9px;padding:10px 14px;border:1px solid rgba(111,220,205,.48);border-radius:12px;background:linear-gradient(135deg,#164d60,#0d354c);color:#eafffb;font:700 13px/1.5 inherit;cursor:pointer;transition:border-color .18s,transform .18s}
.gv400-map-link:hover,.gv400-map-link:focus-visible{border-color:#78e5d2;transform:translateY(-1px);outline:2px solid rgba(120,229,210,.18)}
.gv400-continent-link{margin-top:8px}
body.light .gv400-map-link{background:linear-gradient(135deg,#e8f8f5,#f5fbff);color:#174653;border-color:#b4dcd5}
`;
document.head.appendChild(style);
window.GeoVerseConnectedMapsV400={version:'v400',focusWorldCountry};
})();