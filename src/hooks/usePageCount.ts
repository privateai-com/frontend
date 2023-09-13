import { useMemo } from 'react';

export const usePageCount = (dataLength: number, countItemsInPage: number) => useMemo(
  () => Math.ceil(dataLength / countItemsInPage),
  [countItemsInPage, dataLength],
);
