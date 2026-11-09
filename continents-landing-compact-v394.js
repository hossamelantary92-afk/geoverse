/* GeoVerse v394 — compact, visual continent landing only.
 * Country/continent detail articles remain unchanged. */
(function(){
'use strict';
if(typeof render!=='function')return;
const L=(ar,en)=>state.lang==='ar'?ar:en;
function compact(){
 if(state.page!=='category'||state.category!=='continents'||state.continentFeature)return;
 const root=document.getElementById('main');if(!root)return;
 const intro=root.querySelector('.topic-intro');
 if(intro){
  intro.classList.add('gv394-intro');
  const h=intro.querySelector('h2'),p=intro.querySelector('p');
  if(h)h.textContent=L('القارات السبع في لمحة','The seven continents at a glance');
  if(p)p.textContent=L('مساحات اليابسة الكبرى على الأرض، تختلف في الطبيعة والمناخ والحياة البشرية.','Earth’s great land regions vary in climate, landscapes and cultures.');
  // Keep geographic context without the two large text-only teaching boxes.
  const lessons=Array.from(intro.children).filter(el=>el!==h&&el!==p&&!el.classList.contains('intro-eyebrow'));
  lessons.forEach(el=>el.remove());
  if(!intro.querySelector('.gv394-intro-note')){
   const note=document.createElement('p');
   note.className='gv394-intro-note';
   note.textContent=L('تقسيم القارات تعليمي وجغرافي، وحدود أوروبا وآسيا اصطلاحية.','Continental divisions are partly conventional, notably between Europe and Asia.');
   intro.appendChild(note);
  }
 }
 const brief=root.querySelector('.gv-continent-brief');
 if(brief){
  brief.classList.add('gv394-brief');
  const heading=brief.querySelector('.gv-continent-brief-head');
  if(heading){
   const eyebrow=heading.querySelector('.eyebrow'),title=heading.querySelector('h2'),desc=heading.querySelector('p');
   if(eyebrow)eyebrow.textContent='CONTINENT ATLAS · 07';
   if(title)title.textContent=L('اكتشف القارات','Explore the continents');
   if(desc)desc.textContent=L('اختر قارة من الصور لتبدأ الاستكشاف.','Choose a continent card to explore.');
  }
  brief.querySelector('.gv-continent-convention')?.remove();
  const facts=brief.querySelector('.gv-continent-quickfacts');
  if(facts){
   facts.classList.add('gv394-facts');
   const items=[
    ['🌏',L('آسيا','Asia'),L('الأكبر مساحة','Largest area')],
    ['❄',L('أنتاركتيكا','Antarctica'),L('الأبرد','Coldest')],
    ['🌊',L('أوقيانوسيا','Oceania'),L('جزر المحيط الهادئ','Pacific islands')]
   ];
   facts.innerHTML=items.map(([icon,name,label])=>'<div class="gv394-fact"><span class="gv394-fact-icon" aria-hidden="true">'+icon+'</span><strong>'+name+'</strong><small>'+label+'</small></div>').join('');
  }
 }
}
const css=document.createElement('style');css.id='gv394-continents-landing-css';
css.textContent=`
#main:has(.gv394-intro) .gv394-intro,#main:has(.gv394-intro) .gv394-brief{margin:12px 0!important;padding:clamp(15px,2.5vw,21px)!important;border-radius:19px!important}
#main .gv394-intro .intro-eyebrow{font-size:11px!important;letter-spacing:.07em}
#main .gv394-intro h2{font-size:clamp(21px,5vw,27px)!important;line-height:1.4!important;margin:7px 0!important}
#main .gv394-intro>p{font-size:clamp(13px,3.4vw,15px)!important;line-height:1.75!important;margin:4px 0!important}
#main .gv394-intro .gv394-intro-note{color:#9fcfd0!important;font-size:11px!important;line-height:1.65!important;margin-top:8px!important}
#main .gv394-brief .gv-continent-brief-head h2{font-size:clamp(20px,5vw,27px)!important;margin:5px 0!important}
#main .gv394-brief .gv-continent-brief-head p{font-size:13px!important;line-height:1.6!important}
#main .gv394-brief .gv394-facts{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:8px!important;margin:13px 0 0!important}
#main .gv394-fact{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;min-width:0;min-height:93px;padding:11px 5px;border-radius:14px;border:1px solid rgba(105,214,211,.28);background:rgba(79,193,193,.08);text-align:center}
#main .gv394-fact-icon{font-size:22px;line-height:1}
#main .gv394-fact strong{font-size:clamp(11px,2.8vw,14px);line-height:1.4;color:#f1ffff;overflow-wrap:anywhere}
#main .gv394-fact small{font-size:clamp(10px,2.5vw,12px);line-height:1.45;color:#b5d5d8;overflow-wrap:anywhere}
#main:has(.gv394-intro) #categoryItems{margin-top:13px!important}
#main:has(.gv394-intro) #gvC5Directory{margin-top:15px!important}
body.light #main .gv394-fact{background:#f4fbfb;border-color:#b9d7d8}
body.light #main .gv394-fact strong{color:#163f49}
body.light #main .gv394-fact small{color:#476671}
@media(max-width:540px){
 #main .gv394-brief .gv394-facts{gap:6px!important}
 #main .gv394-fact{min-height:91px;padding:10px 3px}
 #main:has(.gv394-intro) .gv394-intro,#main:has(.gv394-intro) .gv394-brief{margin:10px 0!important;padding:15px!important}
}
`;
document.head.appendChild(css);
const prev=render;
render=function(){const result=prev.apply(this,arguments);compact();return result;};
compact();
})();