import { FC, ReactNode, useState } from 'react';
import Image from 'next/image';
import cx from 'classnames';

import { arrowGreenIcon, minusCircleIcon, plusCircleIcon } from 'assets';

import Link from 'next/link';
import { SelectedText } from 'components/SelectedText';
import styles from './styles.module.scss';

type ItemProps = {
  className?: string;
  name: string;
  children: ReactNode;
  searchWord?: string;
};

const ExpandableMobileItem: FC<ItemProps> = ({
  className,
  name,
  children,
  searchWord,
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
          {searchWord ? (
            <SelectedText
              text={name}
              searchWord={searchWord}
              className={styles.selected}
            />
          ) : (
            name
          )}
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
        {children}
      </div>
    </div>
  );
};

export { ExpandableMobileItem };
