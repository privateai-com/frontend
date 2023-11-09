import { useCallback, useMemo, useState } from 'react';
import { itemsOnPageQuantity } from 'appConstants';
import { RequestStatus } from 'types';
import useInfiniteScroll from 'react-infinite-scroll-hook';

type PropsPagination = {
  total: number,
  status?: RequestStatus,
  changeOffset?: (offset: number) => void,
};

export const usePagination = ({
  total, status, changeOffset,
}: PropsPagination) => {
  const [offset, setOffset] = useState(0);

  const increaseOffset = useCallback(() => {
    setOffset((value) => {
      const newValue = value + 1;
      if (changeOffset) changeOffset(newValue);
      return newValue;
    });
  }, [changeOffset]);
  
  const isHasNextPage = (offset + 1) * itemsOnPageQuantity < total; 
  const isLoading = status === RequestStatus.REQUEST;
  
  const [sentryRef, { rootRef }] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: isHasNextPage ?? true,
    onLoadMore: increaseOffset,
    disabled: status === RequestStatus.ERROR,
    rootMargin: '0px 0px 40px 0px',
  });
  
  const endElementForScroll = useMemo(
    () => ((!isLoading || isHasNextPage) 
      ? (
        <div ref={sentryRef} /> 
      ) 
      : undefined), 
    [isHasNextPage, isLoading, sentryRef],
  );
  
  return {
    rootRef,
    endElementForScroll,
    offset,
    increaseOffset,
    isHasNextPage,
  };
};
