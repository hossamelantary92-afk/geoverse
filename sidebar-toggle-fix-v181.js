/* GeoVerse v181 — reliable same-button open/close for the mobile sidebar.
 * Capture before legacy delegated click listeners to avoid double toggle.
 */
(function(){
'use strict';
const ids=new Set(['menuBtn','menuTopics']);
function getSidebar(){return document.getElementById('sidebar')}
function setOpen(open){
 const sidebar=getSidebar();if(!sidebar)return;
 sidebar.classList.toggle('open',open);
 document.querySelectorAll('#menuBtn,#menuTopics').forEach(button=>{
  button.setAttribute('aria-expanded',String(open));
  button.setAttribute('aria-controls','sidebar');
  button.setAttribute('aria-label',open?'إغلاق قائمة الأقسام':'فتح قائمة الأقسام');
 });
}
document.addEventListener('click',event=>{
 const button=event.target.closest?.('button');
 if(button&&ids.has(button.id)){
  event.preventDefault();event.stopImmediatePropagation();
  setOpen(!getSidebar()?.classList.contains('open'));
  return;
 }
 const sidebar=getSidebar();
 if(!sidebar?.classList.contains('open'))return;
 if(event.target.closest?.('#sidebar'))return;
 setOpen(false);
},true);
document.addEventListener('keydown',event=>{
 if(event.key==='Escape'&&getSidebar()?.classList.contains('open'))setOpen(false);
});
document.querySelectorAll('#menuBtn,#menuTopics').forEach(button=>{
 button.setAttribute('aria-controls','sidebar');
 button.setAttribute('aria-expanded','false');
});
})();
