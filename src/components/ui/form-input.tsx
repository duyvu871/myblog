import { TextInput, PasswordInput, type TextInputProps, type PasswordInputProps } from '@mantine/core';
import { forwardRef } from 'react';

const formInputStyles = {
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #e9ecef',
    '&:focus': {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.1)',
    },
  },
  label: {
    fontWeight: 500,
    color: '#374151',
    marginBottom: '8px',
  },
};

interface FormInputProps extends TextInputProps {
  variant?: 'default';
}

interface FormPasswordInputProps extends PasswordInputProps {
  variant?: 'default';
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ size = 'md', styles, ...props }, ref) => (
    <TextInput
      ref={ref}
      size={size}
      styles={{ ...formInputStyles, ...styles }}
      {...props}
    />
  )
);

FormInput.displayName = 'FormInput';

export const FormPasswordInput = forwardRef<HTMLInputElement, FormPasswordInputProps>(
  ({ size = 'md', styles, ...props }, ref) => (
    <PasswordInput
      ref={ref}
      size={size}
      styles={{ ...formInputStyles, ...styles }}
      {...props}
    />
  )
);

FormPasswordInput.displayName = 'FormPasswordInput';
