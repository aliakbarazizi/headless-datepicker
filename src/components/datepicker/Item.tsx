import { Ref, ElementType } from 'react';
import { Props } from '../../type';
import { forwardRef, render } from '../../utils/render';
import {
  DateItemType,
  DatepickerSlot,
  HourItemType,
  useDatepickerSlot,
} from './context';

const DEFAULT_TAG = 'button';

export const itemDataAttribute = 'data-calendar-item-id' as const;

export type ItemProps<ElementTag extends ElementType> = Props<
  ElementTag,
  DatepickerSlot,
  typeof itemDataAttribute
> & { item: DateItemType | HourItemType };

export const Item = forwardRef(
  <ElementTag extends ElementType = typeof DEFAULT_TAG>(
    { item, ...props }: ItemProps<ElementTag>,
    ref: Ref<HTMLElement>,
  ) => {
    const { slot, dispatch } = useDatepickerSlot();

    const ourProps = {
      [itemDataAttribute]: item.type + '-' + item.text,
      onClick: () => {
        dispatch({
          type: 'select',
          payload: item,
        });
      },
    };

    return render(ourProps, props, slot, DEFAULT_TAG, ref);
  },
);
