import { ForwardedRef, RefObject, useEffect } from 'react';

export const useSyncRef = <T>(
  innerRef: RefObject<T>,
  externalRef: ForwardedRef<T>,
) => {
  // keep both refs in sync
  useEffect(() => {
    // handle no ref... ^_^U
    if (!externalRef) return;

    // handle callback refs
    if (typeof externalRef === 'function') {
      externalRef(innerRef.current);
    }
    // handle object refs
    else {
      externalRef.current = innerRef.current;
    }
  });
};
