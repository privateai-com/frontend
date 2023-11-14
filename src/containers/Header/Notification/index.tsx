import { memo } from 'react';
import Link from 'next/link';
import cx from 'classnames';
import Image from 'next/image';
import { arrowIcon, closeModalIcon } from 'assets';
import { routes } from 'appConstants';
import { ButtonIcon } from 'components';
import styles from './styles.module.scss';

type NotificationProps = {
  isOpen: boolean;
  onDeleteNotification: (requestId: number) => void;
};

const items = [
  {
    requestId: 21,
    text: 'New access request for “Genome Editing” document.',
    time: '~ 5 min ago',
  },
  {
    requestId: 2,
    text: 'Access granted for “Advancements in Biomedical Research Exploring New Frontiers ...” document.',
    time: '~ 1 day ago',
  },
];

const Notification = memo(({ isOpen, onDeleteNotification }: NotificationProps) => (
  <div className={cx(styles.notification_container, { [styles.show]: isOpen })}>
    <div className={styles.notification_content}>
      {items.map(({ text, time, requestId }) => (
        <div
          className={styles.item_container}
          key={text}
        >
          <div className={styles.item_block}>
            <div className={styles.item_time}>{time}</div>
            <ButtonIcon
              className={styles.item_close}
              onClick={() => onDeleteNotification(requestId)}
              image={closeModalIcon}
              height={14}
              width={14}
            />
          </div>
          <Link
            href={`${routes.requests.root}`}
            className={styles.item_content}
          >
            {text}
            <Image
              src={arrowIcon}
              alt={text}
              width={25}
            />
          </Link>
        </div>
      ))}
    </div>
  </div>
));

export { Notification };
