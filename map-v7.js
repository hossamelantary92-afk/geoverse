/* GeoVerse v7 - isolated 2D geography challenge.
 * Only the map quiz is replaced; the main atlas and 3D explorer stay untouched.
 * A pointer-up after a stationary tap answers; a drag never answers. */
(function(){
 'use strict';
 const G=window;
 const minSize=75, WORLD={x:0,y:0,w:1000,h:520};
 const regions=['World','Asia','Africa','Europe','North America','South America','Oceania'];
 const arRegion={'World':'العالم','Asia':'آسيا','Africa':'أفريقيا','Europe':'أوروبا','North America':'أمريكا الشمالية','South America':'أمريكا الجنوبية','Oceania':'أوقيانوسيا'};
 const shapes={data:null,promise:null},game={key:null,selected:null,correct:null,view:null,region:null,showingAnswer:false};
 const lang=(ar,en)=>state.lang==='ar'?ar:en;
 const safe=s=>String(s??'').replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
 const norm=s=>String(s??'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z]/g,'');
 const alias={'unitedstatesofamerica':'unitedstates','russianfederation':'russia','republicofkorea':'southkorea','czechrepublic':'czechia'};
 const resolve=s=>alias[norm(s)]||norm(s);
 function metadata(name){return G.GeoVerseV4?.store?.byName?.get(resolve(name))||null}
 function titleCountry(name){
  const m=metadata(name);
  if(state.lang!=='ar')return name;
  if(m?.code)try{return new Intl.DisplayNames(['ar'],{type:'region'}).of(m.code)}catch(e){}
  return name;
 }
 function getRegion(name){
  const r=metadata(name);return r?.continent||({'Australia':'Oceania','Egypt':'Africa','Brazil':'South America','Canada':'North America','Argentina':'South America','Japan':'Asia','China':'Asia','India':'Asia','Spain':'Europe','France':'Europe','Germany':'Europe','Italy':'Europe','United States':'North America'})[name]||'World';
 }
 const regionPoints={
  World:[[-180,-85],[180,85]],Asia:[[25,-12],[178,83]],Africa:[[-23,-39],[62,40]],Europe:[[-25,32],[66,76]],
  'North America':[[-178,5],[-47,82]],'South America':[[-88,-59],[-29,16]],Oceania:[[91,-52],[179,13]]
 };
 function questionKey(){return state.quizIndex+':'+quiz?.[state.quizIndex]?.[7]}
 function active(){return state.page==='play'&&selectedGameMode==='mapfind'&&!state.quizComplete}
 function countryName(f){return f?.properties?.name||''}
 function sameCountry(a,b){return resolve(a)===resolve(b)}
 function getIndex(name){return shapes.data?.features?.findIndex(f=>sameCountry(countryName(f),name))??-1}
 async function loadShapes(){
  if(shapes.data)return shapes.data;
  if(!shapes.promise)shapes.promise=fetch('./world.geojson').then(r=>{if(!r.ok)throw Error('Unable to load map geometry');return r.json()}).then(d=>{if(!Array.isArray(d.features))throw Error('Invalid geometry');shapes.data=d;return d}).catch(e=>{shapes.promise=null;throw e});
  return shapes.promise;
 }
 function frame(region){
  if(region==='World')return [0,0,1000,520];
  const proj=d3.geoNaturalEarth1().fitExtent([[10,10],[990,510]],{type:'Sphere'});
  const box=regionPoints[region]||regionPoints.World;
  const coords=[box[0],[box[0][0],box[1][1]],box[1],[box[1][0],box[0][1]]].map(pt=>proj(pt));
  const xs=coords.map(c=>c[0]),ys=coords.map(c=>c[1]);
  const x=Math.min(...xs),y=Math.min(...ys),w=Math.max(...xs)-x,h=Math.max(...ys)-y;
  const margin=26;
  return [Math.max(0,x-margin),Math.max(0,y-margin),Math.min(1000,w+2*margin),Math.min(520,h+2*margin)];
 }
 function fitRegion(reg){
  game.region=reg;
  game.view=frame(reg);
  updateView();
 }
 function updateView(){
  const svg=document.querySelector('#gameGeoMap svg');if(!svg||!game.view)return;
  let [x,y,w,h]=game.view;
  // Keep the visible window inside the projected world boundaries, with min-scale.
  w=Math.max(minSize,Math.min(1000,w));
  h=Math.max(minSize*.52,Math.min(520,h));
  x=Math.max(0,Math.min(1000-w,x));
  y=Math.max(0,Math.min(520-h,y));
  game.view=[x,y,w,h];
  svg.setAttribute('viewBox',game.view.join(' '));
  const zoom=document.querySelector('#gameGeoMap [data-v7-zoom-level]');
  if(zoom)zoom.textContent=Math.round(1000/w*100)+'%';
 }
 function zoom(scale,at){
  const v=game.view||[0,0,1000,520],w=v[2]*scale,h=v[3]*scale;
  const a=at||{x:.5,y:.5};
  game.view=[v[0]+v[2]*a.x-w*a.x,v[1]+v[3]*a.y-h*a.y,w,h];
  updateView();
 }
 function mapMarkup(){
  const target=quiz[state.quizIndex][7];
  if(game.key!==questionKey()){
   game.key=questionKey();game.selected=null;game.correct=null;game.region=getRegion(target);game.view=frame(game.region);game.showingAnswer=false;
  }
  const label=state.quizSelected===null?lang('اسحب الخريطة للتنقل، وقرّب بإصبعين، واضغط على الدولة للإجابة.','Drag to explore, pinch to zoom, tap a country to answer.'):lang('الدولة الصحيحة محددة بالتركواز؛ يمكنك تحريك الخريطة للمقارنة.','The correct country is highlighted in teal. Drag to compare locations.');
  const regionButtons=regions.map(r=>'<button type="button" class="gv7-region'+(r===game.region?' active':'')+'" data-v7-region="'+safe(r)+'">'+safe(state.lang==='ar'?arRegion[r]:r)+'</button>').join('');
  return '<section id="gameGeoMap" class="gv7-map-root" aria-label="'+lang('لعبة تحديد الدول على الخريطة','Find the country map quiz')+'">'+
   '<div class="gv7-map-heading"><span class="gv7-map-caption">'+lang('WORLD ATLAS / اختر دولة','WORLD ATLAS / FIND A COUNTRY')+'</span><span class="gv7-map-tip">'+label+'</span></div>'+
   '<div class="gv7-regions" aria-label="'+lang('اختيار المنطقة','Choose map region')+'">'+regionButtons+'</div>'+
   '<div class="gv7-map-stage"><div class="gv7-map-mount" id="gv7MapMount"><div class="gv7-map-loading">'+lang('جارٍ تحميل الخريطة الجغرافية...','Loading the geographic map...')+'</div></div>'+
   '<div class="gv7-map-tools"><button type="button" data-v7-zoom="in" aria-label="'+lang('تكبير','Zoom in')+'">+</button><button type="button" data-v7-zoom="out" aria-label="'+lang('تصغير','Zoom out')+'">−</button><button type="button" data-v7-zoom="reset" aria-label="'+lang('إعادة ضبط','Reset map')+'">⌖</button></div>'+
   '<span data-v7-zoom-level class="gv7-scale">100%</span>'+(state.quizSelected!==null?'<div class="gv8-map-legend"><span><i class="gv8-dot correct"></i>'+lang('الإجابة الصحيحة','Correct location')+'</span>'+(state.quizSelected!==0?'<span><i class="gv8-dot wrong"></i>'+lang('اختيارك','Your choice')+'</span>':'')+'</div>':'')+'</div>'+
   '<div class="gv7-feedback" aria-live="polite">'+(state.quizSelected===null?'<span>'+lang('لن تظهر أسماء الدول قبل الإجابة.','Country names are hidden until you answer.')+'</span>':answerMessage())+'</div></section>';
 }
 function answerMessage(){
  const target=quiz[state.quizIndex][7];
  const correctMeta=metadata(target),chosenMeta=metadata(game.selected);
  const correctName=titleCountry(target),chosenName=titleCountry(game.selected);
  const correct=state.quizSelected===0;
  const flagFor=(record,name)=>record?.code
   ?'<img class="gv126-country-flag" loading="lazy" src="https://flagcdn.com/'+safe(record.code.toLowerCase())+'.svg" alt="'+safe(lang('علم '+name,'Flag of '+name))+'">'
   :'';
  const chosenFlag=!correct?flagFor(chosenMeta,chosenName):'';
  const correctFlag=flagFor(correctMeta,correctName);
  const entry=(type,label,name,flag)=>'<div class="gv126-answer-row '+type+'">'+
   '<span class="gv126-answer-label">'+label+'</span>'+
   '<span class="gv126-country">'+flag+'<strong>'+safe(name)+'</strong></span></div>';
  const rows=correct
   ?entry('correct',lang('إجابتك','Your answer'),correctName,correctFlag)
   :entry('wrong',lang('اخترت','You selected'),chosenName,chosenFlag)+
    entry('correct',lang('الإجابة الصحيحة','Correct answer'),correctName,correctFlag);
  const title=correct?lang('إجابة صحيحة!','Correct answer!'):lang('الإجابة غير صحيحة','Not quite right');
  const message=correct?lang('أحسنت! عرفت الموقع الصحيح.','Well done! You found the right location.'):'';
  return '<div class="gv126-result '+(correct?'right':'wrong')+'" role="status">'+
    '<div class="gv126-result-heading">'+
     '<span class="gv126-result-icon" aria-hidden="true">'+(correct?'✓':'×')+'</span>'+
     '<div class="gv126-result-title"><h3>'+title+'</h3>'+(message?'<p>'+message+'</p>':'')+'</div>'+
    '</div><div class="gv126-result-rows">'+rows+'</div></div>'+
   '<div class="gv126-actions">'+
    '<button type="button" data-gv8-focus="correct">'+lang('شاهد الموقع الصحيح','Show correct location')+'</button>'+
    (!correct?'<button type="button" data-gv8-focus="compare">'+lang('قارن بين الموقعين','Compare locations')+'</button>':'')+
   '</div>';
 }
 function featureBounds(name){
  const f=shapes.data?.features?.find(x=>sameCountry(countryName(x),name));
  if(!f||!G.d3)return null;
  const proj=d3.geoNaturalEarth1().fitExtent([[10,10],[990,510]],{type:'Sphere'});
  const p=d3.geoPath(proj),b=p.bounds(f),cx=(b[0][0]+b[1][0])/2,cy=(b[0][1]+b[1][1])/2;
  if(!isFinite(cx)||!isFinite(cy))return null;
  return {bbox:b,cx,cy,w:Math.max(2,b[1][0]-b[0][0]),h:Math.max(2,b[1][1]-b[0][1])};
 }
 function focusCorrect(mode='correct',animate=true){
  if(state.quizSelected===null||!game.correct)return;
  const a=featureBounds(game.correct),b=mode==='compare'?featureBounds(game.selected):null;
  if(!a)return;
  let minX=a.bbox[0][0],maxX=a.bbox[1][0],minY=a.bbox[0][1],maxY=a.bbox[1][1];
  if(b){minX=Math.min(minX,b.bbox[0][0]);maxX=Math.max(maxX,b.bbox[1][0]);minY=Math.min(minY,b.bbox[0][1]);maxY=Math.max(maxY,b.bbox[1][1])}
  const centerX=(minX+maxX)/2,centerY=(minY+maxY)/2;
  const w=Math.max(mode==='compare'?180:125,(maxX-minX)*2.4),h=Math.max(mode==='compare'?92:75,(maxY-minY)*2.4);
  const initial=game.view?.slice()||frame(game.region),desired=[centerX-w/2,centerY-h/2,w,h];
  game.showingAnswer=true;
  const svg=document.querySelector('#gameGeoMap svg');
  if(!animate||!svg||typeof requestAnimationFrame!=='function'){game.view=desired;updateView();return}
  const key=game.key,began=performance.now(),duration=450;
  function tick(now){
   if(game.key!==key||state.quizSelected===null||!document.contains(svg))return;
   const t=Math.min(1,(now-began)/duration),ease=1-Math.pow(1-t,3);
   game.view=initial.map((x,i)=>x+(desired[i]-x)*ease);
   updateView();
   if(t<1)requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
 }

 function answerPin(proj){
  const p=featureBounds(game.correct);if(!p)return '';
  const name=titleCountry(game.correct),text=safe(name);
  // Annotation is SVG-rendered at the exact projected country position, not a detached map overlay.
  const x=Math.max(48,Math.min(950,p.cx)),y=Math.max(34,Math.min(480,p.cy));
  return '<g class="gv8-correct-pin" pointer-events="none" transform="translate('+x+' '+y+')">'+
   '<circle r="11" class="gv8-pin-ring"/><circle r="4.5" class="gv8-pin-core"/>'+
   '<g transform="translate(-42 -37)"><rect width="84" height="22" rx="6" class="gv8-pin-label-bg"/><text x="42" y="15" text-anchor="middle" font-size="10" class="gv8-pin-label">'+text+'</text></g></g>';
 }
 function draw(){
  if(!active())return;
  const root=document.getElementById('gameGeoMap'),mount=document.getElementById('gv7MapMount');
  if(!root||!mount)return;
  if(!G.d3){mount.innerHTML='<div class="gv7-map-error">'+lang('تعذر تشغيل مكتبة الخرائط. أعد تحميل الموقع.','The map library could not load. Refresh the page.')+'</div>';return}
  if(!shapes.data){
   loadShapes().then(draw).catch(()=>{if(document.getElementById('gv7MapMount'))mount.innerHTML='<div class="gv7-map-error">'+lang('تعذر تحميل الخريطة.','Map loading failed.')+' <button type="button" data-v7-retry>'+lang('إعادة المحاولة','Retry')+'</button></div>'});
   return;
  }
  const proj=d3.geoNaturalEarth1().fitExtent([[10,10],[990,510]],{type:'Sphere'}),path=d3.geoPath(proj);
  mount.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" class="gv7-svg" viewBox="'+game.view.join(' ')+'" role="group" aria-label="'+lang('خريطة صامتة بدون أسماء دول أثناء الاختبار','Unlabeled country map for the quiz')+'" preserveAspectRatio="xMidYMid meet">'+
   '<defs><radialGradient id="gv7Ocean"><stop stop-color="#1b6a87"/><stop offset="1" stop-color="#092b4c"/></radialGradient></defs>'+
   '<path class="gv7-ocean" d="'+path({type:'Sphere'})+'"/>'+
   '<path class="gv7-graticule" d="'+path(d3.geoGraticule10())+'"/>'+
   '<g class="gv7-countries">'+shapes.data.features.map((f,i)=>{
    const name=countryName(f),isRight=state.quizSelected!==null&&sameCountry(name,quiz[state.quizIndex][7]),
     isWrong=state.quizSelected!==null&&sameCountry(name,game.selected)&&!isRight;
    return '<path tabindex="0" role="button" aria-label="'+(state.quizSelected===null?lang('اختيار دولة','Select country'):safe(titleCountry(name)))+'" data-gv7-country="'+i+'" class="gv7-country'+(isRight?' gv7-correct':isWrong?' gv7-wrong':'')+'" d="'+path(f)+'"></path>';
   }).join('')+'</g>'+(state.quizSelected!==null?answerPin(proj):'')+'</svg>';
  installTouch(mount.querySelector('svg'));
  bindControls(root);
  updateView();
 }
 function choose(index){
  if(!active()||state.quizSelected!==null)return;
  const feature=shapes.data?.features?.[index];if(!feature)return;
  const selected=countryName(feature),correct=quiz[state.quizIndex][7];
  game.selected=selected;game.correct=correct;
  const right=sameCountry(selected,correct);
  state.quizSelected=right?0:1;
  if(right)state.quizScore++;
  render(); // Re-renders the existing next-question button and correct/missed highlights.
  // Reveal the correct location automatically after the answer, never before it.
  setTimeout(()=>{if(state.quizSelected!==null&&game.correct===correct)focusCorrect('correct')},170);
 }
 function bindControls(root){
  root.querySelectorAll('[data-v7-region]').forEach(b=>b.addEventListener('click',()=>{fitRegion(b.dataset.v7Region);root.querySelectorAll('[data-v7-region]').forEach(x=>x.classList.toggle('active',x===b))}));
  root.querySelectorAll('[data-v7-zoom]').forEach(b=>b.addEventListener('click',()=>{const d=b.dataset.v7Zoom;if(d==='reset')fitRegion(game.region);else zoom(d==='in'?.72:1.4)}));
  root.querySelectorAll('[data-gv8-focus]').forEach(b=>b.addEventListener('click',()=>focusCorrect(b.dataset.gv8Focus)));
 }
 function installTouch(svg){
  const pointers=new Map();
  let gesture=null, moved=false, chosen=null,finishedTouchAt=0;
  const pos=e=>({x:e.clientX,y:e.clientY}),distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
  const midpoint=(a,b)=>({x:(a.x+b.x)/2,y:(a.y+b.y)/2});
  const rect=()=>svg.getBoundingClientRect();
  function startGesture(){
   const pts=[...pointers.values()];if(!pts.length){gesture=null;return}
   const v=game.view.slice();
   gesture=pts.length===1?{count:1,origin:{...pts[0].p},view:v}:{count:2,origin:midpoint(pts[0].p,pts[1].p),gap:Math.max(4,distance(pts[0].p,pts[1].p)),view:v};
  }
  svg.addEventListener('pointerdown',e=>{
   if(e.pointerType==='mouse'&&e.button!==0)return;
   const first=pointers.size===0;
   pointers.set(e.pointerId,{p:pos(e),start:pos(e),index:Number(e.target.closest?.('[data-gv7-country]')?.dataset.gv7Country)});
   if(first){chosen=null;moved=false}
   if(pointers.size>=2){moved=true;chosen=null}
   startGesture();
   // Capture stays on svg, not on individual country paths, so pan works across boundaries.
   try{svg.setPointerCapture(e.pointerId)}catch(err){}
   e.preventDefault();
  });
  svg.addEventListener('pointermove',e=>{
   const item=pointers.get(e.pointerId);if(!item||!gesture)return;
   item.p=pos(e);
   const rr=rect(),v=gesture.view;
   if(pointers.size===1&&gesture.count===1){
    const p=[...pointers.values()][0];const delta={x:p.p.x-gesture.origin.x,y:p.p.y-gesture.origin.y};
    if(distance(p.p,p.start)>7)moved=true;
    if(moved){game.view=[v[0]-delta.x*v[2]/rr.width,v[1]-delta.y*v[3]/rr.height,v[2],v[3]];updateView()}
   }else if(pointers.size>=2){
    if(gesture.count!==2){startGesture();return}
    const ps=[...pointers.values()],center=midpoint(ps[0].p,ps[1].p);
    const ratio=gesture.gap/Math.max(4,distance(ps[0].p,ps[1].p)),w=v[2]*ratio,h=v[3]*ratio;
    const a=(gesture.origin.x-rr.left)/rr.width,b=(gesture.origin.y-rr.top)/rr.height;
    game.view=[v[0]+v[2]*a-w*a-(center.x-gesture.origin.x)*v[2]/rr.width,
               v[1]+v[3]*b-h*b-(center.y-gesture.origin.y)*v[3]/rr.height,w,h];
    updateView();moved=true;
   }
   e.preventDefault();
  });
  function finish(e,abort=false){
   const item=pointers.get(e.pointerId);if(!item)return;
   pointers.delete(e.pointerId);
   if(!abort&&!moved&&pointers.size===0&&Number.isInteger(item.index)&&item.index>=0)chosen=item.index;
   if(pointers.size)startGesture();else gesture=null;
   e.preventDefault();
   if(chosen!==null){const index=chosen;chosen=null;choose(index)}
  }
  svg.addEventListener('pointerup',e=>finish(e));
  svg.addEventListener('pointercancel',e=>finish(e,true));
  svg.addEventListener('lostpointercapture',e=>{if(pointers.has(e.pointerId))finish(e,true)});
  svg.addEventListener('wheel',e=>{const b=rect(),anchor={x:(e.clientX-b.left)/b.width,y:(e.clientY-b.top)/b.height};zoom(e.deltaY<0?.78:1.27,anchor);e.preventDefault()},{passive:false});
  svg.addEventListener('keydown',e=>{
   const p=e.target.closest?.('[data-gv7-country]');
   if(p&&(e.key==='Enter'||e.key===' ')){e.preventDefault();choose(Number(p.dataset.gv7Country))}
  });
  // Fallback synthetic click for mouse and accessibility click events, but never double count.
  svg.addEventListener('click',e=>{
   if(e.detail!==0||state.quizSelected!==null)return;
   const el=e.target.closest?.('[data-gv7-country]');if(el)choose(Number(el.dataset.gv7Country));
  });
 }
 const oldRender=render;
 render=function(){
  oldRender();
  if(!active())return;
  const legacy=document.getElementById('gameMap');if(!legacy)return;
  legacy.outerHTML=mapMarkup();
  draw();
 };
 // Existing game event delegation and quiz score persistence remain authoritative.
 // The v3/v6 atlas scheduler looks for #gameMap, absent during v7 quiz, so it cannot collide.
 G.GeoVerseMapV7={loadShapes,choose,zoom,fitRegion,focusCorrect,getRegion,getState:()=>({...game}),sameCountry};
})();