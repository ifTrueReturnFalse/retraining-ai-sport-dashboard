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

const UserContext = createContext<UserContextType | undefined>(undefined);

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userStatistics, setUserStatistics] = useState<UserStatistics | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const refreshUser = useCallback(async () => {
    if (session?.accessToken) {
      setLoading(true);
      try {
        const response = await fetch("/api/user-info");
        const data = await response.json()
        setUserProfile(data?.profile ?? null);
        setUserStatistics(data?.statistics ?? null);
      } catch {
        setUserProfile(null);
        setUserStatistics(null);
      } finally {
        setLoading(false);
      }
    } else {
      setUserProfile(null);
      setUserStatistics(null);
    }
  }, [session?.accessToken]);

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

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
