import UserPresentation from "../Profile/UserPresentation";
import Achievement from "./Achievement";
import styles from './UserAchievementHint.module.css'

export default function UserAchievementHint({className}: {className: string}) {
  return (
    <div className={`${styles.container} ${className}`}>
      <UserPresentation />
      <div className={styles.subContainer}>
        <p className={styles.legend}>Distance totale parcourue</p>
        <Achievement />
      </div>
    </div>
  )
}