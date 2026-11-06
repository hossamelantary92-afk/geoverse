/* GeoVerse v6 — organize landmark profiles: photo first, facts second, maps third. */
(function(){
'use strict';
function organizeGeography(){
 if(typeof state==='undefined'||state.page!=='detail'||state.category==='continents')return;
 const root=document.getElementById('main');if(!root)return;
 const article=root.querySelector('.gv-feature-article');
 const overview=root.querySelector('.detail-card');
 const atlas=root.querySelector('#detailMap');
 if(article&&overview&&article.parentNode===overview.parentNode){
  overview.before(article);
  article.classList.add('gv-feature-top');
 }
 if(atlas&&!atlas.previousElementSibling?.classList?.contains('gv-inline-map-title')){
  const h=document.createElement('h2');
  h.className='gv-inline-map-title';
  h.textContent=state.lang==='ar'?'الخريطة التفاعلية':'Interactive location map';
  atlas.before(h);
 }
}
const previousRender=render;
render=function(){previousRender();organizeGeography()};
window.GeoVerseReadingV6={organizeGeography};
})();