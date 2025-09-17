"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { signOut } from "next-auth/react";
import styles from "./Common.module.css";

export default function NavBar() {
  const links = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Coach AI", href: "/dashboard/coach" },
    { name: "Mon profil", href: "/dashboard/profile" },
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
              className={clsx(`${styles.link}`, {
                "text-[#0b23f4]": pathname === link.href,
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
