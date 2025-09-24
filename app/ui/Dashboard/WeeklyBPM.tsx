"use client";

import { useActivities } from "@/app/context/ActivitiesContext";
import { useState, useEffect } from "react";
import DateArrowButtonsCombo from "@/app/ui/Buttons/DateArrowButtonsCombo";
import { getSunday, isBetween, dayToString } from "@/app/lib/graph-utils";
import {
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Line,
  Legend,
  CartesianGrid,
} from "recharts";
import CustomLegend from "./CustomLegend";
import styles from "./WeeklyBPM.module.css";

export default function WeeklyBPM() {
  const activities = useActivities();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(getSunday(new Date()));

  const weekActivities = activities.activities.filter((activity) => {
    const date = new Date(activity.date);
    return isBetween(date, startDate, endDate);
  });

  const chartData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const isoDate = date.toISOString().split("T")[0];

    const activity = weekActivities.find((a) => a.date === isoDate);

    return {
      name: dayToString[i],
      Min: activity?.heartRate.min ?? null,
      Max: activity?.heartRate.max ?? null,
      Moyenne: activity?.heartRate.average ?? null,
    };
  });

  const meanBpm = Math.floor(
    weekActivities.reduce((a, b) => a + b.heartRate.average, 0) /
      weekActivities.length
  );

  useEffect(() => {
    const newStartDate = new Date(endDate);
    newStartDate.setDate(endDate.getDate() - 6);
    setStartDate(newStartDate);
  }, [endDate]);

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <p className={styles.mean}>{`${isNaN(meanBpm) ? 0 : meanBpm} BPM`}</p>
        
        <DateArrowButtonsCombo
          startDate={startDate}
          endDate={endDate}
          onChangeEndDate={setEndDate}
          daysToShift={7}
        />
      </div>

      <p className={styles.legend}>Fréquence cardiaque moyenne</p>

      <ComposedChart width={505} height={310} data={chartData}>
        <CartesianGrid vertical={false} strokeDasharray="2 2" />
        <XAxis dataKey="name" tickLine={false} />
        <YAxis tickLine={false} domain={['dataMin - 10', 'dataMax + 10']} />
        <Tooltip />
        <Legend align="left" content={<CustomLegend />} />
        <Bar dataKey="Min" fill="#fcc1b6" barSize={14} radius={[7, 7, 7, 7]} />
        <Bar dataKey="Max" fill="#f4320b" barSize={14} radius={[7, 7, 7, 7]} />
        <Line
          dataKey="Moyenne"
          type="monotone"
          connectNulls
          strokeWidth={3}
          stroke="#f2f3ff"
          dot={{ stroke: "white", fill: "#0b23f4", strokeWidth: 1, r: 4 }}
        />
      </ComposedChart>
    </div>
  );
}
