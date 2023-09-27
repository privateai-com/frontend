import { FC, useState } from 'react';
import Image from 'next/image';
import cx from 'classnames';

import {
  arrowGreenIcon,
  minusCircleIcon,
  plusCircleIcon,
} from 'assets';

import Link from 'next/link';
import styles from './styles.module.scss';

interface ArticleProps {
  className?: string;
  name: string;
  status: string;
  core: string;
}

export const Article: FC<ArticleProps> = ({
  className,
  name,
  status,
  core,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cx(styles.article_container, className)}>
      <div className={styles.article_head}>
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

      <div className={cx(styles.article_content, {
        [styles.show]: isOpen,
      })}
      >
        <div className={styles.article_item}>
          <span>Status:</span>
          {status}
        </div>
        <div className={styles.article_item}>
          <span>Core entities</span>
          {core}
        </div>
      </div>
    </div>
  );
};
