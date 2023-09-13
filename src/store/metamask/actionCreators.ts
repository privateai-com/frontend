import { MetamaskState, MetamaskStatus, RequestStatus } from 'types';
import { Network } from 'appConstants';
import { MetamaskActionTypes } from './actionTypes';

export const metamaskSetState = (payload: Partial<MetamaskState>) => ({
  type: MetamaskActionTypes.SetState,
  payload,
});

export const metamaskConnect = (payload: { 
  network: Network, 
  callback?: () => void, 
  callbackError?: () => void,
  callbackNotFoundNetwork?: () => void,
}) => ({
  type: MetamaskActionTypes.Connect,
  payload,
});

export const metamaskDisconnect = (payload:{ status?: MetamaskStatus, callback?: () => void }) => ({
  type: MetamaskActionTypes.Disconnect,
  payload,
});

export const metamaskSetStatus = (
  payload: { type: MetamaskActionTypes, statusRequest: RequestStatus },
) => ({
  type: MetamaskActionTypes.SetStatus,
  payload,
});

export const metamaskSetStatusSwitchNetwork = (
  payload: { type: Network, statusRequest: RequestStatus },
) => ({
  type: MetamaskActionTypes.SetStatusSwitchNetwork,
  payload,
});

export const metamaskSwitchNetwork = (payload: { network: Network, callback?: () => void }) => ({
  type: MetamaskActionTypes.SwitchNetwork,
  payload,
});

export const metamaskAddToken = (payload: { successCallback?: () => void }) => ({
  type: MetamaskActionTypes.AddToken,
  payload,
});

export const metamaskGetBalance = () => ({
  type: MetamaskActionTypes.GetBalance,
});

export const metamaskMintToken = (payload: {
  amount: string,
  callback?: () => void,
}) => ({
  type: MetamaskActionTypes.MintToken,
  payload,
});
