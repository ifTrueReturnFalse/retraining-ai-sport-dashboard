import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { ActivitiesContextType, ActivityType } from "@/app/lib/definitions";
import { useUser } from "./UserContext";

const ActivitiesContext = createContext<ActivitiesContextType | undefined>(
  undefined
);

export default function ActivitiesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { profile } = useUser();

  const refreshActivities = useCallback(async () => {
    setLoading(true);
    try {
      if (!profile) {
        setActivities([]);
        return;
      }

      const startDate = profile.createdAt;
      const endDate = new Date().toISOString().split("T")[0];

      const response = await fetch(
        `/api/user-activity?startWeek=${startDate}&endWeek=${endDate}`
      );

      if (!response.ok) throw new Error("API not reachable");

      const activities = await response.json();
      setActivities(activities ?? []);
    } catch (error) {
      console.error("Failed to fetch activities : ", error);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  }, [profile]);

  useEffect(() => {
    refreshActivities();
  }, [refreshActivities]);

  return (
    <ActivitiesContext.Provider
      value={{ activities, loading, refresh: refreshActivities }}
    >
      {children}
    </ActivitiesContext.Provider>
  );
}

export function useActivities() {
  const context = useContext(ActivitiesContext);
  if (!context)
    throw new Error("useActivities must be used within ActivityProvider");
  return context;
}
