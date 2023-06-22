import { Ref, ElementType, useMemo } from 'react';
import { Props } from '../../type';
import { forwardRef, render } from '../../utils/render';
import { DateItemType, HourItemType, useDatepickerSlot } from './context';
import { match } from '../../utils/match';
import { isSameDay } from 'date-fns';

const DEFAULT_TAG = 'div';

type ItemsType = DateItemType | HourItemType;

export type ItemsProps<
  ElementTag extends ElementType,
  Type extends ItemsType['type'],
> = Props<
  ElementTag,
  {
    items: Extract<ItemsType, { type: Type }>[];
    isSelected: (item: Extract<ItemsType, { type: Type }>) => boolean;
  }
> & {
  type: Type;
};

export const Items = forwardRef(
  <
    Type extends ItemsType['type'],
    ElementTag extends ElementType = typeof DEFAULT_TAG,
  >(
    { type, ...props }: ItemsProps<ElementTag, Type>,
    ref: Ref<HTMLElement>,
  ) => {
    const { state } = useDatepickerSlot();

    const items = useMemo(
      () =>
        type === 'hour' || type === 'minute'
          ? state.config[(type + 's') as `${typeof type}s`]({
              type,
            } as any)
          : state.config[(type + 's') as `${typeof type}s`]({
              type,
              year: state.year,
              month: state.month,
              value: state.valueRef.current,
              startOfWeek: state.startOfWeek,
            } as any),
      [
        type,
        state.valueRef,
        state.config,
        state.month,
        state.year,
        state.startOfWeek,
      ],
    );

    const isSelected = (item: DateItemType | HourItemType) =>
      match(item.type, {
        day: () =>
          state.valueRef.current !== null &&
          isSameDay(state.valueRef.current, (item as DateItemType).value),
        month: () => state.month === item.value,
        year: () => state.year === item.value,
        hour: () => state.hour === item.value,
        minute: () => state.minute === item.value,
      });

    const ourProps = {};

    console.count('items');

    return render(
      ourProps,
      props,
      {
        items,
        isSelected,
        // weekDays,
      },
      DEFAULT_TAG,
      ref,
    );
  },
);
