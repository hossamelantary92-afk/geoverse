/* GeoVerse Phase 5 Egypt-only compact country experience. */
(function(){
'use strict';
function mount(){
 if(typeof state==='undefined'||state.page!=='country-v4'||String(state.v4Code||'').toUpperCase()!=='EG')return;
 const globe=document.getElementById('gvDetailGlobe'),panel=document.querySelector('.gv450-landmark-panel');
 if(!globe||!panel||panel.dataset.gv460)return;
 const card=globe.closest('.gv-story-card');if(!card)return;
 panel.dataset.gv460='1';card.classList.add('gv460-card');
 const heading=card.querySelector('h2'),intro=card.querySelector('p'),eyebrow=card.querySelector('.eyebrow');
 if(heading)heading.textContent=state.lang==='en'?'Explore Egypt':'استكشف مصر';
 if(intro)intro.textContent=state.lang==='en'?'Choose the globe or landmarks map.':'اختر الكرة الأرضية أو خريطة المعالم.';
 if(eyebrow)eyebrow.textContent='EXPLORE EGYPT';
 const switcher=document.createElement('div');switcher.className='gv460-switch';switcher.setAttribute('role','group');
 const globeButton=document.createElement('button'),mapButton=document.createElement('button');
 globeButton.type=mapButton.type='button';
 globeButton.textContent=state.lang==='en'?'3D Globe':'الكرة الأرضية 3D';
 mapButton.textContent=state.lang==='en'?'Landmarks map':'خريطة المعالم';
 switcher.append(globeButton,mapButton);
 globe.before(switcher);
 // Keep one interactive map visible, and never render the old duplicate landmark list.
 const list=panel.querySelector('.gv450-list'),expand=panel.querySelector('.gv450-expand');
 if(list)list.remove();if(expand)expand.remove();
 const title=panel.querySelector('h3'),desc=panel.querySelector('p');
 if(title)title.remove();if(desc)desc.remove();
 const details=panel.querySelector('.gv450-details');
 if(details){
  details.classList.add('gv460-details');
  details.classList.remove('gv460-show');
  // Existing country content remains intact; the map is only a spatial index.
  const open=details.querySelector('.gv450-open');
  if(open)open.textContent=state.lang==='en'?'View existing landmark details':'عرض تفاصيل المعلم';
 }
 const map=panel.querySelector('.gv450-map');
 if(map){
  // Only a genuine marker selection opens the compact card, not tapping empty map space.
  map.querySelectorAll('.gv450-hit').forEach(hit=>{
   hit.addEventListener('click',()=>{if(details)details.classList.add('gv460-show')});
   hit.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&details)details.classList.add('gv460-show')});
  });
 }
 function show(which){
  const onMap=which==='map';
  globe.style.display=onMap?'none':'';
  panel.style.display=onMap?'block':'none';
  globeButton.classList.toggle('gv460-active',!onMap);
  mapButton.classList.toggle('gv460-active',onMap);
  globeButton.setAttribute('aria-pressed',String(!onMap));mapButton.setAttribute('aria-pressed',String(onMap));
  if(!onMap)window.dispatchEvent(new Event('resize'));
 }
 globeButton.addEventListener('click',()=>show('globe'));
 mapButton.addEventListener('click',()=>show('map'));
 show('map');
}
const css=document.createElement('style');
css.textContent='.gv460-card{min-width:0;max-width:100%;overflow:hidden}.gv460-card .gv460-switch{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:14px 0}.gv460-switch button{min-width:0;border:1px solid #5eb5b2;border-radius:13px;padding:11px 6px;background:#0c3448;color:#c5e6e6;font:700 13px Cairo,system-ui;cursor:pointer}.gv460-switch button.gv460-active{background:linear-gradient(120deg,#37c9c0,#77e8d6);color:#07323b;border-color:#8af5e8}.gv460-card .gv450-landmark-panel{margin:0;padding:10px;border:0;box-shadow:none;background:transparent}.gv460-card .gv450-details{display:none}.gv460-card .gv450-details.gv460-show{display:flex}.gv460-card .gv450-map svg{max-height:310px}.gv460-card .gv450-controls{left:8px;bottom:8px}.gv460-card .gv-globe-detail{max-width:100%}';
document.head.appendChild(css);
const observer=new MutationObserver(mount);observer.observe(document.getElementById('main')||document.body,{childList:true,subtree:true});mount();
})();