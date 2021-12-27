import * as React from 'react';

type DateButtonProps = {
  date: Date;
  active: boolean;
  selected: boolean;
  onClick: (date: Date) => void;
  color: string;
};

const dateOptions: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
};

const DateButton: React.FC<DateButtonProps> = ({
  date,
  active,
  onClick,
  selected,
  color,
}) => (
  <button
    className={`sdp--square-btn sdp--date-btn ${
      selected ? 'sdp--date-btn__selected' : ''
    } sdp--text ${!active ? 'sdp--text__inactive' : ''}`}
    style={{backgroundColor: selected ? color : "#FFFFFF"}}
    onClick={() => onClick(date)}
    tabIndex={active ? 0 : -1}
    aria-label={`${
      selected ? 'Currently selected' : 'Select'
    } ${date.toLocaleDateString('fr-FR', dateOptions)}`}
    type="button"
  >
    {date.getDate()}
  </button>
);

export default React.memo(
  DateButton,
  (p, n) =>
    p.date.getDay() === n.date.getDay() &&
    p.active === n.active &&
    p.selected === n.selected
);
