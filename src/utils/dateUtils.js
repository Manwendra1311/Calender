import { startOfMonth, endOfMonth, eachDayOfInterval, format } from "date-fns";
export const generateMonthDays = (currentDate) => {
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  return eachDayOfInterval({ start, end });
};

export const formatDate = (date) => format(date, "yyyy-MM-dd");
