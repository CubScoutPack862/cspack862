import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { pageSchema, eventSchema, mediaSchema } from './lib/schemas';
export const collections = {
  pages: defineCollection({ loader: glob({ pattern: '**/*.md', base: './content/pages' }), schema: pageSchema }),
  events: defineCollection({ loader: glob({ pattern: '**/*.md', base: './content/events' }), schema: eventSchema }),
  media: defineCollection({ loader: glob({ pattern: '**/*.md', base: './content/media' }), schema: mediaSchema }),
};
