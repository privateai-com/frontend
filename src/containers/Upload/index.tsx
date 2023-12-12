import { filesize } from 'filesize';
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';

import { Button, Typography } from 'components';
import {
  useLocalStorage,
  usePagination,
  useScreenWidth,
  useVipUser,
} from 'hooks';
import { ScreenWidth, itemsOnPageQuantity } from 'appConstants';
import { Article, RequestStatus, UploadFileStatus } from 'types';

import { 
  articlesCancelUpload, articlesCreate, articlesGetMy, 
  articlesGetUploadStatus,
} from 'store/articles/actionCreators';
import { articlesSelectors } from 'store/articles/selectors';
import { profileSelectors } from 'store/profile/selectors';
import { ArticlesActionTypes } from 'store/articles/actionTypes';
import { notification } from 'utils';
import { DragNDrop } from './DragNDrop';
import { Item } from './Item';
import { defaultArticle } from './constants';

import styles from './styles.module.scss';

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
  }), [offset]);

  const onConfirmClick = () => {
    if (!doc) return;
    const fileName = doc.name;

    if (fileName.length > 100) {
      notification.error({ message: 'File name cannot exceed 100 characters' });
      return;
    }

    dispatch(articlesCreate({
      file: doc,
      callback: () => {
        dispatch(articlesGetMy(queryParams));
      },
    }));
    setDoc(null);
  };

  const onClearClick = () => {
    setDoc(null);
  };

  // const timeToUploaded = Math.ceil(Object.values(upload)
  //   .reduce((sum, item) => sum + item.size, 0) / 1_000_000 / 60);

  const timeToUploaded = (size: number) => size / 1_000_000 / 20;

  // fixed backend
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
      setUploadArticles(() => (Object.values(upload)
        // .filter((uploadArticle) => uploadArticle.status === RequestStatus.REQUEST)
        .map((uploadData) => ({
          ...defaultArticle,
          id: uploadData.idArticle || Number(uploadData.id),
          title: uploadData.fileName,
          uploadProgress: uploadData.percentUpload,
          fileSize: uploadData.size,
          status: uploadData.status,
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
  // ----

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

  const handleCancelUpload = useCallback((articleId: number) => () => {
    dispatch(articlesCancelUpload({
      articleId,
      isHidden: true,
      callback: () => {
        removeItemByIdStorage(`${articleId}`);
        setUploadArticles(() => (Object.values(upload)
          .filter((uploadArticle) => uploadArticle.idArticle !== articleId)
          .map((uploadData) => ({
            ...defaultArticle,
            id: uploadData.idArticle || Number(uploadData.id),
            title: uploadData.fileName,
            uploadProgress: uploadData.percentUpload,
            fileSize: uploadData.size,
            status: uploadData.status,
          }))));
        dispatch(articlesGetMy(queryParams));
      },
    }));
  }, [dispatch, queryParams, removeItemByIdStorage, upload]);

  const isDisabledUploadFile = isVipUser || !userFilledAllInfo;

  return (
    <div className={styles.upload}>
      <Typography
        className={styles.upload_title}
        type="h3"
      >
        Upload activity
      </Typography>
      <div className={styles.upload_wrapper}>
        <div className={styles.upload_dnd_block}>
          <DragNDrop
            doc={doc}
            setDoc={setDoc}
            isDisabled={isDisabledUploadFile}
          />
        </div>
        <span className={styles.upload_notice}>
          * - name of the file will be displayed on the platform after the
          upload, rename it beforehand if necessary
        </span>
        {doc ? (
          <div className={styles.upload_btn_block}>
            <Button
              className={styles.upload_btns}
              onClick={onConfirmClick}
              isLoading={isLoading}
            >
              Confirm
            </Button>
            <Button
              className={styles.upload_btns}
              theme="secondary"
              onClick={onClearClick}
              disabled={isLoading}
            >
              Cancel
            </Button>
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
        <div className={styles.statuses}>
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
                    onCancel={handleCancelUpload(id)}
                    name={`${title}`}
                    percents={uploadStatus === UploadFileStatus.CREATED
                      ? uploadProgress
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
        </div>
      </div>
    </div>
  );
};
