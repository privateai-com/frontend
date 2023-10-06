import { ActionFn, AccountState } from 'types';

import { AccountActionType } from './actionsTypes';
import { accountSetState } from './actionCreators';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AccountHandlerFn<F extends (...args: any[]) => any> = ActionFn<AccountState, ReturnType<F>>;

const setState: AccountHandlerFn<typeof accountSetState> = (
  state,
  { payload },
) => ({
  ...state,
  ...payload,
});

export const accountHandlers = {
  [AccountActionType.SetState]: setState,
};
