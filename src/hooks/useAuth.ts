import { useSelector } from 'react-redux';

import { profileSelectors } from 'store/profile/selectors';
import { authSelectors } from 'store/auth/selectors';

export const useAuth = (): boolean => {
  const { accessToken } = useSelector(authSelectors.getState);
  const id = useSelector(profileSelectors.getPropAccountInfo('id'));

  return accessToken !== undefined && !!id;
};
