import styles from "./ProfileOverview.module.css";
import UserPresentation from "./UserPresentation";

export default function ProfileOverview() {
  /**
   * `ProfileOverview` is a React functional component that serves as a container
   * for displaying a user's basic profile information.
   * It primarily renders the `UserPresentation` component.
   *
   * @component
   * @returns {JSX.Element} A div element containing the `UserPresentation` component.
   */
  return (
    <div className={styles.container}>
      {/* Renders the UserPresentation component, which displays the user's profile picture,
          first name, last name, and membership date. */}
      <UserPresentation />
    </div>
  );
}
