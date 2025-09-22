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
 * Statistics component.
 *
 * - Fetches user profile and activity data via context.
 * - Displays key statistics such as:
 *   - Total running time (hours/minutes).
 *   - Calories burned.
 *   - Total distance.
 *   - Rest (chill) days.
 *   - Number of sessions.
 * - Formats dates and durations with helper functions from `utils`.
 *
 * @returns JSX element showing user statistics in a grid layout.
 */
export default function Statistics() {
  const userData = useUser();
  const userActivities = useActivities();

  const { hours, minutes } = userData.statistics?.totalDuration
    ? minutesToHoursAndMinutes(userData.statistics.totalDuration)
    : { hours: 0, minutes: 0 };

  const totalBurnedCalories = burnedCalories(userActivities.activities);

  const chillDays = userData.profile
    ? countChillDays(userData.profile?.createdAt, userActivities.activities)
    : 0;

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
          title="Temps total couru"
          primaryValue={`${hours}h`}
          secondaryValue={`${minutes}min`}
        />
        <ProfileData
          title="Calories brûlées"
          primaryValue={`${totalBurnedCalories}`}
          secondaryValue="cal"
        />
        <ProfileData
          title="Distance totale parcourue"
          primaryValue={`${userData.statistics?.totalDistance ?? 0}`}
          secondaryValue="km"
        />
        <ProfileData
          title="Nombre de jours de repos"
          primaryValue={`${chillDays}`}
          secondaryValue="jours"
        />
        <ProfileData
          title="Nombre de sessions"
          primaryValue={`${userData.statistics?.totalSessions ?? 0}`}
          secondaryValue="sessions"
        />
      </div>
    </div>
  );
}
