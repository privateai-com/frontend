import { useMemo } from 'react';
import { useModal } from 'react-modal-hook';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography, SelectedText, AccessConfirm, 
} from 'components';
import { RequestCell } from 'containers';
import { useScreenWidth } from 'hooks';
import { ScreenWidth, routes } from 'appConstants';
import { Article, RequestStatus, StatusAccessArticle } from 'types';
import {
  formatDate,
  getName, getStatusAccessArticle, 
} from 'utils';
import { requestCreate } from 'store/request/actionCreators';
import { RequestActionTypes } from 'store/request/actionsTypes';
import { requestSelectors } from 'store/request/selectors';
import { ExpandableMobileItem } from 'components/AdaptivePaginationTable/ExpandableMobileItem';

import Link from 'next/link';
import styles from './styles.module.scss';

const textStatus = {
  [StatusAccessArticle.OpenSource]: 'Open sourced', 
  [StatusAccessArticle.AccessGranted]: 'Access granted', 
  [StatusAccessArticle.PermissionNeeded]: 'Permission needed', 
  [StatusAccessArticle.AccessRequestPending]: 'Access request pending', 
  [StatusAccessArticle.AccessDenied]: 'Access denied', 
};

type ItemProps = {
  article: Article;
  isDisabled?: boolean;
  search?: string;
};

export const Item: React.FC<ItemProps> = ({
  article,
  isDisabled,
  search = '',
}) => {
  const dispatch = useDispatch();
  const isMobile = useScreenWidth(ScreenWidth.bigMobile);

  const statusCreate = useSelector(requestSelectors.getStatus(RequestActionTypes.Create));

  const {
    id,
    title,
    field,
    owner: {
      username,
      fullName,
      id: ownerId,
    },
    createdAt,
    updatedAt,
    topCoreEntities,
  } = article;

  const status = getStatusAccessArticle(article);

  const getStatusStyle = () => {
    switch (status) {
      case StatusAccessArticle.OpenSource:
        return styles.open;

      case StatusAccessArticle.AccessGranted:
        return styles.granted;

      case StatusAccessArticle.PermissionNeeded:
        return styles.permission_needed;

      case StatusAccessArticle.AccessRequestPending:
        return styles.pending;

      case StatusAccessArticle.AccessDenied:
        return styles.denied;

      default:
        return styles.item_status;
    }
  };

  const [showAccessConfirm, hideAccessConfirm] = useModal(
    () => (
      <AccessConfirm
        isLoading={statusCreate === RequestStatus.REQUEST}
        onCloseModal={() => {
          hideAccessConfirm();
        }}
        onConfirm={() => {
          dispatch(requestCreate({
            articleId: id, 
            callback: () => {
              hideAccessConfirm();
            },
          }));
        }}
      />
    ),
    [statusCreate],
  );

  const requester = useMemo(() => (
    <RequestCell
      className={styles.item_btn_link}
      profileId={ownerId}
      titleModal="Owner"
      onConfirmButton={showAccessConfirm}
      onCancelButton={hideAccessConfirm}
      isHideButtonsRequester
      isDisabled={isDisabled}
    >
      {getName(fullName, username, 1) ?? ''}
    </RequestCell> 
  ), [fullName, hideAccessConfirm, isDisabled, ownerId, showAccessConfirm, username]);

  if (isMobile) {
    return (
      <ExpandableMobileItem
        name={title}
        searchWord={search}
        id={id}
      >
        <div>
          <div className={styles.item_row_block}>
            <span className={getStatusStyle()}>{status}</span>
          </div>
          <div className={styles.item_row_block}>
            <span className={styles.title}>Field: </span>
            <SelectedText
              key={`field_mobile_${id}`}
              text={field}
              searchWord={search}
              className={styles.selected}
            />
          </div>
          <div className={styles.item_row_block}>
            <span className={styles.title}>Owner: </span>
            {requester}
          </div>
          <div className={styles.item_col_block}>
            <span className={styles.title}>Core entities: </span>
            <span className={styles.item_core}>{topCoreEntities ?? '-'}</span>
          </div>
          <div className={styles.item_date_block}>
            <div className={styles.item_created_block}>
              <span className={styles.title}>Created</span>
              {createdAt}
            </div>
            <div className={styles.item_col_block}>
              <span className={styles.title}>Modified</span>
              {updatedAt}
            </div>
          </div>
        </div>
      </ExpandableMobileItem>
    );
  }

  return (
    <div className={styles.item}>
      <div className={styles.item_content_block}>
        <div className={styles.item_first_block}>
          <Link href={`${routes.storage.root}/${id}`}>
            <Typography
              className={styles.item_title}
              type="h4"
            >
              <SelectedText
                key={`title_${id}`}
                text={title}
                searchWord={search}
                className={styles.selected}
              />
            </Typography>
          </Link>
          <div className={styles.item_description_block}>
            <div className={styles.item_field_author_block}>
              <div className={styles.item_row_block}>
                <span className={styles.title}>Field: </span>
                <SelectedText
                  key={`field_${id}`}
                  text={field}
                  searchWord={search}
                  className={styles.selected}
                />
              </div>
              <div className={styles.item_row_block}>
                <span className={styles.title}>Owner: </span>
                {requester}
              </div>
            </div>
            <div className={styles.item_col_block}>
              <span className={styles.title}>Core entities</span>
              <span className={styles.item_core}>{topCoreEntities ?? '-'}</span>
            </div>
          </div>
        </div>
        <div className={styles.item_second_block}>
          <button 
            onClick={(status === StatusAccessArticle.PermissionNeeded && !isDisabled)
              ? showAccessConfirm
              : () => {}} 
            className={styles.buttonShowAccess}
          >
            <span className={getStatusStyle()}>{textStatus[status]}</span>
          </button>
          <div className={styles.item_date_block}>
            <div className={styles.item_created_block}>
              <span className={styles.title}>Created</span>
              {formatDate(new Date(createdAt))}
            </div>
            <div className={styles.item_col_block}>
              <span className={styles.title}>Modified</span>
              {formatDate(new Date(updatedAt))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
