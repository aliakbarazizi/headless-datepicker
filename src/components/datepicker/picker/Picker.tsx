import {
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
} from '@floating-ui/react-dom';
import { UseFloatingOptions } from '@floating-ui/react-dom';
import {
  ElementType,
  Ref,
  createContext,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
} from 'react';
import {
  DatepickerSlot,
  ItemType,
  useDatepickerSlot,
} from '../../../context/context';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { useSyncRef } from '../../../hooks/useSyncRef';
import { Props } from '../../../type';
import { forwardRef, render } from '../../../utils/render';

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
   * Set a unique id for the picker
   * It can be useful when you have multiple pickers
   * and you want to use `<Button />`
   * @see `Button.action` for more information
   */
  id?: string;

  /**
   * Set whether or not the picker should be opened by default
   * You may need to set the `attachTo` property to attach the picker to the element
   */
  defaultOpen?: boolean;

  /**
   * Ignore the internal state and show the always show the picker
   * You may need to set the `attachTo` property to attach the picker to the element
   */
  alwaysOpen?: boolean;

  /**
   * Use css `display: none` to hide the picker instead of unmounting
   */
  hideOnClose?: boolean;

  /**
   * Set the default value for `<Items />`
   * You must either set the default value or set the type in the `Items` component
   */
  defaultType?: ItemType['type'];

  /**
   * The element that picker position will be calculated based on the that
   *
   * Default is the element that made picker open
   * `<Datepicker.Input />` or `<Datepicker.Button />`
   */
  attachTo?: React.RefObject<HTMLElement> | false;

  /**
   * Override the default floating-ui middlewares
   *
   * Only works if attachTo is not `false`.
   *
   * Read more at <a href="https://floating-ui.com/docs/middleware" target="_blank">Floating UI</a>
   *
   * @see https://floating-ui.com/docs/middleware
   */
  middleware?: UseFloatingOptions['middleware'];
};

export const PickerContext = createContext<{
  nestedLevel: number;
  id?: string;
  defaultType?: ItemType['type'];
}>({ nestedLevel: 0 });

export const Picker = forwardRef(
  <ElementTag extends ElementType = typeof DEFAULT_TAG>(
    {
      alwaysOpen,
      hideOnClose,
      middleware = defaultMiddleware,
      attachTo,
      style,
      defaultType: _defaultType,
      defaultOpen: _defaultOpen = false,
      id,
      ...props
    }: PickerProps<ElementTag>,
    ref: Ref<HTMLElement>,
  ) => {
    const { nestedLevel } = useContext(PickerContext);

    const _id = useId();

    const pickerId = id || _id;

    const { state, slot, dispatch } = useDatepickerSlot();

    const defaultType = useRef(_defaultType);
    const defaultOpen = useRef(_defaultOpen);

    useEffect(() => {
      dispatch({
        type: 'registerPicker',
        payload: {
          id: pickerId,
          nestedLevel: nestedLevel + 1,
          defaultType: defaultType.current,
          defaultOpen: defaultOpen.current,
        },
      });
      return () => dispatch({ type: 'unregisterPicker', payload: pickerId });
    }, [dispatch, pickerId, nestedLevel]);

    const pickerState = state.pickers[pickerId];

    const elementAttachTo =
      attachTo === false
        ? undefined
        : attachTo !== undefined
        ? attachTo
        : alwaysOpen
        ? undefined
        : pickerState?.attach;

    const open = alwaysOpen || pickerState?.isOpen || false;

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
      if (open && !alwaysOpen)
        dispatch({ type: `close${pickerId}`, payload: { nestedLevel } });
    };

    useOnClickOutside([refs.floating, elementAttachTo], handleClickOutside);

    const ourProps = {
      style: {
        ...style,
        ...(elementAttachTo?.current ? floatingStyles : {}),
      },
    };

    return (
      <PickerContext.Provider
        value={useMemo(
          () => ({
            nestedLevel: nestedLevel + 1,
            id: pickerId,
            defaultType: defaultType.current,
          }),
          [nestedLevel, pickerId],
        )}
      >
        {render(ourProps, props, slot, DEFAULT_TAG, refs.setFloating, {
          visible: open,
          hideOnClose,
        })}
      </PickerContext.Provider>
    );
  },
);
