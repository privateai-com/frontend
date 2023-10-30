import { call, put } from 'redux-saga/effects';

import { responseExceptionToFormError, sagaExceptionHandler } from 'utils';
import {
  RequestStatus, UserResponse,
} from 'types';
import { ApiEndpoint } from 'appConstants';
import { callApi } from 'api';
import { accountSetState } from 'store/account/actionCreators';
import { authConfirmEmail, authSetState, authSetStatus } from '../actionCreators';

export function* authConfirmEmailSaga({
  type, payload: { 
    code,
    email,
    successCallback,
    errorCallback,
  },
}: ReturnType<typeof authConfirmEmail>) {
  try{
    yield put(authSetStatus({ type, status: RequestStatus.REQUEST }));

    const {
      data: {
        user,
        accessToken,
        refreshToken,
        timestamp,
      },
    }: UserResponse = yield call(callApi, {
      method: 'POST',
      endpoint: ApiEndpoint.AuthConfirmEmail,
      payload: {
        email,
        code,
      },
    });
    yield put(accountSetState({
      ...user,
    }));
    yield put(authSetState({
      accessToken,
      refreshToken,
      timestamp,
    }));
    yield put(authSetStatus({ type, status: RequestStatus.SUCCESS }));
    successCallback();
  } catch (e) {
    errorCallback(responseExceptionToFormError(e));
    sagaExceptionHandler(e);
    yield put(authSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
