/* GeoVerse v161 — simplify mobile filters without removing landmark categories.
   All original data-layer buttons and interactions remain intact. */
(function(){
'use strict';
const style=document.createElement('style');
style.id='gv161-compact-learning-filters';
style.textContent=`
@media(max-width:700px){
 /* The Atlas has its own continent tabs: avoid a duplicate continent selector. */
 #main .gv160-dock.gv160-filter-open .gv158-continent-label,
 #main .gv160-dock.gv160-filter-open .gv158-continents,
 #main .gv160-dock.gv160-filter-open .gv158-filterbar{display:none!important}
 /* Results are relevant only when searching, not for navigating categories. */
 #main .gv160-dock .gv158-explorer:has(.gv158-query:placeholder-shown) .gv158-results{display:none!important}
 #main .gv160-dock #mapToolbar .gv146-group-title{font-size:12px!important;line-height:1.5!important}
 #main .gv160-dock #mapToolbar .gv146-world [data-layer="continents"]{display:none!important}
 #main .gv160-dock #mapToolbar .gv146-world .gv146-group-grid{grid-template-columns:1fr!important}
 #main .gv160-dock #mapToolbar .gv146-world .gv146-group-grid [data-layer="countries"]{min-height:37px!important}
 #main .gv160-dock #mapToolbar .gv146-group{gap:5px!important}
 #main .gv160-dock #mapToolbar .gv146-group-grid{gap:6px!important}
 #main .gv160-dock #mapToolbar .gv146-group-grid>button{min-height:38px!important}
 #main .gv160-dock #mapToolbar .gv146-actions{gap:6px!important}
 #main .gv160-dock #mapToolbar .gv146-actions-label{display:none!important}
 #main .gv160-dock #mapToolbar .gv146-actions-buttons{width:100%;display:grid!important;grid-template-columns:1fr 1fr;gap:6px}
 #main .gv160-dock #mapToolbar .gv146-actions-buttons>button{min-height:37px!important;padding:5px 8px!important}
 #main .gv160-dock.gv160-filter-open #mapToolbar .gv146-actions{display:none!important}
 #main .gv160-dock.gv160-view-open #mapToolbar .gv146-group{display:none!important}
}
`;
document.head.appendChild(style);
})();
