import { useSelector } from 'react-redux';
import { authSelectors } from 'store/auth/selectors';

export const useAuth = (): boolean => {
  const accessToken = useSelector(authSelectors.getProp('accessToken'));
  return accessToken !== undefined;
};
