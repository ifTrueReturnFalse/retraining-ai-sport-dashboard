"use client";

import styles from "./Footer.module.css";
import IconLogo from "@/app/ui/Logo/IconLogo";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/auth/signin")) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <p>©Sportsee</p>
        <p>Tous droits réservés</p>
      </div>

      <div className={styles.subContainer}>
        <p>Conditions générales</p>
        <p className="mr-5">Contact</p>
        <IconLogo />
      </div>
    </div>
  );
}
