'use client';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useServerInsertedHTML } from 'next/navigation';
import { theme } from 'app/lib/theme/mantine-theme';

export default function Providers({ children }: { children: React.ReactNode }) {
  // Prevents hydration mismatch
  useServerInsertedHTML(() => null);

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Notifications position="top-right" zIndex={1000} />
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
