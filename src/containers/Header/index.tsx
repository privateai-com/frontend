import React, {
  FormEvent,
  useCallback, useEffect, useRef, useState,
} from 'react';
import cx from 'classnames';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useRouter } from 'next/router';
// import Link from 'next/link';
import { useModal } from 'react-modal-hook';

import {
  ButtonIcon, TextInput, 
  // SelectedText, 
  LogOut, 
} from 'components';
import { logoutIcon, ringIcon, userIcon, arrowIcon } from 'assets';
import { ScreenWidth, routes } from 'appConstants';
import { profileSelectors } from 'store/profile/selectors';
import {
  profileNotification,
  profileGetProfile,
  profileNotificationMarkAsView,
  profileNotificationSubscribe,
} from 'store/profile/actionCreators';

import { getName } from 'utils';
import { useOnClickOutside, useScreenWidth } from 'hooks';
import { ExperienceWrapper } from 'components/ExperienceWrapper';
import { Notification } from './Notification';

import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { MultiDrop } from 'components/MultiDrop';

import logoPrivateAI from '../../assets/img/icons/logoPrivateAI.svg'


// const results = [
//   'A brief history of the antibiotics era',
//   'Antibiotic resistance',
//   'The effectiveness of frequent antibiotic use',
//   'A brief history of the antibiotics era',
//   'Antibiotic resistance',
// ];

