import { useState, ReactNode } from 'react';
import { useModal } from 'react-modal-hook';
import cx from 'classnames';

import { Requester, Loader } from 'components';
import styles from './styles.module.scss';

type RequestCellProps = {
  requester?: string;
  children: ReactNode;
  className?: string;
};

const RequestCell: React.FC<RequestCellProps> = ({ requester, children, className = '' }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showRequester, hideRequester] = useModal(
    () => (
      <Requester
        avatar="https://www.figma.com/file/bknHsaOyZlzB3FrosPJ7Vx/ARCHON-(Copy)?type=design&node-id=526-4546&mode=design&t=cjGucjlcUhk4ouS0-4"
        name="John Doe"
        contry="London, UK (GMT +0)"
        organization="London Institute of Medical Sciences, Head of neurosurgery laboratory"
        position="Head of neurosurgery laboratory"
        fields={'Neurobiology, neurosurgery, neuropathology'.split(', ')}
        socialMedia="https:/facebook.com/profile"
        onCloseModal={() => {
          hideRequester();
        }}
      />
    ),
    [],
  );

  const onHandlerClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showRequester();
    }, 1500);
  };

  return (
    <>
      {requester && <span>{requester}</span>}
      <div className={cx(styles.cell_block_btn, className)}>
        {!isLoading ? (
          <button
            className={styles.cell_btn_link}
            onClick={onHandlerClick}
          >
            {children}
          </button>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export { RequestCell };
