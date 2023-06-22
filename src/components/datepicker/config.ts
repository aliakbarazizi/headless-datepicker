import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  format as dateFromat,
  parse,
  startOfMonth,
  startOfToday,
  startOfDay,
} from 'date-fns';
import { DateItemType, DateParts, DatepickerConfig } from '.';
import { mod } from '../../utils/mod';

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
  defaultDateFormat: 'yyyy/MM/dd',
  defaultDateHourFormat: 'yyyy/MM/dd HH:mm',
  format: (date, format) => (date ? dateFromat(date, format) : ''),
  parse: (date, format, referenceDate) => {
    const parseDate = parse(date, format, referenceDate || new Date());
    /**
     * Since date-fns is not always use referenceDate as reference
     * We need to make sure the of that.
     *
     *
     * 'Parse use reference date only in rare cases we need to make sure it work'
     * @see https://github.com/date-fns/date-fns/issues/1838#issuecomment-696674141
     */
    if (referenceDate) {
      parseDate.setUTCSeconds(
        referenceDate.getUTCSeconds(),
        referenceDate.getMilliseconds(),
      );
      if (!format.match(/H|h|K|k/)) {
        parseDate.setUTCHours(referenceDate.getUTCHours());
      }
      if (!format.match(/m/)) {
        parseDate.setUTCMinutes(referenceDate.getUTCMinutes());
      }
    }

    return parseDate;
  },

  getDateParts: (date: Date) =>
    new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
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
          disabled: date < start || date > end,

          value: date,
          text: date.getDate() + '',
        })),
      );
  },

  hours: ({ type }) =>
    [...Array(24).keys()].map((value) => ({
      type,
      key: value,
      value: value,
      text: value + '',
    })),

  minutes: ({ type }) =>
    [...Array(60).keys()].map((value) => ({
      type,
      key: value,
      value: value,
      text: value + '',
    })),
};
