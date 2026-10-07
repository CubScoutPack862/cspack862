import type { z } from 'zod';
import type { eventSchema, mediaSchema } from './schemas.ts';
export type ManagedValue<T> = { status: 'verified' | 'tentative' | 'confirm' | 'missing' | 'member-only' | 'private'; value?: T; publicNote?: string };
export function published<T>(value: ManagedValue<T>): T | undefined {
  return value.status === 'verified' || value.status === 'tentative' ? value.value : undefined;
}
export function emailHref(value: ManagedValue<string>) {
  return value.status === 'verified' && value.value ? `mailto:${value.value}` : undefined;
}
export function statusText(value: ManagedValue<string>) {
  if (value.status === 'private' || value.status === 'member-only') return '';
  if (value.status === 'verified') return value.value ?? '';
  if (value.status === 'tentative') return `Tentative: ${value.value}. ${value.publicNote ?? ''}`;
  return value.publicNote ?? '';
}
export type EventData = z.infer<typeof eventSchema>;
export function sortEvents<T extends { data: EventData }>(events: T[]) {
  return [...events].sort((a, b) => a.data.startDate.localeCompare(b.data.startDate) || a.data.title.localeCompare(b.data.title));
}
export function upcomingEvents<T extends { data: EventData }>(events: T[], today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()), limit = 3) {
  return sortEvents(events).filter(event => (event.data.endDate ?? event.data.startDate) >= today).slice(0, limit);
}
export function formatDate(start: string, end?: string) {
  const format = (date: string) => new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(`${date}T12:00:00Z`));
  return end && end !== start ? `${format(start)} – ${format(end)}` : format(start);
}
export function approvedMedia<T extends { data: z.infer<typeof mediaSchema> }>(entries: T[]) {
  return entries.filter(entry => entry.data.status === 'approved');
}
