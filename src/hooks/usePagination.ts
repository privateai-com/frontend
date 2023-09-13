import { useCallback, useState } from 'react';
import { countRowsOnPage } from 'appConstants';

type PropsPagination = {
  countRows?: number,
  total: number,
};

export const usePagination = ({
  countRows = countRowsOnPage,
  total,
}: PropsPagination) => {
  const [currentPage, setCurrentPage] = useState(0);

  const skip = currentPage * countRows;

  const countMaxPage = total / countRows;

  const handleChangePage = useCallback((page: number) => {
    if (page < 0) setCurrentPage(0);
    if (page >= countMaxPage) setCurrentPage(countMaxPage - 1);
    setCurrentPage(page);
  }, [countMaxPage]);
  
  const handleBeginPage = useCallback(() => {
    setCurrentPage(0);
  }, []);

  const handleEndPage = useCallback(() => {
    setCurrentPage(countMaxPage - 1);
  }, [countMaxPage]);

  const isNeedPagination = total > countRowsOnPage;
  
  return {
    isNeedPagination,
    countMaxPage,
    skip, 
    first: countRows,
    currentPage,
    handleChangePage,
    handleBeginPage,
    handleEndPage,
  };
};
