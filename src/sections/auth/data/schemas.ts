import { z } from 'zod';

// Common validation patterns
const emailValidation = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address')
  .max(254, 'Email is too long')
  .toLowerCase()
  .trim();

const passwordValidation = z
  .string()
  .min(1, 'Password is required')
  .min(6, 'Password must be at least 6 characters')
  .max(128, 'Password is too long')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    'Password must contain at least one lowercase letter, one uppercase letter, and one number'
  );

const nameValidation = z
  .string()
  .min(1, 'Name is required')
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters')
  .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes')
  .trim();

// Login schema
export const LoginSchema = z.object({
  email: emailValidation,
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

// Register schema with enhanced validation
export const RegisterSchema = z.object({
  name: nameValidation,
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: z
    .string()
    .min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

// Forgot password schema
export const ForgotPasswordSchema = z.object({
  email: emailValidation,
});

// Reset password schema
export const ResetPasswordSchema = z.object({
  token: z
    .string()
    .min(1, 'Reset token is required'),
  password: passwordValidation,
  confirmPassword: z
    .string()
    .min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

// Change password schema (for authenticated users)
export const ChangePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, 'Current password is required'),
  newPassword: passwordValidation,
  confirmNewPassword: z
    .string()
    .min(1, 'Please confirm your new password'),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "New passwords don't match",
  path: ['confirmNewPassword'],
}).refine((data) => data.currentPassword !== data.newPassword, {
  message: "New password must be different from current password",
  path: ['newPassword'],
});

// Profile update schema (for user profile settings)
export const UpdateProfileSchema = z.object({
  name: nameValidation,
  email: emailValidation,
  phone: z
    .string()
    .optional()
    .refine(
      (phone) => !phone || /^[0-9]{10}$/.test(phone),
      'Phone number must be 10 digits'
    ),
  bio: z
    .string()
    .max(500, 'Bio must be less than 500 characters')
    .optional(),
});

// Type exports
export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;
export type ChangePasswordInput = z.infer<typeof ChangePasswordSchema>;
export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;

// Validation helper functions
export const validateEmail = (email: string) => {
  return emailValidation.safeParse(email);
};

export const validatePassword = (password: string) => {
  return passwordValidation.safeParse(password);
};

export const validateName = (name: string) => {
  return nameValidation.safeParse(name);
};

// Password strength checker
export const getPasswordStrength = (password: string): {
  score: number;
  feedback: string[];
} => {
  let score = 0;
  const feedback: string[] = [];

  if (password.length >= 8) score++;
  else feedback.push('Use at least 8 characters');

  if (/[a-z]/.test(password)) score++;
  else feedback.push('Add lowercase letters');

  if (/[A-Z]/.test(password)) score++;
  else feedback.push('Add uppercase letters');

  if (/\d/.test(password)) score++;
  else feedback.push('Add numbers');

  if (/[^a-zA-Z\d]/.test(password)) {
    score++;
  } else {
    feedback.push('Add special characters');
  }

  return { score, feedback };
};
