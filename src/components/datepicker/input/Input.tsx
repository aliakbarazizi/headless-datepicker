import { isValid } from 'date-fns';
import {
  ElementType,
  InputHTMLAttributes,
  Ref,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { DatepickerSlot, useDatepickerSlot } from '../../../context/context';
import { useDisposables } from '../../../hooks/useDisposables';
import { useEvent } from '../../../hooks/useEvent';
import { useSyncRef } from '../../../hooks/useSyncRef';
import { Props } from '../../../type';
import { forwardRef, render } from '../../../utils/render';
import { PickerContext } from '../picker/Picker';

const DEFAULT_TAG = 'input';

export type InputProps<ElementTag extends ElementType> = Props<
  ElementTag,
  DatepickerSlot
> &
  (
    | {
        /**
         * Value to format from default is "yyyy/MM/dd"
         *
         * @see https://date-fns.org/docs/format
         */
        format?: string;

        parse?: never;
      }
    | {
        /**
         * Decorate value
         * It can be useful to format date that shows in the input
         *
         * @param date current value
         * @param defaultFormat the default format come from config
         * @returns string the value to show in input
         */
        format?: (date: Date | null, defaultFormat: string) => string;

        /**
         * Parse the value of input when changed to Date
         *
         * If you don't provide this and format value is function the input will be readonly
         * @param date
         * @param defaultFormat the default format come from config
         * @param currentDate the current value of the Date it usefull to use it for reference in parse
         * @returns
         */
        parse?: (
          date: string,
          defaultFormat: string,
          currentDate: Date | null,
        ) => Date;
      }
  );

export const Input = forwardRef(
  <ElementTag extends ElementType = typeof DEFAULT_TAG>(
    { format, parse, type, showHour, ...props }: InputProps<ElementTag>,
    ref: Ref<HTMLElement>,
  ) => {
    const { nestedLevel } = useContext(PickerContext);

    const inputRef = useRef<HTMLButtonElement | null>(null);
    useSyncRef(inputRef, ref);

    const { state, slot, dispatch } = useDatepickerSlot();

    const _format =
      typeof format === 'string'
        ? format
        : showHour
        ? state.config.defaultDateHourFormat
        : state.config.defaultDateFormat;

    const formatter = useCallback(
      (date: Date | null) =>
        (typeof format === 'function' ? format : state.config.format)(
          date,
          _format,
        ),
      [format, _format, state.config],
    );

    const [dirtyInputValue, setDirtyInputValue] = useState<string | undefined>(
      undefined,
    );

    const inputValue = useMemo(
      () => formatter(slot.value),
      [slot.value, formatter],
    );

    const disposables = useDisposables();

    const onFocus = useEvent(() =>
      disposables.nextFrame(() =>
        dispatch({
          type: 'open',
          payload: { ref: inputRef, nestedLevel },
        }),
      ),
    );

    const onChange = useEvent((e) => setDirtyInputValue(e.target.value));

    const onBlur = useEvent((e) => {
      let parseValue: Date | null = null;

      if (e.target.value)
        try {
          parseValue = (
            typeof parse === 'function' ? parse : state.config.parse
          )(e.target.value, _format, slot.value);
        } catch (e) {
          /* empty */
        }

      if (parseValue !== null && isValid(parseValue)) {
        state.onChange(parseValue);
      }

      setDirtyInputValue(undefined);
    });

    const readOnly =
      typeof format === 'function' && typeof parse !== 'function';

    const ourProps: InputHTMLAttributes<HTMLInputElement> = {
      type: type || 'text',
      readOnly,
      value: dirtyInputValue !== undefined ? dirtyInputValue : inputValue,
      onFocus,
      onChange: !readOnly ? onChange : undefined,
      onBlur: !readOnly ? onBlur : undefined,
    };

    return render(ourProps, props, slot, DEFAULT_TAG, inputRef);
  },
);
