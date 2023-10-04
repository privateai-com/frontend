import { Button } from 'components';
import cx from 'classnames';
import { ModalWithLogo } from '../ModalWithLogo';
import styles from './styles.module.scss';

const DeletePublication = () => (
  <ModalWithLogo onClose={() => {}}>
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
          >
            Yes, delete
          </Button>
          <Button
            className={styles.delete_pub_btn}
            theme="secondary"
          >
            Don&apos;t delete
          </Button>
        </div>
      </div>
    </div>
  </ModalWithLogo>
);

export { DeletePublication };
