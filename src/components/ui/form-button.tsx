import { Button, type ButtonProps } from '@mantine/core';
import { forwardRef, type ComponentProps } from 'react';

const buttonVariants = {
  primary: {
    root: {
      backgroundColor: 'var(--catppuccin-blue)',
      color: 'var(--catppuccin-base)',
      '&:hover': {
        backgroundColor: 'var(--catppuccin-blue)',
        filter: 'brightness(0.9)',
      },
      '&:disabled': {
        backgroundColor: 'var(--catppuccin-overlay0)',
        color: 'var(--catppuccin-subtext0)',
        opacity: 0.5,
      },
      borderRadius: '8px',
      padding: '12px',
      fontWeight: 500,
    },
  },
  outline: {
    root: {
      border: `1px solid var(--catppuccin-surface1)`,
      color: 'var(--catppuccin-text)',
      backgroundColor: 'var(--catppuccin-surface0)',
      '&:hover': {
        backgroundColor: 'var(--catppuccin-surface1)',
      },
      borderRadius: '8px',
      padding: '12px',
      fontWeight: 500,
    },
  },
};

interface FormButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'primary' | 'outline';
}

export const FormButton = forwardRef<HTMLButtonElement, FormButtonProps & ComponentProps<'button'>>(
  ({ variant = 'primary', size = 'md', styles, children, ...props }, ref) => {
    const variantStyles = buttonVariants[variant];

    return (
      <Button ref={ref} size={size} styles={{ ...variantStyles, ...styles }} {...props}>
        {children}
      </Button>
    );
  }
);

FormButton.displayName = 'FormButton';
