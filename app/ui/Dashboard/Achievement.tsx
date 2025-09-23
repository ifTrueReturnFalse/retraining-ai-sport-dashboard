'use client'

import Image from "next/image"
import { useUser } from "@/app/context/UserContext"
import styles from './Achievement.module.css'

export default function Achievement() {
  const userData = useUser()
  
  return (
    <div className={styles.achievement}>
      <Image src="/flag.svg" height={34} width={34} alt="Achievement's flag !" />
      <p>{userData.statistics?.totalDistance} km</p>
    </div>
  )
}