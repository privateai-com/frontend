import { call, put, select } from 'redux-saga/effects';

import { responseExceptionToFormError } from 'utils';
import { AuthState, RequestStatus } from 'types';
import { ApiEndpoint } from 'appConstants';
import { callApi } from 'api';
import {
  authConfirmCode,
  authSetStatus,
} from '../actionCreators';
import { authSelectors } from '../selectors';

export function* authConfirmCodeSage({
  type,
  payload: { password, successCallback, errorCallback },
}: ReturnType<typeof authConfirmCode>) {
  try {
    yield put(authSetStatus({ type, status: RequestStatus.REQUEST }));

    const email: AuthState['email'] = yield select(
      authSelectors.getProp('email'),
    );

    yield call(callApi, {
      method: 'POST',
      endpoint: ApiEndpoint.AuthSendCodeResetPassword,
      payload: {
        email,
        password,
      },
    });
    
    // yield put(
    //   authSetState({
    //     email,
    //   }),
    // );

    successCallback();
    yield put(authSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    errorCallback(responseExceptionToFormError(e));
    // sagaExceptionHandler(e);
    yield put(authSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
