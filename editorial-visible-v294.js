/* GeoVerse v294 — single editorial display policy:
   All educational content visible by default; source/reference UI removed.
   Source URLs remain in project data, no impact on maps, games or progress. */
(function(){
'use strict';
const previousRender=render;
const isPage=()=>['detail','country-v4','tourism-detail','category'].includes(state.page);
const refTitle=/^(?:المراجع(?:\s+والمصادر)?|المصادر(?:\s+والمراجع)?|مصادر(?:\s+ومعلومات إضافية)?|المصدر(?:\s+العلمي|\s+الجغرافي)?|References?(?:\s+and\s+sources)?|Sources?(?:\s+and\s+(?:more\s+)?information)?|Scientific\s+(?:sources?|references?)|Geographic\s+source)$/i;
const readMore=/^(?:اقرأ\s+(?:المزيد|التفاصيل)|اعرف\s+المزيد|عرض\s+المزيد|Read\s+(?:more|the\s+full\s+.+)|Learn\s+more|More\s+details)/i;
const referenceLink=/(?:المراجع|مصادر|المصدر\s*(?:العلمي|الجغرافي|الأصلي)?|تفاصيل\s+الصورة\s+الأصلية|مرجع\s+علمي|References?|Sources?|Science\s+source|Scientific\s+source|Original\s+(?:source|image\s+details)|Read\s+source)/i;
let running=false,queued=false,observer=null;
function process(){
 if(running||!isPage())return;
 const root=document.getElementById('main');if(!root)return;
 running=true;
 try{
  // Dedicated reference-only blocks: remove container, preserve no redundant copies.
  root.querySelectorAll('.gv292-sources,.gv239-source,.gv244-credit,.gv-comprehensive-source,.gv9-sources,.gv14-image-credit,.gv-image-credit,.gv-source-note,.gv-figure-credit,.gv292-reference-links').forEach(el=>el.remove());
  // Keep explanatory paragraphs visible even if legacy templates placed them inside
  // misleading "Sources and more information" disclosure boxes.
  root.querySelectorAll('details').forEach(node=>{
    if(!node.isConnected||node.closest('.gv-quiz,.gv-game,.game-panel,.settings-panel'))return;
    const summary=node.querySelector(':scope > summary');
    if(!summary)return;
    const label=(summary.textContent||'').trim().replace(/[▼▾⌄↗◀▶]/g,'').trim();
    const source=refTitle.test(label);
    const hasEducationalContent=!!node.querySelector('p,ul,ol,table,.gv-wiki-summary,.gv242-depth-content,.gv-atlas-note');
    if(source&&!hasEducationalContent){node.remove();return}
    if(!node.open)node.open=true;
    node.classList.add('gv294-unfolded');
    if(source||readMore.test(label)){summary.remove();}
    else {
     const title=document.createElement('h3');
     title.className='gv294-unfolded-heading';
     title.textContent=label;summary.replaceWith(title);
    }
  });
  root.querySelectorAll('a').forEach(a=>{
    const txt=(a.textContent||'').trim();
    if(referenceLink.test(txt)){a.remove();return}
    if(a.closest('.gv-comprehensive-source,.gv9-sources,.gv-source-note'))a.remove();
  });
  // Remove empty source-only headings after links have been stripped.
  root.querySelectorAll('.gv-source-heading,.gv-comprehensive-source,.gv9-sources').forEach(el=>{
    if(referenceLink.test((el.textContent||'').trim())||!el.textContent?.trim())el.remove();
  });
 }finally{running=false}
}
function schedule(){
 if(queued)return;queued=true;
 requestAnimationFrame(()=>{queued=false;process()});
}
render=function(){const result=previousRender.apply(this,arguments);schedule();return result};
function start(){
 if(!document.getElementById('main'))return;
 observer=new MutationObserver(()=>schedule());
 observer.observe(document.getElementById('main'),{childList:true,subtree:true});
 schedule();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
window.GeoVerseReadingPolicyV294={refresh:schedule};
})();