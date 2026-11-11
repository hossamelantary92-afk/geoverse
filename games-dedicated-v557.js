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
   const descriptions={
      mixed:['أسئلة متنوعة من جغرافيا العالم','A mix of world geography questions'],
      capitals:['اختبر معرفتك بعواصم العالم','Test your knowledge of world capitals'],
      flags:['تعرّف على أعلام دول العالم','Recognize flags from around the world'],
      classify:['صنّف الأماكن والمعالم الجغرافية','Classify geographical places and landmarks'],
      definitions:['اكتشف المفاهيم الجغرافية','Discover geography concepts'],
      locations:['اختبر معرفتك بمواقع العالم','Test your knowledge of locations'],
      mapfind:['حدّد الدول مباشرة على الخريطة','Find countries directly on the map']
   };
   const desc=descriptions[selectedGameMode]||descriptions.mixed;
   const heading='<div class="gv557-game-header"><div class="gv557-game-name"><span class="gv557-game-eyebrow">GEOVERSE <span aria-hidden="true">✦</span> '+lang('الألعاب والتحديات','GAMES & CHALLENGES')+'</span><h1>'+escapeHTML(lang(meta[2],meta[3]))+'</h1><p>'+escapeHTML(lang(desc[0],desc[1]))+'</p></div>'+back+'</div>';
   // The game's name and description now live in the new header; no duplicate heading.
   const gameBody=html.slice(end+6).replace(/<div class="page-heading">[\\s\\S]*?<\\/div>/, '');
   // Keep existing level control at top; remove large directory cards from quiz screen.
   return '<section class="gv557-game-detail" data-game-mode="'+selectedGameMode+'">'+heading+html.slice(0,start)+gameBody+'</section>';
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
