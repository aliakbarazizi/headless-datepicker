import { Ref, ElementType } from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
} from '@floating-ui/react-dom';
import { Props } from '../../type';
import { forwardRef, render } from '../../utils/render';
import { DatepickerSlot, useDatepickerSlot } from './context';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { useSyncRef } from '../../hooks/useSyncRef';
import { UseFloatingOptions } from '@floating-ui/react-dom';
import { useScrollIntoItemIfNeeded } from '../../hooks/useScrollIntoItemIfNeeded';

const DEFAULT_TAG = 'div';

const defaultMiddleware = [
  offset(10),
  flip({ fallbackAxisSideDirection: 'end', crossAxis: false }),
  shift(),
];

export type PickerProps<ElementTag extends ElementType> = Props<
  ElementTag,
  DatepickerSlot
> & {
  /**
   * Ignore the internal state and show the always show the picker
   */
  alwaysOpen?: boolean;

  /**
   * Use css `display: none` to hide the picker instead of unmounting
   */
  hideOnClose?: boolean;

  /**
   * Override the default floating-ui middlewares
   *
   * @see https://floating-ui.com/docs/middleware
   */
  middleware?: UseFloatingOptions['middleware'];

  /**
   * The element that picker position will be calculated based on the that
   *
   * Default is the element that made picker open (<Datepicker.Input /> or <Datepicker.Button />)
   */
  attachTo?: React.RefObject<HTMLElement> | false;

  /**
   * Set picker mode to hour default is false
   */
  hourPicker?: boolean;
};

export const Picker = forwardRef(
  <ElementTag extends ElementType = typeof DEFAULT_TAG>(
    {
      alwaysOpen,
      hideOnClose,
      middleware = defaultMiddleware,
      attachTo,
      style,
      hourPicker = false,
      ...props
    }: PickerProps<ElementTag>,
    ref: Ref<HTMLElement>,
  ) => {
    const { state, slot, dispatch } = useDatepickerSlot();

    const elementAttachTo = alwaysOpen
      ? state.inputRef
      : attachTo !== undefined
      ? attachTo !== false
        ? attachTo
        : undefined
      : !hourPicker
      ? state.dateAttachRef
      : state.hourAttachRef;

    const open =
      alwaysOpen || (!hourPicker ? state.calendarOpen : state.hourOpen);

    console.log(open);

    const { refs, floatingStyles } = useFloating({
      open,
      elements: {
        reference: elementAttachTo ? elementAttachTo.current : null,
      },
      middleware: middleware,
      whileElementsMounted: autoUpdate,
    });

    useSyncRef(refs.floating, ref);

    const handleClickOutside = () => {
      if (open) dispatch({ type: !hourPicker ? 'close' : 'closeHour' });
    };

    useOnClickOutside([refs.floating, elementAttachTo], handleClickOutside);

    useScrollIntoItemIfNeeded(
      open && !hourPicker && slot.mode === 'year',
      'year',
      slot.year,
    );
    useScrollIntoItemIfNeeded(open && hourPicker, 'hour', slot.hour);
    useScrollIntoItemIfNeeded(open && hourPicker, 'minute', slot.minute);

    const ourProps = {
      style: {
        ...style,
        ...(elementAttachTo ? floatingStyles : {}),
      },
    };

    console.count('picker');

    return render(ourProps, props, slot, DEFAULT_TAG, refs.setFloating, {
      visible: open,
      hideOnClose,
    });
  },
);
