import { filesize } from 'filesize';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';

import { Button, Typography } from 'components';
import { usePagination, useScreenWidth, useVipUser } from 'hooks';
import { ScreenWidth, itemsOnPageQuantity } from 'appConstants';
import { Article, RequestStatus } from 'types';

import { articlesCreate, articlesGetMy, articlesGetUploadStatus } from 'store/articles/actionCreators';
import { articlesSelectors } from 'store/articles/selectors';
import { ArticlesActionTypes } from 'store/articles/actionTypes';
import { useLocalStorage } from 'utils';
import { DragNDrop } from './DragNDrop';
import { Item } from './Item';

import styles from './styles.module.scss';

export const Upload = () => {
  const [doc, setDoc] = useState<File | null>(null);
  const isMobile = useScreenWidth(ScreenWidth.mobile);
  const dispatch = useDispatch();
  const isVipUser = useVipUser();
  const [offset, setOffset] = useState(0);
  const total = useSelector(articlesSelectors.getProp('total'));
  const articles = useSelector(articlesSelectors.getProp('articles'));
  const statusGetMyArticles = useSelector(
    articlesSelectors.getStatus(ArticlesActionTypes.GetMyArticles),
  );
  const upload = useSelector(
    articlesSelectors.getProp('upload'),
  );
  const status = useSelector(
    articlesSelectors.getStatus(ArticlesActionTypes.CreateArticle),
  );
  const isLoading = status === RequestStatus.REQUEST;
  
  const queryParams = useMemo(() => ({
    limit: itemsOnPageQuantity,
    offset: offset * itemsOnPageQuantity,
    sortingDirection: 'DESC' as const,
    sortingField: 'id',
  }), [offset]);

  const onConfirmClick = () => {
    if (!doc) return;
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

  const timeToUploaded = (size: number) => size / 1_000_000 / 60;

  // fixed backend
  const {
    dataStorage,
    addItemStorage,
    getItemByIdStorage,
  } = useLocalStorage('articles');
  
  const updatedArticles = useMemo(() => (
    articles.map((article: Article) => {
      if (!dataStorage) return article;
      const storageItem = dataStorage.find((storage: { id: number }) => storage.id === article.id);
    
      if (storageItem && (!article.fileSize || !article.title)) {
        return {
          ...article,
          fileSize: storageItem.fileSize,
          title: storageItem.title,
        };
      }
    
      return article;
    })
  ), [articles, dataStorage]);

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
    total, 
    status: statusGetMyArticles, 
    changeOffset: setOffset,
  });

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
            isDisabled={isVipUser}
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
                  [styles.disabled]: isVipUser,
                })}
              >
                Select a file from local directory
                <input
                  type="file"
                  id="upload"
                  className={styles.upload_input}
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
          <div className={styles.statuses_items}>
            <div className={styles.statuses_wrapper}>
              <div className={styles.statuses_content} ref={rootRef}>
                {updatedArticles.map(({
                  id, title, uploadProgress, fileSize, 
                }) => (
                  <Item
                    key={id}
                    name={title}
                    percents={uploadProgress}
                    weight={filesize(fileSize || 0, { standard: 'jedec' })}
                    idArticle={id}
                    timeToUploaded={timeToUploaded(fileSize || 0)}
                  />
                ))}
                {endElementForScroll}
              </div>
            </div>
          </div>
        </div>
      </div>
      {' '}
    </div>
  );
};
