import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { load } from 'cheerio';

const sourcePath = 'src/data/pack.ts';
const original = readFileSync(sourcePath, 'utf8');
const npm = process.env.npm_execpath;
if (!npm) throw new Error('Run via npm run verify:modes');
const build = overrides => {
  const env = { ...process.env, ASTRO_TELEMETRY_DISABLED: '1', ...overrides };
  if (!overrides.SITE_URL) delete env.SITE_URL;
  execFileSync(process.execPath, [npm, 'run', 'build'], { env, stdio: 'inherit' });
};
try {
  build({ BASE_PATH: '/path-check/', SITE_URL: 'https://example.invalid' });
  const fixture = "calendar: { status: 'verified', value: { embedUrl: 'https://calendar.google.com/calendar/embed?src=verification-fixture', directUrl: 'https://calendar.google.com/calendar/u/0?cid=verification-fixture' } },";
  const modified = original.replace(/calendar: \{ status: 'missing', publicNote: '[^']*' \},/, fixture);
  assert.notEqual(modified, original, 'Missing-calendar fixture insertion point not found');
  writeFileSync(sourcePath, modified);
  build({ BASE_PATH: '/', SITE_URL: 'https://example.invalid' });
  const configured = load(readFileSync('dist/calendar/index.html', 'utf8'));
  assert.equal(configured('iframe[title="Pack 862 live Google Calendar"][loading="lazy"]').length, 1);
  assert.ok(configured('a[href*="calendar.google.com/calendar/u/0"]').length);
  assert.ok(configured('[data-event]').length > 0);
} finally {
  writeFileSync(sourcePath, original);
  build({ BASE_PATH: '/' });
}
const plain = load(readFileSync('dist/calendar/index.html', 'utf8'));
assert.equal(plain('iframe').length, 0);
assert.ok(plain('[data-event]').length > 0);
console.log('Verified project-path, custom-origin, configured-calendar, and unconfigured local builds. Restored real configuration and root output.');
