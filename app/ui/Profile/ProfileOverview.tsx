import styles from "./ProfileOverview.module.css";
import UserPresentation from "./UserPresentation";

export default function ProfileOverview() {
  return (
    <div className={styles.container}>
      <UserPresentation />
    </div>
  );
}
