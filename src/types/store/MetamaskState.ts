import { Network } from 'appConstants';
import { PartialRecord, RequestStatus } from 'types';
import { MetamaskActionTypes } from 'store/metamask/actionTypes';

export enum MetamaskStatus {
  INIT = 'INIT',
  AVAILABLE = 'AVAILABLE',
  NOT_AVAILABLE = 'NOT_AVAILABLE',
  CONNECTED = 'CONNECTED',
  LOST = 'LOST',
  NOT_SUPPORT = 'NOT_SUPPORT',
  LOADING = 'LOADING',
}

export enum MetamaskRequestMethod {
  eth_requestAccounts = 'eth_requestAccounts',
  eth_accounts = 'eth_accounts',
  eth_chainId = 'eth_chainId',
  wallet_switchEthereumChain = 'wallet_switchEthereumChain',
  wallet_addEthereumChain = 'wallet_addEthereumChain',
  wallet_watchAsset = 'wallet_watchAsset',
}

export enum Web3Event {
  disconnect = 'disconnect',
  connect = 'connect',
  accountsChanged = 'accountsChanged',
  chainChanged = 'chainChanged',
}

export type MetamaskState = {
  address: string,
  status: MetamaskStatus,
  balance: number,
  network: Network | null,
  isLostWallet?: boolean,
  ui: PartialRecord<MetamaskActionTypes, RequestStatus>,
  statusSwitchNetwork: PartialRecord<Network, RequestStatus>,
};

export type MetamaskProvider = {
  isMetaMask: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request: (obj: any) => Promise<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on: (ev: string, cb: (data: any) => void) => void
  selectedAddress: string,
};
