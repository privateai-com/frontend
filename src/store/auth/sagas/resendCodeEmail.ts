import { call, put } from 'redux-saga/effects';
import { sagaExceptionHandler } from 'utils';
import {
  RequestStatus,
} from 'types';
import { ApiEndpoint, callApi } from 'appConstants';
import { authResendConfCode, authSetStatus } from '../actionCreators';

export function* authResendCodeEmailSaga({
  type, payload: { 
    email,
  },
}: ReturnType<typeof authResendConfCode>) {
  try{
    yield put(authSetStatus({ type, status: RequestStatus.REQUEST }));

    yield call(callApi, {
      method: 'POST',
      endpoint: ApiEndpoint.AuthResendCodeRegister,
      payload: {
        email,
      },
    });

    yield put(authSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(authSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
