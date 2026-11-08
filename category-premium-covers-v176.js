/* GeoVerse v176 — single canonical source for six premium category covers.
 * The same source photograph is used on home, directory, category banner,
 * and standard category detail header. No duplicate image mappings.
 * Sources: Unsplash (Unsplash License), NASA/Apollo 17 (Wikimedia Commons).
 */
(function(){
'use strict';
const covers=Object.freeze({
 countries:Object.freeze({src:'https://images.unsplash.com/photo-1521295121783-8a321d551ad2',position:'center 48%',source:'https://images.unsplash.com/photo-1521295121783-8a321d551ad2'}),
 continents:Object.freeze({src:'https://images.unsplash.com/photo-1451187580459-43490279c0fa',position:'center 50%',source:'https://unsplash.com/'}),
 rivers:Object.freeze({src:'https://images.unsplash.com/photo-1763688506555-c73c1b944080',position:'center 50%',source:'https://unsplash.com/photos/yQJfvo_9eBs'}),
 mountains:Object.freeze({src:'https://images.unsplash.com/photo-1500534623283-312aade485b7',position:'center 54%',source:'https://unsplash.com/'}),
 gulfs:Object.freeze({src:'https://images.unsplash.com/photo-1655042489679-7eab34cbcb98',position:'center 48%',source:'https://unsplash.com/photos/kRfq4thWyB8'}),
 tourism:Object.freeze({src:'https://images.unsplash.com/photo-1735446918160-af0b896b7a89',position:'center 52%',source:'https://unsplash.com/photos/a-view-of-a-city-with-a-sunset-in-the-background-CD4Bpfzj5ro'})
});
function get(id,width=1100){
 const item=covers[id];if(!item)return '';
 const w=Math.min(1800,Math.max(520,Number(width)||1100));
 return item.src.includes('images.unsplash.com')?item.src+'?auto=format&fit=crop&w='+w+'&q=85':item.src;
}
window.GeoVersePremiumCovers=Object.freeze({covers,get,has:id=>Object.prototype.hasOwnProperty.call(covers,id)});
})();
