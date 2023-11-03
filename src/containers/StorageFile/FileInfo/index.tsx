import {
  FC, memo, useCallback,
} from 'react';
import { useModal } from 'react-modal-hook';
import { useDispatch } from 'react-redux';

import {
  Button,
  Requester,
  Typography,
} from 'components';
import { Article } from 'types';
import { articlesPublish } from 'store/articles/actionCreators';
import styles from './styles.module.scss';
import { FileInformationLoader } from '../Loader';
import { formatDate } from './utils';

type FileInfoProps = {
  onEditClick: () => void;
  isOwner: boolean;
  isLoading: boolean;
  article?: Article;
};

export const FileInfo: FC<FileInfoProps> = memo(({
  onEditClick, isOwner, isLoading, article,
}) => {
  const dispatch = useDispatch();

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

  const onRequestArticleClick = useCallback(() => {
    
  }, []);

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
      <div className={styles.storageFile__file}>
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
      <div className={styles.storageFile__buttons}>
        {!isOwner ? (
          <>
            <Button
              theme="secondary"
              onClick={onRequestArticleClick}
              disabled={isLoading}
            >
              Request access
            </Button>
            <Button
              disabled
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
            >
              Publish
            </Button>
          </>
        )}
       
      </div>
    </>
  );
});
