import type { Metadata } from 'next';
import LandingPageView from 'app/sections/landing/view/landing-page-view';

export const metadata: Metadata = {
  title: 'From Du With Code - Tech Notes, Ideas & Code Adventures',
  description:
    'A mix of notes, ideas, and things I break (and sometimes fix). Join Bui An Du on his coding journey through web dev, AI, and tech discoveries.',
  keywords: [
    'blog',
    'bui an du',
    'coding',
    'nextjs',
    'typescript',
    'mdx',
    'react',
    'ai',
    'programming',
    'tech notes',
    'software engineer',
    'cto',
  ],
  openGraph: {
    title: 'From Du With Code - Tech Notes, Ideas & Code Adventures',
    description:
      'A mix of notes, ideas, and things I break (and sometimes fix). Join Bui An Du on his coding journey.',
    type: 'website',
  },
  authors: [{ name: 'Bui An Du' }],
  creator: 'Bui An Du',
};

export default function Home() {
  return <LandingPageView />;
}
