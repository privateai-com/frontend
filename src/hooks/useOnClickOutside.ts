import { useEffect, useRef } from 'react';

export const useOnClickOutside = <T extends HTMLElement>(
  handler: (event: MouseEvent | TouchEvent) => void,
  buttonRef: React.RefObject<HTMLElement>,
) => {
  const ref = useRef<T>(null);
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (
        !ref.current ||
        ref.current.contains(event.target as Node) ||
        (event.target instanceof Node &&
          buttonRef.current &&
          buttonRef.current.contains(event.target))
      ) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, buttonRef]);

  return ref;
};
