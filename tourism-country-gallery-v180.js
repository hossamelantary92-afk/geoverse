/* GeoVerse v180 — tourism catalogue by country; preserve existing card/photo pipeline. */
(function(){
'use strict';
if(typeof itemCards!=='function')return;
const previous=itemCards;
const codes=['EG','FR','IT','SA','TR','ES','GB','US','CN','IN','JP','AE'];
const names=[
 ['مصر','Egypt'],['فرنسا','France'],['إيطاليا','Italy'],['السعودية','Saudi Arabia'],
 ['تركيا','Turkey'],['إسبانيا','Spain'],['المملكة المتحدة','United Kingdom'],
 ['الولايات المتحدة','United States'],['الصين','China'],['الهند','India'],
 ['اليابان','Japan'],['الإمارات','United Arab Emirates']
];
let selected='';
const t=(ar,en)=>state.lang==='ar'?ar:en;
function showSelection(){
 if(state.page!=='category'||state.category!=='tourism')return;
 const root=document.querySelector('#categoryItems .gv180-tourism');
 if(!root)return;
 let visible=0;
 root.querySelectorAll('.gv180-country-group').forEach(section=>{
  const show=!selected||section.dataset.gv180Group===selected;
  section.hidden=!show;
  if(show)visible+=Number(section.dataset.count)||0;
 });
 root.querySelectorAll('[data-gv180-pick]').forEach(button=>{
  const active=button.dataset.gv180Pick===selected;
  button.classList.toggle('is-active',active);
  button.setAttribute('aria-pressed',String(active));
 });
 const note=root.querySelector('.gv180-results');
 if(note)note.textContent=visible+' '+t('مزارًا معروضًا','attractions shown');
}
itemCards=function(items){
 if(state.category!=='tourism')return previous.apply(this,arguments);
 const rendered=previous.apply(this,arguments);
 const catalogue=window.GeoVerseTourismV170?.items;
 if(!Array.isArray(catalogue)||catalogue.length!==items.length)return rendered;
 const doc=new DOMParser().parseFromString('<div id="gv180Parse">'+rendered+'</div>','text/html');
 const cards=new Map();
 doc.querySelectorAll('#gv180Parse .gv13-place[data-item]').forEach(card=>{
  const match=/^tourism:(\d+)$/.exec(card.getAttribute('data-item')||'');
  if(match)cards.set(Number(match[1]),card.outerHTML);
 });
 if(!cards.size)return rendered;
 let sections='',total=0;
 codes.forEach((code,n)=>{
  const entries=catalogue.filter(item=>item.code===code&&cards.has(item.index));
  if(!entries.length)return;
  total+=entries.length;
  const title=t(names[n][0],names[n][1]);
  sections+='<section class="gv180-country-group" data-gv180-group="'+code+'" data-count="'+entries.length+'" aria-label="'+title+'">'+
   '<div class="gv180-group-heading"><h3>'+title+'</h3><span>'+entries.length+' '+t('مزارات','attractions')+'</span></div>'+
   '<div class="gv180-cards">'+entries.map(item=>cards.get(item.index)).join('')+'</div></section>';
 });
 if(!total)return rendered;
 const choices=[['',t('كل الدول','All countries')],...codes.map((code,n)=>[code,t(names[n][0],names[n][1])])];
 const buttons=choices.map(([code,title])=>'<button type="button" data-gv180-pick="'+code+'" aria-pressed="'+String(code===selected)+'" class="'+(code===selected?'is-active':'')+'">'+title+'</button>').join('');
 const selectionValid=!selected||codes.includes(selected);
 if(!selectionValid)selected='';
 return '<div class="gv180-tourism">'+
  '<div class="gv180-header"><div><strong>'+t('استكشف المزارات حسب الدولة','Explore attractions by country')+'</strong><small>'+t('اختر دولة أو تصفح كل المزارات','Choose a country or browse all attractions')+'</small></div><span class="gv180-results">'+total+' '+t('مزارًا معروضًا','attractions shown')+'</span></div>'+
  '<div class="gv180-tabs" role="group" aria-label="'+t('تصفية المزارات حسب الدولة','Filter attractions by country')+'">'+buttons+'</div>'+
  '<div class="gv180-groups">'+sections+'</div></div>';
};
document.addEventListener('click',event=>{
 const button=event.target.closest?.('[data-gv180-pick]');
 if(!button)return;
 event.preventDefault();event.stopPropagation();
 selected=button.dataset.gv180Pick||'';
 showSelection();
},{capture:true});
const formerRender=render;
render=function(){
 const result=formerRender.apply(this,arguments);
 if(state.page==='category'&&state.category==='tourism')showSelection();
 return result;
};
})();
