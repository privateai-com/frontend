import { ReactNode } from 'react';
import { Tooltip } from 'react-tooltip';

import { SelectedText } from 'components';
import { formatDate } from 'utils';
import { ExpandableMobileItem } from 'components/AdaptivePaginationTable/ExpandableMobileItem';

import styles from '../styles.module.scss';

type ItemMobileProps = {
  id: number;
  createdAt: string;
  updatedAt: string;
  field: string;
  title: string;
  classNameStatus: string;
  requester: ReactNode;
  status: string;
  search: string;
  topCoreEntities?: string;
};

export const ItemMobile: React.FC<ItemMobileProps> = ({
  id,
  createdAt,
  updatedAt,
  field,
  title,
  classNameStatus,
  requester,
  status,
  search,
  topCoreEntities,
}) => (
  <ExpandableMobileItem
    name={title}
    searchWord={search}
    id={id}
  >
    <div>
      <div className={styles.item_row_block}>
        <span className={classNameStatus}>{status}</span>
      </div>
      <div className={styles.item_row_block}>
        <span className={styles.title}>Field: </span>
        <SelectedText
          key={`field_mobile_${id}`}
          text={field}
          searchWord={search}
          className={styles.selected}
          classNameContainer={styles.selected_container}
          tooltipId={`field_mobile_${id}`}
        />
        {(field && field.length > 18) && (
        <Tooltip
          id={`field_mobile_${id}`}
          place="top"
          className={styles.tooltip}
          noArrow
          offset={-10}
        >
          {field}
        </Tooltip>
        )}
      </div>
      <div className={styles.item_row_block}>
        <span className={styles.title}>Owner: </span>
        {requester}
      </div>
      <div className={styles.item_col_block}>
        <span className={styles.title}>Core entities: </span>
        <span className={styles.item_core}>{topCoreEntities ?? '-'}</span>
      </div>
      <div className={styles.item_date_block}>
        <div className={styles.item_created_block}>
          <span className={styles.title}>Created</span>
          {formatDate(new Date(createdAt))}
        </div>
        <div className={styles.item_col_block}>
          <span className={styles.title}>Modified</span>
          {formatDate(new Date(updatedAt))}
        </div>
      </div>
    </div>
  </ExpandableMobileItem>
);
