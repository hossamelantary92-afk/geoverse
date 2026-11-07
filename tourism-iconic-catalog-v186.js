/* GeoVerse v186 — one reference-driven photograph for every real tourist attraction.
 * Editorial focus reviewed for 48 records; source-specific files are chosen for
 * confirmed candidate images, otherwise exact-title Wikipedia pageimages are used.
 * A Wikipedia pageimage is a provisional documentary source, NOT proof of the
 * final composition; never describe all 48 as visually verified.
 * Preserve source and prioritize this resolved photo in BOTH card + detail.
 */
(function(){
'use strict';
const scenes=[["Giza_pyramid_complex","three pyramids visible on Giza Plateau","View of Giza Pyramid site.jpg","Wikimedia Commons"],["Great_Sphinx_of_Giza","Sphinx face and body with pyramid behind"],["Karnak","Great Hypostyle Hall monumental columns","Great Hypostyle Hall Karnak.jpg","Wikimedia Commons"],["Abu_Simbel","full rock-cut facade and colossal statues","The great temple of Abu simbel..JPG","Abumalek ahmed mohamed"],["Eiffel_Tower","entire Eiffel Tower from Trocadéro","Eiffel tower from trocadero.jpg","NonOmnisMoriar"],["Louvre","glass pyramid in historic Louvre courtyard"],["Palace_of_Versailles","grand symmetrical palace facade","Exterior of Palace of Versailles Aug 2026 02.jpg","Heidi Meudt"],["Mont-Saint-Michel","island abbey and tidal landscape, complete silhouette"],["Colosseum","recognizable amphitheater exterior with arcades"],["Leaning_Tower_of_Pisa","full leaning bell tower including top"],["Trevi_Fountain","front elevation of complete fountain"],["Milan_Cathedral","full ornate Gothic cathedral facade"],["Masjid_al-Haram","Kaaba centered within Great Mosque"],["Prophet%27s_Mosque","Prophet's Mosque and recognizable green dome/minarets","MasjidNabawi.jpg","Wikimedia Commons"],["Hegra_(Mada%27in_Salih)","Qasr al-Farid iconic rock-cut tomb","Qasr al Farid.JPG","Richard.hargas"],["At-Turaif_District","Diriyah mudbrick historic Najdi district","At-Turaif District.jpg","Wikimedia Commons"],["Hagia_Sophia","recognizable central dome and minarets"],["Sultan_Ahmed_Mosque","domes and six minarets from courtyard"],["Topkapı_Palace","Topkapı Palace recognizable imperial gate","Topkapı Palace gate.JPG","Mattias811"],["Göreme_Open_Air_Museum","rock-cut church facades and Cappadocia formations","Göremeopenairmuseum.jpg","Eminebeyzagn"],["Sagrada_Família","full basilica spires and signature facade","View of Sagrada Familia 2026 corrected.jpg","Lojwe"],["Alhambra","Alhambra palace and fortified hilltop ensemble"],["Museo_del_Prado","main neoclassical Prado Museum facade"],["Mosque–Cathedral_of_Córdoba","distinctive red-and-white double arches inside mosque","Interior Mezquita Cordoba Spain.jpg","Jialiang Gao"],["Tower_of_London","White Tower within historic fortress"],["Big_Ben","Elizabeth Tower with clock face and Westminster"],["British_Museum","neoclassical entrance and complete columns"],["Stonehenge","iconic ring and lintel stones in landscape"],["Statue_of_Liberty","whole statue including torch and base"],["Central_Park","aerial view of park surrounded by Manhattan skyline"],["Lincoln_Memorial","front colonnade and complete memorial building"],["Grand_Canyon","wide panorama of layered colorful canyon"],["Forbidden_City","Forbidden City main imperial hall and courtyard"],["Temple_of_Heaven","Hall of Prayer circular blue-tiled roofs"],["Terracotta_Army","ordered rows of terracotta soldiers"],["Badaling","Great Wall ridge-line winding over mountains"],["Taj_Mahal","frontal white marble mausoleum with water reflection","Front far view of taj mahal.jpg","Maggi Goyal"],["Red_Fort","historic red sandstone Lahori Gate"],["Hawa_Mahal","complete pink honeycomb facade","Hawa Mahal's external facade.jpg","Adityaoberai"],["Qutb_Minar","full tall red sandstone minaret"],["Kinkaku-ji","Golden Pavilion with pond reflection"],["Fushimi_Inari-taisha","unmistakable vermilion torii gate corridor"],["Tokyo_Tower","full red and white broadcast tower"],["Sensō-ji","Kaminarimon with large red lantern"],["Burj_Khalifa","whole world's tallest tower, skyline with full spire"],["Sheikh_Zayed_Grand_Mosque","white domes and minarets, reflective pools"],["Dubai_Frame","full giant gold picture-frame monument"],["Museum_of_the_Future","oval silver calligraphy facade and full building"]];
const official=Object.freeze(scenes.map((row,index)=>Object.freeze({
 index,wiki:row[0],focus:row[1],file:row[2]||null,author:row[3]||null
})));
const commons='https://commons.wikimedia.org/wiki/File:';
const photoCache=new Map();
const inflight=new Map();
const norm=s=>String(s||'').replace(/_/g,' ').normalize('NFC').toLocaleLowerCase();
const reject=src=>/(?:\.(?:svg)(?:\?|$)|(?:tourists?|visitors?|selfie|crowd|portrait|people|person|protest|press.?conference|flag|locator|map|diagram))/i.test(decodeURIComponent(src));
function allowed(src){
 return typeof src==='string'&&/^https:\/\/(?:upload|thumb)\.wikimedia\.org\//.test(src)&&!reject(src);
}
function candidate(file,w){
 return 'https://commons.wikimedia.org/wiki/Special:FilePath/'+encodeURIComponent(file)+'?width='+w;
}
function articleUrl(s){
 return s.file?commons+encodeURIComponent(s.file):'https://en.wikipedia.org/wiki/'+encodeURIComponent(s.wiki);
}
function wikipedia(index){
 const spec=official[index];
 const p=new URLSearchParams({action:'query',prop:'pageimages',piprop:'thumbnail',pithumbsize:'1100',redirects:'1',titles:decodeURIComponent(spec.wiki),format:'json',origin:'*'});
 return fetch('https://en.wikipedia.org/w/api.php?'+p)
  .then(r=>{if(!r.ok)throw Error('Wikipedia image unavailable');return r.json()})
  .then(data=>{
   const page=Object.values(data.query?.pages||{})[0];
   const src=page?.thumbnail?.source;
   if(!allowed(src))throw Error('No suitable photograph of this exact site');
   return {src,via:'Wikipedia',title:page.title||spec.wiki};
  });
}
function commonsFile(index){
 const spec=official[index];if(!spec.file)return Promise.reject(Error('No selected file'));
 const p=new URLSearchParams({action:'query',prop:'imageinfo',iiprop:'url',iiurlwidth:'1100',titles:'File:'+spec.file,redirects:'1',format:'json',origin:'*'});
 return fetch('https://commons.wikimedia.org/w/api.php?'+p)
 .then(r=>{if(!r.ok)throw Error('Commons source unavailable');return r.json()})
 .then(data=>{
  const page=Object.values(data.query?.pages||{})[0];
  const src=page?.imageinfo?.[0]?.thumburl||page?.imageinfo?.[0]?.url;
  if(!allowed(src))throw Error('Selected image unavailable');
  return {src,via:'Commons',title:page.title};
 });
}
function resolve(index){
 if(photoCache.has(index))return Promise.resolve(photoCache.get(index));
 if(inflight.has(index))return inflight.get(index);
 const spec=official[index];if(!spec)return Promise.reject(Error('Unknown attraction'));
 const promise=(spec.file?commonsFile(index).catch(()=>wikipedia(index)):wikipedia(index))
  .then(result=>{photoCache.set(index,result);return result})
  .finally(()=>inflight.delete(index));
 inflight.set(index,promise);return promise;
}
function linkPhoto(host,spec,result){
 if(!host?.isConnected)return;
 const index=spec.index;
 const former=host.querySelector('img[data-gv186-photo]');
 if(former?.dataset.gv186Photo===String(index))return;
 const img=document.createElement('img');
 img.dataset.gv186Photo=String(index);
 img.alt=(state.lang==='ar'?'صورة تعريفية: ':'Identifying photograph: ')+(geo.tourism?.[index]?.[state.lang==='ar'?0:1]||spec.wiki.replace(/_/g,' '));
 img.loading=host.id==='gvArticlePhoto'?'eager':'lazy';img.decoding='async';
 img.style.objectFit='contain';img.style.objectPosition='center center';
 img.addEventListener('load',()=>{
  if(!host.isConnected)return;
  // Only replace a previously displayed image after the new one loads.
  host.querySelectorAll('img').forEach(other=>{if(other!==img)other.remove()});
  // A soft background from the *same* real photo fills portrait gutters
  // without enlarging or cropping the actual landmark in the foreground.
  if(host.classList.contains('gv13-photo')){
   const back=document.createElement('img');
   back.className='gv188-image-backdrop';
   back.alt='';back.setAttribute('aria-hidden','true');
   back.decoding='async';back.src=result.src;
   host.insertBefore(back,img);
  }
  host.classList.add('gv13-has-photo','gv14-has-photo','gv186-photo-ready');
  host.querySelector('.gv13-photo-fallback')?.remove();
  host.querySelector('.gv13-photo-status')?.remove();
  if(host.id==='gvArticlePhoto'){
   host.querySelectorAll('.gv14-image-credit,.gv182-credit').forEach(old=>old.remove());
   const sourceLink=host.querySelector('.gv186-source')||document.createElement('a');
   sourceLink.className='gv186-source';sourceLink.target='_blank';sourceLink.rel='noopener noreferrer';
   sourceLink.href=result.via==='Commons'?articleUrl(spec):'https://en.wikipedia.org/wiki/'+encodeURIComponent(spec.wiki);
   sourceLink.textContent=result.via==='Commons'&&spec.author?'Photo: '+spec.author+' · Wikimedia Commons':'Photo source: Wikimedia';
   if(!sourceLink.isConnected)host.appendChild(sourceLink);
  }
 });
 img.addEventListener('error',()=>img.remove());
 host.insertBefore(img,host.firstChild);
 img.src=result.src;
}
function mountCard(card,index){
 const box=card?.querySelector('.gv13-photo');if(!box)return;
 const current=box.querySelector('img[data-gv186-photo]');
 if(current?.dataset.gv186Photo===String(index))return;
 resolve(index).then(result=>{if(box.isConnected&&state.page==='category'&&state.category==='tourism')linkPhoto(box,official[index],result)}).catch(()=>{});
}
function hydrate(){
 if(typeof state==='undefined'||state.category!=='tourism')return;
 if(state.page==='category'){
  document.querySelectorAll('#categoryItems .gv13-place[data-item^="tourism:"]').forEach(card=>{
   const m=/^tourism:(\d+)$/.exec(card.dataset.item||'');
   if(m)mountCard(card,+m[1]);
  });
 }else if(state.page==='detail'&&Number.isInteger(state.item)){
  const box=document.getElementById('gvArticlePhoto');
  const index=state.item;
  if(box&&official[index]){
   resolve(index).then(result=>{if(box.isConnected&&state.page==='detail'&&state.category==='tourism'&&state.item===index)linkPhoto(box,official[index],result)}).catch(()=>{});
  }
 }
}
let scheduled=false;
function schedule(){
 if(scheduled)return;scheduled=true;
 requestAnimationFrame(()=>{scheduled=false;hydrate()});
}
// Stop the old generic card-image hydrator from overwriting chosen tourism images.
// Non-tourism place photos continue using their existing logic.
if(window.GeoVersePlacesV13?.mount){
 const priorMount=window.GeoVersePlacesV13.mount;
 window.GeoVersePlacesV13.mount=function(box){
  if(state.category==='tourism')return;
  return priorMount.apply(this,arguments);
 };
}
const earlier=render;
render=function(){const result=earlier.apply(this,arguments);schedule();return result};
const root=document.getElementById('main');
if(root)new MutationObserver(schedule).observe(root,{childList:true,subtree:false});
schedule();
window.GeoVerseTourismPhotoCatalog=Object.freeze({count:official.length,scenes:official,get:index=>photoCache.get(index)||null,resolve});
})();