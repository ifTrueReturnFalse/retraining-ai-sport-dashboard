"use client";

import { useUser } from "@/app/context/UserContext";
import styles from "./ProfileDetail.module.css";

export default function ProfileDetail() {
  const userData = useUser();

  let meter = 0;
  let centimeters = 0;
  if (userData.profile?.height) {
    meter = Math.floor(userData.profile?.height / 100);
    centimeters = userData.profile?.height % 100;
  }

  return (
    <div className={styles.container}>
      <p className={styles.title}>Votre profil</p>
      <div className={styles.data}>
        <p>{`Âge : ${userData.profile?.age}`}</p>
        <p>{`Genre : `}</p>
        <p>{`Taille : ${meter}m${centimeters}`}</p>
        <p>{`Poids : ${userData.profile?.weight}kg`}</p>
      </div>
    </div>
  );
}
