/* GeoVerse Phase 3.3: Rich, carefully attributed place cards.
 * Exact-title Wikimedia image resolution is kept in enhancements.js.
 * A missing/unverified image never becomes an unrelated generic photograph. */
(function(){
'use strict';
const photo=window.GeoVersePlaceMedia={};
const verifiedPhotos={};
function isPlacePhoto(src){
 if(typeof src!=='string'||!/^https:\/\/(?:(?:upload|thumb)\.wikimedia\.org\/|commons\.wikimedia\.org\/wiki\/Special:Redirect\/file\/)/.test(src))return false;
 let name='';try{name=decodeURIComponent(src.split('?')[0]).split('/').pop().replace(/^\d+px-/,'')}catch{return false}
 if(/\.svg\.png$/i.test(name))return true; // Verified continent silhouette rasters (not photographs).
 return !/(?:\.svg(?:\.png)?$|(?:^|[_ -])(?:map|locator|orthographic|projection|diagram|schematic|globe)(?:[_ .-]|$)|cia[_ -]?wfb|location[_ -]|_in_its_region)/i.test(name);
}

const previousItemCards=itemCards;
const langText=(ar,en)=>state.lang==='ar'?ar:en;
const safe=x=>escapeHTML(String(x??''));
const labels={
 oceans:['محيط','Ocean'],seas:['بحر','Sea'],rivers:['نهر','River'],waterfalls:['شلال','Waterfall'],
 forests:['غابة','Forest'],mountains:['جبل','Mountain'],lakes:['بحيرة','Lake'],islands:['جزيرة','Island'],
 volcanoes:['بركان','Volcano'],deserts:['صحراء','Desert'],straits:['مضيق أو قناة','Strait or canal'],
 gulfs:['خليج','Gulf or bay'],glaciers:['جليد وقطبان','Glacier or polar region'],
 valleys:['وادٍ أو أخدود','Valley or canyon'],climate:['منطقة مناخية','Climate zone'],
 grasslands:['سهول ومراعٍ','Grassland'],continents:['قارة','Continent']
};
function logo(id){
 // Use the approved topic's own SVG icon; no generic/repeated emoji.
 return window.GeoVerseTopicsV12?.iconFor?.(id)||'';
}
function truncate(x,max=130){
 const input=String(x||'').replace(/\s+/g,' ').trim();
 return input.length>max?input.slice(0,max).replace(/\s+\S*$/,'')+'…':input;
}
function card(item,index,id){
 const name=langText(item[0],item[1]),summary=truncate(langText(item[2],item[3]),state.lang==='ar'?105:115);
 const seen=!!saved()[id+'_'+index],tag=labels[id]||[id,id];
 return '<button type="button" class="gv13-place" data-item="'+id+':'+index+'" aria-label="'+safe(name)+'">'+
 '<span class="gv13-photo" data-photo-index="'+index+'" data-place-name="'+safe(name)+'">'+
 '<span class="gv13-photo-fallback" aria-hidden="true">'+logo(id)+'</span>'+
 '<span class="gv13-photo-status">'+langText('صورة المعلم غير متاحة','Place photo unavailable')+'</span>'+
 '</span>'+
 '<span class="gv13-text"><span class="gv13-topline"><span class="gv13-tag">'+safe(langText(tag[0],tag[1]))+'</span>'+(seen?'<span class="gv13-learned"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 5 5L20 7"/></svg>'+langText('تم التعلّم','Learned')+'</span>':'')+'</span>'+
 '<strong class="gv13-name">'+safe(name)+'</strong>'+
 '<span class="gv13-intro">'+safe(summary)+'</span>'+
 '<span class="gv13-footer">'+langText('اكتشف التفاصيل','Explore details')+' <span aria-hidden="true">↗</span></span>'+
 '</span></button>';
}
itemCards=function(items){
 if(state.category==='countries')return previousItemCards(items);
 const q=(state.filter||'').trim().toLocaleLowerCase();
 const normalizedPlace=v=>{
  const en=String(v[1]||'').toLocaleLowerCase().normalize('NFKC').replace(/[’']/g,'').trim();
  if(state.category==='glaciers'&&/^vatnaj.kull(?: glacier| ice cap)?$/.test(en))return 'vatnajokull';
  if(state.category==='grasslands'){
   if(['serengeti plains','serengeti savanna'].includes(en))return 'serengeti';
   if(['prairies','north american prairies'].includes(en))return 'prairies';
   if(['pampas'].includes(en))return 'pampas';
  }
  if(state.category==='climate'&&en==='mediterranean climate')return 'mediterranean climate';
  if(state.category==='valleys'){
   if(en==='grand canyon')return 'grand canyon';
   if(en==='death valley')return 'death valley';
   if(en==='valley of the kings')return 'valley of the kings';
  }
  return en;
 };
 const seenPlaceKeys=new Set();
 const matches=items.map((v,i)=>({v,i})).filter(({v,i})=>{
  const key=normalizedPlace(v);
  if(q&&!String(v[0]+' '+v[1]).toLocaleLowerCase().includes(q))return false;
  if(seenPlaceKeys.has(key))return false;
  seenPlaceKeys.add(key);
  return true;
 });
 setTimeout(()=>photo.hydrate(),0);
 return matches.length?matches.map(({v,i})=>card(v,i,state.category)).join(''):'<div class="empty gv13-empty">'+langText('لا توجد معالم مطابقة للبحث','No matching places')+'</div>';
};
// Called only after the existing wiki title was matched exactly and its thumbnail
// host was checked against the two official Wikimedia image CDNs.
photo.mount=function(box,src,name,articleUrl,fallbacks=[]){
 if(!box?.isConnected||box.querySelector('img')||!isPlacePhoto(src))return;
 const img=document.createElement('img');
 img.loading=state.category==='seas'?'eager':'lazy';img.decoding='async';img.alt=name;
 if(articleUrl&&/^https:\/\/(?:en\.wikipedia|commons\.wikimedia)\.org\/wiki\//.test(articleUrl))box.dataset.articleSource=articleUrl;
 img.addEventListener('load',()=>{
  if(!box.isConnected)return;
  box.querySelector('.gv13-photo-fallback')?.remove();
  box.querySelector('.gv13-photo-status')?.remove();
  box.classList.add('gv13-has-photo');
 });
 let retries=Array.isArray(fallbacks)?fallbacks.filter(x=>typeof x==='string'&&x!==src):[];
 let commonsAttempted=false;
 img.addEventListener('error',async()=>{
  if(!box.isConnected)return;
  if(retries.length){img.src=retries.shift();return}
  if(!commonsAttempted&&articleUrl&&articleUrl.includes('commons.wikimedia.org')){
   commonsAttempted=true;
   try{
    const title=decodeURIComponent(articleUrl.split('/wiki/').pop()||'');
    const endpoint='https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&prop=imageinfo&iiprop=url&iiurlwidth=720&titles='+encodeURIComponent(title);
    const response=await fetch(endpoint,{mode:'cors'});
    const json=await response.json();
    const page=Object.values(json.query?.pages||{})[0];
    const recovered=page?.imageinfo?.[0]?.thumburl||page?.imageinfo?.[0]?.url;
    if(recovered&&recovered!==img.src){img.src=recovered;return}
   }catch(e){}
  }
  img.remove();box.classList.remove('gv13-has-photo');
 });
 box.appendChild(img);
 // Wikimedia's API resolves the *actual stored file*, avoiding stale or
 // ungenerated guessed thumbnail paths for the seven approved sea photographs.
 const approvedSea=false; // Approved seas use verified canonical CDN URL first, never API-first.
 if(approvedSea&&articleUrl?.includes('commons.wikimedia.org/wiki/')){
  const title=decodeURIComponent(articleUrl.split('/wiki/').pop()||'').replace(/_/g,' ');
  const api='https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&prop=imageinfo&iiprop=url&iiurlwidth=640&titles='+encodeURIComponent(title);
  fetch(api,{mode:'cors'}).then(r=>{if(!r.ok)throw Error('Commons thumbnail');return r.json()}).then(data=>{
   const info=Object.values(data.query?.pages||{})[0]?.imageinfo?.[0];
   const actual=info?.thumburl||info?.url;
   if(!box.isConnected)return;
   if(actual&&/^https:\/\/(?:upload|thumb)\.wikimedia\.org\//.test(actual)){
    retries=[src,...retries].filter((x,i,a)=>x!==actual&&a.indexOf(x)===i);
    img.src=actual;
   }else img.src=src;
  }).catch(()=>{if(box.isConnected)img.src=src});
 }else img.src=src;
};

// A small, versioned set of exact-title, photo-only Wikipedia pageimages
// avoids refetching the same Wikimedia metadata on every search or navigation.
photo.has=(category,index)=>!!verifiedPhotos[category+':'+index];
photo.hydrate=function(){
 if(state.page!=='category'||state.category==='countries')return;
 document.querySelectorAll('#categoryItems .gv13-photo[data-photo-index]').forEach(box=>{
  const index=Number(box.dataset.photoIndex);
  const item=verifiedPhotos[state.category+':'+index];
  if(!item||!Number.isInteger(index))return;
  const src=item[0],canonical=item[1];
  if(typeof src!=='string'||typeof canonical!=='string')return;
  const article=canonical.startsWith('File:')?'https://commons.wikimedia.org/wiki/'+encodeURIComponent(canonical.replace(/ /g,'_')):'https://en.wikipedia.org/wiki/'+encodeURIComponent(canonical.replace(/ /g,'_'));
  photo.mount(box,src,box.dataset.placeName||'',article,item[4]);
 });
};
photo.ready=fetch('./photo-manifest-v13.json?v=gv327-approved-black-north',{cache:'no-store'}).then(r=>{
 if(!r.ok)throw Error('Photo reference manifest unavailable');
 return r.json();
}).then(data=>{
 for(const [key,item] of Object.entries(data.photos||{})){
  if(!/^[a-z]+:\d+$/.test(key)||!Array.isArray(item)||item.length<2)continue;
  if(!isPlacePhoto(item[0]))continue;
  verifiedPhotos[key]=item;
 }
 photo.hydrate();
}).catch(e=>{console.warn('Offline photo index unavailable; falling back to live exact article lookup.',e.message)});
photo.stats=()=>({indexed:Object.keys(verifiedPhotos).length});

window.GeoVersePlacesV13=photo;
})();