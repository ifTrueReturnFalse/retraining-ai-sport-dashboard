import { ActivityType } from "./definitions";

interface CheckResult {
  message: string;
  success: boolean;
}

/**
 * Validates the provided credentials (email and password).
 *
 * This function performs a very basic check:
 * - Ensures that the `email` has at least 2 characters.
 * - Ensures that the `password` has at least 2 characters.
 * - Returns a success flag and an error message if validation fails.
 *
 * @param {string} email - The email address to validate.
 * @param {string} password - The password to validate.
 * @returns {CheckResult} An object containing:
 *  - `success`: `true` if both fields are valid, otherwise `false`.
 *  - `message`: A descriptive error message when validation fails, or an empty string when successful.
 *
 * @example
 * ```ts
 * const result = checkCredentials("user@example.com", "1234");
 * // result => { success: true, message: "" }
 *
 * const fail = checkCredentials("", "pw");
 * // fail => { success: false, message: "Merci de renseigner un email" }
 * ```
 */
export const checkCredentials = (
  email: string,
  password: string
): CheckResult => {
  const result = { success: false, message: "" };
  if (email.length < 2) {
    result.message = "Merci de renseigner un email";
  } else if (password.length < 2) {
    result.message = "Merci de renseigner votre mot de passe";
  } else {
    result.success = true;
  }
  return result;
};

const monthToString = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

/**
 * Converts an ISO date string into a human-readable format.
 *
 * Example: `"2025-09-20"` → `"20 septembre 2025"`.
 *
 * @param date - ISO date string.
 * @returns Formatted date in French.
 */
export const ISOToString = (date: string): string => {
  const realDate = new Date(date);
  return `${realDate.getDate()} ${
    monthToString[realDate.getMonth()]
  } ${realDate.getFullYear()}`;
};

/**
 * Converts a duration in minutes into hours and minutes.
 *
 * @param totalDuration - Duration in minutes.
 * @returns Object containing `hours` and `minutes`.
 */
export function minutesToHoursAndMinutes(totalDuration: number): {
  hours: number;
  minutes: number;
} {
  const hours = Math.floor(totalDuration / 60);
  const minutes = totalDuration % 60;

  return { hours, minutes };
}

/**
 * Calculates total burned calories from a list of activities.
 *
 * - Sums up the `caloriesBurned` property of each activity.
 *
 * @param activityList - List of activities.
 * @returns Total calories burned.
 */
export function burnedCalories(activityList: ActivityType[]): number {
  const burnedCalories = activityList.reduce(
    (totalCalories, activity) => totalCalories + activity.caloriesBurned,
    0
  );

  return burnedCalories;
}

/**
 * Counts the number of "chill days" (days with no activity).
 *
 * - Starts from the `creationDate` up to the current date.
 * - A "chill day" is a day without any recorded activity.
 *
 * @param creationDate - User account creation date (ISO string).
 * @param activityList - List of activities with their dates.
 * @returns Number of days without activity.
 */
export function countChillDays(
  creationDate: string,
  activityList: ActivityType[]
): number {
  const activitiesDate = new Set(activityList.map((activity) => activity.date));

  let chillDays = 0;
  const currentDay = new Date(creationDate);
  const endDay = new Date();

  while (currentDay <= endDay) {
    const dateString = currentDay.toISOString().split("T")[0];
    if (!activitiesDate.has(dateString)) {
      chillDays++;
    }
    currentDay.setDate(currentDay.getDate() + 1);
  }

  return chillDays;
}
