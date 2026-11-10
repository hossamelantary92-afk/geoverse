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
const withoutYear = Object.entries(byCode)
  .filter(([, row]) => Number.isFinite(row.p) && !row.py)
  .map(([code]) => code).sort();
const withoutPopulation = Object.entries(byCode)
  .filter(([, row]) => !Number.isFinite(row.p))
  .map(([code]) => code).sort();

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
    metadataWithoutFacts: [...metaCodes].filter(code => !factCodes.has(code)).sort(),
    factsWithoutMetadata: [...factCodes].filter(code => !metaCodes.has(code)).sort(),
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
if (report.issues.duplicateCodes.length || report.issues.metadataWithoutFacts.length || report.issues.factsWithoutMetadata.length) {
  process.exitCode = 1;
}
