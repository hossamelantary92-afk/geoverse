/* GeoVerse v162 — mobile filters fit the viewport; Atlas is the single continent navigator.
   Presentation-only; no layer, search, map, or game handlers changed. */
(function(){
'use strict';
const css=`
@media (max-width:700px) {
  /* Never show the duplicated explorer continent selector on the map page. */
  #main:has(#worldMap) .gv158-continent-label,
  #main:has(#worldMap) .gv158-continents,
  #main:has(#worldMap) .gv160-dock.gv160-filter-open .gv158-continent-label,
  #main:has(#worldMap) .gv160-dock.gv160-filter-open .gv158-continents {
    display:none!important;
  }
  /* Keep the single set of navigable continent tabs inside the Atlas. */
  #main #worldMap .gv140-region-strip { display:flex!important; }

  /* Respect the usable viewport even at normal iPhone browser zoom. */
  .layout:has(#worldMap),
  #main:has(#worldMap),
  #main .gv160-dock,
  #main .gv160-actions,
  #main .gv160-dock .gv158-explorer,
  #main .gv160-dock .gv158-search-line,
  #main .gv160-dock #mapToolbar,
  #main .gv160-dock #mapToolbar .gv146-group,
  #main .gv160-dock #mapToolbar .gv146-group-grid,
  #main .gv160-dock #mapToolbar .gv146-actions-buttons {
    box-sizing:border-box!important;
    min-width:0!important;
    max-width:100%!important;
  }
  #main:has(#worldMap) { width:100%!important; }
  #main .gv160-dock { width:100%!important;margin-inline:0!important;padding:8px!important; }
  #main .gv160-dock .gv158-explorer { width:100%!important; }
  #main .gv160-dock .gv158-search-line { width:100%!important; }
  #main .gv160-dock .gv158-query { flex:1 1 0!important;min-width:0!important;width:1px!important; }
  #main .gv160-dock .gv158-search-clear {flex:0 0 39px!important}
  #main .gv160-actions { width:100%!important;grid-template-columns:repeat(2,minmax(0,1fr))!important; }
  #main .gv160-actions button { min-width:0!important;white-space:normal!important; }
  #main .gv160-dock #mapToolbar {
    width:100%!important;
    padding:7px!important;
    margin-inline:0!important;
    overflow:visible!important;
  }
  #main .gv160-dock #mapToolbar .gv146-group-grid {
    width:100%!important;
    display:grid!important;
    grid-template-columns:repeat(2,minmax(0,1fr))!important;
    gap:6px!important;
  }
  #main .gv160-dock #mapToolbar .gv146-group-grid>button {
    box-sizing:border-box!important;
    min-width:0!important;
    max-width:100%!important;
    width:100%!important;
    padding:6px 4px!important;
    gap:4px!important;
    font-size:11px!important;
    line-height:1.5!important;
    white-space:normal!important;
    overflow-wrap:anywhere;
  }
  #main .gv160-dock #mapToolbar .gv146-group-grid>button .gv-icon {
    flex:0 0 17px!important;
    width:17px!important;
    height:17px!important;
  }
  #main .gv160-dock #mapToolbar .gv146-world .gv146-group-grid {
    grid-template-columns:1fr!important;
  }
  #main .gv160-dock #mapToolbar .gv146-world [data-layer="continents"] {display:none!important}
  #main .gv160-dock #mapToolbar .gv146-actions-buttons {
    grid-template-columns:repeat(2,minmax(0,1fr))!important;
  }
}
@media(min-width:520px) and (max-width:700px) {
  #main .gv160-dock #mapToolbar .gv146-group-grid {
    grid-template-columns:repeat(3,minmax(0,1fr))!important;
  }
}
`;
const style=document.createElement('style');
style.id='gv162-map-mobile-fit';
style.textContent=css;
document.head.appendChild(style);
})();
