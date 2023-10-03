import { MetamaskState } from './MetamaskState';
import { AuthState } from './AuthState';
import { AccountState } from './AccountState';

export interface State {
  metamask: MetamaskState
  auth: AuthState
  account: AccountState
}
