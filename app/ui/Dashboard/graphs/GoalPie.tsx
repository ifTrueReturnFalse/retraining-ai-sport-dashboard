"use client";

import { useDateRange } from "@/app/hooks/useDateRange";
import { useActivities } from "@/app/context/ActivitiesContext";
import { PieChart, Pie, Cell } from "recharts";
import { getSunday, splitByWeeks } from "@/app/lib/graph-utils";
import styles from "./GoalPie.module.css";

interface LabelProps {
  x: number;
  y: number;
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  midAngle: number;
  name?: string;
  value: number;
  color: string;
}

const renderCustomLabel = (props: unknown) => {
  const { cx, cy, outerRadius, midAngle, name, value, color } =
    props as LabelProps;

  if (value == 0) return null;

  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 15;
  const xCalc = cx + radius * Math.cos(-midAngle * RADIAN);
  const yCalc = cy + radius * Math.sin(-midAngle * RADIAN);
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

export default function ObjectifPie() {
  const { startDate } = useDateRange(getSunday(new Date()), 6);
  const activities = useActivities().activities;

  const weekActivities = splitByWeeks(activities, startDate, 1)[0].length;
  const activitiesObjective = 6;
  const remainingActivities = activitiesObjective - weekActivities;

  const chartData = [
    { name: "done", value: weekActivities, color: "#0b23f4" },
    { name: "remaining", value: remainingActivities, color: "#b6bdfc" },
  ];

  return (
    <div className={styles.container}>
      <p className={styles.objectiveTracker}>
        <span className={styles.counter}>{`x${weekActivities}`}</span>&nbsp;
        <span>sur objectif de {activitiesObjective}</span>
      </p>
      <p className={styles.legend}>Courses hebdomadaire réalisées</p>
      <PieChart height={190} width={305} className="m-auto">
        <Pie
          data={chartData}
          dataKey="value"
          label={renderCustomLabel}
          labelLine={false}
          outerRadius={80}
          innerRadius={40}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}
