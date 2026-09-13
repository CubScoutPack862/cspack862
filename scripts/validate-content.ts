import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { parse } from 'yaml';
import { pageSchema, eventSchema, mediaSchema } from '../src/lib/schemas.ts';
import { pack } from '../src/data/pack.ts';
import { tokens } from '../src/lib/remark-pack.ts';

export function readEntry(file: string) {
  const raw = readFileSync(file, 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/);
  if (!match) throw new Error(`${file}: expected YAML frontmatter between --- lines`);
  return { data: parse(match[1]), body: match[2], raw };
}
let count = 0;
for (const [collection, schema] of [['pages', pageSchema], ['events', eventSchema], ['media', mediaSchema]] as const) {
  const files = readdirSync(`content/${collection}`).filter(file => file.endsWith('.md'));
  if (!files.length) throw new Error(`content/${collection}: no entries found`);
  for (const file of files) {
    const path = `content/${collection}/${file}`;
    const entry = readEntry(path);
    const result = schema.safeParse(entry.data);
    if (!result.success) throw new Error(`${path}\n${result.error.issues.map(issue => `  ${issue.path.join('.')}: ${issue.message}`).join('\n')}`);
    if (/^# /m.test(entry.body)) throw new Error(`${path}: use ## headings; the layout supplies the one h1`);
    for (const [, token] of entry.raw.matchAll(/\{\{(\w+)\}\}/g)) if (!(token in tokens)) throw new Error(`${path}: unknown token ${token}`);
    for (const [, key] of entry.raw.matchAll(/\]\(pack:(\w+)\)/g)) if (!pack.links[key]) throw new Error(`${path}: unknown link pack:${key}`);
    if (collection === 'media' && entry.data.status === 'approved' && !existsSync(resolve('public', entry.data.src.slice(1)))) throw new Error(`${path}: approved src file does not exist`);
    count++;
  }
}
for (const page of ['home','about','join','activities','calendar','resources','contact']) {
  if (!existsSync(`content/pages/${page}.md`)) throw new Error(`content/pages/${page}.md is required`);
}
console.log(`Validated Pack configuration and ${count} Markdown entries.`);
