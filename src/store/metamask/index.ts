import { createReducer } from 'utils';
import { Network } from 'appConstants';
import { MetamaskState, MetamaskStatus, RequestStatus } from 'types';
import { METAMASK_ACTIONS } from './handlers';
import { MetamaskActionTypes } from './actionTypes';

export const metamaskInitialState: Readonly<MetamaskState> = {
  address: '',
  status: MetamaskStatus.INIT,
  balance: 0,
  network: null,
  ui: {
    [MetamaskActionTypes.Connect]: RequestStatus.INIT,
    [MetamaskActionTypes.Disconnect]: RequestStatus.INIT,
    [MetamaskActionTypes.SwitchNetwork]: RequestStatus.INIT,
    [MetamaskActionTypes.AddToken]: RequestStatus.INIT,
    [MetamaskActionTypes.MintToken]: RequestStatus.INIT,
  },
  statusSwitchNetwork: {
    [Network.MaticTest]: RequestStatus.INIT,
  },
};

export default createReducer(metamaskInitialState, METAMASK_ACTIONS);
