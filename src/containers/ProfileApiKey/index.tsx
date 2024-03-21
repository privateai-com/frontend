import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useModal } from 'react-modal-hook';

import { Button, RevokeAPIKey } from 'components';
import { PageHead } from 'components/PageHead';
import { apiBaseUrl, routes } from 'appConstants';
import { profileSelectors } from 'store/profile/selectors';
import { profileCreateApiKey, profileDeleteApiKey, profileGetApiKey } from 'store/profile/actionCreators';
import { ProfileActionTypes } from 'store/profile/actionTypes';
import { RequestStatus } from 'types';
import CopyIcon from '../../assets/img/icons/copy_svg.svg'
import cx from 'classnames';

import styles from './styles.module.scss';

interface KeyData {
  apiKey: string;
}

export const ProfileApiKey = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const apiKey = 
  // 'dsadasdsa'
   useSelector(profileSelectors.getProp('apiKey'));

  const [data, setData] = useState<KeyData[]>([])
  const [isLoading, setLoading] = useState(false)


  const statusGetKey = useSelector(
    profileSelectors.getStatus(ProfileActionTypes.GetApiKey),
  );
  const statusRevokeKey = useSelector(
    profileSelectors.getStatus(ProfileActionTypes.DeleteApiKey),
  );

  const onClickBack = useCallback(() => {
    router.push(routes.profile.root);
  }, [router]);

  const updateKeyData = (_data:any) =>{
    setData([])
    setLoading(true)
    if(!apiKey) {setTimeout(()=>{
      // I think "apiKey" must be array
      setData(_data && _data.length > 0 ?  _data : [])
      setLoading(false)
    },2000)}
    else{
      setTimeout(()=>{
        const preparedData = apiKey.length > 0 ? [{apiKey}] : []
        setData(preparedData)
        setLoading(false)
      },2000)
    }
  }

  useEffect(()=>{
    updateKeyData(apiKey.length > 0 ? [{apiKey}] : [])
  },[apiKey])


  const [showRevokeAPIKey, hideRevokeAPIKey] = useModal(
    () => (
      <RevokeAPIKey
        isLoading={statusRevokeKey === RequestStatus.REQUEST}
        onCloseModal={() => {
          hideRevokeAPIKey();
        }}
        onConfirm={() => {
          dispatch(profileDeleteApiKey({
            callback: hideRevokeAPIKey,
          }));
        }}
      />
    ),
    [statusRevokeKey],
  );

  const onClickGenerate = useCallback(() => {
    dispatch(profileCreateApiKey());

    updateKeyData(apiKey.length > 0 ? [{apiKey}] : [
      // ...apiKeys
      {
        apiKey: 'This is example key 2132312' //apiKey
      }
    ])
  }, [dispatch]);

  const onClickCopy = (key: string) =>{
    navigator.clipboard.writeText(key);
  }


  // const onClickCopy = useCallback(() => {
  //   navigator.clipboard.writeText(apiKey);
  // }, [apiKey]);

  useEffect(() => {
    dispatch(profileGetApiKey());
  }, [dispatch]);

  return (
    <>
      <PageHead
        title="API key configuration"
        headStyles={{
          background: 'transparent',
        }}
        btnWrap={(
          <Button
            theme="primary"
            className={styles.profile__head_button}
            onClick={onClickBack}
          >
            Back
          </Button>
        )}
      />
      <div className={styles.profile__container}>
        <div className={styles.api__container} >
          <div className={styles.api__container_col}>
            <div className={styles.api__container_colored_box}>
              <h3 className={styles.api__container_colored_box_h3} >
                Generate Your API Key
              </h3>
              <p>
                To access the PrivateAI Public API, you must first create your personal API key. This key is essential and will need to be provided every time you manage your data or configure your profile using the API.
              </p>
              {!apiKey && <div className={styles.profile__buttons_wrap}>
                {/* <Button onClick={onClickCopy} disabled={!apiKey}>Copy</Button> */}

                {/* in this case when we can generate only one api key */}
                {/* {!apiKey && */}
                <Button
                  onClick={onClickGenerate}
                  isLoading={isLoading || statusGetKey === RequestStatus.REQUEST}
                  disabled={isLoading || !!apiKey}
                >
                  Generate
                </Button> 
                {/* } */}

                {/* <Button onClick={showRevokeAPIKey} disabled={!apiKey}>Revoke</Button> */}
              </div>}
            </div>
            <div className={styles.api__container_add_content}>
              <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="*" d="M2.646 6.85294L0 5.92894L0.714 4.08094L3.276 4.96294C4.788 5.46694 5.712 5.92894 6.636 6.51694C6.384 5.46694 6.258 4.41694 6.258 2.90494V0.0909424H8.232V2.90494C8.232 4.41694 8.064 5.50894 7.854 6.51694C8.778 5.97094 9.66 5.46694 11.13 4.96294L13.692 4.03894L14.49 5.92894L11.802 6.85294C10.374 7.35694 9.24 7.60894 8.274 7.73494C9.114 8.49094 9.702 9.20494 10.626 10.5069L12.18 12.7749L10.542 13.9089L8.946 11.6829C8.064 10.4229 7.56 9.41494 7.182 8.49094C6.888 9.45694 6.426 10.3809 5.502 11.6829L3.864 13.9089L2.226 12.7749L3.78 10.5069C4.662 9.20494 5.418 8.44894 6.174 7.73494C4.914 7.56694 3.864 7.31494 2.646 6.85294Z" fill="#7C859E" fillOpacity="0.5" />
              </svg>
              <p>
                It is crucial to keep your API key confidential to maintain your account's privacy. If you believe your API key has been compromised, it is strongly advised to revoke  it and generate a new one on this page immediately.
                <br />
                <br />
                Please be aware that only one API key is allowed per PrivateAI account. Additionally, please note that the rate limit is set to 30 requests per minute to reduce server load.
                <br />
                <br />
                For a list of available API endpoints and their descriptions, please refer to this
                {' '}
                <Link href={`${apiBaseUrl}/swagger/api`}>Swagger Link</Link>
              </p>
            </div>
          </div>  
          <div className={styles.col}>
            <div className={styles.table}>
              <div className={styles.table_head}>
                <div className={styles.table_head_row}>
                  <div className={styles.table_col}>
                    Keys
                  </div>
                  <div className={styles.table_col_auto}>
                    Actions
                  </div>
                </div>
              </div>
              <div className={styles.table_body}>

                {/* if we not using array then:  */}

                {apiKey && !isLoading && <div className={styles.table_row}>
                  <div className={cx(styles.table_col)} onClick={()=>onClickCopy(apiKey)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" style={{minWidth: 20, width: 20}}  viewBox="0 0 24 24">
                      <path fill="rgba(70, 89, 254, 1)" d="M7 18q-2.5 0-4.25-1.75T1 12q0-2.5 1.75-4.25T7 6q2.025 0 3.538 1.138T12.65 10H21q.825 0 1.413.588T23 12q0 .9-.625 1.45T21 14v2q0 .825-.587 1.413T19 18q-.825 0-1.412-.587T17 16v-2h-4.35q-.6 1.725-2.113 2.863T7 18m0-4q.825 0 1.413-.587T9 12q0-.825-.587-1.412T7 10q-.825 0-1.412.588T5 12q0 .825.588 1.413T7 14"/>
                    </svg>
                    <div className={cx(styles.ellipse, styles.pointer)}>
                      {apiKey}
                    </div>
                  </div>
                  <div className={cx(styles.table_col,styles.table_col_auto)}>
                    <Button className={styles.tableActionButton} onClick={()=>onClickCopy(apiKey)} disabled={!apiKey}>
                      <img src={CopyIcon.src} alt="" style={{minWidth: 20, width: 20}} />
                    </Button>
                    <Button className={styles.tableActionButton} onClick={showRevokeAPIKey} disabled={!apiKey}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path d="M9 13H15" stroke="#D87676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 6C3 4.89543 3.89543 4 5 4H12H19C20.1046 4 21 4.89543 21 6V6V6C21 7.10457 20.1046 8 19 8H12H5C3.89543 8 3 7.10457 3 6V6V6Z" stroke="#D87676" strokeWidth="2" strokeLinejoin="round" />
                        <path d="M4 8L4.73464 18.285C4.86047 20.0466 4.92339 20.9275 5.49933 21.4637C6.07528 22 6.95835 22 8.72448 22H10L14 22L15.2755 22C17.0417 22 17.9247 22 18.5007 21.4637C19.0766 20.9275 19.1395 20.0466 19.2654 18.285L20 8" stroke="#D87676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Button>
                  </div>
                </div> }

                {/* map keys as row */}

                {!apiKey && data && data.map((dataItem:any,index:number) => 
                  dataItem?.apiKey && <>
                    <div key={`dataItem-${index}`} className={styles.table_row}>
                      <div className={cx(styles.table_col)} onClick={()=>onClickCopy(dataItem.apiKey)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" style={{minWidth: 20, width: 20}}  viewBox="0 0 24 24">
                          <path fill="rgba(70, 89, 254, 1)" d="M7 18q-2.5 0-4.25-1.75T1 12q0-2.5 1.75-4.25T7 6q2.025 0 3.538 1.138T12.65 10H21q.825 0 1.413.588T23 12q0 .9-.625 1.45T21 14v2q0 .825-.587 1.413T19 18q-.825 0-1.412-.587T17 16v-2h-4.35q-.6 1.725-2.113 2.863T7 18m0-4q.825 0 1.413-.587T9 12q0-.825-.587-1.412T7 10q-.825 0-1.412.588T5 12q0 .825.588 1.413T7 14"/>
                        </svg>
                        <div className={cx(styles.ellipse, styles.pointer)}>
                          {dataItem.apiKey}
                        </div>
                      </div>
                      <div className={cx(styles.table_col,styles.table_col_auto)}>
                        <Button className={styles.tableActionButton} onClick={()=>onClickCopy(dataItem.apiKey)} disabled={!dataItem?.apiKey}>
                          <img src={CopyIcon.src} alt="" style={{minWidth: 20, width: 20}} />
                        </Button>
                        <Button className={styles.tableActionButton} onClick={showRevokeAPIKey} disabled={!dataItem?.apiKey}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none">
                            <path d="M9 13H15" stroke="rgba(70, 89, 254, 0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 6C3 4.89543 3.89543 4 5 4H12H19C20.1046 4 21 4.89543 21 6V6V6C21 7.10457 20.1046 8 19 8H12H5C3.89543 8 3 7.10457 3 6V6V6Z" stroke="rgba(70, 89, 254, 1)" strokeWidth="2" strokeLinejoin="round" />
                            <path d="M4 8L4.73464 18.285C4.86047 20.0466 4.92339 20.9275 5.49933 21.4637C6.07528 22 6.95835 22 8.72448 22H10L14 22L15.2755 22C17.0417 22 17.9247 22 18.5007 21.4637C19.0766 20.9275 19.1395 20.0466 19.2654 18.285L20 8" stroke="rgba(70, 89, 254, 1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Button>
                      </div>
                    </div>                
                  </> 
                )}
                {(( apiKey.length === 0) && ( data.length === 0)) && !isLoading && <div className={styles.table_row}>
                  <div className={cx(styles.table_col)}>
                    Keys not found yet
                  </div>
                </div>}

                {(!data || isLoading) && (!!!apiKey || isLoading) && <div className={styles.table_row}>
                  <div className={cx(styles.table_col)}>
                    Searching for your API keys...
                  </div>
                </div>}

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
