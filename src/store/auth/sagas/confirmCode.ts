import { call, put } from 'redux-saga/effects';

import { responseExceptionToFormError, sagaExceptionHandler } from 'utils';
import { RequestStatus } from 'types';
import { ApiEndpoint, callApi } from 'appConstants';
import {
  authConfirmCode,
  authSetState,
  authSetStatus,
} from '../actionCreators';

export function* authConfirmCodeSage({
  type,
  payload: { email, successCallback, errorCallback },
}: ReturnType<typeof authConfirmCode>) {
  try {
    yield put(authSetStatus({ type, status: RequestStatus.REQUEST }));

    yield call(callApi, {
      method: 'POST',
      endpoint: ApiEndpoint.AuthSendCodeResetPassword,
      payload: {
        email,
      },
    });

    yield put(authSetStatus({ type, status: RequestStatus.SUCCESS }));
    yield put(
      authSetState({
        email,
      })
    );

    successCallback();
  } catch (e) {
    errorCallback(responseExceptionToFormError(e));
    sagaExceptionHandler(e);
    yield put(authSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
