'use client';

import { ReactNode, useState, useEffect } from 'react';
import { useLocalStorage, useColorScheme, useHeadroom } from '@mantine/hooks';
import { AppShell, BlogAppShell, MinimalAppShell } from 'app/components/ui/mantine/appshell';
import Header from 'app/components/ui/header';
import Footer from 'app/components/ui/footer';
import { ScrollToTop, FloatingScrollToTop } from 'app/components/ui/scroll-to-top';
import { useTheme } from 'next-themes';
import { cn } from 'app/lib/cn';

interface MainLayoutProps {
  children: ReactNode;
  withHeader?: boolean;
  withFooter?: boolean;
  headerHeight?: number;
}

export default function MainLayout({
  children,
  withHeader = true,
  withFooter = true,
  headerHeight = 60,
}: MainLayoutProps) {
  // Get system color scheme preference
  const preferredColorScheme = useColorScheme();
  const { theme, setTheme } = useTheme();
  // Use localStorage to persist theme preference
  const [storedColorScheme, setStoredColorScheme] = useLocalStorage<'light' | 'dark'>({
    key: 'mantine-color-scheme',
    defaultValue: preferredColorScheme === 'dark' ? 'dark' : 'light',
    getInitialValueInEffect: true,
  });

  // // Toggle color scheme function
  const toggleStoredColorScheme = () => {
    setStoredColorScheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  // Update document class for theme-specific styles
  useEffect(() => {
    document.documentElement.setAttribute('data-mantine-color-scheme', storedColorScheme);

    // Optional: Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', storedColorScheme === 'dark' ? '#1a1b1e' : '#ffffff');
    }

    // Update theme in next-themes
    setTheme(storedColorScheme);
  }, [storedColorScheme]);

  return (
    <AppShell
      header={withHeader ? <Header /> : undefined}
      headerHeight={headerHeight}
      padding="0"
      styles={{
        root: {
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        },
        main: {
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        },
      }}
      className={cn(theme)}
    >
      {/* Main Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          paddingTop: !withHeader ? headerHeight + 'px' : 0,
        }}
      >
        {children}
      </div>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      {/* <ScrollToTop /> */}
    </AppShell>
  );
}

// Layout variants for different page types
export function BlogLayout({
  children,
  navbar,
  aside,
}: {
  children: ReactNode;
  navbar?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <BlogAppShell
      header={<Header />}
      navbar={navbar}
      aside={aside}
      footer={<Footer />}
      styles={{
        root: {
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        },
        main: {
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 0,
          paddingTop: 60 + 'px',
        },
      }}
    >
      {children}
    </BlogAppShell>
  );
}

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <MinimalAppShell>
      {children}
      {/* <ScrollToTop threshold={100} /> */}
    </MinimalAppShell>
  );
}

export function DashboardLayout({ children, navbar }: { children: ReactNode; navbar?: ReactNode }) {
  const preferredColorScheme = useColorScheme();
  const { theme, setTheme } = useTheme();
  const [storedColorScheme, setStoredColorScheme] = useLocalStorage<'light' | 'dark'>({
    key: 'mantine-color-scheme',
    defaultValue: preferredColorScheme === 'dark' ? 'dark' : 'light',
    getInitialValueInEffect: true,
  });

  const toggleStoredColorScheme = () => {
    setStoredColorScheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-mantine-color-scheme', storedColorScheme);
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', storedColorScheme === 'dark' ? '#1a1b1e' : '#ffffff');
    }
    setTheme(storedColorScheme);
  }, [storedColorScheme]);

  return (
    <AppShell header={<Header />} navbar={navbar} className={cn(theme)}>
      {children}
      {/* <ScrollToTop /> */}
    </AppShell>
  );
}

export function MinimalLayout({ children }: { children: ReactNode }) {
  const preferredColorScheme = useColorScheme();
  const { theme, setTheme } = useTheme();
  const [storedColorScheme, setStoredColorScheme] = useLocalStorage<'light' | 'dark'>({
    key: 'mantine-color-scheme',
    defaultValue: preferredColorScheme === 'dark' ? 'dark' : 'light',
    getInitialValueInEffect: true,
  });

  const toggleStoredColorScheme = () => {
    setStoredColorScheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-mantine-color-scheme', storedColorScheme);
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', storedColorScheme === 'dark' ? '#1a1b1e' : '#ffffff');
    }
    setTheme(storedColorScheme);
  }, [storedColorScheme]);

  return (
    <MinimalAppShell header={<Header />} className={cn(theme)}>
      {children}
      {/* <ScrollToTop threshold={100} /> */}
    </MinimalAppShell>
  );
}

// Also export MainLayout as named export for convenience
export { MainLayout };
