import { ReactNode } from 'react';
import { Tooltip } from 'react-tooltip';
import Link from 'next/link';

import { SelectedText, Typography } from 'components';
import { formatDate } from 'utils';
import { routes } from 'appConstants';
import { StatusAccessArticle } from 'types';

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
  textStatus: string;
  search: string;
  topCoreEntities?: string;
  isDisabled?: boolean;
  showAccessConfirm: () => void;
};

export const ItemDesktop: React.FC<ItemMobileProps> = ({
  id,
  createdAt,
  updatedAt,
  field,
  title,
  classNameStatus,
  requester,
  status,
  textStatus,
  search,
  topCoreEntities,
  isDisabled,
  showAccessConfirm,
}) => (
  <div className={styles.item}>
    <div className={styles.item_content_block}>
      <div className={styles.item_first_block}>
        <Link href={`${routes.storage.root}/${id}`}>
          <Typography
            className={styles.item_title}
            type="h4"
          >
            <SelectedText
              key={`title_${id}`}
              text={title}
              searchWord={search}
              className={styles.selected}
              classNameContainer={styles.selected_container}
              tooltipId={`title_${id}`}
            />
            {(title && title.length > 60) && (
            <Tooltip
              id={`title_${id}`}
              place="top"
              className={styles.tooltip}
              noArrow
              offset={-10}
            >
              {title}
            </Tooltip>
            )}
          </Typography>
        </Link>
        <div className={styles.item_description_block}>
          <div className={styles.item_field_author_block}>
            <div className={styles.item_row_block}>
              <span className={styles.title}>Field: </span>
              <SelectedText
                key={`field_${id}`}
                text={field}
                searchWord={search}
                className={styles.selected}
                classNameContainer={styles.selected_container}
                tooltipId={`field_${id}`}
              />
              {(field && field.length > 18) && (
              <Tooltip
                id={`field_${id}`}
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
          </div>
          <div className={styles.item_col_block}>
            <span className={styles.title}>Core entities</span>
            <span className={styles.item_core}>
              {topCoreEntities ? (
                <SelectedText
                  key={`topCoreEntities_${id}`}
                  text={topCoreEntities}
                  searchWord={search}
                  className={styles.selected}
                  tooltipId={`topCoreEntities_${id}`}
                />
              ) : ('-')}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.item_second_block}>
        <button 
          onClick={(status === StatusAccessArticle.PermissionNeeded && !isDisabled)
            ? showAccessConfirm
            : () => {}} 
          className={styles.buttonShowAccess}
        >
          <span className={classNameStatus}>{textStatus}</span>
        </button>
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
    </div>
  </div>
);
