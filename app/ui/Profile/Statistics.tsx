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
          userData.profile?.createdAt
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
