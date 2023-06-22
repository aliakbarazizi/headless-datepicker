import { config } from './config';

export const monthsShort = [
  'فر',
  'ارد',
  'خر',
  'تیر',
  'مرد',
  'شهر',
  'مهر',
  'آبا',
  'آذر',
  'دی',
  'بهم',
  'اسفن',
];
export const weekdaysShort = ['یک', 'دو', 'سه', 'چهار', 'پنج', 'جمعه', 'شنبه'];
export const weekdaysMin = ['یک', 'دو', 'سه', 'چه', 'پن', 'جم', 'شن'];

const REGEX_FORMAT =
  /\[([^\]]+)]|YYYY|YY?|yyyy|yy?|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|Z{1,2}|S{1,3}|w{1,2}|x|X|a|A/g;
/**
Era	G..GGG	AD, BC	
Era	GGGG	Anno Domini, Before Christ	2
Era	GGGGG	A, B	
Calendar year	y	44, 1, 1900, 2017	5
Calendar year	yo	44th, 1st, 0th, 17th	5,7
Calendar year	yy	44, 01, 00, 17	5
Calendar year	yyy	044, 001, 1900, 2017	5
Calendar year	yyyy	0044, 0001, 1900, 2017	5
Calendar year	yyyyy	...	3,5
Local week-numbering year	Y	44, 1, 1900, 2017	5
Local week-numbering year	Yo	44th, 1st, 1900th, 2017th	5,7
Local week-numbering year	YY	44, 01, 00, 17	5,8
Local week-numbering year	YYY	044, 001, 1900, 2017	5
Local week-numbering year	YYYY	0044, 0001, 1900, 2017	5,8
Local week-numbering year	YYYYY	...	3,5
ISO week-numbering year	R	-43, 0, 1, 1900, 2017	5,7
ISO week-numbering year	RR	-43, 00, 01, 1900, 2017	5,7
ISO week-numbering year	RRR	-043, 000, 001, 1900, 2017	5,7
ISO week-numbering year	RRRR	-0043, 0000, 0001, 1900, 2017	5,7
ISO week-numbering year	RRRRR	...	3,5,7
Extended year	u	-43, 0, 1, 1900, 2017	5
Extended year	uu	-43, 01, 1900, 2017	5
Extended year	uuu	-043, 001, 1900, 2017	5
Extended year	uuuu	-0043, 0001, 1900, 2017	5
Extended year	uuuuu	...	3,5
Quarter (formatting)	Q	1, 2, 3, 4	
Quarter (formatting)	Qo	1st, 2nd, 3rd, 4th	7
Quarter (formatting)	QQ	01, 02, 03, 04	
Quarter (formatting)	QQQ	Q1, Q2, Q3, Q4	
Quarter (formatting)	QQQQ	1st quarter, 2nd quarter, ...	2
Quarter (formatting)	QQQQQ	1, 2, 3, 4	4
Quarter (stand-alone)	q	1, 2, 3, 4	
Quarter (stand-alone)	qo	1st, 2nd, 3rd, 4th	7
Quarter (stand-alone)	qq	01, 02, 03, 04	
Quarter (stand-alone)	qqq	Q1, Q2, Q3, Q4	
Quarter (stand-alone)	qqqq	1st quarter, 2nd quarter, ...	2
Quarter (stand-alone)	qqqqq	1, 2, 3, 4	4
Month (formatting)	M	1, 2, ..., 12	
Month (formatting)	Mo	1st, 2nd, ..., 12th	7
Month (formatting)	MM	01, 02, ..., 12	
Month (formatting)	MMM	Jan, Feb, ..., Dec	
Month (formatting)	MMMM	January, February, ..., December	2
Month (formatting)	MMMMM	J, F, ..., D	
Month (stand-alone)	L	1, 2, ..., 12	
Month (stand-alone)	Lo	1st, 2nd, ..., 12th	7
Month (stand-alone)	LL	01, 02, ..., 12	
Month (stand-alone)	LLL	Jan, Feb, ..., Dec	
Month (stand-alone)	LLLL	January, February, ..., December	2
Month (stand-alone)	LLLLL	J, F, ..., D	
Local week of year	w	1, 2, ..., 53	
Local week of year	wo	1st, 2nd, ..., 53th	7
Local week of year	ww	01, 02, ..., 53	
ISO week of year	I	1, 2, ..., 53	7
ISO week of year	Io	1st, 2nd, ..., 53th	7
ISO week of year	II	01, 02, ..., 53	7
Day of month	d	1, 2, ..., 31	
Day of month	do	1st, 2nd, ..., 31st	7
Day of month	dd	01, 02, ..., 31	
Day of year	D	1, 2, ..., 365, 366	9
Day of year	Do	1st, 2nd, ..., 365th, 366th	7
Day of year	DD	01, 02, ..., 365, 366	9
Day of year	DDD	001, 002, ..., 365, 366	
Day of year	DDDD	...	3
Day of week (formatting)	E..EEE	Mon, Tue, Wed, ..., Sun	
Day of week (formatting)	EEEE	Monday, Tuesday, ..., Sunday	2
Day of week (formatting)	EEEEE	M, T, W, T, F, S, S	
Day of week (formatting)	EEEEEE	Mo, Tu, We, Th, Fr, Sa, Su	
ISO day of week (formatting)	i	1, 2, 3, ..., 7	7
ISO day of week (formatting)	io	1st, 2nd, ..., 7th	7
ISO day of week (formatting)	ii	01, 02, ..., 07	7
ISO day of week (formatting)	iii	Mon, Tue, Wed, ..., Sun	7
ISO day of week (formatting)	iiii	Monday, Tuesday, ..., Sunday	2,7
ISO day of week (formatting)	iiiii	M, T, W, T, F, S, S	7
ISO day of week (formatting)	iiiiii	Mo, Tu, We, Th, Fr, Sa, Su	7
Local day of week (formatting)	e	2, 3, 4, ..., 1	
Local day of week (formatting)	eo	2nd, 3rd, ..., 1st	7
Local day of week (formatting)	ee	02, 03, ..., 01	
Local day of week (formatting)	eee	Mon, Tue, Wed, ..., Sun	
Local day of week (formatting)	eeee	Monday, Tuesday, ..., Sunday	2
Local day of week (formatting)	eeeee	M, T, W, T, F, S, S	
Local day of week (formatting)	eeeeee	Mo, Tu, We, Th, Fr, Sa, Su	
Local day of week (stand-alone)	c	2, 3, 4, ..., 1	
Local day of week (stand-alone)	co	2nd, 3rd, ..., 1st	7
Local day of week (stand-alone)	cc	02, 03, ..., 01	
Local day of week (stand-alone)	ccc	Mon, Tue, Wed, ..., Sun	
Local day of week (stand-alone)	cccc	Monday, Tuesday, ..., Sunday	2
Local day of week (stand-alone)	ccccc	M, T, W, T, F, S, S	
Local day of week (stand-alone)	cccccc	Mo, Tu, We, Th, Fr, Sa, Su	
AM, PM	a..aa	AM, PM	
AM, PM	aaa	am, pm	
AM, PM	aaaa	a.m., p.m.	2
AM, PM	aaaaa	a, p	
AM, PM, noon, midnight	b..bb	AM, PM, noon, midnight	
AM, PM, noon, midnight	bbb	am, pm, noon, midnight	
AM, PM, noon, midnight	bbbb	a.m., p.m., noon, midnight	2
AM, PM, noon, midnight	bbbbb	a, p, n, mi	
Flexible day period	B..BBB	at night, in the morning, ...	
Flexible day period	BBBB	at night, in the morning, ...	2
Flexible day period	BBBBB	at night, in the morning, ...	
Hour [1-12]	h	1, 2, ..., 11, 12	
Hour [1-12]	ho	1st, 2nd, ..., 11th, 12th	7
Hour [1-12]	hh	01, 02, ..., 11, 12	
Hour [0-23]	H	0, 1, 2, ..., 23	
Hour [0-23]	Ho	0th, 1st, 2nd, ..., 23rd	7
Hour [0-23]	HH	00, 01, 02, ..., 23	
Hour [0-11]	K	1, 2, ..., 11, 0	
Hour [0-11]	Ko	1st, 2nd, ..., 11th, 0th	7
Hour [0-11]	KK	01, 02, ..., 11, 00	
Hour [1-24]	k	24, 1, 2, ..., 23	
Hour [1-24]	ko	24th, 1st, 2nd, ..., 23rd	7
Hour [1-24]	kk	24, 01, 02, ..., 23	
Minute	m	0, 1, ..., 59	
Minute	mo	0th, 1st, ..., 59th	7
Minute	mm	00, 01, ..., 59	
Second	s	0, 1, ..., 59	
Second	so	0th, 1st, ..., 59th	7
Second	ss	00, 01, ..., 59	
Fraction of second	S	0, 1, ..., 9	
Fraction of second	SS	00, 01, ..., 99	
Fraction of second	SSS	000, 001, ..., 999	
Fraction of second	SSSS	...	3
Timezone (ISO-8601 w/ Z)	X	-08, +0530, Z	
Timezone (ISO-8601 w/ Z)	XX	-0800, +0530, Z	
Timezone (ISO-8601 w/ Z)	XXX	-08:00, +05:30, Z	
Timezone (ISO-8601 w/ Z)	XXXX	-0800, +0530, Z, +123456	2
Timezone (ISO-8601 w/ Z)	XXXXX	-08:00, +05:30, Z, +12:34:56	
Timezone (ISO-8601 w/o Z)	x	-08, +0530, +00	
Timezone (ISO-8601 w/o Z)	xx	-0800, +0530, +0000	
Timezone (ISO-8601 w/o Z)	xxx	-08:00, +05:30, +00:00	2
Timezone (ISO-8601 w/o Z)	xxxx	-0800, +0530, +0000, +123456	
Timezone (ISO-8601 w/o Z)	xxxxx	-08:00, +05:30, +00:00, +12:34:56	
Timezone (GMT)	O...OOO	GMT-8, GMT+5:30, GMT+0	
Timezone (GMT)	OOOO	GMT-08:00, GMT+05:30, GMT+00:00	2
Timezone (specific non-locat.)	z...zzz	GMT-8, GMT+5:30, GMT+0	6
Timezone (specific non-locat.)	zzzz	GMT-08:00, GMT+05:30, GMT+00:00	2,6
Seconds timestamp	t	512969520	7
Seconds timestamp	tt	...	3,7
Milliseconds timestamp	T	512969520900	7
Milliseconds timestamp	TT	...	3,7
Long localized date	P	04/29/1453	7
Long localized date	PP	Apr 29, 1453	7
Long localized date	PPP	April 29th, 1453	7
Long localized date	PPPP	Friday, April 29th, 1453	2,7
Long localized time	p	12:00 AM	7
Long localized time	pp	12:00:00 AM	7
Long localized time	ppp	12:00:00 AM GMT+2	7
Long localized time	pppp	12:00:00 AM GMT+02:00	2,7
Combination of date and time	Pp	04/29/1453, 12:00 AM	7
Combination of date and time	PPpp	Apr 29, 1453, 12:00:00 AM	7
Combination of date and time	PPPppp	April 29th, 1453 at ...	7
Combination of date and time	PPPPpppp	Friday, April 29th, 1453 at ...	2,7
 */

