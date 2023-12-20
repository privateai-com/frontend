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

    if (
      pageHistory &&
      (JSON.parse(pageHistory)[0] === JSON.parse(pageHistory)[1] ||
      JSON.parse(pageHistory)[0] === routes.knowledge.root)
    ) {
      router.push(routes.knowledge.root);
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
      <Image
        src={backArrowIcon}
        alt="button icon"
      />
      {title}
    </button>
  );
});
