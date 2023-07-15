import { ElementType, Ref, useContext, useRef } from 'react';
import {
  Actions,
  DatepickerSlot,
  useDatepickerSlot,
} from '../../../context/context';
import { useSyncRef } from '../../../hooks/useSyncRef';
import { Props } from '../../../type';
import { forwardRef, render } from '../../../utils/render';
import { PickerContext } from '../picker/Picker';

const DEFAULT_TAG = 'button';

export type ButtonProps<ElementTag extends ElementType> = Props<
  ElementTag,
  DatepickerSlot
> & {
  /**
   * You can add the `Picker.id` in the end of action to specify the picker you want.
   *
   * For example `openTestPicker` will open the picker with `TestPicker` id.
   *
   * The only exception is `today` and `todayHour` since they set value for all pickers.
   *
   * For `open`, `close` or `toggle` the default target Picker is the first Picker in siblings.
   * For others the default target Picker is the parent Picker.
   * If no picker found, it will be the first Picker.
   *
   * Action can be one of these
   * - `today` set the value to today
   * - `todayHour` set the value to today with current hour
   * - `open` or `'open' + pickerId` open the calendar
   * - `close` or `'close' + pickerId` close the calendar
   * - `toggle` or `'toggle' + pickerId` close the calendar
   * - `next` or `'next' + pickerId` go to next month or year (depend on calendar mode)
   * - `prev` or `'prev' + pickerId` go to prev month or year (depend on calendar mode)
   * - `dayMonthYear` or `'dayMonthYear' + pickerId` toggle calendar mode between day and month and year
   * - `dayMonth` or `'dayMonth' + pickerId` toggle calendar mode between day and month
   * - `dayYear` or `'dayYear' + pickerId` toggle calendar mode between day and year
   * - `monthYear` or `'monthYear' + pickerId` toggle calendar mode between month and year
   */
  action: Actions;
};

export const Button = forwardRef(
  <ElementTag extends ElementType = typeof DEFAULT_TAG>(
    { action, ...props }: ButtonProps<ElementTag>,
    ref: Ref<HTMLElement>,
  ) => {
    const { id, nestedLevel } = useContext(PickerContext);

    const buttonRef = useRef<HTMLButtonElement | null>(null);
    useSyncRef(buttonRef, ref);

    const { slot, dispatch } = useDatepickerSlot();

    const ourProps = {
      onClick: () =>
        dispatch({
          type: action,
          payload: { ref: buttonRef, nestedLevel, pickerId: id },
        }),
    };

    return render(ourProps, props, slot, DEFAULT_TAG, buttonRef);
  },
);
