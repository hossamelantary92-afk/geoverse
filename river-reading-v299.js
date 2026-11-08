/* GeoVerse v299 — consistent river reading without replacing existing maps, photos, or progress handlers. */
(function(){
'use strict';
const oldRender=render;
let profiles=null;
const current=()=>state.page==='detail'&&state.category==='rivers';
const tr=(ar,en)=>state.lang==='ar'?ar:en;
const safe=s=>escapeHTML(String(s||''));
const split=s=>String(s||'').trim().split(/(?<=[.!؟])\s+/u).flatMap(x=>x.length>155?x.split(/(?<=؛)\s*/u):[x]).map(x=>x.trim()).filter(Boolean);
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
 if(intro&&parts.length){
  const first=parts[0];
  intro.textContent=first.length>140?(state.lang==='ar'?v[2]:v[3]):first;
 }
 const facts=root.querySelector('#gv14Facts');
 let extraCountry='';
 if(facts&&story?.riverGeo){
  const g=story.riverGeo;
  const source=tr(g.sourceAr,g.sourceEn),mouth=tr(g.mouthAr,g.mouthEn);
  const countries=tr(g.countriesAr,g.countriesEn);
  const fragments=countries.split(/[؛;]/);
  extraCountry=fragments.slice(1).join('؛').trim();
  const feature=state.lang==='ar'&&Array.isArray(story.factsAr)?
   story.factsAr.find(pair=>Array.isArray(pair)&&pair.length===2&&!/(المنبع|المصب|الدول)/.test(pair[0])):
   null;
  const cards=[
   [tr('المنبع','Source'),source],
   [tr('المصب','Mouth'),mouth],
   [tr('الدول','Countries'),fragments[0].trim()],
   feature||[tr('التميّز','Key feature'),state.lang==='ar'?(story.factsAr?.[0]?.[1]||v[2]):(split(story.en||v[3])[1]||v[3])]
  ];
  facts.innerHTML='<div class="gv299-river-facts">'+cards.map(([label,value])=>
   '<div class="gv14-fact gv299-geofact"><small>'+safe(label)+'</small><strong>'+safe(value)+'</strong></div>'
  ).join('')+'</div>';
 }
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
  const bullets=(parts[0]?.length>140?parts:parts.slice(1));
  if(extraCountry)bullets.push(tr('عن الدول والحوض: ','Countries and basin: ')+extraCountry);
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
  heading.textContent=tr('خلصت قراءة الموضوع؟','Finished reading?');
  finish.append(heading,learned);
  learned.classList.add('gv299-complete');
  learned.replaceChildren();
  const check=document.createElement('span');check.className='gv299-single-check';check.textContent='✓';check.setAttribute('aria-hidden','true');
  const text=document.createElement('span');text.textContent=learned.classList.contains('is-learned')?tr('تم التعلم','Learned'):tr('تعلمت هذا الموضوع','Mark as learned');
  learned.append(check,text);
 }
 const navLabel=root.querySelector('.gv14-next>span');
 if(navLabel)navLabel.textContent=tr('واصل الاستكشاف','Keep exploring');
 const nav=root.querySelector('.gv14-next');
 if(nav&&geo.rivers.length>1){
  nav.classList.add('gv299-nav');
  const next=nav.querySelector('[data-item]');
  const idx=Number(state.item);
  const prev=(idx+geo.rivers.length-1)%geo.rivers.length;
  const later=(idx+1)%geo.rivers.length;
  if(next){
   next.setAttribute('data-item','rivers:'+later);
   next.textContent=tr('التالي: ','Next: ')+(state.lang==='ar'?geo.rivers[later][0]:geo.rivers[later][1]);
  }
  let before=nav.querySelector('.gv299-prev');
  if(!before){
   before=document.createElement('button');
   before.type='button';before.className='gv299-prev';
   nav.insertBefore(before,next);
  }
  before.setAttribute('data-item','rivers:'+prev);
  before.textContent=tr('السابق: ','Previous: ')+(state.lang==='ar'?geo.rivers[prev][0]:geo.rivers[prev][1]);
 }
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
.gv299-river .gv299-river-facts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px;align-items:stretch}
.gv299-river .gv299-river-facts .gv299-geofact{min-height:104px;box-sizing:border-box;justify-content:center;gap:7px;border:1px solid #478e96;background:linear-gradient(145deg,#0e4554,#0c3649);padding:14px 12px;border-radius:15px}
.gv299-river .gv299-geofact small{font-size:11px;line-height:1.4;color:#9ecbd2}
.gv299-river .gv299-geofact strong{font-size:clamp(12px,1.4vw,15px);line-height:1.75;font-weight:800;overflow-wrap:anywhere}
.gv299-river .gv14-overview .gv14-section-heading span{display:none}
.gv299-river .gv299-single-check{font-size:17px;line-height:1}
.gv299-river .gv299-finish .gv299-complete{display:flex;align-items:center;gap:9px;background:linear-gradient(115deg,#85ebce,#39caca);color:#063641;border-color:#9cf3dc;box-shadow:0 8px 24px #27b6b333}
.gv299-river .gv299-finish .gv299-complete.is-learned{background:#14545a;color:#e6fffa;border-color:#7bdccc}
.gv299-river .gv299-nav button{background:linear-gradient(135deg,#0e4256,#0b344c);border-color:#5f9da9;border-radius:14px;padding:14px 13px;transition:background .2s ease,border-color .2s ease}
.gv299-river .gv299-nav button:hover{background:#14576b;border-color:#82e4d4}

.gv299-river #gv14Facts{margin-top:14px}
.gv299-river #gv14Facts>.gv14-facts{display:none}
.gv299-river .gv299-knowledge{margin-top:16px}
.gv299-river .gv14-overview>p{line-height:1.9}
.gv299-river .gv14-map .gv14-section-heading span{display:none}
.gv299-river .gv299-nav{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px}
.gv299-river .gv299-nav>span{grid-column:1/-1}
.gv299-river .gv299-nav button{min-width:0;min-height:55px;white-space:normal;text-align:start;line-height:1.55}
.gv299-river .gv299-finish .gv299-complete{align-self:center;justify-content:center;width:min(100%,290px);font-size:14px;border-radius:15px}
.gv299-river .gv299-knowledge .gv14-section-heading span{display:none}
.gv299-river .gv299-points{margin:0;padding-inline-start:1.45em;list-style:disc;display:grid;gap:12px;color:inherit}
.gv299-river .gv299-points li{line-height:1.95;padding-inline-start:.35em;overflow-wrap:anywhere}
.gv299-river .gv299-points li::marker{color:#61d8ca}
.gv299-river .gv299-finish{margin:18px 0;display:flex;flex-direction:column;align-items:center;gap:14px;padding:22px;border:1px solid #4b9e9c;border-radius:18px;background:linear-gradient(135deg,#0c3646,#092a3d);text-align:center}
.gv299-river .gv299-finish h2{margin:0;font-size:clamp(19px,2.6vw,25px);color:#f5fffd}
.gv299-river .gv299-finish .gv299-complete{margin:0;min-height:49px}
@media(max-width:600px){.gv299-river .gv299-river-facts{gap:9px}.gv299-river .gv299-points{gap:10px;padding-inline-start:1.3em}.gv299-river .gv299-points li{line-height:1.85}.gv299-river .gv299-finish{padding:18px 12px}}
`;
document.head.appendChild(css);
window.GeoVerseRiversV299={decorate};
})();