import { MetamaskState } from './MetamaskState';
import { AuthState } from './AuthState';
import { AccountState } from './AccountState';
import { ProfileState } from './ProfileState';
import { ForgotPasswordState } from './ForgotPassword';

export interface State {
  metamask: MetamaskState;
  auth: AuthState;
  account: AccountState;
  profile: ProfileState;
  forgotPassword: ForgotPasswordState;
}
