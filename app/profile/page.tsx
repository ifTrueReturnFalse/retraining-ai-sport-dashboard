import ProfileOverview from "@/app/ui/Profile/ProfileOverview";
import ProfileDetail from "@/app/ui/Profile/ProfileDetail";
import Statistics from "@/app/ui/Profile/Statistics";
import styles from './profile.module.css'

export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.profileInfo}>
        <ProfileOverview />
        <ProfileDetail />
      </div>

      <Statistics />
    </div>
  );
}
