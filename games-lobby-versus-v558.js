/* GeoVerse v558 — game lobby, two-player turn-taking and per-question countdown.
   Works with the existing game banks and v557 dedicated-game screen. */
(function(){
 'use strict';
 const priorPlay=play;
 const priorRender=render;
 let roundStarted=false, matchMode='solo', seconds=0;
 let activePlayer=1, scores=[0,0], names=['اللاعب 1','اللاعب 2'];
 let clock=null,deadline=0,timeLeft=0;
 let region='all',regionMap=new Map(),misses=[],roundWarning='';
 const continentModes=new Set(['capitals','flags','mapfind']);
 const regionNames={all:['العالم كله','World'],Asia:['آسيا','Asia'],Europe:['أوروبا','Europe'],Africa:['أفريقيا','Africa'],'North America':['أمريكا الشمالية','North America'],'South America':['أمريكا الجنوبية','South America'],Oceania:['أوقيانوسيا','Oceania']};
 fetch('./country-meta.json?v=gv562-regions').then(r=>r.ok?r.json():Promise.reject()).then(data=>{
  regionMap=new Map((data.countries||[]).filter(c=>c.code&&c.continent).map(c=>[c.code.toUpperCase(),c]));
 }).catch(()=>{region='all';});
 function codeFor(q,mode){
  if(mode==='flags')return String(q[7]||'').toUpperCase();
  if(mode==='capitals'){
   const name=String(q[1]||'').replace(/^What is the capital of\s+/i,'').replace(/\?$/,'').trim();
   return [...regionMap.values()].find(r=>r.name.toLowerCase()===name.toLowerCase())?.code||'';
  }
  if(mode==='mapfind'){
   const name=String(q[7]||'').trim();
   return [...regionMap.values()].find(r=>r.name.toLowerCase()===name.toLowerCase())?.code||'';
  }
  return '';
 }
 function reviewRecord(index){
   if(index<0||index>=quiz.length||misses.some(r=>r.index===index))return;
   const q=quiz[index];
   misses.push({index,question:q[0],en:q[1],answer:q[2]?.[q[4]]||q[7]||'',answerEn:q[3]?.[q[4]]||q[7]||'',info:q[5]||'',infoEn:q[6]||''});
 }

 function stopClock(){
   if(clock!==null){clearInterval(clock);clock=null;}
   deadline=0;
 }
 function resetMatch(){
   stopClock();roundStarted=false;activePlayer=1;scores=[0,0];misses=[];roundWarning='';
 }
 function resetQuestion(){
   state.quizIndex=0;state.quizScore=0;state.quizSelected=null;state.quizComplete=false;
 }
 const T=(ar,en)=>lang(ar,en);
 const escape=escapeHTML;
 function startClock(){
   stopClock();
   if(!roundStarted||seconds===0||state.page!=='play'||state.quizComplete||state.quizSelected!==null)return;
   timeLeft=seconds;deadline=Date.now()+seconds*1000;
   const tick=()=>{
     if(!roundStarted||state.page!=='play'||state.quizComplete||state.quizSelected!==null){stopClock();return;}
     timeLeft=Math.max(0,Math.ceil((deadline-Date.now())/1000));
     const counter=document.getElementById('gv558-clock');
     if(counter){counter.textContent=String(timeLeft);counter.classList.toggle('gv558-urgent',timeLeft<=5);}
     if(timeLeft<=0){
       timeLeft=0;
       stopClock();
       if(state.quizSelected===null){reviewRecord(state.quizIndex);state.quizSelected=-1;render();}
     }
   };
   clock=setInterval(tick,200);
   tick();
 }
 function gameShell(html){
   const point=html.indexOf('<div class="quiz-card');
   if(point<0)return null;
   return html.slice(0,point);
 }
 function buildRound(mode,count){
   const picked=[],seen=new Set();
   const key=q=>mode==='flags'||mode==='mapfind'?String(q[7]||q[1]):String(q[1]||q[0]).trim().toLowerCase();
   const filtering=region!=='all'&&continentModes.has(mode)&&regionMap.size>0;
   const add=pool=>{
     for(const q of Array.isArray(pool)?pool:[]){
       if(!Array.isArray(q)||!q[0]||!q[1])continue;
       if(filtering&&regionMap.get(codeFor(q,mode)?.toUpperCase())?.continent!==region)continue;
       const k=key(q);if(seen.has(k))continue;
       seen.add(k);picked.push(q);if(picked.length>=count)break;
     }
   };
   for(let attempt=0;attempt<24&&picked.length<count;attempt++)add(createGame(mode));
   if(picked.length<count&&mode==='definitions'){
     const bank=window.GeoVerseQuestionPools;
     add(bank?.makeDefinitions?.());
   }
   // Never duplicate to fill a round; the user can change region/difficulty instead.
   roundWarning=picked.length<count?T('لا يوجد عدد كافٍ من الأسئلة الفريدة لهذا الاختيار. جرّب قارة أو مستوى آخر.','Not enough distinct questions for this setting. Try another region or level.'):'';
   return picked.length===count?picked:[];
 }
 function reviewPanel(){
   if(!misses.length)return '<section class="gv562-review"><h3>'+T('مراجعة الإجابات','Answer review')+'</h3><p>'+T('أحسنت! لم تُسجل إجابات خاطئة.','Well done! No incorrect answers.')+'</p></section>';
   return '<section class="gv562-review"><h3>'+T('راجع إجاباتك','Review your answers')+' ('+misses.length+')</h3>'+
     misses.map(row=>'<article><strong>'+escape(T(row.question,row.en))+'</strong><p><b>'+T('الإجابة الصحيحة: ','Correct answer: ')+escape(T(row.answer,row.answerEn))+'</b></p><small>'+escape(T(row.info,row.infoEn))+'</small></article>').join('')+'</section>';
 }
 function levelOrDefault(){
   return window.GeoVerseGameV110?.getDifficulty?.()||'medium';
 }
 function renderLobby(html){
   const lead=gameShell(html);
   if(lead===null)return html;
   const playerOptions='<div class="gv558-options" role="group" aria-label="'+T('وضع اللعب','Game mode')+'">'+
     [['solo',T('فردي','Solo')],['versus',T('لاعبان','Two players')]].map(([id,label])=>
       '<button type="button" data-gv558-mode="'+id+'" class="'+(matchMode===id?'selected':'')+'" aria-pressed="'+(matchMode===id)+'">'+label+'</button>').join('')+'</div>';
   const durationOptions='<div class="gv558-options gv558-time-options" role="group" aria-label="'+T('مؤقت السؤال','Question timer')+'">'+
     [0,15,20,30].map(n=>'<button type="button" data-gv558-seconds="'+n+'" class="'+(seconds===n?'selected':'')+'" aria-pressed="'+(seconds===n)+'">'+(n===0?T('بدون توقيت','No timer'):n+' '+T('ث','sec'))+'</button>').join('')+'</div>';
   const area=continentModes.has(selectedGameMode)?'<div class="gv558-config"><h2>'+T('النطاق الجغرافي','Geographical region')+'</h2><select id="gv562-region" class="gv562-region">'+Object.entries(regionNames).map(([k,labels])=>'<option value="'+k+'" '+(k===region?'selected':'')+'>'+escape(T(labels[0],labels[1]))+'</option>').join('')+'</select></div>':'';
   const lobby='<div class="gv558-lobby">'+area+
     '<div class="gv558-config"><h2>'+T('وضع اللعب','Game mode')+'</h2>'+playerOptions+'</div>'+
     (matchMode==='versus'?'<div class="gv558-config"><h2>'+T('اللاعبون','Players')+'</h2><div class="gv558-names"><input data-gv558-name="0" maxlength="24" autocomplete="off" placeholder="'+T('اللاعب الأول','Player 1')+'" value="'+escape(names[0])+'"><input data-gv558-name="1" maxlength="24" autocomplete="off" placeholder="'+T('اللاعب الثاني','Player 2')+'" value="'+escape(names[1])+'"></div></div>':'')+
     '<div class="gv558-config"><h2>'+T('وقت الإجابة لكل سؤال','Time per question')+'</h2>'+durationOptions+'</div>'+
     (roundWarning?'<p class="gv562-warning" role="alert">'+escape(roundWarning)+'</p>':'')+
     '<button type="button" id="gv558-start" class="gv558-start">'+T('ابدأ اللعبة','Start game')+' <span aria-hidden="true">←</span></button>'+
     '<p class="gv558-note">'+(matchMode==='versus'?T('20 سؤالًا بالتبادل، 10 أسئلة لكل لاعب.','20 alternating questions, 10 per player.'):T('10 أسئلة لاختبار معلوماتك.','10 questions to test your knowledge.'))+'</p>'+
     '</div>';
   return lead+lobby+'</section>';
 }
 function result(html){
   const point=html.indexOf('<div class="quiz-card');
   if(point<0)return html;
   const lead=html.slice(0,point);
   const tied=scores[0]===scores[1];
   const winnerIndex=scores[0]>scores[1]?0:1;
   const winnerName=escape(names[winnerIndex]);
   const particles=Array.from({length:18},(_,i)=>'<i style="--i:'+i+';--angle:'+(i*20)+'deg" aria-hidden="true"></i>').join('');
   const emblem=tied
     ?'<span class="gv561-symbol gv561-equal" aria-hidden="true">=</span>'
     :'<span class="gv561-symbol gv561-cup" aria-hidden="true">🏆</span>';
   const headline=tied?T('تعادل رائع!','A great tie!'):T('تهانينا للفائز!','Congratulations!');
   const description=tied
     ?T('منافسة متكافئة حتى آخر سؤال','An evenly matched challenge to the final question')
     :T('أداء مميز واستحقاق للفوز','An outstanding winning performance');
   const resultLine=tied
     ?T('اللاعبان تقاسما الصدارة','Both players share first place')
     :winnerName+' '+T('يتصدر المنافسة','takes the win');
   const panel='<section class="gv558-final gv561-celebration '+(tied?'gv561-draw':'gv561-victory')+'" aria-live="polite">'+
     '<div class="gv561-particles" aria-hidden="true">'+particles+'</div>'+
     '<div class="gv561-medallion">'+emblem+'</div>'+
     '<span class="gv561-kicker">'+T('النتيجة النهائية','FINAL RESULT')+'</span>'+
     '<h2>'+headline+'</h2><p class="gv561-highlight">'+resultLine+'</p>'+
     '<p class="gv561-subtitle">'+description+'</p>'+
     '<div class="gv558-final-scores">'+
       '<div class="'+(!tied&&winnerIndex===0?'gv561-champion':'')+'"><span>'+escape(names[0])+'</span><strong>'+scores[0]+'</strong></div>'+
       '<div class="'+(!tied&&winnerIndex===1?'gv561-champion':'')+'"><span>'+escape(names[1])+'</span><strong>'+scores[1]+'</strong></div>'+
     '</div>'+
     '<button id="gv558-rematch" type="button" class="gv558-start">'+T('العب مباراة جديدة','New match')+'</button>'+
     '</section>';
   return lead+panel+reviewPanel()+'</section>';
 }
 function scoreboard(){
   let html='<div class="gv558-scorebar">';
   if(matchMode==='versus'){
     html+='<div class="gv558-player '+(activePlayer===1?'current':'')+'"><span>'+escape(names[0])+'</span><strong>'+scores[0]+'</strong></div>'+
       '<span class="gv558-turn"><span>'+T('الدور الحالي','Current turn')+'</span><b>'+escape(names[activePlayer-1])+'</b></span>'+
       '<div class="gv558-player '+(activePlayer===2?'current':'')+'"><span>'+escape(names[1])+'</span><strong>'+scores[1]+'</strong></div>';
   }else{
     html+='<div class="gv558-solo-score">'+T('نقاطك','Your score')+': <strong>'+state.quizScore+'</strong></div>';
   }
   if(seconds>0)html+='<div class="gv558-timer" aria-live="off"><span aria-hidden="true">◷</span> <strong id="gv558-clock">'+timeLeft+'</strong> '+T('ث','s')+'</div>';
   return html+'</div>';
 }
 play=function(){
   const html=priorPlay();
   if(!gameStarted||state.page!=='play')return html;
   if(!roundStarted)return renderLobby(html);
   if(state.quizComplete&&matchMode==='versus')return result(html);
   if(state.quizComplete&&matchMode==='solo')return html.replace(/<\/section>\s*$/, '')+reviewPanel()+'</section>';
   const slot=html.indexOf('<div class="quiz-card');
   if(slot<0)return html;
   return html.slice(0,slot)+scoreboard()+html.slice(slot);
 };
 render=function(){
   priorRender();
   if(state.page!=='play'||!gameStarted){stopClock();roundStarted=false;}
 };
 function onAnswer(correct){
   if(!roundStarted||state.quizSelected!==null)return;
   if(matchMode==='versus'&&correct)scores[activePlayer-1]++;
   // Freeze the countdown immediately, before the question is re-rendered.
   if(seconds>0&&deadline>0)timeLeft=Math.max(0,Math.ceil((deadline-Date.now())/1000));
   stopClock();
 }
 function mapAnswerIsCorrect(target){
   const country=target.closest?.('[data-map-country]');
   if(!country||!atlasRuntime?.features||!quiz[state.quizIndex])return null;
   const entry=atlasRuntime.features[Number(country.dataset.mapCountry)];
   if(!entry)return null;
   const alias={'United States of America':'United States','United Republic of Tanzania':'Tanzania','Czech Republic':'Czechia','Ivory Coast':'Côte d’Ivoire','Republic of the Congo':'Congo','Democratic Republic of the Congo':'DR Congo'};
   const got=alias[entry.properties.name]||entry.properties.name;
   return got.toLowerCase()===String(quiz[state.quizIndex][7]).toLowerCase();
 }
 // Capture phase coordinates with existing app.js bubble handlers without rewriting banks.
 document.addEventListener('click',function(event){
   const target=event.target;
   const b=target.closest?.('button');
   if(b?.dataset.game||target.closest?.('[data-gv17-game]')){
     resetMatch();return;
   }
   if(b?.dataset.page&&b.dataset.page!=='play'){
     resetMatch();return;
   }
   if(target.closest?.('[data-gv557-back]')){
     resetMatch();return;
   }
   if(target?.id==='gv562-region'){
     region=target.value;roundWarning='';return;
   }
   const mode=b?.dataset.gv558Mode;
   if(mode==='solo'||mode==='versus'){
     event.preventDefault();event.stopImmediatePropagation();
     matchMode=mode;render();return;
   }
   const timer=b?.dataset.gv558Seconds;
   if(timer!==undefined){
     event.preventDefault();event.stopImmediatePropagation();
     seconds=Number(timer);render();return;
   }
   if(b?.id==='gv558-start'){
     event.preventDefault();event.stopImmediatePropagation();
     document.querySelectorAll('[data-gv558-name]').forEach(input=>{
       const i=Number(input.dataset.gv558Name);
       names[i]=input.value.trim().slice(0,24)||(i===0?T('اللاعب 1','Player 1'):T('اللاعب 2','Player 2'));
     });
     resetQuestion();scores=[0,0];activePlayer=1;misses=[];roundWarning='';
     quiz=buildRound(selectedGameMode,matchMode==='versus'?20:10);
     if(!quiz.length){roundStarted=false;render();return;}
     roundStarted=true;timeLeft=seconds;render();startClock();return;
   }
   if(b?.id==='gv558-rematch'){
     event.preventDefault();event.stopImmediatePropagation();
     resetMatch();resetQuestion();render();return;
   }
   if(!roundStarted||state.page!=='play'||state.quizComplete)return;
   if(b?.dataset.gv110Level){
     resetMatch();return;
   }
   if(b?.dataset.answer!==undefined&&state.quizSelected===null){
     const correct=Number(b.dataset.answer)===quiz[state.quizIndex]?.[4];
     if(!correct)reviewRecord(state.quizIndex);
     onAnswer(correct);
     return;
   }
   if(selectedGameMode==='mapfind'&&state.quizSelected===null){
     const correct=mapAnswerIsCorrect(target);
     if(correct!==null){if(!correct)reviewRecord(state.quizIndex);onAnswer(correct);return;}
   }
   if(b?.id==='nextQuiz'){
     stopClock();
     // Each question receives a completely fresh countdown.
     timeLeft=seconds;
     if(matchMode==='versus'&&state.quizIndex<quiz.length-1)activePlayer=activePlayer===1?2:1;
     // The existing handler advances the question and calls render.
     // Allow the legacy bubble handler to advance and re-render first.
     // A microtask here can run before the DOM update on Safari.
     setTimeout(()=>{
       if(roundStarted&&state.page==='play'&&!state.quizComplete&&state.quizSelected===null){
         timeLeft=seconds;startClock();
       }
     },0);
   }
   if(b?.id==='restartQuiz'){
     event.preventDefault();event.stopImmediatePropagation();
     resetMatch();resetQuestion();render();return;
   }
 },true);
 // Preserve names while typing, including a later mode/timer re-render.
 document.addEventListener('change',function(event){
   if(event.target?.id==='gv562-region'){region=event.target.value;roundWarning='';}
 },true);
 document.addEventListener('input',function(event){
   const input=event.target.closest?.('[data-gv558-name]');
   if(input){const i=Number(input.dataset.gv558Name);names[i]=input.value.slice(0,24);}
 },true);
 document.addEventListener('visibilitychange',function(){
   if(!document.hidden&&clock!==null){
     // Use the original wall-clock deadline, so backgrounding cannot grant extra time.
     const counter=document.getElementById('gv558-clock');
     if(counter)counter.textContent=String(Math.max(0,Math.ceil((deadline-Date.now())/1000)));
   }
 });
 window.GeoVerseGameLobbyV558={getState:()=>({roundStarted,matchMode,seconds,activePlayer,scores:scores.slice(),level:levelOrDefault()})};
})();
