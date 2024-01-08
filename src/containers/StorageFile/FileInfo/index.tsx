import {
  FC, memo, useCallback, useState, 
} from 'react';
import { useModal } from 'react-modal-hook';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import { Tooltip } from 'react-tooltip';

import {
  AccessConfirm,
  Button,
  Requester,
  Typography,
} from 'components';
import { Article, RequestStatus } from 'types';
import { articleSetFetchingStatus, articlesPublish, articlesSetState } from 'store/articles/actionCreators';
import { requestSelectors } from 'store/request/selectors';
import { RequestActionTypes } from 'store/request/actionsTypes';
import { requestCreate } from 'store/request/actionCreators';
import { articlesSelectors } from 'store/articles/selectors';
import { ArticlesActionTypes } from 'store/articles/actionTypes';
import { profileGetProfileUser } from 'store/profile/actionCreators';
import { profileSelectors } from 'store/profile/selectors';
import {
  getName,
  // getStatusAccessArticle,
  normalizeUserInfo,
  notification,
} from 'utils';
import { useVipUser } from 'hooks';
import { errorsNotification } from 'appConstants';
import { convertToBytesString, formatDate } from './utils';
import { FileInformationLoader } from '../Loader';
import { DeleteBtn } from '../DeleteBtn';

import styles from './styles.module.scss';
import { InfoTableRow } from './InfoTableRow';

type FileInfoProps = {
  onEditClick: () => void;
  isOwner: boolean;
  isRequester: boolean;
  isLoading: boolean;
  isUserRequiredFieldsFilled: boolean;
  article?: Article;
  classNameFile?: string;
  classNameButtons?: string;
};

