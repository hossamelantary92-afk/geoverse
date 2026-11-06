/* GeoVerse Phase 3.3: Rich, carefully attributed place cards.
 * Exact-title Wikimedia image resolution is kept in enhancements.js.
 * A missing/unverified image never becomes an unrelated generic photograph. */
(function(){
'use strict';
const photo=window.GeoVersePlaceMedia={};
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
 const matches=items.map((v,i)=>({v,i})).filter(({v})=>!q||String(v[0]+' '+v[1]).toLocaleLowerCase().includes(q));
 return matches.length?matches.map(({v,i})=>card(v,i,state.category)).join(''):'<div class="empty gv13-empty">'+langText('لا توجد معالم مطابقة للبحث','No matching places')+'</div>';
};
// Called only after the existing wiki title was matched exactly and its thumbnail
// host was checked against upload.wikimedia.org.
photo.mount=function(box,src,name,articleUrl){
 if(!box?.isConnected||!/^https:\/\/(?:upload|thumb)\.wikimedia\.org\//.test(src))return;
 const img=document.createElement('img');
 img.loading='lazy';img.decoding='async';img.alt=name;
 img.referrerPolicy='no-referrer';img.src=src;
 img.addEventListener('load',()=>{
  if(!box.isConnected)return;
  box.querySelector('.gv13-photo-fallback')?.remove();
  box.querySelector('.gv13-photo-status')?.remove();
  box.classList.add('gv13-has-photo');
  if(!box.querySelector('.gv13-source')){
   const credit=document.createElement('span');credit.className='gv13-source';
   credit.textContent=langText('صورة مرتبطة بالمعلم','Image linked to this place');
   box.appendChild(credit);
  }
 });
 img.addEventListener('error',()=>{img.remove();box.classList.remove('gv13-has-photo')});
 box.appendChild(img);
};
window.GeoVersePlacesV13=photo;
})();