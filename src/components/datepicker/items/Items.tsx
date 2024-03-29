import { ElementType, Ref, useContext, useMemo } from 'react';
import {
  DateItemType,
  DatepickerSlot,
  HourItemType,
  useDatepickerSlot,
} from '../../../context/context';
import { useScrollIntoItemIfNeeded } from '../../../hooks/useScrollIntoItemIfNeeded';
import { Props } from '../../../type';
import { forwardRef, render } from '../../../utils/render';
import { PickerContext } from '../picker/Picker';

const DEFAULT_TAG = 'div';

type ItemsType = DateItemType | HourItemType;

export type ItemsProps<
  Type extends ItemsType['type'],
  ElemenElementTag extends ElementType = typeof DEFAULT_TAG,
> = Props<
  ElemenElementTag,
  {
    items: Extract<ItemsType, { type: Type }>[];
    type: Type;
  } & DatepickerSlot,
  never,
  {
    /**
     * Specifiy which type of items will calculate.
     * If it's empty you must set `defaultType` property in `Picker` component,
     * And the value will be calculated automatically.
     */
    type?: Type;

    /**
     * Scroll to selected item when mounted
     * this is only for year, minute and hour
     */
    disableAutoScroll?: boolean;
  }
>;

export const Items = forwardRef(
  <Type extends ItemsType['type'], ElemenElementTag extends ElementType>(
    {
      type: _type,
      disableAutoScroll,
      ...props
    }: ItemsProps<Type, ElemenElementTag>,
    ref: Ref<HTMLElement>,
  ) => {
    const { id, defaultType } = useContext(PickerContext);
    const { state } = useDatepickerSlot();

    const picker = id ? state.pickers[id] : undefined;

    const type: ItemsType['type'] | undefined =
      _type || picker?.type || defaultType;

    if (type === undefined) {
      throw new Error(
        'No type provided, You need either need set the type to Items or set the defaultType to Picker component',
      );
    }

    const value = state.valueRef.current;

    const items = useMemo(
      () =>
        type === 'hour' || type === 'minute'
          ? state.config[(type + 's') as `${typeof type}s`]({
              type,
              hour: state.hour,
              minute: state.minute,
            } as any)
          : state.config[(type + 's') as `${typeof type}s`]({
              type,
              year: state.year,
              month: state.month,
              value: value,
              startOfWeek: state.startOfWeek,
            } as any),
      [
        type,
        value,
        state.config,
        state.month,
        state.year,
        state.hour,
        state.minute,
        state.startOfWeek,
      ],
    );

    useScrollIntoItemIfNeeded(
      disableAutoScroll !== true &&
        picker !== undefined &&
        (picker.alwaysOpen === true || picker.isOpen) &&
        ['year', 'hour', 'minute'].includes(type),
      type,
      type !== 'day' ? state[type] : undefined,
    );

    const ourProps = {};

    return render(
      ourProps,
      props,
      {
        items,
        type,
        ...state,
      },
      DEFAULT_TAG,
      ref,
    );
  },
);

export interface ComponentItems {
  <
    Type extends ItemsType['type'],
    ElementTag extends ElementType = typeof DEFAULT_TAG,
  >(
    props: ItemsProps<Type, ElementTag> & React.RefAttributes<ElementType>,
  ): JSX.Element;
}
