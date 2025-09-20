"use client";

import { useSession } from "next-auth/react";
import {
  createContext,
  useEffect,
  useState,
  useCallback,
  useContext,
} from "react";
import {
  UserProfile,
  UserContextType,
  UserStatistics,
} from "@/app/lib/definitions";


/**
 * UserContext provides user-specific data and methods throughout the app.
 * It includes:
 * - `profile`: the authenticated user's profile (or null if not loaded)
 * - `statistics`: user statistics (or null if not loaded)
 * - `loading`: boolean indicating whether data is being fetched
 * - `refreshUser`: function to manually refresh user data
 */
const UserContext = createContext<UserContextType | undefined>(undefined);


/**
 * UserProvider wraps its children with the UserContext.
 * It automatically fetches user profile and statistics based on the
 * current NextAuth session.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Nested components that will have access to user context
 * @returns {JSX.Element} Children wrapped with UserContext provider
 */
export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Access current session from NextAuth
  const { data: session } = useSession();
  
  // State to store user profile and statistics
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userStatistics, setUserStatistics] = useState<UserStatistics | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  /**
   * refreshUser fetches the latest user data from `/api/user-info`.
   * Only runs if the user has a valid accessToken.
   */
  const refreshUser = useCallback(async () => {
    if (session?.accessToken) {
      setLoading(true);
      try {
        const response = await fetch("/api/user-info");
        const data = await response.json()
        setUserProfile(data?.profile ?? null);
        setUserStatistics(data?.statistics ?? null);
      } catch {
        // Reset data on fetch failure
        setUserProfile(null);
        setUserStatistics(null);
      } finally {
        setLoading(false);
      }
    } else {
      // Clear data if no session
      setUserProfile(null);
      setUserStatistics(null);
    }
  }, [session?.accessToken]);

  // Automatically refresh user data when accessToken changes
  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  return (
    <UserContext.Provider
      value={{
        profile: userProfile,
        statistics: userStatistics,
        loading,
        refreshUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

/**
 * `useUser` is a custom hook to access user data from UserContext.
 *
 * @function
 * @returns {UserContextType} The current user context including profile, statistics, loading, and refreshUser
 * @throws Will throw an error if used outside of a UserProvider
 */
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
