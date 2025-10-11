"use client";

import { useDateRange } from "@/app/hooks/useDateRange";
import { useActivities } from "@/app/context/ActivitiesContext";
import { PieChart, Pie, Cell } from "recharts";
import { getSunday, splitByWeeks } from "@/app/lib/graph-utils";
import styles from "./GoalPie.module.css";

interface LabelProps {
  /**
 * The x-coordinate of the label.
 */
  x: number;
  /**
 * The y-coordinate of the label.
 */
  y: number;
  /**
 * The x-coordinate of the center of the pie chart.
 */
  cx: number;
  /**
 * The y-coordinate of the center of the pie chart.
 */
  cy: number;
  innerRadius: number;
  outerRadius: number;
  midAngle: number;
  /**
 * The name of the data entry (e.g., "done", "remaining").
 */
  name?: string;
  /**
 * The value of the data entry.
 */
  value: number;
  color: string;
}

const renderCustomLabel = (props: unknown) => {
  const { cx, cy, outerRadius, midAngle, name, value, color } =
    props as LabelProps;

  // Do not render the label if the value is 0.
  if (value == 0) return null;

  // Convert degrees to radians for trigonometric calculations.
  const RADIAN = Math.PI / 180;
  // Calculate the radius for positioning the label, slightly outside the pie slice.
  const radius = outerRadius + 15;
  // Calculate the x-coordinate for the label's position.
  const xCalc = cx + radius * Math.cos(-midAngle * RADIAN);
  // Calculate the y-coordinate for the label's position.
  const yCalc = cy + radius * Math.sin(-midAngle * RADIAN);
  // Adjust x-offset to prevent labels from overlapping the pie chart,
  // especially when positioned on the left side.
  const offsetX = xCalc < cx / 2 ? 50 : 0;

  return (
    <>
      <circle r={6} cx={xCalc - offsetX} cy={yCalc - 3} fill={color}></circle>
      <text x={xCalc + 10 - offsetX} y={yCalc} style={{ fontSize: "10px" }}>
        {`${value} ${name === "done" ? "réalisé" : "restant"}${
          value > 1 ? "s" : ""
        }`}
      </text>
    </>
  );
};

/**
 * `GoalPie` is a React functional component that displays a pie chart
 * representing the user's weekly activity goal progress.
 * It shows the number of activities done versus the remaining activities to reach the goal.
 *
 * @component
 * @returns {JSX.Element} A div element containing the goal tracker, legend, and the PieChart.
 */
export default function GoalPie() {
  // Get the start date for the current week (Sunday) using the useDateRange hook.
  const { startDate } = useDateRange(getSunday(new Date()), 6);
  // Get all activities from the ActivitiesContext.
  const activities = useActivities().activities;

  // Filter activities for the current week and count them.
  const weekActivities = splitByWeeks(activities, startDate, 1)[0].length;
  // Define the weekly activity objective.
  const activitiesObjective = 6;
  // Calculate the number of remaining activities to reach the objective.
  const remainingActivities = activitiesObjective - weekActivities;

  // Prepare data for the PieChart.
  const chartData = [
    // Data for completed activities.
    { name: "done", value: weekActivities, color: "#0b23f4" },
    // Data for remaining activities.
    { name: "remaining", value: remainingActivities, color: "#b6bdfc" },
  ];

  return (
    <div className={styles.container}>
      {/* Display the current progress towards the weekly objective. */}
      <p className={styles.objectiveTracker}>
        <span className={styles.counter}>{`x${weekActivities}`}</span>&nbsp;
        <span>sur objectif de {activitiesObjective}</span>
      </p>
      <p className={styles.legend}>Courses hebdomadaire réalisées</p>
      <PieChart height={190} width={305} className="m-auto">
        <Pie
          data={chartData} // Data to be displayed in the pie chart.
          dataKey="value" // Key to access the value for each slice.
          label={renderCustomLabel} // Custom label rendering function.
          labelLine={false} // Do not display lines connecting labels to slices.
          outerRadius={80} // Outer radius of the pie chart.
          innerRadius={40} // Inner radius of the pie chart, creating a donut effect.
        >
          {/* Map through chartData to render each slice (Cell) with its corresponding color. */}
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}
