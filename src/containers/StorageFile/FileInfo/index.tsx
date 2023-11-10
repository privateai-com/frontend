import {
  FC, memo, useCallback,
} from 'react';
import { useModal } from 'react-modal-hook';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';

import {
  AccessConfirm,
  Button,
  Requester,
  Typography,
} from 'components';
import { Article, RequestStatus } from 'types';
import { articlesPublish } from 'store/articles/actionCreators';
import { requestSelectors } from 'store/request/selectors';
import { RequestActionTypes } from 'store/request/actionsTypes';
import { requestCreate } from 'store/request/actionCreators';
import { articlesSelectors } from 'store/articles/selectors';
import { ArticlesActionTypes } from 'store/articles/actionTypes';
import { formatDate } from './utils';
import { FileInformationLoader } from '../Loader';
import styles from './styles.module.scss';

type FileInfoProps = {
  onEditClick: () => void;
  isOwner: boolean;
  isLoading: boolean;
  article?: Article;
  classNameFile?: string;
  classNameButtons?: string;
};

export const FileInfo: FC<FileInfoProps> = memo(({
  onEditClick, isOwner, isLoading, article, classNameFile, classNameButtons,
}) => {
  const dispatch = useDispatch();
  const statusCreate = useSelector(requestSelectors.getStatus(RequestActionTypes.Create));
  const statusPublish = useSelector(
    articlesSelectors.getStatus(ArticlesActionTypes.PublishArticle),
  );

  const [showRequester, hideRequester] = useModal(
    () => (
      <Requester
        avatar="https://www.figma.com/file/bknHsaOyZlzB3FrosPJ7Vx/ARCHON-(Copy)?type=design&node-id=526-4546&mode=design&t=cjGucjlcUhk4ouS0-4"
        name="John Doe"
        contry="London, UK (GMT +0)"
        organization="London Institute of Medical Sciences, Head of neurosurgery laboratory"
        position="Head of neurosurgery laboratory"
        fields={'Neurobiology, neurosurgery, neuropathology'.split(', ')}
        socialMedia="https:/facebook.com/profile"
        onCloseModal={() => {
          hideRequester();
        }}
      />
    ),
    [],
  );

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
              },
            }));
          }
        }}
      />
    ),
    [statusCreate],
  );

  const onPublishClick = useCallback(() => {
    if (article) {
      const { id } = article;
      if (id) {
        dispatch(articlesPublish({ articleId: id, isPublished: true, callback: () => {} }));
      }
    }
  }, [article, dispatch]);

  return (
    <>
      <div className={cx(styles.storageFile__file, classNameFile)}>
        <Typography type="h1">File information</Typography>
        <div className={styles.storageFile__wrapper}>
          {isLoading && (
            <FileInformationLoader />
          )}
          <div className={styles.storageFile__item}>
            File name:
            <span>{article?.title ? article.title : '-'}</span>
          </div>
          <div className={styles.storageFile__item}>
            Field: 
            <span>
              {article?.field ? article.field : '-'}
            </span>
          </div>
          {!isOwner && (
          <div className={styles.storageFile__item}>
            Owner: 
            {article?.owner ? (
              <button onClick={showRequester} className={styles.storageFile__item_button}>
                {article?.owner.fullName ? article?.owner.fullName : `Archonaut #${article?.owner.id}` }
              </button>
            ) : ('-')}
          </div>
          )}
          <div className={styles.storageFile__item}>
            Availability :
            {article?.isPublic ? (
              <span>
                {article?.isPublic ? 'Open sourced' : 'Permission based'}
              </span>
            ) : (<span>-</span>)}
          </div>
          <div className={styles.storageFile__item_wrapper}>
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
                <span>0 MB</span>
              </div>
            </div>
            {!isOwner ? (
              <div className={styles.storageFile__item_info}>
                Status
                <span>Permission required</span>
              </div>
            ) : (
              <>
                <div className={styles.storageFile__item_info}>
                  Pending access requests
                  <span>{article?.requests ? article?.requests.length : 0}</span>
                </div>
                <div className={styles.storageFile__item_info}>
                  Shared with
                  <span>0 users</span>
                </div>
              </>
            )}
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
                disabled={isLoading}
              >
                Request access
              </Button>
            )}
            <Button
              disabled={!article?.isPublic}
              href={article?.articleUrl}
              className={styles.download_button}
              isHrefBlank
            >
              Download
            </Button>
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
              disabled={isLoading}
              onClick={onPublishClick}
              isLoading={statusPublish === RequestStatus.REQUEST}
            >
              Publish
            </Button>
          </>
        )}
       
      </div>
    </>
  );
});
