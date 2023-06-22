import {
  MutableRefObject,
  RefObject,
  createContext,
  useContext,
  Key,
} from 'react';
import { match } from '../../utils/match';
import { mod } from '../../utils/mod';

export type DateItemType =
  | {
      type: 'day';

      /**
       * remove this
       */
      key: Key;

      /**
       * Is today day or month or year depend of the type
       */
      isToday: boolean;

      isSelected: boolean;

      isHeader: true;

      disabled: boolean;

      text: string;

      value: number;
    }
  | {
      type: 'day';

      /**
       * remove this
       */
      key: Key;

      /**
       * Is today day or month or year depend of the type
       */
      isToday: boolean;

      isSelected: boolean;

      isHeader: false;

      disabled: boolean;

      text: string;

      value: Date;
    }
  | {
      type: 'month';

      /**
       * remove this
       */
      key: Key;

      /**
       * Is today day or month or year depend of the type
       */
      isToday: boolean;

      isSelected: boolean;

      isHeader: boolean;

      disabled: boolean;

      text: string;

      value: number;
    }
  | {
      type: 'year';

      /**
       * remove this
       */
      key: Key;

      /**
       * Is today day or month or year depend of the type
       */
      isToday: boolean;

      isSelected: boolean;

      isHeader: boolean;

      disabled: boolean;

      text: string;

      value: number;
    };

export type HourItemType =
  | {
      key: Key;
      type: 'hour';
      value: number;
      text: string;
    }
  | {
      key: Key;
      type: 'minute';
      value: number;
      text: string;
    };

export type DateParts = {
  day: number;
  month: number;
  year: number;
  hour: number;
  minute: number;
  //   second: number;
};

type RemoveS<T extends `${string}s`> = T extends `${infer Type}s`
  ? Type
  : never;

export type GetDateItems = {
  [key in `${DateItemType['type']}s`]: (state: {
    type: RemoveS<key>;
    year: number;
    month: number;
    value: Date | null;
    startOfWeek: number;
  }) => Array<Extract<DateItemType, { type: RemoveS<key> }>>;
} & {
  [key in `${HourItemType['type']}s`]: (state: {
    type: RemoveS<key>;
  }) => Array<Extract<HourItemType, { type: RemoveS<key> }>>;
};

export type Actions =
  | 'openCalendar'
  | 'closeCalendar'
  | 'toggleCalendar'
  | 'openHour'
  | 'closeHour'
  | 'toggleHour'
  | 'close'
  | 'next'
  | 'prev'
  | 'toggleDayMonthYear'
  | 'toggleDayMonth'
  | 'toggleDayYear'
  | 'toggleMonthYear'
  | 'today'
  | 'todayHour';

export type DatepickerContextActions =
  | {
      type: Actions;
      payload?: RefObject<HTMLElement | null>;
    }
  | {
      type: 'select';
      payload: DateItemType | HourItemType;
    }
  | {
      type: 'externalValueChanged';
      payload: { parts: DateParts };
    };

export type DatepickerSlot = {
  calendarOpen: boolean;
  hourOpen: boolean;
  disabled: boolean;
  mode: 'day' | 'month' | 'year';

  value: Date | null;
  month: number;
  monthName: string;
  year: number;
  hour: number;
  minute: number;
};

export type DatepickerConfig = {
  dayNames: string[];
  monthNames: string[];
  defaultDateFormat: string;
  defaultDateHourFormat: string;
  format: (date: Date | null, format: string) => string;
  parse: (date: string, format: string, referenceDate: Date | null) => Date;
  getDateParts: (date: Date) => DateParts;
} & GetDateItems;

export type DatepickerState = Omit<DatepickerSlot, 'monthName' | 'value'> & {
  startOfWeek: number;

  config: DatepickerConfig;

  valueRef: RefObject<Date | null>;

  inputRef: MutableRefObject<HTMLElement | null>;

  dateAttachRef: MutableRefObject<HTMLElement | null> | undefined;
  hourAttachRef: MutableRefObject<HTMLElement | null> | undefined;

  onChange: (value: Date | null) => void;
};

