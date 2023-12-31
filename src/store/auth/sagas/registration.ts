import { call, put } from 'redux-saga/effects';

import { responseExceptionToFormError } from 'utils';
import {
  RequestStatus,
} from 'types';
import { ApiEndpoint } from 'appConstants';
import { callApi } from 'api';
import { authRegistration, authSetStatus } from '../actionCreators';

export function* authRegistrationSaga({
  type, payload: { 
    email,
    password,
    successCallback,
    errorCallback,
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
    // sagaExceptionHandler(e);
    errorCallback(responseExceptionToFormError(e));
    yield put(authSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
