import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const chronik = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/chronik',
  }),

  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      excerpt: z.string(),

      cover: image().optional(),
      coverAlt: z.string().optional(),
      coverCaption: z.string().optional(),
      source: z.string().url().optional(),

      gallery: z.array(
        z.object({
          image: image(),
          alt: z.string(),
          caption: z.string().optional(),
        })
      ).default([]),
    }),
});

export const collections = {
  chronik,
};