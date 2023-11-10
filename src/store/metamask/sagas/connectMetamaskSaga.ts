import { EventChannel, eventChannel } from 'redux-saga';
import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import detectEthereumProvider from '@metamask/detect-provider';
import {
  MetamaskProvider, MetamaskStatus,
  MetamaskRequestMethod, Web3Event, RequestStatus,
} from 'types';
import {
  notificationText,
} from 'appConstants';
import {
  getMetamaskChainId, sagaExceptionHandler, notification,
} from 'utils';
import {
  metamaskSetState, metamaskDisconnect, metamaskSetStatus, metamaskConnect,
} from 'store/metamask/actionCreators';

import { disconnectMetamaskSaga } from 'store/metamask/sagas/disconnectMetamask';
import { metamaskSelectors } from 'store/metamask/selectors';
import { MetamaskActionTypes } from 'store/metamask/actionTypes';

let metamaskProvider: MetamaskProvider;

function createEthereumProviderChannel() {
  return eventChannel((emit) => {
    const accountChangeHandler = (addressesOtherAccount: string[]) => {
      emit({
        event: Web3Event.accountsChanged,
        addressesOtherAccount,
      });
    };

    const disconnectHandler = () => {
      emit({
        event: Web3Event.disconnect,
      });
    };

    const changeNetwork = (id?: string) => {
      emit({
        event: Web3Event.chainChanged,
        id,
      });
    };

    metamaskProvider.on(Web3Event.accountsChanged, accountChangeHandler);
    metamaskProvider.on(Web3Event.disconnect, disconnectHandler);
    metamaskProvider.on(Web3Event.chainChanged, changeNetwork);

    return () => {};
  });
}

const handlePayload = (payload: {
  callback?: () => void, 
  callbackError?: () => void,
  callbackNotFoundNetwork?: () => void,
}) => function* ({
  event,
  addressesOtherAccount,
}: { event: Web3Event, addressesOtherAccount: string[], id?: string }) {
  try {
    if (event === Web3Event.chainChanged) {
      yield put(metamaskSetStatus({
        type: MetamaskActionTypes.Connect,
        statusRequest: RequestStatus.REQUEST,
      }));
      yield put(metamaskSetState({
        status: MetamaskStatus.LOADING,
      }));

      // const network = getNetworkName(id);
      // if (network) {
      yield put(metamaskSetStatus({
        type: MetamaskActionTypes.Connect,
        statusRequest: RequestStatus.SUCCESS,
      }));

      const addresses: string[] = yield metamaskProvider.request({
        method: MetamaskRequestMethod.eth_requestAccounts,
      });

      yield put(metamaskSetState({
        status: MetamaskStatus.CONNECTED,
        // network,
        address: addresses[0],
      }));

      if (payload.callback) payload.callback();

      notification.destroy();
      // } else {
      //   yield put(metamaskSetStatus({
      //     type: MetamaskActionTypes.Connect,
      //     statusRequest: RequestStatus.ERROR,
      //   }));

      //   if (payload.callbackNotFoundNetwork) payload.callbackNotFoundNetwork();

      //   yield put(metamaskSetState({ status: MetamaskStatus.NOT_SUPPORT }));
      //   notification.error({
      //     message: notificationText.notSupportNetwork,
      //   });
      // }
    }

    if (event === Web3Event.accountsChanged) {
      if (addressesOtherAccount && addressesOtherAccount.length !== 0) {
        yield disconnectMetamaskSaga(metamaskDisconnect({}));

        yield put(metamaskConnect(payload));
   
        notification.success({
          message: notificationText.accountChanged,
        });
      } else {
        yield put(metamaskDisconnect({
          status: MetamaskStatus.LOST,
          callback: payload.callback,
        }));
      }
    }
  } catch (err) {
    yield put(metamaskSetStatus({
      type: MetamaskActionTypes.Connect,
      statusRequest: RequestStatus.ERROR,
    }));
    if (payload.callbackError) payload.callbackError();
    sagaExceptionHandler(err);
  }
};

export function* connectMetamaskSaga({ type, payload }: ReturnType<typeof metamaskConnect>) {
  try {
    yield put(metamaskSetStatus({ type, statusRequest: RequestStatus.REQUEST }));
    yield put(metamaskSetState({
      status: MetamaskStatus.LOADING,
    }));
    metamaskProvider = yield detectEthereumProvider();
    if (!metamaskProvider || !metamaskProvider.isMetaMask) {
      yield put(metamaskDisconnect({ 
        status: MetamaskStatus.LOST, 
        callback: payload.callback,
      }));
      notification.error({
        message: notificationText.installMetamask,
      });
    }
    if (metamaskProvider) {
      const addresses: string[] = yield metamaskProvider.request({
        method: MetamaskRequestMethod.eth_requestAccounts,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const metamaskProviderChannel: EventChannel<any> =
        yield call(createEthereumProviderChannel);

      yield takeLatest(metamaskProviderChannel, handlePayload(payload));

      if (!addresses.length) {
        yield put(metamaskDisconnect({
          status: MetamaskStatus.NOT_AVAILABLE,
          callback: payload.callback,
        }));
        return;
      }
      const networkId: string = yield call(getMetamaskChainId);

      if (networkId) {
        const status: MetamaskStatus = yield select(metamaskSelectors.getProp('status'));
        if (status === MetamaskStatus.LOST) {
          return;
        }
        yield put(metamaskSetStatus({ type, statusRequest: RequestStatus.SUCCESS }));
        yield put(metamaskSetState({
          status: MetamaskStatus.CONNECTED,
          address: addresses[0],
          isLostWallet: false,
        }));

        if (payload.callback) payload.callback();

        notification.destroy();
      } else {
        yield put(metamaskDisconnect({
          status: MetamaskStatus.NOT_SUPPORT,
        }));
        if (payload.callbackNotFoundNetwork) payload.callbackNotFoundNetwork();

        notification.info({
          message: notificationText.wrongNetwork('Incorrect network'),
        });
        yield put(metamaskSetStatus({ type, statusRequest: RequestStatus.ERROR }));
      }
    }
  } catch (err) {
    yield put(metamaskSetStatus({ type, statusRequest: RequestStatus.ERROR }));
    yield put(metamaskSetState({
      status: MetamaskStatus.NOT_AVAILABLE,
    }));
    sagaExceptionHandler(err);
  }
}
