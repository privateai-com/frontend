import React, { memo } from 'react';
import cx from 'classnames';

import { LikeFilledIcon, LikeIcon } from 'assets';

import styles from './styles.module.scss';

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
  <button
    className={cx(
      className,
      styles.community_button,
      {
        [styles.liked]: isLiked,
        [styles.disliked]: isDisliked,
        [styles.dislike]: isDislikeButton,
        [styles.likedPopular]: !isDislikeButton && isPopular,
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
));
