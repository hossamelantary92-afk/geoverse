/* GeoVerse v554 — unify the learning action in all detail templates.
 * Original #toggleSeen is moved, not recreated, preserving the existing
 * delegated click handler, progress state, keyboard behavior and aria-pressed.
 */
(function(){
'use strict';
if(typeof render!=='function'||typeof state==='undefined')return;
const earlierRender=render;
function positionLearned(){
 if(state.page!=='detail')return;
 const main=document.getElementById('main');
 if(!main)return;
 const button=main.querySelector('button#toggleSeen');
 if(!button)return;
 // If a detail layout has other material after the button, preserve it.
 // Place the common completion action at the very end of its page content.
 const parent=button.closest('.gv14-detail');
 const destination=parent||main;
 let footer=destination.querySelector(':scope > .gv554-learn-footer');
 if(!footer){
  footer=document.createElement('div');
  footer.className='gv554-learn-footer';
  footer.setAttribute('role','group');
  destination.appendChild(footer);
 }else if(footer!==destination.lastElementChild){
  destination.appendChild(footer);
 }
 footer.appendChild(button);
 const ar=state.lang!=='en';
 const isPressed=button.getAttribute('aria-pressed')==='true';
 button.textContent=ar?'تعلمت ✅':'Learned ✅';
 button.setAttribute('aria-pressed',isPressed?'true':'false');
 button.setAttribute('aria-label',ar?
  (isPressed?'تم التعلّم، اضغط لإلغاء العلامة':'تعلمت، اضغط لتسجيل التقدّم'):
  (isPressed?'Learned. Press to unmark':'Learned. Press to mark progress'));
}
render=function(){
 const result=earlierRender.apply(this,arguments);
 positionLearned();
 return result;
};
positionLearned();
})();