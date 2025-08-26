'use client';

import { MantineProvider as Provider } from '@mantine/core';

export default function MantineProvider({ children }: { children: React.ReactNode }) {
  return <Provider defaultColorScheme="light">{children}</Provider>;
}
