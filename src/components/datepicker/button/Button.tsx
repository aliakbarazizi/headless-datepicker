import { ElementType, Ref, useRef } from 'react';
import {
  Actions,
  DatepickerSlot,
  useDatepickerSlot,
} from '../../../context/context';
import { useSyncRef } from '../../../hooks/useSyncRef';
import { Props } from '../../../type';
import { forwardRef, render } from '../../../utils/render';

const DEFAULT_TAG = 'button';

export type ButtonProps<ElementTag extends ElementType> = Props<
  ElementTag,
  DatepickerSlot
> & {
  /**
   * Action can be one of these
   * - 'open' open the calendar
   * - 'close' close the calendar
   * - 'next' go to next month or year (depend on calendar mode)
   * - 'prev' go to prev month or year (depend on calendar mode)
   * - 'toggleDayMonthYear' toggle calendar mode between day and month and year
   * - 'toggleDayMonth' toggle calendar mode between day and month
   * - 'toggleDayYear' toggle calendar mode between day and year
   * - 'toggleMonthYear' toggle calendar mode between month and year
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
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    useSyncRef(buttonRef, ref);

    const { slot, dispatch } = useDatepickerSlot();

    const ourProps = {
      onClick: () => dispatch({ type: action, payload: buttonRef }),
    };

    return render(ourProps, props, slot, DEFAULT_TAG, buttonRef);
  },
);
