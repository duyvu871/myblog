'use client';

import Link from 'next/link';
import { Box, Container, Stack, Title, Text, Grid, GridCol, Paper, Badge } from '@mantine/core';
import { BlogPostMetadata } from 'app/lib/mdx';

interface Category {
  name: string;
  tags: string[];
  emoji: string;
}

interface CategoriesSectionProps {
  categories: Category[];
  posts: BlogPostMetadata[];
}

export function CategoriesSection({ categories, posts }: CategoriesSectionProps) {
  return (
    <Box
      style={{
        backgroundColor: 'var(--catppuccin-mantle)',
        padding: '5rem 0',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container size="md" id="categories">
        <Stack gap="xl" justify="center" style={{ minHeight: '100vh', padding: '5rem 0' }}>
          <Box style={{ textAlign: 'center' }}>
            <span className="mb-[1rem] inline-flex items-center gap-2 align-middle">
              <Text size="2.5rem" className="text-initial leading-none">
                🏷️
              </Text>
              <Title
                order={2}
                size="2.5rem"
                className="m-0 inline-block leading-none"
                style={{
                  background:
                    'linear-gradient(135deg, var(--catppuccin-pink), var(--catppuccin-mauve))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                Explore by Topic
              </Title>
            </span>
            <Text size="lg" c="subtext1" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Find exactly what you're looking for, from technical deep-dives to casual musings.
            </Text>
          </Box>

          <Grid gutter="lg">
            {categories.map((category, index) => (
              <GridCol key={category.name} span={{ base: 12, sm: 6, md: 3 }}>
                <Paper
                  p="xl"
                  radius="lg"
                  style={{
                    background: `linear-gradient(135deg,
                      ${
                        index % 4 === 0
                          ? 'var(--catppuccin-lavender)'
                          : index % 4 === 1
                            ? 'var(--catppuccin-blue)'
                            : index % 4 === 2
                              ? 'var(--catppuccin-teal)'
                              : 'var(--catppuccin-green)'
                      }08,
                      var(--catppuccin-surface0))`,
                    border: `1px solid var(--catppuccin-surface1)`,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    height: '100%',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                      borderColor:
                        index % 4 === 0
                          ? 'var(--catppuccin-lavender)'
                          : index % 4 === 1
                            ? 'var(--catppuccin-blue)'
                            : index % 4 === 2
                              ? 'var(--catppuccin-teal)'
                              : 'var(--catppuccin-green)',
                    },
                  }}
                  component={Link}
                  href={`/blog?tag=${category.tags[0]}`}
                >
                  <Stack gap="md" align="center" style={{ textAlign: 'center' }}>
                    <Text size="3xl" style={{ color: 'initial' }}>
                      {category.emoji}
                    </Text>
                    <Title order={3} size="h4" c="text" style={{ fontWeight: 600 }}>
                      {category.name}
                    </Title>
                    <Text size="sm" c="subtext1" style={{ lineHeight: 1.5 }}>
                      {category.tags.slice(0, 2).join(', ')}
                      {category.tags.length > 2 && ' & more'}
                    </Text>
                    <Badge
                      variant="light"
                      style={{
                        backgroundColor:
                          index % 4 === 0
                            ? 'var(--catppuccin-lavender)20'
                            : index % 4 === 1
                              ? 'var(--catppuccin-blue)20'
                              : index % 4 === 2
                                ? 'var(--catppuccin-teal)20'
                                : 'var(--catppuccin-green)20',
                        color:
                          index % 4 === 0
                            ? 'var(--catppuccin-lavender)'
                            : index % 4 === 1
                              ? 'var(--catppuccin-blue)'
                              : index % 4 === 2
                                ? 'var(--catppuccin-teal)'
                                : 'var(--catppuccin-green)',
                      }}
                    >
                      {
                        posts.filter((post) =>
                          post.tags?.some((tag) => category.tags.includes(tag))
                        ).length
                      }{' '}
                      notes
                    </Badge>
                  </Stack>
                </Paper>
              </GridCol>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
