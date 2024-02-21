import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import { CommunityButton } from 'components/CommunityButton';
import { isArticlePopular } from 'utils';
// import { LikeFilledIcon, LikeIcon } from 'assets';
import LikeIcon2 from 'assets/img/icons/LikeIcon2';
import styles from './styles.module.scss';
import { Mark2 } from 'assets/img/icons/mark2';

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

// interface CommunityButtonProps {
//   className?: string;
//   isLiked?: boolean;
//   isDisliked?: boolean;
//   isDisabled?: boolean;
//   onClick: () => void;
//   count?: number;
//   isDislikeButton?: boolean;
//   isPopular?: boolean;
// }

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
    // if(!liked){
    //     return
    // }

    setClicked(!liked);
  };

  const dropdownRef = useRef(null)
  

  useEffect(()=>{
   document.addEventListener("click", ()=>{
    // setTooltipFlag(false)
    if (dropdownRef && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setTooltipFlag(false);
    }
   }) 
  })


  return (
    <div className={styles.btnWrapOuter}>
      <div className={styles.btnWrap}>
        <CommunityButton
          className={
            cx(
              [styles.likeBtn, styles.btn, liked && 
              styles.active, isDisabled && styles.disabled]
            )
          }
          isLiked={liked}
          onClick={handleOnClick}
          count={likesCount}
          isDisabled={isDisabled}
          _custom
          _defaultIcon={(
            <div className={cx([styles.iconWrap, liked && styles.active, clicked && styles.play])}>
              <LikeIcon2 
                handColor={liked ? '#4659FE' : 'transparent'} 
                borderColor={liked ? '#4659FE' : '#747474'}
              />
            </div>
  )}
          // _activeIcon={<>
          //     <LikeIcon2 handColor='green' strokeColor='#747474' />
          //     {/* <LikeFilledIcon className={styles.filledLike} /> */}
          // </>}
          // isDisabled={
          //   ![StatusAccessArticle.OpenSource, StatusAccessArticle.AccessGranted]
          //     .includes(status as StatusAccessArticle) ||
          //   isDisabled
          // }
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
            <LikeIcon2 
              handColor={disliked ? '#747474' : 'transparent'} 
              borderColor="#747474"
              strokeColor={!disliked ? '#747474' : '#F3F5FF'}
            />
  )}
          isDislikeButton
          // isDisabled={
          //   ![StatusAccessArticle.OpenSource, StatusAccessArticle.AccessGranted]
          //     .includes(status as StatusAccessArticle) ||
          //   isDisabled
          // }
          isPopular={isArticlePopular(dislikesCount, likesCount)}
        />
        
      </div>
      {
        isArticlePopular(dislikesCount, likesCount) && 
        <div className="" ref={dropdownRef}>
          <div className={styles.tooltip_btn} 
            onClick={()=>{
              setTooltipFlag(prev => !prev)
            }} 
            // onMouseOver={()=>{
            //   setTooltipFlag(true)
            // }} 
            // onMouseLeave={()=>{
            //   setTooltipFlag(false)
            // }}
            // onMouseOut={()=>{
            //   setTooltipFlag(false)
            // }}
          >
           <Mark2 />
          </div>
          {isTooltipOpen &&
          <div className={styles.tooltip} onMouseOver={()=>{
            setTooltipFlag(true)
          }} onMouseOut={()=>{
            setTooltipFlag(false)
          }}>
          This article was rated very low by the community. Please proceed with caution.
          </div>}
        </div>
      }
    </div>
  );
};
