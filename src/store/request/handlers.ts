import { ActionFn } from 'types/redux';
import { RequestState } from 'types/store/RequestState';
import { requestSetState, requestSetStatus } from './actionCreators';
import { RequestActionTypes } from './actionsTypes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RequestHandlerFn<F extends (...args: any) => any> = ActionFn<RequestState, ReturnType<F>>;

const setState: RequestHandlerFn<typeof requestSetState> = (
  state,
  { payload },
) => ({
  ...state,
  ...payload,
});

const setStatus: RequestHandlerFn<typeof requestSetStatus> = (
  state,
  { payload },
) => ({
  ...state,
  ui: {
    ...state.ui,
    [payload.type]: payload.status,
  },
});

export const requestHandlers = {
  [RequestActionTypes.SetState]: setState,
  [RequestActionTypes.SetStatus]: setStatus,
};