interface Date {
  timezoneOffset: number;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  millisecond: number;
  timestamp: number;
}

function pad(val: number, len = 2) {
  let output = `${Math.abs(val)}`;
  const sign = val < 0 ? '-' : '';
  while (output.length < len) {
    output = `0${output}`;
  }
  return sign + output;
}

function getOffset(date: Date) {
  return Math.round(date.timezoneOffset / 15) * 15;
}

function formatTimezone(offset: number, delimeter = '') {
  const sign = offset > 0 ? '-' : '+';
  const absOffset = Math.abs(offset);
  const hours = Math.floor(absOffset / 60);
  const minutes = absOffset % 60;
  return sign + pad(hours, 2) + delimeter + pad(minutes, 2);
}

interface FormatFlag {
  [key: string]: (date: Date) => string | number;
}

const meridiem = (h: number, _: number, isLowercase: boolean) => {
  const word = h < 12 ? 'AM' : 'PM';
  return isLowercase ? word.toLocaleLowerCase() : word;
};

const formatFlags: FormatFlag = {
  Y(date) {
    const y = date.year;
    return y <= 9999 ? `${y}` : `+${y}`;
  },

  // Year: 00, 01, ..., 99
  yy(date) {
    return pad(date.year, 4).substr(2);
  },

  // Year: 1900, 1901, ..., 2099
  yyyy(date) {
    return pad(date.year, 4);
  },

  // Month: 1, 2, ..., 12
  M(date) {
    return date.month + 1;
  },

  // Month: 01, 02, ..., 12
  MM(date) {
    return pad(date.month + 1, 2);
  },

  MMM(date) {
    return monthsShort[date.month];
  },

  MMMM(date) {
    return config.monthNames[date.month];
  },

  // Day of month: 1, 2, ..., 31
  d(date) {
    return date.day;
  },

  // Day of month: 01, 02, ..., 31
  dd(date) {
    return pad(date.day, 2);
  },

  // Hour: 0, 1, ... 23
  H(date) {
    return date.hour;
  },

  // Hour: 00, 01, ..., 23
  HH(date) {
    return pad(date.hour, 2);
  },

  // Hour: 1, 2, ..., 12
  h(date) {
    const hours = date.hour;
    if (hours === 0) {
      return 12;
    }
    if (hours > 12) {
      return hours % 12;
    }
    return hours;
  },

  // Hour: 01, 02, ..., 12
  hh(...args) {
    const hours = formatFlags.h(...args) as number;
    return pad(hours, 2);
  },

  // Minute: 0, 1, ..., 59
  m(date) {
    return date.minute;
  },

  // Minute: 00, 01, ..., 59
  mm(date) {
    return pad(date.minute, 2);
  },

  // Second: 0, 1, ..., 59
  s(date) {
    return date.second;
  },

  // Second: 00, 01, ..., 59
  ss(date) {
    return pad(date.second, 2);
  },

  // 1/10 of second: 0, 1, ..., 9
  S(date) {
    return Math.floor(date.millisecond / 100);
  },

  // 1/100 of second: 00, 01, ..., 99
  SS(date) {
    return pad(Math.floor(date.millisecond / 10), 2);
  },

  // Millisecond: 000, 001, ..., 999
  SSS(date) {
    return pad(date.millisecond, 3);
  },

  // Day of week: 0, 1, ..., 6
  D(date) {
    return date.day;
  },
  // Day of week: 'Su', 'Mo', ..., 'Sa'
  DD(date) {
    return weekdaysMin[date.day];
  },

  // Day of week: 'Sun', 'Mon',..., 'Sat'
  ddd(date) {
    return weekdaysShort[date.day];
  },

  // Day of week: 'Sunday', 'Monday', ...,'Saturday'
  dddd(date) {
    return config.dayNames[date.day];
  },

  // AM, PM
  A(date) {
    return meridiem(date.hour, date.minute, false);
  },

  // am, pm
  a(date) {
    return meridiem(date.hour, date.minute, true);
  },

  // Timezone: -01:00, +00:00, ... +12:00
  Z(date) {
    return formatTimezone(getOffset(date), ':');
  },

  // Timezone: -0100, +0000, ... +1200
  ZZ(date) {
    return formatTimezone(getOffset(date));
  },

  // Seconds timestamp: 512969520
  X(date) {
    return Math.floor(date.timestamp / 1000);
  },

  // Milliseconds timestamp: 512969520900
  x(date) {
    return date.timestamp;
  },

  //   w(date) {
  //     return getWeek(date, {
  //       firstDayOfWeek: firstDayOfWeek,
  //     });
  //   },

  ww(date) {
    return pad(formatFlags.w(date) as number, 2);
  },
};

