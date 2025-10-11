import Link from 'next/link';
import {
  rem,
  Group,
  Stack,
  GridCol,
  Container,
  Text,
  Anchor,
  Divider,
  ActionIcon,
  Grid,
} from '@mantine/core';
import {
  IconBrandGithub,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconMail,
  IconMapPin,
  IconPhone,
} from '@tabler/icons-react';

const footerLinks = {
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Sitemap', href: '/sitemap.xml' },
  ],
  support: [
    { label: 'Help Center', href: '/help' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact Support', href: '/support' },
    { label: 'Report Issue', href: '/report' },
  ],
};

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/duyvu871',
    icon: IconBrandGithub,
    color: 'gray',
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/yourusername',
    icon: IconBrandTwitter,
    color: 'blue',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/yourusername',
    icon: IconBrandLinkedin,
    color: 'blue',
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/yourusername',
    icon: IconBrandFacebook,
    color: 'blue',
  },
];

const contactInfo = [
  {
    icon: IconMail,
    label: 'Email',
    value: 'dubuicp123@gmail.com',
    href: 'mailto:dubuicp123@gmail.com',
  },
  {
    icon: IconPhone,
    label: 'Phone',
    value: '0869.794.205',
    href: 'tel:+84069794205',
  },
  {
    icon: IconMapPin,
    label: 'Address',
    value: 'Ha Noi, Vietnam',
    href: '#',
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: '1px solid var(--mantine-color-gray-6)',
        //   backgroundColor: 'var(--mantine-color-gray-0)',
        marginTop: 'auto',
      }}
    >
      <Container size="xl" py="xl">
        <Grid>
          {/* Brand and Description */}
          <GridCol span={{ base: 12, md: 4 }}>
            <Stack gap="md">
              <Text size="xl" fw={700} c="blue">
                FromDuWithCode
              </Text>
              <Text size="sm" c="dimmed" style={{ maxWidth: rem(300) }}>
                A modern blog platform built with Next.js, sharing insights about web development,
                technology, and programming best practices.
              </Text>

              {/* Social Media Links */}
              <Group gap="sm">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <ActionIcon
                      key={social.label}
                      component="a"
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="subtle"
                      color={social.color}
                      size="lg"
                      title={social.label}
                    >
                      <Icon size={20} />
                    </ActionIcon>
                  );
                })}
              </Group>
            </Stack>
          </GridCol>

          {/* Navigation Links */}
          <GridCol span={{ base: 12, sm: 4, md: 2 }}>
            <Stack gap="md">
              <Text fw={600} size="sm">
                Navigation
              </Text>
              <Stack gap="xs">
                {footerLinks.navigation.map((link) => (
                  <Anchor
                    key={link.href}
                    component={Link}
                    href={link.href}
                    size="sm"
                    c="dimmed"
                    underline="never"
                    style={{
                      transition: 'color 0.2s ease',
                      '&:hover': {
                        color: 'var(--mantine-color-blue-6)',
                      },
                    }}
                  >
                    {link.label}
                  </Anchor>
                ))}
              </Stack>
            </Stack>
          </GridCol>

          {/* Support Links */}
          <GridCol span={{ base: 12, sm: 4, md: 2 }}>
            <Stack gap="md">
              <Text fw={600} size="sm">
                Support
              </Text>
              <Stack gap="xs">
                {footerLinks.support.map((link) => (
                  <Anchor
                    key={link.href}
                    component={Link}
                    href={link.href}
                    size="sm"
                    c="dimmed"
                    underline="never"
                    style={{
                      transition: 'color 0.2s ease',
                      '&:hover': {
                        color: 'var(--mantine-color-blue-6)',
                      },
                    }}
                  >
                    {link.label}
                  </Anchor>
                ))}
              </Stack>
            </Stack>
          </GridCol>

          {/* Legal Links */}
          <GridCol span={{ base: 12, sm: 4, md: 2 }}>
            <Stack gap="md">
              <Text fw={600} size="sm">
                Legal
              </Text>
              <Stack gap="xs">
                {footerLinks.legal.map((link) => (
                  <Anchor
                    key={link.href}
                    component={Link}
                    href={link.href}
                    size="sm"
                    c="dimmed"
                    underline="never"
                    style={{
                      transition: 'color 0.2s ease',
                      '&:hover': {
                        color: 'var(--mantine-color-blue-6)',
                      },
                    }}
                  >
                    {link.label}
                  </Anchor>
                ))}
              </Stack>
            </Stack>
          </GridCol>

          {/* Contact Information */}
          <GridCol span={{ base: 12, md: 2 }}>
            <Stack gap="md">
              <Text fw={600} size="sm">
                Contact
              </Text>
              <Stack gap="xs">
                {contactInfo.map((contact) => {
                  const Icon = contact.icon;
                  return (
                    <Group key={contact.label} gap="xs" align="flex-start">
                      <Icon size={16} style={{ marginTop: rem(2), flexShrink: 0 }} />
                      <div>
                        {contact.href && contact.href !== '#' ? (
                          <Anchor
                            href={contact.href}
                            size="sm"
                            c="dimmed"
                            underline="never"
                            style={{
                              transition: 'color 0.2s ease',
                              '&:hover': {
                                color: 'var(--mantine-color-blue-6)',
                              },
                            }}
                          >
                            {contact.value}
                          </Anchor>
                        ) : (
                          <Text size="sm" c="dimmed">
                            {contact.value}
                          </Text>
                        )}
                      </div>
                    </Group>
                  );
                })}
              </Stack>
            </Stack>
          </GridCol>
        </Grid>

        <Divider my="lg" />

        {/* Bottom Section */}
        <Group justify="space-between" align="center" style={{ flexWrap: 'wrap', gap: rem(16) }}>
          <Text size="sm" c="dimmed">
            © {currentYear} FromDuWithCode. All rights reserved.
          </Text>

          <Group gap="md" style={{ flexWrap: 'wrap' }}>
            <Text size="sm" c="dimmed">
              Built with ❤️ using Next.js & TailwindCSS
            </Text>
            <Text size="sm" c="dimmed">
              Version 1.0.0-beta.1
            </Text>
          </Group>
        </Group>
      </Container>
    </footer>
  );
}
