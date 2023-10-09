import { call, put, select } from 'redux-saga/effects';

import { responseExceptionToFormError, sagaExceptionHandler } from 'utils';
import { RequestStatus } from 'types';
import { ApiEndpoint, callApi } from 'appConstants';
import { ResponseGenerator } from 'next/dist/server/response-cache';
import {
  authChangePassword,
  authSetStatus,
} from '../actionCreators';

export function* authChangePasswordSaga({
  type,
  payload: {
    password,
    successCallback,
    errorCallback,
  },
}: ReturnType<typeof authChangePassword>) {
  try {
    yield put(authSetStatus({ type, status: RequestStatus.REQUEST }));

    const email: ResponseGenerator = yield select((state) => state.auth.email);
    const verificationCode: ResponseGenerator = yield select(
      (state) => state.auth.verificationCode,
    );

    yield call(callApi, {
      method: 'POST',
      endpoint: ApiEndpoint.AuthConfirmResetPassword,
      payload: {
        email,
        verificationCode,
        password,
      },
    });

    yield put(authSetStatus({ type, status: RequestStatus.SUCCESS }));

    successCallback();
  } catch (e) {
    errorCallback(responseExceptionToFormError(e));
    sagaExceptionHandler(e);
    yield put(authSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
