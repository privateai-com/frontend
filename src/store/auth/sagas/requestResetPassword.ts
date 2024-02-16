import { call, put, select } from 'redux-saga/effects';

import { responseExceptionToFormError } from 'utils';
import { AuthState, RequestStatus } from 'types';
import { ApiEndpoint } from 'appConstants';
import { callApi } from 'api';
import { authRequestResetPassword, authSetStatus } from '../actionCreators';
import { authSelectors } from '../selectors';

export function* authRequestResetPasswordSaga({
  type,
  payload: { password, successCallback, errorCallback },
}: ReturnType<typeof authRequestResetPassword>) {
  try {
    yield put(authSetStatus({ type, status: RequestStatus.REQUEST }));

    const email: AuthState['email'] = yield select(
      authSelectors.getProp('email'),
    );

    yield call(callApi, {
      method: 'POST',
      endpoint: ApiEndpoint.AuthRequestResetPassword,
      payload: {
        email,
        password,
      },
    });

    yield put(authSetStatus({ type, status: RequestStatus.SUCCESS }));

    successCallback();
  } catch (e) {
    errorCallback(responseExceptionToFormError(e));
    // sagaExceptionHandler(e);
    yield put(authSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
