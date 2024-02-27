import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import { CommunityButton } from 'components/CommunityButton';
import { isArticlePopular } from 'utils';
import { LikeIcon } from 'assets';
import { Mark2 } from 'assets/img/icons/mark2';
import styles from './styles.module.scss';

interface CommunityButtonPropsWrap {
  props: {
    liked? : boolean,
    likesCount? : number,
    dislikesCount? : number,
    isDisabled?: boolean,
    disliked? : boolean,
    onLike: () => void,
    onDislike: () => void
  } 
}

export const LikeBtnWrapper: React.FC<CommunityButtonPropsWrap> = (
  { props }: CommunityButtonPropsWrap,
) => {
  const {
    liked, onLike, likesCount, dislikesCount, disliked, onDislike, isDisabled = false,
  } = props;

  const [clicked, setClicked] = useState(false);

  const [isTooltipOpen, setTooltipFlag] = useState(false);

  const handleOnClick = () => {
    onLike();

    setClicked(!liked);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('click', (event) => {
    // setTooltipFlag(false)
      if (event.target instanceof Node
        && dropdownRef 
        && dropdownRef.current 
        && !dropdownRef.current.contains(event.target)
      ) {
        setTooltipFlag(false);
      }
    }); 
  });

  return (
    <div className={styles.btnWrapOuter}>
      <div className={styles.btnWrap}>
        <CommunityButton
          className={
            cx(
              [styles.likeBtn, styles.btn, liked && 
              styles.active, isDisabled && styles.disabled],
            )
          }
          isLiked={liked}
          onClick={handleOnClick}
          count={likesCount}
          isDisabled={isDisabled}
          _custom
          _defaultIcon={(
            <div className={cx([styles.iconWrap, liked && styles.active, clicked && styles.play])}>
              <LikeIcon 
                handColor={liked ? '#4659FE' : 'transparent'} 
                borderColor={liked ? '#4659FE' : '#747474'}
              />
            </div>
          )}  
          isPopular={isArticlePopular(likesCount, dislikesCount)}
        />
        <span className={cx([styles.divider, isDisabled && styles.disabled])} />
        <CommunityButton
          className={cx([styles.dislikeBtn, styles.btn, disliked && styles.active])}
          isDisliked={disliked}
          onClick={onDislike}
          count={dislikesCount}
          isDisabled={isDisabled}
          _custom
          _defaultIcon={(
            <LikeIcon 
              handColor={disliked ? '#747474' : 'transparent'} 
              borderColor="#747474"
              strokeColor={!disliked ? '#747474' : '#F3F5FF'}
            />
  )}
          isDislikeButton
          isPopular={isArticlePopular(dislikesCount, likesCount)}
        />
        
      </div>
      {
        isArticlePopular(dislikesCount, likesCount) && (
        <div className="" ref={dropdownRef}>
          <button
            className={styles.tooltip_btn} 
            onClick={() => {
              setTooltipFlag((prev) => !prev);
            }} 
          >
            <Mark2 />
          </button>
          {isTooltipOpen && (
            <button
              className={styles.tooltip}
              onMouseOver={() => setTooltipFlag(true)}
              onFocus={() => setTooltipFlag(true)}
              onMouseOut={() => setTooltipFlag(false)}
              onBlur={() => setTooltipFlag(false)}
            >
              This article was rated very low by the community. Please proceed with caution.
            </button>
          )}
        </div>
        )
}
    </div>
  );
};
