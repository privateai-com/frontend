import {
  DetailedHTMLProps, HTMLAttributes, PropsWithChildren, forwardRef,
} from 'react';
import Link from 'next/link';
import cx from 'classnames';

import { closeNotifyIcon } from 'assets';
import { queryTab, routes } from 'appConstants';
import { ButtonIcon, Typography } from 'components';
import { NotificationInfo } from 'types';
import { generateNotificationText, timeAgo } from './utils';

import styles from './styles.module.scss';

type NotificationProps = PropsWithChildren<
DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  isOpen: boolean;
  onDeleteNotification: (requestId: number) => void;
  notifications: NotificationInfo[];
  userId: number;
  // eslint-disable-next-line
  toggleFun?: any;
}
>;

const Notification = forwardRef<HTMLDivElement, NotificationProps>((
  {
    isOpen, onDeleteNotification, notifications, userId, toggleFun,
  }: NotificationProps,
  ref,
) => (
  <>
    
    <div className={cx(styles.bg, { [styles.show]: isOpen })} />
    <div className={cx(styles.notification_container, { [styles.show]: isOpen })} ref={ref}>
      <div className={styles.notification_container_inner}>
        <div className={styles.notification_container_head}>

          <Typography type="h3" className={styles.notification_container_head_h3}>
            Requests
          </Typography>
          <button onClick={toggleFun} className={styles.notification_container_head_close}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect width="14" height="14" transform="translate(1 1)" fill="white" />
              <path d="M1 1L15 15" stroke="#7C859E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15 1L1 15" stroke="#7C859E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className={styles.notification_content}>
          {notifications.map(({
            id, createdAt, article, type, requester,
          }) => (
            <div
              className={styles.item_container}
              key={id}
            >
              <div className={styles.item_svg_wrap}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 20" fill="none">
                  <path d="M2.30469 19.6777C0.78125 19.6777 0 18.877 0 17.2266V10.166C0 8.70117 0.625 7.91016 1.8457 7.75391V5.46875C1.8457 1.91406 4.20898 0 6.96289 0C9.70703 0 12.0801 1.91406 12.0801 5.46875V7.76367C13.291 7.91016 13.916 8.71094 13.916 10.166V17.2266C13.916 18.877 13.1348 19.6777 11.6113 19.6777H2.30469ZM3.88672 5.32227V7.73438H10.0488V5.32227C10.0488 3.16406 8.64258 1.96289 6.96289 1.96289C5.27344 1.96289 3.88672 3.16406 3.88672 5.32227ZM2.76367 17.7148H11.1621C11.5625 17.7148 11.7773 17.4805 11.7773 17.0312V10.3711C11.7773 9.91211 11.5625 9.6875 11.1621 9.6875H2.76367C2.37305 9.6875 2.13867 9.91211 2.13867 10.3711V17.0312C2.13867 17.4805 2.37305 17.7148 2.76367 17.7148Z" fill="#BDC2CF" />
                </svg>
              </div>
              <div className="">
                <div className={styles.item_block}>
                  <div className={styles.item_time}>{timeAgo(createdAt)}</div>
                  <ButtonIcon
                    className={styles.item_close}
                    onClick={() => onDeleteNotification(id)}
                    image={closeNotifyIcon}
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
                  {generateNotificationText(type, article, userId === article.owner.id)}
                  {/* <Image
                    src={arrowNotifyIcon}
                    alt="next"
                    width={15}
                    className={styles.item_next}
                  /> */}
                </Link>
                {/* <div className={styles.item_btn_wrap}>
                  <Button className={cx(styles.item_btn, styles.item_btn_grant)}>
                    Grant access
                  </Button>
                  <Button className={cx(styles.item_btn, styles.item_btn_decline)}>
                    Decline
                  </Button>
                </div> */}
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
));

export { Notification };
