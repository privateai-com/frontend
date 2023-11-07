import {
  FC, memo, useCallback, useEffect, useRef, useState, 
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  RadioButtons,
  TextInput,
  Typography,
} from 'components';
import { articlesChangeAccess, articlesSaveGraph, articlesUpdate } from 'store/articles/actionCreators';
import { articlesSelectors } from 'store/articles/selectors';
import { ArticlesActionTypes } from 'store/articles/actionTypes';
import { Article, RequestStatus } from 'types';
import { EditItem } from './EditItem';
import { GraphResponseType } from '../types';
import { exportToExcel } from './utils';

import styles from './styles.module.scss';

// const newEdge = {
//   head: 'New',
//   tail: '',
//   type: '',
//   meta: {
//     spans: [[]],
//   },
// };

interface FileInfoProps {
  graphData: GraphResponseType[];
  // setGraphData: (edges: GraphResponseType[]) => void;
  onSave: () => void;
  onRevertToLastSaved: () => void;
  onRevertToLastPublished: () => void;
  article?: Article;
}

export const FileInfoEdit: FC<FileInfoProps> = memo(({
  graphData, onSave, onRevertToLastSaved, onRevertToLastPublished, article,
}) => {
  const storageFileItemRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const statusUpdateArticle = useSelector(
    articlesSelectors.getStatus(ArticlesActionTypes.UpdateArticle),
  );
  // const [lastEdgeFields, setLastEdgeFields] = useState({
  //   head: '',
  //   type: '',
  //   tail: '',
  // });
  const [nameFile, setNameFile] = useState('');
  const [fieldFile, setFieldFile] = useState('');

  const [articleAccess, setArticleAccess] = useState('closed' as 'open' | 'closed');

  const onChangeAvailabilityClick = useCallback((e: 'open' | 'closed') => {
    setArticleAccess(e);
  }, []);

  const successCallback = useCallback(() => {
    onSave();
  }, [onSave]);

  const onSaveClick = useCallback(() => {
    if (article) {
      const { id } = article;
      if (id) {
        const isOpen = articleAccess === 'open';
        if (article.isPublic !== isOpen) {
          dispatch(articlesChangeAccess({ articleId: id, isOpen }));
        }
        if (article.title !== nameFile || article.field !== fieldFile) {
          dispatch(articlesUpdate({
            articleId: id, title: nameFile, field: fieldFile,
          }));
        }
        dispatch(articlesSaveGraph({ articleId: id, data: graphData, callback: successCallback }));
      }
    }
  }, [article, articleAccess, dispatch, fieldFile, graphData, nameFile, successCallback]);

  const onDownloadXlsxClick = useCallback(() => {
    if (article) exportToExcel(graphData, article.title);
  }, [article, graphData]);

  useEffect(() => {
    if (article) {
      setNameFile(article.title);
      setFieldFile(article.field);
      setArticleAccess(article.isPublic ? 'open' : 'closed');
    }
  }, [article]);
  
  // const lastEdgeAvaliable = lastEdgeFields.head && lastEdgeFields.type && lastEdgeFields.tail;

  // const updateGraphItem = (index: number, updatedItem: GraphResponseType) => {
  //   const updatedGraphItems = [...edges];
  //   updatedGraphItems[index] = updatedItem;
  //   setEdges(updatedGraphItems);
  // };

  // useEffect(() => {
  //   const lastItem = edges[edges.length - 1];
  //   if (lastItem) {
  //     setLastEdgeFields({
  //       head: lastItem.head,
  //       type: lastItem.type,
  //       tail: lastItem.tail,
  //     });
  //   }
  // }, [edges]);

  // const addNewEdgeClick = useCallback(() => {
  //   if (lastEdgeFields.head && lastEdgeFields.type && lastEdgeFields.tail) {
  //     setEdges([...edges, newEdge]);
  //     if (storageFileItemRef.current) {
  //       setTimeout(() => {
  //         if (storageFileItemRef.current) {
  //           storageFileItemRef.current.scrollTop = storageFileItemRef.current.scrollHeight;
  //         }
  //       }, 100);
  //     }
  //   }
  // }, [edges, lastEdgeFields.head, lastEdgeFields.tail, lastEdgeFields.type, setEdges]);

  // const onDelete = useCallback((indexToDelete: number) => {
  //   const updatedGraphItems = [...edges];
  //   updatedGraphItems.splice(indexToDelete, 1);
  //   setEdges(updatedGraphItems);
  // }, [edges, setEdges]);

  return (
    <>
      <div className={styles.storageFile__file}>
        <Typography type="h1">File information</Typography>
        <div className={styles.storageFile__wrapper}>
          <div className={styles.storageFile__item}>
            File name:
            <TextInput
              onChangeValue={setNameFile}
              value={nameFile}
              classNameContainer={styles.storageFile__item_input}
              classNameInputBox={styles.storageFile__item_input_box}
            />
          </div>
          <div className={styles.storageFile__item}>
            Field: 
            <TextInput
              onChangeValue={setFieldFile}
              value={fieldFile}
              classNameContainer={styles.storageFile__item_input}
              classNameInputBox={styles.storageFile__item_input_box}
            />
          </div>
          <div className={styles.storageFile__item}>
            Graph edges: 
            {/* <Button
              onClick={addNewEdgeClick}
              theme="secondary"
              disabled={!lastEdgeAvaliable}
            >
              Add new edge
            </Button> */}
          </div>
          <div className={styles.storageFile__edit} ref={storageFileItemRef}>
            {!!graphData?.length && (
              graphData.map(({ head, tail, type }, index) => (
                <EditItem
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className={styles.storageFile__edit_item}
                  index={index}
                  head={head}
                  type={type}
                  tail={tail}
                  // updateGraphItem={updateGraphItem}
                  // onDelete={onDelete}
                />
              ))
            )}
            
          </div>
          <div className={styles.storageFile__item}>
            Access:
            <RadioButtons
              containerClassName={styles.radio_buttons}
              options={[
                {
                  value: 'open',
                  label: 'Open-sourced',
                },
                {
                  value: 'closed',
                  label: 'Permission-based',
                },
              ]}
              currentValue={articleAccess}
              onChange={onChangeAvailabilityClick}
            />
            <Button
              theme="secondary"
              onClick={onDownloadXlsxClick}
              disabled={!article}
              className={styles.storageFile__download_xlsx}
            >
              Download xlsx
            </Button>
          </div>
        </div> 
      </div>
      <div className={styles.storageFile__buttons}>
        <Button
          theme="secondary"
          onClick={onSaveClick}
          isLoading={statusUpdateArticle === RequestStatus.REQUEST}
          disabled={!article}
        >
          Save changes
        </Button>
        <Button
          theme="secondary"
          onClick={onRevertToLastSaved}
          disabled={!article}
        >
          Revert to last saved
        </Button>
        <Button
          onClick={onRevertToLastPublished}
          disabled={!article}
        >
          Revert to last published
        </Button>
      </div>
    </>
  );
});
