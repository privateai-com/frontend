import { AccountState } from 'types';

import { AccountActionType } from './actionsTypes';

export const accountSetState = (payload: Partial<AccountState>) => ({
  type: AccountActionType.SetState,
  payload,
});
