/* GeoVerse v5 Quality Layer: accessible Arabic narratives and efficient 3D playback.
 * Loaded after app.js, before enhancements.js. No live English prose in Arabic view.
 * Sources: curated local geo-stories.json and linked Arabic Wikipedia articles. */
(function(){
'use strict';
const win=window;
const nativeGlobe=win.Globe;
if(typeof nativeGlobe==='function'){
 win.Globe=function GeoVerseQualityGlobe(node,options){
  const globe=new nativeGlobe(node,options);
  let visibilityObserver=null;
  try{
   const ratio=Math.min(win.devicePixelRatio||1,win.matchMedia?.('(pointer:coarse)').matches?1.2:1.6);
   globe.renderer?.()?.setPixelRatio?.(ratio);
   if(win.IntersectionObserver){
    visibilityObserver=new win.IntersectionObserver(entries=>{
     if(!node.isConnected)return;
     if(entries[0]?.isIntersecting&&!document.hidden)globe.resumeAnimation?.();
     else globe.pauseAnimation?.();
    },{rootMargin:'120px',threshold:0.01});
    visibilityObserver.observe(node);
   }
  }catch(err){console.debug('Adaptive globe renderer unavailable',err)}
  const onVisibility=()=>{
   if(document.hidden)globe.pauseAnimation?.();
   else if(node.isConnected)globe.resumeAnimation?.();
  };
  document.addEventListener('visibilitychange',onVisibility);
  const originalCleanup=globe._destructor;
  globe._destructor=function(){
   visibilityObserver?.disconnect();
   document.removeEventListener('visibilitychange',onVisibility);
   return originalCleanup?.apply(globe,arguments);
  };
  return globe;
 };
}
const stories=new Map();
let articleKey='',articleRun=0;
const normalize=x=>String(x||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z]/g,'');
const escapeText=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const currentState=()=>typeof state!=='undefined'?state:null;
const readFeature=()=>{
 const s=currentState();if(!s)return null;
 if(s.page==='detail'&&s.category!=='continents'){
  const v=typeof geo!=='undefined'?geo[s.category]?.[s.item]:null;
  if(v)return {key:s.category+':'+s.item,name:v[1],ar:v[0],introAr:v[2],introEn:v[3]};
 }
 if(s.page==='country-v4'){
  const record=win.GeoVerseV4?.store?.byCode?.get(s.v4Code);
  if(record)return {key:'country:'+record.code,name:record.name,ar:record.name,introAr:'تقع هذه الدولة في '+(record.continent==='Africa'?'أفريقيا':record.continent==='Asia'?'آسيا':record.continent==='Europe'?'أوروبا':record.continent==='South America'?'أمريكا الجنوبية':record.continent==='North America'?'أمريكا الشمالية':record.continent==='Oceania'?'أوقيانوسيا':record.continent)+'. عاصمتها '+(record.capital||'غير محددة في المصدر')+'.',introEn:'Explore the geography of '+record.name+'.'};
 }
 return null;
};
function factCards(story,isAr){
 const facts=story.factsAr||[];
 if(!isAr||!facts.length)return '';
 return '<div class="gv-quality-facts">'+facts.map(([label,value])=>'<div><small>'+escapeText(label)+'</small><strong>'+escapeText(value)+'</strong></div>').join('')+'</div>';
}
function shortArabicExtract(raw){
 const clean=String(raw||'').replace(/\[[0-9،,\s]+\]/g,'').replace(/\s+/g,' ').trim();
 const parts=clean.match(/[^.!؟\n]+[.!؟]?/g)||[clean];
 return parts.slice(0,5).join(' ').trim().slice(0,1150);
}
const sourcePage=async name=>{
 const p=new URLSearchParams({action:'query',prop:'langlinks',lllang:'ar',llprop:'url',redirects:'1',titles:name,format:'json',origin:'*'});
 const response=await fetch('https://en.wikipedia.org/w/api.php?'+p);
 if(!response.ok)return null;
 const result=await response.json(),page=Object.values(result.query?.pages||{})[0];
 return page?.langlinks?.find(x=>x.lang==='ar')||null;
};
const arabicArticle=async name=>{
 const link=await sourcePage(name);if(!link?.['*'])return null;
 const p=new URLSearchParams({action:'query',prop:'extracts|info',inprop:'url',exintro:'1',explaintext:'1',redirects:'1',titles:link['*'],format:'json',origin:'*'});
 const response=await fetch('https://ar.wikipedia.org/w/api.php?'+p);
 if(!response.ok)return null;
 const result=await response.json(),page=Object.values(result.query?.pages||{})[0];
 if(!page||page.missing!==undefined||!page.extract)return null;
 return {text:shortArabicExtract(page.extract),url:page.fullurl||link.url,title:page.title};
};
function addArticle(){
 const s=currentState(),feature=readFeature(),target=document.getElementById('gvWikiArticle');
 if(!feature||!target)return;
 const langCode=s.lang==='ar'?'ar':'en',key=feature.key+'|'+langCode;
 if(target.dataset.gvQualityKey!==key){
  target.dataset.gvQualityKey=key;
  const story=stories.get(normalize(feature.name));
  const parent=target.parentElement;
  if(parent){
   let panel=parent.querySelector('.gv-quality-lesson');
   if(!panel){panel=document.createElement('section');panel.className='gv-quality-lesson';target.before(panel);}
   const simple=langCode==='ar'?(story?.ar||feature.introAr||''):(story?.en||feature.introEn||'');
   panel.innerHTML='<div class="gv-quality-caption">GEOVERSE / FIELD GUIDE</div><h3>'+ (langCode==='ar'?'المكان ببساطة':'The place, explained')+'</h3><p>'+escapeText(simple)+'</p>'+factCards(story||{},langCode==='ar');
  }
 }
 if(langCode!=='ar')return;
 if(articleKey===key)return;
 articleKey=key;const run=++articleRun;
 let panel=target.parentElement?.querySelector('.gv-arabic-source');
 if(!panel){
  panel=document.createElement('section');panel.className='gv-arabic-source';target.after(panel);
 }
 panel.innerHTML='<p class="gv-quality-loading">جارٍ البحث عن شرح إضافي بالعربية...</p>';
 arabicArticle(feature.name).then(article=>{
  if(run!==articleRun||currentState()?.lang!=='ar'||!panel.isConnected)return;
  if(!article){
   panel.innerHTML='<p class="gv-quality-muted">المعلومات الأساسية موجودة بالأعلى بالعربية المبسطة. لا توجد مقالة عربية مطابقة لهذا المعلم حاليًا.</p>';
   return;
  }
  panel.innerHTML='<div class="gv-quality-caption">ويكيبيديا العربية</div><h3>معلومات إضافية</h3><p>'+escapeText(article.text)+'</p><a href="'+escapeText(article.url)+'" target="_blank" rel="noopener noreferrer">اقرأ المقال الأصلي بالعربية ↗</a>';
 }).catch(()=>{
  if(run===articleRun&&panel.isConnected)panel.innerHTML='<p class="gv-quality-muted">تعذر تحميل المعلومات الإضافية. يمكنك قراءة الشرح المبسط الموجود بالأعلى.</p>';
 });
}
function decorate(){
 const s=currentState();if(!s)return;
 if(s.page!=='detail'&&s.page!=='country-v4'){articleKey='';articleRun++;return;}
 addArticle();
}
const main=document.getElementById('main');
if(main&&win.MutationObserver){
 let frame=0;
 const observer=new win.MutationObserver(()=>{if(frame)return;frame=win.requestAnimationFrame?win.requestAnimationFrame(()=>{frame=0;decorate()}):setTimeout(()=>{frame=0;decorate()},20)});
 observer.observe(main,{childList:true});
}
fetch('./geo-stories.json').then(r=>r.ok?r.json():null).then(data=>{
 for(const [name,story] of Object.entries(data?.stories||{}))stories.set(normalize(name),story);
 decorate();
}).catch(()=>decorate());
setTimeout(decorate,80);
win.GeoVerseQuality={stories,decorate,shortArabicExtract,arabicArticle};
})();