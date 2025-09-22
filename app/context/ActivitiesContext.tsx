import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { ActivitiesContextType, ActivityType } from "@/app/lib/definitions";
import { useUser } from "./UserContext";

/**
 * React context to hold user activities state and loading status.
 * Initially undefined, will be provided by ActivitiesProvider.
 */
const ActivitiesContext = createContext<ActivitiesContextType | undefined>(
  undefined
);

/**
 * ActivitiesProvider manages the state of user activities and provides
 * helper functions to refresh activities data from the backend API.
 *
 * @param children - React children that will have access to the ActivitiesContext
 */
export default function ActivitiesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // State to store the list of user activities
  const [activities, setActivities] = useState<ActivityType[]>([]);
  // State to indicate loading while fetching activities
  const [loading, setLoading] = useState<boolean>(false);
  // Access the user profile from UserContext
  const { profile } = useUser();

  /**
   * Fetch activities from the API based on user's profile creation date until today.
   * Wrapped in useCallback to memorize and avoid unnecessary re-creation.
   */
  const refreshActivities = useCallback(async () => {
    setLoading(true);
    try {
      if (!profile) {
        // No profile -> reset activities list and stop
        setActivities([]);
        return;
      }

      // Determine the date range: from profile creation until today
      const startDate = profile.createdAt;
      const endDate = new Date().toISOString().split("T")[0];

      // Call backend API for user activities
      const response = await fetch(
        `/api/user-activity?startWeek=${startDate}&endWeek=${endDate}`
      );

      if (!response.ok) throw new Error("API not reachable");

      const activities = await response.json();
      setActivities(activities ?? []); // Set fetched activities or empty array
    } catch (error) {
      console.error("Failed to fetch activities : ", error);
      setActivities([]); // Reset activities on error
    } finally {
      setLoading(false);
    }
  }, [profile]);

  /**
   * Automatically fetch activities when provider mounts
   * or when the user's profile changes.
   */
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

/**
 * Custom hook to access ActivitiesContext easily.
 *
 * @throws Error if used outside of an ActivitiesProvider
 */
export function useActivities() {
  const context = useContext(ActivitiesContext);
  if (!context)
    throw new Error("useActivities must be used within ActivityProvider");
  return context;
}
