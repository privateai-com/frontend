import { Button } from 'components';
import cx from 'classnames';
import styles from './styles.module.scss';
import { ModalWithLogo } from '../ModalWithLogo';

type DeletePublicationProps = {
  onClose: () => void;
  onDelete: () => void;
  isLoading?: boolean;
};

const DeletePublication: React.FC<DeletePublicationProps> = ({
  onClose,
  onDelete,
  isLoading,
}) => (
  <ModalWithLogo onClose={onClose} classNameModal={styles.delete_pub_container}>
    <div className={styles.delete_pub}>
      <span className={styles.delete_pub_text}>
        You are about to delete this publication.
      </span>
      <span className={styles.delete_pub_text}>
        Once deleted, all access previously granted to this file will be
        automatically revoked
      </span>
      <div>
        <div className={styles.delete_pub_question}>
          Are you sure you want to proceed?
        </div>
        <div className={styles.delete_pub_btn_block}>
          <Button
            className={cx(styles.delete_pub_btn, styles.delete_pub_black_btn)}
            theme="secondary"
            onClick={onDelete}
            isLoading={isLoading}
          >
            Yes, delete
          </Button>
          <Button
            className={styles.delete_pub_btn}
            theme="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Don&apos;t delete
          </Button>
        </div>
      </div>
    </div>
  </ModalWithLogo>
);

export { DeletePublication };
