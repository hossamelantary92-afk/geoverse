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
// Null does not always mean an editorial omission. These are explicit special cases
// for review; they do not assert sovereignty or supply an invented capital.
// Nauru has no official capital (government offices are in Yaren); Antarctica
// has no national government. Other entries may need separate status notes.
const verifiedNoNationalCapital = new Set(['AQ', 'NR']);
const historicalAliases = new Set(['AN', 'TP', 'UK']);
const capitalEmpty = coded.filter(row => !row.capital).map(row => row.code);
const missingCapitalReview = capitalEmpty.filter(code => !verifiedNoNationalCapital.has(code));
const anomalies = {
  noNationalCapital: capitalEmpty.filter(code => verifiedNoNationalCapital.has(code)).sort(),
  noCapitalRecordedNeedsReview: missingCapitalReview.sort(),
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
