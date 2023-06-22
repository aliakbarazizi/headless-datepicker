import React, { useRef } from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

export const useEvent = function useEvent<
  F extends (...args: any[]) => any,
  P extends any[] = Parameters<F>,
  R = ReturnType<F>,
>(cb: (...args: P) => R) {
  const cache = useRef(cb);

  useIsomorphicLayoutEffect(() => {
    cache.current = cb;
  }, [cb]);

  return React.useCallback((...args: P) => cache.current(...args), [cache]);
};
