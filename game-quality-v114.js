/* GeoVerse v114 — question integrity rules across all games.
   Do not show the answer in the stem; remove ambiguous or malformed questions.
*/
(function(){
'use strict';
const bank=window.GeoVerseQuestionPools;
if(!bank)return;
const shuffle=bank.randomize;
const definitions=[["countries","كيان سياسي له أرض وسكان ونظام حكم وحدود معترف بها أو متنازع عليها.","A political entity with territory, population and governing institutions."],["continents","كتلة يابسة شاسعة تشمل دولًا وأقاليم متعددة ويُقسّم العالم عادة إلى سبع منها.","A very large continuous landmass; the world is commonly divided into seven of these."],["oceans","أوسع نطاق للمياه المالحة على الأرض، تحرّكه تيارات كبيرة ويفصل بين كتل اليابسة.","The broadest expanse of salt water on Earth, shaped by currents and separating major landmasses."],["seas","مسطح واسع من المياه المالحة، غالبًا أصغر من نطاق المياه العالمي المفتوح وقد يحيط به اليابس جزئيًا.","A large saltwater body, often partly bounded by land and generally smaller than the major open basins."],["deserts","نطاق طبيعي تقل فيه الأمطار بشدة، وقد يغطيه الرمل أو الصخور أو حتى الجليد.","A region with very little precipitation; its surface may be sand, rock or even ice."],["rivers","مجرى طبيعي تتدفق فيه المياه من مناطق مرتفعة غالبًا نحو مصب أو مسطح آخر.","A natural channel of flowing water, generally carrying water from upstream toward an outlet."],["waterfalls","موضع يهبط عنده الماء فجأة من حافة مرتفعة داخل مجرى طبيعي.","A place where flowing water drops steeply over a ledge in a natural channel."],["forests","نظام بيئي تسود فيه الأشجار وتعيش داخله أعداد كبيرة من الكائنات.","An ecosystem dominated by trees and supporting diverse living organisms."],["mountains","ارتفاع أرضي بارز عن الأراضي المحيطة، وقد تتجمع هذه المرتفعات في سلاسل.","A prominent elevation of land above surrounding terrain, sometimes forming long ranges."],["lakes","مياه راكدة نسبيًا داخل حوض تحيط به اليابسة، وقد تكون عذبة أو مالحة.","A relatively still inland water body in a basin surrounded by land, fresh or saline."],["islands","قطعة أرض تحيط بها المياه من جميع الجهات لكنها ليست قارة.","A land area completely surrounded by water that is not classified as a continent."],["volcanoes","فتحة أو بناء جيولوجي يصل عبره الصهير والغازات والرماد إلى سطح الأرض.","A geological opening or structure through which magma, gases and ash reach the surface."],["straits","ممر مائي طبيعي ضيق يصل مسطحين أكبر، وقد يمر بين كتلتين من اليابسة.","A narrow natural water passage connecting larger bodies, often between two landmasses."],["gulfs","امتداد لمياه مالحة يتوغل داخل حواف اليابسة وتحيط به السواحل من عدة جهات.","An indentation of a coastline where salt water extends inland and is bordered by land on several sides."],["glaciers","كتلة ضخمة من الثلج المتراكم الذي أصبح جليدًا ويتحرك ببطء بفعل الجاذبية.","A large mass of compacted snow turned to ice that slowly moves under gravity."],["valleys","منخفض ممتد بين مناطق أكثر ارتفاعًا، تشكّل كثير منه بفعل المياه أو الجليد.","An elongated low area between higher ground, often carved by flowing water or ice."],["climate","متوسط أحوال الطقس المعتادة على مدى عقود، وليس حالة الجو في يوم واحد.","Typical patterns of weather measured over decades rather than conditions on a single day."],["grasslands","مساحات طبيعية مفتوحة يغلب عليها الحشائش وتوجد فيها أشجار قليلة نسبيًا.","Open natural landscapes dominated by grasses with relatively few trees."]];
const normalize=s=>String(s||'').normalize('NFKC').toLocaleLowerCase().replace(/[\u064b-\u065f\u0670\u0640]/g,'').replace(/أ|إ|آ/g,'ا').replace(/ى/g,'ي').replace(/ؤ/g,'و').replace(/ئ/g,'ي').replace(/[’‘'".,،؛:!?؟()[\]{}—–\-_\/\\]/g,' ').replace(/\s+/g,' ').trim();
const whole=(hay,needle)=>{
 const h=' '+normalize(hay)+' ',n=' '+normalize(needle)+' ';
 return !!normalize(needle)&&h.includes(n);
};
const unique=arr=>new Set(arr.map(normalize)).size===arr.length;
const valid=q=>Array.isArray(q)&&typeof q[0]==='string'&&typeof q[1]==='string'&&Array.isArray(q[2])&&Array.isArray(q[3])&&q[2].length===4&&q[3].length===4&&Number.isInteger(q[4])&&q[4]>=0&&q[4]<4&&unique(q[2])&&unique(q[3])&&q[5]&&q[6];
const safe=(q,mode)=>{
 if(mode==='mapfind')return Array.isArray(q)&&q[7]&&q[0]&&q[1];
 if(!valid(q))return false;
 if(mode==='flags')return /^[A-Z]{2}$/.test(q[7]||'')&&!q[0].includes(q[2][q[4]])&&!q[1].includes(q[3][q[4]]);
 return !whole(q[0],q[2][q[4]])&&!whole(q[1],q[3][q[4]]);
};
const choose=pool=>shuffle(pool).slice(0,3);
const makeDefinitions=()=>{
 const pool=definitions.filter(([id])=>cats.some(c=>c.id===id));
 return pool.map(([id,ar,en])=>{
  const options=shuffle([id,...choose(pool.filter(x=>x[0]!==id)).map(x=>x[0])]);
  const answer=cats.find(c=>c.id===id);
  return ['أي نوع جغرافي يطابق الوصف التالي: '+ar,'Which geographical category matches: '+en,options.map(k=>cats.find(c=>c.id===k).ar),options.map(k=>cats.find(c=>c.id===k).en),options.indexOf(id),answer.ar+': '+ar,answer.en+': '+en];
 });
};
const isPlaceholder=t=>/معلم جغرافي|اضغط للخريطة|geographic feature|explore its map|مثال توضيحي|illustrative example/i.test(t);
const makeLocations=()=>{
 const categories=['deserts','rivers','waterfalls','forests','mountains','lakes','islands','volcanoes','seas','gulfs','straits','glaciers','valleys','grasslands'];
 const out=[];
 for(const id of categories){
  const entries=(geo[id]||[]).filter(x=>x[0]&&x[1]&&x[2]&&x[3]&&!isPlaceholder(x[2]+' '+x[3]));
  if(entries.length<4)continue;
  for(const target of entries){
   // Skip any description that names its own answer (in either language).
   const arStem='أي مكان يناسب الوصف التالي: '+target[2];
   const enStem='Which place fits this description: '+target[3];
   if(whole(arStem,target[0])||whole(enStem,target[1]))continue;
   const other=entries.filter(x=>x!==target&&normalize(x[0])!==normalize(target[0])&&normalize(x[1])!==normalize(target[1]));
   if(other.length<3)continue;
   const options=shuffle([target,...choose(other)]);
   const q=[arStem,enStem,options.map(x=>x[0]),options.map(x=>x[1]),options.indexOf(target),target[0]+': '+target[2],target[1]+': '+target[3]];
   if(safe(q,'locations'))out.push(q);
  }
 }
 return out;
};
bank.makeDefinitions=makeDefinitions;
bank.makeLocations=makeLocations;
const originalCreate=createGame;
const recentByMode={};
const identity=(q,mode)=>mode==='flags'?(q[7]||q[1]):mode==='mapfind'?q[7]:normalize(q[1]);
createGame=function(mode){
 const initial=originalCreate(mode);
 if(mode==='mapfind')return initial.filter(q=>safe(q,mode));
 let combined=initial.filter(q=>safe(q,mode));
 // A fresh validated supplement guards against older generator bugs.
 const supplement=mode==='mixed'
  ?[...bank.facts.map(bank.makeFact),...makeDefinitions(),...makeLocations(),...bank.makeClassify(),...bank.capitals.map(bank.makeCapital)]
  :mode==='definitions'?makeDefinitions()
  :mode==='locations'?makeLocations()
  :mode==='capitals'?bank.capitals.map(bank.makeCapital)
  :mode==='flags'?bank.capitals.map(bank.makeFlag)
  :mode==='classify'?bank.makeClassify()
  :[];
 const seen=new Set();
 const vetted=[];
 for(const q of [...combined,...shuffle(supplement)]){
  if(!safe(q,mode))continue;
  const id=identity(q,mode);if(seen.has(id))continue;
  seen.add(id);vetted.push(q);
  if(vetted.length>=12)break;
 }
 return vetted;
};
window.GeoVerseQuestionQualityV114={
 valid,safe,
 poolStats:()=>({definitions:makeDefinitions().filter(q=>safe(q,'definitions')).length,locations:makeLocations().length}),
 audit:questions=>questions.map((q,i)=>({index:i+1,safe:safe(q,'mixed')}))
};
})();