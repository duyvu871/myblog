'use client';

import {
  Box,
  Container,
  Grid,
  GridCol,
  Stack,
  Title,
  Text,
  Paper,
  Center,
  Divider,
  Group,
  Button,
} from '@mantine/core';
import { IconBrandGithub, IconExternalLink } from '@tabler/icons-react';

export function AboutSection() {
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
      <Container size="md" id="about">
        <Grid gutter="xl" align="center">
          <GridCol span={{ base: 12, md: 6 }}>
            <Stack gap="xl">
              <Box>
                <span className="mb-[1rem] inline-flex items-center gap-2 align-middle">
                  <Text size="2.5rem" className="text-initial leading-none">
                    👨‍💻
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
                    About Me
                  </Title>
                </span>
                <Text size="lg" c="subtext1" style={{ lineHeight: 1.7, fontStyle: 'italic' }}>
                  I'm Bui An Du, a passionate software engineer with a focus on AI/ML integration,
                  cloud architecture, and enterprise solutions. I'm a leader and innovator, driving
                  innovation in technology and building a culture of technical excellence.
                </Text>
                <Text size="lg" c="subtext1" style={{ lineHeight: 1.7, marginTop: '1rem' }}>
                  This space is where I document my learnings, experiments, and tech rants. When I'm
                  not breaking things in code, you'll find me exploring new technologies, writing
                  about my discoveries, and occasionally fixing what I broke.
                </Text>
              </Box>

              <Group gap="md">
                <Button
                  component="a"
                  href="https://github.com/duyvu871"
                  target="_blank"
                  variant="light"
                  leftSection={<IconBrandGithub size={16} />}
                  style={{
                    background:
                      'linear-gradient(135deg, var(--catppuccin-maroon), var(--catppuccin-maroon))',
                    color: 'var(--catppuccin-base)',
                    border: '2px solid var(--catppuccin-surface2)',
                    borderRadius: '10px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background:
                        'linear-gradient(135deg, var(--catppuccin-maroon), var(--catppuccin-maroon))',
                      color: 'white',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
                    },
                  }}
                >
                  GitHub
                </Button>
                <Button
                  component="a"
                  href="https://www.facebook.com/profile.php?id=100017123670001"
                  target="_blank"
                  variant="light"
                  leftSection={<IconExternalLink size={16} />}
                  style={{
                    background:
                      'linear-gradient(135deg, var(--catppuccin-blue), var(--catppuccin-blue))',
                    color: 'var(--catppuccin-base)',
                    border: '2px solid var(--catppuccin-surface2)',
                    borderRadius: '10px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background:
                        'linear-gradient(135deg, var(--catppuccin-blue), var(--catppuccin-blue))',
                      color: 'white',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 6px 20px rgba(24, 119, 242, 0.3)',
                    },
                  }}
                >
                  Facebook
                </Button>
                <Button
                  component="a"
                  href="https://www.instagram.com/db.mirage"
                  target="_blank"
                  variant="light"
                  leftSection={<IconExternalLink size={16} />}
                  style={{
                    background:
                      'linear-gradient(135deg, var(--catppuccin-green), var(--catppuccin-green))',
                    color: 'var(--catppuccin-base)',
                    border: '2px solid var(--catppuccin-surface2)',
                    borderRadius: '10px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background:
                        'linear-gradient(135deg, var(--catppuccin-green), var(--catppuccin-green))',
                      color: 'white',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 6px 20px rgba(240, 148, 51, 0.3)',
                    },
                  }}
                >
                  Instagram
                </Button>
              </Group>
            </Stack>
          </GridCol>

          <GridCol span={{ base: 12, md: 6 }}>
            <Paper
              p="xl"
              radius="lg"
              style={{
                background:
                  'linear-gradient(135deg, var(--catppuccin-surface0), var(--catppuccin-surface1))',
                border: '1px solid var(--catppuccin-surface2)',
              }}
            >
              <Stack gap="lg">
                <Center>
                  <Text size="4xl" style={{ color: 'initial' }}>
                    🐈
                  </Text>
                </Center>

                <Box style={{ textAlign: 'center' }}>
                  <Title order={3} c="text" mb="md">
                    The Cat CTO
                  </Title>
                  <Text c="subtext1" style={{ lineHeight: 1.6 }}>
                    Passionate about clean code, beautiful design, and occasionally causing chaos in
                    production environments. Always learning, always building.
                  </Text>
                  <Divider my="md" />
                  <Text size="sm" c="subtext0" style={{ fontStyle: 'italic' }}>
                    "Code is poetry, bugs are plot twists" — Me, probably
                  </Text>
                </Box>
              </Stack>
            </Paper>
          </GridCol>
        </Grid>
      </Container>
    </Box>
  );
}
