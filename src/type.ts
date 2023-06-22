import { ReactNode, ElementType, ComponentPropsWithoutRef } from 'react';

type OurProps<Tag extends ElementType, Slot> = {
  as?: Tag;

  children?: ReactNode | ((slot: Slot) => ReactNode);

  className?: 'className' extends keyof ComponentPropsWithoutRef<Tag>
    ? ComponentPropsWithoutRef<Tag>['className'] | ((slot: Slot) => string)
    : never;
};

type OmitOurProps<Props, OmitProps extends PropertyKey = never> = Omit<
  Props,
  OmitProps | keyof OurProps<never, never>
>;

export type Props<
  Tag extends ElementType,
  Slot = object,
  OmitProps extends PropertyKey = never,
  Overrides = object,
> = OmitOurProps<ComponentPropsWithoutRef<Tag>, OmitProps | keyof Overrides> &
  OurProps<Tag, Slot> &
  Overrides;
