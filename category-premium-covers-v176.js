/* GeoVerse v176 — single canonical source for matching category covers across the homepage, encyclopedia directory and category banners.
 * The same source photograph is used on home, directory, category banner,
 * and standard category detail header. No duplicate image mappings.
 * Sources: locally stored approved GeoVerse artwork for four topics; other photo sources unchanged.
 */
(function(){
'use strict';
const covers=Object.freeze({
 seas:Object.freeze({src:'./assets/category-covers/seas.webp',position:'center 50%',source:'GeoVerse approved generated cover'}),
 waterfalls:Object.freeze({src:'./assets/category-covers/waterfalls.webp',position:'center 50%',source:'GeoVerse approved generated cover'}),
 countries:Object.freeze({src:'./assets/category-covers/countries.webp',position:'center 50%',source:'GeoVerse approved generated cover'}),
 continents:Object.freeze({src:'./assets/category-covers/continents.webp',position:'center 50%',source:'GeoVerse approved generated cover'}),
 astronomy:Object.freeze({src:'./assets/category-covers/astronomy.webp',position:'center 50%',source:'GeoVerse approved generated cover'}),
 deserts:Object.freeze({src:'./assets/category-covers/deserts.webp',position:'center 55%',source:'GeoVerse approved generated cover'}),
 oceans:Object.freeze({src:'./assets/category-covers/oceans.webp',position:'center 55%',source:'GeoVerse approved generated cover'}),
 rivers:Object.freeze({src:'https://images.unsplash.com/photo-1754313778624-77041cafdca9',position:'center 50%',source:'https://unsplash.com/photos/a-teal-river-flows-through-a-lush-green-forest-0PZfQw7q9C0'}),
 mountains:Object.freeze({src:'./assets/category-covers/mountains.webp',position:'center 54%',source:'GeoVerse approved generated cover'}),
 gulfs:Object.freeze({src:'https://images.unsplash.com/photo-1655042489679-7eab34cbcb98',position:'center 48%',source:'https://unsplash.com/photos/kRfq4thWyB8'}),
 tourism:Object.freeze({src:'./assets/category-covers/tourism.webp',position:'center 50%',source:'GeoVerse approved generated cover'})
});
function get(id,width=1100){
 const item=covers[id];if(!item)return '';
 const w=Math.min(1800,Math.max(520,Number(width)||1100));
 return item.src.includes('images.unsplash.com')?item.src+'?auto=format&fit=crop&w='+w+'&q=85':item.src;
}
window.GeoVersePremiumCovers=Object.freeze({covers,get,has:id=>Object.prototype.hasOwnProperty.call(covers,id)});
})();
