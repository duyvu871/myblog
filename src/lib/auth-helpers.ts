import { getServerSession } from "next-auth/next";
import { authOptions } from "app/lib/auth";
import { redirect } from "next/navigation";
import { logAuth, logSecurity } from "app/utils/log";
import { Role, UserStatus } from "db/enums";

/**
 * Get the current session on the server side
 */
export async function getCurrentSession() {
  return await getServerSession(authOptions);
}

/**
 * Get the current user on the server side
 */
export async function getCurrentUser() {
  const session = await getCurrentSession();
  return session?.user ?? null;
}

/**
 * Require authentication - redirect to login if not authenticated
 */
export async function requireAuth(redirectTo?: string) {
  const session = await getCurrentSession();
  
  if (!session?.user) {
    logAuth('UNAUTHORIZED_ACCESS_ATTEMPT', undefined, {
      redirectTo: redirectTo || '/auth/login',
    });
    redirect(redirectTo || '/auth/login');
  }
  
  return session.user;
}

/**
 * Require specific role - redirect if user doesn't have required role
 */
export async function requireRole(
  roles: string | string[], 
  redirectTo?: string
) {
  const user = await requireAuth();
  const allowedRoles = Array.isArray(roles) ? roles : [roles];
  
  if (!allowedRoles.includes(user.role)) {
    logSecurity('UNAUTHORIZED_ROLE_ACCESS', 'medium', {
      userId: user.id,
      userRole: user.role,
      requiredRoles: allowedRoles,
      email: user.email,
    });
    redirect(redirectTo || '/unauthorized');
  }
  
  return user;
}

/**
 * Require admin role
 */
export async function requireAdmin(redirectTo?: string) {
  return await requireRole('ADMIN', redirectTo);
}

export async function requireEmailVerification(redirectTo?: string) {
  const user = await requireAuth();
  if (!user.emailVerified) {
    logAuth('EMAIL_VERIFICATION_REQUIRED', user.id, {
      email: user.email,
    });
    redirect(redirectTo || '/auth/verify-email');
  }
}
/**
 * Check if user has specific role
 */
export async function hasRole(roles: string | string[]) {
  const session = await getCurrentSession();
  if (!session?.user) return false;
  
  const allowedRoles = Array.isArray(roles) ? roles : [roles];
  return allowedRoles.includes(session.user.role);
}

/**
 * Check if user is admin
 */
export async function isAdmin() {
  return await hasRole(Role.ADMIN);
}

/**
 * Check if user is regular user
 */
export async function isUser() {
  return await hasRole(Role.USER);
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated() {
  const session = await getCurrentSession();
  return !!session?.user;
}

/**
 * Check if user's email is verified
 */
export async function isEmailVerified() {
  const session = await getCurrentSession();
  return !!session?.user?.emailVerified;
}

/**
 * Check if user is active
 */
export async function isUserActive() {
  const session = await getCurrentSession();
  return session?.user?.status === UserStatus.ACTIVE;
}

/**
 * Check if user is suspended
 */
export async function isUserSuspended() {
  const session = await getCurrentSession();
  return session?.user?.status === UserStatus.SUSPENDED;
}

/**
 * Check if user needs email verification
 */
export async function userNeedsEmailVerification() {
  const session = await getCurrentSession();
  if (!session?.user) return false;
  return session.user.status === UserStatus.PENDING_VERIFICATION || !session.user.emailVerified;
}
/**
 * Check user status
 */
export async function checkUserStatus() {
  const session = await getCurrentSession();
  if (!session?.user) return null;
  
  const { status } = session.user;
  
  if (status === 'SUSPENDED') {
    logAuth('SUSPENDED_USER_ACCESS', session.user.id, {
      email: session.user.email,
    });
    redirect('/auth/suspended');
  }
  
  if (status === 'INACTIVE') {
    logAuth('INACTIVE_USER_ACCESS', session.user.id, {
      email: session.user.email,
    });
    redirect('/auth/inactive');
  }
  
  if (status === 'PENDING_VERIFICATION') {
    logAuth('UNVERIFIED_USER_ACCESS', session.user.id, {
      email: session.user.email,
    });
    redirect('/auth/verify-email');
  }
  
  return session.user;
}

/**
 * Middleware helper for protecting routes
 */
export async function protectRoute(
  options: {
    requireAuth?: boolean;
    requireRoles?: string[];
    requireEmailVerify?: boolean;
    redirectTo?: string;
  } = {}
) {
  const {
    requireAuth: needsAuth = true,
    requireRoles = [],
    requireEmailVerify = false,
    redirectTo = '/auth/login',
  } = options;
  
  if (!needsAuth) return null;
  
  // Check authentication
  const user = await requireAuth(redirectTo);
  
  // Check user status
  await checkUserStatus();
  
  // Check roles
  if (requireRoles.length > 0) {
    await requireRole(requireRoles, '/unauthorized');
  }
  
  // Check email verification
  if (requireEmailVerify) {
    await requireEmailVerification('/auth/verify-email');
  }
  
  return user;
}

/**
 * Get user permissions based on role
 */
export function getUserPermissions(role: string) {
  const permissions = {
    ADMIN: [
      'user.create',
      'user.read',
      'user.update',
      'user.delete',
      'admin.access',
      'system.manage',
    ],
    USER: [
      'profile.read',
      'profile.update',
    ],
  };
  
  return permissions[role as keyof typeof permissions] || permissions.USER;
}

/**
 * Check if user has specific permission
 */
export async function hasPermission(permission: string) {
  const session = await getCurrentSession();
  if (!session?.user) return false;
  
  const userPermissions = getUserPermissions(session.user.role);
  return userPermissions.includes(permission);
}

/**
 * Require specific permission
 */
export async function requirePermission(
  permission: string, 
  redirectTo?: string
) {
  const hasAccess = await hasPermission(permission);
  
  if (!hasAccess) {
    const user = await getCurrentUser();
    logSecurity('UNAUTHORIZED_PERMISSION_ACCESS', 'medium', {
      userId: user?.id,
      userRole: user?.role,
      requiredPermission: permission,
      email: user?.email,
    });
    redirect(redirectTo || '/unauthorized');
  }
  
  return true;
}
