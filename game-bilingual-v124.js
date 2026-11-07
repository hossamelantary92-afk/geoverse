/* GeoVerse v124 — educational bilingual choices in all four-answer games.
 * English first, Arabic second; question language and scoring remain unchanged.
 */
(function(){
'use strict';
const previousPlay=play;
play=function(){
 const html=previousPlay();
 if(!gameStarted||state.quizComplete||selectedGameMode==='mapfind')return html;
 const current=quiz[state.quizIndex];
 if(!current||!Array.isArray(current[2])||!Array.isArray(current[3]))return html;
 let choiceIndex=0;
 return html.replace(/(<button\b[^>]*\bclass="[^"]*\bquiz-choice\b[^"]*"[^>]*>)([\s\S]*?)(<\/button>)/g,(match,open,oldBody,close)=>{
  const i=choiceIndex++;
  if(i>=4||typeof current[2][i]!=='string'||typeof current[3][i]!=='string')return match;
  const en=current[3][i].trim(),ar=current[2][i].trim();
  if(!en||!ar)return match;
  const check=state.quizSelected!==null&&i===current[4]?'<span class="gv124-check" aria-hidden="true">✓</span>':'';
  return open+'<span class="gv124-choice-text"><span class="gv124-choice-en" lang="en" dir="ltr">'+escapeHTML(en)+'</span><span class="gv124-choice-ar" lang="ar" dir="rtl">'+escapeHTML(ar)+'</span></span>'+check+close;
 });
};
window.GeoVerseBilingualChoicesV124={enabled:true,order:'English / Arabic'};
})();