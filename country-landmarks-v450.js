/* GeoVerse Phase 5: country-local landmark map pilot. Independent of the world atlas. */
(function(){
'use strict';
const sites={
 EG:[['أهرامات الجيزة','Pyramids of Giza','الجيزة','Giza',29.9792,31.1342],['أبو الهول','Great Sphinx','الجيزة','Giza',29.9753,31.1376],['معبد الكرنك','Karnak Temple','الأقصر','Luxor',25.7188,32.6573],['أبو سمبل','Abu Simbel','أسوان','Aswan',22.336,31.6258]],
 FR:[['برج إيفل','Eiffel Tower','باريس','Paris',48.8584,2.2945],['متحف اللوفر','Louvre Museum','باريس','Paris',48.8606,2.3376],['قصر فرساي','Palace of Versailles','فرساي','Versailles',48.8049,2.1204],['مون سان ميشيل','Mont-Saint-Michel','نورماندي','Normandy',48.6361,-1.5115]],
 IT:[['الكولوسيوم','Colosseum','روما','Rome',41.8902,12.4922],['برج بيزا','Leaning Tower of Pisa','بيزا','Pisa',43.723,10.3966],['نافورة تريفي','Trevi Fountain','روما','Rome',41.9009,12.4833],['كاتدرائية ميلانو','Milan Cathedral','ميلانو','Milan',45.4642,9.1919]],
 SA:[['المسجد الحرام','Masjid al-Haram','مكة المكرمة','Mecca',21.4225,39.8262],['المسجد النبوي','Prophet’s Mosque','المدينة المنورة','Medina',24.4672,39.6112],['الحِجر','Hegra','العلا','AlUla',26.7917,37.952],['حي الطريف','At-Turaif District','الدرعية','Diriyah',24.7349,46.5728]]
};
const ar=()=>typeof state!=='undefined'&&state.lang==='ar';
const label=(a,b)=>ar()?a:b;
function mount(){
 if(typeof state==='undefined'||state.page!=='country-v4')return;
 const code=String(state.v4Code||'').toUpperCase(),places=sites[code];
 const globe=document.getElementById('gvDetailGlobe');
 if(!globe||!places||globe.parentElement?.querySelector('.gv450-landmark-panel'))return;
 const feature=window.GeoVerseV4?.store?.featLookup?.get(code);
 if(!feature||!window.d3?.geoMercator||!window.d3?.geoPath)return;
 const panel=document.createElement('section');panel.className='gv450-landmark-panel';
 const title=document.createElement('h3');title.textContent=label('استكشف معالم الدولة','Explore country landmarks');
 const desc=document.createElement('p');desc.textContent=label('اضغط على نقطة لعرض اسم المعلم ومدينته. الخريطة مستقلة عن أطلس العالم.','Tap a marker to see the landmark and its city.');
 const map=document.createElement('div');map.className='gv450-map';
 const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 480 340');svg.setAttribute('role','group');svg.setAttribute('aria-label',label('خريطة معالم الدولة','Country landmarks map'));
 const projection=d3.geoMercator().fitExtent([[34,30],[446,310]],feature);
 const path=d3.geoPath(projection);
 const outline=document.createElementNS(svg.namespaceURI,'path');outline.setAttribute('d',path(feature)||'');outline.setAttribute('class','gv450-outline');svg.appendChild(outline);
 const details=document.createElement('div');details.className='gv450-details';details.setAttribute('aria-live','polite');
 const buttons=[];
 function select(i){
  buttons.forEach((b,j)=>b.classList.toggle('gv450-active',i===j));
  const p=places[i];details.replaceChildren();
  const strong=document.createElement('strong');strong.textContent=label(p[0],p[1]);
  const small=document.createElement('span');small.textContent=label(p[2],p[3]);
  details.append(strong,small);
 }
 places.forEach((p,i)=>{
  const point=projection([p[5],p[4]]);if(!point||!point.every(Number.isFinite))return;
  const circle=document.createElementNS(svg.namespaceURI,'circle');
  circle.setAttribute('cx',point[0]);circle.setAttribute('cy',point[1]);circle.setAttribute('r','5.5');circle.setAttribute('class','gv450-dot');
  svg.appendChild(circle);
  const hit=document.createElementNS(svg.namespaceURI,'circle');
  hit.setAttribute('cx',point[0]);hit.setAttribute('cy',point[1]);hit.setAttribute('r','15');
  hit.setAttribute('class','gv450-hit');hit.setAttribute('role','button');hit.setAttribute('tabindex','0');
  hit.setAttribute('aria-label',label(p[0],p[1]));
  hit.addEventListener('click',()=>select(i));
  hit.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select(i)}});
  svg.appendChild(hit);buttons.push(hit);
 });
 map.appendChild(svg);panel.append(title,desc,map,details);
 globe.parentElement.appendChild(panel);select(0);
}
const style=document.createElement('style');
style.textContent='.gv450-landmark-panel{margin-top:16px;padding:14px;border:1px solid rgba(113,229,213,.3);border-radius:17px;background:linear-gradient(150deg,rgba(8,48,67,.96),rgba(7,32,52,.95));color:#eafffb}.gv450-landmark-panel h3{font-size:17px;margin:0 0 5px}.gv450-landmark-panel p{font-size:12px;opacity:.8;margin:0 0 10px}.gv450-map{border-radius:12px;overflow:hidden;background:radial-gradient(circle at 45% 45%,#174b63,#08273b)}.gv450-map svg{display:block;width:100%;max-height:270px}.gv450-outline{fill:#145c68;stroke:#75dfce;stroke-width:1.5;vector-effect:non-scaling-stroke}.gv450-dot{fill:#ffda61;stroke:#fff4bd;stroke-width:1.5;pointer-events:none}.gv450-hit{fill:transparent;cursor:pointer;outline:none}.gv450-hit:focus-visible{stroke:#fff;stroke-width:2}.gv450-hit.gv450-active{stroke:#ffda61;stroke-width:2}.gv450-details{display:flex;flex-direction:column;gap:3px;padding:12px 4px 2px}.gv450-details strong{font-size:15px}.gv450-details span{font-size:12px;opacity:.78}';
document.head.appendChild(style);
const observer=new MutationObserver(()=>mount());
observer.observe(document.getElementById('main')||document.body,{childList:true,subtree:true});
mount();
})();