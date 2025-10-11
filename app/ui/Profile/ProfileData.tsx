import styles from "./DataProfile.module.css";

/**
 * Props for the `ProfileData` component.
 */
interface ProfileDataProps {
  /**
   * The main title or label for the data point.
   */
  title?: string;
  /**
   * The primary numerical or textual value to display.
   */
  primaryValue?: string;
  /**
   * An optional secondary value or unit to display alongside the primary value.
   */
  secondaryValue?: string;
  /**
   * Optional additional CSS classes to apply to the main container div.
   */
  className?: string;
}

/**
 * `ProfileData` is a React functional component that displays a single piece of profile or
 * statistical data, typically consisting of a title, a primary value, and an optional secondary value.
 * It's designed for presenting key metrics in a clear and concise manner.
 *
 * @component
 * @param {ProfileDataProps} props - The properties for the component.
 * @param {string} [props.title] - The main title or label for the data point.
 * @param {string} [props.primaryValue] - The primary numerical or textual value to display.
 * @param {string} [props.secondaryValue] - An optional secondary value or unit to display alongside the primary value.
 * @param {string} [props.className] - Optional additional CSS classes for custom styling.
 * @returns {JSX.Element} A div element containing the formatted profile data.
 */
export default function ProfileData({
  title,
  primaryValue,
  secondaryValue,
  className,
}: ProfileDataProps) {
  return (
    <div className={`${styles.container} ${className}`}>
      <p className={styles.title}>{title}</p>
      <p>
        <span className={styles.primaryValue}>{primaryValue}</span>
        {/* Displays the primary value (e.g., "100"). */}
        <span className={styles.secondaryValue}>{secondaryValue}</span>
        {/* Displays the secondary value or unit (e.g., "km"). */}
      </p>
    </div>
  );
}
