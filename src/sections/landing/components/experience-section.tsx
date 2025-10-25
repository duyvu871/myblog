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
  Badge,
  Group,
  Anchor,
  Progress,
  ThemeIcon,
} from '@mantine/core';
import {
  IconBriefcase,
  IconCode,
  IconShield,
  IconRobot,
  IconExternalLink,
  IconTrendingUp,
  IconDatabase,
  IconCloud,
  IconLock,
  IconBrain,
  IconScan,
} from '@tabler/icons-react';

export function ExperienceSection() {
  return (
    <Box
      id="experience"
      style={{
        background:
          'linear-gradient(135deg, var(--catppuccin-mantle) 0%, var(--catppuccin-base) 100%)',
        padding: '6rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(137, 180, 250, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(203, 166, 247, 0.1) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        }}
      />

      <Container size="lg" style={{ position: 'relative', zIndex: 1 }}>
        <Stack gap="xl" align="center">
          <Box style={{ textAlign: 'center', maxWidth: '800px' }}>
            <Title
              order={2}
              size="3rem"
              className="mb-4"
              style={{
                background:
                  'linear-gradient(135deg, var(--catppuccin-blue), var(--catppuccin-lavender), var(--catppuccin-mauve))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: '800',
                lineHeight: 1.2,
              }}
            >
              Professional Experience
            </Title>
            <Text size="xl" c="subtext1" style={{ lineHeight: 1.6, fontStyle: 'italic' }}>
              Building scalable solutions and leading technical innovation in enterprise
              environments.
            </Text>
            <Box mt="md">
              <Text size="sm" c="subtext0" style={{ opacity: 0.8 }}>
                🚀 Full-Stack Development • 🤖 AI Integration • ☁️ Cloud Architecture • 🔒 Security
              </Text>
            </Box>
          </Box>

          <Grid gutter="xl" style={{ width: '100%' }}>
            {/* SSIT Joint Stock Company */}
            <GridCol span={{ base: 12, md: 6 }}>
              <Paper
                p="xl"
                radius="xl"
                style={{
                  background:
                    'linear-gradient(135deg, var(--catppuccin-surface0) 0%, var(--catppuccin-surface1) 100%)',
                  border: '1px solid var(--catppuccin-surface2)',
                  height: '100%',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                    borderColor: 'var(--catppuccin-blue)',
                  },
                }}
              >
                {/* Hover glow effect */}
                <Box
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      'linear-gradient(135deg, transparent 0%, rgba(137, 180, 250, 0.05) 100%)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none',
                  }}
                  className="hover-glow"
                />

                <Stack gap="lg" style={{ position: 'relative', zIndex: 1 }}>
                  <Group justify="space-between" align="flex-start">
                    <Box>
                      <Group gap="xs" mb="xs">
                        <ThemeIcon
                          size="md"
                          radius="md"
                          variant="light"
                          color="blue"
                          style={{ backgroundColor: 'rgba(137, 180, 250, 0.1)' }}
                        >
                          <IconBriefcase size={18} />
                        </ThemeIcon>
                        <Badge
                          variant="light"
                          color="blue"
                          size="sm"
                          style={{ fontSize: '0.7rem' }}
                        >
                          Current Role
                        </Badge>
                      </Group>
                      <Title order={4} c="text" size="xl" mb="xs">
                        SSIT Joint Stock Company
                      </Title>
                      <Text size="md" c="subtext0" fw="600" mb="xs">
                        Full Stack Developer
                      </Text>
                      <Text size="sm" c="subtext1" style={{ opacity: 0.8 }}>
                        Jul 2024 – Present • 11-employee startup
                      </Text>
                    </Box>
                  </Group>

                  <Text size="md" c="subtext1" style={{ lineHeight: 1.6 }}>
                    Leading development of ERP and management platforms with focus on scalability
                    and performance.
                  </Text>

                  <Box>
                    <Text size="sm" c="text" fw="bold" mb="md">
                      Key Achievements
                    </Text>
                    <Stack gap="sm">
                      <Group gap="xs" align="flex-start">
                        <IconTrendingUp
                          size={16}
                          style={{ color: 'var(--catppuccin-green)', marginTop: 2 }}
                        />
                        <Text size="sm" c="subtext1" style={{ lineHeight: 1.5, flex: 1 }}>
                          Architected and led scalable full-stack platforms from design to
                          deployment
                        </Text>
                      </Group>
                      <Group gap="xs" align="flex-start">
                        <IconCloud
                          size={16}
                          style={{ color: 'var(--catppuccin-blue)', marginTop: 2 }}
                        />
                        <Text size="sm" c="subtext1" style={{ lineHeight: 1.5, flex: 1 }}>
                          Implemented CI/CD pipelines and monitoring with Docker, Prometheus, Loki,
                          Grafana
                        </Text>
                      </Group>
                      <Group gap="xs" align="flex-start">
                        <IconDatabase
                          size={16}
                          style={{ color: 'var(--catppuccin-mauve)', marginTop: 2 }}
                        />
                        <Text size="sm" c="subtext1" style={{ lineHeight: 1.5, flex: 1 }}>
                          Enhanced system reliability and maintainability across software lifecycle
                        </Text>
                      </Group>
                    </Stack>
                  </Box>

                  <Group gap="xs" mt="md">
                    <Badge variant="dot" color="blue" size="sm">
                      Docker
                    </Badge>
                    <Badge variant="dot" color="green" size="sm">
                      CI/CD
                    </Badge>
                    <Badge variant="dot" color="orange" size="sm">
                      Monitoring
                    </Badge>
                  </Group>
                </Stack>
              </Paper>
            </GridCol>

            {/* TuyenSinhOnline Project */}
            <GridCol span={{ base: 12, md: 6 }}>
              <Paper
                p="xl"
                radius="xl"
                style={{
                  background:
                    'linear-gradient(135deg, var(--catppuccin-surface0) 0%, var(--catppuccin-surface1) 100%)',
                  border: '1px solid var(--catppuccin-surface2)',
                  height: '100%',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                    borderColor: 'var(--catppuccin-green)',
                  },
                }}
              >
                <Box
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      'linear-gradient(135deg, transparent 0%, rgba(166, 227, 161, 0.05) 100%)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none',
                  }}
                  className="hover-glow"
                />

                <Stack gap="lg" style={{ position: 'relative', zIndex: 1 }}>
                  <Group justify="space-between" align="flex-start">
                    <Box>
                      <Group gap="xs" mb="xs">
                        <ThemeIcon
                          size="md"
                          radius="md"
                          variant="light"
                          color="green"
                          style={{ backgroundColor: 'rgba(166, 227, 161, 0.1)' }}
                        >
                          <IconCode size={18} />
                        </ThemeIcon>
                        <Badge
                          variant="light"
                          color="green"
                          size="sm"
                          style={{ fontSize: '0.7rem' }}
                        >
                          Major Project
                        </Badge>
                      </Group>
                      <Title order={4} c="text" size="xl" mb="xs">
                        TuyenSinhOnline
                      </Title>
                      <Text size="md" c="subtext0" fw="600" mb="xs">
                        Full Stack Developer
                      </Text>
                      <Text size="sm" c="subtext1" style={{ opacity: 0.8 }}>
                        May 2025 – Jul 2025 • 3 months
                      </Text>
                    </Box>
                  </Group>

                  <Text size="md" c="subtext1" style={{ lineHeight: 1.6 }}>
                    Complete student admission management system built with Turborepo monorepo
                    architecture.
                  </Text>

                  <Box>
                    <Text size="sm" c="text" fw="bold" mb="md">
                      Key Features & Impact
                    </Text>
                    <Stack gap="sm">
                      <Group gap="xs" align="flex-start">
                        <IconBrain
                          size={16}
                          style={{ color: 'var(--catppuccin-mauve)', marginTop: 2 }}
                        />
                        <Box style={{ flex: 1 }}>
                          <Text size="sm" c="subtext1" style={{ lineHeight: 1.5 }}>
                            AI-powered OCR for automated student data extraction
                          </Text>
                          <Progress value={90} size="sm" mt="xs" color="green" />
                          <Text size="xs" c="subtext0" mt="xs">
                            90% manual work reduction
                          </Text>
                        </Box>
                      </Group>
                      <Group gap="xs" align="flex-start">
                        <IconLock
                          size={16}
                          style={{ color: 'var(--catppuccin-red)', marginTop: 2 }}
                        />
                        <Text size="sm" c="subtext1" style={{ lineHeight: 1.5, flex: 1 }}>
                          Secure authentication, data validation, and processing for 2,000+
                          applications
                        </Text>
                      </Group>
                      <Group gap="xs" align="flex-start">
                        <IconTrendingUp
                          size={16}
                          style={{ color: 'var(--catppuccin-blue)', marginTop: 2 }}
                        />
                        <Text size="sm" c="subtext1" style={{ lineHeight: 1.5, flex: 1 }}>
                          Real-time admin dashboard with Grafana and Loki monitoring
                        </Text>
                      </Group>
                    </Stack>
                  </Box>

                  <Group gap="xs" mt="md">
                    <Badge variant="dot" color="mauve" size="sm">
                      AI/OCR
                    </Badge>
                    <Badge variant="dot" color="blue" size="sm">
                      Turborepo
                    </Badge>
                    <Badge variant="dot" color="green" size="sm">
                      Monitoring
                    </Badge>
                  </Group>
                </Stack>
              </Paper>
            </GridCol>

            {/* Hom Nay An Gi */}
            <GridCol span={{ base: 12, md: 6 }}>
              <Paper
                p="xl"
                radius="xl"
                style={{
                  background:
                    'linear-gradient(135deg, var(--catppuccin-surface0) 0%, var(--catppuccin-surface1) 100%)',
                  border: '1px solid var(--catppuccin-surface2)',
                  height: '100%',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                    borderColor: 'var(--catppuccin-peach)',
                  },
                }}
              >
                <Box
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      'linear-gradient(135deg, transparent 0%, rgba(250, 179, 135, 0.05) 100%)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none',
                  }}
                  className="hover-glow"
                />

                <Stack gap="lg" style={{ position: 'relative', zIndex: 1 }}>
                  <Group justify="space-between" align="flex-start">
                    <Box>
                      <Group gap="xs" mb="xs">
                        <ThemeIcon
                          size="md"
                          radius="md"
                          variant="light"
                          color="orange"
                          style={{ backgroundColor: 'rgba(250, 179, 135, 0.1)' }}
                        >
                          <IconRobot size={18} />
                        </ThemeIcon>
                        <Badge
                          variant="light"
                          color="orange"
                          size="sm"
                          style={{ fontSize: '0.7rem' }}
                        >
                          Personal Project
                        </Badge>
                      </Group>
                      <Title order={4} c="text" size="xl" mb="xs">
                        Hom Nay An Gi
                      </Title>
                      <Text size="md" c="subtext0" fw="600" mb="xs">
                        Full IT Department
                      </Text>
                      <Text size="sm" c="subtext1" style={{ opacity: 0.8 }}>
                        Feb 2025 • Personal AI Project
                      </Text>
                    </Box>
                  </Group>

                  <Text size="md" c="subtext1" style={{ lineHeight: 1.6 }}>
                    AI-powered meal recommendation application with advanced search capabilities.
                  </Text>

                  <Box>
                    <Text size="sm" c="text" fw="bold" mb="md">
                      Technical Highlights
                    </Text>
                    <Stack gap="sm">
                      <Group gap="xs" align="flex-start">
                        <IconBrain
                          size={16}
                          style={{ color: 'var(--catppuccin-mauve)', marginTop: 2 }}
                        />
                        <Box style={{ flex: 1 }}>
                          <Text size="sm" c="subtext1" style={{ lineHeight: 1.5 }}>
                            Vector + keyword search improving recommendation accuracy
                          </Text>
                          <Progress value={40} size="sm" mt="xs" color="orange" />
                          <Text size="xs" c="subtext0" mt="xs">
                            40% accuracy improvement
                          </Text>
                        </Box>
                      </Group>
                      <Group gap="xs" align="flex-start">
                        <IconCode
                          size={16}
                          style={{ color: 'var(--catppuccin-blue)', marginTop: 2 }}
                        />
                        <Text size="sm" c="subtext1" style={{ lineHeight: 1.5, flex: 1 }}>
                          Intuitive UI with real-time recipe retrieval and filtering
                        </Text>
                      </Group>
                      <Group gap="xs" align="flex-start">
                        <IconTrendingUp
                          size={16}
                          style={{ color: 'var(--catppuccin-green)', marginTop: 2 }}
                        />
                        <Text size="sm" c="subtext1" style={{ lineHeight: 1.5, flex: 1 }}>
                          Optimized backend APIs for smooth data delivery
                        </Text>
                      </Group>
                    </Stack>
                  </Box>

                  <Group justify="space-between" align="center" mt="md">
                    <Group gap="xs">
                      <Badge variant="dot" color="mauve" size="sm">
                        AI/ML
                      </Badge>
                      <Badge variant="dot" color="blue" size="sm">
                        Vector Search
                      </Badge>
                    </Group>
                    <Anchor
                      href="https://github.com/duyvu871/hom-nay-an-gi-next"
                      target="_blank"
                      style={{
                        color: 'var(--catppuccin-blue)',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          color: 'var(--catppuccin-lavender)',
                          transform: 'translateX(2px)',
                        },
                      }}
                    >
                      View Project <IconExternalLink size={14} />
                    </Anchor>
                  </Group>
                </Stack>
              </Paper>
            </GridCol>

            {/* Web Security Tool */}
            <GridCol span={{ base: 12, md: 6 }}>
              <Paper
                p="xl"
                radius="xl"
                style={{
                  background:
                    'linear-gradient(135deg, var(--catppuccin-surface0) 0%, var(--catppuccin-surface1) 100%)',
                  border: '1px solid var(--catppuccin-surface2)',
                  height: '100%',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                    borderColor: 'var(--catppuccin-red)',
                  },
                }}
              >
                <Box
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      'linear-gradient(135deg, transparent 0%, rgba(243, 139, 168, 0.05) 100%)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none',
                  }}
                  className="hover-glow"
                />

                <Stack gap="lg" style={{ position: 'relative', zIndex: 1 }}>
                  <Group justify="space-between" align="flex-start">
                    <Box>
                      <Group gap="xs" mb="xs">
                        <ThemeIcon
                          size="md"
                          radius="md"
                          variant="light"
                          color="red"
                          style={{ backgroundColor: 'rgba(243, 139, 168, 0.1)' }}
                        >
                          <IconShield size={18} />
                        </ThemeIcon>
                        <Badge variant="light" color="red" size="sm" style={{ fontSize: '0.7rem' }}>
                          Security Project
                        </Badge>
                      </Group>
                      <Title order={4} c="text" size="xl" mb="xs">
                        Web Security Scanner
                      </Title>
                      <Text size="md" c="subtext0" fw="600" mb="xs">
                        Principal Engineer
                      </Text>
                      <Text size="sm" c="subtext1" style={{ opacity: 0.8 }}>
                        Dec 2024 – Jan 2025 • Personal Project
                      </Text>
                    </Box>
                  </Group>

                  <Text size="md" c="subtext1" style={{ lineHeight: 1.6 }}>
                    Automated web vulnerability assessment and scanning tool with comprehensive
                    security analysis.
                  </Text>

                  <Box>
                    <Text size="sm" c="text" fw="bold" mb="md">
                      Security Features
                    </Text>
                    <Stack gap="sm">
                      <Group gap="xs" align="flex-start">
                        <IconScan
                          size={16}
                          style={{ color: 'var(--catppuccin-red)', marginTop: 2 }}
                        />
                        <Text size="sm" c="subtext1" style={{ lineHeight: 1.5, flex: 1 }}>
                          Detection of SQLi, directory disclosure, and security header issues
                        </Text>
                      </Group>
                      <Group gap="xs" align="flex-start">
                        <IconDatabase
                          size={16}
                          style={{ color: 'var(--catppuccin-blue)', marginTop: 2 }}
                        />
                        <Text size="sm" c="subtext1" style={{ lineHeight: 1.5, flex: 1 }}>
                          Nmap integration for port and network analysis
                        </Text>
                      </Group>
                      <Group gap="xs" align="flex-start">
                        <IconLock
                          size={16}
                          style={{ color: 'var(--catppuccin-green)', marginTop: 2 }}
                        />
                        <Text size="sm" c="subtext1" style={{ lineHeight: 1.5, flex: 1 }}>
                          Secure Electron-based UI with license protection
                        </Text>
                      </Group>
                    </Stack>
                  </Box>

                  <Group justify="space-between" align="center" mt="md">
                    <Group gap="xs">
                      <Badge variant="dot" color="red" size="sm">
                        Security
                      </Badge>
                      <Badge variant="dot" color="blue" size="sm">
                        Nmap
                      </Badge>
                      <Badge variant="dot" color="green" size="sm">
                        Electron
                      </Badge>
                    </Group>
                    <Anchor
                      href="https://github.com/duyvu871/scan-website-vulnerabilities"
                      target="_blank"
                      style={{
                        color: 'var(--catppuccin-blue)',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          color: 'var(--catppuccin-lavender)',
                          transform: 'translateX(2px)',
                        },
                      }}
                    >
                      View Project <IconExternalLink size={14} />
                    </Anchor>
                  </Group>
                </Stack>
              </Paper>
            </GridCol>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
