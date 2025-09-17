import styles from "./IconLogo.module.css";

/**
 * `IconLogo` is a presentational component that renders a custom logo using styled bars.
 *
 * The logo consists of 5 horizontal sections, each containing a red and blue bar.
 * Styling and animations are handled via `IconLogo.module.css`.
 *
 * Example usage:
 * ```tsx
 * // Render the logo inside a header
 * <header>
 *   <IconLogo />
 * </header>
 * ```
 *
 * Notes:
 * - This component has no props and is fully self-contained.
 * - All visual appearance (colors, spacing, animations) is controlled via CSS modules.
 * - Can be reused anywhere in the application where the logo is needed.
 */
export default function IconLogo() {
  return (
    <div className={styles.logo}>
      <div>
        <div className={`${styles.redbar} ${styles.bar1} ${styles.bar}`}></div>
        <div className={`${styles.bluebar} ${styles.bar1} ${styles.bar}`}></div>
      </div>
      <div>
        <div className={`${styles.redbar} ${styles.bar2} ${styles.bar}`}></div>
        <div className={`${styles.bluebar} ${styles.bar2} ${styles.bar}`}></div>
      </div>
      <div>
        <div className={`${styles.redbar} ${styles.bar3} ${styles.bar}`}></div>
        <div className={`${styles.bluebar} ${styles.bar3} ${styles.bar}`}></div>
      </div>
      <div>
        <div className={`${styles.redbar} ${styles.bar4} ${styles.bar}`}></div>
        <div className={`${styles.bluebar} ${styles.bar4} ${styles.bar}`}></div>
      </div>
      <div>
        <div className={`${styles.redbar} ${styles.bar5} ${styles.bar}`}></div>
        <div className={`${styles.bluebar} ${styles.bar5} ${styles.bar}`}></div>
      </div>
    </div>
  );
}
