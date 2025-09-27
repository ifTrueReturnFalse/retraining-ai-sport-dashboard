"use client";

import { getSunday, splitByWeeks } from "@/app/lib/graph-utils";
import PerformanceHint from "./PerformanceHint";
import { useDateRange } from "@/app/hooks/useDateRange";
import { useActivities } from "@/app/context/ActivitiesContext";

export default function PerformanceContainer() {
  const { startDate } = useDateRange(getSunday(new Date()), 6);
  const activities = useActivities().activities;

  const weekActivities = splitByWeeks(activities, startDate, 1)[0];

  const activityTime = weekActivities.reduce(
    (time, activity) => time + activity.duration,
    0
  );

  const weekDistance = weekActivities.reduce(
    (distance, activity) => distance + activity.distance,
    0
  );

  return (
    <div className="w-full flex flex-col gap-[15]">
      <PerformanceHint
        value={activityTime}
        legend="Durée d'activité"
        unit="minutes"
        primaryColor="#0b23f4"
        secondaryColor="#b6bdfc"
      />
      <PerformanceHint
        value={weekDistance}
        legend="Distance"
        unit="kilomètres"
        primaryColor="#f4320b"
        secondaryColor="#fcc1b6"
      />
    </div>
  );
}