export function format(date: Date, str: string) {
  const formatStr = str ? String(str) : 'YYYY-MM-DDTHH:mm:ss.SSSZ';

  return formatStr.replace(REGEX_FORMAT, (match, p1: string) => {
    if (p1) {
      return p1;
    }
    if (typeof formatFlags[match] === 'function') {
      return `${formatFlags[match](date)}`;
    }
    return match;
  });
}

// function getWeek(date: Date, { firstDayOfWeek = 0 } = {}) {
//   const firstDateOfThisWeek = startOfWeek(date, firstDayOfWeek);
//   const firstDateOfFirstWeek = startOfWeekYear(date, {
//     firstDayOfWeek,
//   });
//   const diff = firstDateOfThisWeek.getTime() - firstDateOfFirstWeek.getTime();

//   return Math.round(diff / (7 * 24 * 3600 * 1000)) + 1;
// }

// function startOfWeek(date: Date, firstDayOfWeek = 0) {
//   if (!(firstDayOfWeek >= 0 && firstDayOfWeek <= 6)) {
//     throw new RangeError('weekStartsOn must be between 0 and 6');
//   }
//   const day = date.day;
//   const diff = (day + 7 - firstDayOfWeek) % 7;
//   date.setDate(date.day - diff);
//   date.setHours(0, 0, 0, 0);
//   return date;
// }

// function startOfWeekYear(date: Date, { firstDayOfWeek = 0 } = {}) {
//   const year = date.year;
//   let firstDateOfFirstWeek = new Date(0);
//   for (let i = year + 1; i >= year - 1; i--) {
//     firstDateOfFirstWeek.setFullYear(i, 0, 1);
//     firstDateOfFirstWeek.setHours(0, 0, 0, 0);
//     firstDateOfFirstWeek = startOfWeek(firstDateOfFirstWeek, firstDayOfWeek);
//     if (date.getTime() >= firstDateOfFirstWeek.getTime()) {
//       break;
//     }
//   }
//   return firstDateOfFirstWeek;
// }
