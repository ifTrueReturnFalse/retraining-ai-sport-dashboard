import { ActivityType } from "./definitions";

function isBetween(date: Date, start: Date, end: Date): boolean {
  return date >= start && date <= end;
}

export function getMonthlyActivities(
  activities: ActivityType[],
  startDate: Date,
  endDate: Date
): ActivityType[] {
  return activities.filter((activity) =>
    isBetween(new Date(activity.date), startDate, endDate)
  );
}

export function splitByWeeks(
  activities: ActivityType[],
  startDate: Date,
  weeks = 4
): ActivityType[][] {
  const result: ActivityType[][] = [];

  for (let i = 0; i < weeks; i++) {
    const weekStart = new Date(startDate);
    weekStart.setDate(startDate.getDate() + i * 7);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const weekActivities = activities.filter((activity) => {
      return isBetween(new Date(activity.date), weekStart, weekEnd);
    });

    result.push(weekActivities);
  }

  return result;
}
