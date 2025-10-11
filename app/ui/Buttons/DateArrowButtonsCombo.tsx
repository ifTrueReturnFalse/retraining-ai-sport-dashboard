import { ArrowButton } from "./Buttons";
import { dateToShortString } from "@/app/lib/utils";
import styles from "./DateArrowButtonsCombo.module.css";

interface DateArrowButtonsComboProps {
  /**
   * The start date to be displayed.
   */
  startDate: Date;
  /**
   * The end date to be displayed and manipulated.
   */
  endDate: Date;
  /**
   * Callback function to update the `endDate` when navigation buttons are clicked.
   * @param {Date} date - The new end date.
   */
  onChangeEndDate: (date: Date) => void;
  /**
   * The number of days to shift the `endDate` by when navigating.
   */
  daysToShift: number;
}

/**
 * `DateArrowButtonsCombo` is a component that displays a date range
 * and provides arrow buttons to navigate through different date periods.
 * It allows shifting the `endDate` by a specified number of days.
 *
 * @component
 * @param {DateArrowButtonsComboProps} props - The properties for the component.
 * @returns {JSX.Element} A combination of arrow buttons and a date range display.
 */
export default function DateArrowButtonsCombo({
  startDate,
  endDate,
  onChangeEndDate,
  daysToShift,
}: DateArrowButtonsComboProps) {
  /**
   * Handles the click event for the "previous" arrow button.
   * Decrements the `endDate` by `daysToShift` and calls `onChangeEndDate`.
   */
  const handlePrev = () => {
    // Create a new Date object to avoid mutating the original `endDate` prop.
    const newDate = new Date(endDate);
    // Subtract `daysToShift` from the current end date.
    newDate.setDate(endDate.getDate() - daysToShift);
    onChangeEndDate(newDate);
  };

  /**
   * Handles the click event for the "next" arrow button.
   * Increments the `endDate` by `daysToShift` and calls `onChangeEndDate`.
   */
  const handleNext = () => {
    const newDate = new Date(endDate);
    newDate.setDate(endDate.getDate() + daysToShift);
    onChangeEndDate(newDate);
  };

  return (
    <div className={styles.container}>
      {/* Left arrow button to navigate to previous period */}
      <ArrowButton direction="left" onClick={handlePrev} />
      <p className={styles.dates}>
        {/* Display the formatted start and end dates */}
        <span>{dateToShortString(startDate)} -&nbsp;</span>{" "}
        <span>{dateToShortString(endDate)}</span>
      </p>
      {/* Right arrow button to navigate to next period */}
      <ArrowButton direction="right" onClick={handleNext} />
    </div>
  );
}
