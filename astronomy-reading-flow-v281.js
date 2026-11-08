/* GeoVerse v281: one coherent astronomy reading flow, preserving progress. */
(function(){
'use strict';
if(typeof detail!=='function'||!window.GeoVerseAstronomyV231)return;
const T=(ar,en)=>state.lang==='ar'?ar:en;
function eclipseDiagram(){
 return '<section class="gv281-diagram" aria-label="رسم عربي يوضح ترتيب الأجرام في الكسوف والخسوف">'+
 '<h2>كيف تصطف الأجرام؟</h2><p class="gv281-intro">اتّبع ترتيب الأجرام في الرسمين؛ الأحجام والمسافات توضيحية وليست بمقياس حقيقي.</p>'+
 '<div class="gv281-diagram-grid">'+
 '<figure><figcaption>كسوف الشمس</figcaption>'+
 '<svg viewBox="0 0 360 116" role="img" aria-label="الشمس ثم القمر ثم الأرض، وظل القمر يصل إلى جزء من الأرض">'+
 '<defs><radialGradient id="gv281sun1"><stop stop-color="#fff3ad"/><stop offset="1" stop-color="#efa737"/></radialGradient><radialGradient id="gv281earth1"><stop stop-color="#77d1df"/><stop offset="1" stop-color="#24779a"/></radialGradient></defs>'+
 '<path d="M51 30 L317 47 L317 70 L51 87 Z" fill="#ffd572" opacity=".11"/>'+
 '<path d="M178 54 L322 62 L178 70 Z" fill="#030b17" opacity=".82"/>'+
 '<circle cx="52" cy="60" r="29" fill="url(#gv281sun1)"/><circle cx="180" cy="60" r="11" fill="#8795a8" stroke="#c4d7e8"/><circle cx="319" cy="60" r="22" fill="url(#gv281earth1)"/>'+
 '<g fill="#e6f7ff" text-anchor="middle" font-size="14" font-weight="700"><text x="52" y="111">الشمس</text><text x="180" y="111">القمر</text><text x="319" y="111">الأرض</text></g></svg>'+
 '<p>القمر يحجب ضوء الشمس عن منطقة محدودة على الأرض.</p></figure>'+
 '<figure><figcaption>خسوف القمر</figcaption>'+
 '<svg viewBox="0 0 360 116" role="img" aria-label="الشمس ثم الأرض ثم القمر، وظل الأرض يمتد نحو القمر">'+
 '<defs><radialGradient id="gv281sun2"><stop stop-color="#fff3ad"/><stop offset="1" stop-color="#efa737"/></radialGradient><radialGradient id="gv281earth2"><stop stop-color="#77d1df"/><stop offset="1" stop-color="#24779a"/></radialGradient></defs>'+
 '<path d="M53 31 L312 40 L312 80 L53 89 Z" fill="#ffd572" opacity=".11"/>'+
 '<path d="M180 38 L337 56 L337 64 L180 82 Z" fill="#030b17" opacity=".85"/>'+
 '<circle cx="52" cy="60" r="29" fill="url(#gv281sun2)"/><circle cx="180" cy="60" r="22" fill="url(#gv281earth2)"/><circle cx="319" cy="60" r="11" fill="#a4a8b5" stroke="#cbd5e4"/>'+
 '<g fill="#e6f7ff" text-anchor="middle" font-size="14" font-weight="700"><text x="52" y="111">الشمس</text><text x="180" y="111">الأرض</text><text x="319" y="111">القمر</text></g></svg>'+
 '<p>الأرض تحجب ضوء الشمس عن القمر عندما يدخل في ظلها.</p></figure></div>'+
 '<p class="gv281-note">لا يحدث أيٌّ منهما كل شهر لأن مدار القمر مائل عن مستوى مدار الأرض حول الشمس.</p>'+
 '</section>';
}
function solarSafety(){
 return '<aside class="gv281-safety"><strong>تنبيه عند رصد الكسوف الشمسي</strong><p>في الكسوف الجزئي والحلقي والمراحل الجزئية من الكسوف الكلي، استخدم نظارات رصد شمسي مطابقة لمعيار ISO 12312-2؛ النظارات الشمسية العادية لا تحمي العين. أما الخسوف القمري فمشاهدته بالعين المجردة آمنة.</p><a href="https://science.nasa.gov/eclipses/safety/" target="_blank" rel="noopener noreferrer">إرشادات NASA للرصد الآمن ↗</a></aside>';
}
const prior=detail;
detail=function(){
 const html=prior.apply(this,arguments);
 if(state.page!=='detail'||state.category!=='astronomy'||!html.includes('gv231-complete'))return html;
 const item=window.GeoVerseAstronomyV231.entries[Number(state.item)];
 if(!item)return html;
 const wrapper=document.createElement('div');
 wrapper.innerHTML=html;
 const wrap=wrapper.querySelector('.gv231-wrap');
 const nav=wrap?.querySelector('.gv231-next');
 const complete=wrap?.querySelector('button.gv231-complete');
 if(!wrap||!nav||!complete)return html;
 if(state.lang==='ar'){
  // Hide generic fact boxes that repeat the lead rather than conveying a date, period, or scale.
  const vaguePeriodIds=new Set(["asteroids","telescopes","comets","aurora","star-colors","supernova","expanding-universe","jupiter-moons","saturn-moons"]);
  if(vaguePeriodIds.has(item.id)){
   const vague=wrap.querySelector('.gv231-period');
   if(vague)vague.remove();
  }
  if(item.id==='telescopes'){
   const generic=wrap.querySelector('.gv231-period');
   if(generic)generic.remove();
   // Keep the fact, but remove an explanation that repeats the opening scientific mechanism.
   const repeated=wrap.querySelector('.gv277-facts>li:first-child .gv277-fact-more');
   if(repeated)repeated.remove();
  }
  if(item.id==='eclipses'){
   // The diagram conveys both alignments visually, so the prose comparison is redundant.
   const comparison=wrap.querySelector('.gv278-compare');
   if(comparison)comparison.remove();
   const science=wrap.querySelector('.gv238-lesson');
   if(science)science.remove();
   const facts=wrap.querySelector('.gv231-detail-body h2');
   if(facts)facts.insertAdjacentHTML('beforebegin',eclipseDiagram());
   const scienceLink=wrap.querySelector('.gv242-depth');
   const safety=solarSafety();
   if(scienceLink)scienceLink.insertAdjacentHTML('afterend',safety);
   else nav.insertAdjacentHTML('beforebegin',safety);
  }
 }
 const finish=document.createElement('section');
 finish.className='gv281-finish';
 finish.setAttribute('aria-label',T('إنهاء الدرس','Finish lesson'));
 const heading=document.createElement('h2');
 heading.textContent=T('خلصت قراءة الدرس؟','Finished reading?');
 finish.appendChild(heading);
 finish.appendChild(complete);
 nav.parentNode.insertBefore(finish,nav);
 return wrapper.innerHTML;
};
window.GeoVerseAstronomyReadingFlowV281={eclipseDiagram};
if(state.page==='detail'&&state.category==='astronomy'&&typeof render==='function')render();
})();