/* GeoVerse v557: dedicated game screens, without altering question-bank logic. */
(function(){
 'use strict';
 const previousPlay=play;
 const oldRender=render;
 const names=Object.fromEntries(gameModes.map(g=>[g[0],g]));
 play=function(){
   const html=previousPlay();
   const marker='<div class="game-modes">';
   const start=html.indexOf(marker);
   if(start<0)return html;
   const end=html.indexOf('</div>',start);
   if(end<0)return html;
   if(!gameStarted){
     // Difficulty is a per-game setting, not an element of the games directory.
     return '<section class="gv557-games-home" aria-label="'+lang('اختر لعبة','Choose a game')+'"><div class="gv557-title"><h1>'+lang('الألعاب والتحديات','Games & Challenges')+'</h1><p>'+lang('اختبر معرفتك واكتشف العالم بطريقة ممتعة','Test your knowledge and explore the world in a fun way')+'</p></div>'+html.slice(start)+'</section>';
   }
   const meta=names[selectedGameMode]||names.mixed;
   const back='<button type="button" class="gv557-back" data-gv557-back aria-label="'+lang('العودة إلى جميع الألعاب','Back to all games')+'"><span aria-hidden="true">‹</span>'+lang('جميع الألعاب','All games')+'</button>';
   const heading='<div class="gv557-game-header">'+back+'<h1>'+lang(meta[2],meta[3])+'</h1></div>';
   // Keep existing level control at top; remove large directory cards from quiz screen.
   return '<section class="gv557-game-detail" data-game-mode="'+selectedGameMode+'">'+heading+html.slice(0,start)+html.slice(end+6)+'</section>';
 };
 render=function(){
   oldRender();
   if(state.page==='play'){
     document.body.classList.toggle('gv557-playing',!!gameStarted);
     document.body.classList.toggle('gv557-directory',!gameStarted);
   }else{
     document.body.classList.remove('gv557-playing','gv557-directory');
   }
 };
 document.addEventListener('click',function(event){
   const back=event.target.closest?.('[data-gv557-back]');
   if(!back)return;
   event.preventDefault();
   event.stopImmediatePropagation();
   gameStarted=false;
   state.quizIndex=0;state.quizScore=0;state.quizSelected=null;state.quizComplete=false;
   if(state.map){state.map.remove();state.map=null;}
   window.scrollTo(0,0);
   render();
 },true);
})();
