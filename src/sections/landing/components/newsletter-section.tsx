'use client';

import { Box, Container, Center, Stack, Title, Text, Paper, Button } from '@mantine/core';

export function NewsletterSection() {
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
      <Container size="md">
        <Center>
          <Stack gap="xl" align="center" style={{ textAlign: 'center', maxWidth: '600px' }}>
            <Box>
              <span className="mb-[1rem] inline-flex items-center gap-2 align-middle">
                <Text size="2.5rem" className="text-initial leading-none">
                  🚀
                </Text>
                <Title
                  order={2}
                  size="2.5rem"
                  className="m-0 inline-block leading-none"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--catppuccin-green), var(--catppuccin-teal))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                >
                  Stay Updated
                </Title>
              </span>
              <Text size="lg" c="subtext1" style={{ lineHeight: 1.6 }}>
                Get new posts, code snippets, and tech insights delivered straight to your inbox. No
                spam, just good stuff.
              </Text>
            </Box>

            <Paper
              p="lg"
              radius="lg"
              style={{
                backgroundColor: 'var(--catppuccin-surface0)',
                border: '1px solid var(--catppuccin-surface1)',
                width: '100%',
                maxWidth: '400px',
              }}
            >
              <Text size="sm" c="subtext1" mb="md" style={{ textAlign: 'center' }}>
                Coming soon! Newsletter signup will be available here.
              </Text>
              <Button
                fullWidth
                style={{
                  background:
                    'linear-gradient(135deg, var(--catppuccin-surface1), var(--catppuccin-surface2))',
                  color: 'var(--catppuccin-subtext0)',
                  borderRadius: '10px',
                  opacity: 0.6,
                  cursor: 'not-allowed',
                  fontFamily: 'JetBrains Mono, monospace',
                  padding: '12px',
                }}
                disabled
              >
                Notify Me When Ready
              </Button>
            </Paper>

            <Text size="sm" c="subtext0" style={{ fontStyle: 'italic' }}>
              Or follow me on social media for instant updates{' '}
              <span style={{ color: 'initial' }}>🔥</span>
            </Text>
          </Stack>
        </Center>
      </Container>
    </Box>
  );
}
