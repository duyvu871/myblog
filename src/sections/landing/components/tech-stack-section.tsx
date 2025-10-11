'use client';

import {
  Box,
  Container,
  Stack,
  Title,
  Text,
  Grid,
  GridCol,
  Paper,
  Center,
  Anchor,
  Group,
  SimpleGrid,
} from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';

export function TechStackSection() {
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
      <Container size="md" id="tech-stack">
        <Stack gap="xl">
          <Box style={{ textAlign: 'center' }}>
            <span className="mb-[1rem] inline-flex items-center gap-2 align-middle">
              <Text size="2.5rem" className="text-initial leading-none">
                🛠️
              </Text>
              <Title
                order={2}
                size="2.5rem"
                className="m-0 inline-block leading-none"
                style={{
                  background:
                    'linear-gradient(135deg, var(--catppuccin-mauve), var(--catppuccin-pink))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                Tech Stack & Expertise
              </Title>
            </span>
            <Text size="lg" c="subtext1" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Technologies I work with and lead teams in implementing
            </Text>
          </Box>

          <Stack gap="xl">
            {/* Frontend Technologies - Left side */}
            <Grid gutter="xl" align="center">
              <GridCol span={{ base: 12, md: 6 }}>
                <Paper
                  p="xl"
                  radius="lg"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--catppuccin-surface0), var(--catppuccin-surface1))',
                    border: '1px solid var(--catppuccin-surface2)',
                    minHeight: '320px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Stack gap="md">
                    <Title order={4} c="text" style={{ fontWeight: 600 }}>
                      <span style={{ color: 'initial' }}>🎨</span> Frontend Technologies
                    </Title>
                    <Text size="sm" c="subtext1">
                      React, Next.js, TypeScript, Tailwind CSS, Three.js, Vue, Vite, and more
                    </Text>
                    <SimpleGrid cols={5} spacing="md" style={{ justifyItems: 'center' }}>
                      {[
                        { name: 'React', icon: 'react' },
                        { name: 'Next.js', icon: 'nextjs' },
                        { name: 'TypeScript', icon: 'ts' },
                        { name: 'Tailwind', icon: 'tailwind' },
                        { name: 'Three.js', icon: 'threejs' },
                        { name: 'Vue', icon: 'vue' },
                        { name: 'Vite', icon: 'vite' },
                        { name: 'HTML', icon: 'html' },
                        { name: 'CSS', icon: 'css' },
                        { name: 'JavaScript', icon: 'js' },
                        { name: 'Remix', icon: 'remix' },
                        { name: 'Vitest', icon: 'vitest' },
                        { name: 'Bootstrap', icon: 'bootstrap' },
                        { name: 'Sass', icon: 'sass' },
                        { name: 'Figma', icon: 'figma' },
                      ].map((tech) => (
                        <Box
                          key={tech.name}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '8px',
                            borderRadius: '8px',
                            backgroundColor: 'var(--catppuccin-surface1)',
                            transition: 'all 0.2s ease',
                          }}
                          className="hover:scale-110"
                          title={tech.name}
                        >
                          <img
                            height="40"
                            width="40"
                            src={`https://skillicons.dev/icons?i=${tech.icon}`}
                            alt={tech.name}
                            loading="lazy"
                            style={{
                              borderRadius: '4px',
                            }}
                          />
                        </Box>
                      ))}
                    </SimpleGrid>
                  </Stack>
                </Paper>
              </GridCol>
              <GridCol span={{ base: 12, md: 6 }} className="hidden md:block">
                <Center style={{ height: '320px' }}>
                  <Stack gap="md" align="center">
                    <Text
                      size="xl"
                      style={{
                        fontStyle: 'italic',
                        color: 'var(--catppuccin-text)',
                        textAlign: 'center',
                        lineHeight: 1.6,
                      }}
                    >
                      "Code is like humor. When you have to explain it, it's bad."
                    </Text>
                    <Text size="sm" c="subtext1" style={{ textAlign: 'center' }}>
                      — Cory House
                    </Text>
                  </Stack>
                </Center>
              </GridCol>
            </Grid>

            {/* Backend & Cloud - Right side */}
            <Grid gutter="xl" align="center">
              <GridCol span={{ base: 12, md: 6 }} className="hidden md:block">
                <Center style={{ height: '320px' }}>
                  <Stack gap="md" align="center">
                    <Text
                      size="xl"
                      style={{
                        fontStyle: 'italic',
                        color: 'var(--catppuccin-text)',
                        textAlign: 'center',
                        lineHeight: 1.6,
                      }}
                    >
                      "The best error message is the one that never shows up."
                    </Text>
                    <Text size="sm" c="subtext1" style={{ textAlign: 'center' }}>
                      — Thomas Fuchs
                    </Text>
                  </Stack>
                </Center>
              </GridCol>
              <GridCol span={{ base: 12, md: 6 }}>
                <Paper
                  p="xl"
                  radius="lg"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--catppuccin-surface0), var(--catppuccin-surface1))',
                    border: '1px solid var(--catppuccin-surface2)',
                    minHeight: '320px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Stack gap="md">
                    <Title order={4} c="text" style={{ fontWeight: 600 }}>
                      <span style={{ color: 'initial' }}>⚙️</span> Backend & Cloud
                    </Title>
                    <Text size="sm" c="subtext1">
                      Node.js, Python, Spring Boot, Docker, Kubernetes, GCP, Azure
                    </Text>
                    <SimpleGrid cols={4} spacing="md" style={{ justifyItems: 'center' }}>
                      {[
                        { name: 'Node.js', icon: 'nodejs' },
                        { name: 'Python', icon: 'python' },
                        { name: 'Spring', icon: 'spring' },
                        { name: 'Express', icon: 'express' },
                        { name: 'NestJS', icon: 'nestjs' },
                        { name: 'Flask', icon: 'flask' },
                        { name: 'FastAPI', icon: 'fastapi' },
                        { name: 'Django', icon: 'django' },
                        { name: 'PHP', icon: 'php' },
                        { name: 'RabbitMQ', icon: 'rabbitmq' },
                      ].map((tech) => (
                        <Box
                          key={tech.name}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '8px',
                            borderRadius: '8px',
                            backgroundColor: 'var(--catppuccin-surface1)',
                            transition: 'all 0.2s ease',
                          }}
                          className="hover:scale-110"
                          title={tech.name}
                        >
                          <img
                            height="40"
                            width="40"
                            src={`https://skillicons.dev/icons?i=${tech.icon}`}
                            alt={tech.name}
                            loading="lazy"
                            style={{
                              borderRadius: '4px',
                            }}
                          />
                        </Box>
                      ))}
                    </SimpleGrid>
                  </Stack>
                </Paper>
              </GridCol>
            </Grid>

            {/* Database & AI/ML - Left side */}
            <Grid gutter="xl" align="center">
              <GridCol span={{ base: 12, md: 6 }}>
                <Paper
                  p="xl"
                  radius="lg"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--catppuccin-surface0), var(--catppuccin-surface1))',
                    border: '1px solid var(--catppuccin-surface2)',
                    minHeight: '320px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Stack gap="md">
                    <Title order={4} c="text" style={{ fontWeight: 600 }}>
                      <span style={{ color: 'initial' }}>🗄️</span> Database & AI/ML
                    </Title>
                    <Text size="sm" c="subtext1">
                      PostgreSQL, MongoDB, Redis, Elasticsearch, TensorFlow, PyTorch
                    </Text>
                    <SimpleGrid cols={4} spacing="md" style={{ justifyItems: 'center' }}>
                      {[
                        { name: 'MySQL', icon: 'mysql' },
                        { name: 'PostgreSQL', icon: 'postgresql' },
                        { name: 'MongoDB', icon: 'mongodb' },
                        { name: 'SQLite', icon: 'sqlite' },
                        { name: 'Redis', icon: 'redis' },
                        { name: 'Firebase', icon: 'firebase' },
                        { name: 'Supabase', icon: 'supabase' },
                        { name: 'Elasticsearch', icon: 'elasticsearch' },
                        { name: 'DynamoDB', icon: 'dynamodb' },
                        { name: 'Prisma', icon: 'prisma' },
                      ].map((tech) => (
                        <Box
                          key={tech.name}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '8px',
                            borderRadius: '8px',
                            backgroundColor: 'var(--catppuccin-surface1)',
                            transition: 'all 0.2s ease',
                          }}
                          className="hover:scale-110"
                          title={tech.name}
                        >
                          <img
                            height="40"
                            width="40"
                            src={`https://skillicons.dev/icons?i=${tech.icon}`}
                            alt={tech.name}
                            loading="lazy"
                            style={{
                              borderRadius: '4px',
                            }}
                          />
                        </Box>
                      ))}
                    </SimpleGrid>
                  </Stack>
                </Paper>
              </GridCol>
              <GridCol span={{ base: 12, md: 6 }} className="hidden md:block">
                <Center style={{ height: '320px' }}>
                  <Stack gap="md" align="center">
                    <Text
                      size="xl"
                      style={{
                        fontStyle: 'italic',
                        color: 'var(--catppuccin-text)',
                        textAlign: 'center',
                        lineHeight: 1.6,
                      }}
                    >
                      "Data is the new oil, but unlike oil, data is forever."
                    </Text>
                    <Text size="sm" c="subtext1" style={{ textAlign: 'center' }}>
                      — Data Science Proverb
                    </Text>
                  </Stack>
                </Center>
              </GridCol>
            </Grid>

            {/* DevOps & Leadership - Right side */}
            <Grid gutter="xl" align="center">
              <GridCol span={{ base: 12, md: 6 }} className="hidden md:block">
                <Center style={{ height: '320px' }}>
                  <Stack gap="md" align="center">
                    <Text
                      size="xl"
                      style={{
                        fontStyle: 'italic',
                        color: 'var(--catppuccin-text)',
                        textAlign: 'center',
                        lineHeight: 1.6,
                      }}
                    >
                      "The best way to predict the future is to build it."
                    </Text>
                    <Text size="sm" c="subtext1" style={{ textAlign: 'center' }}>
                      — Peter Drucker
                    </Text>
                  </Stack>
                </Center>
              </GridCol>
              <GridCol span={{ base: 12, md: 6 }}>
                <Paper
                  p="xl"
                  radius="lg"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--catppuccin-surface0), var(--catppuccin-surface1))',
                    border: '1px solid var(--catppuccin-surface2)',
                    minHeight: '320px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Stack gap="md">
                    <Title order={4} c="text" style={{ fontWeight: 600 }}>
                      <span style={{ color: 'initial' }}>🚀</span> DevOps & Leadership
                    </Title>
                    <Text size="sm" c="subtext1">
                      Jenkins, GitHub Actions, Prometheus, Leadership, Team Building
                    </Text>
                    <SimpleGrid cols={4} spacing="md" style={{ justifyItems: 'center' }}>
                      {[
                        { name: 'Docker', icon: 'docker' },
                        { name: 'Kubernetes', icon: 'kubernetes' },
                        { name: 'Google Cloud', icon: 'gcp' },
                        { name: 'Azure', icon: 'azure' },
                        { name: 'Jenkins', icon: 'jenkins' },
                        { name: 'GitHub Actions', icon: 'githubactions' },
                        { name: 'Nginx', icon: 'nginx' },
                        { name: 'Prometheus', icon: 'prometheus' },
                      ].map((tech) => (
                        <Box
                          key={tech.name}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '8px',
                            borderRadius: '8px',
                            backgroundColor: 'var(--catppuccin-surface1)',
                            transition: 'all 0.2s ease',
                          }}
                          className="hover:scale-110"
                          title={tech.name}
                        >
                          <img
                            height="40"
                            width="40"
                            src={`https://skillicons.dev/icons?i=${tech.icon}`}
                            alt={tech.name}
                            loading="lazy"
                            style={{
                              borderRadius: '4px',
                            }}
                          />
                        </Box>
                      ))}
                    </SimpleGrid>
                  </Stack>
                </Paper>
              </GridCol>
            </Grid>
          </Stack>

          <Center>
            <Anchor
              href="https://github.com/duyvu871"
              target="_blank"
              style={{
                color: 'var(--catppuccin-base)',
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              <Group gap="xs">
                <Text style={{ color: 'var(--catppuccin-sapphire)' }}>
                  View full tech stack on GitHub
                </Text>
                <IconExternalLink size={16} style={{ color: 'var(--catppuccin-sapphire)' }} />
              </Group>
            </Anchor>
          </Center>
        </Stack>
      </Container>
    </Box>
  );
}
