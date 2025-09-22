"use client";

import ProfileData from "./ProfileData";
import { useUser } from "@/app/context/UserContext";
import { useActivities } from "@/app/context/ActivitiesContext";
import { ISOToString, countChillDays } from "@/app/lib/utils";
import styles from "./Statistics.module.css";

export default function Statistics() {
  const userData = useUser();
  const userActivities = useActivities();
  let hours = 0;
  let minutes = 0;

  if (userData.statistics?.totalDuration) {
    hours = Math.floor(userData.statistics?.totalDuration / 60);
    minutes = userData.statistics?.totalDuration % 60;
  }

  const burntCalories = userActivities.activities.reduce(
    (totalCalories, activity) => totalCalories + activity.caloriesBurned,
    0
  )

  let chillDays = 0
  if (userData.profile) {
    chillDays = countChillDays(userData.profile?.createdAt, userActivities.activities)
  }
  console.log(userActivities)

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
        <ProfileData title="Calories brûlées" primaryValue={`${burntCalories}`} secondaryValue="cal" />
        <ProfileData
          title="Distance totale parcourue"
          primaryValue={`${userData.statistics?.totalDistance}`}
          secondaryValue="km"
        />
        <ProfileData title="Nombre de jours de repos" primaryValue={`${chillDays}`} secondaryValue="jours" />
        <ProfileData
          title="Nombre de sessions"
          primaryValue={`${userData.statistics?.totalSessions}`}
          secondaryValue="sessions"
        />
      </div>
    </div>
  );
}
