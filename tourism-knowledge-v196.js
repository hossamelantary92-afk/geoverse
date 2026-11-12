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
 // Present three distinct sections: history, significance/facts, and highlights.
 // Short legacy overview remains safely stored in catalogue data.
 const learningPoints=(enriched?.points?.length?enriched.points:article)||[];
 const section=(slug,label,body)=>'<section class="gv596-topic gv596-'+slug+'" aria-label="'+esc(label)+'"><h2>'+esc(label)+'</h2>'+body+'</section>';
 const paragraph=value=>value?'<p>'+esc(value)+'</p>':'';
 const bullets=values=>values.length?'<ul>'+values.map(p=>'<li>'+esc(p)+'</li>').join('')+'</ul>':'';
 const normalized=value=>String(value||'').replace(/[\u064b-\u065f\u0670]/g,'').replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي').replace(/[^a-zA-Z0-9\u0621-\u064a]+/g,' ').trim().toLowerCase();
 const distinct=values=>{
  const output=[];
  values.filter(Boolean).forEach(value=>{
   const candidate=String(value).trim(),words=new Set(normalized(candidate).split(' ').filter(w=>w.length>3));
   if(!candidate||!words.size)return;
   const match=output.findIndex(item=>{
    const existing=new Set(normalized(item).split(' ').filter(w=>w.length>3));
    const overlap=[...words].filter(w=>existing.has(w)).length/Math.max(1,Math.min(words.size,existing.size));
    return normalized(item)===normalized(candidate)||(overlap>=0.83&&Math.min(words.size,existing.size)>=7);
   });
   if(match<0)output.push(candidate);
   else if(candidate.length>output[match].length)output[match]=candidate;
  });
  return output;
 };
 const historyText=ar()?(enriched?.story||deep?.storyAr||''):(row.historyEn||'');
 const significanceText=ar()?(deep?.significanceAr||''):(row.significanceEn||'');
 const overviewText=t(row.factAr,row.factEn)||t(row.nameAr,row.nameEn);
 // Prefer the curated deep fact over a short legacy WOW statement when
 // both describe the same site-specific observation.
 const wowFacts=ar()?(enriched?.wow||[]):[];
 const deepFact=ar()?deep?.factAr||'':'';
 const facts=distinct([...wowFacts,...(deepFact?[deepFact]:[])]);
 const specialFacts=facts.filter(f=>{
  if(!deepFact||f===deepFact)return true;
  const a=normalized(f),b=normalized(deepFact);
  if(a.includes('عجائب الدنيا السبع')&&b.includes('عجائب الدنيا السبع'))return false;
  return !(a.length>24&&b.includes(a));
 });
 const mainSignificance=significanceText||overviewText;
 const architectureText=ar()?(enriched?.architecture||''):(row.architectureEn||'');
 const whatToSeeText=ar()?(deep?.visitAr||row.visitAr||''):(row.visitEn||'');
 // Site-specific visual facts belong in the sightseeing section, not in the
 // significance list. Use both a visible-feature verb and physical-detail noun
 // to avoid moving historical or cultural facts based on a single keyword.
 const visualAction=/(?:تضم|تحتوي|تظهر|يمكن ملاحظة|يمكن مشاهدة|يبرز|تُبرز|تتتابع|يُرى|تُرى|يتوسط|تتميز)/;
 const visualFeature=/(?:واجهة|واجهات|قبة|قباب|نافذة|نوافذ|أعمدة|أبراج|تماثيل|بوابات|ممرات|حجرات|جدران|تكوينات|شلالات|لوحات|بحير|صخور|جزر|الهرم|أهرامات|منحوتات|حدائق|ساحة|فسيفساء|برك|مباني|معابد)/;
 const isVisualDetail=point=>ar()&&visualAction.test(point)&&visualFeature.test(point);
 const visualPoints=learningPoints.filter(isVisualDetail);
 const significanceCandidates=learningPoints.filter(p=>!isVisualDetail(p)&&!(ar()&&row.code==='EG'&&row.nameEn==='Pyramids of Giza'&&/الحجر الجيري|البنية الداخلية|حجرات وممرات/.test(p)));
 const significantContext=normalized(mainSignificance);
 const historicalContext=normalized(historyText);
 const significanceDetails=distinct([...significanceCandidates,...specialFacts])
  .filter(p=>normalized(p)!==significantContext&&normalized(p)!==historicalContext);
 let highlights=distinct([architectureText,whatToSeeText,...visualPoints]);
 // The first 64 original landmarks have longer handwritten points: retain
 // the existing Giza-specific placement for its masonry and chamber details.
 if(ar()&&row.code==='EG'&&row.nameEn==='Pyramids of Giza'){
  const physical=learningPoints.filter(p=>/الحجر الجيري|البنية الداخلية|حجرات وممرات/.test(p));
  highlights=distinct([whatToSeeText,architectureText,...visualPoints,...physical]);
 }
 let history=historyText?section('history',t('القصة والتاريخ','History'),paragraph(historyText)):'';
 const significanceBody=paragraph(mainSignificance)+bullets(significanceDetails);
 let significance=significanceBody?section('significance',t('الأهمية والحقائق المميزة','Significance and facts'),significanceBody):'';
 let visit=highlights.length?section('visit',t('أبرز ما ستشاهده','What to see'),highlights.map(paragraph).join('')):'';
 // A tightly edited profile for the Colosseum avoids synonymous legacy facts
 // (Flavian name, arena purpose and underground passages) appearing repeatedly.
 // Keep the original archival content intact; the override is Arabic-only.
 if(ar()&&row.code==='IT'&&row.nameEn==='Colosseum'){
  history=section('history','القصة والتاريخ',paragraph('بدأ بناء الكولوسيوم في روما في عهد الإمبراطور فسبازيان، وافتُتح في عهد ابنه تيطس سنة 80م، ثم أضيفت إليه تجهيزات في مراحل لاحقة. عُرف تاريخيًا باسم المدرج الفلافي نسبةً إلى الأسرة التي بنته، وكان مركزًا للعروض العامة قبل أن تتغير استخداماته عبر العصور.'));
  significance=section('significance','الأهمية والحقائق المميزة',
   paragraph('يُعد الكولوسيوم أكبر مدرج روماني قديم باقٍ، ويكشف كيف نظّمت روما الإمبراطورية التجمعات الجماهيرية والفعاليات العامة.')+
   bullets([
    'استُخدم لعروض المصارعين وصيد الحيوانات والاحتفالات العامة، ما يجعله شاهدًا على جوانب من الحياة الاجتماعية الرومانية.',
    'يرتبط اسم «الكولوسيوم» بتمثال ضخم كان قائمًا بالقرب منه؛ أما اسمه الرسمي القديم فكان «المدرج الفلافي».',
    'تعرّض المبنى لزلازل وتغيّرت وظائف بعض أجزائه خلال القرون التالية، كما أُعيد استخدام بعض أحجاره في مبانٍ أخرى.'
   ]));
  visit=section('visit','أبرز ما ستشاهده',
   paragraph('تظهر الواجهة الخارجية بأقواس متتابعة على مستويات متعددة، وحول الساحة مدرجات الجلوس البيضاوية التي كانت تستوعب آلاف المتفرجين.')+
   paragraph('أسفل أرضية الساحة توجد بقايا شبكة من الممرات والغرف والمصاعد القديمة التي استُخدمت لتجهيز العروض ونقل المشاركين والحيوانات.'));
 }
 return '<div class="gv14-detail gv196-detail gv202-detail'+(enriched?' gv206-enriched':'')+'">'+
  '<button class="back gv14-back" data-cat="tourism">← '+t('العودة إلى المزارات','Back to landmarks')+'</button>'+
  '<header class="gv196-hero gv202-hero" aria-labelledby="gv14Name">'+
   '<h1 id="gv14Name">'+name+'</h1>'+
   '<p class="gv196-hero-location gv202-location">'+city+' - '+country+'</p>'+
  '</header>'+
  '<div class="gv596-knowledge gv14-overview gv196-overview gv202-article" id="gv14About">'+
   history+significance+visit+
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
