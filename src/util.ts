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

export const getDatesOfMonth = (date: Date, language?: string): { d: Date; active: boolean;  }[] => {
  // generate dates of each week of the month including the residue dates
  // of the last week of previous month and first week of next month
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);


  const dates: { d: Date; active: boolean }[] = [];



  for (let i = 0; i < lastDayOfMonth.getDate(); i++) {
    dates.push({
      d: new Date(date.getFullYear(), date.getMonth(), i + (language === "fr" ? 2 : 1)),
      active: true,
    });
  }

  return dates;
};
