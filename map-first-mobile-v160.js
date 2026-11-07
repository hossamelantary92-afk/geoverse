/* GeoVerse v160 mobile-first atlas layout: wrap the Explorer HTML before rendering. */
(function(){
'use strict';
const style=document.createElement('style');
style.id='gv160-mobile-map-first';
style.textContent=`
@media(max-width:700px){
 #main:has(#worldMap)>.page-heading{display:none!important}
 #main .gv160-dock{display:flex!important;flex-direction:column;gap:8px;margin:5px 0 10px;padding:10px;border:1px solid #28647a;border-radius:16px;background:linear-gradient(130deg,#092b40,#071e31)}
 #main .gv160-actions{display:grid;grid-template-columns:1fr 1fr;gap:7px;order:2}
 #main .gv160-actions button{min-height:40px;padding:5px;border:1px solid #3d8b9c;border-radius:10px;background:#10364d;color:#e6faff;font:800 12px Cairo,Outfit,system-ui;cursor:pointer}
 #main .gv160-actions button[aria-expanded=true]{background:#135c66;color:white;border-color:#6ce7df}
 #main .gv160-dock .gv158-explorer{order:1!important;margin:0!important;padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important}
 #main .gv160-dock .gv158-heading,#main .gv160-dock .gv158-continent-label,#main .gv160-dock .gv158-continents,#main .gv160-dock .gv158-filterbar{display:none!important}
 #main .gv160-dock.gv160-filter-open .gv158-continent-label{display:block!important;margin:9px 0 3px}
 #main .gv160-dock.gv160-filter-open .gv158-continents,#main .gv160-dock.gv160-filter-open .gv158-filterbar{display:flex!important}
 #main .gv160-dock .gv158-query{min-height:41px}
 #main .gv160-dock .gv158-results:not([hidden]){max-height:190px;overflow-y:auto}
 #main .gv160-dock #mapToolbar{order:3;display:none!important;margin:0!important;padding:8px!important;border-radius:10px}
 #main .gv160-dock.gv160-filter-open #mapToolbar,#main .gv160-dock.gv160-view-open #mapToolbar{display:flex!important}
 #main .gv160-dock #mapToolbar .gv146-group,#main .gv160-dock #mapToolbar .gv146-actions{display:none!important}
 #main .gv160-dock.gv160-filter-open #mapToolbar .gv146-group{display:flex!important}
 #main .gv160-dock.gv160-view-open #mapToolbar .gv146-actions{display:flex!important;padding:0;border:0;margin:0}
 #main .gv160-dock #mapToolbar .gv146-group-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}
 #main .gv160-dock #mapToolbar .gv146-group-grid>button{min-height:39px;padding:5px 3px;font-size:11px}
 #main #worldMap{margin-top:0!important}
}`;
document.head.appendChild(style);
const t=(a,b)=>document.documentElement.lang==='en'?b:a;
function dockify(){
 const main=document.getElementById('main');
 if(!main||!main.querySelector('#worldMap'))return;
 const toolbar=main.querySelector('#mapToolbar');
 if(!toolbar)return;
 let dock=main.querySelector('.gv160-dock');
 if(!dock){
  dock=document.createElement('section');dock.className='gv160-dock';
  const actions=document.createElement('div');actions.className='gv160-actions';
  actions.innerHTML='<button type="button" data-gv160="filter" aria-expanded="false"></button><button type="button" data-gv160="view" aria-expanded="false"></button>';
  toolbar.parentNode.insertBefore(dock,toolbar);
  dock.appendChild(actions);dock.appendChild(toolbar);
  actions.addEventListener('click',function(event){
   const b=event.target.closest('[data-gv160]');if(!b)return;
   const cls=b.dataset.gv160==='filter'?'gv160-filter-open':'gv160-view-open';
   const open=!dock.classList.contains(cls);
   dock.classList.remove('gv160-filter-open','gv160-view-open');
   if(open)dock.classList.add(cls);
   actions.querySelectorAll('button').forEach(x=>x.setAttribute('aria-expanded',String(dock.classList.contains(x.dataset.gv160==='filter'?'gv160-filter-open':'gv160-view-open'))));
  });
 }
 dock.querySelector('[data-gv160="filter"]').textContent=t('▦ الأقسام والفلاتر','▦ Categories & filters');
 dock.querySelector('[data-gv160="view"]').textContent=t('⚙ خيارات العرض','⚙ Display options');
 const explorer=main.querySelector('.gv158-explorer');
 if(explorer&&explorer.parentElement!==dock)dock.insertBefore(explorer,dock.firstChild);
}
const prevExplore=typeof explore==='function'?explore:null;
if(prevExplore)explore=function(){return prevExplore.apply(this,arguments)};
const prevAtlas=typeof atlasCreate==='function'?atlasCreate:null;
if(prevAtlas)atlasCreate=function(){const v=prevAtlas.apply(this,arguments);dockify();return v};
let scheduled=false;
function queue(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;dockify()})}
const main=document.getElementById('main');
if(main)new MutationObserver(queue).observe(main,{childList:true,subtree:false});
queue();
})();
