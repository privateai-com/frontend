/* eslint-disable no-nested-ternary */
import {

  memo, useCallback, useEffect, useMemo, useRef, useState, 
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import cx from 'classnames';

import { ArticleAccess, GraphResponseType, RequestStatus } from 'types';
import {
  articlesChangeAccess, articlesGetOneArticle, articlesPublish, 
  articlesSaveGraph, articlesSetState, articlesUpdate, 
} from 'store/articles/actionCreators';
import { articlesSelectors } from 'store/articles/selectors';
import { ArticlesActionTypes } from 'store/articles/actionTypes';
import { profileSelectors } from 'store/profile/selectors';
import { errorsNotification, routes } from 'appConstants';
import { notification } from 'utils';
import { PageHead } from 'components/PageHead';

import { AccessConfirm, Button } from 'components';
import { ChangeAvailability } from 'containers/Storage/ArticlesTab/ChangeAvailability';
import { profileGetProfile } from 'store/profile/actionCreators';
import { useScreenWidth, useVipUser } from 'hooks';
import { MultiDrop } from 'components/MultiDrop';
import { useModal } from 'react-modal-hook';
import { requestCreate } from 'store/request/actionCreators';
import { requestSelectors } from 'store/request/selectors';
import { RequestActionTypes } from 'store/request/actionsTypes';
import { DeleteBtn } from './DeleteBtn';
import {
  arraysDeepEqual, articleFieldValidator, articleNameValidator, exportToExcel, 
} from './FileInfoEdit/utils';
import styles from './styles.module.scss';
import { Graph } from './Graph';
import { FileInfoEdit } from './FileInfoEdit';
import { FileInfo } from './FileInfo';
import { ButtonBack } from './ButtonBack';
// import { FileContext, MyProvider, useFileContext } from './context';

export const StorageFile = memo(() => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { articleId } = router.query;
  const article = useSelector(articlesSelectors.getProp('article'));
  const accountInfo = useSelector(profileSelectors.getProp('accountInfo'));
  const [updateFlag, setUpdateFlag] = useState(false);
  const statusGetOneArticle = useSelector(
    articlesSelectors.getStatus(ArticlesActionTypes.GetOneArticle),
  );
  const [isPublishGraph, setIsPublishGraph] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [nodesLabelWithoutEdges, setNodesLabelWithoutEdges] = useState<string[]>([]);

  const [graphData, setGraphData] = useState<GraphResponseType[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isDisabledRequest, setIsDisabledRequest] = useState(false);
  const currentGraphData = useRef<GraphResponseType[]>([]);

  const setCurrentGraphData = useCallback((value: GraphResponseType[]) => {
    setGraphData(value);
  }, []);

  const initialGraphData = useMemo(
    () => {
      // eslint-disable-next-line no-nested-ternary
      const graphArr = isPublishGraph ? 
        article?.graph : 
        article?.graphDraft.length ? article?.graphDraft : article?.graph;
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

  const isMobile = useScreenWidth(800);

  const statusCreate = useSelector(requestSelectors.getStatus(RequestActionTypes.Create));
  const publishBtnTrigger = useScreenWidth(350);
  // const editBtnTrigger = useScreenWidth(900);
  const downloadBtnTrigger = useScreenWidth(480);
  // const permisionBtnTrigger = useScreenWidth(ScreenWidth.mobile);

  // const requester = useSelector(
  //   profileSelectors.getPropRequester(article?.owner.id ?? 0), 
  //   shallowEqual,
  // );
  const [showAccessConfirm, hideAccessConfirm] = useModal(
    () => (
      <AccessConfirm
        isLoading={statusCreate === RequestStatus.REQUEST}
        onCloseModal={() => {
          hideAccessConfirm();
        }}
        onConfirm={() => {
          if (article) {
            dispatch(requestCreate({
              articleId: article.id, 
              callback: () => {
                hideAccessConfirm();
                setIsDisabledRequest(true);
                dispatch(articlesSetState({
                  article: {
                    ...article,
                    status: 'Access request pending',
                  },
                }));
                setUpdateFlag((prev) => !prev);
              },
            }));
          }
        }}
      />
    ),
    [article, statusCreate],
  );

  const onSaveSuccess = useCallback(() => {
    setIsEdit((state) => !state);
    setIsPublishGraph(false);
    setUpdateFlag((prev) => !prev);
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
  const isVipUser = useVipUser();

  useEffect(
    () => {
      if (articleId) {
        const number = Number(articleId);
        if (number) {
          dispatch(articlesGetOneArticle({
            articleId: number,
            errorCallback: getOneArticleErrorCallback,
          }));
        }
      }
    },
    // )
    [articleId, dispatch, getOneArticleErrorCallback, updateFlag],
  );

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

  const onPublishClick = useCallback(() => {
    if (!accountInfo?.userFilledAllInfo) {
      notification.info({ message: errorsNotification.profileNotFilled });
      return;
    }
    if (article) {
      const { id } = article;
      if (id) {
        // dispatch(articleSetFetchingStatus({ status: true }));
        dispatch(articlesPublish({
          articleId: id,
          isPublished: true,
          callback: () => dispatch(profileGetProfile()),
        }));
      }
    }
  }, [article, dispatch, accountInfo?.userFilledAllInfo]);

  const onRevertToLastPublishedClick = useCallback(() => {
    if (article?.graph && article?.graph.length) {
      setGraphData(article.graph);
      currentGraphData.current = article.graph;
      setIsPublishGraph(true);
    }
  }, [article?.graph]);

  const onDownloadXlsxClick = useCallback(() => {
    if (article) exportToExcel(graphData, article.title);
  }, [article, graphData]);

  const onFullScreenClick = useCallback(() => {
    setIsFullscreen((state) => !state);
  }, []);

  // eslint-disable-next-line 
  const [nameFileError, setNameFileError] = useState('');
  // eslint-disable-next-line 
  const [fieldFileError, setFieldFileError] = useState('');
  // eslint-disable-next-line 
  const [nameFile, setNameFile] = useState('');
  // eslint-disable-next-line 
  const [fieldFile, setFieldFile] = useState('');
  // eslint-disable-next-line 
  const [articleAccess, setArticleAccess] = useState<'open' | 'closed'>('closed');
  const isOpen = articleAccess === 'open';

  const statusUpdateArticle = useSelector(
    articlesSelectors.getStatus(ArticlesActionTypes.UpdateArticle),
  );

  const isDisabledSave = useMemo(() => (
    !article ||
    !!article.isPublic !== isOpen ||
    article.title !== nameFile ||
    article.field !== fieldFile ||
    !arraysDeepEqual(article?.graphDraft, graphData)
  ), [article, fieldFile, graphData, isOpen, nameFile]);

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

  // useEffect(() => {
  //   if (article) {
  //     setNameFile(article.title);
  //     setFieldFile(article.field);
  //     setArticleAccess(article.isPublic ? 'open' : 'closed');
  //   }
  // }, [article , setNameFile , setFieldFile , setArticleAccess]);

  return (
  // <MyProvider>
    <>
      <div className="">
        <PageHead 
          title={
            <ButtonBack title="Back" onEdit={() => setIsEdit((state) => !state)} isEdit={isEdit} />
            }
          btnWrapStyles={{
            display: 'flex', flexWrap: 'wrap', gap: 20,
          }}
          btnWrap={(
            <>
              {/* {isOwner && !isEdit && !editBtnTrigger && !isMobile && 
               <Button className={styles.btnNormalize} theme='secondary'
                onClick={isEditToggle}
              > Edit </Button>} */}

              {/* need to create section store */}
              {isEdit && isOwner && false && (
                <Button
                  theme="primary"
                  onClick={onSaveClick}
                  isLoading={statusUpdateArticle === RequestStatus.REQUEST}
                  disabled={!isDisabledSave}
                  className={cx([styles.saveBtn, styles.btnNormalize])}
                >
                  Save changes
                </Button>
              )}
              {!downloadBtnTrigger && !isOwner && article && (
                <Button
                  className={styles.btnNormalize}
                  disabled={article?.isPublic === false && article?.status 
                    ? ![
                      'Access granted',
                      'Open sourced',
                    ].includes(article?.status) 
                    : false}
                  onClick={onDownloadXlsxClick}
                >
                  { !isMobile ? 'Download' : (
                    <svg width="16" height="16" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M11 0.25C11.1989 0.25 11.3897 0.329018 11.5303 0.46967C11.671 0.610322 11.75 0.801088 11.75 1V11.973L13.43 10.012C13.4941 9.93715 13.5723 9.87565 13.6601 9.83102C13.748 9.78639 13.8438 9.7595 13.942 9.75188C14.0403 9.74427 14.139 9.75608 14.2327 9.78664C14.3264 9.8172 14.4131 9.86592 14.488 9.93C14.5629 9.99409 14.6244 10.0723 14.669 10.1601C14.7136 10.248 14.7405 10.3438 14.7481 10.442C14.7557 10.5403 14.7439 10.639 14.7134 10.7327C14.6828 10.8264 14.6341 10.9131 14.57 10.988L11.57 14.488C11.4996 14.5703 11.4122 14.6364 11.3138 14.6818C11.2154 14.7271 11.1083 14.7506 11 14.7506C10.8917 14.7506 10.7846 14.7271 10.6862 14.6818C10.5878 14.6364 10.5004 14.5703 10.43 14.488L7.43 10.988C7.36592 10.9131 7.3172 10.8264 7.28664 10.7327C7.25608 10.639 7.24427 10.5403 7.25188 10.442C7.2595 10.3438 7.28639 10.248 7.33102 10.1601C7.37565 10.0723 7.43715 9.99409 7.512 9.93C7.58685 9.86592 7.6736 9.8172 7.76728 9.78664C7.86096 9.75608 7.95974 9.74427 8.05798 9.75188C8.15623 9.7595 8.25201 9.78639 8.33986 9.83102C8.42771 9.87565 8.50591 9.93715 8.57 10.012L10.25 11.972V1C10.25 0.801088 10.329 0.610322 10.4697 0.46967C10.6103 0.329018 10.8011 0.25 11 0.25ZM5.996 7.252C6.19491 7.25094 6.3861 7.32894 6.5275 7.46884C6.6689 7.60874 6.74894 7.79909 6.75 7.998C6.75106 8.19691 6.67306 8.3881 6.53316 8.5295C6.39326 8.6709 6.20291 8.75094 6.004 8.752C4.911 8.758 4.136 8.786 3.547 8.894C2.981 8.999 2.652 9.166 2.409 9.409C2.132 9.686 1.952 10.075 1.853 10.809C1.752 11.564 1.75 12.565 1.75 14V15C1.75 16.436 1.752 17.437 1.853 18.192C1.952 18.926 2.133 19.314 2.409 19.592C2.686 19.868 3.074 20.048 3.809 20.147C4.563 20.249 5.565 20.25 7 20.25H15C16.435 20.25 17.436 20.249 18.192 20.147C18.926 20.048 19.314 19.868 19.591 19.591C19.868 19.314 20.048 18.926 20.147 18.192C20.248 17.437 20.25 16.436 20.25 15V14C20.25 12.565 20.248 11.564 20.147 10.808C20.048 10.075 19.867 9.686 19.591 9.409C19.347 9.166 19.019 8.999 18.453 8.894C17.864 8.786 17.089 8.758 15.996 8.752C15.8975 8.75147 15.8001 8.73155 15.7093 8.69338C15.6185 8.6552 15.5361 8.59952 15.4668 8.5295C15.3976 8.45949 15.3428 8.37651 15.3056 8.28532C15.2684 8.19412 15.2495 8.09649 15.25 7.998C15.2505 7.89951 15.2704 7.80209 15.3086 7.71129C15.3468 7.6205 15.4025 7.53811 15.4725 7.46884C15.5425 7.39957 15.6255 7.34477 15.7167 7.30756C15.8079 7.27035 15.9055 7.25147 16.004 7.252C17.086 7.258 17.987 7.284 18.724 7.419C19.482 7.559 20.127 7.824 20.652 8.349C21.254 8.95 21.512 9.709 21.634 10.609C21.75 11.475 21.75 12.578 21.75 13.945V15.055C21.75 16.423 21.75 17.525 21.634 18.392C21.512 19.292 21.254 20.05 20.652 20.652C20.05 21.254 19.292 21.512 18.392 21.634C17.525 21.75 16.422 21.75 15.055 21.75H6.945C5.578 21.75 4.475 21.75 3.608 21.634C2.708 21.513 1.95 21.254 1.348 20.652C0.746 20.05 0.488 19.292 0.367 18.392C0.25 17.525 0.25 16.422 0.25 15.055V13.945C0.25 12.578 0.25 11.475 0.367 10.608C0.487 9.708 0.747 8.95 1.348 8.348C1.873 7.824 2.518 7.558 3.276 7.419C4.013 7.284 4.914 7.258 5.996 7.252Z" fill="#FFFFFF" />
                    </svg>
                  )}
                </Button>
              )}
              {isOwner && !publishBtnTrigger && !isEdit && (
                <Button
                  className={styles.btnNormalize}
                  disabled={!article?.isGraphDifferent}
                  onClick={onPublishClick}
                >
                  
                  { article?.isPublished ?
                    (!isMobile
                      ? 'Published'
                      : (
                        <svg width="16" height="16" viewBox="0 0 42 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M0 4.5C0 3.30653 0.474106 2.16193 1.31802 1.31802C2.16193 0.474106 3.30653 0 4.5 0H25.137C26.3301 0.00105031 27.4739 0.475845 28.317 1.32L40.683 13.68C41.1012 14.0984 41.4327 14.5952 41.6587 15.1419C41.8847 15.6886 42.0007 16.2744 42 16.866V43.5C42 44.6935 41.5259 45.8381 40.682 46.682C39.8381 47.5259 38.6935 48 37.5 48H4.5C3.30653 48 2.16193 47.5259 1.31802 46.682C0.474106 45.8381 0 44.6935 0 43.5V4.5ZM32.571 21.573C32.9219 21.09 33.0665 20.4875 32.9731 19.8979C32.8798 19.3082 32.556 18.7799 32.073 18.429C31.59 18.0781 30.9875 17.9335 30.3979 18.0269C29.8082 18.1202 29.2799 18.444 28.929 18.927L18.48 33.297L12.84 27.657C12.4155 27.2473 11.847 27.0208 11.257 27.0262C10.6671 27.0316 10.1029 27.2685 9.68591 27.6859C9.26894 28.1033 9.03257 28.6677 9.02773 29.2576C9.02288 29.8476 9.24994 30.4158 9.66 30.84L17.16 38.34C17.3899 38.57 17.6669 38.7475 17.9719 38.8601C18.277 38.9728 18.6028 39.018 18.927 38.9926C19.2512 38.9672 19.5661 38.8719 19.8499 38.7131C20.1337 38.5544 20.3797 38.336 20.571 38.073L32.571 21.573Z" fill="#FFFFFF" />
                        </svg>
                      ))
                    : (!isMobile ? 'Publish' : (
                      <svg width="16" height="16" viewBox="0 0 48 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M43.5 28H26C24.4087 28 22.8826 27.3679 21.7574 26.2426C20.6321 25.1174 20 23.5913 20 22V4.5C20 4.36739 19.9473 4.24021 19.8536 4.14645C19.7598 4.05268 19.6326 4 19.5 4H8C5.87827 4 3.84344 4.84285 2.34315 6.34315C0.842854 7.84344 0 9.87827 0 12V52C0 54.1217 0.842854 56.1566 2.34315 57.6569C3.84344 59.1571 5.87827 60 8 60H36C38.1217 60 40.1566 59.1571 41.6569 57.6569C43.1571 56.1566 44 54.1217 44 52V28.5C44 28.3674 43.9473 28.2402 43.8536 28.1464C43.7598 28.0527 43.6326 28 43.5 28Z" fill="white" />
                        <path d="M42.4025 23.5739L24.4263 5.5976C24.3913 5.56285 24.3468 5.53921 24.2985 5.52965C24.2501 5.52009 24.2 5.52504 24.1545 5.54387C24.1089 5.56271 24.0699 5.59459 24.0425 5.63551C24.015 5.67643 24.0002 5.72456 24 5.77385V22.0001C24 22.5305 24.2107 23.0392 24.5858 23.4143C24.9609 23.7894 25.4696 24.0001 26 24.0001H42.2262C42.2755 23.9999 42.3237 23.9851 42.3646 23.9576C42.4055 23.9302 42.4374 23.8912 42.4562 23.8456C42.4751 23.8001 42.48 23.75 42.4705 23.7016C42.4609 23.6533 42.4373 23.6088 42.4025 23.5739Z" fill="white" />
                        <g clipPath="url(#clip0_1720_504)">
                          <rect x="33" y="3" width="10" height="14" fill="white" />
                          <path d="M30.93 17.0701C29.9749 16.1476 29.213 15.0442 28.6889 13.8241C28.1649 12.6041 27.889 11.2919 27.8775 9.96409C27.8659 8.6363 28.1189 7.3195 28.6217 6.09054C29.1245 4.86158 29.8671 3.74506 30.806 2.80613C31.7449 1.8672 32.8615 1.12467 34.0904 0.621863C35.3194 0.119054 36.6362 -0.133963 37.964 -0.122425C39.2918 -0.110887 40.604 0.164975 41.824 0.689065C43.044 1.21316 44.1475 1.97498 45.07 2.93008C46.8915 4.8161 47.8995 7.34212 47.8767 9.96409C47.8539 12.5861 46.8022 15.0942 44.9481 16.9483C43.0941 18.8023 40.5859 19.854 37.964 19.8768C35.342 19.8996 32.816 18.8917 30.93 17.0701ZM37 5.00008V11.0001H39V5.00008H37ZM37 13.0001V15.0001H39V13.0001H37Z" fill="#F23985" />
                        </g>
                        <defs>
                          <clipPath id="clip0_1720_504">
                            <rect width="20" height="20" fill="white" transform="translate(28)" />
                          </clipPath>
                        </defs>
                      </svg>
                    ))} 
                </Button>
              )}
              {isOwner && article && (
                <ChangeAvailability 
                  id={article?.id} 
                  hasFullValue={!isMobile}
                  isPublic={article.isPublic || false} 
                  // eslint-disable-next
                  callBack={() => {
                    setUpdateFlag((prev) => !prev);
                  // dispatch(profileGetProfile())
                  // dispatch(articlesChangeAccess({ 
                  // articleId: article.id, isOpen: value === 'open' }));
                  }}
                />
              )}
              {!isOwner && !isOpen && (
                <Button
                  theme="secondary"
                  className={styles.btnNormalize}
                  onClick={() => {
                    showAccessConfirm();
                  }}
                  disabled={
                    // isLoading ||
                    isRequester ||
                    isVipUser ||
                    isDisabledRequest ||
                    // statusCreate === RequestStatus.SUCCESS
                    [
                      'Access granted',
                      'Open sourced',
                    ].includes(article?.status as string)
                  }
                  isLoading={statusCreate === RequestStatus.REQUEST}
                >
                  Request access
                </Button>
              )}
              {article && isOwner && (
                <MultiDrop
                  props={{
                    btnContent: '•••',
                    btnList: [
                      !isEdit && isOwner && (
                        <button 
                          onClick={isEditToggle}
                          style={{ width: '100%', textAlign: 'left' }}
                        >
                          Edit
                        </button>
                      ),
                      isEdit && isOwner && (
                        <button 
                          onClick={onRevertToLastSavedClick}
                          style={{ width: '100%', textAlign: 'left' }}
                        >
                          Revert to last saved
                        </button>
                      ),
                      isEdit && isOwner && (
                        <button 
                          onClick={onRevertToLastPublishedClick}
                          style={{ width: '100%', textAlign: 'left' }}
                        >
                          Revert to last published
                        </button>
                      ),
                      isOwner && (
                        <DeleteBtn
                          articleId={article?.id} 
                          isPublished={article.isPublished}
                        >
                          Delete
                        </DeleteBtn>
                      ),
                      !isMobile && (
                        <button 
                          onClick={onDownloadXlsxClick}
                          style={{ width: '100%', textAlign: 'left' }}
                        >
                          Download
                        </button>
                      ),
                    ],
                    top: false,
                  }}
                />
              )}
            </>
          )}
        />

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
            updateCallback={ 
                () => {
                  setUpdateFlag((prev) => !prev);
                }
              }
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
            updateCallback={ 
                () => {
                  setUpdateFlag((prev) => !prev);
                }
              }
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
  // {/* </MyProvider> */}
  );
});
