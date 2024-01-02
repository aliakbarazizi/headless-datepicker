import {
  addDays,
  format as dateFromat,
  eachDayOfInterval,
  endOfMonth,
  parse,
  startOfDay,
  startOfMonth,
  startOfToday,
} from 'date-fns';
import {
  DateItemType,
  DateParts,
  DatepickerConfig,
} from '../components/datepicker';
import { mod } from './mod';

export const config: DatepickerConfig = {
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  format: (date, format) => (date ? dateFromat(date, format) : ''),
  parse: (date, format, referenceDate) => {
    const parseDate = parse(date, format, referenceDate || new Date());

    return parseDate;
  },

  toDateParts: (date) =>
    new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })
      .formatToParts(date)
      .reduce<DateParts>((acc, part) => {
        if (part.type !== 'literal')
          acc[part.type as keyof DateParts] = +part.value;
        return acc;
      }, {} as any),

  years: ({ type, year }) => {
    const todayYear = new Date().getFullYear();

    return [...Array(200).keys()].map((value) => ({
      type,
      key: type + value,
      isToday: todayYear === value + 1900,
      isSelected: year === value + 1900,
      isHeader: false,
      isDisabled: false,
      disabled: false,

      value: value + 1900,
      text: value + 1900 + '',
    }));
  },
  months: ({ type, month }) => {
    const todayMonth = new Date().getMonth();

    return [...config.monthNames.keys()].map((value) => ({
      type,
      key: type + value,
      isToday: todayMonth === value,
      isSelected: month === value + 1,
      isHeader: false,
      isDisabled: false,
      disabled: false,

      value: value + 1,
      text: config.monthNames[value],
    }));
  },
  days: ({ type, month, startOfWeek, year, value }) => {
    const date = new Date(year, month - 1, 1);

    const start = startOfMonth(date);
    const end = endOfMonth(date);

    const endOfWeek = mod(startOfWeek - 1, 7);

    const todayDate = startOfToday().getTime();
    const selectedDate = value ? startOfDay(value).getTime() : 0;

    return config.dayNames
      .map<Extract<DateItemType, { type: 'day' }>>((_day, i) => {
        const index = mod(startOfWeek + i, 7);
        return {
          type,
          key: 'weekday' + index,
          isToday: false,
          isSelected: false,
          isHeader: true,
          isDisabled: false,
          disabled: false,

          value: i,
          text: config.dayNames[index],
        };
      })
      .concat(
        eachDayOfInterval({
          start: addDays(start, -mod(start.getDay() - startOfWeek, 7)),
          end: addDays(end, mod(endOfWeek - end.getDay(), 7)),
        }).map((date) => ({
          type,
          key: date.toString(),
          isToday: todayDate === date.getTime(),
          isSelected: selectedDate === date.getTime(),
          isHeader: false,
          isInCurrentMonth: date < start || date > end,
          isDisabled: date < start || date > end,
          disabled: date < start || date > end,

          value: date,
          text: date.getDate() + '',
        })),
      );
  },
  hours: ({ type, hour }) =>
    [...Array(24).keys()].map((value) => ({
      type,
      key: value,
      value: value,
      text: value + '',
      isToday: false,
      isSelected: hour === value,
      isHeader: false,
      isDisabled: false,
      disabled: false,
    })),

  minutes: ({ type, minute }) =>
    [...Array(60).keys()].map((value) => ({
      type,
      key: value,
      value: value,
      text: value + '',
      isToday: false,
      isSelected: minute === value,
      isHeader: false,
      isDisabled: false,
      disabled: false,
    })),
};
