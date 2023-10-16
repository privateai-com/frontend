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
};

const items = [
  {
    text: 'New access request for “Genome Editing” document.',
    time: '~ 5 min ago',
  },
  {
    text: 'Access granted for “Advancements in Biomedical Research Exploring New Frontiers ...” document.',
    time: '~ 1 day ago',
  },
];

const Notification = memo(({ isOpen }: NotificationProps) => (
  <div className={cx(styles.notification_container, { [styles.show]: isOpen })}>
    {items.map(({ text, time }) => (
      <div
        className={styles.item_container}
        key={text}
      >
        <div className={styles.item_block}>
          <div className={styles.item_time}>{time}</div>
          <ButtonIcon
            className={styles.item_close}
            onClick={() => {}}
            image={closeModalIcon}
            height={12}
            width={12}
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
));

export { Notification };
