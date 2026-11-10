/* Egypt pilot: real interactive map, separate from the 3D globe and world atlas. */
(function(){
'use strict';
const points=[
['أهرامات الجيزة','Pyramids of Giza','الجيزة',29.9792,31.1342],
['أبو الهول','Great Sphinx','الجيزة',29.9753,31.1376],
['قلعة صلاح الدين','Cairo Citadel','القاهرة',30.0299,31.2613],
['مكتبة الإسكندرية','Bibliotheca Alexandrina','الإسكندرية',31.2089,29.9092],
['قلعة قايتباي','Citadel of Qaitbay','الإسكندرية',31.2138,29.8856],
['معبد الكرنك','Karnak Temple','الأقصر',25.7188,32.6573],
['معبد الأقصر','Luxor Temple','الأقصر',25.6995,32.6391],
['وادي الملوك','Valley of the Kings','الأقصر',25.7402,32.6014],
['معبد فيلة','Philae Temple','أسوان',24.0257,32.8847],
['أبو سمبل','Abu Simbel','أسوان',22.336,31.6258],
['محمية رأس محمد','Ras Mohammed National Park','جنوب سيناء',27.732,34.246],
['جبل موسى','Mount Sinai','جنوب سيناء',28.539,33.975]
];
const arabic=()=>typeof state==='undefined'||state.lang!=='en';
const normalize=v=>String(v||'').normalize('NFKD').replace(/[\u064B-\u065F\u0670]/g,'').replace(/[أإآ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').replace(/[^\p{L}\p{N}]/gu,'').toLowerCase();
let loading;
function loadLeaflet(){
 if(window.L)return Promise.resolve();
 if(loading)return loading;
 loading=new Promise((resolve,reject)=>{
  if(!document.querySelector('link[data-gv481]')){
   const css=document.createElement('link');css.rel='stylesheet';css.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';css.dataset.gv481='';document.head.appendChild(css);
  }
  const script=document.createElement('script');script.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
  script.onload=()=>window.L?resolve():reject(new Error('Leaflet unavailable'));script.onerror=reject;document.head.appendChild(script);
 });
 return loading;
}
const style=document.createElement('style');
style.textContent=`
.gv470-egypt .gv481-map{height:100%;width:100%;border-radius:17px;overflow:hidden;background:#122c3a}
.gv470-egypt .gv481-map .leaflet-container{height:100%;background:#142e3b;font-family:Cairo,system-ui}
.gv470-egypt .gv481-map .leaflet-control-attribution{font-size:9px;background:#edf2f3e8}
.gv470-egypt .gv481-map .leaflet-popup-content-wrapper{border-radius:13px;background:#092a3b;color:#f2fffd;border:1px solid #5dbfb4;box-shadow:0 10px 30px #0007}
.gv470-egypt .gv481-map .leaflet-popup-tip{background:#092a3b}
.gv481-place{font:700 14px Cairo,system-ui}.gv481-city{font:12px Cairo,system-ui;color:#c3dedb;margin:4px 0 10px}
.gv481-open{background:#36cfc4;color:#06323d;border:0;border-radius:9px;padding:8px 12px;font:700 12px Cairo,system-ui;cursor:pointer}
.gv481-marker{width:15px;height:15px;border-radius:50%;background:#f5d06d;border:3px solid #fff1c1;box-shadow:0 0 0 4px #e9b95955,0 2px 8px #0008}
.gv481-city-marker{border:2px solid #ffdc83;border-radius:22px;background:#09384be8;color:#ffe5a0;padding:6px 10px;white-space:nowrap;font:800 12px Cairo,system-ui;box-shadow:0 4px 15px #0007}
.gv481-fallback{display:grid;place-items:center;height:100%;color:#e3f4f1;text-align:center;padding:20px}
`;
document.head.appendChild(style);
function mount(){
 if(typeof state==='undefined'||state.page!=='country-v4'||String(state.v4Code||'').toUpperCase()!=='EG')return;
 const panel=document.querySelector('.gv470-egypt .gv450-landmark-panel');
 if(!panel||panel.dataset.gv481)return;
 const old=panel.querySelector('.gv450-map');if(!old)return;
 panel.dataset.gv481='loading';
 const holder=document.createElement('div');holder.className='gv481-map';
 holder.innerHTML='<div class="gv481-fallback">جارٍ تحميل الخريطة التفاعلية…</div>';
 old.replaceWith(holder);
 // Remove the legacy detail overlay; popups now belong to the map itself.
 panel.querySelector('.gv470-detail')?.remove();
 loadLeaflet().then(()=>{
  if(!holder.isConnected)return;
  holder.replaceChildren();
  const map=L.map(holder,{zoomControl:false,scrollWheelZoom:false,tap:false,attributionControl:true});
  L.control.zoom({position:'bottomleft'}).addTo(map);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
   maxZoom:19,attribution:'© OpenStreetMap contributors'
  }).addTo(map);
  map.fitBounds([[21.8,24.5],[31.8,36.7]],{padding:[12,12],animate:false});
  const layers=L.layerGroup().addTo(map);
  const icon=L.divIcon({className:'',html:'<div class="gv481-marker"></div>',iconSize:[21,21],iconAnchor:[10,10]});
  const geo=window.GeoVerseV4?.store?.featLookup?.get('EG')?.properties;
  function detailIndex(p){
   const rows=geo?.tourism||[];
   return rows.findIndex(row=>Array.isArray(row)&&[row[0],row[1]].some(n=>normalize(n)===normalize(p[0])||normalize(n)===normalize(p[1])));
  }
  function draw(){
   layers.clearLayers();
   const grouped=new Map();
   points.forEach((p,i)=>{
    const key=p[2];if(!grouped.has(key))grouped.set(key,[]);
    grouped.get(key).push({p,i});
   });
   grouped.forEach((items,city)=>{
    const bounds=L.latLngBounds(items.map(x=>[x.p[3],x.p[4]]));
    const pixelPoints=items.map(x=>map.latLngToLayerPoint([x.p[3],x.p[4]]));
    const close=items.length>1&&pixelPoints.some((pt,i)=>pixelPoints.some((q,j)=>j!==i&&pt.distanceTo(q)<35));
    if(close){
     const center=bounds.getCenter();
     const text=arabic()?city:items[0].p[2];
     const cityIcon=L.divIcon({className:'',html:'<div class="gv481-city-marker">'+text+' · '+items.length+'</div>',iconSize:[100,32],iconAnchor:[50,16]});
     L.marker(center,{icon:cityIcon,keyboard:true}).on('click',()=>{
      const target=Math.min(17,Math.max(map.getZoom()+2,13));
      map.flyTo(center,target,{duration:.45});
     }).addTo(layers);
    }else items.forEach(({p})=>{
     const marker=L.marker([p[3],p[4]],{icon,keyboard:true}).addTo(layers);
     const box=document.createElement('div');
     const name=document.createElement('div');name.className='gv481-place';name.textContent=arabic()?p[0]:p[1];
     const cityLabel=document.createElement('div');cityLabel.className='gv481-city';cityLabel.textContent=p[2];
     box.append(name,cityLabel);
     const index=detailIndex(p);
     if(index>=0){
      const btn=document.createElement('button');btn.className='gv481-open';btn.type='button';
      btn.textContent=arabic()?'فتح تفاصيل المزار':'Open landmark details';
      btn.addEventListener('click',()=>{if(typeof window.setPage==='function')window.setPage('detail','tourism',index);else if(typeof setPage==='function')setPage('detail','tourism',index)});
      box.appendChild(btn);
     }
     marker.bindPopup(box,{autoPan:true,maxWidth:220});
    });
   });
  }
  map.on('zoomend',draw);draw();
  const observer=new ResizeObserver(()=>map.invalidateSize({pan:false}));
  observer.observe(holder);
  const tab=panel.closest('.gv471-stage')?.previousElementSibling;
  tab?.querySelectorAll('button')?.forEach(b=>b.addEventListener('click',()=>setTimeout(()=>map.invalidateSize({pan:false}),70)));
  panel.dataset.gv481='ready';
 }).catch(()=>{
  holder.innerHTML='<div class="gv481-fallback">تعذّر تحميل الخريطة الآن. تحقق من الاتصال بالإنترنت وأعد فتح صفحة مصر.</div>';
  panel.dataset.gv481='error';
 });
}
let queued=false;
const observer=new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;mount()})});
function init(){observer.observe(document.body,{childList:true,subtree:true});mount()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();