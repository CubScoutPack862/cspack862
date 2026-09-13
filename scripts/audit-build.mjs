import { readdirSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { resolve, join, relative, sep } from 'node:path';
import { load } from 'cheerio';
import { parse } from 'yaml';
import { pack } from '../src/data/pack.ts';
import { published } from '../src/lib/content.ts';

const dist = resolve('dist');
const walk = dir => existsSync(dir) ? readdirSync(dir,{withFileTypes:true}).flatMap(entry=>entry.isDirectory() ? walk(join(dir,entry.name)) : [join(dir,entry.name)]) : [];
// Only approved, explicitly referenced website derivatives survive the artifact audit.
const approvedMedia = readdirSync('content/media').filter(f=>f.endsWith('.md')).map(f=>parse(readFileSync(`content/media/${f}`,'utf8').split('---')[1])).filter(m=>m.status==='approved').map(m=>resolve(dist,m.src.slice(1)));
const approvedIdentity = [pack.assets.logo, ...Object.values(pack.assets.ranks)].map(asset=>resolve(dist,asset.src.slice(1)));
const approved = new Set([...approvedMedia, ...approvedIdentity]);
const removeFromArtifact = target => {
  if (!target.startsWith(dist + sep)) throw new Error('Refusing to remove a path outside dist');
  rmSync(target,{recursive:true,force:true});
};
removeFromArtifact(resolve(dist,'brand'));
removeFromArtifact(resolve(dist,'documents'));
for (const path of walk(join(dist,'images'))) if (!approved.has(path)) removeFromArtifact(path);

const base = `/${(process.env.BASE_PATH ?? '/').replace(/^\/+|\/+$/g,'')}/`.replace('//','/');
const expected = ['index.html','about/index.html','join/index.html','calendar/index.html','activities/index.html','resources/index.html','contact/index.html','404.html'];
const titles = new Set(); const descriptions = new Set();
const publicLeaderContacts = pack.leaders.filter(leader => published(leader.name));
const approvedLeaderContacts = [
  ['Committee Chair', 'Karen Garcia', 'cubscoutpack862@gmail.com'],
  ['Cubmaster', 'Michael Huffman', 'activitiescubscoutpack862@gmail.com'],
];
const configuredLeaderContacts = publicLeaderContacts.map(leader => [leader.role, published(leader.name), published(leader.email)]);
if (JSON.stringify(configuredLeaderContacts) !== JSON.stringify(approvedLeaderContacts)) {
  throw new Error('Pack configuration must expose exactly the approved Committee Chair and Cubmaster contacts');
}
const permittedContacts = new Set(approvedLeaderContacts.map(([, , email]) => `mailto:${email}`));
const publicAssetUrl = src => `${base}${src.replace(/^\//, '')}`;
const logoUrl = publicAssetUrl(pack.assets.logo.src);
const privateValues = [pack.contacts.shared, pack.contacts.certificateEmail, pack.contacts.payment, ...pack.leaders.flatMap(leader => [leader.name, leader.email, leader.phone])]
  .filter(value => ['private', 'member-only'].includes(value.status) && value.value).map(value => value.value);
let links = 0; const referencedImages = new Set();
for (const file of expected) {
  const path = join(dist,file);
  if (!existsSync(path)) throw new Error(`Missing route: ${file}`);
  const html = readFileSync(path,'utf8'); const $ = load(html);
  for (const selector of ['title','h1','meta[name="description"]','main','header','footer']) if ($(selector).length!==1) throw new Error(`${file}: expected one ${selector}`);
  const title = $('title').text(); const description = $('meta[name="description"]').attr('content');
  if (titles.has(title) || descriptions.has(description)) throw new Error(`${file}: duplicate metadata`);
  titles.add(title); descriptions.add(description);
  if (!process.env.SITE_URL && $('link[rel="canonical"],meta[property="og:url"]').length) throw new Error(`${file}: fabricated local canonical/social URL`);
  if (process.env.SITE_URL) {
    const pathname = base + (file==='index.html' ? '' : file.replace(/index\.html$/,''));
    if ($('link[rel="canonical"]').attr('href')!==new URL(pathname,process.env.SITE_URL).href) throw new Error(`${file}: incorrect production canonical`);
  }
  if (/fonts\.(googleapis|gstatic)\.com/.test(html)) throw new Error(`${file}: unexpected remote font`);
  if (/Pack_862_Website_Information_and_Approval_Questionnaire|pack-862-new-family-orientation|New Family Orientation Guide|pack862treasurer|href="\/(?:fundraising|volunteer|photos)\//i.test(html)) throw new Error(`${file}: withheld Pack material in public HTML`);
  if (/CubScoutsLogo-FullColor|CubScout_REV_4K-Logo-CSBC/i.test(html)) throw new Error(`${file}: standalone Cub Scouts program logo is not approved`);
  if (privateValues.some(value => $.root().text().includes(value))) throw new Error(`${file}: private Pack data in public HTML`);
  if ($('.brand img').attr('src') !== logoUrl || $('.footer-logo').attr('src') !== logoUrl || $('link[rel="icon"]').attr('href') !== logoUrl) throw new Error(`${file}: Pack logo is missing from the header, footer, or favicon`);
  $('img[src]').each((_, image) => referencedImages.add($(image).attr('src')));
  $('a[href^="mailto:"],a[href^="tel:"]').each((_, element) => {
    if (!permittedContacts.has($(element).attr('href'))) throw new Error(`${file}: contact link has no public approval in Pack configuration`);
  });
  if ($('a[href^="tel:"]').length) throw new Error(`${file}: phone links are prohibited by the public brochure policy`);
  if ($('form,astro-island').length) throw new Error(`${file}: unexpected form or client framework`);
  if (/\{\{\w+\}\}|href="pack:/.test(html)) throw new Error(`${file}: unresolved content token`);
  $('a[href],img[src],script[src],link[href]').each((_,element)=>{
    const value=$(element).attr('href') ?? $(element).attr('src');
    if (!value || !value.startsWith('/')) return;
    if (!value.startsWith(base)) throw new Error(`${file}: link outside base: ${value}`);
    const [raw,hash] = value.slice(base.length).split('#');
    let target=resolve(dist,decodeURIComponent(raw.split('?')[0]));
    if (raw.endsWith('/') || !raw) target=join(target,'index.html');
    if (!target.startsWith(dist+sep) || !existsSync(target)) throw new Error(`${file}: broken link ${value}`);
    if (hash && target.endsWith('.html')) {
      const dest=load(readFileSync(target,'utf8'));
      if (!dest('[id]').toArray().some(el=>dest(el).attr('id')===decodeURIComponent(hash))) throw new Error(`${file}: missing fragment ${value}`);
    }
    links++;
  });
  $('a[href^="#"]').each((_,el)=>{ const id=$(el).attr('href').slice(1); if (!$('[id]').toArray().some(el=>$(el).attr('id')===id)) throw new Error(`${file}: missing local fragment #${id}`); });
}
const home = load(readFileSync('dist/index.html','utf8'));
const expectedRanks = [
  ['Lion', 'Kindergarten', 'Den 6'], ['Tiger', '1st grade', 'Den 5'], ['Wolf', '2nd grade', 'Den 4'],
  ['Bear', '3rd grade', 'Den 3'], ['Webelos', '4th grade', 'Den 2'], ['Arrow of Light', '5th grade', 'Den 1'],
];
const renderedRanks = home('.rank-card').toArray().map(card => {
  return [home(card).find('h3').text(), ...home(card).find('p').first().text().split(' · ')];
});
if (JSON.stringify(renderedRanks) !== JSON.stringify(expectedRanks)) throw new Error('Rank, grade, and den mappings differ from the approved six-card mapping');
const calendar=load(readFileSync('dist/calendar/index.html','utf8'));
const events=calendar('[data-event]').toArray().map(el=>calendar(el).attr('data-event'));
if (events.length!==readdirSync('content/events').filter(f=>f.endsWith('.md')).length || new Set(events).size!==events.length) throw new Error('Calendar event inventory mismatch');
const files=walk(dist).map(file=>relative(dist,file).replaceAll('\\','/'));
const emittedRoutes = files.filter(file=>file.endsWith('.html')).sort();
if (JSON.stringify(emittedRoutes) !== JSON.stringify([...expected].sort())) throw new Error('Static artifact contains a route outside the brochure allowlist');
if (files.some(file=>/\.(ts|astro|md|map)$/.test(file))) throw new Error('Non-public source files in static artifact');
if (files.some(file=>/\.pdf$/i.test(file))) throw new Error('Private or unapproved PDF in static artifact');
for (const route of ['fundraising/index.html','volunteer/index.html','photos/index.html']) if (files.includes(route)) throw new Error(`Withheld route emitted: ${route}`);
const emittedImages = walk(join(dist,'images'));
if (emittedImages.length !== approved.size || emittedImages.some(path=>!approved.has(path))) throw new Error('Public image inventory differs from approved derivatives');
if ([...approved].some(path=>!referencedImages.has(publicAssetUrl(`/${relative(dist,path).replaceAll('\\','/')}`)))) throw new Error('An approved public image is not used by the brochure');
console.log(`Audited ${expected.length} brochure routes, ${links} internal links/assets, ${events.length} calendar events, the approved image inventory, and whole-site private-material absence.`);
