import { useSelector } from 'react-redux';

import { profileSelectors } from 'store/profile/selectors';
import { authSelectors } from 'store/auth/selectors';
import { UserRole } from 'types';

export const useVipUser = (): boolean => {
  const { accessToken } = useSelector(authSelectors.getState);
  const id = useSelector(profileSelectors.getPropAccountInfo('id'));
  const role = useSelector(profileSelectors.getPropAccountInfo('role'));

  return accessToken !== undefined && !!id && role === UserRole.VIP;
};
