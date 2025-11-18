import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getPostBySlug } from 'app/lib/mdx';
import {
  Container,
  Title,
  Group,
  Badge,
  Text,
  Anchor,
  Stack,
  Divider,
  Paper,
  Breadcrumbs,
} from '@mantine/core';
import RelatedPosts from 'app/sections/post/components/related-posts';
import { Toc } from 'app/components/ui';
import { Image } from 'app/components/ui/image';
import { CopyMarkdownButton } from 'app/components/ui';

interface BlogDetailViewProps {
  slug: string;
}

export default async function BlogDetailView({ slug }: BlogDetailViewProps) {
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const breadcrumbItems = [
    { title: 'Home', href: '/' },
    { title: 'Blog', href: '/blog' },
    { title: post.title, href: `/blog/${post.slug}` },
  ];

  return (
    <>
      <Container size="sm" py="xl" my="xl" px="0">
        {/* Breadcrumbs Navigation */}
        <Breadcrumbs mb="md" pl="xl" className="flex-nowrap">
          {breadcrumbItems.map((item, index) => (
            <Anchor
              key={index}
              component={Link}
              href={item.href}
              c={index === breadcrumbItems.length - 1 ? 'dimmed' : 'lavender'}
              style={{
                textDecoration: 'none',
                fontSize: '14px',
                cursor: index === breadcrumbItems.length - 1 ? 'default' : 'pointer',
              }}
              className="truncate break-words !whitespace-break-spaces"
            >
              {item.title}
            </Anchor>
          ))}
        </Breadcrumbs>

        {/* Back to Blog Link */}
        {/*
        <Anchor
          component={Link}
          href="/blog"
          c="blue"
          px="xl"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Anchor> */}
        {post.thumbnail && (
          <Image
            src={post.thumbnail}
            alt={post.title}
            width="100%"
            height={250}
            fit="cover"
            radius="8px"
          />
        )}
        <Paper component="article" radius="md" px="xl" pt="sm" bg="transparent" maw={'100vw'}>
          <Stack gap="lg">
            <div>
              <Title c="maroon" order={1} size="h1" mb="xs">
                {post.title}
              </Title>
              <Text c="dimmed" size="md" mb="md">
                {post.description}
              </Text>
              <Group gap="xs" mb="md">
                {post.tags?.map((tag: string) => (
                  <Badge key={tag} variant="light" color="lavender">
                    {tag}
                  </Badge>
                ))}
              </Group>

              <Group justify="space-between" mb="lg" wrap="wrap">
                <Group gap="lg">
                  <Text c="dimmed">
                    by{' '}
                    <Anchor c="blue" component={Link} href={`/author/${post.author}`}>
                      {post.author}
                    </Anchor>
                  </Text>
                  <Text c="blue" component="time" dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('vi-VN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Text>
                </Group>
                <CopyMarkdownButton
                  markdown={post.rawMarkdown}
                  frontmatter={post.frontmatter}
                  title={post.title}
                  url={`${process.env.NEXT_PUBLIC_SITE_URL || ''}/blog/${post.slug}`}
                  variant="light"
                  size="xs"
                  buttonText=""
                />
              </Group>

              <Divider mb="xl" />
            </div>

            <div className="prose prose-lg dark:prose-invert">
              <post.content />
            </div>
          </Stack>
        </Paper>
      </Container>
      {/* Related Posts Section */}
      <RelatedPosts currentSlug={post.slug} tags={post.tags} limit={3} />

      {/* Table of Contents */}
      <Toc headings={post.headings || []} />
    </>
  );
}
