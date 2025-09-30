"use client";

import styles from "./dashboard.module.css";
import ChatbotHint from "@/app/ui/Dashboard/ChatbotHint";
import ChatbotModal from "../ui/Dashboard/ChatbotModal";
import UserAchievementHint from "@/app/ui/Dashboard/UserAchievementHint";
import GraphContainer from "../ui/Dashboard/graphs/GraphContainer";
import { useRef } from "react";

export default function Page() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <div className={styles.dashboard}>
      <ChatbotHint onClick={() => dialogRef.current?.showModal()} />
      <UserAchievementHint className="mt-10" />
      <GraphContainer className="mt-15 mb-20" />
      <ChatbotModal dialogRef={dialogRef} />
    </div>
  );
}
