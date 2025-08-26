'use server';

import { redirect } from 'next/navigation';
import { withServerActionErrorHandling } from 'app/utils';

/**
 * Server-side redirect actions for authentication
 * These work with client-side NextAuth functions
 */

/**
 * Redirect to login page
 */
const rawRedirectToLogin = async (callbackUrl?: string) => {
  const loginUrl = callbackUrl 
    ? `/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`
    : '/auth/login';
  
  redirect(loginUrl);
};

/**
 * Redirect to dashboard
 */
const rawRedirectToDashboard = async () => {
  redirect('/dashboard');
};

/**
 * Redirect to home
 */
const rawRedirectToHome = async () => {
  redirect('/');
};

/**
 * Redirect to OAuth provider
 */
const rawRedirectToOAuth = async (provider: string, callbackUrl?: string) => {
  const oauthUrl = callbackUrl
    ? `/api/auth/signin/${provider}?callbackUrl=${encodeURIComponent(callbackUrl)}`
    : `/api/auth/signin/${provider}`;
  
  redirect(oauthUrl);
};

// Export wrapped actions
export const redirectToLogin = withServerActionErrorHandling(rawRedirectToLogin);
export const redirectToDashboard = withServerActionErrorHandling(rawRedirectToDashboard);
export const redirectToHome = withServerActionErrorHandling(rawRedirectToHome);
export const redirectToGoogle = withServerActionErrorHandling(
  (callbackUrl?: string) => rawRedirectToOAuth('google', callbackUrl)
);


