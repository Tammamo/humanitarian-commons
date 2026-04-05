import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const resourceSchema = z.object({
  title: z.string(),
  url: z.string().url().optional(),
  type: z.enum(['journalism', 'analysis', 'opinion', 'data', 'academic', 'primary-source', 'report', 'book', 'multimedia']),
  source: z.string().optional(),
  author: z.string().optional(),
  date: z.string().optional(),
  description: z.string().optional(),
});

const topics = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/topics' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['thematic', 'geographic']),
    region: z.string().optional(),
    tags: z.array(z.string()).default([]),
    keyFacts: z.array(z.string()).default([]),
    relatedTopics: z.array(z.string()).default([]),
    relatedPeople: z.array(z.string()).default([]),
    relatedOrganizations: z.array(z.string()).default([]),
    resources: z.array(resourceSchema).default([]),
    lastUpdated: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const people = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/people' }),
  schema: z.object({
    name: z.string(),
    title: z.string().optional(),
    organization: z.string().optional(),
    role: z.string().optional(),
    photo: z.string().optional(),
    bio: z.string().optional(),
    relatedTopics: z.array(z.string()).default([]),
    relatedOrganizations: z.array(z.string()).default([]),
    links: z.array(z.object({
      label: z.string(),
      url: z.string().url(),
    })).default([]),
    draft: z.boolean().default(false),
  }),
});

const organizations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/organizations' }),
  schema: z.object({
    name: z.string(),
    acronym: z.string().optional(),
    type: z.enum(['un-agency', 'ngo', 'think-tank', 'government', 'academic', 'media', 'network', 'foundation', 'other']).optional(),
    description: z.string().optional(),
    headquarters: z.string().optional(),
    website: z.string().url().optional(),
    logo: z.string().optional(),
    relatedTopics: z.array(z.string()).default([]),
    relatedPeople: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { topics, people, organizations };
