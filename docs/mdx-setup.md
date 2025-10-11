# MDX Setup Documentation

## What has been configured

This document describes the MDX setup that has been implemented for the Next.js blog application.

## 📁 Files Created/Modified

### 1. Next.js Configuration (`next.config.ts`)

- Enabled MDX support with `mdxRs: true` experimental feature
- Configured page extensions to support MDX files
- Set up image remote patterns for Supabase

### 2. MDX Components (`mdx-components.tsx`)

- Created root-level MDX components configuration
- Customized styling for all standard MDX elements (headings, paragraphs, links, code blocks, etc.)
- Used Tailwind CSS classes for consistent styling
- Proper TypeScript types for all components

### 3. MDX Utility Library (`src/lib/mdx.ts`)

- Functions to read and parse MDX files from `content/posts/`
- `getAllPosts()` - Get all blog post metadata
- `getPostBySlug()` - Get single post with compiled MDX content
- `getAllPostSlugs()` - Get all slugs for static generation
- `getRelatedPosts()` - Find related posts based on tags
- `searchPosts()` - Search posts by query
- Uses `gray-matter` for frontmatter parsing
- Uses `next-mdx-remote/rsc` for MDX compilation

### 4. Blog Pages

- `src/app/(public)/blog/page.tsx` - Blog listing page
- `src/app/(public)/blog/[slug]/page.tsx` - Individual blog post page
- Static generation with `generateStaticParams()`
- Proper SEO metadata generation
- Responsive design with Tailwind CSS

### 5. Content Structure

- `content/posts/` directory for MDX files
- Sample blog posts created:
  - `welcome-to-my-blog.mdx`
  - `nextjs-15-getting-started.mdx`

## 📦 Dependencies Added

```bash
npm install gray-matter next-mdx-remote
```

### Existing Dependencies Used

- `@next/mdx` - Next.js MDX integration (already installed)
- `rehype-slug` - Add IDs to headings
- `rehype-autolink-headings` - Add links to headings
- `rehype-pretty-code` - Code syntax highlighting
- `remark-gfm` - GitHub Flavored Markdown support
- `remark-toc` - Table of contents generation

## 🔧 Features

### MDX Frontmatter Support

Each MDX file supports frontmatter with:

```yaml
---
title: 'Post Title'
description: 'Post description'
date: '2025-01-15'
author: 'Author Name'
tags: ['tag1', 'tag2']
published: true
---
```

### Styled Components

All MDX elements are automatically styled with:

- Headings with proper hierarchy and spacing
- Code blocks with syntax highlighting
- Tables with responsive design
- Links with hover effects
- Images with rounded corners and shadows
- Lists with proper spacing
- Blockquotes with left borders

### TypeScript Support

- Full TypeScript support for all components
- Proper types for blog post data
- Type-safe MDX component customization

## 🚀 Usage

### Creating a New Blog Post

1. Create a new `.mdx` file in `content/posts/`
2. Add frontmatter at the top
3. Write your content using Markdown and JSX
4. The post will automatically appear in the blog

### Accessing Blog Pages

- Blog listing: `http://localhost:3000/blog`
- Individual posts: `http://localhost:3000/blog/[slug]`

### Custom Components

You can add custom React components to MDX files by:

1. Creating the component
2. Adding it to `mdx-components.tsx`
3. Using it in your MDX files

## 🔍 Development Notes

- All blog posts are statically generated at build time
- Hot reloading works for both code and content changes
- MDX compilation happens at build time for performance
- Search and filtering capabilities are built-in
- Related posts functionality is available

## 🚦 Next Steps

You can now:

1. Visit `/blog` to see the blog listing
2. Click on posts to read them
3. Create new MDX files in `content/posts/`
4. Customize styling in `mdx-components.tsx`
5. Add custom React components for interactive content
