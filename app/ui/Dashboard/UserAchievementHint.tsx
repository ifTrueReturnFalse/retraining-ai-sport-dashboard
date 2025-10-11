import UserPresentation from "../Profile/UserPresentation";
import Achievement from "./Achievement";
import styles from "./UserAchievementHint.module.css";

/**
 * `UserAchievementHint` is a React functional component that displays a user's
 * presentation alongside their total distance achievement.
 * It combines the `UserPresentation` component with the `Achievement` component
 * to provide a summary of the user's profile and a key performance metric.
 *
 * @component
 * @param {Object} props - The properties for the component.
 * @param {string} props.className - Additional CSS classes to apply to the main container div.
 * @returns {JSX.Element} A div element containing the user's presentation and total distance achievement.
 */
export default function UserAchievementHint({
  className,
}: {
  className: string;
}) {
  return (
    <div className={`${styles.container} ${className}`}>
      {/* Displays the user's profile information. */}
      <UserPresentation />
      <div className={styles.subContainer}>
        <p className={styles.legend}>Distance totale parcourue</p>
        <Achievement />
      </div>
    </div>
  );
}
