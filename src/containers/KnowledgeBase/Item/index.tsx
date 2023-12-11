import { useMemo } from 'react';
import { useModal } from 'react-modal-hook';
import { useDispatch, useSelector } from 'react-redux';

import { AccessConfirm } from 'components';
import { RequestCell } from 'containers';
import { Article, RequestStatus, StatusAccessArticle } from 'types';
import { getName, getStatusAccessArticle } from 'utils';
import { requestCreate } from 'store/request/actionCreators';
import { RequestActionTypes } from 'store/request/actionsTypes';
import { requestSelectors } from 'store/request/selectors';

import styles from './styles.module.scss';
import { ItemMobile } from './ItemMobile';
import { ItemDesktop } from './ItemDesktop';

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
  isMobile: boolean;
  search?: string;
};

export const Item: React.FC<ItemProps> = ({
  article,
  isDisabled,
  search = '',
  isMobile,
}) => {
  const dispatch = useDispatch();
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
      id={id}
    >
      {getName(fullName, username, ownerId) ?? ''}
    </RequestCell> 
  ), [fullName, hideAccessConfirm, id, isDisabled, ownerId, showAccessConfirm, username]);

  if (isMobile) {
    return (
      <ItemMobile
        title={title}
        id={id} 
        createdAt={createdAt}
        updatedAt={updatedAt}
        field={field}
        classNameStatus={getStatusStyle()}
        requester={requester}
        status={status}
        search={search}
        topCoreEntities={topCoreEntities}
      />
    );
  }

  return (
    <ItemDesktop
      title={title}
      id={id} 
      createdAt={createdAt}
      updatedAt={updatedAt}
      field={field}
      classNameStatus={getStatusStyle()}
      requester={requester}
      status={status}
      textStatus={textStatus[status]}
      search={search}
      topCoreEntities={topCoreEntities}
      isDisabled={isDisabled}
      showAccessConfirm={showAccessConfirm}
    />
  );
};
