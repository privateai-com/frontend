import { call, put } from 'redux-saga/effects';
import { sagaExceptionHandler } from 'utils';
import {
  RequestStatus, UserResponse,
} from 'types';
import { ApiEndpoint } from 'appConstants';
import { callApi } from 'appConstants/callApi';
import { accountSetState } from 'store/account/actionCreators';
import { authLogin, authSetState, authSetStatus } from '../actionCreators';

export function* authLoginSaga({
  type, payload: { 
    email,
    password,
    successCallback,
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
    yield put(authSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
