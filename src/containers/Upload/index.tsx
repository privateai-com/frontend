import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';

import { Button } from 'components';
import {
  useLocalStorage,
  usePagination,
  useVipUser,
} from 'hooks';
import { itemsOnPageQuantity } from 'appConstants';
import { Article, RequestStatus, UploadFileStatus } from 'types';

import { 
  articlesCancelUpload, 
  articlesCancelUploadFetch, 
  articlesCreate,
  articlesGetMy, 
  articlesGetUploadStatus,
  articlesSetState,
} from 'store/articles/actionCreators';
import { articlesSelectors } from 'store/articles/selectors';
import { ArticlesActionTypes } from 'store/articles/actionTypes';
import { notification } from 'utils';
import { PageHead } from 'components/PageHead';
import Link from 'next/link';
import { defaultArticle } from './constants';

import styles from './styles.module.scss';
import { NewItem } from './NewItem';
import { DragNDropFullPage } from './DragNDropFullPage';

export const Upload = () => {
  const dispatch = useDispatch();
  const isVipUser = useVipUser();
  // const isMobile = useScreenWidth(ScreenWidth.mobile);

  const [doc, setDoc] = useState<File | null>(null);
  const [offset, setOffset] = useState(0);

  const increaseOffset = useCallback(() => {
    setOffset((value) => {
      const newValue = value + 1;
      return newValue;
    });
  }, []);

  const total = useSelector(articlesSelectors.getProp('total'));
  const articles = useSelector(articlesSelectors.getProp('uploadArticles'));
  const statusGetMyArticles = useSelector(
    articlesSelectors.getStatus(ArticlesActionTypes.GetMyArticles),
  );
  const upload = useSelector(
    articlesSelectors.getProp('upload'),
    shallowEqual,
  );
  
  const statusCreateArticle = useSelector(
    articlesSelectors.getStatus(ArticlesActionTypes.CreateArticle),
  );
  const isLoading = statusCreateArticle === RequestStatus.REQUEST;
  
  const queryParams = useMemo(() => ({
    limit: itemsOnPageQuantity,
    offset: offset * itemsOnPageQuantity,
    sortingDirection: 'DESC' as const,
    sortingField: 'id',
    isHidden: false,
  }), [offset]);

  const onConfirmClick = useCallback((userDoc: File | null) => {
    if (!userDoc) return;
    const fileName = userDoc.name;

    if (fileName.length > 100) {
      notification.error({ message: 'File name cannot exceed 100 characters' });
      return;
    }

    dispatch(articlesCreate({
      file: userDoc,
      callback: () => {
        dispatch(articlesGetMy(queryParams));
      },
    }));
    setDoc(null);
  }, [dispatch, queryParams]);

  // const onClearClick = () => {
  //   setDoc(null);
  // };

  // const timeToUploaded = Math.ceil(Object.values(upload)
  //   .reduce((sum, item) => sum + item.size, 0) / 1_000_000 / 60);

  // const timeToUploaded = (size: number) => size / 1_000_000 / 20;

  const {
    dataStorage,
    addItemStorage,
    removeItemByIdStorage,
    getItemByIdStorage,
  } = useLocalStorage('articles');
  
  const [currentArticles, setCurrentArticles] = useState<Article[]>([]);
  const [uploadArticles, setUploadArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (upload) {
      const uploadArticlesCurrent = Object.values(upload).reverse()
      // .filter((uploadArticle) => uploadArticle.status === RequestStatus.REQUEST)
      // .filter((uploadArticle) => uploadArticle.status !== RequestStatus.ERROR)
        .map((uploadData) => ({
          ...defaultArticle,
          id: uploadData.idArticle || Number(uploadData.id),
          title: uploadData.fileName,
          uploadProgress: uploadData.percentUpload,
          fileSize: uploadData.size,
          status: uploadData.status,
          uploadStatus: uploadData.uploadStatus,
          createdAt: uploadData.createdAt,
        }));

      setUploadArticles(uploadArticlesCurrent);
    }
  }, [upload]);

  useEffect(() => {
    const newUploadArticles = uploadArticles.filter((uploadArticle) =>
      !articles.some((article) => article.id === uploadArticle.id));

    const filteringArticles = articles.filter((article) => (
      !newUploadArticles.some((uploadArticle) => uploadArticle.id === article.id)
    ));

    const uniqueArticles = [...newUploadArticles, ...filteringArticles].map((article: Article) => {
      if (!dataStorage) return article;
      const storageItem =
        dataStorage.find((storage: { id: number }) => storage.id === article.id);
      if (storageItem && (!article.fileSize || !article.title)) {
        return {
          ...article,
          fileSize: storageItem.fileSize,
          title: storageItem.title,
          createdAt: storageItem.createdAt,
        };
      }
    
      return {
        ...article,
        fileSize: (article.fileSize ?? 0),
      };
    }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    setCurrentArticles(uniqueArticles);
  }, [articles, dataStorage, uploadArticles]);

  useEffect(() => {
    if (upload && Object.values(upload).length > 0) {
      const {
        idArticle, size, fileName, createdAt,
      } = Object.values(upload)[0];
      if (upload && idArticle) {
        const isArticleStorage = !getItemByIdStorage(idArticle);
        
        if (isArticleStorage) {
          addItemStorage({
            id: idArticle,
            fileSize: size,
            title: fileName,
            createdAt,
          });
        }
      }
    }
  }, [addItemStorage, dispatch, getItemByIdStorage, upload]);

  useEffect(() => {
    dispatch(articlesGetUploadStatus());
  }, [dispatch]);

  useEffect(() => {
    dispatch(articlesGetMy(queryParams));
  }, [dispatch, queryParams]);

  const {
    rootRef, endElementForScroll,
  } = usePagination({ 
    offset,
    total, 
    status: statusGetMyArticles, 
    increaseOffset,
  });

  const handleCancelUploadFetch = useCallback((articleId: number) => {
    dispatch(articlesCancelUploadFetch({ id: articleId }));
  }, [dispatch]);

  const handleCancelUpload = useCallback((articleId: number) => {
    dispatch(articlesCancelUpload({
      articleId,
      isHidden: true,
      callback: () => {
        removeItemByIdStorage(`${articleId}`);
        setUploadArticles(() => (Object.values(upload).reverse()
          .filter((uploadArticle) => uploadArticle.idArticle !== articleId)
          .map((uploadData) => 
            ({
              ...defaultArticle,
              id: uploadData.idArticle || Number(uploadData.id),
              title: uploadData.fileName,
              uploadProgress: uploadData.percentUpload,
              fileSize: uploadData.size,
              status: uploadData.status,
            }))));
        dispatch(articlesGetMy({
          ...queryParams,
          limit: +queryParams.offset + +queryParams.limit,
          offset: 0,
        }));
        dispatch(articlesSetState({ upload: {} }));
      },
    }));
  }, [dispatch, queryParams, removeItemByIdStorage, upload]);

  const handleCancelUploadLocal = useCallback((articleId: number) => {
    const uploadCurrent = { ...upload };
    if (uploadCurrent[articleId]) {
      delete uploadCurrent[articleId];
      dispatch(articlesSetState({ upload: uploadCurrent }));
    } else {
      handleCancelUpload(articleId);
    }
  }, [dispatch, handleCancelUpload, upload]);

  const isDisabledUploadFile = isVipUser;

  const getCancelFunction = useCallback((uploadStatus: UploadFileStatus, id: number) => {
    switch (uploadStatus) {
      case UploadFileStatus.CREATED:
        return handleCancelUploadFetch(id);
      case UploadFileStatus.COMPLETE:
      case UploadFileStatus.PUBLISHED:
      case UploadFileStatus.UPLOADED:
      case UploadFileStatus.QUEUE:
      case UploadFileStatus.PROCESSING:
        return handleCancelUpload(id);
      case UploadFileStatus.ERROR:
        return handleCancelUploadLocal(id);
      default:
        return undefined;
    }
  }, [handleCancelUpload, handleCancelUploadFetch, handleCancelUploadLocal]);

  return (
    <div className={styles.upload}>
      {/* <Typography
        className={styles.upload_title}
        type="h3"
      >
        Upload activity
      </Typography> */}
      <PageHead 
        title="Upload activity"
        btnWrap={(
          <Button
            theme="primary"
            className={styles.customBtn}
          // style={{padding:0}}
          >
            <label htmlFor="upload" className={styles.labelCustomBtn}>
              Upload file
            </label>
            {/* eslint-disable-next-line */}
        </Button>
        )}
      />
      {/* </PageHead> */}
      {/* <div className={styles.upload_wrapper}> */}
      <div className="">
        
        <div className={styles.upload_dnd_block}>
          <DragNDropFullPage
            doc={doc}
            setDoc={setDoc}
            onConfirmClick={onConfirmClick}
            isDisabled={isDisabledUploadFile}
          />
        </div>
      </div>
      {/* <div className={styles.statuses}>
          <Typography
            className={styles.statuses_title}
            type="h4"
          >
            Statuses
          </Typography>
          <div className={styles.statuses_items} ref={rootRef}>
            <div className={styles.statuses_wrapper}>
              <div className={styles.statuses_content}>
                {currentArticles.map(({
                  id, title, uploadProgress, fileSize, uploadStatus,
                }) => (
                  <Item
                    key={id}
                    onCancel={() => getCancelFunction(uploadStatus, id)}
                    name={`${title}`}
                    percents={uploadStatus === UploadFileStatus.ERROR
                      ? 100
                      : uploadProgress}
                    weight={filesize(fileSize || 0, { standard: 'jedec' })}
                    idArticle={id}
                    timeToUploaded={Math.round(timeToUploaded(fileSize || 0))}
                    status={uploadStatus}
                  />
                ))}
                {endElementForScroll}
              </div>
            </div>
          </div>
        </div> */}

      <div className={styles.uploadTable}>
        <div className={cx(styles.uploadHead, styles.uploadTableRow)}>
          <div className={styles.uploadTable_col}>
            File name
          </div>
          <div className={styles.uploadTable_col}>
            Size
          </div>
          <div className={styles.uploadTable_col}>
            Upload on
          </div>
          <div className={styles.uploadTable_col}>
            Status
          </div>
        </div>
        <div
          className={cx([styles.uploadBody, 
            (!currentArticles || currentArticles.length === 0) && styles.uploadBody_empty])} 
          ref={rootRef}
        >

          {currentArticles.map((
            {
              id, title, uploadProgress, fileSize, uploadStatus, updatedAt, 
            },
          ) => (
            <NewItem
              key={id}
              title={title}
              uploadProgress={uploadProgress}
              fileSize={fileSize}
              onCancel={() => getCancelFunction(uploadStatus, id)}
              status={uploadStatus}
              updatedAt={updatedAt}
              // timeToUploaded={timeToUploaded || 0}
            />
          ))}

          { 
              (!currentArticles || currentArticles.length === 0) && !isLoading && (
                <div className={styles.noData}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="142" height="142" viewBox="0 0 142 142" fill="none">
                    <circle cx="71" cy="71" r="71" fill="#4659FE" fillOpacity="0.08" />
                    <path d="M40 42.5H57L63 47.5H98.5C102.918 47.5 106.5 51.0817 106.5 55.5V56.5V65.5H56L43 100H40C36.6863 100 34 97.3137 34 94V48.5C34 45.1863 36.6863 42.5 40 42.5Z" fill="white" />
                    <path d="M106.632 65.2V53.4588C106.632 50.1451 103.946 47.4588 100.632 47.4588H62.6437L59.5311 44.3446C58.0307 42.8434 55.9953 42 53.8728 42H40C36.6863 42 34 44.6863 34 48V93C34 96.866 37.134 100 41 100H42.8659M106.632 65.2H121.6C122.286 65.2 122.768 65.8753 122.546 66.5244L111.992 97.2976C111.438 98.9142 109.917 100 108.208 100H42.8659M106.632 65.2H58.6026C56.9319 65.2 55.4371 66.2385 54.8541 67.8042L42.8659 100" stroke="#7C859E" strokeWidth="3" />
                  </svg>
                  <h3>
                    Nothing here yet...
                  </h3>
                  <p>
                    This list is currently empty. 
                    Check out the 
                    {' '}
                    <Link href="/knowledge">Knowledge base</Link>
                    {' '}
                    and feel free to upload your research data in the 
                    &quot;
                    <Link href="/storage">My storage</Link>
                    &quot; section to discover more features.
                  </p>
            
                </div>
              )
}

          {endElementForScroll}
        </div>
      </div>

      {/* </div> */}
    </div>
  );
};
