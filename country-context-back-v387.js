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
