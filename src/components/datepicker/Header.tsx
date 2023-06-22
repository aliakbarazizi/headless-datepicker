import { Ref, ElementType } from 'react';
import { Props } from '../../type';
import { forwardRef, render } from '../../utils/render';
import { DatepickerSlot, useDatepickerSlot } from './context';

const DEFAULT_TAG = 'div';

export type HeaderProps<ElementTag extends ElementType> = Props<
  ElementTag,
  DatepickerSlot
>;

export const Header = forwardRef(
  <ElementTag extends ElementType = typeof DEFAULT_TAG>(
    { ...props }: HeaderProps<ElementTag>,
    ref: Ref<HTMLElement>,
  ) => {
    const { slot } = useDatepickerSlot();

    const ourProps = {};

    console.count('header');

    return render(ourProps, props, slot, DEFAULT_TAG, ref);
  },
);
