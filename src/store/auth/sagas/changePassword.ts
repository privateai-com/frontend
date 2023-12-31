import { call, put, select } from 'redux-saga/effects';

import { responseExceptionToFormError } from 'utils';
import { AuthState, RequestStatus } from 'types';
import { ApiEndpoint } from 'appConstants';
import { callApi } from 'api';
import { authChangePassword, authSetStatus } from '../actionCreators';
import { authSelectors } from '../selectors';

export function* authChangePasswordSaga({
  type,
  payload: { verificationCode, successCallback, errorCallback },
}: ReturnType<typeof authChangePassword>) {
  try {
    yield put(authSetStatus({ type, status: RequestStatus.REQUEST }));

    const email: AuthState['email'] = yield select(
      authSelectors.getProp('email'),
    );

    yield call(callApi, {
      method: 'POST',
      endpoint: ApiEndpoint.AuthConfirmResetPassword,
      payload: {
        email,
        verificationCode,
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
