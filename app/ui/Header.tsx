'use client'

import Logo from "@/app/ui/Logo/Logo";
import NavBar from "@/app/ui/NavBar";
import styles from "./UiCSS/Common.module.css";
import { useSession } from "next-auth/react";
import clsx from "clsx";

/**
 * `Header` is the top navigation component for the application.
 *
 * Features:
 * - Displays the `Logo` on the left.
 * - Shows `NavBar` only if the user is authenticated.
 * - Applies absolute positioning if no session is present (e.g., on public pages).
 *
 * Example usage:
 * ```tsx
 * // Place Header at the top of a page
 * <Header />
 * ```
 *
 * Notes:
 * - Uses `next-auth`'s `useSession` hook to conditionally render the navigation.
 * - Uses `clsx` to handle conditional CSS classes for styling.
 * - Fully self-contained, no props required for basic usage.
 */
export default function Header() {
  const {data: session} = useSession();

  return (
    <div
      className={clsx(`${styles.header}`, {
        "absolute": !session,
      })}
    >
      <Logo />
      {session && <NavBar />}
    </div>
  );
}
