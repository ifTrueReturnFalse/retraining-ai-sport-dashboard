import styles from "./GraphContainer.module.css";
import MonthlyKmGraph from "./MonthlyKmGraph";
import WeeklyBPM from "./WeeklyBPM";

export default function GraphContainer({ className }: { className: string }) {
  return (
    <div className={className}>
      <h3 className={styles.titre}>Vos dernières performances</h3>
      <div className={styles.graphRow}>
        <MonthlyKmGraph />
        <WeeklyBPM />
      </div>
    </div>
  );
}
