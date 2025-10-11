"use client";

import Image from "next/image";
import { useUser } from "@/app/context/UserContext";
import styles from "./Achievement.module.css";

export default function Achievement() {
  /**
   * `Achievement` is a React functional component that displays a user's total distance achievement.
   * It fetches the user's statistics from the `UserContext` to display the `totalDistance`.
   *
   * @component
   * @returns {JSX.Element} A div element containing an image of a flag and the user's total distance.
   */
  const { statistics } = useUser();

  return (
    <div className={styles.achievement}>
      <Image src="/flag.svg" height={34} width={34} alt="Achievement's flag" />
      {/* Displays the total distance from user statistics, defaulting to 0 if not available. */}
      <p>{statistics?.totalDistance ?? 0} km</p>
    </div>
  );
}
