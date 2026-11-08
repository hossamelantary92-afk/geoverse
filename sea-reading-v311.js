/* GeoVerse v311 — unified sea detail reader; scoped to seas only. */
(function(){
'use strict';
const priorRender=render;
let profiles=null;
const tr=(ar,en)=>state.lang==='ar'?ar:en;
const safe=x=>escapeHTML(String(x??''));
const current=()=>state.page==='detail'&&state.category==='seas';
const sentences=s=>String(s||'').trim().split(/(?<=[.!؟])\s+/u).filter(Boolean);
const connections={
'Mediterranean Sea':['الأطلسي عبر مضيق جبل طارق','Atlantic through the Strait of Gibraltar'],
'Red Sea':['المحيط الهندي عبر باب المندب وخليج عدن','Indian Ocean via Bab el-Mandeb and Gulf of Aden'],
'Arabian Sea':['شمال المحيط الهندي','Northern Indian Ocean'],
'Caribbean Sea':['المحيط الأطلسي','Atlantic Ocean'],
'Sea of Japan':['شمال غرب المحيط الهادئ عبر المضايق','Northwest Pacific via connecting straits'],
'Baltic Sea':['بحر الشمال عبر المضايق الدنماركية','North Sea via Danish straits'],
'Black Sea':['المتوسط عبر المضايق التركية','Mediterranean via the Turkish straits'],
'North Sea':['شمال شرق المحيط الأطلسي','Northeastern Atlantic Ocean'],
'Bering Sea':['الهادئ، والمتجمد الشمالي عبر مضيق بيرنغ','Pacific; Arctic via the Bering Strait'],
'Coral Sea':['جنوب غرب المحيط الهادئ','Southwestern Pacific Ocean'],
'Tasman Sea':['جنوب غرب المحيط الهادئ','Southwestern Pacific Ocean'],
'South China Sea':['غرب المحيط الهادئ','Western Pacific Ocean'],
'East China Sea':['غرب المحيط الهادئ','Western Pacific Ocean'],
'Andaman Sea':['شمال شرق المحيط الهندي','Northeastern Indian Ocean'],
'Philippine Sea':['غرب المحيط الهادئ','Western Pacific Ocean'],
'Weddell Sea':['المحيط الجنوبي قرب أنتاركتيكا','Southern Ocean near Antarctica']
};
const compactLocations={
'Mediterranean Sea':['بين أوروبا وشمال أفريقيا وغرب آسيا','Between Europe, North Africa and West Asia'],
'Red Sea':['بين شمال شرق أفريقيا وشبه الجزيرة العربية','Between northeast Africa and the Arabian Peninsula'],
'Arabian Sea':['بين شبه الجزيرة العربية وشبه القارة الهندية','Between Arabia and the Indian subcontinent'],
'Caribbean Sea':['بين جزر الأنتيل وأمريكا الوسطى وشمال أمريكا الجنوبية','Between the Antilles, Central America and northern South America'],
'Sea of Japan':['بين اليابان وكوريا وروسيا','Between Japan, Korea and Russia'],
'Baltic Sea':['شمال أوروبا','Northern Europe'],
'Black Sea':['بين جنوب شرق أوروبا وغرب آسيا','Between southeast Europe and West Asia'],
'North Sea':['شمال غرب أوروبا','Northwestern Europe'],
'Bering Sea':['بين ألاسكا وروسيا','Between Alaska and Russia'],
'Coral Sea':['شمال شرق أستراليا','Northeast of Australia'],
'Tasman Sea':['بين أستراليا ونيوزيلندا','Between Australia and New Zealand'],
'South China Sea':['بين جنوب الصين والفلبين وجنوب شرق آسيا','Between southern China, the Philippines and Southeast Asia'],
'East China Sea':['بين شرق الصين وتايوان وجزر ريوكيو','Between eastern China, Taiwan and the Ryukyu Islands'],
'Andaman Sea':['بين ميانمار وتايلاند وجزر أندامان','Between Myanmar, Thailand and the Andaman Islands'],
'Philippine Sea':['شرق الفلبين في غرب الهادئ','East of the Philippines in the western Pacific'],
'Weddell Sea':['شرق شبه الجزيرة القطبية الجنوبية','East of the Antarctic Peninsula']
};
function decorate(){
 if(!current())return;
 const root=document.querySelector('#main .gv14-detail');if(!root)return;
 root.classList.add('gv311-sea');
 const idx=Number(state.item),v=geo.seas?.[idx];if(!v)return;
 const story=profiles?.[v[1]];
 const description=story?tr(story.ar,story.en):tr(v[2],v[3]);
 const parts=sentences(description);
 const title=root.querySelector('#gv14About');if(title)title.textContent=tr('حقائق مهمة','Essential facts');
 const intro=root.querySelector('#gv14Description');
 if(intro){intro.textContent='';intro.hidden=true;}
 const values=state.lang==='ar'?(story?.factsAr||[]):[];
 const region=tr(...(compactLocations[v[1]]||[v[2],v[3]]));
 const connected=tr(...(connections[v[1]]||['المحيط العالمي','World ocean']));
 const all=[
  [tr('الموقع','Location'),region],
  [tr('الاتصال البحري','Ocean connection'),connected],
  [tr('أبرز سمة','Key feature'),values[0]?.[1]||parts[1]||tr(v[2],v[3])],
  [tr('الأهمية والبيئة','Environment & importance'),values[1]?.[1]||parts[2]||parts[1]||tr(v[2],v[3])]
 ];
 const facts=root.querySelector('#gv14Facts');
 if(facts)facts.innerHTML='<div class="gv311-facts">'+all.map(([label,value])=>'<div class="gv14-fact"><small>'+safe(label)+'</small><strong>'+safe(value)+'</strong></div>').join('')+'</div>';
 const mapHeading=root.querySelector('#gv14MapTitle');
 if(mapHeading)mapHeading.textContent=tr('الموقع الجغرافي','Geographic location');
 const map=root.querySelector('.gv14-map');
 root.querySelector('.gv14-more')?.remove();
 let section=root.querySelector('#gv311Knowledge');
 if(!section&&map){section=document.createElement('section');section.id='gv311Knowledge';section.className='gv14-overview gv311-knowledge';map.insertAdjacentElement('afterend',section)}
 if(section){
  const content=parts.slice(1);
  section.innerHTML='<div class="gv14-section-heading"><h2>'+tr('تعرّف أكثر','Learn more')+'</h2></div>'+
   '<ul class="gv311-list">'+(content.length?content:[parts[0]||region]).map(x=>'<li>'+safe(x)+'</li>').join('')+'</ul>';
 }
 let finish=root.querySelector('#gv311Finish');
 if(!finish){
  finish=document.createElement('section');finish.id='gv311Finish';finish.className='gv311-finish';
  const nav=root.querySelector('.gv14-next');
  if(nav)nav.insertAdjacentElement('beforebegin',finish);else root.appendChild(finish);
 }
 const seen=root.querySelector('#toggleSeen');
 if(seen){
  finish.replaceChildren();
  const heading=document.createElement('h2');heading.textContent=tr('خلصت قراءة الموضوع؟','Finished reading?');
  finish.append(heading,seen);
  seen.classList.add('gv311-complete');
  const complete=seen.classList.contains('is-learned');
  seen.replaceChildren();
  const check=document.createElement('span');check.textContent='✓';check.setAttribute('aria-hidden','true');
  const label=document.createElement('span');label.textContent=complete?tr('تم التعلم','Learned'):tr('تعلمت هذا الموضوع','Mark as learned');
  seen.append(check,label);
 }
 const nav=root.querySelector('.gv14-next');
 if(nav&&geo.seas.length>1){
  nav.classList.add('gv311-nav');
  let label=nav.querySelector(':scope>span');if(label)label.textContent=tr('واصل الاستكشاف','Keep exploring');
  const next=nav.querySelector('button[data-item]'),later=(idx+1)%geo.seas.length,prev=(idx+geo.seas.length-1)%geo.seas.length;
  if(next){next.dataset.item='seas:'+later;next.textContent=tr('التالي: ','Next: ')+tr(geo.seas[later][0],geo.seas[later][1])}
  let before=nav.querySelector('.gv311-prev');
  if(!before&&next){before=document.createElement('button');before.type='button';before.className='gv311-prev';nav.insertBefore(before,next)}
  if(before){before.dataset.item='seas:'+prev;before.textContent=tr('السابق: ','Previous: ')+tr(geo.seas[prev][0],geo.seas[prev][1])}
 }
}
render=function(){priorRender.apply(this,arguments);decorate()};
fetch('./geo-stories.json?v=gv319-final-seas-enrichment',{cache:'no-store'})
 .then(r=>r.ok?r.json():Promise.reject(Error('stories unavailable')))
 .then(data=>{profiles=data.stories||{};decorate()})
 .catch(()=>decorate());
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',decorate,{once:true});
else decorate();
const style=document.createElement('style');style.id='gv311-sea-style';
style.textContent=`
.gv311-sea #gv14Description[hidden]{display:none!important}
.gv311-sea .gv311-facts>.gv14-fact{align-items:stretch;min-width:0}
.gv311-sea .gv311-facts strong{overflow-wrap:break-word}
.gv311-sea .gv14-overview .gv14-section-heading span,.gv311-sea .gv14-map .gv14-section-heading span{display:none}
.gv311-sea .gv311-facts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px;margin-top:13px}
.gv311-sea .gv311-facts>.gv14-fact{box-sizing:border-box;min-height:104px;justify-content:center;border-radius:15px;background:linear-gradient(145deg,#104456,#0c3348);border:1px solid #4c8f98;padding:14px 12px}
.gv311-sea .gv311-facts small{color:#a0cbd4;font-size:11px}
.gv311-sea .gv311-facts strong{font-size:clamp(12px,1.4vw,15px);line-height:1.8;overflow-wrap:anywhere}
.gv311-sea .gv311-list{list-style:disc;padding-inline-start:1.35em;margin:0;display:grid;gap:12px;color:#cfe7ed}
.gv311-sea .gv311-list li{line-height:1.9;padding-inline-start:.4em}
.gv311-sea .gv311-list li::marker{color:#65dbce}
.gv311-sea .gv311-finish{margin-top:18px;padding:23px 16px;display:flex;align-items:center;flex-direction:column;gap:15px;border:1px solid #4b9e9c;border-radius:18px;background:linear-gradient(130deg,#0b3746,#082b3c)}
.gv311-sea .gv311-finish h2{font-size:clamp(19px,2.4vw,25px);margin:0;color:#fff}
.gv311-sea .gv311-complete{display:flex;justify-content:center;align-items:center;gap:9px;align-self:center;min-height:50px;width:min(100%,290px);border-radius:15px;background:linear-gradient(110deg,#8cebd3,#40cdc8);color:#083b40;font-size:14px;font-weight:900}
.gv311-sea .gv311-complete.is-learned{background:#12515a;border-color:#73dacc;color:#eafff9}
.gv311-sea .gv311-nav{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.gv311-sea .gv311-nav>span{grid-column:1/-1}
.gv311-sea .gv311-nav button{min-height:65px;min-width:0;white-space:normal;text-align:start;line-height:1.6;border-radius:13px;background:linear-gradient(140deg,#0f4557,#0a354a)}
@media(max-width:600px){.gv311-sea .gv311-facts{gap:9px}.gv311-sea .gv311-facts>.gv14-fact{padding:12px 10px}.gv311-sea .gv311-list{gap:10px}.gv311-sea .gv311-nav button{padding:12px 9px;font-size:11px}}
`;
document.head.appendChild(style);
window.GeoVerseSeasV311={decorate};
})();