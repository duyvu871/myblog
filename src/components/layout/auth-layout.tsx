import {
  Anchor,
  Box,
  Container,
  Flex,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

interface BrandingSectionProps {
  title?: string;
  subtitle?: string;
  companyName?: string;
}

const LogoIcon = () => (
  <Box
    w={48}
    h={48}
    bg="blue.6"
    style={{
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <svg width="32" height="32" fill="white" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
    </svg>
  </Box>
);

const BrandingSection = ({ 
  title = "Sign Up | Log in", 
  subtitle = "Form", 
  companyName = "Student Management" 
}: BrandingSectionProps) => (
  <Box
    flex={1}
    visibleFrom="lg"
    style={{
      background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Stack align="center" c="white" px="xl">
      <Title order={1} size={60} fw={700} ta="center" mb="sm">
        {title}
      </Title>
      <Title order={2} size={80} fw={700} ta="center" mb="lg">
        {subtitle}
      </Title>
      <Text size="xl" opacity={0.9} mb="xl" ta="center">
        by {companyName}
      </Text>
      
      {/* Social Links */}
      <Group gap="xl" mt="xl">
        <Anchor href="#" c="blue.2" style={{ textDecoration: 'none' }}>
          <Group gap="xs">
            <Box
              w={32}
              h={32}
              style={{
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text size="sm" fw={700}>Be</Text>
            </Box>
            <Text>Behance</Text>
          </Group>
        </Anchor>
        <Anchor href="#" c="blue.2" style={{ textDecoration: 'none' }}>
          <Group gap="xs">
            <Box
              w={32}
              h={32}
              style={{
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.222.082.343-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
              </svg>
            </Box>
            <Text>Instagram</Text>
          </Group>
        </Anchor>
      </Group>
    </Stack>
  </Box>
);

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <Flex mih="100vh" w="100%">
      {/* Left Side - Form */}
      <Box flex={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container size="xs" w="100%" maw={400}>
          <Stack gap="xl">
            {/* Logo */}
            <Flex justify="center">
              <LogoIcon />
            </Flex>

            {/* Header */}
            <Stack gap="xs" align="center">
              <Title order={1} size="h2" ta="center" fw={700}>
                {title}
              </Title>
              <Text c="dimmed" ta="center" size="sm">
                {subtitle}
              </Text>
            </Stack>

            {/* Form Content */}
            {children}
          </Stack>
        </Container>
      </Box>

      {/* Right Side - Branding */}
      <BrandingSection />
    </Flex>
  );
};

// Export individual components for flexibility
export { LogoIcon, BrandingSection };
