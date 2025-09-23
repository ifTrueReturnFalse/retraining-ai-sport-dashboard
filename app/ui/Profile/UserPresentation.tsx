'use client'

import Image from "next/image";
import { useUser } from "@/app/context/UserContext";
import styles from './UserPresentation.module.css'
import { ISOToString } from "@/app/lib/utils";

export default function UserPresentation() {
  const userData = useUser()
  
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
