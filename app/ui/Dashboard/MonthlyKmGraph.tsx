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
import CustomLegend from "./chartElements/CustomLegend";
import { useActivities } from "@/app/context/ActivitiesContext";
import DateArrowButtonsCombo from "@/app/ui/Buttons/DateArrowButtonsCombo";
import { getMonthlyActivities, splitByWeeks, prepareTooltipLabel } from "@/app/lib/graph-utils";
import styles from "./MonthlyKmGraph.module.css";
import { useDateRange } from "@/app/hooks/useDateRange";
import CustomTooltip from "./chartElements/CustomTooltip";

export default function MonthlyKmGraph() {
  const activities = useActivities();
  const { startDate, endDate, setEndDate } = useDateRange(new Date(), 27);

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
    sumDistance[i] = Math.round(sumDistance[i]);
  }

  const meanKm = Math.floor(
    sumDistance.reduce((a, b) => a + b, 0) / sumDistance.length
  );

  const chartData = sumDistance.map((km, i) => ({
    name: `S${i + 1}`,
    Km: km,
    customLabel: `${prepareTooltipLabel(startDate, i)}`,
  }));

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
      <p className={styles.legend}>
        Total des kilomètres des 4 dernières semaines
      </p>

      <BarChart data={chartData} width={330} height={310}>
        <CartesianGrid vertical={false} strokeDasharray="2 2" />
        <Tooltip cursor={{fill: 'transparent'}}  content={CustomTooltip} />
        <XAxis dataKey="name" tickLine={false} />
        <YAxis tickLine={false} />
        <Legend align="left" content={<CustomLegend />} />
        <Bar
          dataKey="Km"
          fill="#b6bdfc"
          barSize={14}
          radius={7}
          activeBar={{fill: "#0b23f4"}}
        />
      </BarChart>
    </div>
  );
}
