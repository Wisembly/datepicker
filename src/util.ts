const MONTHS: { [key: number]: string } = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
};

const MOIS: { [key: number]: string } = {
  0: 'janvier',
  1: 'février',
  2: 'mars',
  3: 'avril',
  4: 'mai',
  5: 'juin',
  6: 'juillet',
  7: 'août',
  8: 'septembre',
  9: 'octobre',
  10: 'novembre',
  11: 'décembre',
};

export const getMonthNameFromNumber = (month: number, language?: string): string => {
  if (month < 0 || month > 11) {
    throw new Error(`Invalid month number: ${month}`);
  }
  return language == "fr" ? MOIS[month] : MONTHS[month];
};

export const getDatesOfMonth = (date: Date): { d: Date; active: boolean; inMonth: boolean }[] => {
  // generate dates of each week of the month including the residue dates
  // of the last week of previous month and first week of next month
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 0);
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const firstDayOfMonthWeekDay = firstDayOfMonth.getDay();
  const lastDayOfMonthWeekDay = lastDayOfMonth.getDay();

  const previousMonth = new Date(date.getFullYear(), date.getMonth(), 0);
  const previousMonthLastDay = new Date(
    previousMonth.getFullYear(),
    previousMonth.getMonth() + 1,
    0
  );

  const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const dates: { d: Date; active: boolean; inMonth: boolean }[] = [];

  for (let i = 0; i < firstDayOfMonthWeekDay; i++) {
    dates.push({
      d: new Date(
        previousMonth.getFullYear(),
        previousMonth.getMonth(),
        previousMonthLastDay.getDate() - firstDayOfMonthWeekDay + i + 1
      ),
      active: false,
      inMonth: false,
    });
  }

  for (let i = 0; i < lastDayOfMonth.getDate(); i++) {
    dates.push({
      d: new Date(date.getFullYear(), date.getMonth(), i + 1),
      active: true,
      inMonth: true,
    });
  }

  for (let i = 0; i < 6 - lastDayOfMonthWeekDay; i++) {
    dates.push({
      d: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i + 1),
      active: false,
      inMonth: false,
    });
  }

  return dates;
};
