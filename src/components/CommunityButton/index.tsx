import React, { memo } from 'react';
import cx from 'classnames';

import { LikeFilledIcon, LikeIcon } from 'assets';

import styles from './styles.module.scss';
// import { ExclamationMark } from 'assets/img/icons/exclamation-mark';

interface CommunityButtonProps {
  className?: string;
  isLiked?: boolean;
  isDisliked?: boolean;
  isDisabled?: boolean;
  onClick: () => void;
  count?: number;
  isDislikeButton?: boolean;
  isPopular?: boolean;
  _custom ? :boolean;
  _defaultIcon?: React.ReactNode;
}

export const CommunityButton = memo<CommunityButtonProps>(({
  className,
  isLiked,
  isDisliked,
  isDisabled = false,
  onClick,
  count,
  isDislikeButton,
  isPopular,
  _custom = false,
  _defaultIcon = <>unactive</>,
}) => (
  <div className={styles.btnWrap}>
    <button
      className={cx(
        className,
        styles.community_button,
        {
          [styles.liked]: isLiked,
          [styles.disliked]: isDisliked,
          [styles.dislike]: isDislikeButton,
          // [styles.likedPopular]: !isDislikeButton && isPopular,
          [styles.dislikedPopular]: isDislikeButton && isPopular,
        },
      )}
      onClick={onClick}
      disabled={isDisabled}
    >
      {(isLiked || isDisliked) && !_custom ? <LikeFilledIcon /> : !_custom && <LikeIcon />}
      { _custom && _defaultIcon }
      <span className={styles.countSpan}> 
        {count || 0}
        
      </span>
      
    </button>

    {/* { isPopular  ? (<div className={styles.tooltipWrap}>
    {!isDislikeButton  ? 
      <span className={styles.mark}>
        <ExclamationMark
        props={{
          color: '#E0A32C',
          size: 16
        }} />
      </span>
      : <span className={styles.mark}>

        <ExclamationMark
        props={{
          color: '#E0A32C',
          size: 16
        }} />
        
      </span>}
      <div className={styles.tooltip}>
          {
            isPopular ? 
            (
              !isDislikeButton ? 
                <>likedPopular</>
                :
                <>dislikedPopular</>
            )
            :
            <></>
          }
        </div>
    </div>) : <></>} */}
  </div>
));
