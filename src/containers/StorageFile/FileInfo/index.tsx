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
  CommunityButton,
  Requester,
} from 'components';
import { Article, RequestStatus } from 'types';
import { articlesLike, articlesPublish, articlesSetState } from 'store/articles/actionCreators';
import { requestSelectors } from 'store/request/selectors';
import { RequestActionTypes } from 'store/request/actionsTypes';
import { requestCreate } from 'store/request/actionCreators';
import { articlesSelectors } from 'store/articles/selectors';
import { ArticlesActionTypes } from 'store/articles/actionTypes';
import { profileGetProfile, profileGetProfileUser } from 'store/profile/actionCreators';
import { profileSelectors } from 'store/profile/selectors';
import {
  getName,
  isArticlePopular,
  normalizeUserInfo,
  notification,
} from 'utils';
import { useVipUser } from 'hooks';
import { errorsNotification } from 'appConstants';
import { convertToBytesString, formatDate } from './utils';
import { FileInformationLoader } from '../Loader';

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
  // const status = article ? getStatusAccessArticle(article) : '';

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

  // const checkDay = (arg:number) => {
  //   const currentDay = new Date();
  //   const month = currentDay.getUTCMonth() + 1;
  //   const day = currentDay.getUTCDate();
  //   const year = currentDay.getUTCFullYear();

  //   const argDate = new Date(arg);
  //   const argMount = argDate.getUTCMonth() + 1;
  //   const argDay = currentDay.getUTCDate();
  //   const argYear = currentDay.getUTCFullYear();

  //   if(day === argDay && month === argMount && year === argYear) {
  //     return 'Today';
  //   }
  //   return `${argDate} ${argMount} ${argYear}`;
  // }; 

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
        // dispatch(articleSetFetchingStatus({ status: true }));
        dispatch(articlesPublish({
          articleId: id,
          isPublished: true,
          callback: () => dispatch(profileGetProfile()),
        }));
      }
    }
  }, [article, dispatch, isUserRequiredFieldsFilled]);

  const onCommunityClick = useCallback((isDislike: boolean) => {
    if (article) {
      const { id } = article;
      if (id) {
        dispatch(articlesLike({ id, isDislike }));
      }
    }
  }, [article, dispatch]);

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
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21" fill="none"><path d="M15.714 5.08998C16.3476 5.67521 16.6644 5.96783 16.8322 6.35121C17 6.7346 17 7.16587 17 8.02842L17 16C17 17.8856 17 18.8284 16.4142 19.4142C15.8284 20 14.8856 20 13 20H5C3.11438 20 2.17157 20 1.58579 19.4142C1 18.8284 1 17.8856 1 16L1 5C1 3.11438 1 2.17157 1.58579 1.58579C2.17157 1 3.11438 1 5 1H9.72111C10.4941 1 10.8806 1 11.232 1.13742C11.5833 1.27483 11.8672 1.53708 12.4351 2.06157L15.714 5.08998Z" stroke="#BDC5DC" strokeWidth="2" strokeLinejoin="round" /></svg>
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
          {/* {!isOwner && (
          <div className={styles.storageFile__item}>
            Owner: 
            {article?.owner ? (
              <button onClick={onOwnerClick} className={styles.storageFile__item_button}>
                {getName(article?.owner.fullName, article?.owner.username, article?.owner.id)}
              </button>
            ) : ('-')}
          </div>
          )} */}
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
            {true && (
            <InfoTableRow
              props={{
                title: 'Owner:',
                info: article?.owner ? (
                  <button onClick={onOwnerClick} className={styles.ownerButton}>
                    {getName(article?.owner.fullName, article?.owner.username, article?.owner.id)}
                  </button>
                ) : ('-'),
                containerStyles: { padding: '10px 0' },
              }}
            />
            )}
            {!isOwner && (
              <InfoTableRow
                props={{
                  title: 'Status:',
                  info: !article?.isPublic ? (
                    <>
                      {
                      article?.status === 'Access request pending' && (
                      <span className={cx(styles.accessRequestPendingStatus, styles.status_span)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="#7C859E" strokeWidth="2" />
                          <path d="M10 5L10 9.5L10 9.51955C10 9.81971 10.15 10.1 10.3998 10.2665V10.2665L13 12" stroke="#7C859E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Access request pending
                      </span>
                      )
                    }
                      {
                      article?.status === 'Permission needed' && (
                      <span className={cx(styles.permissionNeededStatus, styles.status_span)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M12 8L12 13" stroke="#E0A32C" strokeWidth="2" strokeLinecap="round" />
                          <path d="M12 16V15.9888" stroke="#E0A32C" strokeWidth="2" strokeLinecap="round" />
                          <path d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z" stroke="#E0A32C" strokeWidth="2" />
                        </svg>
                        Permission needed
                      </span>
                      )
                    }
                      {
                      article?.status === 'Access granted' && (
                      <span className={cx(styles.accessGrantedStatus, styles.status_span)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="19" viewBox="0 0 11 16" fill="none">
                          <path d="M1.80469 15.5625C0.617188 15.5625 0 14.9297 0 13.6484V8.11719C0 6.98438 0.492188 6.35938 1.42969 6.23438V4.375C1.42969 1.49219 3.33594 0 5.46875 0C7.60156 0 9.50781 1.49219 9.50781 4.375V6.23438C10.4453 6.35938 10.9297 6.98438 10.9297 8.11719V13.6484C10.9297 14.9297 10.3125 15.5625 9.125 15.5625H1.80469ZM2.89062 4.23438V6.21094H8.04688V4.23438C8.04688 2.40625 6.85938 1.40625 5.46875 1.40625C4.07031 1.40625 2.89062 2.40625 2.89062 4.23438ZM2.03125 14.1641H8.90625C9.23438 14.1641 9.41406 13.9688 9.41406 13.5938V8.17188C9.41406 7.79688 9.23438 7.60938 8.90625 7.60938H2.03125C1.71094 7.60938 1.51562 7.79688 1.51562 8.17188V13.5938C1.51562 13.9688 1.71094 14.1641 2.03125 14.1641Z" fill="#3AB393" />
                        </svg>
                        Access granted
                      </span>
                      )
                    }
                      {
                      article?.status !== 'Access request pending' &&
                      article?.status !== 'Permission needed' &&
                      article?.status !== 'Access granted' && (
                      <span className={cx(styles.otherStatus, styles.status_span)}>
                          {article?.status}
                      </span>
                      )
                    }
                    </>
                  ) : (
                    <span className={cx(styles.openSourcedStatus, styles.status_span)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="15" viewBox="0 0 22 15" fill="none">
                        <path d="M15.0781 7.39062C13.1953 7.39062 11.6641 5.73438 11.6641 3.69531C11.6641 1.6875 13.2031 0.0625 15.0781 0.0625C16.9688 0.0625 18.5 1.66406 18.5 3.67969C18.5 5.72656 16.9688 7.39062 15.0781 7.39062ZM6.02344 7.47656C4.39062 7.47656 3.05469 6.02344 3.05469 4.22656C3.05469 2.48438 4.39844 1.03906 6.02344 1.03906C7.67188 1.03906 9 2.46094 9 4.21094C9 6.01562 7.67188 7.47656 6.02344 7.47656ZM15.0781 6.03906C16.1719 6.03906 17.0859 5 17.0859 3.67969C17.0859 2.39062 16.1797 1.41406 15.0781 1.41406C13.9844 1.41406 13.0781 2.40625 13.0781 3.69531C13.0781 5.01562 14 6.03906 15.0781 6.03906ZM6.02344 6.14062C6.92188 6.14062 7.67969 5.28906 7.67969 4.21094C7.67969 3.1875 6.9375 2.36719 6.02344 2.36719C5.13281 2.36719 4.38281 3.20312 4.38281 4.22656C4.38281 5.28906 5.14062 6.14062 6.02344 6.14062ZM1.72656 14.6562C0.609375 14.6562 0.046875 14.1797 0.046875 13.25C0.046875 10.6562 2.71875 8.29688 6.02344 8.29688C7.24219 8.29688 8.47656 8.625 9.46875 9.24219C9.04688 9.51562 8.71875 9.84375 8.46094 10.2109C7.78125 9.83594 6.89844 9.61719 6.02344 9.61719C3.53906 9.61719 1.42969 11.3359 1.42969 13.1328C1.42969 13.2656 1.49219 13.3359 1.64062 13.3359H7.14062C7.08594 13.8516 7.375 14.4062 7.79688 14.6562H1.72656ZM10.2031 14.6562C8.85938 14.6562 8.21094 14.2266 8.21094 13.3125C8.21094 11.1797 10.8828 8.30469 15.0781 8.30469C19.2734 8.30469 21.9453 11.1797 21.9453 13.3125C21.9453 14.2266 21.2969 14.6562 19.9453 14.6562H10.2031ZM9.94531 13.3047H20.2109C20.3906 13.3047 20.4609 13.25 20.4609 13.1016C20.4609 11.9062 18.5312 9.65625 15.0781 9.65625C11.625 9.65625 9.6875 11.9062 9.6875 13.1016C9.6875 13.25 9.75781 13.3047 9.94531 13.3047Z" fill="#3AB393" />
                      </svg>
                      Open-sourced
                    </span>
                  ),
                }}
              />
            )}
            <InfoTableRow
              props={{
                title: 'Topic',
                info: article?.field ? article.field : 'Empty field',
              }}
            />
            <InfoTableRow
              props={{
                title: 'Availability:',
                info: article?.isPublic ? 'Open sourced' : 'Permission based',
              }}
            />
            <InfoTableRow
              props={{
                title: 'Created',
                info: article?.createdAt ? formatDate(article?.createdAt) : '-',
              }}
            />
            <InfoTableRow
              props={{
                title: 'Modified',
                info: article?.updatedAt ? formatDate(article?.updatedAt) : '-',
              }}
            />
            <InfoTableRow
              props={{
                title: 'Data Size',
                info: <span className={styles.dataSize}>
                  {convertToBytesString(article?.fileSize || 0)}
                  {/* eslint-disable-next-line */}
                </span>,
              }}
            />
            {isOwner && (
            <>
              <InfoTableRow
                props={{
                  title: 'Pending access requests',
                  info: article?.usersPendingAccess ? article?.usersPendingAccess : 0,
                }}
              />
              <InfoTableRow
                props={{
                  title: 'Shared with',
                  info: `${article?.usersAmount || 0} users`,
                }}
              />
            </>
            )}
            <InfoTableRow
              props={{
                title: 'Article community review',
                info: (
                  <div className={styles.storageFile_like_wrapper}>
                    <CommunityButton
                      isLiked={article?.liked}
                      onClick={() => onCommunityClick(false)}
                      count={article?.likesCount}
                      // isDisabled={
                      //   ![StatusAccessArticle.OpenSource, StatusAccessArticle.AccessGranted]
                      //     .includes(status as StatusAccessArticle) ||
                      //   isVipUser
                      // }
                      isPopular={isArticlePopular(article?.likesCount, article?.dislikesCount)}
                    />
                    <CommunityButton
                      isDisliked={article?.disliked}
                      onClick={() => onCommunityClick(true)}
                      count={article?.dislikesCount}
                      isDislikeButton
                      // isDisabled={
                      //   ![StatusAccessArticle.OpenSource, StatusAccessArticle.AccessGranted]
                      //     .includes(status as StatusAccessArticle) ||
                      //   isVipUser
                      // }
                      isPopular={isArticlePopular(article?.dislikesCount, article?.likesCount)}
                    />
                  </div>),
              }}
            />
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
