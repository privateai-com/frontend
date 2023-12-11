import { FC, ReactNode } from 'react';

import styles from './styles.module.scss';
import { ExpandableMobileItem } from '../ExpandableMobileItem';

interface ItemProps {
  className?: string;
  href?: string;
  name: string;
  items: {
    title: string | null;
    state: string | ReactNode;
    cell?: (value: string | ReactNode) => string | ReactNode;
  }[],
  other?: string | ReactNode;
  id: number;
}

export const MobileTableItem: FC<ItemProps> = ({
  className,
  name,
  id,
  other,
  items,
  href,
}) => (
  <ExpandableMobileItem
    className={className}
    name={name}
    id={id}
    href={href}
  >
    {items.map((item) => (
      <div className={styles.item_item}>
        {item.title && (
          <span>
            {item.title}
            :
          </span>
        )}
        {item.cell ? item.cell(item.state) : item.state}
      </div>

    ))}
    {other}
  </ExpandableMobileItem>
);
