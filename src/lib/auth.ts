import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { env } from "app/lib/env";

export const { GET, POST } = NextAuth({
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID!,
      clientSecret: env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
});
