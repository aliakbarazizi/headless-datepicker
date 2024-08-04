import { addDays, eachDayOfInterval, startOfDay, startOfToday } from 'date-fns';
// @ts-expect-error wrong type in jalali-js type
import { jalaaliToDateObject, toJalaali } from 'jalaali-js';
import type { DateItemType, DateParts, DatepickerConfig } from '..';
import { format } from './format';
import { parse } from './parse';

export const config: DatepickerConfig = {
  dayNames: [
    'یکشنبه',
    'دوشنبه',
    'سه‌شنبه',
    'چهارشنبه',
    'پنج‌شنبه',
    'جمعه',
    'شنبه',
  ],
  monthNames: [
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند',
  ],
  format: (date, _format) => {
    if (!date) return '';
    const jalali = toJalaali(date);

    return format(
      {
        year: jalali.jy,
        month: jalali.jm - 1,
        day: jalali.jd,
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
        millisecond: date.getMilliseconds(),
        timestamp: date.getTime(),
        timezoneOffset: date.getTimezoneOffset(),
      },
      _format,
    );
  },
  parse: (date, format, referenceDate) => {
    const _date = parse(date, format, referenceDate || new Date());

    const jalali = jalaaliToDateObject(
      _date.year,
      _date.month + 1,
      _date.day,
    ) as Date;

    jalali.setHours(_date.hour, _date.minute, _date.second, _date.millisecond);

    return jalali;
  },
  toDateParts: (date) =>
    new Intl.DateTimeFormat('fa-IR-u-nu-latn', {
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
    const todayYear = toJalaali(new Date()).jy;

    return [...Array(200).keys()].map((value) => ({
      type,
      key: type + value,
      isToday: todayYear === value + 1300,
      isSelected: year === value + 1300,
      isHeader: false,
      isDisabled: false,
      disabled: false,

      value: value + 1300,
      text: value + 1300 + '',
    }));
  },
  months: ({ type, month }) => {
    const todayMonth = toJalaali(new Date()).jm;
    return [...config.monthNames.keys()].map((value) => ({
      type,
      key: type + value,
      isToday: todayMonth === value + 1,
      isSelected: month === value + 1,
      isHeader: false,
      isDisabled: false,
      disabled: false,

      value: value + 1,
      text: config.monthNames[value],
    }));
  },
  days: ({ type, month, startOfWeek, year, value }) => {
    const start = jalaaliToDateObject(year, month, 1);
    const end = jalaaliToDateObject(year, month + 1, 1);
    end.setDate(end.getDate() - 1);
    const endOfWeek = mod(startOfWeek - 1, 7);

    const format = new Intl.DateTimeFormat('fa-IR-u-nu-latn', {
      day: 'numeric',
    });

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
          isDisabled: false,
          isInCurrentMonth: date >= start || date <= end,
          disabled: date < start || date > end,

          value: date,
          text: format.format(date),
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

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}
