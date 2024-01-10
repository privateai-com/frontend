import { FC, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from 'react-modal-hook';
import { RequestStatus } from 'types';
import { Button, DeletePublication } from 'components';
import { articlesDelete } from 'store/articles/actionCreators';
import { ArticlesActionTypes } from 'store/articles/actionTypes';
import { articlesSelectors } from 'store/articles/selectors';
import { useRouter } from 'next/router';
import { routes } from 'appConstants';

interface DeleteBtnProps {
  className?: string;
  articleId: number;
  children? : ReactNode
}

export const DeleteBtn: FC<DeleteBtnProps> = ({ articleId, className, children }) => {
  const dispatch = useDispatch();
  const router = useRouter();

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
            articleId,
            callback: () => {
              hideModal();
              router.push(routes.storage.root);
            }, 
          }));
        }}
      />
    ),
    [statusDelete, articleId, router],
  );

  if(children) {
    // eslint-disable-next-line
    return (<div onClick={showModal}>
      {children}
      {/* eslint-disable-next-line */}
    </div>
    );
  }

  return (
    <Button
      className={className}
      theme="white"
      onClick={showModal}
    >
      Delete file
    </Button>
  );
};
