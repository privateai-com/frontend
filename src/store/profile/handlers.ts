import { ProfileState, ActionFn } from 'types';
import { ProfileActionTypes } from './actionTypes';
import {
  profileSetAccountInfo,
  profileSetState,
  profileSetStatus,
} from './actionCreators';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ProfileStateActionFn<F extends (...args: any) => any> =
  ActionFn<ProfileState, ReturnType<F>>;

const setState: ProfileStateActionFn<typeof profileSetState> = (
  state,
  { payload },
) => ({
  ...state,
  ...payload,
});

const setStatus: ProfileStateActionFn<typeof profileSetStatus> = (
  state,
  { payload },
) => ({
  ...state,
  ui: {
    ...state.ui,
    [payload.type]: payload.status,
  },
});

const setAccountInfo: ProfileStateActionFn<typeof profileSetAccountInfo> = (
  state,
  { payload },
) => ({
  ...state,
  accountInfo: {
    ...state.accountInfo,
    ...payload,
  },
});

export const profileHandlers = {
  [ProfileActionTypes.SetState]: setState,
  [ProfileActionTypes.SetStatus]: setStatus,
  [ProfileActionTypes.SetStateAccountInfo]: setAccountInfo,
};
