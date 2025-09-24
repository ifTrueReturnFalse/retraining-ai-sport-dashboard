import { useEffect, useState } from "react";

export function useDateRange(
  initialDate: Date = new Date(),
  daysBack: number = 6
) {
  const [endDate, setEndDate] = useState(initialDate);
  const [startDate, setStartDate] = useState(() => {
    const date = new Date(initialDate);
    date.setDate(date.getDate() - daysBack);
    return date;
  });

  useEffect(() => {
    const newStartDate = new Date(endDate);
    newStartDate.setDate(endDate.getDate() - daysBack);
    setStartDate(newStartDate);
  }, [endDate, daysBack]);

  return { startDate, endDate, setEndDate };
}
