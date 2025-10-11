import { BlogPostMetadata, getRelatedPosts } from 'app/lib/mdx';
import { Container, Title, Grid, GridCol } from '@mantine/core';
import PostCard from './post-card';

interface RelatedPostsProps {
  currentSlug: string;
  tags: string[];
  limit?: number;
}

export default async function RelatedPosts({ currentSlug, tags, limit = 3 }: RelatedPostsProps) {
  const relatedPosts = await getRelatedPosts(currentSlug, tags, limit);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <Container py="xl" my="xl" maw={'100vw'} w={'100%'}>
      <Title order={2} mb="xl" ta="center">
        Related Posts
      </Title>

      <Grid mt="xl">
        {relatedPosts.map((post: BlogPostMetadata) => (
          <GridCol key={post.slug} span={{ base: 12, md: 4, lg: 4 }}>
            <PostCard post={post} />
          </GridCol>
        ))}
      </Grid>
    </Container>
  );
}
