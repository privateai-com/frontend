/* eslint-disable no-console */
import { useCallback, useEffect, useState } from 'react';

const useScreenWidth = (screenWidth: number) => {
  const [isScreenWidth, setIsScreenWidth] = useState(false);
  const listener = useCallback(() => {
    setIsScreenWidth(document.body.clientWidth <= screenWidth);
  }, [screenWidth]);

  useEffect(() => {
    listener();
    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [listener]);
  return isScreenWidth;
};

export { useScreenWidth };
