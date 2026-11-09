/* GeoVerse C3 — seven-continent visual comparison.
 * Areas are rounded millions of km², Seven-Continent Model (see continentstack.com and Britannica).
 * Population: July 2026 projections (millions), UN WPP2024 based aggregation as published at statisticstimes.com/demographics/continents-by-population.php.
 * Highest peaks: Guinness Seven Summits / Messner convention, meters; Everest rounded to 8849m.
 * Catalogue record counts include dependencies and historical codes; NOT independent-country totals.
 * No references panel in public UI per GeoVerse design policy.
 */
(function(){
'use strict';
const rows=[["Asia","آسيا",44.6,4863.3,"إيفرست","Everest",8849],["Africa","أفريقيا",30.4,1585,"كليمنجارو","Kilimanjaro",5895],["Europe","أوروبا",10.2,743.5,"إلبروس","Elbrus",5642],["North America","أمريكا الشمالية",24.7,621.3,"دينالي","Denali",6190],["South America","أمريكا الجنوبية",17.8,440.5,"أكونكاجوا","Aconcagua",6961],["Oceania","أوقيانوسيا",8.6,47.1,"بونشاك جايا","Puncak Jaya",4884],["Antarctica","أنتاركتيكا",14.2,0,"فينسون","Vinson Massif",4892]].map(([key,ar,area,pop,peakAr,peakEn,peak])=>({key,ar,area,pop,peakAr,peakEn,peak,records:null}));
const escape=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const L=(a,b)=>state.lang==='ar'?a:b;
let metric='area',first='Asia',second='Africa';
let loaded=false,loading=null;
const metaUrl='./country-meta.json';
function getMeta(){
 if(!loading)loading=fetch(metaUrl).then(r=>{if(!r.ok)throw Error('metadata');return r.json()}).then(j=>{
  const list=(j.countries||[]).filter(x=>x.code&&x.continent);
  rows.forEach(x=>{x.records=list.filter(y=>y.continent===x.key).length});
  loaded=true;return true
 }).catch(()=>{loading=null;loaded=false;return false});
 return loading;
}
const metrics={area:{ar:'المساحة',en:'Area',unitAr:'مليون كم²',unitEn:'million km²',value:x=>x.area},
 population:{ar:'السكان (2026)',en:'Population (2026)',unitAr:'مليون نسمة',unitEn:'million people',value:x=>x.pop},
 records:{ar:'سجلات الأطلس',en:'Atlas entries',unitAr:'دولة وإقليم',unitEn:'countries & territories',value:x=>x.records},
 peak:{ar:'أعلى القمم',en:'Highest summits',unitAr:'مترًا',unitEn:'meters',value:x=>x.peak}};
function fmt(v,kind){if(v===null||v===undefined)return '—';if(kind==='records'||kind==='peak')return new Intl.NumberFormat(state.lang==='ar'?'ar-EG':'en-US',{maximumFractionDigits:0}).format(v);return new Intl.NumberFormat(state.lang==='ar'?'ar-EG':'en-US',{minimumFractionDigits:kind==='area'?1:0,maximumFractionDigits:1}).format(v)}
function name(x){return L(x.ar,x.key)}
function unit(kind){let m=metrics[kind];return L(m.unitAr,m.unitEn)}
function val(x,k){return metrics[k].value(x)}
function labelVal(x,k){if(k==='population'&&x.key==='Antarctica')return L('لا سكان دائمين','No permanent residents');return fmt(val(x,k),k)+' '+unit(k)}
function choiceOptions(selected,type){return rows.map(r=>'<option value="'+escape(r.key)+'"'+(r.key===selected?' selected':'')+'>'+escape(name(r))+'</option>').join('')}
function renderInside(section){
 const peakNote=L('القمة الأعلى في أوقيانوسيا وفق تعريف يشمل غينيا الجديدة؛ بعض التصنيفات تعتمد كوسيوسكو بأستراليا.','Oceania uses the New Guinea definition; some Seven Summits lists use Kosciuszko in Australia.');
 const a=rows.find(x=>x.key===first)||rows[0],b=rows.find(x=>x.key===second)||rows[1],m=metrics[metric];
 let ordered=rows.slice().sort((x,y)=>(val(y,metric)??-1)-(val(x,metric)??-1));
 const max=Math.max(1,...ordered.map(x=>val(x,metric)||0));
 section.innerHTML='<div class="gv-c3-heading"><div><span class="eyebrow">CONTINENT ATLAS · COMPARISON</span><h2>'+L('القارات بالأرقام','Continents at a glance')+'</h2><p>'+L('قارن بين القارات السبع بمؤشرات واضحة، ثم اختَر قارتين لاستكشاف الفرق بينهما.','Explore all seven continents using clear metrics, then compare any two side by side.')+'</p></div><span class="gv-c3-datestamp">'+L('تقديرات السكان: 2026','Population estimates: 2026')+'</span></div>'+
 '<div class="gv-c3-metrics" role="group" aria-label="'+L('اختيار نوع المقارنة','Choose comparison metric')+'">'+Object.entries(metrics).map(([key,v])=>'<button type="button" class="gv-c3-metric'+(metric===key?' active':'')+'" data-gv-c3-metric="'+key+'" aria-pressed="'+(metric===key)+'">'+L(v.ar,v.en)+'</button>').join('')+'</div>'+
 '<div class="gv-c3-bars" aria-label="'+escape(L('ترتيب القارات حسب ','Continent ranking by ')+L(m.ar,m.en))+'">'+ordered.map((r,i)=>{
  const value=val(r,metric),percentage=Math.max(value===0?0:2,100*((value||0)/max));
  return '<div class="gv-c3-bar-row"><div class="gv-c3-bar-meta"><strong><span class="gv-c3-rank">'+(i+1)+'</span>'+escape(name(r))+'</strong><span>'+escape(labelVal(r,metric))+'</span></div><div class="gv-c3-track"><div class="gv-c3-fill" style="width:'+percentage.toFixed(2)+'%"></div></div></div>';
 }).join('')+'</div>'+
 '<div class="gv-c3-compare"><div class="gv-c3-subhead"><h3>'+L('مقارنة مباشرة','Compare two continents')+'</h3><p>'+L('غيّر القارتين من القوائم لعرض الأرقام جنبًا إلى جنب.','Choose two continents to see their figures side by side.')+'</p></div>'+
 '<div class="gv-c3-selectors"><label>'+L('القارة الأولى','First continent')+'<select data-gv-c3-select="first">'+choiceOptions(first)+'</select></label><label>'+L('القارة الثانية','Second continent')+'<select data-gv-c3-select="second">'+choiceOptions(second)+'</select></label></div>'+
 '<div class="gv-c3-pair">'+[a,b].map(x=>'<article class="gv-c3-stat-card"><h4>'+escape(name(x))+'</h4><dl>'+
 '<div><dt>'+L('المساحة','Area')+'</dt><dd>'+escape(labelVal(x,'area'))+'</dd></div>'+
 '<div><dt>'+L('السكان','Population')+'</dt><dd>'+escape(labelVal(x,'population'))+'</dd></div>'+
 '<div><dt>'+L('سجلات الدول والأقاليم','Country / territory entries')+'</dt><dd>'+escape(labelVal(x,'records'))+'</dd></div>'+
 '<div><dt>'+L('أعلى قمة','Highest peak')+'</dt><dd>'+escape(L(x.peakAr,x.peakEn))+' · '+escape(fmt(x.peak,'peak'))+' '+L('م','m')+'</dd></div>'+
 '</dl></article>').join('')+'</div></div>'+
 '<p class="gv-c3-foot">'+L('ملاحظة: المساحات تقريبية وتعتمد حدود نموذج القارات السبع. أرقام السكان تقديرات منتصف 2026؛ عدد السجلات يشمل أقاليم وتبعيات وليس عدد الدول المستقلة. أنتاركتيكا بلا سكان دائمين.', 'Note: area figures are rounded under the seven-continent model. Population is a mid-2026 estimate; entries include territories and dependencies, not only sovereign states. Antarctica has no permanent residents.')+' '+peakNote+'</p>';
}
function mount(){
 const root=document.getElementById('main');if(!root)return;
 const landing=state.page==='category'&&state.category==='continents';
 const detail=state.page==='detail'&&state.category==='continents';
 if(!landing&&!detail)return;
 const anchor=landing?root.querySelector('.gv-continent-brief'):root.querySelector('.gv-continent-guide');
 if(!anchor||root.querySelector('#gvContinentCompare'))return;
 const panel=document.createElement('section');panel.id='gvContinentCompare';panel.className='gv-c3-shell';
 panel.setAttribute('aria-label',L('مقارنة القارات','Continent comparison'));
 anchor.insertAdjacentElement('afterend',panel);
 renderInside(panel);
 if(!loaded)getMeta().then(()=>{if(panel.isConnected)renderInside(panel)});
}
document.addEventListener('click',e=>{
 const target=e.target.closest('[data-gv-c3-metric]');if(!target)return;
 const panel=target.closest('#gvContinentCompare');if(!panel)return;
 const next=target.dataset.gvC3Metric;if(!metrics[next])return;
 e.preventDefault();e.stopImmediatePropagation();metric=next;renderInside(panel);
},true);
document.addEventListener('change',e=>{
 const kind=e.target.dataset?.gvC3Select;if(!kind)return;
 const panel=e.target.closest('#gvContinentCompare');if(!panel)return;
 const key=e.target.value;if(!rows.some(x=>x.key===key))return;
 if(kind==='first')first=key;else if(kind==='second')second=key;else return;
 renderInside(panel);
},true);
const css=`
.gv-c3-shell{margin:20px 0 24px;padding:clamp(17px,3vw,28px);border-radius:22px;border:1px solid rgba(115,214,214,.26);background:linear-gradient(135deg,#082d42,#061e33);color:#eaffff;box-shadow:0 16px 38px #0003}
.gv-c3-heading{display:flex;justify-content:space-between;gap:18px;align-items:flex-start}
.gv-c3-heading h2{margin:7px 0;font-size:clamp(21px,3vw,29px);color:#f5ffff}
.gv-c3-heading p,.gv-c3-subhead p{color:#b6d4dc;line-height:1.85;font-size:13px;margin:0}
.gv-c3-datestamp{border:1px solid #a8dcd543;border-radius:10px;padding:9px 11px;color:#d0e7ea;font-size:11px;white-space:nowrap}
.gv-c3-metrics{display:flex;gap:8px;overflow-x:auto;margin:22px 0 16px;padding-bottom:5px;scroll-snap-type:x proximity}
.gv-c3-metric{border:1px solid #8cc7c53c;border-radius:12px;padding:11px 14px;white-space:nowrap;background:#16475b;color:#d9edf0;font-weight:750;cursor:pointer;scroll-snap-align:start}
.gv-c3-metric.active{background:#64d9cd;color:#062b39;border-color:#86f4e7}
.gv-c3-bars{display:grid;gap:12px}
.gv-c3-bar-row{display:grid;gap:6px;min-width:0}
.gv-c3-bar-meta{display:flex;justify-content:space-between;gap:15px;align-items:center;font-size:13px}
.gv-c3-bar-meta strong{display:flex;align-items:center;gap:10px;min-width:0}
.gv-c3-bar-meta span:last-child{font-variant-numeric:tabular-nums;white-space:nowrap;color:#d5e8e8}
.gv-c3-rank{color:#f1c979!important;min-width:20px}
.gv-c3-track{height:11px;overflow:hidden;border-radius:99px;background:#ffffff1c}
.gv-c3-fill{height:100%;min-width:0;background:linear-gradient(90deg,#298f9d,#77e4d0);border-radius:99px;transition:width .3s ease}
.gv-c3-compare{border-top:1px solid #b8d7e72c;margin-top:23px;padding-top:20px}
.gv-c3-subhead h3{margin:0 0 6px;color:#f3ffff;font-size:19px}
.gv-c3-selectors{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:17px 0}
.gv-c3-selectors label{display:grid;gap:8px;color:#cce8e8;font-size:12px}
.gv-c3-selectors select{width:100%;min-width:0;background:#12384e;border:1px solid #7babb86e;border-radius:12px;padding:11px;color:white;font:inherit}
.gv-c3-pair{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.gv-c3-stat-card{border:1px solid #a3cfd32d;border-radius:16px;padding:16px;background:#ffffff09;min-width:0}
.gv-c3-stat-card h4{margin:0 0 14px;color:#f5ffff;font-size:17px}
.gv-c3-stat-card dl{margin:0;display:grid;gap:12px}
.gv-c3-stat-card dl>div{display:grid;gap:4px;padding-bottom:10px;border-bottom:1px solid #b3e0df19}
.gv-c3-stat-card dl>div:last-child{border:0;padding:0}
.gv-c3-stat-card dt{font-size:11px;color:#a6cbd2}
.gv-c3-stat-card dd{margin:0;color:#ecfafa;font-size:14px;font-weight:800;line-height:1.55}
.gv-c3-foot{color:#aacbd3;font-size:11px;line-height:1.9;margin:19px 0 0}
body.light .gv-c3-shell{background:linear-gradient(135deg,#eaf7f8,#fbfefe);color:#143e4d;border-color:#b6d7d9}
body.light .gv-c3-heading h2,body.light .gv-c3-subhead h3,body.light .gv-c3-stat-card h4{color:#143e4d}
body.light .gv-c3-heading p,body.light .gv-c3-subhead p,body.light .gv-c3-foot{color:#416472}
body.light .gv-c3-metric{background:#e3f1f2;color:#184955}
body.light .gv-c3-metric.active{background:#3dbfb4;color:#042d36}
body.light .gv-c3-track{background:#b8d5da}
body.light .gv-c3-stat-card{background:#fff;border-color:#d7e7e9}
body.light .gv-c3-stat-card dd{color:#163d46}
body.light .gv-c3-stat-card dt,body.light .gv-c3-selectors label,body.light .gv-c3-bar-meta span:last-child{color:#416472}
body.light .gv-c3-selectors select{background:#fff;color:#143e4d;border-color:#bacfd5}
@media(max-width:690px){.gv-c3-shell{padding:14px}.gv-c3-heading{flex-direction:column;gap:8px}.gv-c3-pair{grid-template-columns:1fr}.gv-c3-bar-meta{font-size:12px}.gv-c3-bar-meta span:last-child{font-size:11px}.gv-c3-stat-card{padding:13px}.gv-c3-selectors{gap:8px}}
`;
if(!document.getElementById('gv-c3-style')){const style=document.createElement('style');style.id='gv-c3-style';style.textContent=css;document.head.appendChild(style)}
const previous=render;
render=function(){previous();mount()};
})();
