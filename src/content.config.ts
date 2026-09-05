import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		// Plain public path (e.g. /images/uploads/photo.jpg) so images
		// uploaded through the CMS work without any code changes.
		heroImage: z.string().optional(),
		// When true, the post is skipped from listings and doesn't get a page.
		draft: z.boolean().optional().default(false),
	}),
});

// Editable copy for the Home and About pages, so those can be updated
// from the CMS too, without touching code.
const pages = defineCollection({
	loader: glob({ base: './src/content/pages', pattern: '**/*.md' }),
	schema: z.object({
		tagline: z.string().optional(),
		heading: z.string().optional(),
	}),
});

export const collections = { blog, pages };
