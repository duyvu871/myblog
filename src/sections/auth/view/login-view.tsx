'use client';

import { Anchor, Checkbox, Divider, Group, Paper, Stack, Text } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { LoginSchema, type LoginInput } from '../data/schemas';
import { FormInput, FormPasswordInput, FormButton, OAuthButton } from 'app/components/ui';
import { AuthLayout } from 'app/components/layout/auth-layout';

interface LoginViewProps {
  onSubmit: (data: LoginInput) => void | Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  successMessage?: string | null;
}

export function LoginView({ onSubmit, isLoading = false, error, successMessage }: LoginViewProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleFormSubmit = async (data: LoginInput) => {
    await onSubmit(data);
  };

  return (
    <AuthLayout title="Log in to your Account" subtitle="Welcome back, please enter your details.">
      {/* Google Sign In */}
      <OAuthButton provider="google" action="signin" />

      {/* Divider */}
      <Divider label="OR" labelPosition="center" />

      {/* Form */}
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Stack gap="md">
          {successMessage && (
            <Paper p="xs" bg="green.0" c="green.6" style={{ border: '1px solid #bbf7d0' }}>
              <Text size="sm" ta="center">
                {successMessage}
              </Text>
            </Paper>
          )}

          {error && (
            <Paper p="xs" bg="red.0" c="red.6" style={{ border: '1px solid #fecaca' }}>
              <Text size="sm" ta="center">
                {error}
              </Text>
            </Paper>
          )}

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

          <Group justify="space-between" mt="xs">
            <Checkbox label="Remember me" size="sm" />
            <Anchor component={Link} href="/auth/forgot-password" size="sm" c="blue.6">
              Forgot Password?
            </Anchor>
          </Group>

          <FormButton type="submit" variant="primary" fullWidth loading={isLoading} mt="md">
            {isLoading ? 'Signing in...' : 'Log in'}
          </FormButton>
        </Stack>
      </form>

      {/* Footer */}
      <Text ta="center" size="sm" c="dimmed">
        Don't have an account?{' '}
        <Anchor component={Link} href="/auth/register" fw={500} c="blue.6">
          Sign Up
        </Anchor>
      </Text>
    </AuthLayout>
  );
}
