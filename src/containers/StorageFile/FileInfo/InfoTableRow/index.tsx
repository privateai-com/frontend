import cx from 'classnames';
import React from 'react';
import styles from '../styles.module.scss';

interface InfoTableRowProps {
  props:InfoTableRowObejctProps;
  
}

interface InfoTableRowObejctProps {
  title: React.ReactNode;
  info: React.ReactNode;
  containerStyles?: React.CSSProperties;
}

export const InfoTableRow: React.FC<InfoTableRowProps> = ({ props }) => (
  <div className={styles.storageFile_table_item} style={props.containerStyles}>
    <div className={cx(styles.storageFile_table_item_col, styles.storageFile_table_item_titleCol)}>
      {props.title}
    </div>
    <div className={cx(styles.storageFile_table_item_col, styles.storageFile_table_item_infoCol)}>
      {props.info}
    </div>
  </div>
);
