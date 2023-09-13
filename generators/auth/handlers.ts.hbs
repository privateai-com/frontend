import { ActionFn } from 'types/redux';
import { AuthState } from 'types/store/AuthState';
import { authSetState, authSetStatus } from './actionCreators';
import { AuthActionTypes } from './actionsTypes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AuthHandlerFn<F extends (...args: any) => any> = ActionFn<AuthState, ReturnType<F>>;

const setState: AuthHandlerFn<typeof authSetState> = (
  state,
  { payload },
) => ({
  ...state,
  ...payload,
});

const setStatus: AuthHandlerFn<typeof authSetStatus> = (
  state,
  { payload },
) => ({
  ...state,
  ui: {
    ...state.ui,
    [payload.type]: payload.status,
  },
});

export const authHandlers = {
  [AuthActionTypes.SetState]: setState,
  [AuthActionTypes.SetStatus]: setStatus,
};
