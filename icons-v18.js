/* GeoVerse v18: refined non-emoji quiz mode icons; one shared symbol language. */
(function(){
 'use strict';
 const beforeRender=render;
 const paths={
  mixed:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-5 6-5 12 0 18 5-6 5-12 0-18"/><path d="m9 14 2-4 4-1-1 4z"/>',
  capitals:'<path d="M3 21h18M5 18h14M4 9l8-5 8 5M7 18v-8m5 8v-8m5 8v-8M3 10h18"/>',
  classify:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  definitions:'<path d="M4 3h15v18H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 15a2 2 0 0 1 2-2h13M8 8h7m-7 4h7"/>',
  locations:'<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="2.5"/>',
  flags:'<path d="M5 22V3m0 2c5-4 9 4 15 0v12c-6 4-10-4-15 0"/>',
  mapfind:'<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3zM9 3v15m6-12v15"/><path d="m11 8 2 2-2 2"/>'
 };
 const icon=id=>'<span class="gv18-game-symbol" aria-hidden="true"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+(paths[id]||paths.mixed)+'</svg></span>';
 render=function(){
  beforeRender();
  if(state.page!=='play')return;
  document.querySelectorAll('.game-mode[data-game]').forEach(btn=>{
   const part=btn.querySelector('span');
   if(part)part.innerHTML=icon(btn.dataset.game);
  });
 };
 window.GeoVerseGameIconsV18={icon};
})();