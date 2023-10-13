import { call, put } from 'redux-saga/effects';
import { sagaExceptionHandler } from 'utils';
import { RequestStatus, UserResponse } from 'types';
import { ApiEndpoint, callApi, errorsNotification } from 'appConstants';
import { signPersonalEvm } from 'api';
import { accountSetState } from 'store/account/actionCreators';
import detectEthereumProvider from '@metamask/detect-provider';

import { providers } from 'ethers';
import { authLoginWallet, authSetStatus } from '../actionCreators';

const message = 'Connect Archon!';

export function* authloginWalletSaga({
  type,
  payload: { successCallback, errorCallback },
}: ReturnType<typeof authLoginWallet>) {
  try {
    yield put(authSetStatus({ type, status: RequestStatus.REQUEST }));

    const metamaskProvider: providers.ExternalProvider =
      yield detectEthereumProvider();
    if (!metamaskProvider || !metamaskProvider.isMetaMask) {
      return errorCallback(errorsNotification.metamaskError);
    }

    const signature: string = yield call(signPersonalEvm, message);

    const {
      data: { user },
    }: UserResponse = yield call(callApi, {
      method: 'POST',
      endpoint: ApiEndpoint.AuthWalletLogin,
      payload: {
        message,
        signature,
      },
    });

    yield put(
      accountSetState({
        ...user,
      })
    );

    successCallback();
    yield put(authSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    errorCallback(errorsNotification.walletNotAttachedError);

    sagaExceptionHandler(e);
    yield put(authSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
