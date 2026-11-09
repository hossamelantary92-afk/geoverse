/* GeoVerse v396 — Oceans and seas Phase 1: compact mobile atlas landing.
 * Scoped to category pages only. Preserves approved photos, detailed reading,
 * ocean markers and all navigation. */
(function(){
'use strict';
if(typeof render!=='function'||typeof state==='undefined')return;
const css=document.createElement('style');css.id='gv396-marine-landing';
css.textContent=`
#main.gv396-marine .topic-intro{padding:clamp(15px,3vw,22px)!important;margin:13px 0!important;border-radius:19px!important}
#main.gv396-marine .topic-intro h2{font-size:clamp(21px,5vw,28px)!important;line-height:1.45!important;margin:7px 0 10px!important}
#main.gv396-marine .topic-intro>p{font-size:clamp(13px,3.4vw,15px)!important;line-height:1.8!important;margin:0!important}
#main.gv396-marine #categoryFilter{box-sizing:border-box;width:100%;max-width:100%;min-width:0;min-height:51px;border-radius:15px!important;margin:13px 0 14px!important}
#main.gv396-marine #categoryItems{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:14px!important;align-items:stretch}
#main.gv396-marine #categoryItems>.gv13-place{box-sizing:border-box;width:100%;min-width:0;max-width:100%;min-height:300px;border-radius:19px;border-color:rgba(82,183,199,.52);background:linear-gradient(155deg,#10394d,#082538);box-shadow:0 10px 25px rgba(0,12,25,.16)}
#main.gv396-marine #categoryItems>.gv13-place .gv13-photo{min-height:185px;height:185px;flex:0 0 185px;background:linear-gradient(140deg,#0a4055,#082438)}
#main.gv396-marine #categoryItems>.gv13-place .gv13-photo img{width:100%!important;height:100%!important;object-fit:cover!important}
#main.gv396-marine #categoryItems>.gv13-place .gv13-text{min-height:130px;padding:13px 15px;gap:7px}
#main.gv396-marine #categoryItems>.gv13-place .gv13-name{font-size:clamp(15px,1.8vw,19px);line-height:1.55}
#main.gv396-marine #categoryItems>.gv13-place .gv13-intro{font-size:12px;line-height:1.75;min-height:39px}
#main.gv396-marine #categoryItems>.gv13-place .gv13-footer{font-size:11px}
body.light #main.gv396-marine #categoryItems>.gv13-place{background:linear-gradient(150deg,#f0fafb,#e1f2f4);border-color:#b2d4d9}
body.light #main.gv396-marine #categoryItems>.gv13-place .gv13-name{color:#143e50}
@media(max-width:820px){
 #main.gv396-marine,#main.gv396-marine #categoryItems{min-width:0!important;max-width:100%!important}
 #main.gv396-marine #categoryItems{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:11px!important}
 #main.gv396-marine #categoryItems>.gv13-place{min-height:255px;border-radius:16px}
 #main.gv396-marine #categoryItems>.gv13-place .gv13-photo{height:150px;min-height:150px;flex-basis:150px}
 #main.gv396-marine #categoryItems>.gv13-place .gv13-text{padding:11px 12px;min-height:115px}
 #main.gv396-marine #categoryItems>.gv13-place .gv13-name{font-size:clamp(13px,3.8vw,17px)}
 #main.gv396-marine #categoryItems>.gv13-place .gv13-intro{font-size:11px}
 #main.gv396-marine #categoryItems>.gv13-place .gv13-footer{font-size:10px}
 /* Odd final item receives the full width, never a small isolated card. */
 #main.gv396-marine #categoryItems>.gv13-place:last-child:nth-child(odd){
   grid-column:1/-1!important;justify-self:stretch!important;width:100%!important;
   display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,1fr)!important;
   min-height:175px!important;
 }
 #main.gv396-marine #categoryItems>.gv13-place:last-child:nth-child(odd) .gv13-photo{
   height:100%!important;min-height:175px!important;flex-basis:auto!important;
   border-bottom:0!important;border-inline-end:1px solid #326b8072;
 }
 #main.gv396-marine #categoryItems>.gv13-place:last-child:nth-child(odd) .gv13-text{
   min-width:0;min-height:175px;padding:12px 10px;justify-content:center;
 }
}
@media(max-width:380px){
 #main.gv396-marine #categoryItems{gap:8px!important}
 #main.gv396-marine #categoryItems>.gv13-place .gv13-photo{height:135px;min-height:135px;flex-basis:135px}
 #main.gv396-marine #categoryItems>.gv13-place .gv13-text{padding:9px;gap:5px}
 #main.gv396-marine #categoryItems>.gv13-place .gv13-name{font-size:13px}
}
`;
document.head.appendChild(css);
function apply(){
 const main=document.getElementById('main');
 if(!main)return;
 const active=state.page==='category'&&(state.category==='oceans'||state.category==='seas');
 main.classList.toggle('gv396-marine',active);
 if(!active)return;
 const intro=main.querySelector('.topic-intro');
 if(intro){
   const title=intro.querySelector('h2'),description=intro.querySelector(':scope>p');
   if(title)title.textContent=state.lang==='ar'?(state.category==='oceans'?'استكشف محيطات العالم':'استكشف بحار العالم'):(state.category==='oceans'?'Explore the world’s oceans':'Explore the world’s seas');
   if(description)description.textContent=state.lang==='ar'?(state.category==='oceans'?'تعرّف على المحيطات الخمسة ومواقعها وأبرز خصائصها.':'تعرّف على أهم البحار ومواقعها وصلاتها بالمحيطات.'):(state.category==='oceans'?'Discover the five oceans, their locations and distinctive features.':'Explore major seas, their locations and connections to the oceans.');
 }
}
const prior=render;
render=function(){const result=prior.apply(this,arguments);apply();return result};
apply();
})();