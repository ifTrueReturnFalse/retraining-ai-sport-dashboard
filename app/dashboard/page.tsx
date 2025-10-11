"use client";

import styles from "./dashboard.module.css";
import { useRef } from "react";

import ChatbotHint from "@/app/ui/Dashboard/ChatbotHint";
import ChatbotModal from "../ui/Dashboard/ChatbotModal"; // The AI chatbot modal component.
import UserAchievementHint from "@/app/ui/Dashboard/UserAchievementHint"; // Component to display user achievements.
import GraphContainer from "../ui/Dashboard/graphs/GraphContainer"; // Container for various data visualization graphs.

/**
 * `Page` is the main component for the dashboard.
 * It orchestrates the display of various dashboard elements, including
 * hints for the chatbot and user achievements, a container for graphs,
 * and the chatbot modal itself.
 *
 * @component
 * @returns {JSX.Element} The dashboard page layout.
 */
export default function Page() {
  // `dialogRef` is used to control the visibility of the `ChatbotModal` via its native HTML API.
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <div className={styles.dashboard}>
      <ChatbotHint onClick={() => dialogRef.current?.showModal()} />{" "}
      {/* Displays a hint to open the chatbot. */}
      <UserAchievementHint className="mt-10" />{" "}
      {/* Displays user achievements with a top margin. */}
      <GraphContainer className="mt-15 mb-20" />{" "}
      {/* Contains various graphs, with top and bottom margins. */}
      <ChatbotModal dialogRef={dialogRef} />{" "}
      {/* The chatbot modal, controlled by `dialogRef`. */}
    </div>
  );
}
