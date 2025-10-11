"use client";

import { useDateRange } from "@/app/hooks/useDateRange";
import styles from "./GraphContainer.module.css";
import MonthlyKmGraph from "./MonthlyKmGraph";
import WeeklyBPM from "./WeeklyBPM";
import GoalPie from "./GoalPie";
import PerformanceContainer from "../PerformanceContainer";
import { getSunday } from "@/app/lib/graph-utils";

/**
 * `GraphContainer` is a React functional component that serves as a layout container
 * for various performance graphs and metrics on the dashboard.
 * It organizes `MonthlyKmGraph`, `WeeklyBPM`, `GoalPie`, and `PerformanceContainer`
 * into logical sections, displaying weekly and monthly performance data.
 *
 * @component
 * @param {Object} props - The properties for the component.
 * @param {string} props.className - Additional CSS classes to apply to the main container div.
 * @returns {JSX.Element} A div element containing titles, date ranges, and various graph components.
 */
export default function GraphContainer({ className }: { className: string }) {
  // Use the `useDateRange` hook to get the start and end dates for the current week.
  // `getSunday(new Date())` ensures the week starts on Sunday, and `6` sets the range for 7 days.
  const { startDate, endDate } = useDateRange(getSunday(new Date()), 6);
  // Format the start date for display in French locale.
  const formatedStartDate = startDate.toLocaleDateString("fr-FR");
  // Format the end date for display in French locale.
  const formatedEndDate = endDate.toLocaleDateString("fr-FR");

  return (
    <div className={className}>
      <h3 className={`${styles.titre} mb-10`}>Vos dernières performances</h3>
      <div className={`${styles.graphRow} mb-10`}>
        <MonthlyKmGraph /> {/* Displays monthly kilometer data. */}
        <WeeklyBPM /> {/* Displays weekly BPM data. */}
      </div>
      <h3 className={styles.titre}>Cette semaine</h3>
      <p
        className={`${styles.legend} mb-[20]`}
      >{`Du ${formatedStartDate} au ${formatedEndDate}`}</p>
      <div className={styles.graphRow}>
        <GoalPie />
        {/* Displays the weekly activity goal progress as a pie chart. */}
        <PerformanceContainer />
        {/* Displays other performance-related metrics. */}
      </div>
    </div>
  );
}
