#!/usr/bin/env node
/**
 * Non-destructive GeoVerse country-data quality inventory.
 * Run: node scripts/audit-country-data.mjs
 * Reports discrepancies; it does not rewrite editorial content or decide sovereignty.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const metadata = JSON.parse(readFileSync(resolve(root, 'country-meta.json'), 'utf8'));
const facts = JSON.parse(readFileSync(resolve(root, 'country-facts.json'), 'utf8'));
const map = JSON.parse(readFileSync(resolve(root, 'world.geojson'), 'utf8'));
const geometryNames = new Set((map.features || []).map(feature => String(feature.properties?.name || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()));
const normalizedName = name => String(name || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

const records = metadata.countries || [];
const byCode = facts.byCode || {};
const coded = records.filter(row => typeof row.code === 'string' && row.code.trim());
const metaCodes = new Set(coded.map(row => row.code));
const factCodes = new Set(Object.keys(byCode));
const repeated = coded.filter((row, i) => coded.findIndex(other => other.code === row.code) !== i);
const taggedLegacy = records.filter(row => /historical|legacy|antilles/i.test(row.name || ''));
// Country / territory exceptions are context, not missing-data fixes.
// Sources: https://www.gov.uk/world/organisations/british-indian-ocean-territory
// https://www.tokelau.org.nz/Tokelau%2BGovernment.html
// https://www.basiclaw.gov.hk/en/basiclaw/chapter2.html
// https://www.un.org/dppa/decolonization/en/nsgt/western-sahara
// This classification never asserts a disputed sovereignty or invents a capital.
const capitalExceptions = {
  AQ: { status: 'no_national_capital', context: 'Antarctic Treaty area, not a sovereign state' },
  NR: { status: 'no_official_capital', context: 'Government offices in Yaren' },
  BV: { status: 'uninhabited_territory', context: 'Uninhabited Norwegian dependency' },
  IO: { status: 'external_administration', context: 'Territorial administration based in London' },
  TF: { status: 'uninhabited_territory', context: 'French Southern and Antarctic Lands' },
  HM: { status: 'uninhabited_territory', context: 'Australian external territory' },
  HK: { status: 'special_administrative_region', context: 'Hong Kong SAR of China; no separate national capital' },
  MO: { status: 'special_administrative_region', context: 'Macao SAR of China; no separate national capital' },
  AN: { status: 'historical_entity', context: 'Netherlands Antilles dissolved in 2010' },
  GS: { status: 'uninhabited_territory', context: 'South Georgia and South Sandwich Islands' },
  SJ: { status: 'composite_territory', context: 'Svalbard and Jan Mayen share an ISO entry; Longyearbyen administers Svalbard' },
  TK: { status: 'rotating_administration', context: 'Tokelau leadership rotates among three atolls; no single fixed capital' },
  UM: { status: 'island_group', context: 'Aggregate of US Minor Outlying Islands' },
  EH: { status: 'disputed_territory', context: 'Western Sahara: UN Non-Self-Governing Territory' }
};
const historicalAliases = new Set(['AN', 'TP', 'UK']);
const capitalEmpty = coded.filter(row => !row.capital).map(row => row.code);
const classifiedCapitalExceptions = capitalEmpty
  .filter(code => Object.hasOwn(capitalExceptions, code))
  .map(code => ({ code, ...capitalExceptions[code] }))
  .sort((a, b) => a.code.localeCompare(b.code));
const anomalies = {
  noNationalCapital: capitalEmpty.filter(code => ['AQ', 'NR'].includes(code)).sort(),
  noCapitalRecordedNeedsReview: capitalEmpty.filter(code => !Object.hasOwn(capitalExceptions, code)).sort(),
  classifiedExceptions: classifiedCapitalExceptions,
  historicalAliasCodes: coded.filter(row => historicalAliases.has(row.code)).map(row => row.code).sort()
};
// Expected differences between the legacy display catalogue and the factual
// data inventory. Explicitly recorded, not automatically migrated into the UI.
// Status classification is not a claim about sovereignty or recognition.
// https://op.europa.eu/en/web/eu-vocabularies/countries-and-territories
// https://verdragenbank.overheid.nl/en/Treaty/Details/009168_p.html
const factsOnly = {
  AX: { name: 'Åland Islands', type: 'autonomous_territory', parent: 'FI' },
  MF: { name: 'Saint Martin (French part)', type: 'overseas_collectivity', parent: 'FR' },
  TW: { name: 'Taiwan', type: 'politically_sensitive_area', parent: null },
  CW: { name: 'Curaçao', type: 'constituent_country_of_kingdom_of_netherlands', parent: null },
  BQ: { name: 'Caribbean Netherlands', type: 'special_municipalities', parent: 'NL' },
  SX: { name: 'Sint Maarten (Dutch part)', type: 'constituent_country_of_kingdom_of_netherlands', parent: null },
  BL: { name: 'Saint Barthélemy', type: 'overseas_collectivity', parent: 'FR' },
  XK: { name: 'Kosovo', type: 'user_assigned_code_not_iso_3166', parent: null }
};
const legacyMetadataOnly = {
  AN: { name: 'Netherlands Antilles', type: 'dissolved_2010', successors: ['CW', 'SX', 'BQ'] },
  TP: { name: 'East Timor', type: 'historical_alias', canonicalCode: 'TL' },
  UK: { name: 'United Kingdom', type: 'legacy_alias', canonicalCode: 'GB' }
};
// These eight records were integrated into the display catalogue in batch 5.
// Keep this registry to detect accidental removal in a future version.
const integratedCodes = Object.keys(factsOnly).sort();
const missingIntegratedMetadata = integratedCodes.filter(code => !metaCodes.has(code));
const missingIntegratedFacts = integratedCodes.filter(code => !factCodes.has(code));
const factOnlyCodes = [...factCodes].filter(code => !metaCodes.has(code)).sort();
const metadataOnlyCodes = [...metaCodes].filter(code => !factCodes.has(code)).sort();
const knownFactOnly = factOnlyCodes.filter(code => Object.hasOwn(factsOnly, code));
const knownMetadataOnly = metadataOnlyCodes.filter(code => Object.hasOwn(legacyMetadataOnly, code));
const unclassifiedFactOnly = factOnlyCodes.filter(code => !Object.hasOwn(factsOnly, code));
const unclassifiedMetadataOnly = metadataOnlyCodes.filter(code => !Object.hasOwn(legacyMetadataOnly, code));
const staleRegistry = {
  factsOnly: Object.keys(factsOnly).filter(code => !factOnlyCodes.includes(code)).sort(),
  metadataOnly: Object.keys(legacyMetadataOnly).filter(code => !metadataOnlyCodes.includes(code)).sort()
};
const reconciliation = {
  status: 'eight_added_legacy_retained',
  integratedCodes,
  missingIntegratedMetadata,
  missingIntegratedFacts,
  factsOnly: knownFactOnly.map(code => ({ code, ...factsOnly[code] })),
  legacyMetadataOnly: knownMetadataOnly.map(code => ({ code, ...legacyMetadataOnly[code] })),
  unclassifiedFactsOnly: unclassifiedFactOnly,
  unclassifiedMetadataOnly: unclassifiedMetadataOnly,
  staleRegistry: { metadataOnly: staleRegistry.metadataOnly }
};
const withoutYear = Object.entries(byCode)
  .filter(([, row]) => Number.isFinite(row.p) && !row.py)
  .map(([code]) => code).sort();
const withoutPopulation = Object.entries(byCode)
  .filter(([, row]) => !Number.isFinite(row.p))
  .map(([code]) => code).sort();

// These two geographic features can be matched by their names in the current
// world.geojson. Smaller islands/territories require separate geometry or an
// explicitly labelled point locator; never fake a polygon or move a country.
const newlyIntegratedMap = integratedCodes.map(code => {
  const entry = records.find(row => row.code === code);
  const hasNamedGeometry = !!entry && geometryNames.has(normalizedName(entry.name));
  return {
    code,
    name: entry?.name || null,
    namedGeometryPresent: hasNamedGeometry,
    mappingStatus: hasNamedGeometry ? 'named_feature_available' : 'separate_geometry_not_confirmed'
  };
});
const report = {
  checkedAt: new Date().toISOString(),
  note: 'Data-integrity inventory only. Neither sovereignty nor scientific accuracy is inferred from codes.',
  counts: {
    metadataRecords: records.length,
    metadataCodedRecords: coded.length,
    metadataUniqueCodes: metaCodes.size,
    factRecords: factCodes.size
  },
  issues: {
    metadataWithoutCodes: records.filter(row => !row.code).map(row => row.name),
    duplicateCodes: repeated.map(row => ({ code: row.code, name: row.name })),
    metadataWithoutFacts: metadataOnlyCodes,
    factsWithoutMetadata: factOnlyCodes,
    reconciliation,
    newlyIntegratedMap,
    legacyRecordsRequiringClassification: taggedLegacy.map(row => ({ code: row.code, name: row.name })),
    capitalStatus: anomalies,
    // Retained for backward compatibility with earlier audit reports.
    capitalsMissingInMetadata: capitalEmpty.sort(),
    populationYearMissing: withoutYear,
    populationMissing: withoutPopulation
  }
};
console.log(JSON.stringify(report, null, 2));
// Nonzero exit for reproducible data mismatches, not for known missing/contested fields.
if (report.issues.duplicateCodes.length || unclassifiedFactOnly.length || unclassifiedMetadataOnly.length || missingIntegratedMetadata.length || missingIntegratedFacts.length || staleRegistry.metadataOnly.length) {
  process.exitCode = 1;
}
