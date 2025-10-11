'use client';

import {
  AppShell as MantineAppShell,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
  AppShellAside,
} from '@mantine/core';
import { ReactNode } from 'react';
import { useHeadroom } from '@mantine/hooks';

interface AppShellProps {
  children: ReactNode;
  header?: ReactNode;
  navbar?: ReactNode;
  aside?: ReactNode;
  footer?: ReactNode;
  navbarWidth?: number | string;
  asideWidth?: number | string;
  headerHeight?: number | string;
  footerHeight?: number | string;
  padding?: number | string;
  styles?: any;
  className?: string;
}

export function AppShell({
  children,
  header,
  navbar,
  aside,
  footer,
  navbarWidth = 300,
  asideWidth = 300,
  headerHeight = 60,
  footerHeight = 60,
  padding = 'md',
  styles,
  className,
}: AppShellProps) {
  const pinned = useHeadroom({ fixedAt: 120 });

  return (
    <MantineAppShell
      header={{ height: headerHeight, collapsed: !pinned }}
      navbar={{ width: navbarWidth, breakpoint: 'sm' }}
      aside={{ width: asideWidth, breakpoint: 'md' }}
      footer={{ height: footerHeight }}
      padding={padding}
      className={className}
      styles={(theme) => ({
        root: {
          backgroundColor: 'var(--catppuccin-base)',
          color: 'var(--catppuccin-text)',
          ...styles?.root,
        },
        main: {
          backgroundColor: 'var(--catppuccin-base)',
          color: 'var(--catppuccin-text)',
          ...styles?.main,
        },
        header: {
          // backgroundColor: '',
          backdropFilter: 'blur(10px)',
          borderBottom: `0px`,
          // boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          ...styles?.header,
        },
        navbar: {
          backgroundColor: 'var(--catppuccin-surface0)',
          borderRight: `1px solid var(--catppuccin-crust)`,
          boxShadow: '1px 0 3px 0 rgb(0 0 0 / 0.1), 1px 0 2px -1px rgb(0 0 0 / 0.1)',
          ...styles?.navbar,
        },
        aside: {
          backgroundColor: 'var(--catppuccin-mantle)',
          borderLeft: `1px solid var(--catppuccin-crust)`,
          boxShadow: '-1px 0 3px 0 rgb(0 0 0 / 0.1), -1px 0 2px -1px rgb(0 0 0 / 0.1)',
          ...styles?.aside,
        },
        footer: {
          backgroundColor: 'var(--catppuccin-mantle)',
          borderTop: `1px solid var(--catppuccin-crust)`,
          boxShadow: '0 -1px 3px 0 rgb(0 0 0 / 0.1), 0 -1px 2px -1px rgb(0 0 0 / 0.1)',
          ...styles?.footer,
        },
      })}
    >
      {header && (
        <AppShellHeader className="!bg-[var(--catppuccin-base)]/50">{header}</AppShellHeader>
      )}

      {navbar && <AppShellNavbar>{navbar}</AppShellNavbar>}

      <AppShellMain>
        {children}

        {footer}
      </AppShellMain>

      {aside && <AppShellAside>{aside}</AppShellAside>}
    </MantineAppShell>
  );
}

// Custom hooks for responsive behavior
export function useAppShellBreakpoints() {
  return {
    navbarBreakpoint: 'sm',
    asideBreakpoint: 'md',
  };
}

// Pre-configured variants for common layouts
export function BlogAppShell({
  children,
  header,
  navbar,
  aside,
  footer,
  styles,
  className,
}: Omit<AppShellProps, 'navbarWidth' | 'asideWidth' | 'headerHeight' | 'footerHeight'>) {
  return (
    <AppShell
      header={header}
      navbar={navbar}
      aside={aside}
      footer={footer}
      navbarWidth={280}
      asideWidth={320}
      headerHeight={64}
      footerHeight={64}
      padding="lg"
      styles={styles}
      className={className}
    >
      {children}
    </AppShell>
  );
}

export function MinimalAppShell({
  children,
  header,
  footer,
  styles,
  className,
}: Pick<AppShellProps, 'children' | 'header' | 'footer' | 'styles' | 'className'>) {
  return (
    <AppShell
      header={header}
      footer={footer}
      headerHeight={56}
      footerHeight={56}
      padding="md"
      styles={styles}
      className={className}
    >
      {children}
    </AppShell>
  );
}
