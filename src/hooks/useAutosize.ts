/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import autosize from 'autosize';

export const useAutosize = (active: boolean) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!ref.current || !active) {
      return;
    }

    autosize(ref.current);

    return () => { autosize.destroy(ref.current!); };
  }, [ref.current, active]);

  return ref;
};
