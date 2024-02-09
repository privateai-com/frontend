import {
  useCallback, useEffect, useMemo, useState, 
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AdaptivePaginationTable } from 'components';
import { itemsOnPageQuantity } from 'appConstants';
import { convertTitleFile, getStatusArticle } from 'utils';
import { RequestStatus, SortingDirection } from 'types';

import { ArticlesActionTypes } from 'store/articles/actionTypes';
import { articlesGetMy, articlesPublish } from 'store/articles/actionCreators';
import { articlesSelectors } from 'store/articles/selectors';
import { profileGetProfile } from 'store/profile/actionCreators';
import { useColumns } from './columns';

import styles from './styles.module.scss';

const itemsMobile = [
  {
    title: 'Status',
    key: 'uploadStatus',
  },
  {
    title: 'Core entities',
    key: 'topCoreEntities',
  },
];

export const ArticlesTab = ({ isMobile }: { isMobile: boolean }) => {
  const dispatch = useDispatch();

  const [offset, setOffset] = useState(0);

  const increaseOffset = useCallback(() => {
    setOffset((value) => {
      const newValue = value + 1;
      return newValue;
    });
  }, []);

  const itemsOnPageQuantityCurrent = isMobile ? 16 : itemsOnPageQuantity;

  const [selectSortingField, setSelectSortingField] = useState('id');
  const [selectSortingDirection, setSelectSortingDirection] = useState<SortingDirection>('DESC');

  const handleToggleDirection = useCallback(() => {
    setOffset(0);
    setSelectSortingDirection(
      (state) => (state === 'ASC' ? 'DESC' : 'ASC'),
    );
  }, []);

  const handleChangeSortField = useCallback((field: string) => {
    setOffset(0);
    setSelectSortingField(field);
  }, []);
  
  const total = useSelector(articlesSelectors.getProp('total'));
  const articles = useSelector(articlesSelectors.getProp('myArticles'));
  const statusGetMyArticles = useSelector(
    articlesSelectors.getStatus(ArticlesActionTypes.GetMyArticles),
  );

  const handlePublishClick = 
  useCallback(
    (articleID:number) => {
      articles.forEach((article) => {
        const { id } = article;
        if (id && id === articleID) {
          // dispatch(articleSetFetchingStatus({ status: true }));
          dispatch(articlesPublish({
            articleId: id,
            isPublished: true,
            callback: () => {
              setOffset(() => Number(0));
              dispatch(profileGetProfile());
            }, 
          }));
        }
      });
    },
    [articles, dispatch],
  );

  const isLoading = statusGetMyArticles === RequestStatus.REQUEST;
  const isHideRequests = !(isLoading && offset === 0); 

  const content = useMemo(() => articles.map((item) => ({
    ...item,
    title: convertTitleFile(item.title, 15),
    uploadStatus: getStatusArticle(item.uploadStatus),
  })), [articles]);

  useEffect(() => {
    const payload = {
      limit: itemsOnPageQuantityCurrent,
      offset: offset * itemsOnPageQuantityCurrent,
      sortingDirection: selectSortingDirection,
      sortingField: selectSortingField,
      doneStatus: true,
      isHidden: false,
    };
    dispatch(articlesGetMy(payload));
  }, [dispatch, itemsOnPageQuantityCurrent, offset, selectSortingDirection, selectSortingField]);

  const pagination = useMemo(() => ({
    total,
    increaseOffset,
    status: statusGetMyArticles, 
    offset,
  }), [increaseOffset, offset, statusGetMyArticles, total]);

  const columns = useColumns({
    onChangeSortingField: handleChangeSortField,
    onToggleDirection: handleToggleDirection,
    onPublishClick: handlePublishClick,
  });

  return (
    <>
      <div className="" style={{ position: 'relative' }}>
        {isHideRequests && (
          <AdaptivePaginationTable
            columns={columns}
            content={content}
            classNameTableContainer={styles.table}
            pagination={pagination}
            itemsMobile={itemsMobile}
            isMobile={isMobile}
            classNameMobile={styles.tableMobile}
            isLoading={isLoading}
          />
        )} 
      </div>
    
      {/* {isLoading && (
        <div className={styles.containerLoader}>
          <Loader size={64} />
        </div>
      )} */}
    </>
  );
};
