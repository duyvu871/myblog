'use client';

import { Box, Container, Stack, Title, Text, Group, Center, Anchor } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';

export function FooterSection() {
  return (
    <Box pb="80px" style={{ backgroundColor: 'var(--catppuccin-crust)', padding: '3rem 0' }}>
      <Container size="md" id="footer">
        <Stack gap="xl" align="center">
          <Group gap="sm" align="center">
            <Text size="2xl" style={{ color: 'initial' }}>
              🐈
            </Text>
            <Title order={3} c="text" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              From Du With Code
            </Title>
          </Group>

          <Text size="sm" c="subtext1" style={{ textAlign: 'center', maxWidth: '400px' }}>
            Built with <span style={{ color: 'initial' }}>❤️</span> using Next.js, TypeScript, MDX,
            and the beautiful Catppuccin theme.
          </Text>

          <Text
            size="xs"
            c="subtext0"
            style={{ textAlign: 'center', fontFamily: 'JetBrains Mono, monospace' }}
          >
            © 2025 Bui An Du • Computer Science Student & CTO • Breaking things one line at a time
          </Text>
          <Center>
            <Anchor
              href="https://ssit.company"
              target="_blank"
              style={{
                color: 'var(--catppuccin-blue)',
                textDecoration: 'none',
                fontSize: '12px',
                fontWeight: 500,
              }}
            >
              <Group gap="xs">
                <IconExternalLink size={12} />
                <Text size="xs">SS IT Joint Stock Company</Text>
                <Text size="xs" c="subtext1">
                  | Leading Innovation in Technology
                </Text>
              </Group>
            </Anchor>
          </Center>
        </Stack>
      </Container>
    </Box>
  );
}