export const Header = ({children,setActive}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isMobile = useScreenWidth(ScreenWidth.bigMobile); 

  const { query: { search: searchDefault }, pathname } = router;

  const [search, setSearch] = useState(searchDefault ?? '');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const ref = useOnClickOutside<HTMLDivElement>(() => setIsNotificationOpen(false), buttonRef);
  
  const username = useSelector(profileSelectors.getPropAccountInfo('username'));
  const fullName = useSelector(profileSelectors.getPropAccountInfo('fullName'));
  const userId = useSelector(profileSelectors.getPropAccountInfo('id'));
  const notifications = useSelector(profileSelectors.getProp('notifications'));
  const {
    avatarUrl,
  } = useSelector(profileSelectors.getProp('accountInfo'), shallowEqual);

  const onNotificationClick = useCallback(() => {
    setIsNotificationOpen((prevState) => !prevState);
  }, []);

  const [showLogout, hideLogout] = useModal(() => (
    <LogOut onClose={hideLogout} />
  ));

  const onRedirectClick = useCallback(() => {
    router.push(routes.profile.root);
  }, [router]);

  useEffect(() => {
    dispatch(profileGetProfile());
    dispatch(profileNotification());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(profileNotificationSubscribe());
    }
  }, [dispatch, userId]);

  const onDeleteNotification = useCallback((requestId: number) => {
    dispatch(profileNotificationMarkAsView({ 
      requestId,
      callback: () => {
        if (notifications.length <= 1) {
          setIsNotificationOpen(false); 
        }
      },
    }));
  }, [dispatch, notifications.length]);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push({
      pathname: routes.knowledge.root,
      query: { search },
    });
  }, [router, search]);

  const handleChange = useCallback((text: string) => {
    if (text === '') {
      setSearch(text); 
      if (pathname === routes.knowledge.root) {
        router.push({
          pathname: routes.knowledge.root,
        });
      }
    } else {
      setSearch(text); 
    }
  }, [pathname, router]);

  useEffect(() => {
    const newUrl = router.asPath;
    let history = [];
    const pageHistory = sessionStorage.getItem('pageHistory');
    if (pageHistory) {
      history = JSON.parse(pageHistory);
    }
    if (history.length > 1) {
      const isUrlInHistory = history[1].includes(newUrl);
      
      if (!isUrlInHistory) {
        const updatedHistory = [...history, router.asPath].slice(-2);
        sessionStorage.setItem('pageHistory', JSON.stringify(updatedHistory));
      }
    } else {
      const updatedHistory = [...history, router.asPath];
      sessionStorage.setItem('pageHistory', JSON.stringify(updatedHistory));
    }
  }, [router.asPath]);

  return (
    <header className={styles.header}   >
      <div className={styles.header_logo}>
        <Link href="/knowledge">
          <Image
            src={logoPrivateAI}
            alt="logo"
            style={{marginTop:-14, marginBottom: -14}}
          />
        </Link>
        
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M33.5635 18.814C35.9262 20.2757 37.9328 22.2564 39.4233 24.5967C37.8968 26.9934 35.8291 29.0131 33.3918 30.4842C32.4944 31.6951 31.3309 32.7268 29.9784 33.5088C34.3893 32.0814 38.1193 29.147 40.5584 25.3169C40.8385 24.8774 40.8385 24.3159 40.5584 23.8764C38.2101 20.1888 34.6649 17.3314 30.4677 15.85C31.6974 16.6437 32.7508 17.6514 33.5635 18.814ZM16.9962 15.9604C12.9321 17.4706 9.50142 20.2783 7.20995 23.8764C6.93002 24.3159 6.93002 24.8774 7.20995 25.3169C9.59105 29.0558 13.2022 31.9411 17.476 33.4042C16.1434 32.6024 15.0024 31.555 14.1293 30.3322C11.7994 28.8753 9.81976 26.9119 8.34527 24.5967C9.78481 22.3363 11.7058 20.4113 13.9642 18.9656C14.754 17.7926 15.786 16.7714 16.9962 15.9604Z" fill="#4659FE"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M31.394 21.5316C30.5455 19.3924 28.807 17.6204 26.4632 16.8042C22.2162 15.3253 17.5774 17.5406 16.05 21.7567L14.6255 21.7776C14.6626 21.6558 14.7022 21.5343 14.7445 21.413C16.4792 16.4313 21.9239 13.7991 26.9056 15.5338C29.8052 16.5435 31.9088 18.8101 32.8187 21.5106L31.394 21.5316Z" fill="#4659FE"/>
          <path d="M16.5564 22.7572C16.2876 23.529 15.4441 23.9368 14.6723 23.6681C13.9005 23.3993 13.4927 22.5557 13.7614 21.7839C14.0302 21.0121 14.8737 20.6043 15.6455 20.8731C16.4173 21.1418 16.8252 21.9854 16.5564 22.7572Z" fill="#4659FE"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M15.9847 27.2414C16.8332 29.3805 18.5717 31.1525 20.9155 31.9687C25.1626 33.4476 29.8013 31.2322 31.3288 27.0162L32.7533 26.9953C32.7162 27.1171 32.6765 27.2386 32.6343 27.3599C30.8996 32.3417 25.4548 34.9738 20.4731 33.2391C17.5735 32.2294 15.4699 29.9629 14.5601 27.2623L15.9847 27.2414Z" fill="#4659FE"/>
          <path d="M30.822 26.0164C31.0907 25.2446 31.9343 24.8368 32.7061 25.1055C33.4779 25.3743 33.8857 26.2178 33.617 26.9897C33.3482 27.7615 32.5047 28.1693 31.7328 27.9005C30.961 27.6318 30.5532 26.7882 30.822 26.0164Z" fill="#4659FE"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M23.8851 31.0305C27.3927 31.0305 30.2361 28.1177 30.2361 24.5246C30.2361 20.9315 27.3927 18.0188 23.8851 18.0188C20.3776 18.0188 17.5342 20.9315 17.5342 24.5246C17.5342 28.1177 20.3776 31.0305 23.8851 31.0305ZM25.9542 22.7707C25.9542 23.553 25.5367 24.2355 24.9175 24.5971L25.4306 27.6556C25.4862 27.9868 25.2371 28.2896 24.909 28.2896H22.828C22.4999 28.2896 22.2508 27.9868 22.3064 27.6556L22.826 24.5586C22.2418 24.1884 21.8525 23.5261 21.8525 22.7707C21.8525 21.6104 22.7707 20.6698 23.9033 20.6698C25.036 20.6698 25.9542 21.6104 25.9542 22.7707Z" fill="#4659FE"/>
        </svg>
        <span>
          Private AI
        </span> */}
      </div>
      <form className={styles.input_wrapper} onSubmit={handleSubmit}>
        <TextInput
          value={search as string}
          onChangeValue={handleChange}
          placeholder={isMobile ? 'Search' : 'Search'}
          isSearch
          isClearable
          classNameInputBox={cx(styles.input_wrapper_input, {
            [styles.input_wrapper_input_filled]: !!search.length,
          })}
        />
      </form>
     
      {/* <ExperienceWrapper /> */}
      <div className={styles.header_right_col}>
        <ButtonIcon
          className={cx(styles.button, { [styles.active]: !!notifications.length })}
          image={ringIcon}
          onClick={onNotificationClick}
          ref={buttonRef}
          isDisabled={false}
          // isDisabled={notifications.length === 0}
        />

        <div className={styles.multiDrop_wrap}>
          <MultiDrop
            props={{
              isCustom: true,
              showArrow: true,
              btnContent: <div className={styles.profileButton} style={{display:'flex', alignItems:'center'}}>
                <div className="" style={{display:'flex', flexDirection:'column', marginLeft: 35, marginRight:15}}>
                  <span className={styles.username} style={{
                      textAlign: 'right',
                      fontSize: 16,
                      fontStyle: 'normal',
                      fontWeight: 700,
                      color: '#7C859E'
                    }}>{getName(fullName, username, userId) ?? ''}</span>
                  <span
                    style={{
                      textAlign: 'right',
                      fontSize: 14,
                      fontStyle: 'normal',
                      fontWeight: 400,
                      color: '#BBC0CE'
                    }}
                  >
                    Profile menu
                  </span>

                </div>
                {avatarUrl ? <Image
                  style={{borderRadius:'100%', overflow: 'hidden'}}
                  src={avatarUrl}
                  width={41}
                  height={41}
                  alt={''}
                />: <Image
                    style={{borderRadius:'100%', overflow: 'hidden'}}
                    src={userIcon}
                    width={41}
                    height={41}
                    alt={''}
                  />
                }
                
                
                {/* <span>sss</span> */}
              </div>,
              btnList: [
                <Link href="/profile">Settings</Link>,
                <a onClick={showLogout}>
                  <Image
                    src={logoutIcon}
                    alt="button icon"
                    priority 
                    width={18}
                    height={18}
                  />
                  Logout
                </a>
              ]

            }}
          />
        </div>
        <div className="" style={{marginLeft:20}}>
          {children}
        </div>
      </div>
      
      {/* <div className={styles.profileButton} style={{display:'flex', alignItems:'center'}}>
        <div className="" style={{display:'flex', flexDirection:'column', marginLeft: 35, marginRight:15}}>
          <span className={styles.username} style={{
              textAlign: 'right',
              fontSize: 16,
              fontStyle: 'normal',
              fontWeight: 700,
              color: '#7C859E'
            }}>{getName(fullName, username, userId) ?? ''}</span>
          <span
            style={{
              textAlign: 'right',
              fontSize: 14,
              fontStyle: 'normal',
              fontWeight: 400,
              color: '#BBC0CE'
            }}
          >
            Profile menu
          </span>

        </div>
        <Image
          style={{borderRadius:'100%', overflow: 'hidden'}}
          src={userIcon}
          width={41}
          height={41}
          alt={''}
        />
        <svg style={{ marginLeft:10}} xmlns="http://www.w3.org/2000/svg" width="9" height="7" viewBox="0 0 9 7" fill="none">
           <path d="M5.31706 5.84212C4.91865 6.40671 4.08135 6.40671 3.68294 5.84212L0.849358 1.82656C0.381916 1.16413 0.855666 0.250001 1.66641 0.250001L7.33358 0.25C8.14433 0.25 8.61808 1.16413 8.15064 1.82656L5.31706 5.84212Z" fill="#7C859E"/>
        </svg>

        <div className={styles.profileButton_dropdown}>
            <div className={styles.profileButton_dropdown_inner}>

            
              <ul className={styles.profileButton_list}>
                <li>
                  <Link href="/profile">Settings</Link>
                </li>
              </ul>
              <div className={styles.stroke}></div>
              <ul className={styles.profileButton_list}>
      

                <li>
                  <a onClick={showLogout}>
                    <Image
                      src={logoutIcon}
                      alt="button icon"
                      priority 
                      width={18}
                      height={18}
                    />
                    Logout
                  </a>

                </li>

              </ul>
            </div>
          </div>
      </div> */}

      {/* <ButtonIcon
        className={cx(styles.button, styles.profileButton)}
        image={userIcon}
        onClick={()=>{}}
        // onClick={onRedirectClick}
        width={30}
        height={30}
      >
          <div className={styles.profileButton_dropdown}>
            <div className={styles.profileButton_dropdown_inner}>

            
              <ul className={styles.profileButton_list}>
                <li>
                  <Link href="/profile">Settings</Link>
                </li>
              </ul>
              <div className={styles.stroke}></div>
              <ul className={styles.profileButton_list}>
      

                <li>
                  <a onClick={showLogout}>
                    <Image
                      src={logoutIcon}
                      alt="button icon"
                      priority 
                      width={18}
                      height={18}
                    />
                    Logout
                  </a>

                </li>

            
              </ul>
            </div>
          </div>
         
      </ButtonIcon> */}
      
      
      {/* <ButtonIcon
        className={styles.button}
        image={logoutIcon}
        onClick={showLogout}
      /> */}

      {userId && (
        <Notification
          ref={ref}
          userId={userId}
          isOpen={isNotificationOpen}
          toggleFun={()=>setIsNotificationOpen((prev)=>!prev)}
          onDeleteNotification={onDeleteNotification}
          notifications={notifications}
        />
      )}
      
    </header>
  );
};
