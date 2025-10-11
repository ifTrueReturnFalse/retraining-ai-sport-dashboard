"use client";

import { useActivities } from "@/app/context/ActivitiesContext";
import DateArrowButtonsCombo from "@/app/ui/Buttons/DateArrowButtonsCombo";
import { getSunday, isBetween, dayToString } from "@/app/lib/graph-utils";
import {
  ComposedChart,
  XAxis,
  YAxis,
  Bar,
  Line,
  Legend,
  CartesianGrid,
} from "recharts";
import CustomLegend from "../chartElements/CustomLegend";
import styles from "./WeeklyBPM.module.css";
import { useDateRange } from "@/app/hooks/useDateRange";
import { useState } from "react";

/**
 * `WeeklyBPM` is a React functional component that displays a composed chart
 * showing the minimum, maximum, and average heart rates over a 7-day period.
 * It allows navigation through different weekly periods using arrow buttons.
 *
 * @component
 * @returns {JSX.Element} A div element containing the average BPM, date navigation,
 * legend, and the ComposedChart.
 */
export default function WeeklyBPM() {
  // Access the activities context to get all user activities.
  const activities = useActivities();
  // Use the `useDateRange` hook to manage the date range for the graph.
  // It initializes with the current Sunday and a range of 6 days (for a full week).
  const { startDate, endDate, setEndDate } = useDateRange(
    getSunday(new Date()),
    6
  );
  // State to track if the chart is being hovered over, used for dynamic styling.
  const [hover, setHover] = useState(false);

  // Filter activities to get only those within the current 7-day (weekly) range.
  const weekActivities = activities.activities.filter((activity) => {
    const date = new Date(activity.date);
    // `isBetween` checks if the activity date falls within the `startDate` and `endDate`.
    return isBetween(date, startDate, endDate);
  });

  // Prepare the data for the ComposedChart.
  // It creates an array of 7 objects, one for each day of the week.
  const chartData = Array.from({ length: 7 }, (_, i) => {
    // Calculate the date for the current day in the week.
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    // Format the date to ISO string (e.g., "YYYY-MM-DD") for comparison with activity dates.
    const isoDate = date.toISOString().split("T")[0];

    // Find the activity that matches the current day's date.
    const activity = weekActivities.find((a) => a.date === isoDate);

    return {
      name: dayToString[i], // Day name (e.g., "Lun", "Mar").
      Min: activity?.heartRate.min ?? null, // Minimum heart rate for the day, or null if no activity.
      Max: activity?.heartRate.max ?? null, // Maximum heart rate for the day, or null if no activity.
      Moyenne: activity?.heartRate.average ?? null, // Average heart rate for the day, or null if no activity.
    };
  });

  // Calculate the mean BPM for all activities within the current week.
  // `reduce` sums all average heart rates, and the result is divided by the number of activities.
  // `Math.floor` rounds down the result.
  // `isNaN(meanBpm)` checks if the result is "Not a Number" (e.g., if `weekActivities.length` is 0),
  // in which case it defaults to 0.
  const meanBpm = Math.floor(
    weekActivities.reduce((a, b) => a + b.heartRate.average, 0) /
      weekActivities.length
  );

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        {/* Display the calculated mean BPM for the week. */}
        <p className={styles.mean}>{`${isNaN(meanBpm) ? 0 : meanBpm} BPM`}</p>

        {/* Date navigation buttons to shift the 7-day period. */}
        <DateArrowButtonsCombo
          startDate={startDate}
          endDate={endDate}
          onChangeEndDate={setEndDate}
          daysToShift={7} // Shift by 7 days (one week) at a time.
        />
      </div>

      {/* Legend for the graph. */}
      <p className={styles.legend}>Fréquence cardiaque moyenne</p>

      <ComposedChart
        width={505}
        height={310}
        data={chartData}
        // Set `hover` state to true when mouse enters the chart area.
        onMouseEnter={() => setHover(true)}
        // Set `hover` state to false when mouse leaves the chart area.
        onMouseLeave={() => setHover(false)}
      >
        <CartesianGrid vertical={false} strokeDasharray="2 2" />{" "}
        {/* Horizontal grid lines. */}
        <XAxis dataKey="name" tickLine={false} />{" "}
        {/* X-axis displaying day names. */}
        <YAxis
          tickLine={false}
          domain={["dataMin - 10", "dataMax + 10"]}
        />{" "}
        {/* Y-axis displaying BPM values, with a dynamic domain. */}
        <Legend align="left" content={<CustomLegend />} />{" "}
        {/* Custom legend component for styling. */}
        <Bar dataKey="Min" fill="#fcc1b6" barSize={14} radius={7} />{" "}
        {/* Bar for minimum heart rate. */}
        <Bar dataKey="Max" fill="#f4320b" barSize={14} radius={7} />{" "}
        {/* Bar for maximum heart rate. */}
        <Line
          dataKey="Moyenne"
          type="monotone"
          connectNulls
          strokeWidth={3}
          stroke={hover ? "#0b23f4" : "#f2f3ff"}
          dot={{ stroke: "white", fill: "#0b23f4", strokeWidth: 1, r: 4 }}
          // Line for average heart rate, with dynamic stroke color on hover.
        />
      </ComposedChart>
    </div>
  );
}
