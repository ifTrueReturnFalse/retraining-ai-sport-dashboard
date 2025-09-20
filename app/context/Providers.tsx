'use client'

import NextAuthSessionProvider from "./SessionProvider"
import UserProvider from "./UserContext"

/**
 * `Providers` is a wrapper component that combines all context providers
 * needed for the application.
 *
 * - `NextAuthSessionProvider` → provides authentication session state via NextAuth.
 * - `UserProvider` → provides user-specific data and context throughout the app.
 *
 * This allows any child component to access both session and user context seamlessly.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - The nested components that will have access to the contexts.
 * @returns {JSX.Element} Wrapped children with all necessary providers.
 */
export default function Providers({children}: {children: React.ReactNode}) {
  return (
    <NextAuthSessionProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </NextAuthSessionProvider>
  )
}