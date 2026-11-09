/* GeoVerse C1.1 — Seven matching continent card + detail hero photos.
 * Sources and photographer credits are recorded in assets/continent-photos/ATTRIBUTION.md.
 * Falls back to Commons only when the locally archived image is absent.
 */
(function(){
'use strict';
const photos=[{"slug":"asia","filename":"Sunset Glow on Mount Everest.jpg","altAr":"قمة إيفرست المضيئة وقت الغروب في جبال الهيمالايا بنِيبال","altEn":"Mount Everest summit at sunset in Nepal Himalayas","focal":"center 48%"},{"slug":"africa","filename":"Acacia tree on a sunrise safari at the Serengeti National Park, Tanzania.jpg","altAr":"شجرة أكاسيا عند شروق الشمس في سهول سيرينجيتي بتنزانيا","altEn":"Acacia tree at sunrise in Serengeti National Park Tanzania","focal":"center 53%"},{"slug":"europe","filename":"Lauterbrunnen Valley (50094290591).jpg","altAr":"وادي لوتربرونن الأخضر والجبال السويسرية في أوروبا","altEn":"Lauterbrunnen Valley and the Swiss Alps in Europe","focal":"center 54%"},{"slug":"north-america","filename":"Grand Canyon Afternoon Blue Sky.jpg","altAr":"طبقات الصخور الحمراء في الأخدود العظيم تحت سماء زرقاء بأريزونا","altEn":"Red Grand Canyon rock formations beneath blue Arizona sky","focal":"center 55%"},{"slug":"south-america","filename":"Amazon CIAT (5).jpg","altAr":"صورة جوية حقيقية للغابات المطيرة في الأمازون قرب ماناوس البرازيلية","altEn":"Authentic aerial Amazon rainforest near Manaus in Brazil","focal":"center 53%"},{"slug":"oceania","filename":"Bora Bora Airport.jpg","altAr":"صورة فوتوغرافية حقيقية لبحيرة بورا بورا الفيروزية وجبالها في بولينيزيا الفرنسية","altEn":"Real photograph of Bora Bora turquoise lagoon and mountains in French Polynesia","focal":"center 57%"},{"slug":"antarctica","filename":"Penguins in Baily's Head, overlooking Livingston Island - Deception Island, Antarctica.jpg","altAr":"مستعمرة بطاريق حقيقية في جزيرة ديسبشن بأنتاركتيكا مع جبل جليدي بعيد","altEn":"Real chinstrap penguins at Deception Island Antarctica with distant iceberg","focal":"center 58%"}];
const escapeHtml=value=>String(value||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function setupImage(img,profile){
 const file=profile.remote||('./assets/continent-photos/'+profile.slug+'.webp?v=gv380-continents-premium-six');
 const backup='https://commons.wikimedia.org/wiki/Special:Redirect/file/'+encodeURIComponent(profile.filename.replace(/ /g,'_'))+'?width=1200';
 img.addEventListener('error',function(){
  if(img.dataset.gvFallback)return;
  img.dataset.gvFallback='1';img.src=backup;
 },{once:true});
 img.loading='lazy';img.decoding='async';img.src=file;
}
function cardPhotoMarkup(p) {
 const alt=escapeHtml(state.lang==='ar'?p.altAr:p.altEn);
 const url=p.remote||('./assets/continent-photos/'+p.slug+'.webp?v=gv380-continents-premium-six');
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
