"use client";

import { getSunday, splitByWeeks } from "@/app/lib/graph-utils";
import PerformanceHint from "./PerformanceHint";
import { useDateRange } from "@/app/hooks/useDateRange";
import { useActivities } from "@/app/context/ActivitiesContext";

/**
 * `PerformanceContainer` is a React functional component that displays
 * key performance indicators (KPIs) for the current week, such as
 * total activity duration and total distance covered.
 * It utilizes `PerformanceHint` components to present these metrics.
 *
 * @component
 * @returns {JSX.Element} A div element containing two `PerformanceHint` components
 * for weekly activity duration and distance.
 */
export default function PerformanceContainer() {
  // Get the start date for the current week (Sunday) using the useDateRange hook.
  // The range is set to 6 days to cover a full week (Sunday to Saturday).
  const { startDate } = useDateRange(getSunday(new Date()), 6);
  // Get all activities from the ActivitiesContext.
  const activities = useActivities().activities;

  // Filter activities to get only those within the current week.
  // `splitByWeeks` is used with `numberOfWeeks = 1` to get activities for the current week.
  const weekActivities = splitByWeeks(activities, startDate, 1)[0];

  // Calculate the total duration of all activities in the current week.
  // `reduce` sums the `duration` property of each activity.
  const activityTime = weekActivities.reduce(
    (time, activity) => time + activity.duration,
    0
  );

  // Calculate the total distance of all activities in the current week.
  // `reduce` sums the `distance` property of each activity.
  const weekDistance = weekActivities.reduce(
    (distance, activity) => distance + activity.distance,
    0
  );

  return (
    <div className="w-full flex flex-col gap-[15]">
      {/* Container for the performance hints, arranged vertically with a gap. */}
      <PerformanceHint
        value={activityTime}
        legend="Durée d'activité"
        unit="minutes"
        primaryColor="#0b23f4"
        secondaryColor="#b6bdfc"
      />
      {/*
       * `PerformanceHint` component for displaying the total activity duration.
       * - `value`: The calculated `activityTime`.
       * - `legend`: Descriptive text for the metric.
       * - `unit`: The unit of measurement ("minutes").
       * - `primaryColor`: Color for the main value.
       * - `secondaryColor`: Color for the unit.
       */}
      <PerformanceHint
        value={weekDistance}
        legend="Distance"
        unit="kilomètres"
        primaryColor="#f4320b"
        secondaryColor="#fcc1b6"
      />
      {/*
       * `PerformanceHint` component for displaying the total distance covered.
       * - `value`: The calculated `weekDistance`.
       * - `legend`: Descriptive text for the metric.
       * - `unit`: The unit of measurement ("kilomètres").
       * - `primaryColor`: Color for the main value.
       * - `secondaryColor`: Color for the unit.
       */}
    </div>
  );
}
