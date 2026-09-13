import { z } from 'zod';

export const text = z.string().trim().min(1);
export const httpUrl = z.url().refine(value => /^https?:\/\//.test(value), 'Use an HTTP(S) URL');
export const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD').refine(value => {
  const date = new Date(`${value}T12:00:00Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}, 'Use a real calendar date');
export const publicationState = z.enum(['verified', 'tentative', 'confirm', 'missing', 'member-only', 'private']);
export function managed<T extends z.ZodType>(schema: T) {
  return z.discriminatedUnion('status', [
    z.object({ status: z.literal('verified'), value: schema, publicNote: text.optional() }),
    z.object({ status: z.literal('tentative'), value: schema, publicNote: text }),
    z.object({ status: z.literal('confirm'), value: schema.optional(), publicNote: text }),
    z.object({ status: z.literal('missing'), publicNote: text }),
    z.object({ status: z.literal('member-only'), value: schema.optional() }),
    z.object({ status: z.literal('private'), value: schema.optional() }),
  ]);
}
export const eventSchema = z.object({
  title: text, startDate: isoDate, endDate: isoDate.optional(),
  category: z.enum(['pack-meeting', 'camping', 'celebration', 'service', 'fundraising', 'derby', 'outdoor-activity']),
  tentative: z.boolean(), time: text.optional(), location: text.optional(),
  summary: text, notes: text.optional(), detailsUrl: httpUrl.optional(),
}).refine(event => !event.endDate || event.endDate >= event.startDate, { path: ['endDate'], message: 'End date must not precede start date' });
export const pageSchema = z.object({
  title: text, description: text, eyebrow: text, heading: text, intro: text,
  cards: z.array(z.object({ title: text, description: text, media: text })).optional(),
  ranks: z.array(z.object({ name: text, grade: text, den: text, description: text })).optional(),
  faqs: z.array(z.object({ question: text, answer: text })).optional(),
});
export const mediaSchema = z.object({
  title: text, alt: text, status: z.enum(['placeholder', 'pending', 'approved']),
  context: text, album: text, src: z.string().regex(/^\/images\/[a-zA-Z0-9/_-]+\.(webp|avif|jpg|jpeg|png)$/).optional(),
  width: z.number().int().positive().optional(), height: z.number().int().positive().optional(),
  provenance: text.optional(), approval: text.optional(), kind: z.enum(['stock-photo']).optional(),
}).superRefine((media, ctx) => {
  if (media.status === 'approved') for (const field of ['src', 'width', 'height', 'provenance', 'approval', 'kind'] as const) {
    if (!media[field]) ctx.addIssue({ code: 'custom', path: [field], message: `Approved media requires ${field}` });
  }
});
export const publicImageSchema = z.object({
  src: z.string().regex(/^\/images\/[a-zA-Z0-9/_-]+\.(webp|avif|jpg|jpeg|png)$/),
  width: z.number().int().positive(), height: z.number().int().positive(), alt: text,
  provenance: text, approval: text,
});
const googleUrl = httpUrl.refine(value => {
  const url = new URL(value);
  return url.protocol === 'https:' && url.hostname === 'calendar.google.com' && url.pathname.startsWith('/calendar/');
}, 'Use an approved HTTPS calendar.google.com/calendar/ URL');
export const calendarSchema = managed(z.object({
  embedUrl: googleUrl.refine(value => new URL(value).pathname === '/calendar/embed', 'Use the Google Calendar embed URL'),
  directUrl: googleUrl,
}));
export const packSchema = z.object({
  identity: z.object({ name: text, number: z.number().int(), city: text, grades: text, district: text, council: text }),
  season: text, location: z.object({ name: text, address: text, relationship: text, arrival: text }),
  contacts: z.object({ shared: managed(z.email()), certificateEmail: managed(z.email()), payment: managed(z.email()), responseTime: text }),
  schedules: z.object({ pack: managed(text), committee: managed(text), den: managed(text) }),
  fees: z.object({ youth: z.number().nonnegative(), dues: z.number().nonnegative(), adult: z.number().nonnegative(), dueDate: isoDate }),
  links: z.record(text, httpUrl), calendar: calendarSchema,
  assistance: managed(text), band: managed(httpUrl), scoutbook: managed(httpUrl), trailsEnd: managed(httpUrl), packingList: managed(httpUrl), packForms: managed(httpUrl),
  leaders: z.array(z.object({ role: text, name: managed(text), email: managed(z.email()), phone: managed(text) })),
  fundraising: managed(text), donations: managed(httpUrl), volunteering: managed(text),
  shop: z.object({ name: text, address: text, hours: managed(text) }),
  assets: z.object({
    logo: publicImageSchema,
    ranks: z.record(z.enum(['Lion', 'Tiger', 'Wolf', 'Bear', 'Webelos', 'Arrow of Light']), publicImageSchema),
  }),
  origin: managed(httpUrl),
});
