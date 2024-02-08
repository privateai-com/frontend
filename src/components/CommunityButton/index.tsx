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
    {(isLiked || isDisliked) ? <LikeFilledIcon /> : <LikeIcon />}
    {count || 0}
  </button>
));
