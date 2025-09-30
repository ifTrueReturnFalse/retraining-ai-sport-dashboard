"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { signOut } from "next-auth/react";
import styles from "./UiCSS/Common.module.css";

/**
 * `NavBar` renders the main navigation for authenticated users.
 *
 * Features:
 * - Displays a list of links for internal navigation.
 * - Highlights the active link based on the current pathname.
 * - Includes a "Sign out" button that logs the user out via NextAuth.
 *
 * Example usage:
 * ```tsx
 * // Render the navigation bar for authenticated users
 * <NavBar />
 * ```
 *
 * Notes:
 * - Uses Next.js `Link` for client-side navigation.
 * - Uses `usePathname` from Next.js to determine the active link.
 * - The logout button triggers `signOut` from `next-auth/react` with a redirect to the sign-in page.
 * - All styling is managed via CSS modules (`Common.module.css`) and `clsx` for conditional classes.
 * - Fully self-contained, no props are required.
 */
export default function NavBar() {
  const links = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Coach AI", href: "/dashboard" },
    { name: "Mon profil", href: "/profile" },
  ];

  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/auth/signin" });
  };

  return (
    <nav suppressHydrationWarning className={styles.navbar}>
      {links.map((link) => {
        return (
          <Link href={link.href} key={link.name}>
            <p
              className={clsx(styles.link, {
                [styles.activeLink]: pathname === link.href,
              })}
            >
              {link.name}
            </p>
          </Link>
        );
      })}
      <p className={styles.barNavbar}>|</p>
      <button onClick={handleSignOut} className={styles.logoutButton}>
        Se déconnecter
      </button>
    </nav>
  );
}
