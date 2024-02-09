import { useDispatch, useSelector } from 'react-redux';
import { useModal } from 'react-modal-hook';
import { trashIcon } from 'assets';
import { RequestStatus } from 'types';
import { ButtonIcon, DeletePublication } from 'components';
import { articlesDelete } from 'store/articles/actionCreators';
import { ArticlesActionTypes } from 'store/articles/actionTypes';
import { articlesSelectors } from 'store/articles/selectors';
import { ReactNode } from 'react';
import { profileGetProfile } from 'store/profile/actionCreators';

import styles from './styles.module.scss';

interface DeleteBtnProps {
  id: number;
  isPublished?: boolean;
  children? : ReactNode | string;
}

export const DeleteBtn = ({ id, isPublished, children }: DeleteBtnProps) => {
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
            isPublished: !!isPublished,
            callback: () => {
              dispatch(profileGetProfile());
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
