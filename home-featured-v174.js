/* GeoVerse v174 — a visually balanced, high-priority homepage gallery.
 * The six featured subjects are the key entry points; all other subjects
 * remain available through View all and the encyclopedia.
 */
(function(){
'use strict';
if(typeof home!=='function')return;
const previous=home;
const order=['countries','astronomy','tourism','mountains','oceans','rivers','deserts'];
const images={
 countries:'photo-1519501025264-65ba15a82390',
 astronomy:'photo-1462331940025-496dfbfc7564',
 tourism:'photo-1533105079780-92b9be482077',
 mountains:'photo-1464822759023-fed622ff2c3b',
 oceans:'photo-1518837695005-2083093ee35b',
 rivers:'photo-1473448912268-2022ce9509d8',
 deserts:'photo-1509316785289-025f5b846b35'
};
const categoryName=(c)=>state.lang==='ar'?c.ar:c.en;
const t=(ar,en)=>state.lang==='ar'?ar:en;
const escape=s=>String(s??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
function card(doc,id){
 const c=cats.find(item=>item.id===id);
 if(!c)return null;
 const b=doc.createElement('button');
 b.type='button';b.className='gv11-card gv11-'+id+' gv174-card';
 b.dataset.cat=id;
 const count=Array.isArray(geo[id])?geo[id].length:0;
 const img=doc.createElement('img');
 img.loading='lazy';img.decoding='async';
 img.src=window.GeoVersePremiumCovers?.get(id,900)||im(images[id]||c.img,900);
 img.alt=t('صورة لقسم ','Photo for ')+categoryName(c);
 const gradient=doc.createElement('span');gradient.className='gv11-card-gradient';
 const title=doc.createElement('strong');title.textContent=categoryName(c);
 const small=doc.createElement('small');small.textContent=count+' '+t('معلمًا','places');
 b.append(img,gradient,title,small);
 return b;
}
home=function(){
 const markup=previous.apply(this,arguments);
 const doc=new DOMParser().parseFromString(markup,'text/html');
 const grid=doc.querySelector('.gv11-categories .gv11-grid');
 if(!grid)return markup;
 const fragment=doc.createDocumentFragment();
 for(const id of order){
  const b=card(doc,id);if(b)fragment.appendChild(b);
 }
 if(fragment.childElementCount!==7)return markup;
 grid.replaceChildren(fragment);
 return doc.body.innerHTML;
};
// The initial homepage may have been painted before extension scripts load.
if(typeof state!=='undefined'&&state.page==='home'&&typeof render==='function')render();
})();
