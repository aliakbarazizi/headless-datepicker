import {
  Fragment,
  Ref,
  ElementType,
  useReducer,
  useRef,
  useEffect,
} from 'react';
import { isEqual as isEqualDate } from 'date-fns';
import { Props } from '../../type';
import { forwardRef, render } from '../../utils/render';
import {
  DatepickerConfig,
  DatepickerContext,
  DatepickerState,
  datePickerReducer,
  getSlot,
} from './context';
import { config as defaultConfig } from './config';
import { useEvent } from '../../hooks/useEvent';

const DEFAULT_TAG = Fragment;

export type DatepickerProps<ElementTag extends ElementType> = Props<
  ElementTag,
  DatepickerState & {
    weekDays: string[];
  },
  'onChange' | 'defaultValue' | 'value'
> & {
  /**
   * Default value of the date
   */
  defaultValue?: Date;

  /**
   * Value of date picker
   */
  value?: Date | null;

  /**
   * On value change
   * @param value The new date value
   * @returns void
   */
  onChange?: (value: Date | null) => void;

  /**
   * Disable keyboard navigation
   */
  disabledKeyboardNavigation?: boolean;

  /**
   * Disable calendar (it will disabled Input too)
   */
  disabled?: boolean;

  /**
   * Override calendar config
   *
   * @see DatepickerConfig
   */
  config?: DatepickerConfig;

  /**
   * 0 for Sunday
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay#return_value
   */
  startOfWeek?: number;
};

const logReducer: typeof datePickerReducer = (...args) => {
  console.log('reducer called', args[1]['type']);

  const state = datePickerReducer(...args);

  if (args[0] !== state) console.log('stated changed');

  return state;
};

export const Datepicker = forwardRef(
  <ElementTag extends ElementType = typeof DEFAULT_TAG>(
    {
      defaultValue,
      value,
      onChange: controlledOnChange,

      disabledKeyboardNavigation,
      disabled = false,
      config = defaultConfig,
      startOfWeek = 0,
      ...props
    }: DatepickerProps<ElementTag>,
    ref: Ref<HTMLElement>,
  ) => {
    const valueRef = useRef<Date | null>(value || defaultValue || null);
    const inputRef = useRef<HTMLElement | null>(null);

    const onChange = useEvent((value: Date | null, externalChange = false) => {
      if (isEqual(valueRef.current, value)) return;

      valueRef.current = value;

      if (externalChange === false) controlledOnChange?.(valueRef.current);

      const parts = config.getDateParts(value || new Date());

      dispatch({ type: 'externalValueChanged', payload: { parts } });
      // disposables.nextFrame
    });

    const [state, dispatch] = useReducer(logReducer, null, () => {
      const parts = config.getDateParts(valueRef.current || new Date());

      return {
        config,
        disabled,
        year: parts.year,
        month: parts.month,
        hour: parts.hour,
        minute: parts.minute,
        calendarOpen: false,
        hourOpen: false,
        valueRef,
        inputRef,
        startOfWeek,
        mode: 'day' as const,
        onChange,
        dateAttachRef: undefined,
        hourAttachRef: undefined,
      };
    });

    useEffect(() => {
      onChange(value || null);
    }, [value, onChange]);

    // let d = useDisposables()
    // let handleKeyDown = useEvent((event: ReactKeyboardEvent<HTMLButtonElement>) => {
    //   switch (event.key) {
    //     // Ref: https://www.w3.org/WAI/ARIA/apg/patterns/menubutton/#keyboard-interaction-13

    //     case Keys.Space:
    //     case Keys.Enter:
    //     case Keys.ArrowDown:
    //       event.preventDefault()
    //       actions.openListbox()
    //       d.nextFrame(() => {
    //         if (!data.value) actions.goToOption(Focus.First)
    //       })
    //       break

    //     case Keys.ArrowUp:
    //       event.preventDefault()
    //       actions.openListbox()
    //       d.nextFrame(() => {
    //         if (!data.value) actions.goToOption(Focus.Last)
    //       })
    //       break
    //   }
    // })

    // let handleKeyUp = useEvent((event: ReactKeyboardEvent<HTMLButtonElement>) => {
    //   switch (event.key) {
    //     case Keys.Space:
    //       // Required for firefox, event.preventDefault() in handleKeyDown for
    //       // the Space key doesn't cancel the handleKeyUp, which in turn
    //       // triggers a *click*.
    //       event.preventDefault()
    //       break
    //   }
    // })

    const ourProps = {};

    console.count('datepicker');

    return (
      <DatepickerContext.Provider value={{ state, dispatch }}>
        {render(ourProps, props, getSlot(state), DEFAULT_TAG, ref)}
      </DatepickerContext.Provider>
    );
  },
);

function isEqual(first: Date | null, second: Date | null) {
  return (
    first === second ||
    (first !== null && second !== null && isEqualDate(first, second))
  );
}
