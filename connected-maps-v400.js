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
function currentCountryCode(){
 const s=store();
 const raw=typeof state!=='undefined'?state.item:null;
 const code=String(raw||'').toUpperCase();
 if(s?.countries?.some(row=>String(row.code).toUpperCase()===code))return code;
 const heading=document.querySelector('#main h1,#main h2');
 const title=norm(heading?.textContent);
 const row=s?.countries?.find(item=>norm(item.name)===title||norm(item.nameAr)===title||norm(item.ar)===title);
 return row?.code||null;
}
function addProfileAtlasAction(){
 if(typeof state==='undefined'||state.page!=='country-v4')return;
 const nav=document.querySelector('#main .gv387-country-nav');
 if(!nav||nav.querySelector('[data-gv401-profile-atlas]'))return;
 const code=currentCountryCode();if(!code)return;
 const button=document.createElement('button');
 button.type='button';button.className='gv387-countries';button.dataset.gv401ProfileAtlas=code;
 button.textContent=lang('عرض الدولة على الخريطة','Show country on map');
 nav.appendChild(button);
}
function focusWorldCountry(code){
 const started=performance.now();
 function attempt(){
  const r=typeof atlasRuntime!=='undefined'?atlasRuntime:null;
  if(r?.id==='worldMap'&&r.node?.isConnected&&r.features?.length){
   const meta=store()?.countries?.find(row=>String(row.code).toUpperCase()===String(code).toUpperCase());
   const target=norm(meta?.name);
   const index=r.features.findIndex(feature=>norm(feature.properties?.name)===target);
   const feature=index>=0?r.features[index]:null;
   const path=index>=0?r.node.querySelector('.atlas-country[data-map-country="'+index+'"]'):null;
   if(path&&feature){
    path.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window}));
    // Re-apply the geographic focus after the atlas selection handler has opened its card.
    // This avoids a competing legacy view update during page transitions on mobile Safari.
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
     if(atlasRuntime!==r||!r.node.isConnected)return;
     let bounds;try{bounds=r.path?.bounds(feature)}catch(e){}
     if(bounds&&typeof atlasView==='function'){
      const width=bounds[1][0]-bounds[0][0],height=bounds[1][1]-bounds[0][1];
      if(width>0&&height>0&&Number.isFinite(width)&&Number.isFinite(height)){
       const scale=Math.min(5.2,Math.max(1.7,Math.min(1000/(width*2.45),520/(height*2.45))));
       const w=1000/scale,h=520/scale,cx=(bounds[0][0]+bounds[1][0])/2,cy=(bounds[0][1]+bounds[1][1])/2;
       atlasView([Math.max(0,Math.min(1000-w,cx-w/2)),Math.max(0,Math.min(520-h,cy-h/2)),w,h]);
      }
     }
    }));
    r.node.scrollIntoView({behavior:'smooth',block:'center'});
    return;
   }
  }
  if(performance.now()-started<8000)requestAnimationFrame(attempt);
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
 const world=event.target.closest('[data-gv400-world-atlas],[data-gv401-profile-atlas]');
 if(world){
  event.preventDefault();event.stopImmediatePropagation();
  const code=world.dataset.gv400WorldAtlas||world.dataset.gv401ProfileAtlas;
  if(code&&typeof setPage==='function'){setPage('explore');focusWorldCountry(code)}
 }
},true);
const observer=new MutationObserver(()=>{
 addWorldProfileAction();
 addContinentAtlasAction();
 addProfileAtlasAction();
});
observer.observe(document.getElementById('main')||document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});
addWorldProfileAction();addContinentAtlasAction();addProfileAtlasAction();
const style=document.createElement('style');
style.textContent=`
.gv400-map-link{display:flex;align-items:center;justify-content:center;width:100%;min-height:42px;margin-top:9px;padding:10px 14px;border:1px solid rgba(111,220,205,.48);border-radius:12px;background:linear-gradient(135deg,#164d60,#0d354c);color:#eafffb;font:inherit;font-size:13px;font-weight:700;line-height:1.5;cursor:pointer;transition:border-color .18s,transform .18s}
.gv400-map-link:hover,.gv400-map-link:focus-visible{border-color:#78e5d2;transform:translateY(-1px);outline:2px solid rgba(120,229,210,.18)}
.gv400-continent-link{margin-top:8px}
/* Keep selected-country cards fully usable on small screens without covering map controls. */
#worldMap.gv140-map .gv140-country-card.gv155-country-card:not([hidden]),
#detailMap.gv140-map .gv140-country-card.gv155-country-card:not([hidden]){
 box-sizing:border-box!important;width:min(308px,calc(100% - 24px))!important;
 max-height:min(46%,310px)!important;min-height:0!important;height:auto!important;
 bottom:clamp(112px,16%,146px)!important;padding:12px 14px!important;
 overflow-y:auto!important;overflow-x:hidden!important;
 overscroll-behavior:contain!important;-webkit-overflow-scrolling:touch!important;
 scrollbar-width:thin!important;scrollbar-color:rgba(111,220,205,.55) transparent!important;
}
#worldMap.gv140-map .gv140-country-card.gv155-country-card .gv400-map-link,
#detailMap.gv140-map .gv140-country-card.gv155-country-card .gv400-map-link{flex:none!important}
@media(max-width:700px){
 #worldMap.gv140-map .gv140-country-card.gv155-country-card:not([hidden]),
 #detailMap.gv140-map .gv140-country-card.gv155-country-card:not([hidden]){
  right:10px!important;width:min(320px,calc(100% - 20px))!important;
  max-height:min(45%,320px)!important;bottom:clamp(108px,15%,138px)!important;
 }
}
body.light .gv400-map-link{background:linear-gradient(135deg,#e8f8f5,#f5fbff);color:#174653;border-color:#b4dcd5}
`;
document.head.appendChild(style);
window.GeoVerseConnectedMapsV400={version:'v402',focusWorldCountry};
})();