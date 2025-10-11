"use client";

import ProfileData from "./ProfileData";
import { useUser } from "@/app/context/UserContext";
import { useActivities } from "@/app/context/ActivitiesContext";
import {
  ISOToString,
  burnedCalories,
  countChillDays,
  minutesToHoursAndMinutes,
} from "@/app/lib/utils";
import styles from "./Statistics.module.css";

/**
 * `Statistics` is a React functional component that displays a user's key athletic statistics.
 *
 * It fetches user profile data from `UserContext` and activity data from `ActivitiesContext`.
 * The component calculates and displays:
 * - Total running time (converted to hours and minutes).
 * - Total calories burned across all activities.
 * - Total distance covered.
 * - The number of rest days since the user's registration.
 * - The total number of activity sessions.
 *
 * Helper functions from `@/app/lib/utils` are used for data formatting and calculations.
 *
 * @returns JSX element showing user statistics in a grid layout.
 */
export default function Statistics() {
  const userData = useUser();
  const userActivities = useActivities();

  // Destructure hours and minutes from the total duration, defaulting to 0 if not available.
  const { hours, minutes } = userData.statistics?.totalDuration
    ? minutesToHoursAndMinutes(userData.statistics.totalDuration)
    : { hours: 0, minutes: 0 };

  // Calculate total burned calories using the `burnedCalories` utility function.
  const totalBurnedCalories = burnedCalories(userActivities.activities);

  // Calculate the number of chill days since user registration.
  const chillDays = userData.profile
    ? countChillDays(userData.profile?.createdAt, userActivities.activities)
    : 0;

  // Render the statistics in a grid layout.
  return (
    <div className={styles.container}>
      <p className={styles.title}>Vos statistiques</p>
      {userData.profile?.createdAt && (
        <p className={styles.member}>{`depuis le ${ISOToString(
          userData.profile.createdAt
        )}`}</p>
      )}
      <div className={styles.dataGrid}>
        <ProfileData
          title="Temps total couru" // Title for total running time.
          primaryValue={`${hours}h`} // Display hours.
          secondaryValue={`${minutes}min`} // Display minutes.
        />
        <ProfileData
          title="Calories brûlées" // Title for calories burned.
          primaryValue={`${totalBurnedCalories}`} // Display total calories.
          secondaryValue="cal" // Unit for calories.
        />
        <ProfileData
          title="Distance totale parcourue" // Title for total distance.
          primaryValue={`${userData.statistics?.totalDistance ?? 0}`} // Display total distance, defaulting to 0.
          secondaryValue="km" // Unit for distance.
        />
        <ProfileData
          title="Nombre de jours de repos" // Title for chill days.
          primaryValue={`${chillDays}`} // Display number of chill days.
          secondaryValue="jours" // Unit for chill days.
        />
        <ProfileData
          title="Nombre de sessions" // Title for total sessions.
          primaryValue={`${userData.statistics?.totalSessions ?? 0}`} // Display total sessions, defaulting to 0.
          secondaryValue="sessions" // Unit for sessions.
        />
      </div>
    </div>
  );
}
