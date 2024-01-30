import {
  memo, useCallback, useEffect, useMemo, useRef, useState, 
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
import { PageHead } from 'components/PageHead';
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
  const [nodesLabelWithoutEdges, setNodesLabelWithoutEdges] = useState<string[]>([]);

  const [graphData, setGraphData] = useState<GraphResponseType[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const currentGraphData = useRef<GraphResponseType[]>([]);

  const setCurrentGraphData = useCallback((value: GraphResponseType[]) => {
    setGraphData(value);
  }, []);

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

  const onSaveSuccess = useCallback(() => {
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
    if (initialGraphData.length) {
      setGraphData(initialGraphData);
      currentGraphData.current = initialGraphData;
    }
  }, [initialGraphData, setGraphData]);

  const onRevertToLastSavedClick = useCallback(() => {
    if (article?.graphDraft && article?.graphDraft.length) {
      setGraphData(article.graphDraft);
      currentGraphData.current = [...article.graphDraft];
      setIsPublishGraph(false);
    }
  }, [article?.graphDraft]);

  const onRevertToLastPublishedClick = useCallback(() => {
    if (article?.graph && article?.graph.length) {
      setGraphData(article.graph);
      currentGraphData.current = article.graph;
      setIsPublishGraph(true);
    }
  }, [article?.graph]);

  const onFullScreenClick = useCallback(() => {
    setIsFullscreen((state) => !state);
  }, []);

  return (
    <>
      <div className="">
        <PageHead title={<ButtonBack title="Back" onEdit={() => setIsEdit((state) => !state)} isEdit={isEdit} />} />
      </div>
      <div className={cx(styles.storageFile__container, {
        [styles.fullScreenGraph]: isFullscreen,
      })}
      >
      
        {isEdit ? (
          <FileInfoEdit
            graphData={graphData}
            isOwner={isOwner}
            onSaveSuccess={onSaveSuccess}
            onRevertToLastSaved={onRevertToLastSavedClick}
            onRevertToLastPublished={onRevertToLastPublishedClick}
            classNameFile={cx({ [styles.isFullscreen]: isFullscreen })}
            classNameButtons={cx({ [styles.isFullscreen]: isFullscreen })}
            nodesLabelWithoutEdges={nodesLabelWithoutEdges}
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
          graphData={currentGraphData.current || graphData}
          setGraphData={setCurrentGraphData}
          isEdit={isEdit}
          isLoading={statusGetOneArticle === RequestStatus.REQUEST}
          onFullScreen={onFullScreenClick}
          articleId={Number(articleId)}
          isOwner={isOwner}
          topCoreEntities={article?.topCoreEntities || '-'}
          setNodesLabelWithoutEdges={setNodesLabelWithoutEdges}
          isPublished={article?.isPublished}
        />
      </div>
    </>
  );
});
