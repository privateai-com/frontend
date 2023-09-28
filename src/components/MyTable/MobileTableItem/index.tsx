import { FC, ReactNode, useState } from 'react';
import Image from 'next/image';
import cx from 'classnames';

import { arrowGreenIcon, minusCircleIcon, plusCircleIcon } from 'assets';

import Link from 'next/link';
import styles from './styles.module.scss';

interface ItemProps {
  className?: string;
  name: string;
  title1: string;
  state1: string | ReactNode;
  title2: string;
  state2: string | ReactNode;
}

export const MobileTableItem: FC<ItemProps> = ({
  className,
  name,
  title1,
  state1,
  title2,
  state2,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cx(styles.item_container, className)}>
      <div className={styles.item_head}>
        <button onClick={() => setIsOpen((state) => !state)}>
          <Image
            src={isOpen ? minusCircleIcon : plusCircleIcon}
            alt="icon"
          />
          {name}
        </button>

        <Link href="/#">
          <Image
            src={arrowGreenIcon}
            alt="arrow"
          />
        </Link>
      </div>

      <div
        className={cx(styles.item_content, {
          [styles.show]: isOpen,
        })}
      >
        <div className={styles.item_item}>
          <span>
            {title1}
            :
          </span>
          {state1}
        </div>
        <div className={styles.item_item}>
          <span>
            {title2}
            :
          </span>
          {state2}
        </div>
      </div>
    </div>
  );
};
