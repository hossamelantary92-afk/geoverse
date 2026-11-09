/* GeoVerse v388 — consistent contextual and section navigation across the atlas.
 * Keep nested continent and tourism navigation intact; avoid duplicated buttons.
 */
(function(){
'use strict';
if(typeof render!=='function'||typeof state==='undefined')return;
const css=document.createElement('style');
css.id='gv388-navigation-style';
css.textContent=`
#main .gv388-nav{display:flex;align-items:center;flex-wrap:wrap;gap:9px;margin:0 0 18px;direction:inherit}
#main .gv388-nav button{min-height:43px;padding:9px 14px;display:inline-flex;align-items:center;justify-content:center;gap:7px;border:1px solid #4c9eaa;border-radius:13px;background:linear-gradient(135deg,#113d51,#0a283d);color:#dff9f8;font:800 13px Cairo,Outfit,system-ui;cursor:pointer;white-space:normal;text-align:center}
#main .gv388-nav button:first-child{border-color:#50d5ca;color:#83f1e3}
#main .gv388-nav button:hover{border-color:#8beee0}
#main .gv388-nav button:focus-visible{outline:3px solid #75ecde;outline-offset:2px}
#main .gv388-nav .gv388-existing{margin:0}
#main .gv-landmark-back-row{display:flex;gap:9px;flex-wrap:wrap;align-items:center;margin-bottom:18px}
#main .gv-landmark-back-row button{min-height:43px;border-radius:13px}
body.light #main .gv388-nav button{background:#edf8fa;color:#154452;border-color:#9bcbd2}
@media(max-width:380px){#main .gv388-nav button{padding:9px 10px;font-size:12px}}
`;
document.head.appendChild(css);
const ar=()=>state.lang==='ar';
const txt=(a,e)=>ar()?a:e;
const main=()=>document.getElementById('main');
function button(text, action, cls=''){
 const b=document.createElement('button');b.type='button';b.className=cls;b.textContent=text;b.dataset.gv388Action=action;return b;
}
function row(){const n=document.createElement('nav');n.className='gv388-nav';n.setAttribute('aria-label',txt('التنقل بين الصفحات والأقسام','Page and section navigation'));return n;}
function addMainNavigation(){
 const root=main();if(!root)return;
 if(state.page==='home'||state.page==='all'||state.page==='explore'||state.page==='learn'||state.page==='play'||state.page==='progress')return;
 // Country pages already have a contextual Back plus a direct Countries link (v387).
 if(state.page==='country-v4'){
  const bar=root.querySelector('.gv387-country-nav');
  if(bar){const buttons=bar.querySelectorAll('button');if(buttons[0])buttons[0].textContent=txt('→ رجوع','← Back');if(buttons[1])buttons[1].textContent=txt('العودة إلى الدول','Countries');}
  return;
 }
 // Landmark pages already receive the smart Back and category shortcut (v351).
 if(state.page==='detail'){
  const bar=root.querySelector('.gv-landmark-back-row');
  if(bar){
   const back=bar.querySelector('button.back');
   const link=bar.querySelector('[data-gv-open-category]');
   const cat=typeof cats!=='undefined'?cats.find(c=>c.id===state.category):null;
   if(back)back.textContent=txt('→ رجوع','← Back');
   if(link)link.textContent=txt('العودة إلى '+(cat?.ar||'القسم'),'Back to '+(cat?.en||'section'));
  }else if(!root.querySelector('.gv388-nav')){
   const nav=row();nav.append(button(txt('→ رجوع','← Back'),'back'));
   nav.append(button(txt('العودة إلى القسم','Back to section'),'section'));
   root.prepend(nav);
  }
  return;
 }
 // Continent feature is a separately rendered page inside the continent category.
 if(state.page==='category'&&state.category==='continents'&&state.continentFeature&&root.querySelector('#gvC5IndependentPage')){
  const existing=root.querySelector('.gv-c5-backline');
  if(existing&&!existing.querySelector('.gv388-back')){
   existing.prepend(button(txt('→ رجوع','← Back'),'continent-back','gv388-back'));
   const section=existing.querySelector('[data-gv-c5-back]');
   if(section)section.textContent=txt('العودة إلى القارات','Back to continents');
  }
  return;
 }
 // Selected tourist country is a nested view of the tourism section.
 if(state.page==='category'&&state.category==='tourism'&&window.GeoVerseTourismCountryNavigation?.getSelected?.()){
  const existing=root.querySelector('[data-gv181-back]');
  if(existing&&!root.querySelector('.gv388-nav')){
   const nav=row();
   nav.append(button(txt('→ رجوع','← Back'),'tourism-back'));
   existing.classList.add('gv388-existing');existing.before(nav);nav.append(existing);
   existing.querySelector('span:last-child')?.replaceChildren(document.createTextNode(txt('العودة إلى المزارات السياحية','Back to tourism')));
  }
  return;
 }
 if(root.querySelector('.gv388-nav'))return;
 // Section landing pages: contextual Back plus a predictable atlas directory shortcut.
 if(state.page==='category'||state.page==='countries-v4'){
  const nav=row();const old=root.querySelector('button.back');
  if(old){old.classList.add('gv388-existing');old.removeAttribute('data-cat');old.removeAttribute('data-page');old.textContent=txt('→ رجوع','← Back');nav.append(old);}
  else nav.append(button(txt('→ رجوع','← Back'),'back'));
  nav.append(button(txt('كل الأقسام','All sections'),'all'));
  root.prepend(nav);
 }
}
const priorRender=render;
render=function(){const result=priorRender.apply(this,arguments);addMainNavigation();return result;};
document.addEventListener('click',function(e){
 const trigger=e.target.closest?.('[data-gv388-action]');
 if(!trigger)return;
 e.preventDefault();e.stopImmediatePropagation();
 const action=trigger.dataset.gv388Action;
 if(action==='back'){if(window.GeoVerseSmartBack?.back)window.GeoVerseSmartBack.back();else setPage('all');}
 else if(action==='all')setPage('all');
 else if(action==='section')setPage('category',state.category);
 else if(action==='continent-back')document.querySelector('#main [data-gv-c5-back]')?.click();
 else if(action==='tourism-back')document.querySelector('#main [data-gv181-back]')?.click();
},true);
addMainNavigation();
})();