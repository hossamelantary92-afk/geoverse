/* GeoVerse v159 — Mobile map-first command dock. Presentation only. */
(function(){
'use strict';
const css=`
@media(max-width:700px){
 .gv159-dock{display:flex;flex-direction:column;gap:9px;margin:7px 0 12px;padding:10px;border:1px solid rgba(71,169,188,.43);border-radius:17px;background:linear-gradient(145deg,#08283d,#061d31);box-shadow:0 8px 22px #00132040}
 .gv159-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;order:2}
 .gv159-actions button{min-height:41px;border-radius:11px;border:1px solid #367f93;background:#10384f;color:#dff8fb;font:800 12px Cairo,Outfit,sans-serif;cursor:pointer}
 .gv159-actions button[aria-expanded="true"]{background:#14656b;border-color:#6aeadf;color:#fff}
 .gv159-dock .gv158-explorer{order:1;margin:0!important;padding:0!important;background:none!important;border:0!important;box-shadow:none!important}
 .gv159-dock .gv158-heading,.gv159-dock .gv158-continent-label,.gv159-dock .gv158-continents,.gv159-dock .gv158-filterbar{display:none!important}
 .gv159-dock .gv158-search-line{gap:7px}
 .gv159-dock .gv158-query{min-height:43px}
 .gv159-dock .gv158-results:not([hidden]){max-height:190px;overflow-y:auto;margin-top:8px}
 .gv159-dock.gv159-categories-open .gv158-continent-label,.gv159-dock.gv159-categories-open .gv158-continents,.gv159-dock.gv159-categories-open .gv158-filterbar{display:flex!important}
 .gv159-dock.gv159-categories-open .gv158-continent-label{display:block!important;margin:11px 0 4px}
 .gv159-dock #mapToolbar.gv146-toolbar{display:none!important;order:3;margin:0!important;padding:9px!important;border-radius:12px}
 .gv159-dock.gv159-categories-open #mapToolbar.gv146-toolbar,.gv159-dock.gv159-view-open #mapToolbar.gv146-toolbar{display:flex!important}
 .gv159-dock #mapToolbar .gv146-group,.gv159-dock #mapToolbar .gv146-actions{display:none!important}
 .gv159-dock.gv159-categories-open #mapToolbar .gv146-group{display:flex!important}
 .gv159-dock.gv159-view-open #mapToolbar .gv146-actions{display:flex!important;border-top:0;margin:0;padding:0}
 .gv159-dock #mapToolbar .gv146-group-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}
 .gv159-dock #mapToolbar .gv146-group-grid>button{min-height:39px;padding:5px 3px;font-size:11px}
 .gv159-dock #mapToolbar .gv146-group-title{font-size:11px}
 .gv159-dock .gv158-results[hidden]{display:none!important}
}
`;
const style=document.createElement('style');style.id='gv159-style';style.textContent=css;document.head.appendChild(style);
function label(ar,en){return document.documentElement.lang==='en'?en:ar}
function setup(){
 const map=document.getElementById('worldMap'),toolbar=document.getElementById('mapToolbar'),explorer=document.querySelector('.gv158-explorer');
 if(!map||!toolbar||!explorer||!map.isConnected||!toolbar.isConnected||!explorer.isConnected)return;
 if(toolbar.closest('.gv159-dock')&&explorer.closest('.gv159-dock'))return;
 const dock=document.createElement('div');dock.className='gv159-dock';dock.setAttribute('aria-label',label('أدوات استكشاف الخريطة','Map exploration tools'));
 const buttons=document.createElement('div');buttons.className='gv159-actions';
 buttons.innerHTML='<button type="button" data-gv159="categories" aria-expanded="false"></button><button type="button" data-gv159="view" aria-expanded="false"></button>';
 dock.appendChild(explorer);dock.appendChild(buttons);dock.appendChild(toolbar);
 // Insert immediately before the atlas, not above other content sections.
 const atlas=map.closest('.gv140-stage')||map;
 atlas.parentNode.insertBefore(dock,atlas);
 function sync(){
  buttons.querySelector('[data-gv159="categories"]').textContent=label('▦ الأقسام والفلاتر','▦ Categories & filters');
  buttons.querySelector('[data-gv159="view"]').textContent=label('⚙ خيارات العرض','⚙ Display options');
 }
 sync();
 buttons.addEventListener('click',e=>{
  const b=e.target.closest('[data-gv159]');if(!b)return;
  const key=b.dataset.gv159,cls=key==='categories'?'gv159-categories-open':'gv159-view-open';
  const opening=!dock.classList.contains(cls);
  dock.classList.remove('gv159-categories-open','gv159-view-open');
  if(opening)dock.classList.add(cls);
  buttons.querySelectorAll('button').forEach(x=>x.setAttribute('aria-expanded',String(dock.classList.contains(x.dataset.gv159==='categories'?'gv159-categories-open':'gv159-view-open'))));
 });
 const languageObserver=new MutationObserver(sync);
 languageObserver.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 const removal=new MutationObserver(()=>{if(!dock.isConnected){languageObserver.disconnect();removal.disconnect()}});
 removal.observe(document.getElementById('main')||document.body,{childList:true});
}
let pending=false;
const observer=new MutationObserver(()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;setup()})});
function start(){const main=document.getElementById('main');if(main)observer.observe(main,{childList:true,subtree:true});setup()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
