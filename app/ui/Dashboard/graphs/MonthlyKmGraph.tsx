"use client";

import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import CustomLegend from "../chartElements/CustomLegend";
import { useActivities } from "@/app/context/ActivitiesContext";
import DateArrowButtonsCombo from "@/app/ui/Buttons/DateArrowButtonsCombo";
import {
  getMonthlyActivities,
  splitByWeeks,
  prepareTooltipLabel,
} from "@/app/lib/graph-utils";
import styles from "./MonthlyKmGraph.module.css";
import { useDateRange } from "@/app/hooks/useDateRange";
import CustomTooltip from "../chartElements/CustomTooltip";

/**
 * `MonthlyKmGraph` is a React functional component that displays a bar chart
 * representing the total kilometers run over the last four weeks.
 * It allows navigation through different four-week periods using arrow buttons.
 *
 * @component
 * @returns {JSX.Element} A div element containing the average kilometers, date navigation,
 * legend, and the BarChart.
 */
export default function MonthlyKmGraph() {
  // Access the activities context to get all user activities.
  const { activities } = useActivities();
  // Use the `useDateRange` hook to manage the date range for the graph.
  // It initializes with the current date and a range of 28 days (4 weeks).
  const { startDate, endDate, setEndDate } = useDateRange(new Date(), 28); // 28 days for 4 weeks.

  // Filter activities to get only those within the current monthly (4-week) range.
  const monthlyActivities = getMonthlyActivities(
    activities,
    startDate,
    endDate
  );

  // Split the monthly activities into four weekly segments.
  const weeklyActivities = splitByWeeks(monthlyActivities, startDate, 4);

  // Initialize an array to store the sum of distances for each of the four weeks.
  const sumDistance: number[] = [0, 0, 0, 0];

  // Calculate the total distance for each week.
  for (const [index, week] of weeklyActivities.entries()) {
    week.forEach((activity) => {
      sumDistance[index] += activity.distance;
    });
    // Round the total distance for each week to the nearest integer.
    sumDistance[index] = Math.round(sumDistance[index]);
  }

  // Calculate the mean kilometers per week over the four-week period.
  // `reduce` sums all distances, and the result is divided by the number of weeks.
  const meanKm = Math.floor(
    sumDistance.reduce((a, b) => a + b, 0) / sumDistance.length
  );

  // Prepare the data for the BarChart.
  // Each object represents a week with its name (e.g., "S1"), total kilometers,
  // and a custom label for the tooltip.
  const chartData = sumDistance.map((km, index) => ({
    name: `S${index + 1}`, // Week name (e.g., S1, S2, S3, S4).
    Km: km, // Total kilometers for the week.
    // Custom label for the tooltip, generated based on the start date and week index.
    customLabel: `${prepareTooltipLabel(startDate, index)}`,
  }));

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        {/* Display the calculated mean kilometers per week. */}
        <p className={styles.mean}>{`${meanKm}km en moyenne`}</p>
        {/* Date navigation buttons to shift the 4-week period. */}
        <DateArrowButtonsCombo
          startDate={startDate}
          endDate={endDate}
          onChangeEndDate={setEndDate}
          daysToShift={29}
        />
      </div>
      <p className={styles.legend}>
        Total des kilomètres des 4 dernières semaines
        {/* Legend for the graph. */}
      </p>

      <BarChart data={chartData} width={330} height={310}>
        {/* BarChart component from Recharts. */}
        <CartesianGrid vertical={false} strokeDasharray="2 2" />
        {/* Horizontal grid lines. */}
        {/* Tooltip to display detailed information on hover. `cursor` is set to transparent to avoid interference. */}
        <Tooltip cursor={{ fill: "transparent" }} content={CustomTooltip} />
        <XAxis dataKey="name" tickLine={false} />
        {/* X-axis displaying week names. */}
        <YAxis tickLine={false} /> {/* Y-axis displaying kilometer values. */}
        {/* Custom legend component for styling. */}
        <Legend align="left" content={<CustomLegend />} />
        <Bar
          dataKey="Km" // Data key for the bar values.
          fill="#b6bdfc" // Default fill color for bars.
          barSize={14} // Width of each bar.
          radius={7} // Border radius for the bars.
          // Style for the bar when it's active (hovered).
          activeBar={{ fill: "#0b23f4" }}
        />
      </BarChart>
    </div>
  );
}
