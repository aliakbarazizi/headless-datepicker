import { monthsShort } from './format';

const monthNames = [
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
];

interface Date {
  timezoneOffset: number;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  millisecond: number;
}

const formattingTokens =
  /(\[[^[]*\])|(MM?M?M?|Do|DD?|ddd?d?|w[o|w]?|YYYY|YY|yyyy|yy|a|A|hh?|HH?|mm?|ss?|S{1,3}|x|X|ZZ?|.)/g;
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

const match1 = /\d/; // 0 - 9
const match2 = /\d\d/; // 00 - 99
const match3 = /\d{3}/; // 000 - 999
const match4 = /\d{4}/; // 0000 - 9999
const match1to2 = /\d\d?/; // 0 - 99
const matchShortOffset = /[+-]\d\d:?\d\d/; // +00:00 -00:00 +0000 or -0000
const matchSigned = /[+-]?\d+/; // -inf - inf

// const matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i; // Word

const YEAR = 'year';
const MONTH = 'month';
const DAY = 'day';
const HOUR = 'hour';
const MINUTE = 'minute';
const SECOND = 'second';
const MILLISECOND = 'millisecond';

export interface ParseFlagMark {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  millisecond: number;
  offset: number;
  isPM: boolean;
}

export type ParseFlagCallBackReturn = Unionize<ParseFlagMark>;

export type ParseFlagRegExp = RegExp | (() => RegExp);
export type ParseFlagCallBack = (input: string) => ParseFlagCallBackReturn;

export interface ParseFlag {
  [key: string]: [ParseFlagRegExp, ParseFlagCallBack];
}

const parseFlags: ParseFlag = {};

const addParseFlag = (
  token: string | string[],
  regex: ParseFlagRegExp,
  callback: ParseFlagCallBack | keyof PickByValue<ParseFlagMark, number>,
) => {
  const tokens = Array.isArray(token) ? token : [token];
  let func: ParseFlagCallBack;
  if (typeof callback === 'string') {
    func = (input) => {
      const value = parseInt(input, 10);
      return { [callback]: value } as Unionize<
        PickByValue<ParseFlagMark, number>
      >;
    };
  } else {
    func = callback;
  }
  tokens.forEach((key) => {
    parseFlags[key] = [regex, func];
  });
};

const escapeStringRegExp = (str: string) => {
  return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
};

const matchWordRegExp = (array: string[]) => {
  return () => {
    return new RegExp(array.map(escapeStringRegExp).join('|'));
  };
};

const matchWordCallback = (array: string[], key: 'month') => {
  return (input: string) => {
    const index = array.indexOf(input);
    if (index < 0) {
      throw new Error('Invalid Word');
    }
    return { [key]: index } as Unionize<Pick<ParseFlagMark, 'month'>>;
  };
};

addParseFlag('Y', matchSigned, YEAR);
addParseFlag('YY', match2, (input) => {
  const year = new Date().getFullYear();
  const cent = Math.floor(year / 100);
  let value = parseInt(input, 10);
  value = (value > 68 ? cent - 1 : cent) * 100 + value;
  return { [YEAR]: value };
});
addParseFlag('yyyy', match4, YEAR);
addParseFlag('M', match1to2, (input) => ({ [MONTH]: parseInt(input, 10) - 1 }));
addParseFlag('MM', match2, (input) => ({ [MONTH]: parseInt(input, 10) - 1 }));
addParseFlag(
  'MMM',
  matchWordRegExp(monthsShort),
  matchWordCallback(monthsShort, MONTH),
);
addParseFlag(
  'MMMM',
  matchWordRegExp(monthNames),
  matchWordCallback(monthNames, MONTH),
);
addParseFlag('d', match1to2, DAY);
addParseFlag('dd', match2, DAY);
addParseFlag(['H', 'h'], match1to2, HOUR);
addParseFlag(['HH', 'hh'], match2, HOUR);
addParseFlag('m', match1to2, MINUTE);
addParseFlag('mm', match2, MINUTE);
addParseFlag('s', match1to2, SECOND);
addParseFlag('ss', match2, SECOND);
addParseFlag('S', match1, (input) => {
  return {
    [MILLISECOND]: parseInt(input, 10) * 100,
  };
});
addParseFlag('SS', match2, (input) => {
  return {
    [MILLISECOND]: parseInt(input, 10) * 10,
  };
});
addParseFlag('SSS', match3, MILLISECOND);

function matchMeridiem() {
  return /[ap]\.?m?\.?/i;
}

function defaultIsPM(input: string) {
  return `${input}`.toLowerCase().charAt(0) === 'p';
}

addParseFlag(['A', 'a'], matchMeridiem, (input) => {
  const isPM = defaultIsPM(input);
  return { isPM };
});

function offsetFromString(str: string) {
  const [symbol, hour, minute] = str.match(/([+-]|\d\d)/g) || ['-', '0', '0'];
  const minutes = parseInt(hour, 10) * 60 + parseInt(minute, 10);
  if (minutes === 0) {
    return 0;
  }
  return symbol === '+' ? -minutes : +minutes;
}

addParseFlag(['Z', 'ZZ'], matchShortOffset, (input) => {
  return { offset: offsetFromString(input) };
});

// TODO: uncomment this
// addParseFlag('x', matchSigned, (input) => {
//   return { date: new Date(parseInt(input, 10)) };
// });

// addParseFlag('X', matchTimestamp, (input) => {
//   return { date: new Date(parseFloat(input) * 1000) };
// });

// addParseFlag('d', match1, 'weekday');

// addParseFlag('w', match1to2, 'week');
// addParseFlag('ww', match2, 'week');

function to24hour(hour?: number, isPM?: boolean) {
  if (hour !== undefined && isPM !== undefined) {
    if (isPM) {
      if (hour < 12) {
        return hour + 12;
      }
    } else if (hour === 12) {
      return 0;
    }
  }
  return hour;
}

function makeParser(dateString: string, format: string) {
  const tokens = format.match(formattingTokens);
  if (!tokens) {
    throw new Error();
  }
  const { length } = tokens;
  let mark: Partial<ParseFlagMark> = {};
  for (let i = 0; i < length; i += 1) {
    const token = tokens[i];
    const parseTo = parseFlags[token];
    if (!parseTo) {
      const word = token.replace(/^\[|\]$/g, '');
      if (dateString.indexOf(word) === 0) {
        dateString = dateString.substr(word.length);
      } else {
        throw new Error('not match');
      }
    } else {
      const regex =
        typeof parseTo[0] === 'function' ? parseTo[0]() : parseTo[0];
      const parser = parseTo[1];
      const value = (regex.exec(dateString) || [])[0];
      const obj = parser(value || '');
      mark = { ...mark, ...obj };
      dateString = dateString.replace(value || '', '');
    }
  }
  return mark;
}

export function parse(str: string, format: string, fallback = new Date()) {
  const result: Date = {
    year: fallback.getFullYear(),
    month: fallback.getMonth(),
    day: fallback.getDate(),
    hour: fallback.getHours(),
    minute: fallback.getMinutes(),
    second: fallback.getSeconds(),
    millisecond: fallback.getMilliseconds(),
    timezoneOffset: fallback.getTimezoneOffset(),
  };
  const parseResult = makeParser(str, format);
  (
    ['year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond'] as const
  ).forEach((key) => {
    if (parseResult[key]) result[key] = parseResult[key] || 0;
  });

  result.hour = to24hour(result.hour, parseResult.isPM) || 0;

  if (parseResult.offset !== undefined) {
    result.timezoneOffset = parseResult.offset;
  }
  return result;
}

type Unionize<T extends object> = {
  [P in keyof T]: { [Q in P]: T[P] };
}[keyof T];

type PickByValue<T, ValueType> = Pick<
  T,
  { [Key in keyof T]-?: T[Key] extends ValueType ? Key : never }[keyof T]
>;
