import { ButtonIcon, DeletePublication } from 'components';
import { ReactNode } from 'react';
import { useModal } from 'react-modal-hook';
import { useSelector, useDispatch } from 'react-redux';
import { articlesDelete } from 'store/articles/actionCreators';
import { ArticlesActionTypes } from 'store/articles/actionTypes';
import { articlesSelectors } from 'store/articles/selectors';
import { RequestStatus } from 'types';
import { trashIcon } from 'assets';

import styles from './styles.module.scss';

export const DeleteBtn = ({ id, children }: { id: number, children? : ReactNode | string }) => {
  const dispatch = useDispatch();
  
  const statusDelete = useSelector(
    articlesSelectors.getStatus(ArticlesActionTypes.DeleteArticle),
  );
  
  const [showModal, hideModal] = useModal(
    () => (
      <DeletePublication
        onClose={hideModal}
        isLoading={statusDelete === RequestStatus.REQUEST}
        onDelete={() => {
          dispatch(articlesDelete({ 
            articleId: id,
            callback: () => {
              hideModal();
            }, 
          }));
        }}
      />
    ),
    [statusDelete, id],
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
      // eslint-disable-next-line
      <ButtonIcon
        image={trashIcon}
        onClick={showModal}
        className={styles.delete_btn}
      />
  );
};
