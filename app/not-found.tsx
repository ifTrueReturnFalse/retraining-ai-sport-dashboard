"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/app/ui/Buttons/Buttons";
import styles from "./notFound.module.css";

/**
 * `NotFound` is the fallback page displayed when a user navigates
 * to a route that does not exist.
 *
 * Behavior:
 * - If the user is authenticated → shows a link to the dashboard
 * - If the user is not authenticated → shows a link to the sign-in page
 *
 * @component
 * @returns {JSX.Element} Custom "Not Found" page
 */
export default function NotFound() {
  // Retrieves the current session from NextAuth
  // `session` will be `null` if the user is not authenticated
  const { data: session } = useSession();

  return (
    // `suppressHydrationWarning` prevents React hydration mismatches
    // when the server-rendered markup differs from the client-side rendering
    <div className={styles.container} suppressHydrationWarning>
      <p className={styles.text}>
        La page que vous cherchez n&apos;existe pas !
      </p>

      {/* Conditional link based on authentication status */}
      <Link href={session ? "/dashboard" : "/auth/signin"}>
        <Button
          isSubmitButton={false}
          buttonText={session ? "Aller au dashboard" : "Se connecter"}
        />
      </Link>
    </div>
  );
}
