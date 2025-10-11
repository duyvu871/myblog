import {
  TextInput,
  PasswordInput,
  type TextInputProps,
  type PasswordInputProps,
} from '@mantine/core';
import { forwardRef } from 'react';

const formInputStyles = {
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: `1px solid var(--catppuccin-surface1)`,
    backgroundColor: 'var(--catppuccin-surface0)',
    color: 'var(--catppuccin-text)',
    '&:focus': {
      borderColor: 'var(--catppuccin-blue)',
      boxShadow: `0 0 0 2px var(--catppuccin-blue)`,
      opacity: 0.1,
    },
    '&::placeholder': {
      color: 'var(--catppuccin-subtext0)',
    },
  },
  label: {
    fontWeight: 500,
    color: 'var(--catppuccin-text)',
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
    <TextInput ref={ref} size={size} styles={{ ...formInputStyles, ...styles }} {...props} />
  )
);

FormInput.displayName = 'FormInput';

export const FormPasswordInput = forwardRef<HTMLInputElement, FormPasswordInputProps>(
  ({ size = 'md', styles, ...props }, ref) => (
    <PasswordInput ref={ref} size={size} styles={{ ...formInputStyles, ...styles }} {...props} />
  )
);

FormPasswordInput.displayName = 'FormPasswordInput';
