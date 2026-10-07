import { test } from 'node:test';
import assert from 'node:assert/strict';
import { eventSchema, mediaSchema, managed, httpUrl, calendarSchema, packSchema } from '../src/lib/schemas.ts';
import { pack } from '../src/data/pack.ts';
import { published, emailHref, formatDate, upcomingEvents, sortEvents, approvedMedia } from '../src/lib/content.ts';
import { withBase, normalizeBase, validateOrigin } from '../src/lib/paths.ts';

test('safe root, project path, fragments, and external links', () => {
  assert.equal(withBase('/calendar/#event'), '/calendar/#event');
  assert.equal(withBase('/documents/guide.pdf', '/repo'), '/repo/documents/guide.pdf');
  assert.equal(withBase('https://scouting.org', '/repo/'), 'https://scouting.org');
  assert.equal(withBase('#faq', '/repo/'), '#faq');
  assert.throws(() => normalizeBase('//other.org'));
  assert.throws(() => withBase('/../secret'));
  assert.throws(() => validateOrigin('https://example.org/path'));
  assert.equal(validateOrigin(undefined), undefined);
});
test('publication states cannot silently publish unresolved contact details', () => {
  for (const status of ['confirm','private','missing'] as const) {
    assert.equal(published({status, value:'private@example.org'}), undefined);
    assert.equal(emailHref({status, value:'private@example.org'}), undefined);
  }
  assert.equal(emailHref({status:'verified',value:'pack@example.org'}),'mailto:pack@example.org');
  assert.equal(managed(httpUrl).safeParse({status:'verified'}).success, false);
  assert.equal(managed(httpUrl).safeParse({status:'verified',value:'javascript:alert(1)'}).success, false);
  const result = packSchema.safeParse({...pack, fees:{...pack.fees, dueDate:'2027-02-30'}});
  assert.equal(result.success, false);
  if (!result.success) assert.deepEqual(result.error.issues[0].path,['fees','dueDate']);
});
const event = { title:'Test', startDate:'2027-03-05',endDate:'2027-03-07', category:'camping',tentative:true,summary:'Test' };
test('event dates and required fields report actionable errors', () => {
  for (const invalid of [{...event,startDate:'2027-02-30'},{...event,endDate:'2027-03-04'},{...event,title:undefined},{...event,tentative:undefined}]) assert.equal(eventSchema.safeParse(invalid).success, false);
  const result = eventSchema.safeParse({...event,startDate:'tomorrow'});
  if (!result.success) assert.equal(result.error.issues[0].path[0], 'startDate');
});
test('events sort, include an ongoing range, and handle exhausted calendars', () => {
  const later = { data:eventSchema.parse(event) };
  const earlier = { data:eventSchema.parse({...event,title:'Earlier',startDate:'2027-02-01',endDate:undefined}) };
  assert.equal(sortEvents([later,earlier])[0], earlier);
  assert.equal(upcomingEvents([later,earlier],'2027-03-06')[0],later);
  assert.deepEqual(upcomingEvents([later,earlier],'2028-01-01'),[]);
  assert.equal(formatDate('2027-03-05','2027-03-07'),'Mar 5, 2027 – Mar 7, 2027');
  assert.equal(formatDate('2027-01-30'),'Jan 30, 2027');
});
test('live calendar requires an approved embed and direct URL as a pair', () => {
  const value = {embedUrl:'https://calendar.google.com/calendar/embed?src=fixture',directUrl:'https://calendar.google.com/calendar/u/0?cid=fixture'};
  assert.equal(calendarSchema.safeParse({status:'verified',value}).success,true);
  assert.equal(calendarSchema.safeParse({status:'verified',value:{embedUrl:value.embedUrl}}).success,false);
  assert.equal(calendarSchema.safeParse({status:'verified',value:{...value,embedUrl:'https://attacker.invalid/calendar/embed'}}).success,false);
});
test('approved images require alt text, dimensions, provenance, and approval', () => {
  const data = { title:'Camping',alt:'A tent at a campsite',status:'approved',context:'An approved stock activity image',album:'Camping',src:'/images/tent.webp',width:1200,height:800,kind:'stock-photo',provenance:'Scouting America Brand Assets library',approval:'Pack media administrator approved' };
  assert.equal(mediaSchema.safeParse(data).success,true);
  assert.equal(mediaSchema.safeParse({...data,alt:''}).success,false);
  assert.equal(mediaSchema.safeParse({...data,approval:undefined}).success,false);
  const entries = ['pending','placeholder','approved'].map(status => ({data:mediaSchema.parse({...data,status})}));
  assert.deepEqual(approvedMedia(entries).map(entry=>entry.data.status),['approved']);
});
