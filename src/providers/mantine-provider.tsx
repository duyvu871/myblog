'use client';

import { MantineProvider } from '@mantine/core';
import { useServerInsertedHTML } from 'next/navigation';
import { theme } from 'app/lib/theme/mantine-theme';

export default function Providers({ children }: { children: React.ReactNode }) {
  // Prevents hydration mismatch
  useServerInsertedHTML(() => null);

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <div
        style={{
          backgroundColor: 'var(--catppuccin-base)',
          color: 'var(--catppuccin-text)',
          minHeight: '100dvh',
        }}
      >
        {children}
      </div>
    </MantineProvider>
  );
}
