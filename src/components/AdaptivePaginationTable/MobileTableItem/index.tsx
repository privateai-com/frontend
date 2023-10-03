import { FC, ReactNode } from 'react';

import styles from './styles.module.scss';
import { ExpandableMobileItem } from '../ExpandableMobileItem';

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
}) => (
  <ExpandableMobileItem
    className={className}
    name={name}
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
  </ExpandableMobileItem>
);