export const FileInfo: FC<FileInfoProps> = memo(({
  onEditClick, isOwner, isLoading, article, classNameFile,
  classNameButtons, isRequester, isUserRequiredFieldsFilled,
}) => {
  const dispatch = useDispatch();
  const statusCreate = useSelector(requestSelectors.getStatus(RequestActionTypes.Create));
  const statusPublish = useSelector(
    articlesSelectors.getStatus(ArticlesActionTypes.PublishArticle),
  );
  const requester = useSelector(
    profileSelectors.getPropRequester(article?.owner.id ?? 0), 
    shallowEqual,
  );
  const isVipUser = useVipUser();
  const [isDisabledRequest, setIsDisabledRequest] = useState(false);

  const [showRequester, hideRequester] = useModal(
    () => {
      const {
        id,
        avatarUrl,
        fullName,
        username,
        city,
        country,
        organization,
        position,
        researchFields,
        socialLink,
      } = requester;
      return (
        <Requester
          id={id || 0}
          title="Owner"
          avatarUrl={avatarUrl || ''}
          name={getName(fullName, username, id ?? 0)}
          country={normalizeUserInfo(city, country) || '-'}
          organization={organization || '-'}
          position={position || '-'}
          fields={researchFields || '-'}
          socialMedia={socialLink || '-'}
          isHideButtons
          // questionFooter="Request access to a file?"
          // confirmButtonLabel="Confirm"
          // cancelButtonLabel="Cancel"
          // onConfirmButton={() => {
          //   if (article) {
          //     dispatch(requestCreate({
          //       articleId: article.id, 
          //       callback: () => {
          //         hideRequester();
          //         setIsDisabledRequest(true);
          //       },
          //     }));
          //   }
          // }}
          // onCancelButton={hideRequester}
          onCloseModal={hideRequester}
          // isHideButtons={isRequester}
        />
      );
    },
    [requester, article, isRequester],
  );

  const checkDay = (arg:number) =>{
    const currentDay = new Date()
    const month = currentDay.getUTCMonth() + 1;
    const day = currentDay.getUTCDate();
    const year = currentDay.getUTCFullYear();

    const argDate = new Date(arg)
    const argMount = argDate.getUTCMonth() + 1;
    const argDay = currentDay.getUTCDate();
    const argYear = currentDay.getUTCFullYear();

    if(day === argDay && month === argMount && year === argYear){
      return 'Today'
    }else{
      return `${argDate} ${argMount} ${argYear}`
    }

  } 

  const successCallback = useCallback(() => {
    showRequester();
  }, [showRequester]);

  const onOwnerClick = useCallback(() => {
    if (article?.owner.id && !isVipUser) {
      dispatch(profileGetProfileUser({
        profileId: article?.owner.id,
        successCallback,
        id: article?.owner.id,
      }));
    }
  }, [article?.owner.id, dispatch, isVipUser, successCallback]);

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
              },
            }));
          }
        }}
      />
    ),
    [article, statusCreate],
  );

  const onPublishClick = useCallback(() => {
    if (!isUserRequiredFieldsFilled) {
      notification.info({ message: errorsNotification.profileNotFilled });
      return;
    }
    if (article) {
      const { id } = article;
      if (id) {
        dispatch(articleSetFetchingStatus({ status: true }));
        dispatch(articlesPublish({ articleId: id, isPublished: true, callback: () => {} }));
      }
    }
  }, [article, dispatch, isUserRequiredFieldsFilled]);

  return (
    <>
      <div className={cx(styles.storageFile__file, classNameFile)}>
        {/* <div className={styles.storageFile__file_head}>
          <Typography type="h1">File information</Typography>
          {(isOwner && article?.id) && (
            <DeleteBtn className={styles.storageFile__data_btn} articleId={article?.id} />
          )}
        </div> */}
        <div className={styles.storageFile__wrapper}>
          {isLoading && (
            <FileInformationLoader />
          )}
          {/* FIELD */}
           {/* <div className={styles.storageFile__item}> */}
            {/* Field:  */}
            {/* <span>
              {article?.field ? article.field : '-'}
            </span> */}
            <div className={styles.fileHead}>
              {/* <span className={styles.fieldPlaceholder} data-tooltip-id={article?.field}>
                {article?.field ? article.field : 'Empty field'}
              </span> */}
              {/* <Typography type="h2">Topic:{article?.field ? article.field : 'Empty field'}</Typography> */}
              {(article?.field && article?.field.length > 100) && (
                <Tooltip
                  id={article.field}
                  place="top"
                  className={styles.tooltip}
                  noArrow
                  offset={-10}
                >
                  {article.field}
                </Tooltip>
              )}
              <div className={styles.storageFile__item}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21" fill="none"><path d="M15.714 5.08998C16.3476 5.67521 16.6644 5.96783 16.8322 6.35121C17 6.7346 17 7.16587 17 8.02842L17 16C17 17.8856 17 18.8284 16.4142 19.4142C15.8284 20 14.8856 20 13 20H5C3.11438 20 2.17157 20 1.58579 19.4142C1 18.8284 1 17.8856 1 16L1 5C1 3.11438 1 2.17157 1.58579 1.58579C2.17157 1 3.11438 1 5 1H9.72111C10.4941 1 10.8806 1 11.232 1.13742C11.5833 1.27483 11.8672 1.53708 12.4351 2.06157L15.714 5.08998Z" stroke="#BDC5DC" strokeWidth="2" strokeLinejoin="round"></path></svg>
                <span data-tooltip-id={article?.title}>{article?.title ? article.title : '-'}</span>
                {(article?.title && article?.title.length > 100) && (
                  <Tooltip
                    id={article.title}
                    place="top"
                    className={styles.tooltip}
                    noArrow
                    offset={-10}
                  >
                    {article.title}
                  </Tooltip>
                )}
              </div>

            </div>
           
          {/* </div> */}
          {/* FILE NAME */}
          
         {/* Owner */}
          {!isOwner && (
          <div className={styles.storageFile__item}>
            Owner: 
            {article?.owner ? (
              <button onClick={onOwnerClick} className={styles.storageFile__item_button}>
                {getName(article?.owner.fullName, article?.owner.username, article?.owner.id)}
              </button>
            ) : ('-')}
          </div>
          )}
          {/* Availability */}
          {/* <div className={styles.storageFile__item}>
            Availability:
            <span>
              {article?.isPublic ? 'Open sourced' : 'Permission based'}
            </span>
          </div> */}
          {/* Table */}
          {/* <div className={styles.storageFile__item_wrapper}>
            <div className={styles.storageFile__item_date}>
              <div className={styles.storageFile__item_date_item}>
                Created
                <span>{article?.createdAt ? formatDate(article?.createdAt) : '-'}</span>
              </div>
              <div className={styles.storageFile__item_date_item}>
                Modified
                <span>{article?.updatedAt ? formatDate(article?.updatedAt) : '-'}</span>
              </div>
              <div className={styles.storageFile__item_date_item}>
                Data Size
                <span>{convertToBytesString(article?.fileSize || 0)}</span>
              </div>
            </div>
            {!isOwner ? (
              <div className={styles.storageFile__item_info}>
                Status
                {!article?.isPublic ? <span>{article?.status}</span> : <span>Open sourced</span>}
              </div>
            ) : (
              <>
                <div className={styles.storageFile__item_info}>
                  Pending access requests
                  <span>{article?.usersPendingAccess ? article?.usersPendingAccess : 0}</span>
                </div>
                <div className={styles.storageFile__item_info}>
                  Shared with
                  <span>{`${article?.usersAmount || 0} users`}</span>
                </div>
              </>
            )}
          </div> */}
          <div className={styles.storageFile_table_wrapper}>
              {true && <InfoTableRow
                props={{
                  title: "Owner:",
                  info: article?.owner ? (
                    <button onClick={onOwnerClick} className={styles.ownerButton}>
                      {getName(article?.owner.fullName, article?.owner.username, article?.owner.id)}
                    </button>
                  ) : ('-'),
                  containerStyles: {padding: '10px 0'}
                }}
              />}
              {!isOwner && 
              <InfoTableRow
                props={{
                  title: "Status:",
                  info: !article?.isPublic ? <span>{article?.status}</span> : <span>Open sourced</span>
                }}
              />}
              <InfoTableRow
                props={{
                  title: "Topic",
                  info: article?.field ? article.field : 'Empty field'
                }}
              />
              <InfoTableRow
                props={{
                  title: "Availability:",
                  info: article?.isPublic ? 'Open sourced' : 'Permission based'
                }}
              />
              <InfoTableRow
                props={{
                  title: "Created",
                  info: article?.createdAt ? formatDate(article?.createdAt) : '-'
                }}
              />
              <InfoTableRow
                props={{
                  title: "Modified",
                  info: article?.updatedAt ? formatDate(article?.updatedAt) : '-'
                }}
              />
              <InfoTableRow
                props={{
                  title: "Data Size",
                  info: <span className={styles.dataSize}>{convertToBytesString(article?.fileSize || 0)}</span>
                }}
              />
              {isOwner && <>
                <InfoTableRow
                  props={{
                    title: "Pending access requests",
                    info: article?.usersPendingAccess ? article?.usersPendingAccess : 0
                  }}
                />
                <InfoTableRow
                  props={{
                    title: "Shared with",
                    info: `${article?.usersAmount || 0} users`
                  }}
                />
              </>
              }
          </div>
        </div> 
      </div>
      <div className={cx(styles.storageFile__buttons, classNameButtons)}>
        {!isOwner ? (
          <>
            {!article?.isPublic && (
              <Button
                theme="secondary"
                onClick={showAccessConfirm}
                disabled={
                  isLoading ||
                  isRequester ||
                  isVipUser ||
                  isDisabledRequest
                  // statusCreate === RequestStatus.SUCCESS
                }
                isLoading={statusCreate === RequestStatus.REQUEST}
              >
                Request access
              </Button>
            )}
            {article?.status && (
              <Button
                disabled={article?.isPublic === false 
                  ? ![
                    'Access granted',
                    'Open sourced',
                  ].includes(article?.status) 
                  : false}
                href={article?.articleUrl}
                className={cx(styles.download_button, {
                  [styles.disabled]: isVipUser,
                })}
                isHrefBlank
              >
                Download
              </Button>
            )}
          </>
        ) : (
          <>
            <Button
              theme="secondary"
              onClick={onEditClick}
              disabled={isLoading}
            >
              Edit
            </Button>
            <Button
              disabled={isLoading || !article?.isGraphDifferent}
              onClick={onPublishClick}
              isLoading={statusPublish === RequestStatus.REQUEST}
            >
              {article?.isPublished ? 'Published' : 'Publish'} 
            </Button>
          </>
        )}
       
      </div>
    </>
  );
});
