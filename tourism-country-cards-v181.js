/* GeoVerse v181 — tourism country-first gallery. Native card navigation, no country strip. */
(function(){
'use strict';
if(typeof itemCards!=='function')return;
const previous=itemCards;
const countries=[
 ['EG','مصر','Egypt','🇪🇬'],['FR','فرنسا','France','🇫🇷'],
 ['IT','إيطاليا','Italy','🇮🇹'],['SA','السعودية','Saudi Arabia','🇸🇦'],
 ['TR','تركيا','Turkey','🇹🇷'],['ES','إسبانيا','Spain','🇪🇸'],
 ['GB','المملكة المتحدة','United Kingdom','🇬🇧'],['US','الولايات المتحدة','United States','🇺🇸'],
 ['CN','الصين','China','🇨🇳'],['IN','الهند','India','🇮🇳'],
 ['JP','اليابان','Japan','🇯🇵'],['AE','الإمارات','United Arab Emirates','🇦🇪'],["TH","تايلاند","Thailand","🇹🇭"],["ID","إندونيسيا","Indonesia","🇮🇩"],["KR","كوريا الجنوبية","South Korea","🇰🇷"],["VN","فيتنام","Vietnam","🇻🇳"]
];
// Newly added destinations share the existing premium country-card design.
countries.push(['GR','اليونان','Greece','🇬🇷'],['CH','سويسرا','Switzerland','🇨🇭'],['MA','المغرب','Morocco','🇲🇦'],['MY','ماليزيا','Malaysia','🇲🇾']);
countries.push(['DE','ألمانيا','Germany','🇩🇪'],['MX','المكسيك','Mexico','🇲🇽'],['BR','البرازيل','Brazil','🇧🇷'],['AU','أستراليا','Australia','🇦🇺']);
countries.push(['AT','النمسا','Austria','🇦🇹'],['PT','البرتغال','Portugal','🇵🇹'],['ZA','جنوب أفريقيا','South Africa','🇿🇦'],['AR','الأرجنتين','Argentina','🇦🇷']);
countries.push(['NL','هولندا','Netherlands','🇳🇱'],['CZ','التشيك','Czechia','🇨🇿'],['CA','كندا','Canada','🇨🇦'],['NZ','نيوزيلندا','New Zealand','🇳🇿']);
countries.push(['JO','الأردن','Jordan','🇯🇴'],['OM','عُمان','Oman','🇴🇲'],['PE','بيرو','Peru','🇵🇪'],['KH','كمبوديا','Cambodia','🇰🇭']);
countries.push(['NO','النرويج','Norway','🇳🇴'],['IS','آيسلندا','Iceland','🇮🇸'],['NP','نيبال','Nepal','🇳🇵'],['LK','سريلانكا','Sri Lanka','🇱🇰']);
countries.push(['KE','كينيا','Kenya','🇰🇪'],['TZ','تنزانيا','Tanzania','🇹🇿'],['CL','تشيلي','Chile','🇨🇱'],['CO','كولومبيا','Colombia','🇨🇴']);
countries.push(['SG','سنغافورة','Singapore','🇸🇬'],['PH','الفلبين','Philippines','🇵🇭'],['HR','كرواتيا','Croatia','🇭🇷'],['HU','المجر','Hungary','🇭🇺']);
countries.push(['BE','بلجيكا','Belgium','🇧🇪'],['DK','الدنمارك','Denmark','🇩🇰'],['SE','السويد','Sweden','🇸🇪'],['FI','فنلندا','Finland','🇫🇮'],['IE','أيرلندا','Ireland','🇮🇪'],['PL','بولندا','Poland','🇵🇱']);
countries.push(['RO','رومانيا','Romania','🇷🇴'],['SI','سلوفينيا','Slovenia','🇸🇮'],['AL','ألبانيا','Albania','🇦🇱'],['GE','جورجيا','Georgia','🇬🇪'],['AM','أرمينيا','Armenia','🇦🇲'],['AZ','أذربيجان','Azerbaijan','🇦🇿']);
countries.push(['TN','تونس','Tunisia','🇹🇳'],['QA','قطر','Qatar','🇶🇦'],['BH','البحرين','Bahrain','🇧🇭'],['KW','الكويت','Kuwait','🇰🇼'],['MV','المالديف','Maldives','🇲🇻'],['MU','موريشيوس','Mauritius','🇲🇺']);
let selected='';
const t=(ar,en)=>state.lang==='ar'?ar:en;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function items(){return window.GeoVerseTourismV170?.items||[]}
function photoFallbackName(row){return row[1]}
function countryCards(){
 const q=(state.filter||'').trim().toLocaleLowerCase();
 const cards=countries.map(([code,ar,en,flag],n)=>{
  const landmarks=items().filter(x=>x.code===code);
  if(!landmarks.length)return '';
  if(q&&!((ar+' '+en+' '+landmarks.map(x=>x.nameAr+' '+x.nameEn).join(' ')).toLocaleLowerCase().includes(q)))return '';
  return '<button type="button" class="gv181-country gv203-country" data-gv181-country="'+code+'" aria-label="'+esc(t('استكشف مزارات '+ar,'Explore attractions in '+en))+'">'+
   '<span class="gv203-card-top"><span class="gv203-flag gv204-flag"><img class="gv204-flag-img" src="https://flagcdn.com/w80/'+code.toLowerCase()+'.png" srcset="https://flagcdn.com/w160/'+code.toLowerCase()+'.png 2x" alt="'+esc(t('علم '+ar,'Flag of '+en))+'" width="60" height="45" loading="lazy" decoding="async"></span><span class="gv203-card-arrow" aria-hidden="true">↗</span></span>'+
   '<span class="gv203-country-copy"><strong class="gv203-country-english" lang="en" dir="ltr">'+esc(en)+'</strong>'+
    '<span class="gv203-country-arabic" lang="ar" dir="rtl">'+esc(ar)+'</span>'+
    '<span class="gv203-country-count">'+landmarks.length+' '+t('مزارات سياحية','tourist attractions')+'</span></span>'+
   '</button>';
 }).filter(Boolean).join('');
 return '<div class="gv181-overview"><div class="gv181-heading"><strong>'+t('استكشف المزارات حسب الدولة','Discover attractions by country')+'</strong><span>'+t('اختر دولة لعرض أبرز مزاراتها','Choose a country to discover its landmarks')+'</span></div>'+
  '<div class="gv181-country-grid">'+(cards||'<p class="gv181-empty">'+t('لا توجد دول أو مزارات مطابقة للبحث','No matching countries or landmarks')+'</p>')+'</div></div>';
}
itemCards=function(list){
 if(state.category!=='tourism')return previous.apply(this,arguments);
 const catalogue=items();
 if(!catalogue.length)return previous.apply(this,arguments);
 if(!selected)return countryCards();
 const info=countries.find(c=>c[0]===selected);
 if(!info){selected='';return countryCards()}
 // Maintain the existing verified photo loader and original indexes by
 // rendering all cards, then selecting exact ids for the active country.
 const doc=new DOMParser().parseFromString('<div id="gv181Parse">'+previous.call(this,list)+'</div>','text/html');
 const subset=new Set(catalogue.filter(x=>x.code===selected).map(x=>x.index));
 const cards=Array.from(doc.querySelectorAll('#gv181Parse .gv13-place[data-item]')).filter(c=>{
  const m=/^tourism:(\d+)$/.exec(c.dataset.item||'');
  return m&&subset.has(Number(m[1]));
 }).map(x=>x.outerHTML).join('');
 return '<div class="gv181-detail"><button type="button" class="gv181-back gv209-back" data-gv181-back="1"><span class="gv209-back-icon" aria-hidden="true">↩</span><span>'+t('العودة لكل الدول','Back to all countries')+'</span></button>'+
  '<div class="gv181-heading gv181-detail-heading"><strong>'+info[3]+' '+esc(t(info[1],info[2]))+'</strong><span>'+subset.size+' '+t('مزارات سياحية','tourist attractions')+'</span></div>'+
  '<div class="gv181-landmarks">'+(cards||'<p>'+t('لا توجد نتائج مطابقة','No matching results')+'</p>')+'</div></div>';
};
function drawCountryPhotos(){
 if(state.page!=='category'||state.category!=='tourism'||selected)return;
 const boxes=Array.from(document.querySelectorAll('#categoryItems [data-gv181-photo]'));
 if(!boxes.length)return;
 const catalogue=items();
 const requests=boxes.map(box=>{
  const first=catalogue.find(x=>x.code===box.dataset.gv181Photo);
  return first?.wiki?{box,title:first.wiki}:null;
 }).filter(Boolean);
 if(!requests.length)return;
 const titles=[...new Set(requests.map(x=>x.title))];
 const params=new URLSearchParams({action:'query',prop:'pageimages',piprop:'thumbnail',pithumbsize:'900',format:'json',origin:'*',redirects:'1',titles:titles.join('|')});
 fetch('https://en.wikipedia.org/w/api.php?'+params).then(r=>{if(!r.ok)throw Error('photo offline');return r.json()}).then(data=>{
  const pages=Object.values(data.query?.pages||{});
  const normalized=new Map([...(data.query?.normalized||[]),...(data.query?.redirects||[])].map(p=>[p.from.replace(/_/g,' ').toLowerCase(),p.to.replace(/_/g,' ').toLowerCase()]));
  for(const req of requests){
   let title=req.title.replace(/_/g,' ').toLowerCase();
   for(let i=0;i<3&&normalized.has(title);i++)title=normalized.get(title);
   const found=pages.find(p=>p.title?.replace(/_/g,' ').toLowerCase()===title);
   const url=found?.thumbnail?.source;
   if(!url||!/^https:\/\/(?:upload|thumb)\.wikimedia\.org\//.test(url)||!req.box.isConnected)return;
   const im=document.createElement('img');im.alt=found.title||req.title;im.loading='lazy';im.decoding='async';
   im.addEventListener('load',()=>req.box.classList.add('gv181-loaded'));
   im.addEventListener('error',()=>im.remove());
   req.box.insertBefore(im,req.box.firstChild);im.src=url;
  }
 }).catch(()=>{});
}
document.addEventListener('click',event=>{
 const b=event.target.closest?.('[data-gv181-country],[data-gv181-back]');
 if(!b)return;
 event.preventDefault();event.stopImmediatePropagation();
 if(b.hasAttribute('data-gv181-back'))selected='';
 else selected=b.dataset.gv181Country;
 state.filter='';
 render();
},{capture:true});
const previousSetPage=setPage;
setPage=function(page,cat,item,startGame){
 // Entering tourism afresh always starts with countries; returning from a
 // landmark detail preserves the chosen country.
 if(page==='category'&&cat==='tourism'&&state.category!=='tourism')selected='';
 return previousSetPage.apply(this,arguments);
};
// Expose the currently selected tourism country to the refresh state handler.
window.GeoVerseTourismCountryNavigation={
 getSelected:()=>selected,
 setSelected:code=>{selected=countries.some(c=>c[0]===code)?code:''}
};
const originalRender=render;
render=function(){
 const result=originalRender.apply(this,arguments);
 // Phase 1 knowledge-first: no photos or image fetches inside tourism.
 return result;
};
})();
