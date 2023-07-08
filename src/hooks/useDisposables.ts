import { useEffect, useState } from 'react';

/**
 * React reducer dispatch cause component re-render when the state don't changed
 * Unless we call it in useEffect
 * So with useDisposabled we queue the changed in useEffect
 * @see https://stackoverflow.com/a/58188135/1827594
 */
export function useDisposables() {
  // Using useState instead of useRef so that we can use the initializer function.
  const [d] = useState(disposables);
  useEffect(() => () => d.dispose(), [d]);
  return d;
}

function disposables() {
  const _disposables: Array<() => void> = [];

  const api = {
    addEventListener<TEventName extends keyof WindowEventMap>(
      element: HTMLElement | Window | Document,
      name: TEventName,
      listener: (event: WindowEventMap[TEventName]) => any,
      options?: boolean | AddEventListenerOptions,
    ) {
      element.addEventListener(name, listener as any, options);
      return api.add(() =>
        element.removeEventListener(name, listener as any, options),
      );
    },

    requestAnimationFrame(...args: Parameters<typeof requestAnimationFrame>) {
      const raf = requestAnimationFrame(...args);
      return api.add(() => cancelAnimationFrame(raf));
    },

    nextFrame(...args: Parameters<typeof requestAnimationFrame>) {
      return api.requestAnimationFrame(() => {
        return api.requestAnimationFrame(...args);
      });
    },

    add(cb: () => void) {
      _disposables.push(cb);
      return () => {
        const idx = _disposables.indexOf(cb);
        if (idx >= 0) {
          for (const dispose of _disposables.splice(idx, 1)) {
            dispose();
          }
        }
      };
    },

    dispose() {
      for (const dispose of _disposables.splice(0)) {
        dispose();
      }
    },
  };

  return api;
}
