import {
  DetailedHTMLProps, HTMLAttributes, PropsWithChildren, forwardRef,
} from 'react';
import Link from 'next/link';
import cx from 'classnames';
import Image from 'next/image';

import { arrowIcon, closeModalIcon } from 'assets';
import { queryTab, routes } from 'appConstants';
import { ButtonIcon } from 'components';
import { NotificationInfo, NotificationType } from 'types';
import { generateNotificationText, timeAgo } from './utils';

import styles from './styles.module.scss';

type NotificationProps = PropsWithChildren<
DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  isOpen: boolean;
  onDeleteNotification: (requestId: number) => void;
  notifications: NotificationInfo[];
}
>;

const Notification = forwardRef<HTMLDivElement, NotificationProps>((
  { isOpen, onDeleteNotification, notifications }: NotificationProps,
  ref,
) => (
  <div className={cx(styles.notification_container, { [styles.show]: isOpen })} ref={ref}>
    <div className={styles.notification_content}>
      {notifications.map(({
        id, createdAt, article, type,
      }) => (
        <div
          className={styles.item_container}
          key={id}
        >
          <div className={styles.item_block}>
            <div className={styles.item_time}>{timeAgo(createdAt)}</div>
            <ButtonIcon
              className={styles.item_close}
              onClick={() => onDeleteNotification(id)}
              image={closeModalIcon}
              height={14}
              width={14}
            />
          </div>
          <Link
            href={type === NotificationType.PendingAccess
              ? `${routes.requests.root}`
              : `${routes.storage.root}?storageTab=${queryTab.storageRequestedData}`}
            className={styles.item_content}
            onClick={() => onDeleteNotification(id)}
          >
            {generateNotificationText(type, article)}
            <Image
              src={arrowIcon}
              alt="next"
              width={25}
            />
          </Link>
        </div>
      ))}
    </div>
  </div>
));

export { Notification };
