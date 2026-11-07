/* GeoVerse v169 — resilient tourism filter mounting on the real map DOM.
   v168 adds the dataset. This patch ensures its category is visible even when
   the Explorer toolbar was reconstructed by older mobile wrappers. */
(function(){
'use strict';
const cat='tourism';
const tr=(ar,en)=>document.documentElement.lang==='en'?en:ar;
function install(){
 const map=document.getElementById('worldMap');
 const toolbar=document.getElementById('mapToolbar');
 if(!map||!toolbar||!toolbar.isConnected)return;
 if(toolbar.querySelector('[data-layer="tourism"]'))return;
 const section=document.createElement('section');
 section.className='gv146-group gv146-culture';
 const title=document.createElement('h2');
 title.className='gv146-group-title';
 title.textContent=tr('المعالم السياحية والثقافية','Tourism & culture');
 const grid=document.createElement('div');grid.className='gv146-group-grid';
 grid.setAttribute('role','group');grid.setAttribute('aria-label',title.textContent);
 const button=document.createElement('button');button.type='button';
 button.dataset.layer=cat;button.textContent=tr('🏛️ المزارات السياحية','🏛️ Tourist attractions');
 button.setAttribute('aria-label',tr('اعرض المزارات السياحية على الخريطة','Show tourist attractions on the map'));
 grid.appendChild(button);section.append(title,grid);
 toolbar.insertBefore(section,toolbar.querySelector('.gv146-actions'));
}
const original=typeof explore==='function'?explore:null;
if(original)explore=function(){
 const html=original.apply(this,arguments);
 return html;
};
const main=document.getElementById('main');
if(main)new MutationObserver(install).observe(main,{childList:true,subtree:false});
document.addEventListener('DOMContentLoaded',install,{once:true});
install();
})();
