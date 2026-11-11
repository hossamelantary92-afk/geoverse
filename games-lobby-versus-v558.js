/* GeoVerse v558 — game lobby, two-player turn-taking and per-question countdown.
   Works with the existing game banks and v557 dedicated-game screen. */
(function(){
 'use strict';
 const priorPlay=play;
 const priorRender=render;
 let roundStarted=false, matchMode='solo', seconds=0;
 let activePlayer=1, scores=[0,0], names=['اللاعب 1','اللاعب 2'];
 let clock=null,deadline=0,timeLeft=0;

 function stopClock(){
   if(clock!==null){clearInterval(clock);clock=null;}
   deadline=0;
 }
 function resetMatch(){
   stopClock();roundStarted=false;activePlayer=1;scores=[0,0];
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
       stopClock();
       if(state.quizSelected===null){state.quizSelected=-1;render();}
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
   const lobby='<div class="gv558-lobby">'+
     '<div class="gv558-config"><h2>'+T('وضع اللعب','Game mode')+'</h2>'+playerOptions+'</div>'+
     (matchMode==='versus'?'<div class="gv558-config"><h2>'+T('اللاعبون','Players')+'</h2><div class="gv558-names"><input data-gv558-name="0" maxlength="24" autocomplete="off" placeholder="'+T('اللاعب الأول','Player 1')+'" value="'+escape(names[0])+'"><input data-gv558-name="1" maxlength="24" autocomplete="off" placeholder="'+T('اللاعب الثاني','Player 2')+'" value="'+escape(names[1])+'"></div></div>':'')+
     '<div class="gv558-config"><h2>'+T('وقت الإجابة لكل سؤال','Time per question')+'</h2>'+durationOptions+'</div>'+
     '<button type="button" id="gv558-start" class="gv558-start">'+T('ابدأ اللعبة','Start game')+' <span aria-hidden="true">←</span></button>'+
     '<p class="gv558-note">'+(matchMode==='versus'?T('12 سؤالًا بالتناوب، 6 أسئلة لكل لاعب.','12 alternating questions, 6 per player.'):T('12 سؤالًا لاختبار معلوماتك.','12 questions to test your knowledge.'))+'</p>'+
     '</div>';
   return lead+lobby+'</section>';
 }
 function result(html){
   const point=html.indexOf('<div class="quiz-card');
   if(point<0)return html;
   const lead=html.slice(0,point);
   const winner=scores[0]===scores[1]?T('تعادل!','It’s a tie!'):
     escape(names[scores[0]>scores[1]?0:1])+' '+T('هو الفائز!','wins!');
   const panel='<section class="gv558-final" aria-live="polite"><span class="gv558-trophy" aria-hidden="true">🏆</span>'+
     '<h2>'+T('انتهت المنافسة','Match complete')+'</h2><p class="gv558-winner">'+winner+'</p>'+
     '<div class="gv558-final-scores"><div><span>'+escape(names[0])+'</span><strong>'+scores[0]+'</strong></div><div><span>'+escape(names[1])+'</span><strong>'+scores[1]+'</strong></div></div>'+
     '<button id="gv558-rematch" type="button" class="gv558-start">'+T('إعادة المباراة','Play again')+'</button></section>';
   return lead+panel+'</section>';
 }
 function scoreboard(){
   let html='<div class="gv558-scorebar">';
   if(matchMode==='versus'){
     html+='<div class="gv558-player '+(activePlayer===1?'current':'')+'"><span>'+escape(names[0])+'</span><strong>'+scores[0]+'</strong></div>'+
       '<span class="gv558-turn">'+T('دور','Turn')+' '+escape(names[activePlayer-1])+'</span>'+
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
     resetQuestion();scores=[0,0];activePlayer=1;
     quiz=createGame(selectedGameMode);
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
     onAnswer(Number(b.dataset.answer)===quiz[state.quizIndex]?.[4]);
     return;
   }
   if(selectedGameMode==='mapfind'&&state.quizSelected===null){
     const correct=mapAnswerIsCorrect(target);
     if(correct!==null){onAnswer(correct);return;}
   }
   if(b?.id==='nextQuiz'){
     stopClock();
     if(matchMode==='versus'&&state.quizIndex<quiz.length-1)activePlayer=activePlayer===1?2:1;
     // The existing handler advances the question and calls render.
     queueMicrotask(()=>{if(roundStarted&&!state.quizComplete&&state.quizSelected===null){timeLeft=seconds;startClock();}});
   }
   if(b?.id==='restartQuiz'){
     event.preventDefault();event.stopImmediatePropagation();
     resetMatch();resetQuestion();render();return;
   }
 },true);
 // Preserve names while typing, including a later mode/timer re-render.
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
