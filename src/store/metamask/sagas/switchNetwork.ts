import { getMetamaskChainId, sagaExceptionHandler } from 'utils';
import { put } from 'redux-saga/effects';
import detectEthereumProvider from '@metamask/detect-provider';
import {
  MetamaskProvider,
  MetamaskStatus,
  RequestStatus,
} from 'types';
// import { switchNetwork } from 'api';
import { networkChains } from 'appConstants';
import { 
  metamaskSwitchNetwork, metamaskSetStatus, metamaskConnect, 
  metamaskSetStatusSwitchNetwork, metamaskSetState,
} from 'store/metamask/actionCreators';

export function* switchNetworkSaga({ type, payload } : ReturnType<typeof metamaskSwitchNetwork>) {
  try {
    yield put(metamaskSetStatus({ type, statusRequest: RequestStatus.REQUEST }));
    yield put(metamaskSetStatusSwitchNetwork({
      type: payload.network, 
      statusRequest: RequestStatus.REQUEST,
    }));

    const metamaskProvider: MetamaskProvider = yield detectEthereumProvider();
    if (!metamaskProvider || !metamaskProvider.isMetaMask) {
      yield put(metamaskSetStatusSwitchNetwork({
        type: payload.network, 
        statusRequest: RequestStatus.ERROR,
      }));
      yield put(metamaskSetStatus({ type, statusRequest: RequestStatus.ERROR }));
      yield put(metamaskSetState({ status: MetamaskStatus.NOT_SUPPORT }));
    } else {
      const chainIdForSwitch = networkChains[payload.network];
      const chainId: string = yield getMetamaskChainId();
      if (!chainIdForSwitch || !chainId) {
        sagaExceptionHandler('Unable to change network');
        return false;
      }

      yield put(metamaskConnect(payload));
      yield put(metamaskSetStatusSwitchNetwork({
        type: payload.network, 
        statusRequest: RequestStatus.SUCCESS,
      }));
      yield put(metamaskSetStatus({ type, statusRequest: RequestStatus.SUCCESS }));
    }
  } catch (err) {
    yield put(metamaskSetStatus({ type, statusRequest: RequestStatus.ERROR }));
    yield put(metamaskSetStatusSwitchNetwork({
      type: payload.network, 
      statusRequest: RequestStatus.ERROR,
    }));
    sagaExceptionHandler(err);
  }
}
