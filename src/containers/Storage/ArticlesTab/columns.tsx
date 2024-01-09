import React, { useMemo } from 'react';
import Link from 'next/link';

import { routes } from 'appConstants';
import { Article, ItemRowProps } from 'types';
import { TitleWithArrows } from 'components/AdaptivePaginationTable/TitleWithArrows';
import { DeleteBtn } from './DeleteBtn';
import { ChangeAvailability } from './ChangeAvailability';

import styles from './styles.module.scss';
import { MultiDrop } from 'components/MultiDrop';

export const useColumns = ({
  onChangeSortingField, onToggleDirection, 
}: {
  onChangeSortingField: (field: string) => void,
  onToggleDirection: () => void,
}) =>
  useMemo(
    () => [
      {
        Header: (
          <TitleWithArrows
            title="File name"
            onClick={() => {
              onChangeSortingField('title');
              onToggleDirection();
            }}
          />
        ),
        // width: '20vw',
        accessor: 'title',
        Cell: ({
          row: {
            original: { id, title, uploadStatus },
          },
        }: ItemRowProps<Article>) =>
          (
            ['Published', 'Uploaded'].includes(uploadStatus) ? (
            <Link
              href={`${routes.storage.root}/${id}`}
              className={styles.link}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21" fill="none">
               <path d="M15.714 5.08998C16.3476 5.67521 16.6644 5.96783 16.8322 6.35121C17 6.7346 17 7.16587 17 8.02842L17 16C17 17.8856 17 18.8284 16.4142 19.4142C15.8284 20 14.8856 20 13 20H5C3.11438 20 2.17157 20 1.58579 19.4142C1 18.8284 1 17.8856 1 16L1 5C1 3.11438 1 2.17157 1.58579 1.58579C2.17157 1 3.11438 1 5 1H9.72111C10.4941 1 10.8806 1 11.232 1.13742C11.5833 1.27483 11.8672 1.53708 12.4351 2.06157L15.714 5.08998Z" stroke="#BDC5DC" strokeWidth="2" strokeLinejoin="round"/>
              </svg>
              <span>
              {title}
              </span>
            </Link>
          ) : (
            <div className={styles.empty_space}>{title}</div>
          )),
      },
      {
        Header: (
          <TitleWithArrows
            title="Status"
            onClick={() => {
              onChangeSortingField('uploadStatus');
              onToggleDirection();
            }}
          />
        ),
        width: '90px',
        minWidth: '90px',
        accessor: 'status',
        Cell: ({
          row: {
            original: { uploadStatus, uploadProgress },
          },
        }: ItemRowProps<Article>) =>
          (uploadStatus ? (
            <p
              className={
                `${uploadStatus.toLowerCase() === 'published' ? styles.green_text : styles.status} ${styles.status_p}`
              }
              style={{display:'flex', alignItems:'center', gap: 5}}
            >
              {uploadStatus.toLowerCase() === 'published' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="System" clip-path="url(#clip0_192_111)">
                <path id="Vector" d="M9 12L11 14L15 10" stroke="#3AB393" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path id="Vector_2" d="M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12Z" stroke="#3AB393" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                <clipPath id="clip0_192_111">
                <rect width="24" height="24" fill="white"/>
                </clipPath>
                </defs>
                </svg>
              }
              <span>
                {uploadStatus} 
                {' '}
                {uploadStatus.toLowerCase() === 'processing' ? `- ${uploadProgress}%` : ''}
              </span>
      
            </p>
          ) : (
            '-'
          )),
      },
      {
        Header: 'Core entities',
        accessor: 'core',
        Cell: ({
          row: {
            original: { topCoreEntities, uploadStatus },
          },
        }: ItemRowProps<Article>) => (uploadStatus.toLowerCase() === 'error' ? '-' : topCoreEntities),
      },
      {
        Header: (
          <TitleWithArrows
            title="Availability"
            onClick={() => {
              onChangeSortingField('isPublic');
              onToggleDirection();
            }}
          />
        ),
        accessor: 'availability',
        // width: '130px',
        // minWidth: '130px',
        Cell: ({
          row: {
            original: { isPublic, id, uploadStatus },
          },
        }: ItemRowProps<Article>) =>
          (
            <div className={styles.availability} key={`div-${id}-${isPublic}`}>
              {uploadStatus.toLowerCase() !== 'error' && (
                <ChangeAvailability
                  key={`ChangeAvailability-${id}-${isPublic}`}
                  id={Number(id)}
                  isPublic={isPublic}
                />
              )}

             <MultiDrop props={{
              btnContent: '•••',
              btnList: [
              // <div onClick={()=>{console.log('Download')}}>
              //   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              //     <path d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z" stroke="#BDC2CF" stroke-width="2"/>
              //     <path d="M12 15.5356L12 7.75739" stroke="#BDC2CF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              //     <path d="M15.5355 12.7071L12.2322 16.0105C12.1039 16.1387 11.896 16.1387 11.7678 16.0104L8.46447 12.7071" stroke="#BDC2CF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              //   </svg>
              //   <span>Download</span>
              // </div>
              // , 
              <DeleteBtn id={Number(id)} >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 13H15" stroke="#BDC2CF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M3 6C3 4.89543 3.89543 4 5 4H12H19C20.1046 4 21 4.89543 21 6V6V6C21 7.10457 20.1046 8 19 8H12H5C3.89543 8 3 7.10457 3 6V6V6Z" stroke="#BDC2CF" stroke-width="2" stroke-linejoin="round"/>
                  <path d="M4 8L4.73464 18.285C4.86047 20.0466 4.92339 20.9275 5.49933 21.4637C6.07528 22 6.95835 22 8.72448 22H10L14 22L15.2755 22C17.0417 22 17.9247 22 18.5007 21.4637C19.0766 20.9275 19.1395 20.0466 19.2654 18.285L20 8" stroke="#BDC2CF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Delete</span>
              </DeleteBtn>
              ]
             }}>
              </MultiDrop> 
             
              {/* <DeleteBtn id={Number(id)} /> */}

              
            </div>
          ),
      },
    ],
    [onChangeSortingField, onToggleDirection],
  );
