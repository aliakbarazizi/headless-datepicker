import {
  ElementType,
  ForwardedRef,
  Fragment,
  ReactElement,
  Ref,
  RefAttributes,
  cloneElement,
  createElement,
  isValidElement,
  forwardRef as reactForwardRef,
} from 'react';
import { Props } from '../type';
import { classNames } from './class-names';

export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

export function render<ElementTag extends ElementType, TSlot>(
  ourProps: Expand<Props<ElementTag, TSlot>>,
  theirProps: Expand<Props<ElementTag, TSlot>>,
  slot: TSlot = {} as TSlot,
  tag: ElementType,
  ref: Ref<unknown>,
  strategy: {
    visible?: boolean;
    hideOnClose?: boolean;
  } = {},
) {
  if (strategy?.visible === false && strategy.hideOnClose !== true) {
    return null;
  }

  const { as, children, ...props } = mergeProps(theirProps, ourProps);

  const Component = as || tag;

  const resolvedChildren =
    typeof children === 'function' ? children(slot) : children;

  if (typeof props.className === 'function') {
    props.className = props.className(slot);
  }

  if (Component === Fragment) {
    if (Object.keys(props).length > 0) {
      if (
        !isValidElement(resolvedChildren) ||
        (Array.isArray(resolvedChildren) && resolvedChildren.length > 1)
      ) {
        throw new Error(
          [
            'Passing props on "Fragment"!',
            '',
            `The current component is rendering a "Fragment".`,
            `However we need to passthrough the following props:`,
            Object.keys(props)
              .map((line) => `  - ${line}`)
              .join('\n'),
            '',
            'You can apply a few solutions:',
            [
              'Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".',
              'Render a single element as the child so that we can forward the props onto that element.',
            ]
              .map((line) => `  - ${line}`)
              .join('\n'),
          ].join('\n'),
        );
      }

      const { childClassName, ...childProps } = resolvedChildren.props;

      const newClassName =
        typeof childClassName === 'function'
          ? (...args: unknown[]) =>
              classNames(childClassName(...args), props.className as string)
          : classNames(childClassName, props.className);

      const extraProps = newClassName
        ? { className: newClassName, ref }
        : { ref };

      return cloneElement(
        resolvedChildren,
        Object.assign(
          {},
          // Filter out undefined values so that they don't override the existing values
          mergeProps(childProps, props),
          extraProps,
        ),
      );
    }
  }

  return createElement(Component, { ...props, ref }, resolvedChildren);
}

function mergeProps(...listOfProps: Props<ElementType, unknown>[]) {
  if (listOfProps.length === 0) return {};
  if (listOfProps.length === 1) return listOfProps[0];

  const target: Props<ElementType, unknown> = {};

  const eventHandlers: Record<
    PropertyKey,
    ((
      event: { defaultPrevented: boolean },
      ...args: unknown[]
    ) => void | undefined)[]
  > = {};

  for (const props of listOfProps) {
    for (const prop in props) {
      // Collect event handlers
      if (prop.startsWith('on') && typeof props[prop] === 'function') {
        eventHandlers[prop] ??= [];
        eventHandlers[prop].push(props[prop]);
      } else {
        // Override incoming prop
        target[prop] = props[prop];
      }
    }
  }

  // Do not attach any event handlers when there is a `disabled` or `aria-disabled` prop set.
  if (target.disabled || target['aria-disabled']) {
    return Object.assign(
      target,
      // Set all event listeners that we collected to `undefined`. This is
      // important because of the `cloneElement` from above, which merges the
      // existing and new props, they don't just override therefore we have to
      // explicitly nullify them.
      Object.fromEntries(
        Object.keys(eventHandlers).map((eventName) => [eventName, undefined]),
      ),
    );
  }

  // Merge event handlers
  for (const eventName in eventHandlers) {
    Object.assign(target, {
      [eventName](
        event: { nativeEvent?: Event; defaultPrevented: boolean },
        ...args: unknown[]
      ) {
        const handlers = eventHandlers[eventName];

        for (const handler of handlers) {
          if (
            (event instanceof Event || event?.nativeEvent instanceof Event) &&
            event.defaultPrevented
          ) {
            return;
          }

          handler(event, ...args);
        }
      },
    });
  }

  return target;
}

export function forwardRef<T, P = object>(
  component: (props: P, ref: ForwardedRef<T>) => ReactElement | null,
): (props: P & RefAttributes<T>) => ReactElement | null {
  return reactForwardRef(component) as any;
}
