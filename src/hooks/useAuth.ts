import { useSelector } from 'react-redux';

import { accountSelectors } from 'store/account/selectors';
import { authSelectors } from 'store/auth/selectors';

export const useAuth = (): boolean => {
  const { accessToken } = useSelector(authSelectors.getState);
  const { id } = useSelector(accountSelectors.getAccount);

  return accessToken !== undefined && !!id;
};
