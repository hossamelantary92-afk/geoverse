/* GeoVerse v115 — sizeable, evidence-grounded game pool expansion.
 * Each question has a unique, bilingual stem and four plausible answers.
 * Geography features are sourced from the existing encyclopedia; capitals from country-meta.
 */
(function(){
'use strict';
const bank=window.GeoVerseQuestionPools,integrity=window.GeoVerseQuestionQualityV114,concepts=window.GeoVerseConceptsV115;
if(!bank||!integrity||!Array.isArray(concepts))return;
const shuffle=bank.randomize;
const countryRecords=[["AF","Afghanistan","Kabul","Asia"],["AL","Albania","Tirana","Europe"],["DZ","Algeria","Alger","Africa"],["AD","Andorra","Andorra la Vella","Europe"],["AO","Angola","Luanda","Africa"],["AI","Anguilla","The Valley","North America"],["AG","Antigua and Barbuda","Saint John's","North America"],["AR","Argentina","Buenos Aires","South America"],["AM","Armenia","Yerevan","Asia"],["AW","Aruba","Oranjestad","North America"],["AU","Australia","Canberra","Oceania"],["AT","Austria","Vienna","Europe"],["AZ","Azerbaijan","Baku","Asia"],["BS","Bahamas","Nassau","North America"],["BH","Bahrain","al-Manama","Asia"],["BD","Bangladesh","Dhaka","Asia"],["BB","Barbados","Bridgetown","North America"],["BY","Belarus","Minsk","Europe"],["BE","Belgium","Bruxelles [Brussel]","Europe"],["BZ","Belize","Belmopan","North America"],["BJ","Benin","Porto-Novo","Africa"],["BM","Bermuda","Hamilton","North America"],["BT","Bhutan","Thimphu","Asia"],["BA","Bosnia and Herzegovina","Sarajevo","Europe"],["BW","Botswana","Gaborone","Africa"],["BR","Brazil","Brasília","South America"],["BN","Brunei","Bandar Seri Begawan","Asia"],["BG","Bulgaria","Sofia","Europe"],["BF","Burkina Faso","Ouagadougou","Africa"],["BI","Burundi","Gitega","Africa"],["KH","Cambodia","Phnom Penh","Asia"],["CM","Cameroon","Yaoundé","Africa"],["CA","Canada","Ottawa","North America"],["CV","Cape Verde","Praia","Africa"],["KY","Cayman Islands","George Town","North America"],["CF","Central African Republic","Bangui","Africa"],["TD","Chad","N'Djamena","Africa"],["CL","Chile","Santiago de Chile","South America"],["CN","China","Beijing","Asia"],["CX","Christmas Island","Flying Fish Cove","Oceania"],["CC","Cocos (Keeling) Islands","West Island","Oceania"],["CO","Colombia","Bogota","South America"],["KM","Comoros","Moroni","Africa"],["CG","Congo","Brazzaville","Africa"],["CK","Cook Islands","Avarua","Oceania"],["CR","Costa Rica","San José","North America"],["HR","Croatia","Zagreb","Europe"],["CU","Cuba","La Habana","North America"],["CY","Cyprus","Nicosia","Asia"],["CZ","Czech Republic","Prague","Europe"],["DK","Denmark","Copenhagen","Europe"],["DJ","Djibouti","Djibouti","Africa"],["DM","Dominica","Roseau","North America"],["DO","Dominican Republic","Santo Domingo","North America"],["EC","Ecuador","Quito","South America"],["EG","Egypt","Cairo","Africa"],["SV","El Salvador","San Salvador","North America"],["GQ","Equatorial Guinea","Ciudad de la Paz","Africa"],["ER","Eritrea","Asmara","Africa"],["EE","Estonia","Tallinn","Europe"],["ET","Ethiopia","Addis Ababa","Africa"],["FK","Falkland Islands","Stanley","South America"],["FO","Faroe Islands","Tórshavn","Europe"],["FJ","Fiji","Suva","Oceania"],["FI","Finland","Helsinki","Europe"],["FR","France","Paris","Europe"],["GF","French Guiana","Cayenne","South America"],["GA","Gabon","Libreville","Africa"],["GM","Gambia","Banjul","Africa"],["GE","Georgia","Tbilisi","Asia"],["DE","Germany","Berlin","Europe"],["GH","Ghana","Accra","Africa"],["GI","Gibraltar","Gibraltar","Europe"],["GR","Greece","Athens","Europe"],["GL","Greenland","Nuuk","North America"],["GD","Grenada","Saint George's","North America"],["GP","Guadeloupe","Basse-Terre","North America"],["GU","Guam","Hagåtña","Oceania"],["GT","Guatemala","Guatemala City","North America"],["GN","Guinea","Conakry","Africa"],["GW","Guinea-Bissau","Bissau","Africa"],["GY","Guyana","Georgetown","South America"],["HT","Haiti","Port-au-Prince","North America"],["VA","Vatican City","Vatican City","Europe"],["HN","Honduras","Tegucigalpa","North America"],["HU","Hungary","Budapest","Europe"],["IS","Iceland","Reykjavík","Europe"],["IN","India","New Delhi","Asia"],["ID","Indonesia","Jakarta","Asia"],["IR","Iran","Tehran","Asia"],["IQ","Iraq","Baghdad","Asia"],["IE","Ireland","Dublin","Europe"],["IL","Israel","Jerusalem","Asia"],["IT","Italy","Rome","Europe"],["CI","Ivory Coast","Yamoussoukro","Africa"],["JM","Jamaica","Kingston","North America"],["JP","Japan","Tokyo","Asia"],["JO","Jordan","Amman","Asia"],["KZ","Kazakhstan","Astana","Asia"],["KE","Kenya","Nairobi","Africa"],["KI","Kiribati","Bairiki","Oceania"],["KW","Kuwait","Kuwait","Asia"],["KG","Kyrgyzstan","Bishkek","Asia"],["LA","Laos","Vientiane","Asia"],["LV","Latvia","Riga","Europe"],["LB","Lebanon","Beirut","Asia"],["LS","Lesotho","Maseru","Africa"],["LR","Liberia","Monrovia","Africa"],["LY","Libya","Tripoli","Africa"],["LI","Liechtenstein","Vaduz","Europe"],["LT","Lithuania","Vilnius","Europe"],["LU","Luxembourg","Luxembourg City","Europe"],["MK","North Macedonia","Skopje","Europe"],["MG","Madagascar","Antananarivo","Africa"],["MW","Malawi","Lilongwe","Africa"],["MV","Maldives","Malé","Asia"],["ML","Mali","Bamako","Africa"],["MT","Malta","Valletta","Europe"],["MH","Marshall Islands","Majuro","Oceania"],["MQ","Martinique","Fort-de-France","North America"],["MR","Mauritania","Nouakchott","Africa"],["MU","Mauritius","Port-Louis","Africa"],["YT","Mayotte","Mamoudzou","Africa"],["MX","Mexico","Mexico City","North America"],["FM","Micronesia, Federated States of","Palikir","Oceania"],["MD","Moldova","Chisinau","Europe"],["MC","Monaco","Monaco-Ville","Europe"],["MN","Mongolia","Ulaanbaatar","Asia"],["ME","Montenegro","Podgorica","Europe"],["MA","Morocco","Rabat","Africa"],["MZ","Mozambique","Maputo","Africa"],["MM","Myanmar","Naypyidaw","Asia"],["NA","Namibia","Windhoek","Africa"],["NP","Nepal","Kathmandu","Asia"],["NL","Netherlands","Amsterdam","Europe"],["NC","New Caledonia","Nouméa","Oceania"],["NZ","New Zealand","Wellington","Oceania"],["NI","Nicaragua","Managua","North America"],["NE","Niger","Niamey","Africa"],["NG","Nigeria","Abuja","Africa"],["NU","Niue","Alofi","Oceania"],["KP","North Korea","Pyongyang","Asia"],["GB","United Kingdom","London","Europe"],["NO","Norway","Oslo","Europe"],["OM","Oman","Muscat","Asia"],["PK","Pakistan","Islamabad","Asia"],["PW","Palau","Ngerulmud","Oceania"],["PA","Panama","Panama City","North America"],["PG","Papua New Guinea","Port Moresby","Oceania"],["PY","Paraguay","Asunción","South America"],["PE","Peru","Lima","South America"],["PH","Philippines","Manila","Asia"],["PL","Poland","Warsaw","Europe"],["PT","Portugal","Lisbon","Europe"],["PR","Puerto Rico","San Juan","North America"],["QA","Qatar","Doha","Asia"],["RE","Reunion","Saint-Denis","Africa"],["RO","Romania","Bucharest","Europe"],["RU","Russia","Moscow","Europe"],["RW","Rwanda","Kigali","Africa"],["KN","Saint Kitts and Nevis","Basseterre","North America"],["LC","Saint Lucia","Castries","North America"],["PM","Saint Pierre and Miquelon","Saint-Pierre","North America"],["VC","Saint Vincent and the Grenadines","Kingstown","North America"],["WS","Samoa","Apia","Oceania"],["SM","San Marino","San Marino","Europe"],["ST","Sao Tome and Principe","São Tomé","Africa"],["SA","Saudi Arabia","Riyadh","Asia"],["SN","Senegal","Dakar","Africa"],["RS","Serbia","Belgrade","Europe"],["SC","Seychelles","Victoria","Africa"],["SL","Sierra Leone","Freetown","Africa"],["SG","Singapore","Singapore","Asia"],["SK","Slovakia","Bratislava","Europe"],["SI","Slovenia","Ljubljana","Europe"],["SB","Solomon Islands","Honiara","Oceania"],["SO","Somalia","Mogadishu","Africa"],["KR","South Korea","Seoul","Asia"],["SS","South Sudan","Juba","Africa"],["ES","Spain","Madrid","Europe"],["SD","Sudan","Khartoum","Africa"],["SR","Suriname","Paramaribo","South America"],["SE","Sweden","Stockholm","Europe"],["CH","Switzerland","Bern","Europe"],["SY","Syria","Damascus","Asia"],["TJ","Tajikistan","Dushanbe","Asia"],["TZ","Tanzania","Dodoma","Africa"],["TH","Thailand","Bangkok","Asia"],["CD","The Democratic Republic of Congo","Kinshasa","Africa"],["TG","Togo","Lomé","Africa"],["TO","Tonga","Nuku'alofa","Oceania"],["TT","Trinidad and Tobago","Port of Spain","North America"],["TN","Tunisia","Tunis","Africa"],["TR","Türkiye","Ankara","Asia"],["TM","Turkmenistan","Ashgabat","Asia"],["TC","Turks and Caicos Islands","Cockburn Town","North America"],["TV","Tuvalu","Funafuti","Oceania"],["UG","Uganda","Kampala","Africa"],["UA","Ukraine","Kyiv","Europe"],["AE","United Arab Emirates","Abu Dhabi","Asia"],["US","United States","Washington, D.C.","North America"],["UY","Uruguay","Montevideo","South America"],["UZ","Uzbekistan","Tashkent","Asia"],["VU","Vanuatu","Port Vila","Oceania"],["VE","Venezuela","Caracas","South America"],["VN","Vietnam","Hanoi","Asia"],["VG","British Virgin Islands","Road Town","North America"],["VI","Virgin Islands, U.S.","Charlotte Amalie","North America"],["WF","Wallis and Futuna","Mata-Utu","Oceania"],["ZM","Zambia","Lusaka","Africa"],["ZW","Zimbabwe","Harare","Africa"],["GG","Guernsey","St. Peter Port","Europe"],["IM","Isle of Man","Douglas","Europe"],["JE","Jersey","Saint Helier","Europe"],["TL","Timor-Leste","Dili","Asia"]];
const level=()=>window.GeoVerseGameV110?.getDifficulty?.()||'medium';
const normalize=s=>String(s||'').normalize('NFKC').toLocaleLowerCase().replace(/[\u064b-\u065f\u0670\u0640]/g,'').replace(/[أإآ]/g,'ا').replace(/ى/g,'ي').replace(/[^\p{L}\p{N} ]/gu,' ').replace(/\s+/g,' ').trim();
const categoryLabel=id=>cats.find(c=>c.id===id);
const families={
 countries:['maps','human'],continents:['land','maps'],oceans:['water'],seas:['water'],deserts:['arid','biome'],rivers:['rivers','water'],waterfalls:['rivers'],forests:['biome'],mountains:['land','earth'],lakes:['water','rivers'],islands:['land'],volcanoes:['earth'],straits:['water'],gulfs:['water'],glaciers:['ice'],valleys:['land'],climate:['climate'],grasslands:['biome']
};
const choicesFor=(items,target,groupOf)=>{
 const peer=shuffle(items.filter(x=>x!==target&&groupOf(x)===groupOf(target)));
 const other=shuffle(items.filter(x=>x!==target&&groupOf(x)!==groupOf(target)));
 return shuffle([target,...[...peer,...other].slice(0,3)]);
};
const conceptItems=concepts.map(x=>({id:x[0],ar:x[1],en:x[2],descAr:x[3],descEn:x[4],group:x[5]}));
const makeConceptQuestions=()=>conceptItems.map(item=>{
 const opts=choicesFor(conceptItems,item,x=>x.group);
 const q=['أي مصطلح جغرافي يطابق الوصف: '+item.descAr,'Which geographical term matches: '+item.descEn,opts.map(x=>x.ar),opts.map(x=>x.en),opts.indexOf(item),item.ar+': '+item.descAr,item.en+': '+item.descEn];
 return q;
}).filter(q=>integrity.safe(q,'definitions'));
const rules={
 continents:[/قارة|قارات|continent/gi,'كتلة يابسة'],
 oceans:[/محيط|محيطات|ocean/gi,'مسطح مائي'],
 seas:[/\bseas?\b|بحر|البحر|بحار/gi,'مسطح مائي'],
 deserts:[/صحراء|صحاري|\bdesert\b/gi,'منطقة جافة'],
 rivers:[/نهر|أنهار|\brivers?\b/gi,'مجرى متدفق'],
 waterfalls:[/شلالات|شلال|\bwaterfalls?\b/gi,'اندفاع متساقط'],
 forests:[/غابات|غابة|\bforests?\b|\brainforest\b/gi,'غطاء نباتي'],
 mountains:[/جبال|جبل|سلسلة جبلية|\bmountains?\b/gi,'تضاريس مرتفعة'],
 lakes:[/بحيرات|بحيرة|\blakes?\b/gi,'منطقة مائية داخلية'],
 islands:[/جزر|جزيرة|\bislands?\b|\barchipelago\b/gi,'كتل يابسة'],
 volcanoes:[/براكين|بركان|بركانية|\bvolcano(?:es)?\b|\bvolcanic\b/gi,'تكوين صخري'],
 straits:[/مضيق|مضايق|قناة|\bstraits?\b|\bcanal\b/gi,'ممر مائي'],
 gulfs:[/خليج|خلجان|\bgulfs?\b|\bbays?\b/gi,'امتداد مائي ساحلي'],
 glaciers:[/أنهار جليدية|نهر جليدي|\bglaciers?\b|\bice sheet\b|\bice cap\b/gi,'معلم قطبي'],
 valleys:[/أودية|وادي|وادٍ|وديان|أخدود|أخاديد|\bvalleys?\b|\bcanyons?\b/gi,'منخفض أرضي'],
 climate:[/مناخ|\bclimate\b/gi,'نمط طقس'],
 grasslands:[/سهول|سهوب|مراعي|سافانا|\bgrasslands?\b|\bplains?\b|\bsavanna\b|\bsteppe\b/gi,'مساحة طبيعية مفتوحة']
};
function cleanDescription(desc,name,id){
 let v=String(desc||'').trim();
 // Preserve grammatical forms rather than replacing stems within adjectives.
 if(id==='volcanoes')v=v.replace(/بركانية/g,'نارية').replace(/\bvolcanic\b/gi,'igneous');
 if(id==='mountains')v=v.replace(/جبال/g,'مرتفعات').replace(/\bmountains\b/gi,'highlands');
 if(id==='valleys')v=v.replace(/وادٍ/g,'منخفض').replace(/وادٍ/g,'منخفض');
 if(id==='rivers')v=v.replace(/نهري/g,'مائي').replace(/\briverine\b/gi,'fluvial');
 if(!v||/معلم جغرافي|geographic feature|اضغط للخريطة|explore its map|illustrative example|مثال توضيحي/i.test(v))return '';
 if(name){const escaped=name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');try{v=v.replace(new RegExp(escaped,'gi'),'هذا الموقع')}catch{}}
 const [pattern,replacement]=rules[id]||[];
 if(pattern)v=v.replace(pattern,(token,offset,text)=>{
  const before=text[offset-1]||'',after=text[offset+token.length]||'';
  // Prevent mangling a larger word, e.g. البحرية or volcanic.
  return /[\\p{L}]/u.test(before)||/[\\p{L}]/u.test(after)?token:replacement;
 });
 v=v.replace(/\s+/g,' ').trim();
 return v;
}
const categoryList=['continents','oceans','seas','deserts','rivers','waterfalls','forests','mountains','lakes','islands','volcanoes','straits','gulfs','glaciers','valleys','climate','grasslands'];
const placeRecords=[];
for(const id of categoryList){
 for(const v of geo[id]||[]){
  if(!v[0]||!v[1]||!v[2]||!v[3]||v[2].length<42||v[3].length<46)continue;
  const ar=cleanDescription(v[2],v[0],id);
  const en=cleanDescription(v[3],v[1],id);
  if(ar.length<37||en.length<40)continue;
  placeRecords.push({id,ar,en,nameAr:v[0],nameEn:v[1],originalAr:v[2],originalEn:v[3]});
 }
}
function makeClassificationQuestions(){
 if(window.GeoVerseClassifyV116?.questions)return window.GeoVerseClassifyV116.questions();
 return placeRecords.map(item=>{
  const opts=choicesFor(categoryList,item.id,id=>['seas','oceans','gulfs','lakes','straits','rivers','waterfalls'].includes(id)?'water':['mountains','valleys','deserts','glaciers','volcanoes'].includes(id)?'terrain':['grasslands','forests','climate'].includes(id)?'ecosystem':'land');
  const stemAr='ما التصنيف الصحيح لهذا الموقع؟ '+item.ar;
  const stemEn='What type of place is described? '+item.en;
  const label=categoryLabel(item.id);if(!label)return null;
  const q=[stemAr,stemEn,opts.map(id=>categoryLabel(id)?.ar||id),opts.map(id=>categoryLabel(id)?.en||id),opts.indexOf(item.id),item.nameAr+' — '+item.originalAr,item.nameEn+' — '+item.originalEn];
  return integrity.safe(q,'classify')?q:null;
 }).filter(Boolean);
}
// Countries appear with three plausible distractors from the same continent.
function makeCountryLocations(){
 const cleaned=countryRecords.filter(r=>r[1]&&r[2]&&r[3]);
 const enArCode=code=>{try{return new Intl.DisplayNames(['ar'],{type:'region'}).of(code)}catch{return code}};
 const optsPool=cleaned.map(([code,name,capital,continent])=>({code,name,capital,continent,ar:enArCode(code)}));
 const known=bank.capitals;
 return optsPool.map((r,index)=>{
  const opts=choicesFor(optsPool,r,x=>x.continent);
  const knownCapital=known.find(x=>x[4]?.toUpperCase()===r.code);
  const capAr=knownCapital?.[2]||r.capital;
  const continentAr={Asia:'آسيا',Africa:'أفريقيا',Europe:'أوروبا','North America':'أمريكا الشمالية','South America':'أمريكا الجنوبية',Oceania:'أوقيانوسيا'};
  let ar,en;
  if(index%3===0){ar='أي دولة تقع في '+(continentAr[r.continent]||r.continent)+' وعاصمتها '+capAr+'؟';en='Which country is in '+r.continent+' and has '+r.capital+' as its capital?';}
  else if(index%3===1){ar='العاصمة '+capAr+' تقع في أي دولة من الدول التالية؟';en='The city of '+r.capital+' is the capital of which country?';}
  else{ar='حدّد الدولة التي تدير شؤونها من العاصمة '+capAr+' في منطقة '+(continentAr[r.continent]||r.continent)+'.';en='Identify the '+r.continent+' country whose capital is '+r.capital+'.';}
  const q=[ar,en,opts.map(x=>x.ar),opts.map(x=>x.name),opts.indexOf(r),r.ar+' — العاصمة: '+capAr+'، القارة: '+(continentAr[r.continent]||r.continent)+'.',r.name+' — capital: '+r.capital+', continent: '+r.continent+'.'];
  return integrity.safe(q,'locations')?q:null;
 }).filter(Boolean);
}
const seenByMode={};
function rotate(mode,list){
 const valid=list.filter(q=>integrity.safe(q,mode));
 const unique=[...new Map(valid.map(q=>[normalize(q[1]),q])).values()];
 const key=mode+':'+level(),used=seenByMode[key]||(seenByMode[key]=new Set());
 let fresh=shuffle(unique.filter(q=>!used.has(normalize(q[1]))));
 if(fresh.length<12){used.clear();fresh=shuffle(unique)}
 const selected=fresh.slice(0,12);
 selected.forEach(q=>used.add(normalize(q[1])));
 return selected;
}
const originalCreate=createGame;
createGame=function(mode){
 if(mode==='definitions'){
  const all=makeConceptQuestions();
  const groups=level()==='easy'?['rivers','water','land','biome','human']:level()==='medium'?['maps','climate','arid','earth','water']:['earth','ice','arid','maps','climate'];
  const subset=all.filter(q=>conceptItems.some(v=>groups.includes(v.group)&&q[1].includes(v.descEn)));
  return rotate(mode,subset.length>=12?subset:all);
 }
 if(mode==='classify'){
  const all=[...bank.makeClassify(),...makeClassificationQuestions()];
  const groups=level()==='easy'?['rivers','lakes','seas','oceans','mountains','islands','deserts','forests','waterfalls']:level()==='hard'?['straits','gulfs','glaciers','valleys','volcanoes','climate','grasslands','continents']:categoryList;
  const subset=all.filter(q=>groups.some(id=>q[3][q[4]]===categoryLabel(id)?.en));
  return rotate(mode,subset.length>=12?subset:all);
 }
 if(mode==='locations'){
  const base=bank.makeLocations();
  const countries=makeCountryLocations();
  const knownCodes=new Set(bank.capitals.slice(0,74).map(x=>x[4]?.toUpperCase()));
  const allowed=level()==='easy'?countries.filter(q=>countryRecords.some(r=>knownCodes.has(r[0])&&q[3][q[4]]===r[1])):level()==='medium'?countries.filter(q=>countryRecords.some(r=>['Asia','Europe','Africa','North America','South America','Oceania'].includes(r[3])&&q[3][q[4]]===r[1])):countries;
  return rotate(mode,[...base,...(allowed.length>=12?allowed:countries)]);
 }
 if(mode==='mixed'){
  // Preserve valid existing mixed-game content while enriching it with audited questions.
  const core=originalCreate(mode).filter(q=>integrity.safe(q,mode));
  const concept=makeConceptQuestions(),classify=[...bank.makeClassify(),...makeClassificationQuestions()];
  const locations=[...bank.makeLocations(),...makeCountryLocations()];
  // Balanced mix: factual challenge, definitions, classification and locations.
  const candidates=[...shuffle(core).slice(0,3),...shuffle(concept).slice(0,3),...shuffle(classify).slice(0,3),...shuffle(locations).slice(0,3)];
  const selected=rotate(mode,candidates);
  return selected.length===12?selected:rotate(mode,[...candidates,...core,...concept,...classify,...locations]);
 }
 return originalCreate(mode);
};
window.GeoVerseGameExpansionV115={
 stats:()=>({concepts:makeConceptQuestions().length,classificationBase:bank.makeClassify().length,classificationNew:makeClassificationQuestions().length,classificationTotal:bank.makeClassify().length+makeClassificationQuestions().length,locationsBase:bank.makeLocations().length,locationsCountries:makeCountryLocations().length,locationsTotal:bank.makeLocations().length+makeCountryLocations().length}),
 samples:(mode,n=4)=>createGame(mode).slice(0,n)
};
})();