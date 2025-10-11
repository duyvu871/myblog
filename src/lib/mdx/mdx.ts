import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeHighlight from 'rehype-highlight';
import rehypeCodeTitles from 'rehype-code-titles';
import catppuccin from 'shiki/themes/catppuccin-macchiato.mjs';
import remarkGfm from 'remark-gfm';
import { MDXComponents } from 'app/components/mdx/mdx-components';
import { prettyCodeOptions } from 'app/utils/mdx';
import { off } from 'process';
import { HeadingItem, remarkCollectHeadings } from './remark-collect-headings';

const contentDirectory = path.join(process.cwd(), 'content/posts');

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  published: boolean;
  thumbnail?: string;
  content: () => React.JSX.Element;
  headings: HeadingItem[];
}

export interface BlogPostMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  published: boolean;
  thumbnail?: string;
  headings: HeadingItem[];
}

// Get all MDX files from the posts directory
function getMDXFiles(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }
  return fs.readdirSync(contentDirectory).filter((file) => file.endsWith('.mdx'));
}

// Read and parse a single MDX file
async function readMDXFile(filePath: string): Promise<{
  frontmatter: any;
  content: string;
}> {
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  const { data: frontmatter, content } = matter(rawContent);
  return { frontmatter, content };
}

// Get all blog posts metadata (without content)
export async function getAllPosts(): Promise<BlogPostMetadata[]> {
  const mdxFiles = getMDXFiles();

  const posts = await Promise.all(
    mdxFiles.map(async (file) => {
      const filePath = path.join(contentDirectory, file);
      const { frontmatter } = await readMDXFile(filePath);
      const slug = file.replace(/\.mdx$/, '');

      return {
        slug,
        title: frontmatter.title || '',
        description: frontmatter.description || '',
        date: frontmatter.date || '',
        author: frontmatter.author || '',
        tags: frontmatter.tags || [],
        published: frontmatter.published ?? true,
        thumbnail: frontmatter.thumbnail || '',
        headings: [],
      };
    })
  );

  // Filter published posts and sort by date (newest first)
  return posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Get a single blog post by slug (with compiled content)
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(contentDirectory, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const { frontmatter, content } = await readMDXFile(filePath);

    // Skip unpublished posts
    if (!frontmatter.published) {
      return null;
    }
    const headings: HeadingItem[] = [];
    // Compile MDX content
    const { content: MDXContent } = await compileMDX({
      source: content,
      options: {
        parseFrontmatter: false,
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkCollectHeadings(headings)],
          rehypePlugins: [
            rehypeCodeTitles,
            [
              rehypePrettyCode,
              {
                theme: catppuccin,
                keepBackground: false,
              },
            ],
            rehypeSlug,
            [
              rehypeAutolinkHeadings,
              {
                behavior: 'wrap',
                properties: {
                  className: ['heading-anchor'],
                },
              },
            ],
            rehypeHighlight,
          ],
        },
      },
      components: MDXComponents({}),
    });

    return {
      slug,
      title: frontmatter.title || '',
      description: frontmatter.description || '',
      date: frontmatter.date || '',
      author: frontmatter.author || '',
      tags: frontmatter.tags || [],
      published: frontmatter.published ?? true,
      thumbnail: frontmatter.thumbnail || '',
      headings,
      content: () => MDXContent,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

// Get all post slugs (useful for static generation)
export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((post) => post.slug);
}

// Get related posts based on tags
export async function getRelatedPosts(
  currentSlug: string,
  tags: string[],
  limit: number = 3
): Promise<BlogPostMetadata[]> {
  const allPosts = await getAllPosts();

  const relatedPosts = allPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      // Calculate similarity based on shared tags
      const sharedTags = post.tags.filter((tag) => tags.includes(tag));
      return {
        ...post,
        similarity: sharedTags.length,
      };
    })
    .filter((post) => post.similarity > 0)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);

  return relatedPosts.map(({ similarity, ...post }) => post);
}

// Search posts by query (title, description, tags)
export async function searchPosts(query: string): Promise<BlogPostMetadata[]> {
  const allPosts = await getAllPosts();
  const searchTerm = query.toLowerCase();

  return allPosts.filter((post) => {
    const titleMatch = post.title.toLowerCase().includes(searchTerm);
    const descriptionMatch = post.description.toLowerCase().includes(searchTerm);
    const tagMatch = post.tags.some((tag) => tag.toLowerCase().includes(searchTerm));

    return titleMatch || descriptionMatch || tagMatch;
  });
}
