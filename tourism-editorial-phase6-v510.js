/* GeoVerse Tourism Phase 6 — final three uncovered added attractions.
 * Site-specific, primary-source-checked editorial profiles. No index changes.
 */
(function(){'use strict';
const rows=[["VN","Marble Mountains (Vietnam)","تُعرف جبال الرخام باسم نغو هانه سون، وهي خمس تلال من الحجر الجيري والرخام قرب دا نانغ، تحمل أسماء عناصر الطبيعة الخمسة في التقليد الفيتنامي.","تضم التلال كهوفًا ومعابد وأضرحة بوذية، وتُعد تلة ثوي سون من أشهر مواقع الاستكشاف بينها.","الجبال ليست قمة واحدة؛ بل مجموعة من خمس تلال متجاورة، وقد استُخدمت كهوفها لأغراض روحية عبر قرون.","تلال كارستية من الحجر الجيري والرخام، تضم درجات منحوتة وكهوفًا طبيعية ومعابد صغيرة.","https://vietnam.travel/things-to-do/around-marble-mountains/"],["VN","Tràng An Scenic Landscape Complex","تجمع ترانغ آن في نينه بينه بين جبال كارستية وأنهار وممرات كهفية ومواقع تاريخية قديمة، وأُدرجت ضمن التراث العالمي بوصفها موقعًا ثقافيًا وطبيعيًا مختلطًا.","تكشف كهوفها آثار نشاط بشري يمتد لأكثر من ثلاثين ألف سنة، وتُظهر كيفية تكيف الإنسان مع تغير مستويات البحر والبيئة.","تسمح المجاري المائية لبعض القوارب الصغيرة بالعبور عبر كهوف تحت جبال الحجر الجيري، في مشهد يربط الجيولوجيا بتاريخ الاستيطان.","أبراج كلسية شاهقة مغطاة بالنبات، ووديان مغلقة وكهوف مائية ومعابد وحقول أرز.","https://whc.unesco.org/en/list/1438"],["VN","Independence Palace","بُني قصر الاستقلال الحالي في سايغون بعد تضرر القصر السابق سنة 1962، وافتُتح سنة 1966 ليكون مقرًا للحكم في جمهورية فيتنام آنذاك.","يرتبط الموقع بأحداث الثلاثين من أبريل 1975 التي شكّلت نهاية حرب فيتنام، وأصبح لاحقًا موقعًا تاريخيًا ومتحفًا للذاكرة السياسية.","يعرض القصر قاعات رسمية وغرف عمليات ومرافق اتصالات تعكس وظائفه السياسية والعسكرية في القرن العشرين.","مبنى حديث بواجهات أفقية ومظلات خرسانية وقاعات رسمية وحدائق واسعة.","https://dinhdoclap.gov.vn/en/history-of-the-independent-palace/"]];
const byKey=new Map(rows.map(r=>[r[0]+'|'+r[1],r]));
window.GeoVerseTourismEditorialPhase6=Object.freeze({
 count:rows.length,
 get(index){
  const item=window.GeoVerseTourismV170?.items?.[index];
  const r=item&&byKey.get(item.code+'|'+item.nameEn);
  return r?{story:r[2],points:[item.factAr,r[3]],wow:[r[4]],architecture:r[5]}:null;
 }
});
})();
