import { ArrowButton } from "./Buttons";
import { dateToShortString } from "@/app/lib/utils";
import styles from "./DateArrowButtonsCombo.module.css";

interface DateArrowButtonsComboProps {
  startDate: Date;
  endDate: Date;
  onChangeEndDate: (date: Date) => void;
  daysToShift: number;
}

export default function DateArrowButtonsCombo({
  startDate,
  endDate,
  onChangeEndDate,
  daysToShift,
}: DateArrowButtonsComboProps) {
  const handlePrev = () => {
    const newDate = new Date(endDate);
    newDate.setDate(endDate.getDate() - daysToShift);
    onChangeEndDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(endDate);
    newDate.setDate(endDate.getDate() + daysToShift);
    onChangeEndDate(newDate);
  };

  return (
    <div className={styles.container}>
      <ArrowButton direction="left" onClick={handlePrev} />
      <p className={styles.dates}>
        <span>{dateToShortString(startDate)} -&nbsp;</span> <span>{dateToShortString(endDate)}</span>
      </p>
      <ArrowButton direction="right" onClick={handleNext} />
    </div>
  );
}
