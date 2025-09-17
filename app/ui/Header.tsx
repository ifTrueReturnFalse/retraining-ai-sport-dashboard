'use client'

import Logo from "@/app/ui/Logo/Logo";
import NavBar from "@/app/ui/NavBar";
import styles from "./Common.module.css";
import { useSession } from "next-auth/react";
import clsx from "clsx";

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
