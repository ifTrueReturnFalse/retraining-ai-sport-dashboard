"use client";

import { useUser } from "@/app/context/UserContext";
import styles from "./ProfileDetail.module.css";

/**
 * `ProfileDetail` is a React functional component that displays detailed profile information
 * for the authenticated user, such as age, gender, height, and weight.
 *
 * It fetches user data from the `UserContext`.
 *
 * @component
 * @returns {JSX.Element} A div element containing the user's detailed profile information.
 */
export default function ProfileDetail() {
  // Access user data from the UserContext.
  const userData = useUser();

  let meter = 0;
  let centimeters = 0;
  // If user height is available, convert it from centimeters to meters and remaining centimeters.
  if (userData.profile?.height) {
    // Calculate meters by dividing total height by 100 and taking the floor.
    meter = Math.floor(userData.profile?.height / 100);
    // Calculate remaining centimeters using the modulo operator.
    centimeters = userData.profile?.height % 100;
  }

  return (
    <div className={styles.container}>
      <p className={styles.title}>Votre profil</p>
      <div className={styles.data}>
        {/* Displays the user's age. */}
        <p>{`Âge : ${userData.profile?.age ?? "N/A"}`}</p>
        {/* Displays the user's gender. */}
        <p>{`Genre : `}</p>
        {/* Displays the user's height in meters and centimeters. */}
        <p>{`Taille : ${meter}m${centimeters}`}</p>
        {/* Displays the user's weight in kilograms. */}
        <p>{`Poids : ${userData.profile?.weight ?? "N/A"}kg`}</p>
      </div>
    </div>
  );
}
