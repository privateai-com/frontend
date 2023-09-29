import { Typography } from 'components';

import Link from 'next/link';
import styles from './styles.module.scss';

type StatusProps =
  | 'Open sourced'
  | 'Permission given'
  | 'Permission needed'
  | 'Access request pending';

type ItemProp = {
  name: string;
  field: string;
  author: string;
  core: string[];
  status: StatusProps;
  created: string;
  modified: string;
};

export const Item: React.FC<ItemProp> = ({
  name,
  author,
  field,
  core,
  status,
  created,
  modified,
}) => {
  const getStatusStyle = () => {
    switch (status) {
      case 'Open sourced':
        return styles.open;

      case 'Permission given':
        return styles.permission_given;

      case 'Permission needed':
        return styles.permission_needed;

      case 'Access request pending':
        return styles.pending;

      default:
        return styles.status;
    }
  };

  return (
    <div className={styles.item}>
      <div className={styles.item_content_block}>
        <div className={styles.item_first_block}>
          <Typography
            className={styles.item_title}
            type="h4"
          >
            {name}
          </Typography>
          <div className={styles.item_description_block}>
            <div className={styles.item_field_author_block}>
              <div className={styles.item_row_block}>
                <span className={styles.title}>Field: </span>
                {field}
              </div>
              <div className={styles.item_row_block}>
                <span className={styles.title}>Author: </span>
                <Link href="/#">{author}</Link>
              </div>
            </div>
            <div className={styles.item_col_block}>
              <span className={styles.title}>Core entities</span>
              <span>{core.join(', ')}</span>
            </div>
          </div>
        </div>
        <div className={styles.item_second_block}>
          <span className={getStatusStyle()}>{status}</span>
          <div className={styles.item_date_block}>
            <div className={styles.item_created_block}>
              <span className={styles.title}>Created</span>
              {created}
            </div>
            <div className={styles.item_col_block}>
              <span className={styles.title}>Modified</span>
              {modified}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
