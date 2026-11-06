/* GeoVerse Phase 3.4 — precise, low-noise geographical feature pages.
 * Preserve the source-linked article image, the single 3D globe, saved learning,
 * and original geo-data. Avoid inventing coordinates, sizes, or unsourced facts. */
(function(){
'use strict';
const earlierDetail=detail, earlierRender=render;
const content={stories:null,photos:null};
const t=(ar,en)=>state.lang==='ar'?ar:en;
const esc=v=>escapeHTML(String(v==null?'':v));
const tidy=v=>String(v||'').trim().replace(/\s+/g,' ');
const key=v=>tidy(v).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z]/g,'');
const icon=id=>window.GeoVerseTopicsV12?.iconFor?.(id)||'';
function seen(){return !!saved()[state.category+'_'+state.item]}
function storyFor(v){return content.stories?.[v?.[1]]||null}
function sentence(text,max=250){
 const s=tidy(text);
 if(s.length<=max)return s;
 const sliced=s.slice(0,max),cut=Math.max(sliced.lastIndexOf('؛'),sliced.lastIndexOf('.'),sliced.lastIndexOf('،'),sliced.lastIndexOf(' '));
 return (cut>max*.55?sliced.slice(0,cut):sliced).trim()+'…';
}
function factRows(story){
 if(!story||state.lang!=='ar'||!Array.isArray(story.factsAr))return '';
 const rows=story.factsAr.filter(r=>Array.isArray(r)&&r.length===2&&r[0]&&r[1]).slice(0,4);
 if(!rows.length)return '';
 return '<div class="gv14-facts">'+rows.map(([label,value])=>'<div class="gv14-fact"><small>'+esc(label)+'</small><strong>'+esc(value)+'</strong></div>').join('')+'</div>';
}
function singlePage(){
 const cat=cats.find(c=>c.id===state.category),v=geo[state.category]?.[state.item];
 if(!cat||!v)return earlierDetail();
 const title=t(v[0],v[1]),story=storyFor(v),overview=sentence((story&&t(story.ar,story.en))||t(v[2],v[3]),520),done=seen();
 const same=geo[state.category]||[],next=same.length>1?(state.item+1)%same.length:null;
 return '<div class="gv14-detail">'+
 '<button class="back gv14-back" data-cat="'+cat.id+'">← '+t('العودة إلى '+cat.ar,'Back to '+cat.en)+'</button>'+
 '<section class="gv14-head" aria-labelledby="gv14Name">'+
  '<div class="gv14-photo" id="gvArticlePhoto" role="group" aria-label="'+t('صورة جغرافية: ','Photo of ')+esc(title)+'">'+
   '<div class="gv14-photo-placeholder">'+icon(cat.id)+'<span>'+t('جارٍ التحقق من صورة المعلم','Checking this place’s photograph')+'</span></div></div>'+
  '<div class="gv14-heading"><span class="gv14-kicker">'+icon(cat.id)+esc(t(cat.ar,cat.en))+'</span>'+
   '<h1 id="gv14Name">'+esc(title)+'</h1>'+
   '<p class="gv14-head-description" id="gv14Lead">'+esc(sentence(t(v[2],v[3]),220))+'</p>'+
   '<button id="toggleSeen" class="gv14-learned '+(done?'is-learned':'')+'" aria-pressed="'+(done?'true':'false')+'">'+
    '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 5 5 9-10"/></svg>'+
    (done?t('تم التعلّم','Learned'):t('تحديد كمعلومة تعلمتها','Mark as learned'))+'</button>'+
  '</div></section>'+
 '<section class="gv14-overview" aria-labelledby="gv14About"><div class="gv14-section-heading"><span>'+t('دليل جغرافي','FIELD GUIDE')+'</span><h2 id="gv14About">'+t('تعرف على المعلم','About this place')+'</h2></div>'+
  '<p id="gv14Description">'+esc(overview)+'</p><div id="gv14Facts">'+factRows(story)+'</div></section>'+
 '<section class="gv14-map" aria-labelledby="gv14MapTitle"><div class="gv14-section-heading"><span>'+t('استكشف الموقع','EXPLORE LOCATION')+'</span><h2 id="gv14MapTitle">'+t('موقع المعلم على الأرض','Location on Earth')+'</h2></div>'+
  '<div id="gvDetailGlobe" class="gv-globe-detail gv14-globe" role="group" aria-label="'+t('كرة أرضية تفاعلية لعرض موقع المعلم','Interactive 3D globe showing the location')+'"></div>'+
  '<p class="gv14-map-caption">'+t('الموقع تمثيلي عند عدم توفر حدود جغرافية موثقة.','Location may be representative when verified boundaries are unavailable.')+'</p></section>'+
 '<details class="gv9-more gv14-more"><summary>'+t('مصادر ومعلومات إضافية','Sources and more information')+'</summary>'+
  '<div id="gvWikiArticle" class="gv-wiki-summary"><p>'+t('جارٍ التحقق من المعلومات الإضافية…','Checking additional reference information…')+'</p></div>'+
  '<p class="gv14-data-note">'+t('الصور من مقالات مرتبطة بالمعلم، والحدود الطبيعية قد تكون تقريبية.','Photographs are tied to named articles; some natural boundaries are approximate.')+'</p>'+
  '</details>'+
 (next===null?'':'<div class="gv14-next"><span>'+t('واصل الاستكشاف','KEEP EXPLORING')+'</span><button type="button" data-item="'+cat.id+':'+next+'">'+
  esc(t(same[next][0],same[next][1]))+' <span aria-hidden="true">↗</span></button></div>')+
 '</div>';
}
detail=function(){
 if(state.category==='continents')return earlierDetail();
 return singlePage();
};
// Keep the carefully structured continent country list and exactly one continent globe.
function tidyContinent(){
 const root=document.getElementById('main');if(!root)return;
 root.classList.add('gv14-continent-page');
 root.querySelector('#detailMap')?.remove();
 root.querySelector('.gv-feature-globe')?.remove();
 root.querySelector('.gv-feature-article')?.remove();
 const card=root.querySelector('.detail-card');
 if(card){
  card.querySelector('h2')?.remove();
  card.querySelector('p')?.remove();
  card.querySelector('.detail-meta')?.remove();
  card.querySelector('#showMapPoint')?.remove();
  card.classList.add('gv14-continent-progress');
 }
 const second=root.querySelectorAll('#gvContinentGlobe');
 for(let i=1;i<second.length;i++)second[i].remove();
}
function hydrate(){
 if(state.page!=='detail'||state.category==='continents')return;
 const v=geo[state.category]?.[state.item],story=storyFor(v),target=document.getElementById('gv14Description');
 if(!v||!target)return;
 if(story){target.textContent=sentence(t(story.ar,story.en)||t(v[2],v[3]),520);
  const el=document.getElementById('gv14Facts');if(el)el.innerHTML=factRows(story);
 }
 const entry=content.photos?.[state.category+':'+state.item],photo=document.getElementById('gvArticlePhoto');
 if(photo&&Array.isArray(entry)&&typeof entry[0]==='string'&&/^https:\/\/(?:upload|thumb)\.wikimedia\.org\//.test(entry[0])){
  if(!photo.querySelector('img')){
   const img=document.createElement('img');img.loading='eager';img.decoding='async';img.alt=t('صورة المعلم: ','Place photograph: ')+t(v[0],v[1]);
   img.addEventListener('load',()=>{if(photo.isConnected)photo.classList.add('gv14-has-photo')});
   img.addEventListener('error',()=>{img.remove();photo.classList.remove('gv14-has-photo')});
   photo.insertBefore(img,photo.firstChild);
   img.src=entry[0];
   const link=document.createElement('a');link.className='gv14-image-credit';link.target='_blank';link.rel='noopener noreferrer';
   link.href='https://en.wikipedia.org/wiki/'+encodeURIComponent(String(entry[1]||v[1]).replace(/ /g,'_'));
   link.textContent=t('مصدر الصورة','Image source');
   photo.appendChild(link);
  }
 }
}
render=function(){
 earlierRender();
 if(state.page==='detail'&&state.category==='continents')tidyContinent();
 else if(state.page==='detail')hydrate();
};
Promise.allSettled([fetch('./geo-stories.json').then(r=>{if(!r.ok)throw Error('stories');return r.json()}),fetch('./photo-manifest-v13.json').then(r=>{if(!r.ok)throw Error('photos');return r.json()})])
.then(result=>{
 if(result[0].status==='fulfilled')content.stories=result[0].value.stories||{};
 if(result[1].status==='fulfilled')content.photos=result[1].value.photos||{};
 hydrate();
});
window.GeoVerseDetailV14={hydrate,singlePage,tidyContinent,hasStories:()=>!!content.stories};
})();