import { ReactNode, useCallback } from 'react';
import { useModal } from 'react-modal-hook';
import cx from 'classnames';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { Requester, Loader } from 'components';
import { profileSelectors } from 'store/profile/selectors';
import { getName, normalizeUserInfo } from 'utils';
import { RequestStatus } from 'types';
import { profileGetProfileUser } from 'store/profile/actionCreators';

import styles from './styles.module.scss';

type RequestCellProps = {
  id: number;
  requester?: string;
  children: ReactNode;
  titleModal?: string;
  className?: string;
  classNameRequester?: string;
  profileId: number;
  isHideButtonsRequester?: boolean;
  onConfirmButton?: () => void;
  onCancelButton?: () => void;
  isDisabled?: boolean;
};

const RequestCell: React.FC<RequestCellProps> = ({
  requester, children, className = '', profileId, classNameRequester = '',
  isHideButtonsRequester = false, onConfirmButton, onCancelButton, isDisabled,
  titleModal = 'Requester', id,
}) => {
  const dispatch = useDispatch();
  const requesterUser = useSelector(profileSelectors.getPropRequester(profileId), shallowEqual);
  const status = useSelector(profileSelectors.getStatusRequester(id));

  const isLoading = status === RequestStatus.REQUEST;

  const [showRequester, hideRequester] = useModal(
    () => {
      const {
        avatarUrl,
        fullName,
        username,
        city,
        country,
        organization,
        position,
        researchFields,
        socialLink,
      } = requesterUser;
      
      return (
        <Requester
          id={profileId}
          title={titleModal}
          avatarUrl={avatarUrl || ''}
          name={getName(fullName, username, profileId)}
          country={normalizeUserInfo(city, country) || '-'}
          organization={organization || '-'}
          position={position || '-'}
          fields={researchFields || '-'}
          socialMedia={socialLink || '-'}
          onConfirmButton={() => { if (onConfirmButton) onConfirmButton(); hideRequester(); }}
          onCancelButton={() => { if (onCancelButton) onCancelButton(); hideRequester(); }}
          onCloseModal={hideRequester}
          isHideButtons={isHideButtonsRequester}
        />
      );
    },
    [requesterUser, profileId, onConfirmButton, onCancelButton],
  );

  const successCallback = useCallback(() => {
    showRequester();
  }, [showRequester]);

  const onOwnerClick = useCallback(() => {
    if (profileId && !isDisabled) {
      dispatch(profileGetProfileUser({
        profileId,
        successCallback,
        id,
      }));
    }
  }, [dispatch, id, isDisabled, profileId, successCallback]);

  return (
    <>
      {requester && <span className={classNameRequester}>{requester}</span>}
      <div className={cx(styles.cell_block_btn, className)}>
        {!isLoading ? (
          <button
            className={styles.cell_btn_link}
            onClick={onOwnerClick}
            disabled={isDisabled}
          >
            {children}
          </button>
        ) : (
          <Loader className={styles.loader} />
        )}
      </div>
    </>
  );
};

export { RequestCell };
