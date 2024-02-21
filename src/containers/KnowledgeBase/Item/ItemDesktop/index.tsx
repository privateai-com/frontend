import { ReactNode } from 'react';
import { Tooltip } from 'react-tooltip';
import Link from 'next/link';

import { SelectedText, Typography } from 'components';
import { formatDate } from 'utils';
import { routes } from 'appConstants';
import { StatusAccessArticle } from 'types';

import { LikeBtnWrapper } from 'components/LikeBtnWrapper';
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
  likesCount?: number;
  dislikesCount?: number;
  liked?: boolean;
  isOwner?: boolean;
  disliked?: boolean;
  onLike: () => void;
  onDislike: () => void;
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
  likesCount,
  dislikesCount,
  liked,
  disliked,
  onLike,
  onDislike,
  isOwner,
}) => (
  <div className={styles.item}>
    <div className={styles.item_inner_col}>
      <Link href={`${routes.storage.root}/${id}`}>

        <Typography
          className={styles.item_title}
          type="h4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21" fill="none">
            <path d="M15.714 5.08998C16.3476 5.67521 16.6644 5.96783 16.8322 6.35121C17 6.7346 17 7.16587 17 8.02842L17 16C17 17.8856 17 18.8284 16.4142 19.4142C15.8284 20 14.8856 20 13 20H5C3.11438 20 2.17157 20 1.58579 19.4142C1 18.8284 1 17.8856 1 16L1 5C1 3.11438 1 2.17157 1.58579 1.58579C2.17157 1 3.11438 1 5 1H9.72111C10.4941 1 10.8806 1 11.232 1.13742C11.5833 1.27483 11.8672 1.53708 12.4351 2.06157L15.714 5.08998Z" stroke="#BDC5DC" strokeWidth="2" strokeLinejoin="round" />
          </svg>
          <SelectedText
            key={`title_${id}`}
            text={title}
            searchWord={search}
            className={styles.selected}
            classNameContainer={styles.selected_container}
            tooltipId={`title_${id}`}
          />
          
        </Typography>
      </Link>
      <div className={styles.requester_row}>
        {requester} 
        {/* Topic */}
        {/* {field && field !== 'Empty' &&  */}
        {true && (
          <div className={styles.field}>
            <span className={styles.title}>Topic: </span>
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
        )}

        <div className={styles.community_wrapper}>
          <LikeBtnWrapper props={{
            liked, onLike, likesCount, dislikesCount, disliked, onDislike, 
            // isDisabled: isOwner,
          }}
          />
        </div>
        {/* <div className={styles.community_wrapper}>
          <CommunityButton
            isLiked={liked}
            onClick={onLike}
            count={likesCount}
            // isDisabled={
            //   ![StatusAccessArticle.OpenSource, StatusAccessArticle.AccessGranted]
            //     .includes(status as StatusAccessArticle) ||
            //   isDisabled
            // }
            isPopular={isArticlePopular(likesCount, dislikesCount)}
          />
          <CommunityButton
            isDisliked={disliked}
            onClick={onDislike}
            count={dislikesCount}
            isDislikeButton
            // isDisabled={
            //   ![StatusAccessArticle.OpenSource, StatusAccessArticle.AccessGranted]
            //     .includes(status as StatusAccessArticle) ||
            //   isDisabled
            // }
            isPopular={isArticlePopular(dislikesCount, likesCount)}
          />
        </div> */}
      </div>
    </div>
    <div className={styles.item_inner_col}>
      {/* Core entities */}
      {topCoreEntities ?? '-'}
    </div>
    <div className={styles.item_inner_col}>
      <span>
        Created:
      </span>
        
      {formatDate(new Date(createdAt))}
    </div>
    <div className={styles.item_inner_col}>
      <span>
        Modified:
      </span>
      {formatDate(new Date(updatedAt))}
    </div>
    <div className={styles.item_inner_col}>
      {/* Status */}
      <button 
        onClick={(status === StatusAccessArticle.PermissionNeeded && !isDisabled)
          ? showAccessConfirm
          : () => {}} 
        className={styles.buttonShowAccess}
      >
        <span className={classNameStatus}>
          <span>
            {textStatus}
          </span>
        </span>
      </button>
    </div>
    <div className={styles.item_inner_col}>

      <div className={styles.community_wrapper}>
        <LikeBtnWrapper props={{
          liked, onLike, likesCount, dislikesCount, disliked, onDislike,
          //  isDisabled: isOwner,
        }}
        />
      </div>

      {/* <div className={styles.community_wrapper}>
        <CommunityButton
          isLiked={liked}
          onClick={onLike}
          count={likesCount}
            // isDisabled={
            //   ![StatusAccessArticle.OpenSource, StatusAccessArticle.AccessGranted]
            //     .includes(status as StatusAccessArticle) ||
            //   isDisabled
            // }
          isPopular={isArticlePopular(likesCount, dislikesCount)}
        />
        <CommunityButton
          isDisliked={disliked}
          onClick={onDislike}
          count={dislikesCount}
          isDislikeButton
            // isDisabled={
            //   ![StatusAccessArticle.OpenSource, StatusAccessArticle.AccessGranted]
            //     .includes(status as StatusAccessArticle) ||
            //   isDisabled
            // }
          isPopular={isArticlePopular(dislikesCount, likesCount)}
        />
      </div> */}
      <div className={styles.requester_row}>
        {requester} 
        {/* Topic */}
        {/* {field && field !== 'Empty' &&  */}
        {true && (
          <div className={styles.field}>
            <span className={styles.title}>Topic: </span>
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
        )}
      </div>
    </div>
  </div>
);
