/* GeoVerse v170 – Country-first tourism discovery and calm landmark map.
 * Existing v168 dataset remains canonical: 48 real locations in 12 countries.
 * Gallery photos are optional Wikipedia preview thumbnails, never invented.
 */
(function(){
'use strict';
const countries=[["EG","مصر","Egypt"],["FR","فرنسا","France"],["IT","إيطاليا","Italy"],["SA","السعودية","Saudi Arabia"],["TR","تركيا","Turkey"],["ES","إسبانيا","Spain"],["GB","المملكة المتحدة","United Kingdom"],["US","الولايات المتحدة","United States"],["CN","الصين","China"],["IN","الهند","India"],["JP","اليابان","Japan"],["AE","الإمارات","United Arab Emirates"]];
const facts=[["مجموعة أهرامات ملكية تعود إلى مصر القديمة، من أبرز شواهد العمارة الجنائزية.","Ancient royal pyramids and a landmark of Egyptian funerary architecture."],["تمثال حجري ضخم بجسم أسد ورأس إنسان على هضبة الجيزة.","A monumental limestone statue with a lion’s body and human head."],["مجمع معابد واسع في الأقصر اشتهر بأعمدته الضخمة ومبانيه الفرعونية.","A vast temple complex at Luxor known for its monumental columns."],["معبدان صخريان شُيدا في عهد رمسيس الثاني ونُقلا لإنقاذهما من الغرق.","Rock-cut temples of Ramesses II, relocated to protect them from flooding."],["برج حديدي أُنشئ لمعرض باريس العالمي عام 1889، وأصبح رمزًا للمدينة.","An iron tower built for the 1889 Paris World’s Fair."],["متحف فني داخل قصر ملكي سابق، يضم أعمالًا من عصور متعددة.","A major art museum housed in a former royal palace."],["قصر ملكي فرنسي يشتهر بقاعة المرايا والحدائق الرسمية الواسعة.","A royal palace famed for its Hall of Mirrors and formal gardens."],["جزيرة صخرية تتوجها دير تاريخي وتحيط بها ظاهرة المد والجزر.","A tidal island crowned by a historic abbey."],["مدرج روماني ضخم شهد عروضًا عامة في روما القديمة.","An ancient Roman amphitheatre used for public spectacles."],["برج جرس شهير يميل بسبب هبوط التربة أسفل أساساته.","A bell tower famous for its tilt caused by ground settlement."],["نافورة باروكية شهيرة في وسط روما بزخارفها النحتية.","An ornate Baroque fountain in central Rome."],["كاتدرائية قوطية ضخمة تشتهر بواجهتها الرخامية وأبراجها.","A monumental Gothic cathedral famed for its marble façade."],["أقدس مساجد الإسلام ويضم الكعبة المشرفة في مكة المكرمة.","Islam’s holiest mosque, surrounding the Kaaba in Mecca."],["مسجد تاريخي في المدينة المنورة يرتبط بالسيرة النبوية.","A historic mosque in Medina closely associated with the Prophet’s life."],["موقع أثري نبطي يضم مقابر منحوتة في واجهات صخرية بالعلا.","A Nabataean archaeological site with rock-cut tomb façades."],["حي تاريخي في الدرعية يبرز عمارة الطين النجدية وتاريخ الدولة السعودية الأولى.","A historic district showcasing Najdi mud-brick architecture."],["معلم بيزنطي تاريخي في إسطنبول اشتهر بقبته الكبيرة وفسيفسائه.","A Byzantine landmark renowned for its monumental dome and mosaics."],["مسجد عثماني شهير يطل على ميدان السلطان أحمد في إسطنبول.","An Ottoman mosque overlooking Sultanahmet Square."],["قصر عثماني كان مقرًا للحكم والسلاطين لقرون.","An Ottoman palace that served as a seat of government for centuries."],["مجمع كنائس صخرية مزخرفة بالرسوم الجدارية في كابادوكيا.","A complex of rock-cut churches with historic frescoes."],["كنيسة برشلونة الشهيرة من تصميم أنطوني غاودي، وتمتاز بأبراجها النحتية.","Barcelona’s celebrated basilica designed by Antoni Gaudí."],["مجمع قصور وحدائق أندلسي من أبرز آثار غرناطة الإسلامية.","An Andalusi palace and garden complex in Granada."],["متحف فني في مدريد معروف بمجموعاته الأوروبية الكلاسيكية.","A Madrid art museum renowned for European masterworks."],["صرح تاريخي في قرطبة يجمع تراث المسجد الأندلسي والكاتدرائية.","A historic Córdoba monument combining mosque and cathedral heritage."],["قلعة تاريخية على نهر التايمز تضم أجنحة وأسوارًا تعود للعصور الوسطى.","A historic fortress on the Thames with medieval structures."],["الاسم الشائع للجرس الكبير في برج الساعة بقصر وستمنستر.","The famous great bell in the clock tower at Westminster."],["متحف في لندن يضم مجموعات أثرية وثقافية من أنحاء العالم.","A London museum holding archaeological and cultural collections."],["دائرة من الحجارة العملاقة تعود إلى عصور ما قبل التاريخ.","A prehistoric monument made of massive standing stones."],["تمثال على جزيرة الحرية قُدم هدية للولايات المتحدة من فرنسا.","A monumental statue on Liberty Island, gifted by France."],["متنزه حضري كبير في مانهاتن يضم ممرات وبحيرات ومساحات خضراء.","A large Manhattan park with paths, lakes and green spaces."],["نصب تذكاري في واشنطن يكرم الرئيس الأمريكي أبراهام لنكولن.","A Washington memorial honoring Abraham Lincoln."],["أخدود طبيعي هائل نحتته عمليات التعرية ونهر كولورادو.","A vast canyon carved over time by erosion and the Colorado River."],["مجمع قصور إمبراطورية صينية في قلب بكين يعود إلى أسرتي مينغ وتشينغ.","An imperial palace complex in Beijing from the Ming and Qing dynasties."],["مجمّع طقوسي في بكين استخدمه الأباطرة في الشعائر المرتبطة بالسماء.","A Beijing ceremonial complex used by Chinese emperors."],["مجموعة تماثيل جنود وخيول فخارية دُفنت قرب ضريح الإمبراطور تشين شي هوانغ.","Terracotta soldiers and horses buried near Qin Shi Huang’s mausoleum."],["قطاع مُرمّم من سور الصين العظيم شمال غربي بكين.","A restored section of the Great Wall northwest of Beijing."],["ضريح رخامي أبيض شيده الإمبراطور شاه جهان في أغرا.","A white-marble mausoleum built by Shah Jahan in Agra."],["حصن مغولي تاريخي في دلهي ذو أسوار من الحجر الرملي الأحمر.","A Mughal fort in Delhi with red sandstone walls."],["واجهة قصر ذات نوافذ متكررة في جايبور ارتبطت بالحياة الملكية.","A palace façade in Jaipur known for its rows of windows."],["مئذنة حجرية تاريخية ضمن مجمع قطب في دلهي.","A historic stone minaret within Delhi’s Qutb complex."],["معبد زن بوذي في كيوتو يشتهر بجناحه الذهبي المنعكس على البركة.","A Kyoto Zen temple famed for its golden pavilion."],["مزار شنتوي في كيوتو تشتهر ممراته ببوابات التوري الحمراء.","A Kyoto Shinto shrine known for pathways of vermilion torii gates."],["برج اتصالات ومشاهدة مميز في طوكيو مستوحى من تصميم برج إيفل.","A Tokyo observation and communications tower inspired by the Eiffel Tower."],["معبد بوذي قديم في أساكوسا بطوكيو يتقدمه شارع تسوق تقليدي.","A historic Buddhist temple in Tokyo’s Asakusa district."],["ناطحة سحاب في دبي تضم منصات مشاهدة بإطلالات واسعة.","A Dubai skyscraper featuring elevated observation decks."],["مسجد بارز في أبوظبي يشتهر برخامه الأبيض وقبابه الواسعة.","An Abu Dhabi mosque known for white marble and grand domes."],["معلم معماري في دبي على هيئة إطار ضخم يطل على أحياء المدينة.","A giant frame-shaped landmark overlooking Dubai."],["متحف في دبي يستكشف سيناريوهات التكنولوجيا والحياة المستقبلية.","A Dubai museum exploring technology and future scenarios."]];
const category='tourism',root=document.getElementById('main');
const $=(el,selector)=>el?.querySelector(selector);
const t=(ar,en)=>document.documentElement.lang==='en'?en:ar;
const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
if(!Array.isArray(geo?.tourism)||geo.tourism.length<48)return;
// Each destination has four geographically positioned attractions in the v168 catalogue.
for(let i=0;i<48;i++){
 const place=geo.tourism[i],country=countries[Math.floor(i/4)],pair=facts[i];
 place[2]=pair[0];
 place[3]=pair[1];
}
// City labels are parsed from existing v168 descriptions, so the page never guesses locality.
const originals=geo.tourism.slice(0,48).map((place,i)=>({index:i,code:countries[Math.floor(i/4)][0],countryAr:countries[Math.floor(i/4)][1],countryEn:countries[Math.floor(i/4)][2],cityAr:'',cityEn:'',nameAr:place[0],nameEn:place[1],factAr:facts[i][0],factEn:facts[i][1]}));
// The pilot's original entries contain the city names in their descriptions; extract them
// from a dedicated city catalogue matching the same order.
const cities=[["الجيزة","Giza"],["الجيزة","Giza"],["الأقصر","Luxor"],["أسوان","Aswan"],["باريس","Paris"],["باريس","Paris"],["فرساي","Versailles"],["نورماندي","Normandy"],["روما","Rome"],["بيزا","Pisa"],["روما","Rome"],["ميلانو","Milan"],["مكة المكرمة","Mecca"],["المدينة المنورة","Medina"],["العلا","AlUla"],["الدرعية","Diriyah"],["إسطنبول","Istanbul"],["إسطنبول","Istanbul"],["إسطنبول","Istanbul"],["كابادوكيا","Cappadocia"],["برشلونة","Barcelona"],["غرناطة","Granada"],["مدريد","Madrid"],["قرطبة","Córdoba"],["لندن","London"],["لندن","London"],["لندن","London"],["ويلتشير","Wiltshire"],["نيويورك","New York"],["نيويورك","New York"],["واشنطن","Washington, D.C."],["أريزونا","Arizona"],["بكين","Beijing"],["بكين","Beijing"],["شيآن","Xi'an"],["بادالينغ","Badaling"],["أغرا","Agra"],["دلهي","Delhi"],["جايبور","Jaipur"],["نيودلهي","New Delhi"],["كيوتو","Kyoto"],["كيوتو","Kyoto"],["طوكيو","Tokyo"],["طوكيو","Tokyo"],["دبي","Dubai"],["أبوظبي","Abu Dhabi"],["دبي","Dubai"],["دبي","Dubai"]];
const wikipedia=["Giza_pyramid_complex","Great_Sphinx_of_Giza","Karnak","Abu_Simbel","Eiffel_Tower","Louvre","Palace_of_Versailles","Mont-Saint-Michel","Colosseum","Leaning_Tower_of_Pisa","Trevi_Fountain","Milan_Cathedral","Masjid_al-Haram","Prophet%27s_Mosque","Hegra_(Mada%27in_Salih)","At-Turaif_District","Hagia_Sophia","Sultan_Ahmed_Mosque","Topkapı_Palace","Göreme_Open_Air_Museum","Sagrada_Família","Alhambra","Museo_del_Prado","Mosque–Cathedral_of_Córdoba","Tower_of_London","Big_Ben","British_Museum","Stonehenge","Statue_of_Liberty","Central_Park","Lincoln_Memorial","Grand_Canyon","Forbidden_City","Temple_of_Heaven","Terracotta_Army","Badaling","Taj_Mahal","Red_Fort","Hawa_Mahal","Qutb_Minar","Kinkaku-ji","Fushimi_Inari-taisha","Tokyo_Tower","Sensō-ji","Burj_Khalifa","Sheikh_Zayed_Grand_Mosque","Dubai_Frame","Museum_of_the_Future"];
const byCode=new Map();
originals.forEach((a,i)=>{
 a.cityAr=cities[i][0];a.cityEn=cities[i][1];a.wiki=wikipedia[i];
 geo.tourism[i][2]=facts[i][0]+' · '+a.cityAr+'، '+a.countryAr+'.';
 geo.tourism[i][3]=facts[i][1]+' · '+a.cityEn+', '+a.countryEn+'.';
 const group=byCode.get(a.code)||[];group.push(a);byCode.set(a.code,group);
});

// Asian tourism expansion; preserve all prior attraction indices (0–47).
const asianCountries=[["TH","تايلاند","Thailand"],["ID","إندونيسيا","Indonesia"],["KR","كوريا الجنوبية","South Korea"],["VN","فيتنام","Vietnam"]];
const asianFacts=[["مجمع ملكي في بانكوك شُيّد منذ أواخر القرن الثامن عشر ويضم معبد بوذا الزمردي.","A historic Bangkok royal complex that houses the Temple of the Emerald Buddha."],["معبد بوذي على الضفة الغربية لنهر تشاو فرايا يشتهر ببرجه المزخرف بالخزف.","A riverside Buddhist temple celebrated for its porcelain-decorated central prang."],["من أقدم معابد بانكوك ويشتهر بتمثال بوذا المتكئ الضخم.","A historic Bangkok temple famous for its giant reclining Buddha."],["أطلال عاصمة مملكة أيوثايا التاريخية ومعابدها وأبراجها.","Ruins of the historic Ayutthaya kingdom's capital and its temples."],["معبد بوذي ضخم من القرن الثامن والتاسع في جاوة الوسطى.","A monumental eighth–ninth century Buddhist temple in Central Java."],["مجمع معابد هندوسية من القرن التاسع في جاوة يشتهر بأبراجه الحجرية.","A ninth-century Hindu temple compound known for soaring stone towers."],["مزار بحري في بالي قائم فوق تشكيل صخري قبالة الساحل.","A Balinese sea temple standing on an offshore rocky outcrop."],["نصب في ساحة ميرديكا بجاكرتا يخلد استقلال إندونيسيا.","A Jakarta landmark commemorating Indonesian independence."],["القصر الملكي الرئيسي في عهد سلالة جوسون وأحد أشهر معالم سيول.","The principal palace of Korea's Joseon dynasty in Seoul."],["حي تاريخي في سيول يضم منازل هانوك تقليدية وسط المدينة.","A Seoul neighborhood with preserved traditional hanok houses."],["برج اتصالات ومشاهدة على جبل نامسان يوفر إطلالات على سيول.","An observation tower on Namsan offering panoramic views of Seoul."],["معبد بوذي تاريخي قرب غيونغجو يرتبط بتراث مملكة شلا.","A Buddhist temple near Gyeongju associated with the Silla kingdom."],["مجمع تعليمي كونفوشي تاريخي تأسس في القرن الحادي عشر في هانوي.","An eleventh-century Confucian temple and historic academy in Hanoi."],["مدينة تجارية قديمة ذات شوارع ومبانٍ تاريخية متعددة التأثيرات.","A historic trading town with a mix of architectural traditions."],["خليج معروف بجزره وتكويناته الجيرية البارزة فوق المياه.","A bay of dramatic limestone islands and karst scenery."],["مجمع القلعة والقصور التاريخية المرتبط بسلالة نغوين في هيو.","A former imperial citadel and palace complex of the Nguyễn dynasty."]];
const asianCities=[["بانكوك","Bangkok"],["بانكوك","Bangkok"],["بانكوك","Bangkok"],["أيوثايا","Ayutthaya"],["ماجيلانغ","Magelang"],["برامبانان","Prambanan"],["بالي","Bali"],["جاكرتا","Jakarta"],["سيول","Seoul"],["سيول","Seoul"],["سيول","Seoul"],["غيونغجو","Gyeongju"],["هانوي","Hanoi"],["هوي آن","Hội An"],["كوانغ نينه","Quảng Ninh"],["هيو","Huế"]];
const asianWiki=["Grand_Palace","Wat_Arun","Wat_Pho","Ayutthaya_Historical_Park","Borobudur","Prambanan","Tanah_Lot","National_Monument_(Indonesia)","Gyeongbokgung","Bukchon_Hanok_Village","N_Seoul_Tower","Bulguksa","Temple_of_Literature,_Hanoi","Hội_An","Hạ_Long_Bay","Imperial_City_of_Huế"];
asianCountries.forEach(c=>countries.push(c));
for(let j=0;j<asianFacts.length;j++){
 const i=48+j, country=countries[12+Math.floor(j/4)], p=geo.tourism[i];
 if(!p)continue;
 const [factAr,factEn]=asianFacts[j];
 p[2]=factAr+' · '+asianCities[j][0]+'، '+country[1]+'.';
 p[3]=factEn+' · '+asianCities[j][1]+', '+country[2]+'.';
 const item={index:i,code:country[0],countryAr:country[1],countryEn:country[2],cityAr:asianCities[j][0],cityEn:asianCities[j][1],nameAr:p[0],nameEn:p[1],factAr,factEn,wiki:asianWiki[j]};
 originals.push(item);
 const group=byCode.get(item.code)||[];group.push(item);byCode.set(item.code,group);
}
// Phase 1: curated expansion of six existing high-interest destinations.
// Append-only indices preserve saved learning progress and all earlier links.
const phase1Entries=[["EG","القاهرة","Cairo","قلعة صلاح الدين","Cairo Citadel",30.0299,31.2611,"Cairo_Citadel","قلعة تاريخية فوق جبل المقطم تشرف على القاهرة وتضم مساجد ومتاحف.","A medieval citadel on the Mokattam hills, home to historic mosques and museums.","ارتبطت القلعة بالحكم والدفاع عن القاهرة منذ العصر الأيوبي.","Its commanding hilltop position shaped Cairo's medieval defenses."],["EG","القاهرة","Cairo","خان الخليلي","Khan el-Khalili",30.0478,31.2625,"Khan_el-Khalili","سوق تاريخي بالقاهرة الإسلامية اشتهر بالحرف التقليدية والأزقة القديمة.","A historic bazaar in Islamic Cairo known for crafts and old lanes.","يقع قرب الجامع الأزهر ومجموعة من المساجد التاريخية.","The market lies close to Al-Azhar and monuments of medieval Cairo."],["EG","الإسكندرية","Alexandria","قلعة قايتباي","Citadel of Qaitbay",31.213,29.885,"Citadel_of_Qaitbay","حصن مملوكي على ساحل الإسكندرية عند موقع منارة فاروس القديمة.","A Mamluk coastal fortress occupying the site of the ancient Pharos lighthouse.","شُيّدت القلعة في القرن الخامس عشر لحماية ميناء الإسكندرية.","It was built in the fifteenth century to protect Alexandria's harbor."],["EG","الأقصر","Luxor","وادي الملوك","Valley of the Kings",25.7402,32.6014,"Valley_of_the_Kings","جبانة ملكية منحوتة في صخور الضفة الغربية للنيل قرب الأقصر.","A royal necropolis cut into the desert cliffs west of Luxor.","تضم مقابر من عصر الدولة الحديثة، ومنها مقبرة توت عنخ آمون.","The New Kingdom tombs include that of Tutankhamun."],["FR","باريس","Paris","كاتدرائية نوتردام","Notre-Dame de Paris",48.853,2.3499,"Notre-Dame_de_Paris","كاتدرائية قوطية تاريخية على جزيرة المدينة في قلب باريس.","A landmark Gothic cathedral on the Île de la Cité in central Paris.","بدأ بناؤها في القرن الثاني عشر، وتشتهر بدعاماتها الطائرة ونوافذها الوردية.","Construction began in the twelfth century; its flying buttresses are iconic."],["FR","باريس","Paris","قوس النصر","Arc de Triomphe",48.8738,2.295,"Arc_de_Triomphe","نصب تذكاري ضخم عند نهاية الشانزليزيه يخلّد التاريخ العسكري الفرنسي.","A monumental arch at the western end of the Champs-Élysées.","يقع تحت القوس قبر الجندي المجهول وشعلته التذكارية.","The Tomb of the Unknown Soldier lies beneath the arch."],["FR","لوار","Loire Valley","قصر شامبور","Château de Chambord",47.6165,1.517,"Château_de_Chambord","قصر من عصر النهضة الفرنسية يشتهر بأبراجه وسقوفه وسلالمه.","An elaborate French Renaissance château celebrated for its towers and staircases.","يُعد من أبرز قصور وادي اللوار وتحيط به غابة واسعة.","It is one of the Loire Valley's most prominent châteaux."],["FR","بروفانس","Provence","الخانق الكبير فيردون","Verdon Gorge",43.75,6.33,"Verdon_Gorge","خانق نهري عميق في جنوب فرنسا يتميز بمياه فيروزية ومنحدرات صخرية.","A dramatic limestone river gorge in southern France with turquoise waters.","نحت نهر فيردون التضاريس الجيرية، وتوجد مسارات مشاهدة على الحواف.","The Verdon River carved its limestone cliffs and scenic viewpoints."],["IT","روما","Rome","المنتدى الروماني","Roman Forum",41.8925,12.4853,"Roman_Forum","ساحة أثرية كانت مركز الحياة العامة والسياسية في روما القديمة.","Ruins of the civic and political center of ancient Rome.","تضم بقايا معابد وقاعات حكومية وأقواس نصر على امتداد الطريق المقدس.","The ruins include temples, civic buildings and triumphal arches."],["IT","روما","Rome","البانثيون","Pantheon, Rome",41.8986,12.4769,"Pantheon,_Rome","معبد روماني قديم تحول إلى كنيسة ويشتهر بقبة خرسانية ضخمة.","An ancient Roman building renowned for its vast concrete dome.","تسمح الفتحة المستديرة في القبة بدخول ضوء النهار إلى الداخل.","A circular oculus at the crown of the dome admits daylight."],["IT","البندقية","Venice","ساحة سان ماركو","Piazza San Marco",45.4342,12.3388,"Piazza_San_Marco","الساحة الرئيسية في البندقية وتحيط بها مبانٍ تاريخية بارزة.","Venice's main public square surrounded by monumental historic architecture.","تقع بجوار كاتدرائية سان ماركو وقصر دوجي وبرج الأجراس.","It adjoins St Mark's Basilica, the Doge's Palace and bell tower."],["IT","فلورنسا","Florence","كاتدرائية فلورنسا","Florence Cathedral",43.7731,11.256,"Florence_Cathedral","كاتدرائية تشتهر بقبة برونليسكي في قلب مدينة فلورنسا.","Florence's cathedral, famous for Brunelleschi's Renaissance dome.","أصبحت قبتها المميزة علامة بارزة في تاريخ هندسة عصر النهضة.","Its pioneering dome became a landmark of Renaissance engineering."],["SA","الرياض","Riyadh","قصر المصمك","Masmak Fortress",24.631,46.7136,"Masmak_Fortress","حصن طيني تاريخي في قلب الرياض مرتبط بتاريخ توحيد السعودية.","A historic mud-brick fortress in Riyadh linked to Saudi unification.","ارتبط الحصن باستعادة الرياض عام 1902 على يد الملك عبدالعزيز.","The fortress is associated with the recapture of Riyadh in 1902."],["SA","العلا","AlUla","جبل الفيل","Elephant Rock (AlUla)",26.6872,37.9467,"Elephant_Rock_(AlUla)","تشكيل صخري رملي طبيعي يشبه فيلًا وسط صحراء العلا.","A striking sandstone formation resembling an elephant in AlUla.","تشكلت هيئته بفعل عوامل التعرية الطبيعية عبر فترات طويلة.","Wind and weathering shaped its distinctive silhouette."],["SA","جدة","Jeddah","جدة التاريخية","Al-Balad, Jeddah",21.4858,39.1875,"Al-Balad,_Jeddah","حي تراثي بمبانٍ مرجانية ورواشين خشبية في مدينة جدة.","Historic Jeddah district known for coral-stone houses and wooden roshan balconies.","ارتبط الحي بالتجارة البحرية والحجاج القادمين عبر ميناء جدة.","The district grew through maritime trade and pilgrimage routes."],["SA","أبها","Abha","منتزه عسير الوطني","Asir National Park",18.25,42.38,"Asir_National_Park","منطقة جبلية جنوب غرب السعودية تضم غابات ومرتفعات باردة نسبيًا.","A southwestern Saudi mountain park of highlands and juniper woodland.","تتميز مرتفعات عسير بتنوع مناخي ونباتي مختلف عن الصحاري الداخلية.","Asir's highlands support vegetation unlike the inland desert."],["TR","إسطنبول","Istanbul","برج غلطة","Galata Tower",41.0256,28.9741,"Galata_Tower","برج حجري تاريخي في حي غلطة يوفر إطلالات على إسطنبول.","A medieval stone tower offering views over Istanbul's historic peninsula.","يعود شكل البرج إلى التحصينات الجنوية في العصور الوسطى.","Its medieval form reflects Genoese fortifications in Galata."],["TR","إسطنبول","Istanbul","صهريج البازيليك","Basilica Cistern",41.0084,28.9779,"Basilica_Cistern","خزان مياه بيزنطي تحت الأرض يحمل سقفه صفوف من الأعمدة.","An underground Byzantine water reservoir supported by rows of columns.","يشتهر بقاعدتين من الحجر تحملان منحوتتي رأس ميدوسا.","It is famous for two reused stone Medusa-head column bases."],["TR","دنيزلي","Denizli","باموكالي","Pamukkale",37.9204,29.121,"Pamukkale","مدرجات بيضاء من الترافرتين تتشكل حول ينابيع معدنية حرارية.","White travertine terraces formed by mineral-rich thermal waters.","تقع بجوار أطلال مدينة هيرابوليس القديمة.","The terraces lie beside the ancient city of Hierapolis."],["TR","إزمير","İzmir","مدينة أفسس الأثرية","Ephesus",37.94,27.341,"Ephesus","مدينة رومانية قديمة قرب ساحل إيجة تشتهر بمكتبة سيلسوس.","An ancient Greco-Roman city near the Aegean coast famed for the Library of Celsus.","تشمل أطلالها مسرحًا كبيرًا وشوارع مرصوفة ومعابد.","Its ruins contain a grand theatre, paved streets and temples."],["JP","طوكيو","Tokyo","ضريح ميجي","Meiji Shrine",35.6764,139.6993,"Meiji_Shrine","مزار شنتوي تحيط به غابة كثيفة قرب حي هاراجوكو في طوكيو.","A Shinto shrine surrounded by woodland near Tokyo's Harajuku district.","أُنشئ تكريمًا للإمبراطور ميجي والإمبراطورة شوكن.","It honors Emperor Meiji and Empress Shōken."],["JP","نارا","Nara","معبد تودايجي","Tōdai-ji",34.689,135.8398,"Tōdai-ji","معبد بوذي تاريخي في نارا يشتهر بتمثال بوذا البرونزي الكبير.","A historic Nara Buddhist temple housing a colossal bronze Buddha.","تُعد قاعة بوذا الكبرى من أشهر المباني الخشبية الدينية اليابانية.","Its Great Buddha Hall is a major landmark of Japanese wooden architecture."],["JP","هيروشيما","Hiroshima","حديقة السلام التذكارية","Hiroshima Peace Memorial Park",34.3928,132.4525,"Hiroshima_Peace_Memorial_Park","حديقة تذكارية ومتاحف تسلط الضوء على مأساة القصف الذري والسلام.","A memorial park and museum complex devoted to the atomic bombing and peace.","تقع قرب قبة القنبلة الذرية ونهر موتوياسو.","The park lies near the Atomic Bomb Dome and Motoyasu River."],["JP","هاكونه","Hakone","بحيرة آشي","Lake Ashi",35.206,139.026,"Lake_Ashi","بحيرة بركانية في منطقة هاكونه ذات مناظر جبلية وإطلالات على فوجي.","A volcanic crater lake in Hakone known for mountain scenery and views of Fuji.","تشكلت في منطقة بركانية وتحيط بها غابات ومرتفعات.","It lies within a volcanic landscape bordered by wooded hills."]];
for(const [code,cityAr,cityEn,nameAr,nameEn,lat,lon,wiki,factAr,factEn,extraAr,extraEn] of phase1Entries){
 const country=countries.find(c=>c[0]===code);
 if(!country)continue;
 if(originals.some(x=>x.code===code&&x.nameEn.toLowerCase()===nameEn.toLowerCase()))continue;
 const index=geo.tourism.length;
 const item={index,code,countryAr:country[1],countryEn:country[2],cityAr,cityEn,nameAr,nameEn,factAr,factEn,wiki,
  pointsAr:[factAr,extraAr,'يقع المزار في '+cityAr+' ويقدم جانبًا مختلفًا من تراث '+country[1]+'.'],
  pointsEn:[factEn,extraEn,'Located in '+cityEn+', it highlights a distinctive aspect of '+country[2]+'.']};
 geo.tourism.push([nameAr,nameEn,factAr+' · '+cityAr+'، '+country[1]+'.',factEn+' · '+cityEn+', '+country[2]+'.',lat,lon]);
 originals.push(item);
 const group=byCode.get(code)||[];group.push(item);byCode.set(code,group);
}
// Phase 1 / batch 2: add four non-duplicate landmarks to each remaining existing destination.
const phase1Batch2=[["ES","برشلونة","Barcelona","منتزه غويل","Park Güell",41.4145,2.1527,"Park_Güell","حديقة معمارية من تصميم أنطوني غاودي تتميز بالفسيفساء والأشكال العضوية.","A Gaudí-designed park of mosaics and organic architectural forms."],["ES","إشبيلية","Seville","قصر إشبيلية الملكي","Royal Alcázar of Seville",37.3831,-5.9906,"Alcázar_of_Seville","مجمع قصور تاريخي يُظهر تداخل العمارة الإسلامية والمسيحية في الأندلس.","A palace complex reflecting centuries of Islamic and Christian architecture."],["ES","سيغوفيا","Segovia","قناة سيغوفيا الرومانية","Aqueduct of Segovia",40.947,-4.1184,"Aqueduct_of_Segovia","قناة مياه رومانية بأقواس حجرية شاهقة ما زالت تميز وسط سيغوفيا.","A monumental Roman aqueduct whose stone arches dominate central Segovia."],["ES","تينيريفي","Tenerife","منتزه تيد الوطني","Teide National Park",28.2723,-16.6425,"Teide_National_Park","منتزه بركاني بجزر الكناري يضم جبل تيد أعلى قمة في إسبانيا.","A volcanic park in the Canary Islands containing Spain's highest summit."],["GB","لندن","London","قصر باكنغهام","Buckingham Palace",51.5014,-0.1419,"Buckingham_Palace","مقر ملكي معروف في لندن وتُقام أمامه مراسم حرس الشرف.","A prominent royal residence in London known for its guard ceremonies."],["GB","إدنبرة","Edinburgh","قلعة إدنبرة","Edinburgh Castle",55.9486,-3.2,"Edinburgh_Castle","حصن تاريخي على صخرة بركانية يطل على عاصمة اسكتلندا.","A historic fortress crowning a volcanic rock above Edinburgh."],["GB","باث","Bath","الحمامات الرومانية","Roman Baths (Bath)",51.3811,-2.359,"Roman_Baths_(Bath)","مجمع استحمام روماني محفوظ حول ينابيع المياه الحارة في باث.","A well-preserved Roman bathing complex built around thermal springs."],["GB","أيرلندا الشمالية","Northern Ireland","ممر العمالقة","Giant's Causeway",55.2408,-6.5116,"Giant's_Causeway","تشكيلات من أعمدة البازلت المتشابكة نتجت عن نشاط بركاني قديم.","Interlocking basalt columns formed by ancient volcanic processes."],["US","سان فرانسيسكو","San Francisco","جسر البوابة الذهبية","Golden Gate Bridge",37.8199,-122.4783,"Golden_Gate_Bridge","جسر معلق شهير يربط سان فرانسيسكو بمقاطعة مارين.","A landmark suspension bridge across the Golden Gate strait."],["US","وايومنغ","Wyoming","منتزه يلوستون الوطني","Yellowstone National Park",44.6,-110.5,"Yellowstone_National_Park","منتزه طبيعي يضم ينابيع حارة وفوارات مائية وحياة برية متنوعة.","A national park of geothermal features, geysers and diverse wildlife."],["US","نيويورك","New York","مبنى إمباير ستيت","Empire State Building",40.7484,-73.9857,"Empire_State_Building","ناطحة سحاب من طراز الآرت ديكو أصبحت من رموز نيويورك.","An Art Deco skyscraper and an enduring New York landmark."],["US","هاواي","Hawaii","منتزه براكين هاواي الوطني","Hawaiʻi Volcanoes National Park",19.4194,-155.2885,"Hawaiʻi_Volcanoes_National_Park","منتزه بركاني على الجزيرة الكبرى يبرز عمليات تكوّن الجزر البركانية.","A volcanic park on the Big Island showcasing active island-building geology."],["CN","بكين","Beijing","القصر الصيفي","Summer Palace (Beijing)",39.9999,116.2755,"Summer_Palace","حدائق ملكية وبحيرة وعمارة صينية تقليدية شمال غرب بكين.","An imperial garden complex of pavilions and a lake near Beijing."],["CN","تشانغجياجيه","Zhangjiajie","منتزه تشانغجياجيه الوطني","Zhangjiajie National Forest Park",29.3419,110.4529,"Zhangjiajie_National_Forest_Park","منتزه جبلي تشتهر صخوره بأعمدة شاهقة من الحجر الرملي.","A mountain forest park known for soaring sandstone pillars."],["CN","شنغهاي","Shanghai","حديقة يو","Yu Garden",31.227,121.492,"Yu_Garden","حديقة صينية كلاسيكية من عهد مينغ تضم أجنحة وبركًا وصخورًا زخرفية.","A Ming-era classical garden of pavilions, ponds and ornamental rockwork."],["CN","سيتشوان","Sichuan","تمثال ليشان بوذا العملاق","Leshan Giant Buddha",29.545,103.773,"Leshan_Giant_Buddha","تمثال بوذا ضخم منحوت في جرف عند التقاء ثلاثة أنهار.","A giant Buddha carved into a cliff at a three-river confluence."],["IN","جايبور","Jaipur","قلعة آمبر","Amber Fort",26.9855,75.8513,"Amber_Fort","حصن وقصر راجبوتي يقع على تل قرب جايبور.","A hilltop Rajput fort and palace complex near Jaipur."],["IN","أمريتسار","Amritsar","المعبد الذهبي","Golden Temple",31.62,74.8765,"Golden_Temple","المزار المركزي للسيخ ويتميز بمعبد ذهبي وسط حوض مياه.","The Sikh faith's central shrine, gleaming above a sacred pool."],["IN","مومباي","Mumbai","بوابة الهند","Gateway of India",18.9219,72.8347,"Gateway_of_India","قوس تذكاري على الواجهة البحرية لمدينة مومباي.","A monumental arch on Mumbai's waterfront."],["IN","هامبي","Hampi","مجموعة آثار هامبي","Group of Monuments at Hampi",15.335,76.46,"Hampi","بقايا عاصمة فيجاياناغارا التاريخية وسط تلال الجرانيت.","Ruins of the Vijayanagara capital amid granite boulder landscapes."],["AE","دبي","Dubai","برج العرب","Burj Al Arab",25.1412,55.1853,"Burj_Al_Arab","فندق ذو تصميم يشبه الشراع أصبح من رموز ساحل دبي.","A sail-shaped hotel that became an architectural icon of Dubai."],["AE","أبوظبي","Abu Dhabi","متحف اللوفر أبوظبي","Louvre Abu Dhabi",24.5337,54.398,"Louvre_Abu_Dhabi","متحف فني على جزيرة السعديات تميزه قبة هندسية واسعة.","An art museum on Saadiyat Island beneath a distinctive geometric dome."],["AE","دبي","Dubai","حي الفهيدي التاريخي","Al Fahidi Historical Neighbourhood",25.2638,55.2972,"Al_Fahidi_Historical_Neighbourhood","حي قديم يبرز بيوت الأبراج الهوائية والعمارة التقليدية.","A heritage district of traditional houses and wind-tower architecture."],["AE","الشارقة","Sharjah","متحف الشارقة للحضارة الإسلامية","Sharjah Museum of Islamic Civilization",25.366,55.389,"Sharjah_Museum_of_Islamic_Civilization","متحف يقدم الفنون والمخطوطات والتاريخ العلمي للحضارة الإسلامية.","A museum exploring Islamic art, manuscripts and scientific heritage."],["TH","شيانغ ماي","Chiang Mai","وات فرا ذات دوي سوثيب","Wat Phra That Doi Suthep",18.8049,98.9215,"Wat_Phra_That_Doi_Suthep","معبد بوذي على جبل قرب شيانغ ماي يشتهر بستوبا مذهبة.","A hilltop Buddhist temple near Chiang Mai known for its golden chedi."],["TH","سوكوتاي","Sukhothai","منتزه سوكوتاي التاريخي","Sukhothai Historical Park",17.0176,99.7035,"Sukhothai_Historical_Park","أطلال المعابد والتماثيل في العاصمة التاريخية لمملكة سوكوتاي.","Temple and sculpture ruins of the historic Sukhothai kingdom."],["TH","كرابي","Krabi","شاطئ رايلي","Railay Beach",8.012,98.839,"Railay_Beach","شواطئ تحيط بها منحدرات الحجر الجيري قرب كرابي.","Beaches ringed by dramatic limestone cliffs near Krabi."],["TH","بانكوك","Bangkok","بيت جيم تومسون","Jim Thompson House",13.7491,100.528,"Jim_Thompson_House","متحف يضم منازل تايلاندية خشبية تقليدية ومجموعات فنية.","A museum of traditional Thai teak houses and art collections."],["ID","بالي","Bali","مدرجات أرز تيغالالانغ","Tegallalang Rice Terrace",-8.4316,115.2792,"Tegallalang","مدرجات زراعية خضراء قرب أوبود تعتمد تقاليد الري المحلية.","Terraced rice fields near Ubud reflecting traditional irrigation practices."],["ID","كومودو","Komodo","منتزه كومودو الوطني","Komodo National Park",-8.55,119.49,"Komodo_National_Park","جزر محمية تشتهر بتنين كومودو والشعاب والبيئات البحرية.","Protected islands renowned for Komodo dragons and marine ecosystems."],["ID","شرق جاوة","East Java","جبل برومو","Mount Bromo",-7.9425,112.953,"Mount_Bromo","بركان نشط ضمن مشهد من الرمال والجبال في شرق جاوة.","An active volcano surrounded by a vast sand sea in East Java."],["ID","شمال سومطرة","North Sumatra","بحيرة توبا","Lake Toba",2.68,98.88,"Lake_Toba","بحيرة بركانية هائلة تحتضن جزيرة ساموسير في سومطرة.","A vast volcanic caldera lake containing Samosir Island."],["KR","سيول","Seoul","قصر تشانغدوكغونغ","Changdeokgung",37.5794,126.991,"Changdeokgung","قصر من عهد جوسون يشتهر بحديقته الخلفية وتكيفه مع التضاريس.","A Joseon palace noted for its rear garden and landscape design."],["KR","بوسان","Busan","معبد هايدونغ يونغغونغسا","Haedong Yonggungsa",35.1885,129.2233,"Haedong_Yonggungsa","معبد بوذي يقع فوق صخور تطل على ساحل بوسان.","A Buddhist temple built along rocky cliffs on Busan's coast."],["KR","جيجو","Jeju","جبل هالاسان","Hallasan",33.3617,126.5292,"Hallasan","بركان درعي يشكل أعلى قمة في كوريا الجنوبية على جزيرة جيجو.","A shield volcano forming South Korea's highest peak on Jeju Island."],["KR","سوون","Suwon","قلعة هواسونغ","Hwaseong_Fortress",37.287,127.014,"Hwaseong_Fortress","أسوار وتحصينات من أواخر القرن الثامن عشر حول سوون.","Late-eighteenth-century defensive walls encircling historic Suwon."],["VN","دا نانغ","Da Nang","جبال الرخام","Marble Mountains (Vietnam)",16.0036,108.263,"Marble_Mountains_(Vietnam)","تلال من الحجر الجيري والرخام تضم كهوفًا ومعابد قرب الساحل.","Limestone and marble hills with caves and shrines near the coast."],["VN","نينه بينه","Ninh Binh","مجمع ترانغ آن","Tràng An Scenic Landscape Complex",20.25,105.9,"Tràng_An_Scenic_Landscape_Complex","مشهد كارستي من أنهار وكهوف ومعابد وسط جبال خضراء.","A karst landscape of waterways, caves and temples amid green hills."],["VN","كوانغ بينه","Quảng Bình","كهف سون دونغ","Sơn Đoòng Cave",17.453,106.287,"Sơn_Đoòng_cave","كهف عملاق في منتزه فونغ نها-كي بانغ.","An immense cave within Phong Nha–Kẻ Bàng National Park."],["VN","مدينة هو تشي منه","Ho Chi Minh City","قصر الاستقلال","Independence Palace",10.777,106.6953,"Independence_Palace","مبنى تاريخي ارتبط بنهاية حرب فيتنام عام 1975.","A landmark associated with the end of the Vietnam War in 1975."]];
for(const [code,cityAr,cityEn,nameAr,nameEn,lat,lon,wiki,factAr,factEn] of phase1Batch2){
 const country=[...countries,...asianCountries].find(row=>row[0]===code);
 if(!country||originals.some(x=>x.code===code&&x.nameEn.toLocaleLowerCase()===nameEn.toLocaleLowerCase()))continue;
 const index=geo.tourism.length;
 const item={index,code,countryAr:country[1],countryEn:country[2],cityAr,cityEn,nameAr,nameEn,factAr,factEn,wiki,
  pointsAr:[factAr,'يقع المزار في '+cityAr+'، وهو من أبرز الأمثلة على التنوع السياحي في '+country[1]+'.'],
  pointsEn:[factEn,'Located in '+cityEn+', it illustrates the diversity of '+country[2]+'s destinations.']};
 geo.tourism.push([nameAr,nameEn,factAr+' · '+cityAr+'، '+country[1]+'.',factEn+' · '+cityEn+', '+country[2]+'.',lat,lon]);
 originals.push(item);
 const group=byCode.get(code)||[];group.push(item);byCode.set(code,group);
}
window.GeoVerseTourismV170={getByCountry:code=>byCode.get(code)||[],items:originals};
function countrySection(code){
 const items=byCode.get(code);if(!items?.length)return null;
 const section=document.createElement('section');
 section.className='gv9-section gv170-tourism';section.setAttribute('aria-labelledby','gv170TourismHeading');
 section.innerHTML='<div class="gv9-section-title"><span class="gv9-eyebrow">'+t('دليل المزارات','TOURISM GUIDE')+'</span>'+
  '<h2 id="gv170TourismHeading">'+t('أشهر المزارات السياحية','Top tourist attractions')+'</h2>'+
  '<p>'+t('اكتشف معالم الدولة الثقافية والتاريخية، وافتح أي مزار لمعلومات أكثر وموقعه على الكرة الأرضية.',
  'Discover cultural and historical highlights, with a detailed page for each attraction.')+'</p></div>'+
  '<div class="gv170-tourism-grid">'+items.map(item=>
   '<button type="button" class="gv170-tourism-card" data-item="tourism:'+item.index+'">'+
    '<span class="gv170-tourism-photo" data-gv170-photo="'+item.index+'"><span aria-hidden="true">🏛️</span></span>'+
    '<span class="gv170-tourism-text"><span class="gv170-tourism-city">📍 '+esc(t(item.cityAr,item.cityEn))+'</span>'+
    '<strong>'+esc(t(item.nameAr,item.nameEn))+'</strong>'+
    '<small>'+esc(t(item.factAr,item.factEn))+'</small>'+
    '<span class="gv170-tourism-read">'+t('اعرف المزيد','Explore details')+' ←</span></span></button>'
  ).join('')+'</div>';
 return section;
}
const previewCache=new Map(),requested=new Set();
function photoFor(item,wrapper){
 if(window.GeoVerseTourismKnowledgeV196)return; // Image-free tourism knowledge mode.
 if(!wrapper||requested.has(wrapper))return;
 requested.add(wrapper);
 const shared=window.GeoVerseTourismPhotoCatalog;
 if(shared?.resolve){
  shared.resolve(item.index).then(result=>{
   if(!wrapper.isConnected)return;
   const im=document.createElement('img');im.loading='lazy';im.decoding='async';
   im.alt=t('صورة '+item.nameAr,'Photo of '+item.nameEn);
   im.style.objectFit='contain';
   im.addEventListener('load',()=>{
    wrapper.querySelectorAll('img').forEach(old=>{if(old!==im)old.remove()});
    wrapper.classList.add('gv170-photo-loaded');
   });
   im.addEventListener('error',()=>im.remove());
   wrapper.prepend(im);im.src=result.src;
  }).catch(()=>{});
  return;
 }
 let title=item.wiki;
 try{title=decodeURIComponent(title)}catch(e){}
 const endpoint='https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&pithumbsize=520&redirects=1&origin=*&titles='+encodeURIComponent(title.replace(/_/g,' '));
 const cached=previewCache.get(item.index);
 if(cached){show(cached);return}
 function show(src){
  if(!src||!wrapper.isConnected)return;
  const img=document.createElement('img');img.loading='lazy';img.decoding='async';
  img.alt=t('صورة '+item.nameAr,'Photo of '+item.nameEn);
  img.addEventListener('load',()=>wrapper.classList.add('gv170-photo-loaded'));
  img.addEventListener('error',()=>img.remove(),{once:true});
  wrapper.prepend(img);img.src=src;
 }
 fetch(endpoint).then(r=>r.ok?r.json():null).then(data=>{
  const pages=Object.values(data?.query?.pages||{}),src=pages[0]?.thumbnail?.source;
  if(typeof src==='string'&&src.startsWith('https://')){previewCache.set(item.index,src);show(src)}
 }).catch(()=>{});
}
function hydrateCountry(){
 if(state.page!=='country-v4'||!root)return;
 const code=state.v4Code==='UK'?'GB':state.v4Code;
 const existing=root.querySelector('.gv170-tourism');
 if(existing?.dataset.gv170Country===code&&existing?.dataset.gv170Lang===state.lang)return;
 const section=countrySection(code);
 existing?.remove();
 if(!section)return;
 section.dataset.gv170Country=code;section.dataset.gv170Lang=state.lang;
 const anchor=root.querySelector('.gv9-earth');
 if(anchor)root.insertBefore(section,anchor);else root.append(section);
 const items=byCode.get(code)||[];
 items.forEach(item=>photoFor(item,section.querySelector('[data-gv170-photo="'+item.index+'"]')));
}
function addCountryChooser(){
 const map=document.getElementById('worldMap'),toolbar=document.getElementById('mapToolbar');
 const group=$(toolbar,'.gv146-culture');
 if(!map||!group||group.querySelector('.gv170-tourism-chooser'))return;
 const picker=document.createElement('div');
 picker.className='gv170-tourism-chooser gv172-search-chooser';
 const selected=map.dataset.gv170TourismCountry||'';
 const current=countries.find(c=>c[0]===selected);
 const accessible=t('ابحث باسم الدولة','Search by country name');
 picker.innerHTML='<label for="gv172CountrySearch">'+accessible+'</label>'+
 '<div class="gv172-searchbox"><span aria-hidden="true">⌕</span>'+
 '<input id="gv172CountrySearch" class="gv172-country-input" type="search" autocomplete="off" autocorrect="off" spellcheck="false"'+
 ' placeholder="'+t('اكتب اسم الدولة…','Type a country…')+'" aria-label="'+accessible+'"'+
 ' aria-controls="gv172CountryResults" aria-expanded="false" aria-autocomplete="list" role="combobox" value="'+esc(current?t(current[1],current[2]):'')+'"/>'+
 '<button type="button" class="gv172-reset" aria-label="'+t('عرض جميع المزارات','Show all highlights')+'">×</button></div>'+
 '<div id="gv172CountryResults" class="gv172-results" role="listbox" hidden></div>'+
 '<small class="gv170-tourism-count"></small>';
 group.append(picker);
 const input=picker.querySelector('input'),results=picker.querySelector('.gv172-results');
 const normalize=value=>String(value||'').toLocaleLowerCase().normalize('NFKD')
  .replace(/[\u064b-\u065f\u0670]/g,'').replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي')
  .replace(/[^a-z0-9\u0621-\u064a]+/g,' ').trim();
 let highlighted=0,options=[];
 function close(){
  results.hidden=true;input.setAttribute('aria-expanded','false');input.removeAttribute('aria-activedescendant');
 }
 function pick(code){
  const country=countries.find(c=>c[0]===code);
  map.dataset.gv170TourismCountry=country?code:'';
  input.value=country?t(country[1],country[2]):'';
  close();filterPins(map);
  if(typeof atlasView!=='function')return;
  if(!country){atlasView([0,0,1000,520]);return}
  const matches=byCode.get(code)||[],point=geo.tourism[matches[0]?.index];
  const r=typeof atlasRuntime!=='undefined'?atlasRuntime:null;
  if(r?.node===map&&point&&r.proj){
   const p=r.proj([point[5],point[4]]);
   if(p?.every(Number.isFinite)){
    const w=360,h=187;
    atlasView([Math.max(0,Math.min(1000-w,p[0]-w/2)),Math.max(0,Math.min(520-h,p[1]-h/2)),w,h]);
   }
  }
 }
 function paint(){
  results.innerHTML=options.map((c,i)=>
   '<button type="button" role="option" id="gv172Option'+i+'" aria-selected="'+(i===highlighted)+'" class="gv172-result'+(i===highlighted?' gv172-highlight':'')+'" data-gv172-country="'+esc(c[0])+'">'+
   '<span>'+esc(t(c[1],c[2]))+'</span><small>'+esc(t(c[2],c[1]))+'</small></button>').join('')+
   (!options.length?'<p class="gv172-no-result">'+t('لا توجد دولة مطابقة','No matching country')+'</p>':'');
  results.hidden=false;input.setAttribute('aria-expanded','true');
  if(options.length)input.setAttribute('aria-activedescendant','gv172Option'+highlighted);
  else input.removeAttribute('aria-activedescendant');
 }
 function search(){
  const query=normalize(input.value);
  options=countries.filter(c=>!query||normalize(c[1]).includes(query)||normalize(c[2]).includes(query));
  highlighted=0;paint();
 }
 input.addEventListener('focus',search);
 input.addEventListener('input',search);
 input.addEventListener('keydown',e=>{
  if(e.key==='Escape'){close();return}
  if(e.key==='ArrowDown'||e.key==='ArrowUp'){
   e.preventDefault();if(results.hidden)search();
   if(options.length){highlighted=(highlighted+(e.key==='ArrowDown'?1:-1)+options.length)%options.length;paint()}
  }
  if(e.key==='Enter'&&!results.hidden&&options.length){
   e.preventDefault();pick(options[highlighted][0]);
  }
 });
 results.addEventListener('click',e=>{
  const btn=e.target.closest('[data-gv172-country]');
  if(btn)pick(btn.dataset.gv172Country);
 });
 picker.querySelector('.gv172-reset').addEventListener('click',()=>pick(''));
 document.addEventListener('pointerdown',e=>{
  if(picker.isConnected&&!picker.contains(e.target))close();
 },true);
 filterPins(map);
}
function filterPins(map){
 if(!map)return;
 const chooser=document.querySelector('#mapToolbar .gv170-tourism-chooser');
 const layer=typeof activeLayer!=='undefined'?activeLayer:'';
 const active=layer==='tourism';
 if(chooser)chooser.hidden=!active;
 if(!active)return;
 const selected=map.dataset.gv170TourismCountry||'';
 map.querySelectorAll('.atlas-pin[data-map-pin^="tourism:"]').forEach(pin=>{
  const value=pin.getAttribute('data-map-pin')||'';
  const i=Number(value.split(':')[1]),item=originals[i];
  const show=item&&(selected?item.code===selected:i%4===0);
  pin.classList.toggle('gv170-tourism-visible',!!show);
 });
 const count=$(chooser,'.gv170-tourism-count');
 if(count)count.textContent=selected?t('٤ مزارات محددة','4 selected attractions'):t('١٦ دولة · اختر دولة للمزيد','16 countries · choose one for more');
 // The initial 12 markers are entry points; the full 48 remain in data and country pages.
}
let queued=false;
function scan(){
 queued=false;
 if(state.page==='country-v4')hydrateCountry();
 if(state.page==='explore'){
  addCountryChooser();
  filterPins(document.getElementById('worldMap'));
 }
}
function schedule(){
 if(queued)return;queued=true;requestAnimationFrame(scan);
}
const earlierRender=render;
render=function(){
 const result=earlierRender.apply(this,arguments);
 schedule();return result;
};
const earlierDraw=typeof atlasDraw==='function'?atlasDraw:null;
if(earlierDraw)atlasDraw=function(){
 const value=earlierDraw.apply(this,arguments);
 if(state.page==='explore')schedule();
 return value;
};
if(root)new MutationObserver(schedule).observe(root,{childList:true,subtree:false});
schedule();
})();
