import {
  useMemo, 
} from 'react';
import { itemsOnPageQuantity } from 'appConstants';
import { RequestStatus, PaginationForHook } from 'types';
import useInfiniteScroll from 'react-infinite-scroll-hook';

export const usePagination = ({
  total, status, increaseOffset, offset,
}: PaginationForHook) => {
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
