import { RefObject } from 'react';
import useEventListener from './useEventListener';

type Handler = (event: MouseEvent) => void;

function useOnClickOutside<T extends HTMLElement | null = HTMLElement>(
  refs: RefObject<T> | Array<RefObject<T> | undefined>,
  handler: Handler,
): void {
  useEventListener('mousedown', (event) => {
    // Do nothing if clicking ref's element or descendent elements

    if (
      (Array.isArray(refs) ? refs : [refs]).some((ref) => {
        if (ref === undefined) return false;
        const el = ref?.current;

        if (!el || el.contains(event.target as Node)) {
          return true;
        }
      })
    ) {
      return;
    }

    handler(event);
  });
}

export default useOnClickOutside;
