import { ElementType, Ref, useContext } from 'react';
import {
  DateItemType,
  DatepickerSlot,
  HourItemType,
  useDatepickerSlot,
} from '../../../context/context';
import { Props } from '../../../type';
import { forwardRef, render } from '../../../utils/render';
import { PickerContext } from '../picker/Picker';
import { ButtonProps } from '..';

const DEFAULT_TAG = 'button';

export const itemDataAttribute = 'data-calendar-item-id' as const;

export type ItemProps<
  ElemenElementTag extends ElementType = typeof DEFAULT_TAG,
> = Props<
  ElemenElementTag,
  DatepickerSlot,
  typeof itemDataAttribute,
  {
    item: DateItemType | HourItemType;
  } & Partial<Pick<ButtonProps, 'action'>>
>;

export const Item = forwardRef(
  <ElemenElementTag extends ElementType>(
    { item, action, ...props }: ItemProps<ElemenElementTag>,
    ref: Ref<HTMLElement>,
  ) => {
    const { id } = useContext(PickerContext);

    const { state, slot, dispatch } = useDatepickerSlot();

    const ourProps = {
      [itemDataAttribute]: item.type + '-' + item.text,
      onClick:
        ('isHeader' in item && item.isHeader) || state.disabled
          ? undefined
          : () => {
              dispatch({
                type: 'select',
                payload: { item, pickerId: id, action },
              });
            },
    };

    return render(ourProps, props, slot, DEFAULT_TAG, ref);
  },
);

export interface ComponentItem {
  <ElementTag extends ElementType = typeof DEFAULT_TAG>(
    props: ItemProps<ElementTag> & React.RefAttributes<ElementType>,
  ): JSX.Element;
}
