import { filesize } from 'filesize';
import cx from 'classnames';
import { UploadFileStatus } from 'types';
import Link from 'next/link';
import { ScreenWidth, routes } from 'appConstants';
import { useScreenWidth } from 'hooks';
import { MultiDrop } from 'components/MultiDrop';
import prevStyles from '../Item/styles.module.scss';
import styles from '../styles.module.scss';
import { DeleteBtn } from '../DeleteBtn';

export const NewItem = ({ props }) => {
  const {
    id, title, fileSize, uploadProgress, updatedAt, status, timeToUploaded, onCancel, 
  } = props;

  const isMobile = useScreenWidth(ScreenWidth.mobile);
  // console.log(timeToUploaded)

  return (
    <div className={cx(styles.uploadTableRow)}>
      <div className={styles.uploadTable_col}>
        <div className={styles.uploadTable_col_row}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21" fill="none">
            <path d="M15.714 5.08998C16.3476 5.67521 16.6644 5.96783 16.8322 6.35121C17 6.7346 17 7.16587 17 8.02842L17 16C17 17.8856 17 18.8284 16.4142 19.4142C15.8284 20 14.8856 20 13 20H5C3.11438 20 2.17157 20 1.58579 19.4142C1 18.8284 1 17.8856 1 16L1 5C1 3.11438 1 2.17157 1.58579 1.58579C2.17157 1 3.11438 1 5 1H9.72111C10.4941 1 10.8806 1 11.232 1.13742C11.5833 1.27483 11.8672 1.53708 12.4351 2.06157L15.714 5.08998Z" stroke="#BDC5DC" strokeWidth="2" strokeLinejoin="round" />
          </svg>
          <span className={styles.title}>
            {title}
          </span>
        
        </div>
        <div className={styles.uploadTable_progress_bar}>
          <div className={styles.uploadTable_progress_line} style={{ width: `${uploadProgress}%` }} />
        </div>
        <div className={styles.uploadTable_progress_description}>
          {uploadProgress !== -1 && fileSize && 
          // eslint-disable-next-line
          `${filesize(fileSize * uploadProgress / 100 || 0, { standard: 'jedec' })} of ${filesize(fileSize || 0, { standard: 'jedec' })}  (${uploadProgress}%) • ${timeToUploaded ? `${timeToUploaded}min` : '0 min'}`}
        </div>
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
          hour12: true,
        })}
      </div>
      <div className={styles.uploadTable_col}>
        {/* eslint-disable-next-line */}
        {uploadProgress !== -1 ? 
          status === UploadFileStatus.COMPLETE 
        || status === UploadFileStatus.PUBLISHED 
        // || status === UploadFileStatus.UPLOADED
            ? (
              <div className={prevStyles.item_indication_block}>
                <div className={cx(styles.status_wrap, styles.status_wrap_complete)}>
                  <button
                    className={cx(prevStyles.item_circle, prevStyles.item_circle_complete)}
                  />
                  <span>
                    {status === 'complete' && 'Uploaded'}
                    {status === 'published' && 'Uploaded'}
                  </span>
                
                </div>
            
                <Link
                  className={styles.sizeItem}
                  href={`${routes.storage.root}`}
                >
                  {isMobile ? 'My storage' : 'See in my storage'}
                </Link>
              </div>
            ) : (
              <div className={prevStyles.item_indication_block}>
                <div className={cx(styles.status_wrap, status === 'processing' && styles.processing_status)}>
                  {/* <button 
                        className={prevStyles.item_circle} 
                    //   onClick={onCancel} 
                    /> */}
                  {status === 'processing' ? (
                    <svg 
                      className={styles.processing_status_icon}
                      style={{
                        minWidth: 20,
                        height: 20,
                        marginRight: 10,
                      }}
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="20"
                      viewBox="0 0 18 20" 
                      fill="none"
                    >
                      <path d="M5.95431 2.56572C7.93018 1.77007 10.1412 1.79192 12.1009 2.62645C14.0607 3.46099 15.6087 5.03986 16.4043 7.01572C17.2 8.99158 17.1781 11.2026 16.3436 13.1623C15.509 15.1221 13.9302 16.6701 11.9543 17.4657M11.9543 13.0157V18.0157H16.9543M2.58431 5.17554V5.18554M1.01431 9.01562V9.02563M1.58431 13.1157V13.1257M4.11431 16.3857V16.3957M7.95431 17.9556V17.9656" stroke="#E0A32C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <button 
                      className={prevStyles.item_circle}
                    />
                  )}
                    
                  <span>
                    {status === 'processing' ? 'Uploading...' : status}
                  </span>
                    
                </div>

                <MultiDrop
                  props={{
                    btnContent: '•••',
                    btnList: [
                      // eslint-disable-next-line
                      <div onClick={onCancel}>Cancel</div>,
                    ],
                  }}
                />

                {/* <button
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
              </button> */}
             
              </div>
            ) 
         
          : (
            <div className={prevStyles.item_indication_block}>
              <div className={cx(styles.status_wrap, styles.error_status)}>
                <svg 
                  style={{ minWidth: 22, marginRight: 10 }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clipPath="url(#clip0_284_2413)">
                    <path d="M12 13V9.5V8" stroke="#D87676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 16V16.7V17" stroke="#D87676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12Z" stroke="#D87676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_284_2413">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span style={{ color: '#D87676' }}>Processing error</span>
              </div>

              <MultiDrop
                props={{
                  btnContent: '•••',
                  btnList: [
                    // <div>Retry</div>,
                    <DeleteBtn id={Number(id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9 13H15" stroke="#BDC2CF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 6C3 4.89543 3.89543 4 5 4H12H19C20.1046 4 21 4.89543 21 6V6V6C21 7.10457 20.1046 8 19 8H12H5C3.89543 8 3 7.10457 3 6V6V6Z" stroke="#BDC2CF" strokeWidth="2" strokeLinejoin="round" />
                        <path d="M4 8L4.73464 18.285C4.86047 20.0466 4.92339 20.9275 5.49933 21.4637C6.07528 22 6.95835 22 8.72448 22H10L14 22L15.2755 22C17.0417 22 17.9247 22 18.5007 21.4637C19.0766 20.9275 19.1395 20.0466 19.2654 18.285L20 8" stroke="#BDC2CF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>Delete</span>
                  </DeleteBtn>,
                    // <div>Delete</div>,
                  ],
                }}
              />
            </div>
          )}
       
      </div>
    </div>
  );
};
