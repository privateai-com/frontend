import { AuthState, ActionFn } from 'types';
import { AuthActionTypes } from './actionTypes';
import {
  authSetState,
  authSetStatus,
} from './actionCreators';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AuthStateActionFn<F extends (...args: any) => any> =
  ActionFn<AuthState, ReturnType<F>>;

const setState: AuthStateActionFn<typeof authSetState> = (
  state,
  { payload },
) => ({
  ...state,
  ...payload,
});

const setStatus: AuthStateActionFn<typeof authSetStatus> = (
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
