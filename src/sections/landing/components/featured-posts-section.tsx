'use client';

import Link from 'next/link';
import {
  Box,
  Container,
  Stack,
  Title,
  Text,
  Grid,
  GridCol,
  Card,
  Group,
  Badge,
  Button,
  Center,
} from '@mantine/core';
import { BlogPostMetadata } from 'app/lib/mdx';
import { IconArrowRight } from '@tabler/icons-react';

interface FeaturedPostsSectionProps {
  featuredPosts: BlogPostMetadata[];
}

export function FeaturedPostsSection({ featuredPosts }: FeaturedPostsSectionProps) {
  return (
    <Box
      style={{
        backgroundColor: 'var(--catppuccin-base)',
        padding: '5rem 0',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container size="md" id="featured-posts">
        <Stack gap="xl" justify="center" style={{ minHeight: '100vh', padding: '5rem 0' }}>
          <Box style={{ textAlign: 'center' }}>
            <span className="mb-[1rem] inline-flex items-center gap-2 align-middle">
              <Text size="2.5rem" className="text-initial leading-none">
                📝
              </Text>
              <Title
                order={2}
                size="2.5rem"
                className="m-0 inline-block leading-none"
                style={{
                  background:
                    'linear-gradient(135deg, var(--catppuccin-yellow), var(--catppuccin-peach))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                Latest Notes
              </Title>
            </span>
            <Text size="lg" c="subtext1" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Fresh from the keyboard — my latest thoughts, discoveries, and experiments.
            </Text>
          </Box>

          <Grid gutter="xl">
            {featuredPosts.map((post, index) => (
              <GridCol key={post.slug} span={{ base: 12, sm: 6 }}>
                <Card
                  shadow="md"
                  radius="lg"
                  withBorder
                  style={{
                    backgroundColor: 'var(--catppuccin-surface0)',
                    borderColor: 'var(--catppuccin-surface1)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    height: '100%',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                  component={Link}
                  href={`/blog/${post.slug}`}
                >
                  <Stack gap="md" style={{ height: '100%' }}>
                    {/* Post Image Placeholder */}
                    {/* <Box
                      style={{
                        height: '160px',
                        background: `linear-gradient(135deg,
                          ${
                            index % 4 === 0
                              ? 'var(--catppuccin-lavender)'
                              : index % 4 === 1
                                ? 'var(--catppuccin-blue)'
                                : index % 4 === 2
                                  ? 'var(--catppuccin-teal)'
                                  : 'var(--catppuccin-green)'
                          }15,
                          ${
                            index % 4 === 0
                              ? 'var(--catppuccin-blue)'
                              : index % 4 === 1
                                ? 'var(--catppuccin-teal)'
                                : index % 4 === 2
                                  ? 'var(--catppuccin-green)'
                                  : 'var(--catppuccin-lavender)'
                          }15)`,
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                      }}
                    >
                      <IconBook
                        size={40}
                        style={{ color: 'var(--catppuccin-text)', opacity: 0.6 }}
                      />
                      <Box
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          backgroundColor: 'var(--catppuccin-surface1)',
                          borderRadius: '50%',
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Text size="xs" fw={700} style={{ color: 'var(--catppuccin-text)' }}>
                          {index + 1}
                        </Text>
                      </Box>
                    </Box> */}

                    <Stack gap="sm" style={{ flex: 1 }}>
                      <Title order={3} size="h4" c="text" lineClamp={2} style={{ fontWeight: 600 }}>
                        {post.title}
                      </Title>

                      <Text c="subtext1" size="sm" lineClamp={3} style={{ lineHeight: 1.5 }}>
                        {post.description}
                      </Text>

                      {post.tags && (
                        <Group gap="xs">
                          {post.tags.slice(0, 3).map((tag: string) => (
                            <Badge
                              key={tag}
                              variant="light"
                              size="xs"
                              style={{
                                backgroundColor: 'var(--catppuccin-surface1)',
                                color: 'var(--catppuccin-text)',
                                textTransform: 'lowercase',
                              }}
                            >
                              #{tag}
                            </Badge>
                          ))}
                        </Group>
                      )}

                      <Group justify="space-between" mt="auto">
                        <Text
                          size="xs"
                          c="subtext0"
                          style={{ fontFamily: 'JetBrains Mono, monospace' }}
                        >
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </Text>
                        <Button
                          size="xs"
                          variant="subtle"
                          rightSection={<IconArrowRight size={12} />}
                          style={{
                            color: 'var(--catppuccin-blue)',
                            borderRadius: '8px',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              backgroundColor: 'var(--catppuccin-blue)',
                              color: 'var(--catppuccin-base)',
                              transform: 'scale(1.05)',
                            },
                          }}
                        >
                          Read
                        </Button>
                      </Group>
                    </Stack>
                  </Stack>
                </Card>
              </GridCol>
            ))}
          </Grid>

          <Center>
            <Button
              component={Link}
              href="/blog"
              size="lg"
              variant="light"
              style={{
                background:
                  'linear-gradient(135deg, var(--catppuccin-yellow), var(--catppuccin-peach))',
                color: 'var(--catppuccin-base)',
                border: '2px solid var(--catppuccin-surface2)',
                fontFamily: 'JetBrains Mono, monospace',
                padding: '14px 28px',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background:
                    'linear-gradient(135deg, var(--catppuccin-peach), var(--catppuccin-yellow))',
                  color: 'var(--catppuccin-base)',
                  borderColor: 'var(--catppuccin-peach)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(49, 116, 143, 0.3)',
                },
              }}
              rightSection={<IconArrowRight size={18} />}
            >
              View All Notes
            </Button>
          </Center>
        </Stack>
      </Container>
    </Box>
  );
}
