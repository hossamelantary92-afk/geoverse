/* GeoVerse v123: strict, synchronous Arabic/English quiz options.
 * One localized answer list is used by every quiz mode.
 */
(function(){
'use strict';
const localization={"AF":"كابول","AL":"تيرانا","DZ":"الجزائر","AD":"أندورا لا فيلا","AO":"لواندا","AG":"سانت جونز","AR":"بوينس آيرس","AM":"يريفان","AU":"كانبرا","AT":"فيينا","AZ":"باكو","BS":"ناساو","BH":"المنامة","BD":"دكا","BB":"بريدجتاون","BY":"مينسك","BE":"بروكسل","BZ":"بلموبان","BJ":"بورتو نوفو","BT":"تيمفو","BO":"سوكري (الدستورية)، لاباز (مقر الحكومة)","BA":"سراييفو","BW":"غابورون","BR":"برازيليا","BN":"بندر سري بكاوان","BG":"صوفيا","BF":"واغادوغو","KH":"بنوم بنه","CM":"ياوندي","CA":"أوتاوا","CV":"برايا","CF":"بانغي","TD":"نجامينا","CL":"سانتياغو","CN":"بكين","CO":"بوغوتا","KM":"موروني","CG":"برازافيل","CD":"كينشاسا","CR":"سان خوسيه","CI":"ياموسوكرو","HR":"زغرب","CU":"هافانا","CY":"نيقوسيا","CZ":"براغ","DK":"كوبنهاجن","DJ":"جيبوتي","DM":"روسو","DO":"سانتو دومينغو","EC":"كيتو","EG":"القاهرة","SV":"سان سلفادور","GQ":"مدينة السلام (Ciudad de la Paz)","ER":"أسمرة","EE":"تالين","ET":"أديس أبابا","FJ":"سوفا","FI":"هلسنكي","FR":"باريس","GA":"ليبرفيل","GM":"بانجول","GE":"تبليسي","DE":"برلين","GH":"أكرا","GR":"أثينا","GD":"سانت جورجز","GT":"غواتيمالا سيتي","GN":"كوناكري","GW":"بيساو","GY":"جورج تاون","HT":"بورت أو برنس","HN":"تيغوسيغالبا","HU":"بودابست","IS":"ريكيافيك","IN":"نيودلهي","ID":"جاكرتا","IR":"طهران","IQ":"بغداد","IE":"دبلن","IT":"روما","JM":"كينغستون","JP":"طوكيو","JO":"عمّان","KZ":"أستانا","KE":"نيروبي","KI":"تاراوا","KW":"الكويت","KG":"بيشكيك","LA":"فيينتيان","LV":"ريغا","LB":"بيروت","LS":"ماسيرو","LR":"مونروفيا","LY":"طرابلس","LI":"فادوتس","LT":"فيلنيوس","LU":"لوكسمبورغ","MG":"أنتاناناريفو","MW":"ليلونغوي","MY":"كوالالمبور (العاصمة)، بوتراجايا (المركز الإداري)","MV":"ماليه","ML":"باماكو","MT":"فاليتا","MH":"ماجورو","MR":"نواكشوط","MU":"بورت لويس","MX":"مكسيكو سيتي","FM":"باليكير","MD":"كيشيناو","MC":"موناكو","MN":"أولان باتور","ME":"بودغوريتسا","MA":"الرباط","MZ":"مابوتو","MM":"نايبيداو","NA":"ويندهوك","NP":"كاتماندو","NL":"أمستردام","NZ":"ويلينغتون","NI":"ماناغوا","NE":"نيامي","NG":"أبوجا","KP":"بيونغ يانغ","MK":"سكوبيه","NO":"أوسلو","OM":"مسقط","PK":"إسلام آباد","PW":"نغيرولمود","PA":"بنما سيتي","PG":"بورت مورسبي","PY":"أسونسيون","PE":"ليما","PH":"مانيلا","PL":"وارسو","PT":"لشبونة","QA":"الدوحة","RO":"بوخارست","RU":"موسكو","RW":"كيغالي","KN":"باستير","LC":"كاستريس","VC":"كينغستاون","WS":"أبيا","SM":"سان مارينو","ST":"ساو تومي","SA":"الرياض","SN":"داكار","RS":"بلغراد","SC":"فيكتوريا","SL":"فريتاون","SG":"سنغافورة","SK":"براتيسلافا","SI":"ليوبليانا","SB":"هونيارا","SO":"مقديشو","ZA":"بريتوريا (إدارية)، كيب تاون (تشريعية)، بلومفونتين (قضائية)","KR":"سيول","SS":"جوبا","ES":"مدريد","LK":"سري جاياواردنابورا كوتي (تشريعية)، كولومبو (تنفيذية وقضائية)","SD":"الخرطوم","SR":"باراماريبو","SE":"ستوكهولم","CH":"برن","SY":"دمشق","TW":"تايبيه","TJ":"دوشنبه","TZ":"دودوما","TH":"بانكوك","TL":"ديلي","TG":"لومي","TO":"نوكوالوفا","TT":"بورت أوف سبين","TN":"تونس","TR":"أنقرة","TM":"عشق آباد","TV":"فونافوتي","UG":"كمبالا","UA":"كييف","AE":"أبوظبي","GB":"لندن","US":"واشنطن العاصمة","UY":"مونتفيديو","UZ":"طشقند","VU":"بورت فيلا","VA":"الفاتيكان","VE":"كاراكاس","VN":"هانوي","YE":"صنعاء (دستورية)، عدن (مقر الحكومة المعترف بها دوليًا)","ZM":"لوساكا","ZW":"هراري","PS":"القدس الشرقية (عاصمة تطالب بها فلسطين)، رام الله (مقر الإدارة)","HK":"لا توجد عاصمة مستقلة؛ مقر الإدارة في هونغ كونغ","MO":"لا توجد عاصمة مستقلة؛ ماكاو منطقة إدارية خاصة","FO":"توشهافن","GL":"نوك","PR":"سان خوان","GU":"هاغاتنيا","AS":"باغو باغو (مقر الحكومة: فاغاتوغو)","BI":"غيتيغا (العاصمة السياسية)، بوجومبورا (العاصمة الاقتصادية)","EH":"لا توجد عاصمة معترف بها دوليًا (إقليم متنازع عليه)","MP":"سايبان (مقر الحكومة في كابيتول هيل)","MS":"بليموث (رسميًا)، ومقر الحكومة في برادس","NC":"نوميا","NR":"لا توجد عاصمة رسمية (الحكومة في يارين)","SH":"جيمس تاون (مركز إدارة سانت هيلينا)","SJ":"لا توجد عاصمة واحدة للمجموعتين","PN":"آدمزتاون (المستوطنة المأهولة)","TK":"لا توجد عاصمة رسمية واحدة","UK":"لندن (مدخل مكرر؛ انظر GB)","TP":"ديلي (مدخل تاريخي؛ انظر TL)","SZ":"مبابان (إدارية)، لوبامبا (تشريعية وملكية)","UM":"لا توجد عاصمة؛ تجميع جغرافي للجزر"};
const countries=[["Afghanistan","AF","Kabul"],["Albania","AL","Tirana"],["Algeria","DZ","Alger"],["American Samoa","AS","Pago Pago (Fagatogo government seat)"],["Andorra","AD","Andorra la Vella"],["Angola","AO","Luanda"],["Anguilla","AI","The Valley"],["Antigua and Barbuda","AG","Saint John's"],["Argentina","AR","Buenos Aires"],["Armenia","AM","Yerevan"],["Aruba","AW","Oranjestad"],["Australia","AU","Canberra"],["Austria","AT","Vienna"],["Azerbaijan","AZ","Baku"],["Bahamas","BS","Nassau"],["Bahrain","BH","al-Manama"],["Bangladesh","BD","Dhaka"],["Barbados","BB","Bridgetown"],["Belarus","BY","Minsk"],["Belgium","BE","Bruxelles [Brussel]"],["Belize","BZ","Belmopan"],["Benin","BJ","Porto-Novo"],["Bermuda","BM","Hamilton"],["Bhutan","BT","Thimphu"],["Bolivia","BO","Sucre (constitutional capital); La Paz (seat of government)"],["Bosnia and Herzegovina","BA","Sarajevo"],["Botswana","BW","Gaborone"],["Brazil","BR","Brasília"],["Brunei","BN","Bandar Seri Begawan"],["Bulgaria","BG","Sofia"],["Burkina Faso","BF","Ouagadougou"],["Burundi","BI","Gitega"],["Cambodia","KH","Phnom Penh"],["Cameroon","CM","Yaoundé"],["Canada","CA","Ottawa"],["Cape Verde","CV","Praia"],["Cayman Islands","KY","George Town"],["Central African Republic","CF","Bangui"],["Chad","TD","N'Djamena"],["Chile","CL","Santiago de Chile"],["China","CN","Beijing"],["Christmas Island","CX","Flying Fish Cove"],["Cocos (Keeling) Islands","CC","West Island"],["Colombia","CO","Bogota"],["Comoros","KM","Moroni"],["Congo","CG","Brazzaville"],["Cook Islands","CK","Avarua"],["Costa Rica","CR","San José"],["Croatia","HR","Zagreb"],["Cuba","CU","La Habana"],["Cyprus","CY","Nicosia"],["Czech Republic","CZ","Prague"],["Denmark","DK","Copenhagen"],["Djibouti","DJ","Djibouti"],["Dominica","DM","Roseau"],["Dominican Republic","DO","Santo Domingo"],["East Timor (historical alias of Timor-Leste)","TP","Dili (historical entry; see TL)"],["Ecuador","EC","Quito"],["Egypt","EG","Cairo"],["El Salvador","SV","San Salvador"],["Equatorial Guinea","GQ","Ciudad de la Paz"],["Eritrea","ER","Asmara"],["Estonia","EE","Tallinn"],["Eswatini","SZ","Mbabane (administrative); Lobamba (legislative and royal)"],["Ethiopia","ET","Addis Ababa"],["Falkland Islands","FK","Stanley"],["Faroe Islands","FO","Tórshavn"],["Fiji","FJ","Suva"],["Finland","FI","Helsinki"],["France","FR","Paris"],["French Guiana","GF","Cayenne"],["French Polynesia","PF","Papeete (administrative center)"],["Gabon","GA","Libreville"],["Gambia","GM","Banjul"],["Georgia","GE","Tbilisi"],["Germany","DE","Berlin"],["Ghana","GH","Accra"],["Gibraltar","GI","Gibraltar"],["Greece","GR","Athens"],["Greenland","GL","Nuuk"],["Grenada","GD","Saint George's"],["Guadeloupe","GP","Basse-Terre"],["Guam","GU","Hagåtña"],["Guatemala","GT","Guatemala City"],["Guinea","GN","Conakry"],["Guinea-Bissau","GW","Bissau"],["Guyana","GY","Georgetown"],["Haiti","HT","Port-au-Prince"],["Vatican City","VA","Vatican City"],["Honduras","HN","Tegucigalpa"],["Hungary","HU","Budapest"],["Iceland","IS","Reykjavík"],["India","IN","New Delhi"],["Indonesia","ID","Jakarta"],["Iran","IR","Tehran"],["Iraq","IQ","Baghdad"],["Ireland","IE","Dublin"],["Israel","IL","Jerusalem"],["Italy","IT","Rome"],["Ivory Coast","CI","Yamoussoukro"],["Jamaica","JM","Kingston"],["Japan","JP","Tokyo"],["Jordan","JO","Amman"],["Kazakhstan","KZ","Astana"],["Kenya","KE","Nairobi"],["Kiribati","KI","Bairiki"],["Kuwait","KW","Kuwait"],["Kyrgyzstan","KG","Bishkek"],["Laos","LA","Vientiane"],["Latvia","LV","Riga"],["Lebanon","LB","Beirut"],["Lesotho","LS","Maseru"],["Liberia","LR","Monrovia"],["Libya","LY","Tripoli"],["Liechtenstein","LI","Vaduz"],["Lithuania","LT","Vilnius"],["Luxembourg","LU","Luxembourg City"],["North Macedonia","MK","Skopje"],["Madagascar","MG","Antananarivo"],["Malawi","MW","Lilongwe"],["Malaysia","MY","Kuala Lumpur (capital); Putrajaya (administrative center)"],["Maldives","MV","Malé"],["Mali","ML","Bamako"],["Malta","MT","Valletta"],["Marshall Islands","MH","Majuro"],["Martinique","MQ","Fort-de-France"],["Mauritania","MR","Nouakchott"],["Mauritius","MU","Port-Louis"],["Mayotte","YT","Mamoudzou"],["Mexico","MX","Mexico City"],["Micronesia, Federated States of","FM","Palikir"],["Moldova","MD","Chisinau"],["Monaco","MC","Monaco-Ville"],["Mongolia","MN","Ulaanbaatar"],["Montenegro","ME","Podgorica"],["Montserrat","MS","Plymouth (official; government in Brades)"],["Morocco","MA","Rabat"],["Mozambique","MZ","Maputo"],["Myanmar","MM","Naypyidaw"],["Namibia","NA","Windhoek"],["Nepal","NP","Kathmandu"],["Netherlands","NL","Amsterdam"],["New Caledonia","NC","Nouméa"],["New Zealand","NZ","Wellington"],["Nicaragua","NI","Managua"],["Niger","NE","Niamey"],["Nigeria","NG","Abuja"],["Niue","NU","Alofi"],["Norfolk Island","NF","Kingston (administrative center)"],["North Korea","KP","Pyongyang"],["United Kingdom","GB","London"],["Northern Mariana Islands","MP","Saipan (Capitol Hill government seat)"],["Norway","NO","Oslo"],["Oman","OM","Muscat"],["Pakistan","PK","Islamabad"],["Palau","PW","Ngerulmud"],["Palestine","PS","East Jerusalem (claimed); Ramallah (administrative seat)"],["Panama","PA","Panama City"],["Papua New Guinea","PG","Port Moresby"],["Paraguay","PY","Asunción"],["Peru","PE","Lima"],["Philippines","PH","Manila"],["Pitcairn Islands","PN","Adamstown (Pitcairn settlement)"],["Poland","PL","Warsaw"],["Portugal","PT","Lisbon"],["Puerto Rico","PR","San Juan"],["Qatar","QA","Doha"],["Reunion","RE","Saint-Denis"],["Romania","RO","Bucharest"],["Russia","RU","Moscow"],["Rwanda","RW","Kigali"],["Saint Helena, Ascension and Tristan da Cunha","SH","Jamestown (St Helena administrative center)"],["Saint Kitts and Nevis","KN","Basseterre"],["Saint Lucia","LC","Castries"],["Saint Pierre and Miquelon","PM","Saint-Pierre"],["Saint Vincent and the Grenadines","VC","Kingstown"],["Samoa","WS","Apia"],["San Marino","SM","San Marino"],["Sao Tome and Principe","ST","São Tomé"],["Saudi Arabia","SA","Riyadh"],["Senegal","SN","Dakar"],["Serbia","RS","Belgrade"],["Seychelles","SC","Victoria"],["Sierra Leone","SL","Freetown"],["Singapore","SG","Singapore"],["Slovakia","SK","Bratislava"],["Slovenia","SI","Ljubljana"],["Solomon Islands","SB","Honiara"],["Somalia","SO","Mogadishu"],["South Africa","ZA","Pretoria (administrative); Cape Town (legislative); Bloemfontein (judicial)"],["South Korea","KR","Seoul"],["South Sudan","SS","Juba"],["Spain","ES","Madrid"],["Sri Lanka","LK","Sri Jayawardenepura Kotte (legislative); Colombo (executive and judicial)"],["Sudan","SD","Khartoum"],["Suriname","SR","Paramaribo"],["Sweden","SE","Stockholm"],["Switzerland","CH","Bern"],["Syria","SY","Damascus"],["Tajikistan","TJ","Dushanbe"],["Tanzania","TZ","Dodoma"],["Thailand","TH","Bangkok"],["The Democratic Republic of Congo","CD","Kinshasa"],["Togo","TG","Lomé"],["Tonga","TO","Nuku'alofa"],["Trinidad and Tobago","TT","Port of Spain"],["Tunisia","TN","Tunis"],["Türkiye","TR","Ankara"],["Turkmenistan","TM","Ashgabat"],["Turks and Caicos Islands","TC","Cockburn Town"],["Tuvalu","TV","Funafuti"],["Uganda","UG","Kampala"],["Ukraine","UA","Kyiv"],["United Arab Emirates","AE","Abu Dhabi"],["United Kingdom (legacy duplicate of GB)","UK","London (see GB)"],["United States","US","Washington, D.C."],["Uruguay","UY","Montevideo"],["Uzbekistan","UZ","Tashkent"],["Vanuatu","VU","Port Vila"],["Venezuela","VE","Caracas"],["Vietnam","VN","Hanoi"],["British Virgin Islands","VG","Road Town"],["Virgin Islands, U.S.","VI","Charlotte Amalie"],["Wallis and Futuna","WF","Mata-Utu"],["Yemen","YE","Sana'a (constitutional; interim government based in Aden)"],["Zambia","ZM","Lusaka"],["Zimbabwe","ZW","Harare"],["Guernsey","GG","St. Peter Port"],["Isle of Man","IM","Douglas"],["Jersey","JE","Saint Helier"],["Timor-Leste","TL","Dili"]];
const supplementalCapitals={"AI":"ذا فالي","AW":"أورانجيستاد","BM":"هاميلتون","KY":"جورج تاون","CX":"فلاينغ فيش كوف","CC":"ويست آيلاند","CK":"أفاروا","FK":"ستانلي","GF":"كايين","GI":"جبل طارق","GP":"باس تير","MQ":"فور دو فرانس","YT":"مامودزو","NU":"ألوفي","RE":"سان دوني","PM":"سان بيير","TC":"كوكبورن تاون","VG":"رود تاون","VI":"شارلوت أمالي","WF":"ماتا أوتو","GG":"سان بيتر بورت","IM":"دوغلاس","JE":"سانت هيليير","PF":"بابيتي","NF":"كينغستون"};
const specialCountries={"The Democratic Republic of Congo":"جمهورية الكونغو الديمقراطية","DR Congo":"جمهورية الكونغو الديمقراطية","United States of America":"الولايات المتحدة الأمريكية","The Bahamas":"جزر البهاما","Czech Republic":"التشيك","Ivory Coast":"ساحل العاج","Türkiye":"تركيا","North Macedonia":"مقدونيا الشمالية","Republic of Serbia":"صربيا","East Timor":"تيمور الشرقية","Macedonia":"مقدونيا الشمالية"};
const countryNames=new Map();
const capitalNames=new Map();
const arabic=/[\u0600-\u06FF]/;
const latin=/[A-Za-z]/;
const countryAr=code=>{
 try{const n=new Intl.DisplayNames(['ar'],{type:'region'}).of(code);return arabic.test(n)?n:''}catch{return ''}
};
for(const [english,code,capital] of countries){
 const ar=specialCountries[english]||countryAr(code);
 if(ar)countryNames.set(english.toLowerCase(),ar);
 const capAr=localization[code]||supplementalCapitals[code];
 if(capAr&&arabic.test(capAr))capitalNames.set(capital.toLowerCase(),capAr);
}
for(const [en,ar] of Object.entries(specialCountries))countryNames.set(en.toLowerCase(),ar);
const pool=window.GeoVerseQuestionPools?.capitals||[];
for(const row of pool){
 if(row[1]&&row[0]&&arabic.test(row[0]))countryNames.set(row[1].toLowerCase(),row[0]);
 const known=localization[String(row[4]||'').toUpperCase()]||supplementalCapitals[String(row[4]||'').toUpperCase()]||row[2];
 if(row[3]&&known&&arabic.test(known))capitalNames.set(row[3].toLowerCase(),known);
}
for(const entries of Object.values(geo||{})){
 if(!Array.isArray(entries))continue;
 for(const item of entries){
  if(item?.[1]&&item?.[0]&&arabic.test(item[0]))countryNames.set(String(item[1]).toLowerCase(),String(item[0]));
 }
}
const aliases=[
 ...[...capitalNames.entries(),...countryNames.entries()].filter(([en,ar])=>en&&ar&&latin.test(en)&&arabic.test(ar))
].sort((a,b)=>b[0].length-a[0].length);
const escapeRegex=s=>s.replace(/[.*+?^$\u007b\u007d()|[\]\\]/g,'\\$&');
function translate(english){
 const key=String(english||'').trim().toLowerCase();
 if(capitalNames.has(key))return capitalNames.get(key);
 if(countryNames.has(key))return countryNames.get(key);
 let out=String(english||'');
 for(const [en,ar] of aliases){
  if(out.toLowerCase()===en)return ar;
  if(en.length<4)continue;
  out=out.replace(new RegExp('(^|[^A-Za-z])('+escapeRegex(en)+')(?=$|[^A-Za-z])','gi'),(_,prefix)=>prefix+ar);
 }
 return out;
}
const native=s=>!latin.test(String(s||''))&&arabic.test(String(s||''));
function localizeQuestion(q,mode){
 if(!Array.isArray(q))return null;
 if(mode==='mapfind')return q;
 if(!Array.isArray(q[2])||!Array.isArray(q[3])||q[2].length!==4||q[3].length!==4)return null;
 const question=q.slice(),answers=q[2].slice();
 for(let i=0;i<4;i++){
  if(!native(answers[i]))answers[i]=translate(q[3][i]);
  if(!native(answers[i]))return null;
 }
 const normalize=s=>String(s).normalize('NFKC').replace(/[\u064b-\u065f\u0640]/g,'').replace(/[أإآ]/g,'ا').replace(/ى/g,'ي').trim();
 if(new Set(answers.map(normalize)).size!==4)return null;
 question[2]=answers;
 if(latin.test(question[0]))question[0]=translate(question[0]);
 if(latin.test(question[5]))question[5]=translate(question[5]);
 if(latin.test(question[0])||!arabic.test(question[0]))return null;
 // Feedback may contain English proper nouns; avoid mixed-language answers.
 if(latin.test(question[5]))question[5]='الإجابة الصحيحة: '+answers[q[4]]+'.';
 return question;
}
const earlierCreate=createGame;
createGame=function(mode){
 const collected=[],seen=new Set(),maxAttempts=7;
 for(let k=0;k<maxAttempts&&collected.length<12;k++){
  const batch=earlierCreate(mode)||[];
  for(const row of batch){
   const q=localizeQuestion(row,mode);
   if(!q)continue;
   const id=mode==='mapfind'?String(q[7]):mode==='flags'?String(q[7]):String(q[1]);
   if(seen.has(id))continue;
   seen.add(id);collected.push(q);
   if(collected.length===12)break;
  }
 }
 return collected;
};
window.GeoVerseGameLanguageV123={translate,localizeQuestion,stats:{capitals:capitalNames.size,countries:countryNames.size},audit(q){return localizeQuestion(q,'mixed')!==null}};
})();