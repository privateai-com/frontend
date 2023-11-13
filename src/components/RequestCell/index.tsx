import { ReactNode, useCallback } from 'react';
import { useModal } from 'react-modal-hook';
import cx from 'classnames';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { Requester, Loader } from 'components';
import { profileSelectors } from 'store/profile/selectors';
import { normalizeUserInfo } from 'utils';
import { ProfileActionTypes } from 'store/profile/actionTypes';
import { RequestStatus } from 'types';
import { profileGetProfileUser } from 'store/profile/actionCreators';

import styles from './styles.module.scss';

type RequestCellProps = {
  requester?: string;
  children: ReactNode;
  className?: string;
  profileId: number;
  isHideButoonsRequester?: boolean;
  onConfirmButton?: () => void;
  onCancelButton?: () => void;
};

const RequestCell: React.FC<RequestCellProps> = ({
  requester, children, className = '', profileId, isHideButoonsRequester = false, onConfirmButton, onCancelButton,
}) => {
  const dispatch = useDispatch();
  const requesterUser = useSelector(profileSelectors.getProp('requester'), shallowEqual);
  const status = useSelector(profileSelectors.getStatus(ProfileActionTypes.GetProfileUser));

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
          avatarUrl={avatarUrl || ''}
          name={normalizeUserInfo(fullName, username) || '-'}
          contry={normalizeUserInfo(city, country) || '-'}
          organization={organization || '-'}
          position={position || '-'}
          fields={researchFields || '-'}
          socialMedia={socialLink || '-'}
          onConfirmButton={() => { if (onConfirmButton) onConfirmButton(); hideRequester(); }}
          onCancelButton={() => { if (onCancelButton) onCancelButton(); hideRequester(); }}
          onCloseModal={hideRequester}
          isHideButoons={isHideButoonsRequester}
        />
      );
    },
    [requesterUser, profileId, onConfirmButton, onCancelButton],
  );

  const successCallback = useCallback(() => {
    showRequester();
  }, [showRequester]);

  const onOwnerClick = useCallback(() => {
    if (profileId) {
      dispatch(profileGetProfileUser({
        profileId,
        successCallback,
      }));
    }
  }, [dispatch, profileId, successCallback]);

  return (
    <>
      {requester && <span>{requester}</span>}
      <div className={cx(styles.cell_block_btn, className)}>
        {!isLoading ? (
          <button
            className={styles.cell_btn_link}
            onClick={onOwnerClick}
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
