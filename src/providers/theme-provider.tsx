'use client';

import { useLocalStorage } from '@mantine/hooks';
import { ThemeProvider as NextThemeProvider, useTheme } from 'next-themes';
import { ReactNode } from 'react';

export type CatppuccinVariant = 'mocha' | 'latte' | 'frappe' | 'macchiato';

interface ThemeProviderProps {
  children: ReactNode;
  defaultVariant?: CatppuccinVariant;
}

export default function ThemeProvider({
  children,
  defaultVariant = 'mocha',
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemeProvider
      attribute="data-theme"
      defaultTheme={defaultVariant}
      themes={['mocha', 'latte', 'frappe', 'macchiato']}
      storageKey="catppuccin-variant"
      {...props}
    >
      {children}
    </NextThemeProvider>
  );
}

export function useCatppuccinTheme() {
  const { theme, setTheme } = useTheme();

  const [storedTheme, setStoredTheme] = useLocalStorage<'mocha' | 'latte' | 'frappe' | 'macchiato'>(
    {
      key: 'catppuccin-variant',
      defaultValue: 'mocha',
      getInitialValueInEffect: true,
    }
  );

  const variant = storedTheme as CatppuccinVariant;

  const setVariant = (newVariant: CatppuccinVariant) => {
    setStoredTheme(newVariant);
    setTheme(newVariant);
  };

  const toggleVariant = () => {
    const variants: CatppuccinVariant[] = ['mocha', 'latte', 'frappe', 'macchiato'];
    const currentIndex = variants.indexOf(variant);
    const nextIndex = (currentIndex + 1) % variants.length;
    setStoredTheme(variants[nextIndex]);
    setTheme(variants[nextIndex]);
  };

  return {
    variant,
    setVariant,
    toggleVariant,
  };
}
