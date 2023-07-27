import { isEqual as isEqualDate } from 'date-fns';
import {
  ElementType,
  Fragment,
  Ref,
  forwardRef,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import {
  DatepickerConfig,
  DatepickerContext,
  DatepickerState,
  datePickerReducer,
  getSlot,
} from '../../../context/context';
import { useDisposables } from '../../../hooks/useDisposables';
import { useEvent } from '../../../hooks/useEvent';
import { Props } from '../../../type';
import { config as defaultConfig } from '../../../utils/config';
import { render } from '../../../utils/render';

const DEFAULT_TAG = Fragment;

export type ProviderProps<
  ElemenElementTag extends ElementType = typeof DEFAULT_TAG,
> = Props<
  ElemenElementTag,
  DatepickerState,
  'onChange' | 'defaultValue' | 'value',
  {
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
  }
>;

export const Provider = forwardRef(
  <ElemenElementTag extends ElementType>(
    {
      defaultValue,
      value,
      onChange: controlledOnChange,

      disabledKeyboardNavigation,
      disabled = false,
      config = defaultConfig,
      startOfWeek = 0,
      ...props
    }: ProviderProps<ElemenElementTag>,
    ref: Ref<HTMLElement>,
  ) => {
    const valueRef = useRef<Date | null>(value || defaultValue || null);

    const disposables = useDisposables();

    const onChange = useEvent((value: Date | null) => {
      if (isEqual(valueRef.current, value)) return;

      disposables.nextFrame(() => {
        valueRef.current = value;
        controlledOnChange?.(valueRef.current);
        dispatch({
          type: 'externalValueChanged',
          payload: value || new Date(),
        });
      });
      // disposables.nextFrame
    });

    const [state, dispatch] = useReducer(datePickerReducer, null, () => {
      const date = valueRef.current || new Date();
      const parts = config.toDateParts(date);

      return {
        config,
        disabled,
        year: parts.year,
        month: parts.month,
        hour: date.getHours(),
        minute: date.getMinutes(),
        calendarOpen: false,
        hourOpen: false,
        valueRef,
        startOfWeek,
        onChange,
        pickers: {},
      };
    });

    useEffect(() => {
      onChange(value || null);
    }, [value, onChange]);

    useEffect(() => {
      dispatch({ type: 'defaultChanged', payload: { startOfWeek } });
    }, [startOfWeek]);

    useEffect(() => {
      dispatch({ type: 'defaultChanged', payload: { disabled } });
    }, [disabled]);

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

export interface ComponentProvider {
  <ElementTag extends ElementType = typeof DEFAULT_TAG>(
    props: ProviderProps<ElementTag> & React.RefAttributes<ElementType>,
  ): JSX.Element;
}
