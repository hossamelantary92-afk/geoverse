/* GeoVerse v182 — eight curated, sourced tourist site photos.
 * Wikimedia Commons real photos, each tied to the exact attraction index.
 * Honor complete-structure framing on mobile, desktop and details.
 * Non-blocking fallbacks leave the legacy photo pipeline available.
 */
(function(){
'use strict';
const source='https://commons.wikimedia.org/wiki/';
const chosen={
 2:{file:'Karnak_temple_1.jpg',credit:'Karelj'},
 3:{file:'Abou_simbel_face.jpg',credit:'Bionet'},
 4:{file:'Paris_Eiffel_Tower_from_Trocadero.jpg',credit:'Wikimedia Commons'},
 6:{file:'Exterior_of_Palace_of_Versailles_Aug_2026_02.jpg',credit:'Heidi Meudt'},
 18:{file:'Topkapı_Palace_gate.JPG',credit:'Wikimedia Commons'},
 19:{file:'Göremeopenairmuseum.jpg',credit:'Eminebeyzagn'},
 20:{file:'View_of_Sagrada_Familia_2026_corrected.jpg',credit:'Wikimedia Commons'},
 23:{file:'Córdoba,_exterior_de_la_catedral-mezquita.jpg',credit:'Macarrones'}
};
const local=(id)=>chosen[id];
function url(file,width){return 'https://commons.wikimedia.org/wiki/Special:FilePath/'+encodeURIComponent(file)+'?width='+width}
function article(file){return source+'File:'+encodeURIComponent(file)}
function setImage(parent,id,w){
 const spec=local(id);if(!parent||!spec)return;
 const current=parent.querySelector('img[data-gv182-index]');
 if(current?.dataset.gv182Index===String(id))return;
 const img=document.createElement('img');
 img.dataset.gv182Index=String(id);
 img.loading=parent.id==='gvArticlePhoto'?'eager':'lazy';
 img.decoding='async';
 img.alt=(typeof state!=='undefined'&&state.lang==='ar'?'صورة كاملة: ':'Full view: ')+(geo.tourism?.[id]?.[state.lang==='ar'?0:1]||'Tourist attraction');
 img.style.objectFit='contain';img.style.objectPosition='center center';
 img.addEventListener('load',()=>{
  if(!parent.isConnected)return;
  Array.from(parent.querySelectorAll('img')).forEach(other=>{if(other!==img)other.remove()});
  parent.classList.add('gv13-has-photo','gv14-has-photo','gv182-loaded');
  parent.querySelector('.gv13-photo-status')?.remove();
  parent.querySelector('.gv13-photo-fallback')?.remove();
  let credit=parent.querySelector('.gv182-credit');
  if(parent.id==='gvArticlePhoto'&&!credit){
   credit=document.createElement('a');credit.className='gv182-credit';
   credit.href=article(spec.file);credit.target='_blank';credit.rel='noopener noreferrer';
   credit.textContent='Wikimedia Commons · '+spec.credit;
   parent.appendChild(credit);
  }
 });
 img.addEventListener('error',()=>img.remove());
 parent.insertBefore(img,parent.firstChild);
 img.src=url(spec.file,w);
}
function hydrate(){
 if(typeof state==='undefined'||state.category!=='tourism')return;
 if(state.page==='category'){
  document.querySelectorAll('#categoryItems .gv13-place[data-item^="tourism:"]').forEach(card=>{
   const match=/^tourism:(\d+)$/.exec(card.dataset.item||'');
   const id=match?Number(match[1]):NaN;
   if(chosen[id])setImage(card.querySelector('.gv13-photo'),id,1000);
  });
 }
 if(state.page==='detail'&&chosen[state.item]){
  const box=document.getElementById('gvArticlePhoto');
  if(box)setImage(box,state.item,1440);
 }
}
let queued=false;
function schedule(){
 if(queued)return;
 queued=true;
 requestAnimationFrame(()=>{queued=false;hydrate()});
}
const prior=render;
render=function(){
 const result=prior.apply(this,arguments);
 schedule();return result;
};
const main=document.getElementById('main');
if(main)new MutationObserver(schedule).observe(main,{childList:true,subtree:false});
schedule();
window.GeoVerseTourismPhotosV182={count:Object.keys(chosen).length,source,files:Object.fromEntries(Object.entries(chosen).map(([k,v])=>[k,v.file]))};
})();