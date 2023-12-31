import { call, put } from 'redux-saga/effects';
// import { sagaExceptionHandler } from 'utils';
import { RequestStatus, UserResponse } from 'types';
import { ApiEndpoint, errorsNotification } from 'appConstants';
import { signPersonalEvm, callApi } from 'api';
import { profileSetAccountInfo } from 'store/profile/actionCreators';
import detectEthereumProvider from '@metamask/detect-provider';

import { providers } from 'ethers';
import { authLoginWallet, authSetState, authSetStatus } from '../actionCreators';

const message = 'Connecting wallet to PrivateAI';

export function* authLoginWalletSaga({
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
      data: {
        user,
        accessToken,
        refreshToken,
        timestamp,
      },
    }: UserResponse = yield call(callApi, {
      method: 'POST',
      endpoint: ApiEndpoint.AuthWalletLogin,
      payload: {
        message,
        signature,
      },
    });

    yield put(
      profileSetAccountInfo({
        ...user,
      }),
    );
    yield put(authSetState({
      accessToken,
      refreshToken,
      timestamp,
    }));

    successCallback();
    yield put(authSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    errorCallback(errorsNotification.walletNotAttachedError);
    // sagaExceptionHandler(e);
    yield put(authSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
