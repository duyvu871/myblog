import type { Metadata } from 'next';
import { BlogListView } from 'app/sections/post/view';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read our latest blog posts and tutorials',
};

export default function BlogPage() {
  return <BlogListView />;
}
