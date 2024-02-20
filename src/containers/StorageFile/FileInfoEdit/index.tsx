import {
  FC, memo, useCallback, useEffect, useMemo, useRef, useState, 
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';

import {
  Button,
  TextInput,
  Typography,
} from 'components';
import { articlesChangeAccess, articlesSaveGraph, articlesUpdate } from 'store/articles/actionCreators';
import { articlesSelectors } from 'store/articles/selectors';
import { ArticlesActionTypes } from 'store/articles/actionTypes';
import { Article, GraphResponseType, RequestStatus } from 'types';
import { notification } from 'utils';
import { MultiDrop } from 'components/MultiDrop';
import { ChangeAvailability } from 'containers/Storage/ArticlesTab/ChangeAvailability';
import { EditItem } from './EditItem';
import {
  arraysDeepEqual,
  articleFieldValidator,
  articleNameValidator,
  exportToExcel,
} from './utils';

import styles from './styles.module.scss';
import { DeleteBtn } from '../DeleteBtn';

interface FileInfoProps {
  graphData: GraphResponseType[];
  onSaveSuccess: () => void;
  onRevertToLastSaved: () => void;
  onRevertToLastPublished: () => void;
  article?: Article;
  classNameFile?: string;
  classNameButtons?: string;
  isOwner: boolean;
  nodesLabelWithoutEdges: string[];
  updateCallback : () => void;
}

export const FileInfoEdit: FC<FileInfoProps> = memo(({
  graphData,
  onSaveSuccess,
  onRevertToLastSaved,
  onRevertToLastPublished,
  article,
  classNameFile,
  classNameButtons,
  isOwner,
  nodesLabelWithoutEdges,
}) => {
  const storageFileItemRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const statusUpdateArticle = useSelector(
    articlesSelectors.getStatus(ArticlesActionTypes.UpdateArticle),
  );

  const [nameFile, setNameFile] = useState('');
  const [nameFileError, setNameFileError] = useState('');
  const [fieldFile, setFieldFile] = useState('');
  const [fieldFileError, setFieldFileError] = useState('');
  const [isEditingTitle, setEditingTitle] = useState(false);

  const [articleAccess, setArticleAccess] = useState('closed' as 'open' | 'closed');

  const isOpen = articleAccess === 'open';

  const isDisabledSave = useMemo(() => (
    !article ||
    !!article.isPublic !== isOpen ||
    article.title !== nameFile ||
    article.field !== fieldFile ||
    !arraysDeepEqual(article?.graphDraft, graphData)
  ), [article, fieldFile, graphData, isOpen, nameFile]);

  // const isDisabledRevertToLastSave = useMemo(() => (
  //   !article || arraysDeepEqual(article?.graphDraft, graphData)
  // ), [article, graphData]);
  // const isDisabledRevertToLastPublished = useMemo(() => (
  //   !article || arraysDeepEqual(article?.graph, graphData)
  // ), [article, graphData]);

  const onChangeAvailabilityClick = useCallback((e: 'open' | 'closed') => {
    setArticleAccess(e);
  }, []);

  const onNameFileChange = useCallback((value: string) => {
    setNameFileError('');
    setNameFile(value);
  }, []);

  const onFieldFileChange = useCallback((value: string) => {
    setFieldFileError('');
    setFieldFile(value);
  }, []);

  const successCallback = useCallback(() => {
    onSaveSuccess();
  }, [onSaveSuccess]);

  const onSaveClick = useCallback(() => {
    if (!article || !article.id) return;
    const currentNameFileError = articleNameValidator(nameFile);
    const currentFieldFileError = articleFieldValidator(fieldFile);

    const combinedErrors = [currentNameFileError, currentFieldFileError].filter(Boolean).join(', ');

    setNameFileError(currentNameFileError);
    setFieldFileError(currentFieldFileError);
        
    if (combinedErrors) {
      notification.info({ message: combinedErrors });
      return;
    }

    if (nodesLabelWithoutEdges.length > 0) {
      const message = `Nodes without edges: ${nodesLabelWithoutEdges.join(', ')}`;
      notification.info({ message });
      return;
    }

    const isFieldsNotEmpty = (edge: GraphResponseType) =>
      edge.subject !== '' && edge.object !== '' && edge.verb !== '';
    const allEdgesFieldsFilled = graphData.every(isFieldsNotEmpty);

    if (!allEdgesFieldsFilled) {
      notification.info({ message: 'Node has no edges' });
      return;
    }

    if (article.isPublic !== isOpen) {
      dispatch(articlesChangeAccess({ articleId: article.id, isOpen }));
    }
    if (article.title !== nameFile || article.field !== fieldFile) {
      dispatch(articlesUpdate({
        articleId: article.id, title: nameFile, field: fieldFile,
      }));
    }
    dispatch(articlesSaveGraph({
      articleId: article.id, data: graphData, callback: successCallback,
    }));
  }, [
    article, dispatch, fieldFile, graphData, isOpen,
    nameFile, nodesLabelWithoutEdges, successCallback,
  ]);

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
  
  return (
    <>
      <div className={cx(styles.storageFile__file, classNameFile)}>
        <div className={styles.storageFile__data_head}>
          {/* Title */}
          <div className={styles.row}>
            {!isEditingTitle && <Typography type="h2">{nameFile}</Typography>}
            {!isEditingTitle && (
            <button
              className={styles.titleEditBtn}
              onClick={() => {
                setEditingTitle((prev) => !prev);
              }}
            >
              <span>Edit file name</span>
            </button>
            )}
            {isEditingTitle && (
            <div>
              <Typography 
                type="h4"
              >
                File name
              </Typography>
              <TextInput
                onChangeValue={onNameFileChange}
                value={nameFile}
                classNameContainer={styles.storageFile__item_input}
                classNameInputBox={styles.storageFile__item_input_box}
                isError={nameFileError !== ''}
              />
            </div>
            )}
          </div>
          {/* Delete */}
          {/* {(isOwner && article?.id) && (
            <div className={cx(styles.row,styles.deleteRow)}>
            <DeleteBtn className={styles.storageFile__data_btn} 
              articleId={article?.id} />
            </div>
          )} */}
          
          {/* Topic */}
          <div className={styles.row}>
            <Typography 
              type="h4"
            >
              Topic:
            </Typography>
            <TextInput
              onChangeValue={onFieldFileChange}
              value={fieldFile}
              classNameContainer={styles.storageFile__item_input}
              classNameInputBox={styles.storageFile__item_input_box}
              isError={fieldFileError !== ''}
            />

          </div>
          {/* Graph edges */}
          <div className={styles.row}>
              
            <div className={styles.storageFile__item} style={{ justifyContent: 'space-between' }}>
            
              <Typography 
                type="h4"
              >
                Graph edges: 
              </Typography>

              {
                article && (
                <ChangeAvailability 
                  id={article.id} 
                  isPublic={article.isPublic} 
                  callBack={onChangeAvailabilityClick} 
                />
                )
}
              {/* <select name="" defaultValue={articleAccess} id="">
                <option value="open">Open-sourced</option>
                <option value="closed">Permission-based</option>
              </select> */}
              {/* <RadioButtons
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
              /> */}
              {/* <Button
                theme="secondary"
                onClick={onDownloadXlsxClick}
                disabled={!article}
                className={styles.storageFile__download_xlsx}
              >
                Download xlsx
              </Button> */}
            </div>

          </div>
        </div>
        
        <div className={styles.storageFile__wrapper}>
          {/* <div className={styles.storageFile__item}>
              File name:
              <TextInput
                onChangeValue={onNameFileChange}
                value={nameFile}
                classNameContainer={styles.storageFile__item_input}
                classNameInputBox={styles.storageFile__item_input_box}
                isError={nameFileError !== ''}
              />
            </div> */}
          {/* <div className={styles.storageFile__item}>
              Field: 
              <TextInput
                onChangeValue={onFieldFileChange}
                value={fieldFile}
                classNameContainer={styles.storageFile__item_input}
                classNameInputBox={styles.storageFile__item_input_box}
                isError={fieldFileError !== ''}
              />
            </div> */}
          {/* <div className={styles.storageFile__item}>
              Graph edges: 
              <Button
                onClick={addNewEdgeClick}
                theme="secondary"
                disabled={!lastEdgeAvaliable}
              >
                Add new edge
              </Button>
            </div> */}
          
          <div className={styles.storageFile__edit} ref={storageFileItemRef}>
            {!!graphData?.length && (
              graphData.map(({ subject, object, verb }, index) => (
                <EditItem
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className={styles.storageFile__edit_item}
                  index={index}
                  subject={subject}
                  verb={verb}
                  object={object}
                  // updateGraphItem={updateGraphItem}
                  // onDelete={onDelete}
                />
              ))
            )}
            
          </div>
         
        </div> 
      </div>
      <div className={cx(styles.storageFile__buttons, classNameButtons)}>
        <Button
          theme="primary"
          onClick={onSaveClick}
          isLoading={statusUpdateArticle === RequestStatus.REQUEST}
          disabled={!isDisabledSave}
          className={styles.saveBtn}
        >
          Save changes
        </Button>

        {article && (
        <MultiDrop
          props={{
            btnContent: '•••',
            btnList: [
              // eslint-disable-next-line
              <div onClick={onRevertToLastSaved}>
                Revert to last saved
              </div>,
              // eslint-disable-next-line
              <div onClick={onRevertToLastPublished}>
                Revert to last published
              </div>,
              isOwner && (
              <DeleteBtn articleId={article?.id} isPublished={article.isPublished}>
                Delete
              </DeleteBtn>
              ),
              // eslint-disable-next-line
              <div onClick={onDownloadXlsxClick}>Download</div>,
            ],
            top: true,
          }}
        />
        )}

        {/* <Button
          theme="secondary"
          onClick={onRevertToLastSaved}
          disabled={isDisabledRevertToLastSave}
        >
          Revert to last saved
        </Button>
        <Button
          onClick={onRevertToLastPublished}
          disabled={isDisabledRevertToLastPublished}
        >
          Revert to last published
        </Button> */}
      </div>
    </>
  );
});
