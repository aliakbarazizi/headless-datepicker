import { ElementType, Ref, useContext, useRef } from 'react';
import {
  Action,
  DatepickerSlot,
  useDatepickerSlot,
} from '../../../context/context';
import { useSyncRef } from '../../../hooks/useSyncRef';
import { Props } from '../../../type';
import { forwardRef, render } from '../../../utils/render';
import { PickerContext } from '../picker/Picker';

const DEFAULT_TAG = 'button';

export type ButtonProps<
  ElemenElementTag extends ElementType = typeof DEFAULT_TAG,
> = Props<
  ElemenElementTag,
  DatepickerSlot,
  never,
  {
    /**
     * You can add the `Picker.id` in the end of action to specify the picker you want.
     *
     * For example `openTestPicker` will open the picker with `TestPicker` id.
     *
     * The only exception is `today` and `todayHour` since they set value for all pickers.
     *
     * The default target Picker is the parent Picker.
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
     * - `year` or `'year' + pickerId` set showing items to year
     * - `month` or `'month' + pickerId` set showing items to month
     * - `day` or `'day' + pickerId` set showing items to day
     */
    action: Action;
  }
>;

export const Button = forwardRef(
  <ElemenElementTag extends ElementType>(
    { action, ...props }: ButtonProps<ElemenElementTag>,
    ref: Ref<HTMLElement>,
  ) => {
    const { id } = useContext(PickerContext);

    const buttonRef = useRef<HTMLButtonElement | null>(null);
    useSyncRef(buttonRef, ref);

    const { slot, dispatch } = useDatepickerSlot();

    const ourProps = {
      onClick: () =>
        dispatch({
          type: 'action',
          payload: { action, ref: buttonRef, pickerId: id },
        }),
    };

    return render(ourProps, props, slot, DEFAULT_TAG, buttonRef);
  },
);
export interface ComponentButton {
  <ElementTag extends ElementType = typeof DEFAULT_TAG>(
    props: ButtonProps<ElementTag> & React.RefAttributes<ElementType>,
  ): JSX.Element;
}
