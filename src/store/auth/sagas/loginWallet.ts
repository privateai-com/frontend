import { call, put } from 'redux-saga/effects';
import { sagaExceptionHandler } from 'utils';
import {
  RequestStatus,
} from 'types';
import { ApiEndpoint } from 'appConstants';
import { callApi } from 'appConstants/callApi';
import { signPersonalEvm } from 'api';
import { authLoginWallet, authSetStatus } from '../actionCreators';

const message = 'Connect Archon!';

export function* authloginWalletSaga({
  type, payload: {
    successCallback,
  },
}: ReturnType<typeof authLoginWallet>) {
  try {
    yield put(authSetStatus({ type, status: RequestStatus.REQUEST }));

    const signature: string = yield call(signPersonalEvm, message);

    yield call(callApi, {
      method: 'POST',
      endpoint: ApiEndpoint.AuthWalletLogin,
      payload: {
        message,
        signature,
      },
    });
    successCallback();
    yield put(authSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(authSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
