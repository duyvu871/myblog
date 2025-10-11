import { getAllPosts, BlogPostMetadata } from 'app/lib/mdx';
import { HeroSection } from '../components/hero-section';
import { FeaturedPostsSection } from '../components/featured-posts-section';
import { CategoriesSection } from '../components/categories-section';
import { AboutSection } from '../components/about-section';
import { TechStackSection } from '../components/tech-stack-section';
import { NewsletterSection } from '../components/newsletter-section';
import { FooterSection } from '../components/footer-section';
import { DirectionDock } from '../components/direction';
import '../styles/landing-page.css';

export default async function LandingPageView() {
  const posts = await getAllPosts();

  // Get featured posts (latest 4)
  const featuredPosts = posts.slice(0, 4);

  // Get unique tags for categories
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags || [])));
  const categories = [
    { name: '#Learning Notes', tags: ['nextjs', 'react', 'typescript', 'python'], emoji: '📚' },
    { name: '#Web Dev', tags: ['nextjs', 'react', 'web-development'], emoji: '💻' },
    { name: '#AI Stuff', tags: ['ai', 'machine-learning', 'rag', 'langchain'], emoji: '🤖' },
    { name: '#Life & Tech', tags: ['blog', 'tutorial', 'programming'], emoji: '🚀' },
  ];

  return (
    <div>
      <HeroSection posts={posts} allTags={allTags} />
      <FeaturedPostsSection featuredPosts={featuredPosts} />
      <CategoriesSection categories={categories} posts={posts} />
      <AboutSection />
      <TechStackSection />
      <NewsletterSection />
      <FooterSection />
      <DirectionDock />
    </div>
  );
}
