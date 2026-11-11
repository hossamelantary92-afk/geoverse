#!/usr/bin/env node
/* GeoVerse structural scientific audit. Read-only: does not fetch network data or certify factual accuracy. */
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
function embeddedJson(text, label) {
 const marker = 'const '+label+'=';
 const offset = text.indexOf(marker);
 if(offset < 0) throw Error('Missing '+label);
 const start = text.indexOf('{', offset + marker.length);
 let depth=0, quote=false, escape=false;
 for(let i=start;i<text.length;i++){
  const ch=text[i];
  if(quote) { if(escape) escape=false; else if(ch==='\\') escape=true; else if(ch==='"') quote=false; }
  else if(ch==='"') quote=true; else if(ch==='{') depth++;
  else if(ch==='}' && --depth===0) return JSON.parse(text.slice(start,i+1));
 }
 throw Error('Unclosed '+label);
}
const articles=embeddedJson(read('encyclopedia-v9.js'), 'gvAtlasContent');
const facts=JSON.parse(read('country-facts.json')).byCode;
const metadata=JSON.parse(read('country-meta.json')).countries;
const keys=Object.keys(articles);
const missingSources=keys.filter(code=>!articles[code].source);
const missingFactCodes=keys.filter(code=>!facts[code]);
const undated=keys.filter(code=>facts[code] && Number.isFinite(facts[code].p) && !facts[code].py);
const malformed=keys.filter(code=>articles[code].sections?.length!==6 || articles[code].sections.some(s=>!s[2]?.trim()||!s[3]?.trim()));
const orphanMetadata=metadata.filter(x=>!keys.includes(x.code)).map(x=>({name:x.name,code:x.code}));
const result={
 auditedAt:new Date().toISOString(),scope:'structural_only_not_claim_verification',
 articles:keys.length,sections:keys.reduce((a,code)=>a+articles[code].sections.length,0),
 sourcePresent:keys.length-missingSources.length,missingSources,missingFactCodes,
 undatedPopulation:undated,malformedArticles:malformed,metadataWithoutMatchingArticle:orphanMetadata
};
console.log(JSON.stringify(result,null,2));
if(malformed.length) process.exitCode=1;
