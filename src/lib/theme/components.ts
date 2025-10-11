// theme/components.ts
import { Button, Card, Paper, TextInput, Code, Tooltip } from '@mantine/core';

export const componentsOverride = {
  Button: Button.extend({
    defaultProps: { variant: 'filled', size: 'md' },
    styles: (theme) => ({
      root: {
        fontWeight: 700,
        borderColor: 'var(--app-border)',
      },
    }),
  }),
  Card: Card.extend({
    styles: () => ({
      root: {
        background: 'var(--app-card)',
        border: '1px solid var(--app-border)',
      },
    }),
  }),
  Paper: Paper.extend({
    styles: () => ({
      root: {
        background: 'var(--app-card)',
        border: '1px solid var(--app-border)',
      },
    }),
  }),
  TextInput: TextInput.extend({
    styles: () => ({
      input: {
        background: 'var(--app-card)',
        borderColor: 'var(--app-border)',
        color: 'var(--app-text)',
      },
      label: { color: 'var(--app-subtext)' },
    }),
  }),
  Code: Code.extend({
    styles: () => ({
      root: { background: 'var(--app-card)', borderColor: 'var(--app-border)' },
    }),
  }),
  Tooltip: Tooltip.extend({
    styles: () => ({
      tooltip: { background: 'var(--app-card)', border: '1px solid var(--app-border)' },
    }),
  }),
};
