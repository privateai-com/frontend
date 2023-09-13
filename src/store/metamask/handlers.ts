import { MetamaskState, ActionFn } from 'types';
import { MetamaskActionTypes } from './actionTypes';
import {
  metamaskSetState,
  metamaskSetStatus,
  metamaskSetStatusSwitchNetwork,
} from './actionCreators';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MetamaskStateActionFn<F extends (...args: any) => any> =
  ActionFn<MetamaskState, ReturnType<F>>;

const setState: MetamaskStateActionFn<typeof metamaskSetState> = (
  state,
  { payload },
) => ({
  ...state,
  ...payload,
});

const setStatus: MetamaskStateActionFn<typeof metamaskSetStatus> = (
  state,
  { payload },
) => ({
  ...state,
  ui: {
    ...state.ui,
    [payload.type]: payload.statusRequest,
  },
});

const setStatusSwitchNetwork: MetamaskStateActionFn<typeof metamaskSetStatusSwitchNetwork> = (
  state,
  { payload },
) => ({
  ...state,
  statusSwitchNetwork: {
    ...state.statusSwitchNetwork,
    [payload.type]: payload.statusRequest,
  },
});

export const METAMASK_ACTIONS = {
  [MetamaskActionTypes.SetState]: setState,
  [MetamaskActionTypes.SetStatus]: setStatus,
  [MetamaskActionTypes.SetStatusSwitchNetwork]: setStatusSwitchNetwork,
};
