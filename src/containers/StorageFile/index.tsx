import {
  memo, useCallback, useEffect, useMemo, useState, 
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { GraphResponseType, RequestStatus } from 'types';
import { articlesGetOneArticle } from 'store/articles/actionCreators';
import { articlesSelectors } from 'store/articles/selectors';
import { ArticlesActionTypes } from 'store/articles/actionTypes';
import { profileSelectors } from 'store/profile/selectors';
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
  const initialGraphData = useMemo(
    () => {
      const graphArr = isPublishGraph ? article?.graph : article?.graphDraft;
      return (article && graphArr) ? [...graphArr].splice(0, 5) : [];
    },
    [article, isPublishGraph],
  );

  const isOwner = useMemo(
    () => accountInfo?.id === article?.owner.id,
    [accountInfo?.id, article?.owner.id],
  );

  const [graphData, setGraphData] = useState<GraphResponseType[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  // const { role } = useSelector(accountSelectors.getAccount);
  const callback = useCallback((value: GraphResponseType[]) => {
    setGraphData(value);
  }, []);

  const onSaveClick = useCallback(() => {
    setIsEdit(!isEdit);
    setIsPublishGraph(false);
  }, [isEdit]);

  const isEditToggle = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit]);

  useEffect(() => {
    if (articleId) {
      const number = Number(articleId);
      if (number) dispatch(articlesGetOneArticle({ articleId: number }));
    }
  }, [articleId, dispatch]);

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

  return (
    <div className={styles.storageFile__container}>
      <ButtonBack title="Back" />
      {isEdit ? (
        <FileInfoEdit
          graphData={graphData}
          // setGraphData={setGraphData}
          onSave={onSaveClick}
          onRevertToLastSaved={onRevertToLastSavedClick}
          onRevertToLastPublished={onRevertToLastPublishedClick}
          {...(article && { article })}
        />
      ) : (
        <FileInfo
          onEditClick={isEditToggle}
          isOwner={isOwner}
          isLoading={statusGetOneArticle === RequestStatus.REQUEST}
          {...(article && { article })}
        />
      )}
      <Graph
        graphData={initialGraphData}
        setGraphData={callback}
        isEdit={isEdit}
        isLoading={statusGetOneArticle === RequestStatus.REQUEST}
      />
    </div>
  );
});
