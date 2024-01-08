import { filesize } from 'filesize'
import styles from '../styles.module.scss'
import prevStyles from '../Item/styles.module.scss'
import cx from 'classnames';
import { UploadFileStatus } from 'types';
import Link from 'next/link';
import { ScreenWidth, routes } from 'appConstants';
import { useScreenWidth } from 'hooks';
import { MultiDrop } from 'components/MultiDrop';

export const NewItem = ({props}) =>{
    const {title , fileSize, uploadProgress, updatedAt, status, timeToUploaded} = props


    const isMobile = useScreenWidth(ScreenWidth.mobile);

    return  <div className={cx(styles.uploadTableRow)}>
    <div className={styles.uploadTable_col}>
      <div className={styles.uploadTable_col_row}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21" fill="none">
          <path d="M15.714 5.08998C16.3476 5.67521 16.6644 5.96783 16.8322 6.35121C17 6.7346 17 7.16587 17 8.02842L17 16C17 17.8856 17 18.8284 16.4142 19.4142C15.8284 20 14.8856 20 13 20H5C3.11438 20 2.17157 20 1.58579 19.4142C1 18.8284 1 17.8856 1 16L1 5C1 3.11438 1 2.17157 1.58579 1.58579C2.17157 1 3.11438 1 5 1H9.72111C10.4941 1 10.8806 1 11.232 1.13742C11.5833 1.27483 11.8672 1.53708 12.4351 2.06157L15.714 5.08998Z" stroke="#BDC5DC" stroke-width="2" stroke-linejoin="round"/>
        </svg>
        <span className={styles.title}>
          {title}
        </span>
        
      </div>
      <div className={styles.uploadTable_progress_bar}>
        <div className={styles.uploadTable_progress_line} style={{width: `${uploadProgress}%`}}>
        </div>
      </div>
      <div className={styles.uploadTable_progress_description}>

        {uploadProgress !== -1 && fileSize && `${filesize(fileSize * uploadProgress / 100  || 0, { standard: 'jedec' })} of ${filesize(fileSize || 0, { standard: 'jedec' })}  (${uploadProgress}%) • ${timeToUploaded ? timeToUploaded + 'min' : '0 min'}`}
        {/* {uploadProgress === -1 && 'error'} */}
      </div>
      
      {/* {uploadProgress} */}
    </div>
    <div className={styles.uploadTable_col}>
      <div className={styles.sizeItem}>
        {filesize(fileSize || 0, { standard: 'jedec' })}
      </div>
    </div>
    <div className={styles.uploadTable_col}>

      {new Date(updatedAt).toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      })}
      {/* {new Date(updatedAt).getDay() }{ new Date(updatedAt).getMonth() }{ new Date(updatedAt).getFullYear()} */}
      {/* {updatedAt && new Date(updatedAt).toISOString().slice(0, 10).split('-')[2]}.{new Date(updatedAt).toISOString().slice(0, 10).split('-')[1]}.{new Date(updatedAt).toISOString().slice(0, 10).split('-')[0]} */}
    </div>
    <div className={styles.uploadTable_col}>
      {/* {status} */}
      

      {uploadProgress !== -1 ? <>
      {status === UploadFileStatus.COMPLETE 
        || status === UploadFileStatus.PUBLISHED 
          ? (
            <div className={prevStyles.item_indication_block}>
              {/* <Image
                className={prevStyles.item_complete}
                src={circleCheckIcon}
                alt="icon"
              /> */}
              <div className={cx(styles.status_wrap, styles.status_wrap_complete )}>
                <button
                    className={cx(prevStyles.item_circle, prevStyles.item_circle_complete)}
                    // onClick={onCancel}
                >
                </button>
                <span>
                    {status === "complete" && "Uploaded"}
                </span>
                
              </div>
            
              <Link
                className={styles.sizeItem}
                href={`${routes.storage.root}`}
              >
                {isMobile ? 'My storage' : 'See in my storage'}
              </Link>
              <MultiDrop
                props={{
                  btnContent: '•••',
                  btnList:[
                    <div>Delete</div>
                  ]
                }}
              />
            </div>
          ) : (
            <div className={prevStyles.item_indication_block}>
                <div className={cx(styles.status_wrap)}>
                    <button 
                        className={prevStyles.item_circle} 
                    //   onClick={onCancel} 
                    />
                    <span>
                        {status}
                    </span>
                    
                </div>
                
              <button
                className={prevStyles.item_disabled_btn}
                disabled
              >
                {
                  status === UploadFileStatus.PROCESSING ||
                  status === UploadFileStatus.UPLOADED ||
                  status === UploadFileStatus.ERROR 
                    ? 'See in my storage' :
                    `~ 
                    ${' '}
                    ${Math.max(timeToUploaded, 1)}
                    ${' '}
                    min`
                }
              </button>

             
            </div>
          )}
        </> : <div style={{textAlign:'right', paddingRight: 20}}><span>Processing error</span></div>}
       
    </div>
  </div>
}