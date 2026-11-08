/* GeoVerse v299 — consistent river reading without replacing existing maps, photos, or progress handlers. */
(function(){
'use strict';
const oldRender=render;
let profiles=null;
const current=()=>state.page==='detail'&&state.category==='rivers';
const tr=(ar,en)=>state.lang==='ar'?ar:en;
const safe=s=>escapeHTML(String(s||''));
const split=s=>String(s||'').trim().split(/(?<=[.!؟])\s+/u).map(x=>x.trim()).filter(Boolean);
function decorate(){
 if(!current())return;
 const root=document.querySelector('#main .gv14-detail');
 if(!root)return;
 root.classList.add('gv299-river');
 const v=geo.rivers?.[state.item];
 if(!v)return;
 const story=profiles?.[v[1]];
 const desc=(story?(state.lang==='ar'?story.ar:story.en):'')||(state.lang==='ar'?v[2]:v[3]);
 const parts=split(desc);
 const about=root.querySelector('#gv14About');
 if(about)about.textContent=tr('حقائق مهمة','Essential facts');
 const intro=root.querySelector('#gv14Description');
 if(intro&&parts.length)intro.textContent=parts[0];
 const mapHeading=root.querySelector('#gv14MapTitle');
 if(mapHeading)mapHeading.textContent=tr('الموقع الجغرافي','Geographic location');
 const map=root.querySelector('.gv14-map');
 const more=root.querySelector('.gv14-more');
 if(more)more.remove();
 let section=root.querySelector('#gv299RiverKnowledge');
 if(!section&&map){
  section=document.createElement('section');
  section.id='gv299RiverKnowledge';
  section.className='gv14-overview gv299-knowledge';
  map.insertAdjacentElement('afterend',section);
 }
 if(section){
  const bullets=parts.slice(1);
  section.innerHTML='<div class="gv14-section-heading"><h2>'+tr('تعرّف أكثر','Learn more')+'</h2></div>'+
   (bullets.length?'<ul class="gv299-points">'+bullets.map(x=>'<li>'+safe(x)+'</li>').join('')+'</ul>':'<p>'+safe(parts[0]||'')+'</p>');
 }
 let finish=root.querySelector('#gv299RiverFinish');
 if(!finish){
  finish=document.createElement('section');
  finish.id='gv299RiverFinish';
  finish.className='gv299-finish';
  const nav=root.querySelector('.gv14-next');
  if(nav)nav.insertAdjacentElement('beforebegin',finish);
  else root.appendChild(finish);
 }
 const learned=root.querySelector('#toggleSeen');
 if(learned){
  finish.replaceChildren();
  const heading=document.createElement('h2');
  heading.textContent=tr('تعلمت هذا الموضوع','I learned this topic');
  finish.append(heading,learned);
  learned.classList.add('gv299-complete');
  if(!learned.classList.contains('is-learned'))learned.lastChild.textContent=tr('تعلمت هذا الموضوع','Mark as learned');
 }
 const navLabel=root.querySelector('.gv14-next>span');
 if(navLabel)navLabel.textContent=tr('واصل الاستكشاف','Keep exploring');
}
render=function(){oldRender.apply(this,arguments);decorate()};
fetch('./geo-stories.json?v=gv299-rivers-enriched',{cache:'no-store'})
 .then(r=>r.ok?r.json():Promise.reject(new Error('river stories unavailable')))
 .then(d=>{profiles=d.stories||{};decorate()}).catch(()=>{decorate()});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',decorate,{once:true});
else decorate();
const css=document.createElement('style');
css.id='gv299-river-css';
css.textContent=`
.gv299-river .gv299-knowledge{margin-top:16px}
.gv299-river .gv299-points{margin:0;padding-inline-start:1.45em;list-style:disc;display:grid;gap:12px;color:inherit}
.gv299-river .gv299-points li{line-height:1.95;padding-inline-start:.35em;overflow-wrap:anywhere}
.gv299-river .gv299-points li::marker{color:#61d8ca}
.gv299-river .gv299-finish{margin:18px 0;display:flex;flex-direction:column;align-items:center;gap:14px;padding:22px;border:1px solid #4b9e9c;border-radius:18px;background:linear-gradient(135deg,#0c3646,#092a3d);text-align:center}
.gv299-river .gv299-finish h2{margin:0;font-size:clamp(19px,2.6vw,25px);color:#f5fffd}
.gv299-river .gv299-finish .gv299-complete{margin:0;min-height:49px}
@media(max-width:600px){.gv299-river .gv299-points{gap:10px;padding-inline-start:1.3em}.gv299-river .gv299-points li{line-height:1.85}.gv299-river .gv299-finish{padding:18px 12px}}
`;
document.head.appendChild(css);
window.GeoVerseRiversV299={decorate};
})();