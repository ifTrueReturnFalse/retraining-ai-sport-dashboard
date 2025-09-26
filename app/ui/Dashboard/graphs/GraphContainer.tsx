"use client";

import { useDateRange } from "@/app/hooks/useDateRange";
import styles from "./GraphContainer.module.css";
import MonthlyKmGraph from "./MonthlyKmGraph";
import WeeklyBPM from "./WeeklyBPM";
import GoalPie from "./GoalPie";
import PerformanceContainer from "../PerformanceContainer";
import { getSunday } from "@/app/lib/graph-utils";

export default function GraphContainer({ className }: { className: string }) {
  const { startDate, endDate } = useDateRange(getSunday(new Date()), 6);
  const formatedStartDate = startDate.toLocaleDateString("fr-FR");
  const formatedEndDate = endDate.toLocaleDateString("fr-FR");

  return (
    <div className={className}>
      <h3 className={`${styles.titre} mb-10`}>Vos dernières performances</h3>
      <div className={`${styles.graphRow} mb-10`}>
        <MonthlyKmGraph />
        <WeeklyBPM />
      </div>
      <h3 className={styles.titre}>Cette semaine</h3>
      <p
        className={`${styles.legend} mb-[20]`}
      >{`Du ${formatedStartDate} au ${formatedEndDate}`}</p>
      <div className={styles.graphRow}>
        <GoalPie />
        <PerformanceContainer />
      </div>
    </div>
  );
}
