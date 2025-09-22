import styles from "./DataProfile.module.css";

interface ProfileData {
  title?: string;
  primaryValue?: string;
  secondaryValue?: string;
  className?: string;
}

export default function ProfileData({
  title,
  primaryValue,
  secondaryValue,
  className,
}: ProfileData) {
  return (
    <div className={`${styles.container} ${className}`}>
      <p className={styles.title}>{title}</p>
      <p>
        <span className={styles.primaryValue}>{primaryValue}</span>
        <span className={styles.secondaryValue}>{secondaryValue}</span>
      </p>
    </div>
  );
}
