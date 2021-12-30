import * as React from 'react';

import MonthPicker from './month-picker';
import DateButton from './date-button';
import { getDatesOfMonth } from './util';
import './styles.css';

export type DatePickerProps = {
  /**
   * This function is called when the selected date is changed.
   */
  onChange?: (date: Date) => void;
  /**
   * The selected date.
   */
  selected?: Date;
  /**
   * The minimum date that can be selected (inclusive).
   */
  minDate?: Date;
  /**
   * The maximum date that can be selected (inclusive).
   */
  maxDate?: Date;
  /**
   * The color that will be use to color the day choosen.
   */
  color?: string;
  /**
   * The language used to show the date.
   */
  language?: string;

} & React.PropsWithRef<
  Omit<React.HTMLProps<HTMLDivElement>, 'onChange' | 'selected'>
>;

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      onChange,
      selected = new Date(),
      minDate = new Date(1900, 0, 1),
      maxDate,
      className,
      color,
      language,
      ...props
    },
    ref
  ) => {
    const minDateVal = minDate.getTime();
    const maxDateVal =
      typeof maxDate === 'undefined'
        ? Number.POSITIVE_INFINITY
        : maxDate.getTime();

    const [monthDate, setMonthDate] = React.useState<Date>(selected);
    const [selectedDate, setSelectedDate] = React.useState<Date>(selected);

    const nextMonth = React.useCallback(
      () =>
        setMonthDate(d => {
          const m = d.getMonth();
          const y = d.getFullYear();
          if (m === 11) {
            return new Date(y + 1, 0);
          } else {
            return new Date(y, m + 1);
          }
        }),
      [monthDate]
    );

    const prevMonth = React.useCallback(
      () =>
        setMonthDate(d => {
          const m = d.getMonth();
          const y = d.getFullYear();
          if (m === 0) {
            return new Date(y - 1, 11);
          } else {
            return new Date(y, m - 1);
          }
        }),
      [monthDate]
    );

    const setNewSelectedDate = (date: Date) => {
      setSelectedDate(date);
      onChange?.(date);
    };

    if (
      process.env.NODE_ENV !== 'production' &&
      (selected.getTime() > maxDateVal || selected.getTime() < minDateVal)
    ) {
      console.warn(
        'Selected date must fall in the range of maxDate and minDate'
      );
    }

    return (
      <div
        className={`sdp ${className}`}
        aria-label="Date Picker"
        tabIndex={0}
        ref={ref}
        {...props}
      >
        <MonthPicker
          month={monthDate.getMonth()}
          year={monthDate.getFullYear()}
          nextMonth={nextMonth}
          prevMonth={prevMonth}
          language={language}
        />
        <div className="sdp--dates-grid">
          <p className="sdp--text sdp--text__inactive">{language === "fr" ? "lu" : "Su"}</p>
          <p className="sdp--text sdp--text__inactive">{language === "fr" ? "ma" : "Mo"}</p>
          <p className="sdp--text sdp--text__inactive">{language === "fr" ? "me" : "Th"}</p>
          <p className="sdp--text sdp--text__inactive">{language === "fr" ? "je" : "We"}</p>
          <p className="sdp--text sdp--text__inactive">{language === "fr" ? "ve" : "Tu"}</p>
          <p className="sdp--text sdp--text__inactive">{language === "fr" ? "sa" : "Fr"}</p>
          <p className="sdp--text sdp--text__inactive">{language === "fr" ? "di" : "Sa"}</p>
          {getDatesOfMonth(monthDate, language).map(({ d, active, inMonth }) => {
            const dVal = d.getTime();

            return (
              inMonth ? 
              <DateButton
                key={dVal}
                date={d}
                active={dVal >= minDateVal && dVal <= maxDateVal && active}
                selected={selectedDate.toDateString() === d.toDateString()}
                onClick={setNewSelectedDate}
                color={color || ""}
              />
              :
              <div/>
            );
          })}
        </div>
      </div>
    );
  }
);

export default DatePicker;
