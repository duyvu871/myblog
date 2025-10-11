'use client';

import Link from 'next/link';
import { Box, Container, Center, Stack, Title, Text, Button, Group } from '@mantine/core';
import { getAllPosts, BlogPostMetadata } from 'app/lib/mdx';
import { IconArrowRight } from '@tabler/icons-react';

interface HeroSectionProps {
  posts: BlogPostMetadata[];
  allTags: string[];
}

export function HeroSection({ posts, allTags }: HeroSectionProps) {
  return (
    <Box
      id="hero"
      style={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, var(--catppuccin-base) 0%, var(--catppuccin-mantle) 100%)`,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Floating code snippets background */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2389b4fa' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <Container size="md" style={{ position: 'relative', zIndex: 1 }}>
        <Center
          style={{ minHeight: '100vh', padding: '2rem 0' }}
          className="!items-start md:!items-center"
        >
          <Stack gap="xl" align="center" style={{ textAlign: 'center', maxWidth: '800px' }}>
            {/* Greeting */}
            <Text
              size="lg"
              style={{
                color: 'var(--catppuccin-blue)',
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 500,
              }}
            >
              <span style={{ color: 'initial' }}>👋</span> Hey, I'm Bui An Du
            </Text>

            {/* Main Title */}
            <Box>
              <Title
                order={1}
                style={{
                  fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                  fontWeight: 800,
                  background:
                    'linear-gradient(135deg, var(--catppuccin-lavender), var(--catppuccin-blue), var(--catppuccin-teal))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '1rem',
                  fontFamily: 'JetBrains Mono, monospace',
                  lineHeight: 1.1,
                }}
              >
                From Du With Code
              </Title>
              <Text
                size="xl"
                c="subtext1"
                style={{
                  fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                  lineHeight: 1.6,
                  marginBottom: '2rem',
                }}
              >
                A mix of notes, ideas, and things I break (and sometimes fix){' '}
                <span style={{ color: 'initial' }}>🐈</span>
              </Text>
            </Box>

            {/* CTA Buttons */}
            <Group gap="md">
              <Button
                component={Link}
                href="/blog"
                size="lg"
                style={{
                  background:
                    'linear-gradient(135deg, var(--catppuccin-blue), var(--catppuccin-lavender))',
                  color: 'var(--catppuccin-base)',
                  border: 'none',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: 600,
                  padding: '16px 32px',
                  borderRadius: '12px',
                  boxShadow: '0 8px 25px rgba(137, 180, 250, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background:
                      'linear-gradient(135deg, var(--catppuccin-lavender), var(--catppuccin-blue))',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 35px rgba(137, 180, 250, 0.4)',
                  },
                }}
                rightSection={<IconArrowRight size={18} />}
              >
                Start Reading
              </Button>
              <Button
                component={Link}
                href="#about"
                size="lg"
                variant="outline"
                style={{
                  border: '2px solid var(--catppuccin-surface1)',
                  color: 'var(--catppuccin-text)',
                  fontFamily: 'JetBrains Mono, monospace',
                  padding: '14px 30px',
                  borderRadius: '12px',
                  backgroundColor: 'transparent',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'var(--catppuccin-surface0)',
                    borderColor: 'var(--catppuccin-blue)',
                    color: 'var(--catppuccin-blue)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                About Me
              </Button>
            </Group>

            {/* Fun stats */}
            <Group gap="xl" style={{ marginTop: '3rem' }}>
              <Stack gap="xs" align="center">
                <Text size="2.5rem" fw={700} style={{ color: 'var(--catppuccin-lavender)' }}>
                  {posts.length}
                </Text>
                <Text size="sm" c="subtext1">
                  Notes Written
                </Text>
              </Stack>
              <Stack gap="xs" align="center">
                <Text size="2.5rem" fw={700} style={{ color: 'var(--catppuccin-blue)' }}>
                  {allTags.length}
                </Text>
                <Text size="sm" c="subtext1">
                  Topics Covered
                </Text>
              </Stack>
              <Stack gap="xs" align="center">
                <Text size="2.5rem" fw={700} style={{ color: 'var(--catppuccin-teal)' }}>
                  ∞
                </Text>
                <Text size="sm" c="subtext1">
                  Bugs Fixed
                </Text>
              </Stack>
            </Group>
          </Stack>
        </Center>
      </Container>
    </Box>
  );
}
