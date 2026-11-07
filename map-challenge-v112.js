/* GeoVerse v112 — map quiz questions sourced from exact available GeoJSON countries. */
(function(){
'use strict';
const targets=[["AF","Afghanistan"],["AL","Albania"],["DZ","Algeria"],["AO","Angola"],["AR","Argentina"],["AM","Armenia"],["AU","Australia"],["AT","Austria"],["AZ","Azerbaijan"],["BD","Bangladesh"],["BY","Belarus"],["BE","Belgium"],["BZ","Belize"],["BJ","Benin"],["BT","Bhutan"],["BO","Bolivia"],["BA","Bosnia and Herzegovina"],["BW","Botswana"],["BR","Brazil"],["BN","Brunei"],["BG","Bulgaria"],["BF","Burkina Faso"],["BI","Burundi"],["KH","Cambodia"],["CM","Cameroon"],["CA","Canada"],["CF","Central African Republic"],["TD","Chad"],["CL","Chile"],["CN","China"],["CO","Colombia"],["CR","Costa Rica"],["HR","Croatia"],["CU","Cuba"],["CY","Cyprus"],["CZ","Czech Republic"],["DK","Denmark"],["DJ","Djibouti"],["DO","Dominican Republic"],["EC","Ecuador"],["EG","Egypt"],["SV","El Salvador"],["GQ","Equatorial Guinea"],["ER","Eritrea"],["EE","Estonia"],["ET","Ethiopia"],["FK","Falkland Islands"],["FJ","Fiji"],["FI","Finland"],["FR","France"],["GF","French Guiana"],["GA","Gabon"],["GM","Gambia"],["GE","Georgia"],["DE","Germany"],["GH","Ghana"],["GR","Greece"],["GL","Greenland"],["GT","Guatemala"],["GN","Guinea"],["GW","Guinea-Bissau"],["GY","Guyana"],["HT","Haiti"],["HN","Honduras"],["HU","Hungary"],["IS","Iceland"],["IN","India"],["ID","Indonesia"],["IR","Iran"],["IQ","Iraq"],["IE","Ireland"],["IL","Israel"],["IT","Italy"],["CI","Ivory Coast"],["JM","Jamaica"],["JP","Japan"],["JO","Jordan"],["KZ","Kazakhstan"],["KE","Kenya"],["KW","Kuwait"],["KG","Kyrgyzstan"],["LA","Laos"],["LV","Latvia"],["LB","Lebanon"],["LS","Lesotho"],["LR","Liberia"],["LY","Libya"],["LT","Lithuania"],["LU","Luxembourg"],["MG","Madagascar"],["MW","Malawi"],["MY","Malaysia"],["ML","Mali"],["MR","Mauritania"],["MX","Mexico"],["MD","Moldova"],["MN","Mongolia"],["ME","Montenegro"],["MA","Morocco"],["MZ","Mozambique"],["MM","Myanmar"],["NA","Namibia"],["NP","Nepal"],["NL","Netherlands"],["NC","New Caledonia"],["NZ","New Zealand"],["NI","Nicaragua"],["NE","Niger"],["NG","Nigeria"],["KP","North Korea"],["GB","United Kingdom"],["NO","Norway"],["OM","Oman"],["PK","Pakistan"],["PA","Panama"],["PG","Papua New Guinea"],["PY","Paraguay"],["PE","Peru"],["PH","Philippines"],["PL","Poland"],["PT","Portugal"],["PR","Puerto Rico"],["QA","Qatar"],["RO","Romania"],["RU","Russia"],["RW","Rwanda"],["SA","Saudi Arabia"],["SN","Senegal"],["SL","Sierra Leone"],["SK","Slovakia"],["SI","Slovenia"],["SB","Solomon Islands"],["SO","Somalia"],["ZA","South Africa"],["KR","South Korea"],["SS","South Sudan"],["ES","Spain"],["LK","Sri Lanka"],["SD","Sudan"],["SR","Suriname"],["SE","Sweden"],["CH","Switzerland"],["SY","Syria"],["TJ","Tajikistan"],["TH","Thailand"],["TG","Togo"],["TT","Trinidad and Tobago"],["TN","Tunisia"],["TM","Turkmenistan"],["UG","Uganda"],["UA","Ukraine"],["AE","United Arab Emirates"],["UY","Uruguay"],["UZ","Uzbekistan"],["VU","Vanuatu"],["VE","Venezuela"],["VN","Vietnam"],["EH","Western Sahara"],["YE","Yemen"],["ZM","Zambia"],["ZW","Zimbabwe"]];
const easyNames=new Set(["DZ","AR","AU","BR","CA","CL","CN","CO","EG","ET","FI","FR","DE","GR","IN","ID","IQ","IT","JP","JO","KE","LB","MY","MX","MA","NZ","NG","GB","NO","PK","PE","PL","PT","RU","SA","ZA","KR","ES","SD","SE","TH","TN","UA","AE","VN"]);
const mediumNames=new Set(["RU","CA","CN","BR","GL","AU","IN","ID","AR","KZ","NO","MX","FJ","DZ","MN","SA","CL","IR","ML","JP","PE","PK","MA","SD","LY","ZA","CO","NE","SE","MZ","ET","AO","TD","MM","NA","BO","MR","VE","NZ","UZ","UA","SO","FR","AF","IT","PG","PH","TH","MY","EG","CF","NG","ZM","FI","VN","TM","SS","MG","ES","BW","CM","KE","IQ","GB","OM","DE","PY","YE","LA","PL","EH","ZW","BY","GR","KG","RO","BF","GN","ER","CI","EC","CU","GA","KP","GY","SY","NP","IS","TJ","UG","TN","GH","BD","SN","UY","SB","MW","HR","KH","AZ","AT","NI","HN","HU","BG","BJ","JO","SR","AE","PT","CZ","LV","GE","GT","LR","KR","PA","IE","LT","DK","LB"]);
const usedByLevel={easy:new Set(),medium:new Set(),hard:new Set()};
const previousCreate=createGame;
const shuffled=a=>{const c=a.slice();for(let i=c.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[c[i],c[j]]=[c[j],c[i]];}return c;};
const labelAr=code=>{try{return new Intl.DisplayNames(['ar'],{type:'region'}).of(code)||code}catch{return code}};
function makeRound(){
 const mode=window.GeoVerseGameV110?.getDifficulty?.()||'medium';
 const level=['easy','medium','hard'].includes(mode)?mode:'medium';
 const eligible=targets.filter(([code])=>level==='hard'||(level==='easy'?easyNames:mediumNames).has(code));
 const used=usedByLevel[level];
 let pool=shuffled(eligible.filter(([code])=>!used.has(code)));
 if(pool.length<12){used.clear();pool=shuffled(eligible)}
 const selected=pool.slice(0,12);
 for(const [code] of selected)used.add(code);
 return selected.map(([code,name])=>{
  const ar=labelAr(code);
  return ['اضغط على '+ar+' على الخريطة','Find '+name+' on the map',[],[],0,'الدولة الصحيحة: '+ar+'.','Correct country: '+name+'.',name];
 });
}
createGame=function(mode){return mode==='mapfind'?makeRound():previousCreate(mode)};
document.addEventListener('click',function(e){
 if(e.target.closest?.('#restartQuiz')&&selectedGameMode==='mapfind')quiz=createGame('mapfind');
},true);
window.GeoVerseMapChallengeV112={stats:{total:targets.length,easy:easyNames.size,medium:mediumNames.size,hard:targets.length},source:'world.geojson + country-meta.json'};
})();