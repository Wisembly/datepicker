import React from 'react';
import { getMonthNameFromNumber } from './util';

export type MonthPickerProps = {
  month: number;
  year: number;
  nextMonth: () => void;
  prevMonth: () => void;
};

const MonthPicker: React.FC<MonthPickerProps> = ({
  month,
  year,
  nextMonth,
  prevMonth,
}) => {
  return (
    <div className="sdp--month-picker">
      <button
        className="sdp--square-btn sdp--square-btn__shadowed"
        onClick={prevMonth}
        aria-label="Go to previous month"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
        </svg>
      </button>
      <p
        className="sdp--text sdp--month-name"
        aria-label={`${getMonthNameFromNumber(
          month
        )} ${year} is currently open in Date Picker`}
        tabIndex={0}
      >
        {getMonthNameFromNumber(month)} {year}
      </p>
      <button
        className="sdp--square-btn sdp--square-btn__shadowed"
        onClick={nextMonth}
        aria-label="Go to next month"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
        </svg>
      </button>
    </div>
  );
};

export default MonthPicker;
