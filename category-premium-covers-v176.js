/* GeoVerse v176 — single canonical source for six premium category covers.
 * The same source photograph is used on home, directory, category banner,
 * and standard category detail header. No duplicate image mappings.
 * Sources: Unsplash (Unsplash License), NASA/Apollo 17 (Wikimedia Commons).
 */
(function(){
'use strict';
const covers=Object.freeze({
 countries:Object.freeze({src:'https://images.unsplash.com/photo-1503503330041-4cd943d2b61f',position:'center 52%',source:'https://unsplash.com/photos/world-map-near-desk-globe-on-brown-wooden-panel-u1PX1Q26Kpo'}),
 continents:Object.freeze({src:'https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg',position:'center 47%',source:'https://www.nasa.gov/image-article/apollo-17-blue-marble/'}),
 rivers:Object.freeze({src:'https://images.unsplash.com/photo-1763688506555-c73c1b944080',position:'center 50%',source:'https://unsplash.com/photos/yQJfvo_9eBs'}),
 mountains:Object.freeze({src:'https://images.unsplash.com/photo-1747170917266-213cc5af016a',position:'center 46%',source:'https://unsplash.com/photos/h3FWIyOLFno'}),
 gulfs:Object.freeze({src:'https://images.unsplash.com/photo-1655042489679-7eab34cbcb98',position:'center 48%',source:'https://unsplash.com/photos/kRfq4thWyB8'}),
 tourism:Object.freeze({src:'https://commons.wikimedia.org/wiki/Special:FilePath/Pyramid_and_sphinx_Giza.JPG?width=1440',position:'center 47%',source:'https://commons.wikimedia.org/wiki/File:Pyramid_and_sphinx_Giza.JPG'})
});
function get(id,width=1100){
 const item=covers[id];if(!item)return '';
 const w=Math.min(1800,Math.max(520,Number(width)||1100));
 return item.src.includes('images.unsplash.com')?item.src+'?auto=format&fit=crop&w='+w+'&q=85':item.src;
}
window.GeoVersePremiumCovers=Object.freeze({covers,get,has:id=>Object.prototype.hasOwnProperty.call(covers,id)});
})();
