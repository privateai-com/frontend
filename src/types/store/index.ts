import { MetamaskState } from './MetamaskState';
import { AuthState } from './AuthState';
import { ProfileState } from './ProfileState';
import { ArticlesState } from './ArticlesState';

export interface State {
  metamask: MetamaskState;
  auth: AuthState;
  profile: ProfileState;
  articles: ArticlesState;
}
