/* GeoVerse Sea Photo Lock v324
 * Six approved sea photos, exact Wikimedia thumbnails checked against
 * their Commons file previews. No unrelated fallback, no API-first loader.
 * Runs after other renderers and corrects stale asynchronous DOM images.
 */
(function(){
'use strict';
const PHOTO_VERSION='gv324-verified-six-seas';
const photos={
  2:['Al Mughsail Beach 2.jpg','8/8b'],
  6:['Amasra.JPG','9/97'],
  11:['Aerial view of Ti Top.jpg','e/e5'],
  12:['Cape Manza Elephant Rock, Okinawa.jpg','a/ac'],
  13:['Phi Phi From Above (Unsplash).jpg','4/48'],
  14:['Dicasalarin Cove.jpg','d/d5']
};
function urls(index){
 const item=photos[index];if(!item)return null;
 const file=encodeURIComponent(item[0].replace(/ /g,'_'));
 return [
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/'+item[1]+'/'+file+'/960px-'+file,
  'https://commons.wikimedia.org/wiki/Special:Redirect/file/'+encodeURIComponent(item[0])
 ];
}
function imageFor(container,index,isDetail){
 const options=urls(index);if(!options||!container)return;
 let img=container.querySelector('img[data-gv-sea-v324]');
 const old=container.querySelector('img:not([data-gv-sea-v324])');
 if(old)old.remove();
 if(!img){
  img=document.createElement('img');
  img.dataset.gvSeaV324=String(index);
  img.alt=(typeof state!=='undefined'&&state.lang==='ar'?'صورة البحر المعتمدة':'Approved sea photo');
  img.loading='eager';img.decoding='async';
  img.style.cssText='display:block;width:100%;height:100%;object-fit:cover';
  img.addEventListener('load',function(){
   if(!img.isConnected)return;
   container.classList.add(isDetail?'gv14-has-photo':'gv13-has-photo');
   container.querySelector('.gv13-photo-fallback')?.remove();
   container.querySelector('.gv13-photo-status')?.remove();
  });
  img.addEventListener('error',function(){
   if(!img.isConnected)return;
   if(img.dataset.gvFallbackUsed!=='1'){
    img.dataset.gvFallbackUsed='1';
    img.src=options[1];return;
   }
   img.remove();
   container.classList.remove(isDetail?'gv14-has-photo':'gv13-has-photo');
  });
  container.insertBefore(img,container.firstChild);
  img.src=options[0];
 }else if(img.dataset.gvSeaV324!==String(index)){
  img.remove();imageFor(container,index,isDetail);
 }
 container.dataset.gvSeaPhotoVersion=PHOTO_VERSION;
}
let busy=false;
function sync(){
 if(busy)return;
 busy=true;
 try{
  if(typeof state==='undefined'||state.category!=='seas')return;
  if(state.page==='category'){
   document.querySelectorAll('#categoryItems .gv13-photo[data-photo-index]').forEach(el=>{
    const index=Number(el.dataset.photoIndex);
    if(photos[index])imageFor(el,index,false);
   });
  }else if(state.page==='detail'){
   const index=Number(state.item);
   if(photos[index])imageFor(document.getElementById('gvArticlePhoto'),index,true);
  }
 }catch(e){console.warn('GeoVerse approved sea photograph renderer',e)}
 finally{busy=false}
}
let pending=false;
function schedule(){
 if(pending)return;pending=true;
 requestAnimationFrame(function(){pending=false;sync()});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule,{once:true});
else schedule();
new MutationObserver(function(records){
 for(const r of records){
  if(r.type==='childList'){
   if(Array.from(r.addedNodes).some(n=>n.nodeType===1&&(n.id==='categoryItems'||n.id==='gvArticlePhoto'||n.matches?.('.gv13-photo, .gv14-photo, img')||n.querySelector?.('.gv13-photo, #gvArticlePhoto')))){schedule();return}
  }else if(r.type==='attributes'&&r.target.matches?.('img[data-gv-sea-v324]')){
   // Prevent older async handlers from swapping in a different photo.
   const index=Number(r.target.dataset.gvSeaV324),u=urls(index);
   if(u&&![u[0],u[1]].includes(r.target.getAttribute('src'))){
    r.target.src=u[0];return;
   }
  }
 }
}).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['src']});
window.GeoVerseSeaPhotosV324={version:PHOTO_VERSION,photos:Object.keys(photos).length,refresh:schedule};
})();
