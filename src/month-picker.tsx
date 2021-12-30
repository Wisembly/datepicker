import React from 'react';
import { getMonthNameFromNumber } from './util';

export type MonthPickerProps = {
  month: number;
  year: number;
  nextMonth: () => void;
  prevMonth: () => void;
  language?: string;
};

const MonthPicker: React.FC<MonthPickerProps> = ({
  month,
  year,
  nextMonth,
  prevMonth,
  language,
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
          <rect width="256" height="256" fill="none"></rect>
          <polyline
            points="160 208 80 128 160 48"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="14"
          ></polyline>
        </svg>
      </button>
      <p
        className="sdp--text sdp--month-name"
        aria-label={`${getMonthNameFromNumber(
          month, language
        )} ${year} is currently open in Date Picker`}
        tabIndex={0}
      >
        {getMonthNameFromNumber(month, language)} {year}
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
          <rect width="256" height="256" fill="none"></rect>
          <polyline
            points="96 48 176 128 96 208"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="14"
          ></polyline>
        </svg>
      </button>
    </div>
  );
};

export default MonthPicker;
