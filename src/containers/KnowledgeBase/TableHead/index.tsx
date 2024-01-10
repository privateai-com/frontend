import React from 'react';
import styles from './styles.module.scss';

type ItemProps = {
  props:Array<string>
};

export const TableHead: React.FC<ItemProps> = ({ props }) => (
  <div className={styles.item}>
    {props.map((
      item: string,
    ) => (
      <div key={`head-item-${item}`} className={styles.item_inner_col}>
        {item}
      </div>
    ))}
        
  </div>
);
