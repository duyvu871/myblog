import { z } from 'zod';

// Blog post metadata schema
export const blogPostMetadataSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  title: z.string().min(1, 'Title is required').max(200, 'Title must be 200 characters or less'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(500, 'Description must be 500 characters or less'),
  date: z.string().min(1, 'Date is required'),
  author: z.string().min(1, 'Author is required').max(100, 'Author must be 100 characters or less'),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(true),
  thumbnail: z.string().optional(), // Optional thumbnail image URL
});

// Full blog post schema (includes content function)
export const blogPostSchema = blogPostMetadataSchema.extend({
  content: z.function(), // React JSX Element function
});

// Search query schema
export const searchPostsSchema = z.object({
  query: z
    .string()
    .min(1, 'Search query is required')
    .max(100, 'Query must be 100 characters or less'),
});

// Related posts query schema
export const relatedPostsSchema = z.object({
  currentSlug: z.string().min(1, 'Current slug is required'),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  limit: z.number().int().min(1).max(10).default(3),
});

// Post slug params schema (for dynamic routes)
export const postSlugParamsSchema = z.object({
  slug: z.string().min(1, 'Slug parameter is required'),
});

// Export types
export type BlogPostMetadata = z.infer<typeof blogPostMetadataSchema>;
export type BlogPost = z.infer<typeof blogPostSchema>;
export type SearchPostsData = z.infer<typeof searchPostsSchema>;
export type RelatedPostsData = z.infer<typeof relatedPostsSchema>;
export type PostSlugParams = z.infer<typeof postSlugParamsSchema>;
