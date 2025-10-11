'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';
import {
  rem,
  Group,
  UnstyledButton,
  Burger,
  Stack,
  AppShell,
  Button,
  Text,
  Menu,
  Avatar,
  Drawer,
  Divider,
  ActionIcon,
  Badge,
  Container,
  Anchor,
} from '@mantine/core';
import {
  IconUser,
  IconSettings,
  IconLogout,
  IconLogin,
  IconUserPlus,
  IconDashboard,
  IconBookmark,
  IconHome,
  IconBook,
  IconPalette,
  IconCoffee,
  IconIceCream,
  IconCup,
} from '@tabler/icons-react';
import { useAuth } from 'app/hooks/use-auth';
import { useCatppuccinTheme } from 'app/providers/theme-provider';
import { cn } from 'app/lib/cn';
import classes from './header.module.css';

const navigationLinks = [
  { label: 'Home', href: '/', icon: IconHome },
  { label: 'Blog', href: '/blog', icon: IconBook },
  { label: 'About', href: '/about', icon: IconUser },
];

const themeOptions = [
  { value: 'mocha', label: 'Mocha', icon: IconCoffee, description: 'Warm dark theme' },
  { value: 'latte', label: 'Latte', icon: IconCup, description: 'Clean light theme' },
  { value: 'frappe', label: 'Frappe', icon: IconIceCream, description: 'Cool dark variant' },
  { value: 'macchiato', label: 'Macchiato', icon: IconPalette, description: 'Balanced dark theme' },
] as const;

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { variant, setVariant } = useCatppuccinTheme();
  const {
    user,
    isAuthenticated,
    isLoading,
    signOut,
    redirectToLogin,
    redirectToDashboard,
    isAdmin,
    getUserStatus,
  } = useAuth();

  const handleSignOut = async () => {
    closeDrawer();
    await signOut('/');
  };

  const handleSignIn = () => {
    closeDrawer();
    redirectToLogin();
  };

  const handleDashboard = () => {
    closeDrawer();
    redirectToDashboard();
  };

  const handleRegister = () => {
    closeDrawer();
    router.push('/auth/register');
  };

  // Theme Selector Component
  const ThemeSelector = ({ mobile = false }: { mobile?: boolean }) => {
    const currentTheme = themeOptions.find((theme) => theme.value === variant);
    const CurrentIcon = currentTheme?.icon || IconPalette;

    return (
      <Menu shadow="md" width={280} position={mobile ? 'bottom' : 'bottom-end'}>
        <Menu.Target>
          {mobile ? (
            <Button
              variant="subtle"
              leftSection={<CurrentIcon size={16} />}
              fullWidth
              style={{ justifyContent: 'flex-start' }}
            >
              Theme: {currentTheme?.label}
            </Button>
          ) : (
            <ActionIcon
              variant="subtle"
              title={`Current theme: ${currentTheme?.label}. Click to change.`}
            >
              <CurrentIcon size={18} />
            </ActionIcon>
          )}
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Choose Catppuccin Theme</Menu.Label>
          {themeOptions.map((theme) => {
            const ThemeIcon = theme.icon;
            const isActive = theme.value === variant;

            return (
              <Menu.Item
                key={theme.value}
                leftSection={<ThemeIcon size={16} />}
                onClick={() => {
                  setVariant(theme.value);
                  if (mobile) closeDrawer();
                }}
                className={cn(classes.themeMenuItem, isActive && classes.themeMenuItemActive)}
              >
                <div>
                  <Text size="sm" fw={isActive ? 600 : 500}>
                    {theme.label}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {theme.description}
                  </Text>
                </div>
              </Menu.Item>
            );
          })}
        </Menu.Dropdown>
      </Menu>
    );
  };

  // Check if current path matches the link
  const isActivePage = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(href);
  };

  // Desktop Navigation Links
  const DesktopNavLinks = () => (
    <Group gap="md" visibleFrom="md">
      {navigationLinks.map((link) => {
        const isActive = isActivePage(link.href);
        return (
          <Anchor
            key={link.href}
            component={Link}
            href={link.href}
            c={isActive ? 'lavender' : 'dimmed'}
            underline="never"
            fw={isActive ? 600 : 500}
            size="sm"
            className={cn(
              classes.navLink,
              isActive && classes.navLinkActive,
              isActive ? 'text-lavender-6' : 'text-dimmed'
            )}
          >
            {link.label}
          </Anchor>
        );
      })}
    </Group>
  );

  // Mobile Navigation Links
  const MobileNavLinks = () => (
    <Stack gap="md">
      {navigationLinks.map((link) => {
        const Icon = link.icon;
        const isActive = isActivePage(link.href);
        return (
          <UnstyledButton
            key={link.href}
            component={Link}
            href={link.href}
            onClick={closeDrawer}
            className={classes.mobileNavButton}
          >
            <Icon
              size={20}
              style={{
                color: isActive ? 'var(--mantine-color-lavender-6)' : undefined,
              }}
            />
            <Text fw={isActive ? 600 : 500} c={isActive ? 'lavender' : undefined}>
              {link.label}
            </Text>
          </UnstyledButton>
        );
      })}
    </Stack>
  );

  // Authentication Menu for Desktop
  const AuthMenuDesktop = () => {
    if (isLoading) {
      return <Button loading variant="subtle" size="sm" />;
    }

    if (!isAuthenticated) {
      return (
        <Group gap="xs" visibleFrom="md">
          <Button
            variant="subtle"
            color="lavender"
            size="sm"
            onClick={handleSignIn}
            leftSection={<IconLogin size={16} />}
          >
            Sign In
          </Button>
          <Button
            color="lavender"
            size="sm"
            onClick={handleRegister}
            leftSection={<IconUserPlus size={16} />}
          >
            Sign Up
          </Button>
        </Group>
      );
    }

    return (
      <Group gap="md" visibleFrom="md">
        {isAdmin() && (
          <Button
            variant="light"
            size="sm"
            onClick={handleDashboard}
            leftSection={<IconDashboard size={16} />}
          >
            Dashboard
          </Button>
        )}

        <Menu shadow="md" width={200} position="bottom-end">
          <Menu.Target>
            <UnstyledButton className={classes.userMenuButton}>
              <Avatar size="sm" radius="xl" color="lavender">
                {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase()}
              </Avatar>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <Text size="sm" fw={500} lineClamp={1}>
                  {user?.name || 'User'}
                </Text>
                <Group gap={4}>
                  <Text size="xs" c="dimmed" lineClamp={1}>
                    {user?.email}
                  </Text>
                  {getUserStatus() && (
                    <Badge
                      size="xs"
                      variant="light"
                      color={getUserStatus() === 'ACTIVE' ? 'green' : 'orange'}
                    >
                      {getUserStatus()}
                    </Badge>
                  )}
                </Group>
              </div>
            </UnstyledButton>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Account</Menu.Label>
            <Menu.Item leftSection={<IconUser size={16} />} component={Link} href="/profile">
              Profile
            </Menu.Item>
            <Menu.Item leftSection={<IconSettings size={16} />} component={Link} href="/settings">
              Settings
            </Menu.Item>
            <Menu.Item leftSection={<IconBookmark size={16} />} component={Link} href="/bookmarks">
              Bookmarks
            </Menu.Item>

            <Menu.Divider />

            <Menu.Item leftSection={<IconLogout size={16} />} color="red" onClick={handleSignOut}>
              Sign Out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    );
  };

  // Authentication Section for Mobile
  const AuthMenuMobile = () => {
    if (isLoading) {
      return <Button loading variant="subtle" fullWidth />;
    }

    if (!isAuthenticated) {
      return (
        <Stack gap="md">
          <Button
            variant="subtle"
            leftSection={<IconLogin size={16} />}
            onClick={handleSignIn}
            fullWidth
          >
            Sign In
          </Button>
          <Button leftSection={<IconUserPlus size={16} />} onClick={handleRegister} fullWidth>
            Sign Up
          </Button>
        </Stack>
      );
    }

    return (
      <Stack gap="md">
        <Group>
          <Avatar size="md" radius="xl" color="lavender">
            {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase()}
          </Avatar>
          <div style={{ flex: 1 }}>
            <Text fw={500}>{user?.name || 'User'}</Text>
            <Group gap={4}>
              <Text size="sm" c="dimmed" lineClamp={1}>
                {user?.email}
              </Text>
              {getUserStatus() && (
                <Badge
                  size="xs"
                  variant="light"
                  color={getUserStatus() === 'ACTIVE' ? 'green' : 'orange'}
                >
                  {getUserStatus()}
                </Badge>
              )}
            </Group>
          </div>
        </Group>

        <Divider />

        <Stack gap="xs">
          {isAdmin() && (
            <Button
              variant="light"
              leftSection={<IconDashboard size={16} />}
              onClick={handleDashboard}
              fullWidth
            >
              Dashboard
            </Button>
          )}

          <UnstyledButton
            component={Link}
            href="/profile"
            onClick={closeDrawer}
            className={classes.mobileMenuItem}
          >
            <IconUser size={20} />
            <Text>Profile</Text>
          </UnstyledButton>

          <UnstyledButton
            component={Link}
            href="/settings"
            onClick={closeDrawer}
            className={classes.mobileMenuItem}
          >
            <IconSettings size={20} />
            <Text>Settings</Text>
          </UnstyledButton>

          <UnstyledButton
            component={Link}
            href="/bookmarks"
            onClick={closeDrawer}
            className={classes.mobileMenuItem}
          >
            <IconBookmark size={20} />
            <Text>Bookmarks</Text>
          </UnstyledButton>

          <Divider />

          <Button
            variant="subtle"
            color="red"
            leftSection={<IconLogout size={16} />}
            onClick={handleSignOut}
            fullWidth
          >
            Sign Out
          </Button>
        </Stack>
      </Stack>
    );
  };

  return (
    <>
      <Container size="xl" h="100%">
        <Group h="100%" justify="space-between">
          {/* Logo */}
          <Group>
            <Text
              component={Link}
              href="/"
              size="xl"
              fw={700}
              c="lavender"
              style={{ textDecoration: 'none' }}
            >
              FromDuWithCode
            </Text>
          </Group>

          {/* Desktop Navigation */}
          <DesktopNavLinks />

          {/* Desktop Actions */}
          <Group gap="md">
            {/* Catppuccin Theme Selector */}
            <ThemeSelector />

            {/* Desktop Auth Menu */}
            <AuthMenuDesktop />

            {/* Mobile Menu Burger */}
            <Burger
              color="lavender"
              opened={drawerOpened}
              onClick={toggleDrawer}
              hiddenFrom="md"
              size="sm"
            />
          </Group>
        </Group>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        title={
          <Text size="lg" fw={700} c="lavender">
            FromDuWithCode
          </Text>
        }
        padding="md"
        size="xs"
        position="right"
      >
        <Stack gap="lg">
          {/* Mobile Navigation Links */}
          <div>
            <Text size="sm" fw={600} c="dimmed" mb="md">
              Navigation
            </Text>
            <MobileNavLinks />
          </div>

          <Divider />

          {/* Mobile Auth Section */}
          <div>
            <Text size="sm" fw={600} c="dimmed" mb="md">
              Account
            </Text>
            <AuthMenuMobile />
          </div>

          {/* Catppuccin Theme Selector for Mobile */}
          <ThemeSelector mobile={true} />
        </Stack>
      </Drawer>
    </>
  );
}
