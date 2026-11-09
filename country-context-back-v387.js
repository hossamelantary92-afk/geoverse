/* GeoVerse v387 — separate contextual Back from explicit countries navigation. */
(function(){
 'use strict';
 if(typeof render!=='function')return;
 const css=document.createElement('style');
 css.id='gv387-country-back-style';
 css.textContent=`
 #main .gv387-country-nav{display:flex;align-items:center;justify-content:flex-start;flex-wrap:wrap;gap:10px;margin:0 0 18px}
 #main .gv387-country-nav .gv387-back{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:43px;padding:9px 17px;border-radius:13px;border:1px solid #52cbbd;background:linear-gradient(130deg,#135064,#092c40);color:#80f2e4;font:800 14px Cairo,Outfit,system-ui;cursor:pointer}
 #main .gv387-country-nav .gv387-countries{margin:0;min-height:43px;display:inline-flex;align-items:center;justify-content:center}

 /* Country navigation buttons share the same geometry and visual treatment. */
 #main .gv387-country-nav{gap:10px!important;align-items:stretch!important;justify-content:flex-start!important;margin-bottom:20px!important}
 #main .gv387-country-nav button.gv387-back,
 #main .gv387-country-nav button.gv387-countries{
   -webkit-appearance:none!important;appearance:none!important;
   display:inline-flex!important;align-items:center!important;justify-content:center!important;
   box-sizing:border-box!important;min-height:44px!important;
   margin:0!important;padding:10px 16px!important;
   border-radius:14px!important;border:1px solid rgba(91,213,205,.58)!important;
   background:linear-gradient(135deg,#12485a,#0b3042)!important;
   box-shadow:0 4px 14px rgba(0,0,0,.12)!important;
   color:#defaf8!important;font:800 13px/1.5 Cairo,Outfit,system-ui!important;
   text-align:center!important;text-decoration:none!important;
   width:auto!important;max-width:100%!important;white-space:normal!important;
 }
 #main .gv387-country-nav button.gv387-back{
   border-color:#58dacc!important;color:#87f4e8!important;
 }
 #main .gv387-country-nav button.gv387-countries{
   color:#e7f7f6!important;
 }
 body.light #main .gv387-country-nav button.gv387-back,
 body.light #main .gv387-country-nav button.gv387-countries{
   background:linear-gradient(135deg,#e6f5f6,#f6fbfc)!important;
   color:#155164!important;border-color:#83c9cb!important;
 }
 @media(max-width:480px){
   #main .gv387-country-nav button.gv387-back,
   #main .gv387-country-nav button.gv387-countries{padding:9px 12px!important;font-size:12px!important;min-height:43px!important}
 }
 #main .gv387-country-nav .gv387-back:focus-visible,#main .gv387-country-nav .gv387-countries:focus-visible{outline:3px solid #82e9dc;outline-offset:3px}
 @media(max-width:480px){#main .gv387-country-nav{gap:8px}#main .gv387-country-nav .gv387-back,#main .gv387-country-nav .gv387-countries{font-size:13px;padding:9px 12px}}
 `;
 document.head.appendChild(css);
 function decorate(){
  if(state.page!=='country-v4')return;
  const main=document.getElementById('main');
  if(!main||main.querySelector('.gv387-country-nav'))return;
  const countries=main.querySelector('button.gv9-back[data-page="countries-v4"]');
  if(!countries)return;
  const nav=document.createElement('div');
  nav.className='gv387-country-nav';
  nav.setAttribute('role','group');
  nav.setAttribute('aria-label',state.lang==='ar'?'التنقل داخل صفحة الدولة':'Country page navigation');
  const back=document.createElement('button');
  back.type='button';
  back.className='back gv387-back';
  back.textContent=state.lang==='ar'?'→ رجوع':'← Back';
  back.setAttribute('aria-label',state.lang==='ar'?'الرجوع للصفحة السابقة، بما فيها الخريطة':'Return to previous page, including map');
  countries.classList.remove('back');
  countries.classList.add('gv387-countries');
  countries.before(nav);
  nav.append(back,countries);
 }
 const previousRender=render;
 render=function(){const result=previousRender.apply(this,arguments);decorate();return result;};
 decorate();
})();
