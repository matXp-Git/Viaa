import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const editorial = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/editorial' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      excerpt: z.string(),
      coverImage: image(),
      coverImageAlt: z.string(),
      secondaryImage: image().optional(),
      secondaryImageAlt: z.string().optional(),
      date: z.coerce.date(),
      category: z.string(),
      author: z.string().default('Viia'),
      metaTitle: z.string().optional(),
      metaDescription: z.string(),
      keywords: z.array(z.string()).default([]),
      canonicalUrl: z.string().url().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { editorial };
