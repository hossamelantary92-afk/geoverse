/* GeoVerse v217 — the duplicate topics sidebar has been retired.
 * Keep the mobile shortcut functional without showing the legacy menu.
 */
(function(){
'use strict';
document.addEventListener('click',event=>{
 const button=event.target.closest?.('button#menuBtn,button#menuTopics');
 if(!button)return;
 event.preventDefault();
 event.stopImmediatePropagation();
 document.getElementById('sidebar')?.classList.remove('open');
 if(typeof setPage==='function')setPage('all');
},true);
document.querySelectorAll('#menuBtn,#menuTopics').forEach(button=>{
 button.removeAttribute('aria-controls');
 button.removeAttribute('aria-expanded');
 button.setAttribute('aria-label','جميع الأقسام');
 button.setAttribute('title','جميع الأقسام');
});
})();