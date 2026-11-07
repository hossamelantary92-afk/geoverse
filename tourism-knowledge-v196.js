/* GeoVerse v196 — Tourism is now a knowledge-first, fully text-based atlas.
   Only applies to tourism. No photo nodes and no image requests.
   Keeps native navigation, glossary content, globe, progress and search. */
(function(){
'use strict';
const catalogue=()=>window.GeoVerseTourismV170?.items||[];
const selected=()=>window.GeoVerseTourismCountryNavigation?.getSelected?.()||'';
const ar=()=>state.lang!=='en';
const t=(a,e)=>ar()?a:e;
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const kind=[
 'archaeology','archaeology','archaeology','archaeology',
 'architecture','museum','palace','heritage',
 'archaeology','architecture','architecture','religious',
 'religious','religious','archaeology','heritage',
 'religious','religious','palace','heritage',
 'religious','palace','museum','religious',
 'heritage','architecture','museum','archaeology',
 'monument','nature','monument','nature',
 'palace','religious','archaeology','heritage',
 'monument','fortress','palace','monument',
 'religious','religious','architecture','religious',
 'architecture','religious','architecture','museum'
];
const kinds={
 archaeology:['موقع أثري','Archaeological site'],
 architecture:['معلم معماري','Architectural landmark'],
 museum:['متحف','Museum'],
 palace:['قصر تاريخي','Historic palace'],
 heritage:['موقع تراثي','Heritage site'],
 religious:['معلم ديني','Religious landmark'],
 monument:['نصب تذكاري','Monument'],
 nature:['معلم طبيعي','Natural landmark'],
 fortress:['حصن تاريخي','Historic fortress']
};
const symbols={archaeology:'⌘',architecture:'⌂',museum:'▤',palace:'♜',heritage:'◇',religious:'✦',monument:'◈',nature:'❋',fortress:'⬡'};
const region={EG:['أفريقيا','Africa'],FR:['أوروبا','Europe'],IT:['أوروبا','Europe'],SA:['آسيا','Asia'],TR:['آسيا وأوروبا','Asia and Europe'],ES:['أوروبا','Europe'],GB:['أوروبا','Europe'],US:['أمريكا الشمالية','North America'],CN:['آسيا','Asia'],IN:['آسيا','Asia'],JP:['آسيا','Asia'],AE:['آسيا','Asia']};
function type(i){return kinds[kind[i]||'heritage']||kinds.heritage}
function icon(i){return symbols[kind[i]||'heritage']}
function place(i){return catalogue()[i]}
function card(row){
 const i=row.index;
 const name=esc(t(row.nameAr,row.nameEn));
 const city=esc(t(row.cityAr,row.cityEn));
 return '<button type="button" class="gv196-card gv197-minimal-card" data-item="tourism:'+i+'" aria-label="'+esc(t('تفاصيل ','Details of ')+t(row.nameAr,row.nameEn))+'">'+
  '<span class="gv197-card-icon" aria-hidden="true">'+icon(i)+'</span>'+
  '<span class="gv197-card-content"><strong class="gv196-name">'+name+'</strong>'+
  '<span class="gv196-card-place"><span aria-hidden="true">⌖</span> '+city+'</span></span>'+
  '<span class="gv197-card-arrow" aria-hidden="true">↗</span>'+
  '</button>';
}

const oldCards=itemCards;
itemCards=function(list){
 if(state.category!=='tourism')return oldCards.apply(this,arguments);
 const code=selected();
 if(!code)return oldCards.apply(this,arguments);
 const rows=catalogue().filter(r=>r.code===code);
 const query=(state.filter||'').trim().toLocaleLowerCase();
 const filtered=rows.filter(r=>!query||[r.nameAr,r.nameEn,r.cityAr,r.cityEn,r.factAr,r.factEn].join(' ').toLocaleLowerCase().includes(query));
 const first=rows[0];
 if(!first)return oldCards.apply(this,arguments);
 return '<section class="gv196-country-landmarks">'+
  '<button type="button" class="gv181-back" data-gv181-back="1">← '+t('كل الدول','All countries')+'</button>'+
  '<header class="gv196-country-title"><span class="gv196-eyebrow">'+t('دليل المزارات','LANDMARK GUIDE')+'</span><h2>'+esc(t(first.countryAr,first.countryEn))+'</h2><p>'+t('اكتشف أبرز المعالم التاريخية والثقافية من خلال معلومات دقيقة ومختصرة.','Explore historic and cultural landmarks through concise, useful facts.')+'</p></header>'+
  '<div class="gv196-grid">'+(filtered.map(card).join('')||'<p class="gv196-empty">'+t('لا توجد معالم مطابقة للبحث','No landmarks match your search')+'</p>')+'</div>'+
 '</section>';
};
function fact(label,value){
 return '<div class="gv196-quick"><span>'+esc(label)+'</span><strong>'+esc(value)+'</strong></div>';
}
function detailPage(row){
 const i=row.index;
 const name=esc(t(row.nameAr,row.nameEn)),alternate=esc(t(row.nameEn,row.nameAr));
 const country=esc(t(row.countryAr,row.countryEn)),city=esc(t(row.cityAr,row.cityEn));
 const description=esc(t(row.factAr,row.factEn));
 const data=geo.tourism?.[i],coordinates=data?Number(data[4]).toFixed(2)+'°, '+Number(data[5]).toFixed(2)+'°':'';
 const learned=!!saved()['tourism_'+i];
 const next=catalogue()[(i+1)%catalogue().length];
 const source='https://en.wikipedia.org/wiki/'+encodeURI(row.wiki);
 return '<div class="gv14-detail gv196-detail">'+
  '<button class="back gv14-back" data-cat="tourism">← '+t('العودة إلى المزارات','Back to landmarks')+'</button>'+
  '<section class="gv196-hero" aria-labelledby="gv14Name">'+
   '<div class="gv196-hero-top"><span class="gv196-eyebrow">◆ '+t('ملف مزار سياحي','LANDMARK PROFILE')+'</span><span class="gv196-hero-symbol" aria-hidden="true">'+icon(i)+'</span></div>'+
   '<div class="gv196-hero-location">⌖ '+city+' · '+country+'</div>'+
   '<h1 id="gv14Name">'+name+'</h1>'+
   '<p class="gv196-hero-english" dir="auto">'+alternate+'</p>'+
   '<div class="gv196-hero-subtitle">'+esc(t(...type(i)))+'</div>'+
   '<button id="toggleSeen" class="gv14-learned gv196-learned'+(learned?' is-learned':'')+'" aria-pressed="'+learned+'">'+(learned?t('✓ تمت إضافته لمعرفتي','✓ Marked as learned'):t('✓ تعلمت هذا المكان','✓ Mark as learned'))+'</button>'+
  '</section>'+
  '<section class="gv196-facts-section" aria-labelledby="gv196FactsTitle"><div class="gv196-section-kicker">'+t('في لمحة','AT A GLANCE')+'</div><h2 id="gv196FactsTitle">'+t('حقائق سريعة','Quick facts')+'</h2>'+
   '<div class="gv196-facts">'+
   fact(t('الدولة','Country'),country)+fact(t('المدينة / المنطقة','City / region'),city)+
   fact(t('نوع المعلم','Landmark type'),t(...type(i)))+
   fact(t('القارة','Continent'),t(...(region[row.code]||['—','—'])))+
   '</div></section>'+
  '<section class="gv14-overview gv196-overview" aria-labelledby="gv14About">'+
   '<div class="gv196-section-kicker">'+t('تعرّف على المكان','THE STORY')+'</div>'+
   '<h2 id="gv14About">'+t('لماذا يُعد هذا المعلم مميزًا؟','Why does this landmark matter?')+'</h2>'+
   '<p id="gv14Description">'+description+'</p><div id="gv14Facts"></div>'+
  '</section>'+
  '<section class="gv9-more gv196-additional" aria-labelledby="gv196AdditionalTitle">'+
   '<div class="gv196-section-kicker">'+t('تعمّق في المعرفة','DEEPER KNOWLEDGE')+'</div>'+
   '<h2 id="gv196AdditionalTitle">'+t('معلومات إضافية','Additional information')+'</h2>'+
   '<div id="gvWikiArticle" class="gv-wiki-summary gv196-additional-content"></div>'+
   '<div class="gv196-additional-source"><span>'+t('المصدر والمزيد من القراءة','Source & further reading')+'</span>'+
    '<a class="gv196-reference" href="'+esc(source)+'" target="_blank" rel="noopener noreferrer">'+t('افتح الصفحة المرجعية','Open reference article')+' ↗</a></div>'+
  '</section>'+
  '<section class="gv14-map gv196-map" aria-labelledby="gv14MapTitle"><div class="gv196-section-kicker">'+t('اكتشف موقعه','EXPLORE THE LOCATION')+'</div><h2 id="gv14MapTitle">'+t('المعلم على الكرة الأرضية','Find it on the globe')+'</h2>'+
   '<p class="gv196-coordinates">'+t('الإحداثيات التقريبية','Approximate coordinates')+': <span dir="ltr">'+esc(coordinates)+'</span></p>'+
   '<div id="gvDetailGlobe" class="gv-globe-detail gv14-globe" role="group" aria-label="'+t('كرة أرضية تفاعلية لتحديد موقع المعلم','Interactive globe showing landmark location')+'"></div>'+
  '</section>'+
  (next?'<div class="gv14-next gv196-next"><span>'+t('واصل الاستكشاف','KEEP EXPLORING')+'</span><button type="button" data-item="tourism:'+next.index+'">'+esc(t(next.nameAr,next.nameEn))+' <span aria-hidden="true">↗</span></button></div>':'')+
 '</div>';
}
const originalCategoryPage=categoryPage;
categoryPage=function(){
 const html=originalCategoryPage.apply(this,arguments);
 if(state.category!=='tourism'||typeof html!=='string')return html;
 // Eliminate the image URL in the section banner itself, not merely by CSS.
 const doc=new DOMParser().parseFromString('<main>'+html+'</main>','text/html');
 const banner=doc.querySelector('.category-detail-banner');
 if(banner){banner.removeAttribute('style');banner.classList.add('gv196-category-banner')}
 return doc.body.querySelector('main')?.innerHTML||html;
};
const oldDetail=detail;
detail=function(){
 if(state.category!=='tourism'||state.page!=='detail')return oldDetail.apply(this,arguments);
 const row=place(state.item);
 return row?detailPage(row):oldDetail.apply(this,arguments);
};
window.GeoVerseTourismKnowledgeV196={count:catalogue().length,mode:'text-only'};
})();
