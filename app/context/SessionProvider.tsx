"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { ReactNode } from "react";

interface NextAuthSessionProvider {
  children: ReactNode;
  session?: Session | null;
}

/**
 * `NextAuthSessionProvider` wraps your application or component tree
 * with NextAuth's `SessionProvider`.
 *
 * Purpose:
 * - Provides the authentication session context to all child components.
 * - Allows access to `useSession` hook anywhere within the provider.
 * - Supports optional preloaded `session` for SSR or static generation.
 *
 * Example usage:
 * ```tsx
 * // Wrap your entire app in _app.tsx
 * <NextAuthSessionProvider session={pageProps.session}>
 *   <Component {...pageProps} />
 * </NextAuthSessionProvider>
 * ```
 *
 * Notes:
 * - `SessionProvider` is required for `useSession` and authentication-aware components.
 * - Passing the optional `session` prop can improve SSR behavior.
 * - Fully compatible with client-side and server-side Next.js flows.
 */
export default function NextAuthSessionProvider({
  children,
  session,
}: NextAuthSessionProvider) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
