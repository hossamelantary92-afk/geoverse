/* GeoVerse C1.1 — Seven matching continent card + detail hero photos.
 * Sources and photographer credits are recorded in assets/continent-photos/ATTRIBUTION.md.
 * Falls back to Commons only when the locally archived image is absent.
 */
(function(){
'use strict';
const photos=[{"slug":"asia","filename":"Sunset view of Everest.jpg","altAr":"جبال الهيمالايا وقمة إيفرست","altEn":"Mount Everest in the Himalayas","focal":"center 47%"},{"slug":"africa","filename":"Zebras in Serengeti National Park with Acacia tree.jpg","altAr":"حُمر وحشية وأشجار الأكاسيا في السافانا الأفريقية","altEn":"Serengeti zebra and acacia savanna","focal":"center 55%"},{"slug":"europe","filename":"Lauterbrunnen valley June.jpg","altAr":"وادي لوتربرونن وجبال الألب الأوروبية","altEn":"Lauterbrunnen valley in the European Alps","focal":"center 56%"},{"slug":"north-america","filename":"Grand Canyon panorama.jpg","altAr":"الأخدود العظيم بأمريكا الشمالية","altEn":"Grand Canyon in North America","focal":"center 53%"},{"slug":"south-america","filename":"Aerial view of the Amazon Rainforest.jpg","altAr":"نهر الأمازون والغابات المطيرة من الجو","altEn":"Aerial view of the Amazon rainforest","focal":"center 53%"},{"slug":"oceania","filename":"Lizard Island from the air.jpg","altAr":"جزيرة ليزارد والحاجز المرجاني العظيم بأوقيانوسيا","altEn":"Lizard Island and Great Barrier Reef in Oceania","focal":"center 54%"},{"slug":"antarctica","filename":"Chinstrap Penguins on the Antarctic peninsula.jpg","altAr":"بطاريق القارة القطبية الجنوبية","altEn":"Chinstrap penguins on the Antarctic Peninsula","focal":"center 60%"}];
const escapeHtml=value=>String(value||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function setupImage(img,profile){
 const file='./assets/continent-photos/'+profile.slug+'.webp?v=gv375-hd';
 const backup='https://commons.wikimedia.org/wiki/Special:Redirect/file/'+encodeURIComponent(profile.filename.replace(/ /g,'_'))+'?width=1200';
 img.addEventListener('error',function(){
  if(img.dataset.gvFallback)return;
  img.dataset.gvFallback='1';img.src=backup;
 },{once:true});
 img.loading='lazy';img.decoding='async';img.src=file;
}
function cardPhotoMarkup(p) {
 const alt=escapeHtml(state.lang==='ar'?p.altAr:p.altEn);
 const url='./assets/continent-photos/'+p.slug+'.webp?v=gv375-hd';
 return '<img class="gv-continent-card-image" loading="lazy" decoding="async" src="'+url+'" alt="'+alt+'" style="object-position:'+p.focal+'">';
}
const oldItemCards=itemCards;
itemCards=function(items){
 if(state.category!=='continents')return oldItemCards(items);
 const q=(state.filter||'').trim().toLowerCase();
 const cards=items.map((v,i)=>({v,i})).filter(x=>!q||(x.v[0]+' '+x.v[1]).toLowerCase().includes(q));
 return cards.length?cards.map(({v,i})=>{
  const p=photos[i];
  if(!p)return '';
  return '<button type="button" class="gv-place-card gv-continent-place-card" data-item="continents:'+i+'">'+
   '<span class="gv-place-media gv-continent-media">'+cardPhotoMarkup(p)+'</span>'+
   '<span class="gv-place-copy"><strong>'+escapeHtml(state.lang==='ar'?v[0]:v[1])+'</strong><small>'+escapeHtml(state.lang==='ar'?v[2]:v[3])+'</small><span class="gv-place-explore">'+(state.lang==='ar'?'اكتشف القارة وتفاصيلها':'Explore continent and facts')+' ↗</span></span></button>';
 }).join(''):'<div class="empty">'+(state.lang==='ar'?'لا توجد نتائج':'No results')+'</div>';
};
function applyPhotos(){
 if(state.page!=='detail'||state.category!=='continents')return;
 const root=document.getElementById('main');if(!root)return;
 const p=photos[Number(state.item)];if(!p)return;
 const banner=root.querySelector('.category-detail-banner');if(!banner)return;
 if(banner.querySelector('.gv-continent-hero-image'))return;
 const img=document.createElement('img');img.className='gv-continent-hero-image';img.alt=state.lang==='ar'?p.altAr:p.altEn;
 img.style.objectPosition=p.focal;banner.prepend(img);setupImage(img,p);
 banner.classList.add('gv-continent-specific-hero');
}
const css=`
/* The category is rendered as gv-place-card by enhancements-v136 — not item-card. */
.gv-continent-place-card.gv-place-card{overflow:hidden;border-radius:18px;border:1px solid rgba(91,207,209,.32);background:#092538;box-shadow:0 12px 25px rgba(0,0,0,.13);transition:transform .25s ease,border-color .25s ease}
.gv-continent-place-card.gv-place-card:hover{transform:translateY(-3px);border-color:rgba(133,239,221,.72)}
.gv-continent-place-card .gv-continent-media.gv-place-media{display:block;position:relative;overflow:hidden;width:100%;height:clamp(180px,23vw,270px);min-height:180px;background:#163446;isolation:isolate;padding:0}
.gv-continent-place-card .gv-continent-media:before{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(0deg,rgba(0,14,29,.28),transparent 55%)}
.gv-continent-place-card .gv-continent-card-image{display:block!important;position:absolute!important;inset:0;width:100%!important;height:100%!important;object-fit:cover!important;filter:none!important;opacity:1!important;z-index:0!important;transition:transform .45s ease}
.gv-continent-place-card:hover .gv-continent-card-image{transform:scale(1.035)}
.gv-continent-place-card .gv-place-copy{position:relative;z-index:2;padding:15px 17px 18px}
.gv-continent-place-card .gv-place-copy strong{font-size:18px;line-height:1.5}
.gv-continent-place-card .gv-place-copy small{line-height:1.65}
.gv-continent-specific-hero{position:relative;overflow:hidden;isolation:isolate;background:#102b3c!important}
.gv-continent-specific-hero .gv-continent-hero-image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:none!important;z-index:0}
.gv-continent-specific-hero:before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(0deg,rgba(1,16,30,.78),rgba(1,16,30,.08) 86%);pointer-events:none}
.gv-continent-specific-hero>div{position:relative;z-index:2}
@media(max-width:650px){.gv-continent-place-card .gv-continent-media.gv-place-media{height:210px}.gv-continent-place-card .gv-place-copy strong{font-size:16px}.gv-continent-specific-hero{min-height:240px}}
`;
if(!document.getElementById('gv-continent-photos-style')){const style=document.createElement('style');style.id='gv-continent-photos-style';style.textContent=css;document.head.appendChild(style);}
const previous=render;
render=function(){previous();applyPhotos();};
})();
