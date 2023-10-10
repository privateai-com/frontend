import { call, put, select } from 'redux-saga/effects';

import { responseExceptionToFormError, sagaExceptionHandler } from 'utils';
import { AuthState, RequestStatus } from 'types';
import { ApiEndpoint, callApi } from 'appConstants';
import { authChangePassword, authSetStatus } from '../actionCreators';
import { authSelectors } from '../selectors';

export function* authChangePasswordSaga({
  type,
  payload: { password, successCallback, errorCallback },
}: ReturnType<typeof authChangePassword>) {
  try {
    yield put(authSetStatus({ type, status: RequestStatus.REQUEST }));

    const email: AuthState['email'] = yield select(
      authSelectors.getProp('email')
    );
    const verificationCode: AuthState['verificationCode'] = yield select(
      authSelectors.getProp('verificationCode')
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
