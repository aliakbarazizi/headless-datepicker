import { useLayoutEffect } from 'react';
import { itemDataAttribute } from '../components/datepicker/item/Item';

export function useScrollIntoItemIfNeeded(
  enable: boolean,
  type?: string,
  value?: string | number,
) {
  useLayoutEffect(() => {
    if (enable && value && type) {
      const el = document.querySelector(
        `[${itemDataAttribute}="${type}-${value}"]`,
      );

      if (el) {
        el.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [type, value, enable]);
}
