import { useEffect, useState } from "react";

/**
 * A custom hook to manage a date range, specifically a start date and an end date.
 * The start date is calculated based on the end date and a specified number of days back.
 *
 * @param initialDate The initial date to set as the end date. Defaults to the current date.
 * @param daysBack The number of days to go back from the `endDate` to calculate the `startDate`. Defaults to 6.
 * @returns An object containing:
 * - `startDate`: The calculated start date.
 * - `endDate`: The current end date.
 * - `setEndDate`: A function to update the end date, which in turn recalculates the start date.
 */
export function useDateRange(
  initialDate: Date = new Date(),
  daysBack: number = 6
) {
  // State for the end date of the range. It defaults to the `initialDate` provided.
  const [endDate, setEndDate] = useState(initialDate);

  // State for the start date of the range.
  // It's initialized by calculating `daysBack` from the `initialDate`.
  const [startDate, setStartDate] = useState(() => {
    // Create a new Date object from `initialDate` to avoid modifying the original.
    const date = new Date(initialDate);
    // Subtract `daysBack` from the date to get the initial start date.
    date.setDate(date.getDate() - daysBack);
    return date;
  });

  /**
   * `useEffect` hook to recalculate the `startDate` whenever `endDate` or `daysBack` changes.
   * This ensures that the `startDate` always reflects the correct range relative to the `endDate`.
   */
  useEffect(() => {
    // Create a new Date object from `endDate` to perform calculations without side effects on `endDate`.
    const newStartDate = new Date(endDate);
    // Set the new start date by subtracting `daysBack` from the current `endDate`.
    newStartDate.setDate(endDate.getDate() - daysBack);
    // Update the `startDate` state with the newly calculated date.
    setStartDate(newStartDate);
  }, [endDate, daysBack]);

  return { startDate, endDate, setEndDate };
}
