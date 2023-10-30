import { useDispatch, useSelector } from 'react-redux';
import { useModal } from 'react-modal-hook';
import { trashIcon } from 'assets';
import { RequestStatus } from 'types';
import { ButtonIcon, DeletePublication } from 'components';
import { articlesDelete } from 'store/articles/actionCreators';
import { ArticlesActionTypes } from 'store/articles/actionTypes';
import { articlesSelectors } from 'store/articles/selectors';
import styles from './styles.module.scss';

export const DeleteBtn = ({ id }: { id: number }) => {
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
    [statusDelete],
  );

  return (
    <ButtonIcon
      image={trashIcon}
      onClick={showModal}
      className={styles.delete_btn}
    />
  );
};
