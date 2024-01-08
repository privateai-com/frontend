import { memo, FC, useCallback } from 'react';
import Image from 'next/image';
import cx from 'classnames';
import { useRouter } from 'next/router';

import { backArrowIcon } from 'assets';
import { queryTab, routes } from 'appConstants';

import styles from './styles.module.scss';

type ButtonBackProps = {
  title: string;
  className?: string;
  isEdit: boolean;
  onEdit: () => void;
};

export const ButtonBack: FC<ButtonBackProps> = memo(({
  title,
  className = '',
  isEdit,
  onEdit,
}) => {
  const router = useRouter();

  const onBackNavigate = useCallback(() => {
    if (isEdit) {
      onEdit();
      return;
    }

    const storageUrl = routes.storage.root;
    const { storageTab } = router.query;
    if (typeof storageTab === 'string' && storageTab === queryTab.storageRequestedData) {
      router.push(`${storageUrl}?storageTab=${queryTab.storageRequestedData}`);
      return;
    }

    const pageHistory = sessionStorage.getItem('pageHistory');
    if (pageHistory && JSON.parse(pageHistory)[0] === routes.requests.root) {
      router.push(routes.requests.root);
      return;
    }
     
    if (pageHistory) {
      const history = JSON.parse(pageHistory);
      const containsSubstring = history.some((url: string | string[]) => url.includes(storageUrl));

      if (containsSubstring || history.includes(storageUrl)) {
        router.push(storageUrl);
        return;
      }
    }
    
    router.push(routes.knowledge.root);
  }, [isEdit, onEdit, router]);

  return (
    <button
      className={cx(
        styles.button_back__container,
        className,
      )}
      onClick={onBackNavigate}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="9" height="13" viewBox="0 0 9 13" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.88136 0.308893C8.26305 0.708057 8.24889 1.34106 7.84972 1.72275L3.33086 6.04378L7.84972 10.3648C8.24889 10.7465 8.26305 11.3795 7.88136 11.7787C7.49967 12.1778 6.86667 12.192 6.4675 11.8103L1.36435 6.93057C0.85902 6.44736 0.859018 5.6402 1.36435 5.15699L6.4675 0.277251C6.86667 -0.104438 7.49968 -0.0902715 7.88136 0.308893Z" fill="#4659FE"/>
      </svg>
      {/* <Image
        src={backArrowIcon}
        alt="button icon"
      /> */}
      {title}
    </button>
  );
});
