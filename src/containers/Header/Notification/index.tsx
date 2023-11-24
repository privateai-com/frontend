import {
  DetailedHTMLProps, HTMLAttributes, PropsWithChildren, forwardRef,
} from 'react';
import Link from 'next/link';
import cx from 'classnames';
import Image from 'next/image';

import { arrowIcon, closeModalIcon } from 'assets';
import { queryTab, routes } from 'appConstants';
import { ButtonIcon } from 'components';
import { NotificationInfo } from 'types';
import { generateNotificationText, timeAgo } from './utils';

import styles from './styles.module.scss';

type NotificationProps = PropsWithChildren<
DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  isOpen: boolean;
  onDeleteNotification: (requestId: number) => void;
  notifications: NotificationInfo[];
  userId: number;
}
>;

const Notification = forwardRef<HTMLDivElement, NotificationProps>((
  {
    isOpen, onDeleteNotification, notifications, userId,
  }: NotificationProps,
  ref,
) => (
  <div className={cx(styles.notification_container, { [styles.show]: isOpen })} ref={ref}>
    <div className={styles.notification_content}>
      {notifications.map(({
        id, createdAt, article, type, approve, requester,
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
              height={12}
              width={12}
            />
          </div>
          <Link
            href={(requester.id !== userId)
              ? `${routes.requests.root}`
              : `${routes.storage.root}?storageTab=${queryTab.storageRequestedData}`}
            className={styles.item_content}
            onClick={() => onDeleteNotification(id)}
          >
            {generateNotificationText(type, article, approve)}
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
