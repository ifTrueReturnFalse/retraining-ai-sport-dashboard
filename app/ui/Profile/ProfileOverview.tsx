"use client";

import Image from "next/image";
import { useUser } from "@/app/context/UserContext";
import { ISOToString } from "@/app/lib/utils";
import styles from "./ProfileOverview.module.css";

export default function ProfileOverview() {
  const userData = useUser();
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        {userData.profile?.profilePicture && (
          <Image
            src={userData.profile?.profilePicture}
            alt="Image de profil"
            height={117}
            width={104}
            className={styles.image}
          />
        )}
      </div>
      <div>
        <p
          className={styles.name}
        >{`${userData.profile?.firstName} ${userData.profile?.lastName}`}</p>

        {userData.profile?.createdAt && (
          <p className={styles.member}>{`Membre depuis le ${ISOToString(
            userData.profile?.createdAt
          )}`}</p>
        )}
      </div>
    </div>
  );
}
