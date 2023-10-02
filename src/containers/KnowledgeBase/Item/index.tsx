import { Typography } from 'components';

import Link from 'next/link';
import { useScreenWidth } from 'hooks';
import { ScreenWidth } from 'appConstants';
import { ExpandableMobileItem } from 'components/AdaptivePaginationTable/ExpandableMobileItem';
import { SelectedText } from 'components/SelectedText';
import styles from './styles.module.scss';

type StatusProps =
  | 'Open sourced'
  | 'Permission given'
  | 'Permission needed'
  | 'Access request pending';

type ItemProps = {
  name: string;
  field: string;
  author: string;
  core: string[];
  status: StatusProps;
  created: string;
  modified: string;
  search: string;
};

export const Item: React.FC<ItemProps> = ({
  name,
  author,
  field,
  core,
  status,
  created,
  modified,
  search,
}) => {
  const isMobile = useScreenWidth(ScreenWidth.mobile);

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
        return styles.item_status;
    }
  };

  return (
    <div>
      {isMobile ? (
        <ExpandableMobileItem name={name}>
          <div>
            <div className={styles.item_row_block}>
              <span className={getStatusStyle()}>{status}</span>
            </div>
            <div className={styles.item_row_block}>
              <span className={styles.title}>Field: </span>
              {field}
            </div>
            <div className={styles.item_row_block}>
              <span className={styles.title}>Author: </span>
              <Link href="/#">{author}</Link>
            </div>
            <div className={styles.item_col_block}>
              <span className={styles.title}>Core entities: </span>
              <span className={styles.item_core}>{core.join(', ')}</span>
            </div>
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
        </ExpandableMobileItem>
      ) : (
        <div className={styles.item}>
          <div className={styles.item_content_block}>
            <div className={styles.item_first_block}>
              <Typography
                className={styles.item_title}
                type="h4"
              >
                <SelectedText
                  text={name}
                  searchWord={search}
                  className={styles.selected}
                />
              </Typography>
              <div className={styles.item_description_block}>
                <div className={styles.item_field_author_block}>
                  <div className={styles.item_row_block}>
                    <span className={styles.title}>Field: </span>
                    <SelectedText
                      text={field}
                      searchWord={search}
                      className={styles.selected}
                    />
                  </div>
                  <div className={styles.item_row_block}>
                    <span className={styles.title}>Author: </span>
                    <Link href="/#">{author}</Link>
                  </div>
                </div>
                <div className={styles.item_col_block}>
                  <span className={styles.title}>Core entities</span>
                  <span className={styles.item_core}>{core.join(', ')}</span>
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
      )}
    </div>
  );
};
