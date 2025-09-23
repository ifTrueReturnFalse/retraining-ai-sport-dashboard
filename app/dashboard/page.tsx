import styles from "./dashboard.module.css";
import ChatbotHint from "@/app/ui/Dashboard/ChatbotHint";
import UserAchievementHint from "@/app/ui/Dashboard/UserAchievementHint";

export default function Page() {
  return (
    <div className={styles.dashboard}>
      <ChatbotHint />
      <UserAchievementHint className="mt-10" />
    </div>
  );
}
