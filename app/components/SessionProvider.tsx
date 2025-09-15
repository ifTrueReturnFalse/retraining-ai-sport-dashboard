"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { ReactNode } from "react";

interface NextAuthSessionProvider {
  children: ReactNode;
  session?: Session | null;
}

export default function NextAuthSessionProvider({
  children,
  session,
}: NextAuthSessionProvider) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
