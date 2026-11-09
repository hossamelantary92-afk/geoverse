/* GeoVerse C1.1 — Seven matching continent card + detail hero photos.
 * Sources and photographer credits are recorded in assets/continent-photos/ATTRIBUTION.md.
 * Falls back to Commons only when the locally archived image is absent.
 */
(function(){
'use strict';
const photos=[{"slug":"asia","filename":"Sunset view of Everest.jpg","altAr":"جبال الهيمالايا وقمة إيفرست","altEn":"Mount Everest in the Himalayas","focal":"center 47%"},{"slug":"africa","filename":"Zebras in Serengeti National Park with Acacia tree.jpg","altAr":"حُمر وحشية وأشجار الأكاسيا في السافانا الأفريقية","altEn":"Serengeti zebra and acacia savanna","focal":"center 55%"},{"slug":"europe","filename":"Lauterbrunnen Valley.jpg","altAr":"وادي لوتربرونن وجبال الألب الأوروبية","altEn":"Lauterbrunnen valley in the European Alps","focal":"center 56%"},{"slug":"north-america","filename":"Grand Canyon panorama.jpg","altAr":"الأخدود العظيم بأمريكا الشمالية","altEn":"Grand Canyon in North America","focal":"center 53%"},{"slug":"south-america","filename":"Aerial view of the Amazon Rainforest.jpg","altAr":"نهر الأمازون والغابات المطيرة من الجو","altEn":"Aerial view of the Amazon rainforest","focal":"center 53%"},{"slug":"oceania","filename":"Lizard Island from the air.jpg","altAr":"جزيرة ليزارد والحاجز المرجاني العظيم بأوقيانوسيا","altEn":"Lizard Island and Great Barrier Reef in Oceania","focal":"center 54%"},{"slug":"antarctica","filename":"Chinstrap Penguins on the Antarctic peninsula.jpg","altAr":"بطاريق القارة القطبية الجنوبية","altEn":"Chinstrap penguins on the Antarctic Peninsula","focal":"center 60%"}];
const escapeHtml=value=>String(value||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function setupImage(img,profile){
 const file='./assets/continent-photos/'+profile.slug+'.webp';
 const backup='https://commons.wikimedia.org/wiki/Special:Redirect/file/'+encodeURIComponent(profile.filename.replace(/ /g,'_'))+'?width=1200';
 img.addEventListener('error',function(){
  if(img.dataset.gvFallback)return;
  img.dataset.gvFallback='1';img.src=backup;
 },{once:true});
 img.loading='lazy';img.decoding='async';img.src=file;
}
function applyPhotos(){
 if(state.page!=='category'&&state.page!=='detail')return;
 if(state.category!=='continents')return;
 const root=document.getElementById('main');if(!root)return;
 if(state.page==='category'){
  root.querySelectorAll('.item-card[data-item]').forEach(function(card){
   const m=String(card.getAttribute('data-item')).match(/^continents:(\d+)$/);if(!m)return;
   const p=photos[Number(m[1])];if(!p||card.querySelector('.gv-continent-card-image'))return;
   const img=document.createElement('img');
   img.className='gv-continent-card-image';img.alt=state.lang==='ar'?p.altAr:p.altEn;
   img.style.objectPosition=p.focal;
   card.insertBefore(img,card.firstChild);
   setupImage(img,p);
  });
 }
 if(state.page==='detail'){
  const p=photos[Number(state.item)];if(!p)return;
  const banner=root.querySelector('.category-detail-banner');if(!banner)return;
  const img=document.createElement('img');img.className='gv-continent-hero-image';img.alt=state.lang==='ar'?p.altAr:p.altEn;
  img.style.objectPosition=p.focal;
  banner.prepend(img);setupImage(img,p);
  banner.classList.add('gv-continent-specific-hero');
 }
}
const css=`
.item-card:has(.gv-continent-card-image){position:relative;isolation:isolate;overflow:hidden;display:flex;flex-direction:column;align-items:stretch;text-align:start;min-height:210px;justify-content:flex-end;border:1px solid rgba(118,223,219,.3);padding:17px;background:#0b293b}
.item-card .gv-continent-card-image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;transition:transform .45s ease}
.item-card:has(.gv-continent-card-image):before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(0deg,rgba(1,15,28,.94) 0%,rgba(1,15,28,.42) 68%,rgba(1,15,28,.12) 100%);pointer-events:none}
.item-card:has(.gv-continent-card-image):hover .gv-continent-card-image{transform:scale(1.045)}
.item-card:has(.gv-continent-card-image)>strong,.item-card:has(.gv-continent-card-image)>small{position:relative;z-index:2}.item-card:has(.gv-continent-card-image) strong{color:white;font-size:18px;text-shadow:0 2px 9px #0008}
.item-card:has(.gv-continent-card-image) small{color:#e7f3f5;line-height:1.65;text-shadow:0 2px 7px #000}
.item-card:has(.gv-continent-card-image) .item-icon{display:none}
.gv-continent-specific-hero{position:relative;overflow:hidden;isolation:isolate;background:transparent!important}
.gv-continent-hero-image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0}
.gv-continent-specific-hero:before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(0deg,rgba(1,16,30,.88),rgba(1,16,30,.12) 82%);pointer-events:none}
.gv-continent-specific-hero>div{position:relative;z-index:2}
@media(max-width:650px){.item-card:has(.gv-continent-card-image){min-height:190px}.item-card:has(.gv-continent-card-image) strong{font-size:16px}.gv-continent-specific-hero{min-height:240px}}
`;
if(!document.getElementById('gv-continent-photos-style')){const style=document.createElement('style');style.id='gv-continent-photos-style';style.textContent=css;document.head.appendChild(style);}
const previous=render;
render=function(){previous();applyPhotos();};
})();
