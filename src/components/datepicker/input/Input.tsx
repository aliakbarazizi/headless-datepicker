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
> & {
  /**
   * The string of tokens that used to format date
   *
   * You can pass function for custom formatting functions
   *
   * The default value is "yyyy/MM/dd"
   *
   * @see https://date-fns.org/docs/format
   * @param date current value
   * @returns string the value to show in input
   */
  format?: string | ((date: Date | null) => string);

  /**
   * Parse the value of input when changed to Date
   * It will be ignored if the format value is not function.
   *
   * If you don't provide this and format value is function the input will be readonly
   *
   * @param date
   * @param currentDate the current value of the Date it usefull to use it for reference in parse
   * @returns
   */
  parse?: (date: string, currentDate: Date | null) => Date;
};

export const Input = forwardRef(
  <ElementTag extends ElementType = typeof DEFAULT_TAG>(
    { format = 'yyyy/MM/dd', parse, type, ...props }: InputProps<ElementTag>,
    ref: Ref<HTMLElement>,
  ) => {
    const { nestedLevel } = useContext(PickerContext);

    const inputRef = useRef<HTMLButtonElement | null>(null);
    useSyncRef(inputRef, ref);

    const { state, slot, dispatch } = useDatepickerSlot();

    const formatter = useCallback(
      (date: Date | null) =>
        typeof format === 'function'
          ? format(date)
          : state.config.format(date, format),
      [format, state.config],
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
          parseValue =
            typeof format === 'function'
              ? parse!(e.target.value, slot.value)
              : state.config.parse(e.target.value, format, slot.value);
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
      disabled: state.disabled,
      value: dirtyInputValue !== undefined ? dirtyInputValue : inputValue,
      onFocus,
      onChange: !readOnly ? onChange : undefined,
      onBlur: !readOnly ? onBlur : undefined,
    };

    return render(ourProps, props, slot, DEFAULT_TAG, inputRef);
  },
);
