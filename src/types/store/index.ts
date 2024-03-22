import { RequestState } from './RequestState';
import { MetamaskState } from './MetamaskState';
import { AuthState } from './AuthState';
import { ProfileState } from './ProfileState';
import { ArticlesState } from './ArticlesState';
import { ChatState } from './ChatState';

export interface State {
  request: RequestState,
  metamask: MetamaskState;
  auth: AuthState;
  profile: ProfileState;
  articles: ArticlesState;
  chat: ChatState;
}
