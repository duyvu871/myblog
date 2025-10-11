// Re-export all Mantine components with Catppuccin theming applied through theme provider
export * from '@mantine/core';
export * from '@mantine/hooks';
export * from '@mantine/dates';

// Custom components
export { FormInput, FormPasswordInput } from './form-input';
export { FormButton } from './form-button';
export { OAuthButton } from './oauth-button';
export * from './scroll-to-top';
export { Toc } from './table-of-contents';

// Theme utilities
export { theme } from 'app/lib/theme/mantine-theme';
