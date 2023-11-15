import { call, put } from 'redux-saga/effects';

import { responseExceptionToFormError } from 'utils';
import { RequestStatus } from 'types';
import { ApiEndpoint } from 'appConstants';
import { callApi } from 'api';
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
    
    yield put(
      authSetState({
        email,
      }),
    );

    successCallback();
    yield put(authSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    errorCallback(responseExceptionToFormError(e));
    // sagaExceptionHandler(e);
    yield put(authSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
