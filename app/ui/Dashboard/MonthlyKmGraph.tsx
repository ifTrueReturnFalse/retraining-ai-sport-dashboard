"use client";

import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useActivities } from "@/app/context/ActivitiesContext";
import { useEffect, useState } from "react";
import DateArrowButtonsCombo from "@/app/ui/Buttons/DateArrowButtonsCombo";
import { getMonthlyActivities, splitByWeeks } from "@/app/lib/graph-utils";
import styles from './MonthlyKmGraph.module.css'

export default function MonthlyKmGraph() {
  const activities = useActivities();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const monthly = getMonthlyActivities(
    activities.activities,
    startDate,
    endDate
  );

  const weekly = splitByWeeks(monthly, startDate, 4);

  const sumDistance = [0, 0, 0, 0];

  for (const [i, week] of weekly.entries()) {
    week.forEach((activity) => {
      sumDistance[i] += activity.distance;
    });
  }

  const meanKm = Math.floor(
    sumDistance.reduce((a, b) => a + b, 0) / sumDistance.length
  );

  const chartData = sumDistance.map((km, i) => ({
    name: `S${i + 1}`,
    km,
  }));

  useEffect(() => {
    const newStartDate = new Date(endDate);
    newStartDate.setDate(endDate.getDate() - 28);
    setStartDate(newStartDate);
  }, [endDate]);

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <p className={styles.mean}>{`${meanKm}km en moyenne`}</p>
        <DateArrowButtonsCombo
          startDate={startDate}
          endDate={endDate}
          onChangeEndDate={setEndDate}
          daysToShift={28}
        />
      </div>
      <p className={styles.legend}>Total des kilomètres des 4 dernières semaines</p>

      <BarChart data={chartData} width={330} height={310}>
        <CartesianGrid vertical={false} strokeDasharray="2 2" />
        <Tooltip />
        <XAxis dataKey="name" tickLine={false}  />
        <YAxis tickLine={false} />
        <Legend align="left" iconType="circle" />
        <Bar dataKey="km" fill="#b6bdfc" barSize={14} radius={[7, 7, 7, 7]} />
      </BarChart>
    </div>
  );
}
