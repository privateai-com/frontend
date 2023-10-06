import { call, put } from 'redux-saga/effects';
import { responseExceptionToFormError, sagaExceptionHandler } from 'utils';
import {
  RequestStatus, UserResponse,
} from 'types';
import { ApiEndpoint, callApi } from 'appConstants';
import { accountSetState } from 'store/account/actionCreators';
import { authLogin, authSetState, authSetStatus } from '../actionCreators';

export function* authLoginSaga({
  type, payload: { 
    email,
    password,
    successCallback,
    errorCallback,
  },
}: ReturnType<typeof authLogin>) {
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
      endpoint: ApiEndpoint.AuthLogin,
      payload: {
        email,
        password,
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
    successCallback();
    yield put(authSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    errorCallback(responseExceptionToFormError(e));
    yield put(authSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
