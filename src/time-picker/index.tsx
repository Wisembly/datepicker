import React from 'react';
import CustomSelect, { OptionType } from './custom-select';

import './styles.css';

/**
 * Time type
 */
export type Time = {
  hours: number;
  minutes: number;
};

/**
 * Props for TimePicker React Component
 */
export type TimePickerProps = {
  /**
   * This function is called when the selected date is changed.
   */
  onChange?: (time: Time) => void;
  /**
   * The selected date.
   */
  selected?: Time;
  /**
   * The minimum time that can be selected - 0 to 23 (inclusive).
   */
  minTime?: Time;
  /**
   * The maximum time that can be selected - 0 to 23 (inclusive).
   */
  maxTime?: Time;
  /**
   * The number of minutes between each minute select option - default is 30
   */
  minutesInterval?: number;
} & React.PropsWithRef<
  Omit<React.HTMLProps<HTMLDivElement>, 'onChange' | 'selected'>
>;

/**
 *
 * @param time {Time} The time value
 * @param interval {number} The interval between each minute select option
 * @returns {Time} Time value rounded to the nearest interval
 */
const alignTime = ({ hours, minutes }: Time, interval: number): Time => {
  // round minutes to nearest interval
  if (minutes % interval !== 0) {
    minutes = minutes - (minutes % interval);
  }
  return {
    hours,
    minutes,
  };
};

// TODO: max-min time validation on update
// TODO: max-min time disabled option correct logic

/**
 * Compares two time values and returns true if a is greater than b
 *
 * @param {Time} Time value a
 * @param {Time} Time value b
 * @returns {boolean} If a is greater than b
 */
const greaterThan = (a: Time, b: Time): boolean => {
  if (a.hours !== b.hours) {
    return a.hours > b.hours;
  }
  return a.minutes > b.minutes;
};

const isMinuteOptionDisabled = (
  selectedTime: Time,
  maxTime: Time,
  minTime: Time,
  i: number
) =>
  selectedTime.hours > maxTime.hours ||
  selectedTime.hours < minTime.hours ||
  ((selectedTime.hours === maxTime.hours ||
    selectedTime.hours === minTime.hours) &&
    (i > maxTime.minutes || i < minTime.minutes));

// sane defaults
const MIN_TIME = { hours: 0, minutes: 0 };
const MAX_TIME = { hours: 23, minutes: 59 };
const MINUTES_INTERVAL = 30;

/**
 * TimePicker React Component
 */
const TimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      onChange,
      selected,
      minTime = MIN_TIME,
      maxTime = MAX_TIME,
      minutesInterval = MINUTES_INTERVAL,
      className,
      ...props
    },
    ref
  ) => {
    if (
      typeof minutesInterval !== 'number' &&
      minutesInterval < 1 &&
      Number.isInteger(minutesInterval)
    ) {
      throw new Error('minutesInterval must be an integer greater than 0');
    }

    if (process.env.NODE_ENV !== 'production' && 60 % minutesInterval !== 0) {
      console.warn('TimePicker: minutesInterval must be a factor of 60');
    }

    const [selectedTime, setSelectedTime] = React.useState(() => {
      if (selected !== undefined) {
        return alignTime(selected, minutesInterval);
      }
      const d = new Date();
      return alignTime(
        { hours: d.getHours(), minutes: d.getMinutes() },
        minutesInterval
      );
    });

    const handleMinutesChange = React.useCallback((v: string) => {
      setSelectedTime(t => ({
        ...t,
        minutes: Number(v),
      }));
    }, []);

    const handleHoursChange = React.useCallback((v: string) => {
      setSelectedTime(t => ({
        ...t,
        hours: Number(v),
      }));
    }, []);

    // the array of options for the minutes to select from
    const minuteOptions = React.useMemo<OptionType[]>(() => {
      let options: OptionType[] = [];
      for (let i = 0; i < 60; i += minutesInterval) {
        options.push({
          value: [i.toString(), i.toString().padStart(2, '0')],
          disabled: isMinuteOptionDisabled(selectedTime, maxTime, minTime, i),
        });
      }
      return options;
    }, [minutesInterval, maxTime, minTime, selectedTime.hours]);

    const hourOptions = React.useMemo<OptionType[]>(() => {
      let options: OptionType[] = [];
      for (let i = 0; i <= 23; i++) {
        options.push({
          value: [i.toString(), i.toString().padStart(2, '0')],
          disabled: minTime.hours > i || maxTime.hours < i,
        });
      }
      return options;
    }, [maxTime, minTime]);

    // need to update the value of selectedTime when onChange changes or minutesInterval changes
    React.useEffect(() => {
      onChange?.(selectedTime);
    }, [selectedTime, onChange]);

    React.useEffect(() => {
      const updatedTime = alignTime(selectedTime, minutesInterval);
      setSelectedTime(updatedTime);
      onChange?.(updatedTime);
    }, [minutesInterval]);

    if (
      process.env.NODE_ENV !== 'production' &&
      (greaterThan(selectedTime, maxTime) || greaterThan(minTime, selectedTime))
    ) {
      console.warn(
        'TimePicker: Selected time must fall in the range of maxTime and minTime'
      );
    }

    console.log('ren');

    return (
      <div className={`stp ${className ?? ''}`} {...props} ref={ref}>
        <CustomSelect
          className="stp--select stp--select__hours"
          value={selectedTime.hours.toString().padStart(2, '0')}
          onChange={handleHoursChange}
          options={hourOptions}
        />
        <p>:</p>
        <CustomSelect
          className="stp--select stp--select__minutes"
          value={selectedTime.minutes.toString().padStart(2, '0')}
          onChange={handleMinutesChange}
          options={minuteOptions}
        />
      </div>
    );
  }
);

export default TimePicker;
