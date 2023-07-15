import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

type OurProps<Tag extends ElementType, Slot> = {
  /**
   * React Element type
   *
   * You can either use html tag as string or component name
   */
  as?: Tag;

  /**
   * You can pass function as argument to access Datepicker context values
   */
  children?: ReactNode | ((slot: Slot) => ReactNode);

  /**
   * You can use function for className to access Datepicker context values
   */
  className?: 'className' extends keyof ComponentPropsWithoutRef<Tag>
    ? string | ((slot: Slot) => string)
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
