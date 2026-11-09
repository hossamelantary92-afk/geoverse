/* GeoVerse C5 — dedicated continent feature pages.
 * Home: seven original photo cards and three feature navigation cards.
 * Features: standalone maps, comparison and highlights; no duplicated long widgets.
 * No changes to global atlas, main Globe, games, saved study progress or original article screens.
 */
(function(){
'use strict';
const features=[
 {id:'map',ar:'خرائط القارات',en:'Continent Maps',subAr:'حدود الدول وخريطة تفاعلية لكل قارة',subEn:'Explore country borders on each continent',icon:'map'},
 {id:'compare',ar:'مقارنة القارات',en:'Continent Comparison',subAr:'المساحة والسكان والدول وأعلى القمم',subEn:'Compare area, people, atlas entries and summits',icon:'compare'},
 {id:'highlights',ar:'معالم القارات',en:'Continent Highlights',subAr:'أشهر المعالم الجغرافية والطبيعية',subEn:'Explore natural landmarks across the world',icon:'mountain'}
];
const namesEn=['Asia','Africa','Europe','North America','South America','Oceania','Antarctica'];
const namesAr=['آسيا','أفريقيا','أوروبا','أمريكا الشمالية','أمريكا الجنوبية','أوقيانوسيا','أنتاركتيكا'];
const escape=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const L=(ar,en)=>state.lang==='ar'?ar:en;
const artwork={
 map:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"/><path d="M9 3v15M15 6v15"/><circle cx="12" cy="11" r="2"/></svg>',
 compare:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20h16"/><rect x="5" y="12" width="4" height="8" rx="1"/><rect x="11" y="7" width="4" height="13" rx="1"/><rect x="17" y="3" width="4" height="17" rx="1"/></svg>',
 mountain:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m2 20 7-14 4 7 3-5 6 12H2Z"/><path d="m6 12 3-3 3 4"/></svg>'
};
function clearView(){state.continentFeature=null;}
function tiles(){
 return '<section class="gv-c5-directory" id="gvC5Directory"><div class="gv-c5-directory-heading"><div><span class="eyebrow">EXPLORE MORE · CONTINENT ATLAS</span><h2>'+L('اكتشف المزيد','Discover more')+'</h2><p>'+L('ثلاث تجارب مستقلة لتستكشف القارات براحتك، من غير ازدحام صفحة القارات.','Three separate ways to explore without crowding the continent cards.')+'</p></div></div>'+
 '<div class="gv-c5-grid">'+features.map(f=>'<button type="button" class="gv-c5-tile" data-gv-c5-open="'+f.id+'" aria-label="'+escape(L(f.ar,f.en))+'">'+
 '<span class="gv-c5-tile-icon">'+artwork[f.icon]+'</span><span class="gv-c5-tile-copy"><strong>'+L(f.ar,f.en)+'</strong><small>'+L(f.subAr,f.subEn)+'</small></span><span class="gv-c5-tile-arrow" aria-hidden="true">↗</span></button>').join('')+'</div></section>';
}
function independent(){
 const f=features.find(x=>x.id===state.continentFeature);
 if(!f){clearView();return}
 const idx=Math.max(0,Math.min(6,Number(state.continentIndex)||0));state.continentIndex=idx;
 const switcher=f.id==='highlights'?'<div class="gv-c5-continents" aria-label="'+L('اختر قارة','Choose a continent')+'">'+namesEn.map((name,i)=>'<button type="button" data-gv-c5-region="'+i+'" class="'+(idx===i?'active':'')+'" aria-pressed="'+(idx===i)+'">'+escape(L(namesAr[i],name))+'</button>').join('')+'</div>':'';
 const main=document.getElementById('main');if(!main)return;
 main.innerHTML='<div class="gv-c5-page" id="gvC5IndependentPage"><nav class="gv-c5-backline" aria-label="'+L('العودة إلى القارات','Back to continents')+'"><button type="button" class="gv-c5-back" data-gv-c5-back>← '+L('العودة إلى القارات','Back to continents')+'</button><span>'+L('القارات السبع','Seven continents')+' / '+L(f.ar,f.en)+'</span></nav>'+
 '<header class="gv-c5-page-head"><span class="eyebrow">GEOVERSE · CONTINENTS</span><div class="gv-c5-page-title"><span class="gv-c5-tile-icon">'+artwork[f.icon]+'</span><div><h1>'+L(f.ar,f.en)+'</h1><p>'+L(f.subAr,f.subEn)+'</p></div></div></header>'+switcher+
 '<div id="gvC5FeatureMount" aria-live="polite"></div></div>';
 if(f.id==='map')window.GeoVerseContinentMap?.mount?.();
 if(f.id==='compare')window.GeoVerseContinentComparison?.mount?.();
 if(f.id==='highlights')window.GeoVerseContinentHighlights?.mount?.();
 if(!main.querySelector('.gv-c2-shell,.gv-c3-shell,.gv-c4-shell')){
  main.querySelector('#gvC5FeatureMount').textContent=L('تعذّر تحميل الميزة. أعد فتح قسم القارات.','Unable to load the feature. Reopen the continent section.');
 }
}
const oldRender=render;
render=function(){
 oldRender();
 if(state.page!=='category'||state.category!=='continents'){return}
 if(state.continentFeature){independent();return}
 const root=document.getElementById('main'),items=root?.querySelector('#categoryItems');
 if(items&&!root.querySelector('#gvC5Directory'))items.insertAdjacentHTML('afterend',tiles());
};
const oldSetPage=setPage;
setPage=function(page,category=null,item=null,startGame=false){
 clearView();
 return oldSetPage(page,category,item,startGame);
};
function navigate(type){
 if(!features.some(f=>f.id===type))return;
 state.continentFeature=type;
 if(!Number.isInteger(state.continentIndex)||state.continentIndex<0||state.continentIndex>6)state.continentIndex=0;
 window.scrollTo(0,0);
 render();
}
function back(){
 clearView();
 window.scrollTo(0,0);
 render();
}
document.addEventListener('click',e=>{
 const opener=e.target.closest('[data-gv-c5-open]');
 if(opener){e.preventDefault();e.stopImmediatePropagation();navigate(opener.dataset.gvC5Open);return}
 const backButton=e.target.closest('[data-gv-c5-back]');
 if(backButton){e.preventDefault();e.stopImmediatePropagation();back();return}
 const region=e.target.closest('[data-gv-c5-region]');
 if(region&&state.continentFeature==='highlights'){
  const value=Number(region.dataset.gvC5Region);
  if(Number.isInteger(value)&&value>=0&&value<7){e.preventDefault();e.stopImmediatePropagation();state.continentIndex=value;window.scrollTo(0,0);render()}
 }
},true);
const css=`
.gv-c5-directory{margin:24px 0 12px;padding:clamp(15px,2vw,22px);border:1px solid #8dcbcd38;background:linear-gradient(145deg,#0c3043,#061b30);border-radius:22px;color:#ebfaff}
.gv-c5-directory-heading h2{color:#f3ffff;font-size:clamp(21px,2.8vw,27px);margin:7px 0}
.gv-c5-directory-heading p{color:#bad7df;font-size:13px;line-height:1.8;margin:0 0 17px}
.gv-c5-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.gv-c5-tile{display:flex;flex-direction:column;text-align:start;align-items:flex-start;gap:14px;min-width:0;border:1px solid #99d7d739;background:linear-gradient(160deg,#18465a,#0f3147);border-radius:17px;padding:17px;color:#eaffff;cursor:pointer;transition:transform .18s,border-color .18s}
.gv-c5-tile:hover,.gv-c5-tile:focus-visible{transform:translateY(-2px);border-color:#75e9d9;outline:2px solid #75e9d922}
.gv-c5-tile-icon{display:grid;place-items:center;border-radius:14px;width:54px;height:54px;min-width:54px;background:#50c8bc21;color:#74ead9}
.gv-c5-tile-icon svg{width:30px;height:30px}
.gv-c5-tile-copy{display:flex;flex-direction:column;gap:7px}
.gv-c5-tile-copy strong{font-size:17px;line-height:1.45;color:#f5ffff}
.gv-c5-tile-copy small{color:#b9d5dd;font-size:12px;line-height:1.8}
.gv-c5-tile-arrow{margin-top:auto;color:#f2d39b;font-size:18px}
.gv-c5-page{margin:12px 0 40px}
.gv-c5-backline{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:20px;color:#a7cbd2;font-size:12px}
.gv-c5-back{border:1px solid #82c8c74c;background:#0f3549;color:#e4f9f7;border-radius:12px;padding:12px 14px;font-weight:800;cursor:pointer}
.gv-c5-back:hover,.gv-c5-back:focus-visible{border-color:#6bdbc9;outline:none}
.gv-c5-page-head{background:linear-gradient(135deg,#124259,#08253b);border:1px solid #85cfc943;padding:clamp(18px,3vw,27px);border-radius:21px;color:#f5ffff}
.gv-c5-page-title{display:flex;gap:15px;align-items:center;margin-top:12px}
.gv-c5-page-title h1{font-size:clamp(23px,3.6vw,34px);margin:0 0 7px;color:#f6ffff}
.gv-c5-page-title p{margin:0;color:#bbd7dc;line-height:1.65}
.gv-c5-continents{display:flex;gap:8px;overflow-x:auto;scrollbar-width:thin;padding:17px 0 0}
.gv-c5-continents button{border:1px solid #7fbdc444;background:#103c51;color:#dceff2;border-radius:12px;padding:11px 15px;white-space:nowrap;font-weight:750;cursor:pointer}
.gv-c5-continents button.active{background:#4fd4c8;border-color:#6fe4d8;color:#083343}
.gv-c5-page #gvC5FeatureMount:empty{display:none}
body.light .gv-c5-directory,body.light .gv-c5-page-head{background:linear-gradient(135deg,#edf9f9,#fff);color:#173d4b;border-color:#b6d4d5}
body.light .gv-c5-directory-heading h2,body.light .gv-c5-tile-copy strong,body.light .gv-c5-page-title h1{color:#143e4b}
body.light .gv-c5-directory-heading p,body.light .gv-c5-page-title p{color:#456773}
body.light .gv-c5-tile{background:#f7fcfc;border-color:#cee2e4}
body.light .gv-c5-tile-copy small{color:#456773}
body.light .gv-c5-back{background:#e8f5f5;color:#164858}
@media(max-width:740px){.gv-c5-grid{grid-template-columns:1fr}.gv-c5-tile{flex-direction:row;align-items:center;gap:12px;padding:14px}.gv-c5-tile-copy{flex:1}.gv-c5-tile-arrow{margin-top:0;margin-inline-start:auto}.gv-c5-tile-icon{width:47px;height:47px;min-width:47px}.gv-c5-tile-icon svg{width:26px;height:26px}.gv-c5-page-title .gv-c5-tile-icon{width:54px;height:54px;min-width:54px}.gv-c5-backline{align-items:flex-start}.gv-c5-page-head{padding:16px}.gv-c5-directory{padding:13px}}
`;
if(!document.getElementById('gv-c5-style')){const style=document.createElement('style');style.id='gv-c5-style';style.textContent=css;document.head.appendChild(style)}
})();
