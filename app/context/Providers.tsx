'use client'

import NextAuthSessionProvider from "./SessionProvider"
import UserProvider from "./UserContext"

export default function Providers({children}: {children: React.ReactNode}) {
  return (
    <NextAuthSessionProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </NextAuthSessionProvider>
  )
}