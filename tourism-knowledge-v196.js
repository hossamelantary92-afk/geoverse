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
const symbols={archaeology:'🏛️',architecture:'🏗️',museum:'🏛️',palace:'🏰',heritage:'🏺',religious:'🕌',monument:'🗽',nature:'🏞️',fortress:'🏯'};
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
 return '<section class="gv196-country-landmarks gv210-country-page">'+
  '<header class="gv196-country-title gv210-country-header">'+
   '<div class="gv210-country-heading"><div class="gv210-country-titles"><span class="gv210-section-label">'+t('مزارات سياحية','TOURIST LANDMARKS')+'</span><div class="gv547-name-line"><h2>'+esc(t(first.countryAr,first.countryEn))+'</h2><span class="gv210-count">'+rows.length+' '+t(rows.length===1?'مزار سياحي':rows.length===2?'مزاران سياحيان':rows.length<=10?'مزارات سياحية':'مزارًا سياحيًا','tourist landmarks')+'</span></div></div>'+
   '</div>'+ 
  '</header>'+
  '<div class="gv196-grid gv210-landmark-grid">'+(filtered.map(card).join('')||'<p class="gv196-empty">'+t('لا توجد معالم مطابقة للبحث','No landmarks match your search')+'</p>')+'</div>'+
 '</section>';
};
function fact(label,value){
 return '<div class="gv196-quick"><span>'+esc(label)+'</span><strong>'+esc(value)+'</strong></div>';
}
function detailPage(row){
 const i=row.index;
 const name=esc(t(row.nameAr,row.nameEn));
 const country=esc(t(row.countryAr,row.countryEn)),city=esc(t(row.cityAr,row.cityEn));
 const learned=!!saved()['tourism_'+i];
 const next=catalogue()[(i+1)%catalogue().length];
 const article=(ar()?row.pointsAr:row.pointsEn)
  ||window.GeoVerseTourismEditorial202?.points(i,ar()?'ar':'en')
  ||[t(row.factAr,row.factEn)];
 const enriched=ar()?(window.GeoVerseTourismEditorialPhase6?.get(i)||window.GeoVerseTourismEditorialPhase5?.get(i)||window.GeoVerseTourismEditorialPhase4?.get(i)||window.GeoVerseTourismEditorialPhase3?.get(i)||window.GeoVerseTourismEditorialPhase2?.get(i)||window.GeoVerseTourismEditorialPhase1?.get(i)||window.GeoVerseTourismEnrichment215?.get(i)||window.GeoVerseTourismEnrichment214?.get(i)||window.GeoVerseTourismEnrichment213?.get(i)||window.GeoVerseTourismEnrichment212?.get(i)||window.GeoVerseTourismEnrichment208?.get(i)||window.GeoVerseTourismEnrichment207?.get(i)||window.GeoVerseTourismEnrichment206?.get(i)):null;
 const deep=window.GeoVerseTourismDeepEnrichmentV597?.get(row)||null;
 // Every attraction uses the same five content sections, in the same order.
 // Legacy editorial records and newer deep-enrichment records have different field
 // layouts; normalize them here without changing sources, IDs, or source content.
 const learningPoints=(enriched?.points?.length?enriched.points:article)||[];
 const uniquePoints=[...new Set(learningPoints.filter(Boolean).map(p=>String(p).trim()))];
 const section=(slug,label,body)=>'<section class="gv596-topic gv596-'+slug+'" aria-label="'+esc(label)+'"><h2>'+esc(label)+'</h2>'+body+'</section>';
 const paragraph=value=>value?'<p>'+esc(value)+'</p>':'';
 const bullets=values=>values&&values.length?'<ul>'+values.filter(Boolean).map(p=>'<li>'+esc(p)+'</li>').join('')+'</ul>':'';
 const overviewText=t(row.factAr,row.factEn)||t(row.nameAr,row.nameEn);
 const historyText=ar()?(enriched?.story||deep?.storyAr||''):(row.historyEn||'');
 const significanceText=ar()?deep?.significanceAr||'':(row.significanceEn||'');
 // Exclude a verbatim repeat of the overview; retain genuinely distinct editorial points.
 // Reserve unique "wow" facts for their dedicated section before de-duplicating
 // learning points, so early editorial batches do not lose those facts.
 const specialFacts=[...new Set([...(ar()?(enriched?.wow||[]):[]),...(ar()&&deep?.factAr?[deep.factAr]:[])].map(v=>String(v||'').trim()).filter(Boolean))].filter(p=>p!==overviewText&&p!==significanceText);
 const significancePoints=uniquePoints.filter(p=>p!==overviewText&&p!==significanceText&&!specialFacts.includes(p));
 const architectureText=ar()?enriched?.architecture||'':row.architectureEn||'';
 const whatToSeeText=ar()?(deep?.visitAr||row.visitAr||''):(row.visitEn||'');
 const highlights=[architectureText,whatToSeeText].filter((p,i,a)=>p&&a.indexOf(p)===i);
 const awaitingAr='تفاصيل إضافية قيد المراجعة.';
 const awaitingEn='Additional verified details are not yet available in English.';
 const overview=section('overview',t('نبذة عن المزار','Overview'),paragraph(overviewText));
 const history=section('history',t('القصة والتاريخ','History'),paragraph(historyText||t(awaitingAr,awaitingEn)));
 const significance=section('significance',t('الأهمية وما يميّزه','Significance'),paragraph(significanceText)+(significancePoints.length?bullets(significancePoints):(!significanceText?paragraph(t(awaitingAr,awaitingEn)):'')));
 const fascinating=section('facts',t('حقائق مدهشة','Fascinating facts'),specialFacts.length?bullets(specialFacts):paragraph(t(awaitingAr,awaitingEn)));
 // Consolidate the former Highlights and What-to-see sections, which otherwise
 // repeated the same paragraph on the 208 newer attractions.
 const visit=section('visit',t('أبرز المعالم وما الذي ستشاهده؟','Highlights and what to see'),highlights.length?highlights.map(paragraph).join(''):paragraph(t(awaitingAr,awaitingEn)));
 return '<div class="gv14-detail gv196-detail gv202-detail'+(enriched?' gv206-enriched':'')+'">'+
  '<button class="back gv14-back" data-cat="tourism">← '+t('العودة إلى المزارات','Back to landmarks')+'</button>'+
  '<header class="gv196-hero gv202-hero" aria-labelledby="gv14Name">'+
   '<h1 id="gv14Name">'+name+'</h1>'+
   '<p class="gv196-hero-location gv202-location">'+city+' - '+country+'</p>'+
  '</header>'+
  '<div class="gv596-knowledge gv14-overview gv196-overview gv202-article" id="gv14About">'+
   overview+history+significance+fascinating+visit+
   '<div id="gv14Facts"></div>'+
  '</div>'+
  '<button id="toggleSeen" class="gv14-learned gv196-learned gv202-learned'+(learned?' is-learned':'')+'" aria-pressed="'+learned+'">'+(learned?t('✓ تمت إضافته لمعرفتي','✓ Marked as learned'):t('✓ تعلمت هذا المكان','✓ Mark as learned'))+'</button>'+
  '<section class="gv14-map gv196-map gv202-map" aria-labelledby="gv14MapTitle">'+
   '<h2 id="gv14MapTitle">'+t('موقع المعلم على الكرة الأرضية','Location on Earth')+'</h2>'+
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
 // Navigation is contextual: country first, then the wider topics catalogue.
 const topBack=doc.querySelector('button.back[data-page="all"]');
 if(topBack&&selected()){
  topBack.removeAttribute('data-page');
  topBack.setAttribute('data-gv181-back','1');
  topBack.textContent=(ar()?'↩ العودة لكل الدول':'↩ Back to all countries');
  topBack.setAttribute('aria-label',ar()?'العودة لكل الدول':'Back to all countries');
 }
 const banner=doc.querySelector('.category-detail-banner');
 if(banner){
  banner.removeAttribute('style');
  banner.classList.add('gv196-category-banner');
  const cover=window.GeoVersePremiumCovers?.get('tourism',1600);
  if(cover){
   banner.style.setProperty('background-image','linear-gradient(90deg,rgba(3,21,36,.86),rgba(3,25,42,.55) 55%,rgba(3,21,36,.18)),url("'+cover+'")','important');
   banner.style.setProperty('background-size','cover','important');
   banner.style.setProperty('background-position','center 52%','important');
  }
 }
 // Tourism has its own country/landmark navigation below; remove redundant
 // instructional tip and explore action bar, without touching other topics.
 // The introductory education panel repeats the banner and pushes the country cards down.
 doc.querySelector('.topic-intro')?.remove();
 doc.querySelector('.topic-actionbar')?.remove();
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
