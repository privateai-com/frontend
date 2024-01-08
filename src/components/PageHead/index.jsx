import styles from '../../containers/Profile/styles.module.scss'
import commonStyles from '../../containers/Profile/common.module.scss'
import { Typography } from 'components/Typography'

export const PageHead = ({props,children}) =>{
    const {title = '', btnWrap, headStyles, btnWrapStyles} = props

    return <>
        <div className={styles.profile__head} style={{...headStyles}}>
            <div className={styles.profile__head_title}>
                <Typography type="h1" className={commonStyles.h1_style}>{title}</Typography>
                <div className={styles.btnWrap} style={{...btnWrapStyles}}>
                    {btnWrap}
                </div>
            </div>
            {children}
        </div>
    </>
}