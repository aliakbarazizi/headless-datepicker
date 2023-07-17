import {
  Key,
  MutableRefObject,
  RefObject,
  createContext,
  useContext,
} from 'react';
import { match } from '../utils/match';
import { mod } from '../utils/mod';

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

      isToday: false;

      isSelected: boolean;

      isHeader: false;

      disabled: false;

      value: number;

      text: string;
    }
  | {
      key: Key;

      type: 'minute';

      isToday: false;

      isSelected: boolean;

      isHeader: false;

      disabled: false;

      value: number;

      text: string;
    };

export type ItemType = DateItemType | HourItemType;

export type DateParts = {
  day: number;
  month: number;
  year: number;
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
    hour: number;
    minute: number;
  }) => Array<Extract<HourItemType, { type: RemoveS<key> }>>;
};

export type Actions =
  | `open${string}`
  | `close${string}`
  | `toggle${string}`
  | `next${string}`
  | `prev${string}`
  | `dayMonthYear${string}`
  | `dayMonth${string}`
  | `dayYear${string}`
  | `monthYear${string}`
  | 'today'
  | 'todayHour';

export type DatepickerContextActions =
  | {
      type: Actions;
      payload: {
        ref?: RefObject<HTMLElement | null>;
        pickerId?: undefined | string;
        nestedLevel: number;
      };
    }
  | {
      type: 'select';
      payload: { item: ItemType; pickerId: string | undefined };
    }
  | {
      type: 'externalValueChanged';
      payload: Date;
    }
  | { type: 'defaultChanged'; payload: Partial<DatepickerState> }
  | {
      type: 'registerPicker';
      payload: {
        id: string;
        nestedLevel: number;
        defaultType?: ItemType['type'];
        defaultOpen: boolean;
        alwaysOpen?: boolean;
      };
    }
  | {
      type: 'unregisterPicker';
      payload: string;
    };

export type DatepickerSlot = {
  pickers: {
    [index: string]: {
      nestedLevel: number;
      attach: MutableRefObject<HTMLElement | null> | undefined;
      isOpen: boolean;
      alwaysOpen?: boolean;
      type?: ItemType['type'];
      defaultType?: ItemType['type'];
    };
  };

  disabled: boolean;

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
  format: (date: Date | null, format: string) => string;
  parse: (date: string, format: string, referenceDate: Date | null) => Date;
  toDateParts: (date: Date) => DateParts;
} & GetDateItems;

export type DatepickerState = Omit<DatepickerSlot, 'monthName' | 'value'> & {
  startOfWeek: number;

  config: DatepickerConfig;

  valueRef: RefObject<Date | null>;

  onChange: (value: Date | null) => void;
};

