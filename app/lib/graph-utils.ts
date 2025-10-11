import { ActivityType } from "./definitions";

export const dayToString = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export function isBetween(date: Date, start: Date, end: Date): boolean {
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

/**
 * Splits a list of activities into an array of arrays, where each inner array represents activities for a specific week.
 *
 * @param activities - An array of `ActivityType` objects to be split.
 * @param startDate - The starting date for the first week.
 * @param weeks - The number of weeks to split the activities into. Defaults to 4.
 * @returns A 2D array where each sub-array contains `ActivityType` objects for a given week.
 */
export function splitByWeeks(
  activities: ActivityType[],
  startDate: Date,
  weeks = 4
): ActivityType[][] {
  const result: ActivityType[][] = [];
  // Iterate through the specified number of weeks.
  for (let i = 0; i < weeks; i++) {
    // Calculate the start date for the current week.
    const weekStart = new Date(startDate);
    weekStart.setDate(startDate.getDate() + i * 7);

    // Calculate the end date for the current week (6 days after weekStart).
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    // Filter activities that fall within the current week.
    const weekActivities = activities.filter((activity) => {
      return isBetween(new Date(activity.date), weekStart, weekEnd);
    });

    result.push(weekActivities);
  }

  return result;
}

/**
 * Calculates the date of the upcoming Sunday from a given date.
 * If the given date is a Sunday, it returns the same date.
 * The time is set to 23:59:59:999 for the calculated Sunday.
 *
 * @param date - The reference date.
 * @returns A `Date` object representing the upcoming Sunday.
 */
export function getSunday(date: Date): Date {
  const sunday = new Date(date);

  // Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday).
  const day = sunday.getDay();

  // Calculate the difference in days to the next Sunday. If it's Sunday (0), the difference is 0.
  const diffToSunday = day === 0 ? 0 : 7 - day;

  // Add the difference to the current date to get Sunday.
  sunday.setDate(sunday.getDate() + diffToSunday);
  sunday.setHours(23, 59, 59, 999);

  return sunday;
}
/**
 * Prepares a formatted string for a tooltip label, representing a week range.
 * The format is "DD.MM au DD.MM".
 *
 * @param baseDate - The starting date from which the week ranges are calculated.
 * @param weekIndex - The index of the week (0 for the first week, 1 for the second, etc.).
 * @returns A string representing the formatted date range for the specified week.
 */
export function prepareTooltipLabel(baseDate: Date, weekIndex: number): string {
  const startDate = new Date(baseDate);
  startDate.setDate(startDate.getDate() + weekIndex * 7);
  const endDate = new Date(baseDate);
  endDate.setDate(endDate.getDate() + 6 + weekIndex * 7);

  return `${startDate
    .toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })
    .replace("/", ".")} au ${endDate
    .toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })
    .replace("/", ".")}`;
}
