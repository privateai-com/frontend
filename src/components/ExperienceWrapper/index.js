import { shallowEqual, useSelector } from "react-redux"
import star from '../../assets/img/icons/star.svg'
import docs from '../../assets/img/icons/docs.svg'
import styles from './style.module.scss'
import { GlobalColors } from "assets/globalStyles"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { ArticlesActionTypes } from "store/articles/actionTypes"
import { articlesSelectors } from "store/articles/selectors"
import { useLocalStorage, usePagination } from "hooks"
import { articlesGetMy } from "store/articles/actionCreators"
import { ScreenWidth, itemsOnPageQuantity } from 'appConstants';

export const ExperienceWrapper = () => {

    const [raiting, setRaiting] = useState(0)
    const [docCount , setDocCount] = useState(0)
    const [offset, setOffset] = useState(0);
    const [customQuantity, setCustomQuantity] = useState(10);

    const total = useSelector(articlesSelectors.getProp('total'));

    const myArticles = useSelector(state => state.articles.myArticles);
    const isFetching = useSelector(state => state.articles.isFetching);
    const statusGetMyArticles = useSelector(
        articlesSelectors.getStatus(ArticlesActionTypes.GetMyArticles),
      );

    const increaseOffset = useCallback(() => {
        setOffset((value) => {
          const newValue = value + 1;
          return newValue;
        });
      }, []);


    const { rootRef, endElementForScroll,} = usePagination({ 
        offset,
        total, 
        status: statusGetMyArticles, 
        increaseOffset,
    });

    const ProfileInfo = useSelector(state => state.profile.accountInfo)


    const articles = useSelector(articlesSelectors.getProp('uploadArticles'));


    const dispatch = useDispatch()


    const queryParams = useMemo(() => ({
        limit: customQuantity,
        offset: offset * customQuantity,
        sortingDirection: 'DESC',
        sortingField: 'id',
        isHidden: false,
    }), [offset]);


    useEffect(() => {
        dispatch(articlesGetMy(queryParams));
    }, [dispatch, queryParams,isFetching]);

    useEffect(()=>{
        console.log("isFetching: ", isFetching)
        console.log("articles: ", articles)
        console.log("myArticles: ", myArticles)
    },[isFetching,articles])


    useEffect(()=>{
        _setRaiting()
        _setDocCount()

    
       

    },[myArticles,articles,isFetching])



    const _setRaiting = () =>{
        let raiting = 0

        // if(ProfileInfo.avatarUrl){
        //     raiting += 100
        // }
        if(articles && articles.length > 0){
            // myArticles.forEach(article => {
            //     const {isPublished} = article
            //     isPublished ? raiting += 100 : ''
            // });

            articles.forEach(article => {
                const {isPublished} = article
                isPublished ? raiting += 100 : ''
            });
        }else{
            // articles.forEach(article => {
            //     const {isPublished} = article
            //     isPublished ? raiting += 100 : ''
            // });
            myArticles.forEach(article => {
                const {isPublished} = article
                isPublished ? raiting += 100 : ''
            });
        }

        setRaiting(prev => raiting)
    }

    const _setDocCount = () =>{
        let count = 0

        if(articles && articles.length > 0){
             // from HZ, i think from DB
            articles.forEach(myArticle => {
                myArticle.isPublished ? count += 1 : count = count
            })
        }else{
            // from redux
            myArticles.forEach(myArticle => {
                myArticle.isPublished ? count += 1 : count = count
            })
        }

        setDocCount(prev=> count)
        // return count === 0 ?  '-' : count
    }

 
    

    return <>
        <div className={styles.experienceWrapper} ref={rootRef}>
            {/* endElementForScroll - element that causes the array to be updated. */}
            {endElementForScroll}
             {/* MY ARTICLE RATING */}
            <div className={styles.experienceRow}>
                <span className={styles.experineceSpan} style={{color: GlobalColors.mainColor}}>
                    {raiting}
                </span>
                <div className={styles.experienceRowImgWrap}>
                    <img className={`${styles.headerIcon} ${styles.iconStar}`} src={star.src} alt="raiting star" />
                </div>
                <div className={styles.toolTipMessage} style={{fontSize: GlobalColors.toolTipFontSize}}>
                    Get rewarded for uploading and processing your files. For each provided document you will receive 100 bonus points.
                </div>
            </div>
            {/* MY ARTICLE DOCS COUNT */}
            <div className={styles.experienceRow}>
                <span className={styles.experineceSpan} style={{color: GlobalColors.mainColor}}>
                    {docCount === 0 ? '-' : docCount}
                </span>
                <div className={styles.experienceRowImgWrap}>
                    <img className={`${styles.headerIcon} ${styles.iconDoc}`} src={docs.src} alt="raiting doc" />
                </div>
                <div className={styles.toolTipMessage} style={{fontSize: GlobalColors.toolTipFontSize}}>
                    Number of documents that have been published
                </div>
            </div>
        </div>
    </>
}

