import { Button } from 'components/Button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

export const CookieAccept = () => {
  const [isShow, setShow] = useState(false);

  function setCookie(name:string, value:boolean) {
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    const cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
    document.cookie = cookie;
  }

  const handleClick = () => {
    setShow(false);
    setCookie('cookieAcceptFlag', true);
  };

  function getCookie(name:string) {
    const cookies = document.cookie.split(';');
    // eslint-disable-next-line
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
 
      if (cookie.startsWith(`${name}=`)) {
        return cookie.substring(name.length + 1); 
      }
    }
      
    return null;
  }

  useEffect(() => {
    const flag = getCookie('cookieAcceptFlag') || false;
    if(!flag) {
      setShow(true);
    }
  }, []);
  if(isShow) {
    return (
      <div className={styles.cookie_wrap}>
        <div className={styles.cookie_container}>
          <div className={styles.cookie_col}>
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
              <path d="M15.7857 7.28576C15.5429 7.12386 15.3 7.12386 15.1381 7.20481C14.8952 7.28576 14.7333 7.28576 14.5714 7.28576C13.7619 7.28576 13.1143 6.71909 12.9524 5.90957C12.9524 5.66671 12.7095 5.42386 12.4667 5.26195C12.2238 5.181 11.9 5.181 11.7381 5.26195C11.3333 5.58576 10.9286 5.66671 10.5238 5.66671C9.14762 5.66671 8.09524 4.61433 8.09524 3.23814C8.09524 2.83338 8.17619 2.42862 8.41905 2.02386C8.58095 1.781 8.58095 1.45719 8.41905 1.21433C8.25714 0.971475 8.01429 0.80957 7.69048 0.80957C3.4 1.05243 0 4.61433 0 8.90481C0 13.3572 3.64286 17 8.09524 17C12.5476 17 16.1905 13.3572 16.1905 8.90481C16.1905 8.581 16.1905 8.25719 16.1095 7.85243C16.1095 7.60957 15.9476 7.44767 15.7857 7.28576ZM8.09524 15.381C4.53333 15.381 1.61905 12.4667 1.61905 8.90481C1.61905 5.90957 3.72381 3.31909 6.55714 2.59052C6.47619 2.83338 6.47619 2.99528 6.47619 3.23814C6.47619 5.50481 8.25714 7.28576 10.5238 7.28576C10.9286 7.28576 11.3333 7.20481 11.6571 7.12386C12.2238 8.17624 13.2762 8.90481 14.5714 8.90481C14.5714 12.4667 11.6571 15.381 8.09524 15.381Z" fill="#7C859E" />
              <path d="M5.26209 6.47607C4.11527 6.47607 3.23828 7.35306 3.23828 8.49988C3.23828 9.64671 4.11527 10.5237 5.26209 10.5237C6.40892 10.5237 7.2859 9.64671 7.2859 8.49988C7.2859 7.35306 6.40892 6.47607 5.26209 6.47607ZM5.26209 9.17449C4.85733 9.17449 4.58749 8.90465 4.58749 8.49988C4.58749 8.09512 4.85733 7.82528 5.26209 7.82528C5.66685 7.82528 5.93669 8.09512 5.93669 8.49988C5.93669 8.90465 5.66685 9.17449 5.26209 9.17449Z" fill="#7C859E" />
              <path d="M11.3334 11.3334C11.7805 11.3334 12.143 10.971 12.143 10.5239C12.143 10.0768 11.7805 9.71436 11.3334 9.71436C10.8864 9.71436 10.5239 10.0768 10.5239 10.5239C10.5239 10.971 10.8864 11.3334 11.3334 11.3334Z" fill="#7C859E" />
              <path d="M12.9526 1.61905C13.3997 1.61905 13.7621 1.25661 13.7621 0.809524C13.7621 0.362436 13.3997 0 12.9526 0C12.5055 0 12.1431 0.362436 12.1431 0.809524C12.1431 1.25661 12.5055 1.61905 12.9526 1.61905Z" fill="#7C859E" />
              <path d="M15.3808 4.85733C15.8279 4.85733 16.1903 4.49489 16.1903 4.04781C16.1903 3.60072 15.8279 3.23828 15.3808 3.23828C14.9337 3.23828 14.5713 3.60072 14.5713 4.04781C14.5713 4.49489 14.9337 4.85733 15.3808 4.85733Z" fill="#7C859E" />
              <path d="M7.2856 13.7621C7.73269 13.7621 8.09512 13.3997 8.09512 12.9526C8.09512 12.5055 7.73269 12.1431 7.2856 12.1431C6.83851 12.1431 6.47607 12.5055 6.47607 12.9526C6.47607 13.3997 6.83851 13.7621 7.2856 13.7621Z" fill="#7C859E" />
            </svg>
            <p className={styles.cookie_text}>
              We use cookies per our 
              {' '}
              <Link href="/" className={styles.textLink}>Cookie Policy</Link>
              {' '}
              to make your experience better.
            </p>
          </div>
          <div className={styles.cookie_col}>
            <Link href="/" className={styles.textLink}>
              Learn more
            </Link>
            <Button
              className={styles.acceptBtn}
              onClick={handleClick}
            >
              Accept
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return <span />;
};
