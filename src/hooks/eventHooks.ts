import { useCallback, useRef, useState } from 'react';

/**
 * Handles element enter and leave, changing hover boolean value
 * @param initialState by default false
 */
export const useHoverEvent = (initialState = false) => {
  const [hover, setHover] = useState(initialState);

  const onMouseEnter = useCallback(() => setHover(true), [setHover]);
  const onMouseLeave = useCallback(() => setHover(false), [setHover]);

  return { hover, onMouseEnter, onMouseLeave };
};

/**
 * Handles element focus and blur, changing focused boolean value
 * @param initialState by default false
 */
export const useFocusEvent = (initialState = false) => {
  const [focused, setFocused] = useState(initialState);

  const onFocus = useCallback(() => setFocused(true), [setFocused]);
  const onBlur = useCallback(() => setTimeout(() => setFocused(false), 300), [setFocused]);

  return { focused, onBlur, onFocus };
};

export const useSetFocus = () => {
  const ref = useRef<HTMLInputElement>(null);

  const setFocus = () => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  return {
    ref,
    setFocus,
  };
};
