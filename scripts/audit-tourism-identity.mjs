/**
 * GeoVerse tourism identity audit. Run from repository root:
 *   node scripts/audit-tourism-identity.mjs
 *
 * Static source-integrity test, NOT a certification of every factual claim.
 * Fails on unknown keys and archival story/fact association drift.
 */
import fs from 'node:fs';
import vm from 'node:vm';

const read = name => fs.readFileSync(name, 'utf8');
const parseArray = (filename, expression) => {
  const match = read(filename).match(expression);
  if (!match) throw new Error('Cannot locate records in ' + filename);
  return JSON.parse(match[1]);
};
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
const key = entry => entry.code + '|' + entry.nameEn;
const deepKey = entry => entry[0] + '|' + entry[1];

const original = parseArray(
  'tourism-attractions-v168.js',
  /const attractions=(\[[\s\S]*?\]);/
);
assert(original.length === 48, 'Unexpected number of original tourism sites');
const geo = { tourism: original.map(site => [
  site.ar, site.en, '', '', site.lat, site.lon
]) };
const world = {};
const guide = read('tourism-country-guide-v170.js');
const marker = guide.indexOf('function countrySection');
assert(marker > 0, 'Country guide structure changed');
vm.runInNewContext(
  guide.slice(0, marker) + '\n})();',
  { geo, window: world, state: { page: 'all', lang: 'ar' },
    document: { querySelector: () => null, getElementById: () => null } },
  { timeout: 5000 }
);
const catalogue = world.GeoVerseTourismV170.items;
const deep = parseArray(
  'tourism-deep-enrichment-v597.js',
  /const rows=(\[[\s\S]*?\]);\s*const byKey/
);
assert(catalogue.length === 523 && deep.length === 523,
  'Tourism inventory changed; update audit coverage before shipping');

const byKey = new Map(deep.map(x => [deepKey(x), x]));
assert(byKey.size === deep.length, 'Duplicate deep-enrichment keys');
const catalogueKeys = new Set(catalogue.map(key));
assert(catalogueKeys.size === catalogue.length, 'Duplicate catalogue keys');
for (const item of catalogue) {
  const entry = byKey.get(key(item));
  assert(entry, 'Missing deep-enrichment record: ' + key(item));
  assert(entry.length === 7 && entry.slice(2).every(Boolean),
    'Incomplete deep-enrichment fields: ' + key(item));
}
for (const id of byKey.keys()) assert(catalogueKeys.has(id),
  'Orphan enrichment record: ' + id);

// Compare original 64 IDs against their original indexed editorial record.
// A record with a rewritten story is allowed; verbatim reuse of a different
// landmark's historical story or distinctive fact is always a hard failure.
const legacyFiles = [206, 207, 208, 212, 213, 214, 215];
const indexed = legacyFiles.flatMap(number =>
  parseArray('tourism-enrichment-v' + number + '.js',
    /const (?:data|records)=(\[[\s\S]*?\]);\s*const byIndex/)
);
const legacyByIndex = new Map(indexed.map(x => [x.index, x]));
assert(legacyByIndex.size === 64 && catalogue.slice(0, 64)
  .every((site, index) => site.index === index),
  'Original 64 attraction IDs have drifted');
for (const item of catalogue.slice(0, 64)) {
  const record = byKey.get(key(item));
  for (const other of indexed) {
    if (other.index === item.index) continue;
    assert(record[5] !== other.story,
      'Wrong original story attached to ' + key(item) +
      ' (belongs to original index ' + other.index + ')');
    assert(record[6] !== other.wow?.[0],
      'Wrong original fact attached to ' + key(item) +
      ' (belongs to original index ' + other.index + ')');
  }
}
const phaseFiles = [505, 506, 507, 508, 509, 510];
const phase = phaseFiles.flatMap((num, i) =>
  parseArray('tourism-editorial-phase' + (i + 1) + '-v' + num + '.js',
    /const rows=(\[[\s\S]*?\]);\s*const (?:byKey|lookup)/)
);
assert(phase.length === 176, 'Independent keyed editorial coverage changed');
const phaseKeys = new Set(phase.map(x => x[0] + '|' + x[1]));
assert(phaseKeys.size === phase.length, 'Duplicate keyed editorial entries');
const otherIds = new Set(catalogue.slice(0, 64).map(key));
for (const item of phase) {
  const k = item[0] + '|' + item[1];
  assert(!otherIds.has(k), 'Original/phase source identity overlaps: ' + k);
  otherIds.add(k);
  const current = byKey.get(k);
  assert(current, 'Missing matching deep entry for phase item: ' + k);
  for (const other of phase) {
    if (other === item) continue;
    assert(current[5] !== other[2], 'Story belongs to another keyed site: ' + k);
    assert(current[6] !== other[4], 'Fact belongs to another keyed site: ' + k);
  }
}
assert(otherIds.size === 240, 'Provenance coverage incorrect');
const remaining = catalogue.filter(item => !otherIds.has(key(item)));
assert(remaining.length === 283, 'Independent catalogue-only group changed');

console.log('PASS: 523 catalogue/deep keys aligned, 523 complete records.');
console.log('PASS: 64 indexed sources; 176 keyed editorial sources; 283 catalogue-only entries.');
console.log('PASS: No exact cross-attraction historical or fact association detected.');
console.log('LIMIT: Remaining 283 have independent catalogue descriptions, not a second long-form historical record.');
console.log('LIMIT: Semantic/geographic verification and mobile browser QA remain separate.');
