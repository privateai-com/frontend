import {
  memo, useCallback, useEffect, useMemo, useState, 
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import cx from 'classnames';

import { ArticleAccess, GraphResponseType, RequestStatus } from 'types';
import { articlesGetOneArticle } from 'store/articles/actionCreators';
import { articlesSelectors } from 'store/articles/selectors';
import { ArticlesActionTypes } from 'store/articles/actionTypes';
import { profileSelectors } from 'store/profile/selectors';
import { errorsNotification, routes } from 'appConstants';
import { notification } from 'utils';
import { ButtonBack } from './ButtonBack';
import { FileInfo } from './FileInfo';
import { FileInfoEdit } from './FileInfoEdit';
import { Graph } from './Graph';

import styles from './styles.module.scss';

export const StorageFile = memo(() => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { articleId } = router.query;
  const article = useSelector(articlesSelectors.getProp('article'));
  const accountInfo = useSelector(profileSelectors.getProp('accountInfo'));
  const statusGetOneArticle = useSelector(
    articlesSelectors.getStatus(ArticlesActionTypes.GetOneArticle),
  );
  const [isPublishGraph, setIsPublishGraph] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const initialGraphData = useMemo(
    () => {
      const graphArr = isPublishGraph ? article?.graph : article?.graphDraft;
      return (article && graphArr) ? graphArr : [];
    },
    [article, isPublishGraph],
  );

  const isOwner = useMemo(
    () => accountInfo?.id === article?.owner.id,
    [accountInfo?.id, article?.owner.id],
  );
  const findUserById = useCallback(
    (idToFind: number) =>
      article?.requests.find((request: ArticleAccess) => request.requester?.id === idToFind),
    [article?.requests],
  );
  
  const isRequester: boolean = useMemo(
    () => {
      if (accountInfo?.id) {
        return !!findUserById(accountInfo?.id);
      }
      return false;
    },
    [accountInfo?.id, findUserById],
  );

  const [graphData, setGraphData] = useState<GraphResponseType[]>([]);
  const [isEdit, setIsEdit] = useState(false);

  const callback = useCallback((value: GraphResponseType[]) => {
    setGraphData(value);
  }, []);

  const onSaveClick = useCallback(() => {
    setIsEdit((state) => !state);
    setIsPublishGraph(false);
  }, []);

  const isEditToggle = useCallback(() => {
    if (!accountInfo?.userFilledAllInfo) {
      notification.info({ message: errorsNotification.profileNotFilled });
      return;
    }
    setIsEdit((state) => !state);
  }, [accountInfo?.userFilledAllInfo]);

  const getOneArticleErrorCallback = useCallback(() => {
    router.push(routes.storage.root);
  }, [router]);

  useEffect(() => {
    if (articleId) {
      const number = Number(articleId);
      if (number) {
        dispatch(articlesGetOneArticle({
          articleId: number,
          errorCallback: getOneArticleErrorCallback,
        }));
      }
    }
  }, [articleId, dispatch, getOneArticleErrorCallback]);

  useEffect(() => {
    if (initialGraphData.length) setGraphData(initialGraphData);
  }, [initialGraphData]);

  const onRevertToLastSavedClick = useCallback(() => {
    if (article?.graphDraft) {
      setIsPublishGraph(false);
      setGraphData(article?.graphDraft);
    }
  }, [article?.graphDraft]);

  const onRevertToLastPublishedClick = useCallback(() => {
    if (article?.graph && article?.graph.length) {
      setGraphData(article?.graph);
      setIsPublishGraph(true);
    }
  }, [article]);

  const onFullScreenClick = useCallback(() => {
    setIsFullscreen((state) => !state);
  }, []);

  return (
    <div className={cx(styles.storageFile__container, {
      [styles.fullScreenGraph]: isFullscreen,
    })}
    >
      <ButtonBack title="Back" onEdit={() => setIsEdit((state) => !state)} isEdit={isEdit} />
      {isEdit ? (
        <FileInfoEdit
          graphData={graphData}
          isOwner={isOwner}
          onSave={onSaveClick}
          onRevertToLastSaved={onRevertToLastSavedClick}
          onRevertToLastPublished={onRevertToLastPublishedClick}
          classNameFile={cx({ [styles.isFullscreen]: isFullscreen })}
          classNameButtons={cx({ [styles.isFullscreen]: isFullscreen })}
          {...(article && { article })}
        />
      ) : (
        <FileInfo
          onEditClick={isEditToggle}
          isOwner={isOwner}
          isRequester={isRequester}
          isLoading={statusGetOneArticle === RequestStatus.REQUEST}
          classNameFile={cx({ [styles.isFullscreen]: isFullscreen })}
          classNameButtons={cx({ [styles.isFullscreen]: isFullscreen })}
          isUserRequiredFieldsFilled={!!accountInfo?.userFilledAllInfo}
          {...(article && { article })}
        />
      )}
      <Graph
        graphData={initialGraphData}
        setGraphData={callback}
        isEdit={isEdit}
        isLoading={statusGetOneArticle === RequestStatus.REQUEST}
        onFullScreen={onFullScreenClick}
        articleId={Number(articleId)}
        isOwner={isOwner}
        topCoreEntities={article?.topCoreEntities || '-'}
      />
    </div>
  );
});
