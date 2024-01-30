import { ButtonIcon, DeletePublication } from 'components';
import { ReactNode } from 'react';
import { useModal } from 'react-modal-hook';
import { useSelector } from 'react-redux';
import { ArticlesActionTypes } from 'store/articles/actionTypes';
import { articlesSelectors } from 'store/articles/selectors';
import { RequestStatus } from 'types';
import { trashIcon } from 'assets';

import styles from './styles.module.scss';

export const DeleteBtn = ({ onDelete, children }: {
  onDelete: () => void,
  children? : ReactNode | string
}) => {
  const statusDelete = useSelector(
    articlesSelectors.getStatus(ArticlesActionTypes.DeleteArticle),
  );
  
  const [showModal, hideModal] = useModal(
    () => (
      <DeletePublication
        onClose={hideModal}
        isLoading={statusDelete === RequestStatus.REQUEST}
        onDelete={() => { onDelete(); hideModal(); }}
      />
    ),
    [statusDelete, onDelete],
  );
    
  if(children) {
    return (
        // eslint-disable-next-line
        <div onClick={showModal}>
          {children}
        </div>
    );
  }
  
  return (
    <ButtonIcon
      image={trashIcon}
      onClick={showModal}
      className={styles.delete_btn}
    />
  );
};
