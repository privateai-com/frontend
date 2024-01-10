import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';

import { Button } from 'components';
import {
  useLocalStorage,
  usePagination,
  useScreenWidth,
  useVipUser,
} from 'hooks';
import { ScreenWidth, itemsOnPageQuantity } from 'appConstants';
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
import { profileSelectors } from 'store/profile/selectors';
import { ArticlesActionTypes } from 'store/articles/actionTypes';
import { notification } from 'utils';
import { PageHead } from 'components/PageHead';
import { ButtonTransparent } from 'components/ButtonTransparent';
import { DragNDrop } from './DragNDrop';
import { defaultArticle } from './constants';

import styles from './styles.module.scss';
import { NewItem } from './NewItem';

export const Upload = () => {
  const dispatch = useDispatch();
  const isVipUser = useVipUser();
  const isMobile = useScreenWidth(ScreenWidth.mobile);

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
  
  const userFilledAllInfo = useSelector(
    profileSelectors.getPropAccountInfo('userFilledAllInfo'),
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

  const onConfirmClick = (arg: File | null) => {
    if(!arg) return;

    // if (!doc) return;
    const fileName = arg.name;

    if (fileName.length > 100) {
      notification.error({ message: 'File name cannot exceed 100 characters' });
      return;
    }

    dispatch(articlesCreate({
      file: arg,
      callback: () => {
        dispatch(articlesGetMy(queryParams));
      },
    }));
    setDoc(null);
  };

  const onClearClick = () => {
    setDoc(null);
  };

  const timeToUploaded = Math.ceil(Object.values(upload)
    .reduce((sum, item) => sum + item.size, 0) / 1_000_000 / 60);

  // const timeToUploaded = (size: number) => size / 1_000_000 / 20;

  const {
    dataStorage,
    addItemStorage,
    removeItemByIdStorage,
    getItemByIdStorage,
  } = useLocalStorage('articles');
  
  const [currentArticles, setCurrentArticles] = useState<Article[]>([]);
  const [uploadArticles, setUploadArticles] = useState<Article[]>([]);
  // console.log({ uploadArticles })
  useEffect(() => {
    if (upload) {
      setUploadArticles(() => (Object.values(upload).reverse()
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
        }))));
    }
  }, [upload]);

  useEffect(() => {
    const newUploadArticles = uploadArticles.filter((uploadArticle) =>
      !articles.some((article) => article.id === uploadArticle.id));

    setCurrentArticles(
      [...newUploadArticles, ...articles].map((article: Article) => {
        if (!dataStorage) return article;
        const storageItem =
          dataStorage.find((storage: { id: number }) => storage.id === article.id);
        if (storageItem && (!article.fileSize || !article.title)) {
          return {
            ...article,
            fileSize: storageItem.fileSize,
            title: storageItem.title,
          };
        }
      
        return {
          ...article,
          fileSize: (article.fileSize ?? 0),
        };
      }),
    );
  }, [articles, dataStorage, uploadArticles]);

  useEffect(() => {
    if (upload && Object.values(upload).length > 0) {
      const { idArticle, size, fileName } = Object.values(upload)[0];
      if (upload && idArticle) {
        const isArticleStorage = !getItemByIdStorage(idArticle);
        
        if (isArticleStorage) {
          addItemStorage({
            id: idArticle,
            fileSize: size,
            title: fileName,
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
        dispatch(articlesGetMy(queryParams));
        dispatch(articlesSetState({ upload: {} }));
      },
    }));
  }, [dispatch, queryParams, removeItemByIdStorage, upload]);

  const isDisabledUploadFile = isVipUser || !userFilledAllInfo;

  const getCancelFunction = useCallback((uploadStatus: UploadFileStatus, id: number) => {
    switch (uploadStatus) {
      case UploadFileStatus.CREATED:
        return handleCancelUploadFetch(id);
      case UploadFileStatus.COMPLETE:
      case UploadFileStatus.PUBLISHED:
      case UploadFileStatus.UPLOADED:
      case UploadFileStatus.QUEUE:
      case UploadFileStatus.PROCESSING:
      case UploadFileStatus.ERROR:
        return handleCancelUpload(id);
      default:
        return undefined;
    }
  }, [handleCancelUpload, handleCancelUploadFetch]);

  return (
    <div className={styles.upload}>
      {/* <Typography
        className={styles.upload_title}
        type="h3"
      >
        Upload activity
      </Typography> */}
      <PageHead 
        props={{
          title: 'Upload activity',
          btnWrap: <Button
            theme="primary"
          >
            <label htmlFor="upload">
              Upload file
            </label>
            {/* eslint-disable-next-line */}
          </Button>,
        }}
      />
      {/* </PageHead> */}
      {/* <div className={styles.upload_wrapper}> */}
      <div className="">
        
        <div className={styles.upload_dnd_block}>
          <DragNDrop
            doc={doc}
            setDoc={setDoc}
            onConfirmClick={onConfirmClick}
            isDisabled={isDisabledUploadFile}
          >
            
            {doc ? (
              <div className={styles.upload_btn_block}>
                {/* <ButtonTransparent
                  className={cx(styles.upload_btns, styles.upload_btns_filled)}
                  onClick={onConfirmClick}
                  isLoading={isLoading}
                >
                  Confirm
                </ButtonTransparent> */}
                <ButtonTransparent
                  className={styles.upload_btns}
                  // theme="secondary"
                  onClick={onClearClick}
                  disabled={isLoading}
                >
                  Cancel
                </ButtonTransparent>
              </div>
            ) : (
              // eslint-disable-next-line
              <>
                {!isMobile && (
                  <label
                    htmlFor="upload"
                    className={cx(styles.upload_btn, {
                      [styles.disabled]: isDisabledUploadFile,
                    })}
                  >
                    Select a file from local directory
                    <input
                      type="file"
                      id="upload"
                      className={styles.upload_input}
                      disabled={isDisabledUploadFile}
                    />
                  </label>
                )}
              </>
            )}
          </DragNDrop>
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
        <div className={cx(styles.uploadBody)} ref={rootRef}>

          {currentArticles.map((
            {
              id, title, uploadProgress, fileSize, uploadStatus, updatedAt, 
            },
          ) => (
            <NewItem
              key={`title-${id}`}
              props={{
                title,
                uploadProgress,
                fileSize, 
                onCancel: () => getCancelFunction(uploadStatus, id),
                status: 
                  // 'processing',
                  uploadStatus,
                updatedAt,  
                timeToUploaded: timeToUploaded || 0,
                // Math.round(timeToUploaded(fileSize || 0))
              }}
            />
          ))}
          {endElementForScroll}
        </div>
      </div>

      {/* </div> */}
    </div>
  );
};
