import { Button, type ButtonProps } from '@mantine/core';
import { forwardRef,  type ComponentProps } from 'react';

const buttonVariants = {
  primary: {
    root: {
      backgroundColor: '#3b82f6',
      '&:hover': {
        backgroundColor: '#2563eb',
      },
      '&:disabled': {
        backgroundColor: '#9ca3af',
        opacity: 0.5,
      },
      borderRadius: '8px',
      padding: '12px',
      fontWeight: 500,
    },
  },
  outline: {
    root: {
      border: '1px solid #e9ecef',
      color: '#495057',
      backgroundColor: 'white',
      '&:hover': {
        backgroundColor: '#f8f9fa',
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

export const FormButton = forwardRef<HTMLButtonElement, FormButtonProps & ComponentProps<"button">>(
  ({ variant = 'primary', size = 'md', styles, children, ...props }, ref) => {
    const variantStyles = buttonVariants[variant];
    
    return (
      <Button
        ref={ref}
        size={size}
        styles={{ ...variantStyles, ...styles }}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

FormButton.displayName = 'FormButton';
