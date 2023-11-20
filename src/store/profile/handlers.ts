import { ProfileState, ActionFn } from 'types';
import { ProfileActionTypes } from './actionTypes';
import {
  profileSetAccountInfo,
  profileSetState,
  profileSetStateRequester,
  profileSetStatus,
  profileSetStatusRequester,
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

const setStateRequester: ProfileStateActionFn<typeof profileSetStateRequester> = (
  state,
  { payload },
) => ({
  ...state,
  requester: {
    ...state.requester,
    [payload.id ?? 0]: {
      ...payload,
    },
  },
});

const setStatusRequester: ProfileStateActionFn<typeof profileSetStatusRequester> = (
  state,
  { payload },
) => ({
  ...state,
  statusRequester: {
    ...state.statusRequester,
    [payload.id]: payload.status,
  },
});

export const profileHandlers = {
  [ProfileActionTypes.SetState]: setState,
  [ProfileActionTypes.SetStatus]: setStatus,
  [ProfileActionTypes.SetStateAccountInfo]: setAccountInfo,
  [ProfileActionTypes.SetStateRequester]: setStateRequester,
  [ProfileActionTypes.SetStatusRequester]: setStatusRequester,
};
