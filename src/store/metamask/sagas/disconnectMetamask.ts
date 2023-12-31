import {
  call, put,
} from 'redux-saga/effects';
import { MetamaskProvider, MetamaskStatus, RequestStatus } from 'types';
import { sagaExceptionHandler } from 'utils';
import detectEthereumProvider from '@metamask/detect-provider';
import { metamaskDisconnect, metamaskSetState, metamaskSetStatus } from '../actionCreators';

export function* disconnectMetamaskSaga({ type, payload }: ReturnType<typeof metamaskDisconnect>) {
  try {
    yield put(metamaskSetStatus({ type, statusRequest: RequestStatus.REQUEST }));
    const { status } = payload;

    const provider: MetamaskProvider = yield call(detectEthereumProvider);
    let updatedStatus;

    if (!status) {
      if (
        !provider ||
        !provider.isMetaMask
      ) updatedStatus = MetamaskStatus.NOT_AVAILABLE;
    }

    if (payload.callback) payload.callback();

    yield put(metamaskSetStatus({ type, statusRequest: RequestStatus.SUCCESS }));
    yield put(metamaskSetState({
      address: '',
      status: status || updatedStatus,
      isLostWallet: status === MetamaskStatus.LOST,
    }));
  } catch (err) {
    yield put(metamaskSetStatus({ type, statusRequest: RequestStatus.REQUEST }));
    sagaExceptionHandler(err);
  }
}