export const datePickerReducer = (
  state: DatepickerState,
  { type, payload }: DatepickerContextActions,
): DatepickerState => {
  const _match = type.match(
    /^(open|close|toggle|next|prev|dayMonthYear|dayMonth|dayYear|monthYear)(.*)$/,
  );
  if (_match) {
    type = _match[1] as Actions;
    let index = _match[2];

    if (index === '') {
      index =
        (['open', 'close', 'toggle'].includes(type)
          ? Object.keys(state.pickers)
              .reverse()
              .find(
                (key) =>
                  state.pickers[key].nestedLevel ===
                  (payload as any).nestedLevel + 1,
              ) || ''
          : (payload as any).pickerId) ||
        Object.keys(state.pickers).reverse()[0];

      if (index === undefined) {
        throw new Error('There is no Picker in the current Provider');
      }
    }

    switch (type) {
      case 'open':
        return {
          ...state,
          pickers: {
            ...state.pickers,
            [index]: {
              ...state.pickers[index],
              attach: payload.ref,
              isOpen: true,
            },
          },
        };
      case 'close':
        return {
          ...state,
          pickers: {
            ...state.pickers,
            [index]: {
              ...state.pickers[index],
              attach: undefined,
              isOpen: false,
              type: state.pickers[index].defaultType,
            },
          },
        };
      case 'toggle':
        return {
          ...state,
          pickers: {
            ...state.pickers,
            [index]: {
              ...state.pickers[index],
              attach: state.pickers[index]?.isOpen ? undefined : payload.ref,
              isOpen: !state.pickers[index].isOpen,
              type: state.pickers[index].defaultType,
            },
          },
        };
      case 'next': {
        if (!state.pickers[index].type) return state;

        const { month, year } = state;
        return match(state.pickers[index].type!, {
          hour: () => state,
          minute: () => state,
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
        if (!state.pickers[index].type) return state;

        const { month, year } = state;

        return match(state.pickers[index].type!, {
          hour: () => state,
          minute: () => state,
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
      case 'dayMonthYear': {
        return {
          ...state,
          pickers: {
            ...state.pickers,
            [index]: {
              ...state.pickers[index],
              type: state.pickers[index].type == 'day' ? 'month' : 'year',
            },
          },
        };
      }
      case 'dayMonth': {
        return {
          ...state,
          pickers: {
            ...state.pickers,
            [index]: {
              ...state.pickers[index],
              type: state.pickers[index].type == 'month' ? 'day' : 'month',
            },
          },
        };
      }
      case 'dayYear': {
        return {
          ...state,
          pickers: {
            ...state.pickers,
            [index]: {
              ...state.pickers[index],
              type: state.pickers[index].type == 'year' ? 'day' : 'year',
            },
          },
        };
      }
      case 'monthYear': {
        return {
          ...state,
          pickers: {
            ...state.pickers,
            [index]: {
              ...state.pickers[index],
              type: state.pickers[index].type == 'year' ? 'month' : 'year',
            },
          },
        };
      }
    }
  }

  switch (type) {
    case 'registerPicker':
      return {
        ...state,
        pickers: {
          ...state.pickers,
          [payload.id]: {
            nestedLevel: payload.nestedLevel,
            defaultType: payload.defaultType,
            type: payload.defaultType,
            attach: undefined,
            isOpen: payload.defaultOpen,
            alwaysOpen: payload.alwaysOpen,
          },
        },
      };
    case 'unregisterPicker': {
      const { [payload]: _, ...pickers } = state.pickers;
      return { ...state, pickers };
    }
    case 'today': {
      const today = new Date();
      today.setHours(state.hour, state.minute);
      state.onChange(today);

      const parts = state.config.toDateParts(today);

      return {
        ...state,
        year: parts.year,
        month: parts.month,
      };
    }
    case 'todayHour': {
      const today = new Date();
      state.onChange(today);

      const parts = state.config.toDateParts(today);

      return {
        ...state,
        year: parts.year,
        month: parts.month,
      };
    }
    case 'select': {
      const newState = { ...state };

      let newValue: Date | null = null;

      switch (payload.item.type) {
        case 'day': {
          newValue = new Date(payload.item.value);
          newValue.setHours(state.hour, state.minute);

          if (payload.pickerId)
            newState.pickers = {
              ...state.pickers,
              [payload.pickerId]: {
                ...state.pickers[payload.pickerId],
                attach: undefined,
                isOpen: false,
                type: state.pickers[payload.pickerId].defaultType,
              },
            };
          break;
        }
        case 'month': {
          newState.month = payload.item.value;
          if (payload.pickerId)
            newState.pickers = {
              ...state.pickers,
              [payload.pickerId]: {
                ...state.pickers[payload.pickerId],
                type: state.pickers[payload.pickerId].defaultType,
              },
            };
          break;
        }
        case 'year': {
          newState.year = payload.item.value;
          if (payload.pickerId)
            newState.pickers = {
              ...state.pickers,
              [payload.pickerId]: {
                ...state.pickers[payload.pickerId],
                type: 'month',
              },
            };
          break;
        }
        case 'hour': {
          newValue = state.valueRef.current
            ? new Date(state.valueRef.current)
            : new Date();

          newValue.setHours(payload.item.value);

          newState.hour = payload.item.value;

          if (payload.pickerId)
            newState.pickers = {
              ...state.pickers,
              [payload.pickerId]: {
                ...state.pickers[payload.pickerId],
                attach: undefined,
                isOpen: false,
              },
            };
          break;
        }
        case 'minute': {
          newValue = state.valueRef.current
            ? new Date(state.valueRef.current)
            : new Date();

          newValue.setMinutes(payload.item.value);

          newState.minute = payload.item.value;

          if (payload.pickerId)
            newState.pickers = {
              ...state.pickers,
              [payload.pickerId]: {
                ...state.pickers[payload.pickerId],
                attach: undefined,
                isOpen: false,
              },
            };
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
    case 'defaultChanged': {
      return {
        ...state,
        ...payload,
      };
    }
    case 'externalValueChanged': {
      const parts = state.config.toDateParts(payload);

      return {
        ...state,
        year: parts.year,
        month: parts.month,
        hour: payload.getHours(),
        minute: payload.getMinutes(),
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
  if (!context) throw new Error('You need to use component inside Datepicker');
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
    pickers: state.pickers,
    disabled: state.disabled,

    value: state.valueRef.current,
    month: state.month,
    monthName: state.config.monthNames[state.month - 1],
    year: state.year,
    hour: state.hour,
    minute: state.minute,
  };
}