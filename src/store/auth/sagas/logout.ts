import { call, put } from 'redux-saga/effects';

import { ApiEndpoint } from 'appConstants';
import { callApi } from 'api';
import { profileSetAccountInfo } from 'store/profile/actionCreators';

import { RequestStatus } from 'types';
import { metamaskDisconnect } from 'store/metamask/actionCreators';
import { authLogout, authSetState, authSetStatus } from '../actionCreators';
import { authInitialState } from '..';

export function* clearReducer() {
  yield put(profileSetAccountInfo({}));
  yield put(authSetState(authInitialState));
  yield put(metamaskDisconnect({}));
}

export function* authLogoutSaga({
  type, payload: {
    callback,
  },
}: ReturnType<typeof authLogout>) {
  try {
    yield put(authSetStatus({ type, status: RequestStatus.REQUEST }));

    yield call(callApi, {
      method: 'POST',
      endpoint: ApiEndpoint.AuthLogout,
    });

    yield put(authSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (exception) {
    yield put(authSetStatus({ type, status: RequestStatus.ERROR }));
  } finally {
    if (callback) {
      callback();
    }
    yield call(clearReducer);
  }
}
