'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import { Role, UserStatus } from 'db/enums';
import { Session } from 'next-auth';

/**
 * Custom hook for client-side authentication
 * Handles NextAuth session management, role checks, and client-side redirects
 */
export function useAuth() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const user = session?.user ?? null;
  const isAuthenticated = !!user;
  const isLoading_ = status === 'loading' || isLoading;

  /**
   * Sign in with credentials
   */
  const signInWithCredentials = useCallback(
    async (email: string, password: string, redirectTo?: string) => {
      setIsLoading(true);

      try {
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
          callbackUrl: redirectTo || '/dashboard',
        });

        if (result?.error) {
          return {
            success: false,
            error:
              result.error === 'CredentialsSignin' ? 'Invalid email or password' : 'Sign in failed',
          };
        }

        if (result?.ok) {
          if (redirectTo) {
            router.push(redirectTo);
          } else {
            router.push('/dashboard');
          }

          return { success: true };
        }

        return {
          success: false,
          error: 'Sign in failed',
        };
      } catch (error) {
        console.error('Sign in error:', error);
        return {
          success: false,
          error: 'An unexpected error occurred',
        };
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  /**
   * Sign in with OAuth provider
   */
  const signInWithProvider = useCallback(
    async (provider: string, redirectTo?: string) => {
      setIsLoading(true);

      try {
        const result = await signIn(provider, {
          redirect: false,
          callbackUrl: redirectTo || '/dashboard',
        });

        if (result?.error) {
          return {
            success: false,
            error: `${provider} sign in failed`,
          };
        }

        if (result?.ok) {
          if (redirectTo) {
            router.push(redirectTo);
          } else {
            router.push('/dashboard');
          }

          return { success: true };
        }

        return {
          success: false,
          error: 'Sign in failed',
        };
      } catch (error) {
        console.error('OAuth sign in error:', error);
        return {
          success: false,
          error: 'An unexpected error occurred',
        };
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  /**
   * Sign out
   */
  const signOutUser = useCallback(
    async (redirectTo?: string) => {
      setIsLoading(true);

      try {
        await signOut({
          redirect: false,
          callbackUrl: redirectTo || '/',
        });

        if (redirectTo) {
          router.push(redirectTo);
        } else {
          router.push('/');
        }

        return { success: true };
      } catch (error) {
        console.error('Sign out error:', error);
        return {
          success: false,
          error: 'Sign out failed',
        };
      } finally {
        setIsLoading(false);
      }
    },
    [user, router]
  );

  /**
   * Update session
   */
  const updateSession = useCallback(
    async (data?: Session) => {
      try {
        await update(data);
        return { success: true };
      } catch (error) {
        console.error('Session update error:', error);
        return {
          success: false,
          error: 'Session update failed',
        };
      }
    },
    [update]
  );

  /**
   * Check if user has specific role
   */
  const hasRole = useCallback(
    (roles: string | string[]) => {
      if (!user) return false;
      const allowedRoles = Array.isArray(roles) ? roles : [roles];
      return allowedRoles.includes(user.role);
    },
    [user]
  );

  /**
   * Check if user has specific permission (client-side check only)
   */
  const hasPermission = useCallback(
    (permission: string) => {
      if (!user) return false;

      // Basic client-side permission mapping
      const permissions = {
        [Role.ADMIN]: ['admin.access', 'user.manage', 'system.manage'],
        [Role.USER]: ['profile.read', 'profile.update'],
      };

      const userPermissions =
        permissions[user.role as keyof typeof permissions] || permissions[Role.USER];
      return userPermissions.includes(permission);
    },
    [user]
  );

  /**
   * Check if email is verified
   */
  const isEmailVerified = useCallback(() => {
    return !!user?.emailVerified;
  }, [user]);

  /**
   * Check user status
   */
  const getUserStatus = useCallback(() => {
    return user?.status || null;
  }, [user]);

  /**
   * Check if user is admin
   */
  const isAdmin = useCallback(() => {
    return hasRole(Role.ADMIN);
  }, [hasRole]);

  /**
   * Check if user status is active
   */
  const isActive = useCallback(() => {
    return user?.status === UserStatus.ACTIVE;
  }, [user]);

  /**
   * Check if user is suspended
   */
  const isSuspended = useCallback(() => {
    return user?.status === UserStatus.SUSPENDED;
  }, [user]);

  /**
   * Check if user needs email verification
   */
  const needsEmailVerification = useCallback(() => {
    return user?.status === UserStatus.PENDING_VERIFICATION || !user?.emailVerified;
  }, [user]);

  /**
   * Check authentication and redirect if needed (client-side only)
   */
  const requireAuth = useCallback(
    (redirectTo?: string) => {
      if (!isAuthenticated && status !== 'loading') {
        router.push(redirectTo || '/auth/login');
        return false;
      }
      return true;
    },
    [isAuthenticated, status, router]
  );

  /**
   * Check role and redirect if needed (client-side only)
   */
  const requireRole = useCallback(
    (roles: string | string[], redirectTo?: string) => {
      if (!requireAuth()) return false;

      if (!hasRole(roles)) {
        router.push(redirectTo || '/unauthorized');
        return false;
      }
      return true;
    },
    [requireAuth, hasRole, router]
  );

  /**
   * Redirect to login page
   */
  const redirectToLogin = useCallback(
    (callbackUrl?: string) => {
      const loginUrl = callbackUrl
        ? `/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`
        : '/auth/login';
      router.push(loginUrl);
    },
    [router]
  );

  /**
   * Redirect to dashboard
   */
  const redirectToDashboard = useCallback(() => {
    router.push('/dashboard');
  }, [router]);

  return {
    // User data
    user,
    session,
    isAuthenticated,
    isLoading: isLoading_,

    // Authentication methods
    signInWithCredentials,
    signInWithProvider,
    signOut: signOutUser,
    updateSession,

    // Permission checks (client-side only)
    hasRole,
    hasPermission,
    isEmailVerified,
    getUserStatus,
    isAdmin,
    isActive,
    isSuspended,
    needsEmailVerification,

    // Client-side route protection
    requireAuth,
    requireRole,

    // Navigation helpers
    redirectToLogin,
    redirectToDashboard,

    // Convenience methods
    signInWithGoogle: (redirectTo?: string) => signInWithProvider('google', redirectTo),
  };
}

/**
 * Hook for protecting pages that require authentication (client-side)
 */
export function useRequireAuth(redirectTo?: string) {
  const { requireAuth } = useAuth();

  return requireAuth(redirectTo);
}

/**
 * Hook for protecting pages that require specific roles (client-side)
 */
export function useRequireRole(roles: string | string[], redirectTo?: string) {
  const { requireRole } = useAuth();

  return requireRole(roles, redirectTo);
}

/**
 * Hook for checking if user is admin (client-side)
 */
export function useIsAdmin() {
  const { isAdmin } = useAuth();
  return isAdmin();
}

/**
 * Hook for checking authentication status
 */
export function useIsAuthenticated() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
}
