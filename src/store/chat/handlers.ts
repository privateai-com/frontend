import { ChatState, ActionFn } from 'types';
import { ChatActionTypes } from './actionTypes';
import {
  chatSetState,
  chatSetStatus,
} from './actionCreators';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ChatStateActionFn<F extends (...args: any) => any> =
  ActionFn<ChatState, ReturnType<F>>;

const setState: ChatStateActionFn<typeof chatSetState> = (
  state,
  { payload },
) => ({
  ...state,
  ...payload,
});

const setStatus: ChatStateActionFn<typeof chatSetStatus> = (
  state,
  { payload },
) => ({
  ...state,
  ui: {
    ...state.ui,
    [payload.type]: payload.status,
  },
});

export const chatHandlers = {
  [ChatActionTypes.SetState]: setState,
  [ChatActionTypes.SetStatus]: setStatus,
};
