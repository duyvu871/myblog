import { BlogPostMetadata, getAllPosts } from 'app/lib/mdx';
import { Container, Title, Grid, GridCol, Text, Stack, Group, Badge, Divider } from '@mantine/core';
import { CompactPostCard } from '../components/post-card';
import { IconBook, IconCalendar, IconTag } from '@tabler/icons-react';

export default async function BlogListView() {
  const posts = await getAllPosts();

  // Calculate some stats
  const totalPosts = posts.length;
  const totalTags = Array.from(new Set(posts.flatMap((post) => post.tags || []))).length;
  const latestPost = posts[0];

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl" style={{ minHeight: '80vh' }}>
        {/* Header Section */}
        <div
          className="text-center"
          style={{
            minHeight: '300px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '2rem 0',
          }}
        >
          <Title
            order={1}
            size="h1"
            mb="md"
            style={{
              background:
                'linear-gradient(135deg, var(--catppuccin-lavender), var(--catppuccin-blue))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Blog
          </Title>
          <Text size="lg" c="subtext1" mb="lg">
            Discover insights, tutorials, and stories from our community
          </Text>

          {/* Stats */}
          <Group justify="center" gap="xl" mb="xl">
            <Group gap="xs">
              <IconBook size={20} style={{ color: 'var(--catppuccin-blue)' }} />
              <Text fw={600} c="text">
                {totalPosts}
              </Text>
              <Text size="sm" c="subtext1">
                Posts
              </Text>
            </Group>
            <Divider orientation="vertical" />
            <Group gap="xs">
              <IconTag size={20} style={{ color: 'var(--catppuccin-green)' }} />
              <Text fw={600} c="text">
                {totalTags}
              </Text>
              <Text size="sm" c="subtext1">
                Topics
              </Text>
            </Group>
            {latestPost && (
              <>
                <Divider orientation="vertical" />
                <Group gap="xs">
                  <IconCalendar size={20} style={{ color: 'var(--catppuccin-peach)' }} />
                  <Text size="sm" c="subtext1">
                    Latest:
                  </Text>
                  <Text fw={600} c="text" size="sm">
                    {new Date(latestPost.date).toLocaleDateString('vi-VN', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </Text>
                </Group>
              </>
            )}
          </Group>
        </div>

        {/* Posts Grid */}
        <div style={{ minHeight: '400px', padding: '2rem 0' }}>
          {posts.length > 0 ? (
            <Grid gutter="lg">
              {posts.map((post: BlogPostMetadata) => (
                <GridCol key={post.slug} span={{ base: 12, md: 6 }}>
                  <CompactPostCard post={post} />
                </GridCol>
              ))}
            </Grid>
          ) : (
            <div
              className="text-center"
              style={{
                minHeight: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <IconBook
                size={64}
                style={{ color: 'var(--catppuccin-overlay0)', marginBottom: '16px' }}
              />
              <Text size="lg" c="subtext1" mb="sm">
                No blog posts found
              </Text>
              <Text c="subtext0">Check back later for new content!</Text>
            </div>
          )}
        </div>

        {/* Popular Tags Section */}
        {posts.length > 0 && (
          <div style={{ minHeight: '200px', padding: '2rem 0' }}>
            <Divider style={{ marginBottom: '2rem' }} />
            <div className="text-center">
              <Title order={3} mb="lg" c="text">
                Popular Topics
              </Title>
              <Group justify="center" gap="xs" style={{ flexWrap: 'wrap' }}>
                {Array.from(new Set(posts.flatMap((post) => post.tags || [])))
                  .slice(0, 8)
                  .map((tag: string) => (
                    <Badge
                      key={tag}
                      variant="light"
                      color="lavender"
                      size="sm"
                      style={{ cursor: 'pointer', margin: '2px' }}
                    >
                      {tag}
                    </Badge>
                  ))}
              </Group>
            </div>
          </div>
        )}
      </Stack>
    </Container>
  );
}