export const datePickerReducer = (
  state: DatepickerState,
  { type, payload }: DatepickerContextActions,
): DatepickerState => {
  switch (type) {
    case 'openCalendar':
      return { ...state, calendarOpen: true, dateAttachRef: payload };
    case 'closeCalendar':
      return {
        ...state,
        calendarOpen: false,
        mode: 'day',
        dateAttachRef: undefined,
      };
    case 'toggleCalendar':
      return {
        ...state,
        calendarOpen: !state.calendarOpen,
        mode: 'day',
        dateAttachRef: state.calendarOpen ? undefined : payload,
      };
    case 'openHour':
      return { ...state, hourOpen: true, hourAttachRef: payload };
    case 'closeHour':
      return { ...state, hourOpen: false, hourAttachRef: undefined };
    case 'toggleHour':
      return {
        ...state,
        hourOpen: !state.hourOpen,
        hourAttachRef: state.hourOpen ? undefined : payload,
      };
    case 'close':
      return {
        ...state,
        calendarOpen: false,
        hourOpen: false,
        mode: 'day',
        dateAttachRef: undefined,
        hourAttachRef: undefined,
      };
    case 'next': {
      const { month, year } = state;
      return match(state.mode, {
        day: () => ({
          ...state,
          year: month === 12 ? year + 1 : year,
          month: (month % 12) + 1,
        }),
        month: () => ({
          ...state,
          year: year + 1,
          month: month,
        }),
        year: () => ({
          ...state,
          year: year + 1,
          month: month,
        }),
      });
    }
    case 'prev': {
      const { month, year } = state;

      return match(state.mode, {
        day: () => ({
          ...state,
          year: month === 1 ? year - 1 : year,
          month: mod(month - 2, 12) + 1,
        }),
        month: () => ({
          ...state,
          year: year - 1,
          month: month,
        }),
        year: () => ({
          ...state,
          year: year - 1,
          month: month,
        }),
      });
    }
    case 'toggleDayMonthYear': {
      return {
        ...state,
        mode: state.mode === 'day' ? 'month' : 'year',
      };
    }
    case 'toggleDayMonth': {
      return {
        ...state,
        mode: state.mode === 'month' ? 'day' : 'month',
      };
    }
    case 'toggleDayYear': {
      return {
        ...state,
        mode: state.mode === 'year' ? 'day' : 'year',
      };
    }
    case 'toggleMonthYear': {
      return {
        ...state,
        mode: state.mode === 'year' ? 'month' : 'year',
      };
    }
    case 'today': {
      const today = new Date();
      today.setHours(state.hour, state.minute);
      state.onChange(today);

      const parts = state.config.getDateParts(today);

      return {
        ...state,
        year: parts.year,
        month: parts.month,
      };
    }
    case 'todayHour': {
      const today = new Date();
      state.onChange(today);

      const parts = state.config.getDateParts(today);

      return {
        ...state,
        year: parts.year,
        month: parts.month,
      };
    }
    case 'select': {
      const newState = { ...state };

      let newValue: Date | null = null;

      switch (payload.type) {
        case 'day': {
          newValue = new Date(payload.value);
          newValue.setHours(state.hour, state.minute);

          newState.calendarOpen = false;
          break;
        }
        case 'month': {
          newState.mode = 'day';
          newState.month = payload.value;
          break;
        }
        case 'year': {
          newState.mode = 'month';
          newState.year = payload.value;
          break;
        }
        case 'hour': {
          newValue = state.valueRef.current
            ? new Date(state.valueRef.current)
            : new Date();

          newValue.setHours(payload.value);

          newState.hour = payload.value;
          newState.hourOpen = false;
          break;
        }
        case 'minute': {
          newValue = state.valueRef.current
            ? new Date(state.valueRef.current)
            : new Date();

          newValue.setMinutes(payload.value);

          newState.minute = payload.value;
          newState.hourOpen = false;
          break;
        }
        default: {
          return state;
        }
      }

      if (newValue) {
        newState.onChange(newValue);
      }

      return newState;
    }
    case 'externalValueChanged': {
      return {
        ...state,
        year: payload.parts.year,
        month: payload.parts.month,
        hour: payload.parts.hour,
        minute: payload.parts.minute,
      };
    }
    default:
      throw new Error('Invalid action ' + type);
  }
};

export const DatepickerContext = createContext<{
  state: DatepickerState;
  dispatch: (action: DatepickerContextActions) => void;
} | null>(null);

export function useDatepickerContext() {
  const context = useContext(DatepickerContext);
  if (!context) throw new Error('No context provided');
  return context;
}

export function useDatepickerSlot() {
  const context = useDatepickerContext();
  return {
    ...context,
    slot: getSlot(context.state),
  };
}

export function getSlot(state: DatepickerState): DatepickerSlot {
  return {
    calendarOpen: state.calendarOpen,
    hourOpen: state.hourOpen,
    disabled: state.disabled,
    mode: state.mode,

    value: state.valueRef.current,
    month: state.month,
    monthName: state.config.monthNames[state.month - 1],
    year: state.year,
    hour: state.hour,
    minute: state.minute,
  };
}
