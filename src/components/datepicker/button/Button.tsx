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
   * Action can be one of these
   * - 'open' open the calendar
   * - 'close' close the calendar
   * - 'toggle' close the calendar
   * - 'next' go to next month or year (depend on calendar mode)
   * - 'prev' go to prev month or year (depend on calendar mode)
   * - 'dayMonthYear' toggle calendar mode between day and month and year
   * - 'dayMonth' toggle calendar mode between day and month
   * - 'dayYear' toggle calendar mode between day and year
   * - 'monthYear' toggle calendar mode between month and year
   * - 'today' set the value to today
   * - 'todayHour' set the value to today with current hour
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
