'use client';

import { Anchor, Checkbox, Divider, Paper, Stack, Text } from '@mantine/core';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';

import { RegisterSchema, type RegisterInput } from 'app/sections/auth/data';
import { FormInput, FormPasswordInput, FormButton, OAuthButton } from 'app/components/ui';
import { AuthLayout } from 'app/components/layout/auth-layout';

interface RegisterViewProps {
  onSubmit: (data: RegisterInput) => void | Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

export function RegisterView({ onSubmit, isLoading = false, error }: RegisterViewProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleFormSubmit = async (data: RegisterInput) => {
    await onSubmit(data);
  };

  return (
    <AuthLayout title="Create an Account" subtitle="Sign up now to get started with an account.">
      {/* Google Sign Up */}
      <OAuthButton provider="google" action="signup" />

      {/* Divider */}
      <Divider label="OR" labelPosition="center" />

      {/* Form */}
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Stack gap="md">
          {error && (
            <Paper
              p="xs"
              style={{
                backgroundColor: 'var(--catppuccin-surface0)',
                color: 'var(--catppuccin-red)',
                border: `1px solid var(--catppuccin-red)`,
              }}
            >
              <Text size="sm" ta="center">
                {error}
              </Text>
            </Paper>
          )}

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <FormInput
                {...field}
                label="Full Name"
                placeholder="John Doe"
                required
                error={errors.name?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <FormInput
                {...field}
                label="Email Address"
                placeholder="johndoe@gmail.com"
                required
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <FormPasswordInput
                {...field}
                label="Password"
                placeholder="••••••••"
                required
                error={errors.password?.message}
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <FormPasswordInput
                {...field}
                label="Confirm Password"
                placeholder="••••••••"
                required
                error={errors.confirmPassword?.message}
              />
            )}
          />

          <Checkbox
            label={
              <Text size="sm">
                I have read and agree to the{' '}
                <Anchor component={Link} href="/terms" c="blue">
                  Terms of Service
                </Anchor>
              </Text>
            }
            size="sm"
          />

          <FormButton type="submit" variant="primary" fullWidth loading={isLoading} mt="md">
            {isLoading ? 'Creating account...' : 'Get Started'}
          </FormButton>
        </Stack>
      </form>

      {/* Footer */}
      <Text ta="center" size="sm" c="dimmed">
        Already have an account?{' '}
        <Anchor
          component={Link}
          href="/auth/login"
          fw={500}
          style={{ color: 'var(--catppuccin-blue)' }}
        >
          Log in
        </Anchor>
      </Text>
    </AuthLayout>
  );
}
