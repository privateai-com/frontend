import { useCallback, useEffect, useState } from 'react';
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

export const StorageFile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { articleId } = router.query;
  const article = useSelector(articlesSelectors.getProp('article'));
  const statusGetOneArticle = useSelector(
    articlesSelectors.getStatus(ArticlesActionTypes.GetOneArticle),
  );
  const initialGraphData = article?.graphDraft ? article?.graphDraft.splice(0, 100) : [];

  const [graphData, setGraphData] = useState<GraphResponseType[]>(initialGraphData);
  const [isEdit, setIsEdit] = useState(false);
  // const { role } = useSelector(accountSelectors.getAccount);
  
  const callback = useCallback((value: GraphResponseType[]) => {
    setGraphData(value);
  }, []);

  useEffect(() => {
    if (articleId) {
      const number = Number(articleId);
      if (number) dispatch(articlesGetOneArticle({ articleId: Number(articleId) }));
    }
  }, [articleId, dispatch]);

  return (
    <div className={styles.storageFile__container}>
      <ButtonBack title="Back" />
      {isEdit ? (
        <FileInfoEdit
          edges={graphData}
          // setEdges={setGraphData}
          onSave={() => setIsEdit(false)}
          {...(article && { article })}
        />
      ) : (
        <FileInfo
          onEditClick={() => setIsEdit(true)}
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
};
