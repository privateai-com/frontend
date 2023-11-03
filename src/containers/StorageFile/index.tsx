import {
  memo, useCallback, useEffect, useMemo, useState, 
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { GraphResponseType, RequestStatus } from 'types';
import { articlesGetOneArticle } from 'store/articles/actionCreators';
import { articlesSelectors } from 'store/articles/selectors';
import { ArticlesActionTypes } from 'store/articles/actionTypes';

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
  const statusGetOneArticle = useSelector(
    articlesSelectors.getStatus(ArticlesActionTypes.GetOneArticle),
  );
  const initialGraphData = useMemo(
    () =>
      (article?.graphDraft ? article?.graphDraft : []),
    [article?.graphDraft],
  );
  
  const [graphData, setGraphData] = useState<GraphResponseType[]>(initialGraphData);
  const [isEdit, setIsEdit] = useState(false);
  // const { role } = useSelector(accountSelectors.getAccount);
  const callback = useCallback((value: GraphResponseType[]) => {
    setGraphData(value);
  }, []);

  const isEditToggle = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit]);

  useEffect(() => {
    if (articleId) {
      const number = Number(articleId);
      if (number) dispatch(articlesGetOneArticle({ articleId: Number(articleId) }));
    }
  }, [articleId, dispatch]);

  useEffect(() => {
    if (initialGraphData.length) setGraphData(initialGraphData);
  }, [initialGraphData]);

  return (
    <div className={styles.storageFile__container}>
      <ButtonBack title="Back" />
      {isEdit ? (
        <FileInfoEdit
          graphData={graphData}
          // setEdges={setGraphData}
          onSave={isEditToggle}
          {...(article && { article })}
        />
      ) : (
        <FileInfo
          onEditClick={isEditToggle}
          isOwner
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
