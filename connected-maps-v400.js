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
function compactWorldCard(){
 const r=typeof atlasRuntime!=='undefined'?atlasRuntime:null;
 if(r?.id!=='worldMap'||!r.node?.isConnected)return;
 const card=r.node.querySelector('.gv140-country-card');
 if(!card||card.hidden||card.classList.contains('gv154-smart-card'))return;
 card.classList.add('gv413-compact-country');
 // Closing the card already returns to the world map; remove the redundant action.
 card.querySelectorAll('.gv140-map-clear').forEach(button=>button.remove());
 const declarations={position:'absolute',top:'auto',bottom:'66px',right:'8px',left:'auto',width:'min(192px, 47%)',maxWidth:'192px',minWidth:'0',height:'auto',minHeight:'0',maxHeight:'min(245px, 57%)',padding:'9px',margin:'0',transform:'none',overflowY:'auto',boxSizing:'border-box',zIndex:'30'};
 if(card.style.getPropertyValue('left')&&card.style.getPropertyValue('left')!=='auto')return;
 for(const [key,value] of Object.entries(declarations))card.style.setProperty(key.replace(/[A-Z]/g,m=>'-'+m.toLowerCase()),value,'important');
}
function addWorldCountryFlag(){
 const r=typeof atlasRuntime!=='undefined'?atlasRuntime:null;
 if(!r||r.id!=='worldMap'||!r.node?.isConnected)return;
 const card=r.node.querySelector('.gv140-country-card');
 if(!card||card.hidden)return;
 const selected=r.node.querySelector('.atlas-country.gv140-active');
 const feature=selected&&r.features?.[Number(selected.dataset.mapCountry)];
 const record=recordForFeature(feature);
 const code=String(record?.code||'').toLowerCase();
 const old=card.querySelector('[data-gv406-country-flag]');
 if(!/^[a-z]{2}$/.test(code)){old?.remove();return}
 if(old?.dataset.gv406CountryFlag===code)return;
 old?.remove();
 const img=document.createElement('img');
 img.dataset.gv406CountryFlag=code;
 img.className='gv406-world-country-flag';
 img.src='https://flagcdn.com/w160/'+code+'.png';
 img.alt=lang('علم '+String(record?.nameAr||record?.name||''),'Flag of '+String(record?.name||''));
 img.loading='lazy';img.decoding='async';
 img.onerror=()=>img.remove();
 card.prepend(img);
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
function addWorldContinentAction(){
 const r=typeof atlasRuntime!=='undefined'?atlasRuntime:null;
 if(!r||r.id!=='worldMap'||!r.node?.isConnected)return;
 const card=r.node.querySelector('.gv140-country-card');
 if(!card||card.hidden||card.querySelector('[data-gv402-open-continent]'))return;
 const selected=r.node.querySelector('.atlas-country.gv140-active');
 const feature=selected&&r.features?.[Number(selected.dataset.mapCountry)];
 const record=recordForFeature(feature);
 const continent=String(record?.continent||'');
 const keys=['Asia','Africa','Europe','North America','South America','Oceania','Antarctica'];
 const index=keys.findIndex(name=>norm(name)===norm(continent));
 if(index<0)return;
 const button=document.createElement('button');
 button.type='button';button.className='gv400-map-link';button.dataset.gv402OpenContinent=String(index);
 button.textContent=lang('استكشف القارة على خريطتها','Explore this continent map');
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
 const active=typeof state!=='undefined'?String(state.v4Code||'').toUpperCase():'';
 if(s?.byCode?.has?.(active))return active;
 const raw=typeof state!=='undefined'?state.item:null;
 const code=String(raw||'').toUpperCase();
 if(s?.countries?.some(row=>String(row.code).toUpperCase()===code))return code;
 const heading=document.querySelector('#main h1,#main h2');
 const title=norm(heading?.textContent);
 const row=s?.countries?.find(item=>norm(item.name)===title||norm(item.nameAr)===title||norm(item.ar)===title);
 return row?.code||null;
}
function addCountryFlagHero(){
 if(typeof state==='undefined'||state.page!=='country-v4')return;
 const main=document.getElementById('main');
 // Remove the legacy inserted banner if an older cached script created it.
 main?.querySelectorAll('.gv404-country-flag-hero').forEach(node=>node.remove());
 const hero=main?.querySelector('header.gv9-hero');
 if(!hero)return;
 const code=currentCountryCode();
 if(!code||!/^[A-Z]{2}$/.test(code))return;
 const flagCode=code==='UK'?'gb':code.toLowerCase();
 if(hero.dataset.gv408Flag===flagCode)return;
 hero.dataset.gv408Flag=flagCode;
 hero.classList.add('gv408-national-flag-hero');
 const flag=hero.querySelector('.gv9-flag img');
 const src=flag?.getAttribute('src')||'https://flagcdn.com/'+flagCode+'.svg';
 hero.style.setProperty('--gv408-flag-image','url("'+src.replace(/"/g,'')+'")');
 // Keep the original country title and continent. The small icon is redundant.
 const icon=hero.querySelector('.gv9-flag');
 if(icon)icon.setAttribute('aria-hidden','true');
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
   const index=r.features.findIndex(feature=>{
    const p=feature.properties||{};
    return [p.name,p.ADMIN,p.NAME,p.name_long,p.iso_a2,p.ISO_A2,p.iso_a3].some(v=>norm(v)===target||String(v||'').toUpperCase()===String(code).toUpperCase());
   });
   const feature=index>=0?r.features[index]:null;
   const path=index>=0?r.node.querySelector('.atlas-country[data-map-country="'+index+'"]'):null;
   if(path&&feature){
    path.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window}));
    // A dedicated focus class stays visible even when other map layers redraw.
    r.node.querySelectorAll('.atlas-country.gv411-country-focus').forEach(el=>el.classList.remove('gv411-country-focus'));
    path.classList.add('gv411-country-focus','highlight');
    r.node.dataset.gv411FocusCountry=String(code).toUpperCase();
    // Re-apply the geographic focus after the atlas selection handler has opened its card.
    // This avoids a competing legacy view update during page transitions on mobile Safari.
    setTimeout(()=>requestAnimationFrame(()=>{
     if(atlasRuntime!==r||!r.node.isConnected)return;
     let bounds;try{bounds=r.path?.bounds(feature)}catch(e){}
     if(bounds&&typeof atlasView==='function'){
      const width=bounds[1][0]-bounds[0][0],height=bounds[1][1]-bounds[0][1];
      if(width>0&&height>0&&Number.isFinite(width)&&Number.isFinite(height)){
       const scale=Math.min(9,Math.max(2.4,Math.min(1000/(width*1.8),520/(height*1.8))));
       const w=1000/scale,h=520/scale,cx=(bounds[0][0]+bounds[1][0])/2,cy=(bounds[0][1]+bounds[1][1])/2;
       atlasView([Math.max(0,Math.min(1000-w,cx-w/2)),Math.max(0,Math.min(520-h,cy-h/2)),w,h]);
       path.classList.add('gv411-country-focus','highlight');
      }
     }
    }),720);
    r.node.scrollIntoView({behavior:'smooth',block:'center'});
    return;
   }
  }
  if(performance.now()-started<8000)requestAnimationFrame(attempt);
 }
 requestAnimationFrame(attempt);
}
document.addEventListener('click',event=>{
 // The world atlas must never send a selected country into a generic landmark detail.
 // Reuse the same canonical country route as the Countries & Capitals directory.
 const legacy=event.target.closest('[data-atlas-open]');
 if(legacy&&typeof state!=='undefined'&&state.page==='explore'){
  const r=typeof atlasRuntime!=='undefined'?atlasRuntime:null;
  const selected=r?.id==='worldMap'&&r.node?.querySelector('.atlas-country.gv140-active');
  const feature=selected&&r.features?.[Number(selected.dataset.mapCountry)];
  const record=recordForFeature(feature);
  if(record?.code){
   event.preventDefault();event.stopImmediatePropagation();
   if(typeof setPage==='function')setPage('country-v4',record.code);
   return;
  }
 }
 const profile=event.target.closest('[data-gv400-open-profile]');
 if(profile){
  event.preventDefault();event.stopImmediatePropagation();
  const code=profile.dataset.gv400OpenProfile;
  if(code&&typeof setPage==='function')setPage('country-v4',code);
  return;
 }
 const continent=event.target.closest('[data-gv402-open-continent]');
 if(continent){
  event.preventDefault();event.stopImmediatePropagation();
  if(typeof setPage==='function'){
   setPage('category','continents');
   state.continentIndex=Number(continent.dataset.gv402OpenContinent)||0;
   state.continentFeature='map';
   render();
  }
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
 addWorldCountryFlag();
 compactWorldCard();
 addWorldProfileAction();
 addWorldContinentAction();
 addContinentAtlasAction();
 addProfileAtlasAction();
 addCountryFlagHero();
});
observer.observe(document.getElementById('main')||document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});
addWorldCountryFlag();compactWorldCard();addWorldProfileAction();addWorldContinentAction();addContinentAtlasAction();addProfileAtlasAction();addCountryFlagHero();
const style=document.createElement('style');
style.textContent=`
.gv400-map-link{display:flex;align-items:center;justify-content:center;width:100%;min-height:42px;margin-top:9px;padding:10px 14px;border:1px solid rgba(111,220,205,.48);border-radius:12px;background:linear-gradient(135deg,#164d60,#0d354c);color:#eafffb;font:inherit;font-size:13px;font-weight:700;line-height:1.5;cursor:pointer;transition:border-color .18s,transform .18s}
.gv400-map-link:hover,.gv400-map-link:focus-visible{border-color:#78e5d2;transform:translateY(-1px);outline:2px solid rgba(120,229,210,.18)}
.gv400-continent-link{margin-top:8px}
.gv406-world-country-flag{display:block;width:72px;max-height:48px;object-fit:contain;object-position:left center;margin:0 0 9px;border-radius:5px;box-shadow:0 3px 12px rgba(0,0,0,.2)}
#worldMap .gv155-card-heading{touch-action:none;cursor:grab;user-select:none;min-height:30px}
#worldMap .gv155-card-heading:active{cursor:grabbing}
#worldMap .atlas-country.gv140-active{fill:#ffd43b!important;stroke:#fff2a0!important;stroke-width:2.5px!important;filter:drop-shadow(0 0 5px rgba(255,212,59,.8))}
 #worldMap .gv417-card-grip{display:block!important;text-align:center!important;touch-action:none!important;user-select:none!important;-webkit-user-select:none!important;cursor:grab!important;color:#a9f9ee!important;font-size:12px!important;font-weight:700!important;letter-spacing:.02em!important;padding:8px 6px!important;margin:-5px -5px 4px!important;border-bottom:1px solid rgba(120,240,221,.3)!important;background:rgba(60,200,180,.1)!important;border-radius:9px 9px 3px 3px!important}
#worldMap .gv417-card-grip:active{cursor:grabbing!important}
#worldMap .atlas-country.gv140-active,#worldMap .atlas-country.gv411-country-focus{fill:#ffd43b!important;stroke:#fff3a6!important;stroke-width:2.5px!important;opacity:1!important}
 /* v413: compact card without empty regions; yellow country selection. */
#worldMap .atlas-country.gv411-country-focus,#worldMap .atlas-country.gv140-active.gv411-country-focus{fill:#ffd43b!important;stroke:#fff6ad!important;stroke-width:3!important;stroke-linejoin:round!important;paint-order:stroke fill!important;opacity:1!important;filter:drop-shadow(0 0 7px rgba(255,212,59,.85))!important}
#worldMap .gv140-country-card.gv413-compact-country{display:flex!important;flex-direction:column!important;gap:4px!important;align-items:stretch!important;justify-content:flex-start!important;text-align:start!important}
#worldMap .gv140-country-card.gv413-compact-country[hidden]{display:none!important}
#worldMap .gv140-country-card.gv413-compact-country>*{flex-shrink:0!important;margin-block:0!important}
#worldMap .gv140-country-card.gv413-compact-country .gv155-card-heading{display:flex!important;align-items:center!important;justify-content:space-between!important;min-height:26px!important}
#worldMap .gv140-country-card.gv413-compact-country .gv140-card-title{font-size:17px!important;line-height:1.25!important}
#worldMap .gv140-country-card.gv413-compact-country .gv140-card-meta,#worldMap .gv140-country-card.gv413-compact-country .gv140-card-continent{font-size:11px!important;line-height:1.3!important}
#worldMap .gv140-country-card.gv413-compact-country .gv406-world-country-flag{width:44px!important;height:29px!important;object-fit:contain!important}
#worldMap .gv140-country-card.gv413-compact-country button{min-height:27px!important;padding:4px 7px!important;font-size:11px!important;line-height:1.25!important;margin:2px 0!important}
/* v412: actual atlas overlay uses stage positioning; constrain its box, not only the card content. */
#worldMap.gv140-map .atlas-stage .gv140-country-card:not([hidden]){position:absolute!important;top:auto!important;bottom:64px!important;left:auto!important;right:12px!important;inset-inline-start:auto!important;transform:none!important;width:210px!important;max-width:calc(100% - 24px)!important;height:auto!important;max-height:215px!important;min-height:0!important;overflow-y:auto!important;overscroll-behavior:contain;z-index:18!important;padding:10px!important;box-sizing:border-box}
#worldMap.gv140-map .atlas-stage .gv140-country-card .gv140-card-title{font-size:17px!important;line-height:1.25!important}
#worldMap.gv140-map .atlas-stage .gv140-country-card .gv140-card-meta,#worldMap.gv140-map .atlas-stage .gv140-country-card .gv140-card-continent{font-size:11px!important;line-height:1.3!important}
#worldMap.gv140-map .atlas-stage .gv140-country-card .gv400-map-link{font-size:11px!important;min-height:30px!important;padding:5px!important}
#worldMap.gv140-map .atlas-stage .gv140-country-card .gv140-map-clear{padding:5px 8px!important;min-height:30px!important}
#worldMap .atlas-country.gv411-country-focus{fill:#42f1d4!important;stroke:#fff!important;stroke-width:3px!important;opacity:1!important;filter:drop-shadow(0 0 7px #42f1d4)}
@media(max-width:700px){#worldMap.gv140-map .atlas-stage .gv140-country-card:not([hidden]){width:175px!important;max-height:180px!important;bottom:65px!important;right:7px!important;padding:8px!important}}
/* v411: a compact map card and persistent country focus on the SVG itself. */
#worldMap .atlas-country.gv411-country-focus{fill:#55ead6!important;stroke:#f3fffc!important;stroke-width:2.4!important;stroke-linejoin:round;paint-order:stroke fill;filter:drop-shadow(0 0 5px rgba(69,250,222,.9));vector-effect:non-scaling-stroke}
#worldMap .gv140-country-card{width:min(280px,calc(100% - 28px))!important;max-width:280px!important;max-height:230px!important;min-height:0!important;overflow-y:auto!important;padding:12px!important;box-sizing:border-box}
#worldMap .gv140-country-card h2,#worldMap .gv140-country-card h3{margin:3px 0!important}
#worldMap .gv140-country-card .gv400-map-link{padding:7px 9px!important;min-height:34px!important;font-size:12px!important}
#worldMap .gv140-country-card .gv406-world-country-flag{width:48px!important;max-height:31px!important}
@media(max-width:700px){#worldMap .gv140-country-card{width:min(245px,calc(100% - 24px))!important;max-width:245px!important;max-height:185px!important;font-size:12px!important}#worldMap .gv140-country-card .gv400-map-link{margin-top:4px!important}}
/* v410: improve text contrast over bright flag emblems and tighten atlas card. */
#main header.gv9-hero.gv408-national-flag-hero::after{background:linear-gradient(90deg,rgba(2,13,27,.72),rgba(2,13,27,.47)),linear-gradient(0deg,rgba(2,13,27,.87),rgba(2,13,27,.04) 90%)}
#main header.gv9-hero.gv408-national-flag-hero .gv9-hero-title{background:linear-gradient(90deg,rgba(2,13,27,.44),rgba(2,13,27,.1));border-radius:14px;padding:12px 15px}
#worldMap .gv140-country-card:has(.gv406-world-country-flag){min-height:0!important}
#worldMap .gv140-country-card .gv406-world-country-flag{margin:0 0 5px!important;max-height:42px}
#worldMap .gv140-country-card:has(.gv406-world-country-flag) .gv400-map-link{margin-top:6px}
/* v408: use the EXISTING country directory hero, never insert a second header. */
#main header.gv9-hero.gv408-national-flag-hero{position:relative;isolation:isolate;overflow:hidden;min-height:clamp(190px,29vw,290px);display:flex;align-items:flex-end;background:#09293c;border-color:rgba(105,221,209,.48)}
#main header.gv9-hero.gv408-national-flag-hero::before{content:"";position:absolute;inset:0;z-index:-2;background-image:var(--gv408-flag-image);background-size:cover;background-position:center;opacity:.92}
#main header.gv9-hero.gv408-national-flag-hero::after{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(90deg,rgba(3,17,32,.66),rgba(3,17,32,.38)),linear-gradient(0deg,rgba(3,17,32,.76),transparent 85%)}
#main header.gv9-hero.gv408-national-flag-hero .gv9-hero-title{position:relative;z-index:1;width:100%;padding:8px 0}
#main header.gv9-hero.gv408-national-flag-hero .gv9-hero-title h1,#main header.gv9-hero.gv408-national-flag-hero .gv9-hero-title p{color:#fff;text-shadow:0 3px 15px rgba(0,0,0,.75)}
#main header.gv9-hero.gv408-national-flag-hero .gv9-eyebrow{color:#f4e6ba;text-shadow:0 2px 10px #000}
#main header.gv9-hero.gv408-national-flag-hero .gv9-flag{display:none!important}
@media(max-width:700px){#main header.gv9-hero.gv408-national-flag-hero{min-height:210px;padding:20px!important;border-radius:19px}}
/* Country profile hero: official national flag as the page's visual header. */
#main .gv404-country-flag-hero{
 position:relative;isolation:isolate;display:flex;align-items:flex-end;
 box-sizing:border-box;width:100%;min-height:clamp(190px,30vw,310px);
 margin:4px 0 22px;overflow:hidden;border-radius:22px;
 border:1px solid rgba(124,221,215,.38);
 background:linear-gradient(135deg,#123b50,#0b263b);
 box-shadow:0 14px 34px rgba(0,10,24,.22),inset 0 1px rgba(255,255,255,.12);
}
#main .gv404-country-flag-image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;z-index:-2}
#main .gv404-country-flag-shade{position:absolute;inset:0;z-index:-1;background:linear-gradient(0deg,rgba(2,13,27,.94) 0%,rgba(2,16,29,.38) 48%,rgba(2,16,29,.06) 100%)}
#main .gv404-country-flag-names{position:relative;z-index:1;padding:clamp(18px,3.5vw,32px);max-width:100%}
#main .gv404-country-flag-names h1{margin:0;color:#fff;font-size:clamp(27px,4vw,42px);font-weight:900;line-height:1.3;text-shadow:0 3px 16px rgba(0,0,0,.55);overflow-wrap:anywhere}
#main .gv404-country-flag-names p{margin:6px 0 0;color:rgba(245,252,255,.9);font-size:clamp(13px,1.7vw,17px);font-weight:650;text-shadow:0 2px 10px rgba(0,0,0,.55)}
#main .gv404-country-flag-hero.gv404-flag-fallback{background:linear-gradient(135deg,#123b50,#0b263b)}
@media(max-width:700px){#main .gv404-country-flag-hero{min-height:190px;margin:2px 0 17px;border-radius:17px}#main .gv404-country-flag-names{padding:17px}#main .gv404-country-flag-names h1{font-size:27px}}
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
window.GeoVerseConnectedMapsV400={version:'v417',focusWorldCountry};
})();