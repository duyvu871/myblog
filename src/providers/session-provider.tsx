'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { type Session } from 'next-auth';
import { env } from 'app/lib/env';

interface SessionProviderProps {
  children: React.ReactNode;
  session?: Session | null;
}

/**
 * NextAuth Session Provider wrapper
 */
export function SessionProvider({ children, session }: SessionProviderProps) {
  return (
    <NextAuthSessionProvider
      session={session}
      refetchInterval={5 * 60}
      refetchOnWindowFocus={false}
      basePath="/api/auth"
      baseUrl={env.NEXTAUTH_URL}
    >
      {children}
    </NextAuthSessionProvider>
  );
}
