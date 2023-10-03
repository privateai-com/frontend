import { call, put } from 'redux-saga/effects';
import { sagaExceptionHandler } from 'utils';
import {
  RequestStatus,
} from 'types';
import { ApiEndpoint } from 'appConstants';
import { callApi } from 'appConstants/callApi';
import { authRegistration, authSetStatus } from '../actionCreators';

export function* authRegistrationSaga({
  type, payload: { 
    email,
    password,
    successCallback,
  },
}: ReturnType<typeof authRegistration>) {
  try{
    yield put(authSetStatus({ type, status: RequestStatus.REQUEST }));

    yield call(callApi, {
      method: 'POST',
      endpoint: ApiEndpoint.AuthRegister,
      payload: {
        email,
        password,
      },
    });
    successCallback();
    yield put(authSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(authSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
