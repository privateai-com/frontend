import cx from 'classnames';
import styles from '../styles.module.scss'


export const InfoTableRow = ({props}) =>{


    return <>
         <div className={styles.storageFile_table_item} style={...props.containerStyles}>
            <div className={cx(styles.storageFile_table_item_col,styles.storageFile_table_item_titleCol)}>
                {props.title}
            </div>
            <div className={cx(styles.storageFile_table_item_col,styles.storageFile_table_item_infoCol)}>
                {props.info}
            </div>
        </div>
    
    </>

}