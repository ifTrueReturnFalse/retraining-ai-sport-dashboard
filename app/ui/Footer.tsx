"use client";

import styles from "./UiCSS/Footer.module.css";
import IconLogo from "@/app/ui/Logo/IconLogo";
import { usePathname } from "next/navigation";


/**
 * Footer component of the application.
 *
 * - Hidden on the sign-in page (`/auth/signin`) to keep the login view clean.  
 * - Displays two sections:
 *    1. Left section → © notice and legal mention.  
 *    2. Right section → links like Terms, Contact, and the `IconLogo`.  
 *
 * @returns {JSX.Element | null} A styled footer or `null` if on the sign-in page.
 */
export default function Footer() {
  const pathname = usePathname();

  // Do not render footer on sign-in page for a cleaner layout
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
